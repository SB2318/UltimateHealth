"use client";

import Image from "next/image";

type HeroAndDownloadProps = {
  onJoinTestFlight: () => void;
  onShowComingSoon: () => void;
};

const activityItems = [
  { icon: "fa-user", name: "New Article", time: "2 min ago", badge: "new", label: "New" },
  { icon: "fa-comment", name: "Comment Added", time: "15 min ago", badge: "review", label: "Review" },
  { icon: "fa-podcast", name: "Podcast Live", time: "1 hour ago", badge: "live", label: "Live" },
];

const weeklyStats = [
  { day: "Mon", height: "40%" },
  { day: "Tue", height: "65%" },
  { day: "Wed", height: "85%" },
  { day: "Thu", height: "55%" },
  { day: "Fri", height: "95%" },
  { day: "Sat", height: "70%" },
  { day: "Sun", height: "100%", accent: true },
];

const heroStats = [
  { icon: "fa-users", value: "50K+", label: "Active Users" },
  { icon: "fa-newspaper", value: "100+", label: "Articles" },
  { icon: "fa-globe", value: "Global", label: "Community" },
];

const floatingBadges = [
  { className: "uh-float-mic", badgeClassName: "", icon: "fa-microphone", label: "Podcasts" },
  { className: "uh-float-heart", badgeClassName: "uh-badge-heart", icon: "fa-heart-pulse", label: "Wellness" },
  { className: "uh-float-group", badgeClassName: "uh-badge-group", icon: "fa-users", label: "Community" },
  { className: "uh-float-sparkle", badgeClassName: "uh-badge-health", icon: "fa-stethoscope", label: "Health" },
];

const platforms = [
  {
    theme: "android",
    title: "UltimateHealth Android",
    status: "Available Now",
    description:
      "Install UltimateHealth on your Android device to publish articles, listen to podcasts, manage content, and stay connected with the community.",
    features: ["Publish Articles", "Listen to Podcasts", "Community Access"],
    footer: "Version 2.4.1 - 45 MB",
  },
  {
    theme: "ios",
    title: "UltimateHealth iOS",
    status: "Coming Soon",
    description:
      "Join our TestFlight beta program to get early access to UltimateHealth on iOS. Be among the first to experience the platform on Apple devices.",
    features: ["Early Access", "TestFlight Beta", "Premium Testing"],
    footer: "TestFlight Beta - Coming Soon",
  },
];

