"use client";

import { useState, useEffect, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Share2, Check, ArrowUp } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
import type { Article } from "@/types/article";
import { defaultGlossaryTerms } from "@/lib/article-data";
import { GlossaryProvider } from "./GlossaryProvider";
import ReadingProgressBar from "./ReadingProgressBar";
import ArticleHero from "./ArticleHero";
import ArticleContent from "./ArticleContent";
import RelatedArticles from "./RelatedArticles";
import { type FontSize } from "./AccessibilityControls";
import TableOfContents from "./TableOfContents";
import { ARTICLE_STICKY_HEADER_HEIGHT_PX } from "./article-layout.js";
import ScrollToTop from "@/components/ScrollToTop";
import { useArticleSpeech } from "@/hooks/use-article-speech";
import ListenTriggerButton from "./listen/ListenTriggerButton";
import ArticleAudioPlayer from "./listen/ArticleAudioPlayer";
import { ModeToggle } from "@/components/mode-toggle";

const FONT_SIZE_MAP: Record<FontSize, { size: number; lineHeight: number; title: string }> = {
  sm: { size: 15, lineHeight: 1.7, title: "Small text (15px)" },
  md: { size: 18, lineHeight: 1.85, title: "Default text (18px)" },
  lg: { size: 22, lineHeight: 2.0, title: "Large text (22px)" },
};

function cleanArticleHtml(rawHtml?: string): string | undefined {
  if (!rawHtml) return undefined;

  let cleaned = rawHtml;

  // 1. Strip script / style / link / meta / title / doctype tags
  cleaned = cleaned
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<title[\s\S]*?<\/title>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "");

  // 2. Strip comment-delimited chrome sections:
  //    <!-- Navbar -->, <!-- Hero Banner -->, <!-- Footer --> etc.
  //    Removes the comment marker + all content up to the next comment.
  cleaned = cleaned.replace(
    /<!--\s*(?:navbar|nav(?:\s*bar)?|hero(?:\s*banner)?|header|footer|top\s*bar|site\s*(?:header|footer)|breadcrumb)[^-]*-->([\s\S]*?)(?=<!--|$)/gi,
    ""
  );

  // 3. Strip ALL remaining HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");

  // 4. Strip semantic nav / header / footer elements
  cleaned = cleaned
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");

  // 5. Strip divs/sections whose class contains nav/navbar/hero/footer/banner.
  //    Run 5 passes to peel nested elements layer by layer.
  const chromeRe =
    /<(?:div|section|aside)[^>]*class="[^"]*(?:navbar|nav-bar|site-nav|hero(?:-banner|-bg|-section|-wrap)?|banner|page-header|page-footer|site-footer|top-bar|breadcrumb-bar)[^"]*"[\s\S]*?<\/(?:div|section|aside)>/gi;
  for (let i = 0; i < 5; i++) {
    cleaned = cleaned.replace(chromeRe, "");
  }

  // 6. Extract body content if the string is a full HTML document
  const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch?.[1]) {
    cleaned = bodyMatch[1];
  } else {
    cleaned = cleaned.replace(/<\/?(html|head|body)[^>]*>/gi, "");
  }

  // 7. Remove duplicate <h1> (already rendered by ArticleHero above the fold)
  cleaned = cleaned.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, "");

  // 8. Belt-and-suspenders: remove any remaining hero sections by class
  cleaned = cleaned
    .replace(/<section[^>]*class="[^"]*hero[^"]*"[\s\S]*?<\/section>/gi, "")
    .replace(/<div[^>]*class="[^"]*hero[^"]*"[\s\S]*?<\/div>/gi, "");

  // 9. Remove stray plain text before the first HTML tag
  cleaned = cleaned.replace(/^[\s\r\n]*[^<]+?(?=<)/i, "");

  // 10. Unwrap outer <article> / <section> wrapper tags (keep inner content)
  cleaned = cleaned.replace(/<\/?(article|section)[^>]*>/gi, "");

  // 11. Unwrap pure layout container divs from the backend template
  cleaned = cleaned.replace(
    /<div[^>]*class="[^"]*(?:max-w-|prose\s|mx-auto)[^"]*"[^>]*>/gi,
    ""
  );

  // 12. Strip hardcoded inline font-size styles so dynamic font size switching functions cleanly
  cleaned = cleaned.replace(/font-size:\s*[^;"]+;?/gi, "");

  return cleaned.trim();
}

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: Article[];
  /** Raw HTML content fetched from the get-article-content API endpoint */
  htmlContent?: string;
  pbRecordId?: string;
}

