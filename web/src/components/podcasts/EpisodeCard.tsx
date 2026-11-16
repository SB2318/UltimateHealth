"use client";

import React from "react";
import { Disc3, Layers, ArrowRight, Play } from "lucide-react";
import type { PodcastEpisode } from "@/types/podcast";

interface EpisodeCardProps {
  episode: PodcastEpisode;
  isSelected: boolean;
  onSelect: (episode: PodcastEpisode) => void;
  locale: string;
}

export default function EpisodeCard({ episode, isSelected, onSelect }: EpisodeCardProps) {
  const podcastCount = episode.podcasts_count ?? episode.podcastsCount ?? 0;

  return (
    <div
      onClick={() => onSelect(episode)}
      className="group"
      style={{
        background: isSelected ? "rgba(13, 148, 136, 0.04)" : "var(--explorer-surface, #ffffff)",
        border: isSelected
          ? "1.5px solid #0d9488"
          : "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        boxShadow: isSelected
          ? "0 4px 20px rgba(13,148,136,0.12)"
          : "var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        transform: isSelected ? "translateY(-2px)" : "translateY(0)",
        outline: isSelected ? "3px solid rgba(13,148,136,0.15)" : "none",
      }}
    >
      {/* Top: Icon + Badge */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: isSelected ? "rgba(13,148,136,0.12)" : "var(--explorer-bg, #f8fafc)",
              border: `1px solid ${isSelected ? "rgba(13,148,136,0.3)" : "var(--explorer-border, #e2e8f0)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#0d9488",
              transition: "transform 0.3s ease",
            }}
              className="group-hover:rotate-12"
            >
              <Disc3 size={20} />
            </div>
            <div>
              <span style={{
                fontSize: "11px", fontWeight: 800, textTransform: "uppercase" as const,
                letterSpacing: "0.08em", color: "#0d9488", display: "block",
              }}>
                Audio Series
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-muted, #64748b)" }}>
                {podcastCount} {podcastCount === 1 ? "Guide" : "Guides"}
              </span>
            </div>
          </div>

          <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "4px 10px", borderRadius: "50px",
            fontSize: "11px", fontWeight: 800,
            background: "rgba(13, 148, 136, 0.08)",
            color: "#0d9488",
            border: "1px solid rgba(13, 148, 136, 0.25)",
          }}>
            <Layers size={11} />
            {podcastCount} Tracks
          </span>
        </div>

        {/* Series Name */}
        <h3 style={{
          fontSize: "1.05rem", fontWeight: 800,
          color: "var(--explorer-text-primary, #0f172a)",
          lineHeight: 1.35, marginBottom: "10px",
        }}
          className="group-hover:text-teal-600"
        >
          {episode.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "0.875rem",
          color: "var(--explorer-text-secondary, #475569)",
          lineHeight: 1.6, marginBottom: "16px",
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as any, overflow: "hidden",
        }}>
          {episode.description || "Curated audio guides exploring clinically verified health practices."}
        </p>
      </div>

      {/* Footer */}
      <div style={{
        paddingTop: "14px",
        borderTop: "1px solid var(--explorer-border, #e2e8f0)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: "0.82rem", fontWeight: 700,
          color: isSelected ? "#0d9488" : "var(--explorer-text-secondary, #475569)",
          display: "flex", alignItems: "center", gap: "6px",
          transition: "color 0.15s",
        }}
          className={isSelected ? "" : "group-hover:text-teal-600"}
        >
          {isSelected ? "Currently Viewing Series" : "Explore Series Tracks"}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>

        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isSelected ? "#0d9488" : "var(--explorer-bg, #f8fafc)",
          color: isSelected ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
          border: `1px solid ${isSelected ? "#0d9488" : "var(--explorer-border, #e2e8f0)"}`,
          transition: "all 0.2s",
        }}
          className="group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600"
        >
          <Play size={13} style={{ marginLeft: "2px", fill: "currentColor" }} />
        </div>
      </div>
    </div>
  );
}
