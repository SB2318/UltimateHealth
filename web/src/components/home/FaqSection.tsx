'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Layers, Globe2, Stethoscope, HeartHandshake } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>;
}

const FAQS: FaqItem[] = [
  {
    id: 'disambiguation',
    question: 'What is UltimateHealth and how is it different from The Ultimate Health Podcast?',
    answer:
      'UltimateHealth (https://ultimatehealth.blog) is an open-access, multilingual digital health publication and patient literacy platform with clinical guides, an interactive medical glossary, and community doctor reviews across 9 languages. It is an independent web and mobile platform founded by Susmita Bhattacharya, completely distinct from "The Ultimate Health Podcast" audio talk show.',
    tag: 'Platform Identity',
    icon: HelpCircle,
  },
  {
    id: 'upcoming-releases',
    question: "What is new and upcoming on the UltimateHealth release storyboard and roadmap?",
    answer:
      'Our storyboard and upcoming roadmap includes: (1) The dedicated 30-article clinical respiratory series honoring Dr. Moumita Debnath’s patient dignity ethos, (2) Expanded regional language support across India and Europe, (3) An upgraded Android mobile app with offline article caching and audio podcast waveforms, (4) In-app plain-language clinical term lookup and non-diagnostic AI triage, and (5) Doctor verification protocols with clinical badge reviews on GitHub.',
    tag: 'Storyboard & Roadmap',
    icon: Sparkles,
  },
  {
    id: 'current-release',
    question: 'What can I use on UltimateHealth today in the current release?',
    answer:
      'In the current release, visitors can explore 30+ curated health and wellness guides, query an interactive medical glossary for plain-language clinical definitions, stream health podcasts, view contributor profiles, and read verified medical guides completely free without paywalls or advertisements.',
    tag: 'Current Features',
    icon: Layers,
  },
  {
    id: 'multilingual-support',
    question: 'In which languages are UltimateHealth medical guides available?',
    answer:
      'UltimateHealth guides and resources are published across 9 languages: English, Hindi, Bengali, Tamil, Odia, German, Spanish, French, and Croatian, ensuring critical health literacy is accessible to non-English speakers.',
    tag: '9 Languages',
    icon: Globe2,
  },
  {
    id: 'medical-accuracy',
    question: 'How does UltimateHealth maintain medical accuracy and patient trust?',
    answer:
      'Under our motto "Minimal Information. Real Information.", every guide includes plain-language summaries, reputable citations, and medical disclaimers. Volunteering medical doctors and admin moderators review public health contributions to uphold clinical standards.',
    tag: 'Clinical Trust',
    icon: Stethoscope,
  },
  {
    id: 'how-to-contribute',
    question: 'How can doctors, developers, and writers contribute to UltimateHealth?',
    answer:
      'UltimateHealth is 100% open source on GitHub (SB2318/UltimateHealth). Over 300 contributors worldwide contribute via GSSoC and open issues. Voluntary doctors can review clinical guides, translators can expand regional language versions, and developers can build accessible mobile and web features.',
    tag: 'Community',
    icon: HeartHandshake,
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('disambiguation');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      style={{
        background: 'var(--vice-dark, #ffffff)',
        borderTop: '1px solid var(--vice-border, #e2e8f0)',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <p
            className="uh-section-label"
            style={{
              color: '#0d9488',
              marginBottom: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={14} /> Knowledge Base &amp; Roadmap
          </p>
          <h2
            className="uh-display"
            style={{
              fontSize: 'clamp(1.875rem, 4.5vw, 2.75rem)',
              color: 'var(--site-heading, #0f172a)',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
            }}
          >
            Frequently Asked Questions &amp; What&apos;s Next
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--explorer-text-secondary, #64748b)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Answers to common questions about UltimateHealth, our mission, current capabilities,
            and upcoming milestones on our release storyboard.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <div
                key={faq.id}
                style={{
                  background: isOpen ? 'var(--vice-card, #ffffff)' : 'var(--vice-card-muted, #f8fafc)',
                  border: `1px solid ${isOpen ? 'var(--vice-border-active, #0d9488)' : 'var(--vice-border, #e2e8f0)'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: isOpen ? '0 4px 20px -2px rgba(13, 148, 136, 0.08)' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: isOpen ? '#0d9488' : 'rgba(13, 148, 136, 0.1)',
                        color: isOpen ? '#ffffff' : '#0d9488',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#0d9488',
                          display: 'block',
                          marginBottom: '2px',
                        }}
                      >
                        {faq.tag}
                      </span>
                      <h3
                        style={{
                          fontSize: '1.0625rem',
                          fontWeight: 600,
                          color: 'var(--site-heading, #0f172a)',
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{
                      color: isOpen ? '#0d9488' : 'var(--explorer-text-secondary, #64748b)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 24px 74px',
                      color: 'var(--vice-text, #334155)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                    }}
                  >
                    <p style={{ margin: 0 }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
