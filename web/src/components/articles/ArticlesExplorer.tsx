"use client";

import React, { useState, useMemo, CSSProperties } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import { Search, X, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { resolveArticleImageUrl } from "@/lib/article-image";
import { withBasePath } from "@/lib/basePath";
import type { ApiArticle } from "@/types/api-article";

interface ArticlesExplorerProps {
  initialArticles: ApiArticle[];
  locale: string;
}

const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  "en": "English",
  "en-IN": "English",
  "hi": "हिन्दी (Hindi)",
  "hi-IN": "हिन्दी (Hindi)",
  "bn": "বাংলা (Bengali)",
  "bn-IN": "বাংলা (Bengali)",
  "ta": "தமிழ் (Tamil)",
  "ta-IN": "தமிழ் (Tamil)",
  "te": "తెలుగు (Telugu)",
  "te-IN": "తెలుగు (Telugu)",
  "mr": "मराठी (Marathi)",
  "mr-IN": "मराठी (Marathi)",
  "gu": "ગુજરાતી (Gujarati)",
  "gu-IN": "ગુજરાતી (Gujarati)",
  "kn": "ಕನ್ನಡ (Kannada)",
  "kn-IN": "ಕನ್ನಡ (Kannada)",
  "ml": "മലയാളം (Malayalam)",
  "ml-IN": "മലയാളം (Malayalam)",
  "es": "Español (Spanish)",
  "fr": "Français (French)",
  "de": "Deutsch (German)",
};

function formatLanguageName(code: string): string {
  if (!code) return "English";
  if (LANGUAGE_DISPLAY_NAMES[code]) {
    return LANGUAGE_DISPLAY_NAMES[code];
  }
  const prefix = code.split("-")[0]?.toLowerCase();
  if (prefix && LANGUAGE_DISPLAY_NAMES[prefix]) {
    return LANGUAGE_DISPLAY_NAMES[prefix];
  }
  return code.toUpperCase();
}

