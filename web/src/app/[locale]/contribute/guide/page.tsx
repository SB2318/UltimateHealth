'use client'

import { useState, useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import {
  Code2,
  GitFork,
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  MessageSquare,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  GitMerge,
} from 'lucide-react'
import { Footer } from '@/components/ui/footer'
import { Navbar } from '@/components/ui/navbar'

// =============================================================================
// Types
// =============================================================================
type LucideIcon = React.ComponentType<{
  size?: number
  color?: string
  className?: string
}>

interface WorkflowStep {
  icon: LucideIcon
  step: number
  title: string
  desc: string
}

const TRACKED_SECTION_IDS: string[] = []

// =============================================================================
// Constants (copied from contribute/page.tsx)
// =============================================================================
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
// Animation Variants (copied from contribute/page.tsx)
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
// Reusable: Animated Section Wrapper (copied from contribute/page.tsx)
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
// Reusable: Section Heading (copied from contribute/page.tsx)
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
// Reusable: Code Block (copied from contribute/page.tsx)
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
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', display: 'block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
        </div>
        <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 600 }}>
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
// Section: GitHub Contribution Workflow (moved from contribute/page.tsx)
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
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
// Section: How to Submit a Pull Request (moved from contribute/page.tsx)
// =============================================================================
function PRSection() {
  const prSteps = [
    { icon: GitPullRequest, label: 'Open Pull Request', desc: 'Go to the original repo and open a PR from your branch.' },
    { icon: CheckCircle2, label: 'Wait for Review', desc: 'A maintainer will review your changes and provide feedback.' },
    { icon: MessageSquare, label: 'Address Feedback', desc: 'Make requested changes and push them to your branch.' },
    { icon: GitMerge, label: 'Merge', desc: 'Once approved, your contribution gets merged into the main codebase.' },
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
            <motion.div variants={fadeUp}>
              <CodeBlock code={PR_CODE} />
            </motion.div>
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
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} color="white" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
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
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-dark)', fontWeight: 700 }}>
                          {s.label}
                        </strong>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
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
// Page
// =============================================================================
export default function ContributionGuidePage() {
  return (
    <>
      <Navbar tracking_id={TRACKED_SECTION_IDS} />
      <main>
        <div className="contribute-container" style={{ paddingTop: '140px', paddingBottom: '20px' }}>
          <a
            href="/contribute"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#667eea',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            ← Back to Contribute
          </a>
          <h1 style={{ marginTop: '16px' }}>Contribution Guide</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px' }}>
            The detailed Git workflow and pull request steps for contributing to UltimateHealth.
          </p>
        </div>
        <WorkflowSection />
        <PRSection />
        <Footer />
      </main>
    </>
  )
}