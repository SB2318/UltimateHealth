'use client'

import Image from 'next/image'
import Link from 'next/link'

import { PageWrapper } from '../layout'

import { withBasePath } from '@/lib/basePath'
import { ModeToggle } from '@/components/mode-toggle'
import { useActiveRoute } from '@/hooks/use-active-route'
import { useEffect, useMemo, useState } from 'react'

export const Navbar = (props: { tracking_id: string[] }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const isRouteActive = useActiveRoute()

  // Route-based entries stay highlighted for the whole section, so "Read
  // Articles" also reads as active on an individual article page.
  const articlesActive = isRouteActive('/articles')
  const glossaryActive = isRouteActive('/medical-glossary')
  const contributeActive = isRouteActive('/contribute')
  // useMemo stabilises the array reference so the IntersectionObserver
  // effect below doesn't re-run on every render (avoids infinite loop).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const TRACKED_SECTION_IDS = useMemo(() => props.tracking_id, [JSON.stringify(props.tracking_id)])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
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
                href={withBasePath('/#feature')}
                className={`nav-link-item${activeSection === 'features' ? ' active' : ''}`}
                aria-current={
                  activeSection === 'features' ? 'location' : undefined
                }
              >
                <i className="fas fa-star nav-item-icon" aria-hidden="true"></i>
                <span className="nav-item-text ">Platform Highlights</span>
              </a>
            </li>
            <li>
              <a
                 href={withBasePath('/#screenshots')}
                 className={`nav-link-item${activeSection === 'screenshots' ? ' active' : ''}`}
                 aria-current={
                   activeSection === 'screenshots' ? 'location' : undefined
                  }
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
                aria-current={
                  activeSection === 'programs' ? 'location' : undefined
                }
              >
                <i
                  className="fas fa-code-branch nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Community Programs</span>
              </a>
            </li>
            <li>
              <Link
                href={withBasePath('/articles')}
                className={`nav-link-item${articlesActive ? ' active' : ''}`}
                aria-current={articlesActive ? 'page' : undefined}
              >
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
                className={`nav-link-item${glossaryActive ? ' active' : ''}`}
                aria-current={glossaryActive ? 'page' : undefined}
              >
                <i
                  className="fas fa-book-medical nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Medical Glossary</span>
              </Link>
            </li>
            <li>
              <Link
                href={withBasePath('/contribute')}
                className={`nav-link-item${contributeActive ? ' active' : ''}`}
                aria-current={contributeActive ? 'page' : undefined}
              >
                <i
                  className="fas fa-users nav-item-icon"
                  aria-hidden="true"
                ></i>
                <span className="nav-item-text">Join Us to Contribute</span>
              </Link>
            </li>
            <ModeToggle />
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
          <a
            href={withBasePath('/#screenshots')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Screenshots
          </a>
          <a
            href={withBasePath('/#features')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Platform Highlights
          </a>
          <a
            href={withBasePath('/#programs')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Community Programs
          </a>
          <Link
            href={withBasePath('/articles')}
            className={articlesActive ? 'active' : undefined}
            aria-current={articlesActive ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
          >
            Read Articles
          </Link>
          <Link
            href={withBasePath('/medical-glossary')}
            className={glossaryActive ? 'active' : undefined}
            aria-current={glossaryActive ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
          >
            Medical Glossary
          </Link>
          <Link
            href={withBasePath('/contribute')}
            className={contributeActive ? 'active' : undefined}
            aria-current={contributeActive ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
          >
            Join Us to Contribute
          </Link>
          <a
            href={withBasePath('/#downloads')}
            onClick={() => setMobileMenuOpen(false)}
          >
            Login / Register
          </a>
        </nav>
      </header>
    </>
  )
}
