'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, BookOpen, Download, Play } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

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
      {/* Single, restrained ambient glow â€” top-center */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* â”€â”€ Content container â”€â”€ */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', width: '100%', textAlign: 'center' }}>

        {/* Status pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px', borderRadius: '9999px', marginBottom: '32px',
          background: 'rgba(0,229,255,0.06)',
          border: '1px solid rgba(0,229,255,0.2)',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 8px #00e5ff', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.12em', color: '#00e5ff', textTransform: 'uppercase' }}>
            {tHero('badge')}
          </span>
        </div>

        {/* Headline â€” max 60px, tight leading */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 3.75rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#f1f5f9',
          marginBottom: '24px',
          fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
        }}>
          {tHero('headlineHealthIn')}{' '}
          <span style={{ color: '#00e5ff' }}>{tHero('headlineBody')}</span>,{' '}
          <span style={{ color: '#f0006a' }}>{tHero('headlineMind')}</span>{' '}
          {tHero('headlineAnd')}{' '}
          <span style={{ color: '#f5c518' }}>{tHero('headlineDignity')}</span>
        </h1>

        {/* One-line mission */}
        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.65,
          color: '#64748b',
          marginBottom: '48px',
          maxWidth: '560px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {tHero('subtitle')}
        </p>

        {/* CTA row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
          {/* Primary */}
          <button
            onClick={triggerTour}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 28px', borderRadius: '10px',
              background: '#00e5ff', color: '#0c0c14',
              fontWeight: 700, fontSize: '0.875rem',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 24px rgba(0,229,255,0.3)',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <Play style={{ width: 14, height: 14, fill: '#0c0c14' }} />
            {tHero('startTour')}
          </button>

          {/* Secondary */}
          <Link
            href="/articles"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 24px', borderRadius: '10px',
              background: 'transparent', color: '#f1f5f9',
              fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid #252538', textDecoration: 'none',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00e5ff'; (e.currentTarget as HTMLElement).style.color = '#00e5ff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#252538'; (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
          >
            <BookOpen style={{ width: 14, height: 14 }} />
            {tHero('readArticles')}
          </Link>

          {/* Ghost */}
          <a
            href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 20px', borderRadius: '10px',
              background: 'transparent', color: '#64748b',
              fontWeight: 600, fontSize: '0.875rem',
              border: '1px solid transparent', textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#64748b'; }}
          >
            <Download style={{ width: 14, height: 14 }} />
            {tHero('androidApp')}
          </a>
        </div>

        {/* â”€â”€ Stats â”€â”€ */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          background: '#252538',
          border: '1px solid #252538',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {[
            { val: '100+',  label: tHero('statArticles'),  color: '#00e5ff' },
            { val: '7+',    label: tHero('statLanguages'), color: '#f0006a' },
            { val: '100%',  label: tHero('statFree'),      color: '#f5c518' },
            { val: '24/7',  label: tHero('statAi'),        color: '#22c55e' },
          ].map(({ val, label, color }) => (
            <div key={label} style={{
              background: '#13131f', padding: '20px 12px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}>
              <span style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 800,
                fontFamily: '"Orbitron", monospace',
                color, lineHeight: 1,
              }}>{val}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
