"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Radio,
  Search,
  X,
  Headphones,
  Disc3,
  Layers,
  Sparkles,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  RefreshCw,
  Globe,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import type { PodcastData, PodcastEpisode } from "@/types/podcast";
import PodcastCard from "@/components/podcasts/PodcastCard";
import EpisodeCard from "@/components/podcasts/EpisodeCard";
import GlobalAudioPlayer from "@/components/podcasts/GlobalAudioPlayer";
import { fetchPublishedPodcasts, fetchPodcastEpisodes } from "@/lib/podcast-api";

interface PodcastsClientProps {
  initialPodcasts?: PodcastData[];
  initialEpisodes?: PodcastEpisode[];
  initialTotalPages?: number;
  initialTotal?: number;
  locale?: string;
}

const CATEGORIES = [
  "All",
  "Mental Wellness",
  "Cardiology",
  "Pulmonology",
  "Sleep Medicine",
  "Gastroenterology",
  "Nutrition",
  "Nephrology",
  "Orthopedics",
];

const LANGUAGES = [
  { code: "all", label: "All Languages" },
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "हिन्दी" },
  { code: "bn-IN", label: "বাংলা" },
  { code: "ta-IN", label: "தமிழ்" },
];

function getVisiblePages(current: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function PodcastsClient({
  initialPodcasts = [],
  initialEpisodes = [],
  initialTotalPages = 1,
  initialTotal = 0,
  locale = "en",
}: PodcastsClientProps) {
  const [activeTab, setActiveTab] = useState<"podcasts" | "episodes">("podcasts");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "popular" | "duration">("latest");
  const [podcasts, setPodcasts] = useState<PodcastData[]>(initialPodcasts);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(initialEpisodes);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalCount, setTotalCount] = useState(initialTotal || initialPodcasts.length);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<PodcastData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Debounce search
  useEffect(() => {
    const h = setTimeout(() => setDebouncedQuery(searchQuery.trim().toLowerCase()), 350);
    return () => clearTimeout(h);
  }, [searchQuery]);

  // Client-side page fetch (fetches if empty or page changed)
  useEffect(() => {
    if (currentPage === 1 && initialPodcasts.length > 0 && podcasts.length > 0) return;
    let isMounted = true;
    async function loadPage() {
      setIsLoading(true);
      try {
        const res = await fetchPublishedPodcasts(currentPage, 12);
        if (isMounted) {
          setPodcasts(res.podcasts);
          setTotalPages(res.totalPages);
          setTotalCount(res.total);
        }
      } catch { /* ignored */ }
      finally { if (isMounted) setIsLoading(false); }
    }
    loadPage();
    return () => { isMounted = false; };
  }, [currentPage, initialPodcasts.length]);

  // Client-side episodes fetch if initial was empty
  useEffect(() => {
    if (initialEpisodes.length > 0 && episodes.length > 0) return;
    let isMounted = true;
    async function loadEpisodes() {
      try {
        const res = await fetchPodcastEpisodes();
        if (isMounted && res.length > 0) {
          setEpisodes(res);
        }
      } catch { /* ignored */ }
    }
    loadEpisodes();
    return () => { isMounted = false; };
  }, [initialEpisodes.length]);

  const filteredPodcasts = useMemo(() => {
    return podcasts
      .filter((p) => {
        if (selectedEpisodeId && p.episode_id !== selectedEpisodeId) return false;
        if (selectedCategory !== "All") {
          const cat = (p.category || "").toLowerCase();
          const target = selectedCategory.toLowerCase();
          const hasTag = (p.tags || []).some((t) => {
            const n = typeof t === "string" ? t : t.name || "";
            return n.toLowerCase().includes(target);
          });
          if (!cat.includes(target) && !hasTag) return false;
        }
        if (selectedLanguage !== "all") {
          const lang = (p.language || "en-IN").toLowerCase();
          if (!lang.startsWith(selectedLanguage.split("-")[0])) return false;
        }
        if (debouncedQuery) {
          const title = p.title.toLowerCase();
          const desc = p.description.toLowerCase();
          const author = (p.authorName || "").toLowerCase();
          if (!title.includes(debouncedQuery) && !desc.includes(debouncedQuery) && !author.includes(debouncedQuery)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "popular") return (b.viewCount || 0) - (a.viewCount || 0);
        if (sortOrder === "duration") return (b.duration || 0) - (a.duration || 0);
        return new Date(b.created_at || b.updated_at || "").getTime() - new Date(a.created_at || a.updated_at || "").getTime();
      });
  }, [podcasts, selectedEpisodeId, selectedCategory, selectedLanguage, debouncedQuery, sortOrder]);

  const filteredEpisodes = useMemo(() => {
    if (!debouncedQuery) return episodes;
    return episodes.filter((ep) =>
      ep.name.toLowerCase().includes(debouncedQuery) || ep.description.toLowerCase().includes(debouncedQuery)
    );
  }, [episodes, debouncedQuery]);

  const activeEpisodeObj = useMemo(() =>
    selectedEpisodeId ? episodes.find((ep) => ep._id === selectedEpisodeId || ep.id === selectedEpisodeId) || null : null,
    [episodes, selectedEpisodeId]
  );

  const handlePlayToggle = (podcast: PodcastData) => {
    if (currentPodcast?._id === podcast._id) setIsPlaying(!isPlaying);
    else { setCurrentPodcast(podcast); setIsPlaying(true); }
  };

  const clearAllFilters = () => {
    setSearchQuery(""); setSelectedCategory("All");
    setSelectedLanguage("all"); setSelectedEpisodeId(null); setSortOrder("latest");
  };

  const hasFilters = searchQuery || selectedCategory !== "All" || selectedLanguage !== "all" || selectedEpisodeId;

  return (
    <>
      <SiteHeader />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--explorer-bg, #f8fafc)",
          color: "var(--explorer-text-primary, #0f172a)",
          paddingBottom: currentPodcast ? "120px" : "0",
        }}
      >
        {/* ── Hero Section (matches articles page exactly) ── */}
        <section
          style={{
            paddingTop: "130px",
            paddingBottom: "80px",
            textAlign: "center",
            borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: "20%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px", height: "350px",
              background: "radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)",
              filter: "blur(50px)", pointerEvents: "none", zIndex: 0,
            }}
          />

          <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 14px", borderRadius: "50px",
              background: "rgba(13, 148, 136, 0.10)",
              border: "1px solid rgba(13, 148, 136, 0.25)",
              color: "#0d9488",
              fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              marginBottom: "20px",
            }}>
              <Radio size={14} style={{ animation: "pulse 2s infinite" }} />
              <span>Public Health Audio Studio</span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 800, letterSpacing: "-0.03em",
                color: "var(--explorer-text-primary, #0f172a)",
                lineHeight: 1.15, margin: "0 0 16px 0",
              }}
            >
              Evidence-Based{" "}
              <span style={{ color: "#0d9488" }}>Health Podcasts</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              lineHeight: 1.75,
              color: "var(--explorer-text-secondary, #475569)",
              maxWidth: "680px", margin: "0 auto 32px",
            }}>
              Stream physician-reviewed clinical explainers, respiratory series, circadian sleep science, and patient recovery journeys. Free, open-access, and ad-free.
            </p>

            {/* Trust Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "36px" }}>
              {[
                { icon: <CheckCircle2 size={14} />, label: "100% Free" },
                { icon: <Sparkles size={14} />, label: "Physician Reviewed" },
                { icon: <Layers size={14} />, label: "Multi-Episode Series" },
              ].map((item) => (
                <div key={item.label} style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "7px 14px", borderRadius: "50px",
                  background: "var(--explorer-surface, #ffffff)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  color: "var(--explorer-text-secondary, #475569)",
                  fontSize: "0.82rem", fontWeight: 600,
                  boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
                }}>
                  <span style={{ color: "#0d9488" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative" }}>
              <div style={{
                position: "absolute", left: "16px", top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none", display: "flex", alignItems: "center",
              }}>
                <Search size={18} color={searchFocused ? "#0d9488" : "#94a3b8"} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search health topics, clinical series, or doctor names..."
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "var(--explorer-surface, #ffffff)",
                  border: searchFocused ? "1.5px solid #0d9488" : "1.5px solid var(--explorer-border, #e2e8f0)",
                  borderRadius: "50px",
                  padding: "14px 44px 14px 46px",
                  fontSize: "0.95rem",
                  color: "var(--explorer-text-primary, #0f172a)",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: searchFocused ? "0 0 20px rgba(13, 148, 136, 0.15)" : "0 4px 16px rgba(0,0,0,0.06)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent", border: "none",
                    color: "var(--explorer-text-muted, #64748b)",
                    cursor: "pointer", padding: "4px",
                    display: "flex", alignItems: "center", borderRadius: "6px",
                  }}
                >
                  <X size={18} />
                </button>
              )}
              {isLoading && (
                <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                  <Loader2 size={18} style={{ animation: "spin 1s linear infinite", color: "#0d9488" }} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section style={{ padding: "48px 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>

          {/* ── Tabs + Sort Row ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px", marginBottom: "32px",
          }}>
            {/* Tab Switcher */}
            <div style={{
              display: "inline-flex", alignItems: "center",
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "14px", padding: "4px",
              boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
            }}>
              <button
                type="button"
                onClick={() => { setActiveTab("podcasts"); setSelectedEpisodeId(null); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "9px 18px", borderRadius: "10px",
                  fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
                  border: "none", transition: "all 0.2s ease",
                  background: activeTab === "podcasts"
                    ? "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)"
                    : "transparent",
                  color: activeTab === "podcasts" ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                  boxShadow: activeTab === "podcasts" ? "0 4px 12px rgba(13,148,136,0.3)" : "none",
                }}
              >
                <Headphones size={16} />
                All Podcasts
                <span style={{
                  fontSize: "11px", padding: "2px 7px", borderRadius: "20px",
                  background: activeTab === "podcasts" ? "rgba(255,255,255,0.25)" : "var(--explorer-bg, #f8fafc)",
                  color: activeTab === "podcasts" ? "#fff" : "var(--explorer-text-secondary, #475569)",
                  fontFamily: "monospace", fontWeight: 800,
                }}>
                  {podcasts.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("episodes")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "9px 18px", borderRadius: "10px",
                  fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
                  border: "none", transition: "all 0.2s ease",
                  background: activeTab === "episodes"
                    ? "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)"
                    : "transparent",
                  color: activeTab === "episodes" ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                  boxShadow: activeTab === "episodes" ? "0 4px 12px rgba(13,148,136,0.3)" : "none",
                }}
              >
                <Disc3 size={16} />
                Episode Series
                <span style={{
                  fontSize: "11px", padding: "2px 7px", borderRadius: "20px",
                  background: activeTab === "episodes" ? "rgba(255,255,255,0.25)" : "var(--explorer-bg, #f8fafc)",
                  color: activeTab === "episodes" ? "#fff" : "var(--explorer-text-secondary, #475569)",
                  fontFamily: "monospace", fontWeight: 800,
                }}>
                  {episodes.length}
                </span>
              </button>
            </div>

            {/* Sort Dropdown */}
            {activeTab === "podcasts" && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: "var(--explorer-text-muted, #64748b)",
                  fontFamily: "monospace",
                }}>
                  Sort By:
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  style={{
                    padding: "8px 14px", borderRadius: "10px",
                    border: "1px solid var(--explorer-border, #e2e8f0)",
                    background: "var(--explorer-surface, #ffffff)",
                    color: "var(--explorer-text-primary, #0f172a)",
                    fontSize: "0.82rem", fontWeight: 700,
                    cursor: "pointer", outline: "none",
                    boxShadow: "var(--explorer-card-shadow, 0 2px 6px rgba(0,0,0,0.03))",
                  }}
                >
                  <option value="latest">Latest Releases</option>
                  <option value="popular">Most Listened</option>
                  <option value="duration">Longest Duration</option>
                </select>
              </div>
            )}
          </div>

          {/* ── Filter Bar (podcasts tab) ── */}
          {activeTab === "podcasts" && (
            <div style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "16px",
              padding: "20px 24px",
              marginBottom: "28px",
              boxShadow: "var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))",
              display: "flex", flexDirection: "column", gap: "14px",
            }}>
              {/* Category Pills */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  marginRight: "4px", flexShrink: 0,
                  color: "var(--explorer-text-secondary, #475569)",
                  fontSize: "0.78rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  <Filter size={13} color="#0d9488" />
                  Category:
                </div>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "6px 14px", borderRadius: "50px",
                        fontSize: "0.78rem", fontWeight: 800, cursor: "pointer",
                        transition: "all 0.2s ease",
                        border: isActive ? "1px solid transparent" : "1px solid var(--explorer-border, #e2e8f0)",
                        background: isActive
                          ? "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)"
                          : "var(--explorer-bg, #f8fafc)",
                        color: isActive ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                        boxShadow: isActive ? "0 4px 12px rgba(13, 148, 136, 0.25)" : "none",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Language + Clear Row */}
              <div style={{
                borderTop: "1px solid var(--explorer-border, #e2e8f0)",
                paddingTop: "14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: "10px",
              }}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    marginRight: "4px", flexShrink: 0,
                    color: "var(--explorer-text-secondary, #475569)",
                    fontSize: "0.78rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    <Globe size={13} color="#0d9488" />
                    Language:
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isActive = selectedLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setSelectedLanguage(lang.code)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "7px",
                          padding: "6px 14px", borderRadius: "50px",
                          fontSize: "0.78rem", fontWeight: 800, cursor: "pointer",
                          transition: "all 0.2s ease",
                          border: isActive ? "1px solid transparent" : "1px solid var(--explorer-border, #e2e8f0)",
                          background: isActive
                            ? "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)"
                            : "var(--explorer-bg, #f8fafc)",
                          color: isActive ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                          boxShadow: isActive ? "0 4px 12px rgba(13, 148, 136, 0.25)" : "none",
                        }}
                      >
                        {lang.label}
                        {lang.code === "all" && (
                          <span style={{
                            fontSize: "0.72rem", fontFamily: "monospace",
                            padding: "2px 7px", borderRadius: "20px",
                            background: isActive ? "rgba(255,255,255,0.25)" : "var(--explorer-surface, #ffffff)",
                            color: isActive ? "#fff" : "var(--explorer-text-secondary, #475569)",
                          }}>
                            {totalCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    style={{
                      background: "transparent", border: "none",
                      color: "#f0006a", fontWeight: 700, fontSize: "0.82rem",
                      cursor: "pointer", textDecoration: "underline",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Active Series Banner */}
          {selectedEpisodeId && activeEpisodeObj && (
            <div style={{
              marginBottom: "24px", padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(13, 148, 136, 0.08)",
              border: "1px solid rgba(13, 148, 136, 0.25)",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                <Disc3 size={18} color="#0d9488" style={{ flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0d9488" }}>
                    Viewing Series: {activeEpisodeObj.name}
                  </div>
                  <div style={{
                    fontSize: "0.78rem", color: "var(--explorer-text-secondary, #475569)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {activeEpisodeObj.description}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEpisodeId(null)}
                style={{
                  flexShrink: 0, padding: "6px 14px", borderRadius: "8px",
                  background: "rgba(13,148,136,0.12)", border: "1px solid rgba(13,148,136,0.3)",
                  color: "#0d9488", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                }}
              >
                Clear Series
              </button>
            </div>
          )}

          {/* ── Results Header ── */}
          {activeTab === "podcasts" && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "24px", flexWrap: "wrap", gap: "12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <h2 style={{
                  fontSize: "1.75rem", fontWeight: 800,
                  color: "var(--explorer-text-primary, #0f172a)",
                  margin: 0,
                  fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                }}>
                  {debouncedQuery ? `Results for "${debouncedQuery}"` : "All Podcasts & Audio Guides"}
                </h2>
                <span style={{
                  fontSize: "0.78rem", fontWeight: 800,
                  padding: "4px 12px", borderRadius: "50px",
                  background: "rgba(13, 148, 136, 0.12)",
                  border: "1px solid rgba(13, 148, 136, 0.3)",
                  color: "#0d9488", letterSpacing: "0.04em",
                }}>
                  {filteredPodcasts.length} guides
                </span>
              </div>
              {totalPages > 1 && (
                <span style={{
                  fontSize: "0.78rem", fontWeight: 700, fontFamily: "monospace",
                  color: "var(--explorer-text-muted, #64748b)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
          )}

          {activeTab === "episodes" && (
            <div style={{ marginBottom: "28px" }}>
              <h2 style={{
                fontSize: "1.75rem", fontWeight: 800,
                color: "var(--explorer-text-primary, #0f172a)",
                margin: "0 0 6px",
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
              }}>
                Audio Series & Collections
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--explorer-text-secondary, #475569)", margin: 0 }}>
                Structured multi-part health series organized by medical specialty.
              </p>
            </div>
          )}

          {/* ── Tab 1: Podcasts Grid ── */}
          {activeTab === "podcasts" && (
            <div>
              {isLoading ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                }}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--explorer-surface, #ffffff)",
                        border: "1px solid var(--explorer-border, #e2e8f0)",
                        borderRadius: "16px", overflow: "hidden",
                      }}
                    >
                      <div style={{ aspectRatio: "16/9", background: "var(--explorer-bg, #f1f5f9)", animation: "pulse 1.5s infinite" }} />
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ height: "14px", background: "var(--explorer-bg, #f1f5f9)", borderRadius: "8px", width: "60%", animation: "pulse 1.5s infinite" }} />
                        <div style={{ height: "18px", background: "var(--explorer-bg, #f1f5f9)", borderRadius: "8px", width: "80%", animation: "pulse 1.5s infinite" }} />
                        <div style={{ height: "14px", background: "var(--explorer-bg, #f1f5f9)", borderRadius: "8px", width: "100%", animation: "pulse 1.5s infinite" }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPodcasts.length > 0 ? (
                <>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "24px",
                    opacity: isLoading ? 0.6 : 1,
                    transition: "opacity 0.2s ease",
                  }}>
                    {filteredPodcasts.map((podcast) => (
                      <PodcastCard
                        key={podcast._id}
                        podcast={podcast}
                        isPlaying={isPlaying && currentPodcast?._id === podcast._id}
                        onPlayToggle={handlePlayToggle}
                        onSelectSeries={(id) => { setSelectedEpisodeId(id); setActiveTab("podcasts"); }}
                        locale={locale}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div style={{
                      marginTop: "64px", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      gap: "8px", flexWrap: "wrap",
                    }}>
                      {/* Previous */}
                      {currentPage > 1 ? (
                        <button
                          type="button"
                          onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "10px 18px", fontSize: "0.875rem", fontWeight: 700,
                            color: "var(--explorer-text-primary, #0f172a)",
                            background: "var(--explorer-surface, #ffffff)",
                            border: "1px solid var(--explorer-border, #e2e8f0)",
                            borderRadius: "10px", cursor: "pointer",
                            boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
                          }}
                        >
                          <ChevronLeft size={16} /> Previous
                        </button>
                      ) : (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          padding: "10px 18px", fontSize: "0.875rem", fontWeight: 700,
                          color: "var(--explorer-text-muted, #94a3b8)",
                          background: "var(--explorer-bg, #f8fafc)",
                          border: "1px solid var(--explorer-border, #e2e8f0)",
                          borderRadius: "10px", opacity: 0.6,
                        }}>
                          <ChevronLeft size={16} /> Previous
                        </span>
                      )}

                      {getVisiblePages(currentPage, totalPages).map((p, idx) => {
                        if (typeof p === "string") {
                          return <span key={`e-${idx}`} style={{ width: "36px", textAlign: "center", color: "var(--explorer-text-muted, #94a3b8)", fontWeight: 700 }}>...</span>;
                        }
                        const isCurrent = p === currentPage;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            style={{
                              width: "40px", height: "40px",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.875rem", fontWeight: 700, borderRadius: "10px", cursor: "pointer",
                              background: isCurrent ? "#7c3aed" : "var(--explorer-surface, #ffffff)",
                              color: isCurrent ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                              border: isCurrent ? "1px solid #7c3aed" : "1px solid var(--explorer-border, #e2e8f0)",
                              boxShadow: isCurrent ? "0 4px 14px rgba(124, 58, 237, 0.35)" : "var(--explorer-card-shadow, 0 2px 6px rgba(0,0,0,0.03))",
                            }}
                          >
                            {p}
                          </button>
                        );
                      })}

                      {/* Next */}
                      {currentPage < totalPages ? (
                        <button
                          type="button"
                          onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            padding: "10px 18px", fontSize: "0.875rem", fontWeight: 700,
                            color: "var(--explorer-text-primary, #0f172a)",
                            background: "var(--explorer-surface, #ffffff)",
                            border: "1px solid var(--explorer-border, #e2e8f0)",
                            borderRadius: "10px", cursor: "pointer",
                            boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
                          }}
                        >
                          Next <ChevronRight size={16} />
                        </button>
                      ) : (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          padding: "10px 18px", fontSize: "0.875rem", fontWeight: 700,
                          color: "var(--explorer-text-muted, #94a3b8)",
                          background: "var(--explorer-bg, #f8fafc)",
                          border: "1px solid var(--explorer-border, #e2e8f0)",
                          borderRadius: "10px", opacity: 0.6,
                        }}>
                          Next <ChevronRight size={16} />
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <div style={{
                  background: "var(--explorer-surface, #ffffff)",
                  border: "1.5px dashed var(--explorer-border, #e2e8f0)",
                  borderRadius: "20px", padding: "64px 32px",
                  textAlign: "center",
                  color: "var(--explorer-text-secondary, #475569)",
                  boxShadow: "var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.05))",
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎧</div>
                  <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--explorer-text-primary, #0f172a)", margin: "0 0 6px" }}>
                    No Audio Guides Found
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--explorer-text-muted, #64748b)", maxWidth: "480px", margin: "0 auto 24px" }}>
                    No podcasts match your selected filters. Try a different health topic or reset all filters.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    style={{
                      padding: "10px 22px", borderRadius: "12px",
                      background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
                      color: "#ffffff", fontSize: "0.85rem", fontWeight: 800,
                      border: "none", cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(13, 148, 136, 0.25)",
                      display: "inline-flex", alignItems: "center", gap: "8px",
                    }}
                  >
                    <RefreshCw size={14} /> Reset All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Tab 2: Episode Series ── */}
          {activeTab === "episodes" && (
            <div>
              {filteredEpisodes.length > 0 ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                }}>
                  {filteredEpisodes.map((episode) => (
                    <EpisodeCard
                      key={episode._id}
                      episode={episode}
                      isSelected={selectedEpisodeId === episode._id}
                      onSelect={(ep) => { setSelectedEpisodeId(ep._id); setActiveTab("podcasts"); }}
                      locale={locale}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  background: "var(--explorer-surface, #ffffff)",
                  border: "1.5px dashed var(--explorer-border, #e2e8f0)",
                  borderRadius: "20px", padding: "64px 32px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>💿</div>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--explorer-text-primary, #0f172a)", margin: "0 0 6px" }}>
                    No Episode Collections Matching Your Search
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Android App Callout ── */}
          <div style={{
            marginTop: "80px", padding: "32px",
            borderRadius: "20px",
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            boxShadow: "var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.05))",
            display: "flex", flexWrap: "wrap",
            alignItems: "center", gap: "24px", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: "rgba(13, 148, 136, 0.1)",
                border: "1px solid rgba(13, 148, 136, 0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Smartphone size={22} color="#0d9488" />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--explorer-text-primary, #0f172a)", margin: "0 0 6px" }}>
                  Want to Record & Publish Health Podcasts?
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--explorer-text-secondary, #475569)", margin: 0, maxWidth: "520px" }}>
                  Audio recording, waveform editing, and episode submission are powered by the UltimateHealth Android Studio. Web is for stream-only listening and series discovery.
                </p>
              </div>
            </div>
            <Link
              href={`/${locale}/apps`}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "12px 22px", borderRadius: "14px",
                background: "linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)",
                color: "#ffffff", fontSize: "0.875rem", fontWeight: 800,
                textDecoration: "none", flexShrink: 0,
                boxShadow: "0 4px 16px rgba(13,148,136,0.3)",
                transition: "opacity 0.2s",
              }}
            >
              <Smartphone size={16} /> Explore Android Studio
            </Link>
          </div>
        </section>

        {/* ── Sticky Global Audio Player ── */}
        <GlobalAudioPlayer
          podcast={currentPodcast}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={() => { setIsPlaying(false); setCurrentPodcast(null); }}
          locale={locale}
        />

        <Footer />
      </main>
    </>
  );
}
