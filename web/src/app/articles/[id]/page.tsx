import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleById, getRelatedArticles, articles } from "@/lib/article-data";
import ArticlePageClient from "@/components/articles/ArticlePageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Pre-generate static paths for all known articles at build time
export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: "Article Not Found | UltimateHealth",
      description: "The requested article could not be found.",
    };
  }

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

/**
 * Article detail page.
 * Resolves the article by [id], generates rich metadata, and delegates
 * rendering to the client-side ArticlePageClient component.
 */
export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(id, 3);

  return (
    <ArticlePageClient article={article} relatedArticles={relatedArticles} />
  );
}
