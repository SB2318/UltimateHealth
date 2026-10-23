'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Layers,
  Smartphone,
  Globe2,
  Tag,
  Code2,
  GitPullRequest,
  CheckCircle2,
  Award,
  Play,
  Pause,
  X,
  ChevronRight,
  ChevronLeft,
  Users,
  ExternalLink,
  ArrowRight,
  Clock,
  BookOpen,
  Headphones,
  Languages,
  Radio,
  HeartHandshake,
} from 'lucide-react';
import { useModalAudio } from '@/lib/audio/modalAudioController';

type StoryTab = 'what-new' | 'upcoming' | 'how-to-join';

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

interface ReleasingFeature {
  title: string;
  badge: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>;
  accent: string;
}

interface UpcomingItem {
  id: string;
  number: string;
  title: string;
  statusBadge: string;
  targetTimeline: string;
  summary: string;
  details: string[];
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

export default function ExplorePlatformModal() {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<StoryTab>('what-new');
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);
  const [selectedUpcomingIndex, setSelectedUpcomingIndex] = useState(0);
  const [selectedJoinIndex, setSelectedJoinIndex] = useState(0);
  const backdropMouseDownRef = React.useRef(false);

  // Modal Audio Controller for Krishna Flute BGM
  const { isPlaying, toggle, play, stop } = useModalAudio('tour');

  // Grounded, realistic features actively shipped or releasing in this update
  const releasingFeatures: ReleasingFeature[] = [
    {
      title: 'Dynamic API Medical Glossary',
      badge: 'Active Feature',
      desc: '379+ live clinical definitions across 18 medical specialties fetched in real-time from the backend API. Completely dynamic with zero hardcoded static files, interactive synonym discovery, and multi-language support (English, Hindi, Bengali).',
      icon: Sparkles,
      accent: '#0d9488',
    },
    {
      title: 'Digital Admin Agreement & Ink Signature',
      badge: 'Admin Onboarding',
      desc: 'Interactive touchscreen and mouse canvas for digital signatures, automated court-ready PDF agreement generation, and direct backend submission via the admin agreement apply endpoint.',
      icon: HeartHandshake,
      accent: '#7c3aed',
    },
    {
      title: 'Multilingual Article Audio Narration',
      badge: 'Accessibility',
      desc: 'Listen to articles written by our student developer contributors and reviewed by admins, with native Web Speech API synthesis in 9 languages (Hindi, Bengali, Tamil, Odia, German, Spanish, French, Croatian, English) with Indic punctuation parsing and custom speeds.',
      icon: Headphones,
      accent: '#2563eb',
    },
    {
      title: 'Clinical Article Discovery & Related Reads',
      badge: 'Clinical Engine',
      desc: 'Seamless article navigation with curated related health recommendations, category-aware exploration, and high-resolution clinical imagery.',
      icon: Layers,
      accent: '#06b6d4',
    },
    {
      title: 'High-Contrast Dark Mode & Centered Dialogs',
      badge: 'Theme Polish',
      desc: 'Refined dark mode color palette with high-contrast text, navy backgrounds, and crisp theme borders with centered motion entry across all modal systems.',
      icon: Sparkles,
      accent: '#f59e0b',
    },
    {
      title: 'Live 300+ Contributor Storyboard',
      badge: 'Open Community',
      desc: 'Real-time synchronization with GitHub celebrating over 300 student developers and open-source contributors with 2,400+ commits worldwide.',
      icon: Globe2,
      accent: '#10b981',
    },
  ];

