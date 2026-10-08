'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Search, Bot, GitPullRequest, Rocket } from 'lucide-react';

export default function ChainReactionStoryboard() {
  const t = useTranslations('storyboard');

  const steps = [
    {
      step: '01',
      icon: Search,
      title: t('step1Title'),
      desc: t('step1Desc'),
      accent: '#00e5ff',
    },
    {
      step: '02',
      icon: Bot,
      title: t('step2Title'),
      desc: t('step2Desc'),
      accent: '#7c3aed',
    },
    {
      step: '03',
      icon: GitPullRequest,
      title: t('step3Title'),
      desc: t('step3Desc'),
      accent: '#f0006a',
    },
    {
      step: '04',
      icon: Rocket,
      title: t('step4Title'),
      desc: t('step4Desc'),
      accent: '#f5c518',
    },
  ];

  return (
    <section
      id="storyboard"
      style={{
        background: '#0c0c14',
        borderTop: '1px solid #252538',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#f5c518',
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

        {/* 4-step sequence card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
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
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#181828';
                  (e.currentTarget as HTMLElement).style.borderColor = '#2e2e50';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#13131f';
                  (e.currentTarget as HTMLElement).style.borderColor = '#252538';
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
                    <span
                      style={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: s.accent,
                      }}
                    >
                      {s.step}
                    </span>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${s.accent}12`,
                        border: `1px solid ${s.accent}28`,
                      }}
                    >
                      <Icon style={{ width: 18, height: 18, color: s.accent }} />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#f1f5f9',
                      margin: '0 0 10px 0',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: '#64748b',
                      margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
