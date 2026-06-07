"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageWrapper, Section } from "@/components/layout";

/* ---------- types ---------- */
interface Point { x: number; y: number }

/* ---------- inner component (needs useSearchParams) ---------- */
function AdminAgreementContent() {
  const searchParams = useSearchParams();

  // form state
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);

  // ui state
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------- helpers ---------- */
  const isValidFullName = (name: string) =>
    name.trim().split(" ").filter((p) => p.length > 0).length >= 2;

  const isSignatureValid = useCallback(() => {
    if (points.length < 20) return false;
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
    points.forEach((p) => {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    });
    return maxX - minX > 50 && maxY - minY > 20;
  }, [points]);

  const canAccept =
    isValidFullName(fullName) &&
    designation.trim() !== "" &&
    isSignatureValid() &&
    agreed;

  /* ---------- canvas setup ---------- */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#2d3748";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  /* ---------- already-accepted check ---------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("adminAgreementAccepted");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.accepted && data.version === "2.0.0") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Guarded by the redirect flag stored in localStorage to prevent loop
        setAlreadyAccepted(true);
        const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
        setTimeout(() => { window.location.href = redirectUrl; }, 3000);
      }
    } catch { /* ignore */ }
  }, [searchParams]);

  /* ---------- canvas drawing ---------- */
  const getPos = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (locked) return;
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || locked) return;
    const pos = getPos(e);
    setPoints((prev) => [...prev, pos]);
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDraw = () => {
    if (isDrawing) {
      canvasRef.current!.getContext("2d")!.closePath();
      setIsDrawing(false);
    }
  };

  const clearSignature = () => {
    if (locked) return;
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setPoints([]);
  };

  /* ---------- showMessage helper ---------- */
  const showMessage = (type: "success" | "error" | "info", text: string, autohide = false) => {
    setMessage({ text, type });
    if (autohide) setTimeout(() => setMessage(null), 5000);
  };

  /* ---------- accept ---------- */
  const handleAccept = async () => {
    if (!isValidFullName(fullName)) {
      showMessage("error", "✗ Please enter your full name", true);
      return;
    }
    if (!designation.trim()) {
      showMessage("error", "✗ Please enter your designation", true);
      return;
    }
    if (!isSignatureValid()) {
      showMessage("error", "✗ Please provide a valid signature", true);
      return;
    }
    if (!agreed) {
      showMessage("error", "✗ Please accept the agreement terms", true);
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      showMessage("error", "✗ Unauthorized: Token missing", true);
      return;
    }

    setLoading(true);
    showMessage("info", "Generating agreement PDF...");

    // lock the form
    const dataUrl = canvasRef.current!.toDataURL("image/png");
    setSignatureDataUrl(dataUrl);
    const ts = new Date().toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata",
    });
    setSignedTimestamp(ts);
    setLocked(true);

    try {
      const response = await fetch("https://uhsocial.in/api/admin/upload-agreement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          role: designation,
          signature: dataUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      showMessage("success", "✓ Agreement signed & uploaded successfully! Redirecting to your PDF...");
      setTimeout(() => {
        if (data.pdfUrl) window.location.href = data.pdfUrl;
        else if (data.key) window.location.href = `https://uhsocial.in/api/getFile/${data.key}`;
        else window.location.href = "/admin/dashboard";
      }, 2000);
    } catch (err: unknown) {
      setLocked(false);
      showMessage("error", "✗ " + (err instanceof Error ? err.message : "Unknown error"), true);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- decline ---------- */
  const handleDecline = () => {
    if (!confirm("Are you sure you want to decline? You will be logged out and will not have access to admin features.")) return;
    showMessage("info", "Declining agreement and logging out...");
    localStorage.removeItem("adminAgreementAccepted");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setTimeout(() => { window.location.href = "/admin/logout"; }, 1000);
  };

  /* ---------- render ---------- */
  return (
    <Section as="div" style={css.body}>
      <PageWrapper as="div" style={css.container}>

        {/* Header */}
        <div style={css.header}>
          <div style={css.logo}>⚕️</div>
          <h1 style={css.h1}>Admin &amp; Moderator Agreement</h1>
          <p style={css.subtitle}>UltimateHealth Platform</p>
        </div>

        {/* Agreement content */}
        <div style={css.content}>
          <h2 style={css.h2}>Welcome to the UltimateHealth Review Team</h2>
          <p style={css.p}>
            Thank you for joining our mission to provide high-quality, verified health content to our community.
            As an admin or moderator, you play a critical role in maintaining the integrity and quality of content on our platform.
          </p>

          <h2 style={css.h2}>Role &amp; Responsibilities</h2>
          <p style={css.p}>You will be assigned one of the following roles:</p>
          <ul style={css.ul}>
            <li style={css.li}><span style={css.roleBadge}>Moderator</span> — Content review and moderation capabilities</li>
          </ul>
          <p style={css.p}><strong>Your responsibilities include:</strong></p>
          <ul style={css.ul}>
            {[
              "Reviewing submitted articles for accuracy, quality, and compliance with platform guidelines",
              "Providing constructive feedback to authors when revisions are needed",
              "Publishing articles that meet quality standards",
              "Discarding content that violates guidelines with clear explanations",
              "Investigating and resolving user reports promptly and fairly",
              "Taking appropriate moderation actions on policy violations",
              "Responding to review requests and reports in a timely manner",
              "Maintaining professionalism in all communications with authors and users",
              "Ensuring fair and unbiased decision-making in all moderation activities",
            ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
          </ul>

          <h2 style={css.h2}>Privileges &amp; Access</h2>
          <ul style={css.ul}>
            {[
              "Access to the admin dashboard and review system",
              "Ability to self-assign articles for review",
              "Authority to publish or discard submitted content",
              "Manage and resolve user reports and community violations",
              "Take moderation actions (warn, block, ban users; remove/restore content)",
              "View analytics and contribution metrics",
              "Receive notifications for review requests and updates",
              "Single-device authentication for enhanced security",
            ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
          </ul>

          <h2 style={css.h2}>Code of Conduct</h2>
          <p style={css.p}><strong>As a member of the review team, you agree to:</strong></p>
          <ul style={css.ul}>
            {[
              ["Maintain Confidentiality", "Protect user information and unpublished content"],
              ["Act with Integrity", "Make unbiased decisions based on content quality and guidelines"],
              ["Fair Moderation", "Apply moderation actions consistently without bias or favoritism"],
              ["Respect Users", "Provide respectful, constructive feedback to all community members"],
              ["Follow Guidelines", "Adhere to UltimateHealth's content and community standards"],
              ["Thorough Investigation", "Fully investigate reports before taking action"],
              ["Report Issues", "Notify Super Admins of technical issues or policy violations"],
              ["Continuous Learning", "Stay updated on health information best practices"],
              ["Accountability", "Take responsibility for your moderation decisions"],
            ].map(([title, desc], i) => (
              <li key={i} style={css.li}><strong>{title}:</strong> {desc}</li>
            ))}
          </ul>

          <h2 style={css.h2}>Security &amp; Account Management</h2>
          <ul style={css.ul}>
            {[
              "Your account uses JWT-based authentication with automatic session management",
              "You can only be logged in on one device at a time for security",
              "Email verification is required before accessing admin features",
              "Regularly update your password and keep credentials secure",
              "Report any suspicious activity immediately",
            ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
          </ul>

          <h2 style={css.h2}>Content Review Standards</h2>
          <p style={css.p}><strong>Articles must meet the following criteria to be published:</strong></p>
          <ul style={css.ul}>
            {[
              "Medically accurate and evidence-based information",
              "Clear, well-structured, and grammatically correct writing",
              "Proper citations and credible sources",
              "Compliance with copyright and intellectual property laws",
              "Appropriate images with proper attribution",
              "No promotional or misleading content",
            ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
          </ul>

          <div style={css.highlight}>
            ⚠️ <strong>Important:</strong> Misuse of admin privileges, bias in content review, or breach of confidentiality
            may result in immediate revocation of access and termination from the review team.
          </div>

          <h2 style={css.h2}>Review Workflow</h2>
          <p style={css.p}><strong>Standard article review process:</strong></p>
          <ul style={css.ul}>
            {[
              ["Assignment", "Self-assign from available articles or receive direct assignments"],
              ["Review", "Thoroughly evaluate content against quality standards"],
              ["Feedback", "Provide detailed feedback if changes are needed (status: AWAITING_USER)"],
              ["Re-review", "Check author revisions when submitted (status: REVIEW_PENDING)"],
              ["Decision", "Publish approved articles or discard with explanation"],
              ["Notification", "Authors receive automated updates at each stage"],
            ].map(([title, desc], i) => (
              <li key={i} style={css.li}><strong>{title}:</strong> {desc}</li>
            ))}
          </ul>

          <h2 style={css.h2}>Report Resolution &amp; Moderation</h2>
          <p style={css.p}><strong>Available Moderation Actions:</strong></p>
          <ul style={css.ul}>
            {[
              ["RESOLVED", "Mark valid report as resolved. Decreases convict's active report count and sends resolution notification"],
              ["DISMISSED", "Dismiss false or invalid reports. Increases reporter's misuse count (automatic block after 3 dismissals)"],
              ["IGNORE", "Silently ignore report when convict/reporter is already banned or blocked"],
              ["WARN_CONVICT", "Issue warning and remove offending content. Three warnings result in automatic ban"],
              ["REMOVE_CONTENT", "Remove reported content (article, podcast, or comment) without issuing a warning"],
              ["BLOCK_CONVICT", "Temporarily block user for a set period (typically 1 month) for policy violations"],
              ["BAN_CONVICT", "Permanently ban user for severe or repeated violations"],
              ["RESTORE_CONTENT", "Restore previously removed content if removal was incorrect or upon valid appeal"],
              ["CONVICT_REQUEST_DISAPPROVED", "Reject user's request to restore their removed content"],
            ].map(([title, desc], i) => (
              <li key={i} style={css.li}><strong>{title}:</strong> {desc}</li>
            ))}
          </ul>

          <div style={css.highlight}>
            ⚠️ <strong>Important:</strong> Moderation actions directly impact user experience and platform integrity.
            Abuse of moderation powers, biased decisions, or failure to follow guidelines may result in removal from the moderation team.
          </div>

          <h2 style={css.h2}>Data Privacy &amp; Compliance</h2>
          <ul style={css.ul}>
            {[
              "User data must be handled in accordance with privacy regulations",
              "Personal information should not be shared outside the platform",
              "Review decisions must be documented and justified",
              "Maintain transparency in all moderation actions",
            ].map((item, i) => <li key={i} style={css.li}>{item}</li>)}
          </ul>

          <h2 style={css.h2}>Term &amp; Termination</h2>
          <p style={css.p}>
            This agreement remains in effect as long as you maintain an active admin or moderator account.
            Either party may terminate this agreement at any time. Upon termination, your access will be
            immediately revoked, and you must cease all use of admin privileges.
          </p>

          <h2 style={css.h2}>Updates to Agreement</h2>
          <p style={css.p}>
            UltimateHealth reserves the right to update this agreement. You will be notified of significant
            changes, and continued use of admin privileges constitutes acceptance of the updated terms.
          </p>

          <p style={{ marginTop: 25, paddingTop: 20, borderTop: "2px solid #e2e8f0", fontSize: 13, color: "#718096" }}>
            <strong>Last Updated:</strong> April 2026<br />
            For questions or concerns, please contact:{" "}
            <a href="mailto:ultimate.health25@gmail.com" style={{ color: "#667eea" }}>ultimate.health25@gmail.com</a>
          </p>
        </div>

        {/* Footer with signature + actions */}
        <div style={css.footerSection}>

          {alreadyAccepted && (
            <div style={{ ...css.msgBase, ...css.msgSuccess, marginBottom: 20 }}>
              ✓ You have already accepted this agreement. Redirecting...
            </div>
          )}

          {/* Signature Section */}
          <div style={css.signatureSection}>
            <h3 style={css.sigHeading}>Digital Signature</h3>

            {/* Full name */}
            <div style={css.inputGroup}>
              <label style={css.label}>Full Name <span style={{ color: "#e53e3e" }}>*</span></label>
              {locked ? (
                <div style={css.lockedField}>{fullName}</div>
              ) : (
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full legal name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={css.input}
                />
              )}
            </div>

            {/* Designation */}
            <div style={css.inputGroup}>
              <label style={css.label}>Designation/Role <span style={{ color: "#e53e3e" }}>*</span></label>
              {locked ? (
                <div style={css.lockedField}>{designation}</div>
              ) : (
                <input
                  id="designation"
                  type="text"
                  placeholder="e.g., Moderator, Content Reviewer"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  style={css.input}
                />
              )}
            </div>

            {/* Canvas / Locked image */}
            <div style={css.canvasContainer}>
              <label style={css.canvasLabel}>
                Draw Your Signature <span style={{ color: "#e53e3e" }}>*</span>
              </label>
              {locked && signatureDataUrl ? (
                <>
                  {/* NOTE: Keep as standard <img> element. next/image does not support dynamic base64/data URLs. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={signatureDataUrl} alt="Your signature" style={css.signatureImg} />
                </>
              ) : (
                <canvas
                  ref={canvasRef}
                  id="signatureCanvas"
                  style={css.canvas}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={stopDraw}
                />
              )}

              {!locked && (
                <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center", flexWrap: "wrap" as const }}>
                  <button type="button" id="clearBtn" onClick={clearSignature} style={css.btnClear}>
                    Clear Signature
                  </button>
                  <span style={{ fontSize: 12, color: "#718096", fontStyle: "italic" }}>
                    Draw your signature using mouse or touch
                  </span>
                </div>
              )}

              {!locked && hasSignature && !isSignatureValid() && (
                <div style={{ color: "#e53e3e", fontSize: 13, marginTop: 8, fontWeight: 500 }}>
                  ⚠️ Please draw a more complete signature
                </div>
              )}
            </div>

            {/* Signed timestamp */}
            {signedTimestamp && (
              <div style={{ marginTop: 15, padding: 12, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 13, color: "#166534" }}>
                <strong>✓ Signed on:</strong> {signedTimestamp}
              </div>
            )}
          </div>

          {/* Agreement checkbox */}
          <label style={css.checkboxContainer}>
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={agreed}
              disabled={locked}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: 20, height: 20, cursor: locked ? "default" : "pointer", accentColor: "#667eea", marginTop: 2, flexShrink: 0 }}
            />
            <span style={{ fontSize: 14, color: "#2d3748", lineHeight: 1.6, cursor: locked ? "default" : "pointer" }}>
              I have read and agree to the terms and conditions outlined in the Admin &amp; Moderator Agreement.
              I understand my responsibilities and commit to upholding the standards of the UltimateHealth platform.
              I confirm that the information and signature provided above are accurate and legally binding.
            </span>
          </label>

          {/* Buttons */}
          {!locked && (
            <div style={css.buttonGroup}>
              <button
                id="acceptBtn"
                disabled={!canAccept || loading}
                onClick={handleAccept}
                style={{
                  ...css.btn,
                  ...(canAccept && !loading ? css.btnAccept : css.btnAcceptDisabled),
                }}
              >
                {loading ? "Uploading..." : "Accept & Continue"}
              </button>
              <button id="declineBtn" onClick={handleDecline} style={{ ...css.btn, ...css.btnDecline }}>
                Decline
              </button>
            </div>
          )}

          {/* Message */}
          {message && (
            <div
              id="message"
              style={{
                ...css.msgBase,
                ...(message.type === "success" ? css.msgSuccess : message.type === "error" ? css.msgError : css.msgInfo),
                marginTop: 15,
              }}
            >
              {message.text}
            </div>
          )}
        </div>
      </PageWrapper>
    </Section>
  );
}

/* ---------- CSS-in-JS ---------- */
const css: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    color: "#333",
  },
  container: {
    background: "#ffffff",
    width: "100%",
    maxWidth: 900,
    borderRadius: 20,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    overflow: "hidden",
    animation: "slideIn 0.5s ease-out",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "40px 30px",
    textAlign: "center",
    position: "relative",
    borderBottom: "4px solid transparent",
    backgroundClip: "padding-box",
  },
  logo: {
    width: 60,
    height: 60,
    margin: "0 auto 15px",
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  h1: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: "-0.5px",
    color: "white",
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.95,
    fontWeight: 400,
    margin: 0,
    color: "white",
  },
  content: {
    padding: 40,
    maxHeight: 500,
    overflowY: "auto",
    background: "#fafbfc",
    scrollBehavior: "smooth",
  },
  h2: {
    color: "#667eea",
    fontSize: 20,
    marginTop: 25,
    marginBottom: 12,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  p: {
    lineHeight: 1.7,
    color: "#4a5568",
    fontSize: 15,
    marginBottom: 12,
  },
  ul: {
    marginLeft: 20,
    marginBottom: 15,
  },
  li: {
    lineHeight: 1.7,
    color: "#4a5568",
    fontSize: 15,
    marginBottom: 10,
    paddingLeft: 5,
  },
  highlight: {
    background: "#fff3cd",
    padding: "15px 20px",
    borderLeft: "4px solid #ffc107",
    borderRadius: 5,
    margin: "20px 0",
    fontWeight: 500,
    color: "#856404",
    fontSize: 15,
  },
  roleBadge: {
    display: "inline-block",
    padding: "4px 12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    margin: "0 5px",
  },
  footerSection: {
    background: "white",
    padding: "30px 40px",
    borderTop: "2px solid #e2e8f0",
  },
  signatureSection: {
    margin: "25px 0",
    padding: 20,
    background: "#f8f9fa",
    borderRadius: 10,
    border: "2px dashed #cbd5e0",
  },
  sigHeading: {
    fontSize: 16,
    marginBottom: 15,
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#4a5568",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e0",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
  },
  lockedField: {
    padding: "10px 12px",
    border: "1px solid #cbd5e0",
    borderRadius: 8,
    fontSize: 14,
    background: "#f7fafc",
    color: "#2d3748",
    fontWeight: 500,
  },
  canvasContainer: {
    marginTop: 10,
  },
  canvasLabel: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#4a5568",
    marginBottom: 8,
  },
  canvas: {
    width: "100%",
    height: 150,
    border: "2px solid #cbd5e0",
    borderRadius: 8,
    background: "white",
    cursor: "crosshair",
    touchAction: "none",
    display: "block",
  },
  signatureImg: {
    width: "100%",
    height: 150,
    border: "1px solid #ccc",
    borderRadius: 8,
    objectFit: "contain",
    display: "block",
  },
  btnClear: {
    padding: "8px 16px",
    background: "#f7fafc",
    color: "#4a5568",
    border: "1px solid #cbd5e0",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 20,
    padding: 15,
    background: "#f8f9fa",
    borderRadius: 10,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  buttonGroup: {
    display: "flex",
    gap: 15,
    flexWrap: "wrap" as const,
  },
  btn: {
    flex: 1,
    minWidth: 150,
    padding: "14px 25px",
    border: "none",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center" as const,
    fontFamily: "inherit",
  },
  btnAccept: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
  },
  btnAcceptDisabled: {
    background: "#cbd5e0",
    color: "#718096",
    cursor: "not-allowed",
  },
  btnDecline: {
    background: "#f7f7f7",
    color: "#4a5568",
    border: "2px solid #e2e8f0",
  },
  msgBase: {
    padding: "12px 18px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textAlign: "center" as const,
  },
  msgSuccess: {
    background: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  },
  msgError: {
    background: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  },
  msgInfo: {
    background: "#d1ecf1",
    color: "#0c5460",
    border: "1px solid #bee5eb",
  },
};

/* ---------- exported page (wraps in Suspense for useSearchParams) ---------- */
export default function AdminAgreementPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg,#667eea,#764ba2)", color: "white", fontSize: 18 }}>Loading...</div>}>
      <AdminAgreementContent />
    </Suspense>
  );
}
