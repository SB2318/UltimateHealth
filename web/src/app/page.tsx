"use client";

import Image from "next/image";
import "./globals.css";

import { type RefObject, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ScrollToTop from "../components/ScrollToTop";

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
  { src: "/assets/notificaion-screen.jpeg", caption: "Notification" },
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
  const [appleModal, setAppleModal] = useState(false);
  const [testerEmail, setTesterEmail] = useState("");
  const [testerSuccess, setTesterSuccess] = useState(false);
  const [screenshotModal, setScreenshotModal] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [userSliderOpen, setUserSliderOpen] = useState(true);
  const [adminSliderOpen, setAdminSliderOpen] = useState(false);
  const [shortcutModal, setShortcutModal] = useState(false);
  const [commandPalette, setCommandPalette] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // ── DNA helix cursor ──
  const cursorGlowEnabled = useSyncExternalStore(
    subscribeToCursorGlow,
    getCursorGlowSnapshot,
    () => false
  );
  const setCursorGlowEnabled = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    const prev = getCursorGlowSnapshot();
    const resolved = typeof next === "function" ? next(prev) : next;
    localStorage.setItem(CURSOR_GLOW_STORAGE_KEY, String(resolved));
    window.dispatchEvent(new Event(CURSOR_GLOW_EVENT));
  }, []);
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
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const userSliderRef = useRef<HTMLDivElement>(null);
  const adminSliderRef = useRef<HTMLDivElement>(null);
  
  // Modal refs for focus management
  const shortcutModalRef = useRef<HTMLDivElement>(null);
  const commandPaletteRef = useRef<HTMLDivElement>(null);
  const appleModalRef = useRef<HTMLDivElement>(null);
  const screenshotModalRef = useRef<HTMLDivElement>(null);

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

  // Manage focus for each modal when opened
  useEffect(() => {
    if (shortcutModal) shortcutModalRef.current?.focus();
  }, [shortcutModal]);

  useEffect(() => {
    if (commandPalette) commandPaletteRef.current?.focus();
  }, [commandPalette]);

  useEffect(() => {
    if (appleModal) appleModalRef.current?.focus();
  }, [appleModal]);

  useEffect(() => {
    if (screenshotModal) screenshotModalRef.current?.focus();
  }, [screenshotModal]);

  // Unified body scroll management for all modals
  useEffect(() => {
    if (shortcutModal || commandPalette || appleModal || screenshotModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [shortcutModal, commandPalette, appleModal, screenshotModal]);

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
  
  useEffect(() => {
    const isTyping = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;

      return (
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.tagName === "SELECT" ||
        el.isContentEditable
      );
    };

    const handleKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;

      if (screenshotModal) {
        if (e.key === "ArrowLeft") navigateScreenshot(-1);
        if (e.key === "ArrowRight") navigateScreenshot(1);
      }

      if (e.key === "Escape") {
        setScreenshotModal(false);
        setAppleModal(false);
        setShortcutModal(false);
        setCommandPalette(false);
      }

      if (e.key === "?") {
        e.preventDefault();
        setShortcutModal(true);
      }

      if (e.key === "/") {
        e.preventDefault();
        const input = document.getElementById("tester-email-input") as HTMLInputElement | null;
        input?.focus();
      }

      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPalette(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screenshotModal, navigateScreenshot, closeScreenshotModal]);

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
    ref.current?.scrollBy({ left: dir * SLIDER_SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCommandPalette(false);
  };

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

  // ── Contact form submit ──
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
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=${encodeURIComponent(trimmedSubject)}&body=${encodeURIComponent(`From: ${trimmedName} (${trimmedEmail})\n\n${trimmedMessage}`)}`;
      setContactStatus("error");
    }
  };

  // ── Newsletter subscribe ──
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNewsletterEmail = newsletterEmail.trim();
    if (!isValidEmail(trimmedNewsletterEmail)) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("sending");
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedNewsletterEmail }),
      });
      if (!res.ok) throw new Error("Failed");
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <>
      {/* ── Header ── */}
      <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
        <div className="container nav">
          <a href="#" className="logo">
            <div className="logo-icon">
              <Image
                src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
                alt="UltimateHealth Logo" width={48} height={48}
                priority
              />
            </div>
            Ultimate-Health
          </a>

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
              <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer" className="nav-link-item">
                <i className="fas fa-file-lines nav-item-icon" aria-hidden="true"></i>
                <span className="nav-item-text">Read Articles</span>
              </a>
            </li>
            <li>
              <a href="/contribute" className="nav-link-item">
                <i className="fas fa-users nav-item-icon" aria-hidden="true"></i>
                <span className="nav-item-text">Join Us to Contribute</span>
              </a>
            </li>
            <li>
              <a href="#downloads" className="nav-btn-sm">
                <i className="fas fa-user" aria-hidden="true"></i>
                <span>Login / Register</span>
              </a>
            </li>
          </ul>

          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Toggle mobile menu">
            <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`}></i>
          </button>
        </div>

        <nav className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
          <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>Screenshots</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Platform Highlights</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Community Programs</a>
          <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Read Articles</a>
          <a href="/contribute" onClick={() => setMobileMenuOpen(false)}>Join Us to Contribute</a>
          <a href="#downloads" onClick={() => setMobileMenuOpen(false)}>Login / Register</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-content scroll-reveal">
          <h1>Empowering Wellness Through Global Community</h1>
          <p>UltimateHealth is a platform that lets you publish health knowledge in your own language, review content, and share podcasts with the world.</p>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="download-section">
        <div className="container">
          <h2>Get UltimateHealth</h2>
          <p className="center">
            Access our platform on your preferred device. UltimateHealth is available now for Android and coming soon to iOS via TestFlight.
          </p>
          <div className="download-grid">
            {/* Android Card */}