/**
 * Client-side article detail page shell.
 * Owns interactive state (font size, glossary context) and composes all
 * article sub-components into the final page layout.
 */
export default function ArticlePageClient({
  article,
  relatedArticles,
  htmlContent,
  pbRecordId,
}: ArticlePageClientProps) {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const knownLocales = ["en", "hi", "bn", "ta", "or", "de", "es", "fr", "hr"];
  const currentLocale = segments.find((s) => knownLocales.includes(s)) || "en";
  const articlesUrl = withBasePath(`/${currentLocale}/articles`);

  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [heroVisible, setHeroVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cleanedHtml = cleanArticleHtml(htmlContent);

  // Modular speech synthesis engine hook
  const speech = useArticleSpeech(article, htmlContent);

  // Load saved font size preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("uh_article_font_size") as FontSize | null;
      if (saved && (saved === "sm" || saved === "md" || saved === "lg")) {
        setFontSize(saved);
      }
    } catch {}
    setMounted(true);
  }, []);

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    try {
      localStorage.setItem("uh_article_font_size", size);
    } catch {}
  };

  const handleShare = async () => {
    let url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof window !== "undefined") {
      const shareId = pbRecordId || article.id;
      url = `${window.location.origin}${articlesUrl}/${shareId}`;
    }
    if (!url) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.title,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  // Show article title in sticky header only after the hero H1 scrolls out of view
  useEffect(() => {
    const hero = document.getElementById("article-hero-title");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <GlossaryProvider terms={defaultGlossaryTerms}>
      {/* Reading progress bar — fixed to very top */}
      <ReadingProgressBar />

      <div
        className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0c0c14] text-slate-800 dark:text-[#f1f5f9] flex flex-col transition-colors duration-150"
        style={
          {
            "--article-sticky-header-height": `${ARTICLE_STICKY_HEADER_HEIGHT_PX}px`,
          } as CSSProperties
        }
      >
        {/* ── Sticky top navigation bar ── */}
        <div className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0c0c14]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#252538] print:hidden shadow-sm dark:shadow-lg dark:shadow-black/40">
          <div className="relative w-full max-w-[880px] mx-auto px-6 sm:px-8 lg:px-10 h-16 flex items-center justify-between gap-4">
            {/* ← Back to articles button with generous padding and bold clear icon */}
            <Link
              href={articlesUrl}
              className="inline-flex items-center gap-2.5 pl-3.5 pr-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#141424] hover:bg-slate-200 dark:hover:bg-[#1e1e36] border border-slate-200 dark:border-[#2a2a44] hover:border-slate-300 dark:hover:border-[#3e3e62] transition-all duration-150 group shrink-0 z-10 shadow-sm"
              aria-label="Back to all articles"
            >
              <ArrowLeft
                size={18}
                strokeWidth={2.5}
                className="text-[#0d9488] dark:text-[#2dd4bf] transition-transform duration-150 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span className="tracking-wide font-medium">Articles</span>
            </Link>

            {/* Middle: Category indicator (at top) or Article Title (when scrolled) */}
            <div className="absolute left-1/2 -translate-x-1/2 max-w-[45%] sm:max-w-[55%] flex items-center justify-center pointer-events-none select-none">
              {heroVisible ? (
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#141422] border border-slate-200 dark:border-[#28283e] transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] dark:bg-[#2dd4bf] animate-pulse" />
                  <span className="truncate">{article.category || "Health Guide"}</span>
                </div>
              ) : (
                <p
                  className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-[#f1f5f9] truncate text-center transition-all duration-300 drop-shadow-sm"
                  title={article.title}
                >
                  {article.title}
                </p>
              )}
            </div>

            {/* Right-side tools: Listen + Font size toggle + Share button + Theme toggle */}
            <div className="flex items-center gap-2 shrink-0 z-10">
              {/* Listen to Article (Quick Header Pill) */}
              <ListenTriggerButton
                variant="header"
                isPlaying={speech.isPlaying}
                isPaused={speech.isPaused}
                onClick={speech.togglePlay}
              />

              {/* Font size segmented switcher */}
              <div
                className="flex items-center bg-slate-100 dark:bg-[#141422] border border-slate-200 dark:border-[#28283e] rounded-lg p-0.5"
                role="group"
                aria-label="Adjust text size"
              >
                {(["sm", "md", "lg"] as FontSize[]).map((size, i) => {
                  const isCurrent = fontSize === size;
                  const config = FONT_SIZE_MAP[size];
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleFontSizeChange(size)}
                      aria-pressed={isCurrent}
                      aria-label={config.title}
                      title={config.title}
                      className={[
                        "w-7 h-7 rounded-md flex items-center justify-center font-bold transition-all duration-150 cursor-pointer",
                        ["text-xs", "text-sm", "text-base"][i],
                        isCurrent
                          ? "bg-[#0d9488]/15 border border-[#0d9488]/50 text-[#0d9488] dark:bg-[#2dd4bf]/20 dark:border-[#2dd4bf]/60 dark:text-[#2dd4bf] shadow-sm"
                          : "border border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-[#1f1f33]",
                      ].join(" ")}
                    >
                      A
                    </button>
                  );
                })}
              </div>

              {/* Share / Copy link button */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share article"
                title={copied ? "Link copied to clipboard!" : "Share article"}
                className="h-8 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#141422] hover:bg-slate-200 dark:hover:bg-[#1f1f33] border border-slate-200 dark:border-[#28283e] hover:border-slate-300 dark:hover:border-[#3e3e5c] transition-all duration-150 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-[#0d9488] dark:text-[#2dd4bf]" />
                    <span className="text-[#0d9488] dark:text-[#2dd4bf] font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} className="text-slate-500 dark:text-slate-400" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              {/* Dark/Light mode toggle */}
              <ModeToggle />
            </div>
          </div>
        </div>

        <main className="w-full">
          {/* ── Hero: title + metadata + listen CTA + image + tags ── */}
          <ArticleHero
            article={article}
            onListenToggle={speech.togglePlay}
            isListening={speech.isPlaying}
            isPaused={speech.isPaused}
            listenDurationStr={speech.totalDurationStr}
          />

          {/* ── Article body: single centered reading column ── */}
          <div
            id="article-body"
            className="w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pb-24"
          >
            <article
              aria-label={article.title}
              className="[font-size:var(--article-font-size)] transition-all duration-200"
              style={
                {
                  "--article-font-size": `${FONT_SIZE_MAP[fontSize].size}px`,
                  "--article-line-height": `${FONT_SIZE_MAP[fontSize].lineHeight}`,
                  marginBottom: "56px",
                } as CSSProperties
              }
              suppressHydrationWarning
            >
              {/* Render real HTML only after client mount to avoid hydration
                  mismatch caused by malformed/unclosed tags in the API response
                  being auto-corrected differently by Node.js vs the browser. */}
              {mounted && cleanedHtml ? (
                <div
                  className="article-html-content prose max-w-none"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                  suppressHydrationWarning
                />
              ) : (
                <ArticleContent content={article.content} />
              )}
            </article>

            {/* ── Article footer: author card + back link ── */}
            <ArticleFooter article={article} />

            {/* ── Table of Contents (only for structured content) ── */}
            {!htmlContent && (
              <aside className="hidden lg:block lg:w-[250px] print:hidden mt-8">
                <div className="sticky top-[var(--article-sticky-header-height)] max-h-[calc(100vh-var(--article-sticky-header-height))] overflow-y-auto pr-2">
                  <TableOfContents content={article.content} />
                </div>
              </aside>
            )}
          </div>
        </main>

        {/* ── Related articles ── */}
        <div className="w-full print:hidden">
          <RelatedArticles articles={relatedArticles} />
        </div>

        {/* ── Page footer ── */}
        <div className="w-full print:hidden">
          <ArticlePageFooter />
        </div>
      </div>

      {/* ── Scroll to top ── */}
      <div className="print:hidden">
        <ScrollToTop />
      </div>

      {/* ── Docked Article Audio Player ── */}
      <ArticleAudioPlayer speech={speech} articleTitle={article.title} />
    </GlossaryProvider>
  );
}

