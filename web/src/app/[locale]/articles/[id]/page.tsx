import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Article } from "@/types/article";
import ArticlePageClient from "@/components/articles/ArticlePageClient";
import { withBasePath } from "@/lib/basePath";
import { resolveArticleImageUrl } from "@/lib/article-image";
import {
  SITE_URL,
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  getRobotsNoIndex,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

// Revalidate article pages every 5 minutes (ISR)
export const revalidate = 300;

// ─── API helpers ──────────────────────────────────────────────────────────────

interface ApiTag {
  _id: string;
  id: number;
  name: string;
}

interface ApiAuthorId {
  _id: string;
  user_name: string;
  user_handle: string;
  Profile_image: string;
}

interface ApiArticleDetail {
  _id: number;
  pb_recordId: string;
  title: string;
  description: string;
  authorName: string;
  authorId: ApiAuthorId;
  tags: ApiTag[];
  imageUtils: string[];
  viewCount: number;
  likeCount: number;
  language: string;
  publishedDate: string;
  lastUpdated: string;
  content: string; // filename, e.g. "file_3u2hg8bneh.html"
}

function resolveImageUrl(imageUtils: string[]): string | null {
  if (!imageUtils || imageUtils.length === 0) return null;
  const raw = imageUtils[0];
  if (!raw) return null;
  if (raw.startsWith("http")) return raw;
  return withBasePath(
    `/api/proxy-image?url=${encodeURIComponent(`https://ultimatehealth.blog/api/getFile/${raw}`)}`
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

const AVATAR_COLORS = [
  "#0d9488",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#d97706",
  "#059669",
];

function pickColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function estimateReadingTime(content: string): string {
  const wordCount = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
}

function mapApiToArticle(api: ApiArticleDetail): Article {
  const authorName =
    api.authorName || api.authorId?.user_name || "Community Contributor";
  const tagNames = Array.isArray(api.tags)
    ? api.tags.map((t) => (typeof t === "string" ? t : t.name)).filter(Boolean)
    : [];

  return {
    id: String(api._id),
    title: api.title,
    subtitle: "",
    excerpt: api.description || api.title,
    imageUrl: resolveImageUrl(api.imageUtils),
    imageAlt: api.title,
    author: {
      name: authorName,
      role: "Health Contributor",
      avatarInitials: getInitials(authorName),
      avatarColor: pickColor(authorName),
    },
    publishedAt: api.publishedDate || new Date().toISOString(),
    updatedAt: api.lastUpdated || api.publishedDate || new Date().toISOString(),
    readingTime: "5 min read", // updated once HTML is fetched
    category: tagNames[0] || "Health Guide",
    tags: tagNames,
    content: { blocks: [] }, // replaced by htmlContent prop
  };
}

async function fetchArticle(
  id: string
): Promise<{ article: Article; pbRecordId: string } | null> {
  const ISR = { next: { revalidate: 300 } } as const;

  // 1. Try direct numeric ID fetch: /api/articles/{id}
  try {
    const res = await fetch(`https://ultimatehealth.blog/api/articles/${id}`, ISR);
    if (res.ok) {
      const data: ApiArticleDetail = await res.json();
      if (data && data._id) {
        return {
          article: mapApiToArticle(data),
          pbRecordId: data.pb_recordId,
        };
      }
    }
  } catch {
    // Fall through to slug/list search
  }

  // 2. Fallback: list all articles and match by pb_recordId or slugified title
  try {
    const res = await fetch(`https://ultimatehealth.blog/api/articles/?limit=100`, ISR);
    if (res.ok) {
      const data = await res.json();
      const list: ApiArticleDetail[] = data.articles ?? [];
      const match = list.find((a) => {
        if (a.pb_recordId === id) return true;
        if (String(a._id) === id) return true;
        const slug = a.title
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return slug === id;
      });

      if (match) {
        return {
          article: mapApiToArticle(match),
          pbRecordId: match.pb_recordId,
        };
      }
    }
  } catch {
    // Fall through
  }

  return null;
}

async function fetchHtmlContent(pbRecordId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://ultimatehealth.blog/api/articles/get-article-content/${pbRecordId}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.htmlContent as string) ?? null;
  } catch {
    return null;
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const result = await fetchArticle(id);

  if (!result) {
    return {
      title: "Article Not Found",
      description: "The requested medical guide or article could not be found.",
      robots: getRobotsNoIndex(),
    };
  }

  const { article } = result;
  const canonicalUrl = getCanonicalUrl(locale, `/articles/${id}`);
  const alternates = getHreflangAlternates(`/articles/${id}`);

  let absoluteImageUrl = `${FULL_SITE_URL}/icon1.png`;
  if (article.imageUrl) {
    absoluteImageUrl = article.imageUrl.startsWith("http")
      ? article.imageUrl
      : `${SITE_URL}${article.imageUrl}`;
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${article.title} | ${BRAND_NAME}`,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: locale,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: absoluteImageUrl,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${BRAND_NAME}`,
      description: article.excerpt,
      images: [absoluteImageUrl],
      creator: "@SUSMITA2360",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: PageProps) {
  const { id, locale } = await params;
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const result = await fetchArticle(id);
  if (!result) {
    notFound();
  }

  const { article, pbRecordId } = result;

  // Fetch HTML content
  const htmlContent = await fetchHtmlContent(pbRecordId);

  if (htmlContent) {
    article.readingTime = estimateReadingTime(htmlContent);
  }

  const canonicalUrl = getCanonicalUrl(locale, `/articles/${id}`);

  let absoluteImageUrl = `${FULL_SITE_URL}/icon1.png`;
  if (article.imageUrl) {
    absoluteImageUrl = article.imageUrl.startsWith("http")
      ? article.imageUrl
      : `${SITE_URL}${article.imageUrl}`;
  }

  const articleJsonLd = buildArticleJsonLd({
    title: article.title,
    description: article.excerpt,
    url: canonicalUrl,
    imageUrl: absoluteImageUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    authorName: article.author.name,
    category: article.category,
    tags: article.tags,
    locale: locale,
  });

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: getCanonicalUrl(locale) },
    { name: "Articles", url: getCanonicalUrl(locale, "/articles") },
    { name: article.title, url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ArticlePageClient
        article={article}
        relatedArticles={[]}
        htmlContent={htmlContent ?? undefined}
        pbRecordId={pbRecordId}
      />
    </>
  );
}
