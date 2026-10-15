
import type { Article } from "@/types/article";
import ArticleMeta from "./ArticleMeta";
import ListenTriggerButton from "./listen/ListenTriggerButton";

interface ArticleHeroProps {
  article: Article;
  onListenToggle?: () => void;
  isListening?: boolean;
  isPaused?: boolean;
  listenDurationStr?: string;
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
export default function ArticleHero({
  article,
  onListenToggle,
  isListening,
  isPaused,
  listenDurationStr,
}: ArticleHeroProps) {
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

      {/* ── Author, date, reading time (Centered) with comfortable vertical spacing ── */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "28px", marginBottom: "20px" }}>
        <ArticleMeta article={article} />
      </div>

      {/* ── Listen to Article CTA ── */}
      {onListenToggle && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <ListenTriggerButton
            variant="hero"
            isPlaying={Boolean(isListening)}
            isPaused={Boolean(isPaused)}
            onClick={onListenToggle}
            durationStr={listenDurationStr}
          />
        </div>
      )}

      {/* ── Hero banner image (full column width, rounded) ── */}
      <div
        style={{ marginBottom: "36px" }}
        className="relative overflow-hidden bg-[#13131f] aspect-[16/9] md:aspect-[21/9] max-h-[460px] border border-[#252538] rounded-2xl shadow-2xl"
      >
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
                background: "rgba(124, 58, 237, 0.15)",
                color: "#c084fc",
                border: "1px solid rgba(124, 58, 237, 0.35)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
                transition: "all 0.15s ease",
              }}
              className="hover:scale-[1.03] hover:bg-violet-900/30 transition-all cursor-default select-none"
            >
              <span style={{ opacity: 0.6, fontWeight: 700 }}>#</span>
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Visual separator */}
      <div
        className="mt-6 mb-12 h-px bg-[#252538] mx-auto"
        aria-hidden="true"
      />
    </header>
  );
}