'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, Scale, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';
import MoumitaMemorialModal from './MoumitaMemorialModal';

export default function PurposeSection() {
  const t = useTranslations('purpose');
  const [memorialOpen, setMemorialOpen] = useState(false);

  const pillars = [
    {
      icon: Heart,
      title: t('pillar1Title'),
      body: t('pillar1Body'),
      accent: '#2dd4bf',
    },
    {
      icon: Scale,
      title: t('pillar2Title'),
      body: t('pillar2Body'),
      accent: '#2dd4bf',
    },
    {
      icon: Sparkles,
      title: t('pillar3Title'),
      body: t('pillar3Body'),
      accent: '#2dd4bf',
    },
  ];

  return (
    <section
      id="purpose"
      className="uh-section-alt"
      style={{
        borderTop: '1px solid #252538',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section label */}
        <p
          className="scroll-reveal uh-section-label"
          style={{
            color: '#2dd4bf',
            marginBottom: '16px',
          }}
        >
          {t('sectionBadge')}
        </p>

        {/* Section Header */}
        <div className="scroll-reveal" style={{ maxWidth: '680px', marginBottom: '40px' }}>
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

        {/* ── Featured Memorial & Vision Card: Dr. Moumita Debnath ── */}
        <div
          className="scroll-reveal uh-memorial-card"
          style={{
            background: 'linear-gradient(135deg, #151526 0%, #11111e 100%)',
            border: '1px solid rgba(240, 0, 106, 0.35)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          {/* Her Picture */}
          <div
            style={{
              position: 'relative',
              width: '96px',
              height: '112px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid rgba(240, 0, 106, 0.4)',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            }}
          >
            <Image
              src={withBasePath('/assets/moumita-debnath.jpg')}
              alt="Dr. Moumita Debnath"
              fill
              unoptimized
              style={{ objectFit: 'cover' }}
              sizes="96px"
            />
          </div>

          {/* Details & Quote */}
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#f43f5e',
                  background: 'rgba(244,63,94,0.12)',
                  border: '1px solid rgba(244,63,94,0.3)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                {t('moumitaBadge')}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {t('moumitaDept')}
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#f8fafc',
                margin: '0 0 6px 0',
              }}
            >
              Dr. Moumita Debnath
            </h3>

            <p
              style={{
                fontSize: '0.925rem',
                lineHeight: 1.6,
                color: '#cbd5e1',
                margin: '0 0 14px 0',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{t('moumitaQuote')}&rdquo;
            </p>

            <button
              onClick={() => setMemorialOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(244,63,94,0.15)',
                border: '1px solid rgba(244,63,94,0.35)',
                color: '#f43f5e',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#f43f5e';
                (e.currentTarget as HTMLElement).style.color = '#0d1117';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(244,63,94,0.15)';
                (e.currentTarget as HTMLElement).style.color = '#f43f5e';
              }}
            >
              <BookOpen style={{ width: 14, height: 14 }} />
              <span>{t('readVision')}</span>
              <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
            
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '0.78125rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: '#cbd5e1' }}>Memorial &amp; Removal Notice:</strong> UltimateHealth is an independent, non-commercial open-source tribute. If family members or authorized representatives wish for any dedication, name, or photo to be modified or removed, please contact <a href="mailto:ultimate.health25@gmail.com" style={{ color: '#2dd4bf', textDecoration: 'underline' }}>ultimate.health25@gmail.com</a> and it will be updated or removed immediately without condition.
              </p>
            </div>
          </div>
        </div>

        {/* 3-column pillar cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            border: '1px solid #252538',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                style={{
                  padding: '32px',
                  borderLeft: i > 0 ? '1px solid #252538' : 'none',
                  background: '#13131f',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#1a1a2e';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#13131f';
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${p.accent}12`,
                    border: `1px solid ${p.accent}30`,
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: 18, height: 18, color: p.accent }} />
                </div>

                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: '#64748b',
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Respectful Memorial & Life Work Modal */}
      <MoumitaMemorialModal
        isOpen={memorialOpen}
        onClose={() => setMemorialOpen(false)}
      />
    </section>
  );
}
