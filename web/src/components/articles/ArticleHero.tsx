
import type { Article } from "@/types/article";
import ArticleMeta from "./ArticleMeta";

interface ArticleHeroProps {
  article: Article;
}

/**
 * Hero section for an article detail page.
 *
 * Layout (desktop & mobile — single centered column):
 *   [H1 Title — centered]
 *   [Subtitle — centered]
 *   [Author • Date • Reading time — centered]
 *   [Hero image — full column width, rounded]
 *   [Tags — centered, wrapping chips with generous gap]
 *   [Divider]
 *
 * The category badge has been intentionally removed from here
 * because it was overlapping with the sticky navigation header.
 * Category is still shown inside the breadcrumb trail.
 */
export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header className="article-hero w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-2 text-center">

      {/* ── Title ── */}
      <h1
        id="article-hero-title"
        style={{ color: "#f8fafc" }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white leading-[1.2] tracking-tight mb-6 mx-auto text-center"
      >
        {article.title}
      </h1>

      {/* ── Subtitle (Centered) ── */}
      {article.subtitle && (
        <p
          style={{ color: "#94a3b8" }}
          className="text-lg sm:text-xl !text-slate-400 leading-relaxed mb-6 font-light max-w-[720px] mx-auto text-center"
        >
          {article.subtitle}
        </p>
      )}

      {/* ── Author, date, reading time (Centered) ── */}
      <div className="flex justify-center mb-8">
        <ArticleMeta article={article} />
      </div>

      {/* ── Hero banner image (full column width, rounded) ── */}
      <div className="relative overflow-hidden bg-[#13131f] aspect-[16/9] md:aspect-[21/9] max-h-[460px] border border-[#252538] rounded-2xl shadow-2xl mb-6">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Gradient placeholder when no hero image is provided */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-teal-950/40 to-slate-900"
            aria-hidden="true"
          >
            <span className="text-6xl opacity-40">❤️</span>
          </div>
        )}
      </div>

      {/* ── Tags: centered, wrapping, with generous spacing ── */}
      {article.tags.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-3 mb-8 px-2"
          aria-label="Article tags"
        >
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-[#2dd4bf] bg-[#2dd4bf]/10 border border-[#2dd4bf]/25 px-4 py-1.5 rounded-full hover:bg-[#2dd4bf]/20 transition-colors cursor-default whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Visual separator */}
      <div
        className="mb-10 h-px bg-[#252538] mx-auto"
        aria-hidden="true"
      />
    </header>
  );
}