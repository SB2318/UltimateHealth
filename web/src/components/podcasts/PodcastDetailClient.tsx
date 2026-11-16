"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX,
  Share2, Heart, Download, ArrowLeft, Clock, Eye, Calendar,
  Layers, ShieldCheck, Headphones, Disc3, Check,
} from "lucide-react";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import type { PodcastData, PodcastEpisode } from "@/types/podcast";
import {
  formatPodcastDuration, formatPodcastDate,
  resolvePodcastAudioUrl, getPodcastAuthorInfo,
} from "@/lib/podcast-api";
import { withBasePath } from "@/lib/basePath";
import PodcastCard from "./PodcastCard";
import EpisodeNotesTranscript from "./EpisodeNotesTranscript";

interface PodcastDetailClientProps {
  podcast: PodcastData;
  relatedPodcasts: PodcastData[];
  seriesEpisode?: PodcastEpisode | null;
  locale: string;
}

const SPEED_OPTIONS = [0.8, 1.0, 1.25, 1.5, 2.0];
const FALLBACK_IMAGE = "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";

function getSafeImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string" || !url.trim()) return FALLBACK_IMAGE;
  const trimmed = url.trim();
  if (trimmed.startsWith("/api/proxy-image")) return withBasePath(trimmed);
  if (trimmed.includes("ultimatehealth.blog") || trimmed.includes("uhsocial.in")) {
    return withBasePath(`/api/proxy-image?url=${encodeURIComponent(trimmed)}`);
  }
  return trimmed;
}

