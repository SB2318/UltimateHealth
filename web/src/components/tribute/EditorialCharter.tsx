"use client";

import { useTranslations, useLocale } from "next-intl";
import { ShieldCheck, Heart } from "lucide-react";
import {
  getLocalizedEditorialPromise,
  getLocalizedEndingManifesto,
} from "@/data/tribute-pillars-i18n";

export default function EditorialCharter() {
  const t = useTranslations("tribute");
  const locale = useLocale();

  const editorialPromise = getLocalizedEditorialPromise(locale);
  const manifesto = getLocalizedEndingManifesto(locale);

  return (
    <div
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "48px",
      }}
    >
      {/* Editorial Promise Card */}
      <div
        style={{
          background: "var(--explorer-surface, #ffffff)",
          border: "1px solid var(--explorer-border, #e2e8f0)",
          borderRadius: "24px",
          padding: "36px 30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <ShieldCheck size={24} style={{ color: "#0d9488" }} />
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "var(--site-heading, #0f172a)",
              margin: 0,
            }}
          >
            {t("charterPromiseTitle")}
          </h3>
        </div>

        <p
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.65,
            color: "var(--explorer-text-secondary, #475569)",
            marginBottom: "20px",
          }}
        >
          {t("charterPromiseSubtitle")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {editorialPromise.map((promise, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--explorer-bg, #f8fafc)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                borderRadius: "12px",
                padding: "12px 14px",
                fontSize: "0.82rem",
                lineHeight: 1.5,
                color: "var(--explorer-text-secondary, #334155)",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#e11d48",
                  marginTop: "6px",
                  flexShrink: 0,
                }}
              />
              <span>{promise}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(217, 119, 6, 0.08)",
            border: "1px solid rgba(217, 119, 6, 0.25)",
            borderRadius: "14px",
            padding: "14px 16px",
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: "var(--explorer-text-secondary, #475569)",
            marginBottom: "16px",
          }}
        >
          <strong style={{ color: "#d97706", display: "block", marginBottom: "4px" }}>
            {t("sourcingStandardTitle")}
          </strong>
          {t("sourcingStandardText")}
        </div>

        <div
          style={{
            background: "rgba(13, 148, 136, 0.08)",
            border: "1px solid rgba(13, 148, 136, 0.25)",
            borderRadius: "14px",
            padding: "14px 16px",
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: "var(--explorer-text-secondary, #334155)",
          }}
        >
          <strong style={{ color: "#0d9488", display: "block", marginBottom: "4px" }}>
            {t("correctionsPolicyTitle")}
          </strong>
          {t("correctionsPolicyText", { email: "ultimate.health25@gmail.com" })}
        </div>
      </div>

      {/* The Ending Manifesto */}
      <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(244, 63, 94, 0.12)",
            color: "#e11d48",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <Heart size={22} style={{ fill: "#e11d48", color: "#e11d48" }} />
        </div>

        <h3
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 800,
            color: "var(--site-heading, #0f172a)",
            lineHeight: 1.25,
            margin: "0 0 20px",
          }}
        >
          {t("manifestoHeadline")} <br />
          <span style={{ color: "#e11d48" }}>{t("manifestoHighlight")}</span>
        </h3>

        <div
          style={{
            fontSize: "clamp(0.98rem, 1.6vw, 1.1rem)",
            lineHeight: 1.75,
            color: "var(--explorer-text-secondary, #475569)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {manifesto.paragraphs.map((para, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              {para}
            </p>
          ))}
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#be123c",
              fontFamily: "inherit",
              fontStyle: "normal",
            }}
          >
            {manifesto.finalCallout}
          </p>
        </div>
      </div>
    </div>
  );
}
