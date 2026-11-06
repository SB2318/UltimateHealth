"use client";

import { HeartHandshake, Shield, ExternalLink, CheckCircle, FileText, Lock } from "lucide-react";
import { SURVIVOR_VOICES, SURVIVOR_CONSENT_FRAMEWORK } from "@/data/tribute-profiles";

export default function SurvivorVoicesSection() {
  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Pillar Introduction Banner */}
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto 36px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            borderRadius: "50px",
            fontSize: "0.75rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            background: "rgba(13, 148, 136, 0.12)",
            color: "#0d9488",
            border: "1px solid rgba(13, 148, 136, 0.3)",
            marginBottom: "12px",
          }}
        >
          <HeartHandshake size={14} />
          Pillar B · Survivor Voices & Agency
        </div>

        <h2
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
            fontWeight: 800,
            color: "var(--site-heading, #0f172a)",
            lineHeight: 1.25,
            margin: "0 0 12px",
          }}
        >
          Listen with Dignity & Respect
        </h2>

        <p
          style={{
            fontSize: "0.96rem",
            lineHeight: 1.65,
            color: "var(--explorer-text-secondary, #475569)",
            margin: 0,
          }}
        >
          Survivors are not passive victims. They are individuals with autonomy, leadership, and moral agency who choose to share their lived experiences to transform health, protect vulnerable communities, and dismantle cycles of violence.
        </p>
      </div>

      {/* Survivor Voices Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto 48px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {SURVIVOR_VOICES.map((survivor) => (
          <div
            key={survivor.id}
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "22px",
              padding: "28px 24px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div>
              {/* Header Badge & Country */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "#0d9488",
                    background: "rgba(13, 148, 136, 0.1)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(13, 148, 136, 0.25)",
                  }}
                >
                  Public Testimony
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-secondary, #64748b)" }}>
                  {survivor.countryFlag} {survivor.country} · {survivor.eraOrYear}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--site-heading, #0f172a)",
                  margin: "0 0 4px",
                }}
              >
                {survivor.name}
              </h3>

              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#e11d48",
                  marginBottom: "14px",
                }}
              >
                {survivor.displayRole}
              </div>

              {/* Verified Quote if Present */}
              {survivor.verifiedQuote && (
                <div
                  style={{
                    background: "rgba(13, 148, 136, 0.08)",
                    borderLeft: "3px solid #0d9488",
                    padding: "10px 14px",
                    borderRadius: "0 8px 8px 0",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0d9488", marginBottom: "3px" }}>
                    Verified Historical Words:
                  </div>
                  <div style={{ fontSize: "0.86rem", fontStyle: "italic", lineHeight: 1.5, color: "var(--site-heading, #1e293b)", marginBottom: "3px" }}>
                    &ldquo;{survivor.verifiedQuote.quote}&rdquo;
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                    — {survivor.verifiedQuote.source}
                  </div>
                </div>
              )}

              {/* Experience and Advocacy */}
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--site-heading, #0f172a)",
                    marginBottom: "6px",
                  }}
                >
                  Lived Experience & Action:
                </div>
                <p
                  style={{
                    fontSize: "0.86rem",
                    lineHeight: 1.65,
                    color: "var(--explorer-text-secondary, #475569)",
                    margin: 0,
                  }}
                >
                  {survivor.livedExperienceAndAdvocacy}
                </p>
              </div>

              {/* Societal Reform Message */}
              <div
                style={{
                  background: "rgba(244, 63, 94, 0.05)",
                  borderLeft: "3px solid #e11d48",
                  borderRadius: "0 8px 8px 0",
                  padding: "10px 14px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#e11d48",
                    marginBottom: "4px",
                  }}
                >
                  Societal Reform Message:
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.55,
                    color: "var(--explorer-text-secondary, #334155)",
                    margin: 0,
                  }}
                >
                  {survivor.societalReformMessage}
                </p>
              </div>
            </div>

            {/* References Footer */}
            <div
              style={{
                paddingTop: "14px",
                borderTop: "1px solid var(--explorer-border, #e2e8f0)",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {survivor.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#0d9488",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <span>{ref.publisher || "Source"}</span>
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>

              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#64748b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <CheckCircle size={12} style={{ color: "#0d9488" }} />
                {survivor.consentProtocol.consentVerified
                  ? "Informed Consent Verified"
                  : "Based on own published statements"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Survivor Consent and Privacy Charter */}
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          background: "var(--explorer-surface, #ffffff)",
          border: "1.5px solid rgba(13, 148, 136, 0.3)",
          borderRadius: "22px",
          padding: "32px 28px",
          boxShadow: "0 6px 24px rgba(0,0,0,0.03)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <Shield size={24} style={{ color: "#0d9488" }} />
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "var(--site-heading, #0f172a)",
              margin: 0,
            }}
          >
            {SURVIVOR_CONSENT_FRAMEWORK.title}
          </h3>
        </div>

        <p
          style={{
            fontSize: "0.88rem",
            lineHeight: 1.65,
            color: "var(--explorer-text-secondary, #475569)",
            marginBottom: "24px",
          }}
        >
          {SURVIVOR_CONSENT_FRAMEWORK.description}
        </p>

        <p
          style={{
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: "#b45309",
            background: "rgba(217, 119, 6, 0.08)",
            border: "1px solid rgba(217, 119, 6, 0.25)",
            borderRadius: "10px",
            padding: "10px 12px",
            marginBottom: "24px",
          }}
        >
          The two profiles above are internationally known public figures. They are summarised only from their own published testimony and public records; they have not gone through this consent workflow. The workflow below applies to all future personal stories submitted to UltimateHealth.
        </p>

        {/* 7 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          {SURVIVOR_CONSENT_FRAMEWORK.steps.map((item) => (
            <div
              key={item.step}
              style={{
                background: "var(--explorer-bg, #f8fafc)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                borderRadius: "14px",
                padding: "14px",
                fontSize: "0.82rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "#0d9488",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "4px",
                }}
              >
                Step {item.step}: {item.title}
              </div>
              <p style={{ margin: 0, lineHeight: 1.5, color: "var(--explorer-text-secondary, #334155)" }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy Pledge */}
        <div
          style={{
            background: "rgba(13, 148, 136, 0.08)",
            border: "1px solid rgba(13, 148, 136, 0.25)",
            borderRadius: "14px",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: "0.76rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#0d9488",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            <Lock size={14} />
            Unconditional Privacy Pledge:
          </div>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.82rem", lineHeight: 1.6, color: "var(--explorer-text-secondary, #334155)" }}>
            {SURVIVOR_CONSENT_FRAMEWORK.privacyPledge.map((pledge, idx) => (
              <li key={idx}>{pledge}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
