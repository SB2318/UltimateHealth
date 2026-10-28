"use client";

import React from "react";
import { Headphones, Volume2 } from "lucide-react";
import { getListenStrings } from "@/lib/audio/listen-translations";

interface ListenTriggerButtonProps {
  isPlaying: boolean;
  isPaused: boolean;
  onClick: () => void;
  variant?: "header" | "hero";
  durationStr?: string;
  locale?: string;
}

export default function ListenTriggerButton({
  isPlaying,
  isPaused,
  onClick,
  variant = "header",
  durationStr,
  locale = "en",
}: ListenTriggerButtonProps) {
  const strings = getListenStrings(locale);

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={isPlaying ? strings.paused : strings.listenToArticle}
        className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md select-none ${
          isPlaying
            ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-500 dark:border-teal-400 shadow-[0_0_20px_rgba(13,148,136,0.25)]"
            : "bg-white dark:bg-[#141424] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#2a2a44] hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 hover:-translate-y-0.5"
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5" aria-hidden="true">
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
            <span>{strings.listening}</span>
          </>
        ) : (
          <>
            <Headphones size={17} className="text-teal-600 dark:text-teal-400 shrink-0" />
            <span>{strings.listenToArticle}</span>
            {durationStr && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#202038] text-slate-600 dark:text-slate-300 ml-1">
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
      aria-label={isPlaying ? strings.paused : strings.listen}
      title={isPlaying ? strings.paused : strings.listen}
      className={`h-8 px-3 rounded-lg inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-150 cursor-pointer select-none ${
        isPlaying
          ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-500/50"
          : isPaused
          ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50"
          : "bg-slate-100 dark:bg-[#141422] text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-200 dark:hover:bg-[#1f1f33] border border-slate-200 dark:border-[#28283e] hover:border-teal-500/40"
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 size={13} className="text-teal-600 dark:text-teal-400 animate-pulse shrink-0" />
          <span className="text-teal-700 dark:text-teal-300">{strings.playing}</span>
        </>
      ) : isPaused ? (
        <>
          <Headphones size={13} className="text-amber-500 shrink-0" />
          <span className="text-amber-600 dark:text-amber-400">{strings.paused}</span>
        </>
      ) : (
        <>
          <Headphones size={13} className="text-teal-600 dark:text-teal-400 shrink-0" />
          <span>{strings.listen}</span>
        </>
      )}
    </button>
  );
}
