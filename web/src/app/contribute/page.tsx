'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from 'framer-motion'
import {
  Code2,
  BookOpen,
  Palette,
  Bug,
  Lightbulb,
  GitFork,
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  Users,
  MessageSquare,
  Heart,
  ChevronDown,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Star,
  Zap,
  Globe,
  MessageCircle,
  GitMerge,
  ArrowRight,
  Mail,
} from 'lucide-react'
import { Footer } from '@/components/ui/footer'
import { PageWrapper } from '@/components/layout'
import { Navbar } from '@/components/ui/navbar'

// =============================================================================
// Types
// =============================================================================
type LucideIcon = React.ComponentType<{
  size?: number
  color?: string
  className?: string
}>

interface ContributeWay {
  icon: LucideIcon
  title: string
  items: string[]
  color: string
  bg: string
}

interface WorkflowStep {
  icon: LucideIcon
  step: number
  title: string
  desc: string
}

interface CommunityCard {
  icon: LucideIcon
  title: string
  desc: string
  link: string
  label: string
}

interface FAQItem {
  question: string
  answer: string
}

const TRACKED_SECTION_IDS = ['screenshots', 'features', 'programs', 'contact'];

// =============================================================================
// Constants
// =============================================================================
const REPO_URL = 'https://github.com/SB2318/UltimateHealth'

const whyCards = [
  {
    icon: Globe,
    title: 'Open Source',
    desc: 'Help improve a healthcare platform used by the community worldwide.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Collaborate with developers, designers, testers, and contributors.',
    gradient: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
  },
  {
    icon: Heart,
    title: 'Make an Impact',
    desc: 'Every contribution helps make healthcare tools better for everyone.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
]

const contributeWays: ContributeWay[] = [
  {
    icon: Code2,
    title: 'Code',
    items: ['Features', 'Bug Fixes', 'Refactoring'],
    color: '#667eea',
    bg: 'rgba(102,126,234,0.08)',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    items: ['Improve guides', 'Tutorials', 'README updates'],
    color: '#764ba2',
    bg: 'rgba(118,75,162,0.08)',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    items: ['Improve interfaces', 'Accessibility', 'User experience'],
    color: '#e879f9',
    bg: 'rgba(232,121,249,0.08)',
  },
  {
    icon: Bug,
    title: 'Testing',
    items: ['Find bugs', 'Report issues', 'QA support'],
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
  {
    icon: Lightbulb,
    title: 'Ideas & Discussions',
    items: ['Suggest features', 'Community feedback', 'Product improvements'],
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
]

const workflowSteps: WorkflowStep[] = [
  {
    icon: GitFork,
    step: 1,
    title: 'Fork Repository',
    desc: 'Fork the UltimateHealth repo to your GitHub account.',
  },
  {
    icon: Terminal,
    step: 2,
    title: 'Clone Your Fork',
    desc: 'Clone the forked repo to your local machine.',
  },
  {
    icon: GitBranch,
    step: 3,
    title: 'Create Feature Branch',
    desc: 'Create a new branch for your feature or fix.',
  },
  {
    icon: Code2,
    step: 4,
    title: 'Make Changes',
    desc: 'Implement your changes following the project guidelines.',
  },
  {
    icon: GitCommit,
    step: 5,
    title: 'Commit Changes',
    desc: 'Commit your work with a meaningful commit message.',
  },
  {
    icon: ArrowRight,
    step: 6,
    title: 'Push to GitHub',
    desc: 'Push your branch to your fork on GitHub.',
  },
  {
    icon: GitPullRequest,
    step: 7,
    title: 'Open Pull Request',
    desc: 'Open a PR from your branch to the main repository.',
  },
  {
    icon: MessageSquare,
    step: 8,
    title: 'Review & Discussion',
    desc: 'Respond to reviewer feedback and make improvements.',
  },
  {
    icon: GitMerge,
    step: 9,
    title: 'Merge After Approval',
    desc: 'Your PR gets merged once approved by maintainers.',
  },
]

const communityCards: CommunityCard[] = [
  {
    icon: Bug,
    title: 'GitHub Issues',
    desc: 'Report bugs or request features directly on our repository.',
    link: `${REPO_URL}/issues`,
    label: 'Open Issues',
  },
  {
    icon: MessageCircle,
    title: 'Contribution Guide',
    desc: 'Read the contribution guidelines before opening your first pull request.',
    link: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
    label: 'Read the Guide',
  },
  {
    icon: Mail,
    title: 'Email Support',
    desc: 'Reach out to the maintainers directly via email for any queries.',
    link: 'mailto:ultimate.health25@gmail.com',
    label: 'Send an Email',
  },
]

const faqs: FAQItem[] = [
  {
    question: "I'm new to open source. Can I contribute?",
    answer:
      "Absolutely! We welcome contributors of all experience levels. We have beginner-friendly issues labeled 'good first issue' to help you get started on your open-source journey.",
  },
  {
    question: 'Do I need coding experience?',
    answer:
      "No coding experience is required. Documentation improvements, testing, UI/UX design, and sharing ideas are all valuable contributions that don't require programming skills.",
  },
  {
    question: 'How long does review take?',
    answer:
      'Review times vary depending on maintainer availability and the complexity of the contribution. Typically it ranges from a few days to a week.',
  },
  {
    question: 'Can I work on multiple issues?',
    answer:
      'Yes! You can work on multiple issues as long as they are properly assigned to you. Make sure each is tracked in a separate branch and pull request for easier review.',
  },
]

const PR_CODE = `# 1. Fork repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/UltimateHealth.git
cd UltimateHealth

# 2. Create a feature branch
git checkout -b feature/my-feature

# 3. Make your changes, then stage & commit
git add .
git commit -m "feat: add my-feature"

# 4. Push to your fork
git push origin feature/my-feature

# 5. Open a Pull Request on GitHub ↗`

// =============================================================================
// Animation Variants
// =============================================================================
const EASE_SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SPRING },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// =============================================================================
// Reusable: Animated Section Wrapper
// =============================================================================
function AnimateWhenVisible({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-60px' as `${number}px`,
  })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// =============================================================================
// Reusable: Section Heading
// =============================================================================
function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      style={{ textAlign: 'center', marginBottom: '60px' }}
    >
      <h2>{title}</h2>
      <p className="center" style={{ marginBottom: 0 }}>
        {subtitle}
      </p>
    </motion.div>
  )
}

