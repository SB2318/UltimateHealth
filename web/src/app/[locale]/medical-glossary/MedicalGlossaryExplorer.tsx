"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { glossaryEntries } from "./glossary-data";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(glossaryEntries.map((e) => e.category))).sort()],
    []
  );

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return glossaryEntries.filter((entry) => {
      const matchesSearch =
        entry.term.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "All" || entry.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-stretch gap-8">

        {/* ── Search & Filter Panel ── */}
        <div
          style={{
            background: "#13131f",
            border: "1px solid #252538",
            borderRadius: "16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
            padding: "16px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
            <svg
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                width: 18,
                height: 18,
                pointerEvents: "none",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "44px",
                paddingRight: "16px",
                borderRadius: "12px",
                border: "1px solid #252538",
                background: "#0c0c14",
                fontSize: "14px",
                color: "#e2e8f0",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#7c3aed";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#252538";
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ width: "220px", minWidth: "180px", position: "relative" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "16px",
                paddingRight: "40px",
                borderRadius: "12px",
                border: "1px solid #252538",
                background: "#0c0c14",
                fontSize: "14px",
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
                  {cat === "All" ? t("categoryAll") : cat}
                </option>
              ))}
            </select>
            <svg
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                width: 16,
                height: 16,
                pointerEvents: "none",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ── Count Bar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: 1, height: 1, background: "#252538" }} />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#64748b",
              whiteSpace: "nowrap",
            }}
          >
            {t("showingCount")}&nbsp;
            <span style={{ color: "#a78bfa" }}>{filteredEntries.length}</span>
            &nbsp;{t("terms")}
          </span>
          <div style={{ flex: 1, height: 1, background: "#252538" }} />
        </div>

        {/* ── Grid ── */}
        {filteredEntries.length === 0 ? (
          <div
            style={{
              background: "#13131f",
              border: "1.5px dashed #252538",
              borderRadius: "16px",
              padding: "64px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#94a3b8",
                margin: 0,
              }}
            >
              {searchQuery
                ? `${t("noResultsTitle")} "${searchQuery}".`
                : t("noResults")}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
              width: "100%",
            }}
          >
            {filteredEntries.map((entry, i) => {
              const badge = BADGE_STYLES[entry.category] ?? DEFAULT_BADGE;
              return (
                <div
                  key={`${entry.term}-${i}`}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    background: "#13131f",
                    border: "1px solid #252538",
                    borderRadius: "16px",
                    padding: "24px",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#7c3aed";
                    (e.currentTarget as HTMLElement).style.background = "#181828";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 28px rgba(124,58,237,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#252538";
                    (e.currentTarget as HTMLElement).style.background = "#13131f";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
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
                      background: "linear-gradient(90deg, #7c3aed, #a78bfa, #f0006a)",
                      opacity: 0.6,
                      borderRadius: "16px 16px 0 0",
                    }}
                  />

                  {/* Category Badge */}
                  <div style={{ marginBottom: "14px", marginTop: "4px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: badge.bg,
                        color: badge.color,
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: "8px",
                      }}
                    >
                      {entry.category}
                    </span>
                  </div>

                  {/* Term */}
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      lineHeight: 1.35,
                      marginBottom: "10px",
                    }}
                  >
                    {entry.term}
                  </div>

                  {/* Definition */}
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#94a3b8",
                      lineHeight: 1.65,
                      flex: 1,
                    }}
                  >
                    {entry.definition}
                  </div>

                  {/* Related Terms */}
                  <RelatedTermsList
                    currentTerm={entry.term}
                    relatedTerms={entry.relatedTerms}
                    label={t("relatedTerms")}
                    onTermClick={(term) => {
                      setSearchQuery(term);
                      setSelectedCategory("All");
                    }}
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