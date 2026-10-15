'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { User, Stethoscope, Code2, ArrowRight } from 'lucide-react';

export default function PortalSwitcherCTA() {
  const t = useTranslations('portals');

  const portals = [
    {
      icon: User,
      badge: t('portal1Badge'),
      title: t('portal1Title'),
      desc: t('portal1Desc'),
      link: '/articles',
      actionText: t('portal1Action'),
      accent: '#0d9488',
    },
    {
      icon: Stethoscope,
      badge: t('portal2Badge'),
      title: t('portal2Title'),
      desc: t('portal2Desc'),
      link: '/admin-agreement',
      actionText: t('portal2Action'),
      accent: '#0d9488',
    },
    {
      icon: Code2,
      badge: t('portal3Badge'),
      title: t('portal3Title'),
      desc: t('portal3Desc'),
      link: '/contribute',
      actionText: t('portal3Action'),
      accent: '#0d9488',
    },
  ];

  return (
    <section
      id="portals"
      className="uh-section-deep"
      style={{
        borderTop: '1px solid var(--explorer-border, #e2e8f0)',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
          <p className="uh-section-label" style={{ color: '#0d9488', marginBottom: '12px' }}>
            {t('sectionBadge')}
          </p>
          <h2
            className="uh-display"
            style={{
              fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
              color: 'var(--site-heading, #0f172a)',
              margin: '0 0 16px 0',
            }}
          >
            {t('title')}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--vice-muted, #475569)',
              margin: 0,
            }}
          >
            {t('description')}
          </p>
        </div>

        {/* 3 Portal Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {portals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: 'var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = portal.accent;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px rgba(13,148,136,0.12)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--explorer-border, #e2e8f0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))';
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${portal.accent}14`,
                        border: `1px solid ${portal.accent}30`,
                      }}
                    >
                      <Icon style={{ width: 20, height: 20, color: portal.accent }} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--explorer-text-secondary, #64748b)',
                        background: 'var(--explorer-bg, #f8fafc)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid var(--explorer-border, #e2e8f0)',
                      }}
                    >
                      {portal.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--site-heading, #0f172a)',
                      margin: '0 0 12px 0',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {portal.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      color: 'var(--explorer-text-secondary, #475569)',
                      margin: '0 0 28px 0',
                    }}
                  >
                    {portal.desc}
                  </p>
                </div>

                <Link
                  href={portal.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    background: 'var(--explorer-bg, #f8fafc)',
                    border: '1px solid var(--explorer-border, #e2e8f0)',
                    color: 'var(--site-heading, #0f172a)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = portal.accent;
                    (e.currentTarget as HTMLElement).style.borderColor = portal.accent;
                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--explorer-bg, #f8fafc)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--explorer-border, #e2e8f0)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--site-heading, #0f172a)';
                  }}
                >
                  <span>{portal.actionText}</span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
