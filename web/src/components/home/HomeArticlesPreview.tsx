/**
 * HomeArticlesPreview — Server Component
 * Fetches the 6 latest articles from the API and renders them on the home page
 * as a professional editorial grid with ISR caching.
 * Keeps Moumita's announcement card pinned at position 1 (editorial spotlight).
 */

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { withBasePath } from "@/lib/basePath";
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

// ── Moumita's pinned announcement card ───────────────────────────────────────
function MoumitaSpotlightCard() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        background: "linear-gradient(135deg, #120e1e 0%, #0f1623 60%, #130d1a 100%)",
        border: "1px solid rgba(244,63,94,0.30)",
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        minHeight: "200px",
        position: "relative",
      }}
    >
      {/* Rose glow blob */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Left: content */}
      <div
        style={{
          flex: 1,
          minWidth: "260px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "14px",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#f43f5e",
              background: "rgba(244,63,94,0.12)",
              border: "1px solid rgba(244,63,94,0.3)",
              padding: "3px 10px",
              borderRadius: "6px",
            }}
          >
            In Memoriam
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#64748b",
              letterSpacing: "0.04em",
            }}
          >
            First Article Announcement
          </span>
        </div>

        <h3
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 800,
            color: "#f8fafc",
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          Dedicated to Dr. Moumita Debnath
        </h3>

        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "#94a3b8",
            margin: 0,
            maxWidth: "520px",
          }}
        >
          Every health article in this library is published in her memory — a young physician
          who believed that dignity and knowledge belong to everyone. Her vision shapes how we
          write, review, and share health information.
        </p>

        <Link
          href={withBasePath("/articles")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#f43f5e",
            fontSize: "0.875rem",
            fontWeight: 700,
            textDecoration: "none",
            marginTop: "4px",
            width: "fit-content",
          }}
        >
          <BookOpen style={{ width: 15, height: 15 }} />
          <span>Read the Articles</span>
          <ArrowRight style={{ width: 14, height: 14 }} />
        </Link>
      </div>

      {/* Right: decorative quote block */}
      <div
        style={{
          width: "260px",
          padding: "36px 32px",
          borderLeft: "1px solid rgba(244,63,94,0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#cbd5e1",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          &ldquo;Because you cannot heal a person you do not respect.&rdquo;
        </p>
        <p style={{ fontSize: "0.75rem", color: "#f43f5e", fontWeight: 600, margin: 0 }}>
          — Vision &amp; Dedication
        </p>
      </div>
    </div>
  );
}

// ── Individual article card ───────────────────────────────────────────────────
function ArticlePreviewCard({ article, featured }: { article: ApiArticle; featured?: boolean }) {
  const thumb = resolveArticleImageUrl(article.imageUtils, {
    title: article.title,
    category: article.tags?.[0]?.name,
  });
  const date = article.publishedDate ? formatDate(article.publishedDate) : "";
  const category = article.tags?.[0]?.name ?? "Health";
  const author = article.authorId?.user_name ?? article.authorName ?? "Health Contributor";

  return (
    <Link
      href={withBasePath(`/articles/${article._id}`)}
      style={{
        background: "#0f111a",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: featured ? "row" : "column",
        textDecoration: "none",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        flexWrap: featured ? "wrap" : undefined,
        minHeight: featured ? "240px" : undefined,
      }}
      className="group hover:-translate-y-1 hover:border-[#2dd4bf] hover:shadow-[0_8px_32px_rgba(45,212,191,0.08)]"
    >
      {/* Thumbnail */}
      {thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={article.title}
          loading="lazy"
          style={{
            width: featured ? "260px" : "100%",
            height: featured ? "100%" : "180px",
            objectFit: "cover",
            flexShrink: 0,
            minHeight: featured ? "200px" : undefined,
          }}
        />
      ) : (
        <div
          style={{
            width: featured ? "260px" : "100%",
            height: featured ? "100%" : "180px",
            minHeight: featured ? "200px" : undefined,
            background:
              "linear-gradient(135deg, rgba(45,212,191,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BookOpen style={{ width: 32, height: 32, color: "rgba(45,212,191,0.3)" }} />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          padding: featured ? "28px 28px" : "20px 20px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Category + reading time */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#2dd4bf",
              background: "rgba(45,212,191,0.08)",
              border: "1px solid rgba(45,212,191,0.18)",
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
                color: "#475569",
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
            fontSize: featured ? "1.1875rem" : "1rem",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: featured ? 3 : 2,
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
              color: "#64748b",
              margin: 0,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: featured ? 4 : 2,
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
            borderTop: "1px solid rgba(255,255,255,0.04)",
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8" }}>
            {author}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#2dd4bf",
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
        color: "#334155",
      }}
    >
      <BookOpen style={{ width: 40, height: 40, margin: "0 auto 16px", opacity: 0.3 }} />
      <p style={{ fontSize: "0.9375rem", margin: 0 }}>
        Articles loading — check back shortly or{" "}
        <Link
          href={withBasePath("/articles")}
          style={{ color: "#2dd4bf", textDecoration: "underline" }}
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
        background: "#080b12",
        borderTop: "1px solid rgba(255,255,255,0.05)",
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
              style={{ color: "#2dd4bf", marginBottom: "10px" }}
            >
              Health Library
            </p>
            <h2
              className="uh-display"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#f1f5f9",
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
                color: "#64748b",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              Community-reviewed health guides written with clarity, peer feedback, and
              respect for the reader.
            </p>
          </div>

          <Link
            href={withBasePath("/articles")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(45,212,191,0.08)",
              border: "1px solid rgba(45,212,191,0.25)",
              color: "#2dd4bf",
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
          {/* ① Moumita's pinned announcement — always first, full width */}
          <MoumitaSpotlightCard />

          {/* ② Real articles from API */}
          {hasArticles ? (
            articles.map((article, i) => (
              <ArticlePreviewCard
                key={article._id}
                article={article}
                featured={i === 0}
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
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p style={{ fontSize: "0.9375rem", color: "#475569", marginBottom: "20px" }}>
              {articles.length < 6
                ? `Showing all ${articles.length} available articles`
                : "Showing 6 of 30+ peer-reviewed guides"}
            </p>
            <Link
              href={withBasePath("/articles")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#2dd4bf",
                color: "#0a0f1a",
                padding: "14px 32px",
                borderRadius: "12px",
                fontSize: "0.9375rem",
                fontWeight: 800,
                textDecoration: "none",
                letterSpacing: "-0.01em",
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
