'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { withBasePath } from '@/lib/basePath';
import {
  Smartphone,
  BookOpen,
  Headphones,
  Sparkles,
  ShieldCheck,
  Layers,
  HeartHandshake,
  ExternalLink,
  ArrowRight,
  Globe2,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Activity,
  Calendar,
  MessageSquare,
  Bot,
  Zap,
} from 'lucide-react';

interface ScreenshotItem {
  src: string;
  caption: string;
  alt: string;
}

const userScreenshots: ScreenshotItem[] = [
  {
    src: '/ap-asset/page-1.jpg',
    caption: 'Welcome & Dignity Protocol',
    alt: 'UltimateHealth mobile app welcome screen showing clinical mission and patient-first care',
  },
  {
    src: '/ap-asset/page-2.jpg',
    caption: 'Community Health Articles',
    alt: 'Curated health articles directory with verified clinical guides, categories, and search',
  },
  {
    src: '/ap-asset/page-3.jpg',
    caption: 'Comfortable Reading View',
    alt: 'Detailed article reader with clean typography, sources, and dark/light readability',
  },
  {
    src: '/ap-asset/page-4.jpg',
    caption: 'Audio Podcasts & Narration',
    alt: 'Health podcast playback screen with player controls, timestamps, and episode notes',
  },
  {
    src: '/ap-asset/page-5.jpg',
    caption: 'Medical Glossary Explorer',
    alt: 'Plain-language medical dictionary explaining clinical terminology with analogies',
  },
  {
    src: '/ap-asset/page-6.jpg',
    caption: 'Personal Health Dashboard',
    alt: 'User profile and saved wellness topics without tracking or telemetry',
  },
  {
    src: '/ap-asset/wellness-dashboard.jpeg',
    caption: 'Wellness & Daily Health Tracker',
    alt: 'Wellness dashboard showing routine indicators and health literacy guides',
  },
  {
    src: '/ap-asset/quick-care-and-relief.jpeg',
    caption: 'Quick Relief & First-Aid Guides',
    alt: 'Immediate care reference guides with clear warning signs and triage tips',
  },
  {
    src: '/ap-asset/podcast-list.jpeg',
    caption: 'Multilingual Audio Episodes',
    alt: 'Browse through translated audio explainers across 9 languages',
  },
  {
    src: '/ap-asset/care-team-ultimatehealth.jpeg',
    caption: 'Verified Care Team Directory',
    alt: 'Doctor directory and clinical advisory contributor overview',
  },
  {
    src: '/ap-asset/customize-homepage.jpeg',
    caption: 'Customizable Health Feed',
    alt: 'Topic preference settings to tailor health literacy feeds',
  },
  {
    src: '/ap-asset/open-source-licenses.jpeg',
    caption: 'Open Source Transparency',
    alt: 'Audit trail and open-source licensing ensuring zero hidden telemetry',
  },
];

const adminScreenshots: ScreenshotItem[] = [
  {
    src: '/admin-asset/page-1.jpg',
    caption: 'Clinical Overview & Queue',
    alt: 'UltimateHealth Admin dashboard with pending articles and review status',
  },
  {
    src: '/admin-asset/page-2.jpg',
    caption: 'Doctor Moderation Workflow',
    alt: 'Article evaluation interface showing clinical peer-review criteria',
  },
  {
    src: '/admin-asset/page-3.jpg',
    caption: 'Article Fact-Check & Verification',
    alt: 'Evidence verification screen highlighting source citations',
  },
  {
    src: '/admin-asset/page-4.jpg',
    caption: 'Community Health Metrics',
    alt: 'Anonymized readership statistics across supported languages',
  },
  {
    src: '/admin-asset/page-5.jpg',
    caption: 'Moderator Agreement Protocol',
    alt: 'Ethics and clinical pledge required for verified healthcare contributors',
  },
  {
    src: '/admin-asset/page-6.jpg',
    caption: 'Editorial Review Pipeline',
    alt: 'Multi-stage editorial pipeline for medical peer review',
  },
  {
    src: '/admin-asset/page-7.jpg',
    caption: 'Article Improvement Verification',
    alt: 'Verification of clinical edits and references before publication',
  },
  {
    src: '/admin-asset/page-8.jpg',
    caption: 'Medical Glossary Management',
    alt: 'Bilingual medical dictionary curation and definition review',
  },
];

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const currentSrc = target.getAttribute('src') || '';
  if (currentSrc.startsWith('/web/')) {
    target.src = currentSrc.replace(/^\/web/, '');
  } else if (!currentSrc.startsWith('/web/') && !currentSrc.startsWith('http')) {
    target.src = `/web${currentSrc.startsWith('/') ? '' : '/'}${currentSrc}`;
  }
};

