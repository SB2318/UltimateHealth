'use client';

import React from 'react';
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
  HeartHandshake,
  ExternalLink,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Bot,
  Activity,
  FileCheck,
  Languages,
  Lock,
  Layers,
  Calendar,
  MessageSquare,
  Stethoscope,
} from 'lucide-react';

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

  const USER_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth';
  const ADMIN_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.ultimatehealth.admin';
  const GITHUB_REPO_URL = 'https://github.com/SB2318/UltimateHealth';

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
                textAlign: 'left',
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
            {/* Feature Card A: UltimateHealth Care Team (AI Assistants) */}
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
                    }}
                  >
                    <Sparkles size={12} />
                    {t('today.aiDoctor.badge')}
                  </span>
                </div>

                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(13, 148, 136, 0.06)',
                    border: '1px solid rgba(13, 148, 136, 0.15)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <MessageSquare size={16} style={{ color: '#0d9488', flexShrink: 0 }} aria-hidden="true" />
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--site-heading, #0f172a)',
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
                    }}
                  >
                    <Smartphone size={12} />
                    {t('today.wellness.badge')}
                  </span>
                </div>

                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Calendar size={16} style={{ color: '#059669', flexShrink: 0 }} aria-hidden="true" />
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--site-heading, #0f172a)',
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
                <Link
                  href={`/${locale}/apps#user-app`}
                  style={{
                    fontSize: '0.8125rem',
                    color: '#059669',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                  className="hover:underline"
                >
                  <span>Learn more in apps</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
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

                {/* What You Can Use: Application Features */}
                <div style={{ marginBottom: '28px' }}>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--vice-muted, #64748b)',
                      marginBottom: '14px',
                    }}
                  >
                    Application Features & What You Can Use
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <BookOpen size={17} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Evidence-Based Guides
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          {t('userApp.feat1')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Headphones size={17} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Audio Narration & Podcasts
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          {t('userApp.feat2')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Languages size={17} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Plain-Language Glossary
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          {t('userApp.feat3')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Bot size={17} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Non-Diagnostic AI Guidance
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          Ask up to 5 daily questions per specialist AI topic to clarify terminology and self-care steps.
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Activity size={17} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Adaptive Wellness Routine
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          Log personal symptoms and refresh your 48-hour activity and wellness roadmap.
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Lock size={17} style={{ color: '#0d9488', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Zero Ads or Tracking
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          Fully open-source, offline-ready storage, and no commercial data monetization.
                        </div>
                      </div>
                    </div>
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
                    className="hover:text-teal-700 hover:underline"
                  >
                    <span>{t('viewSource')}</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            {/* Card 2: UltimateHealth Admin App */}
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

                {/* What You Can Use: Admin Features */}
                <div style={{ marginBottom: '28px' }}>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--vice-muted, #64748b)',
                      marginBottom: '14px',
                    }}
                  >
                    Clinical Governance Workstation & Features
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <FileCheck size={17} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Editorial Review Queue
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          {t('adminApp.feat1')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Languages size={17} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Terminology Governance
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          {t('adminApp.feat2')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <HeartHandshake size={17} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Moderator Ethics Protocol
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          {t('adminApp.feat3')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Stethoscope size={17} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Volunteer Doctor Onboarding
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          Verified healthcare contributor agreements protecting clinical dignity.
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <ShieldCheck size={17} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          Citation Fact-Checking
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          Verification of medical journal sources and references before publishing.
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--vice-surface, #f8fafc)',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}
                    >
                      <Layers size={17} style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--site-heading, #0f172a)', marginBottom: '2px' }}>
                          GitHub Audit Synchronization
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--vice-muted, #64748b)', lineHeight: 1.45 }}>
                          Audited change history linked directly to open-source project commits.
                        </div>
                      </div>
                    </div>
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
    </section>
  );
}
