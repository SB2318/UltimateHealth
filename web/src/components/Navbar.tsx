"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageWrapper } from "./layout";
import { ModeToggle } from "@/components/mode-toggle";
import { withBasePath } from "@/lib/basePath";

const TRACKED_SECTION_IDS = ["screenshots", "features", "programs", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (visibleSections.size > 0) {
          const topSection = TRACKED_SECTION_IDS
            .filter((id) => visibleSections.has(id))
            .map((id) => ({
              id,
              top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity,
            }))
            .sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0];

          if (topSection) setActiveSection(topSection.id);
        } else {
          setActiveSection("");
        }
      },
      { threshold: 0.3 }
    );

    TRACKED_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
          <li className="nav-toggle-item">
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