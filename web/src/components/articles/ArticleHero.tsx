import Image from "next/image";
import type { Article } from "@/types/article";
import ArticleMeta from "./ArticleMeta";

interface ArticleHeroProps {
  article: Article;
}

/**
 * Full-width hero section for an article page.
 *
 * Desktop layout:
 *   [Full-width hero image]
 *   [Category badge]
 *   [H1 Title]
 *   [Subtitle]
 *   [Author • Date • Reading time]
 *   [Tags]
 *
 * Mobile: Identical structure, stacked vertically with adjusted typography.
 */
export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header>
      {/* ── Hero image ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2] aspect-[16/9] md:aspect-[2.4/1] border-2 border-slate-400 mx-4 sm:mx-6 lg:mx-10 mt-3 rounded-3xl">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          /* Gradient placeholder when no hero image is provided */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            aria-hidden="true"
          >
            <span className="text-6xl opacity-40">❤️</span>
          </div>
        )}
        {/* Bottom gradient overlay for smooth transition */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
          aria-hidden="true"
        />
      </div>

      {/* ── Article metadata ── */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 mt-8 pb-2">
        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#667eea] bg-[#667eea]/10 px-3 py-1.5 rounded-full border border-[#667eea]/20">
            {article.category}
          </span>
        </div>

        {/* Title — semantic H1, only one per page */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a202c] leading-[1.15] tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="text-lg sm:text-xl text-[#4a5568] leading-relaxed mb-8 font-light">
            {article.subtitle}
          </p>
        )}

        {/* Author, date, reading time */}
        <ArticleMeta article={article} />

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6" aria-label="Article tags">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#718096] bg-gray-50 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Visual separator */}
        <div
          className="mt-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}