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

/* ── Dark-themed category badge colors ── */
const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  "Blood Health":          { bg: "rgba(225,29,72,0.12)", color: "#fb7185" },
  "Cardiovascular Health": { bg: "rgba(220,38,38,0.12)", color: "#f87171" },
  "Respiratory Health":    { bg: "rgba(37,99,235,0.12)", color: "#60a5fa" },
  "Digestive Health":      { bg: "rgba(217,119,6,0.12)", color: "#fbbf24" },
  "Metabolic Health":      { bg: "rgba(234,88,12,0.12)", color: "#fb923c" },
  "Mental Health":         { bg: "rgba(124,58,237,0.12)", color: "#a78bfa" },
  "Neurological Health":   { bg: "rgba(147,51,234,0.12)", color: "#c084fc" },
  "Immune Health":         { bg: "rgba(22,163,74,0.12)",  color: "#4ade80" },
  "Bone & Joint Health":   { bg: "rgba(202,138,4,0.12)",  color: "#facc15" },
  "Skin Health":           { bg: "rgba(219,39,119,0.12)", color: "#f472b6" },
  "Liver Health":          { bg: "rgba(101,163,13,0.12)", color: "#a3e635" },
  "Urinary Health":        { bg: "rgba(8,145,178,0.12)",  color: "#22d3ee" },
  "Nutrition":             { bg: "rgba(13,148,136,0.12)", color: "#2dd4bf" },
  "Sleep Health":          { bg: "rgba(79,70,229,0.12)",  color: "#818cf8" },
  "Preventive Health":     { bg: "rgba(5,150,105,0.12)",  color: "#34d399" },
  "Diagnostic Testing":    { bg: "rgba(71,85,105,0.12)",  color: "#94a3b8" },
  "Infectious Diseases":   { bg: "rgba(185,28,28,0.12)",  color: "#fca5a5" },
  "Oncology":              { bg: "rgba(162,28,175,0.12)", color: "#e879f9" },
};
const DEFAULT_BADGE = { bg: "rgba(71,85,105,0.12)", color: "#94a3b8" };

function RelatedTermButton({ term, onClick }: { term: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View related term: ${term}`}
      style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "#94a3b8",
        background: "rgba(37,37,56,0.6)",
        border: "1px solid #2e2e50",
        borderRadius: "8px",
        padding: "3px 10px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#2e2e50";
        (e.currentTarget as HTMLElement).style.borderColor = "#3e3e60";
        (e.currentTarget as HTMLElement).style.color = "#e2e8f0";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "rgba(37,37,56,0.6)";
        (e.currentTarget as HTMLElement).style.borderColor = "#2e2e50";
        (e.currentTarget as HTMLElement).style.color = "#94a3b8";
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
    <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #252538" }}>
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#64748b",
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
        {/* ── Search & Filter Controls Card (Matching ArticlesExplorer Vice Styling) ── */}
        <div
          style={{
            background: "#13131f",
            border: "1px solid #252538",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
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
                <Search size={18} color={searchFocused ? "#00e5ff" : "#94a3b8"} />
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
                  background: "#0c0c14",
                  border: searchFocused ? "1.5px solid #00e5ff" : "1.5px solid #252538",
                  borderRadius: "14px",
                  paddingLeft: "46px",
                  paddingRight: "40px",
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
                  onClick={() => setSearchQuery("")}
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
                  border: "1.5px solid #252538",
                  background: "#0c0c14",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#7c3aed";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#252538";
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#13131f", color: "#e2e8f0" }}>
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
                  color: "#64748b",
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
              <span>{tArticles("allLanguages")}</span>
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

        {/* ── Summary & Stats Row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #252538",
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
                background: "rgba(0, 229, 255, 0.12)",
                border: "1px solid rgba(0, 229, 255, 0.3)",
                color: "#00e5ff",
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
                color: "#f0006a",
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
              background: "#13131f",
              border: "1.5px dashed #252538",
              borderRadius: "20px",
              padding: "64px 32px",
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#94a3b8",
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
                background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0, 229, 255, 0.25)",
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
                    background: "#13131f",
                    border: "1px solid #252538",
                    borderRadius: "18px",
                    padding: "24px",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#00e5ff";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 10px 30px rgba(0, 229, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#252538";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Top glowing accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #00e5ff, #7c3aed, #f0006a)",
                      opacity: 0.8,
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
                        border: `1px solid ${badge.color}33`,
                      }}
                    >
                      {entry.category}
                    </span>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(12, 12, 20, 0.85)",
                        border: "1px solid rgba(0, 229, 255, 0.3)",
                        color: "#00e5ff",
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
                      color: "#f8fafc",
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
                      color: "#94a3b8",
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