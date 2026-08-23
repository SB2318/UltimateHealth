"use client";

import { useState } from "react";

import { API_BASE_URL, isValidEmail } from "@/lib/site-config";

/**
 * Footer newsletter signup — the only interactive part of the footer, so it is
 * split out and the rest of the footer renders on the server.
 *
 * Provides full visual feedback for every submission outcome:
 *   - loading spinner while the request is in-flight
 *   - success message on 200
 *   - inline validation errors for empty / malformed emails
 *   - duplicate-email notice on 409
 *   - generic network-error fallback
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

  const hasValidationError =
    newsletterStatus === "empty" ||
    newsletterStatus === "invalid";

  return (
    <form className="footer-subscribe-form" onSubmit={handleNewsletterSubmit} noValidate>
      {newsletterStatus === "success" ? (
        <div className="newsletter-success" role="status">
          <svg
            className="newsletter-icon-check"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          You&apos;ve subscribed successfully!
        </div>
      ) : (
        <>
          <div className="footer-subscribe-row">
            <input
              type="email"
              placeholder="Enter your email"
              className={`footer-subscribe-input${hasValidationError ? " footer-subscribe-input--error" : ""}`}
              maxLength={120}
              value={newsletterEmail}
              required
              aria-label="Newsletter email address"
              aria-describedby="newsletter-feedback"
              aria-invalid={hasValidationError}
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
              {newsletterStatus === "sending" ? (
                <>
                  <svg
                    className="newsletter-spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Subscribing&hellip;
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          <div id="newsletter-feedback" className="newsletter-feedback" aria-live="polite">
            {newsletterStatus === "empty" && (
              <p className="newsletter-error" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Please enter your email address.
              </p>
            )}
            {newsletterStatus === "invalid" && (
              <p className="newsletter-error" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Please enter a valid email format.
              </p>
            )}
            {newsletterStatus === "duplicate" && (
              <p className="newsletter-info" role="status">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                This email is already subscribed.
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="newsletter-error" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Could not subscribe. Please try again.
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
