"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/basePath";
import PageWrapper from "./PageWrapper";

const TRACKED_SECTION_IDS = ["screenshots", "features", "programs", "contact"];
const CURSOR_GLOW_STORAGE_KEY = "cursorGlowEnabled";
const CURSOR_GLOW_EVENT = "cursor-glow-preference-change";

const getCursorGlowSnapshot = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CURSOR_GLOW_STORAGE_KEY) === "true";
};

const subscribeToCursorGlow = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.storageArea === window.localStorage && event.key === CURSOR_GLOW_STORAGE_KEY) {
      callback();
    }
  };
  const onCustomEvent: EventListener = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(CURSOR_GLOW_EVENT, onCustomEvent);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CURSOR_GLOW_EVENT, onCustomEvent);
  };
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const isHomepage = pathname === "/" || pathname === "";

  // ── Cursor glow (for potential interaction/toggle, synced with local storage) ──
  const cursorGlowEnabled = useSyncExternalStore(
    subscribeToCursorGlow,
    getCursorGlowSnapshot,
    () => false
  );

  const toggleCursorGlow = () => {
    const nextVal = !cursorGlowEnabled;
    localStorage.setItem(CURSOR_GLOW_STORAGE_KEY, String(nextVal));
    window.dispatchEvent(new Event(CURSOR_GLOW_EVENT));
  };

  // ── Scroll header ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (!isHomepage) {
      return;
    }

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

    return () => {
      observer.disconnect();
      setActiveSection("");
    };
  }, [isHomepage]);

  const getLinkHref = (hash: string) => {
    return isHomepage ? hash : withBasePath(`/${hash}`);
  };

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <PageWrapper as="div" className="nav">
        <Link href={withBasePath("/")} className="logo">
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

        <ul className="nav-links">
          <li>
            <a
              href={getLinkHref("#features")}
              className={`nav-link-item${activeSection === "features" ? " active" : ""}`}
              aria-current={activeSection === "features" ? "location" : undefined}
            >
              <i className="fas fa-star nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Platform Highlights</span>
            </a>
          </li>
          <li>
            <a
              href={getLinkHref("#screenshots")}
              className={`nav-link-item${activeSection === "screenshots" ? " active" : ""}`}
              aria-current={activeSection === "screenshots" ? "location" : undefined}
            >
              <i className="fas fa-image nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Screenshots</span>
            </a>
          </li>
          <li>
            <a
              href={getLinkHref("#programs")}
              className={`nav-link-item${activeSection === "programs" ? " active" : ""}`}
              aria-current={activeSection === "programs" ? "location" : undefined}
            >
              <i className="fas fa-code-branch nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Community Programs</span>
            </a>
          </li>
          <li>
            <Link
              href={withBasePath("/articles")}
              className={`nav-link-item${pathname?.startsWith("/articles") ? " active" : ""}`}
            >
              <i className="fas fa-file-lines nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Read Articles</span>
            </Link>
          </li>
          <li>
            <Link
              href={withBasePath("/medical-glossary")}
              className={`nav-link-item${pathname?.startsWith("/medical-glossary") ? " active" : ""}`}
            >
              <i className="fas fa-book-medical nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Medical Glossary</span>
            </Link>
          </li>
          <li>
            <Link
              href={withBasePath("/contribute")}
              className={`nav-link-item${pathname?.startsWith("/contribute") ? " active" : ""}`}
            >
              <i className="fas fa-users nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Join Us to Contribute</span>
            </Link>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={toggleCursorGlow}
              className={`glow-toggle-btn${cursorGlowEnabled ? " glow-on" : ""}`}
              data-tooltip="Toggle DNA Cursor Glow"
              aria-label="Toggle DNA Cursor Glow"
            >
              <i className="fas fa-dna" aria-hidden="true" />
            </button>
            <a href={getLinkHref("#downloads")} className="nav-btn-sm">
              <i className="fas fa-user" aria-hidden="true"></i>
              <span>Login / Register</span>
            </a>
          </li>
        </ul>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`}></i>
        </button>
      </PageWrapper>

      <nav className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
        <a href={getLinkHref("#screenshots")} onClick={() => setMobileMenuOpen(false)}>
          Screenshots
        </a>
        <a href={getLinkHref("#features")} onClick={() => setMobileMenuOpen(false)}>
          Platform Highlights
        </a>
        <a href={getLinkHref("#programs")} onClick={() => setMobileMenuOpen(false)}>
          Community Programs
        </a>
        <Link href={withBasePath("/articles")} onClick={() => setMobileMenuOpen(false)}>
          Read Articles
        </Link>
        <Link href={withBasePath("/medical-glossary")} onClick={() => setMobileMenuOpen(false)}>
          Medical Glossary
        </Link>
        <Link href={withBasePath("/contribute")} onClick={() => setMobileMenuOpen(false)}>
          Join Us to Contribute
        </Link>
        <a href={getLinkHref("#downloads")} onClick={() => setMobileMenuOpen(false)}>
          Login / Register
        </a>
      </nav>
    </header>
  );
}
