'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BookOpen, Stethoscope, Bot, Languages, ArrowRight } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

export default function WhatWeDoSection() {
  const t = useTranslations('whatWeDo');

  const capabilities = [
    {
      icon: BookOpen,
      title: t('item1Title'),
      tag: t('item1Tag'),
      desc: t('item1Desc'),
      link: '/articles',
      actionText: t('item1Action'),
      accent: '#00e5ff',
    },
    {
      icon: Languages,
      title: t('item2Title'),
      tag: t('item2Tag'),
      desc: t('item2Desc'),
      link: '/medical-glossary',
      actionText: t('item2Action'),
      accent: '#7c3aed',
    },
    {
      icon: Bot,
      title: t('item3Title'),
      tag: t('item3Tag'),
      desc: t('item3Desc'),
      link: '#',
      actionText: t('item3Action'),
      accent: '#f0006a',
    },
    {
      icon: Stethoscope,
      title: t('item4Title'),
      tag: t('item4Tag'),
      desc: t('item4Desc'),
      link: '/admin-agreement',
      actionText: t('item4Action'),
      accent: '#22c55e',
    },
  ];

  return (
    <section
      id="what-we-do"
      style={{
        background: '#0c0c14',
        borderTop: '1px solid #252538',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="scroll-reveal" style={{ maxWidth: '640px', marginBottom: '56px' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#00e5ff',
              fontFamily: 'monospace',
              marginBottom: '12px',
            }}
          >
            {t('sectionBadge')}
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#f1f5f9',
              margin: '0 0 16px 0',
              fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
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

        {/* 2x2 Grid with disciplined 32px padding */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            const isExternalOrInternalLink = item.link !== '#';

            return (
              <div
                key={idx}
                className="scroll-reveal"
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
                      marginBottom: '20px',
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
                        background: `${item.accent}14`,
                        border: `1px solid ${item.accent}30`,
                      }}
                    >
                      <Icon style={{ width: 20, height: 20, color: item.accent }} />
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
                      {item.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#f1f5f9',
                      margin: '0 0 10px 0',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      color: '#64748b',
                      margin: '0 0 24px 0',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid #1f1f30' }}>
                  {isExternalOrInternalLink ? (
                    <Link
                      href={item.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#00e5ff',
                        textDecoration: 'none',
                        transition: 'gap 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.gap = '10px';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.gap = '6px';
                      }}
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </Link>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: '#475569',
                      }}
                    >
                      {item.actionText}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
