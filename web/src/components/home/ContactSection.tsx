import { PageWrapper } from "@/components/layout";

import ContactForm from "./ContactForm";

/**
 * "Connect With Us". Everything except the form itself is static, so the section
 * renders on the server and only <ContactForm /> is hydrated.
 */
export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        background: "#0c0c14",
        borderTop: "1px solid #252538",
        padding: "96px 24px",
      }}
    >
      <PageWrapper>
        <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
          <p
            className="uh-section-label"
            style={{
              color: "#00e5ff",
              marginBottom: "12px",
            }}
          >
            Contact
          </p>
          <h2
            className="uh-display"
            style={{
              fontSize: "clamp(1.875rem, 4.5vw, 2.75rem)",
              color: "#f1f5f9",
              margin: "0 0 16px 0",
            }}
          >
            Connect With Us
          </h2>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#64748b",
              margin: 0,
            }}
          >
            Have questions or want to collaborate? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="contact-dark-card">
          <div className="contact-dark-left uh-dark-aligned">
            <div className="contact-left-badge">
              <i className="fas fa-heart-pulse" aria-hidden="true" />
              UltimateHealth
            </div>
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
              <a href="https://github.com/SB2318" className="dark-social-icon" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a
                href="mailto:ultimate.health25@gmail.com?subject=Hello%20UltimateHealth&body=Hi%20UltimateHealth%20Team%2C"
                className="dark-social-icon"
                title="Email"
                aria-label="Send email to UltimateHealth via mail client"
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.linkedin.com/in/ultimate-health-9290873a8/" className="dark-social-icon" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="contact-dark-right uh-dark-aligned">
            <h3 className="contact-form-title">Send us a Message</h3>
            <p className="contact-form-subtitle">We typically respond within 24 hours</p>

            <ContactForm />
          </div>
        </div>
      </PageWrapper>
    </section>
  );
}
