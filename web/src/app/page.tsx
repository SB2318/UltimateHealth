"use client";

import Image from "next/image";
import Link from "next/link";
import "./globals.css";

import { type RefObject, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import HeroAndDownload from "../components/HeroAndDownload";
import ScrollToTop from "../components/ScrollToTop";

import { PageWrapper, Section } from "../components/layout";

import { withBasePath } from "@/lib/basePath";
import { Skeleton } from "../components/ui";


const userScreenshots = [
  { src: "/assets/article-home-screen.jpeg", caption: "Home Screen" },
  { src: "/assets/article-detail-screen.jpeg", caption: "Reading View" },
  { src: "/assets/article-discussion-screen-for-user.jpeg", caption: "Article Discussion" },
  { src: "/assets/article-writing-screen.jpeg", caption: "Writing Form" },
  { src: "/assets/article-writing-screen-2.jpeg", caption: "Select Language" },
  { src: "/assets/podcast-form.jpeg", caption: "Podcast Form" },
  { src: "/assets/podcast-list-screen.jpeg", caption: "Podcast Listing" },
  { src: "/assets/podcast-play-screen.jpeg", caption: "Podcast Player" },
  { src: "/assets/podcast-play-screen-2.jpeg", caption: "Podcast Player" },
  { src: "/assets/podcast-recording.jpeg", caption: "Podcast Recorder" },
  { src: "/assets/podcast-upload.jpeg", caption: "Podcast Upload" },
  { src: "/assets/notification-screen.jpeg", caption: "Notification" },
  { src: "/assets/UltimateHealth-about.jpeg", caption: "App Info" },
  { src: "/assets/terms_cond_page.jpeg", caption: "Terms And Condition" },
];

const adminScreenshots = [
  { src: "/assets/admin_dashboard.jpeg", caption: "Admin Dashboard" },
  { src: "/assets/admin_dashboard2.jpeg", caption: "Admin Dashboard Second" },
  { src: "/assets/article_view_unassign.jpeg", caption: "Article View Unassign" },
  { src: "/assets/article_view_unassign1.jpeg", caption: "Article View Unassign" },
  { src: "/assets/article_view_assign.jpeg", caption: "Article View Assign" },
  { src: "/assets/article_action.jpeg", caption: "Article Action" },
  { src: "/assets/podcast_action.jpeg", caption: "Podcast Action" },
  { src: "/assets/podcast_live.jpeg", caption: "Podcast Live State" },
  { src: "/assets/admin_insights.jpeg", caption: "Admin Insights" },
];

const allScreenshots = [...userScreenshots, ...adminScreenshots];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://uhsocial.in";
const CURSOR_GLOW_STORAGE_KEY = "cursorGlowEnabled";
const CURSOR_GLOW_EVENT = "cursor-glow-preference-change";
// Owner-configurable frontend URLs (set in deployment env when needed)
const HELP_CENTER_URL = process.env.NEXT_PUBLIC_HELP_CENTER_URL || "https://uhsocial.in/docs";
const FEEDBACK_URL = process.env.NEXT_PUBLIC_FEEDBACK_URL || "https://github.com/SB2318/UltimateHealth/issues";
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
const PRIVACY_POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "#";
const TERMS_OF_USE_URL = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL || "#";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLIDER_SCROLL_AMOUNT = 324;
const DNA_TRAIL_MAX_POINTS = 38;
const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim());

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

