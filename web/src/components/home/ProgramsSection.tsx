'use client';

import React from 'react';
import Image from 'next/image';

const programs = [
  {
    logo: 'https://github.com/user-attachments/assets/e0a40d06-f5b8-42a7-a5a0-033280f842be',
    alt: 'IEEE IGDTUW Logo',
    badge: 'Open Source Week',
    title: 'IEEE IGDTUW',
    desc: 'An intensive event fostering global collaboration and high-level skill-building across open-source ecosystems.',
    accent: '#00e5ff',
  },
  {
    logo: 'https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00',
    alt: 'Vultr Logo',
    badge: 'Cloud Hackathon',
    title: 'Vultr Cloud Innovate',
    desc: 'Developing scalable infrastructure solutions for health accessibility challenges using cloud computing.',
    accent: '#f0006a',
  },
  {
    logo: 'https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png',
    alt: 'GSSoC Logo',
    badge: 'Summer 2024',
    title: 'GirlScript Summer of Code',
    desc: 'A 3-month mentorship initiative bringing international contributors into real-world software development.',
    accent: '#f5c518',
  },
  {
    logo: 'https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png',
    alt: 'GSSoC Logo',
    badge: 'Summer 2026',
    title: 'GirlScript Summer of Code 2026',
    desc: 'Large-scale collaborative program welcoming developers, translators, and documentation writers worldwide.',
    accent: '#7c3aed',
  },
];

export default function ProgramsSection() {
  return (
    <section
      id="programs"
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
            Community
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
            Programs &amp; Hackathons
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: '#64748b',
              margin: 0,
            }}
          >
            Collaborating with tech communities to mentor contributors and advance open health tech.
          </p>
        </div>

        {/* 4 Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {programs.map((p, i) => (
            <div
              key={i}
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
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <Image
                    src={p.logo}
                    alt={p.alt}
                    width={140}
                    height={40}
                    style={{
                      maxHeight: '36px',
                      width: 'auto',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1) opacity(0.8)',
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: p.accent,
                    background: `${p.accent}12`,
                    border: `1px solid ${p.accent}25`,
                    padding: '3px 8px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    marginBottom: '14px',
                  }}
                >
                  {p.badge}
                </span>

                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    margin: '0 0 10px 0',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#64748b',
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
