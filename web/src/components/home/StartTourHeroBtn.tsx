'use client';

import React from 'react';
import { Play, Sparkles } from 'lucide-react';

export default function StartTourHeroBtn() {
  const triggerTour = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Audio fallback
    }

    window.dispatchEvent(new CustomEvent('open-uh-tour'));
  };

  return (
    <button
      onClick={triggerTour}
      type="button"
      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-mono text-sm font-black uppercase tracking-wider text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(0,240,255,0.6)] cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #00f0ff 0%, #ff007f 100%)',
      }}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <span className="tracking-widest">START ULTIMATEHEALTH TOUR</span>
      <Play className="w-4 h-4 fill-black text-black transition-transform group-hover:translate-x-1" />
    </button>
  );
}
