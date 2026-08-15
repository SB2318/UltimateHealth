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

function RelatedTermButton({ term, onClick }: { term: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View related term: ${term}`}
      className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 cursor-pointer transition-colors hover:bg-slate-200 hover:border-slate-300"
    >
      {term}
    </button>
  );
}

function RelatedTermsList({
  currentTerm,
  relatedTerms,
  onTermClick,
}: {
  currentTerm: string;
  relatedTerms?: string[];
  onTermClick: (term: string) => void;
}) {
  const filteredRelated = useMemo(() => {
    return Array.from(new Set(relatedTerms || [])).filter(
      (t) => t.toLowerCase() !== currentTerm.toLowerCase()
    );
  }, [relatedTerms, currentTerm]);

  if (filteredRelated.length === 0) return null;

  return (
    <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
        Related Terms
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {filteredRelated.map((term) => (
          <RelatedTermButton
            key={term}
            term={term}
            onClick={() => onTermClick(term)}
          />
        ))}
      </div>
    </div>
  );
}

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
      const matchesSearch = entry.term.toLowerCase().includes(q);
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
              placeholder="Search medical terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none transition-all focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/15"
            />
          </div>

          {/* Category Filter */}
          <div style={{ width: "220px", minWidth: "180px", position: "relative" }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none appearance-none cursor-pointer transition-colors hover:border-slate-300 focus:border-indigo-400"
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
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#334155", margin: 0 }}>
              {searchQuery ? `No glossary terms found matching "${searchQuery}".` : "No glossary terms found."}
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
                  className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(79,70,229,0.12)] hover:border-indigo-200 cursor-default"
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
                  <RelatedTermsList
                    currentTerm={entry.term}
                    relatedTerms={entry.relatedTerms}
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