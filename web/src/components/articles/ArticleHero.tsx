
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
    <header className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
      {/* ── Category badge (Centered) ── */}
      <div className="mb-4 flex justify-center">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#2dd4bf] bg-[#2dd4bf]/10 px-3.5 py-1.5 rounded-full border border-[#2dd4bf]/25 shadow-sm">
          {article.category}
        </span>
      </div>

      {/* ── Title (Centered, Editorial) ── */}
      <h1
        style={{ color: "#f8fafc" }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white leading-[1.2] tracking-tight mb-5 max-w-[840px] mx-auto"
      >
        {article.title}
      </h1>

      {/* ── Subtitle (Centered) ── */}
      {article.subtitle && (
        <p
          style={{ color: "#94a3b8" }}
          className="text-lg sm:text-xl !text-slate-400 leading-relaxed mb-6 font-light max-w-[720px] mx-auto"
        >
          {article.subtitle}
        </p>
      )}

      {/* ── Author, date, reading time (Centered) ── */}
      <div className="flex justify-center mb-8">
        <ArticleMeta article={article} />
      </div>

      {/* ── Hero banner image (Centered container with 16/9 aspect and rounded corners) ── */}
      <div className="relative overflow-hidden bg-[#13131f] aspect-[16/9] md:aspect-[21/9] max-h-[460px] border border-[#252538] rounded-2xl shadow-2xl mb-8">
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

      {/* ── Tags (Centered) ── */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6" aria-label="Article tags">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-300 bg-[#13131f] border border-[#252538] px-3.5 py-1.5 rounded-full hover:border-[#2dd4bf]/40 transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Visual separator */}
      <div
        className="mt-6 mb-10 h-px bg-[#252538] max-w-[760px] mx-auto"
        aria-hidden="true"
      />
    </header>
  );
}