// ─── Article footer (post-content) ─────────────────────────────────────────

function ArticleFooter({ article }: { article: Article }) {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const knownLocales = ["en", "hi", "bn", "ta", "or", "de", "es", "fr", "hr"];
  const currentLocale = segments.find((s) => knownLocales.includes(s)) || "en";
  const articlesUrl = withBasePath(`/${currentLocale}/articles`);

  return (
    <div
      style={{
        marginTop: "72px",
        marginBottom: "36px",
        paddingTop: "40px",
        borderTop: "1px solid var(--explorer-border, #e2e8f0)",
        width: "100%",
      }}
    >
      {/* Author card with explicit vertical margins and padding */}
      <div
        style={{
          marginTop: "24px",
          marginBottom: "40px",
          padding: "28px 24px",
          background: "var(--author-card-bg, #ffffff)",
          border: "1px solid var(--author-card-border, #e2e8f0)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "18px",
          boxShadow: "var(--explorer-card-shadow, 0 4px 20px rgba(0, 0, 0, 0.05))",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "1.1rem",
            fontWeight: 700,
            flexShrink: 0,
            background: article.author.avatarColor,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
          aria-hidden="true"
        >
          {article.author.avatarInitials}
        </div>
        <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <p
            style={{
              margin: "0 0 6px 0",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#0d9488",
            }}
          >
            About the Author
          </p>
          <h3
            style={{
              margin: "0 0 4px 0",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--author-name-color, #0f172a)",
              lineHeight: 1.25,
            }}
          >
            {article.author.name}
          </h3>
          <p
            style={{
              margin: "0 0 12px 0",
              fontSize: "0.85rem",
              color: "var(--vice-muted, #64748b)",
              fontWeight: 500,
            }}
          >
            {article.author.role}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "0.92rem",
              color: "var(--author-bio-color, #475569)",
              lineHeight: 1.7,
            }}
          >
            A contributing expert to the UltimateHealth platform, committed to
            delivering evidence-based health information accessible to everyone.
          </p>
        </div>
      </div>

      {/* Post-article navigation row with explicit vertical margins and padding */}
      <div
        style={{
          marginTop: "40px",
          marginBottom: "24px",
          paddingTop: "28px",
          paddingBottom: "16px",
          borderTop: "1px solid var(--explorer-border, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
        }}
      >
        <Link
          href={articlesUrl}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            background: "var(--btn-bg, #ffffff)",
            border: "1px solid var(--btn-border, #e2e8f0)",
            borderRadius: "12px",
            color: "#0d9488",
            fontSize: "0.875rem",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.15s ease",
          }}
          aria-label="Back to all articles"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2.4}
            style={{ color: "#0d9488" }}
            aria-hidden="true"
          />
          <span>Back to all articles</span>
        </Link>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 18px",
            background: "var(--btn-bg, #ffffff)",
            border: "1px solid var(--btn-border, #e2e8f0)",
            borderRadius: "10px",
            color: "var(--explorer-text-muted, #64748b)",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            transition: "all 0.15s ease",
          }}
        >
          <span>Back to top</span>
          <ArrowUp size={14} style={{ color: "#0d9488" }} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── Minimal page-level footer ─────────────────────────────────────────────

