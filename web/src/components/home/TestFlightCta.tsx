"use client";

import { useCallback, useEffect, useState } from "react";

import { API_BASE_URL, isValidEmail } from "@/lib/site-config";

/**
 * "Join TestFlight" button and its dialog. Owning the dialog here means the rest
 * of the download section — including the hero above it — no longer needs to be
 * a client component just to hold this one piece of state.
 */
export default function TestFlightCta() {
  const [appleModal, setAppleModal] = useState(false);
  const [testerEmail, setTesterEmail] = useState("");
  const [testerSuccess, setTesterSuccess] = useState(false);

  const closeAppleModal = useCallback(() => {
    setAppleModal(false);
    setTesterSuccess(false);
    setTesterEmail("");
  }, []);

  useEffect(() => {
    if (!appleModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAppleModal();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [appleModal, closeAppleModal]);

  // ── TestFlight invite ──
  const sendTesterEmail = async () => {
    const trimmedTesterEmail = testerEmail.trim();
    if (!isValidEmail(trimmedTesterEmail)) {
      alert("Please enter a valid Apple ID email.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/publishing-related/invite-testflight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "ultimate.health25@gmail.com",
          from: trimmedTesterEmail,
          subject: "New TestFlight Invitation Request",
          body: `User with email ${trimmedTesterEmail} wants to join the iOS TestFlight group.`,
        }),
      });
      if (!response.ok) throw new Error("API Failure");
    } catch {
      window.location.href = `mailto:ultimate.health25@gmail.com?subject=TestFlight Request&body=I would like to be a tester. My email is: ${trimmedTesterEmail}`;
    }
    setTesterSuccess(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAppleModal(true)}
        className="uh-store-btn uh-store-testflight"
        aria-label="Join UltimateHealth TestFlight"
      >
        <i className="fab fa-apple" aria-hidden="true" />
        <div>
          <small>Join the</small>
          <strong>TestFlight (Beta)</strong>
        </div>
      </button>

      {appleModal && (
        <div className="modal-overlay active" onClick={closeAppleModal} role="dialog" aria-modal="true" aria-labelledby="testflight-modal-title">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 72, height: 72, margin: "0 auto 16px", borderRadius: "50%", background: "rgba(0,122,255,0.12)", border: "1px solid rgba(0,122,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#007aff", fontSize: "1.8rem" }}>
              <i className="fas fa-plane" aria-hidden="true" />
            </div>
            <h2 id="testflight-modal-title">Join the iOS TestFlight</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Help us build the ultimate experience</p>
            <div style={{ textAlign: "left", fontSize: "0.95rem", color: "var(--text-dark)", background: "#f8fafc", padding: 24, borderRadius: 16, marginBottom: 24, borderLeft: "4px solid #007aff" }}>
              <p style={{ marginBottom: 12 }}>We have decided to release via <strong>TestFlight</strong> first before moving to a full App Store launch.</p>
              <p style={{ marginBottom: 12 }}><strong><i className="fas fa-circle" style={{ fontSize: "0.45rem", color: "#007aff", marginRight: 6 }} aria-hidden="true" />Why TestFlight?</strong> Early feedback, real-world testing, and faster iteration.</p>
              <p style={{ marginBottom: 12 }}><strong><i className="fas fa-circle" style={{ fontSize: "0.45rem", color: "#007aff", marginRight: 6 }} aria-hidden="true" />What this means:</strong> The app will be available to invited testers only via TestFlight.</p>
              <p><strong>Are you ready to test?</strong> Enter your email below to request an invitation.</p>
            </div>
            {!testerSuccess ? (
              <div>
                <input type="email" placeholder="Enter your Apple ID email" className="waitlist-input"
                  maxLength={120}
                  value={testerEmail} onChange={(e) => setTesterEmail(e.target.value)} />
                <button className="nav-btn-sm"
                  type="button"
                  style={{ width: "100%", height: 48, border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}
                  onClick={sendTesterEmail}>
                  Send Invitation Request
                </button>
              </div>
            ) : (
              <div style={{ padding: 24, color: "#059669", background: "#d1fae5", borderRadius: 12 }}>
                <p style={{ margin: 0, fontWeight: 600 }}><i className="fas fa-check-circle" style={{ marginRight: 6 }} aria-hidden="true" /><strong>Request Sent!</strong> We&apos;ll notify you as soon as the test link is ready.</p>
              </div>
            )}
            <button type="button" className="close-modal-btn" onClick={closeAppleModal}>
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
