"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PageWrapper } from "./index";
import { useActiveRoute } from "@/hooks/use-active-route";
import { withBasePath } from "@/lib/basePath";

interface NavbarProps {
  /**
   * Id of the in-page section currently in view, used only on the homepage
   * to highlight the matching anchor link (e.g. "features", "screenshots",
   * "programs"). Leave undefined on pages that don't have these sections —
   * no link will be marked active, which is correct there.
   */
  activeSection?: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRouteActive = useActiveRoute();

  // Route-based entries stay highlighted for the whole section, so "Read
  // Articles" also reads as active on an individual article page.
  const articlesActive = isRouteActive("/articles");
  const glossaryActive = isRouteActive("/medical-glossary");
  const contributeActive = isRouteActive("/contribute");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              href={withBasePath("/#features")}
              className={`nav-link-item${activeSection === "features" ? " active" : ""}`}
              aria-current={activeSection === "features" ? "location" : undefined}
            >
              <i className="fas fa-star nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Platform Highlights</span>
            </a>
          </li>
          <li>
            <a
              href={withBasePath("/#screenshots")}
              className={`nav-link-item${activeSection === "screenshots" ? " active" : ""}`}
              aria-current={activeSection === "screenshots" ? "location" : undefined}
            >
              <i className="fas fa-image nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Screenshots</span>
            </a>
          </li>
          <li>
            <a
              href={withBasePath("/#programs")}
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
              className={`nav-link-item${articlesActive ? " active" : ""}`}
              aria-current={articlesActive ? "page" : undefined}
            >
              <i className="fas fa-file-lines nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Read Articles</span>
            </Link>
          </li>
          <li>
            <Link
              href={withBasePath("/medical-glossary")}
              className={`nav-link-item${glossaryActive ? " active" : ""}`}
              aria-current={glossaryActive ? "page" : undefined}
            >
              <i className="fas fa-book-medical nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Medical Glossary</span>
            </Link>
          </li>
          <li>
            <Link
              href={withBasePath("/contribute")}
              className={`nav-link-item${contributeActive ? " active" : ""}`}
              aria-current={contributeActive ? "page" : undefined}
            >
              <i className="fas fa-users nav-item-icon" aria-hidden="true"></i>
              <span className="nav-item-text">Join Us to Contribute</span>
            </Link>
          </li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <ModeToggle />
          </li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <a href={withBasePath("/#downloads")} className="nav-btn-sm">
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
        <a href={withBasePath("/#screenshots")} onClick={() => setMobileMenuOpen(false)}>Screenshots</a>
        <a href={withBasePath("/#features")} onClick={() => setMobileMenuOpen(false)}>Platform Highlights</a>
        <a href={withBasePath("/#programs")} onClick={() => setMobileMenuOpen(false)}>Community Programs</a>
        <Link
          href={withBasePath("/articles")}
          className={articlesActive ? "active" : undefined}
          aria-current={articlesActive ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          Read Articles
        </Link>
        <Link
          href={withBasePath("/medical-glossary")}
          className={glossaryActive ? "active" : undefined}
          aria-current={glossaryActive ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          Medical Glossary
        </Link>
        <Link
          href={withBasePath("/contribute")}
          className={contributeActive ? "active" : undefined}
          aria-current={contributeActive ? "page" : undefined}
          onClick={() => setMobileMenuOpen(false)}
        >
          Join Us to Contribute
        </Link>
        <a href={withBasePath("/#downloads")} onClick={() => setMobileMenuOpen(false)}>Login / Register</a>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
