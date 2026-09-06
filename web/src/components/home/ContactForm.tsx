"use client";

import { useState } from "react";

import { API_BASE_URL, isValidEmail } from "@/lib/site-config";

/**
 * Contact form. The surrounding "Connect With Us" section is static and stays on
 * the server; only this form is hydrated.
 *
 * Backend route needed: POST /api/contact on NEXT_PUBLIC_API_BASE_URL
 * See /contact_newsletter_guide.md for the Express route implementation
 */
export default function ContactForm() {
  const [contactName, setContactName] = useState("");
  const [contactNameError, setContactNameError] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // ── Contact name validation ──
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactName(value);
    const invalidChars = /[^a-zA-Z\s\-']/;
    if (value.trim() === "") {
      setContactNameError("Name is required.");
    } else if (invalidChars.test(value)) {
      setContactNameError("Name can only contain letters, spaces, hyphens, and apostrophes.");
    } else {
      setContactNameError("");
    }
  };

  // ── Contact form submit → uhsocial.in API ──
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
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
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

  if (contactStatus === "success") {
    return (
      <div className="contact-success-box">
        <div className="contact-success-icon"><i className="fas fa-check-circle"></i></div>
        <h4>Message Sent!</h4>
        <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        <button type="button" onClick={() => setContactStatus("idle")} className="contact-reset-btn">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-dark-form" autoComplete="off" onSubmit={handleContactSubmit}>
      <div className="dark-field-group">
        <span className="dark-field-icon"><i className="fas fa-user"></i></span>
        <input
          type="text"
          className={`dark-input${contactNameError ? " input-error" : ""}`}
          placeholder="Your Name *"
          required
          maxLength={80}
          value={contactName}
          onChange={handleNameChange}
          aria-describedby="contact-name-error"
        />
      </div>
      {contactNameError && (
        <p id="contact-name-error" className="contact-error-msg" style={{ marginTop: "-8px", marginBottom: "4px" }}>
          <i className="fas fa-exclamation-circle"></i> {contactNameError}
        </p>
      )}
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
  );
}
