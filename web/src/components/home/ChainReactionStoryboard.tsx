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
      accent: '#2dd4bf',
    },
    {
      step: '02',
      icon: Bot,
      title: t('step2Title'),
      desc: t('step2Desc'),
      accent: '#2dd4bf',
    },
    {
      step: '03',
      icon: GitPullRequest,
      title: t('step3Title'),
      desc: t('step3Desc'),
      accent: '#2dd4bf',
    },
    {
      step: '04',
      icon: Rocket,
      title: t('step4Title'),
      desc: t('step4Desc'),
      accent: '#2dd4bf',
    },
  ];

  return (
    <section
      id="storyboard"
      className="uh-section-alt"
      style={{
        borderTop: '1px solid #252538',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header — no badge, section differentiates via layout */}
        <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
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

        {/* Timeline list — numbered editorial layout */}
        <div className="uh-storyboard-timeline">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="uh-card-step">
                {/* Step number */}
                <span
                  className="uh-card-step-number"
                  style={{ color: s.accent }}
                >
                  {s.step}
                </span>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '7px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${s.accent}10`,
                        border: `1px solid ${s.accent}22`,
                        flexShrink: 0,
                      }}
                    >
                      <Icon style={{ width: 15, height: 15, color: s.accent }} />
                    </div>
                    <h3
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        color: '#f1f5f9',
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                      color: '#64748b',
                      margin: 0,
                      maxWidth: '700px',
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
