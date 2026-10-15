"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  X,
  Volume2,
  Headphones,
  SlidersHorizontal,
} from "lucide-react";
import { UseArticleSpeechReturn } from "@/hooks/use-article-speech";

interface ArticleAudioPlayerProps {
  speech: UseArticleSpeechReturn;
  articleTitle: string;
}

const SPEED_OPTIONS = [0.8, 1.0, 1.25, 1.5, 2.0];

export default function ArticleAudioPlayer({
  speech,
  articleTitle,
}: ArticleAudioPlayerProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);

  // If player is neither playing nor paused and user hasn't opened it, don't show
  if (!speech.isActive) return null;

  return (
    <div
      role="region"
      aria-label="Article Audio Player"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(94vw, 860px)",
        background: "rgba(14, 14, 24, 0.96)",
        backdropFilter: "blur(20px)",
        border: "1px solid #282842",
        borderRadius: "18px",
        boxShadow: "0 14px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(45, 212, 191, 0.15)",
        zIndex: 60,
        padding: "14px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        animation: "slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ── Top Row: Info, Controls, Speeds, Close ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          width: "100%",
        }}
      >
        {/* Left: Article title & live caption preview */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: speech.isPlaying
                ? "linear-gradient(135deg, rgba(45, 212, 191, 0.25), rgba(6, 182, 212, 0.25))"
                : "rgba(30, 30, 48, 0.7)",
              border: speech.isPlaying ? "1px solid #2dd4bf" : "1px solid #2e2e48",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: speech.isPlaying ? "#2dd4bf" : "#94a3b8",
              flexShrink: 0,
            }}
          >
            {speech.isPlaying ? (
              <Volume2 size={18} className="animate-pulse" />
            ) : (
              <Headphones size={18} />
            )}
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#f1f5f9",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={articleTitle}
            >
              {articleTitle}
            </p>
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: "0.75rem",
                color: "#94a3b8",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {speech.currentText || (speech.isPaused ? "Paused" : "Reading article...")}
            </p>
          </div>
        </div>

        {/* Center: Playback Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Rewind 15s */}
          <button
            type="button"
            onClick={speech.skipBackward}
            title="Rewind"
            aria-label="Rewind"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid #252538",
              color: "#cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <RotateCcw size={14} />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            type="button"
            onClick={speech.togglePlay}
            title={speech.isPlaying ? "Pause" : "Play"}
            aria-label={speech.isPlaying ? "Pause" : "Play"}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2dd4bf 0%, #06b6d4 100%)",
              border: "none",
              color: "#08080f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(45, 212, 191, 0.4)",
              transition: "transform 0.15s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {speech.isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" style={{ marginLeft: "2px" }} />
            )}
          </button>

          {/* Forward 15s */}
          <button
            type="button"
            onClick={speech.skipForward}
            title="Forward"
            aria-label="Forward"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid #252538",
              color: "#cbd5e1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <RotateCw size={14} />
          </button>
        </div>

        {/* Right: Speed Toggle & Close Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, position: "relative" }}>
          {/* Speed Button */}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              title="Playback Speed"
              aria-label="Playback Speed"
              style={{
                height: "30px",
                padding: "0 9px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid #28283e",
                color: "#2dd4bf",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <span>{speech.speed}x</span>
            </button>

            {/* Speed popover menu */}
            {showSpeedMenu && (
              <div
                style={{
                  position: "absolute",
                  bottom: "38px",
                  right: 0,
                  background: "#161626",
                  border: "1px solid #2e2e48",
                  borderRadius: "10px",
                  padding: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  zIndex: 70,
                }}
              >
                {SPEED_OPTIONS.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      speech.setSpeed(rate);
                      setShowSpeedMenu(false);
                    }}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: speech.speed === rate ? "rgba(45, 212, 191, 0.18)" : "transparent",
                      color: speech.speed === rate ? "#2dd4bf" : "#cbd5e1",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {rate}x {rate === 1.0 ? "(Normal)" : ""}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close / Stop Button */}
          <button
            type="button"
            onClick={speech.stop}
            title="Close Player"
            aria-label="Close audio player"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f43f5e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Bottom Row: Scrubber Bar & Timestamps ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#94a3b8", minWidth: "32px", textAlign: "right" }}>
          {speech.elapsedTimeStr}
        </span>

        {/* Scrub Slider */}
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={speech.progressPercent}
            onChange={(e) => speech.seek(Number(e.target.value))}
            aria-label="Audio reading progress"
            style={{
              width: "100%",
              height: "4px",
              borderRadius: "4px",
              accentColor: "#2dd4bf",
              background: `linear-gradient(to right, #2dd4bf ${speech.progressPercent}%, #252538 ${speech.progressPercent}%)`,
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>

        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#64748b", minWidth: "32px" }}>
          {speech.totalDurationStr}
        </span>
      </div>
    </div>
  );
}
