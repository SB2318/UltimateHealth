"use client";

import { useState } from "react";

import { API_BASE_URL, isValidEmail } from "@/lib/site-config";

/**
 * Footer newsletter signup — the only interactive part of the footer, so it is
 * split out and the rest of the footer renders on the server.
 */
export default function NewsletterForm() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "sending" | "success" | "error" | "invalid" | "empty" | "duplicate"
  >("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNewsletterEmail = newsletterEmail.trim();

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
      const res = await fetch(`/api/newsletter/subscribe`, {
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

  return (
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
                if (newsletterStatus !== "idle" && newsletterStatus !== "sending") {
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
  );
}
