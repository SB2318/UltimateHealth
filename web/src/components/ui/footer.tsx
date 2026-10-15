'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { PageWrapper } from '../layout'

import { withBasePath } from '@/lib/basePath'
import {
  FEEDBACK_URL,
  HELP_CENTER_URL,
  INSTAGRAM_URL,
  PRIVACY_POLICY_URL,
  TELEGRAM_URL,
  TERMS_OF_USE_URL,
  isValidEmail,
} from '@/lib/site-config'

export const Footer = () => {
  const pathname = usePathname() || ''
  const segments = pathname.split('/').filter(Boolean)
  const knownLocales = ['en', 'hi', 'bn', 'ta', 'or', 'de', 'es', 'fr', 'hr']
  const currentLocale = segments.find((s) => knownLocales.includes(s)) || 'en'

  const homeUrl = withBasePath(`/${currentLocale}`)
  const featuresUrl = withBasePath(`/${currentLocale}#features`)
  const programsUrl = withBasePath(`/${currentLocale}#programs`)
  const screenshotsUrl = withBasePath(`/${currentLocale}#screenshots`)
  const contactUrl = withBasePath(`/${currentLocale}#contact`)
  const articlesUrl = withBasePath(`/${currentLocale}/articles`)
  const glossaryUrl = withBasePath(`/${currentLocale}/medical-glossary`)
  const contributeUrl = withBasePath(`/${currentLocale}/contribute`)
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
      const res = await fetch(withBasePath('/api/newsletter/subscribe'), {
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
    <footer >
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
          <Link href={homeUrl}>Home</Link>
          <a href={featuresUrl}>Features</a>
          <a href={programsUrl}>Programs</a>
          <a href={screenshotsUrl}>Screenshots</a>
          <a href={contactUrl}>Contact</a>
          <Link href={articlesUrl}>Health Articles</Link>
          <Link href={glossaryUrl}>Medical Glossary</Link>
          <Link href={contributeUrl}>Join Us &amp; Contribute</Link>
        </div>

        {/* Support */}
        <div className="footer-links-col">
          <h3>Support</h3>
          <a href={HELP_CENTER_URL} target="_blank" rel="noopener noreferrer">
            Help Center
          </a>
          <a href={contactUrl}>Contact Us</a>
          <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">
            Feedback
          </a>
          <a
            href="https://ultimatehealth.blog/api/docs"
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
            <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href={TERMS_OF_USE_URL} target="_blank" rel="noopener noreferrer">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