export default function PodcastDetailClient({
  podcast, relatedPodcasts, seriesEpisode, locale,
}: PodcastDetailClientProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(podcast.likedUsers?.length || 0);
  const [copied, setCopied] = useState(false);
  const [currentlyPlayingRelated, setCurrentlyPlayingRelated] = useState<PodcastData | null>(null);
  const [relatedIsPlaying, setRelatedIsPlaying] = useState(false);

  const speedMenuRef = useRef<HTMLDivElement>(null);
  const author = getPodcastAuthorInfo(podcast.user_id);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setShowSpeedMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeUpdate = () => { if (!isSeeking && audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration || podcast.duration || 0); };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setIsPlaying(true); }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentTime(parseFloat(e.target.value));
  const handleSeekCommit = () => { if (audioRef.current) audioRef.current.currentTime = currentTime; setIsSeeking(false); };

  const handleSeekToTimestamp = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

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

  const handleLikeToggle = () => {
    if (isLiked) { setIsLiked(false); setLikesCount(p => Math.max(0, p - 1)); }
    else { setIsLiked(true); setLikesCount(p => p + 1); }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/podcasts/${podcast._id}`
      : `/${locale}/podcasts/${podcast._id}`;
    if (navigator.share) {
      try { await navigator.share({ title: podcast.title, text: podcast.description, url }); return; } catch { /* ignored */ }
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const effectiveDuration = duration > 0 ? duration : (podcast.duration && podcast.duration > 1000 ? podcast.duration / 1000 : podcast.duration || 600);
  const progressPercent = Math.min(100, Math.max(0, (currentTime / (effectiveDuration || 1)) * 100));

  return (
    <>
      <SiteHeader />

      <main style={{ minHeight: "100vh", background: "var(--explorer-bg, #f8fafc)", color: "var(--explorer-text-primary, #0f172a)" }}>
        {/* Hidden Audio */}
        <audio
          ref={audioRef}
          src={resolvePodcastAudioUrl(podcast.audio_url)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* ── Sticky top nav (matches ArticlePageClient) ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50, width: "100%",
          background: "var(--explorer-surface, #ffffff)",
          borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            maxWidth: "860px", margin: "0 auto",
            padding: "0 16px", height: "60px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
          }}>
            <Link
              href={`/${locale}/podcasts`}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: "8px", minWidth: "140px", height: "42px",
                padding: "0 20px 0 16px", borderRadius: "10px",
                fontSize: "0.875rem", fontWeight: 600,
                color: "var(--explorer-text-primary, #0f172a)",
                background: "var(--explorer-bg, #f8fafc)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              className="hover:border-teal-500 hover:text-teal-600"
            >
              <ArrowLeft size={17} style={{ color: "#0d9488" }} />
              <span>Podcasts</span>
            </Link>

            <div style={{
              flex: 1, minWidth: 0, display: "flex",
              justifyContent: "center", padding: "0 12px",
              overflow: "hidden",
            }}>
              <p style={{
                fontSize: "0.875rem", fontWeight: 600,
                color: "var(--explorer-text-primary, #0f172a)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                maxWidth: "460px",
              }}>
                {podcast.title}
              </p>
            </div>

            <button
              type="button"
              onClick={togglePlay}
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 16px", borderRadius: "10px",
                background: isPlaying ? "#0d9488" : "var(--explorer-bg, #f8fafc)",
                border: `1px solid ${isPlaying ? "#0d9488" : "var(--explorer-border, #e2e8f0)"}`,
                color: isPlaying ? "#ffffff" : "var(--explorer-text-primary, #0f172a)",
                fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {isPlaying ? <Pause size={15} style={{ fill: "currentColor" }} /> : <Play size={15} style={{ fill: "currentColor", marginLeft: "1px" }} />}
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </header>

        {/* ── Page content wrapper ── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* ── Main Audio Console Card ── */}
          <div style={{
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "20px",
            boxShadow: "var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.05))",
            overflow: "hidden",
            marginBottom: "32px",
          }}>
            {/* Cover + Info Row */}
            <div style={{
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: "0", alignItems: "stretch",
            }}>
              {/* Cover Art */}
              <div style={{ position: "relative", width: "220px", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getSafeImageUrl(podcast.cover_image)}
                  alt={podcast.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "220px" }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    if (podcast.cover_image && !e.currentTarget.src.includes("/api/proxy-image")) {
                      e.currentTarget.src = withBasePath(`/api/proxy-image?url=${encodeURIComponent(podcast.cover_image)}`);
                    } else {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                {/* Equalizer overlay */}
                {isPlaying && (
                  <div style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                  }}>
                    {[12, 20, 10, 18, 8].map((h, i) => (
                      <span key={i} style={{
                        width: "5px", height: `${h}px`, background: "#2dd4bf",
                        borderRadius: "3px", animation: `pulse ${0.8 + i * 0.1}s infinite alternate`,
                        display: "block",
                      }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Info Panel */}
              <div style={{ padding: "28px 28px 20px", display: "flex", flexDirection: "column", gap: "12px", minWidth: 0 }}>
                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{
                    padding: "3px 12px", borderRadius: "50px",
                    background: "rgba(13,148,136,0.9)", color: "#fff",
                    fontSize: "11px", fontWeight: 800,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>
                    {podcast.category || "Medical Guide"}
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    padding: "3px 10px", borderRadius: "50px",
                    background: "var(--explorer-bg, #f8fafc)",
                    border: "1px solid var(--explorer-border, #e2e8f0)",
                    color: "var(--explorer-text-secondary, #475569)",
                    fontSize: "11px", fontWeight: 700,
                  }}>
                    <Clock size={11} /> {formatPodcastDuration(podcast.duration)}
                  </span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    padding: "3px 10px", borderRadius: "50px",
                    background: "var(--explorer-bg, #f8fafc)",
                    border: "1px solid var(--explorer-border, #e2e8f0)",
                    color: "var(--explorer-text-secondary, #475569)",
                    fontSize: "11px", fontWeight: 700,
                  }}>
                    <Eye size={11} /> {podcast.viewCount || 0} listens
                  </span>
                </div>

                {/* Title */}
                <h1 style={{
                  fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 800,
                  color: "var(--explorer-text-primary, #0f172a)",
                  lineHeight: 1.3, margin: 0,
                }}>
                  {podcast.title}
                </h1>

                {/* Author */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px", borderRadius: "12px",
                  background: "var(--explorer-bg, #f8fafc)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getSafeImageUrl(author.avatar)}
                    alt={author.name}
                    style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(13,148,136,0.3)", flexShrink: 0 }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      if (author.avatar && !e.currentTarget.src.includes("/api/proxy-image")) {
                        e.currentTarget.src = withBasePath(`/api/proxy-image?url=${encodeURIComponent(author.avatar)}`);
                      } else {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--explorer-text-primary, #0f172a)" }}>
                        {author.name}
                      </span>
                      <span title="Verified Medical Contributor">
                        <ShieldCheck size={14} color="#0d9488" />
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--explorer-text-muted, #64748b)" }}>{author.role}</span>
                  </div>

                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                    <Calendar size={12} color="#64748b" />
                    <span style={{ fontSize: "0.75rem", color: "var(--explorer-text-muted, #64748b)" }}>
                      {formatPodcastDate(podcast.created_at || podcast.updated_at)}
                    </span>
                  </div>
                </div>

                {/* Series badge */}
                {seriesEpisode && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "6px 12px", borderRadius: "10px", width: "fit-content",
                    background: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.25)",
                    color: "#0d9488", fontSize: "0.78rem", fontWeight: 700,
                  }}>
                    <Disc3 size={14} />
                    Part of <strong style={{ marginLeft: "3px" }}>{seriesEpisode.name}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* ── Audio Player ── */}
            <div style={{
              borderTop: "1px solid var(--explorer-border, #e2e8f0)",
              padding: "20px 28px 24px",
              background: "var(--explorer-bg, #f8fafc)",
            }}>
              {/* Progress Scrubber */}
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="range"
                  min={0} max={effectiveDuration} step={0.1}
                  value={currentTime}
                  onChange={handleSeekChange}
                  onMouseDown={() => setIsSeeking(true)}
                  onMouseUp={handleSeekCommit}
                  onTouchStart={() => setIsSeeking(true)}
                  onTouchEnd={handleSeekCommit}
                  aria-label="Seek timeline"
                  style={{
                    width: "100%", height: "6px", borderRadius: "50px",
                    appearance: "none", cursor: "pointer", outline: "none",
                    background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${progressPercent}%, var(--explorer-border, #e2e8f0) ${progressPercent}%, var(--explorer-border, #e2e8f0) 100%)`,
                  }}
                />
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "11px", fontFamily: "monospace", fontWeight: 700,
                  color: "var(--explorer-text-muted, #64748b)", marginTop: "6px",
                }}>
                  <span>{formatPodcastDuration(currentTime)}</span>
                  <span>{formatPodcastDuration(effectiveDuration)}</span>
                </div>
              </div>

              {/* Controls Row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                {/* Skip -10 */}
                <button type="button" onClick={() => skipTime(-10)} title="Skip back 10s"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", borderRadius: "50%", color: "var(--explorer-text-secondary, #475569)", display: "flex", transition: "color 0.15s" }}
                  className="hover:text-teal-600"
                >
                  <RotateCcw size={22} />
                </button>

                {/* Play/Pause */}
                <button type="button" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}
                  style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: "#0d9488", color: "#fff", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(13,148,136,0.4)",
                    transition: "background 0.15s, transform 0.1s",
                  }}
                  className="active:scale-95 hover:bg-teal-700"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: "2px" }} />}
                </button>

                {/* Skip +30 */}
                <button type="button" onClick={() => skipTime(30)} title="Skip forward 30s"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", borderRadius: "50%", color: "var(--explorer-text-secondary, #475569)", display: "flex", transition: "color 0.15s" }}
                  className="hover:text-teal-600"
                >
                  <RotateCw size={22} />
                </button>

                {/* Speed */}
                <div style={{ position: "relative" }} ref={speedMenuRef}>
                  <button
                    type="button"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    style={{
                      padding: "7px 12px", borderRadius: "10px",
                      background: "var(--explorer-surface, #ffffff)",
                      border: "1px solid var(--explorer-border, #e2e8f0)",
                      color: "var(--explorer-text-primary, #0f172a)",
                      fontSize: "0.78rem", fontWeight: 800, cursor: "pointer",
                    }}
                  >
                    {playbackSpeed}×
                  </button>
                  {showSpeedMenu && (
                    <div style={{
                      position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--explorer-surface, #ffffff)",
                      border: "1px solid var(--explorer-border, #e2e8f0)",
                      borderRadius: "12px", padding: "6px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      zIndex: 20, minWidth: "72px",
                      display: "flex", flexDirection: "column", gap: "2px",
                    }}>
                      {SPEED_OPTIONS.map((sp) => (
                        <button key={sp} type="button" onClick={() => handleSpeedSelect(sp)}
                          style={{
                            padding: "6px 10px", borderRadius: "8px", textAlign: "left" as const,
                            fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", border: "none",
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

                {/* Volume (desktop only) */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button type="button" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}
                    style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--explorer-text-secondary, #475569)" }}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range" min={0} max={1} step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume"
                    style={{
                      width: "72px", height: "4px", appearance: "none", cursor: "pointer",
                      borderRadius: "50px", background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${(isMuted ? 0 : volume) * 100}%, var(--explorer-border, #e2e8f0) ${(isMuted ? 0 : volume) * 100}%, var(--explorer-border, #e2e8f0) 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Action Bar ── */}
            <div style={{
              borderTop: "1px solid var(--explorer-border, #e2e8f0)",
              padding: "14px 28px",
              display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap",
            }}>
              {/* Like */}
              <button
                type="button"
                onClick={handleLikeToggle}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
                  background: isLiked ? "rgba(239, 68, 68, 0.08)" : "var(--explorer-bg, #f8fafc)",
                  border: isLiked ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid var(--explorer-border, #e2e8f0)",
                  color: isLiked ? "#ef4444" : "var(--explorer-text-secondary, #475569)",
                  fontSize: "0.82rem", fontWeight: 700, transition: "all 0.15s",
                }}
              >
                <Heart size={15} style={{ fill: isLiked ? "currentColor" : "none" }} />
                {likesCount}
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
                  background: "var(--explorer-bg, #f8fafc)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  color: "var(--explorer-text-secondary, #475569)",
                  fontSize: "0.82rem", fontWeight: 700, transition: "all 0.15s",
                }}
                className="hover:border-teal-500 hover:text-teal-600"
              >
                {copied ? <Check size={15} color="#22c55e" /> : <Share2 size={15} />}
                {copied ? "Copied!" : "Share"}
              </button>

              {/* Download */}
              <a
                href={resolvePodcastAudioUrl(podcast.audio_url)}
                download
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", borderRadius: "10px",
                  background: "var(--explorer-bg, #f8fafc)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  color: "var(--explorer-text-secondary, #475569)",
                  fontSize: "0.82rem", fontWeight: 700, textDecoration: "none",
                  transition: "all 0.15s",
                }}
                className="hover:border-teal-500 hover:text-teal-600"
              >
                <Download size={15} /> Download
              </a>

              {podcast.episode_id && (
                <Link
                  href={`/${locale}/podcasts`}
                  style={{
                    marginLeft: "auto",
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px", borderRadius: "10px",
                    background: "rgba(13,148,136,0.08)",
                    border: "1px solid rgba(13,148,136,0.25)",
                    color: "#0d9488",
                    fontSize: "0.82rem", fontWeight: 700, textDecoration: "none",
                  }}
                >
                  <Layers size={14} /> More Episodes
                </Link>
              )}
            </div>
          </div>

          {/* ── Description Card ── */}
          <div style={{
            background: "var(--explorer-surface, #ffffff)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "16px", padding: "24px 28px",
            boxShadow: "var(--explorer-card-shadow, 0 2px 10px rgba(0,0,0,0.04))",
            marginBottom: "32px",
          }}>
            <h2 style={{
              fontSize: "1rem", fontWeight: 800,
              color: "var(--explorer-text-primary, #0f172a)",
              margin: "0 0 12px", display: "flex", alignItems: "center", gap: "8px",
            }}>
              <Headphones size={18} color="#0d9488" />
              About this Episode
            </h2>
            <p style={{
              fontSize: "0.95rem", lineHeight: 1.75,
              color: "var(--explorer-text-secondary, #475569)", margin: 0,
            }}>
              {podcast.description}
            </p>

            {/* Tags */}
            {podcast.tags && podcast.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "16px" }}>
                {podcast.tags.map((tag, i) => {
                  const tagName = typeof tag === "string" ? tag : tag.name || "";
                  return tagName ? (
                    <span key={i} style={{
                      padding: "4px 12px", borderRadius: "50px",
                      background: "rgba(13,148,136,0.08)",
                      border: "1px solid rgba(13,148,136,0.25)",
                      color: "#0d9488", fontSize: "0.78rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>
                      {tagName}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* ── Full Episode & Notes / Interactive Transcript ── */}
          <EpisodeNotesTranscript
            podcast={podcast}
            currentTime={currentTime}
            onSeek={handleSeekToTimestamp}
            locale={locale}
          />

          {/* ── Related Podcasts ── */}
          {relatedPodcasts.length > 0 && (
            <div>
              <h2 style={{
                fontSize: "1.5rem", fontWeight: 800,
                color: "var(--explorer-text-primary, #0f172a)",
                margin: "0 0 20px",
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
              }}>
                Related Podcasts
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}>
                {relatedPodcasts.slice(0, 6).map((p) => (
                  <PodcastCard
                    key={p._id}
                    podcast={p}
                    isPlaying={relatedIsPlaying && currentlyPlayingRelated?._id === p._id}
                    onPlayToggle={(pod) => {
                      if (currentlyPlayingRelated?._id === pod._id) setRelatedIsPlaying(r => !r);
                      else { setCurrentlyPlayingRelated(pod); setRelatedIsPlaying(true); }
                    }}
                    locale={locale}
                  />
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "32px" }}>
                <Link
                  href={`/${locale}/podcasts`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "12px 28px", borderRadius: "12px",
                    background: "var(--explorer-surface, #ffffff)",
                    border: "1px solid var(--explorer-border, #e2e8f0)",
                    color: "var(--explorer-text-primary, #0f172a)",
                    fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
                    boxShadow: "var(--explorer-card-shadow, 0 2px 8px rgba(0,0,0,0.04))",
                    transition: "all 0.15s",
                  }}
                  className="hover:border-teal-500 hover:text-teal-600"
                >
                  <Headphones size={16} /> Browse All Podcasts
                </Link>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}
