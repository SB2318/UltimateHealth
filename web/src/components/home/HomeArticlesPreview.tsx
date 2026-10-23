/**
 * HomeArticlesPreview — Server Component
 * Fetches the 6 latest articles from the API and renders them on the home page
 * as a professional editorial grid with ISR caching.
 * Keeps Moumita's announcement card pinned at position 1 (editorial spotlight).
 */

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import type { ApiArticle } from "@/types/api-article";
import { format, parseISO } from "date-fns";

async function fetchLatestArticles(): Promise<ApiArticle[]> {
  try {
    const res = await fetch("https://ultimatehealth.blog/api/articles/?page=1&limit=6", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const articles: ApiArticle[] = data.articles ?? (Array.isArray(data) ? data : []);
    return articles.slice(0, 6);
  } catch {
    return [];
  }
}

import { resolveArticleImageUrl } from "@/lib/article-image";

function formatDate(iso: string): string {
  try {
    return format(parseISO(iso), "MMM d, yyyy");
  } catch {
    return "";
  }
}



// ── Individual article card ───────────────────────────────────────────────────
function ArticlePreviewCard({ article }: { article: ApiArticle }) {
  const thumb = resolveArticleImageUrl(article.imageUtils, {
    title: article.title,
    category: article.tags?.[0]?.name,
  });
  const date = article.publishedDate ? formatDate(article.publishedDate) : "";
  const category = article.tags?.[0]?.name ?? "Health";
  const author = article.authorId?.user_name ?? article.authorName ?? "Health Contributor";

  return (
    <Link
      href={`/articles/${article.pb_recordId || article._id}`}
      style={{
        background: "var(--explorer-surface, #ffffff)",
        border: "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
      }}
      className="group hover:-translate-y-1 hover:border-[#0d9488] hover:shadow-[0_8px_32px_rgba(13,148,136,0.12)]"
    >
      {/* Thumbnail */}
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={article.title}
          loading="lazy"
          style={{ width: "100%", height: "180px", objectFit: "cover", flexShrink: 0 }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "180px",
            background: "var(--explorer-bg, #f1f5f9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BookOpen style={{ width: 32, height: 32, color: "rgba(13,148,136,0.4)" }} />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          padding: "20px 20px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Category + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#0d9488",
              background: "rgba(13,148,136,0.08)",
              border: "1px solid rgba(13,148,136,0.2)",
              padding: "2px 8px",
              borderRadius: "5px",
            }}
          >
            <Tag style={{ width: 9, height: 9 }} />
            {category}
          </span>
          {date && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.6875rem",
                color: "var(--explorer-text-muted, #64748b)",
              }}
            >
              <Clock style={{ width: 9, height: 9 }} />
              {date}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--site-heading, #0f172a)",
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.description && (
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.65,
              color: "var(--explorer-text-secondary, #475569)",
              margin: 0,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.description}
          </p>
        )}

        {/* Author footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "1px solid var(--explorer-border, #e2e8f0)",
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--explorer-text-muted, #64748b)" }}>
            {author}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#0d9488",
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
            className="group-hover:opacity-100"
          >
            Read <ArrowRight style={{ width: 11, height: 11 }} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Empty / fallback state ───────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        textAlign: "center",
        padding: "64px 24px",
        color: "var(--explorer-text-muted, #64748b)",
      }}
    >
      <BookOpen style={{ width: 40, height: 40, margin: "0 auto 16px", opacity: 0.3 }} />
      <p style={{ fontSize: "0.9375rem", margin: 0 }}>
        Articles loading — check back shortly or{" "}
        <Link
          href="/articles"
          style={{ color: "#0d9488", textDecoration: "underline" }}
        >
          browse the full library
        </Link>
        .
      </p>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default async function HomeArticlesPreview() {
  const articles = await fetchLatestArticles();
  const hasArticles = articles.length > 0;

  return (
    <section
      id="articles-preview"
      style={{
        background: "var(--vice-dark, #ffffff)",
        borderTop: "1px solid var(--vice-border, #e2e8f0)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          className="scroll-reveal"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div>
            <p
              className="uh-section-label"
              style={{ color: "#0d9488", marginBottom: "10px" }}
            >
              Health Library
            </p>
            <h2
              className="uh-display"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--site-heading, #0f172a)",
                margin: "0 0 10px 0",
                letterSpacing: "-0.025em",
              }}
            >
              Latest Articles
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "var(--vice-muted, #475569)",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              Health guides reviewed by our admin team with clarity, clinical moderation, and
              respect for the reader.
            </p>
          </div>

          <Link
            href="/articles"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(13,148,136,0.08)",
              border: "1px solid rgba(13,148,136,0.25)",
              color: "#0d9488",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            All Articles <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Real articles from API */}
          {hasArticles ? (
            articles.map((article) => (
              <ArticlePreviewCard
                key={article._id}
                article={article}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Bottom CTA */}
        {hasArticles && (
          <div
            style={{
              textAlign: "center",
              marginTop: "48px",
              paddingTop: "40px",
              borderTop: "1px solid var(--explorer-border, #e2e8f0)",
            }}
          >
            <p style={{ fontSize: "0.9375rem", color: "var(--explorer-text-secondary, #475569)", marginBottom: "20px" }}>
              {articles.length < 6
                ? `Showing all ${articles.length} available articles`
                : "Showing 6 of 30+ admin-reviewed guides"}
            </p>
            <Link
              href="/articles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#0d9488",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: "12px",
                fontSize: "0.9375rem",
                fontWeight: 800,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: "0 4px 16px rgba(13, 148, 136, 0.25)",
                transition: "opacity 0.2s ease",
              }}
            >
              <BookOpen style={{ width: 16, height: 16 }} />
              Browse Full Library
              <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
