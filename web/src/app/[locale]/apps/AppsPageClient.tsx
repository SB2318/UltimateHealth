'use client';

import React, { useState } from 'react';
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
  Lock,
  GitBranch,
  Search,
  Eye,
  FileCheck,
  Stethoscope,
} from 'lucide-react';

import SiteHeader from '@/components/home/SiteHeader';
import { Footer } from '@/components/ui/footer';

interface ScreenshotDetail {
  id: string;
  src: string;
  title: string;
  desc: string;
  app: 'user' | 'admin';
}

const userScreenshotsList: ScreenshotDetail[] = [
  {
    id: 'u1',
    src: '/ap-asset/page-1.jpg',
    title: 'Welcome & Dignity Protocol',
    desc: 'Introduction to community health literacy, highlighting patient dignity and open access.',
    app: 'user',
  },
  {
    id: 'u2',
    src: '/ap-asset/page-2.jpg',
    title: 'Evidence-Based Article Library',
    desc: 'Categorized clinical explainers covering respiratory, cardiovascular, and preventive wellness.',
    app: 'user',
  },
  {
    id: 'u3',
    src: '/ap-asset/page-3.jpg',
    title: 'Comfortable Reading View',
    desc: 'Clean typography, expandable sections, evidence sources, and comfortable dark/light readability.',
    app: 'user',
  },
  {
    id: 'u4',
    src: '/ap-asset/page-4.jpg',
    title: 'Audio Podcasts & Stream',
    desc: 'Voice-narrated health summaries and community medical discussions for hands-free listening.',
    app: 'user',
  },
  {
    id: 'u5',
    src: '/ap-asset/page-5.jpg',
    title: 'Plain-Language Medical Glossary',
    desc: 'Search complex medical terms explained with everyday analogies and bilingual definitions.',
    app: 'user',
  },
  {
    id: 'u6',
    src: '/ap-asset/page-6.jpg',
    title: 'Personal Wellness Dashboard',
    desc: 'Saved bookmarks, reading history, and quick access to topic guides without tracking.',
    app: 'user',
  },
  {
    id: 'u7',
    src: '/ap-asset/wellness-dashboard.jpeg',
    title: 'Wellness & Routine Tracker',
    desc: 'Daily health indicators, symptom reflection, and preventive care tracking.',
    app: 'user',
  },
  {
    id: 'u8',
    src: '/ap-asset/quick-care-and-relief.jpeg',
    title: 'Quick Relief & First-Aid Guides',
    desc: 'Immediate reference guides with warning signs and triage tips for common acute concerns.',
    app: 'user',
  },
  {
    id: 'u9',
    src: '/ap-asset/podcast-list.jpeg',
    title: 'Multilingual Audio Episodes',
    desc: 'Bilingual audio explainers narrating essential health articles across 9 languages.',
    app: 'user',
  },
  {
    id: 'u10',
    src: '/ap-asset/care-team-ultimatehealth.jpeg',
    title: 'Verified Care Team Directory',
    desc: 'Community medical advisory network and peer-reviewed doctor profiles.',
    app: 'user',
  },
  {
    id: 'u11',
    src: '/ap-asset/customize-homepage.jpeg',
    title: 'Customizable Health Feed',
    desc: 'Personalized preference settings to prioritize topics most relevant to your family.',
    app: 'user',
  },
  {
    id: 'u12',
    src: '/ap-asset/open-source-licenses.jpeg',
    title: 'Open Source Transparency',
    desc: 'Complete open-source licensing audit trail verifying zero commercial ad tracking.',
    app: 'user',
  },
];

