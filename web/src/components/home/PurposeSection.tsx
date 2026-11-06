'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Heart, Shield, Sparkles, BookOpen, ArrowRight, Clock, Globe2 } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';
import MoumitaMemorialModal from './MoumitaMemorialModal';

export default function PurposeSection() {
  const t = useTranslations('purpose');
  const locale = useLocale();
  const [memorialOpen, setMemorialOpen] = useState(false);

  const pillars = [
    {
      icon: Shield,
      title: "Healthcare Worker Safety & Workplace Dignity",
      body: "Institutional protections, secure night-shift duty rooms, and emergency clinical security so doctors, nurses, and staff can care for patients without fearing for their lives.",
      accent: '#e11d48',
    },
    {
      icon: Heart,
      title: "Open-Access Multilingual Clinical Education",
      body: "100+ community-reviewed clinical and respiratory guides translated across 9 languages, democratizing evidence-based health information without commercial gates or paywalls.",
      accent: '#0d9488',
    },
    {
      icon: Sparkles,
      title: "Living Memorial & Reform Beyond Headlines",
      body: "Transforming personal loss into persistent societal learning, legal accountability, and community-driven healthcare tools through our international human-stories tribute.",
      accent: '#d97706',
    },
  ];

  return (
    <section
      id="purpose"
      className="uh-section-alt"
      style={{
        borderTop: '1px solid var(--explorer-border, #e2e8f0)',
        padding: '96px 24px',
        background: 'var(--explorer-bg, #f8fafc)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Section Header */}
        <div className="scroll-reveal" style={{ maxWidth: '820px', marginBottom: '40px' }}>
          {/* Section label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#e11d48',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                padding: '4px 10px',
                borderRadius: '50px',
              }}
            >
              Our Purpose &amp; Humanitarian Mission
            </span>
          </div>

          <h2
            className="uh-display"
            style={{
              fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
              color: 'var(--site-heading, #0f172a)',
              margin: '0 0 16px 0',
              textAlign: 'left',
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            Lives Beyond the Headlines: Human Dignity, Safety &amp; Open Health
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--explorer-text-secondary, #475569)',
              margin: 0,
            }}
          >
            A person&apos;s life must be remembered for what they contributed to the world, not only for the tragedy that ended or changed their life. UltimateHealth was founded upon this conviction—starting with Dr. Moumita Debnath&apos;s clinical commitment to pulmonary medicine and expanding into an international living tribute honoring 30 lives across 18 nations.
          </p>
        </div>

        {/* ── Generalized Featured Memorial & Tribute Hub Card ── */}
        <div
          className="scroll-reveal uh-memorial-card transition-colors"
          style={{
            background: 'var(--explorer-surface, #ffffff)',
            border: '1.5px solid rgba(244, 63, 94, 0.35)',
            borderRadius: '20px',
            padding: '32px 28px',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'row',
            gap: '28px',
            alignItems: 'center',
            flexWrap: 'wrap',
            boxShadow: '0 12px 36px rgba(244,63,94,0.07)',
            boxSizing: 'border-box',
          }}
        >
          {/* Her Picture */}
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '120px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '2px solid rgba(244, 63, 94, 0.4)',
              flexShrink: 0,
              boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
            }}
          >
            <Image
              src={withBasePath('/assets/moumita-debnath.jpg')}
              alt="Dr. Moumita Debnath"
              fill
              unoptimized
              style={{ objectFit: 'cover' }}
              sizes="100px"
            />
          </div>

          {/* Details, Ethos & Hub Links */}
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#e11d48',
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                The Starting Point of Our Tribute
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--explorer-text-secondary, #64748b)' }}>
                Kolkata · 2024 · Pulmonary &amp; Chest Medicine
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#0d9488',
                  background: 'rgba(13, 148, 136, 0.1)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(13, 148, 136, 0.25)',
                }}
              >
                <Globe2 size={12} />
                30 Documented Lives · 18 Nations
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--site-heading, #0f172a)',
                margin: '0 0 6px 0',
              }}
            >
              Dr. Moumita Debnath &amp; The Living Tribute Hubs
            </h3>

            <p
              style={{
                fontSize: '0.94rem',
                lineHeight: 1.6,
                color: 'var(--explorer-text-secondary, #475569)',
                margin: '0 0 8px 0',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{t('moumitaQuote')}&rdquo;
            </p>

            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.65,
                color: 'var(--explorer-text-secondary, #64748b)',
                margin: '0 0 18px 0',
              }}
            >
              A postgraduate resident in chest medicine whose clinical dedication and tragic loss galvanized India&apos;s medical community. UltimateHealth establishes her vision as our foundational inspiration—broadening into an international tribute celebrating 30 individuals across 18 countries for what they built and contributed, accompanied by our 30-guide clinical respiratory series (Coming Soon in our Article Library).
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/${locale}/tribute`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#e11d48',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.28)',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.92')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                <Heart style={{ width: 15, height: 15, fill: '#ffffff' }} />
                <span>Explore 30 Profiles Tribute Hub</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>

              <button
                onClick={() => setMemorialOpen(true)}
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.35)',
                  color: '#e11d48',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#e11d48';
                  (e.currentTarget as HTMLElement).style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(244, 63, 94, 0.1)';
                  (e.currentTarget as HTMLElement).style.color = '#e11d48';
                }}
              >
                <BookOpen style={{ width: 14, height: 14 }} />
                <span>Read Life Work &amp; Memorial</span>
              </button>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: 'rgba(217, 119, 6, 0.1)',
                  color: '#d97706',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                }}
              >
                <Clock size={13} />
                <span>30 Clinical Respiratory Guides · Coming Soon</span>
              </span>
            </div>

            {/* Removal & Ethics Notice */}
            <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--explorer-border, rgba(0,0,0,0.06))' }}>
              <p style={{ fontSize: '0.78125rem', color: 'var(--explorer-text-muted, #64748b)', margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--site-heading, #0f172a)' }}>Memorial &amp; Removal Notice:</strong> UltimateHealth is an independent, non-commercial open-source tribute. If family members or authorized representatives wish for any dedication, name, or photo to be modified or removed, please contact <a href="mailto:ultimate.health25@gmail.com" style={{ color: '#0d9488', textDecoration: 'underline' }}>ultimate.health25@gmail.com</a> and it will be updated or removed immediately without condition.
              </p>
            </div>
          </div>
        </div>

        {/* 3-column pillar cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            border: '1px solid var(--explorer-border, #e2e8f0)',
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
                  borderLeft: i > 0 ? '1px solid var(--explorer-border, #e2e8f0)' : 'none',
                  background: 'var(--explorer-surface, #ffffff)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'background 0.2s ease',
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${p.accent}14`,
                    border: `1px solid ${p.accent}30`,
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: 19, height: 19, color: p.accent }} />
                </div>

                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--site-heading, #0f172a)',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.4,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'var(--explorer-text-secondary, #475569)',
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
