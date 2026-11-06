"use client";

import { ShieldCheck, Heart } from "lucide-react";
import { EDITORIAL_PROMISE } from "@/data/tribute-profiles";

export default function EditorialCharter() {
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
            UltimateHealth Editorial Promise
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
          We hold this tribute to rigorous ethical, fact-checking, and human dignity standards to prevent sensationalism and honor every life with truth:
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {EDITORIAL_PROMISE.map((promise, idx) => (
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
            Research-Quality Sourcing & Legal Attribution:
          </strong>
          Biographical entries are grounded in primary evidence: Supreme Court judicial records, gazette notifications, university records, recognized human rights monitoring bodies (Amnesty, CPJ, Front Line Defenders, Goldman Foundation), Nobel Foundation records, and reputable journalistic archives. Allegations are never presented as convictions, and quotations are only attributed when verifiable primary sources exist.
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
            Editorial Corrections Policy & Public Feedback:
          </strong>
          We adhere to the non-negotiable principle: <em>&ldquo;Never make an individual&apos;s life more inspirational by making their biography less factual.&rdquo;</em> If you identify a factual error, misattribution, or have documented primary records to contribute, please report it to our editorial desk at <a href="mailto:ultimate.health25@gmail.com" style={{ color: "#0d9488", fontWeight: 700, textDecoration: "underline" }}>ultimate.health25@gmail.com</a> or via GitHub Issues. Verified corrections are updated promptly.
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
          The world does not need more memorials alone. <br />
          <span style={{ color: "#e11d48" }}>It needs more humanity.</span>
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
          <p style={{ margin: 0 }}>
            Some people wanted to become doctors. Some wanted to educate children. Some wanted to protect forests, report the truth, or give a voice to people who were ignored.
          </p>
          <p style={{ margin: 0 }}>
            Their lives remind us that behind every name is a person with dreams, relationships, responsibilities and possibilities.
          </p>
          <p style={{ margin: 0 }}>
            We cannot rewrite their past. But we can make their stories meaningful by improving the systems around us, protecting vulnerable people, supporting education, respecting dignity and refusing to remain indifferent to suffering.
          </p>
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
            Let us not remember them only for how they left this world. Let us remember what they wanted to contribute to it.
          </p>
        </div>
      </div>
    </div>
  );
}
