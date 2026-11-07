"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Search, X, ChevronLeft, ChevronRight, User } from "lucide-react";
import { TRIBUTE_CATEGORIES, TRIBUTE_PROFILES, getLocalizedProfile } from "@/data/tribute-profiles";
import { TributeCategory, TributeProfile } from "@/types/tribute";
import ProfileCard from "./ProfileCard";
import ProfileDetailModal from "./ProfileDetailModal";

const ITEMS_PER_PAGE = 6;

interface TributeExplorerProps {
  initialCategory?: TributeCategory;
}

export default function TributeExplorer({ initialCategory = "all" }: TributeExplorerProps) {
  const t = useTranslations("tribute");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<TributeCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<TributeProfile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Localize profiles according to current language
  const localizedAllProfiles = useMemo(() => {
    return TRIBUTE_PROFILES.map((p) => getLocalizedProfile(p, locale));
  }, [locale]);

  const categoryLabelMap: Record<TributeCategory, string> = {
    all: t("categoryAll"),
    healthcare: t("categoryHealthcare"),
    "safety-and-justice": t("categorySafety"),
    journalism: t("categoryJournalism"),
    "environmental-defenders": t("categoryEnvironment"),
    "education-and-dignity": t("categoryEducation"),
    survivors: t("categorySurvivors"),
  };

  // Filter profiles
  const filteredProfiles = useMemo(() => {
    return localizedAllProfiles.filter((profile) => {
      const matchesCategory =
        activeCategory === "all" || profile.category === activeCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        profile.name.toLowerCase().includes(q) ||
        profile.country.toLowerCase().includes(q) ||
        profile.roleAndField.toLowerCase().includes(q) ||
        profile.contributions.toLowerCase().includes(q) ||
        profile.actionableLesson.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [localizedAllProfiles, activeCategory, searchQuery]);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE) || 1;
  const paginatedProfiles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProfiles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProfiles, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById("stories-heading");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Modal navigation within all filtered profiles
  const currentIndex = selectedProfile
    ? filteredProfiles.findIndex((p) => p.id === selectedProfile.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredProfiles.length - 1) {
      setSelectedProfile(filteredProfiles[currentIndex + 1]);
    } else if (filteredProfiles.length > 0) {
      setSelectedProfile(filteredProfiles[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedProfile(filteredProfiles[currentIndex - 1]);
    } else if (filteredProfiles.length > 0) {
      setSelectedProfile(filteredProfiles[filteredProfiles.length - 1]);
    }
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "28px",
        }}
      >
        {TRIBUTE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s ease",
              border: activeCategory === cat.id ? "none" : "1px solid var(--explorer-border, #cbd5e1)",
              background: activeCategory === cat.id ? "#e11d48" : "var(--explorer-surface, #ffffff)",
              color: activeCategory === cat.id ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
              boxShadow: activeCategory === cat.id ? "0 4px 12px rgba(225, 29, 72, 0.25)" : "none",
            }}
          >
            <span>{categoryLabelMap[cat.id] || cat.label}</span>
            <span
              style={{
                fontSize: "0.7rem",
                padding: "1px 6px",
                borderRadius: "50px",
                fontWeight: 800,
                background: activeCategory === cat.id ? "rgba(255,255,255,0.25)" : "var(--explorer-bg, #f1f5f9)",
                color: activeCategory === cat.id ? "#ffffff" : "var(--explorer-text-secondary, #64748b)",
              }}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar & Active Stats */}
      <div
        style={{
          background: "var(--explorer-surface, #ffffff)",
          border: "1px solid var(--explorer-border, #e2e8f0)",
          borderRadius: "16px",
          padding: "14px 18px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          flexWrap: "wrap",
          marginBottom: "28px",
          boxSizing: "border-box",
        }}
      >
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
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 36px 9px 38px",
              fontSize: "0.85rem",
              borderRadius: "10px",
              border: "1px solid var(--explorer-border, #cbd5e1)",
              background: "var(--explorer-bg, #f8fafc)",
              color: "var(--explorer-text-primary, #0f172a)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#94a3b8",
                padding: 0,
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--explorer-text-secondary, #64748b)" }}>
          {t("showingProfiles", {
            shown: paginatedProfiles.length,
            total: filteredProfiles.length,
            page: currentPage,
            totalPages,
          })}
        </div>
      </div>

      {/* Profiles Grid — exactly 6 at a time for clean, accessible reading */}
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
        {paginatedProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onOpenModal={(p) => setSelectedProfile(p)}
          />
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "50px 20px",
            background: "var(--explorer-surface, #ffffff)",
            borderRadius: "20px",
            border: "1px dashed var(--explorer-border, #cbd5e1)",
            marginBottom: "32px",
          }}
        >
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--site-heading, #0f172a)", marginBottom: "6px" }}>
            {t("noProfilesFound", { query: searchQuery })}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            style={{
              padding: "8px 16px",
              fontSize: "0.8rem",
              fontWeight: 700,
              borderRadius: "8px",
              background: "#e11d48",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t("resetFilters")}
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Profiles Pagination"
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
            {t("prevPage")}
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
            {t("nextPage")}
            <ChevronRight size={16} />
          </button>
        </nav>
      )}

      {/* Detail Modal */}
      <ProfileDetailModal
        profile={
          selectedProfile
            ? localizedAllProfiles.find((p) => p.id === selectedProfile.id) ?? selectedProfile
            : null
        }
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onSelectNext={handleNext}
        onSelectPrev={handlePrev}
      />
    </div>
  );
}
