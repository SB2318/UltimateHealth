/**
 * Robust Web Speech Synthesis Engine for Article Listen System
 * Handles chunking, Chrome 15s speech timeout workarounds, localized voice mapping,
 * and high-fidelity phonetic speech synthesis for all supported languages.
 */

import { SpeechSegment } from "./extract-article-text";
import {
  LOCALE_TO_BCP47,
  normalizeLocale,
  SupportedListenLocale,
} from "./listen-translations";

export interface SpeechEngineState {
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  currentIndex: number;
  totalSegments: number;
  progressPercent: number;
  currentText: string;
  rate: number;
  locale: SupportedListenLocale;
  languageCode: string;
  selectedVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  languageVoices: SpeechSynthesisVoice[];
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
  private languageVoices: SpeechSynthesisVoice[] = [];
  private locale: SupportedListenLocale = "en";
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
    this.updateLanguageVoices();
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
    this.updateLanguageVoices();
    this.selectBestVoiceForLanguage();
    this.emitState();
  }

  private mapLanguageCode(lang: string): void {
    this.locale = normalizeLocale(lang);
    this.languageCode = LOCALE_TO_BCP47[this.locale] || "en-US";
  }

  private isVoiceNameMatchingLang(voiceName: string, targetCode: string): boolean {
    const name = voiceName.toLowerCase();
    const lang = targetCode.toLowerCase();

    if (lang.startsWith("hi")) {
      return (
        name.includes("hindi") ||
        name.includes("हिन्दी") ||
        name.includes("swara") ||
        name.includes("kalpana") ||
        name.includes("madhur") ||
        name.includes("hemant")
      );
    }
    if (lang.startsWith("bn")) {
      return (
        name.includes("bengali") ||
        name.includes("bangla") ||
        name.includes("বাংলা") ||
        name.includes("tanisha") ||
        name.includes("bashkar")
      );
    }
    if (lang.startsWith("ta")) {
      return (
        name.includes("tamil") ||
        name.includes("தமிழ்") ||
        name.includes("valluvar")
      );
    }
    if (lang.startsWith("or")) {
      return (
        name.includes("odia") ||
        name.includes("oriya") ||
        name.includes("ଓଡ଼ିଆ")
      );
    }
    if (lang.startsWith("de")) {
      return (
        name.includes("german") ||
        name.includes("deutsch") ||
        name.includes("stefan") ||
        name.includes("katja") ||
        name.includes("hedda")
      );
    }
    if (lang.startsWith("es")) {
      return (
        name.includes("spanish") ||
        name.includes("español") ||
        name.includes("helena") ||
        name.includes("laura") ||
        name.includes("pablo")
      );
    }
    if (lang.startsWith("fr")) {
      return (
        name.includes("french") ||
        name.includes("français") ||
        name.includes("paul") ||
        name.includes("julie") ||
        name.includes("hortense")
      );
    }
    if (lang.startsWith("hr")) {
      return (
        name.includes("croatian") ||
        name.includes("hrvatski") ||
        name.includes("matej")
      );
    }
    if (lang.startsWith("en")) {
      return (
        name.includes("english") ||
        name.includes("david") ||
        name.includes("zira") ||
        name.includes("mark") ||
        name.includes("george") ||
        name.includes("heera")
      );
    }
    return false;
  }

  private scoreVoice(voice: SpeechSynthesisVoice, targetCode: string): number {
    let score = 0;
    const vLang = (voice.lang || "").toLowerCase().replace("_", "-");
    const target = targetCode.toLowerCase();
    const targetPrefix = target.split("-")[0];

    // Language compatibility check
    if (vLang === target) {
      score += 50;
    } else if (vLang.startsWith(targetPrefix)) {
      score += 30;
    } else if (this.isVoiceNameMatchingLang(voice.name, targetCode)) {
      score += 20;
    } else {
      // Incompatible language — explicitly reject so an English voice never attempts Hindi/Bengali/etc.
      return -100;
    }

    // Quality enhancements
    const name = voice.name.toLowerCase();
    if (name.includes("natural") || name.includes("neural")) {
      score += 30;
    }
    if (name.includes("online")) {
      score += 15;
    }
    if (name.includes("google")) {
      score += 12;
    }
    if (name.includes("premium") || name.includes("enhanced")) {
      score += 10;
    }
    if (voice.default) {
      score += 5;
    }

    return score;
  }

  private updateLanguageVoices(): void {
    if (!this.availableVoices.length) {
      this.languageVoices = [];
      return;
    }

    this.languageVoices = this.availableVoices
      .filter((v) => this.scoreVoice(v, this.languageCode) > 0)
      .sort(
        (a, b) =>
          this.scoreVoice(b, this.languageCode) -
          this.scoreVoice(a, this.languageCode)
      );
  }

  private selectBestVoiceForLanguage(): void {
    if (!this.languageVoices.length) {
      // DO NOT fallback to an incompatible voice (e.g. English).
      // When selectedVoice is null and utterance.lang is explicitly set,
      // the browser uses its native language synthesizer cleanly.
      this.selectedVoice = null;
      return;
    }

    // Pick top-scored compatible voice
    this.selectedVoice = this.languageVoices[0] || null;
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
      locale: this.locale,
      languageCode: this.languageCode,
      selectedVoice: this.selectedVoice,
      availableVoices: this.availableVoices,
      languageVoices: this.languageVoices,
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

    // Rate calibrated with slight moderation for Indic languages to guarantee pristine diction
    utterance.rate = this.rate;

    // ALWAYS assign language code first
    utterance.lang = this.languageCode;

    // Only assign voice if it actually belongs to the target language
    if (
      this.selectedVoice &&
      this.scoreVoice(this.selectedVoice, this.languageCode) > 0
    ) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || this.languageCode;
    }

    // Headings have slightly elevated pitch for clear architectural distinction
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