function ArticlePageFooter() {
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const knownLocales = ["en", "hi", "bn", "ta", "or", "de", "es", "fr", "hr"];
  const currentLocale = segments.find((s) => knownLocales.includes(s)) || "en";

  const homeUrl = withBasePath(`/${currentLocale}`);
  const articlesUrl = withBasePath(`/${currentLocale}/articles`);
  const glossaryUrl = withBasePath(`/${currentLocale}/medical-glossary`);
  const contributeUrl = withBasePath(`/${currentLocale}/contribute`);

  return (
    <footer
      style={{
        width: "100%",
        background: "var(--footer-bg, #f8fafc)",
        borderTop: "1px solid var(--footer-border, #e2e8f0)",
        padding: "36px 0 54px",
      }}
    >
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "18px",
        }}
      >
        {/* Brand & tagline (Aligned on the left matching top Back to Articles button) */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "0.85rem",
            color: "var(--explorer-text-muted, #64748b)",
          }}
        >
          <Link
            href={homeUrl}
            style={{
              fontWeight: 700,
              color: "var(--site-heading, #0f172a)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#0d9488";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--site-heading, #0f172a)";
            }}
          >
            UltimateHealth
          </Link>
          <span style={{ color: "#94a3b8" }}>—</span>
          <span>Open-source health knowledge for everyone</span>
        </div>

        {/* Navigation links (Aligned on the right) */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          <Link
            href={articlesUrl}
            style={{ color: "var(--explorer-text-muted, #64748b)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#0d9488";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--explorer-text-muted, #64748b)";
            }}
          >
            All Articles
          </Link>
          <Link
            href={glossaryUrl}
            style={{ color: "var(--explorer-text-muted, #64748b)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#0d9488";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--explorer-text-muted, #64748b)";
            }}
          >
            Medical Glossary
          </Link>
          <Link
            href={contributeUrl}
            style={{ color: "var(--explorer-text-muted, #64748b)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#0d9488";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--explorer-text-muted, #64748b)";
            }}
          >
            Contribute
          </Link>
          <Link
            href={homeUrl}
            style={{ color: "var(--explorer-text-muted, #64748b)", textDecoration: "none", transition: "color 0.15s ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#0d9488";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--explorer-text-muted, #64748b)";
            }}
          >
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
