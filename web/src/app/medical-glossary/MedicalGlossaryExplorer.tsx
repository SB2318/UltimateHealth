"use client";

import { useMemo, useState } from "react";
import { glossaryEntries } from "./glossary-data";

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  "Blood Health":        { bg: "#fff1f2", color: "#e11d48" },
  "Cardiovascular Health": { bg: "#fef2f2", color: "#dc2626" },
  "Respiratory Health":  { bg: "#eff6ff", color: "#2563eb" },
  "Digestive Health":    { bg: "#fffbeb", color: "#d97706" },
  "Metabolic Health":    { bg: "#fff7ed", color: "#ea580c" },
  "Mental Health":       { bg: "#f5f3ff", color: "#7c3aed" },
  "Neurological Health": { bg: "#faf5ff", color: "#9333ea" },
  "Immune Health":       { bg: "#f0fdf4", color: "#16a34a" },
  "Bone & Joint Health": { bg: "#fefce8", color: "#ca8a04" },
  "Skin Health":         { bg: "#fdf2f8", color: "#db2777" },
  "Liver Health":        { bg: "#f7fee7", color: "#65a30d" },
  "Urinary Health":      { bg: "#ecfeff", color: "#0891b2" },
  "Nutrition":           { bg: "#f0fdfa", color: "#0d9488" },
  "Sleep Health":        { bg: "#eef2ff", color: "#4f46e5" },
  "Preventive Health":   { bg: "#ecfdf5", color: "#059669" },
  "Diagnostic Testing":  { bg: "#f8fafc", color: "#475569" },
  "Infectious Diseases": { bg: "#fef2f2", color: "#b91c1c" },
  "Oncology":            { bg: "#fdf4ff", color: "#a21caf" },
};

const DEFAULT_BADGE = { bg: "#f1f5f9", color: "#475569" };

export default function MedicalGlossaryExplorer() {
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
    /* isolation wrapper — prevents global h2/p/section styles from bleeding in */
    <div style={{ all: "revert", fontFamily: "inherit" }} className="w-full">
      <div className="w-full flex flex-col items-stretch gap-8">

        {/* ── Search & Filter Panel ── */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            padding: "16px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
            <svg
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 18, height: 18, pointerEvents: "none" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search medical terms or definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "44px",
                paddingRight: "16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                fontSize: "14px",
                color: "#1e293b",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#818cf8";
                e.target.style.boxShadow = "0 0 0 3px rgba(129,140,248,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.boxShadow = "none";
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
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                fontSize: "14px",
                color: "#1e293b",
                outline: "none",
                appearance: "none",
                cursor: "pointer",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <svg
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16, height: 16, pointerEvents: "none" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ── Count Bar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#94a3b8", whiteSpace: "nowrap" }}>
            Showing&nbsp;
            <span style={{ color: "#475569" }}>{filteredEntries.length}</span>
            &nbsp;terms
          </span>
          <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
        </div>

        {/* ── Grid ── */}
        {filteredEntries.length === 0 ? (
          <div style={{ background: "#fff", border: "1.5px dashed #e2e8f0", borderRadius: "16px", padding: "64px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#334155", margin: 0 }}>No results found</p>
            <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px" }}>Try a different term or category.</p>
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
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(79,70,229,0.12)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#c7d2fe";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0";
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #818cf8, #a78bfa, #f472b6)", opacity: 0.7, borderRadius: "16px 16px 0 0" }} />

                  {/* Category Badge */}
                  <div style={{ marginBottom: "14px", marginTop: "4px" }}>
                    <span style={{
                      display: "inline-block",
                      background: badge.bg,
                      color: badge.color,
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "8px",
                    }}>
                      {entry.category}
                    </span>
                  </div>

                  {/* Term */}
                  <div style={{ fontSize: "17px", fontWeight: 700, color: "#1e293b", lineHeight: 1.35, marginBottom: "10px" }}>
                    {entry.term}
                  </div>

                  {/* Definition */}
                  <div style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.65, flex: 1 }}>
                    {entry.definition}
                  </div>

                  {/* Related Terms */}
                  {entry.relatedTerms?.length > 0 && (
                    <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                        Related
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {entry.relatedTerms.map((term) => (
                          <span
                            key={term}
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              color: "#475569",
                              background: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              borderRadius: "6px",
                              padding: "2px 8px",
                              cursor: "pointer",
                            }}
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}