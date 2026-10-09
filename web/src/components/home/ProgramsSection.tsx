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
    accent: '#2dd4bf',
  },
  {
    logo: 'https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00',
    alt: 'Vultr Logo',
    badge: 'Cloud Hackathon',
    title: 'Vultr Cloud Innovate',
    desc: 'Developing scalable infrastructure solutions for health accessibility challenges using cloud computing.',
    accent: '#2dd4bf',
  },
  {
    logo: 'https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png',
    alt: 'GSSoC Logo',
    badge: 'Summer 2024',
    title: 'GirlScript Summer of Code',
    desc: 'A 3-month mentorship initiative bringing international contributors into real-world software development.',
    accent: '#2dd4bf',
  },
  {
    logo: 'https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png',
    alt: 'GSSoC Logo',
    badge: 'Summer 2026',
    title: 'GirlScript Summer of Code 2026',
    desc: 'Large-scale collaborative program welcoming developers, translators, and documentation writers worldwide.',
    accent: '#2dd4bf',
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
        <div style={{ maxWidth: '640px', marginBottom: '48px' }}>
          <p className="uh-section-label" style={{ color: '#f5c518', marginBottom: '12px' }}>
            Community
          </p>
          <h2
            className="uh-display"
            style={{
              fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
              color: '#f1f5f9',
              margin: '0 0 16px 0',
            }}
          >
            Programs &amp; Hackathons
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#64748b', margin: 0 }}>
            Collaborating with tech communities to mentor contributors and advance open health tech.
          </p>
        </div>

        {/* Inline list — logo left, text right */}
        <div className="uh-program-list">
          {programs.map((p, i) => (
            <div key={i} className="uh-program-row">
              <div className="uh-program-logo-cell">
                <Image
                  src={p.logo}
                  alt={p.alt}
                  width={100}
                  height={36}
                  style={{
                    maxHeight: '32px',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1) opacity(0.75)',
                  }}
                />
              </div>

              <div className="uh-program-text-cell">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: p.accent,
                      background: `${p.accent}12`,
                      border: `1px solid ${p.accent}22`,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      flexShrink: 0,
                    }}
                  >
                    {p.badge}
                  </span>
                  <h3>{p.title}</h3>
                </div>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
