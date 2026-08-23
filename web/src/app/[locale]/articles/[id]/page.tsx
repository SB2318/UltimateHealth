import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Article } from "@/types/article";
import ArticlePageClient from "@/components/articles/ArticlePageClient";
import { withBasePath } from "@/lib/basePath";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

// Allow dynamic rendering for any article ID from the API
export const dynamic = "force-dynamic";

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
    `/api/proxy-image?url=${encodeURIComponent(`https://uhsocial.in/api/getFile/${raw}`)}`
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function estimateReadingTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function mapToArticle(apiArticle: ApiArticleDetail): Article {
  const authorName =
    apiArticle.authorName || apiArticle.authorId?.user_name || "Unknown Author";
  const category = apiArticle.tags?.[0]?.name || "Health";

  return {
    id: String(apiArticle._id),
    title: apiArticle.title,
    excerpt: apiArticle.description,
    content: { blocks: [] }, // replaced by htmlContent prop
    imageUrl: resolveImageUrl(apiArticle.imageUtils),
    imageAlt: apiArticle.title,
    author: {
      name: authorName,
      role: "Health Contributor",
      avatarInitials: getInitials(authorName),
      avatarColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    publishedAt: apiArticle.publishedDate,
    updatedAt: apiArticle.lastUpdated,
    readingTime: "5 min read", // updated after content is fetched
    category,
    tags: apiArticle.tags?.map((t) => t.name) ?? [],
  };
}

async function fetchArticle(
  id: string
): Promise<{ article: Article; pbRecordId: string } | null> {
  try {
    const res = await fetch(`https://uhsocial.in/api/articles/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const apiArticle: ApiArticleDetail = data.article ?? data;
    if (!apiArticle?._id) return null;
    return {
      article: mapToArticle(apiArticle),
      pbRecordId: apiArticle.pb_recordId,
    };
  } catch {
    return null;
  }
}

async function fetchHtmlContent(pbRecordId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://uhsocial.in/api/articles/get-article-content/${pbRecordId}`,
      { cache: "no-store" }
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
  const { id } = await params;
  const result = await fetchArticle(id);

  if (!result) {
    return {
      title: "Article Not Found | UltimateHealth",
      description: "The requested article could not be found.",
    };
  }

  const { article } = result;
  return {
    title: `${article.title} | UltimateHealth`,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      ...(article.imageUrl
        ? { images: [{ url: article.imageUrl, alt: article.imageAlt }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      ...(article.imageUrl ? { images: [article.imageUrl] } : {}),
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * Article detail page.
 * Fetches article metadata from /api/articles/{id} then fetches the full HTML
 * content from /api/articles/get-article-content/{pb_recordId}.
 * Passes both to ArticlePageClient for rendering.
 */
export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  const result = await fetchArticle(id);
  if (!result) {
    notFound();
  }

  const { article, pbRecordId } = result;

  // Fetch the actual HTML content in parallel (fire early)
  const htmlContent = await fetchHtmlContent(pbRecordId);

  // Update reading time estimate if we have content
  if (htmlContent) {
    article.readingTime = estimateReadingTime(htmlContent);
  }

  return (
    <ArticlePageClient
      article={article}
      relatedArticles={[]}
      htmlContent={htmlContent ?? undefined}
    />
  );
}
