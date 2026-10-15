'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BookOpen, Download, Play } from 'lucide-react';

export default function Hero() {
  const tHero = useTranslations('hero');

  const triggerTour = () => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } catch { /* silent */ }
    window.dispatchEvent(new CustomEvent('open-uh-tour'));
  };

  return (
    <section
      style={{
        background: 'var(--vice-dark, #ffffff)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid — structural, adapts to theme */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'var(--hero-grid, linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px))',
        backgroundSize: '48px 48px',
      }} />

      {/* ── Content container ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', width: '100%', textAlign: 'center' }}>

        {/* Status indicator — text-only */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginBottom: '28px',
        }}>
          <span style={{
            fontSize: '0.6875rem', fontFamily: 'monospace', fontWeight: 700,
            letterSpacing: '0.14em', color: 'var(--explorer-text-secondary, #475569)', textTransform: 'uppercase',
            animation: 'hero-badge-in 0.55s cubic-bezier(0.22,1,0.36,1) both',
            animationDelay: '0.15s',
          }}>
            {tHero('badge')}
          </span>
        </div>

        {/* Headline — DM Serif Display */}
        <h1
          className="uh-display"
          style={{
            fontSize: 'clamp(2.75rem, 8vw, 4.5rem)',
            lineHeight: 1.08,
            color: 'var(--site-heading, #0f172a)',
            marginBottom: '20px',
            animation: 'hero-heading-in 0.65s cubic-bezier(0.22,1,0.36,1) both',
            animationDelay: '0.32s',
          }}
        >
          {tHero('headlineHealthIn')}{' '}
          <span>{tHero('headlineBody')}</span>,{' '}
          <span>{tHero('headlineMind')}</span>{' '}
          {tHero('headlineAnd')}{' '}
          <span className="text-[#0d9488] dark:text-[#2dd4bf]">{tHero('headlineDignity')}</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          color: 'var(--vice-muted, #475569)',
          marginBottom: '8px',
          maxWidth: '560px',
          marginLeft: 'auto',
          marginRight: 'auto',
          animation: 'hero-sub-in 0.6s ease both',
          animationDelay: '0.52s',
        }}>
          {tHero('subtitle')}
        </p>

        {/* Motto — "Minimal Information. Real Information." */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '44px',
          animation: 'hero-sub-in 0.6s ease both',
          animationDelay: '0.6s',
        }}>
          <span className="uh-motto">
            Minimal Information. Real Information.
          </span>
        </div>

        {/* CTA row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '64px',
          animation: 'hero-cta-in 0.6s cubic-bezier(0.22,1,0.36,1) both',
          animationDelay: '0.68s',
        }}>
          {/* Primary CTA (Explore Platform - hidden) */}
          <button
            onClick={triggerTour}
            style={{
              display: 'none', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '10px',
              background: '#0d9488', color: '#ffffff',
              fontWeight: 700, fontSize: '0.875rem',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(13, 148, 136, 0.25)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.92'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <Play style={{ width: 13, height: 13, fill: '#ffffff' }} />
            {tHero('startTour')}
          </button>

          {/* Secondary CTA */}
          <Link
            href="/articles"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 24px', borderRadius: '10px',
              background: 'var(--explorer-surface, #ffffff)', color: 'var(--site-heading, #0f172a)',
              fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid var(--explorer-border, #e2e8f0)', textDecoration: 'none',
              boxShadow: 'var(--explorer-card-shadow, 0 2px 6px rgba(0,0,0,0.04))',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0d9488'; (e.currentTarget as HTMLElement).style.color = '#0d9488'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--explorer-border, #e2e8f0)'; (e.currentTarget as HTMLElement).style.color = 'var(--site-heading, #0f172a)'; }}
          >
            <BookOpen style={{ width: 14, height: 14 }} />
            {tHero('readArticles')}
          </Link>

          {/* Ghost CTA: Android Apps on Google Play */}
          <a
            href="https://play.google.com/store/apps/developer?id=Susmita+Bhattacharya"
            target="_blank" rel="noopener noreferrer"
            title="Android Apps by Susmita Bhattacharya on Google Play"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 20px', borderRadius: '10px',
              background: 'transparent', color: 'var(--vice-muted, #64748b)',
              fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid transparent', textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--site-heading, #0f172a)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--vice-muted, #64748b)'; }}
          >
            <Download style={{ width: 14, height: 14 }} />
            {tHero('androidApp')}
          </a>
        </div>

        {/* Stats — adaptive theme-aware palette */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          background: 'var(--explorer-border, #e2e8f0)',
          border: '1px solid var(--explorer-border, #e2e8f0)',
          borderRadius: '12px',
          overflow: 'hidden',
          animation: 'hero-stats-in 0.6s ease both',
          animationDelay: '0.85s',
          boxShadow: 'var(--explorer-card-shadow, 0 4px 16px rgba(0,0,0,0.04))',
        }}>
          {[
            { val: '30+',   label: tHero('statArticles') },
            { val: '7+',    label: tHero('statLanguages') },
            { val: '100%',  label: tHero('statFree') },
            { val: 'App/Web', label: tHero('statAi') },
          ].map(({ val, label }) => (
            <div key={label} style={{
              background: 'var(--explorer-surface, #ffffff)', padding: '18px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}>
              <span style={{
                fontSize: 'clamp(1.375rem, 3.5vw, 1.875rem)',
                fontWeight: 800,
                fontFamily: '"Orbitron", monospace',
                color: '#0d9488', lineHeight: 1,
              }} className="dark:text-[#2dd4bf]">{val}</span>
              <span className="uh-stat-label" style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--vice-muted, #64748b)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
