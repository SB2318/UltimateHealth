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
        background: '#0c0c14',
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
      {/* Subtle grid — structural, not decorative */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* ── Content container ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', width: '100%', textAlign: 'center' }}>

        {/* Status indicator — text-only, no glowing dot */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginBottom: '28px',
        }}>
          <span style={{
            fontSize: '0.6875rem', fontFamily: 'monospace', fontWeight: 700,
            letterSpacing: '0.14em', color: '#475569', textTransform: 'uppercase',
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
            color: '#f8fafc',
            marginBottom: '20px',
            animation: 'hero-heading-in 0.65s cubic-bezier(0.22,1,0.36,1) both',
            animationDelay: '0.32s',
          }}
        >
          {tHero('headlineHealthIn')}{' '}
          <span>{tHero('headlineBody')}</span>,{' '}
          <span>{tHero('headlineMind')}</span>{' '}
          {tHero('headlineAnd')}{' '}
          <span style={{ color: '#2dd4bf' }}>{tHero('headlineDignity')}</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          color: '#94a3b8',
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
          {/* Primary CTA */}
          <button
            onClick={triggerTour}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '10px',
              background: '#2dd4bf', color: '#0d1117',
              fontWeight: 700, fontSize: '0.875rem',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(45, 212, 191, 0.25)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.92'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <Play style={{ width: 13, height: 13, fill: '#0d1117' }} />
            {tHero('startTour')}
          </button>

          {/* Secondary CTA */}
          <Link
            href="/articles"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 24px', borderRadius: '10px',
              background: 'transparent', color: '#f8fafc',
              fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid rgba(255, 255, 255, 0.12)', textDecoration: 'none',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2dd4bf'; (e.currentTarget as HTMLElement).style.color = '#2dd4bf'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)'; (e.currentTarget as HTMLElement).style.color = '#f8fafc'; }}
          >
            <BookOpen style={{ width: 14, height: 14 }} />
            {tHero('readArticles')}
          </Link>

          {/* Ghost CTA */}
          <a
            href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 20px', borderRadius: '10px',
              background: 'transparent', color: '#94a3b8',
              fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid transparent', textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f8fafc'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
          >
            <Download style={{ width: 14, height: 14 }} />
            {tHero('androidApp')}
          </a>
        </div>

        {/* Stats — unified single-accent palette */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          animation: 'hero-stats-in 0.6s ease both',
          animationDelay: '0.85s',
        }}>
          {[
            { val: '30+',   label: tHero('statArticles') },
            { val: '7+',    label: tHero('statLanguages') },
            { val: '100%',  label: tHero('statFree') },
            { val: 'App/Web', label: tHero('statAi') },
          ].map(({ val, label }) => (
            <div key={label} style={{
              background: '#151b26', padding: '18px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}>
              <span style={{
                fontSize: 'clamp(1.375rem, 3.5vw, 1.875rem)',
                fontWeight: 800,
                fontFamily: '"Orbitron", monospace',
                color: '#2dd4bf', lineHeight: 1,
              }}>{val}</span>
              <span className="uh-stat-label" style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
