"use client";

import { useState, useEffect, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const FONT_SIZE_MAP: Record<FontSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
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

  return cleaned.trim();
}

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: Article[];
  /** Raw HTML content fetched from the get-article-content API endpoint */
  htmlContent?: string;
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
}: ArticlePageClientProps) {
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [heroVisible, setHeroVisible] = useState(true);
  // Defer dangerouslySetInnerHTML to client-only to avoid hydration mismatch.
  // The raw API HTML can contain malformed/unclosed tags that browsers
  // auto-correct differently than Node.js, causing SSR ↔ client DOM differences.
  const [mounted, setMounted] = useState(false);
  const cleanedHtml = cleanArticleHtml(htmlContent);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        className="min-h-screen w-full bg-[#0c0c14] text-[#f1f5f9] flex flex-col"
        style={
          {
            "--article-sticky-header-height": `${ARTICLE_STICKY_HEADER_HEIGHT_PX}px`,
          } as CSSProperties
        }
      >
        {/* ── Sticky top navigation bar ── */}
        <div className="sticky top-0 z-50 w-full bg-[#0c0c14]/95 backdrop-blur-md border-b border-[#252538] print:hidden">
          {/* justify-between pins back-btn LEFT and font-controls RIGHT always */}
          <div className="relative w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

            {/* ← Back to articles */}
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 shrink-0 text-sm font-medium text-slate-400 hover:text-[#2dd4bf] transition-colors group z-10"
              aria-label="Back to all articles"
            >
              <i
                className="fas fa-arrow-left text-[11px] transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <span>Articles</span>
            </Link>

            {/* Article title — absolutely centered, fades in after H1 scrolls off */}
            <p
              className={[
                "absolute left-1/2 -translate-x-1/2 max-w-[55%] text-sm font-semibold text-[#e2e8f0] truncate transition-all duration-300 pointer-events-none select-none",
                heroVisible ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0",
              ].join(" ")}
              aria-hidden={heroVisible}
            >
              {article.title}
            </p>

            {/* Font size controls — pinned RIGHT */}
            <div
              className="flex items-center gap-1 shrink-0 print:hidden z-10"
              role="group"
              aria-label="Text size"
            >
              {(["sm", "md", "lg"] as FontSize[]).map((size, i) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  aria-pressed={fontSize === size}
                  aria-label={["Small text", "Default text size", "Large text"][i]}
                  title={["Small", "Medium", "Large"][i]}
                  className={[
                    "w-7 h-7 rounded-md flex items-center justify-center font-bold transition-all duration-150 border",
                    ["text-xs", "text-sm", "text-base"][i],
                    fontSize === size
                      ? "bg-[#2dd4bf]/15 border-[#2dd4bf]/50 text-[#2dd4bf]"
                      : "border-transparent text-slate-500 hover:text-slate-300",
                  ].join(" ")}
                >
                  A
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="w-full">
          {/* ── Hero: title + metadata + image + tags ── */}
          <ArticleHero article={article} />

          {/* ── Article body: single centered reading column ── */}
          <div
            id="article-body"
            className="w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pb-24"
          >
            <article
              aria-label={article.title}
              className="[font-size:var(--article-font-size)]"
              style={{ "--article-font-size": `${FONT_SIZE_MAP[fontSize]}px` } as CSSProperties}
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
    <div className="mt-14 pt-8 border-t border-[#252538]">
      {/* Author card */}
      <div className="flex items-start gap-4 p-5 sm:p-6 bg-[#13131f] rounded-2xl border border-[#252538]">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold shrink-0 [background:var(--avatar-bg)]"
          style={{ "--avatar-bg": article.author.avatarColor } as CSSProperties}
          aria-hidden="true"
        >
          {article.author.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">
            About the Author
          </p>
          <h3 className="font-bold text-[#f8fafc] text-base leading-tight mb-0.5">
            {article.author.name}
          </h3>
          <p className="text-xs text-[#94a3b8]">{article.author.role}</p>
          <p className="text-sm text-[#cbd5e1] mt-2 leading-relaxed">
            A contributing expert to the UltimateHealth platform, committed to
            delivering evidence-based health information accessible to everyone.
          </p>
        </div>
      </div>

      {/* Post-article navigation row */}
      <div className="mt-8 pt-6 border-t border-[#252538]/60 flex items-center justify-between gap-4">
        <Link
          href={articlesUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2dd4bf] hover:text-[#5eead4] transition-colors group"
        >
          <i className="fas fa-arrow-left text-xs transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Back to all articles</span>
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <i className="fas fa-arrow-up text-[10px]" aria-hidden="true" />
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
    <footer className="w-full bg-[#08080f] border-t border-[#252538] text-[#64748b] py-8">
      <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Link
            href={homeUrl}
            className="font-bold text-slate-300 hover:text-[#2dd4bf] transition-colors"
          >
            UltimateHealth
          </Link>
          <span className="text-[#3d4f63]">—</span>
          <span>Open-source health knowledge for everyone</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href={articlesUrl} className="hover:text-slate-300 transition-colors">
            All Articles
          </Link>
          <Link href={glossaryUrl} className="hover:text-slate-300 transition-colors">
            Medical Glossary
          </Link>
          <Link href={contributeUrl} className="hover:text-slate-300 transition-colors">
            Contribute
          </Link>
          <Link href={homeUrl} className="hover:text-slate-300 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
