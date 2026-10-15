"use client";

import { useState } from "react";

import { isValidEmail } from "@/lib/site-config";
import { withBasePath } from "@/lib/basePath";


export default function ContactForm() {
  const [contactName, setContactName] = useState("");
  const [contactNameError, setContactNameError] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactEmailError, setContactEmailError] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactSubjectError, setContactSubjectError] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactMessageError, setContactMessageError] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  
  const validateEmail = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Email address is required.";
    }
    if (!isValidEmail(trimmed)) {
      return "Please enter a valid email address (e.g. name@example.com).";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContactEmail(value);
    if (contactEmailError) {
      setContactEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setContactEmailError(validateEmail(contactEmail));
  };


  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedSubject = contactSubject.trim();
    const trimmedMessage = contactMessage.trim();

    let hasError = false;

    if (!trimmedName) {
      setContactNameError("Name is required.");
      hasError = true;
    } else if (/[^a-zA-Z\s\-']/.test(trimmedName)) {
      setContactNameError("Name can only contain letters, spaces, hyphens, and apostrophes.");
      hasError = true;
    } else {
      setContactNameError("");
    }

    const emailErr = validateEmail(trimmedEmail);
    if (emailErr) {
      setContactEmailError(emailErr);
      hasError = true;
    } else {
      setContactEmailError("");
    }

    if (!trimmedSubject) {
      setContactSubjectError("Subject is required.");
      hasError = true;
    } else {
      setContactSubjectError("");
    }

    if (!trimmedMessage) {
      setContactMessageError("Message is required.");
      hasError = true;
    } else {
      setContactMessageError("");
    }

    if (hasError) {
      return;
    }

    setContactStatus("sending");
    try {
      const res = await fetch(withBasePath("/api/contact"), {
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
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
      setContactNameError("");
      setContactEmailError("");
      setContactSubjectError("");
      setContactMessageError("");
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
    <form className="contact-dark-form" autoComplete="off" onSubmit={handleContactSubmit} noValidate>
      {/* ── Name Field ── */}
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
          aria-describedby={contactNameError ? "contact-name-error" : undefined}
          aria-invalid={Boolean(contactNameError)}
        />
      </div>
      {contactNameError && (
        <p id="contact-name-error" className="contact-error-msg" style={{ marginTop: "-8px", marginBottom: "4px" }}>
          <i className="fas fa-exclamation-circle"></i> {contactNameError}
        </p>
      )}

      {/* ── Email Field with Real-time & On-blur Validation ── */}
      <div className="dark-field-group">
        <span className="dark-field-icon"><i className="fas fa-envelope"></i></span>
        <input
          type="email"
          className={`dark-input${contactEmailError ? " input-error" : ""}`}
          placeholder="Email Address *"
          required
          maxLength={120}
          value={contactEmail}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          aria-describedby={contactEmailError ? "contact-email-error" : undefined}
          aria-invalid={Boolean(contactEmailError)}
        />
      </div>
      {contactEmailError && (
        <p id="contact-email-error" className="contact-error-msg" style={{ marginTop: "-8px", marginBottom: "4px" }}>
          <i className="fas fa-exclamation-circle"></i> {contactEmailError}
        </p>
      )}

      {/* ── Subject Field ── */}
      <div className="dark-field-group">
        <span className="dark-field-icon"><i className="fas fa-tag"></i></span>
        <input
          type="text"
          className={`dark-input${contactSubjectError ? " input-error" : ""}`}
          placeholder="Subject *"
          required
          maxLength={120}
          value={contactSubject}
          onChange={(e) => {
            setContactSubject(e.target.value);
            if (contactSubjectError && e.target.value.trim()) setContactSubjectError("");
          }}
          onBlur={() => {
            if (!contactSubject.trim()) setContactSubjectError("Subject is required.");
          }}
          aria-describedby={contactSubjectError ? "contact-subject-error" : undefined}
          aria-invalid={Boolean(contactSubjectError)}
        />
      </div>
      {contactSubjectError && (
        <p id="contact-subject-error" className="contact-error-msg" style={{ marginTop: "-8px", marginBottom: "4px" }}>
          <i className="fas fa-exclamation-circle"></i> {contactSubjectError}
        </p>
      )}

      {/* ── Message Field ── */}
      <div className="dark-field-group dark-field-textarea">
        <span className="dark-field-icon dark-field-icon-top"><i className="fas fa-comment"></i></span>
        <textarea
          className={`dark-input dark-textarea${contactMessageError ? " input-error" : ""}`}
          placeholder="Your Message *"
          required
          maxLength={1500}
          value={contactMessage}
          onChange={(e) => {
            setContactMessage(e.target.value);
            if (contactMessageError && e.target.value.trim()) setContactMessageError("");
          }}
          onBlur={() => {
            if (!contactMessage.trim()) setContactMessageError("Message is required.");
          }}
          aria-describedby={contactMessageError ? "contact-message-error" : undefined}
          aria-invalid={Boolean(contactMessageError)}
        ></textarea>
      </div>
      {contactMessageError && (
        <p id="contact-message-error" className="contact-error-msg" style={{ marginTop: "-8px", marginBottom: "4px" }}>
          <i className="fas fa-exclamation-circle"></i> {contactMessageError}
        </p>
      )}

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
