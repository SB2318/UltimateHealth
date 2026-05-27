"use client";

import { type RefObject, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

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
  { src: "/assets/ultimate-health-about.jpeg", caption: "App Info" },
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
const CURSOR_GLOW_STORAGE_KEY = "cursorGlowEnabled";
const CURSOR_GLOW_EVENT = "cursor-glow-preference-change";
// Owner-configurable frontend URLs (set in deployment env when needed)
const HELP_CENTER_URL = process.env.NEXT_PUBLIC_HELP_CENTER_URL || "https://uhsocial.in/docs";
const FEEDBACK_URL = process.env.NEXT_PUBLIC_FEEDBACK_URL || "https://github.com/SB2318/UltimateHealth/issues";
const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com";
const PRIVACY_POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "#";
const TERMS_OF_USE_URL = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL || "#";

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
      if (trail.length > 38) trail.pop();
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

  // ── Screenshot keyboard nav ──
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
    document.body.style.overflow = screenshotModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [screenshotModal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!screenshotModal) return;
      if (e.key === "Escape") closeScreenshotModal();
      if (e.key === "ArrowLeft") navigateScreenshot(-1);
      if (e.key === "ArrowRight") navigateScreenshot(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screenshotModal, navigateScreenshot, closeScreenshotModal]);

  const openScreenshotModal = (src: string) => {
    const idx = allScreenshots.findIndex((s) => s.src === src);
    setCurrentScreenshot(idx >= 0 ? idx : 0);
    setScreenshotModal(true);
  };

  const moveSlider = (ref: RefObject<HTMLDivElement | null>, dir: number) => {
    ref.current?.scrollBy({ left: dir * 324, behavior: "smooth" });
  };

  // ── TestFlight invite ──
  const sendTesterEmail = async () => {
    if (!testerEmail || !testerEmail.includes("@")) {
      alert("Please enter a valid Apple ID email.");
      return;
    }
    try {
      const response = await fetch("https://uhsocial.in/api/publishing-related/invite-testflight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "ultimate.health25@gmail.com",
          from: testerEmail,
          subject: "New TestFlight Invitation Request",
          body: `User with email ${testerEmail} wants to join the iOS TestFlight group.`,
        }),
      });
      if (!response.ok) throw new Error("API Failure");
    } catch {
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=TestFlight Request&body=I would like to be a tester. My email is: ${testerEmail}`;
    }
    setTesterSuccess(true);
  };

  // ── Contact form submit → uhsocial.in API ──
  // Backend route needed: POST https://uhsocial.in/api/contact/send
  // See /contact_newsletter_guide.md for the Express route implementation
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) return;
    setContactStatus("sending");
    try {
      const res = await fetch("https://uhsocial.in/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setContactStatus("success");
      setContactName(""); setContactEmail(""); setContactSubject(""); setContactMessage("");
    } catch {
      // Fallback: open mailto if API not yet implemented
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(`From: ${contactName} (${contactEmail})\n\n${contactMessage}`)}`;
      setContactStatus("error");
    }
  };

  // ── Newsletter subscribe ──
  // Backend route needed: POST https://uhsocial.in/api/newsletter/subscribe
  // See /contact_newsletter_guide.md — owner fills DB / Mailchimp credentials
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setNewsletterStatus("sending");
    try {
      const res = await fetch("https://uhsocial.in/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
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
              <img
                src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
                alt="Ultimate Health Logo" width={48} height={48}
              />
            </div>
            Ultimate-Health
          </a>

          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#screenshots">Screenshots</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Documentation</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#downloads" className="nav-btn-sm">Downloads</a></li>
            <li>
              <button
                className={`glow-toggle-btn${cursorGlowEnabled ? " glow-on" : ""}`}
                onClick={() => setCursorGlowEnabled((v) => !v)}
                data-tooltip={cursorGlowEnabled ? "DNA Trail On" : "DNA Trail Off"}
                aria-label="Toggle DNA helix cursor effect"
              >
                <i className="fas fa-dna"></i>
              </button>
            </li>
          </ul>

          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Toggle mobile menu">
            <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`}></i>
          </button>
        </div>

        <nav className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>Screenshots</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</a>
          <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Documentation</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#downloads" onClick={() => setMobileMenuOpen(false)}>Downloads</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container hero-content scroll-reveal">
          <h1>Empowering Wellness Through Global Community</h1>
          <p>Ultimate Health is a platform that lets you publish health knowledge in your own language, review content, and share podcasts with the world.</p>
        </div>
      </section>

      {/* ── Downloads — Play Store ── */}
      <section id="downloads">
        <div className="container">
          <h2>Download from Play Store</h2>
          <p className="center">Get started with Ultimate Health on your Android device</p>
          <div className="store-buttons">
            <a href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth" target="_blank" rel="noreferrer">
              <i className="fab fa-google-play"></i> UltimateHealth
            </a>
            <button className="store-btn" onClick={() => setComingSoonModal(true)}>
              <i className="fas fa-user-shield"></i> UHealth Admin (Closed Testing)
            </button>
          </div>
        </div>
      </section>

      {/* ── Downloads — App Store ── */}
      <section>
        <div className="container">
          <h2>Download from App Store</h2>
          <p className="center">Coming soon to iOS devices</p>
          <div className="store-buttons">
            <button className="store-btn" onClick={() => setAppleModal(true)}>
              <i className="fab fa-apple"></i> UltimateHealth (Coming Soon)
            </button>
            <button className="store-btn" onClick={() => setAppleModal(true)}>
              <i className="fab fa-apple"></i> UHealth Admin (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section id="screenshots">
        <div className="container">
          <h2>App Screenshots</h2>
          <p className="center">Take a look inside the Ultimate Health experience</p>

          <div className="screenshot-details">
            <div className="screenshot-summary" onClick={() => setUserSliderOpen((o) => !o)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setUserSliderOpen((o) => !o); }}>
              <span style={{ color: "var(--primary)" }}>{userSliderOpen ? "▼" : "▶"}</span> UltimateHealth App
            </div>
            {userSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={userSliderRef}>
                  {userScreenshots.map((s) => (
                    <div key={s.src} className="screenshot-box" onClick={() => openScreenshotModal(s.src)}>
                      <img src={s.src} alt={s.caption} />
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
                  <button className="nav-btn" onClick={() => moveSlider(userSliderRef, -1)}><i className="fas fa-chevron-left"></i></button>
                  <button className="nav-btn" onClick={() => moveSlider(userSliderRef, 1)}><i className="fas fa-chevron-right"></i></button>
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
                    <div key={s.src} className="screenshot-box" onClick={() => openScreenshotModal(s.src)}>
                      <img src={s.src} alt={s.caption} />
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
                  <button className="nav-btn" onClick={() => moveSlider(adminSliderRef, -1)}><i className="fas fa-chevron-left"></i></button>
                  <button className="nav-btn" onClick={() => moveSlider(adminSliderRef, 1)}><i className="fas fa-chevron-right"></i></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="scroll-reveal">
        <div className="container">
          <h2>Be a Contributor: Core Community Features</h2>
          <p className="center">Join our community and make a difference in global health awareness</p>
          <div className="feature-grid">
            {[
              { icon: "🗣️", title: "Multilingual Article Publishing", desc: "Publish health articles in your own language and reach a global audience." },
              { icon: "✍️", title: "Collaborative Article Improvement", desc: "Review and improve community-driven health content together." },
              { icon: "🎧", title: "Publish Health Podcasts", desc: "Share verified health podcasts with listeners worldwide." },
              { icon: "📊", title: "Contribution Analytics", desc: "Track your impact across articles, edits, and podcasts." },
            ].map((f, i) => (
              <div className="feature-item fade-in" key={i}>
                <h3>{f.icon} {f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Moderator Features ── */}
      <section className="member-section scroll-reveal">
        <div className="container">
          <h2>Be a Member: Guardian of Content Integrity</h2>
          <p className="center">Help maintain quality and safety across the platform</p>
          <div className="feature-grid">
            {[
              { icon: "fa-sync-alt", title: "Interactive Review", desc: "Manage the full lifecycle of content with a streamlined approval, rejection, and feedback loop for contributors." },
              { icon: "fa-microchip", title: "Content Integrity", desc: "Leverage automated plagiarism and grammar engines to maintain professional clarity and originality scores." },
              { icon: "fa-shield-alt", title: "Visual Asset Audit", desc: "Validation for image quality and automated compliance checks for brand logos and visual safety. (Coming Soon)" },
              { icon: "fa-gavel", title: "Community Safety", desc: "Investigate flagged content and manage user reports through a robust system designed to keep the platform safe." },
              { icon: "fa-fingerprint", title: "Advanced Security", desc: "Role-based access control (RBAC) ensuring only verified Reviewers and Admins can access protected operations." },
            ].map((f, i) => (
              <div className="feature-card mod-card fade-in" key={i}>
                <div className="mod-icon"><i className={`fas ${f.icon}`}></i></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programs" className="scroll-reveal">
        <div className="container">
          <h2>Programs Participated In</h2>
          <p className="center">We are proud to have collaborated with and contributed to these prestigious tech and open-source initiatives</p>
          <div className="program-grid">
            {[
              { logo: "https://github.com/user-attachments/assets/e0a40d06-f5b8-42a7-a5a0-033280f842be", alt: "IEEE IGDTUW Logo", badge: "Open Source Week", title: "IEEE IGDTUW", desc: "A week-long intensive event aimed at fostering global collaboration and high-level skill-building in the open-source ecosystem." },
              { logo: "https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00", alt: "Vultr Logo", badge: "Cloud Hackathon", title: "Vultr Cloud Innovate", desc: "Harnessing high-performance cloud infrastructure to develop scalable solutions for real-world problems using Vultr's computing and networking power." },
              { logo: "https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png", alt: "GSSoC Logo", badge: "Summer 2024", title: "GirlScript Summer of Code", desc: "A massive three-month initiative focused on bringing beginners into the world of open-source software development through expert mentorship." },
            ].map((p, i) => (
              <div className="program-card fade-in" key={i}>
                <div className="program-logo-wrapper"><img src={p.logo} alt={p.alt} /></div>
                <span className="program-badge">{p.badge}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact-section scroll-reveal" id="contact">
        <div className="container">
          <h2>Connect With Us</h2>
          <p className="center" style={{ marginBottom: 56 }}>
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>

          <div className="contact-dark-card">
            {/* Left panel */}
            <div className="contact-dark-left">
              <div className="contact-left-badge">✦ Ultimate Health</div>
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
                <a href="https://github.com/SB2318" className="dark-social-icon" target="_blank" rel="noreferrer" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="mailto:ultimate.health25@gmail.com" className="dark-social-icon" title="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="https://www.linkedin.com/in/ultimate-health-9290873a8/" className="dark-social-icon" target="_blank" rel="noreferrer" title="LinkedIn">
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
                  <button onClick={() => setContactStatus("idle")} className="contact-reset-btn">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-dark-form" autoComplete="off" onSubmit={handleContactSubmit}>
                  <div className="dark-field-group">
                    <span className="dark-field-icon"><i className="fas fa-user"></i></span>
                    <input
                      type="text" className="dark-input" placeholder="Your Name *" required
                      value={contactName} onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="dark-field-group">
                    <span className="dark-field-icon"><i className="fas fa-envelope"></i></span>
                    <input
                      type="email" className="dark-input" placeholder="Email Address *" required
                      value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div className="dark-field-group">
                    <span className="dark-field-icon"><i className="fas fa-tag"></i></span>
                    <input
                      type="text" className="dark-input" placeholder="Subject *" required
                      value={contactSubject} onChange={(e) => setContactSubject(e.target.value)}
                    />
                  </div>
                  <div className="dark-field-group dark-field-textarea">
                    <span className="dark-field-icon dark-field-icon-top"><i className="fas fa-comment"></i></span>
                    <textarea
                      className="dark-input dark-textarea" placeholder="Your Message *" required
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
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="container footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <h2>Ultimate Health</h2>
            <p className="footer-note">Open-source health and wellness for everyone.</p>

            {/* Newsletter — wired to API */}
            <form className="footer-subscribe-form" onSubmit={handleNewsletterSubmit}>
              {newsletterStatus === "success" ? (
                <div className="newsletter-success">
                  <i className="fas fa-check-circle"></i> You&apos;re subscribed!
                </div>
              ) : (
                <>
                  <div className="footer-subscribe-row">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="footer-subscribe-input"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="footer-subscribe-btn" disabled={newsletterStatus === "sending"}>
                      {newsletterStatus === "sending" ? <i className="fas fa-spinner fa-spin"></i> : "Subscribe"}
                    </button>
                  </div>
                  {newsletterStatus === "error" && (
                    <p className="newsletter-error">Could not subscribe. Please try again.</p>
                  )}
                  <small className="footer-subscribe-note">We respect your privacy. Unsubscribe at any time.</small>
                </>
              )}
            </form>

            {/* Social icons */}
            <div style={{ marginTop: 20 }}>
              <span className="footer-follow-label">Follow Us</span>
              <div className="footer-social-links">
                <a href="https://github.com/SB2318" className="footer-social-icon" target="_blank" rel="noreferrer" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/ultimate-health-9290873a8/" className="footer-social-icon" target="_blank" rel="noreferrer" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={TELEGRAM_URL} className="footer-social-icon" target="_blank" rel="noreferrer" title="Telegram">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href={INSTAGRAM_URL} className="footer-social-icon" target="_blank" rel="noreferrer" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h3>Quick Links</h3>
            <a href="#">Home</a>
            <a href="#features">Features</a>
            <a href="#programs">Programs</a>
            <a href="#screenshots">Screenshots</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Support */}
          <div className="footer-links-col">
            <h3>Support</h3>
            <a href={HELP_CENTER_URL} target="_blank" rel="noreferrer">Help Center</a>
            <a href="mailto:ultimate.health25@gmail.com">Contact Us</a>
            <a href={FEEDBACK_URL} target="_blank" rel="noreferrer">Feedback</a>
            <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">API Docs</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>© 2026 Ultimate Health. Built with passion for a healthier community.</p>
            <div className="footer-bottom-links">
              <a href={PRIVACY_POLICY_URL}>Privacy Policy</a>
              <a href={TERMS_OF_USE_URL}>Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Coming Soon Modal ── */}
      <div className={`modal-overlay${comingSoonModal ? " active" : ""}`} onClick={() => setComingSoonModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: "4rem", marginBottom: 16 }}>🚀</div>
          <h2>Launching Soon!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 8 }}>
            We&apos;re currently in final testing. We&apos;re <strong>85%</strong> of the way there!
          </p>
          <div className="progress-container"><div className="progress-bar"></div></div>
          <button className="close-modal-btn" onClick={() => setComingSoonModal(false)}>Close</button>
        </div>
      </div>

      {/* ── TestFlight Modal ── */}
      <div className={`modal-overlay${appleModal ? " active" : ""}`}
        onClick={() => { setAppleModal(false); setTesterSuccess(false); setTesterEmail(""); }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>✈️</div>
          <h2>Join the iOS TestFlight</h2>
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
                value={testerEmail} onChange={(e) => setTesterEmail(e.target.value)} />
              <button className="nav-btn-sm"
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
          <button className="close-modal-btn"
            onClick={() => { setAppleModal(false); setTesterSuccess(false); setTesterEmail(""); }}>
            Maybe later
          </button>
        </div>
      </div>

      {/* ── Screenshot Modal ── */}
      {screenshotModal && (
        <div className="screenshot-modal active" onClick={closeScreenshotModal}>
          <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="screenshot-modal-close" onClick={closeScreenshotModal}>×</button>
            <button className="screenshot-modal-nav screenshot-modal-prev" onClick={() => navigateScreenshot(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <img src={allScreenshots[currentScreenshot]?.src} alt={allScreenshots[currentScreenshot]?.caption}
              style={{ maxHeight: "80vh", borderRadius: 12 }} />
            <button className="screenshot-modal-nav screenshot-modal-next" onClick={() => navigateScreenshot(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="screenshot-caption">{allScreenshots[currentScreenshot]?.caption}</div>
          </div>
        </div>
      )}
    </>
  );
}
