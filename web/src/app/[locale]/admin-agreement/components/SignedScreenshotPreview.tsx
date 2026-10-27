import React from "react";

interface SignedScreenshotPreviewProps {
  signedScreenshotUrl: string;
  fullName: string;
}

export default function SignedScreenshotPreview({
  signedScreenshotUrl,
  fullName,
}: SignedScreenshotPreviewProps) {
  const downloadScreenshot = () => {
    const a = document.createElement("a");
    a.href = signedScreenshotUrl;
    a.download = `${fullName.trim().replace(/\s+/g, "_")}_Signed_Admin_Agreement.png`;
    a.click();
  };

  return (
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
          onClick={downloadScreenshot}
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
  );
}
