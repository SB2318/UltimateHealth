'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Code2,
  BookOpen,
  Palette,
  Bug,
  GitPullRequest,
  Users,
  ExternalLink,
  ArrowRight,
  Mail,
  FileText,
} from 'lucide-react';
import { Navbar } from '@/components/layout';
import { Footer } from '@/components/ui/footer';

const REPO_URL = 'https://github.com/SB2318/UltimateHealth';

export default function ContributePage() {
  const t = useTranslations('contribute');

  const ways = [
    {
      icon: Code2,
      title: t('wayCode'),
      desc: t('wayCodeItems'),
      accent: '#00e5ff',
      bg: 'rgba(0, 229, 255, 0.1)',
    },
    {
      icon: BookOpen,
      title: t('wayDoc'),
      desc: t('wayDocItems'),
      accent: '#a78bfa',
      bg: 'rgba(167, 139, 250, 0.1)',
    },
    {
      icon: Palette,
      title: t('wayDesign'),
      desc: t('wayDesignItems'),
      accent: '#f0006a',
      bg: 'rgba(240, 0, 106, 0.1)',
    },
    {
      icon: Bug,
      title: t('wayTesting'),
      desc: t('wayTestingItems'),
      accent: '#22c55e',
      bg: 'rgba(34, 197, 94, 0.1)',
    },
  ];

  const communityCards = [
    {
      icon: GitPullRequest,
      title: t('githubIssuesTitle'),
      desc: t('githubIssuesDesc'),
      actionText: t('openIssues'),
      href: `${REPO_URL}/issues`,
      external: true,
      accent: '#00e5ff',
    },
    {
      icon: FileText,
      title: t('guideTitle'),
      desc: t('guideDesc'),
      actionText: t('readGuide'),
      href: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
      external: true,
      accent: '#a78bfa',
    },
    {
      icon: Mail,
      title: t('emailTitle'),
      desc: t('emailDesc'),
      actionText: t('sendEmail'),
      href: 'mailto:ultimate.health25@gmail.com',
      external: false,
      accent: '#f0006a',
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: '#0c0c14', color: '#f1f5f9', minHeight: '100vh' }}>
        {/* ── Hero Section ── */}
        <section
          style={{
            paddingTop: '128px',
            paddingBottom: '64px',
            textAlign: 'center',
            borderBottom: '1px solid #252538',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#a78bfa',
                fontFamily: 'monospace',
                marginBottom: '16px',
              }}
            >
              {t('sectionBadge')}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                color: '#f1f5f9',
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                margin: '0 auto 20px',
                maxWidth: '800px',
              }}
            >
              {t('title')}
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: '#94a3b8',
                maxWidth: '640px',
                margin: '0 auto 32px',
              }}
            >
              {t('subtitle')}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <a
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
                }}
              >
                <GitPullRequest size={16} />
                {t('startContributing')}
              </a>

              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#13131f',
                  border: '1px solid #252538',
                  color: '#e2e8f0',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={16} color="#94a3b8" />
                {t('viewRepo')}
              </a>

              <Link
                href="/our-contributors"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#13131f',
                  border: '1px solid #252538',
                  color: '#e2e8f0',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <Users size={16} color="#00e5ff" />
                {t('meetContributors')}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Ways to Contribute ── */}
        <section
          style={{
            padding: '80px 24px',
            borderBottom: '1px solid #252538',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#f1f5f9',
                  fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                  marginBottom: '12px',
                }}
              >
                {t('waysTitle')}
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#94a3b8',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                {t('waysSubtitle')}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              {ways.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#13131f',
                      border: '1px solid #252538',
                      borderRadius: '16px',
                      padding: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#7c3aed';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#252538';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: item.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <Icon size={24} color={item.accent} />
                      </div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: '#f1f5f9',
                          marginBottom: '8px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: '#94a3b8',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── GSSoC 2026 Section ── */}
        <section
          style={{
            padding: '64px 24px',
            borderBottom: '1px solid #252538',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div
              style={{
                background: '#13131f',
                border: '1px solid #252538',
                borderRadius: '20px',
                padding: '36px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    marginBottom: '12px',
                  }}
                >
                  {t('gssocBadge')}
                </span>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#f1f5f9',
                    marginBottom: '8px',
                  }}
                >
                  {t('gssocTitle')}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {t('gssocDesc')}
                </p>
              </div>
              <a
                href={`${REPO_URL}/issues?q=is%3Aissue+is%3Aopen+label%3Agssoc`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f59e0b',
                  color: '#0c0c14',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('openIssues')} →
              </a>
            </div>
          </div>
        </section>

        {/* ── Community & Support ── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#f1f5f9',
                  fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                  marginBottom: '12px',
                }}
              >
                {t('communityTitle')}
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#94a3b8',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                {t('communitySubtitle')}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {communityCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#13131f',
                      border: '1px solid #252538',
                      borderRadius: '16px',
                      padding: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#7c3aed';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#252538';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid #252538',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <Icon size={20} color={card.accent} />
                      </div>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: '#f1f5f9',
                          marginBottom: '8px',
                        }}
                      >
                        {card.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: '#94a3b8',
                          lineHeight: 1.6,
                          marginBottom: '24px',
                        }}
                      >
                        {card.desc}
                      </p>
                    </div>

                    <a
                      href={card.href}
                      target={card.external ? '_blank' : undefined}
                      rel={card.external ? 'noopener noreferrer' : undefined}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: '#a78bfa',
                        textDecoration: 'none',
                      }}
                    >
                      {card.actionText}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