const TRACKED_SECTION_IDS = ["screenshots", "features", "programs", "contact"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState(false);
  const [appleModal, setAppleModal] = useState(false);
  const [testerEmail, setTesterEmail] = useState("");
  const [testerSuccess, setTesterSuccess] = useState(false);
  const [screenshotModal, setScreenshotModal] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [userSliderOpen, setUserSliderOpen] = useState(true);
  const [adminSliderOpen, setAdminSliderOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [featuresLoading, setFeaturesLoading] = useState(true);

  // ── DNA helix cursor ──
  const cursorGlowEnabled = useSyncExternalStore(
    subscribeToCursorGlow,
    getCursorGlowSnapshot,
    () => false
  );
  const dnaCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dnaAnimRef = useRef<number | null>(null);
  const dnaEnabledRef = useRef(false);

  // ── Contact form state ──
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // ── Newsletter state ──
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error"| "invalid" | "empty" | "duplicate">("idle");

  const userSliderRef = useRef<HTMLDivElement>(null);
  const adminSliderRef = useRef<HTMLDivElement>(null);

  const openComingSoonModal = useCallback(() => {
    setComingSoonModal(true);
  }, []);

  const closeComingSoonModal = useCallback(() => {
    setComingSoonModal(false);
  }, []);

  const openAppleModal = useCallback(() => {
    setAppleModal(true);
  }, []);

  const closeAppleModal = useCallback(() => {
    setAppleModal(false);
    setTesterSuccess(false);
    setTesterEmail("");
  }, []);

  useEffect(() => {
    dnaEnabledRef.current = cursorGlowEnabled;
    if (dnaCanvasRef.current) {
      dnaCanvasRef.current.style.opacity = cursorGlowEnabled ? "1" : "0";
    }
  }, [cursorGlowEnabled]);

  // ── DNA Helix Cursor Effect ──
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) { document.body.classList.add("touch-device"); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "dna-cursor-canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    dnaCanvasRef.current = canvas;

    const saved = getCursorGlowSnapshot();
    dnaEnabledRef.current = saved;
    canvas.style.opacity = saved ? "1" : "0";

    const ctx = canvas.getContext("2d")!;
    const trail: { x: number; y: number; t: number }[] = [];
    let dnaT = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const draw = () => {
      dnaT += 0.06;
      trail.unshift({ x: mouseX, y: mouseY, t: dnaT });
      if (trail.length > DNA_TRAIL_MAX_POINTS) trail.pop();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (dnaEnabledRef.current) {
        trail.forEach((pt, i) => {
          const age = i / trail.length;
          const alpha = (1 - age) * 0.92;
          const dotR = (1 - age) * 5.5 + 1;
          const offset = Math.sin(pt.t * 2.2) * 14 * (1 - age * 0.4);

          ctx.beginPath();
          ctx.arc(pt.x + offset, pt.y, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14,165,233,${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x - offset, pt.y, dotR * 0.72, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56,189,248,${alpha * 0.78})`;
          ctx.fill();

          if (i % 4 === 0 && i + 4 < trail.length) {
            ctx.beginPath();
            ctx.moveTo(pt.x + offset, pt.y);
            ctx.lineTo(pt.x - offset, pt.y);
            ctx.strokeStyle = `rgba(125,211,252,${alpha * 0.38})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }
      dnaAnimRef.current = requestAnimationFrame(draw);
    };

    dnaAnimRef.current = requestAnimationFrame(draw);

    return () => {
      if (dnaAnimRef.current) cancelAnimationFrame(dnaAnimRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      canvas.remove();
      dnaCanvasRef.current = null;
    };
  }, []);

  // ── Scroll header ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Scroll reveal ──
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".fade-in,.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale")
        .forEach((el) => el.classList.add("visible", "revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible", "revealed"); }),
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".fade-in,.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Features loading state ──
  // TODO: Replace this simulated delay with real data fetching (e.g. an API call or
  // a server action) once the features section is backed by dynamic content.
  useEffect(() => {
    const timer = setTimeout(() => setFeaturesLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Active section tracking via IntersectionObserver
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

  // Screenshot keyboard nav
  const navigateScreenshot = useCallback((dir: number) => {
    setCurrentScreenshot((prev) => {
      const next = prev + dir;
      if (next < 0) return allScreenshots.length - 1;
      if (next >= allScreenshots.length) return 0;
      return next;
    });
  }, []);

  const closeScreenshotModal = useCallback(() => {
    setScreenshotModal(false);
  }, []);

  const isAnyModalOpen = comingSoonModal || appleModal || screenshotModal;

  useEffect(() => {
    if (!isAnyModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAnyModalOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (screenshotModal) closeScreenshotModal();
        else if (appleModal) closeAppleModal();
        else if (comingSoonModal) closeComingSoonModal();
      }

      if (screenshotModal && e.key === "ArrowLeft") navigateScreenshot(-1);
      if (screenshotModal && e.key === "ArrowRight") navigateScreenshot(1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    appleModal,
    closeAppleModal,
    closeComingSoonModal,
    closeScreenshotModal,
    comingSoonModal,
    navigateScreenshot,
    screenshotModal,
  ]);

  const openScreenshotModal = (src: string) => {
    const idx = allScreenshots.findIndex((s) => s.src === src);
    setCurrentScreenshot(idx >= 0 ? idx : 0);
    setScreenshotModal(true);
  };

  const handleScreenshotCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, src: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openScreenshotModal(src);
    }
  };

const moveSlider = (ref: RefObject<HTMLDivElement | null>, dir: number) => {
  const slider = ref.current;
  if (!slider) return;

  const maxScroll = slider.scrollWidth - slider.clientWidth;
  const currentScroll = slider.scrollLeft;
  const targetScroll = currentScroll + dir * SLIDER_SCROLL_AMOUNT;

  if (dir === 1) {
    if (currentScroll >= maxScroll) {
      slider.scrollTo({ left: 0, behavior: "auto" });
      return;
    }

    if (targetScroll > maxScroll) {
      slider.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }
  }

  if (dir === -1) {
    if (currentScroll <= 0 || targetScroll < 0) {
      slider.scrollTo({ left: maxScroll, behavior: "auto" });
      return;
    }
  }

  slider.scrollTo({
    left: Math.max(0, Math.min(targetScroll, maxScroll)),
    behavior: "smooth",
  });
};
  useEffect(() => {
    const interval = setInterval(() => {
      moveSlider(userSliderRef, 1);

      if (adminSliderOpen) {
        moveSlider(adminSliderRef, 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [adminSliderOpen]);

  // ── TestFlight invite ──
  const sendTesterEmail = async () => {
    const trimmedTesterEmail = testerEmail.trim();
    if (!isValidEmail(trimmedTesterEmail)) {
      alert("Please enter a valid Apple ID email.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/publishing-related/invite-testflight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "ultimate.health25@gmail.com",
          from: trimmedTesterEmail,
          subject: "New TestFlight Invitation Request",
          body: `User with email ${trimmedTesterEmail} wants to join the iOS TestFlight group.`,
        }),
      });
      if (!response.ok) throw new Error("API Failure");
    } catch {
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=TestFlight Request&body=I would like to be a tester. My email is: ${trimmedTesterEmail}`;
    }
    setTesterSuccess(true);
  };

  // ── Contact form submit → uhsocial.in API ──
  // Backend route needed: POST /api/contact/send on NEXT_PUBLIC_API_BASE_URL
  // See /contact_newsletter_guide.md for the Express route implementation
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedSubject = contactSubject.trim();
    const trimmedMessage = contactMessage.trim();
    if (!trimmedName || !isValidEmail(trimmedEmail) || !trimmedSubject || !trimmedMessage) {
      alert("Please complete the form with a valid email address.");
      return;
    }
    setContactStatus("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setContactStatus("success");
      setContactName(""); setContactEmail(""); setContactSubject(""); setContactMessage("");
    } catch {
      // Fallback: open mailto if API not yet implemented
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=${encodeURIComponent(trimmedSubject)}&body=${encodeURIComponent(`From: ${trimmedName} (${trimmedEmail})\n\n${trimmedMessage}`)}`;
      setContactStatus("error");
    }
  };

  // ── Newsletter subscribe ──
  // Backend route needed: POST /api/newsletter/subscribe on NEXT_PUBLIC_API_BASE_URL
  // See /contact_newsletter_guide.md — owner fills DB / Mailchimp credentials
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNewsletterEmail = newsletterEmail.trim();

    // Bug fix 1: Show specific validation error for empty or invalid email
    if (!trimmedNewsletterEmail) {
      setNewsletterStatus("empty");
      return;
    }
    if (!isValidEmail(trimmedNewsletterEmail)) {
      setNewsletterStatus("invalid");
      return;
    }
     setNewsletterStatus("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedNewsletterEmail }),
      });

      if (res.status === 409) {
        setNewsletterStatus("duplicate");
        return;
      }
      if (!res.ok) throw new Error("Failed");

      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  };

  const selectedScreenshot = allScreenshots[currentScreenshot] ?? allScreenshots[0];

  return (
    <>

      {/* ── Header ── */}
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
                <span className="nav-item-text">Screenshots</span>
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
            <li>
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
          <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>Screenshots</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Platform Highlights</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Community Programs</a>
          <Link href={withBasePath("/articles")} onClick={() => setMobileMenuOpen(false)}>Read Articles</Link>
          <Link href={withBasePath("/medical-glossary")} onClick={() => setMobileMenuOpen(false)}>Medical Glossary</Link>
          <Link href={withBasePath("/contribute")} onClick={() => setMobileMenuOpen(false)}>Join Us to Contribute</Link>
          <a href="#downloads" onClick={() => setMobileMenuOpen(false)}>Login / Register</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <HeroAndDownload
        onJoinTestFlight={openAppleModal}
        onShowComingSoon={openComingSoonModal}
      />

      {/* ── Screenshots ── */}
      <Section id="screenshots">
        <PageWrapper>
          <h2>App Screenshots</h2>
          <p className="center">Take a look inside the UltimateHealth experience</p>

          <div className="screenshot-details">
            <div className="screenshot-summary" onClick={() => setUserSliderOpen((o) => !o)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setUserSliderOpen((o) => !o); }}>
              <span style={{ color: "var(--primary)" }}>{userSliderOpen ? "▼" : "▶"}</span> UltimateHealth App
            </div>
            {userSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={userSliderRef}>
                  {userScreenshots.map((s) => (
                    <div
                      key={s.src}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                      onKeyDown={(e) => handleScreenshotCardKeyDown(e, s.src)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${s.caption} screenshot`}
                    >
                      <Image
                        src={s.src}
                        alt={s.caption}
                        fill
                        sizes="(max-width: 768px) 260px, 300px"
                        className="screenshot-image"
                      />
                    </div>
                  ))}
                  <div className="screenshot-box">
                    <div className="screenshot-empty">
                      <i className="fas fa-mobile-alt" style={{ fontSize: "4rem", color: "#cbd5e1" }}></i>
                      <p style={{ marginTop: "20px", color: "#718096", fontWeight: 600 }}>More Screens Coming Soon</p>
                    </div>
                  </div>
                </div>
                <div className="slider-nav">
                  <button className="nav-btn" type="button" aria-label="Previous UltimateHealth screenshot" onClick={() => moveSlider(userSliderRef, -1)}><i className="fas fa-chevron-left"></i></button>
                  <button className="nav-btn" type="button" aria-label="Next UltimateHealth screenshot" onClick={() => moveSlider(userSliderRef, 1)}><i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            )}
          </div>

          <div className="screenshot-details">
            <div className="screenshot-summary" onClick={() => setAdminSliderOpen((o) => !o)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setAdminSliderOpen((o) => !o); }}>
              <span style={{ color: "var(--primary)" }}>{adminSliderOpen ? "▼" : "▶"}</span> UHealth Admin App
            </div>
            {adminSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={adminSliderRef}>
                  {adminScreenshots.map((s) => (
                    <div
                      key={s.src}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                      onKeyDown={(e) => handleScreenshotCardKeyDown(e, s.src)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${s.caption} screenshot`}
                    >
                      <Image
                        src={s.src}
                        alt={s.caption}
                        fill
                        sizes="(max-width: 768px) 260px, 300px"
                        className="screenshot-image"
                      />
                    </div>
                  ))}
                  <div className="screenshot-box">
                    <div className="screenshot-empty">
                      <i className="fas fa-mobile-alt" style={{ fontSize: "4rem", color: "#cbd5e1" }}></i>
                      <p style={{ marginTop: "20px", color: "#718096", fontWeight: 600 }}>More Screens Coming Soon</p>
                    </div>
                  </div>
                </div>
                <div className="slider-nav">
                  <button className="nav-btn" type="button" aria-label="Previous UHealth Admin screenshot" onClick={() => moveSlider(adminSliderRef, -1)}><i className="fas fa-chevron-left"></i></button>
                  <button className="nav-btn" type="button" aria-label="Next UHealth Admin screenshot" onClick={() => moveSlider(adminSliderRef, 1)}><i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            )}
          </div>
        </PageWrapper>
      </Section>

      {/* ── Features ── */}
      <Section id="features" className="feature-section-premium scroll-reveal">
        <PageWrapper>
          <h2>UltimateHealth Features</h2>
          <p className="center">
            UltimateHealth is an open-source health platform that provides trusted articles, AI-powered assistance, podcasts, multilingual content, community contributions, and a centralized wellness knowledge repository.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 w-full relative z-10">
            {featuresLoading ? (
              <Skeleton count={6} variant="compact" />
            ) : (
              [
                { icon: "fa-robot", title: "AI Health Chat Assistant", desc: "Get instant, AI-powered health guidance and support.", span: "md:col-span-2 lg:col-span-2" },
                { icon: "fa-book-medical", title: "Centralized Library", desc: "Access a vast repository of trusted health articles.", span: "col-span-1" },
                
                { icon: "fa-edit", title: "CRUD Articles", desc: "Create, read, update, and delete your health content seamlessly.", span: "col-span-1" },
                { icon: "fa-podcast", title: "Health Podcasts", desc: "Stream and share verified health audio content worldwide.", span: "md:col-span-2 lg:col-span-2" },
                
                { icon: "fa-tags", title: "Smart Categorization", desc: "Organize articles with intuitive categorization and tagging.", span: "col-span-1" },
                { icon: "fa-search", title: "Advanced Search", desc: "Quickly find the specific health information you need.", span: "col-span-1" },
                { icon: "fa-users", title: "Community Contributions", desc: "Collaborate and drive open-source content creation.", span: "col-span-1" },
                
                { icon: "fa-code-branch", title: "Edit Request Workflow", desc: "Propose and review changes to maintain content quality.", span: "col-span-1" },
                { icon: "fa-language", title: "Multilingual Resources", desc: "Read and write content in multiple languages globally.", span: "col-span-1" },
                { icon: "fa-mobile-alt", title: "Cross-Platform Support", desc: "Available on both Android mobile and Web platforms.", span: "col-span-1" },
                
                { icon: "fa-user-shield", title: "Authentication & Users", desc: "Secure role-based access and robust user management.", span: "col-span-1" },
                { icon: "fa-cloud", title: "Cloud Content Management", desc: "Reliable cloud infrastructure for all your health data.", span: "col-span-1" },
                { icon: "fa-graduation-cap", title: "Educational Content", desc: "Spread health awareness through verified information.", span: "col-span-1" },
                
                { icon: "fa-shield-alt", title: "Trusted Wellness Repository", desc: "A heavily moderated, safe, and accurate knowledge base.", span: "md:col-span-2 lg:col-span-2" },
                { icon: "fa-globe", title: "Open-Source Platform", desc: "Join our global initiative for a healthier community.", span: "col-span-1" },
              ].map((f, i) => (
                <div className={`feature-card-premium w-full fade-in ${f.span}`} key={i}>
                  <div className="feature-icon-wrapper">
                    <i className={`fas ${f.icon}`}></i>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))
            )}
          </div>
        </PageWrapper>
      </Section>

      {/* ── Moderator Features ── */}
      <Section className="member-section scroll-reveal">
        <PageWrapper>
          <h2>Be a Member: Guardian of Content Integrity</h2>
          <p className="center">Help maintain quality and safety across the platform</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 w-full">
            {[
              { icon: "fa-sync-alt", title: "Interactive Review", desc: "Manage the full lifecycle of content with a streamlined approval, rejection, and feedback loop for contributors." },
              { icon: "fa-microchip", title: "Content Integrity", desc: "Leverage automated plagiarism and grammar engines to maintain professional clarity and originality scores." },
              { icon: "fa-shield-alt", title: "Visual Asset Audit", desc: "Validation for image quality and automated compliance checks for brand logos and visual safety. (Coming Soon)" },
              { icon: "fa-gavel", title: "Community Safety", desc: "Investigate flagged content and manage user reports through a robust system designed to keep the platform safe." },
              { icon: "fa-fingerprint", title: "Advanced Security", desc: "Role-based access control (RBAC) ensuring only verified Reviewers and Admins can access protected operations." },
            ].map((f, i) => (
              <div className="feature-card mod-card w-full fade-in" key={i}>
                <div className="mod-icon"><i className={`fas ${f.icon}`}></i></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </PageWrapper>
      </Section>

      {/* ── Programs ── */}
      <Section id="programs" className="scroll-reveal">
        <PageWrapper>
          <h2>Programs Participated In</h2>
          <p className="center">We are proud to have collaborated with and contributed to these prestigious tech and open-source initiatives</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 w-full">
            {[
              { logo: "https://github.com/user-attachments/assets/e0a40d06-f5b8-42a7-a5a0-033280f842be", alt: "IEEE IGDTUW Logo", badge: "Open Source Week", title: "IEEE IGDTUW", desc: "A week-long intensive event aimed at fostering global collaboration and high-level skill-building in the open-source ecosystem." },
              { logo: "https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00", alt: "Vultr Logo", badge: "Cloud Hackathon", title: "Vultr Cloud Innovate", desc: "Harnessing high-performance cloud infrastructure to develop scalable solutions for real-world problems using Vultr's computing and networking power." },
              { logo: "https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png", alt: "GSSoC Logo", badge: "Summer 2024", title: "GirlScript Summer of Code", desc: "A massive three-month initiative focused on bringing beginners into the world of open-source software development through expert mentorship." },
            ].map((p, i) => (
              <div className="program-card w-full fade-in" key={i}>
                <div className="program-logo-wrapper">
                  <Image
                    src={p.logo}
                    alt={p.alt}
                    width={180}
                    height={80}
                    sizes="180px"
                    className="program-logo"
                  />
                </div>
                <span className="program-badge">{p.badge}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </PageWrapper>
      </Section>

      {/* ── Contact ── */}
      <Section className="contact-section scroll-reveal" id="contact">
        <PageWrapper>
          <h2>Connect With Us</h2>
          <p className="center" style={{ marginBottom: 56 }}>
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>

          <div className="contact-dark-card">
            {/* Left panel */}
            <div className="contact-dark-left">
              <div className="contact-left-badge">✦ UltimateHealth</div>
              <h3 className="contact-dark-title">Let&apos;s Talk<br />Health Together</h3>
              <p className="contact-dark-subtitle">
                Questions about our platform? We&apos;re here to help. Reach out and we&apos;ll respond promptly.
              </p>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-info-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <strong>Email Us</strong>
                    <p>ultimate.health25@gmail.com</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon"><i className="fas fa-comment-dots"></i></div>
                  <div>
                    <strong>Quick Response</strong>
                    <p>We aim to reply within 24 hours.</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-icon"><i className="fas fa-layer-group"></i></div>
                  <div>
                    <strong>Multiple Channels</strong>
                    <p>Reach us via email, GitHub, or this form.</p>
                  </div>
                </div>
              </div>

              <div className="contact-dark-socials">
                <a href="https://github.com/SB2318" className="dark-social-icon" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
               <a
                 href="mailto:ultimate.health25@gmail.com?subject=Hello%20UltimateHealth&body=Hi%20UltimateHealth%20Team%2C"
                 className="dark-social-icon"
                 title="Email"
                 aria-label="Send email to UltimateHealth via mail client"
                 style={{ cursor: "pointer" }}>
                 <i className="fas fa-envelope"></i>
                 </a>
                <a href="https://www.linkedin.com/in/ultimate-health-9290873a8/" className="dark-social-icon" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Right panel — fully wired form */}
            <div className="contact-dark-right">
              <h3 className="contact-form-title">Send us a Message</h3>
              <p className="contact-form-subtitle">We typically respond within 24 hours</p>

              {contactStatus === "success" ? (
                <div className="contact-success-box">
                  <div className="contact-success-icon"><i className="fas fa-check-circle"></i></div>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button type="button" onClick={() => setContactStatus("idle")} className="contact-reset-btn">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-dark-form" autoComplete="off" onSubmit={handleContactSubmit}>
                  <div className="dark-field-group">
                    <span className="dark-field-icon"><i className="fas fa-user"></i></span>
                    <input
                      type="text" className="dark-input" placeholder="Your Name *" required
                      maxLength={80}
                      value={contactName} onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="dark-field-group">
                    <span className="dark-field-icon"><i className="fas fa-envelope"></i></span>
                    <input
                      type="email" className="dark-input" placeholder="Email Address *" required
                      maxLength={120}
                      value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div className="dark-field-group">
                    <span className="dark-field-icon"><i className="fas fa-tag"></i></span>
                    <input
                      type="text" className="dark-input" placeholder="Subject *" required
                      maxLength={120}
                      value={contactSubject} onChange={(e) => setContactSubject(e.target.value)}
                    />
                  </div>
                  <div className="dark-field-group dark-field-textarea">
                    <span className="dark-field-icon dark-field-icon-top"><i className="fas fa-comment"></i></span>
                    <textarea
                      className="dark-input dark-textarea" placeholder="Your Message *" required
                      maxLength={1500}
                      value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
                    ></textarea>
                  </div>

                  {contactStatus === "error" && (
                    <p className="contact-error-msg">
                      <i className="fas fa-exclamation-circle"></i> Something went wrong. Opening your email client as fallback.
                    </p>
                  )}

                  <button type="submit" className="dark-submit-btn" disabled={contactStatus === "sending"}>
                    {contactStatus === "sending" ? (
                      <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                    ) : (
                      <>Send Message <i className="fas fa-arrow-right" style={{ fontSize: "0.85rem" }}></i></>
                    )}
                  </button>

                  <div className="contact-trust">
                    <div className="contact-trust-dot"></div>
                    <span className="contact-trust-text">Your message is private and secure</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </PageWrapper>
      </Section>

      {/* ── Footer ── */}
      <footer>
        <PageWrapper className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <h2>UltimateHealth</h2>
            <p className="footer-note">Open-source health and wellness for everyone.</p>

            {/* Newsletter — wired to API */}
            <form className="footer-subscribe-form" onSubmit={handleNewsletterSubmit} noValidate>
            {newsletterStatus === "success" ? (
            <div className="newsletter-success">
            <i className="fas fa-check-circle"></i> You have successfully subscribed!
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
                setNewsletterEmail(e.target.value);
                if (
                  newsletterStatus !== "idle" &&
                  newsletterStatus !== "sending"
                ) {
                setNewsletterStatus("idle");
              }
            }}
            />
            <button
              type="submit"
              className="footer-subscribe-btn"
              aria-label="Subscribe to UltimateHealth newsletter"
              disabled={newsletterStatus === "sending"}
            >
            {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
           </button>
           </div>

          <div id="newsletter-feedback" aria-live="polite">
            {newsletterStatus === "empty" && (
            <p className="newsletter-error">
              <i className="fas fa-exclamation-circle"></i> Please enter a valid email address.
            </p>
            )}
            {newsletterStatus === "invalid" && (
              <p className="newsletter-error">
               <i className="fas fa-exclamation-circle"></i> Invalid email format.
               </p>
            )}
              {newsletterStatus === "duplicate" && (
              <p className="newsletter-error">
               <i className="fas fa-info-circle"></i> This email is already subscribed.
              </p>
              )}
            {newsletterStatus === "error" && (
            <p className="newsletter-error">
              <i className="fas fa-exclamation-circle"></i> Could not subscribe. Please try again.
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
                <a href="https://github.com/SB2318" className="footer-social-icon" target="_blank" rel="noreferrer" title="GitHub" aria-label="Open UltimateHealth GitHub profile">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/ultimate-health-9290873a8/" className="footer-social-icon" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="Open UltimateHealth LinkedIn profile">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                {TELEGRAM_URL && (
                  <a href={TELEGRAM_URL} className="footer-social-icon" target="_blank" rel="noreferrer" title="Telegram" aria-label="Open UltimateHealth Telegram link">
                    <i className="fab fa-telegram-plane"></i>
                  </a>
                )}
                {INSTAGRAM_URL && (
                  <a href={INSTAGRAM_URL} className="footer-social-icon" target="_blank" rel="noreferrer" title="Instagram" aria-label="Open UltimateHealth Instagram link">
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h3>Quick Links</h3>
            <Link href={withBasePath("/")}>Home</Link>
            <a href="#features">Features</a>
            <a href="#programs">Programs</a>
            <a href="#screenshots">Screenshots</a>
            <a href="#contact">Contact</a>
            <Link href={withBasePath("/articles")}>Health Articles</Link>
            <Link href={withBasePath("/contribute")}>Join Us &amp; Contribute</Link>
          </div>

          {/* Support */}
          <div className="footer-links-col">
            <h3>Support</h3>
            <a href={HELP_CENTER_URL} target="_blank" rel="noreferrer">Help Center</a>
            <a href="mailto:ultimate.health25@gmail.com">Contact Us</a>
            <a href={FEEDBACK_URL} target="_blank" rel="noreferrer">Feedback</a>
            <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">API Docs</a>
          </div>
        </PageWrapper>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>© 2026 UltimateHealth. Built with passion for a healthier community.</p>
            <div className="footer-bottom-links">
              <a href={PRIVACY_POLICY_URL}>Privacy Policy</a>
              <a href={TERMS_OF_USE_URL}>Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Coming Soon Modal ── */}
      {comingSoonModal && (
        <div
          className="modal-overlay active"
          onClick={closeComingSoonModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "4rem", marginBottom: 16 }}>🚀</div>
            <h2 id="coming-soon-modal-title">Launching Soon!</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 8 }}>
              We&apos;re currently in final testing. We&apos;re <strong>85%</strong> of the way there!
            </p>
            <div className="progress-container"><div className="progress-bar"></div></div>
            <button type="button" className="close-modal-btn" onClick={closeComingSoonModal}>Close</button>
          </div>
        </div>
      )}

      {/* ── TestFlight Modal ── */}
      {appleModal && (
        <div
          className="modal-overlay active"
          onClick={closeAppleModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="testflight-modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>✈️</div>
            <h2 id="testflight-modal-title">Join the iOS TestFlight</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Help us build the ultimate experience</p>
            <div style={{ textAlign: "left", fontSize: "0.95rem", color: "var(--text-dark)", background: "#f8fafc", padding: 24, borderRadius: 16, marginBottom: 24, borderLeft: "4px solid #007aff" }}>
              <p style={{ marginBottom: 12 }}>We have decided to release via <strong>TestFlight</strong> first before moving to a full App Store launch.</p>
              <p style={{ marginBottom: 12 }}><strong>🔹 Why TestFlight?</strong> Early feedback, real-world testing, and faster iteration.</p>
              <p style={{ marginBottom: 12 }}><strong>🔹 What this means:</strong> The app will be available to invited testers only via TestFlight.</p>
              <p><strong>Are you ready to test?</strong> Enter your email below to request an invitation.</p>
            </div>
            {!testerSuccess ? (
              <div>
                <input type="email" placeholder="Enter your Apple ID email" className="waitlist-input"
                  maxLength={120}
                  value={testerEmail} onChange={(e) => setTesterEmail(e.target.value)} />
                <button className="nav-btn-sm"
                  type="button"
                  style={{ width: "100%", height: 48, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}
                  onClick={sendTesterEmail}>
                  Send Invitation Request
                </button>
              </div>
            ) : (
              <div style={{ padding: 24, color: "#059669", background: "#d1fae5", borderRadius: 12 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>✅ <strong>Request Sent!</strong> We&apos;ll notify you as soon as the test link is ready.</p>
              </div>
            )}
            <button type="button" className="close-modal-btn" onClick={closeAppleModal}>
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* ── Screenshot Modal ── */}
      {screenshotModal && (
        <div className="screenshot-modal active" onClick={closeScreenshotModal}>
          <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="screenshot-modal-close" type="button" aria-label="Close screenshot preview" onClick={closeScreenshotModal}>×</button>
            <button className="screenshot-modal-nav screenshot-modal-prev" type="button" aria-label="Previous screenshot" onClick={() => navigateScreenshot(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <Image
              src={selectedScreenshot.src}
              alt={selectedScreenshot.caption}
              width={390}
              height={780}
              sizes="(max-width: 768px) 80vw, 390px"
              className="screenshot-modal-image"
            />
            <button className="screenshot-modal-nav screenshot-modal-next" type="button" aria-label="Next screenshot" onClick={() => navigateScreenshot(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="screenshot-caption">{selectedScreenshot.caption}</div>
          </div>
        </div>
      )}
      <ScrollToTop />
    </>
  );
}
