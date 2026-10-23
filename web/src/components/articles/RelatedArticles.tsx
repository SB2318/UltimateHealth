'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { format, parseISO } from "date-fns";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import type { Article } from "@/types/article";

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const locale = useLocale();
  if (!articles || articles.length === 0) return null;

  return (
    <aside aria-labelledby="related-articles-heading" className="w-full">
      <div
        style={{
          borderTop: "1px solid var(--vice-border, #e2e8f0)",
          background: "var(--vice-dark, #f8fafc)",
          padding: "64px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Section heading */}
          <div style={{ marginBottom: "36px" }}>
            <p
              className="uh-section-label"
              style={{
                color: "#0d9488",
                marginBottom: "8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <BookOpen size={14} /> Continue Reading
            </p>
            <h2
              id="related-articles-heading"
              className="uh-display"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--site-heading, #0f172a)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Related Clinical Guides &amp; Articles
            </h2>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {articles.map((article) => (
              <RelatedArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

interface RelatedArticleCardProps {
  article: Article;
  locale: string;
}

function RelatedArticleCard({ article, locale }: RelatedArticleCardProps) {
  let formattedDate = "";
  try {
    if (article.publishedAt) {
      formattedDate = format(parseISO(article.publishedAt), "MMM d, yyyy");
    }
  } catch {
    formattedDate = "";
  }

  const articleUrl = `/${locale}/articles/${article.id}`;

  return (
    <article
      style={{
        background: "var(--explorer-surface, #ffffff)",
        border: "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--explorer-card-shadow, 0 2px 10px rgba(0,0,0,0.03))",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      className="group hover:-translate-y-1 hover:border-[#0d9488] hover:shadow-[0_8px_30px_rgba(13,148,136,0.12)]"
    >
      {/* Thumbnail */}
      <Link href={articleUrl} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden", background: "var(--explorer-bg, #f1f5f9)" }}>
          {article.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              className="group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src =
                  "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen style={{ width: 32, height: 32, color: "rgba(13,148,136,0.4)" }} />
            </div>
          )}

          {/* Category badge */}
          {article.category && (
            <div style={{ position: "absolute", top: "12px", left: "12px" }}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(6px)",
                  color: "#ffffff",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                }}
              >
                {article.category}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
        <h3
          style={{
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "var(--site-heading, #0f172a)",
            lineHeight: 1.4,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Link
            href={articleUrl}
            style={{ color: "inherit", textDecoration: "none" }}
            className="hover:text-[#0d9488] transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        {article.excerpt && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--explorer-text-secondary, #64748b)",
              lineHeight: 1.6,
              margin: 0,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </p>
        )}

        {/* Footer info: Author + Read time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "12px",
            marginTop: "auto",
            borderTop: "1px solid var(--vice-border, #f1f5f9)",
            fontSize: "0.75rem",
            color: "var(--explorer-text-muted, #94a3b8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: article.author.avatarColor || "#0d9488",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.625rem",
                fontWeight: 700,
              }}
            >
              {article.author.avatarInitials}
            </div>
            <span style={{ fontWeight: 600, color: "var(--explorer-text-secondary, #475569)" }}>
              {article.author.name}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={12} />
            <span>{article.readingTime || "5 min read"}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
