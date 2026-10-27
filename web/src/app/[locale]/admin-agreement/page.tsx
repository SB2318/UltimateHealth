"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageWrapper, Section } from "@/components/layout";
import { withBasePath } from "@/lib/basePath";
import {
  canvasPixelsHaveInk,
  denormalizeCanvasPoint,
  isSignatureValid as hasValidSignatureBounds,
  isValidCanvasRect,
  normalizeCanvasPoint,
} from "./signatureValidation";

/* ---------- types ---------- */
interface Point { x: number; y: number }
type Stroke = Point[];

const SIGNATURE_STROKE = "#2d3748";
const SIGNATURE_LINE_WIDTH = 2;

async function generateCanvasCertificateFallback(
  fullName: string,
  role: string,
  email: string,
  phone: string,
  timestamp: string,
  signatureDataUrl: string
): Promise<{ blob: Blob; dataUrl: string; base64: string }> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 1600);

    // Border
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, 1160, 1560);

    ctx.strokeStyle = "#e0e7ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 1136, 1536);

    // Header gradient
    const grad = ctx.createLinearGradient(0, 36, 1200, 220);
    grad.addColorStop(0, "#4f46e5");
    grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad;
    ctx.fillRect(34, 34, 1132, 180);

    // Header text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ULTIMATEHEALTH - ADMIN & MODERATOR AGREEMENT", 600, 105);
    ctx.font = "18px sans-serif";
    ctx.fillText("Official Certified Reviewer Agreement & Verification Record", 600, 145);

    // Body
    ctx.textAlign = "left";
    ctx.fillStyle = "#1e293b";

    let y = 265;
    const drawSectionTitle = (title: string) => {
      ctx.fillStyle = "#4f46e5";
      ctx.font = "bold 21px sans-serif";
      ctx.fillText(title, 60, y);
      y += 8;
      ctx.strokeStyle = "#c7d2fe";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(1140, y);
      ctx.stroke();
      y += 28;
      ctx.fillStyle = "#1e293b";
      ctx.font = "16px sans-serif";
    };

    drawSectionTitle("1. APPLICANT & CREDENTIAL DETAILS");
    ctx.fillText(`• Full Legal Name: ${fullName}`, 70, y); y += 26;
    ctx.fillText(`• Designation / Role: ${role}`, 70, y); y += 26;
    ctx.fillText(`• Official Email: ${email}`, 70, y); y += 26;
    if (phone) {
      ctx.fillText(`• Phone Number: ${phone}`, 70, y); y += 26;
    }
    ctx.fillText(`• Certified Timestamp: ${timestamp}`, 70, y); y += 26;
    ctx.fillText(`• Verification Status: Digitally Signed & Officially Archived`, 70, y); y += 40;

    drawSectionTitle("2. CORE CLINICAL STANDARDS & NON-DIAGNOSTIC BOUNDARY");
    ctx.fillText("• UltimateHealth provides health education, non-diagnostic guidance, and triage only.", 70, y); y += 26;
    ctx.fillText("• All administrators and moderators agree to strictly maintain professional non-diagnostic boundaries.", 70, y); y += 26;
    ctx.fillText("• Content review and moderation must be objective, evidence-based, transparent, and respectful.", 70, y); y += 26;
    ctx.fillText("• Patient confidentiality is strictly maintained; user data is never shared without authorization.", 70, y); y += 40;

    drawSectionTitle("3. PROFESSIONAL CONDUCT & COMMUNITY INTEGRITY");
    ctx.fillText("• Review submissions thoroughly against verified medical standards and guidelines.", 70, y); y += 26;
    ctx.fillText("• Provide constructive, clear feedback to authors when revisions or corrections are required.", 70, y); y += 26;
    ctx.fillText("• Adhere to zero-tolerance policy against bias, misinformation, and misuse of moderation privileges.", 70, y); y += 40;

    drawSectionTitle("4. DIGITAL SIGNATURE & OFFICIAL VERIFICATION RECORD");
    ctx.fillText(`Applicant Digital Signature — Stamped by: ${fullName} (${role})`, 70, y); y += 24;

    const finalize = () => {
      // Seal / badge next to signature
      ctx.strokeStyle = "#16a34a";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(580, y, 520, 140);
      ctx.fillStyle = "#f0fdf4";
      ctx.fillRect(582, y + 2, 516, 136);

      ctx.fillStyle = "#166534";
      ctx.font = "bold 19px sans-serif";
      ctx.fillText("✓ VERIFIED & DIGITALLY ARCHIVED", 605, y + 45);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#15803d";
      ctx.fillText(`Signed Timestamp: ${timestamp}`, 605, y + 75);
      ctx.fillText("Official UltimateHealth Editorial & Review Board Record", 605, y + 105);

      // Footer
      ctx.fillStyle = "#64748b";
      ctx.font = "13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("UltimateHealth Platform • https://ultimatehealth.blog • Official Document ID: UH-AGR-VERIFIED", 600, 1530);

      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
      canvas.toBlob((blob) => {
        resolve({ blob: blob || new Blob([], { type: "image/png" }), dataUrl, base64 });
      }, "image/png", 0.95);
    };

    if (signatureDataUrl) {
      const sigImg = new Image();
      sigImg.onload = () => {
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1;
        ctx.strokeRect(70, y, 450, 140);
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(71, y + 1, 448, 138);
        ctx.drawImage(sigImg, 80, y + 10, 430, 120);
        finalize();
      };
      sigImg.onerror = () => {
        finalize();
      };
      sigImg.src = signatureDataUrl;
    } else {
      finalize();
    }
  });
}

