"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

  const userSliderRef = useRef<HTMLDivElement>(null);
  const adminSliderRef = useRef<HTMLDivElement>(null);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-in animations
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

  // Keyboard nav for screenshot modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!screenshotModal) return;
      if (e.key === "Escape") setScreenshotModal(false);
      if (e.key === "ArrowLeft") navigateScreenshot(-1);
      if (e.key === "ArrowRight") navigateScreenshot(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screenshotModal, currentScreenshot]);

  const openScreenshotModal = (src: string) => {
    const idx = allScreenshots.findIndex((s) => s.src === src);
    setCurrentScreenshot(idx >= 0 ? idx : 0);
    setScreenshotModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeScreenshotModal = () => {
    setScreenshotModal(false);
    document.body.style.overflow = "";
  };

  const navigateScreenshot = (dir: number) => {
    setCurrentScreenshot((prev) => {
      const next = prev + dir;
      if (next < 0) return allScreenshots.length - 1;
      if (next >= allScreenshots.length) return 0;
      return next;
    });
  };

  const moveSlider = (ref: React.RefObject<HTMLDivElement | null>, dir: number) => {
    ref.current?.scrollBy({ left: dir * 324, behavior: "smooth" });
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
            <li><a href="#features">Features</a></li>
            <li><a href="#screenshots">Screenshots</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Documentation</a></li>
            <li><a href="#contact">Contact</a></li>
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
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#screenshots" onClick={() => setMobileMenuOpen(false)}>Screenshots</a>
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
            in your own language, review content, and share podcasts with the world.
          </p>
        </div>
      </section>

      {/* Downloads - Play Store */}
      <section id="downloads">
        <div className="container">
          <h2>Download from Play Store</h2>
          <p className="center">Get started with Ultimate Health on your Android device</p>
          <div className="store-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
              target="_blank"
              rel="noreferrer"
              id="playstore-btn"
            >
              <i className="fab fa-google-play"></i> UltimateHealth
            </a>
            <button className="store-btn" id="admin-closed-testing-btn" onClick={() => setComingSoonModal(true)}>
              <i className="fas fa-user-shield"></i> UHealth Admin (Closed Testing)
            </button>
          </div>
        </div>
      </section>

      {/* Downloads - App Store */}
      <section>
        <div className="container">
          <h2>Download from App Store</h2>
          <p className="center">Coming soon to iOS devices</p>
          <div className="store-buttons">
            <button className="store-btn" id="ios-uh-btn" onClick={() => setAppleModal(true)}>
              <i className="fab fa-apple"></i> UltimateHealth (Coming Soon)
            </button>
            <button className="store-btn" id="ios-admin-btn" onClick={() => setAppleModal(true)}>
              <i className="fab fa-apple"></i> UHealth Admin (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots">
        <div className="container">
          <h2>App Screenshots</h2>
          <p className="center">Take a look inside the Ultimate Health experience</p>

          {/* UltimateHealth App */}
          <div className="screenshot-details">
            <div
              className="screenshot-summary"
              onClick={() => setUserSliderOpen((o) => !o)}
              role="button"
              tabIndex={0}
              id="user-screenshots-toggle"
            >
              <span style={{ color: "var(--primary)" }}>{userSliderOpen ? "▼" : "▶"}</span>
              UltimateHealth App
            </div>
            {userSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={userSliderRef} id="screenshotSlider">
                  {userScreenshots.map((s) => (
                    <div
                      key={s.src}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                    >
                      <img src={s.src} alt={s.caption} />
                    </div>
                  ))}
                  <div className="screenshot-box">
                    <div className="screenshot-empty">
                      <i className="fas fa-mobile-alt" style={{ fontSize: "4rem", color: "#cbd5e1" }}></i>
                      <p style={{ marginTop: "20px", color: "#718096", fontWeight: 600 }}>
                        More Screens Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider-nav">
                  <button className="nav-btn" id="user-slider-prev" onClick={() => moveSlider(userSliderRef, -1)}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="nav-btn" id="user-slider-next" onClick={() => moveSlider(userSliderRef, 1)}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* UHealth Admin App */}
          <div className="screenshot-details">
            <div
              className="screenshot-summary"
              onClick={() => setAdminSliderOpen((o) => !o)}
              role="button"
              tabIndex={0}
              id="admin-screenshots-toggle"
            >
              <span style={{ color: "var(--primary)" }}>{adminSliderOpen ? "▼" : "▶"}</span>
              UHealth Admin App
            </div>
            {adminSliderOpen && (
              <div className="screenshot-slider-container">
                <div className="screenshots-wrapper" ref={adminSliderRef} id="screenshotSliderAdmin">
                  {adminScreenshots.map((s) => (
                    <div
                      key={s.src}
                      className="screenshot-box"
                      onClick={() => openScreenshotModal(s.src)}
                    >
                      <img src={s.src} alt={s.caption} />
                    </div>
                  ))}
                  <div className="screenshot-box">
                    <div className="screenshot-empty">
                      <i className="fas fa-mobile-alt" style={{ fontSize: "4rem", color: "#cbd5e1" }}></i>
                      <p style={{ marginTop: "20px", color: "#718096", fontWeight: 600 }}>
                        More Screens Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider-nav">
                  <button className="nav-btn" id="admin-slider-prev" onClick={() => moveSlider(adminSliderRef, -1)}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="nav-btn" id="admin-slider-next" onClick={() => moveSlider(adminSliderRef, 1)}>
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

      {/* Moderator Features */}
      <section className="member-section">
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

      {/* Programs */}
      <section id="programs">
        <div className="container">
          <h2>Programs Participated In</h2>
          <p className="center">
            We are proud to have collaborated with and contributed to these prestigious tech and open-source initiatives
          </p>
          <div className="program-grid">
            {[
              {
                logo: "https://github.com/user-attachments/assets/e0a40d06-f5b8-42a7-a5a0-033280f842be",
                alt: "IEEE IGDTUW Logo", badge: "Open Source Week",
                title: "IEEE IGDTUW",
                desc: "A week-long intensive event aimed at fostering global collaboration and high-level skill-building in the open-source ecosystem.",
              },
              {
                logo: "https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00",
                alt: "Vultr Logo", badge: "Cloud Hackathon",
                title: "Vultr Cloud Innovate",
                desc: "Harnessing high-performance cloud infrastructure to develop scalable solutions for real-world problems using Vultr's computing and networking power.",
              },
              {
                logo: "https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png",
                alt: "GSSoC Logo", badge: "Summer 2024",
                title: "GirlScript Summer of Code",
                desc: "A massive three-month initiative focused on bringing beginners into the world of open-source software development through expert mentorship.",
              },
            ].map((p, i) => (
              <div className="program-card fade-in" key={i}>
                <div className="program-logo-wrapper">
                  <img src={p.logo} alt={p.alt} />
                </div>
                <span className="program-badge">{p.badge}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="container">
          <h2>Connect With Us</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: 600, margin: "0 auto" }}>
            Have questions or want to collaborate? Reach out to us through any of these platforms
          </p>
          <div className="social-links">
            <a href="https://github.com/SB2318" className="social-icon contact-github" target="_blank" rel="noreferrer" title="GitHub" id="github-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:ultimate.health25@gmail.com" className="social-icon contact-email" title="Email Us" id="email-link">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/ultimate-health-9290873a8/" className="social-icon contact-linkedin" target="_blank" rel="noreferrer" title="LinkedIn" id="linkedin-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <h2>A Heartfelt Thank You <span className="heart">❤️</span></h2>
          <p className="footer-note">
            Ultimate Health exists because of people like you. To every contributor who translated an article,
            every developer who squashed a bug, and every partner who believed in our mission—thank you for helping us build
            a healthier, more informed world.
          </p>
          <div className="footer-links">
            <a href="https://github.com/SB2318" target="_blank" rel="noreferrer">Github</a>
            <a href="https://uhsocial.in/docs" target="_blank" rel="noreferrer">Documentation</a>
            <a href="https://github.com/SB2318/UltimateHealth?tab=coc-ov-file#" target="_blank" rel="noreferrer">Community Guidelines</a>
            <a href="mailto:ultimate.health25@gmail.com">Contact Us</a>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Ultimate Health. Built with passion for a healthier community.</p>
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <div className={`modal-overlay${comingSoonModal ? " active" : ""}`} id="coming-soon-modal" onClick={() => setComingSoonModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: "4rem", marginBottom: 16 }}>🚀</div>
          <h2>Launching Soon!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: 8 }}>
            We&apos;re currently in final testing. We&apos;re <strong>85%</strong> of the way there!
          </p>
          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>
          <button className="close-modal-btn" id="close-coming-soon" onClick={() => setComingSoonModal(false)}>Close</button>
        </div>
      </div>

      {/* TestFlight Modal */}
      <div className={`modal-overlay${appleModal ? " active" : ""}`} id="testflight-modal" onClick={() => { setAppleModal(false); setTesterSuccess(false); setTesterEmail(""); }}>
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
            <div id="testerForm">
              <input
                type="email"
                id="tester-email-input"
                placeholder="Enter your Apple ID email"
                className="waitlist-input"
                value={testerEmail}
                onChange={(e) => setTesterEmail(e.target.value)}
              />
              <button
                className="nav-btn-sm"
                id="send-invitation-btn"
                style={{ width: "100%", height: 48, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}
                onClick={sendTesterEmail}
              >
                Send Invitation Request
              </button>
            </div>
          ) : (
            <div style={{ padding: 24, color: "#059669", background: "#d1fae5", borderRadius: 12 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>✅ <strong>Request Sent!</strong> We&apos;ll notify you as soon as the test link is ready.</p>
            </div>
          )}
          <button className="close-modal-btn" id="close-testflight" onClick={() => { setAppleModal(false); setTesterSuccess(false); setTesterEmail(""); }}>
            Maybe later
          </button>
        </div>
      </div>

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div className="screenshot-modal active" id="screenshotModal" onClick={closeScreenshotModal}>
          <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="screenshot-modal-close" id="screenshot-modal-close" onClick={closeScreenshotModal}>×</button>
            <button className="screenshot-modal-nav screenshot-modal-prev" id="screenshot-prev" onClick={() => navigateScreenshot(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <img
              id="screenshotModalImage"
              src={allScreenshots[currentScreenshot]?.src}
              alt={allScreenshots[currentScreenshot]?.caption}
              style={{ maxHeight: "80vh", borderRadius: 12 }}
            />
            <button className="screenshot-modal-nav screenshot-modal-next" id="screenshot-next" onClick={() => navigateScreenshot(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="screenshot-caption" id="screenshotCaption">
              {allScreenshots[currentScreenshot]?.caption}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
