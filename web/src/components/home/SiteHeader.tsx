"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { PageWrapper } from "@/components/layout";
import { withBasePath } from "@/lib/basePath";

const SECTION_IDS = ["features", "screenshots", "programs", "contact"];

/**
 * Fixed site header. Interactive (scroll state, scroll-spy, mobile menu), so it
 * is one of the few parts of the landing page that ships to the client.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section observer ──
  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <PageWrapper as="div" className="nav">
        <Link href={withBasePath("/")} className="logo">
          <div className="logo-icon">
            <Image
              src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
              alt="UltimateHealth Logo" width={48} height={48}
              priority
            />
          </div>
          Ultimate-Health
        </Link>

        <ul className="nav-links">
          <li>
            <a
              href="#features"
              className={`nav-link-item${activeSection === "features" ? " active" : ""}`}
              aria-current={activeSection === "features" ? "location" : undefined}
            >
              <i className="fas fa-star nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Platform Highlights</span>
            </a>
          </li>
          <li>
            <a
              href="#screenshots"
              className={`nav-link-item${activeSection === "screenshots" ? " active" : ""}`}
              aria-current={activeSection === "screenshots" ? "location" : undefined}
            >
              <i className="fas fa-image nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">App Experience</span>
            </a>
          </li>
          <li>
            <a
              href="#programs"
              className={`nav-link-item${activeSection === "programs" ? " active" : ""}`}
              aria-current={activeSection === "programs" ? "location" : undefined}
            >
              <i className="fas fa-code-branch nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Community Programs</span>
            </a>
          </li>
          <li>
            <Link href={withBasePath("/articles")} className="nav-link-item">
              <i className="fas fa-file-lines nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Read Articles</span>
            </Link>
          </li>
          <li>
            <Link href={withBasePath("/medical-glossary")} className="nav-link-item">
              <i className="fas fa-book-medical nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Medical Glossary</span>
            </Link>
          </li>
          <li>
            <Link href={withBasePath("/contribute")} className="nav-link-item">
              <i className="fas fa-users nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Join Us to Contribute</span>
            </Link>
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <ModeToggle />
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <a href="#downloads" className="nav-btn-sm">
              <i className="fas fa-user" aria-hidden="true"></i>
              <span>Login / Register</span>
            </a>
          </li>
        </ul>

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen((o) => !o)} aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen}>
          <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`}></i>
        </button>
      </PageWrapper>

      <nav className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
        <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>App Experience</a>
        <a href="#features" onClick={() => setMobileMenuOpen(false)}>Platform Highlights</a>
        <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Community Programs</a>
        <Link href={withBasePath("/articles")} onClick={() => setMobileMenuOpen(false)}>Read Articles</Link>
        <Link href={withBasePath("/medical-glossary")} onClick={() => setMobileMenuOpen(false)}>Medical Glossary</Link>
        <Link href={withBasePath("/contribute")} onClick={() => setMobileMenuOpen(false)}>Join Us to Contribute</Link>
        <a href="#downloads" onClick={() => setMobileMenuOpen(false)}>Login / Register</a>
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
