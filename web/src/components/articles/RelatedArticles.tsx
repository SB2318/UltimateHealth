import { type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Article } from "@/types/article";
import { withBasePath } from "@/lib/basePath";

interface RelatedArticlesProps {
  articles: Article[];
}

/**
 * Related articles section displayed below the main article content.
 *
 * Layout:
 *   Desktop  (>1024px) : 3-column grid
 *   Tablet   (768–1024) : 2-column grid
 *   Mobile   (<768px)  : Single-column stack
 */
export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <aside aria-labelledby="related-articles-heading">
      <div className="border-t border-gray-100 bg-[#f7fafc]">
        <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section heading */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#667eea] mb-2">
              Continue Reading
            </p>
            <h2
              id="related-articles-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1a202c]"
            >
              Related Articles
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <RelatedArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/** Category-to-icon mapping for gradient placeholder cards */
const CATEGORY_ICONS: Record<string, string> = {
  "Cardiovascular Health": "❤️",
  "Diabetes Management": "🩺",
  "Mental Health": "🧠",
  Nutrition: "🥗",
  "Sleep Health": "😴",
  Fitness: "🏃",
  Wellness: "✨",
};

function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] ?? "📋";
}

interface RelatedArticleCardProps {
  article: Article;
}

function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  const formattedDate = format(parseISO(article.publishedAt), "MMM d, yyyy");
  const icon = getCategoryIcon(article.category);
  const articleUrl = withBasePath(`/articles/${article.id}`);

  return (
    <article className="relative group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#667eea]">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Gradient placeholder — background derived from author theme colour */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 [background:linear-gradient(135deg,var(--card-from)_0%,var(--card-to)_100%)]"
            style={{
              "--card-from": `${article.author.avatarColor}30`,
              "--card-to": `${article.author.avatarColor}60`,
            } as React.CSSProperties}
            aria-hidden="true"
          >
            <span className="text-5xl opacity-70">{icon}</span>
          </div>
        )}

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3 className="font-bold text-[#1a202c] leading-snug line-clamp-2 mb-2 group-hover:text-[#667eea] transition-colors text-base">
          <Link
            href={articleUrl}
            className="focus-visible:outline-none"
            aria-label={`Read article: ${article.title}`}
          >
            {/* Extend click area to whole card */}
            <span className="absolute inset-0" aria-hidden="true" />
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[#718096] line-clamp-2 leading-relaxed mb-4 flex-1">
          {article.excerpt}
        </p>

        {/* Footer: author + date + reading time */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 [background:var(--avatar-color)]"
              style={{ "--avatar-color": article.author.avatarColor } as React.CSSProperties}
              aria-hidden="true"
            >
              {article.author.avatarInitials}
            </div>
            <span className="text-xs text-[#718096] truncate">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#718096] shrink-0">
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-clock text-[10px]" aria-hidden="true" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
