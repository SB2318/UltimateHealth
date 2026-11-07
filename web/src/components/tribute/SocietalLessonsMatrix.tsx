"use client";

import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, Lightbulb, Users } from "lucide-react";
import { getLocalizedSocietalLessons } from "@/data/tribute-pillars-i18n";

export default function SocietalLessonsMatrix() {
  const t = useTranslations("tribute");
  const locale = useLocale();

  const lessons = getLocalizedSocietalLessons(locale);

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Section Header */}
      <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 36px" }}>
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
            background: "rgba(217, 119, 6, 0.12)",
            color: "#d97706",
            border: "1px solid rgba(217, 119, 6, 0.3)",
            marginBottom: "14px",
          }}
        >
          <Lightbulb size={14} />
          {t("learnPillarBadge")}
        </div>

        <h2
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 800,
            color: "var(--site-heading, #0f172a)",
            lineHeight: 1.2,
            margin: "0 0 14px",
          }}
        >
          {t("learnTitle")}
        </h2>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "var(--explorer-text-secondary, #475569)",
            margin: 0,
          }}
        >
          {t("learnSubtitle")}
        </p>
      </div>

      {/* 10 Lessons Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box",
          marginBottom: "40px",
        }}
      >
        {lessons.map((lesson, idx) => (
          <div
            key={idx}
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "20px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "var(--site-heading, #0f172a)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "0 0 12px",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(244, 63, 94, 0.12)",
                    color: "#e11d48",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </span>
                {lesson.theme}
              </h3>

              <div
                style={{
                  background: "rgba(244, 63, 94, 0.06)",
                  borderLeft: "3px solid #f43f5e",
                  borderRadius: "0 8px 8px 0",
                  padding: "10px 12px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  lineHeight: 1.55,
                  color: "var(--site-heading, #1e293b)",
                  marginBottom: "16px",
                }}
              >
                {lesson.whatWeCanImprove}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--explorer-text-secondary, #94a3b8)",
                    marginBottom: "8px",
                  }}
                >
                  {t("actionableReformsLabel")}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {lesson.actionableInitiatives.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: 1.5,
                        color: "var(--explorer-text-secondary, #475569)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                      }}
                    >
                      <CheckCircle2 size={14} style={{ color: "#0d9488", flexShrink: 0, marginTop: "2px" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                paddingTop: "12px",
                borderTop: "1px solid var(--explorer-border, #e2e8f0)",
                fontSize: "0.75rem",
                color: "var(--explorer-text-secondary, #64748b)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              <Users size={13} style={{ color: "#94a3b8" }} />
              <strong style={{ color: "var(--site-heading, #1e293b)" }}>{t("informedByLabel")}</strong>
              <span>{lesson.profilesRef.join(", ")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum Callout Box */}
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
          {t("curriculumBoxTitle")}
        </h4>
        <p style={{ fontSize: "0.84rem", lineHeight: 1.6, color: "var(--explorer-text-secondary, #64748b)", margin: 0 }}>
          {t("curriculumBoxText")}
        </p>
      </div>
    </div>
  );
}
