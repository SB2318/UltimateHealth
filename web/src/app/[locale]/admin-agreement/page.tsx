"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageWrapper, Section } from "@/components/layout";
import { withBasePath } from "@/lib/basePath";
import { canvasPixelsHaveInk } from "./signatureValidation";

import type { AgreementMessage } from "./types";
import { agreementStyles as css } from "./styles";
import { captureAgreementScreenshot } from "./agreementScreenshot";
import AgreementHeader from "./components/AgreementHeader";
import AgreementTermsContent from "./components/AgreementTermsContent";
import SignaturePad from "./components/SignaturePad";
import SignedScreenshotPreview from "./components/SignedScreenshotPreview";

function AdminAgreementContent() {
  const searchParams = useSearchParams();

  // Form input state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofFileName, setProofFileName] = useState("");
  const [proofFileBase64, setProofFileBase64] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Signature state
  const [hasSignature, setHasSignature] = useState(false);
  const [isSigValid, setIsSigValid] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);
  const [signedScreenshotUrl, setSignedScreenshotUrl] = useState<string | null>(null);

  // Workflow state
  const [message, setMessage] = useState<AgreementMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState(false);
  const [locked, setLocked] = useState(false);

  // Element references
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------- Validation Helpers ---------- */
  const isValidFullName = (name: string) =>
    name.trim().split(" ").filter((p) => p.length > 0).length >= 2;

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const canvasHasInk = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return false;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    return canvasPixelsHaveInk(pixels);
  }, []);

  const handleSignatureChange = useCallback((hasSig: boolean, valid: boolean) => {
    setHasSignature(hasSig);
    setIsSigValid(valid);
  }, []);

  const canAccept =
    isValidFullName(fullName) &&
    isValidEmail(email) &&
    designation.trim() !== "" &&
    hasSignature &&
    isSigValid &&
    agreed;

  /* ---------- Proof Document Upload ---------- */
  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      showMessage("error", "✗ Please upload a valid PDF document for doctor verification.", true);
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showMessage("error", "✗ PDF document size must be under 15 MB.", true);
      return;
    }

    setProofFile(file);
    setProofFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setProofFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeProof = () => {
    setProofFile(null);
    setProofFileName("");
    setProofFileBase64("");
  };

  /* ---------- Already-Accepted Check ---------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("adminAgreementAccepted");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.accepted && data.version === "2.0.0") {
        setAlreadyAccepted(true);
        const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
        setTimeout(() => { window.location.href = redirectUrl; }, 3000);
      }
    } catch { /* ignore */ }
  }, [searchParams]);

  /* ---------- Feedback message helper ---------- */
  const showMessage = (type: "success" | "error" | "info", text: string, autohide = false) => {
    setMessage({ text, type });
    if (autohide) setTimeout(() => setMessage(null), 5000);
  };

  /* ---------- Accept & Submit Agreement Workflow ---------- */
  const handleAccept = async () => {
    if (!isValidFullName(fullName)) {
      showMessage("error", "✗ Please enter your full name (at least 2 words)", true);
      return;
    }
    if (!isValidEmail(email)) {
      showMessage("error", "✗ Please enter a valid email address", true);
      return;
    }
    if (!designation.trim()) {
      showMessage("error", "✗ Please enter your designation / clinical role", true);
      return;
    }
    if (!proofFile) {
      showMessage("error", "✗ Please upload your doctor verification or working proof PDF document", true);
      return;
    }
    if (!isSigValid || !canvasHasInk()) {
      showMessage("error", "✗ Please provide a valid signature", true);
      return;
    }
    if (!agreed) {
      showMessage("error", "✗ Please accept the agreement terms", true);
      return;
    }

    setLoading(true);
    showMessage("info", "Capturing signed agreement screenshot and submitting verification...");

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
      // 1. Wait a tick for React to render locked state with signature image and timestamp
      await new Promise((r) => setTimeout(r, 120));

      const agreementContainer = containerRef.current || document.getElementById("agreement-container");
      if (!agreementContainer) {
        throw new Error("Agreement document container element was not found");
      }

      // 2. Capture the entire signed agreement page as a crisp high-res screenshot
      const screenshot = await captureAgreementScreenshot(
        agreementContainer,
        fullName.trim(),
        designation.trim() || "Doctor/Medical Reviewer",
        email.trim(),
        phone.trim(),
        ts,
        dataUrl
      );

      setSignedScreenshotUrl(screenshot.dataUrl);

      const cleanName = fullName.trim().replace(/\s+/g, "_");
      const screenshotFileName = `${cleanName}_Signed_Admin_Agreement.png`;

      // 3. Build FormData payload for /admin-agreement/apply
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      if (phone.trim()) formData.append("phone", phone.trim());
      formData.append("role", designation.trim() || "Doctor/Medical Reviewer");
      formData.append("designation", designation.trim());
      formData.append("experience", designation.trim());

      const structuredMessage = `=====================================================
ULTIMATEHEALTH - ADMIN & MODERATOR AGREEMENT
=====================================================
Applicant: ${fullName.trim()}
Email: ${email.trim()}
Phone: ${phone.trim() || "N/A"}
Designation: ${designation.trim()}
Signed Timestamp: ${ts}
Agreement Document: ${screenshotFileName} (Official Page Screenshot)
${proofFileName ? `Doctor Working Proof: ${proofFileName}` : ""}

TERMS ACCEPTED:
[X] Core Clinical Standards: Educational guidance only, strict non-diagnostic boundary
[X] Professional Conduct: Objective moderation & community safety
[X] Patient Confidentiality: No unauthorized sharing of user data
[X] Digital Signature Stamped & Logged via Page Screenshot
=====================================================`;
      formData.append("message", structuredMessage);

      // Attach the verified agreement page screenshot image as "resume"
      formData.append("resume", screenshot.blob, screenshotFileName);

      // Also attach the doctor's uploaded proof document if present
      if (proofFile) {
        formData.append("proof", proofFile, proofFileName || "Doctor_Working_Proof.pdf");
        formData.append("document", proofFile, proofFileName || "Doctor_Working_Proof.pdf");
      }

      // 4. Submit directly to /admin-agreement/apply endpoint
      const response = await fetch("https://ultimatehealth.blog/api/admin-agreement/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error?.message ||
          (typeof data.error === "string" ? data.error : null) ||
          "Application submission failed"
        );
      }

      // 5. Background notification dispatch (with agreement screenshot and doctor working proof)
      const cleanProofBase64 = proofFileBase64.includes(",")
        ? proofFileBase64.split(",")[1]
        : proofFileBase64;

      const attachments = [
        {
          filename: screenshotFileName,
          contentType: "image/png",
          content: screenshot.base64,
          data: screenshot.dataUrl,
          encoding: "base64",
        },
      ];

      if (proofFile && proofFileBase64) {
        attachments.push({
          filename: proofFileName || "Doctor_Working_Proof.pdf",
          contentType: "application/pdf",
          content: cleanProofBase64,
          data: proofFileBase64,
          encoding: "base64",
        });
      }

      fetch(withBasePath("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          subject: `Doctor Verification Application: ${fullName.trim()} - ${designation.trim()}`,
          message: structuredMessage,
          attachments,
        }),
      }).catch(() => {
        // Non-blocking notification
      });

      localStorage.setItem("adminAgreementAccepted", "true");

      const appId = data.data?.applicationId ? ` (Ref ID: ${data.data.applicationId})` : "";
      showMessage(
        "success",
        `✓ Application & signed agreement submitted successfully${appId}! Our verification team has received your documents and will review your profile.`
      );
    } catch (err: unknown) {
      setLocked(false);
      showMessage("error", "✗ " + (err instanceof Error ? err.message : "Unknown error"), true);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Decline Workflow ---------- */
  const handleDecline = () => {
    if (!confirm("Are you sure you want to decline? You will be logged out and will not have access to admin features.")) return;
    showMessage("info", "Declining agreement and logging out...");
    localStorage.removeItem("adminAgreementAccepted");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setTimeout(() => { window.location.href = "/admin/logout"; }, 1000);
  };

  return (
    <Section as="div" style={css.body}>
      <PageWrapper as="div" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", margin: "0 auto" }}>
        <div ref={containerRef} id="agreement-container" style={css.container}>
          {/* Header */}
          <AgreementHeader />

          {/* Agreement Text Content */}
          <AgreementTermsContent />

          {/* Footer Form with Signature & Actions */}
          <div style={css.footerSection}>
            {alreadyAccepted && (
              <div style={{ ...css.msgBase, ...css.msgSuccess, marginBottom: 20 }}>
                ✓ You have already accepted this agreement. Redirecting...
              </div>
            )}

            {/* Signature Section */}
            <div style={css.signatureSection}>
              <h3 style={css.sigHeading}>Digital Signature</h3>

              {/* Full Name */}
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

              {/* Email */}
              <div style={css.inputGroup}>
                <label style={css.label}>Email Address <span style={{ color: "#e53e3e" }}>*</span></label>
                {locked ? (
                  <div style={css.lockedField}>{email}</div>
                ) : (
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g., doctor@hospital.org"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={css.input}
                  />
                )}
              </div>

              {/* Phone Number */}
              <div style={css.inputGroup}>
                <label style={css.label}>Phone Number</label>
                {locked ? (
                  <div style={css.lockedField}>{phone || "—"}</div>
                ) : (
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g., +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    placeholder="e.g., Medical Officer, Clinical Specialist, Moderator"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    style={css.input}
                  />
                )}
              </div>

              {/* Doctor or Working Proof (PDF) */}
              <div style={css.inputGroup}>
                <label style={css.label}>
                  Doctor Verification / Working Proof (PDF) <span style={{ color: "#e53e3e" }}>*</span>
                </label>
                {locked ? (
                  <div style={css.lockedField}>
                    📄 {proofFileName || "Doctor_Verification_Proof.pdf"}
                  </div>
                ) : (
                  <div>
                    {proofFileName ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8 }}>
                        <span style={{ fontSize: 13, color: "#166534", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                          📄 {proofFileName}
                        </span>
                        <button
                          type="button"
                          onClick={removeProof}
                          style={{ background: "transparent", border: "none", color: "#dc2626", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "4px 8px" }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          id="doctorProof"
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={handleProofChange}
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="doctorProof"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            borderRadius: 8,
                            border: "1px dashed #6366f1",
                            background: "#eef2ff",
                            color: "#4338ca",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                        >
                          📎 Upload Doctor or Hospital Working Proof (PDF, max 15MB)
                        </label>
                        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6b7280" }}>
                          Upload your medical license, hospital ID card, or official working credential in PDF format.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Canvas Digital Signature Pad */}
              <SignaturePad
                locked={locked}
                signatureDataUrl={signatureDataUrl}
                onSignatureChange={handleSignatureChange}
                canvasRef={canvasRef}
              />

              {/* Signed Timestamp */}
              {signedTimestamp && (
                <div style={{ marginTop: 15, padding: 12, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 13, color: "#166534", textAlign: "center" }}>
                  <strong>✓ Signed on:</strong> {signedTimestamp}
                </div>
              )}
            </div>

            {/* Agreement Checkbox */}
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
              <div className="hide-in-agreement-screenshot" style={css.buttonGroup}>
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

            {/* Feedback Message */}
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

            {/* Signed Agreement Page Screenshot Preview & Download */}
            {signedScreenshotUrl && (
              <SignedScreenshotPreview
                signedScreenshotUrl={signedScreenshotUrl}
                fullName={fullName}
              />
            )}
          </div>
        </div>
      </PageWrapper>
    </Section>
  );
}

export default function AdminAgreementPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg,#667eea,#764ba2)", color: "white", fontSize: 18 }}>Loading...</div>}>
      <AdminAgreementContent />
    </Suspense>
  );
}