// =============================================================================
// Reusable: Code Block
// =============================================================================
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API unavailable
    }
  }

  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: '#1e293b',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#ef4444',
              display: 'block',
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#f59e0b',
              display: 'block',
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#22c55e',
              display: 'block',
            }}
          />
        </div>
        <span
          style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}
        >
          bash
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: copied ? '#22c55e' : '#94a3b8',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '5px 12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          aria-label="Copy code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          padding: '24px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.8,
          color: '#e2e8f0',
          margin: 0,
          fontFamily:
            "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

// =============================================================================
// Reusable: FAQ Accordion Item
// =============================================================================
function FAQAccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: 'var(--bg-white)',
        borderRadius: '16px',
        border: `1.5px solid ${open ? '#667eea' : 'var(--card-border)'}`,
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: open
          ? '0 8px 24px rgba(102,126,234,0.13)'
          : 'var(--shadow-sm)',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
        aria-expanded={open}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {index + 1}
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-dark)',
              lineHeight: 1.4,
            }}
          >
            {item.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={20} color="#667eea" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                padding: '0 24px 20px 66px',
                color: 'var(--text-light)',
                lineHeight: 1.75,
                fontSize: '0.95rem',
                margin: 0,
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// =============================================================================
// Hero Section
// =============================================================================
function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        paddingTop: '140px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      <div
        className="contribute-container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="contribute-hero-grid">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50px',
                padding: '6px 18px',
                marginBottom: '24px',
                color: 'rgba(255,255,255,0.95)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <Star size={12} />
              Independent Open Source
            </motion.div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.15,
                marginBottom: '24px',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Join Us &amp; Contribute to UltimateHealth
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.8,
                marginBottom: "40px",
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Build, improve, and grow UltimateHealth with the community. Every
              contribution, big or small, makes a real difference.
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  color: '#667eea',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                }}
              >
                <Zap size={18} />
                Start Contributing
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ExternalLink size={18} />
                View Repository
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="/frontend/v2/our-contributors"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.9)',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Users size={18} />
                Meet Our Contributors
              </motion.a>
            </div>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="contribute-hero-visual"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              style={{ position: 'relative', width: '100%', maxWidth: '420px' }}
            >
              {/* Main floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '24px',
                  padding: '32px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    margin: '0 auto 20px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <Image
                    src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
                    alt="UltimateHealth"
                    width={72}
                    height={72}
                  />
                </div>

                <h3
                  style={{
                    color: 'white',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    marginBottom: '6px',
                  }}
                >
                  UltimateHealth
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.88rem',
                    marginBottom: '24px',
                  }}
                >
                  Open-source health platform for everyone
                </p>
              </motion.div>

              {/* Floating badge top-right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                style={{
                  position: 'absolute',
                  top: '-18px',
                  right: '-18px',
                  background: 'var(--bg-white)',
                  borderRadius: '14px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                }}
              >
                <Star size={14} color="#f59e0b" fill="#f59e0b" />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                  }}
                >
                  Community Driven
                </span>
              </motion.div>

              {/* Floating badge bottom-left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                style={{
                  position: 'absolute',
                  bottom: '-18px',
                  left: '-18px',
                  background: 'var(--bg-white)',
                  borderRadius: '14px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                }}
              >
                <CheckCircle2 size={14} color="#22c55e" />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                  }}
                >
                  Beginner Friendly
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// Section 1: Why Contribute
// =============================================================================
function WhyContributeSection() {
  return (
    <section style={{ background: 'var(--bg-white)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <SectionHeading
            title="Why Contribute?"
            subtitle="Join a community building tools that matter and grow as a developer along the way."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {whyCards.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  style={{
                    background: 'var(--bg-white)',
                    borderRadius: '20px',
                    padding: '36px 32px',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'box-shadow 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                      'var(--shadow-lg)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                      'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '16px',
                      background: card.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={28} color="white" />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      marginBottom: '12px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 2: Ways to Contribute
// =============================================================================
function WaysToContributeSection() {
  return (
    <section style={{ background: 'var(--bg-light)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <SectionHeading
            title="Ways to Contribute"
            subtitle="No matter your skill set, there is a meaningful way for you to contribute to UltimateHealth."
          />

          <div className="contribute-ways-grid">
            {contributeWays.map((way) => {
              const Icon = way.icon
              return (
                <motion.div
                  key={way.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  style={{
                    background: 'var(--bg-white)',
                    borderRadius: '20px',
                    padding: '28px',
                    border: `1.5px solid ${way.bg}`,
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = 'var(--shadow-lg)'
                    el.style.borderColor = way.color
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = 'var(--shadow-sm)'
                    el.style.borderColor = way.bg
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '14px',
                      background: way.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={24} color={way.color} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      marginBottom: '12px',
                    }}
                  >
                    {way.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {way.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: 'var(--text-muted)',
                          fontSize: '0.9rem',
                          marginBottom: '6px',
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: way.color,
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 3: GitHub Contribution Workflow
// =============================================================================
function WorkflowSection() {
  return (
    <section style={{ background: 'var(--bg-white)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <SectionHeading
            title="GitHub Contribution Workflow"
            subtitle="Follow these 9 steps to make your first contribution to UltimateHealth."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              position: 'relative',
            }}
          >
            {workflowSteps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === workflowSteps.length - 1
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    background: 'var(--bg-white)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1.5px solid rgba(102,126,234,0.12)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '0 12px 32px rgba(102,126,234,0.18)'
                    el.style.borderColor = '#667eea'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = 'var(--shadow-sm)'
                    el.style.borderColor = 'rgba(102,126,234,0.12)'
                  }}
                >
                  {/* Step number watermark */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '16px',
                      fontSize: '3.5rem',
                      fontWeight: 900,
                      color: 'rgba(102,126,234,0.06)',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    {step.step}
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color="white" />
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: '#667eea',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Step {step.step}
                      {isLast && ' 🎉'}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      marginBottom: '8px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.88rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 4: How to Submit a Pull Request
// =============================================================================
function PRSection() {
  const prSteps = [
    {
      icon: GitPullRequest,
      label: 'Open Pull Request',
      desc: 'Go to the original repo and open a PR from your branch.',
    },
    {
      icon: CheckCircle2,
      label: 'Wait for Review',
      desc: 'A maintainer will review your changes and provide feedback.',
    },
    {
      icon: MessageSquare,
      label: 'Address Feedback',
      desc: 'Make requested changes and push them to your branch.',
    },
    {
      icon: GitMerge,
      label: 'Merge',
      desc: 'Once approved, your contribution gets merged into the main codebase.',
    },
  ]

  return (
    <section style={{ background: 'var(--bg-light)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <SectionHeading
            title="How to Submit a Pull Request"
            subtitle="Follow this example flow to submit your first pull request."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'start',
            }}
            className="contribute-pr-grid"
          >
            {/* Code block */}
            <motion.div variants={fadeUp}>
              <CodeBlock code={PR_CODE} />
            </motion.div>

            {/* Steps */}
            <motion.div
              variants={staggerContainer}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {prSteps.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    style={{
                      background: 'var(--bg-white)',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      border: '1px solid var(--card-border)',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.3s ease',
                    }}
                    whileHover={{
                      x: 4,
                      boxShadow: '0 8px 24px rgba(102,126,234,0.12)',
                      borderColor: 'rgba(102,126,234,0.3)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '10px',
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} color="white" />
                    </div>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px',
                        }}
                      >
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: 'var(--gradient-primary)',
                            color: 'white',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {i + 1}
                        </span>
                        <strong
                          style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-dark)',
                            fontWeight: 700,
                          }}
                        >
                          {s.label}
                        </strong>
                      </div>
                      <p
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 5: Community & Support
// =============================================================================
function CommunitySection() {
  return (
    <section style={{ background: 'var(--bg-white)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <SectionHeading
            title="Community &amp; Support"
            subtitle="Connect with the UltimateHealth community through GitHub Issues, Discussions, and direct support."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
            }}
          >
            {communityCards.map((card, i) => {
              const Icon = card.icon
              const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              ]
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  style={{
                    background: 'var(--bg-white)',
                    borderRadius: '20px',
                    padding: '36px 32px',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                      'var(--shadow-lg)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                      'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      background: gradients[i],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={26} color="white" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--text-dark)',
                        marginBottom: '8px',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-muted)',
                        lineHeight: 1.65,
                        fontSize: '0.92rem',
                        margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={card.link}
                    target={card.link.startsWith("mailto:") ? undefined : "_blank"}
                    rel={card.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '12px 20px',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      boxShadow: 'var(--shadow-sm)',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {card.label}
                    <ArrowRight size={14} />
                  </motion.a>
                </motion.div>
              )
            })}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 6: Our Purpose
// =============================================================================
function PurposeSection() {
  const pillars = [
    {
      emoji: '🕊️',
      title: 'To Honour Them',
      desc: 'We exist to honour everyone who has been wounded — physically, mentally, or emotionally — by the world around them. You are seen. You are not forgotten.',
      accent: '#667eea',
      bg: 'rgba(102,126,234,0.06)',
    },
    {
      emoji: '🩹',
      title: 'Whoever Got Injured by Society',
      desc: 'Society wounds in ways that are invisible — through neglect, stigma, inequality, and silence. UltimateHealth stands for those who carry those wounds without recognition.',
      accent: '#f5576c',
      bg: 'rgba(245,87,108,0.06)',
    },
    {
      emoji: '💡',
      title: 'Knowledge as Healing',
      desc: 'Access to clear, honest health knowledge is a right — not a privilege. We build tools that put that knowledge in the hands of every person who needs it.',
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.06)',
    },
    {
      emoji: '🤝',
      title: 'Open to Everyone',
      desc: 'UltimateHealth is independently open source — built by volunteers who believe that healthcare tools should belong to the community, free from gatekeeping.',
      accent: '#22c55e',
      bg: 'rgba(34,197,94,0.06)',
    },
  ]

  return (
    <section style={{ background: 'var(--bg-white)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <motion.div
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '70px' }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(102,126,234,0.08)',
                border: '1px solid rgba(102,126,234,0.18)',
                borderRadius: '50px',
                padding: '6px 18px',
                marginBottom: '24px',
                color: '#667eea',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <Heart size={12} />
              Our Purpose
            </div>

            {/* Headline */}
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: 'var(--text-dark)',
                lineHeight: 1.2,
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              To Honour Them,<br />Whoever Got Injured by Society
            </div>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-light)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              UltimateHealth was born from a belief — that every person who has been hurt,
              overlooked, or left without support deserves access to knowledge, care, and community.
            </p>
          </motion.div>

          {/* Pillars grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px',
            }}
          >
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  background: 'var(--bg-white)',
                  borderRadius: '20px',
                  padding: '36px 28px',
                  border: `1.5px solid ${p.bg}`,
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = `0 16px 48px ${p.bg}`
                  el.style.borderColor = p.accent
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = 'var(--shadow-sm)'
                  el.style.borderColor = p.bg
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    background: p.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    marginBottom: '20px',
                  }}
                >
                  {p.emoji}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: 'var(--text-dark)',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-light)',
                    lineHeight: 1.75,
                    fontSize: '0.92rem',
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.blockquote
            variants={fadeUp}
            style={{
              marginTop: '60px',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.06) 0%, rgba(245,87,108,0.06) 100%)',
              border: '1.5px solid rgba(102,126,234,0.15)',
              borderLeft: '4px solid #667eea',
              borderRadius: '16px',
              padding: '32px 36px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-dark)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              &ldquo;We don&apos;t build this platform for accolades or programmes.
              We build it for the person sitting alone, hurting, and wondering
              if anyone understands. We do. This is for you.&rdquo;
            </p>
            <footer
              style={{
                marginTop: '16px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#667eea',
                letterSpacing: '0.04em',
              }}
            >
              — The UltimateHealth Team
            </footer>
          </motion.blockquote>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 7: GSSoC 2026
// =============================================================================
function GSSoC2026Section() {
  const highlights = [
    {
      icon: Star,
      label: 'Featured Program',
      value: 'GSSoC 2026',
      sub: 'GirlScript Summer of Code',
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
    },
    {
      icon: GitPullRequest,
      label: 'Contribution Window',
      value: 'May – Aug 2026',
      sub: 'Open for all participants',
      accent: '#667eea',
      bg: 'rgba(102,126,234,0.08)',
    },
    {
      icon: Users,
      label: 'Open To',
      value: 'All Developers',
      sub: 'Beginners welcome',
      accent: '#22c55e',
      bg: 'rgba(34,197,94,0.08)',
    },
    {
      icon: Zap,
      label: 'Difficulty',
      value: 'All Levels',
      sub: 'Easy · Medium · Hard',
      accent: '#f5576c',
      bg: 'rgba(245,87,108,0.08)',
    },
  ]

  const perks = [
    'Certificate of participation from GSSoC',
    'Open source contributions on your GitHub profile',
    'Mentorship from experienced maintainers',
    'Beginner-friendly issues labelled for you',
    'Swag & recognition for top contributors',
    'Build real-world healthcare tech skills',
  ]

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle animated background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(102,126,234,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '10%',
          width: '400px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="contribute-container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimateWhenVisible>
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.35)',
                borderRadius: '50px',
                padding: '8px 20px',
                marginBottom: '28px',
                color: '#fbbf24',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <Star size={13} fill="#fbbf24" />
              Ongoing · GSSoC 2026
            </div>

            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f472b6 50%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Featured in GirlScript<br />Summer of Code 2026
            </div>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}
            >
              UltimateHealth is an officially selected project in GSSoC 2026.
              Contributors can earn recognition, certificates, and make real impact
              on a health platform used by the community.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '60px',
            }}
          >
            {highlights.map((h) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.label}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    padding: '28px 24px',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.background = h.bg
                    el.style.borderColor = h.accent + '55'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.background = 'rgba(255,255,255,0.04)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: h.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      border: `1px solid ${h.accent}33`,
                    }}
                  >
                    <Icon size={20} color={h.accent} />
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    {h.label}
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', marginBottom: '4px', lineHeight: 1.2 }}>
                    {h.value}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                    {h.sub}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Perks + CTA */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              alignItems: 'center',
            }}
            className="contribute-pr-grid"
          >
            {/* Perks list */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
                What you get as a GSSoC contributor
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {perks.map((perk) => (
                  <div key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'rgba(34,197,94,0.15)',
                        border: '1px solid rgba(34,197,94,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      <CheckCircle2 size={13} color="#22c55e" />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontWeight: 500 }}>
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '40px 36px',
                textAlign: 'center',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '12px', lineHeight: 1.3 }}>
                Ready to contribute<br />during GSSoC 2026?
              </div>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '28px' }}>
                Browse open issues, pick one that excites you,
                and start your open source journey today.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href={`${REPO_URL}/issues?q=is%3Aissue+is%3Aopen+label%3Agssoc`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f472b6 100%)',
                    color: 'white',
                    padding: '14px 28px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
                  }}
                >
                  <Star size={16} />
                  Browse GSSoC Issues
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://gssoc.girlscript.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.8)',
                    padding: '13px 28px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <ExternalLink size={15} />
                  Learn about GSSoC
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Section 8: FAQ
// =============================================================================
function FAQSection() {
  return (
    <section style={{ background: 'var(--bg-light)', padding: '100px 0' }}>
      <div className="contribute-container">
        <AnimateWhenVisible>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Have questions? We have answers. Click any question to expand it."
          />

          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {faqs.map((item, i) => (
              <FAQAccordionItem key={i} item={item} index={i} />
            ))}
          </div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Final CTA Section
// =============================================================================
function FinalCTASection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background dots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      <div
        className="contribute-container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <AnimateWhenVisible>
          <motion.div variants={fadeUp}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50px',
                padding: '6px 18px',
                marginBottom: '24px',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              <Heart size={12} />
              Open Source Community
            </div>

            <h2
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: 'white',
                marginBottom: '20px',
                background: 'none',
                WebkitTextFillColor: 'white',
                WebkitBackgroundClip: 'unset',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Ready to Make an Impact?
            </h2>

            <p
              style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '560px',
                margin: '0 auto 48px',
                lineHeight: 1.75,
              }}
            >
              Join the UltimateHealth community and start contributing today.
              Your skills, whether technical or not, are valuable here.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={`${REPO_URL}/issues/new`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  color: '#667eea',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                }}
              >
                <Bug size={18} />
                Create an Issue
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={`${REPO_URL}/pulls`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <GitPullRequest size={18} />
                Submit a Pull Request
              </motion.a>
            </div>

            {/* Trust indicators */}
            <div
              style={{
                marginTop: '56px',
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { icon: Code2, label: 'Open Source' },
                { icon: Users, label: 'Community Driven' },
                { icon: Heart, label: 'Beginner Friendly' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  <Icon size={16} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimateWhenVisible>
      </div>
    </section>
  )
}

// =============================================================================
// Page — no inline Header/Footer; the root layout.tsx renders those
// =============================================================================
export default function ContributePage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .querySelectorAll(
          '.fade-in,.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale',
        )
        .forEach((el) => el.classList.add('visible', 'revealed'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible', 'revealed')
        }),
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )
    document
      .querySelectorAll(
        '.fade-in,.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale',
      )
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [navOpen, setNavOpen] = useState(false)

  const TRACKED_SECTION_IDS = ['screenshots', 'features', 'programs', 'contact']

  const navLinks = [
    { href: '/', label: 'Home', icon: 'fa-home' },
    { href: '/#features', label: 'Platform Highlights', icon: 'fa-star' },
    { href: '/#screenshots', label: 'Screenshots', icon: 'fa-image' },
    { href: '/#programs', label: 'Community Programs', icon: 'fa-code-branch' },
    {
      href: 'https://uhsocial.in/docs',
      label: 'Read Articles',
      icon: 'fa-file-lines',
      external: true,
    },
    { href: '/#downloads', label: 'Login / Register', icon: 'fa-user' },
  ]

  return (
    <>
      <style>{`
        /* ── Give every .container horizontal breathing room ── */
        .contribute-container {
         max-width: 1200px;
         margin: 0 auto;
         padding-left: clamp(20px, 5vw, 80px);
         padding-right: clamp(20px, 5vw, 80px);
         }

        .contribute-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .contribute-ways-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .contribute-pr-grid {
          grid-template-columns: 1fr 1fr !important;
        }
/* ── Floating hamburger button ── */
.contrib-fab {
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 9999;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(30,30,50,0.85);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(102,126,234,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #667eea;
  font-size: 1.1rem;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
}

.contrib-fab:hover {
  background: rgba(102,126,234,0.2);
  transform: scale(1.07);
}

/* ── Dropdown nav panel ── */
.contrib-nav-panel {
  position: fixed;
  top: 74px;
  right: 24px;
  z-index: 9998;
  background: var(--bg-white);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  border: 1px solid var(--card-border);
  padding: 8px;
  min-width: 230px;
  overflow: hidden;
}

.contrib-nav-panel a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 10px;
  color: var(--text-dark);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s;
}

.contrib-nav-panel a:hover {
  background: rgba(102,126,234,0.08);
  color: #667eea;
}

.contrib-nav-panel a i {
  width: 18px;
  text-align: center;
  color: #667eea;
  font-size: 0.85rem;
}

.contrib-nav-divider {
  height: 1px;
  background: var(--card-border);
  margin: 6px 8px;
}

.contrib-nav-active-label {
  padding: 6px 14px 4px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text-muted);
}

@media (max-width: 1100px) {
  .contribute-ways-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
     @media (max-width: 900px) {
          .contribute-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 48px;
          }
          .contribute-hero-visual {
            display: none;
          }
          .contribute-hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .contribute-pr-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .contribute-hero-grid h1 {
            font-size: 2.2rem !important;
          }
          .contrib-nav-panel {
            right: 12px;
          }
          .contrib-fab {
            right: 12px;
          }
        }
      `}</style>

      {/* ── Floating hamburger nav ── */}
      <button
        className="contrib-fab"
        onClick={() => setNavOpen((o) => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={navOpen}
      >
        <i className={`fas fa-${navOpen ? 'times' : 'bars'}`}></i>
      </button>

      {navOpen && (
        <>
          {/* backdrop — click outside to close */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9997 }}
            onClick={() => setNavOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="contrib-nav-panel"
            role="navigation"
            aria-label="Site navigation"
          >
            <div className="contrib-nav-active-label">Navigate to</div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={
                  'external' in link && link.external ? '_blank' : undefined
                }
                rel={
                  'external' in link && link.external ? 'noreferrer' : undefined
                }
                onClick={() => setNavOpen(false)}
              >
                <i className={`fas ${link.icon}`}></i>
                {link.label}
              </a>
            ))}
          </nav>
        </>
      )}
      <Navbar tracking_id = {TRACKED_SECTION_IDS} />

      <main>
          <HeroSection />
          <PurposeSection />
          <GSSoC2026Section />
          <WhyContributeSection />
          <WaysToContributeSection />
          <WorkflowSection />
          <PRSection />
          <CommunitySection />
          <FAQSection />
          <FinalCTASection />
          <Footer />
      </main>
    </>
  )
}
