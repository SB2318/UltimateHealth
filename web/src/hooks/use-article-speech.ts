"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  extractArticleSpeechSegments,
  estimateListeningDuration,
  formatDurationSeconds,
  SpeechSegment,
} from "@/lib/audio/extract-article-text";
import { speechEngine, SpeechEngineState } from "@/lib/audio/speech-engine";
import type { Article } from "@/types/article";

export interface UseArticleSpeechReturn {
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isActive: boolean; // either playing or paused
  progressPercent: number;
  currentText: string;
  speed: number;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  totalDurationStr: string;
  elapsedTimeStr: string;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stop: () => void;
  seek: (percent: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  setSpeed: (speed: number) => void;
  setVoice: (voice: SpeechSynthesisVoice) => void;
}

export function useArticleSpeech(
  article: Article,
  htmlContent?: string
): UseArticleSpeechReturn {
  const [engineState, setEngineState] = useState<SpeechEngineState>(
    speechEngine.getState()
  );

  // Extract speech segments once when article or content changes
  const segments: SpeechSegment[] = useMemo(() => {
    return extractArticleSpeechSegments(
      article.title,
      article.author?.name || "Ultimate Health",
      htmlContent,
      article.content?.blocks
    );
  }, [article.title, article.author?.name, htmlContent, article.content?.blocks]);

  // Load article into engine
  useEffect(() => {
    speechEngine.setArticle(segments, article.category || "en");
    return () => {
      speechEngine.stop();
    };
  }, [segments, article.category]);

  // Subscribe to engine state
  useEffect(() => {
    const unsubscribe = speechEngine.subscribe((newState) => {
      setEngineState(newState);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const totalDurationSeconds = useMemo(() => {
    return estimateListeningDuration(segments, engineState.rate);
  }, [segments, engineState.rate]);

  const elapsedSeconds = useMemo(() => {
    return Math.round(
      (engineState.progressPercent / 100) * totalDurationSeconds
    );
  }, [engineState.progressPercent, totalDurationSeconds]);

  const play = useCallback(() => speechEngine.play(), []);
  const pause = useCallback(() => speechEngine.pause(), []);
  const stop = useCallback(() => speechEngine.stop(), []);

  const togglePlay = useCallback(() => {
    if (engineState.isPlaying) {
      speechEngine.pause();
    } else {
      speechEngine.play();
    }
  }, [engineState.isPlaying]);

  const seek = useCallback((pct: number) => speechEngine.seek(pct), []);
  const skipForward = useCallback(() => speechEngine.skipForward(2), []);
  const skipBackward = useCallback(() => speechEngine.skipBackward(2), []);
  const setSpeed = useCallback((s: number) => speechEngine.setRate(s), []);
  const setVoice = useCallback((v: SpeechSynthesisVoice) => speechEngine.setVoice(v), []);

  return {
    isSupported: engineState.isSupported,
    isPlaying: engineState.isPlaying,
    isPaused: engineState.isPaused,
    isActive: engineState.isPlaying || engineState.isPaused,
    progressPercent: engineState.progressPercent,
    currentText: engineState.currentText,
    speed: engineState.rate,
    availableVoices: engineState.availableVoices,
    selectedVoice: engineState.selectedVoice,
    totalDurationStr: formatDurationSeconds(totalDurationSeconds),
    elapsedTimeStr: formatDurationSeconds(elapsedSeconds),
    play,
    pause,
    togglePlay,
    stop,
    seek,
    skipForward,
    skipBackward,
    setSpeed,
    setVoice,
  };
}
