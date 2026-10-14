import { format, parseISO } from "date-fns";
import type { Article } from "@/types/article";

interface ArticleMetaProps {
  article: Article;
  className?: string;
}

/**
 * Displays author information, publication date, and reading time for an article.
 * Uses initials-based avatar since user profile images are loaded from the mobile API.
 */
export default function ArticleMeta({ article, className = "" }: ArticleMetaProps) {
  const formattedDate = format(parseISO(article.publishedAt), "MMMM d, yyyy");
  const updatedDate = article.updatedAt
    ? format(parseISO(article.updatedAt), "MMMM d, yyyy")
    : null;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 ${className}`}
    >
      {/* Author avatar + name/role */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 select-none"
          style={{ background: article.author.avatarColor }}
          aria-hidden="true"
        >
          {article.author.avatarInitials}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold !text-slate-100" style={{ color: "#f8fafc" }}>
            {article.author.name}
          </p>
          <p className="text-xs !text-slate-400" style={{ color: "#94a3b8" }}>{article.author.role}</p>
        </div>
      </div>

      {/* Vertical divider (desktop only) */}
      <div
        className="hidden sm:block h-8 w-px bg-[#252538] flex-shrink-0"
        aria-hidden="true"
      />

      {/* Publication date */}
      <div className="flex items-center gap-1.5 text-sm !text-slate-300" style={{ color: "#cbd5e1" }}>
        <i className="fas fa-calendar-alt text-xs text-slate-400" aria-hidden="true" />
        <time dateTime={article.publishedAt} className="font-medium" suppressHydrationWarning>
          {formattedDate}
        </time>
        {updatedDate && (
          <span className="text-xs text-slate-500 ml-1">
            (Updated {updatedDate})
          </span>
        )}
      </div>

      {/* Reading time */}
      <div className="flex items-center gap-1.5 text-sm !text-slate-300" style={{ color: "#cbd5e1" }}>
        <i className="fas fa-clock text-xs text-slate-400" aria-hidden="true" />
        <span className="font-medium">{article.readingTime}</span>
      </div>
    </div>
  );
}
