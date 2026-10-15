'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Headphones, Radio, Sparkles, Smartphone, Mic } from 'lucide-react';
import SiteHeader from '@/components/home/SiteHeader';
import { Footer } from '@/components/ui/footer';

export default function PodcastsPage() {
  const t = useTranslations('podcasts');

  return (
    <>
      <SiteHeader />
      <main
        style={{
          background: 'var(--explorer-bg, #f8fafc)',
          color: 'var(--explorer-text-primary, #0f172a)',
          minHeight: '100vh',
        }}
      >
        {/* ── Hero / Coming Soon Section ── */}
        <section
          style={{
            paddingTop: '130px',
            paddingBottom: '80px',
            textAlign: 'center',
            borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '350px',
              background: 'radial-gradient(ellipse, rgba(13,148,136,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            {/* Coming Soon Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(13, 148, 136, 0.08)',
                border: '1px solid rgba(13, 148, 136, 0.3)',
                borderRadius: '50px',
                padding: '6px 18px',
                marginBottom: '20px',
                color: '#0d9488',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              <Radio size={14} className="animate-pulse" />
              {t('badge')}
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                color: 'var(--site-heading, #0f172a)',
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                marginBottom: '20px',
              }}
            >
              {t('title')}
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--explorer-text-secondary, #475569)',
                maxWidth: '680px',
                margin: '0 auto 36px',
              }}
            >
              {t('description')}
            </p>

            {/* Mobile App clarification banner */}
            <div
              style={{
                background: 'var(--explorer-surface, #f1f5f9)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                borderRadius: '18px',
                padding: '24px 28px',
                maxWidth: '640px',
                margin: '0 auto 40px',
                textAlign: 'left',
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(13, 148, 136, 0.10)',
                  border: '1px solid rgba(13, 148, 136, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Smartphone size={22} color="#0d9488" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--explorer-text-primary, #0f172a)', margin: '0 0 6px' }}>
                  {t('appBannerTitle')}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--explorer-text-secondary, #475569)', lineHeight: 1.6, margin: 0 }}>
                  {t('appBannerDesc')}
                </p>
              </div>
            </div>

            {/* Features preview grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              {[
                {
                  icon: Headphones,
                  title: t('feature1Title'),
                  desc: t('feature1Desc'),
                  accent: '#7c3aed',
                },
                {
                  icon: Mic,
                  title: t('feature2Title'),
                  desc: t('feature2Desc'),
                  accent: '#e11d48',
                },
                {
                  icon: Sparkles,
                  title: t('feature3Title'),
                  desc: t('feature3Desc'),
                  accent: '#0d9488',
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--explorer-surface, #f1f5f9)',
                      border: '1px solid var(--explorer-border, #e2e8f0)',
                      borderRadius: '16px',
                      padding: '22px',
                    }}
                  >
                    <Icon size={22} color={card.accent} style={{ marginBottom: '12px' }} />
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--explorer-text-primary, #0f172a)', margin: '0 0 6px' }}>
                      {card.title}
                    </h5>
                    <p style={{ fontSize: '0.84rem', color: 'var(--explorer-text-secondary, #475569)', lineHeight: 1.5, margin: 0 }}>
                      {card.desc}
                    </p>
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