export default function AppsSection() {
  const t = useTranslations('apps');
  const locale = useLocale();

  const [activeModalGroup, setActiveModalGroup] = useState<'user' | 'admin' | null>(null);
  const [activeModalIndex, setActiveModalIndex] = useState<number>(0);

  const userTrayRef = useRef<HTMLDivElement | null>(null);
  const adminTrayRef = useRef<HTMLDivElement | null>(null);

  const USER_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth';
  const ADMIN_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.ultimatehealth.admin';
  const GITHUB_REPO_URL = 'https://github.com/SB2318/UltimateHealth';

  const activeList =
    activeModalGroup === 'user'
      ? userScreenshots
      : activeModalGroup === 'admin'
      ? adminScreenshots
      : [];
  const currentModalImage = activeList[activeModalIndex] ?? null;

  const handleNextModal = useCallback(() => {
    if (activeList.length === 0) return;
    setActiveModalIndex((prev) => (prev + 1) % activeList.length);
  }, [activeList.length]);

  const handlePrevModal = useCallback(() => {
    if (activeList.length === 0) return;
    setActiveModalIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
  }, [activeList.length]);

  useEffect(() => {
    if (!currentModalImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalGroup(null);
      if (e.key === 'ArrowRight') handleNextModal();
      if (e.key === 'ArrowLeft') handlePrevModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentModalImage, handleNextModal, handlePrevModal]);

  const scrollTray = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const amount = direction === 'left' ? -260 : 260;
    ref.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      id="apps"
      aria-labelledby="apps-heading"
      className="uh-section-deep w-full overflow-hidden"
      style={{
        borderTop: '1px solid var(--explorer-border, #e2e8f0)',
        padding: 'clamp(48px, 6vw, 96px) 0',
        background: 'var(--vice-dark, #ffffff)',
        position: 'relative',
      }}
    >
      {/* Anchor for any old #screenshots links to land here cleanly */}
      <div id="screenshots" style={{ position: 'absolute', top: '-80px', left: 0 }} aria-hidden="true" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* TIER 1: WHAT YOU CAN USE TODAY (AI CARE TEAM & WELLNESS) */}
        {/* ======================================================== */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ maxWidth: '780px', marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(13, 148, 136, 0.08)',
                border: '1px solid rgba(13, 148, 136, 0.2)',
                marginBottom: '16px',
              }}
            >
              <Sparkles size={14} style={{ color: '#0d9488' }} aria-hidden="true" />
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#0d9488',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {t('today.badge')}
              </span>
            </div>

            <h2
              id="today-heading"
              className="uh-display"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                color: 'var(--site-heading, #0f172a)',
                margin: '0 0 16px 0',
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              {t('today.heading')}
            </h2>

            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.65,
                color: 'var(--vice-muted, #475569)',
                margin: 0,
              }}
            >
              {t('today.subheading')}
            </p>
          </div>

          {/* Two Prominent Feature Highlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Feature Card A: UltimateHealth Care Team (AI Doctors) */}
            <div
              style={{
                padding: 'clamp(20px, 3.5vw, 32px)',
                borderRadius: '24px',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                boxShadow: '0 4px 20px -2px rgba(13, 148, 136, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                minWidth: 0,
                maxWidth: '100%',
              }}
              className="hover:border-teal-500 transition-colors min-w-0 w-full"
            >
              {/* Subtle decorative gradient pill at corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(13, 148, 136, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0d9488',
                        flexShrink: 0,
                      }}
                    >
                      <Bot size={26} aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--site-heading, #0f172a)',
                          margin: 0,
                        }}
                      >
                        {t('today.aiDoctor.title')}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--vice-muted, #64748b)',
                          margin: '2px 0 0 0',
                          fontWeight: 500,
                        }}
                      >
                        {t('today.aiDoctor.subtitle')}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(13, 148, 136, 0.12)',
                      color: '#0d9488',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}
                  >
                    <Bot size={13} aria-hidden="true" />
                    {t('today.aiDoctor.badge')}
                  </span>
                </div>

                {/* Main Feature Statement */}
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(13, 148, 136, 0.05)',
                    border: '1px solid rgba(13, 148, 136, 0.15)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <MessageSquare size={18} style={{ color: '#0d9488', flexShrink: 0 }} aria-hidden="true" />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#0f766e',
                    }}
                  >
                    {t('today.aiDoctor.highlight')}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--vice-muted, #475569)',
                    marginBottom: '20px',
                  }}
                >
                  {t('today.aiDoctor.desc')}
                </p>

                {/* Value Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--vice-surface, #f8fafc)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      color: 'var(--vice-text, #334155)',
                    }}
                  >
                    ✓ {t('today.aiDoctor.tag1')}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--vice-surface, #f8fafc)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      color: 'var(--vice-text, #334155)',
                    }}
                  >
                    ✓ {t('today.aiDoctor.tag2')}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--vice-surface, #f8fafc)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      color: 'var(--vice-text, #334155)',
                    }}
                  >
                    ✓ {t('today.aiDoctor.tag3')}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={USER_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#0d9488',
                    color: '#ffffff',
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                  className="hover:bg-teal-700"
                >
                  <span>Ask AI in App</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
                <Link
                  href={`/${locale}/apps#user-app`}
                  style={{
                    fontSize: '0.8125rem',
                    color: '#0d9488',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="hover:underline"
                >
                  <span>Learn how it works</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Feature Card B: Wellness Routine & 48h Plan Refresh */}
            <div
              style={{
                padding: 'clamp(20px, 3.5vw, 32px)',
                borderRadius: '24px',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                boxShadow: '0 4px 20px -2px rgba(13, 148, 136, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                minWidth: 0,
                maxWidth: '100%',
              }}
              className="hover:border-teal-500 transition-colors min-w-0 w-full"
            >
              {/* Subtle decorative gradient pill at corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#059669',
                        flexShrink: 0,
                      }}
                    >
                      <Activity size={26} aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--site-heading, #0f172a)',
                          margin: 0,
                        }}
                      >
                        {t('today.wellness.title')}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--vice-muted, #64748b)',
                          margin: '2px 0 0 0',
                          fontWeight: 500,
                        }}
                      >
                        {t('today.wellness.subtitle')}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      color: '#059669',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}
                  >
                    <Calendar size={13} aria-hidden="true" />
                    {t('today.wellness.badge')}
                  </span>
                </div>

                {/* Main Feature Statement */}
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Zap size={18} style={{ color: '#059669', flexShrink: 0 }} aria-hidden="true" />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#047857',
                    }}
                  >
                    {t('today.wellness.highlight')}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--vice-muted, #475569)',
                    marginBottom: '20px',
                  }}
                >
                  {t('today.wellness.desc')}
                </p>

                {/* Value Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--vice-surface, #f8fafc)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      color: 'var(--vice-text, #334155)',
                    }}
                  >
                    ✓ {t('today.wellness.tag1')}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--vice-surface, #f8fafc)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      color: 'var(--vice-text, #334155)',
                    }}
                  >
                    ✓ {t('today.wellness.tag2')}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--vice-surface, #f8fafc)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      color: 'var(--vice-text, #334155)',
                    }}
                  >
                    ✓ {t('today.wellness.tag3')}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={USER_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                  className="hover:bg-emerald-700"
                >
                  <span>Start Wellness Log</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalGroup('user');
                    setActiveModalIndex(6); // index 6 is wellness-dashboard
                  }}
                  style={{
                    fontSize: '0.8125rem',
                    color: '#059669',
                    fontWeight: 600,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                  className="hover:underline"
                >
                  <span>Inspect Wellness Screen</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIER 2: ULTIMATEHEALTH ECOSYSTEM (COMMUNITY, ADMIN, WEB) */}
        {/* ======================================================== */}
        <div style={{ paddingTop: '20px', borderTop: '1px dashed var(--explorer-border, #e2e8f0)' }}>
          {/* Section Header */}
          <div
            style={{
              maxWidth: '820px',
              margin: '40px auto 48px auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(13, 148, 136, 0.08)',
                border: '1px solid rgba(13, 148, 136, 0.2)',
                marginBottom: '16px',
              }}
            >
              <Smartphone size={14} style={{ color: '#0d9488' }} aria-hidden="true" />
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#0d9488',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {t('sectionBadge')}
              </span>
            </div>

            <h2
              id="apps-heading"
              className="uh-display"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--site-heading, #0f172a)',
                margin: '0 0 16px 0',
                fontWeight: 800,
                lineHeight: 1.2,
                textAlign: 'center',
              }}
            >
              {t('title')}
            </h2>

            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.65,
                color: 'var(--vice-muted, #475569)',
                margin: '0 auto 16px auto',
                maxWidth: '680px',
                textAlign: 'center',
              }}
            >
              {t('subtitle')}
            </p>

            <span
              style={{
                display: 'inline-block',
                fontSize: '0.8125rem',
                color: '#0d9488',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textAlign: 'center',
              }}
            >
              {t('introPill')}
            </span>
          </div>

          {/* Two-Column Apps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-12">
            {/* Card 1: UltimateHealth User / Community App */}
            <article
              id="user-app"
              aria-labelledby="user-app-title"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(20px, 3.5vw, 36px) clamp(16px, 3vw, 32px)',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                borderRadius: '24px',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                minWidth: 0,
                maxWidth: '100%',
              }}
              className="hover:shadow-lg transition-shadow min-w-0 w-full"
            >
              <div>
                {/* Header with App Icon and Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        backgroundColor: '#0f172a',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    >
                      <Image
                        src={withBasePath("/ap-asset/user-app-icon.png")}
                        alt="UltimateHealth Community App Icon"
                        fill
                        sizes="64px"
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                        onError={handleImageError}
                      />
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#0d9488',
                          marginBottom: '4px',
                        }}
                      >
                        {t('userApp.badge')}
                      </span>
                      <h3
                        id="user-app-title"
                        style={{
                          fontSize: '1.375rem',
                          fontWeight: 700,
                          color: 'var(--site-heading, #0f172a)',
                          margin: 0,
                        }}
                      >
                        {t('userApp.name')}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--vice-muted, #64748b)',
                          margin: '2px 0 0 0',
                        }}
                      >
                        {t('userApp.tagline')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Factual Description */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--vice-muted, #475569)',
                    marginBottom: '24px',
                  }}
                >
                  {t('userApp.desc')}
                </p>

                {/* Verified Feature Bullets */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '28px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <BookOpen size={18} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                      {t('userApp.feat1')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Headphones size={18} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                      {t('userApp.feat2')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Sparkles size={18} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                      {t('userApp.feat3')}
                    </span>
                  </div>
                </div>

                {/* Real Screenshot Preview Carousel */}
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--vice-muted, #64748b)',
                          margin: 0,
                        }}
                      >
                        App Screenshots ({userScreenshots.length} Screens)
                      </p>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(13, 148, 136, 0.1)',
                          color: '#0d9488',
                          fontWeight: 600,
                        }}
                      >
                        Click to inspect
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => scrollTray(userTrayRef, 'left')}
                        aria-label="Scroll user app screenshots left"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--explorer-border, #e2e8f0)',
                          background: 'var(--explorer-surface, #ffffff)',
                          color: 'var(--vice-text, #334155)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        className="hover:border-[#0d9488] hover:text-[#0d9488]"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollTray(userTrayRef, 'right')}
                        aria-label="Scroll user app screenshots right"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--explorer-border, #e2e8f0)',
                          background: 'var(--explorer-surface, #ffffff)',
                          color: 'var(--vice-text, #334155)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        className="hover:border-[#0d9488] hover:text-[#0d9488]"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={userTrayRef}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      paddingBottom: '8px',
                      scrollbarWidth: 'thin',
                      minWidth: 0,
                      maxWidth: '100%',
                      width: '100%',
                    }}
                  >
                    {userScreenshots.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setActiveModalGroup('user');
                          setActiveModalIndex(i);
                        }}
                        style={{
                          flex: '0 0 110px',
                          scrollSnapAlign: 'start',
                          padding: 0,
                          background: 'transparent',
                          border: '1px solid var(--explorer-border, #e2e8f0)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'transform 0.15s ease, border-color 0.15s ease',
                        }}
                        className="hover:scale-[1.03] hover:border-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
                        aria-label={`Inspect screenshot: ${item.caption}`}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '9 / 18',
                            backgroundColor: '#0f172a',
                          }}
                        >
                          <Image
                            src={withBasePath(item.src)}
                            alt={item.alt}
                            fill
                            sizes="110px"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                            unoptimized
                            onError={handleImageError}
                          />
                        </div>
                        <div
                          style={{
                            padding: '6px 8px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: 'var(--vice-muted, #475569)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            backgroundColor: 'var(--explorer-surface, #ffffff)',
                            borderTop: '1px solid var(--explorer-border, #e2e8f0)',
                          }}
                          title={item.caption}
                        >
                          {item.caption}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--explorer-border, #f1f5f9)',
                  }}
                >
                  <a
                    href={USER_APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      backgroundColor: '#0d9488',
                      color: '#ffffff',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'background-color 0.15s ease',
                    }}
                    className="hover:bg-teal-700"
                  >
                    <span>{t('viewPlayStore')}</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>

                  <Link
                    href={`/${locale}/apps#user-app`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--explorer-border, #cbd5e1)',
                      color: 'var(--site-heading, #0f172a)',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'border-color 0.15s ease, background-color 0.15s ease',
                    }}
                    className="hover:border-[#0d9488] hover:text-[#0d9488]"
                  >
                    <span>{t('learnMore')}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>

                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8125rem',
                      color: 'var(--vice-muted, #64748b)',
                      textDecoration: 'none',
                      marginLeft: 'auto',
                    }}
                    className="hover:text-teal-600 hover:underline"
                  >
                    <span>{t('viewSource')}</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            {/* Card 2: Clinical & Moderation Admin App */}
            <article
              id="admin-app"
              aria-labelledby="admin-app-title"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(20px, 3.5vw, 36px) clamp(16px, 3vw, 32px)',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                borderRadius: '24px',
                boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                minWidth: 0,
                maxWidth: '100%',
              }}
              className="hover:shadow-lg transition-shadow min-w-0 w-full"
            >
              <div>
                {/* Header with App Icon and Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        backgroundColor: '#042f2e',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    >
                      <Image
                        src={withBasePath("/admin-asset/admin-icon.png")}
                        alt="UltimateHealth Admin & Moderation App Icon"
                        fill
                        sizes="64px"
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                        onError={handleImageError}
                      />
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#0f766e',
                          marginBottom: '4px',
                        }}
                      >
                        {t('adminApp.badge')}
                      </span>
                      <h3
                        id="admin-app-title"
                        style={{
                          fontSize: '1.375rem',
                          fontWeight: 700,
                          color: 'var(--site-heading, #0f172a)',
                          margin: 0,
                        }}
                      >
                        {t('adminApp.name')}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--vice-muted, #64748b)',
                          margin: '2px 0 0 0',
                        }}
                      >
                        {t('adminApp.tagline')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Factual Description */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
                    color: 'var(--vice-muted, #475569)',
                    marginBottom: '24px',
                  }}
                >
                  {t('adminApp.desc')}
                </p>

                {/* Verified Feature Bullets */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '28px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <ShieldCheck size={18} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                      {t('adminApp.feat1')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Layers size={18} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                      {t('adminApp.feat2')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <HeartHandshake size={18} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                      {t('adminApp.feat3')}
                    </span>
                  </div>
                </div>

                {/* Real Admin Screenshot Preview Carousel */}
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--vice-muted, #64748b)',
                          margin: 0,
                        }}
                      >
                        Admin Screenshots ({adminScreenshots.length} Screens)
                      </p>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(15, 118, 110, 0.1)',
                          color: '#0f766e',
                          fontWeight: 600,
                        }}
                      >
                        Click to inspect
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => scrollTray(adminTrayRef, 'left')}
                        aria-label="Scroll admin app screenshots left"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--explorer-border, #e2e8f0)',
                          background: 'var(--explorer-surface, #ffffff)',
                          color: 'var(--vice-text, #334155)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        className="hover:border-[#0f766e] hover:text-[#0f766e]"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollTray(adminTrayRef, 'right')}
                        aria-label="Scroll admin app screenshots right"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--explorer-border, #e2e8f0)',
                          background: 'var(--explorer-surface, #ffffff)',
                          color: 'var(--vice-text, #334155)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        className="hover:border-[#0f766e] hover:text-[#0f766e]"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={adminTrayRef}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      paddingBottom: '8px',
                      scrollbarWidth: 'thin',
                      minWidth: 0,
                      maxWidth: '100%',
                      width: '100%',
                    }}
                  >
                    {adminScreenshots.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setActiveModalGroup('admin');
                          setActiveModalIndex(i);
                        }}
                        style={{
                          flex: '0 0 110px',
                          scrollSnapAlign: 'start',
                          padding: 0,
                          background: 'transparent',
                          border: '1px solid var(--explorer-border, #e2e8f0)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'transform 0.15s ease, border-color 0.15s ease',
                        }}
                        className="hover:scale-[1.03] hover:border-[#0f766e] focus-visible:outline-2 focus-visible:outline-[#0f766e]"
                        aria-label={`Inspect screenshot: ${item.caption}`}
                      >
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '9 / 18',
                            backgroundColor: '#0f172a',
                          }}
                        >
                          <Image
                            src={withBasePath(item.src)}
                            alt={item.alt}
                            fill
                            sizes="110px"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                            unoptimized
                            onError={handleImageError}
                          />
                        </div>
                        <div
                          style={{
                            padding: '6px 8px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: 'var(--vice-muted, #475569)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            backgroundColor: 'var(--explorer-surface, #ffffff)',
                            borderTop: '1px solid var(--explorer-border, #e2e8f0)',
                          }}
                          title={item.caption}
                        >
                          {item.caption}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--explorer-border, #f1f5f9)',
                  }}
                >
                  <a
                    href={ADMIN_APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      backgroundColor: '#0f766e',
                      color: '#ffffff',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'background-color 0.15s ease',
                    }}
                    className="hover:bg-teal-800"
                  >
                    <span>{t('viewPlayStore')}</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>

                  <Link
                    href={`/${locale}/admin-agreement`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--explorer-border, #cbd5e1)',
                      color: 'var(--site-heading, #0f172a)',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'border-color 0.15s ease, background-color 0.15s ease',
                    }}
                    className="hover:border-[#0f766e] hover:text-[#0f766e]"
                  >
                    <span>{t('viewAgreement')}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>

                  <Link
                    href={`/${locale}/apps#admin-app`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8125rem',
                      color: 'var(--vice-muted, #64748b)',
                      textDecoration: 'none',
                      marginLeft: 'auto',
                    }}
                    className="hover:text-teal-700 hover:underline"
                  >
                    <span>{t('learnMore')}</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* Universal Web Platform Banner */}
          <div
            style={{
              padding: 'clamp(20px, 3vw, 28px) clamp(16px, 3vw, 32px)',
              backgroundColor: 'var(--explorer-surface, #ffffff)',
              border: '1px solid var(--explorer-border, #e2e8f0)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              minWidth: 0,
              maxWidth: '100%',
            }}
            className="min-w-0 w-full"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '680px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(13, 148, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0d9488',
                  flexShrink: 0,
                }}
              >
                <Globe2 size={24} aria-hidden="true" />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: 'var(--site-heading, #0f172a)',
                    margin: '0 0 4px 0',
                  }}
                >
                  {t('webApp.name')}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--vice-muted, #64748b)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {t('webApp.desc')}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/${locale}/articles`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  backgroundColor: 'var(--vice-surface, #f8fafc)',
                  border: '1px solid var(--explorer-border, #cbd5e1)',
                  color: 'var(--site-heading, #0f172a)',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:border-[#0d9488] hover:text-[#0d9488]"
              >
                <span>{t('readArticles')}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/apps`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:bg-teal-700"
              >
                <span>{t('exploreAllApps')}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Ethical Medical Disclaimer */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(148, 163, 184, 0.08)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: 'var(--vice-muted, #64748b)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <CheckCircle2 size={16} style={{ color: '#0d9488', flexShrink: 0 }} aria-hidden="true" />
            <span>{t('disclaimer')}</span>
          </div>
        </div>
      </div>

      {/* Accessible Screenshot Lightbox Modal with Next / Prev */}
      {currentModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentModalImage.caption}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setActiveModalGroup(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '420px',
              width: '100%',
              backgroundColor: 'var(--explorer-surface, #ffffff)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--site-heading, #0f172a)',
                    margin: 0,
                  }}
                >
                  {currentModalImage.caption}
                </h4>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--vice-muted, #64748b)',
                  }}
                >
                  {activeModalGroup === 'user' ? 'User Community App' : 'Admin Moderation App'} • Screen {activeModalIndex + 1} of {activeList.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalGroup(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--vice-muted, #64748b)',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800"
                aria-label="Close screenshot preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image Display */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '9 / 18',
                backgroundColor: '#020617',
              }}
            >
              <Image
                src={withBasePath(currentModalImage.src)}
                alt={currentModalImage.alt}
                fill
                sizes="(max-width: 640px) 95vw, 420px"
                style={{ objectFit: 'contain' }}
                priority
                unoptimized
                onError={handleImageError}
              />

              {/* Prev / Next Floating Arrows */}
              <button
                type="button"
                onClick={handlePrevModal}
                aria-label="Previous screenshot"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                className="hover:bg-teal-600"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNextModal}
                aria-label="Next screenshot"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                className="hover:bg-teal-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '12px 18px',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                borderTop: '1px solid var(--explorer-border, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)' }}>
                Use Left / Right arrow keys to navigate • Esc to close
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handlePrevModal}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1px solid var(--explorer-border, #e2e8f0)',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  className="hover:border-[#0d9488]"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={handleNextModal}
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1px solid #0d9488',
                    background: '#0d9488',
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
