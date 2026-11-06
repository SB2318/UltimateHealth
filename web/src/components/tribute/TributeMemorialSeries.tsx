"use client";

import { useState, useMemo, useEffect } from "react";
import { Shield, Clock, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { TRIBUTE_PROFILES } from "@/data/tribute-profiles";

const ITEMS_PER_PAGE = 6;

interface TributeMemorialSeriesProps {
  onSelectProfile?: (slug: string) => void;
}

export default function TributeMemorialSeries({ onSelectProfile }: TributeMemorialSeriesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGuides = useMemo(() => {
    return TRIBUTE_PROFILES.filter((profile) => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.memorialPublication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.memorialPublication.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.country.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = selectedFilter === "all" || profile.category === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE) || 1;
  const paginatedGuides = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGuides.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGuides, currentPage]);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    const el = document.getElementById("memorial-guides-heading");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Foundational Series Highlight */}
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto 36px",
          background: "linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(217, 119, 6, 0.08) 50%, rgba(13, 148, 136, 0.08) 100%)",
          border: "1.5px solid rgba(244, 63, 94, 0.25)",
          borderRadius: "20px",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        <div style={{ flex: "1 1 450px" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#e11d48",
              background: "rgba(244, 63, 94, 0.15)",
              padding: "3px 8px",
              borderRadius: "6px",
            }}
          >
            The Founding Memorial Series
          </span>

          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "var(--site-heading, #0f172a)",
              margin: "8px 0 6px",
            }}
          >
            The 30-Part Clinical Respiratory & Patient Dignity Series
          </h3>

          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "var(--explorer-text-secondary, #475569)",
              margin: 0,
            }}
          >
            In memory of Dr. Moumita Debnath&apos;s training in Pulmonary & Chest Medicine, this upcoming peer-reviewed 30-guide clinical respiratory series is being prepared as separate, article-based educational guides in our articles library, alongside the <em>Respect Giver Protocol</em> for clinical healthcare safety across 9 international languages.
          </p>
        </div>

        <div style={{ flexShrink: 0 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "50px",
              fontSize: "0.78rem",
              fontWeight: 700,
              background: "rgba(217, 119, 6, 0.12)",
              color: "#d97706",
              border: "1px solid rgba(217, 119, 6, 0.3)",
            }}
          >
            <Clock size={14} />
            Separate Article Series · Coming Soon
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        id="memorial-guides-heading"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          flexWrap: "wrap",
          marginBottom: "28px",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", width: "100%", maxWidth: "340px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            placeholder="Search upcoming guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 14px 9px 38px",
              fontSize: "0.85rem",
              borderRadius: "10px",
              border: "1px solid var(--explorer-border, #cbd5e1)",
              background: "var(--explorer-surface, #ffffff)",
              color: "var(--explorer-text-primary, #0f172a)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {[
            { id: "all", label: "All (30)" },
            { id: "healthcare", label: "Healthcare" },
            { id: "safety-and-justice", label: "Safety" },
            { id: "journalism", label: "Journalism" },
            { id: "environmental-defenders", label: "Environment" },
            { id: "education-and-dignity", label: "Youth & Dignity" },
            { id: "survivors", label: "Survivors" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              style={{
                padding: "6px 12px",
                fontSize: "0.78rem",
                fontWeight: 700,
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                border: selectedFilter === f.id ? "none" : "1px solid var(--explorer-border, #cbd5e1)",
                background: selectedFilter === f.id ? "#e11d48" : "var(--explorer-surface, #ffffff)",
                color: selectedFilter === f.id ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid — exactly 6 at a time */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box",
          marginBottom: "32px",
        }}
      >
        {paginatedGuides.map((profile) => (
          <div
            key={profile.id}
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "18px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "#e11d48",
                    background: "rgba(244, 63, 94, 0.1)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(244, 63, 94, 0.25)",
                  }}
                >
                  Living Memorial #{profile.id}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-secondary, #64748b)" }}>
                  {profile.countryFlag} {profile.country}
                </span>
              </div>

              <h4
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "var(--site-heading, #0f172a)",
                  lineHeight: 1.4,
                  margin: "0 0 6px",
                }}
              >
                {profile.memorialPublication.title}
              </h4>

              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--explorer-text-secondary, #64748b)", marginBottom: "12px" }}>
                Inspired by: <span style={{ color: "var(--site-heading, #0f172a)" }}>{profile.name}</span>
              </div>

              <div
                style={{
                  background: "var(--explorer-bg, #f8fafc)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  fontSize: "0.78rem",
                  color: "var(--explorer-text-secondary, #475569)",
                  marginBottom: "14px",
                }}
              >
                <strong style={{ color: "var(--site-heading, #1e293b)", display: "block", marginBottom: "2px" }}>
                  Focus:
                </strong>
                {profile.memorialPublication.focus}
              </div>

              <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--explorer-text-secondary, #475569)", margin: "0 0 16px" }}>
                {profile.memorialPublication.deliverable}
              </p>
            </div>

            <div
              style={{
                paddingTop: "14px",
                borderTop: "1px solid var(--explorer-border, #e2e8f0)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#d97706", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Clock size={13} />
                Open Source Access · Coming Soon
              </span>

              {onSelectProfile && (
                <button
                  type="button"
                  onClick={() => onSelectProfile(profile.slug)}
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#e11d48",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: 0,
                  }}
                >
                  <span>View Story</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Guides Pagination"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "20px 0 10px",
          }}
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 700,
              border: "1px solid var(--explorer-border, #cbd5e1)",
              background: "var(--explorer-surface, #ffffff)",
              color: currentPage === 1 ? "var(--explorer-text-secondary, #94a3b8)" : "var(--site-heading, #0f172a)",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div style={{ display: "flex", gap: "6px" }}>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePageChange(p)}
                  aria-current={currentPage === p ? "page" : undefined}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: currentPage === p ? "none" : "1px solid var(--explorer-border, #cbd5e1)",
                    background: currentPage === p ? "#e11d48" : "var(--explorer-surface, #ffffff)",
                    color: currentPage === p ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: 700,
              border: "1px solid var(--explorer-border, #cbd5e1)",
              background: "var(--explorer-surface, #ffffff)",
              color: currentPage === totalPages ? "var(--explorer-text-secondary, #94a3b8)" : "var(--site-heading, #0f172a)",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </div>
  );
}
