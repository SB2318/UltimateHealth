"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { User, ArrowRight, Heart, BookOpen, Clock } from "lucide-react";
import { TributeProfile } from "@/types/tribute";
import { withBasePath } from "@/lib/basePath";

interface ProfileCardProps {
  profile: TributeProfile;
  onOpenModal: (profile: TributeProfile) => void;
}

export default function ProfileCard({ profile, onOpenModal }: ProfileCardProps) {
  const t = useTranslations("tribute");
  return (
    <div
      onClick={() => onOpenModal(profile)}
      style={{
        background: "var(--explorer-surface, #ffffff)",
        border: "1px solid var(--explorer-border, #e2e8f0)",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(244, 63, 94, 0.4)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(244, 63, 94, 0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--explorer-border, #e2e8f0)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(0,0,0,0.03)";
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              color: "#e11d48",
              background: "rgba(244, 63, 94, 0.1)",
              padding: "3px 8px",
              borderRadius: "6px",
              border: "1px solid rgba(244, 63, 94, 0.25)",
            }}
          >
            #{profile.id} · {profile.categoryLabel}
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-secondary, #64748b)" }}>
            {profile.countryFlag} {profile.country}
          </span>
        </div>

        {/* Profile Picture + Name & Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <div
            style={{
              position: "relative",
              width: "68px",
              height: "80px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid rgba(244, 63, 94, 0.3)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              flexShrink: 0,
              background: "var(--explorer-bg, #f1f5f9)",
            }}
          >
            {profile.avatarUrl ? (
              <Image
                src={withBasePath(profile.avatarUrl)}
                alt={profile.name}
                fill
                unoptimized
                style={{ objectFit: "cover" }}
                sizes="68px"
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                <User size={28} />
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "var(--site-heading, #0f172a)",
                margin: "0 0 4px",
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {profile.name}
            </h3>
            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--explorer-text-secondary, #64748b)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: "2px",
              }}
            >
              {profile.roleAndField}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--explorer-text-secondary, #94a3b8)" }}>
              {profile.eraOrYear}
            </div>
          </div>
        </div>

        {/* Contribution to remember */}
        <div style={{ marginBottom: "14px" }}>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#0d9488",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "6px",
            }}
          >
            <Heart size={12} style={{ fill: "#0d9488" }} />
            {t("contributionLabel")}
          </div>
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.6,
              color: "var(--explorer-text-secondary, #475569)",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {profile.contributions}
          </p>
        </div>

        {/* UltimateHealth Editorial Reflection */}
        <div
          style={{
            background: "rgba(244, 63, 94, 0.05)",
            borderLeft: "3px solid #e11d48",
            borderRadius: "0 8px 8px 0",
            padding: "9px 12px",
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
            {t("editorialLessonLabel")}
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              lineHeight: 1.5,
              color: "var(--explorer-text-secondary, #475569)",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {profile.coreMessage}
          </p>
        </div>
      </div>

      {/* Footer Deliverable & CTA */}
      <div
        style={{
          paddingTop: "14px",
          borderTop: "1px solid var(--explorer-border, #e2e8f0)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--explorer-text-secondary, #64748b)",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "180px",
          }}
        >
          <BookOpen size={13} style={{ color: "#e11d48", flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{profile.memorialPublication.title}</span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#d97706", background: "rgba(217, 119, 6, 0.12)", padding: "1px 5px", borderRadius: "4px", flexShrink: 0 }}>Coming Soon</span>
        </span>

        <button
          type="button"
          style={{
            fontSize: "0.8rem",
            fontWeight: 800,
            color: "#e11d48",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            flexShrink: 0,
            padding: 0,
          }}
        >
          <span>{t("readStory")}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
