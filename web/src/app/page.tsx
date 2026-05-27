"use client";

import { useEffect, useRef, useState } from "react";

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

  const userSliderRef = useRef<HTMLDivElement>(null);
  const adminSliderRef = useRef<HTMLDivElement>(null);
  
  // Modal refs for focus management
  const shortcutModalRef = useRef<HTMLDivElement>(null);
  const commandPaletteRef = useRef<HTMLDivElement>(null);
  const appleModalRef = useRef<HTMLDivElement>(null);
  const screenshotModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

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

  const navigateScreenshot = (dir: number) => {
    setCurrentScreenshot((prev) => {
      const next = prev + dir;
      if (next < 0) return allScreenshots.length - 1;
      if (next >= allScreenshots.length) return 0;
      return next;
    });
  };

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

        // Pick the section closest to top of viewport among visible ones.
        // Sorts by absolute distance of section's top edge from viewport top (0),
        // so whichever section is nearest the top of the screen wins.
        if (visibleSections.size > 0) {
          const topSection = TRACKED_SECTION_IDS
            .filter((id) => visibleSections.has(id))
            .map((id) => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity }))
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

  // Keyboard nav for screenshot modal
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
        const input = document.getElementById(
          "tester-email-input"
        ) as HTMLInputElement | null;
        input?.focus();
      }

      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPalette(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screenshotModal]);

  const openScreenshotModal = (src: string) => {
    const idx = allScreenshots.findIndex((s) => s.src === src);
    setCurrentScreenshot(idx >= 0 ? idx : 0);
    setScreenshotModal(true);
  };

  const closeScreenshotModal = () => {
    setScreenshotModal(false);
  };

  const moveSlider = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: number
  ) => {
    ref.current?.scrollBy({ left: dir * 324, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCommandPalette(false);
  };

  const sendTesterEmail = async () => {
    if (!testerEmail || !testerEmail.includes("@")) {
      alert("Please enter a valid Apple ID email.");
      return;
    }

    try {
      const response = await fetch(
        "https://uhsocial.in/api/publishing-related/invite-testflight",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: "ultimate.health25@gmail.com",
            from: testerEmail,
            subject: "New TestFlight Invitation Request",
            body: `User with email ${testerEmail} wants to join the iOS TestFlight group.`,
          }),
        }
      );

      if (!response.ok) throw new Error("API Failure");
    } catch {
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=TestFlight Request&body=I would like to be a tester. My email is: ${testerEmail}`;
    }

    setTesterSuccess(true);
  };

  return (
    <>
      {/* Header */}
      <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
        <div className="container nav">
          <a href="#" className="logo">
            <div className="logo-icon">
              <img
                src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
                alt="Ultimate Health Logo"
                width={48}
                height={48}
              />
            </div>
            Ultimate-Health
          </a>

          <ul className="nav-links">
            <li><a href="#screenshots" className={activeSection === "screenshots" ? "active" : ""} aria-current={activeSection === "screenshots" ? "location" : undefined}>Screenshots</a></li>
            <li><a href="#features" className={activeSection === "features" ? "active" : ""} aria-current={activeSection === "features" ? "location" : undefined}>Features</a></li>
            <li><a href="#programs" className={activeSection === "programs" ? "active" : ""} aria-current={activeSection === "programs" ? "location" : undefined}>Programs</a></li>
            <li><a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Documentation</a></li>
            <li><a href="#contact" className={activeSection === "contact" ? "active" : ""} aria-current={activeSection === "contact" ? "location" : undefined}>Contact</a></li>
            <li><a href="#downloads" className="nav-btn-sm">Downloads</a></li>
          </ul>

          <button
            className="mobile-menu-toggle"
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas fa-${mobileMenuOpen ? "times" : "bars"}`}></i>
          </button>
        </div>

        <nav className={`mobile-nav${mobileMenuOpen ? " open" : ""}`}>
          <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>Screenshots</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</a>
          <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Documentation</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#downloads" onClick={() => setMobileMenuOpen(false)}>Downloads</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Empowering Wellness Through Global Community</h1>
          <p>
            Ultimate Health is a platform that lets you publish health knowledge
            in your own language, review content, and share podcasts with the
            world.
          </p>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads">
        <div className="container">
          <h2>Download from Play Store</h2>
          <p className="center">
            Get started with Ultimate Health on your Android device
          </p>

          <div className="store-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
              target="_blank"
              rel="noreferrer"
              id="playstore-btn"
            >
              <i className="fab fa-google-play"></i> UltimateHealth
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.ultimatehealth.admin"
              target="_blank"
              rel="noreferrer"
              className="store-btn"
            >
              <i className="fas fa-user-shield"></i> UHealth Admin
            </a>
          </div>
        </div>
      </section>

      {/* iOS */}
      <section>
        <div className="container">
          <h2>Download from App Store</h2>
          <p className="center">Coming soon to iOS devices</p>

          <div className="store-buttons">
            <button
              className="store-btn"
              onClick={() => setAppleModal(true)}
            >
              <i className="fab fa-apple"></i> UltimateHealth
            </button>

            <button
              className="store-btn"
              onClick={() => setAppleModal(true)}
            >
              <i className="fab fa-apple"></i> UHealth Admin
            </button>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots">
        <div className="container">
          <h2>App Screenshots</h2>
          <p className="center">
            Take a look inside the Ultimate Health experience
          </p>

          <div className="screenshot-details">
            <div
              className="screenshot-summary"
              onClick={() => setUserSliderOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setUserSliderOpen((o) => !o);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span style={{ color: "var(--primary)" }}>
                {userSliderOpen ? "▼" : "▶"}
              </span>
              UltimateHealth App
            </div>

            {userSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={userSliderRef}>
                  {userScreenshots.map((s) => (
                    <div
                      key={s.src}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                    >
                      <img src={s.src} alt={s.caption} />
                    </div>
                  ))}
                </div>

                <div className="slider-nav">
                  <button 
                    aria-label="Previous user screenshots" 
                    onClick={() => moveSlider(userSliderRef, -1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    aria-label="Next user screenshots" 
                    onClick={() => moveSlider(userSliderRef, 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="screenshot-details">
            <div
              className="screenshot-summary"
              onClick={() => setAdminSliderOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setAdminSliderOpen((o) => !o);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span style={{ color: "var(--primary)" }}>
                {adminSliderOpen ? "▼" : "▶"}
              </span>
              UHealth Admin App
            </div>

            {adminSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={adminSliderRef}>
                  {adminScreenshots.map((s) => (
                    <div
                      key={s.src}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                    >
                      <img src={s.src} alt={s.caption} />
                    </div>
                  ))}
                </div>

                <div className="slider-nav">
                  <button 
                    aria-label="Previous admin screenshots" 
                    onClick={() => moveSlider(adminSliderRef, -1)}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    aria-label="Next admin screenshots" 
                    onClick={() => moveSlider(adminSliderRef, 1)}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="container">
          <h2>Be a Contributor: Core Community Features</h2>
          <p className="center">
            Join our community and make a difference in global health awareness
          </p>

          <div className="feature-grid">
            {[
              {
                icon: "🗣️",
                title: "Multilingual Article Publishing",
                desc: "Publish health articles in your own language and reach a global audience.",
              },
              {
                icon: "✍️",
                title: "Collaborative Article Improvement",
                desc: "Review and improve community-driven health content together.",
              },
              {
                icon: "🎧",
                title: "Publish Health Podcasts",
                desc: "Share verified health podcasts with listeners worldwide.",
              },
              {
                icon: "📊",
                title: "Contribution Analytics",
                desc: "Track your impact across articles, edits, and podcasts.",
              },
            ].map((f, i) => (
              <div className="feature-item fade-in" key={i}>
                <h3>
                  {f.icon} {f.title}
                </h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs">
        <div className="container">
          <h2>Programs Participated In</h2>

          <div className="program-grid">
            {[
              {
                title: "IEEE IGDTUW",
                badge: "Open Source Week",
              },
              {
                title: "Vultr Cloud Innovate",
                badge: "Cloud Hackathon",
              },
              {
                title: "GirlScript Summer of Code",
                badge: "Summer 2024",
              },
            ].map((p, i) => (
              <div className="program-card fade-in" key={i}>
                <span className="program-badge">{p.badge}</span>
                <h3>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="container">
          <h2>Connect With Us</h2>

          <div className="social-links">
            <a
              href="https://github.com/SB2318"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>

            <a href="mailto:ultimate.health25@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/ultimate-health-9290873a8/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer>
        <div className="container">
          <h2>
            A Heartfelt Thank You <span className="heart">❤️</span>
          </h2>

          <p className="footer-note">
            Ultimate Health exists because of people like you.
          </p>
        </div>
      </footer>

      {/* Keyboard Shortcuts Help Modal */}
      {shortcutModal && (
        <div
          className="modal-overlay active"
          onClick={() => setShortcutModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={shortcutModalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcut-modal-title"
          >
            <h2 id="shortcut-modal-title">Keyboard Shortcuts</h2>

            <div style={{ textAlign: "left", lineHeight: 2 }}>
              <p>
                <strong>?</strong> → Open shortcuts help
              </p>
              <p>
                <strong>Esc</strong> → Close active modal
              </p>
              <p>
                <strong>/</strong> → Focus email input
              </p>
              <p>
                <strong>Ctrl + K</strong> → Quick navigation
              </p>
              <p>
                <strong>← / →</strong> → Navigate screenshots
              </p>
            </div>

            <button
              className="close-modal-btn"
              aria-label="Close keyboard shortcuts modal"
              onClick={() => setShortcutModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Command Palette */}
      {commandPalette && (
        <div
          className="modal-overlay active"
          onClick={() => setCommandPalette(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={commandPaletteRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
          >
            <h2 id="command-palette-title">Quick Navigation</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 20,
              }}
            >
              <button
                className="nav-btn-sm"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              >
                Home
              </button>

              <button
                className="nav-btn-sm"
                onClick={() => scrollToSection("features")}
              >
                Features
              </button>

              <button
                className="nav-btn-sm"
                onClick={() => scrollToSection("screenshots")}
              >
                Screenshots
              </button>

              <button
                className="nav-btn-sm"
                onClick={() => scrollToSection("programs")}
              >
                Programs
              </button>

              <button
                className="nav-btn-sm"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TestFlight Modal */}
      <div
        className={`modal-overlay${appleModal ? " active" : ""}`}
        onClick={() => {
          setAppleModal(false);
          setTesterSuccess(false);
          setTesterEmail("");
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          ref={appleModalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apple-modal-title"
        >
          <h2 id="apple-modal-title">Join the iOS TestFlight</h2>

          {!testerSuccess ? (
            <div>
              <input
                type="email"
                id="tester-email-input"
                placeholder="Enter your Apple ID email"
                value={testerEmail}
                onChange={(e) => setTesterEmail(e.target.value)}
              />

              <button onClick={sendTesterEmail}>
                Send Invitation Request
              </button>
            </div>
          ) : (
            <div>
              <p>✅ Request Sent!</p>
            </div>
          )}

          <button
            aria-label="Close TestFlight modal"
            onClick={() => {
              setAppleModal(false);
              setTesterSuccess(false);
              setTesterEmail("");
            }}
          >
            Maybe later
          </button>
        </div>
      </div>

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div
          className="screenshot-modal active"
          onClick={closeScreenshotModal}
        >
          <div
            className="screenshot-modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={screenshotModalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="screenshot-modal-title"
          >
            {/* Added a hidden title to fulfill aria-labelledby requirement */}
            <h2 id="screenshot-modal-title" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
              Screenshot View
            </h2>
            
            <button 
              aria-label="Close screenshot viewer" 
              onClick={closeScreenshotModal}
            >
              ×
            </button>

            <button 
              aria-label="Previous screenshot" 
              onClick={() => navigateScreenshot(-1)}
            >
              ←
            </button>

            <img
              src={allScreenshots[currentScreenshot]?.src}
              alt={allScreenshots[currentScreenshot]?.caption}
            />
            
            {/* Restored screenshot caption */}
            <div className="screenshot-caption">
              {allScreenshots[currentScreenshot]?.caption}
            </div>

            <button 
              aria-label="Next screenshot" 
              onClick={() => navigateScreenshot(1)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}