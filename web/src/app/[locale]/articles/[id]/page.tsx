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

function resolveImageUrl(
  imageUtils: string[],
  context?: { title?: string; category?: string }
): string {
  return resolveArticleImageUrl(imageUtils, context);
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
    imageUrl: resolveImageUrl(api.imageUtils, {
      title: api.title,
      category: tagNames[0],
    }),
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
): Promise<{ article: Article; pbRecordId: string; numericId?: number } | null> {
  const ISR = { next: { revalidate: 300 } } as const;

  // 1. Try fetching by PocketBase record ID: /api/articles/record/{pb_recordId}
  try {
    const res = await fetch(`https://ultimatehealth.blog/api/articles/record/${id}`, ISR);
    if (res.ok) {
      const data = await res.json();
      const detail: ApiArticleDetail = (data && data.article) ? data.article : data;
      if (detail && (detail.pb_recordId || detail._id)) {
        return {
          article: mapApiToArticle(detail),
          pbRecordId: detail.pb_recordId || id,
          numericId: detail._id,
        };
      }
    }
  } catch {
    // Fall through to numeric ID / list search
  }

  // 2. Try direct numeric ID fetch: /api/articles/{id}
  try {
    const res = await fetch(`https://ultimatehealth.blog/api/articles/${id}`, ISR);
    if (res.ok) {
      const data = await res.json();
      const detail: ApiArticleDetail = (data && data.article) ? data.article : data;
      if (detail && (detail._id || detail.pb_recordId)) {
        return {
          article: mapApiToArticle(detail),
          pbRecordId: detail.pb_recordId,
          numericId: detail._id,
        };
      }
    }
  } catch {
    // Fall through to slug/list search
  }

  // 3. Fallback: list all articles and match by pb_recordId, _id, or slugified title
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
          numericId: match._id,
        };
      }
    }
  } catch {
    // Fall through
  }

  return null;
}

async function fetchRelatedArticles(
  numericId?: number,
  currentPbRecordId?: string
): Promise<Article[]> {
  const ISR = { next: { revalidate: 300 } } as const;

  // 1. Try endpoint /api/articles/{id}/related?limit=4
  if (numericId) {
    try {
      const res = await fetch(
        `https://ultimatehealth.blog/api/articles/${numericId}/related?limit=4`,
        ISR
      );
      if (res.ok) {
        const json = await res.json();
        const items =
          json.data || json.articles || json.relatedArticles || (Array.isArray(json) ? json : []);
        if (Array.isArray(items) && items.length > 0) {
          return items.slice(0, 4).map((api: ApiArticleDetail) => {
            const art = mapApiToArticle(api);
            // Prioritize pb_recordId for link navigation
            art.id = api.pb_recordId || String(api._id);
            return art;
          });
        }
      }
    } catch {
      // Fall through to fallback
    }
  }

  // 2. Fallback: fetch articles list and select other articles
  try {
    const res = await fetch(`https://ultimatehealth.blog/api/articles/?limit=10`, ISR);
    if (res.ok) {
      const json = await res.json();
      const list: ApiArticleDetail[] = json.articles ?? [];
      const filtered = list.filter(
        (a) =>
          (numericId ? a._id !== numericId : true) &&
          (currentPbRecordId ? a.pb_recordId !== currentPbRecordId : true)
      );
      return filtered.slice(0, 3).map((api) => {
        const art = mapApiToArticle(api);
        art.id = api.pb_recordId || String(api._id);
        return art;
      });
    }
  } catch {
    // Return empty list
  }

  return [];
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

  const rawDesc = article.excerpt || article.title || "";
  const metaDescription =
    rawDesc.length > 155
      ? `${rawDesc.slice(0, 152).trim()}...`
      : rawDesc;

  return {
    title: article.title,
    description: metaDescription,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${article.title} | ${BRAND_NAME} Blog`,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: `${BRAND_NAME} Blog`,
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
      title: `${article.title} | ${BRAND_NAME} Blog`,
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

  // Fetch related articles based on numeric ID or tag/category
  const relatedArticles = await fetchRelatedArticles(result.numericId, pbRecordId);

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
        relatedArticles={relatedArticles}
        htmlContent={htmlContent ?? undefined}
        pbRecordId={pbRecordId}
      />
    </>
  );
}
