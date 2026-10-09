"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { PageWrapper } from "@/components/layout";
import { withBasePath } from "@/lib/basePath";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const SECTION_IDS = [
  "purpose",
  "what-we-do",
  "storyboard",
  "screenshots",
  "programs",
  "portals",
  "contact",
];

export default function SiteHeader({ tracking_id }: { tracking_id?: string[] }) {
  const tNav = useTranslations("nav");
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isArticles = pathname.includes("/articles");
  const isPodcasts = pathname.includes("/podcasts");
  const isGlossary = pathname.includes("/medical-glossary");
  const isContribute =
    pathname.includes("/contribute") ||
    pathname.includes("/our-contributors") ||
    pathname.includes("/contributors");
  const isHome = !isArticles && !isPodcasts && !isGlossary && !isContribute;

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section observer ──
  useEffect(() => {
    const targetIds = tracking_id && tracking_id.length > 0 ? tracking_id : SECTION_IDS;
    const observers = targetIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [tracking_id]);

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (el) {
      // Element exists on this page — prevent navigation and scroll smoothly
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    } else {
      // Element is NOT on this page — let the Link navigate normally.
      // The ScrollToHash component in the layout will handle smooth scroll on arrival.
      setMobileMenuOpen(false);
    }
  };

  const openTour = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-uh-tour"));
  };

  return (
    <header
      className={`header font-vice ${
        scrolled
          ? " scrolled bg-[#0b0b12]/95 border-b border-[#252538] backdrop-blur-md"
          : "bg-[#0b0b12]/75 backdrop-blur-md border-b border-white/5"
      }`}
      id="header"
    >
      <PageWrapper as="div" className="nav">
        {/* Logo */}
        <Link href="/" className="logo flex items-center gap-2.5">
          <div className="logo-icon">
            <Image
              src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
              alt="UltimateHealth Logo"
              width={38}
              height={38}
              priority
            />
          </div>
          <span className="font-vice font-black tracking-widest text-lg text-white">
            ULTIMATE<span className="text-[#00e5ff]">HEALTH</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link
              href="/#purpose"
              onClick={(e) => handleScrollTo("purpose", e)}
              className={`nav-link-item${isHome && activeSection === "purpose" ? " active" : ""}`}
              aria-current={isHome && activeSection === "purpose" ? "location" : undefined}
            >
              <i className="fas fa-heart nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("purpose")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/#what-we-do"
              onClick={(e) => handleScrollTo("what-we-do", e)}
              className={`nav-link-item${isHome && activeSection === "what-we-do" ? " active" : ""}`}
              aria-current={isHome && activeSection === "what-we-do" ? "location" : undefined}
            >
              <i className="fas fa-wand-sparkles nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("whatWeDo")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              className={`nav-link-item${isArticles ? " active" : ""}`}
              aria-current={isArticles ? "page" : undefined}
            >
              <i className="fas fa-file-lines nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("articles")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/podcasts"
              className={`nav-link-item${isPodcasts ? " active" : ""}`}
              aria-current={isPodcasts ? "page" : undefined}
            >
              <i className="fas fa-podcast nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("podcasts")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/medical-glossary"
              className={`nav-link-item${isGlossary ? " active" : ""}`}
              aria-current={isGlossary ? "page" : undefined}
            >
              <i className="fas fa-book-medical nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("glossary")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contribute"
              className={`nav-link-item${isContribute ? " active" : ""}`}
              aria-current={isContribute ? "page" : undefined}
            >
              <i className="fas fa-users nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("joinUs")}</span>
            </Link>
          </li>

          {/* Tools & CTA */}
          <li style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "6px" }}>
            <LanguageSwitcher />
            <ModeToggle />
          </li>
          <li style={{ display: "flex", alignItems: "center", marginLeft: "4px" }}>
            <button
              type="button"
              onClick={openTour}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "rgba(0, 229, 255, 0.12)",
                border: "1px solid rgba(0, 229, 255, 0.35)",
                color: "#00e5ff",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#00e5ff";
                (e.currentTarget as HTMLElement).style.color = "#0c0c14";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 16px rgba(0,229,255,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(0, 229, 255, 0.12)";
                (e.currentTarget as HTMLElement).style.color = "#00e5ff";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Play style={{ width: 12, height: 12, fill: "currentColor" }} />
              <span>{tNav("startTour")}</span>
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`} />
        </button>
      </PageWrapper>

      {/* Mobile Menu Drawer */}
      <nav className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
        <button
          type="button"
          onClick={openTour}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(0, 229, 255, 0.12)",
            border: "1px solid rgba(0, 229, 255, 0.4)",
            color: "#00e5ff",
            fontSize: "0.8125rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            cursor: "pointer",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          <Play style={{ width: 14, height: 14, fill: "currentColor" }} />
          <span>{tNav("startTour")}</span>
        </button>
        <Link href="/#purpose" onClick={(e) => handleScrollTo("purpose", e)}>
          {tNav("purpose")}
        </Link>
        <Link href="/#what-we-do" onClick={(e) => handleScrollTo("what-we-do", e)}>
          {tNav("whatWeDo")}
        </Link>
        <Link href="/articles" onClick={() => setMobileMenuOpen(false)}>
          {tNav("articles")}
        </Link>
        <Link href="/podcasts" onClick={() => setMobileMenuOpen(false)}>
          {tNav("podcasts")}
        </Link>
        <Link
          href="/medical-glossary"
          onClick={() => setMobileMenuOpen(false)}
        >
          {tNav("glossary")}
        </Link>
        <Link href="/contribute" onClick={() => setMobileMenuOpen(false)}>
          {tNav("joinUs")}
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            padding: "12px 0 4px",
          }}
        >
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
