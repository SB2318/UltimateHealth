'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Sparkles, Stethoscope, Volume2, HeartHandshake, Play, Pause } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';
import { useModalAudio } from '@/lib/audio/modalAudioController';

interface MoumitaMemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoumitaMemorialModal({
  isOpen,
  onClose,
}: MoumitaMemorialModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Global audio controller hook for Memorial tribute track
  const { isPlaying, toggle, play, stop } = useModalAudio('memorial');

  // When memorial modal opens, auto-play its music (stops any other track).
  // When closed, stop the audio.
  useEffect(() => {
    if (isOpen) {
      play();
    } else {
      stop();
    }
  }, [isOpen, play, stop]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the close button on mount for quick keyboard exit
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLElement>('button[aria-label="Close memorial dialog"]');
      closeBtn?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="memorial-dialog-title"
        >
          {/* Main Memorial Dialog Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-[720px] m-auto flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-[#12111d] border border-slate-200 dark:border-white/10 shadow-2xl font-sans"
            style={{
              height: 'min(85vh, 680px)',
              maxHeight: 'calc(100dvh - 32px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
        {/* Compact, Dignified Header Bar */}
        <header
          className="flex items-center justify-between px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-100/80 dark:bg-[#161526] border-b border-slate-200 dark:border-white/10 shrink-0 gap-3"
          style={{ minHeight: '56px', padding: '12px 28px' }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 truncate">
              Sacred Life Work &amp; Vision · Respect Giver
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Prominent High-Visibility Stop / Play Audio Control Button */}
            <button
              onClick={toggle}
              type="button"
              aria-label={isPlaying ? 'Stop Tribute Music' : 'Play Tribute Music'}
              title={isPlaying ? 'Click to Stop Tribute Music' : 'Click to Play Peaceful Tribute Music'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                height: '34px',
                padding: '0 12px 0 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 650,
                cursor: 'pointer',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                outline: 'none',
              }}
              className={`transition-all border active:scale-95 focus-visible:ring-2 focus-visible:ring-rose-500 ${
                isPlaying
                  ? 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700 shadow-md shadow-rose-600/25'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 dark:bg-white/10 dark:text-white dark:border-white/20 shadow-xs'
              }`}
            >
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isPlaying ? 'rgba(255, 255, 255, 0.22)' : '#ffe4e6',
                  color: isPlaying ? '#ffffff' : '#e11d48',
                  flexShrink: 0,
                }}
              >
                {isPlaying ? <Pause size={10} className="fill-current" /> : <Play size={10} className="fill-current ml-0.5" />}
              </span>
              <span>{isPlaying ? 'Tribute Music' : 'Play Tribute'}</span>
              {isPlaying && (
                <span className="flex items-end gap-[2px] h-3 ml-0.5" aria-hidden="true">
                  <span className="w-[2px] h-3 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-[2px] h-1.5 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
                  <span className="w-[2px] h-2.5 bg-white rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
                </span>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close memorial dialog"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                boxSizing: 'border-box',
              }}
              className="flex items-center justify-center text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area with Equal Gap Distribution Across All Cards */}
        <div
          className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-5 flex flex-col gap-5 text-slate-700 dark:text-slate-300 overscroll-contain"
          style={{ padding: '20px 28px' }}
        >
          {/* 1. Hero Doctor Card - Generously Padded Dignified Profile Frame */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-rose-50/70 via-slate-50/90 to-white dark:from-rose-950/25 dark:via-[#161528] dark:to-[#12111d] border border-rose-200/90 dark:border-rose-900/50 shadow-sm shrink-0">
            {/* Doctor Portrait */}
            <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-white dark:border-white/20 shadow-md shrink-0">
              <Image
                src={withBasePath('/assets/moumita-debnath.jpg')}
                alt="Portrait of Dr. Moumita Debnath"
                fill
                unoptimized
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                sizes="(max-width: 640px) 112px, 128px"
                priority
              />
            </div>

            {/* Profile Information with Clear Hierarchy & Breathing Room */}
            <div className="flex-1 text-center sm:text-left min-w-0 flex flex-col justify-center">
              <span className="text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-400 tracking-wider uppercase mb-2 inline-block">
                Pulmonary Medicine · Compassionate Care
              </span>
              
              <div
                id="memorial-dialog-title"
                role="heading"
                aria-level={2}
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-2"
                style={{ background: 'none', WebkitTextFillColor: 'currentColor' }}
              >
                Dr. Moumita Debnath
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-normal mb-4">
                Postgraduate Resident Doctor · Department of Pulmonary &amp; Chest Medicine
              </p>

              {/* Badges with Generous Padding and Font Sizing */}
              <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start pt-1">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 650,
                    lineHeight: '1.3',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                  }}
                  className="bg-rose-100/90 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>Doctor of the People</span>
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 650,
                    lineHeight: '1.3',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                  }}
                  className="bg-white dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/20 shadow-2xs"
                >
                  <HeartHandshake size={14} className="text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Respect Giver Inspiration</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. Content Card: Devotion to Pulmonary Medicine */}
          <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151424] border border-slate-200/90 dark:border-white/10 shadow-xs hover:border-rose-200 dark:hover:border-rose-900/40 transition-all shrink-0">
            <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Stethoscope size={21} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                role="heading"
                aria-level={3}
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug"
                style={{ background: 'none', WebkitTextFillColor: 'currentColor' }}
              >
                Her Calling &amp; Devotion to Pulmonary Medicine
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                Dr. Moumita Debnath was a dedicated postgraduate trainee doctor specializing in Chest Medicine.
                Colleagues and senior professors remembered her for clinical precision, infinite patience, and steady reassurance to critically ill respiratory patients.
              </p>
            </div>
          </div>

          {/* 3. Content Card: Patient Dignity & Compassion */}
          <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151424] border border-slate-200/90 dark:border-white/10 shadow-xs hover:border-rose-200 dark:hover:border-rose-900/40 transition-all shrink-0">
            <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Shield size={21} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                role="heading"
                aria-level={3}
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug"
                style={{ background: 'none', WebkitTextFillColor: 'currentColor' }}
              >
                Patient Dignity &amp; Compassion
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                She believed that healing is fundamentally human, and medical prescriptions work best when accompanied by genuine empathy.
                She listened patiently to vulnerable families from rural districts, explaining diagnoses in simple terms and restoring faith in compassionate healthcare.
              </p>
            </div>
          </div>

          {/* 4. Content Card: Why UltimateHealth Honors Her Memory */}
          <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151424] border border-slate-200/90 dark:border-white/10 shadow-xs hover:border-rose-200 dark:hover:border-rose-900/40 transition-all shrink-0">
            <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/80 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Sparkles size={21} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                role="heading"
                aria-level={3}
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug"
                style={{ background: 'none', WebkitTextFillColor: 'currentColor' }}
              >
                Why UltimateHealth Honors Her Memory
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                UltimateHealth established the <strong className="font-semibold text-slate-900 dark:text-white">Respect Giver Protocol</strong> directly
                inspired by her ethos. Healthcare is not a commercial marketplace — true care starts with human dignity. This open-source platform exists to carry forward her devotion to patient welfare, verified free health knowledge, and safety for all healthcare workers.
              </p>
            </div>
          </div>

          {/* 5. Distinct Removal & Editorial Notice Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 dark:border-amber-500/30 shadow-2xs shrink-0 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <Shield size={17} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1.5">
                Memorial &amp; Removal Notice
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                UltimateHealth is an independent, non-commercial open-source health education project. If family members or authorized representatives wish for any dedication, name, or image to be modified or removed, please email{' '}
                <a
                  href="mailto:ultimate.health25@gmail.com"
                  className="text-amber-800 dark:text-amber-300 underline font-semibold hover:text-amber-900 dark:hover:text-amber-200"
                >
                  ultimate.health25@gmail.com
                </a>{' '}
                and it will be addressed immediately without condition.
              </p>
            </div>
          </div>
        </div>

        {/* Pinned Action Footer Bar with Slim, Compact Proportions */}
        <div
          role="region"
          aria-label="Memorial controls"
          className="px-6 sm:px-8 py-3 bg-slate-100/80 dark:bg-[#161526] border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
          style={{ padding: '12px 28px', margin: 0, minHeight: '52px' }}
        >
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Respect Giver · Healer Dignity Protocol
          </span>
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto min-w-[130px] h-9 sm:h-9.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
          >
            Close Memorial
          </button>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
