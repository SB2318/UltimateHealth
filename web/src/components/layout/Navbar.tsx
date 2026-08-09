'use client'

import Image from 'next/image'
import Link from 'next/link'
import '../../app/globals.css'

import { PageWrapper } from '../layout'

import { withBasePath } from '@/lib/basePath'
import { ModeToggle } from '@/components/mode-toggle'
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Navbar(props: { tracking_id: string[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const TRACKED_SECTION_IDS = props.tracking_id || [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!TRACKED_SECTION_IDS.length) return;

    const visibleSections = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id)
          } else {
            visibleSections.delete(entry.target.id)
          }
        })

        if (visibleSections.size > 0) {
          const topSection = TRACKED_SECTION_IDS.filter((id: string) =>
            visibleSections.has(id),
          )
            .map((id: string) => ({
              id,
              top:
                document.getElementById(id)?.getBoundingClientRect().top ??
                Infinity,
            }))
            .sort((a: { top: number }, b: { top: number }) => Math.abs(a.top) - Math.abs(b.top))[0]

          if (topSection) setActiveSection(topSection.id)
        } else {
          setActiveSection('')
        }
      },
      { threshold: 0.3 },
    )

    TRACKED_SECTION_IDS.forEach((id: string) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [TRACKED_SECTION_IDS])

  return (
    <>
      <header
        className={`header${scrolled ? ' scrolled' : ''} bg-white dark:bg-slate-900 transition-colors duration-300 h-[80px]`}
        id="header"
      >
        <PageWrapper as="div" className="nav">
          <Link href={withBasePath('/')} className="logo">
            <div className="logo-icon">
              <Image
                src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
                alt="UltimateHealth Logo"
                width={48}
                height={48}
                priority
              />
            </div>
            Ultimate-Health
          </Link>

          <ul className="nav-links text-black dark:text-white">
            <li>
              <a
                href={withBasePath('/#features')}
                className={`nav-link-item${activeSection === 'features' ? ' active' : ''}`}
              >
                <i className="fas fa-star nav-item-icon" aria-hidden="true"></i>
                <span className="nav-item-text ">Platform Highlights</span>
              </a>
            </li>
            <li>
              <a
                href={withBasePath('/#screenshots')}
                className={`nav-link-item${activeSection === 'screenshots' ? ' active' : ''}`}
              >
                <i
                  className="fas fa-image nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Screenshots</span>
              </a>
            </li>
            <li>
              <a
                href={withBasePath('/#programs')}
                className={`nav-link-item${activeSection === 'programs' ? ' active' : ''}`}
              >
                <i
                  className="fas fa-code-branch nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Community Programs</span>
              </a>
            </li>
            <li>
              <Link href={withBasePath('/articles')} className="nav-link-item">
                <i
                  className="fas fa-file-lines nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Read Articles</span>
              </Link>
            </li>
            <li>
              <Link
                href={withBasePath('/medical-glossary')}
                className="nav-link-item"
              >
                <i
                  className="fas fa-book-medical nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Medical Glossary</span>
              </Link>
            </li>
            <li>
              <Link href={withBasePath('/contribute')} className="nav-link-item">
                <i
                  className="fas fa-users nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Join Us to Contribute</span>
              </Link>
            </li>

            {/* Desktop Language Switcher and Theme Toggle */}
            <li className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </li>

            <li>
              <a href={withBasePath('/#downloads')} className="nav-btn-sm">
                <i className="fas fa-user" aria-hidden="true"></i>
                <span>Login / Register</span>
              </a>
            </li>
          </ul>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
          >
            <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </PageWrapper>

        <nav className={`mobile-nav${mobileMenuOpen ? ' open' : ''}`}>
          <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>
            Screenshots
          </a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>
            Platform Highlights
          </a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>
            Community Programs
          </a>
          <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>
            Read Articles
          </a>
          <Link
            href="/medical-glossary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Medical Glossary
          </Link>
          <Link href="/contribute" onClick={() => setMobileMenuOpen(false)}>
            Join Us to Contribute
          </Link>
          <a href="#downloads" onClick={() => setMobileMenuOpen(false)}>
            Login / Register
          </a>

          {/* Put this EXACTLY here in your Navbar.tsx */}
          <li style={{ background: "red", padding: "10px", color: "white", zIndex: 9999 }}>
            URGENT VISIBILITY TEST
          </li>

          <li className="flex items-center gap-2">
            {/* <LanguageSwitcher /> */}
            <ModeToggle />
          </li>

          {/* Mobile Language Switcher and Theme Toggle */}
          <div className="flex justify-center items-center gap-4 py-4 mt-2 border-t border-gray-200 dark:border-gray-800">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  )
}