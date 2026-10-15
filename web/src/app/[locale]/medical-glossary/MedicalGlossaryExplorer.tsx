"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, X, Globe, Filter } from "lucide-react";
import { glossaryEntries } from "./glossary-data";
import {
  HINDI_GLOSSARY_ENTRIES,
  BENGALI_GLOSSARY_ENTRIES,
  LocalizedGlossaryEntry,
} from "./glossary-translations";

/* ── Category badge colors — work on both light & dark backgrounds ── */
const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  "Blood Health":          { bg: "rgba(225,29,72,0.10)",   color: "#e11d48" },
  "Cardiovascular Health": { bg: "rgba(220,38,38,0.10)",   color: "#dc2626" },
  "Respiratory Health":    { bg: "rgba(37,99,235,0.10)",   color: "#2563eb" },
  "Digestive Health":      { bg: "rgba(217,119,6,0.10)",   color: "#d97706" },
  "Metabolic Health":      { bg: "rgba(234,88,12,0.10)",   color: "#ea580c" },
  "Mental Health":         { bg: "rgba(124,58,237,0.10)",  color: "#7c3aed" },
  "Neurological Health":   { bg: "rgba(147,51,234,0.10)",  color: "#9333ea" },
  "Immune Health":         { bg: "rgba(22,163,74,0.10)",   color: "#16a34a" },
  "Bone & Joint Health":   { bg: "rgba(202,138,4,0.10)",   color: "#ca8a04" },
  "Skin Health":           { bg: "rgba(219,39,119,0.10)",  color: "#db2777" },
  "Liver Health":          { bg: "rgba(101,163,13,0.10)",  color: "#65a30d" },
  "Urinary Health":        { bg: "rgba(8,145,178,0.10)",   color: "#0891b2" },
  "Nutrition":             { bg: "rgba(13,148,136,0.10)",  color: "#0d9488" },
  "Sleep Health":          { bg: "rgba(79,70,229,0.10)",   color: "#4f46e5" },
  "Preventive Health":     { bg: "rgba(5,150,105,0.10)",   color: "#059669" },
  "Diagnostic Testing":    { bg: "rgba(71,85,105,0.10)",   color: "#475569" },
  "Infectious Diseases":   { bg: "rgba(185,28,28,0.10)",   color: "#b91c1c" },
  "Oncology":              { bg: "rgba(162,28,175,0.10)",  color: "#a21caf" },
};
const DEFAULT_BADGE = { bg: "rgba(71,85,105,0.10)", color: "#475569" };

