'use client'

import Link from 'next/link'

import { PageWrapper } from '../layout'
import NewsletterForm from '../home/NewsletterForm'

import { withBasePath } from '@/lib/basePath'

import {
  FEEDBACK_URL,
  HELP_CENTER_URL,
  INSTAGRAM_URL,
  PRIVACY_POLICY_URL,
  TELEGRAM_URL,
  TERMS_OF_USE_URL,
} from '@/lib/site-config'

export const Footer = () => {
  return (
    <footer >
      <PageWrapper className="footer-grid">
        {/* Brand column */}
        <div className="footer-brand">
          <h2>UltimateHealth</h2>
          <p className="footer-note">
            Open-source health and wellness for everyone.
          </p>

          {/* Newsletter — delegates to the shared NewsletterForm island */}
          <NewsletterForm />

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
          <a href={withBasePath('#features')}>Features</a>
          <a href={withBasePath('#programs')}>Programs</a>
          <a href={withBasePath('#screenshots')}>Screenshots</a>
          <a href={withBasePath('#contact')}>Contact</a>
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