const adminScreenshotsList: ScreenshotDetail[] = [
  {
    id: 'a1',
    src: '/admin-asset/page-1.jpg',
    title: 'Clinical Overview & Queue',
    desc: 'Central dashboard showing pending submissions, reviewer assignments, and publication timelines.',
    app: 'admin',
  },
  {
    id: 'a2',
    src: '/admin-asset/page-2.jpg',
    title: 'Doctor Content Moderation',
    desc: 'Structured peer-review rubric checking clinical accuracy, citations, and clarity before approval.',
    app: 'admin',
  },
  {
    id: 'a3',
    src: '/admin-asset/page-3.jpg',
    title: 'Article Verification & Fact-Check',
    desc: 'Detailed inspection of medical claims, contraindications, and language accuracy.',
    app: 'admin',
  },
  {
    id: 'a4',
    src: '/admin-asset/page-6.jpg',
    title: 'Editorial Feedback Loop',
    desc: 'Structured reviewer notes sent back to volunteer authors for iterative improvements.',
    app: 'admin',
  },
  {
    id: 'a5',
    src: '/admin-asset/page-8.jpg',
    title: 'Glossary Terminology Governance',
    desc: 'Standardizing bilingual definitions across regional languages to avoid medical ambiguity.',
    app: 'admin',
  },
  {
    id: 'a6',
    src: '/admin-asset/page-5.jpg',
    title: 'Moderator Agreement Protocol',
    desc: 'Digital signing and ethical standards enforcement honoring the Respect Giver clinical protocol.',
    app: 'admin',
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

export default function AppsPageClient() {
  const t = useTranslations('apps');
  const locale = useLocale();
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotDetail | null>(null);

  const USER_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth';
  const ADMIN_APP_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.ultimatehealth.admin';
  const GITHUB_REPO_URL = 'https://github.com/SB2318/UltimateHealth';

  return (
    <>
      <SiteHeader />
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--vice-dark, #ffffff)',
          color: 'var(--vice-text, #0f172a)',
          paddingTop: '120px',
          paddingBottom: '96px',
        }}
      >
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '32px' }}>
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '0.875rem',
              color: 'var(--vice-muted, #64748b)',
            }}
          >
            <li>
              <Link href={`/${locale}`} className="hover:text-[#0d9488] hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ fontWeight: 600, color: 'var(--site-heading, #0f172a)' }}>
              {t('sectionBadge')}
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header style={{ maxWidth: '820px', marginBottom: '64px' }}>
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

          <h1
            className="uh-display"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
              color: 'var(--site-heading, #0f172a)',
              margin: '0 0 20px 0',
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            {t('title')}
          </h1>

          <p
            style={{
              fontSize: '1.1875rem',
              lineHeight: 1.65,
              color: 'var(--vice-muted, #475569)',
              margin: '0 0 24px 0',
            }}
          >
            {t('subtitle')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#0d9488',
              }}
            >
              ✓ 100% Free & Open Source (MIT)
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--vice-muted, #64748b)',
              }}
            >
              ✓ Zero Commercial Advertising
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--vice-muted, #64748b)',
              }}
            >
              ✓ No Health Tracking or Data Sales
            </span>
          </div>
        </header>

        {/* ── Section 1: Community Health Mobile App ── */}
        <section
          id="user-app"
          aria-labelledby="user-app-heading"
          style={{
            background: 'var(--explorer-surface, #ffffff)',
            border: '1px solid var(--explorer-border, #e2e8f0)',
            borderRadius: '28px',
            padding: '48px',
            marginBottom: '56px',
            boxShadow: 'var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.03))',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  flexShrink: 0,
                  position: 'relative',
                  backgroundColor: '#f8fafc',
                }}
              >
                <Image
                  src={withBasePath("/ap-asset/user-app-icon.png")}
                  alt="UltimateHealth Community App Icon"
                  width={80}
                  height={80}
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
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#0d9488',
                    marginBottom: '4px',
                  }}
                >
                  {t('userApp.badge')}
                </span>
                <h2
                  id="user-app-heading"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--site-heading, #0f172a)',
                    margin: 0,
                  }}
                >
                  {t('userApp.name')}
                </h2>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--vice-muted, #64748b)',
                    margin: '4px 0 0 0',
                  }}
                >
                  {t('userApp.tagline')} · Package: <code>com.anonymous.UltimateHealth</code>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:bg-[#0f766e] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
              >
                <span>{t('viewPlayStore')}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--vice-text, #1e293b)',
                  border: '1px solid var(--explorer-border, #cbd5e1)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:border-[#0d9488] hover:text-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
              >
                <GitBranch size={15} aria-hidden="true" />
                <span>{t('viewSource')}</span>
              </a>
            </div>
          </div>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--vice-muted, #475569)',
              maxWidth: '880px',
              marginBottom: '36px',
            }}
          >
            {t('userApp.desc')}
          </p>

          {/* Practical Benefits Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(13, 148, 136, 0.03)',
                border: '1px solid rgba(13, 148, 136, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <BookOpen size={20} style={{ color: '#0d9488' }} aria-hidden="true" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--site-heading, #0f172a)' }}>
                  Evidence-Based Guides
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--vice-muted, #475569)', margin: 0 }}>
                {t('userApp.feat1')}
              </p>
            </div>

            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(13, 148, 136, 0.03)',
                border: '1px solid rgba(13, 148, 136, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Headphones size={20} style={{ color: '#0d9488' }} aria-hidden="true" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--site-heading, #0f172a)' }}>
                  Audio Podcasts & Narration
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--vice-muted, #475569)', margin: 0 }}>
                {t('userApp.feat2')}
              </p>
            </div>

            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(13, 148, 136, 0.03)',
                border: '1px solid rgba(13, 148, 136, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Sparkles size={20} style={{ color: '#0d9488' }} aria-hidden="true" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--site-heading, #0f172a)' }}>
                  Plain-Language Glossary
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--vice-muted, #475569)', margin: 0 }}>
                {t('userApp.feat3')}
              </p>
            </div>
          </div>

          {/* Genuine Screenshot Gallery */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--site-heading, #0f172a)',
                  margin: 0,
                }}
              >
                Application Walkthrough (Genuine Mobile Screens)
              </h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--vice-muted, #64748b)' }}>
                Click any screen to inspect
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '16px',
              }}
            >
              {userScreenshotsList.map((screen) => (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setSelectedScreenshot(screen)}
                  style={{
                    padding: 0,
                    background: 'transparent',
                    border: '1px solid var(--explorer-border, #e2e8f0)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'transform 0.15s ease, border-color 0.15s ease',
                  }}
                  className="hover:scale-[1.02] hover:border-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
                  aria-label={`Inspect ${screen.title}`}
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
                      src={withBasePath(screen.src)}
                      alt={screen.title}
                      fill
                      sizes="(max-width: 640px) 45vw, 180px"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                      unoptimized
                      onError={handleImageError}
                    />
                  </div>
                  <div
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--explorer-surface, #ffffff)',
                      borderTop: '1px solid var(--explorer-border, #e2e8f0)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--site-heading, #0f172a)',
                        margin: '0 0 2px 0',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {screen.title}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--vice-muted, #64748b)',
                        margin: 0,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {screen.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Clinical Admin & Review Workstation ── */}
        <section
          id="admin-app"
          aria-labelledby="admin-app-heading"
          style={{
            background: 'var(--explorer-surface, #ffffff)',
            border: '1px solid var(--explorer-border, #e2e8f0)',
            borderRadius: '28px',
            padding: '48px',
            marginBottom: '56px',
            boxShadow: 'var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.03))',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  flexShrink: 0,
                  position: 'relative',
                  backgroundColor: '#e6f4fe',
                }}
              >
                <Image
                  src={withBasePath("/admin-asset/admin-icon.png")}
                  alt="UltimateHealth Admin App Icon"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  unoptimized
                  onError={handleImageError}
                />
              </div>

              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#2563eb',
                    marginBottom: '4px',
                  }}
                >
                  {t('adminApp.badge')}
                </span>
                <h2
                  id="admin-app-heading"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--site-heading, #0f172a)',
                    margin: 0,
                  }}
                >
                  {t('adminApp.name')}
                </h2>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--vice-muted, #64748b)',
                    margin: '4px 0 0 0',
                  }}
                >
                  {t('adminApp.tagline')} · Package: <code>com.ultimatehealth.admin</code>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:bg-[#1d4ed8] focus-visible:outline-2 focus-visible:outline-[#2563eb]"
              >
                <span>{t('viewPlayStore')}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>

              <Link
                href={`/${locale}/admin-agreement`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--vice-text, #1e293b)',
                  border: '1px solid var(--explorer-border, #cbd5e1)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:border-[#2563eb] hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-[#2563eb]"
              >
                <FileCheck size={15} aria-hidden="true" />
                <span>Reviewer Onboarding Agreement</span>
              </Link>
            </div>
          </div>

          {/* Distinction Callout */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '14px',
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              marginBottom: '32px',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              color: 'var(--vice-text, #1e293b)',
            }}
          >
            <strong>Note on Clinical Role:</strong> UltimateHealth Admin is an internal editorial review
            workstation designed for certified resident doctors, medical students, and volunteer moderators.
            It ensures every guide published across the platform meets evidence-based standards, respectful patient dignity,
            and strict non-commercial guidelines.
          </div>

          {/* Verified Admin Feature Bullets */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(37, 99, 235, 0.03)',
                border: '1px solid rgba(37, 99, 235, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <ShieldCheck size={20} style={{ color: '#2563eb' }} aria-hidden="true" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--site-heading, #0f172a)' }}>
                  Peer-Review Queue
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--vice-muted, #475569)', margin: 0 }}>
                {t('adminApp.feat1')}
              </p>
            </div>

            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(37, 99, 235, 0.03)',
                border: '1px solid rgba(37, 99, 235, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Layers size={20} style={{ color: '#2563eb' }} aria-hidden="true" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--site-heading, #0f172a)' }}>
                  Terminology Governance
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--vice-muted, #475569)', margin: 0 }}>
                {t('adminApp.feat2')}
              </p>
            </div>

            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(37, 99, 235, 0.03)',
                border: '1px solid rgba(37, 99, 235, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <HeartHandshake size={20} style={{ color: '#2563eb' }} aria-hidden="true" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--site-heading, #0f172a)' }}>
                  Clinical Protocol Alignment
                </h3>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--vice-muted, #475569)', margin: 0 }}>
                {t('adminApp.feat3')}
              </p>
            </div>
          </div>

          {/* Admin Screenshot Gallery */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--site-heading, #0f172a)',
                  margin: 0,
                }}
              >
                Editorial Workstation Screens (Click to inspect)
              </h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--vice-muted, #64748b)' }}>
                Click any screen to inspect
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '16px',
              }}
            >
              {adminScreenshotsList.map((screen) => (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setSelectedScreenshot(screen)}
                  style={{
                    padding: 0,
                    background: 'transparent',
                    border: '1px solid var(--explorer-border, #e2e8f0)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'transform 0.15s ease, border-color 0.15s ease',
                  }}
                  className="hover:scale-[1.02] hover:border-[#2563eb] focus-visible:outline-2 focus-visible:outline-[#2563eb]"
                  aria-label={`Inspect ${screen.title}`}
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
                      src={withBasePath(screen.src)}
                      alt={screen.title}
                      fill
                      sizes="(max-width: 640px) 45vw, 180px"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                      unoptimized
                      onError={handleImageError}
                    />
                  </div>
                  <div
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--explorer-surface, #ffffff)',
                      borderTop: '1px solid var(--explorer-border, #e2e8f0)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--site-heading, #0f172a)',
                        margin: '0 0 2px 0',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {screen.title}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--vice-muted, #64748b)',
                        margin: 0,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {screen.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Universal Web Publication ── */}
        <section
          id="web-platform"
          aria-labelledby="web-platform-heading"
          style={{
            background: 'var(--explorer-surface, #ffffff)',
            border: '1px solid var(--explorer-border, #e2e8f0)',
            borderRadius: '28px',
            padding: '40px 48px',
            marginBottom: '56px',
            boxShadow: 'var(--explorer-card-shadow, 0 4px 20px rgba(0,0,0,0.03))',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#0d9488',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                <Globe2 size={16} aria-hidden="true" />
                <span>{t('webApp.badge')}</span>
              </div>

              <h2
                id="web-platform-heading"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--site-heading, #0f172a)',
                  margin: '0 0 10px 0',
                }}
              >
                {t('webApp.name')}
              </h2>

              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'var(--vice-muted, #475569)',
                  margin: '0 0 16px 0',
                }}
              >
                {t('webApp.desc')}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.8125rem', color: 'var(--vice-muted, #64748b)' }}>
                <span>• {t('webApp.feat1')}</span>
                <span>• {t('webApp.feat2')}</span>
                <span>• {t('webApp.feat3')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link
                href={`/${locale}/articles`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0d9488',
                  color: '#ffffff',
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:bg-[#0f766e] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
              >
                <span>Browse Health Articles</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>

              <Link
                href={`/${locale}/medical-glossary`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  color: 'var(--vice-text, #1e293b)',
                  border: '1px solid var(--explorer-border, #cbd5e1)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                className="hover:border-[#0d9488] hover:text-[#0d9488] focus-visible:outline-2 focus-visible:outline-[#0d9488]"
              >
                <span>Explore Glossary</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 4: Ethical Health Technology Statement ── */}
        <section
          aria-labelledby="ethics-heading"
          style={{
            padding: '36px 40px',
            borderRadius: '24px',
            backgroundColor: 'var(--explorer-surface, #ffffff)',
            border: '1px solid var(--explorer-border, #e2e8f0)',
            marginBottom: '40px',
          }}
        >
          <h2
            id="ethics-heading"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--site-heading, #0f172a)',
              margin: '0 0 16px 0',
            }}
          >
            Our Principles for Health Technology
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'var(--vice-muted, #475569)',
            }}
          >
            <div>
              <strong style={{ color: 'var(--site-heading, #0f172a)', display: 'block', marginBottom: '4px' }}>
                1. Educational, Not Diagnostic
              </strong>
              Our software provides medical knowledge and explanations. We never attempt automated diagnosis or replace physician judgment.
            </div>

            <div>
              <strong style={{ color: 'var(--site-heading, #0f172a)', display: 'block', marginBottom: '4px' }}>
                2. Privacy as a Core Right
              </strong>
              We do not track health searches, profile user conditions, or monetize health vulnerabilities with advertisers.
            </div>

            <div>
              <strong style={{ color: 'var(--site-heading, #0f172a)', display: 'block', marginBottom: '4px' }}>
                3. Open Source & Peer Audited
              </strong>
              All application code is openly auditable by doctors, developers, and patient advocacy groups worldwide on GitHub.
            </div>
          </div>
        </section>

        {/* Medical Educational Disclaimer Footer */}
        <footer
          style={{
            padding: '20px 24px',
            borderRadius: '16px',
            backgroundColor: 'rgba(13, 148, 136, 0.04)',
            border: '1px solid rgba(13, 148, 136, 0.15)',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            color: 'var(--vice-muted, #64748b)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#0d9488', flexShrink: 0 }} aria-hidden="true" />
          <span>{t('disclaimer')}</span>
        </footer>
      </div>

      {/* Accessible Screenshot Lightbox Modal */}
      {selectedScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedScreenshot.title}
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
          onClick={() => setSelectedScreenshot(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedScreenshot(null);
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '420px',
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
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--site-heading, #0f172a)',
                    margin: '0 0 4px 0',
                  }}
                >
                  {selectedScreenshot.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--vice-muted, #64748b)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {selectedScreenshot.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScreenshot(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--vice-muted, #64748b)',
                  padding: '6px',
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
                src={withBasePath(selectedScreenshot.src)}
                alt={selectedScreenshot.title}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                style={{ objectFit: 'contain' }}
                priority
                unoptimized
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      )}
      </main>
      <Footer />
    </>
  );
}
