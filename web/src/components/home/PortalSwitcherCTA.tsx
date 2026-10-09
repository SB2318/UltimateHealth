'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { User, Stethoscope, Code2, ArrowRight } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

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
      accent: '#2dd4bf',
    },
    {
      icon: Stethoscope,
      badge: t('portal2Badge'),
      title: t('portal2Title'),
      desc: t('portal2Desc'),
      link: '/admin-agreement',
      actionText: t('portal2Action'),
      accent: '#2dd4bf',
    },
    {
      icon: Code2,
      badge: t('portal3Badge'),
      title: t('portal3Title'),
      desc: t('portal3Desc'),
      link: '/contribute',
      actionText: t('portal3Action'),
      accent: '#2dd4bf',
    },
  ];

  return (
    <section
      id="portals"
      className="uh-section-deep"
      style={{
        borderTop: '1px solid #252538',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
          <p className="uh-section-label" style={{ color: '#00e5ff', marginBottom: '12px' }}>
            {t('sectionBadge')}
          </p>
          <h2
            className="uh-display"
            style={{
              fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
              color: '#f1f5f9',
              margin: '0 0 16px 0',
            }}
          >
            {t('title')}
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: '#64748b',
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
                  background: '#13131f',
                  border: '1px solid #252538',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#2e2e50';
                  (e.currentTarget as HTMLElement).style.background = '#181828';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#252538';
                  (e.currentTarget as HTMLElement).style.background = '#13131f';
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
                        color: '#94a3b8',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {portal.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#f1f5f9',
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
                      color: '#64748b',
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
                    background: '#1e1e30',
                    border: '1px solid #2e2e46',
                    color: '#f1f5f9',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = portal.accent;
                    (e.currentTarget as HTMLElement).style.borderColor = portal.accent;
                    (e.currentTarget as HTMLElement).style.color = '#0c0c14';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = '#1e1e30';
                    (e.currentTarget as HTMLElement).style.borderColor = '#2e2e46';
                    (e.currentTarget as HTMLElement).style.color = '#f1f5f9';
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