  // Grounded, realistic milestones gathered from Git tags & closed GitHub issues (NO unrealistic claims)
  const releaseMilestones: ReleaseMilestone[] = [
    {
      tag: '0.2.1-debug',
      date: 'Oct 2024',
      badge: 'Genesis Release',
      title: 'The First APK & Core Health Guides (#563)',
      desc: 'Susmita Bhattacharya initiated UltimateHealth with the vision of open health guides created by students and open-source contributors. The first native Android APK was packaged, introducing our initial markdown article reader, offline storage architecture, and community health guides.',
      keyIssues: [
        'Issue #563: Initial Android APK packaging & offline article storage',
        'Architecture: Open-source health knowledge written by student contributors and admin reviewed',
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
      desc: 'The project added an open-source non-diagnostic health assistant to help users explore health definitions and common terms. Early community APK builds were distributed to student volunteers for usability feedback.',
      keyIssues: [
        'Issue #567: Educational assistant for learning basic health terms and triage concepts',
        'Tag 0.5.0-debug: Community testing build shared with early student volunteers',
        'Glossary: In-line tooltips for complex health terms',
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
      badge: 'Platform v3.0 Core',
      title: 'Voice Narration, Research Cards & Offline Caching',
      desc: 'A core platform release adding Web Speech accessibility narration for articles written by student contributors and reviewed by admins, with offline podcast caching and responsive reading cards.',
      keyIssues: [
        'Release 3.0.0: Article audio narration & voice accessibility features',
        'Wellness: Health tracking reference tools & glossary definitions reviewed by admins',
        'Media: Offline podcast playback foundation & audio waveforms',
        'CI/CD: GitHub Actions automation for PR verification and preview builds',
      ],
      metrics: 'v3.0.0 Release • 100+ Merged PRs',
      icon: Smartphone,
      accent: '#f59e0b',
    },
    {
      tag: 'GSSoC Open Project',
      date: 'Present Day',
      badge: 'Open Community Milestone',
      title: '300+ Contributors Worldwide',
      desc: 'Through GSSoC and open-source collaboration, over 300 student developers and open-source contributors actively write articles, build features, and submit pull requests reviewed by admins.',
      keyIssues: [
        'Community: 300+ student developers and open-source writers',
        'Review Workflow: Every article and code contribution is verified and reviewed by admins',
        'Dynamic Wall: Live GitHub API synchronization and contribution stats',
      ],
      metrics: '300+ Contributors • 2,400+ Commits',
      icon: Globe2,
      accent: '#10b981',
    },
    {
      tag: 'web-release-2.3.0',
      date: 'Latest Release',
      badge: 'Dynamic Clinical Ecosystem',
      title: 'Dynamic Glossary, Clinical Knowledge & Digital Agreements',
      desc: 'Architectural transition to live API services: zero static glossary data, seamless article discovery with related health recommendations, resilient clinical imagery pipeline, and admin agreement onboarding with ink signature verification.',
      keyIssues: [
        'Glossary API: 379+ live medical definitions across 18 clinical categories with zero static data',
        'Articles Engine: Curated clinical articles with automated related reads',
        'Admin Agreement: Digital canvas signature and signed PDF application flow',
        'Technical SEO: Optimal 140-155 character descriptions and schema enrichment',
      ],
      metrics: '379+ Terms • Live API Core • 0 Static Fallbacks',
      icon: Sparkles,
      accent: '#0d9488',
    },
  ];

  // What's Upcoming — 5 Exact Roadmap Items
  const upcomingItems: UpcomingItem[] = [
    {
      id: 'contributor-articles',
      number: '01',
      title: "All Contributor Articles Rolling Out (1 by 1)",
      statusBadge: 'Admin Review',
      targetTimeline: 'Incremental Weekly Batches',
      summary:
        'Articles written by our student developer contributors are being carefully reviewed by admins and published one by one to give proper credit to every author.',
      details: [
        'Articles researched and written by student developer contributors',
        'Admin review and formatting checks before each article goes live',
        'Author attribution badges with links to contributor GitHub profiles and pull requests',
      ],
      icon: BookOpen,
      accent: '#0d9488',
    },
    {
      id: 'contributor-podcasts',
      number: '02',
      title: "All Contributor Podcasts Rolling Out (1 by 1)",
      statusBadge: 'Audio Processing',
      targetTimeline: 'Sequential Episode Releases',
      summary:
        'Health discussions and wellness guides recorded by student contributors are being reviewed by admins, audio-normalized, and published one by one.',
      details: [
        'Voice discussions and guides created by student contributors',
        'Admin review and volume normalization across all audio submissions',
        'Dedicated episode pages with contributor acknowledgments and transcripts',
      ],
      icon: Headphones,
      accent: '#2563eb',
    },
    {
      id: 'design-alignment',
      number: '03',
      title: 'Design Alignment & Responsive Polish Fix',
      statusBadge: 'Active Development',
      targetTimeline: 'Current Sprint',
      summary:
        'System-wide UI audit to ensure consistent margins, perfect badge padding, standardized typography scales, and responsive harmony across all devices.',
      details: [
        'Zero-clipping guarantee across all dialog headers, pills, and badges',
        'Unified design language between Moumita Memorial and Explore Platform modals',
        'Strict responsive testing across ultra-wide monitors, tablets, and compact mobile viewports',
      ],
      icon: Sparkles,
      accent: '#7c3aed',
    },
    {
      id: 'localize-articles',
      number: '04',
      title: 'Localizing All Articles Gradually',
      statusBadge: 'Translation Pipeline',
      targetTimeline: 'Progressive Multi-Language Rollout',
      summary:
        'Translating student-written health articles and glossary terms step-by-step into Hindi, Bengali, Tamil, Odia, German, Spanish, French, and Croatian with admin review.',
      details: [
        'Student contributor translations into regional Indian and European languages',
        'Admin review loops to verify clarity, tone, and formatting consistency',
        'Pairing translated articles with native localized speech narration and Indic punctuation',
      ],
      icon: Languages,
      accent: '#f59e0b',
    },
    {
      id: 'new-podcasts',
      number: '05',
      title: 'New Podcasts & Web Audio Studio',
      statusBadge: 'Feature In Development',
      targetTimeline: 'Upcoming Web Release',
      summary:
        'Expanding the podcast ecosystem with in-browser streaming playback, interactive episode scrubbers, and health tech contributor discussions.',
      details: [
        'In-browser streaming player with scrubber, speed switchers, and transcript viewer',
        'Student developer talks and open-source contributor discussion series',
        'Android app studio bridge for recording, editing, and publishing community episodes',
      ],
      icon: Radio,
      accent: '#f59e0b',
    },
    {
      id: 'moumita-memorial-series',
      number: '06',
      title: 'Dr. Moumita Debnath Memorial Series',
      statusBadge: 'Curation & Admin Review',
      targetTimeline: 'Sequential Educational Release',
      summary:
        'Dedicated 30-article respiratory awareness & health guide series written by student contributors in honor of Dr. Moumita Debnath, with dignified layout and peaceful tribute flute music.',
      details: [
        '30 educational health awareness articles written by student contributors and admin reviewed',
        'Dignified memorial tribute layout with peaceful flute background score and respectful reading ambience',
        'Healthcare worker safety awareness and dignity guidelines',
      ],
      icon: HeartHandshake,
      accent: '#e11d48',
    },
  ];

  // Authentic Contributor Workflow
  const joinSteps: JoinStep[] = [
    {
      step: '01',
      title: 'Find Your Issue on GitHub',
      desc: 'Browse issues tagged with `gssoc`, `frontend`, `level:beginner`, or `documentation`. Whether you are fixing responsive styles, adding an article translation, or implementing a new feature, there is a task tailored for your skill level.',
      details:
        'Label filters like `good-first-issue` help newcomers make their first merged contribution within 24 hours.',
      botAction: 'Auto-triaged by GitHub Actions with verified reproducible reproduction steps.',
      icon: Code2,
      accent: '#0d9488',
    },
    {
      step: '02',
      title: 'Branch, Implement & Test',
      desc: 'Fork the repository, create a descriptive feature branch (e.g. `fix/pill-button-padding` or `feat/article-audio-localization`), follow our ESLint rules, and run local TypeScript validation.',
      details:
        'Run `pnpm exec tsc --noEmit` and verify responsive layouts across desktop and mobile viewports.',
      botAction: 'Pre-commit hooks verify code formatting and type safety automatically.',
      icon: GitPullRequest,
      accent: '#2563eb',
    },
    {
      step: '03',
      title: 'Submit PR & Automated Validation',
      desc: 'Open a pull request against `main` (for core/Android) or `web` (for Next.js). Our GitHub Actions workflow automatically checks build integrity, bundle size, and code quality.',
      details:
        'Maintainers review every PR promptly, providing constructive feedback and mentorship.',
      botAction: 'Automated CI verifies build artifacts and ensures no regressions are introduced.',
      icon: CheckCircle2,
      accent: '#7c3aed',
    },
    {
      step: '04',
      title: 'Maintainer Review & Merge',
      desc: 'Once approved, your code is merged into the project! Your commits become part of the official release history shipped to thousands of healthcare readers.',
      details:
        'PRs are celebrated in community release notes with full attribution to your GitHub handle.',
      botAction: 'Auto-merges upon all green CI checks and maintainer sign-off.',
      icon: Award,
      accent: '#f59e0b',
    },
    {
      step: '05',
      title: 'Permanent Honor on Contributor Wall',
      desc: 'Your avatar, bio, and commit metrics are permanently indexed on our Interactive Contributor Wall. Share your public achievement card with pride on LinkedIn and Twitter/X!',
      details:
        'Every contributor is immortalized as part of the collective effort making healthcare information free and open.',
      botAction: 'Live GitHub API cron synchronizes your contributions and updates the leaderboard.',
      icon: Users,
      accent: '#10b981',
    },
  ];

  // Open modal on all associated events & hash changes
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      play();
    };

    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (
        hash === '#explore-platform' ||
        hash === '#tour' ||
        hash === '#whats-new' ||
        hash === '#upcoming'
      ) {
        handleOpen();
      }
    };

