"use client";

import React from "react";
import { Headphones, Volume2 } from "lucide-react";

interface ListenTriggerButtonProps {
  isPlaying: boolean;
  isPaused: boolean;
  onClick: () => void;
  variant?: "header" | "hero";
  durationStr?: string;
}

export default function ListenTriggerButton({
  isPlaying,
  isPaused,
  onClick,
  variant = "header",
  durationStr,
}: ListenTriggerButtonProps) {
  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={isPlaying ? "Pause audio reading" : "Listen to this article"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 22px",
          borderRadius: "50px",
          fontSize: "0.875rem",
          fontWeight: 700,
          background: isPlaying
            ? "rgba(13, 148, 136, 0.12)"
            : "var(--explorer-surface, #f1f5f9)",
          color: isPlaying ? "#0d9488" : "var(--explorer-text-primary, #0f172a)",
          border: isPlaying
            ? "1px solid #0d9488"
            : "1px solid var(--explorer-border, #e2e8f0)",
          boxShadow: isPlaying
            ? "0 0 20px rgba(13, 148, 136, 0.2)"
            : "0 4px 14px rgba(0, 0, 0, 0.06)",
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          if (!isPlaying) {
            e.currentTarget.style.borderColor = "#0d9488";
            e.currentTarget.style.color = "#0d9488";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isPlaying) {
            e.currentTarget.style.borderColor = "var(--explorer-border, #e2e8f0)";
            e.currentTarget.style.color = "var(--explorer-text-primary, #0f172a)";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
      >
        {isPlaying ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px" }}>
              <span
                style={{
                  width: "3px",
                  height: "100%",
                  background: "#0d9488",
                  borderRadius: "2px",
                  animation: "soundwave 0.8s ease-in-out infinite alternate",
                }}
              />
              <span
                style={{
                  width: "3px",
                  height: "60%",
                  background: "#0d9488",
                  borderRadius: "2px",
                  animation: "soundwave 0.8s ease-in-out infinite alternate 0.2s",
                }}
              />
              <span
                style={{
                  width: "3px",
                  height: "85%",
                  background: "#0d9488",
                  borderRadius: "2px",
                  animation: "soundwave 0.8s ease-in-out infinite alternate 0.4s",
                }}
              />
            </div>
            <span>Listening...</span>
          </>
        ) : (
          <>
            <Headphones size={16} className="text-[#0d9488]" />
            <span>Listen to Article</span>
            {durationStr && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--explorer-text-secondary, #64748b)",
                  padding: "2px 8px",
                  background: "var(--explorer-surface, rgba(0,0,0,0.04))",
                  borderRadius: "10px",
                }}
              >
                {durationStr}
              </span>
            )}
          </>
        )}
      </button>
    );
  }

  // Header pill variant
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPlaying ? "Pause audio reading" : "Listen to article"}
      title={isPlaying ? "Pause audio" : "Listen to article"}
      style={{
        height: "32px",
        padding: "0 10px",
        borderRadius: "8px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.75rem",
        fontWeight: 700,
        background: isPlaying
          ? "rgba(13, 148, 136, 0.12)"
          : "var(--explorer-surface, #f1f5f9)",
        color: isPlaying ? "#0d9488" : "var(--explorer-text-primary, #475569)",
        border: isPlaying
          ? "1px solid rgba(13, 148, 136, 0.5)"
          : "1px solid var(--explorer-border, #e2e8f0)",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!isPlaying) {
          e.currentTarget.style.borderColor = "#0d9488";
          e.currentTarget.style.color = "#0d9488";
        }
      }}
      onMouseLeave={(e) => {
        if (!isPlaying) {
          e.currentTarget.style.borderColor = "var(--explorer-border, #e2e8f0)";
          e.currentTarget.style.color = "var(--explorer-text-primary, #475569)";
        }
      }}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="text-[#0d9488] animate-pulse" />
          <span style={{ color: "#0d9488" }}>Playing</span>
        </>
      ) : isPaused ? (
        <>
          <Headphones size={13} className="text-amber-500" />
          <span style={{ color: "#f59e0b" }}>Paused</span>
        </>
      ) : (
        <>
          <Headphones size={13} className="text-[#0d9488]" />
          <span>Listen</span>
        </>
      )}
    </button>
  );
}
