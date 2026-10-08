'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Headphones, Radio, Sparkles, Smartphone, Volume2, Mic, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout';
import { Footer } from '@/components/ui/footer';

export default function PodcastsPage() {
  const tNav = useTranslations('nav');

  return (
    <>
      <Navbar />
      <main style={{ background: '#0c0c14', color: '#f1f5f9', minHeight: '100vh' }}>
        {/* ── Hero / Coming Soon Section ── */}
        <section
          style={{
            paddingTop: '130px',
            paddingBottom: '80px',
            textAlign: 'center',
            borderBottom: '1px solid #252538',
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
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)',
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
                background: 'rgba(240, 0, 106, 0.12)',
                border: '1px solid rgba(240, 0, 106, 0.35)',
                borderRadius: '50px',
                padding: '6px 18px',
                marginBottom: '20px',
                color: '#f0006a',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              <Radio size={14} className="animate-pulse" />
              Web Audio Streaming · Coming Soon
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                color: '#f1f5f9',
                fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                marginBottom: '20px',
              }}
            >
              Health Podcasts &amp; Audio Stories
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: '#94a3b8',
                maxWidth: '680px',
                margin: '0 auto 36px',
              }}
            >
              Listen to community-recorded health conversations, wellness insights, and patient journeys.
              Web-based streaming is currently in development and launching soon.
            </p>

            {/* Mobile App clarification banner */}
            <div
              style={{
                background: '#13131f',
                border: '1px solid #252538',
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
                  background: 'rgba(0, 229, 255, 0.12)',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Smartphone size={22} color="#00e5ff" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px' }}>
                  Want to Record &amp; Upload Episodes?
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                  Recording, editing, and publishing health podcasts is exclusively supported through the <strong>UltimateHealth Android App</strong> studio. On the web platform, stream-only listening will be available.
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
                  title: 'Free Web Listening',
                  desc: 'Stream verified health discussions and audio wellness guides without subscriptions.',
                  accent: '#a78bfa',
                },
                {
                  icon: Mic,
                  title: 'Community Voices',
                  desc: 'Episodes shared by medical trainees, patients, and health advocates.',
                  accent: '#f0006a',
                },
                {
                  icon: Sparkles,
                  title: 'Multilingual Audio',
                  desc: 'Planned audio releases in English, Hindi, Bengali, and Indian regional languages.',
                  accent: '#00e5ff',
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#13131f',
                      border: '1px solid #252538',
                      borderRadius: '16px',
                      padding: '22px',
                    }}
                  >
                    <Icon size={22} color={card.accent} style={{ marginBottom: '12px' }} />
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px' }}>
                      {card.title}
                    </h5>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
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
