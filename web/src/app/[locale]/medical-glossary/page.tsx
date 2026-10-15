'use client';

import { useTranslations } from 'next-intl';
import MedicalGlossaryExplorer from './MedicalGlossaryExplorer';
import SiteHeader from '@/components/home/SiteHeader';
import { Footer } from '@/components/ui/footer';

export default function MedicalGlossaryPage() {
  const t = useTranslations('glossary');

  return (
    <>
      <SiteHeader />
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--explorer-bg, #f8fafc)',
          color: 'var(--explorer-text-primary, #0f172a)',
        }}
      >
        {/* ── Hero Section ── */}
        <section
          style={{
            paddingTop: '130px',
            paddingBottom: '40px',
            textAlign: 'center',
            borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '350px',
              background:
                'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '0 24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#0d9488',
                fontFamily: 'monospace',
                marginBottom: '16px',
              }}
            >
              {t('sectionBadge')}
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                color: 'var(--site-heading, #0f172a)',
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                margin: '16px auto 0',
                maxWidth: '800px',
              }}
            >
              {t('title')}
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--explorer-text-secondary, #475569)',
                maxWidth: '640px',
                margin: '20px auto 0',
              }}
            >
              {t('description')}
            </p>
          </div>
        </section>

        {/* ── Glossary Explorer ── */}
        <div
          style={{
            paddingBottom: '80px',
            paddingTop: '40px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 16px',
            }}
          >
            <MedicalGlossaryExplorer />
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
