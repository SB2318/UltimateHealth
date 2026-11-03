'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
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
} from 'lucide-react';

interface ScreenshotItem {
  src: string;
  caption: string;
  alt: string;
}

const userScreenshots: ScreenshotItem[] = [
  {
    src: '/ap-asset/page-1.jpg',
    caption: 'Welcome & Patient Dignity Ethos',
    alt: 'UltimateHealth mobile app welcome screen showing clinical mission and introductory topics',
  },
  {
    src: '/ap-asset/page-2.jpg',
    caption: 'Curated Health Articles Directory',
    alt: 'Community health articles directory listing verified clinical guides with tags and search',
  },
  {
    src: '/ap-asset/page-4.jpg',
    caption: 'Audio Podcasts & Voice Narration',
    alt: 'Health podcast playback screen with player controls, timestamps, and episode notes',
  },
];

const adminScreenshots: ScreenshotItem[] = [
  {
    src: '/admin-asset/page-1.jpg',
    caption: 'Clinical Overview & Review Queue',
    alt: 'UltimateHealth Admin dashboard with pending health articles and reviewer assignments',
  },
  {
    src: '/admin-asset/page-2.jpg',
    caption: 'Doctor Content Moderation Workflow',
    alt: 'Article evaluation interface showing clinical peer-review criteria and feedback fields',
  },
  {
    src: '/admin-asset/page-3.jpg',
    caption: 'Article Fact-Check & Verification',
    alt: 'Evidence verification screen highlighting source citations and non-promotional standards',
  },
];

