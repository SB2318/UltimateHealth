'use client'

import Link from 'next/link'
import '../../app/globals.css'

import { PageWrapper } from '../layout'

import { withBasePath } from '@/lib/basePath'
import { useState } from 'react'

export const Footer = () => {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim())
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://uhsocial.in'
  // Owner-configurable frontend URLs (set in deployment env when needed)
  const HELP_CENTER_URL =
    process.env.NEXT_PUBLIC_HELP_CENTER_URL || 'https://uhsocial.in/docs'
  const FEEDBACK_URL =
    process.env.NEXT_PUBLIC_FEEDBACK_URL ||
    'https://github.com/SB2318/UltimateHealth/issues'
  const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || ''
  const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || ''
  const PRIVACY_POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || '#'
  const TERMS_OF_USE_URL = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL || '#'
  // ── Newsletter state ──
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'sending' | 'success' | 'error' | 'invalid' | 'empty' | 'duplicate'
  >('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedNewsletterEmail = newsletterEmail.trim()

    // Bug fix 1: Show specific validation error for empty or invalid email
    if (!trimmedNewsletterEmail) {
      setNewsletterStatus('empty')
      return
    }
    if (!isValidEmail(trimmedNewsletterEmail)) {
      setNewsletterStatus('invalid')
      return
    }
    setNewsletterStatus('sending')
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedNewsletterEmail }),
      })

      if (res.status === 409) {
        setNewsletterStatus('duplicate')
        return
      }
      if (!res.ok) throw new Error('Failed')

      setNewsletterStatus('success')
      setNewsletterEmail('')
    } catch {
      setNewsletterStatus('error')
    }
  }
  return (
    <footer className='' style={{
        zIndex:10
    }}>
      <PageWrapper className="footer-grid">
        {/* Brand column */}
        <div className="footer-brand">
          <h2>UltimateHealth</h2>
          <p className="footer-note">
            Open-source health and wellness for everyone.
          </p>

          {/* Newsletter — wired to API */}
          <form
            className="footer-subscribe-form"
            onSubmit={handleNewsletterSubmit}
            noValidate
          >
            {newsletterStatus === 'success' ? (
              <div className="newsletter-success">
                <i className="fas fa-check-circle"></i> You have successfully
                subscribed!
              </div>
            ) : (
              <>
                <div className="footer-subscribe-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="footer-subscribe-input"
                    maxLength={120}
                    value={newsletterEmail}
                    required
                    aria-label="Newsletter email address"
                    aria-describedby="newsletter-feedback"
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value)
                      if (
                        newsletterStatus !== 'idle' &&
                        newsletterStatus !== 'sending'
                      ) {
                        setNewsletterStatus('idle')
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="footer-subscribe-btn"
                    aria-label="Subscribe to UltimateHealth newsletter"
                    disabled={newsletterStatus === 'sending'}
                  >
                    {newsletterStatus === 'sending'
                      ? 'Subscribing...'
                      : 'Subscribe'}
                  </button>
                </div>

                <div id="newsletter-feedback" aria-live="polite">
                  {newsletterStatus === 'empty' && (
                    <p className="newsletter-error">
                      <i className="fas fa-exclamation-circle"></i> Please enter
                      a valid email address.
                    </p>
                  )}
                  {newsletterStatus === 'invalid' && (
                    <p className="newsletter-error">
                      <i className="fas fa-exclamation-circle"></i> Invalid
                      email format.
                    </p>
                  )}
                  {newsletterStatus === 'duplicate' && (
                    <p className="newsletter-error">
                      <i className="fas fa-info-circle"></i> This email is
                      already subscribed.
                    </p>
                  )}
                  {newsletterStatus === 'error' && (
                    <p className="newsletter-error">
                      <i className="fas fa-exclamation-circle"></i> Could not
                      subscribe. Please try again.
                    </p>
                  )}
                </div>

                <small className="footer-subscribe-note">
                  We respect your privacy. Unsubscribe at any time.
                </small>
              </>
            )}
          </form>
          {/* Social icons */}
          <div style={{ marginTop: 20 }}>
            <span className="footer-follow-label">Follow Us</span>
            <div className="footer-social-links">
              <a
                href="https://github.com/SB2318"
                className="footer-social-icon"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                aria-label="Open UltimateHealth GitHub profile"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ultimate-health-9290873a8/"
                className="footer-social-icon"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                aria-label="Open UltimateHealth LinkedIn profile"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              {TELEGRAM_URL && (
                <a
                  href={TELEGRAM_URL}
                  className="footer-social-icon"
                  target="_blank"
                  rel="noreferrer"
                  title="Telegram"
                  aria-label="Open UltimateHealth Telegram link"
                >
                  <i className="fab fa-telegram-plane"></i>
                </a>
              )}
              {INSTAGRAM_URL && (
                <a
                  href={INSTAGRAM_URL}
                  className="footer-social-icon"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  aria-label="Open UltimateHealth Instagram link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h3>Quick Links</h3>
          <Link href={withBasePath('/')}>Home</Link>
          <a href="/#features">Features</a>
          <a href="/#programs">Programs</a>
          <a href="/#screenshots">Screenshots</a>
          <a href="/#contact">Contact</a>
          <Link href="/contribute">Join Us &amp; Contribute</Link>
        </div>

        {/* Support */}
        <div className="footer-links-col">
          <h3>Support</h3>
          <a href={HELP_CENTER_URL} target="_blank" rel="noopener noreferrer">
            Help Center
          </a>
          <a href="mailto:ultimate.health25@gmail.com">Contact Us</a>
          <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">
            Feedback
          </a>
          <a
            href="https://uhsocial.in/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Docs
          </a>
        </div>
      </PageWrapper>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © 2026 UltimateHealth. Built with passion for a healthier community.
          </p>
          <div className="footer-bottom-links">
            <a href={PRIVACY_POLICY_URL}>Privacy Policy</a>
            <a href={TERMS_OF_USE_URL}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