function RelatedTermButton({ term, onClick }: { term: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View related term: ${term}`}
      style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "var(--explorer-text-secondary, #64748b)",
        background: "var(--explorer-surface, #f1f5f9)",
        border: "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "8px",
        padding: "3px 10px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--explorer-surface-hover, #e2e8f0)";
        (e.currentTarget as HTMLElement).style.borderColor = "#0d9488";
        (e.currentTarget as HTMLElement).style.color = "#0d9488";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--explorer-surface, #f1f5f9)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--explorer-border, #e2e8f0)";
        (e.currentTarget as HTMLElement).style.color = "var(--explorer-text-secondary, #64748b)";
      }}
    >
      {term}
    </button>
  );
}

function RelatedTermsList({
  currentTerm,
  relatedTerms,
  onTermClick,
  label,
}: {
  currentTerm: string;
  relatedTerms?: string[];
  onTermClick: (term: string) => void;
  label: string;
}) {
  const filteredRelated = useMemo(() => {
    return Array.from(new Set(relatedTerms || [])).filter(
      (t) => t.toLowerCase() !== currentTerm.toLowerCase()
    );
  }, [relatedTerms, currentTerm]);

  if (filteredRelated.length === 0) return null;

  return (
    <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--explorer-border, #e2e8f0)" }}>
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--explorer-text-muted, #94a3b8)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {filteredRelated.map((term) => (
          <RelatedTermButton key={term} term={term} onClick={() => onTermClick(term)} />
        ))}
      </div>
    </div>
  );
}

export default function MedicalGlossaryExplorer() {
  const t = useTranslations("glossary");
  const tArticles = useTranslations("articles");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchFocused, setSearchFocused] = useState(false);

  // Combine all glossary entries with language tags
  const allEntries: LocalizedGlossaryEntry[] = useMemo(() => {
    const english: LocalizedGlossaryEntry[] = glossaryEntries.map((e) => ({
      ...e,
      language: "en",
      languageName: "English",
    }));

    const hindi: LocalizedGlossaryEntry[] = HINDI_GLOSSARY_ENTRIES.map((e) => ({
      ...e,
      language: "hi",
      languageName: "हिन्दी (Hindi)",
    }));

    const bengali: LocalizedGlossaryEntry[] = BENGALI_GLOSSARY_ENTRIES.map((e) => ({
      ...e,
      language: "bn",
      languageName: "বাংলা (Bengali)",
    }));

    return [...english, ...hindi, ...bengali];
  }, []);

  // Language stats
  const languageStats = useMemo(() => {
    const counts: Record<string, { name: string; count: number }> = {
      en: { name: "English", count: glossaryEntries.length },
      hi: { name: "हिन्दी (Hindi)", count: HINDI_GLOSSARY_ENTRIES.length },
      bn: { name: "বাংলা (Bengali)", count: BENGALI_GLOSSARY_ENTRIES.length },
    };

    return Object.entries(counts).map(([code, item]) => ({
      code,
      name: item.name,
      count: item.count,
    }));
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allEntries.map((e) => e.category))).sort()],
    [allEntries]
  );

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allEntries.filter((entry) => {
      // Language filter
      if (selectedLanguage !== "all" && entry.language !== selectedLanguage) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && entry.category !== selectedCategory) {
        return false;
      }

      // Search query match
      if (q) {
        const matchesTerm = entry.term.toLowerCase().includes(q);
        const matchesDef = entry.definition.toLowerCase().includes(q);
        const matchesRelated = entry.relatedTerms?.some((r) => r.toLowerCase().includes(q));
        if (!matchesTerm && !matchesDef && !matchesRelated) {
          return false;
        }
      }

      return true;
    });
  }, [allEntries, searchQuery, selectedCategory, selectedLanguage]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLanguage("all");
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
        {/* ── Search & Filter Controls Card ── */}
        <div
          style={{
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.06))",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Row 1: Search Bar & Category Dropdown */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
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
                <Search size={18} color={searchFocused ? "#0d9488" : "#94a3b8"} />
              </div>

              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  height: "50px",
                  background: "var(--explorer-bg, #f8fafc)",
                  border: searchFocused ? "1.5px solid #0d9488" : "1.5px solid var(--explorer-border, #e2e8f0)",
                  borderRadius: "14px",
                  paddingLeft: "46px",
                  paddingRight: "40px",
                  fontSize: "0.95rem",
                  color: "var(--explorer-text-primary, #0f172a)",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: searchFocused ? "0 0 16px rgba(13, 148, 136, 0.15)" : "none",
                }}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--explorer-text-secondary, #94a3b8)",
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

            {/* Category Dropdown */}
            <div style={{ width: "220px", minWidth: "180px", position: "relative" }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  height: "50px",
                  paddingLeft: "16px",
                  paddingRight: "40px",
                  borderRadius: "14px",
                  border: "1.5px solid var(--explorer-border, #e2e8f0)",
                  background: "var(--explorer-bg, #f8fafc)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--explorer-text-primary, #0f172a)",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#0d9488";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--explorer-border, #e2e8f0)";
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? `${t("categoryAll")} Categories` : cat}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "var(--explorer-text-muted, #94a3b8)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Filter size={15} />
              </div>
            </div>
          </div>

          {/* Row 2: Language Filter Pills Bar */}
          <div
            style={{
              borderTop: "1px solid var(--explorer-border, #e2e8f0)",
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
                color: "var(--explorer-text-secondary, #64748b)",
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                flexShrink: 0,
              }}
            >
              <Globe size={15} color="#0d9488" />
              <span>{tArticles("filterLanguage")}:</span>
            </div>

            {/* All Languages Tab */}
            <button
              type="button"
              onClick={() => setSelectedLanguage("all")}
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
                border: selectedLanguage === "all" ? "1px solid transparent" : "1px solid var(--explorer-border, #e2e8f0)",
                background:
                  selectedLanguage === "all"
                    ? "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)"
                    : "var(--explorer-bg, #f8fafc)",
                color: selectedLanguage === "all" ? "#ffffff" : "var(--explorer-text-secondary, #64748b)",
                boxShadow:
                  selectedLanguage === "all" ? "0 4px 16px rgba(13, 148, 136, 0.25)" : "none",
              }}
            >
              <span>{tArticles("allLanguages")}</span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "monospace",
                  padding: "2px 7px",
                  borderRadius: "20px",
                  background: selectedLanguage === "all" ? "rgba(255, 255, 255, 0.25)" : "var(--explorer-surface, #f1f5f9)",
                  color: selectedLanguage === "all" ? "#ffffff" : "var(--explorer-text-secondary, #64748b)",
                }}
              >
                {allEntries.length}
              </span>
            </button>

            {/* Language Pills */}
            {languageStats.map((item) => {
              const isSelected = selectedLanguage === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedLanguage(item.code)}
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
                    border: isSelected ? "1px solid #0d9488" : "1px solid var(--explorer-border, #e2e8f0)",
                    background: isSelected ? "#0d9488" : "var(--explorer-bg, #f8fafc)",
                    color: isSelected ? "#ffffff" : "var(--explorer-text-secondary, #64748b)",
                    boxShadow: isSelected ? "0 4px 16px rgba(13, 148, 136, 0.25)" : "none",
                  }}
                >
                  <span>{item.name}</span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontFamily: "monospace",
                      padding: "2px 7px",
                      borderRadius: "20px",
                      background: isSelected ? "rgba(255, 255, 255, 0.25)" : "var(--explorer-surface, #f1f5f9)",
                      color: isSelected ? "#ffffff" : "var(--explorer-text-secondary, #64748b)",
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

        {/* ── Summary & Stats Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
            paddingBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "50px",
                background: "rgba(13, 148, 136, 0.10)",
                border: "1px solid rgba(13, 148, 136, 0.25)",
                color: "#0d9488",
                letterSpacing: "0.04em",
              }}
            >
              {t("showingCount")} {filteredEntries.length} {t("terms")}
            </span>
          </div>

          {(searchQuery || selectedCategory !== "All" || selectedLanguage !== "all") && (
            <button
              type="button"
              onClick={clearAllFilters}
              style={{
                background: "transparent",
                border: "none",
                color: "#e11d48",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              {tArticles("clearFilters")}
            </button>
          )}
        </div>

        {/* ── Cards Grid ── */}
        {filteredEntries.length === 0 ? (
          <div
            style={{
              background: "var(--explorer-surface, #f1f5f9)",
              border: "1.5px dashed var(--explorer-border, #e2e8f0)",
              borderRadius: "20px",
              padding: "64px 32px",
              textAlign: "center",
              color: "var(--explorer-text-secondary, #64748b)",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--explorer-text-secondary, #64748b)",
                margin: "0 0 16px",
              }}
            >
              {searchQuery
                ? `${t("noResultsTitle")} "${searchQuery}".`
                : t("noResults")}
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              style={{
                padding: "10px 22px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(13, 148, 136, 0.25)",
              }}
            >
              {tArticles("clearFilters")}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
              width: "100%",
            }}
          >
            {filteredEntries.map((entry, i) => {
              const badge = BADGE_STYLES[entry.category] ?? DEFAULT_BADGE;
              return (
                <div
                  key={`${entry.term}-${entry.language}-${i}`}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--explorer-surface, #ffffff)",
                    border: "1px solid var(--explorer-border, #e2e8f0)",
                    borderRadius: "18px",
                    padding: "24px",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    cursor: "default",
                    boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#0d9488";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 10px 30px rgba(13, 148, 136, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--explorer-border, #e2e8f0)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))";
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #0d9488, #0891b2, #7c3aed)",
                      opacity: 0.7,
                    }}
                  />

                  {/* Header: Category Badge + Language Pill */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                      marginTop: "4px",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "50px",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.color}44`,
                      }}
                    >
                      {entry.category}
                    </span>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(13, 148, 136, 0.08)",
                        border: "1px solid rgba(13, 148, 136, 0.25)",
                        color: "#0d9488",
                        padding: "2px 8px",
                        borderRadius: "50px",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                      }}
                    >
                      <Globe size={10} />
                      <span>{entry.languageName}</span>
                    </span>
                  </div>

                  {/* Term */}
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "var(--explorer-text-primary, #0f172a)",
                      lineHeight: 1.3,
                      margin: "0 0 10px",
                      fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                    }}
                  >
                    {entry.term}
                  </h3>

                  {/* Definition */}
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--explorer-text-secondary, #475569)",
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {entry.definition}
                  </p>

                  {/* Related Terms */}
                  <RelatedTermsList
                    currentTerm={entry.term}
                    relatedTerms={entry.relatedTerms}
                    onTermClick={(term) => setSearchQuery(term)}
                    label={t("relatedTerms")}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}