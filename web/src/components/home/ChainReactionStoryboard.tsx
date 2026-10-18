'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  Sparkles,
  GitPullRequest,
  Smartphone,
  Globe2,
  HeartHandshake,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Code2,
  Tag,
  CheckCircle2,
  Bot,
  Layers,
  Award,
  ChevronRight,
} from 'lucide-react';
import { useModalAudio } from '@/lib/audio/modalAudioController';

type StoryTab = 'evolution' | 'how-to-join';

interface ReleaseMilestone {
  tag: string;
  date: string;
  badge: string;
  title: string;
  desc: string;
  keyIssues: string[];
  metrics: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>;
  accent: string;
}

interface JoinStep {
  step: string;
  title: string;
  desc: string;
  details: string;
  botAction: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>;
  accent: string;
}

export default function ChainReactionStoryboard() {
  const locale = useLocale();
  const { isPlaying, toggle } = useModalAudio('tour');
  const [activeTab, setActiveTab] = useState<StoryTab>('evolution');
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);

  // ── Authentic Evolution Based on Git Release Tags & Closed Issues ──
  const releaseMilestones: ReleaseMilestone[] = [
    {
      tag: '0.2.1-debug',
      date: 'Oct 2024',
      badge: 'Genesis Release',
      title: 'The First APK & Core Health Guides (#563)',
      desc: 'Susmita Bhattacharya initiated UltimateHealth with the vision of paywall-free healthcare knowledge. The first native APK was packaged, introducing our initial markdown article reader, offline storage architecture, and patient-first medical guides.',
      keyIssues: [
        'Issue #563: Initial Android APK packaging & offline article storage',
        'Architecture: Founded on non-commercial, zero-paywall clinical manifesto',
        'Languages: First multilingual guide schemas drafted',
      ],
      metrics: '1 Founder • First APK Released',
      icon: Sparkles,
      accent: '#0d9488',
    },
    {
      tag: '0.3.2-debug → 0.5.0',
      date: 'Nov – Dec 2024',
      badge: 'Community Assistant Testing',
      title: 'Symptom Triage Tasks & Community APK Testing (#567)',
      desc: 'The project added an open-source non-diagnostic symptom assistant to help users explore health definitions and common clinical terms. Early community APK builds were distributed to volunteers for usability feedback.',
      keyIssues: [
        'Issue #567: Non-diagnostic assistant tasks & symptom triage exploration',
        'Tag 0.5.0-debug: Community testing build shared with early volunteers',
        'Glossary: In-line tooltips for complex medical terms',
      ],
      metrics: 'Community Build • Volunteer Testing',
      icon: Bot,
      accent: '#2563eb',
    },
    {
      tag: 'web-release-2.0.0 → 2.2.0',
      date: 'June 2026',
      badge: 'Web & Mobile Parity',
      title: 'Simultaneous Web Launch & Multilingual Scaling',
      desc: 'UltimateHealth achieved full web and mobile cross-platform parity. With the launch of web-release-2.0.0, the platform introduced next-intl routing across 7+ regional languages (Hindi, Bengali, Tamil, Odia, German, Spanish, French, Croatian), dark/light theme tokens, and responsive layout polish.',
      keyIssues: [
        'Tag web-release-2.0.0 & mobile-release-2.2.0: Unified multi-platform core',
        'Issue #1484: Image fallback handling & responsive layout stabilization',
        'Issue #1507: Skeleton loaders for fast, accessible article browsing',
      ],
      metrics: 'Web + Mobile • 7+ Languages',
      icon: Layers,
      accent: '#7c3aed',
    },
    {
      tag: 'UltimateHealth-3.0.0',
      date: 'July 2026',
      badge: 'Major 3.0 Milestone',
      title: 'AI Persona Chat, Gemini Research & Offline Podcasts',
      desc: 'A watershed release bringing massive upgrades: AI Persona Chat with TTS accessibility, Gemini-powered ResearchSummaryCard for clinical literature, MMKV offline podcast caching with custom reanimated waveform visualizers, double-tap to like, and Trust Article credibility badges.',
      keyIssues: [
        'Release 3.0.0: AI Persona Chatbot & TTS voice accessibility',
        'Wellness: Comprehensive health tracking & BMI/BMR dashboard',
        'Media: Offline podcast playback engine with audio waveforms',
        'CI/CD: GitHub AI Triage & PR review automation bots deployed',
      ],
      metrics: 'v3.0.0 Milestone • 100+ Merged PRs',
      icon: Smartphone,
      accent: '#f59e0b',
    },
    {
      tag: 'GSSoC 2026 Today',
      date: 'Present Day',
      badge: 'Global Open Movement',
      title: '300+ Contributors & 2,400+ Commits Worldwide',
      desc: 'Through GSSoC and international open-source collaboration, over 300 unique developers, doctors, and students actively maintain UltimateHealth. With over 2,400 commits across main and web branches, every pull request is reviewed and commemorated on our interactive contributor wall.',
      keyIssues: [
        'Community: 300+ developers, designers, and medical contributors',
        'Codebase: 2,400+ verified commits and 1,000,000+ lines of open code',
        'Dynamic Wall: Live GitHub API synchronization and contribution stats',
      ],
      metrics: '300+ Builders • 2,400+ Commits',
      icon: Globe2,
      accent: '#059669',
    },
  ];

  // ── Authentic Contributor Onboarding Flow Based on Project Automation ──
  const joinSteps: JoinStep[] = [
    {
      step: '01',
      title: 'Find Your Issue on GitHub',
      desc: 'Browse issues tagged with `gssoc`, `frontend`, `level:beginner`, or `documentation`. Whether you are fixing responsive styles, adding an article translation, or implementing a new feature, there is a task tailored for your skill level.',
      details: 'Check open issues with clear requirements, Figma references, or reproduction steps.',
      botAction: 'Labeled with level and component tags automatically by AI triage.',
      icon: Tag,
      accent: '#0d9488',
    },
    {
      step: '02',
      title: 'Get Assigned Fairly',
      desc: 'Comment on the issue to request assignment. Our repository uses automated assignment bots (`pr_assignment_check.py` and `remove_old_assignment.py`) to prevent task hogging and give every contributor a fair opportunity.',
      details: 'Fair assignment limits ensure active tickets are completed within reasonable deadlines.',
      botAction: 'Automated assignment manager checks eligibility and assigns you directly.',
      icon: CheckCircle2,
      accent: '#2563eb',
    },
    {
      step: '03',
      title: 'Build, Test & Submit PR',
      desc: 'Create a clean branch, build locally with pnpm, and open a Pull Request. Follow our conventional commit guidelines (`feat:`, `fix:`, `docs:`) to pass automated PR title checkers and ESLint validations.',
      details: 'GitHub Actions run unit tests, Knip unused code checks, and build validation.',
      botAction: 'PR Title Checker & Governance Bots validate PR structure instantly.',
      icon: Code2,
      accent: '#7c3aed',
    },
    {
      step: '04',
      title: 'AI Code Review & Mentor Guidance',
      desc: 'Our repository is powered by automated AI review bots (`ai_reviewer.py`) that provide helpful first-pass feedback, verify clean code quality, and ping maintainers for human review and final merge approval.',
      details: 'Receive friendly automated review comments and review tags like `quality:clean`.',
      botAction: 'Automated AI Reviewer scans changes and posts constructive suggestions.',
      icon: Bot,
      accent: '#f59e0b',
    },
    {
      step: '05',
      title: 'Merged & Immortalized on Contributor Wall',
      desc: 'Once your PR merges into `main` or `web`, our GitHub Actions workflow (`update-contributors.yml`) automatically fetches your profile via GitHub API, updates the README, and immortalizes you on our live Contributor Wall!',
      details: 'Your avatar, commit count, lines of code changed, and contribution summary go live.',
      botAction: 'Automated sync pushes your attribution to the website within minutes.',
      icon: Award,
      accent: '#059669',
    },
  ];

  const currentMilestone = releaseMilestones[selectedMilestoneIndex];

  return (
    <>
      <style>{`
        /* ── Explore Platform & Storyboard Section ── */
        .uh-storyboard-section {
          padding: 100px 24px 90px;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          color: #0f172a;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .uh-storyboard-inner {
          max-width: 1160px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Top Header & Audio Bar ── */
        .uh-storyboard-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .uh-storyboard-headings {
          max-width: 660px;
        }

        .uh-storyboard-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(13, 148, 136, 0.1);
          border: 1px solid rgba(13, 148, 136, 0.25);
          color: #0d9488;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 50px;
          margin-bottom: 16px;
        }

        .uh-storyboard-title {
          font-size: clamp(2rem, 4.5vw, 3.1rem);
          font-weight: 900;
          line-height: 1.15;
          color: #0f172a;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }

        .uh-storyboard-sub {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #475569;
          margin: 0;
        }

        /* ── Krishna Flute Audio Controller Pill ── */
        .uh-flute-audio-card {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 18px;
          border-radius: 50px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          box-shadow: 0 4px 16px rgba(13, 148, 136, 0.08), 0 1px 3px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .uh-flute-audio-card:hover {
          border-color: #0d9488;
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.18);
          transform: translateY(-2px);
        }
        .uh-flute-audio-card.playing {
          background: linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%);
          border-color: #0d9488;
        }

        .uh-flute-play-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0d9488;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s, background 0.2s;
        }
        .uh-flute-audio-card:hover .uh-flute-play-btn {
          transform: scale(1.08);
          background: #0f766e;
        }

        .uh-flute-meta {
          text-align: left;
        }
        .uh-flute-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .uh-flute-status {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Soundwave visualizer bars */
        .uh-sound-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2.5px;
          height: 12px;
        }
        .uh-sound-bar {
          width: 2.5px;
          background: #0d9488;
          border-radius: 2px;
          animation: soundWave 1.2s infinite ease-in-out;
        }
        .uh-sound-bar:nth-child(1) { height: 4px; animation-delay: 0.1s; }
        .uh-sound-bar:nth-child(2) { height: 10px; animation-delay: 0.3s; }
        .uh-sound-bar:nth-child(3) { height: 6px; animation-delay: 0.2s; }
        .uh-sound-bar:nth-child(4) { height: 12px; animation-delay: 0.4s; }

        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }

        /* ── Storyboard Dual View Tabs (Evolution vs How To Join) ── */
        .uh-storyboard-modes {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 14px;
        }
        .uh-mode-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .uh-mode-tab:hover {
          color: #0f172a;
          background: #f8fafc;
        }
        .uh-mode-tab.active {
          background: #0d9488;
          color: #ffffff;
          border-color: #0d9488;
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.25);
        }

        /* ── Tag / Milestone Stepper Bar ── */
        .uh-milestone-stepper {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          overflow-x: auto;
          padding-bottom: 6px;
          scrollbar-width: none;
        }
        .uh-milestone-stepper::-webkit-scrollbar { display: none; }

        .uh-milestone-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 50px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .uh-milestone-btn:hover {
          border-color: #cbd5e1;
          color: #0f172a;
          background: #f8fafc;
        }
        .uh-milestone-btn.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
        }
        .uh-milestone-tag {
          font-family: ui-monospace, monospace;
          font-weight: 800;
          font-size: 0.74rem;
          opacity: 0.85;
        }

        /* ── Main Spotlight Card for Milestones ── */
        .uh-milestone-spotlight {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 38px 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 36px;
          align-items: center;
          transition: all 0.25s;
          margin-bottom: 36px;
        }
        .uh-milestone-spotlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0d9488, #2563eb, #7c3aed, #f59e0b);
        }

        .uh-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, monospace;
          font-size: 0.76rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 12px;
        }
        .uh-milestone-title {
          font-size: clamp(1.4rem, 2.8vw, 1.85rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          margin: 0 0 14px;
        }
        .uh-milestone-desc {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #475569;
          margin: 0 0 20px;
        }

        .uh-issues-list {
          background: #f8fafc;
          border-radius: 12px;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
        }
        .uh-issues-header {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .uh-issue-item {
          font-size: 0.84rem;
          color: #334155;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 6px;
        }
        .uh-issue-item:last-child { margin-bottom: 0; }
        .uh-issue-bullet {
          color: #0d9488;
          font-weight: 900;
        }

        /* Right Side of Milestone Spotlight */
        .uh-milestone-aside {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .uh-milestone-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
        .uh-milestone-metric-val {
          font-size: 1.28rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .uh-milestone-metric-label {
          font-size: 0.74rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 22px;
        }
        .uh-milestone-nav {
          display: flex;
          gap: 10px;
          width: 100%;
        }
        .uh-nav-btn {
          flex: 1;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }
        .uh-nav-btn:hover:not(:disabled) {
          border-color: #0f172a;
          color: #0f172a;
          background: #f8fafc;
        }
        .uh-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        /* ── How Contributors Join Grid (Tab 2) ── */
        .uh-join-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 36px;
        }
        .uh-join-step-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px 20px 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          transition: all 0.2s;
        }
        .uh-join-step-card:hover {
          transform: translateY(-4px);
          border-color: #a78bfa;
          box-shadow: 0 12px 30px rgba(124, 58, 237, 0.1);
        }
        .uh-step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .uh-step-badge {
          font-family: ui-monospace, monospace;
          font-size: 0.75rem;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 6px;
          background: #f1f5f9;
          color: #475569;
        }
        .uh-join-step-title {
          font-size: 1.02rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px;
          line-height: 1.35;
        }
        .uh-join-step-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 14px;
          flex: 1;
        }
        .uh-join-step-bot {
          background: #f8fafc;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 0.74rem;
          color: #475569;
          border-left: 2px solid #0d9488;
        }

        /* ── Prominent Meet Contributors Redirection Callout ── */
        .uh-meet-contributors-callout {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #172554 100%);
          border: 1px solid #334155;
          border-radius: 24px;
          padding: 38px 42px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
          position: relative;
          overflow: hidden;
        }
        .uh-meet-contributors-callout::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.4;
        }
        .uh-meet-info {
          max-width: 640px;
          position: relative;
          z-index: 1;
        }
        .uh-meet-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 12px;
        }
        .uh-meet-title {
          font-size: clamp(1.5rem, 3.2vw, 2.15rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 10px;
        }
        .uh-meet-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #cbd5e1;
          margin: 0;
        }

        .uh-meet-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
        }

        /* The Prominent Redirection Button */
        .uh-btn-meet-contributors {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 800;
          text-decoration: none;
          padding: 14px 26px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.4);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .uh-btn-meet-contributors:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(124, 58, 237, 0.55);
          background: linear-gradient(135deg, #6d28d9 0%, #4338ca 100%);
          color: #ffffff;
        }

        .uh-btn-gh-repo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
        }
        .uh-btn-gh-repo:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .uh-milestone-spotlight {
            grid-template-columns: 1fr;
            padding: 28px;
            gap: 28px;
          }
          .uh-meet-contributors-callout {
            flex-direction: column;
            text-align: center;
            padding: 28px;
          }
          .uh-meet-actions {
            width: 100%;
            justify-content: center;
          }
          .uh-btn-meet-contributors {
            width: 100%;
            justify-content: center;
          }
        }

        /* ── Dark Mode Overrides (html.dark) ── */
        html.dark .uh-storyboard-section {
          background: #0b0b14;
          border-top-color: #252538;
          color: #f1f5f9;
        }
        html.dark .uh-storyboard-title {
          color: #f1f5f9;
        }
        html.dark .uh-storyboard-sub {
          color: #94a3b8;
        }
        html.dark .uh-flute-audio-card {
          background: #131322;
          border-color: #252538;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }
        html.dark .uh-flute-audio-card:hover {
          border-color: #0d9488;
        }
        html.dark .uh-flute-audio-card.playing {
          background: linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
        }
        html.dark .uh-flute-title {
          color: #f1f5f9;
        }
        html.dark .uh-flute-status {
          color: #94a3b8;
        }

        html.dark .uh-storyboard-modes {
          border-bottom-color: #252538;
        }
        html.dark .uh-mode-tab {
          color: #94a3b8;
        }
        html.dark .uh-mode-tab:hover {
          background: #18182b;
          color: #f1f5f9;
        }
        html.dark .uh-mode-tab.active {
          background: #0d9488;
          color: #ffffff;
        }

        html.dark .uh-milestone-btn {
          background: #131322;
          border-color: #252538;
          color: #94a3b8;
        }
        html.dark .uh-milestone-btn:hover {
          background: #1a1a2e;
          color: #f1f5f9;
          border-color: #3b3b54;
        }
        html.dark .uh-milestone-btn.active {
          background: #0d9488;
          color: #ffffff;
          border-color: #0d9488;
          box-shadow: 0 4px 14px rgba(13, 148, 136, 0.4);
        }

        html.dark .uh-milestone-spotlight {
          background: #131322;
          border-color: #252538;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        html.dark .uh-milestone-title {
          color: #f1f5f9;
        }
        html.dark .uh-milestone-desc {
          color: #94a3b8;
        }
        html.dark .uh-issues-list {
          background: #18182b;
          border-color: #252538;
        }
        html.dark .uh-issues-header {
          color: #94a3b8;
        }
        html.dark .uh-issue-item {
          color: #cbd5e1;
        }
        html.dark .uh-milestone-aside {
          background: #18182b;
          border-color: #252538;
        }
        html.dark .uh-milestone-metric-val {
          color: #f1f5f9;
        }
        html.dark .uh-milestone-metric-label {
          color: #94a3b8;
        }
        html.dark .uh-nav-btn {
          background: #131322;
          border-color: #252538;
          color: #94a3b8;
        }
        html.dark .uh-nav-btn:hover:not(:disabled) {
          background: #252538;
          color: #ffffff;
        }

        html.dark .uh-join-step-card {
          background: #131322;
          border-color: #252538;
        }
        html.dark .uh-step-badge {
          background: #18182b;
          color: #94a3b8;
        }
        html.dark .uh-join-step-title {
          color: #f1f5f9;
        }
        html.dark .uh-join-step-desc {
          color: #94a3b8;
        }
        html.dark .uh-join-step-bot {
          background: #18182b;
          color: #cbd5e1;
        }
      `}</style>

      <section id="storyboard" className="uh-storyboard-section">
        <div className="uh-storyboard-inner">
          {/* ── Top Header & Audio Bar ── */}
          <div className="uh-storyboard-top">
            <div className="uh-storyboard-headings">
              <span className="uh-storyboard-pill">
                <Sparkles size={14} /> Open Source Evolution & Storyboard
              </span>
              <h2 className="uh-storyboard-title">
                Explore Platform:<br />The UltimateHealth Story
              </h2>
              <p className="uh-storyboard-sub">
                From release tag <code>0.2.1-debug</code> to major <code>UltimateHealth-3.0.0</code> and 300+ global contributors — explore how our community evolved through closed issues, milestones, and pull requests.
              </p>
            </div>

            {/* ── Krishna Flute BGM Player Toolbar ── */}
            <div
              className={`uh-flute-audio-card${isPlaying ? ' playing' : ''}`}
              onClick={toggle}
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? 'Pause Krishna Flute BGM' : 'Play Krishna Flute BGM'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle();
                }
              }}
            >
              <span className="uh-flute-play-btn" aria-hidden="true">
                {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
              </span>

              <div className="uh-flute-meta">
                <div className="uh-flute-title">
                  <span>Krishna Flute BGM</span>
                  {isPlaying && (
                    <span className="uh-sound-bars">
                      <span className="uh-sound-bar" />
                      <span className="uh-sound-bar" />
                      <span className="uh-sound-bar" />
                      <span className="uh-sound-bar" />
                    </span>
                  )}
                </div>
                <div className="uh-flute-status">
                  {isPlaying ? (
                    <>
                      <Volume2 size={12} style={{ color: '#0d9488' }} />
                      <span>Playing ambient music</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={12} />
                      <span>Click to play serene flute</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Mode Selection Tabs (Milestone Evolution vs How Contributors Join) ── */}
          <div className="uh-storyboard-modes">
            <button
              className={`uh-mode-tab${activeTab === 'evolution' ? ' active' : ''}`}
              onClick={() => setActiveTab('evolution')}
            >
              <Layers size={16} />
              <span>Release Tags & Milestones Evolution</span>
            </button>
            <button
              className={`uh-mode-tab${activeTab === 'how-to-join' ? ' active' : ''}`}
              onClick={() => setActiveTab('how-to-join')}
            >
              <GitPullRequest size={16} />
              <span>How Contributors Join (Issues to Merge)</span>
            </button>
          </div>

          {/* ── Tab 1: Authentic Release Milestones ── */}
          {activeTab === 'evolution' && (
            <>
              {/* Stepper buttons for release tags */}
              <div className="uh-milestone-stepper">
                {releaseMilestones.map((m, idx) => {
                  const isActive = selectedMilestoneIndex === idx;
                  return (
                    <button
                      key={m.tag}
                      onClick={() => setSelectedMilestoneIndex(idx)}
                      className={`uh-milestone-btn${isActive ? ' active' : ''}`}
                      aria-selected={isActive}
                    >
                      <Tag size={13} />
                      <span className="uh-milestone-tag">{m.tag}</span>
                      <span>({m.date})</span>
                    </button>
                  );
                })}
              </div>

              {/* Spotlight Card */}
              <div className="uh-milestone-spotlight">
                <div>
                  <span
                    className="uh-tag-badge"
                    style={{
                      background: `${currentMilestone.accent}14`,
                      color: currentMilestone.accent,
                      border: `1px solid ${currentMilestone.accent}33`,
                    }}
                  >
                    Release {currentMilestone.tag} • {currentMilestone.badge} ({currentMilestone.date})
                  </span>

                  <h3 className="uh-milestone-title">{currentMilestone.title}</h3>
                  <p className="uh-milestone-desc">{currentMilestone.desc}</p>

                  <div className="uh-issues-list">
                    <div className="uh-issues-header">
                      <CheckCircle2 size={13} style={{ color: currentMilestone.accent }} />
                      <span>Key Closed Issues & Changes in this Release:</span>
                    </div>
                    {currentMilestone.keyIssues.map((item, i) => (
                      <div key={i} className="uh-issue-item">
                        <span className="uh-issue-bullet">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Aside */}
                <div className="uh-milestone-aside">
                  <div
                    className="uh-milestone-icon-wrap"
                    style={{
                      background: `${currentMilestone.accent}18`,
                      color: currentMilestone.accent,
                      border: `1px solid ${currentMilestone.accent}33`,
                    }}
                  >
                    <currentMilestone.icon size={36} />
                  </div>

                  <div className="uh-milestone-metric-val">{currentMilestone.metrics}</div>
                  <div className="uh-milestone-metric-label">Release Tag Milestone</div>

                  <div className="uh-milestone-nav">
                    <button
                      type="button"
                      className="uh-nav-btn"
                      onClick={() => setSelectedMilestoneIndex((prev) => Math.max(0, prev - 1))}
                      disabled={selectedMilestoneIndex === 0}
                    >
                      ← Previous Tag
                    </button>
                    <button
                      type="button"
                      className="uh-nav-btn"
                      onClick={() => setSelectedMilestoneIndex((prev) => Math.min(releaseMilestones.length - 1, prev + 1))}
                      disabled={selectedMilestoneIndex === releaseMilestones.length - 1}
                    >
                      Next Tag →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Tab 2: How Contributors Join (Based on Automated Issue Triaging) ── */}
          {activeTab === 'how-to-join' && (
            <div className="uh-join-steps-grid">
              {joinSteps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="uh-join-step-card">
                    <div className="uh-step-header">
                      <span className="uh-step-badge">STEP {s.step}</span>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${s.accent}15`,
                          color: s.accent,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    <h4 className="uh-join-step-title">{s.title}</h4>
                    <p className="uh-join-step-desc">{s.desc}</p>

                    <div className="uh-join-step-bot">
                      <strong>Automation:</strong> {s.botAction}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Prominent Callout: Meet All 300+ Contributors ── */}
          <div className="uh-meet-contributors-callout">
            <div className="uh-meet-info">
              <span className="uh-meet-badge">
                ❤️ Community Hall of Fame
              </span>
              <h3 className="uh-meet-title">
                Ready to Meet The 300+ Minds Behind UltimateHealth?
              </h3>
              <p className="uh-meet-desc">
                From the initial <code>0.2.1-debug</code> APK commit to <code>v3.0.0</code> and today’s active releases, over 300 contributors built every feature you see. Explore our live interactive Contributor Wall with commits, code changes, and domain filters.
              </p>
            </div>

            <div className="uh-meet-actions">
              <Link
                href={`/${locale}/our-contributors`}
                className="uh-btn-meet-contributors"
                id="explore-contributors-btn"
              >
                <span>Meet Our 300+ Contributors</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://github.com/SB2318/UltimateHealth/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="uh-btn-gh-repo"
              >
                <Code2 size={16} />
                <span>Explore Open Issues</span>
                <ExternalLink size={13} style={{ opacity: 0.7 }} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
