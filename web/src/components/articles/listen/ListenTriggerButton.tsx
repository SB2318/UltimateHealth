"use client";

import React from "react";
import { Headphones, Volume2, Square } from "lucide-react";

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
            ? "linear-gradient(135deg, rgba(45, 212, 191, 0.22), rgba(6, 182, 212, 0.22))"
            : "rgba(20, 20, 36, 0.8)",
          color: isPlaying ? "#2dd4bf" : "#f1f5f9",
          border: isPlaying ? "1px solid #2dd4bf" : "1px solid #2e2e48",
          boxShadow: isPlaying
            ? "0 0 20px rgba(45, 212, 191, 0.35)"
            : "0 4px 14px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          if (!isPlaying) {
            e.currentTarget.style.borderColor = "#2dd4bf";
            e.currentTarget.style.color = "#2dd4bf";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isPlaying) {
            e.currentTarget.style.borderColor = "#2e2e48";
            e.currentTarget.style.color = "#f1f5f9";
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
                  background: "#2dd4bf",
                  borderRadius: "2px",
                  animation: "soundwave 0.8s ease-in-out infinite alternate",
                }}
              />
              <span
                style={{
                  width: "3px",
                  height: "60%",
                  background: "#2dd4bf",
                  borderRadius: "2px",
                  animation: "soundwave 0.8s ease-in-out infinite alternate 0.2s",
                }}
              />
              <span
                style={{
                  width: "3px",
                  height: "85%",
                  background: "#2dd4bf",
                  borderRadius: "2px",
                  animation: "soundwave 0.8s ease-in-out infinite alternate 0.4s",
                }}
              />
            </div>
            <span>Listening...</span>
          </>
        ) : (
          <>
            <Headphones size={16} className="text-[#2dd4bf]" />
            <span>Listen to Article</span>
            {durationStr && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  padding: "2px 8px",
                  background: "rgba(255, 255, 255, 0.05)",
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
        background: isPlaying ? "rgba(45, 212, 191, 0.16)" : "#141422",
        color: isPlaying ? "#2dd4bf" : "#cbd5e1",
        border: isPlaying ? "1px solid rgba(45, 212, 191, 0.5)" : "1px solid #28283e",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!isPlaying) {
          e.currentTarget.style.borderColor = "#3e3e5c";
          e.currentTarget.style.color = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (!isPlaying) {
          e.currentTarget.style.borderColor = "#28283e";
          e.currentTarget.style.color = "#cbd5e1";
        }
      }}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="text-[#2dd4bf] animate-pulse" />
          <span style={{ color: "#2dd4bf" }}>Playing</span>
        </>
      ) : isPaused ? (
        <>
          <Headphones size={13} className="text-amber-400" />
          <span style={{ color: "#fbbf24" }}>Paused</span>
        </>
      ) : (
        <>
          <Headphones size={13} className="text-[#2dd4bf]" />
          <span>Listen</span>
        </>
      )}
    </button>
  );
}