async function captureAgreementScreenshot(
  containerEl: HTMLElement,
  fullName: string,
  role: string,
  email: string,
  phone: string,
  timestamp: string,
  signatureDataUrl: string
): Promise<{ blob: Blob; dataUrl: string; base64: string }> {
  try {
    const html2canvasModule = await import("html2canvas");
    const html2canvas = html2canvasModule.default || html2canvasModule;

    const canvas = await html2canvas(containerEl, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: containerEl.scrollWidth || 1024,
      onclone: (clonedDoc: Document) => {
        const clonedContent = clonedDoc.querySelector(".agreement-scroll-content") as HTMLElement | null;
        if (clonedContent) {
          clonedContent.style.maxHeight = "none";
          clonedContent.style.overflow = "visible";
          clonedContent.style.height = "auto";
        }
        const hideElements = clonedDoc.querySelectorAll(".hide-in-agreement-screenshot");
        hideElements.forEach((el) => {
          (el as HTMLElement).style.display = "none";
        });
      },
    });

    const dataUrl = canvas.toDataURL("image/png");
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))), "image/png", 0.95);
    });

    return { blob, dataUrl, base64 };
  } catch (error) {
    console.warn("html2canvas capture error, utilizing high-resolution canvas certificate fallback:", error);
    return generateCanvasCertificateFallback(fullName, role, email, phone, timestamp, signatureDataUrl);
  }
}

