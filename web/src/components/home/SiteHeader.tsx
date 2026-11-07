"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ModeToggle } from "@/components/mode-toggle";
import { PageWrapper } from "@/components/layout";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const SECTION_IDS = [
  "purpose",
  "what-we-do",
  "storyboard",
  "apps",
  "programs",
  "portals",
  "contact",
];

export default function SiteHeader({ tracking_id }: { tracking_id?: string[] }) {
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const articlesHref = `/${locale}/articles`;
  const podcastsHref = `/${locale}/podcasts`;
  const glossaryHref = `/${locale}/medical-glossary`;
  const contributeHref = `/${locale}/contribute`;
  const appsHref = `/${locale}/apps`;
  
  const isArticles = pathname.includes("/articles");
  const isPodcasts = pathname.includes("/podcasts");
  const isGlossary = pathname.includes("/medical-glossary");
  const isApps = pathname.includes("/apps");
    const isContribute =
    pathname.includes("/contribute") ||
    pathname.includes("/our-contributors") ||
    pathname.includes("/contributors");
  const isHome = !isArticles && !isPodcasts && !isGlossary && !isContribute && !isApps ;

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
      // Element is NOT on this page — let the Link navigate normally to /${locale}#${id}
      setMobileMenuOpen(false);
    }
  };

  const openTour = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-explore-platform-modal"));
    window.dispatchEvent(new CustomEvent("open-explore-platform"));
    window.dispatchEvent(new CustomEvent("open-uh-tour"));
  };

  return (
    <header
      className={`header font-vice w-full ${
        scrolled
          ? " scrolled bg-white/95 dark:bg-[#0b0b12]/95 border-b border-slate-200 dark:border-[#252538] backdrop-blur-md"
          : "bg-white/80 dark:bg-[#0b0b12]/75 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5"
      }`}
      id="header"
    >
      <PageWrapper as="div" className="nav">
        {/* Logo */}
        <Link href={`/${locale}`} className="logo flex items-center gap-2.5">
          <div className="logo-icon">
            <Image
              src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
              alt="UltimateHealth Logo"
              width={38}
              height={38}
              priority
            />
          </div>
          <span className="font-vice font-black tracking-widest text-lg text-slate-900 dark:text-white">
            ULTIMATE<span className="text-[#0d9488] dark:text-[#00e5ff]">HEALTH</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            marginLeft: "clamp(24px, 3.8vw, 60px)",
            gap: "clamp(12px, 1.8vw, 30px)",
          }}
        >
          <li>
            <Link
              href={`/${locale}#purpose`}
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
              href={`/${locale}#what-we-do`}
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
              href={articlesHref}
              className={`nav-link-item${isArticles ? " active" : ""}`}
              aria-current={isArticles ? "page" : undefined}
            >
              <i className="fas fa-file-lines nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("articles")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={podcastsHref}
              className={`nav-link-item${isPodcasts ? " active" : ""}`}
              aria-current={isPodcasts ? "page" : undefined}
            >
              <i className="fas fa-podcast nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("podcasts")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={glossaryHref}
              className={`nav-link-item${isGlossary ? " active" : ""}`}
              aria-current={isGlossary ? "page" : undefined}
            >
              <i className="fas fa-book-medical nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("glossary")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={appsHref}
              className={`nav-link-item${isApps ? " active" : ""}`}
              aria-current={isApps ? "page" : undefined}
            >
              <i className="fas fa-mobile-screen-button nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("apps")}</span>
            </Link>
          </li>
          <li>
            <Link
              href={contributeHref}
              className={`nav-link-item${isContribute ? " active" : ""}`}
              aria-current={isContribute ? "page" : undefined}
            >
              <i className="fas fa-users nav-item-icon" aria-hidden="true" />
              <span className="nav-item-text">{tNav("joinUs")}</span>
            </Link>
          </li>

          {/* Tools & CTA */}
          <li style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }}>
            <LanguageSwitcher />
            <ModeToggle />
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
        <Link href={`/${locale}#purpose`} onClick={(e) => handleScrollTo("purpose", e)}>
          {tNav("purpose")}
        </Link>
        <Link href={`/${locale}#what-we-do`} onClick={(e) => handleScrollTo("what-we-do", e)}>
          {tNav("whatWeDo")}
        </Link>
        <Link href={articlesHref} onClick={() => setMobileMenuOpen(false)}>
          {tNav("articles")}
        </Link>
        <Link href={podcastsHref} onClick={() => setMobileMenuOpen(false)}>
          {tNav("podcasts")}
        </Link>
        <Link
          href={glossaryHref}
          onClick={() => setMobileMenuOpen(false)}
        >
          {tNav("glossary")}
        </Link>
        <Link href={appsHref} onClick={() => setMobileMenuOpen(false)}>
          {tNav("apps")}
        </Link>
        <Link href={contributeHref} onClick={() => setMobileMenuOpen(false)}>
          {tNav("joinUs")}
        </Link>
        <button
          type="button"
          onClick={openTour}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/40 border border-teal-500/30 dark:border-cyan-400/30 my-2 cursor-pointer"
        >
          <Play style={{ width: 12, height: 12, fill: "currentColor" }} />
          <span>{tNav("startTour")}</span>
        </button>
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