    // Check initial hash
    handleHash();

    const events = [
      'open-explore-platform-modal',
      'open-explore-platform',
      'open-uh-tour',
      'open-tour',
    ];

    events.forEach((evt) => window.addEventListener(evt, handleOpen));
    window.addEventListener('hashchange', handleHash);

    // Global window helpers for instant access
    const win = window as unknown as Record<string, unknown>;
    win.openExplorePlatform = handleOpen;
    win.openUhTour = handleOpen;

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleOpen));
      window.removeEventListener('hashchange', handleHash);
      delete win.openExplorePlatform;
      delete win.openUhTour;
    };
  }, [play]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    stop();
  }, [stop]);

  // Keyboard navigation & lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeModal, activeTab]);

  const currentMilestone = releaseMilestones[selectedMilestoneIndex];
  const MilestoneIcon = currentMilestone.icon;

  const currentUpcoming = upcomingItems[selectedUpcomingIndex];
  const UpcomingIcon = currentUpcoming.icon;

  const currentJoinStep = joinSteps[selectedJoinIndex];
  const JoinIcon = currentJoinStep.icon;

  const navigateToContributors = () => {
    closeModal();
    router.push(`/${locale}/our-contributors`);
  };

  const handleNext = () => {
    if (activeTab === 'what-new') {
      if (selectedMilestoneIndex < releaseMilestones.length - 1) {
        setSelectedMilestoneIndex((prev) => prev + 1);
      } else {
        setActiveTab('upcoming');
        setSelectedUpcomingIndex(0);
      }
    } else if (activeTab === 'upcoming') {
      if (selectedUpcomingIndex < upcomingItems.length - 1) {
        setSelectedUpcomingIndex((prev) => prev + 1);
      } else {
        setActiveTab('how-to-join');
        setSelectedJoinIndex(0);
      }
    } else {
      if (selectedJoinIndex < joinSteps.length - 1) {
        setSelectedJoinIndex((prev) => prev + 1);
      } else {
        navigateToContributors();
      }
    }
  };

  const handlePrev = () => {
    if (activeTab === 'what-new') {
      setSelectedMilestoneIndex((prev) => (prev - 1 + releaseMilestones.length) % releaseMilestones.length);
    } else if (activeTab === 'upcoming') {
      setSelectedUpcomingIndex((prev) => (prev - 1 + upcomingItems.length) % upcomingItems.length);
    } else {
      setSelectedJoinIndex((prev) => (prev - 1 + joinSteps.length) % joinSteps.length);
    }
  };

  const nextButtonLabel =
    activeTab === 'what-new' && selectedMilestoneIndex === releaseMilestones.length - 1
      ? "Explore What's Upcoming →"
      : activeTab === 'upcoming' && selectedUpcomingIndex === upcomingItems.length - 1
      ? 'Explore Contributor Journey →'
      : activeTab === 'how-to-join' && selectedJoinIndex === joinSteps.length - 1
      ? 'Meet Contributors →'
      : 'Next';

  const nextButtonBg =
    activeTab === 'what-new' ? '#0d9488' : activeTab === 'upcoming' ? '#d97706' : '#4f46e5';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="explore-platform-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 16px',
            backgroundColor: 'rgba(5, 7, 15, 0.82)',
            backdropFilter: 'blur(10px)',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
          onMouseDown={(e) => {
            backdropMouseDownRef.current = e.target === e.currentTarget;
          }}
          onClick={(e) => {
            if (backdropMouseDownRef.current && e.target === e.currentTarget) {
              closeModal();
            }
            backdropMouseDownRef.current = false;
          }}
        >
          {/* Ambient Background Aura */}
          <div
            style={{
              position: 'fixed',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              filter: 'blur(130px)',
              pointerEvents: 'none',
              opacity: 0.25,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'background-color 0.4s ease',
              backgroundColor:
                activeTab === 'what-new'
                  ? currentMilestone.accent
                  : activeTab === 'upcoming'
                  ? currentUpcoming.accent
                  : currentJoinStep.accent,
            }}
          />

          {/* ── Main Modal Card (Uses margin: auto for non-clipping flexbox centering) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'relative',
              margin: 'auto',
              width: '100%',
              maxWidth: '960px',
              maxHeight: 'calc(100dvh - 36px)',
              height: 'min(86vh, 680px)',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '24px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              boxShadow: '0 25px 70px -15px rgba(0,0,0,0.5), 0 0 40px -10px rgba(13,148,136,0.2)',
            }}
            className="border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0d18] text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── 1. Top Header Toolbar (Styled like Moumita Memorial for dignified spacing & contrast) ── */}
            <header
              style={{
                flexShrink: 0,
                minHeight: '68px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 24px',
                boxSizing: 'border-box',
              }}
              className="bg-slate-100/80 dark:bg-[#161526] border-b border-slate-200 dark:border-white/10 shrink-0 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #0d9488 0%, #2563eb 100%)',
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div className="min-w-0 flex flex-col justify-center gap-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 9px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        boxSizing: 'border-box',
                        whiteSpace: 'nowrap',
                        lineHeight: '1.2',
                      }}
                      className="bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20"
                    >
                      EXPLORE PLATFORM
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline truncate">
                      Interactive Storyboard
                    </span>
                  </div>
                  <h2
                    id="explore-platform-title"
                    className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white m-0 leading-snug truncate"
                  >
                    The Evolution &amp; Contributor Story
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {/* ── High-Visibility Stop / Play Krishna Flute Audio Control Button (Matching Moumita Memorial) ── */}
                <button
                  onClick={toggle}
                  type="button"
                  aria-label={isPlaying ? 'Pause Krishna Flute BGM' : 'Play Krishna Flute BGM'}
                  title={isPlaying ? 'Click to Pause Krishna Flute BGM' : 'Click to Play Peaceful Krishna Flute BGM'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    height: '34px',
                    padding: '0 12px 0 8px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 650,
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    outline: 'none',
                  }}
                  className={`transition-all border active:scale-95 focus-visible:ring-2 focus-visible:ring-teal-500 ${
                    isPlaying
                      ? 'bg-teal-600 text-white border-teal-700 hover:bg-teal-700 shadow-md shadow-teal-600/25'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 dark:bg-white/10 dark:text-white dark:border-white/20 shadow-xs'
                  }`}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isPlaying ? 'rgba(255, 255, 255, 0.22)' : '#ccfbf1',
                      color: isPlaying ? '#ffffff' : '#0d9488',
                      flexShrink: 0,
                    }}
                  >
                    {isPlaying ? <Pause size={10} className="fill-current" /> : <Play size={10} className="fill-current ml-0.5" />}
                  </span>
                  <span>{isPlaying ? 'Krishna Flute' : 'Play Flute'}</span>
                  {isPlaying && (
                    <span className="flex items-end gap-[2px] h-3 ml-0.5" aria-hidden="true">
                      <span className="w-[2px] h-3 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                      <span className="w-[2px] h-1.5 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
                      <span className="w-[2px] h-2.5 bg-white rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
                    </span>
                  )}
                </button>

                {/* Close Button Matching Moumita Memorial */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close explore platform dialog"
                  title="Close modal (Esc)"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                  className="flex items-center justify-center text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            {/* ── 2. Mode Switcher Tabs (What's New • What's Upcoming • How to Join) ── */}
            <div
              style={{
                flexShrink: 0,
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 20px',
                boxSizing: 'border-box',
              }}
              className="bg-white dark:bg-[#0c0d18] border-b border-slate-200 dark:border-white/10 overflow-x-auto"
            >
              {/* Tab 1: What's New & Releases */}
              <button
                type="button"
                onClick={() => setActiveTab('what-new')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                className={`transition-all ${
                  activeTab === 'what-new'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Tag size={14} />
                <span>What&apos;s New &amp; Releases</span>
                <span
                  style={{
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                  }}
                  className={`${
                    activeTab === 'what-new'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Shipped &amp; Releasing
                </span>
              </button>

              {/* Tab 2: What's Upcoming (Roadmap) */}
              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                className={`transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Clock size={14} />
                <span>What&apos;s Upcoming</span>
                <span
                  style={{
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                  }}
                  className={`${
                    activeTab === 'upcoming'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {upcomingItems.length} Items
                </span>
              </button>

              {/* Tab 3: How Contributors Join & Ship */}
              <button
                type="button"
                onClick={() => setActiveTab('how-to-join')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                className={`transition-all ${
                  activeTab === 'how-to-join'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <GitPullRequest size={14} />
                <span>How to Join &amp; Ship</span>
                <span
                  style={{
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                  }}
                  className={`${
                    activeTab === 'how-to-join'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  5 Steps
                </span>
              </button>
            </div>

            {/* ── 3. Main Scrollable Content Area ── */}
            <div
              style={{
                flex: '1 1 0%',
                minHeight: 0,
                overflowY: 'auto',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxSizing: 'border-box',
              }}
            >
              {activeTab === 'what-new' ? (
                <>
                  {/* Newly Shipped / Releasing Features Grid */}
                  <div
                    style={{
                      borderRadius: '16px',
                      padding: '16px 18px',
                      boxSizing: 'border-box',
                    }}
                    className="border border-teal-500/25 dark:border-teal-500/20 bg-teal-500/5 dark:bg-teal-950/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white m-0">
                          Active Features &amp; Current Releases
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300">
                        Live on Web
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {releasingFeatures.map((f, i) => {
                        const Icon = f.icon;
                        return (
                          <div
                            key={i}
                            style={{
                              padding: '12px 14px',
                              borderRadius: '12px',
                              boxSizing: 'border-box',
                            }}
                            className="bg-white dark:bg-[#141628] border border-slate-200 dark:border-white/10 shadow-2xs"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  backgroundColor: `${f.accent}20`,
                                  color: f.accent,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Icon size={14} />
                              </div>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white m-0 truncate">
                                {f.title}
                              </h4>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 m-0">
                              {f.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Release Milestones Selector Pills */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      flexShrink: 0,
                    }}
                    className="border-b border-slate-200 dark:border-white/10"
                  >
                    {releaseMilestones.map((m, idx) => {
                      const isSelected = idx === selectedMilestoneIndex;
                      return (
                        <button
                          key={m.tag}
                          type="button"
                          onClick={() => setSelectedMilestoneIndex(idx)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                          className={`transition-all border ${
                            isSelected
                              ? 'border-teal-500 bg-teal-500/15 text-teal-600 dark:text-teal-300 font-bold shadow-xs'
                              : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                          }`}
                        >
                          <span className="block text-[9px] uppercase font-sans font-semibold opacity-70">
                            {m.date}
                          </span>
                          <span>{m.tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Milestone Card */}
                  <div
                    style={{
                      borderRadius: '16px',
                      padding: '18px 20px',
                      boxSizing: 'border-box',
                    }}
                    className="border border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-[#141628] shadow-xs"
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          flex: '1 1 280px',
                          minWidth: '0',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                          style={{ background: currentMilestone.accent }}
                        >
                          <MilestoneIcon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                background: currentMilestone.accent,
                                boxSizing: 'border-box',
                                whiteSpace: 'nowrap',
                                lineHeight: '1.2',
                              }}
                              className="shrink-0 shadow-2xs"
                            >
                              {currentMilestone.badge}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              Tag: {currentMilestone.tag} • {currentMilestone.date}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold mt-1 text-slate-900 dark:text-white m-0 truncate">
                            {currentMilestone.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '5px 14px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          lineHeight: '1.2',
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#059669',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginLeft: 'auto',
                          boxSizing: 'border-box',
                        }}
                      >
                        {currentMilestone.metrics}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed mb-3 text-slate-600 dark:text-slate-300">
                      {currentMilestone.desc}
                    </p>

                    {/* Key Issues & Milestones */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 font-mono mb-2">
                        Authentic Git Commits &amp; Closed Issues:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {currentMilestone.keyIssues.map((issue, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              fontSize: '11px',
                              boxSizing: 'border-box',
                            }}
                            className="text-slate-800 dark:text-slate-200 bg-white dark:bg-[#1a1d36] border border-slate-200 dark:border-white/10 shadow-2xs"
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: currentMilestone.accent }}
                            />
                            <span className="leading-snug">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : activeTab === 'upcoming' ? (
                <>
                  {/* What's Upcoming Header Banner */}
                  <div
                    style={{
                      borderRadius: '16px',
                      padding: '16px 18px',
                      border: '1px solid rgba(217, 119, 6, 0.3)',
                      backgroundColor: 'rgba(217, 119, 6, 0.05)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-amber-600 dark:text-amber-400" />
                        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white m-0">
                          Platform Roadmap · What&apos;s Upcoming
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300">
                        {upcomingItems.length} Active Tracks
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 m-0 leading-relaxed">
                      Realistic community-driven milestones currently in editorial review, audio processing, or active development.
                    </p>
                  </div>

                  {/* Upcoming Items Selector Pills */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      flexShrink: 0,
                    }}
                    className="border-b border-slate-200 dark:border-white/10"
                  >
                    {upcomingItems.map((item, idx) => {
                      const isSelected = idx === selectedUpcomingIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedUpcomingIndex(idx)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            flexShrink: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                          className={`transition-all border ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold shadow-xs'
                              : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                          }`}
                        >
                          <span className="font-mono text-[10px] opacity-75">{item.number}</span>
                          <span>{item.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Upcoming Item Detail Card */}
                  <div
                    style={{
                      borderRadius: '16px',
                      padding: '18px 20px',
                      boxSizing: 'border-box',
                    }}
                    className="border border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-[#141628] shadow-xs"
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          flex: '1 1 280px',
                          minWidth: '0',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                          style={{ background: currentUpcoming.accent }}
                        >
                          <UpcomingIcon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                background: currentUpcoming.accent,
                                boxSizing: 'border-box',
                                whiteSpace: 'nowrap',
                                lineHeight: '1.2',
                              }}
                              className="shrink-0 shadow-2xs"
                            >
                              Track {currentUpcoming.number} · {currentUpcoming.statusBadge}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              Timeline: {currentUpcoming.targetTimeline}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold mt-1 text-slate-900 dark:text-white m-0 truncate">
                            {currentUpcoming.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '5px 14px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          lineHeight: '1.2',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginLeft: 'auto',
                          boxSizing: 'border-box',
                        }}
                        className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/25"
                      >
                        {currentUpcoming.targetTimeline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed mb-4 text-slate-600 dark:text-slate-300">
                      {currentUpcoming.summary}
                    </p>

                    {/* Key Deliverables */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 font-mono mb-2">
                        Deliverables &amp; Roadmap Scope:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {currentUpcoming.details.map((detail, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              fontSize: '11px',
                              boxSizing: 'border-box',
                            }}
                            className="text-slate-800 dark:text-slate-200 bg-white dark:bg-[#1a1d36] border border-slate-200 dark:border-white/10 shadow-2xs"
                          >
                            <CheckCircle2
                              size={14}
                              className="shrink-0 mt-0.5"
                              style={{ color: currentUpcoming.accent }}
                            />
                            <span className="leading-snug">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Join Steps Selector Pills */}
                  {/* Join Steps Selector Pills */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '8px',
                      flexShrink: 0,
                    }}
                    className="border-b border-slate-200 dark:border-white/10"
                  >
                    {joinSteps.map((s, idx) => {
                      const isSelected = idx === selectedJoinIndex;
                      return (
                        <button
                          key={s.step}
                          type="button"
                          onClick={() => setSelectedJoinIndex(idx)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            flexShrink: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                          className={`transition-all border ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                              : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                          }`}
                        >
                          <span className="font-mono text-[10px] opacity-75">{s.step}</span>
                          <span>{s.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Join Step Card */}
                  <div
                    style={{
                      borderRadius: '16px',
                      padding: '18px 20px',
                      boxSizing: 'border-box',
                    }}
                    className="border border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-[#141628] shadow-xs"
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          flex: '1 1 280px',
                          minWidth: '0',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                          style={{ background: currentJoinStep.accent }}
                        >
                          <JoinIcon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                background: currentJoinStep.accent,
                                boxSizing: 'border-box',
                                whiteSpace: 'nowrap',
                                lineHeight: '1.2',
                              }}
                              className="shrink-0 shadow-2xs"
                            >
                              Step {currentJoinStep.step}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              Contribution Lifecycle
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold mt-1 text-slate-900 dark:text-white m-0 truncate">
                            {currentJoinStep.title}
                          </h3>
                        </div>
                      </div>

                      <a
                        href="https://github.com/SB2318/UltimateHealth"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          lineHeight: '1.2',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginLeft: 'auto',
                          boxSizing: 'border-box',
                        }}
                        className="text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 dark:border-indigo-500/25 hover:bg-indigo-500/20 transition-colors"
                      >
                        <span>GitHub Issues</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed mb-3 text-slate-600 dark:text-slate-300">
                      {currentJoinStep.desc}
                    </p>

                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        boxSizing: 'border-box',
                      }}
                      className="bg-white dark:bg-[#1a1d36] border border-slate-200 dark:border-white/10"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-1">
                        Developer Details:
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-200 m-0 leading-relaxed font-mono">
                        {currentJoinStep.details}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        boxSizing: 'border-box',
                      }}
                      className="bg-indigo-500/5 dark:bg-indigo-950/25 border border-indigo-500/15 dark:border-indigo-500/20"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                        Automation &amp; CI Checks:
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-200 m-0 leading-relaxed">
                        {currentJoinStep.botAction}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Contributor Callout Card at Bottom */}
              <div
                style={{
                  marginTop: 'auto',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  boxSizing: 'border-box',
                  flexShrink: 0,
                  width: '100%',
                }}
                className="bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-transparent border border-teal-500/25 dark:border-teal-500/20 dark:from-teal-950/20 dark:via-indigo-950/20 dark:to-transparent"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flex: '1 1 280px',
                    minWidth: '0',
                  }}
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Users size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold m-0 text-slate-900 dark:text-white truncate">
                      Celebrate the people powering UltimateHealth
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0 mt-0.5 truncate">
                      Over 300 student developers and open-source contributors with 2,400+ commits worldwide.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={navigateToContributors}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: '1',
                    height: '36px',
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #0d9488 0%, #4f46e5 100%)',
                    boxShadow: '0 4px 14px rgba(13, 148, 136, 0.35)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    marginLeft: 'auto',
                    cursor: 'pointer',
                    border: 'none',
                    boxSizing: 'border-box',
                  }}
                  className="hover:opacity-95 active:scale-95 transition-all"
                >
                  <span>Meet Our 300+ Contributors</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* ── 4. Modal Footer Navigation (Rock-solid fixed height & padding) ── */}
            <div
              style={{
                flexShrink: 0,
                height: '60px',
                minHeight: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                boxSizing: 'border-box',
                width: '100%',
              }}
              className="bg-slate-50 dark:bg-[#121426] border-t border-slate-200 dark:border-white/10"
            >
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                {activeTab === 'what-new' ? (
                  <span>
                    Milestone {selectedMilestoneIndex + 1} of {releaseMilestones.length}
                  </span>
                ) : activeTab === 'upcoming' ? (
                  <span>
                    Upcoming Item {selectedUpcomingIndex + 1} of {upcomingItems.length}
                  </span>
                ) : (
                  <span>
                    Step {selectedJoinIndex + 1} of {joinSteps.length}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    lineHeight: '1',
                    height: '36px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                  className="bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={15} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: '1',
                    height: '36px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    border: 'none',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    background: nextButtonBg,
                    boxShadow: '0 3px 12px rgba(13, 148, 136, 0.3)',
                  }}
                  className="hover:opacity-95 active:scale-95 transition-all"
                >
                  <span>{nextButtonLabel}</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
