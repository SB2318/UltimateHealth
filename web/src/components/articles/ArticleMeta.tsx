import { format, parseISO } from "date-fns";
import { Calendar, Clock } from "lucide-react";
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
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-3 sm:py-4 ${className}`}
    >
      {/* Author avatar + name/role */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 select-none shadow-sm"
          style={{ background: article.author.avatarColor }}
          aria-hidden="true"
        >
          {article.author.avatarInitials}
        </div>
        <div className="leading-tight text-left">
          <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            {article.author.name}
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {article.author.role}
          </p>
        </div>
      </div>

      {/* Vertical divider (desktop only) */}
      <div
        className="hidden sm:block h-7 w-px bg-slate-300 dark:bg-slate-700 flex-shrink-0"
        aria-hidden="true"
      />

      {/* Publication date */}
      <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <Calendar size={15} className="text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
        <time dateTime={article.publishedAt} className="font-medium" suppressHydrationWarning>
          {formattedDate}
        </time>
        {updatedDate && (
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1" suppressHydrationWarning>
            (Updated {updatedDate})
          </span>
        )}
      </div>

      {/* Reading time */}
      <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <Clock size={15} className="text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
        <span className="font-medium">{article.readingTime}</span>
      </div>
    </div>
  );
}
