"use client";

import React from "react";
import Link from "next/link";
import { Play, Pause, Clock, Eye, Share2, Layers } from "lucide-react";
import type { PodcastData } from "@/types/podcast";
import { formatPodcastDuration } from "@/lib/podcast-api";

interface PodcastCardProps {
  podcast: PodcastData;
  isPlaying: boolean;
  onPlayToggle: (podcast: PodcastData) => void;
  onSelectSeries?: (episodeId: string) => void;
  locale: string;
}

const FALLBACK_IMAGE = "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";

function getSafeImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string" || !url.trim()) return FALLBACK_IMAGE;
  const trimmed = url.trim();
  if (trimmed.startsWith("/api/proxy-image")) return trimmed;
  if (trimmed.includes("ultimatehealth.blog") || trimmed.includes("uhsocial.in")) {
    return `/api/proxy-image?url=${encodeURIComponent(trimmed)}`;
  }
  return trimmed;
}

export default function PodcastCard({
  podcast,
  isPlaying,
  onPlayToggle,
  onSelectSeries,
  locale,
}: PodcastCardProps) {
  const authorName = podcast.authorName || "UltimateHealth Contributor";
  const category = podcast.category || "Health Guide";

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/${locale}/podcasts/${podcast._id}`
        : `/${locale}/podcasts/${podcast._id}`;
    if (navigator.share) {
      try { await navigator.share({ title: podcast.title, text: podcast.description, url: shareUrl }); } catch { /* ignored */ }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert("Podcast link copied to clipboard!");
    }
  };

  return (
    <div
      className="group hover:-translate-y-1"
      style={{
        background: "var(--explorer-surface, #ffffff)",
        border: "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "var(--explorer-surface-hover, #f1f5f9)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getSafeImageUrl(podcast.cover_image)}
          alt={podcast.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
          className="group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            if (podcast.cover_image && !e.currentTarget.src.includes("/api/proxy-image")) {
              e.currentTarget.src = `/api/proxy-image?url=${encodeURIComponent(podcast.cover_image)}`;
            } else {
              e.currentTarget.src = FALLBACK_IMAGE;
            }
          }}
        />

        {/* Category Badge */}
        <div style={{
          position: "absolute", top: "10px", left: "10px",
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "rgba(13, 148, 136, 0.9)",
          color: "#ffffff",
          padding: "3px 10px", borderRadius: "50px",
          fontSize: "11px", fontWeight: 800,
          letterSpacing: "0.04em", backdropFilter: "blur(6px)",
          boxShadow: "0 2px 8px rgba(13,148,136,0.3)",
        }}>
          {category}
        </div>

        {/* Duration Badge */}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          display: "inline-flex", alignItems: "center", gap: "4px",
          background: "rgba(0,0,0,0.6)",
          color: "#e2e8f0",
          padding: "3px 10px", borderRadius: "50px",
          fontSize: "11px", fontWeight: 700,
          backdropFilter: "blur(6px)",
        }}>
          <Clock size={11} />
          {formatPodcastDuration(podcast.duration)}
        </div>

        {/* Play Button */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPlayToggle(podcast); }}
            title={isPlaying ? "Pause" : "Play podcast"}
            aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
            style={{
              width: "52px", height: "52px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: isPlaying ? "#0d9488" : "rgba(255,255,255,0.95)",
              color: isPlaying ? "#ffffff" : "#0d9488",
              border: "none", cursor: "pointer",
              boxShadow: isPlaying
                ? "0 0 0 4px rgba(13,148,136,0.3), 0 8px 24px rgba(0,0,0,0.3)"
                : "0 4px 20px rgba(0,0,0,0.25)",
              transform: isPlaying ? "scale(1.1)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {isPlaying ? <Pause size={22} style={{ fill: "currentColor" }} /> : <Play size={22} style={{ marginLeft: "2px", fill: "currentColor" }} />}
          </button>
        </div>

        {/* Series Tag */}
        {podcast.episode_id && (
          <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const epId = typeof podcast.episode_id === "object" && podcast.episode_id !== null
                  ? (podcast.episode_id as any)._id || (podcast.episode_id as any).id
                  : podcast.episode_id;
                if (onSelectSeries && epId) onSelectSeries(String(epId));
              }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "3px 10px", borderRadius: "8px",
                background: "rgba(15,23,42,0.75)", color: "#2dd4bf",
                fontSize: "11px", fontWeight: 700, cursor: "pointer",
                border: "none", backdropFilter: "blur(6px)",
              }}
            >
              <Layers size={12} />
              Series Ep. {podcast.episode_number ? `#${podcast.episode_number}` : ""}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
          {(podcast.tags && podcast.tags.length > 0 ? podcast.tags.slice(0, 2) : []).map((tag, i) => {
            const tagName = typeof tag === "string" ? tag : tag.name || "";
            return (
              <span key={i} style={{
                display: "inline-block", padding: "3px 10px", borderRadius: "50px",
                fontSize: "11px", fontWeight: 800, textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                background: "rgba(13, 148, 136, 0.08)",
                color: "#0d9488",
                border: "1px solid rgba(13, 148, 136, 0.25)",
              }}>
                {tagName}
              </span>
            );
          })}
        </div>

        {/* Title */}
        <Link
          href={`/${locale}/podcasts/${podcast._id}`}
          style={{
            fontSize: "1.05rem", fontWeight: 800,
            color: "var(--explorer-text-primary, #0f172a)",
            lineHeight: 1.35, marginBottom: "8px",
            textDecoration: "none",
            transition: "color 0.15s ease",
            WebkitLineClamp: 2, display: "-webkit-box" as any,
            WebkitBoxOrient: "vertical" as any,
            overflow: "hidden",
          }}
          className="hover:text-teal-600"
        >
          {podcast.title}
        </Link>

        {/* Description */}
        <p style={{
          fontSize: "0.875rem",
          color: "var(--explorer-text-secondary, #475569)",
          lineHeight: 1.6, flex: 1, marginBottom: "16px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as any, overflow: "hidden",
        }}>
          {podcast.description}
        </p>

        {/* Footer Meta */}
        <div style={{
          paddingTop: "14px",
          borderTop: "1px solid var(--explorer-border, #e2e8f0)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getSafeImageUrl(podcast.authorAvatar)}
              alt=""
              style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--explorer-border, #e2e8f0)", flexShrink: 0 }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                if (podcast.authorAvatar && !e.currentTarget.src.includes("/api/proxy-image")) {
                  e.currentTarget.src = `/api/proxy-image?url=${encodeURIComponent(podcast.authorAvatar)}`;
                } else {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }
              }}
            />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--explorer-text-primary, #0f172a)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}>
              {authorName}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--explorer-text-muted, #64748b)" }}>
              <Eye size={13} />
              {podcast.viewCount || 0}
            </span>
            <button
              type="button"
              onClick={handleShare}
              title="Share podcast"
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center",
                color: "var(--explorer-text-muted, #64748b)", padding: "4px",
                borderRadius: "6px", transition: "color 0.15s",
              }}
              className="hover:text-teal-600"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/podcasts/${podcast._id}`}
          style={{
            marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            gap: "6px", padding: "10px 16px", borderRadius: "12px",
            background: "var(--explorer-bg, #f8fafc)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            color: "var(--explorer-text-secondary, #475569)",
            fontSize: "0.82rem", fontWeight: 700,
            textDecoration: "none", transition: "all 0.15s ease",
          }}
          className="hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50"
        >
          Full Episode & Notes
        </Link>
      </div>
    </div>
  );
}
