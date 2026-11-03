'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { withBasePath } from '@/lib/basePath';
import {
  BookOpen,
  Headphones,
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
      aria-label="UltimateHealth Applications"
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
    </section>
  );
}
