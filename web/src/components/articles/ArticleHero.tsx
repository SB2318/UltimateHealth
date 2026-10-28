import type { Article } from "@/types/article";
import ArticleMeta from "./ArticleMeta";
import ListenTriggerButton from "./listen/ListenTriggerButton";

interface ArticleHeroProps {
  article: Article;
  onListenToggle?: () => void;
  isListening?: boolean;
  isPaused?: boolean;
  listenDurationStr?: string;
  locale?: string;
}

/**
 * Hero section for an article detail page.
 *
 * Layout (desktop & mobile — single centered column):
 *   [Category badge — centered]
 *   [H1 Title — centered]
 *   [Subtitle — centered (if provided)]
 *   [Author • Date • Reading time — centered]
 *   [Listen to Article CTA — centered]
 *   [Hero image — full column width, rounded]
 *   [Tags — centered, wrapping chips with generous gap]
 *   [Divider]
 */
export default function ArticleHero({
  article,
  onListenToggle,
  isListening,
  isPaused,
  listenDurationStr,
  locale,
}: ArticleHeroProps) {
  return (
    <header className="article-hero w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4 text-center">
      {/* ── Category Badge (Centered) ── */}
      {article.category && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/60 mb-4 shadow-sm transition-transform hover:scale-105 select-none">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" aria-hidden="true" />
          <span>{article.category}</span>
        </div>
      )}

      {/* ── Title ── */}
      <h1
        id="article-hero-title"
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.2] tracking-tight mb-4 mx-auto text-center"
      >
        {article.title}
      </h1>

      {/* ── Subtitle (Centered) ── */}
      {article.subtitle && (
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-normal max-w-[720px] mx-auto text-center">
          {article.subtitle}
        </p>
      )}

      {/* ── Author, date, reading time (Centered) ── */}
      <div className="flex justify-center mt-2 mb-4">
        <ArticleMeta article={article} />
      </div>

      {/* ── Listen to Article CTA ── */}
      {onListenToggle && (
        <div className="flex justify-center mb-6">
          <ListenTriggerButton
            variant="hero"
            isPlaying={Boolean(isListening)}
            isPaused={Boolean(isPaused)}
            onClick={onListenToggle}
            durationStr={listenDurationStr}
            locale={locale}
          />
        </div>
      )}

      {/* ── Hero banner image (full column width, rounded) ── */}
      <div
        style={{ marginBottom: "36px" }}
        className="relative overflow-hidden bg-slate-100 dark:bg-[#13131f] aspect-[16/9] md:aspect-[21/9] max-h-[460px] border border-slate-200 dark:border-[#252538] rounded-2xl shadow-xl dark:shadow-2xl"
      >
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";
            }}
          />
        ) : (
          /* Gradient placeholder when no hero image is provided */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-teal-50 to-slate-100 dark:from-teal-950/40 dark:to-slate-900"
            aria-hidden="true"
          >
            <span className="text-6xl opacity-40">❤️</span>
          </div>
        )}
      </div>

      {/* ── Tags: button pills with generous spacing, styled like the card tags ── */}
      {article.tags.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center gap-3 my-8 pt-3 pb-4 px-2"
          aria-label="Article tags"
        >
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "6px 14px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "rgba(13, 148, 136, 0.1)",
                color: "#0d9488",
                border: "1px solid rgba(13, 148, 136, 0.3)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                transition: "all 0.15s ease",
              }}
              className="hover:scale-[1.03] transition-all cursor-default select-none"
            >
              <span style={{ opacity: 0.6, fontWeight: 700 }}>#</span>
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Visual separator */}
      <div
        className="mt-6 mb-12 h-px bg-slate-200 dark:bg-[#252538] mx-auto"
        aria-hidden="true"
      />
    </header>
  );
}
