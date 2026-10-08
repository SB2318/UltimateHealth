'use client';

import { useTranslations } from 'next-intl';
import MedicalGlossaryExplorer from './MedicalGlossaryExplorer';
import { Navbar } from '@/components/layout';

export default function MedicalGlossaryPage() {
  const t = useTranslations('glossary');

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: '100vh',
          background: '#0c0c14',
          color: '#f1f5f9',
        }}
      >
        {/* ── Hero Section ── */}
        <section
          style={{
            paddingTop: '128px',
            paddingBottom: '32px',
            textAlign: 'center',
            borderBottom: '1px solid #252538',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#7c3aed',
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
                color: '#f1f5f9',
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
                color: '#64748b',
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
      </main>
    </>
  );
}
