/**
 * Robust Web Speech Synthesis Engine for Article Listen System
 * Handles chunking, Chrome 15s speech timeout workarounds, voice mapping, and reactive listeners.
 */

import { SpeechSegment } from "./extract-article-text";

export interface SpeechEngineState {
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  currentIndex: number;
  totalSegments: number;
  progressPercent: number;
  currentText: string;
  rate: number;
  selectedVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
}

export type StateChangeListener = (state: SpeechEngineState) => void;

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private segments: SpeechSegment[] = [];
  private currentIndex = 0;
  private isPlaying = false;
  private isPaused = false;
  private rate = 1.0;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private languageCode = "en-US";
  private listeners: Set<StateChangeListener> = new Set();
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.synth);
  }

  private initVoices(): void {
    if (!this.synth) return;
    this.availableVoices = this.synth.getVoices();
    this.selectBestVoiceForLanguage();
    this.emitState();
  }

  public setArticle(
    segments: SpeechSegment[],
    language = "en"
  ): void {
    this.stop();
    this.segments = segments;
    this.currentIndex = 0;
    this.mapLanguageCode(language);
    this.selectBestVoiceForLanguage();
    this.emitState();
  }

  private mapLanguageCode(lang: string): void {
    const l = lang.toLowerCase();
    if (l.includes("hi") || l.includes("hindi")) {
      this.languageCode = "hi-IN";
    } else if (l.includes("bn") || l.includes("bengali")) {
      this.languageCode = "bn-IN";
    } else if (l.includes("ta") || l.includes("tamil")) {
      this.languageCode = "ta-IN";
    } else {
      this.languageCode = "en-US";
    }
  }

  private selectBestVoiceForLanguage(): void {
    if (!this.availableVoices.length) return;

    const langPrefix = this.languageCode.split("-")[0];
    const match =
      this.availableVoices.find((v) => v.lang.toLowerCase() === this.languageCode.toLowerCase()) ||
      this.availableVoices.find((v) => v.lang.toLowerCase().startsWith(langPrefix)) ||
      this.availableVoices.find((v) => v.default) ||
      this.availableVoices[0];

    this.selectedVoice = match || null;
  }

  public subscribe(listener: StateChangeListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private emitState(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error("SpeechEngine state listener error:", err);
      }
    });
  }

  public getState(): SpeechEngineState {
    const total = this.segments.length;
    const progressPercent = total > 0 ? Math.round((this.currentIndex / total) * 100) : 0;
    const currentText = this.segments[this.currentIndex]?.text || "";

    return {
      isSupported: this.isSupported(),
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentIndex: this.currentIndex,
      totalSegments: total,
      progressPercent,
      currentText,
      rate: this.rate,
      selectedVoice: this.selectedVoice,
      availableVoices: this.availableVoices,
    };
  }

  public play(index?: number): void {
    if (!this.synth || !this.segments.length) return;

    if (this.isPaused && index === undefined) {
      this.resume();
      return;
    }

    if (index !== undefined) {
      this.currentIndex = Math.max(0, Math.min(index, this.segments.length - 1));
    }

    this.synth.cancel();
    this.stopHeartbeat();

    this.isPlaying = true;
    this.isPaused = false;
    this.speakCurrentSegment();
  }

  private speakCurrentSegment(): void {
    if (!this.synth || this.currentIndex >= this.segments.length) {
      this.stop();
      return;
    }

    const segment = this.segments[this.currentIndex];
    const utterance = new SpeechSynthesisUtterance(segment.text);

    utterance.rate = this.rate;
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    } else {
      utterance.lang = this.languageCode;
    }

    // Heading segments pause a tiny bit longer
    utterance.pitch = segment.isHeading ? 1.05 : 1.0;

    utterance.onend = () => {
      if (!this.isPlaying || this.isPaused) return;

      this.currentIndex++;
      if (this.currentIndex < this.segments.length) {
        this.emitState();
        this.speakCurrentSegment();
      } else {
        this.stop();
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("SpeechSynthesis error:", e.error);
      }
    };

    this.currentUtterance = utterance;
    this.startHeartbeat();
    this.emitState();

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error("Failed to speak utterance:", err);
      this.stop();
    }
  }

  public pause(): void {
    if (!this.synth || !this.isPlaying) return;
    this.isPaused = true;
    this.isPlaying = false;
    this.synth.pause();
    this.stopHeartbeat();
    this.emitState();
  }

  public resume(): void {
    if (!this.synth) return;
    if (this.isPaused) {
      this.isPaused = false;
      this.isPlaying = true;
      this.synth.resume();
      this.startHeartbeat();
      this.emitState();
    } else {
      this.play();
    }
  }

  public stop(): void {
    this.stopHeartbeat();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.emitState();
  }

  public seek(percent: number): void {
    if (!this.segments.length) return;
    const clamped = Math.max(0, Math.min(100, percent));
    const targetIndex = Math.floor((clamped / 100) * this.segments.length);
    this.play(targetIndex);
  }

  public skipForward(steps = 2): void {
    const next = Math.min(this.segments.length - 1, this.currentIndex + steps);
    this.play(next);
  }

  public skipBackward(steps = 2): void {
    const prev = Math.max(0, this.currentIndex - steps);
    this.play(prev);
  }

  public setRate(rate: number): void {
    this.rate = rate;
    this.emitState();
    if (this.isPlaying) {
      // Re-trigger current segment at the new rate
      this.play(this.currentIndex);
    }
  }

  public setVoice(voice: SpeechSynthesisVoice): void {
    this.selectedVoice = voice;
    this.emitState();
    if (this.isPlaying) {
      this.play(this.currentIndex);
    }
  }

  /**
   * Chrome & Edge bug: speech synthesis cancels after 15 seconds of inactivity.
   * A gentle periodic resume/pause heartbeat keeps the audio pipeline active.
   */
  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      if (this.synth && this.isPlaying && !this.isPaused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}

// Global singleton instance
export const speechEngine = new SpeechEngine();
