"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import type { Article } from "@/types/article";
import { withBasePath } from "@/lib/basePath";
import { defaultGlossaryTerms } from "@/lib/article-data";
import { GlossaryProvider } from "./GlossaryProvider";
import ReadingProgressBar from "./ReadingProgressBar";
import ArticleBreadcrumbs from "./ArticleBreadcrumbs";
import ArticleHero from "./ArticleHero";
import ArticleContent from "./ArticleContent";
import RelatedArticles from "./RelatedArticles";
import AccessibilityControls, { type FontSize } from "./AccessibilityControls";
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

  // 1. Strip script tags completely (e.g. Tailwind CDN injected in HTML)
  cleaned = cleaned.replace(/<script[\s\S]*?<\/script>/gi, "");

  // 2. Strip style and link tags from head/body
  cleaned = cleaned
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<link[\s\S]*?>/gi, "");

  // 3. Extract body content if wrapped in full HTML document
  const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) {
    cleaned = bodyMatch[1];
  } else {
    cleaned = cleaned
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "");
  }

  // 4. Remove redundant header or hero section (such as <section class="hero...">...</section> or <header>...</header>)
  cleaned = cleaned
    .replace(/<section[^>]*class=["'][^"']*hero[^"']*["'][\s\S]*?<\/section>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "");

  // 5. Remove any top-level duplicate <h1> inside article content (already rendered by ArticleHero)
  cleaned = cleaned.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");

  // 6. Remove stray plain text before the first HTML tag (e.g. raw title strings like "\n\nHemophilia\n\n<article>")
  cleaned = cleaned.replace(/^[\s\r\n]*[^<]+?(?=<)/i, "");

  // 7. Unwrap outer <article> or generic wrapper tags
  cleaned = cleaned.trim();
  cleaned = cleaned.replace(/^<article[^>]*>/i, "").replace(/<\/article>$/i, "");

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
  const cleanedHtml = cleanArticleHtml(htmlContent);

  return (
    <GlossaryProvider terms={defaultGlossaryTerms}>
      {/* Sticky reading progress indicator */}
      <div className="print:hidden">
      <ReadingProgressBar />
      </div>

      <div
        className="min-h-screen bg-[#0c0c14] text-[#f1f5f9]"
        style={
          {
            "--article-sticky-header-height": `${ARTICLE_STICKY_HEADER_HEIGHT_PX}px`,
          } as CSSProperties
        }
      >
        {/* ── Sticky top navigation bar ── */}
        <div className="sticky top-0 z-50 bg-[#0c0c14]/90 backdrop-blur-md border-b border-[#252538] shadow-lg transition-all">
          <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            {/* Back link */}
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-[#2dd4bf] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2dd4bf] rounded-lg px-3 py-1.5 border border-[#252538] hover:border-[#2dd4bf]/40 bg-[#13131f] shrink-0"
            >
              <i className="fas fa-arrow-left text-[11px]" aria-hidden="true" />
              Articles
            </Link>

            {/* Skip navigation for keyboard / screen reader users */}
            <a
              href="#article-body"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-[200px] focus:z-80 focus:px-4 focus:py-1 focus:rounded-full focus:shadow-lg focus:text-[#2dd4bf] focus:font-semibold focus:border-[#252538] focus:bg-[#13131f]"
            >
              Skip to article content
            </a>

            <ArticleBreadcrumbs
              category={article.category}
              title={article.title}
            />
          </div>
        </div> 

        <main>
          {/* ── Hero: image + title + metadata ── */}
          <ArticleHero article={article} />

          {/* ── Article body ── */}
          <div
            id="article-body"
            className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          >
            <div className="max-w-[760px] w-full mx-auto">
              <article
                aria-label={article.title}
                className="[font-size:var(--article-font-size)]"
                style={{ "--article-font-size": `${FONT_SIZE_MAP[fontSize]}px` } as CSSProperties}
              >
                {cleanedHtml ? (
                  /* Cleaned HTML from the API — stripped of outer headers/html/body wrappers */
                  <div
                    className="article-html-content prose max-w-none"
                    // The HTML comes from UH's own backend; content is controlled
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                  />
                ) : (
                  <ArticleContent content={article.content} />
                )}
              </article>

              {/* ── Article footer: share + attribution ── */}
              <ArticleFooter article={article} />
            </div>

            {/* ── Table of Contents Sidebar (only for structured content) ── */}
            {!htmlContent && (
              <aside className="hidden lg:block lg:w-[250px] print:hidden">
                <div className="sticky top-[var(--article-sticky-header-height)] max-h-[calc(100vh-var(--article-sticky-header-height))] overflow-y-auto pr-2">
                  <TableOfContents content={article.content} />
                </div>
              </aside>
            )}
          </div>
        </main>

        {/* ── Related articles ── */}
        <div className="print:hidden">
        <RelatedArticles articles={relatedArticles} />
        </div>
        {/* ── Platform footer ── */}
        <div className="print:hidden">
        <ArticlePageFooter />
        </div>
      </div>
      {/* ── Floating print/export button ── */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-300 flex items-center justify-center text-[#4c51bf] hover:bg-[#4c51bf] hover:text-white transition-colors print:hidden"
        aria-label="Print or save article as PDF"
        title="Print / Save as PDF"
      >
      <i className="fas fa-print text-lg" aria-hidden="true" />
      </button>
      {/* ── Floating accessibility controls ── */}
      <div className="print:hidden">
      <AccessibilityControls
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
      </div>
      <div className="print:hidden">
        <ScrollToTop />
      </div>
    </GlossaryProvider>
  );
}

// ─── Article footer (post-content) ───────────────────────────────────────────

function ArticleFooter({ article }: { article: Article }) {
  return (
    <footer className="mt-16 pt-10 border-t border-[#252538]">
      {/* Author card */}
      <div className="flex items-start gap-4 p-6 bg-[#13131f] rounded-2xl border border-[#252538]">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 [background:var(--avatar-bg)]"
          style={{ "--avatar-bg": article.author.avatarColor } as CSSProperties}
          aria-hidden="true"
        >
          {article.author.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-1">
            About the Author
          </p>
          <h3 className="font-bold text-[#f8fafc] text-lg leading-tight mb-0.5">
            {article.author.name}
          </h3>
          <p className="text-sm text-[#94a3b8]">{article.author.role}</p>
          <p className="text-sm text-[#cbd5e1] mt-2 leading-relaxed">
            A contributing expert to the UltimateHealth platform, committed to
            delivering evidence-based health information accessible to everyone.
          </p>
        </div>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">
            Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                className="text-xs text-[#2dd4bf] bg-[#2dd4bf]/10 border border-[#2dd4bf]/25 px-3.5 py-1.5 rounded-full hover:bg-[#2dd4bf]/20 transition-colors font-medium"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2dd4bf] hover:bg-[#2dd4bf]/10 transition-colors border border-[#2dd4bf]/30 rounded-full px-6 py-2.5 bg-[#13131f]"
        >
          <i className="fas fa-arrow-left text-xs" aria-hidden="true" />
          Back to All Articles
        </Link>
      </div>
    </footer>
  );
}

// ─── Minimal page-level footer ────────────────────────────────────────────────

function ArticlePageFooter() {
  return (
    <div className="bg-[#0f172a] text-[#64748b] py-8">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-bold text-white hover:text-[#667eea] transition-colors"
          >
            UltimateHealth
          </Link>
          <span>— Open-source health knowledge for everyone</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/medical-glossary"
            className="hover:text-[#94a3b8] transition-colors"
          >
            Medical Glossary
          </Link>
          <Link
            href="/contribute"
            className="hover:text-[#94a3b8] transition-colors"
          >
            Contribute
          </Link>
          <Link
            href="/"
            className="hover:text-[#94a3b8] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
