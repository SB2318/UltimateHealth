'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Heart, Shield, Sparkles, Stethoscope, Volume2, VolumeX } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

interface MoumitaMemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LIFESTORY_BGM_URL = 'https://ultimatehealth.blog/api/getfile/life-story-bgm.mp3';

export default function MoumitaMemorialModal({
  isOpen,
  onClose,
}: MoumitaMemorialModalProps) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background Music Lifecycle
  useEffect(() => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    if (!audioRef.current) {
      const audio = new Audio(LIFESTORY_BGM_URL);
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    if (musicEnabled) {
      audio.play().catch(() => {
        // Autoplay policy fallback
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isOpen, musicEnabled]);

  // Handle Mute/Unmute
  const toggleMusic = () => {
    setMusicEnabled((prev) => {
      const next = !prev;
      if (audioRef.current) {
        if (next) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return next;
    });
  };

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="moumita-modal-title"
    >
      <div
        className="relative w-full max-w-[720px] max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#11111d] border border-slate-200 dark:border-[#2a2a44] shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-[#222238] bg-slate-50/90 dark:bg-[#151524]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            <span className="text-[0.75rem] font-mono font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
              Life Work &amp; Vision // Respect Giver
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Background Music Toggle Button */}
            <button
              onClick={toggleMusic}
              type="button"
              aria-label={musicEnabled ? 'Mute background music' : 'Play background music'}
              title={musicEnabled ? 'Mute Music' : 'Play Music'}
              className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
            >
              {musicEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto px-6 py-7 flex flex-col gap-6 text-slate-700 dark:text-slate-300">
          {/* Profile Card */}
          <div className="flex flex-row gap-6 items-center p-5 rounded-2xl bg-rose-50/50 dark:bg-[#161628] border border-rose-100 dark:border-[#282845] flex-wrap">
            <div className="relative w-[110px] h-[130px] rounded-xl overflow-hidden border-2 border-rose-400/50 flex-shrink-0 shadow-md">
              <Image
                src={withBasePath('/assets/moumita-debnath.jpg')}
                alt="Dr. Moumita Debnath"
                fill
                unoptimized
                style={{ objectFit: 'cover' }}
                sizes="110px"
                priority
              />
            </div>

            <div className="flex-1 min-w-[240px]">
              <span className="text-[0.75rem] font-bold text-teal-600 dark:text-cyan-400 tracking-wide uppercase inline-block mb-1">
                In Honor of Medical Excellence &amp; Care
              </span>
              <h2
                id="moumita-modal-title"
                className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5 font-['Orbitron',sans-serif]"
              >
                Dr. Moumita Debnath
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                Post-Graduate Resident Doctor · Department of Pulmonary (Chest) Medicine
                <br />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  R.G. Kar Medical College and Hospital
                </span>
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 font-semibold">
                  Doctor of the People
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-cyan-500/15 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/30 font-semibold">
                  Respect Giver Inspiration
                </span>
              </div>
            </div>
          </div>

          {/* Biography & Dedication */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-rose-500" />
              Her Life and Devotion to Pulmonary Medicine
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              Dr. Moumita Debnath was a brilliant, hardworking postgraduate trainee doctor specializing in Chest Medicine
              at R.G. Kar Medical College. Known among colleagues and professors for her deep compassion and tireless work ethic,
              she routinely devoted herself to demanding clinical shifts caring for critically ill respiratory patients with warmth,
              gentle guidance, and clinical precision.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
              Commitment to Patient Dignity &amp; Compassion
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              She believed that medical care extends beyond clinical procedures — that listening attentively to patients,
              easing their anxieties, and extending unconditional respect are essential elements of true healing. Her approach
              to patient interaction set an inspiring benchmark for healthcare professionals.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Why UltimateHealth Honors Her Legacy
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              UltimateHealth established the <strong className="text-slate-900 dark:text-white">Respect Giver Protocol</strong> inspired by
              her vision of empathetic healthcare. Healthcare is fundamentally about human beings — you cannot heal a person
              you do not respect. This open-source platform exists to carry forward her devotion to patient welfare, verified knowledge,
              and healthcare dignity for all.
            </p>
          </div>

          {/* Quote Banner */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/25 border-l-4 border-rose-500">
            <p className="text-sm italic text-slate-800 dark:text-slate-100 leading-relaxed m-0">
              &ldquo;Healthcare begins with seeing the whole human being — body, mind, and dignity.
              If we can restore dignity to even one soul, we plant a seed of wellness that outlives us all.&rdquo;
            </p>
            <span className="block mt-2 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
              &mdash; Dedicated with profound respect to Dr. Moumita Debnath
            </span>
          </div>

          {/* Legal Non-Commercial & Voluntary Removal Policy */}
          <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-[#151b26] border border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              <strong className="text-slate-800 dark:text-slate-200">Memorial &amp; Removal Notice:</strong> UltimateHealth is an independent, non-commercial open-source health education project. If family members, legal heirs, or authorized representatives wish for any name, image, or dedication to be modified or removed, please contact <a href="mailto:ultimate.health25@gmail.com" className="text-teal-600 dark:text-teal-400 underline font-medium">ultimate.health25@gmail.com</a> and it will be updated or removed immediately without condition.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-[#222238] bg-slate-50 dark:bg-[#151524] flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-opacity shadow-sm"
          >
            Close &amp; Honor Life Work
          </button>
        </div>
      </div>
    </div>
  );
}
