import type { ScreenshotCaptureResult } from "./types";


export async function generateCanvasCertificateFallback(
  fullName: string,
  role: string,
  email: string,
  phone: string,
  timestamp: string,
  signatureDataUrl: string
): Promise<ScreenshotCaptureResult> {
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


export async function captureAgreementScreenshot(
  containerEl: HTMLElement,
  fullName: string,
  role: string,
  email: string,
  phone: string,
  timestamp: string,
  signatureDataUrl: string
): Promise<ScreenshotCaptureResult> {
  try {
    let html2canvasModule;
    try {
      html2canvasModule = await import("html2canvas-pro");
    } catch {
      html2canvasModule = await import("html2canvas");
    }
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