export default function HeroAndDownload({ onJoinTestFlight, onShowComingSoon }: HeroAndDownloadProps) {
  return (
    <>
      <section className="uh-hero">
        <div className="uh-hero-bg-glow" aria-hidden="true" />
        <div className="uh-hero-bg-stars" aria-hidden="true" />
        <div className="uh-hero-bg-lightstreak" aria-hidden="true" />
        <div className="uh-hero-orb uh-orb-1" aria-hidden="true" />
        <div className="uh-hero-orb uh-orb-2" aria-hidden="true" />
        <div className="uh-hero-orb uh-orb-3" aria-hidden="true" />

        <div className="container">
          <div className="uh-hero-inner">
            <div className="uh-hero-left scroll-reveal-left">
              <div className="uh-hero-badge">
                <span className="uh-badge-dot" />
                Open Source Health Platform
              </div>

              <h1 className="uh-hero-title">
                Empowering Wellness Through <em>Global Community</em>
              </h1>

              <p className="uh-hero-subtitle">
                UltimateHealth lets people publish health knowledge in their own language,
                review community content, and share podcasts with the world.
              </p>

              <div className="uh-hero-buttons">
                <a
                  href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uh-btn-primary"
                >
                  <i className="fas fa-download" aria-hidden="true" />
                  Download App
                </a>
                <a href="#features" className="uh-btn-secondary">
                  <i className="fas fa-play" aria-hidden="true" />
                  Explore Features
                </a>
              </div>

              <div className="uh-hero-stats">
                {heroStats.map((stat) => (
                  <div className="uh-stat-card" key={stat.label}>
                    <div className="uh-stat-icon">
                      <i className={`fas ${stat.icon}`} aria-hidden="true" />
                    </div>
                    <div>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="uh-hero-right scroll-reveal-right">
              <div className="uh-phone-wrapper">
                <div className="uh-phone-glow" aria-hidden="true" />
                <div className="uh-phone-mockup">
                  <div className="uh-phone-notch" aria-hidden="true" />
                  <div className="uh-phone-screen">
                    <div className="uh-phone-app-header">
                      <div className="uh-app-logo">
                        <Image
                          src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
                          alt="UltimateHealth"
                          width={24}
                          height={24}
                          priority
                        />
                      </div>
                      <div className="uh-app-header-text">
                        <span className="uh-app-title">UltimateHealth</span>
                        <span className="uh-app-subtitle">Dashboard</span>
                      </div>
                      <div className="uh-app-header-actions" aria-hidden="true">
                        <span className="uh-header-dot" />
                        <span className="uh-header-dot" />
                        <span className="uh-header-dot" />
                      </div>
                    </div>

                    <div className="uh-phone-dashboard">
                      <div className="uh-dash-stats">
                        <DashboardStat icon="fa-file-alt" tone="blue" value="24" label="Articles" />
                        <DashboardStat icon="fa-podcast" tone="purple" value="12" label="Podcasts" />
                      </div>

                      <div className="uh-dash-activity">
                        <SectionHeader title="Recent Activity" action="View All" />
                        <div className="uh-dash-activity-list">
                          {activityItems.map((item) => (
                            <div className="uh-dash-activity-item" key={item.name}>
                              <div className="uh-activity-avatar">
                                <i className={`fas ${item.icon}`} aria-hidden="true" />
                              </div>
                              <div className="uh-activity-content">
                                <span className="uh-activity-name">{item.name}</span>
                                <span className="uh-activity-time">{item.time}</span>
                              </div>
                              <div className={`uh-activity-badge ${item.badge}`}>{item.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="uh-dash-chart">
                        <SectionHeader title="Weekly Stats" action="Details" />
                        <div className="uh-chart-bars">
                          {weeklyStats.map((item) => (
                            <div className="uh-chart-bar-group" key={item.day}>
                              <div
                                className={`uh-chart-bar${item.accent ? " accent" : ""}`}
                                style={{ height: item.height }}
                              />
                              <span>{item.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="uh-phone-shadow" />
                </div>

                {floatingBadges.map((badge) => (
                  <div className={`uh-float-icon ${badge.className}`} aria-hidden="true" key={badge.label}>
                    <div className={`uh-float-badge ${badge.badgeClassName}`}>
                      <i className={`fas ${badge.icon}`} />
                    </div>
                    <span className="uh-float-label">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="downloads" className="uh-download-section">
        <div className="uh-download-bg-glow" aria-hidden="true" />
        <div className="container">
          <div className="uh-download-header scroll-reveal">
            <div className="uh-download-header-badge">
              <i className="fas fa-mobile-screen-button" aria-hidden="true" />
              Available On
            </div>
            <h2>Get UltimateHealth</h2>
            <p>
              Access our platform on your preferred device. UltimateHealth is available now
              for Android and coming soon to iOS via TestFlight.
            </p>
          </div>

          <div className="uh-download-grid">
            {platforms.map((platform) => (
              <div className={`uh-download-card uh-card-${platform.theme} fade-in`} key={platform.theme}>
                <div className={`uh-card-glass-bg${platform.theme === "ios" ? " ios" : ""}`} aria-hidden="true" />
                <div className="uh-card-content">
                  <div className="uh-card-top-row">
                    <MiniPhone theme={platform.theme} />
                    <div className="uh-card-badge-group">
                      <h3>{platform.title}</h3>
                      <span className={`uh-platform-badge ${platform.theme}`}>
                        <span className={`uh-badge-pulse${platform.theme === "ios" ? " blue" : ""}`} />
                        {platform.status}
                      </span>
                    </div>
                  </div>

                  <p className="uh-card-desc">{platform.description}</p>

                  <ul className="uh-platform-features">
                    {platform.features.map((feature) => (
                      <li key={feature}>
                        <span className="uh-feature-icon">
                          <i className="fas fa-check" aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {platform.theme === "android" ? (
                    <AndroidStoreButtons onShowComingSoon={onShowComingSoon} />
                  ) : (
                    <IosStoreButtons onJoinTestFlight={onJoinTestFlight} />
                  )}

                  <div className="uh-card-footer">
                    <span className={`uh-card-footer-dot ${platform.theme === "android" ? "green" : "blue"}`} />
                    <span>{platform.footer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DashboardStat({
  icon,
  tone,
  value,
  label,
}: {
  icon: string;
  tone: "blue" | "purple";
  value: string;
  label: string;
}) {
  return (
    <div className="uh-dash-stat-card">
      <div className={`uh-dash-stat-icon ${tone}`}>
        <i className={`fas ${icon}`} aria-hidden="true" />
      </div>
      <div className="uh-dash-stat-info">
        <span className="uh-dash-stat-value">{value}</span>
        <span className="uh-dash-stat-label">{label}</span>
      </div>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <div className="uh-dash-section-header">
      <span>{title}</span>
      <span className="uh-dash-view-all">{action}</span>
    </div>
  );
}

function MiniPhone({ theme }: { theme: string }) {
  return (
    <div className={`uh-phone-mini ${theme}-theme`} aria-hidden="true">
      <div className="uh-phone-mini-notch" />
      <div className="uh-phone-mini-screen">
        <div className="uh-mini-dashboard">
          <div className="uh-mini-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="uh-mini-lines">
            <div className="uh-mini-line" style={{ width: "65%" }} />
            <div className="uh-mini-line" style={{ width: "45%" }} />
            <div className="uh-mini-line short" />
          </div>
          <div className="uh-mini-cards">
            <div className="uh-mini-card" />
            <div className="uh-mini-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AndroidStoreButtons({ onShowComingSoon }: Pick<HeroAndDownloadProps, "onShowComingSoon">) {
  return (
    <div className="uh-store-buttons-group">
      <div className="uh-store-buttons">
        <a
          href="https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth"
          target="_blank"
          rel="noopener noreferrer"
          className="uh-store-btn uh-store-google"
          aria-label="Download UltimateHealth on Google Play"
        >
          <i className="fab fa-google-play" aria-hidden="true" />
          <div>
            <small>Get it on</small>
            <strong>Google Play</strong>
          </div>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.ultimatehealth.admin"
          target="_blank"
          rel="noopener noreferrer"
          className="uh-store-btn uh-store-admin"
          aria-label="Download UHealth Admin on Google Play"
        >
          <i className="fas fa-user-shield" aria-hidden="true" />
          <div>
            <small>Admin Panel</small>
            <strong>UHealth Admin</strong>
          </div>
        </a>
        <button
          type="button"
          onClick={onShowComingSoon}
          className="uh-store-btn uh-store-admin"
          aria-label="View UHealth Admin closed testing launch status"
        >
          <i className="fas fa-hourglass-half" aria-hidden="true" />
          <div>
            <small>Launch Status</small>
            <strong>Closed Testing</strong>
          </div>
        </button>
      </div>
    </div>
  );
}

function IosStoreButtons({ onJoinTestFlight }: Pick<HeroAndDownloadProps, "onJoinTestFlight">) {
  return (
    <div className="uh-store-buttons-group">
      <div className="uh-store-buttons">
        <button
          type="button"
          onClick={onJoinTestFlight}
          className="uh-store-btn uh-store-testflight"
          aria-label="Join UltimateHealth TestFlight"
        >
          <i className="fab fa-apple" aria-hidden="true" />
          <div>
            <small>Join the</small>
            <strong>TestFlight (Beta)</strong>
          </div>
        </button>
        <span className="uh-store-btn uh-store-admin disabled" aria-hidden="true">
          <i className="fas fa-user-shield" />
          <div>
            <small>Admin Panel</small>
            <strong>UHealth (Beta)</strong>
          </div>
        </span>
      </div>
    </div>
  );
}
