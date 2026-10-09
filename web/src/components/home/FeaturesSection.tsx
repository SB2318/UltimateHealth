import { PageWrapper, Section } from "@/components/layout";

const features = [
  { icon: "fa-robot",         title: "AI Health Chat Assistant",    desc: "Ask health-related questions and get responses from the AI assistant.", span: "md:col-span-2 lg:col-span-2" },
  { icon: "fa-book-medical",  title: "Centralized Library",         desc: "A vast repository of trusted, community-reviewed health articles.", span: "col-span-1" },
  { icon: "fa-podcast",       title: "Health Podcasts",             desc: "Listen to and share health podcasts from the community.", span: "col-span-1" },
  { icon: "fa-language",      title: "Multilingual Resources",      desc: "Read and write health content in multiple languages globally.", span: "md:col-span-2 lg:col-span-2" },
  { icon: "fa-users",         title: "Community Contributions",     desc: "Collaborate and drive open-source health content creation.", span: "col-span-1" },
  { icon: "fa-search",        title: "Advanced Search",             desc: "Quickly find the exact health information you need.", span: "col-span-1" },
  { icon: "fa-mobile-alt",    title: "Cross-Platform",             desc: "Available on Android and Web — seamlessly synced.", span: "col-span-1" },
  { icon: "fa-user-shield",   title: "Secure Authentication",       desc: "Role-based access with robust user and moderator management.", span: "col-span-1" },
  { icon: "fa-shield-alt",    title: "Trusted Knowledge Base",      desc: "Heavily moderated, safe, and accurate wellness repository.", span: "md:col-span-2 lg:col-span-2" },
];

const upcoming = [
  {
    icon: 'fa-robot',
    title: 'AI Personal Chat',
    sub: 'Characters Chat',
    desc: 'Chat with health-focused AI personas for general guidance and wellness conversations.',
    accent: '#2dd4bf',
    glow: 'rgba(45,212,191,0.12)',
  },
  {
    icon: 'fa-hospital',
    title: 'Hospital Learning System',
    sub: 'Structured Health Education',
    desc: 'Health education resources for patients, students, and caregivers.',
    accent: '#2dd4bf',
    glow: 'rgba(45,212,191,0.12)',
  },
  {
    icon: 'fa-user-doctor',
    title: 'Connect with a Doctor',
    sub: 'Voluntary Suggestions Only',
    desc: 'Doctors who choose to volunteer their time can offer health suggestions to the community. No one is forced — only those who genuinely want to help.',
    accent: '#2dd4bf',
    glow: 'rgba(45,212,191,0.12)',
  },
  {
    icon: 'fa-dna',
    title: 'AI Health Analytics',
    sub: 'Personalized Wellness Insights',
    desc: 'View health reports, trends, and wellness recommendations based on your health data.',
    accent: '#2dd4bf',
    glow: 'rgba(45,212,191,0.12)',
  },
];

/**
 * Platform highlights and the roadmap teaser. Both grids are static content, so
 * this renders entirely on the server and ships no JavaScript.
 */
export default function FeaturesSection() {
  return (
    <Section id="features" className="feature-section-premium scroll-reveal">
      <PageWrapper>
        <h2 className="uh-display">UltimateHealth Features</h2>
        <p className="center">
          An open-source health platform with AI assistance, trusted articles, multilingual content, and community-driven knowledge — free for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 w-full relative z-10">
          {features.map((f, i) => (
            <div className={`feature-card-premium w-full fade-in ${f.span}`} key={i}>
              <div className="feature-icon-wrapper">
                <i className={`fas ${f.icon}`}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Upcoming Features ── */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(45,212,191,0.12)',
              border: '1px solid rgba(45,212,191,0.25)',
              borderRadius: '50px', padding: '6px 18px', marginBottom: '16px',
              fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#2dd4bf',
            }}>
              <i className="fas fa-rocket" style={{ fontSize: '0.7rem' }}></i>
              Arriving October 2026
            </div>
            <h3 className="uh-display" style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', color: '#f8fafc',
              marginBottom: '10px', lineHeight: 1.3,
            }}>
              What&apos;s Coming Next
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              As an open-source project, these upcoming features are community-built and <strong>free for all</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {upcoming.map((f, i) => (
              <div
                key={i}
                className="uh-upcoming-card fade-in"
                style={{
                  background: `#151b26`,
                  borderRadius: '12px',
                  padding: '32px 28px',
                  border: `1px solid rgba(255,255,255,0.08)`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '--uh-upcoming-glow': f.glow,
                } as React.CSSProperties}
              >
                {/* top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '10px',
                    background: `rgba(45,212,191,0.12)`,
                    border: `1px solid rgba(45,212,191,0.25)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#2dd4bf', fontSize: '1.1rem',
                  }}>
                    <i className={`fas ${f.icon}`} aria-hidden="true" />
                  </div>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: '#2dd4bf',
                    background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.25)',
                    borderRadius: '50px', padding: '3px 10px',
                    whiteSpace: 'nowrap',
                  }}>
                    Oct – Nov 2026
                  </span>
                </div>

                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px', lineHeight: 1.3 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2dd4bf', marginBottom: '12px', letterSpacing: '0.04em' }}>
                  {f.sub}
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  {f.desc}
                </p>

                {/* bottom divider + free badge */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-lock-open" style={{ color: '#2dd4bf', fontSize: '0.75rem' }}></i>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                    Open Source · Free for All
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </Section>
  );
}
