"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heart, Globe2, Shield, BookOpen, ArrowDown } from "lucide-react";

interface TributeHeroProps {
  onExploreClick: () => void;
  onMemorialSeriesClick: () => void;
}

export default function TributeHero({ onExploreClick, onMemorialSeriesClick }: TributeHeroProps) {
  const t = useTranslations("tribute");
  return (
    <section
      style={{
        width: "100%",
        padding: "50px 20px 70px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
        background: "radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.08) 0%, transparent 70%)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top Badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "50px",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "rgba(244, 63, 94, 0.12)",
              color: "#e11d48",
              border: "1px solid rgba(244, 63, 94, 0.3)",
            }}
          >
            <Heart size={14} style={{ fill: "#e11d48", color: "#e11d48" }} />
            {t("badgeTribute")}
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "50px",
              fontSize: "0.75rem",
              fontWeight: 700,
              background: "var(--explorer-surface, #ffffff)",
              color: "var(--explorer-text-secondary, #475569)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
            }}
          >
            <Globe2 size={14} style={{ color: "#0d9488" }} />
            {t("badgeNations")}
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "50px",
              fontSize: "0.75rem",
              fontWeight: 700,
              background: "rgba(217, 119, 6, 0.1)",
              color: "#d97706",
              border: "1px solid rgba(217, 119, 6, 0.25)",
            }}
          >
            <Shield size={14} />
            {t("badgeCurriculum")}
          </span>
        </div>

        {/* Headline & Philosophy */}
        <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 40px" }}>
          {/* Four Pillars Motto */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 16px",
              borderRadius: "50px",
              background: "rgba(15, 23, 42, 0.04)",
              border: "1px solid var(--explorer-border, #cbd5e1)",
              marginBottom: "16px",
              fontSize: "0.82rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#e11d48" }}>{t("pillarRemember")}</span>
            <span style={{ color: "#94a3b8" }}>·</span>
            <span style={{ color: "#0d9488" }}>{t("pillarListen")}</span>
            <span style={{ color: "#94a3b8" }}>·</span>
            <span style={{ color: "#2563eb" }}>{t("pillarRecognise")}</span>
            <span style={{ color: "#94a3b8" }}>·</span>
            <span style={{ color: "#d97706" }}>{t("pillarLearn")}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "var(--site-heading, #0f172a)",
              margin: "0 0 18px",
            }}
          >
            {t("heroTitlePrefix")} <br />
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #e11d48, #f43f5e, #d97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("heroTitleHighlight")}
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              fontWeight: 600,
              lineHeight: 1.6,
              color: "var(--site-heading, #1e293b)",
              margin: "0 auto 16px",
              maxWidth: "760px",
              textAlign: "center",
            }}
          >
            {t("heroCoreMessage")}
          </p>

          <p
            style={{
              fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)",
              lineHeight: 1.7,
              color: "var(--explorer-text-secondary, #64748b)",
              margin: "0 auto",
              maxWidth: "680px",
              textAlign: "center",
            }}
          >
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Starting Point: Featured Honor to Dr. Moumita Debnath */}
        <div
          style={{
            maxWidth: "920px",
            width: "100%",
            margin: "0 auto 48px",
            background: "var(--explorer-surface, #ffffff)",
            border: "1.5px solid rgba(244, 63, 94, 0.35)",
            borderRadius: "20px",
            padding: "28px 24px",
            boxShadow: "0 10px 30px rgba(244, 63, 94, 0.08)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            flexWrap: "wrap",
            boxSizing: "border-box",
          }}
        >
          {/* Portrait */}
          <div
            style={{
              position: "relative",
              width: "110px",
              height: "130px",
              borderRadius: "14px",
              overflow: "hidden",
              flexShrink: 0,
              border: "2.5px solid rgba(244, 63, 94, 0.4)",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            }}
          >
            <Image
              src="https://images.openai.com/static-rsc-4/ERFLGiok6oasJHEMp3Yp6o2VKqafsUj-FPQeEYQVBikv-WsOwE5pXE1bqNI-Fby_VmCS1XVDvEn5a1eEekUaerVa1EbGz6xCVfRcsQzaWS2tFSFoLV4bcUYetNcVkenLUbjb87nn3XEwl6ctIPIKzEBKwhlZu-B7ll228b_kQ_I?purpose=inline"
              alt="Portrait of Dr. Moumita Debnath"
              fill
              unoptimized
              style={{ objectFit: "cover" }}
              sizes="110px"
            />
          </div>

          {/* Details */}
          <div style={{ flex: "1 1 340px", minWidth: 0, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#e11d48",
                  background: "rgba(244, 63, 94, 0.12)",
                  border: "1px solid rgba(244, 63, 94, 0.3)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                {t("startingPointBadge")}
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-secondary, #64748b)" }}>
                Kolkata · 2024 · Pulmonary & Chest Medicine
              </span>
            </div>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--site-heading, #0f172a)",
                margin: "0 0 6px",
              }}
            >
              Dr. Moumita Debnath
            </h2>

            <p
              style={{
                fontSize: "0.91rem",
                lineHeight: 1.65,
                color: "var(--explorer-text-secondary, #334155)",
                margin: "0 0 10px",
              }}
            >
              {t("startingPointMoumita1")}
            </p>

            <p
              style={{
                fontSize: "0.865rem",
                lineHeight: 1.65,
                color: "var(--explorer-text-secondary, #64748b)",
                margin: "0 0 12px",
              }}
            >
              {t("startingPointMoumita2")}
            </p>

            <p
              style={{
                fontSize: "0.825rem",
                lineHeight: 1.6,
                color: "#be123c",
                fontWeight: 600,
                margin: "0 0 18px",
              }}
            >
              {t("startingPointCommitment")}
            </p>

            {/* Buttons Row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <button
                type="button"
                onClick={onMemorialSeriesClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#e11d48",
                  color: "#ffffff",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(225, 29, 72, 0.28)",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <BookOpen size={16} />
                <span>View 30 Living Memorial Guides (Coming Soon)</span>
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(244, 63, 94, 0.1)",
                  border: "1px solid rgba(244, 63, 94, 0.35)",
                  color: "#e11d48",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#e11d48";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(244, 63, 94, 0.1)";
                  (e.currentTarget as HTMLElement).style.color = "#e11d48";
                }}
              >
                <ArrowDown size={16} />
                <span>Explore All 30 Profiles</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stat Metrics */}
        <div
          style={{
            maxWidth: "920px",
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "16px",
              padding: "20px 16px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#e11d48", lineHeight: 1 }}>30</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--explorer-text-secondary, #64748b)", marginTop: "6px" }}>
              Human Profiles
            </div>
          </div>

          <div
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "16px",
              padding: "20px 16px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0d9488", lineHeight: 1 }}>6</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--explorer-text-secondary, #64748b)", marginTop: "6px" }}>
              Thematic Series
            </div>
          </div>

          <div
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "16px",
              padding: "20px 16px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#d97706", lineHeight: 1 }}>10</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--explorer-text-secondary, #64748b)", marginTop: "6px" }}>
              Societal Lessons
            </div>
          </div>

          <div
            style={{
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "16px",
              padding: "20px 16px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#4f46e5", lineHeight: 1 }}>30</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--explorer-text-secondary, #64748b)", marginTop: "6px" }}>
              Living Memorial Guides
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
