'use client';

import { useState, useEffect, useCallback } from 'react';
import { withBasePath } from '@/lib/basePath';

export type ModalAudioTrack = 'memorial' | 'tour';

const TRACK_CONFIG: Record<ModalAudioTrack, { direct: string; proxy: string; volume: number }> = {
  memorial: {
    direct: 'https://ultimatehealth.blog/api/getFile/life-story-bgm.mp3',
    proxy: withBasePath('/api/proxy-audio?url=' + encodeURIComponent('https://ultimatehealth.blog/api/getFile/life-story-bgm.mp3')),
    volume: 0.35,
  },
  tour: {
    direct: 'https://ultimatehealth.blog/api/getFile/krishna_flute.mp3',
    proxy: withBasePath('/api/proxy-audio?url=' + encodeURIComponent('https://ultimatehealth.blog/api/getFile/krishna_flute.mp3')),
    volume: 0.3,
  },
};

type Listener = (state: { activeTrack: ModalAudioTrack | null; isPlaying: boolean }) => void;

class ModalAudioManager {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: ModalAudioTrack | null = null;
  private isPlaying = false;
  private listeners = new Set<Listener>();
  private usingProxy = false;
  private pendingTrack: ModalAudioTrack | null = null;
  private unlockListenerAttached = false;

  private notify() {
    for (const listener of this.listeners) {
      listener({ activeTrack: this.currentTrack, isPlaying: this.isPlaying });
    }
  }

  private initAudio() {
    if (typeof window === 'undefined') return null;
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.preload = 'metadata';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('error', () => {
        if (!this.usingProxy && this.currentTrack) {
          // Switch to streaming proxy fallback
          this.usingProxy = true;
          if (this.audio) {
            this.audio.src = TRACK_CONFIG[this.currentTrack].proxy;
            this.audio.load();
            this.audio.play().catch(() => {});
          }
        } else {
          this.isPlaying = false;
          this.notify();
        }
      });
    }
    return this.audio;
  }

  private attachGestureUnlock() {
    if (this.unlockListenerAttached || typeof window === 'undefined') return;
    this.unlockListenerAttached = true;

    const unlock = () => {
      this.unlockListenerAttached = false;
      window.removeEventListener('click', unlock, true);
      window.removeEventListener('pointerdown', unlock, true);
      window.removeEventListener('keydown', unlock, true);
      window.removeEventListener('touchstart', unlock, true);

      if (this.pendingTrack && this.audio && !this.isPlaying) {
        this.play(this.pendingTrack);
      }
    };

    window.addEventListener('click', unlock, { capture: true, once: true });
    window.addEventListener('pointerdown', unlock, { capture: true, once: true });
    window.addEventListener('keydown', unlock, { capture: true, once: true });
    window.addEventListener('touchstart', unlock, { capture: true, once: true });
  }

  public play(track: ModalAudioTrack) {
    const audio = this.initAudio();
    if (!audio) return;

    this.pendingTrack = track;

    // If switching track or source unassigned, reset proxy flag and source
    const targetSrc = this.usingProxy ? TRACK_CONFIG[track].proxy : TRACK_CONFIG[track].direct;
    if (this.currentTrack !== track || !audio.src || audio.src === '') {
      this.usingProxy = false;
      this.currentTrack = track;
      audio.src = TRACK_CONFIG[track].direct;
      audio.load();
    }

    audio.volume = TRACK_CONFIG[track].volume;

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.pendingTrack = null;
          this.notify();
        })
        .catch(() => {
          // Autoplay blocked by browser policy without user gesture:
          // Listen for next user interaction to immediately resume
          this.isPlaying = false;
          this.notify();
          this.attachGestureUnlock();
        });
    }
  }

  public stop(track?: ModalAudioTrack) {
    this.pendingTrack = null;
    if (track && this.currentTrack !== track) return;

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
    this.currentTrack = null;
    this.notify();
  }

  public pause() {
    this.pendingTrack = null;
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public toggle(track: ModalAudioTrack) {
    if (this.currentTrack === track && this.isPlaying) {
      this.pause();
    } else {
      this.play(track);
    }
  }

  public getState() {
    return {
      activeTrack: this.currentTrack,
      isPlaying: this.isPlaying,
    };
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

// Global singleton instance
export const modalAudio = new ModalAudioManager();

/**
 * React hook to bind to global modal audio state for a specific track
 */
export function useModalAudio(track: ModalAudioTrack) {
  const [state, setState] = useState(() => modalAudio.getState());

  useEffect(() => {
    const unsubscribe = modalAudio.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  const isCurrentTrackPlaying = state.activeTrack === track && state.isPlaying;

  const play = useCallback(() => {
    modalAudio.play(track);
  }, [track]);

  const stop = useCallback(() => {
    modalAudio.stop(track);
  }, [track]);

  const toggle = useCallback(() => {
    modalAudio.toggle(track);
  }, [track]);

  return {
    isPlaying: isCurrentTrackPlaying,
    isAnyPlaying: state.isPlaying,
    activeTrack: state.activeTrack,
    play,
    stop,
    toggle,
  };
}
