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

const FONT_SIZE_MAP: Record<FontSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: Article[];
}

/**
 * Client-side article detail page shell.
 * Owns interactive state (font size, glossary context) and composes all
 * article sub-components into the final page layout.
 */
export default function ArticlePageClient({
  article,
  relatedArticles,
}: ArticlePageClientProps) {
  const [fontSize, setFontSize] = useState<FontSize>("md");

  return (
    <GlossaryProvider terms={defaultGlossaryTerms}>
      {/* Sticky reading progress indicator */}
      <ReadingProgressBar />

      

      <div
        className="min-h-screen bg-white"
        style={
          {
            "--article-sticky-header-height": `${ARTICLE_STICKY_HEADER_HEIGHT_PX}px`,
          } as CSSProperties
        }
      >
        {/* ── Sticky top navigation bar ── */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm rounded-full m-3">
          <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
            {/* Back link */}
            <Link
              href={withBasePath("/articles")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#667eea] hover:text-[#5568d3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] rounded-full px-3 py-2 border border-gray-200 shrink-0"
            >
              <i className="fas fa-arrow-left text-xs" aria-hidden="true" />
              Back to Articles
            </Link>

            {/* Skip navigation for keyboard / screen reader users */}
            <a
              href="#article-body"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-[200px] focus:z-80 focus:px-4 focus:py-1 focus:rounded-full focus:shadow-lg focus:text-[#667eea] focus:font-semibold focus:border-gray-100"
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
            className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:grid lg:grid-cols-[1fr_250px] lg:gap-12"
          >
            <div className="max-w-185 w-full">
              <article
                aria-label={article.title}
                className="[font-size:var(--article-font-size)]"
                style={{ "--article-font-size": `${FONT_SIZE_MAP[fontSize]}px` } as CSSProperties}
              >
                <ArticleContent content={article.content} />
              </article>

              {/* ── Article footer: share + attribution ── */}
              <ArticleFooter article={article} />
            </div>

            {/* ── Table of Contents Sidebar ── */}
            <aside className="hidden lg:block lg:w-[250px]">
              <div className="sticky top-[var(--article-sticky-header-height)] max-h-[calc(100vh-var(--article-sticky-header-height))] overflow-y-auto pr-2">
                <TableOfContents content={article.content} />
              </div>
            </aside>
          </div>
        </main>

        {/* ── Related articles ── */}
        <RelatedArticles articles={relatedArticles} />

        {/* ── Platform footer ── */}
        <ArticlePageFooter />
      </div>

      {/* ── Floating accessibility controls ── */}
      <AccessibilityControls
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
    </GlossaryProvider>
  );
}

// ─── Article footer (post-content) ───────────────────────────────────────────

function ArticleFooter({ article }: { article: Article }) {
  return (
    <footer className="mt-16 pt-10 border-t border-gray-100">
      {/* Author card */}
      <div className="flex items-start gap-4 p-6 bg-[#f7fafc] rounded-2xl border border-gray-100">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0 [background:var(--avatar-bg)]"
          style={{ "--avatar-bg": article.author.avatarColor } as CSSProperties}
          aria-hidden="true"
        >
          {article.author.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[#667eea] mb-1">
            About the Author
          </p>
          <h3 className="font-bold text-[#1a202c] text-lg leading-tight mb-0.5">
            {article.author.name}
          </h3>
          <p className="text-sm text-[#718096]">{article.author.role}</p>
          <p className="text-sm text-[#4a5568] mt-2 leading-relaxed">
            A contributing expert to the UltimateHealth platform, committed to
            delivering evidence-based health information accessible to everyone.
          </p>
        </div>
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#718096] mb-3">
            Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={withBasePath(`/articles?tag=${encodeURIComponent(tag)}`)}
                className="text-sm text-[#667eea] bg-[#667eea]/8 border border-[#667eea]/20 px-4 py-1.5 rounded-full hover:bg-[#667eea]/15 transition-colors font-medium"
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
          href={withBasePath("/articles")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#667eea] hover:text-[#5568d3] transition-colors border border-[#667eea]/30 rounded-full px-6 py-2.5 hover:bg-[#667eea]/5"
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
      <div className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Link
            href={withBasePath("/")}
            className="font-bold text-white hover:text-[#667eea] transition-colors"
          >
            UltimateHealth
          </Link>
          <span>— Open-source health knowledge for everyone</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={withBasePath("/medical-glossary")}
            className="hover:text-[#94a3b8] transition-colors"
          >
            Medical Glossary
          </Link>
          <Link
            href={withBasePath("/contribute")}
            className="hover:text-[#94a3b8] transition-colors"
          >
            Contribute
          </Link>
          <Link
            href={withBasePath("/")}
            className="hover:text-[#94a3b8] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
