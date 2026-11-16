"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Clock,
  Sparkles,
  Search,
  Copy,
  Check,
  Play,
  Key,
  RefreshCw,
  Info,
  CheckCircle2,
  BookOpen,
  Sliders,
} from "lucide-react";
import type { PodcastData } from "@/types/podcast";

interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface EpisodeNote {
  timestamp?: number;
  timeLabel?: string;
  title: string;
  description: string;
  type?: "takeaway" | "clinical" | "action";
}

interface EpisodeNotesTranscriptProps {
  podcast: PodcastData;
  currentTime: number;
  onSeek: (seconds: number) => void;
  locale: string;
}

export default function EpisodeNotesTranscript({
  podcast,
  currentTime,
  onSeek,
  locale,
}: EpisodeNotesTranscriptProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "transcript">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [notes, setNotes] = useState<EpisodeNote[]>([]);
  const [source, setSource] = useState<string>("curated");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const [keySaved, setKeySaved] = useState(false);

  // Load saved key from localStorage if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("uh_groq_key") || "";
      if (saved) {
        setCustomKey(saved);
        setKeySaved(true);
      }
    }
  }, []);

  // Fetch initial notes & transcript
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const savedKey = typeof window !== "undefined" ? localStorage.getItem("uh_groq_key") || "" : "";
        const res = await fetch("/api/podcasts/transcribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(savedKey ? { "x-groq-key": savedKey } : {}),
          },
          body: JSON.stringify({
            podcastId: podcast._id,
            audioUrl: podcast.audio_url,
            language: podcast.language || "en",
          }),
        });

        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.success) {
            setTranscript(data.transcript || "");
            setSegments(data.segments || []);
            setNotes(data.notes || []);
            setSource(data.source || "curated");
          }
        }
      } catch (err) {
        console.error("Failed to load transcript:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [podcast._id, podcast.audio_url, podcast.language]);

  // Handle re-transcribe with Groq API
  const handleLiveTranscribe = async () => {
    setIsTranscribing(true);
    try {
      const savedKey = typeof window !== "undefined" ? localStorage.getItem("uh_groq_key") || "" : "";
      const res = await fetch("/api/podcasts/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(savedKey ? { "x-groq-key": savedKey } : {}),
        },
        body: JSON.stringify({
          podcastId: podcast._id,
          audioUrl: podcast.audio_url,
          language: podcast.language || "en",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTranscript(data.transcript || "");
          setSegments(data.segments || []);
          setNotes(data.notes || []);
          setSource(data.source || "groq-whisper");
        } else if (data.requiresGroqKey) {
          setShowKeyModal(true);
        }
      }
    } catch (err) {
      console.error("Live transcription failed:", err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSaveKey = () => {
    if (typeof window !== "undefined") {
      if (customKey.trim()) {
        localStorage.setItem("uh_groq_key", customKey.trim());
        setKeySaved(true);
      } else {
        localStorage.removeItem("uh_groq_key");
        setKeySaved(false);
      }
      setShowKeyModal(false);
      handleLiveTranscribe();
    }
  };

  const handleCopyTranscript = () => {
    if (!transcript) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const filteredSegments = useMemo(() => {
    if (!searchQuery.trim()) return segments;
    const q = searchQuery.toLowerCase();
    return segments.filter((s) => s.text.toLowerCase().includes(q));
  }, [segments, searchQuery]);

  // Current active segment index
  const activeSegmentId = useMemo(() => {
    const active = segments.find(
      (s) => currentTime >= s.start && currentTime <= s.end
    );
    return active ? active.id : null;
  }, [segments, currentTime]);

  return (
    <div
      style={{
        background: "var(--explorer-surface, #ffffff)",
        border: "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))",
        marginBottom: "32px",
      }}
    >
      {/* ── Header: Title & Switcher ── */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(13, 148, 136, 0.10)",
              border: "1px solid rgba(13, 148, 136, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0d9488",
            }}
          >
            <BookOpen size={18} />
          </div>
          <div>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "var(--explorer-text-primary, #0f172a)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Full Episode & Notes
            </h2>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--explorer-text-muted, #64748b)",
              }}
            >
              {source === "groq-whisper"
                ? "⚡ Transcribed via Groq Whisper Large v3"
                : "Verified Clinical Notes & Timestamps"}
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--explorer-bg, #f8fafc)",
            border: "1px solid var(--explorer-border, #e2e8f0)",
            borderRadius: "12px",
            padding: "3px",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("notes")}
            style={{
              padding: "7px 16px",
              borderRadius: "9px",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              transition: "all 0.15s ease",
              background: activeTab === "notes" ? "#0d9488" : "transparent",
              color: activeTab === "notes" ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
              boxShadow: activeTab === "notes" ? "0 2px 8px rgba(13,148,136,0.3)" : "none",
            }}
          >
            Episode Notes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("transcript")}
            style={{
              padding: "7px 16px",
              borderRadius: "9px",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              transition: "all 0.15s ease",
              background: activeTab === "transcript" ? "#0d9488" : "transparent",
              color: activeTab === "transcript" ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
              boxShadow: activeTab === "transcript" ? "0 2px 8px rgba(13,148,136,0.3)" : "none",
            }}
          >
            Interactive Transcript
          </button>
        </div>
      </div>

      {/* ── Subheader Controls ── */}
      <div
        style={{
          padding: "12px 24px",
          background: "var(--explorer-bg, #f8fafc)",
          borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {activeTab === "transcript" ? (
          <div style={{ position: "relative", minWidth: "240px", maxWidth: "340px", flex: 1 }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--explorer-text-muted, #64748b)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcript text..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "8px 14px 8px 34px",
                borderRadius: "10px",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                background: "var(--explorer-surface, #ffffff)",
                fontSize: "0.82rem",
                color: "var(--explorer-text-primary, #0f172a)",
                outline: "none",
              }}
            />
          </div>
        ) : (
          <span style={{ fontSize: "0.82rem", color: "var(--explorer-text-secondary, #475569)" }}>
            Clinical takeaways, timestamps & recommended patient actions.
          </span>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {activeTab === "transcript" && transcript && (
            <button
              type="button"
              onClick={handleCopyTranscript}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "7px 12px",
                borderRadius: "8px",
                background: "var(--explorer-surface, #ffffff)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                color: "var(--explorer-text-secondary, #475569)",
                fontSize: "0.78rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
              className="hover:border-teal-500 hover:text-teal-600"
            >
              {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}

          <button
            type="button"
            onClick={handleLiveTranscribe}
            disabled={isTranscribing}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              borderRadius: "8px",
              background: "rgba(13, 148, 136, 0.10)",
              border: "1px solid rgba(13, 148, 136, 0.3)",
              color: "#0d9488",
              fontSize: "0.78rem",
              fontWeight: 800,
              cursor: isTranscribing ? "not-allowed" : "pointer",
            }}
            className="hover:bg-teal-600 hover:text-white transition-colors"
          >
            {isTranscribing ? (
              <>
                <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} />
                Transcribing...
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Live Transcribe (Groq)
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            title="Groq API Key Settings"
            style={{
              padding: "7px 10px",
              borderRadius: "8px",
              background: keySaved ? "rgba(16, 185, 129, 0.1)" : "var(--explorer-surface, #ffffff)",
              border: `1px solid ${keySaved ? "rgba(16, 185, 129, 0.3)" : "var(--explorer-border, #e2e8f0)"}`,
              color: keySaved ? "#10b981" : "var(--explorer-text-muted, #64748b)",
              cursor: "pointer",
            }}
          >
            <Key size={14} />
          </button>
        </div>
      </div>

      {/* ── Content: Tab 1 Notes ── */}
      {activeTab === "notes" && (
        <div style={{ padding: "24px" }}>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "80px",
                    background: "var(--explorer-bg, #f8fafc)",
                    borderRadius: "12px",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              ))}
            </div>
          ) : notes.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: "var(--explorer-bg, #f8fafc)",
                    border: "1px solid var(--explorer-border, #e2e8f0)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    transition: "border-color 0.15s ease",
                  }}
                  className="hover:border-teal-500"
                >
                  {note.timeLabel && (
                    <button
                      type="button"
                      onClick={() => onSeek(note.timestamp || 0)}
                      title={`Jump audio to ${note.timeLabel}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        background: "#0d9488",
                        color: "#ffffff",
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        cursor: "pointer",
                        border: "none",
                        fontFamily: "monospace",
                        flexShrink: 0,
                      }}
                    >
                      <Play size={10} style={{ fill: "currentColor" }} />
                      {note.timeLabel}
                    </button>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <h4
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: "var(--explorer-text-primary, #0f172a)",
                          margin: 0,
                        }}
                      >
                        {note.title}
                      </h4>
                      {note.type && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            padding: "2px 8px",
                            borderRadius: "50px",
                            background:
                              note.type === "clinical"
                                ? "rgba(13, 148, 136, 0.12)"
                                : note.type === "action"
                                ? "rgba(16, 185, 129, 0.12)"
                                : "rgba(99, 102, 241, 0.12)",
                            color:
                              note.type === "clinical"
                                ? "#0d9488"
                                : note.type === "action"
                                ? "#10b981"
                                : "#6366f1",
                          }}
                        >
                          {note.type}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        color: "var(--explorer-text-secondary, #475569)",
                        margin: 0,
                      }}
                    >
                      {note.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "36px 20px" }}>
              <p style={{ color: "var(--explorer-text-muted, #64748b)", margin: "0 0 12px" }}>
                No structured notes available for this episode yet.
              </p>
              <button
                type="button"
                onClick={handleLiveTranscribe}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  background: "#0d9488",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Transcribe Audio with Groq
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Content: Tab 2 Interactive Transcript ── */}
      {activeTab === "transcript" && (
        <div style={{ padding: "24px", maxHeight: "420px", overflowY: "auto" }}>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "36px",
                    background: "var(--explorer-bg, #f8fafc)",
                    borderRadius: "8px",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              ))}
            </div>
          ) : filteredSegments.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {filteredSegments.map((seg) => {
                const isActive = activeSegmentId === seg.id;
                const mins = Math.floor(seg.start / 60);
                const secs = Math.floor(seg.start % 60);
                const timeLabel = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

                return (
                  <div
                    key={seg.id}
                    onClick={() => onSeek(seg.start)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: isActive
                        ? "rgba(13, 148, 136, 0.10)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(13, 148, 136, 0.3)"
                        : "1px solid transparent",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: isActive ? "#0d9488" : "var(--explorer-text-muted, #64748b)",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        background: isActive ? "rgba(13,148,136,0.15)" : "var(--explorer-bg, #f8fafc)",
                        flexShrink: 0,
                      }}
                    >
                      {timeLabel}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.88rem",
                        lineHeight: 1.6,
                        color: isActive
                          ? "#0d9488"
                          : "var(--explorer-text-primary, #0f172a)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {seg.text}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "36px 20px" }}>
              <p style={{ color: "var(--explorer-text-muted, #64748b)", margin: "0 0 12px" }}>
                {searchQuery
                  ? `No transcript segments match "${searchQuery}".`
                  : "No audio transcript generated yet."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Key Settings Modal ── */}
      {showKeyModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowKeyModal(false)}
        >
          <div
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(13, 148, 136, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0d9488",
                }}
              >
                <Key size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800 }}>
                  Groq Whisper API Settings
                </h3>
                <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-muted, #64748b)" }}>
                  100% Free speech-to-text with near-zero latency
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--explorer-text-secondary, #475569)", marginBottom: "16px" }}>
              Transcribe long podcast episodes and generate exact timestamps in seconds using Groq Cloud&apos;s free tier. You can create a free key at{" "}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#0d9488", fontWeight: 700 }}
              >
                console.groq.com/keys
              </a>.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px",
                  color: "var(--explorer-text-secondary, #475569)",
                }}
              >
                Groq API Key (gsk_...)
              </label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="gsk_..."
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  background: "var(--explorer-bg, #f8fafc)",
                  fontSize: "0.88rem",
                  color: "var(--explorer-text-primary, #0f172a)",
                  outline: "none",
                  fontFamily: "monospace",
                }}
              />
              <span style={{ display: "block", fontSize: "0.72rem", color: "var(--explorer-text-muted, #64748b)", marginTop: "4px" }}>
                Stored locally in your browser session or add to <code>.env.local</code> as <code>GROQ_API_KEY</code>.
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  background: "transparent",
                  color: "var(--explorer-text-secondary, #475569)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#0d9488",
                  color: "#ffffff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Save & Transcribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