export default function AppsSection() {
  const t = useTranslations('apps');
  const locale = useLocale();
  const [activeModalImage, setActiveModalImage] = useState<ScreenshotItem | null>(null);

  const USER_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth';
  const ADMIN_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.ultimatehealth.admin';
  const GITHUB_REPO_URL = 'https://github.com/SB2318/UltimateHealth';

  return (
    <section
      id="apps"
      aria-labelledby="apps-heading"
      className="uh-section-deep"
      style={{
        borderTop: '1px solid var(--explorer-border, #e2e8f0)',
        padding: '96px 24px',
        background: 'var(--vice-dark, #ffffff)',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '56px' }}>
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
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--site-heading, #0f172a)',
              margin: '0 0 16px 0',
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            {t('title')}
          </h2>

          <p
            style={{
              fontSize: '1.0625rem',
              lineHeight: 1.65,
              color: 'var(--vice-muted, #475569)',
              margin: '0 0 16px 0',
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
            }}
          >
            {t('introPill')}
          </span>
        </div>

        {/* 2 Main App Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          {/* Card 1: Community App */}
          <article
            aria-labelledby="user-app-title"
            style={{
              background: 'var(--explorer-surface, #ffffff)',
              border: '1px solid var(--explorer-border, #e2e8f0)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.04))',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            className="group hover:border-[#0d9488] hover:shadow-[0_12px_36px_rgba(13,148,136,0.12)]"
          >
            <div>
              {/* Header with authentic icon and badges */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      flexShrink: 0,
                      position: 'relative',
                      backgroundColor: '#f8fafc',
                    }}
                  >
                    <Image
                      src="/ap-asset/user-app-icon.png"
                      alt="UltimateHealth Community App icon"
                      width={64}
                      height={64}
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
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

              {/* Real Screenshot Preview Gallery (Proportions Preserved) */}
              <div style={{ marginBottom: '28px' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--vice-muted, #64748b)',
                    marginBottom: '10px',
                  }}
                >
                  Authentic App Screens (Click to inspect)
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                  }}
                >
                  {userScreenshots.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveModalImage(item)}
                      style={{
                        padding: 0,
                        background: 'transparent',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'transform 0.15s ease, border-color 0.15s ease',
                      }}
                      className="hover:scale-[1.02] hover:border-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
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
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 30vw, 160px"
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid var(--explorer-border, #e2e8f0)',
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
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                }}
                className="hover:bg-[#0f766e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488]"
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
                  backgroundColor: 'transparent',
                  color: 'var(--vice-text, #1e293b)',
                  border: '1px solid var(--explorer-border, #cbd5e1)',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
                className="hover:border-[#0d9488] hover:text-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
              >
                <span>{t('learnMore')}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--vice-muted, #64748b)',
                  textDecoration: 'none',
                  marginLeft: 'auto',
                }}
                className="hover:text-[#0d9488] hover:underline"
              >
                {t('viewSource')}
              </a>
            </div>
          </article>

          {/* Card 2: Admin App */}
          <article
            aria-labelledby="admin-app-title"
            style={{
              background: 'var(--explorer-surface, #ffffff)',
              border: '1px solid var(--explorer-border, #e2e8f0)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.04))',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            className="group hover:border-[#0d9488] hover:shadow-[0_12px_36px_rgba(13,148,136,0.12)]"
          >
            <div>
              {/* Header with authentic icon and badges */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      flexShrink: 0,
                      position: 'relative',
                      backgroundColor: '#e6f4fe',
                    }}
                  >
                    <Image
                      src="/admin-asset/admin-icon.png"
                      alt="UltimateHealth Admin App icon"
                      width={64}
                      height={64}
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#2563eb',
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
                  <ShieldCheck size={18} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                    {t('adminApp.feat1')}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Layers size={18} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                    {t('adminApp.feat2')}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <HeartHandshake size={18} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--vice-text, #1e293b)', lineHeight: 1.5 }}>
                    {t('adminApp.feat3')}
                  </span>
                </div>
              </div>

              {/* Real Screenshot Preview Gallery */}
              <div style={{ marginBottom: '28px' }}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--vice-muted, #64748b)',
                    marginBottom: '10px',
                  }}
                >
                  Clinical Review Screens (Click to inspect)
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                  }}
                >
                  {adminScreenshots.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveModalImage(item)}
                      style={{
                        padding: 0,
                        background: 'transparent',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'transform 0.15s ease, border-color 0.15s ease',
                      }}
                      className="hover:scale-[1.02] hover:border-[#2563eb] focus-visible:outline-2 focus-visible:outline-[#2563eb]"
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
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 30vw, 160px"
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid var(--explorer-border, #e2e8f0)',
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
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                }}
                className="hover:bg-[#1d4ed8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
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
                  backgroundColor: 'transparent',
                  color: 'var(--vice-text, #1e293b)',
                  border: '1px solid var(--explorer-border, #cbd5e1)',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
                className="hover:border-[#2563eb] hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-[#2563eb]"
              >
                <span>Reviewer Agreement</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/apps#admin-app`}
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--vice-muted, #64748b)',
                  textDecoration: 'none',
                  marginLeft: 'auto',
                }}
                className="hover:text-[#2563eb] hover:underline"
              >
                {t('learnMore')}
              </Link>
            </div>
          </article>
        </div>

        {/* Web Platform Banner & Exploration Link */}
        <div
          style={{
            background: 'rgba(13, 148, 136, 0.04)',
            border: '1px solid rgba(13, 148, 136, 0.15)',
            borderRadius: '20px',
            padding: '28px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '640px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(13, 148, 136, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0d9488',
                flexShrink: 0,
              }}
            >
              <Globe2 size={22} aria-hidden="true" />
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
                {t('webApp.name')} · {t('webApp.badge')}
              </h4>
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: 'var(--vice-muted, #475569)',
                  margin: 0,
                }}
              >
                {t('webApp.desc')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href={`/${locale}/articles`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0d9488',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              className="hover:bg-[#0f766e] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
            >
              <span>{t('viewWeb')}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            <Link
              href={`/${locale}/apps`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: 'var(--site-heading, #0f172a)',
                border: '1px solid var(--explorer-border, #cbd5e1)',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              className="hover:border-[#0d9488] hover:text-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
            >
              <span>{t('exploreAllApps')}</span>
            </Link>
          </div>
        </div>

        {/* Nonprofit & Medical Educational Disclaimer */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            backgroundColor: 'var(--explorer-surface, #ffffff)',
            border: '1px solid var(--explorer-border, #e2e8f0)',
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

      {/* Accessible Screenshot Lightbox Modal */}
      {activeModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalImage.caption}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '24px',
          }}
          onClick={() => setActiveModalImage(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setActiveModalImage(null);
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '380px',
              width: '100%',
              backgroundColor: 'var(--explorer-surface, #ffffff)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
              }}
            >
              <h4
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--site-heading, #0f172a)',
                  margin: 0,
                }}
              >
                {activeModalImage.caption}
              </h4>
              <button
                type="button"
                onClick={() => setActiveModalImage(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--vice-muted, #64748b)',
                  padding: '4px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="hover:text-slate-900 dark:hover:text-white"
                aria-label="Close screenshot preview"
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '9 / 18',
                backgroundColor: '#0f172a',
              }}
            >
              <Image
                src={activeModalImage.src}
                alt={activeModalImage.alt}
                fill
                sizes="(max-width: 640px) 90vw, 380px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
