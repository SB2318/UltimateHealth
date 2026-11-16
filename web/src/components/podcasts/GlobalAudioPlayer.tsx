"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Play, Pause, RotateCcw, RotateCw,
  Volume2, VolumeX, X, ExternalLink,
} from "lucide-react";
import type { PodcastData } from "@/types/podcast";
import { formatPodcastDuration, resolvePodcastAudioUrl } from "@/lib/podcast-api";

interface GlobalAudioPlayerProps {
  podcast: PodcastData | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
  locale: string;
}

const SPEED_OPTIONS = [0.8, 1.0, 1.25, 1.5, 2.0];
const FALLBACK_IMAGE = "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";

export default function GlobalAudioPlayer({
  podcast, isPlaying, onPlayPause, onClose, locale,
}: GlobalAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) setShowSpeedMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!podcast || !audioRef.current) return;
    const src = resolvePodcastAudioUrl(podcast.audio_url);
    if (audioRef.current.src !== src) {
      audioRef.current.src = src;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
  }, [podcast]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!audioRef.current || !podcast) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlaying, podcast]);

  if (!podcast) return null;

  const handleTimeUpdate = () => { if (!isSeeking && audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration || podcast.duration || 0); };
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentTime(parseFloat(e.target.value));
  const handleSeekCommit = () => { if (audioRef.current) audioRef.current.currentTime = currentTime; setIsSeeking(false); };

  const skipTime = (delta: number) => {
    if (audioRef.current) {
      const t = Math.max(0, Math.min(duration || 1000, audioRef.current.currentTime + delta));
      audioRef.current.currentTime = t; setCurrentTime(t);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) { const m = !isMuted; audioRef.current.muted = m; setIsMuted(m); }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) { audioRef.current.volume = val; if (val === 0) setIsMuted(true); else if (isMuted) setIsMuted(false); }
  };

  const handleSpeedSelect = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  const effectiveDuration = duration > 0 ? duration : (podcast.duration && podcast.duration > 1000 ? podcast.duration / 1000 : podcast.duration || 1);
  const progressPercent = Math.min(100, Math.max(0, (currentTime / (effectiveDuration || 1)) * 100));

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onPlayPause}
      />

      <div
        role="region"
        aria-label="Now Playing"
        style={{
          position: "fixed", bottom: "16px",
          left: "50%", transform: "translateX(-50%)",
          zIndex: 50,
          width: "min(96vw, 960px)",
          borderRadius: "16px",
          background: "var(--explorer-surface, #ffffff)",
          border: "1px solid var(--explorer-border, #e2e8f0)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          padding: "12px 16px 14px",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Progress Bar */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="range"
            min={0} max={effectiveDuration} step={0.1}
            value={currentTime}
            onChange={handleSeekChange}
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={handleSeekCommit}
            onTouchStart={() => setIsSeeking(true)}
            onTouchEnd={handleSeekCommit}
            aria-label="Audio scrubber"
            style={{
              width: "100%", height: "4px", appearance: "none",
              borderRadius: "50px", cursor: "pointer", outline: "none",
              background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${progressPercent}%, var(--explorer-border, #e2e8f0) ${progressPercent}%, var(--explorer-border, #e2e8f0) 100%)`,
              display: "block",
            }}
          />
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontSize: "10px", fontFamily: "monospace", fontWeight: 700,
            color: "var(--explorer-text-muted, #64748b)", marginTop: "4px",
          }}>
            <span>{formatPodcastDuration(currentTime)}</span>
            <span>{formatPodcastDuration(effectiveDuration)}</span>
          </div>
        </div>

        {/* Controls Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
          {/* Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: "0 1 300px" }}>
            <div style={{ position: "relative", width: "42px", height: "42px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, border: "1px solid var(--explorer-border, #e2e8f0)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={podcast.cover_image || FALLBACK_IMAGE}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              {isPlaying && (
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "2px",
                }}>
                  {[8, 14, 6, 11].map((h, i) => (
                    <span key={i} style={{ width: "3px", height: `${h}px`, background: "#2dd4bf", borderRadius: "2px", animation: `pulse ${0.7 + i * 0.1}s infinite alternate`, display: "block" }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <Link
                href={`/${locale}/podcasts/${podcast._id}`}
                style={{
                  display: "block", fontSize: "0.82rem", fontWeight: 700,
                  color: "var(--explorer-text-primary, #0f172a)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  textDecoration: "none", maxWidth: "200px",
                }}
                className="hover:text-teal-600"
              >
                {podcast.title}
              </Link>
              <p style={{ fontSize: "0.72rem", color: "var(--explorer-text-muted, #64748b)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {podcast.authorName || "UltimateHealth"}
              </p>
            </div>
          </div>

          {/* Center Playback */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button type="button" onClick={() => skipTime(-10)} title="Back 10s"
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "6px", borderRadius: "50%", color: "var(--explorer-text-secondary, #475569)" }}
              className="hover:text-teal-600"
            >
              <RotateCcw size={18} />
            </button>

            <button type="button" onClick={onPlayPause} title={isPlaying ? "Pause" : "Play"}
              style={{
                width: "44px", height: "44px", borderRadius: "50%", border: "none",
                background: "#0d9488", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 12px rgba(13,148,136,0.4)",
                transition: "background 0.15s, transform 0.1s",
              }}
              className="active:scale-95 hover:bg-teal-700"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: "1px" }} />}
            </button>

            <button type="button" onClick={() => skipTime(30)} title="Forward 30s"
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "6px", borderRadius: "50%", color: "var(--explorer-text-secondary, #475569)" }}
              className="hover:text-teal-600"
            >
              <RotateCw size={18} />
            </button>
          </div>

          {/* Right Utilities */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "0 1 300px", justifyContent: "flex-end" }}>
            {/* Speed */}
            <div style={{ position: "relative" }} ref={speedMenuRef}>
              <button type="button" onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                style={{
                  padding: "5px 10px", borderRadius: "8px",
                  background: "var(--explorer-bg, #f8fafc)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  color: "var(--explorer-text-primary, #0f172a)",
                  fontSize: "0.75rem", fontWeight: 800, cursor: "pointer",
                }}
              >
                {playbackSpeed}×
              </button>
              {showSpeedMenu && (
                <div style={{
                  position: "absolute", bottom: "calc(100% + 8px)", right: 0,
                  background: "var(--explorer-surface, #ffffff)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  borderRadius: "12px", padding: "5px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 60,
                  display: "flex", flexDirection: "column", gap: "2px", minWidth: "68px",
                }}>
                  {SPEED_OPTIONS.map((sp) => (
                    <button key={sp} type="button" onClick={() => handleSpeedSelect(sp)}
                      style={{
                        padding: "5px 8px", borderRadius: "7px", border: "none",
                        textAlign: "left" as const, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                        background: playbackSpeed === sp ? "#0d9488" : "transparent",
                        color: playbackSpeed === sp ? "#fff" : "var(--explorer-text-primary, #0f172a)",
                      }}
                    >
                      {sp}×
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Volume (desktop) */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }} className="hidden md:flex">
              <button type="button" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--explorer-text-muted, #64748b)" }}
              >
                {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input
                type="range" min={0} max={1} step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                style={{
                  width: "60px", height: "3px", appearance: "none", cursor: "pointer",
                  borderRadius: "50px",
                  background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${(isMuted ? 0 : volume) * 100}%, var(--explorer-border, #e2e8f0) ${(isMuted ? 0 : volume) * 100}%, var(--explorer-border, #e2e8f0) 100%)`,
                }}
              />
            </div>

            {/* Detail link */}
            <Link
              href={`/${locale}/podcasts/${podcast._id}`}
              title="Open full podcast page"
              style={{
                display: "flex", alignItems: "center", padding: "7px", borderRadius: "8px",
                color: "var(--explorer-text-muted, #64748b)", textDecoration: "none",
                background: "var(--explorer-bg, #f8fafc)", border: "1px solid var(--explorer-border, #e2e8f0)",
                transition: "all 0.15s",
              }}
              className="hover:text-teal-600 hover:border-teal-500"
            >
              <ExternalLink size={16} />
            </Link>

            {/* Close */}
            <button type="button" onClick={onClose} title="Close player"
              style={{
                display: "flex", alignItems: "center", padding: "7px", borderRadius: "8px",
                color: "var(--explorer-text-muted, #64748b)", background: "none", border: "none", cursor: "pointer",
                transition: "color 0.15s",
              }}
              className="hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
