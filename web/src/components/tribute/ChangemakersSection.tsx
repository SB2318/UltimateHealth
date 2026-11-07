"use client";

import { useTranslations, useLocale } from "next-intl";
import { Award, ExternalLink, Building } from "lucide-react";
import { getLocalizedChangemakers } from "@/data/tribute-pillars-i18n";

export default function ChangemakersSection() {
  const t = useTranslations("tribute");
  const locale = useLocale();

  const changemakers = getLocalizedChangemakers(locale);

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
            background: "rgba(59, 130, 246, 0.12)",
            color: "#2563eb",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            marginBottom: "12px",
          }}
        >
          <Award size={14} />
          {t("recognisePillarBadge")}
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
          {t("recogniseTitle")}
        </h2>

        <p
          style={{
            fontSize: "0.96rem",
            lineHeight: 1.65,
            color: "var(--explorer-text-secondary, #475569)",
            margin: 0,
          }}
        >
          {t("recogniseSubtitle")}
        </p>
      </div>

      {/* Changemakers Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto 48px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {changemakers.map((changemaker) => (
          <div
            key={changemaker.id}
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
              {/* Header Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "#2563eb",
                    background: "rgba(59, 130, 246, 0.1)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                  }}
                >
                  {t("changemakerBadge")}
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-secondary, #64748b)" }}>
                  {changemaker.countryFlag} {changemaker.country} · {changemaker.eraOrYear}
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
                {changemaker.name}
              </h3>

              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#0d9488",
                  marginBottom: "6px",
                }}
              >
                {changemaker.roleAndField}
              </div>

              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--explorer-text-secondary, #64748b)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "16px",
                }}
              >
                <Building size={13} style={{ color: "#64748b" }} />
                <span>{changemaker.organization}</span>
              </div>

              {/* Focus Area */}
              <div
                style={{
                  background: "var(--explorer-bg, #f8fafc)",
                  border: "1px solid var(--explorer-border, #e2e8f0)",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  fontSize: "0.78rem",
                  marginBottom: "16px",
                }}
              >
                <strong style={{ color: "var(--site-heading, #0f172a)", display: "block", marginBottom: "3px" }}>
                  {t("primaryFocusDomainLabel")}
                </strong>
                <span style={{ color: "var(--explorer-text-secondary, #475569)" }}>
                  {changemaker.focusArea}
                </span>
              </div>

              {/* Documented Actions */}
              <div style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--site-heading, #0f172a)",
                    marginBottom: "4px",
                  }}
                >
                  {t("documentedClinicalActionsLabel")}
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.65,
                    color: "var(--explorer-text-secondary, #475569)",
                    margin: 0,
                  }}
                >
                  {changemaker.documentedActions}
                </p>
              </div>

              {/* Measurable Impact */}
              <div
                style={{
                  background: "rgba(59, 130, 246, 0.05)",
                  borderLeft: "3px solid #2563eb",
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
                    color: "#2563eb",
                    marginBottom: "4px",
                  }}
                >
                  {t("documentedImpactMilestoneLabel")}
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.55,
                    color: "var(--explorer-text-secondary, #334155)",
                    margin: 0,
                  }}
                >
                  {changemaker.measurableImpact}
                </p>
              </div>

              {/* Relevance to Humanity */}
              <div
                style={{
                  background: "rgba(13, 148, 136, 0.05)",
                  borderLeft: "3px solid #0d9488",
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
                    color: "#0d9488",
                    marginBottom: "4px",
                  }}
                >
                  {t("relevanceGlobalHumanityLabel")}
                </div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.55,
                    color: "var(--explorer-text-secondary, #334155)",
                    margin: 0,
                  }}
                >
                  {changemaker.relevanceToHumanity}
                </p>
              </div>
            </div>

            {/* References Footer */}
            <div
              style={{
                paddingTop: "14px",
                borderTop: "1px solid var(--explorer-border, #e2e8f0)",
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {changemaker.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "#2563eb",
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

              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                {t("sourcesListedNote")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Changemaker Vetting Policy Note */}
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          background: "var(--explorer-surface, #ffffff)",
          border: "1px solid var(--explorer-border, #e2e8f0)",
          borderRadius: "18px",
          padding: "24px 28px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--site-heading, #0f172a)", margin: "0 0 8px" }}>
          {t("howSelectedTitle")}
        </h4>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.6, color: "var(--explorer-text-secondary, #64748b)", margin: 0 }}>
          {t("howSelectedText")}
        </p>
      </div>
    </div>
  );
}
