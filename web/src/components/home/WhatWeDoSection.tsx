'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BookOpen, Stethoscope, Bot, Languages, ArrowRight } from 'lucide-react';

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
      accent: '#2dd4bf',
    },
    {
      icon: Languages,
      title: t('item2Title'),
      tag: t('item2Tag'),
      desc: t('item2Desc'),
      link: '/medical-glossary',
      actionText: t('item2Action'),
      accent: '#2dd4bf',
    },
    {
      icon: Bot,
      title: t('item3Title'),
      tag: t('item3Tag'),
      desc: t('item3Desc'),
      link: '#',
      actionText: t('item3Action'),
      accent: '#2dd4bf',
    },
    {
      icon: Stethoscope,
      title: t('item4Title'),
      tag: t('item4Tag'),
      desc: t('item4Desc'),
      link: '/admin-agreement',
      actionText: t('item4Action'),
      accent: '#2dd4bf',
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
          <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#64748b', margin: 0 }}>
            {t('description')}
          </p>
        </div>

        {/* 2x2 Grid with left-border accent on hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            const isExternalOrInternalLink = item.link !== '#';

            return (
              <div
                key={idx}
                className="scroll-reveal uh-card-capability"
                style={{ '--uh-card-accent': item.accent } as React.CSSProperties}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${item.accent}12`,
                        border: `1px solid ${item.accent}28`,
                      }}
                    >
                      <Icon style={{ width: 18, height: 18, color: item.accent }} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: '#64748b',
                        background: 'rgba(255,255,255,0.03)',
                        padding: '3px 9px',
                        borderRadius: '5px',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: '#f1f5f9',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      color: '#64748b',
                      margin: '0 0 20px 0',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div style={{ paddingTop: '14px', borderTop: '1px solid #1a1a2c' }}>
                  {isExternalOrInternalLink ? (
                    <Link
                      href={item.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: item.accent,
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
                      <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: '#334155',
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