export default function ArticlesExplorer({ initialArticles, locale }: ArticlesExplorerProps) {
  const t = useTranslations("articles");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFocused, setSearchFocused] = useState(false);
  const itemsPerPage = 9;

  // Extract all distinct languages available in the articles list with counts
  const languageStats = useMemo(() => {
    const counts: Record<string, number> = {};
    initialArticles.forEach((article) => {
      const lang = article.language || "en-IN";
      counts[lang] = (counts[lang] || 0) + 1;
    });

    const list = Object.entries(counts).map(([code, count]) => ({
      code,
      name: formatLanguageName(code),
      count,
    }));

    // Sort by count descending
    list.sort((a, b) => b.count - a.count);
    return list;
  }, [initialArticles]);

  // Filter articles by query and language
  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialArticles.filter((article) => {
      // Language match
      if (selectedLanguage !== "all") {
        const articleLang = (article.language || "en-IN").toLowerCase();
        const selected = selectedLanguage.toLowerCase();
        const matchesExact = articleLang === selected;
        const matchesPrefix = articleLang.split("-")[0] === selected.split("-")[0];
        if (!matchesExact && !matchesPrefix) return false;
      }

      // Search query match
      if (query) {
        const titleMatch = article.title?.toLowerCase().includes(query);
        const descMatch = article.description?.toLowerCase().includes(query);
        const tagMatch = article.tags?.some((tag) => tag.name?.toLowerCase().includes(query));
        const authorMatch =
          article.authorName?.toLowerCase().includes(query) ||
          article.authorId?.user_name?.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !tagMatch && !authorMatch) {
          return false;
        }
      }

      return true;
    });
  }, [initialArticles, searchQuery, selectedLanguage]);

  // Pagination calculation
  const totalArticles = filteredArticles.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / itemsPerPage));
  const activePage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, activePage, itemsPerPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLanguage("all");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("articles-grid-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ width: "100%" }} id="articles-grid-top">
      {/* ── Search & Language Filter Controls Card ── */}
      <div
        style={{
          background: "#13131f",
          border: "1px solid #252538",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "36px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Search Bar Row */}
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Search size={18} color={searchFocused ? "#00e5ff" : "#94a3b8"} />
          </div>

          <input
            type="text"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#0c0c14",
              border: searchFocused ? "1.5px solid #00e5ff" : "1.5px solid #252538",
              borderRadius: "14px",
              padding: "14px 44px 14px 46px",
              fontSize: "0.95rem",
              color: "#f1f5f9",
              outline: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxShadow: searchFocused ? "0 0 16px rgba(0, 229, 255, 0.15)" : "none",
            }}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                borderRadius: "6px",
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Language Filter Row */}
        <div
          style={{
            borderTop: "1px solid #1f1f30",
            paddingTop: "18px",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginRight: "6px",
              color: "#94a3b8",
              fontSize: "0.82rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            <Globe size={15} color="#00e5ff" />
            <span>{t("filterLanguage")}:</span>
          </div>

          {/* All Languages Tab */}
          <button
            type="button"
            onClick={() => handleLanguageChange("all")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "50px",
              fontSize: "0.82rem",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: selectedLanguage === "all" ? "1px solid transparent" : "1px solid #252538",
              background:
                selectedLanguage === "all"
                  ? "linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)"
                  : "#0c0c14",
              color: selectedLanguage === "all" ? "#ffffff" : "#94a3b8",
              boxShadow:
                selectedLanguage === "all" ? "0 4px 16px rgba(0, 229, 255, 0.25)" : "none",
            }}
          >
            <span>{t("allLanguages")}</span>
            <span
              style={{
                fontSize: "0.72rem",
                fontFamily: "monospace",
                padding: "2px 7px",
                borderRadius: "20px",
                background: selectedLanguage === "all" ? "rgba(255, 255, 255, 0.25)" : "#1e1e30",
                color: selectedLanguage === "all" ? "#ffffff" : "#94a3b8",
              }}
            >
              {initialArticles.length}
            </span>
          </button>

          {/* Individual Language Tabs */}
          {languageStats.map((item) => {
            const isSelected = selectedLanguage === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => handleLanguageChange(item.code)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "50px",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: isSelected ? "1px solid #00e5ff" : "1px solid #252538",
                  background: isSelected ? "#00e5ff" : "#0c0c14",
                  color: isSelected ? "#0a0a14" : "#94a3b8",
                  boxShadow: isSelected ? "0 4px 16px rgba(0, 229, 255, 0.3)" : "none",
                }}
              >
                <span>{item.name}</span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "monospace",
                    padding: "2px 7px",
                    borderRadius: "20px",
                    background: isSelected ? "rgba(0, 0, 0, 0.25)" : "#1e1e30",
                    color: isSelected ? "#0a0a14" : "#94a3b8",
                    fontWeight: isSelected ? 900 : 700,
                  }}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results Summary Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #252538",
          paddingBottom: "18px",
          marginBottom: "36px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#f1f5f9",
              margin: 0,
              fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
            }}
          >
            {t("allArticles")}
          </h2>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: "50px",
              background: "rgba(0, 229, 255, 0.12)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              color: "#00e5ff",
              letterSpacing: "0.04em",
            }}
          >
            {totalArticles === 1
              ? t("showingSingleCount", { count: 1 })
              : t("showingCount", { count: totalArticles, total: initialArticles.length })}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {(searchQuery || selectedLanguage !== "all") && (
            <button
              type="button"
              onClick={clearAllFilters}
              style={{
                background: "transparent",
                border: "none",
                color: "#f0006a",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              {t("clearFilters")}
            </button>
          )}

          {totalPages > 1 && (
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#64748b",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              {t("pageOf", { current: activePage, total: totalPages })}
            </span>
          )}
        </div>
      </div>

      {/* ── Articles Grid / Empty State ── */}
      {paginatedArticles.length === 0 ? (
        <div
          style={{
            background: "#13131f",
            border: "1.5px dashed #252538",
            borderRadius: "20px",
            padding: "64px 32px",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
          <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px" }}>
            {t("noResults")}
          </p>
          <p style={{ fontSize: "0.9rem", color: "#64748b", maxWidth: "480px", margin: "0 auto 24px" }}>
            {t("noResultsSuggestion")}
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0, 229, 255, 0.25)",
            }}
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {paginatedArticles.map((article) => (
            <ArticleCard key={article._id} article={article} locale={locale} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* Previous */}
          {activePage > 1 ? (
            <button
              type="button"
              onClick={() => handlePageChange(activePage - 1)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#f1f5f9",
                background: "#13131f",
                border: "1px solid #252538",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={16} />
              {t("previous")}
            </button>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#475569",
                background: "#0c0c14",
                border: "1px solid #1a1a28",
                borderRadius: "10px",
                cursor: "not-allowed",
              }}
            >
              <ChevronLeft size={16} />
              {t("previous")}
            </span>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === activePage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePageChange(p)}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: isCurrent ? "#7c3aed" : "#13131f",
                  color: isCurrent ? "#ffffff" : "#94a3b8",
                  border: isCurrent ? "1px solid #a78bfa" : "1px solid #252538",
                  boxShadow: isCurrent ? "0 4px 14px rgba(124, 58, 237, 0.4)" : "none",
                }}
              >
                {p}
              </button>
            );
          })}

          {/* Next */}
          {activePage < totalPages ? (
            <button
              type="button"
              onClick={() => handlePageChange(activePage + 1)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#f1f5f9",
                background: "#13131f",
                border: "1px solid #252538",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              {t("next")}
              <ChevronRight size={16} />
            </button>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#475569",
                background: "#0c0c14",
                border: "1px solid #1a1a28",
                borderRadius: "10px",
                cursor: "not-allowed",
              }}
            >
              {t("next")}
              <ChevronRight size={16} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, locale }: { article: ApiArticle; locale: string }) {
  const t = useTranslations("articles");

  const date = article.publishedDate
    ? format(parseISO(article.publishedDate), "MMM d, yyyy")
    : "Recent";

  const imageUrl = resolveArticleImageUrl(article.imageUtils, {
    title: article.title,
    category: article.tags?.[0]?.name,
  });

  const languageBadge = formatLanguageName(article.language);
  const articleHref = withBasePath(`/${locale}/articles/${article._id}`);

  return (
    <Link
      href={articleHref}
      style={{
        background: "#13131f",
        border: "1px solid #252538",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      className="group hover:-translate-y-1 hover:border-[#00e5ff]"
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "#0c0c14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt={article.title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 229, 255, 0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
            }}
          >
            📋
          </div>
        )}

        {/* Language Badge overlay on thumbnail */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(12, 12, 20, 0.88)",
            border: "1px solid rgba(0, 229, 255, 0.35)",
            color: "#00e5ff",
            padding: "3px 10px",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.04em",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          <Globe size={11} />
          <span>{languageBadge}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
          {article.tags?.length > 0 ? (
            article.tags.map((tag) => (
              <span
                key={tag._id}
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "rgba(124, 58, 237, 0.15)",
                  color: "#a78bfa",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#94a3b8",
              }}
            >
              {t("generalTag")}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1.35,
            marginBottom: "10px",
          }}
        >
          {article.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "#94a3b8",
            lineHeight: 1.6,
            flex: 1,
            marginBottom: "20px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.description}
        </p>

        {/* Footer Meta */}
        <div
          style={{
            paddingTop: "14px",
            borderTop: "1px solid #252538",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.78rem",
            color: "#64748b",
          }}
        >
          <span style={{ fontWeight: 600, color: "#cbd5e1" }}>
            {article.authorId?.user_name || article.authorName || t("communityAuthor")}
          </span>
          <time dateTime={article.publishedDate}>{date}</time>
        </div>
      </div>
    </Link>
  );
}
