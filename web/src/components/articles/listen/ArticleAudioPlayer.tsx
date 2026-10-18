"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  X,
  Volume2,
  Headphones,
  Check,
  Languages,
} from "lucide-react";
import { UseArticleSpeechReturn } from "@/hooks/use-article-speech";
import { getListenStrings } from "@/lib/audio/listen-translations";

interface ArticleAudioPlayerProps {
  speech: UseArticleSpeechReturn;
  articleTitle: string;
  locale?: string;
}

const SPEED_OPTIONS = [0.8, 1.0, 1.25, 1.5, 2.0];

function cleanVoiceName(name?: string): string {
  if (!name) return "";
  return name
    .replace(/^Microsoft\s+/i, "")
    .replace(/^Google\s+/i, "")
    .replace(/^Apple\s+/i, "")
    .replace(/\s+Desktop/i, "")
    .replace(/\s+Online\s+\(Natural\)/i, " (Natural)")
    .replace(/\s+-\s+.*$/, "")
    .trim();
}

export default function ArticleAudioPlayer({
  speech,
  articleTitle,
  locale,
}: ArticleAudioPlayerProps) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const speedRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<HTMLDivElement>(null);

  const strings = speech.strings || getListenStrings(locale || speech.locale);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (speedRef.current && !speedRef.current.contains(e.target as Node)) {
        setShowSpeedMenu(false);
      }
      if (voiceRef.current && !voiceRef.current.contains(e.target as Node)) {
        setShowVoiceMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // If player is neither playing nor paused and user hasn't opened it, don't show
  if (!speech.isActive) return null;

  const currentVoiceName = speech.selectedVoice
    ? cleanVoiceName(speech.selectedVoice.name)
    : strings.systemVoice;

  return (
    <div
      role="region"
      aria-label={strings.listenToArticle}
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(94vw, 880px)",
        background: "var(--player-bg, rgba(255,255,255,0.97))",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--player-border, #e2e8f0)",
        borderRadius: "18px",
        boxShadow: "var(--player-shadow, 0 14px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(13,148,136,0.1))",
        zIndex: 60,
        padding: "14px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        animation: "slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ── Top Row: Info, Controls, Speeds, Voices, Close ── */}
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
                ? "linear-gradient(135deg, rgba(13, 148, 136, 0.18), rgba(6, 182, 212, 0.18))"
                : "var(--explorer-surface, #f1f5f9)",
              border: speech.isPlaying
                ? "1px solid #0d9488"
                : "1px solid var(--explorer-border, #e2e8f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: speech.isPlaying ? "#0d9488" : "var(--explorer-text-secondary, #64748b)",
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
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--explorer-text-primary, #0f172a)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={articleTitle}
              >
                {articleTitle}
              </p>
              {/* Language Indicator Badge */}
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  background: "rgba(13, 148, 136, 0.1)",
                  color: "#0d9488",
                  border: "1px solid rgba(13, 148, 136, 0.2)",
                  flexShrink: 0,
                }}
                title={`${strings.languageName} (${speech.languageCode})`}
              >
                {speech.locale.toUpperCase()}
              </span>
            </div>
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: "0.75rem",
                color: "var(--explorer-text-secondary, #64748b)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {speech.currentText || (speech.isPaused ? strings.paused : strings.readingArticle)}
            </p>
          </div>
        </div>

        {/* Center: Playback Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Rewind */}
          <button
            type="button"
            onClick={speech.skipBackward}
            title={strings.rewind}
            aria-label={strings.rewind}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--explorer-surface, #f1f5f9)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              color: "var(--explorer-text-primary, #334155)",
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
            title={speech.isPlaying ? strings.paused : strings.listen}
            aria-label={speech.isPlaying ? strings.paused : strings.listen}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)",
              border: "none",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(13, 148, 136, 0.35)",
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

          {/* Forward */}
          <button
            type="button"
            onClick={speech.skipForward}
            title={strings.forward}
            aria-label={strings.forward}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "var(--explorer-surface, #f1f5f9)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              color: "var(--explorer-text-primary, #334155)",
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

        {/* Right: Localized Voice Selector, Speed Toggle & Close Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, position: "relative" }}>
          {/* Voice Selector Pill */}
          <div ref={voiceRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                setShowVoiceMenu(!showVoiceMenu);
                setShowSpeedMenu(false);
              }}
              title={`${strings.voice}: ${currentVoiceName}`}
              aria-label={`${strings.voice}: ${currentVoiceName}`}
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "8px",
                background: "var(--explorer-surface, #f1f5f9)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                color: "var(--explorer-text-primary, #334155)",
                fontSize: "0.75rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
                maxWidth: "140px",
              }}
            >
              <Languages size={13} className="text-[#0d9488] shrink-0" />
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentVoiceName}
              </span>
            </button>

            {/* Voice Dropdown Popover */}
            {showVoiceMenu && (
              <div
                style={{
                  position: "absolute",
                  bottom: "38px",
                  right: 0,
                  width: "260px",
                  maxHeight: "280px",
                  overflowY: "auto",
                  background: "var(--player-bg, #ffffff)",
                  border: "1px solid var(--player-border, #e2e8f0)",
                  borderRadius: "12px",
                  padding: "6px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.16)",
                  zIndex: 75,
                }}
              >
                <div
                  style={{
                    padding: "4px 8px 6px",
                    borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--explorer-text-secondary, #64748b)" }}>
                    {strings.voice} · {strings.nativeLanguageName}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#0d9488", fontWeight: 700 }}>
                    {speech.languageCode}
                  </span>
                </div>

                {/* If available language voices exist, list them */}
                {speech.languageVoices && speech.languageVoices.length > 0 ? (
                  speech.languageVoices.map((v) => {
                    const isSelected = speech.selectedVoice?.name === v.name;
                    return (
                      <button
                        key={v.name}
                        type="button"
                        onClick={() => {
                          speech.setVoice(v);
                          setShowVoiceMenu(false);
                        }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: isSelected ? 700 : 500,
                          background: isSelected ? "rgba(13, 148, 136, 0.12)" : "transparent",
                          color: isSelected ? "#0d9488" : "var(--explorer-text-primary, #334155)",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {cleanVoiceName(v.name)}
                        </span>
                        {isSelected && <Check size={14} className="text-[#0d9488] shrink-0" />}
                      </button>
                    );
                  })
                ) : (
                  <div style={{ padding: "10px 8px", textAlign: "center" }}>
                    <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700, color: "#0d9488" }}>
                      {strings.systemVoice} ({speech.languageCode})
                    </p>
                    <p style={{ margin: "4px 0 0", fontSize: "0.7rem", color: "var(--explorer-text-secondary, #64748b)" }}>
                      Using browser native speech engine calibrated for {strings.nativeLanguageName}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Speed Button */}
          <div ref={speedRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                setShowSpeedMenu(!showSpeedMenu);
                setShowVoiceMenu(false);
              }}
              title={strings.speed}
              aria-label={strings.speed}
              style={{
                height: "30px",
                padding: "0 10px",
                borderRadius: "8px",
                background: "var(--explorer-surface, #f1f5f9)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                color: "#0d9488",
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
                  background: "var(--player-bg, #ffffff)",
                  border: "1px solid var(--player-border, #e2e8f0)",
                  borderRadius: "10px",
                  padding: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
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
                      background: speech.speed === rate ? "rgba(13, 148, 136, 0.12)" : "transparent",
                      color: speech.speed === rate ? "#0d9488" : "var(--explorer-text-primary, #334155)",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rate}x {rate === 1.0 ? `(${strings.normalSpeed})` : ""}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close / Stop Button */}
          <button
            type="button"
            onClick={speech.stop}
            title={strings.closePlayer}
            aria-label={strings.closePlayer}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "transparent",
              border: "none",
              color: "var(--explorer-text-secondary, #94a3b8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f43f5e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--explorer-text-secondary, #94a3b8)")}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Bottom Row: Scrubber Bar & Timestamps ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--explorer-text-secondary, #64748b)", minWidth: "32px", textAlign: "right" }}>
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
              accentColor: "#0d9488",
              background: `linear-gradient(to right, #0d9488 ${speech.progressPercent}%, var(--track-bg, #e2e8f0) ${speech.progressPercent}%)`,
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>

        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--explorer-text-muted, #94a3b8)", minWidth: "32px" }}>
          {speech.totalDurationStr}
        </span>
      </div>
    </div>
  );
}