/* ---------- inner component (needs useSearchParams) ---------- */
function AdminAgreementContent() {
  const searchParams = useSearchParams();

  // form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofFileName, setProofFileName] = useState("");
  const [proofFileBase64, setProofFileBase64] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  // ui state
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signedTimestamp, setSignedTimestamp] = useState<string | null>(null);
  const [signedScreenshotUrl, setSignedScreenshotUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const activeStrokeRef = useRef<Stroke>([]);

  /* ---------- helpers ---------- */
  const isValidFullName = (name: string) =>
    name.trim().split(" ").filter((p) => p.length > 0).length >= 2;

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const canvasHasInk = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return false;

    // Read pixels from the full device-pixel backing store.
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    return canvasPixelsHaveInk(pixels);
  }, []);

  const isSignatureValid = useCallback(() => {
    return hasValidSignatureBounds(strokes);
  }, [strokes]);

  const canAccept =
    isValidFullName(fullName) &&
    isValidEmail(email) &&
    designation.trim() !== "" &&
    isSignatureValid() &&
    agreed;

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

  /* ---------- canvas setup ---------- */
  const drawStrokes = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    strokesRef.current.forEach((stroke) => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      // stroke points are normalized to CSS pixels; with ctx.scale(pixelRatio, pixelRatio)
      // they map to device pixels consistently.
      ctx.moveTo(stroke[0].x * width, stroke[0].y * height);
      stroke.slice(1).forEach((point) => ctx.lineTo(point.x * width, point.y * height));
      ctx.stroke();
      ctx.closePath();
    });
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (!isValidCanvasRect(rect)) return;

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * pixelRatio);
    canvas.height = Math.round(rect.height * pixelRatio);
    const ctx = canvas.getContext("2d")!;
    // Use device-pixel coordinates consistently by scaling the drawing
    // calls themselves. This avoids mixing CSS-space points with a scaled
    // transform, which causes ink detection inconsistencies on DPR>1.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.strokeStyle = SIGNATURE_STROKE;
    ctx.lineWidth = SIGNATURE_LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    drawStrokes(ctx, rect.width, rect.height);

    const lastPoint = activeStrokeRef.current.at(-1);
    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x * rect.width, lastPoint.y * rect.height);
    }
  }, [drawStrokes]);

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAlreadyAccepted(true);
        const redirectUrl = searchParams.get("redirect") || "/admin/dashboard";
        setTimeout(() => { window.location.href = redirectUrl; }, 3000);
      }
    } catch { /* ignore */ }
  }, [searchParams]);

  /* ---------- canvas drawing ---------- */
  const getPos = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientPoint = "touches" in e ? e.touches[0] : e;
    if (!clientPoint) return null;

    return normalizeCanvasPoint(clientPoint.clientX, clientPoint.clientY, rect);
  };

  const toCanvasPoint = (point: Point): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    return denormalizeCanvasPoint(point, canvas.getBoundingClientRect());
  };

  const updateStrokes = (nextStrokes: Stroke[]) => {
    strokesRef.current = nextStrokes;
    setStrokes(nextStrokes);
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (locked) return;

    const pos = getPos(e);
    if (!pos) return;

    const canvasPoint = toCanvasPoint(pos);
    if (!canvasPoint) return;

    activeStrokeRef.current = [pos];
    updateStrokes([...strokesRef.current, activeStrokeRef.current]);
    setIsDrawing(true);

    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    // canvasPoint is in CSS-pixel space; ctx.scale() already maps to device pixels.
    ctx.moveTo(canvasPoint.x, canvasPoint.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || locked) return;

    const pos = getPos(e);
    if (!pos) return;

    const activeStroke = [...activeStrokeRef.current, pos];
    activeStrokeRef.current = activeStroke;
    updateStrokes([...strokesRef.current.slice(0, -1), activeStroke]);

    const canvasPoint = toCanvasPoint(pos);
    if (!canvasPoint) return;

    const ctx = canvasRef.current!.getContext("2d")!;
    // canvasPoint is in CSS-pixel space; ctx.scale() already maps to device pixels.
    ctx.lineTo(canvasPoint.x, canvasPoint.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDraw = () => {
    if (isDrawing) {
      canvasRef.current!.getContext("2d")!.closePath();
      activeStrokeRef.current = [];
      setIsDrawing(false);
    }
  };

  const clearSignature = () => {
    if (locked) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    activeStrokeRef.current = [];
    updateStrokes([]);
    setHasSignature(false);
  };

  /* ---------- showMessage helper ---------- */
  const showMessage = (type: "success" | "error" | "info", text: string, autohide = false) => {
    setMessage({ text, type });
    if (autohide) setTimeout(() => setMessage(null), 5000);
  };

  /* ---------- accept ---------- */
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
    if (!isSignatureValid() || !canvasHasInk()) {
      showMessage("error", "✗ Please provide a valid signature", true);
      return;
    }
    if (!agreed) {
      showMessage("error", "✗ Please accept the agreement terms", true);
      return;
    }

    setLoading(true);
    showMessage("info", "Submitting application and doctor verification proof...");

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
      /* PREVIOUS API CALL (Commented out as requested):
      const token = searchParams.get("token");
      const response = await fetch("https://ultimatehealth.blog/api/admin/upload-agreement", {
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
      */

      // 1. Wait a tick for React DOM to render locked state with signature image and timestamp
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

      const attachments: Array<{ filename: string; contentType: string; content: string; data: string; encoding: string }> = [
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
      <PageWrapper as="div">
        <div ref={containerRef} id="agreement-container" style={css.container}>

        {/* Header */}
        <div style={css.header}>
          <div style={css.logo}>⚕️</div>
          <h1 style={css.h1}>Admin &amp; Moderator Agreement</h1>
          <p style={css.subtitle}>UltimateHealth Platform</p>
        </div>

        {/* Agreement content */}
        <div className="agreement-scroll-content" style={css.content}>
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

            {/* Canvas / Locked image */}
            <div style={css.canvasContainer}>
              <label style={css.canvasLabel}>
                Draw Your Signature <span style={{ color: "#e53e3e" }}>*</span>
              </label>
              {locked && signatureDataUrl ? (
                <>
                  {/* NOTE: Keep as standard <img> element. next/image does not support dynamic base64/data URLs. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={signatureDataUrl} alt="Your drawn digital signature" loading="lazy" style={css.signatureImg} />
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
                  <button type="button" id="clearBtn" className="hide-in-agreement-screenshot" onClick={clearSignature} style={css.btnClear}>
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

          {/* Signed Agreement Page Screenshot Preview & Download */}
          {signedScreenshotUrl && (
            <div style={{ marginTop: 24, padding: 20, background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
                    📸 Verified Agreement Page Screenshot
                  </h4>
                  <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>
                    Captured and digitally stamped with your verified signature. Attached directly to your application.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = signedScreenshotUrl;
                    a.download = `${fullName.trim().replace(/\s+/g, "_")}_Signed_Admin_Agreement.png`;
                    a.click();
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    background: "#0d9488",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(13, 148, 136, 0.25)",
                  }}
                >
                  📥 Download Agreement Screenshot (PNG)
                </button>
              </div>
              <div style={{ maxHeight: 380, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 8, background: "#ffffff", padding: 10, textAlign: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={signedScreenshotUrl}
                  alt="Official Signed Admin Agreement Screenshot"
                  style={{ maxWidth: "100%", height: "auto", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                />
              </div>
            </div>
          )}
        </div>
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
