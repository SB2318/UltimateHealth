"use client";

import { useEffect, useRef, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { X, ExternalLink, Shield, BookOpen, Heart, CheckCircle2, Award, Landmark, User, Clock } from "lucide-react";
import { TributeProfile } from "@/types/tribute";
import { getLocalizedProfile } from "@/data/tribute-profiles";
import { withBasePath } from "@/lib/basePath";

interface ProfileDetailModalProps {
  profile: TributeProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectNext?: () => void;
  onSelectPrev?: () => void;
}

export default function ProfileDetailModal({
  profile: rawProfile,
  isOpen,
  onClose,
  onSelectNext,
  onSelectPrev,
}: ProfileDetailModalProps) {
  const t = useTranslations("tribute");
  const locale = useLocale();
  const profile = useMemo(
    () => (rawProfile ? getLocalizedProfile(rawProfile, locale) : null),
    [rawProfile, locale]
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onSelectNext) onSelectNext();
      if (e.key === "ArrowLeft" && onSelectPrev) onSelectPrev();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onSelectNext, onSelectPrev]);

  if (!isOpen || !profile) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(8px)",
        boxSizing: "border-box",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--explorer-surface, #ffffff)",
          border: "1px solid var(--explorer-border, #e2e8f0)",
          borderRadius: "24px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Sticky Header Bar */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            background: "var(--explorer-surface, #ffffff)",
            borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
              Profile #{profile.id} of 30
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--explorer-text-secondary, #64748b)" }}>
              {profile.categoryLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "50%",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "28px 24px 36px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Profile Hero Summary */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              borderBottom: "1px solid var(--explorer-border, #e2e8f0)",
              paddingBottom: "24px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "90px",
                height: "105px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "2px solid rgba(244, 63, 94, 0.35)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
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
                  sizes="90px"
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                  <User size={36} />
                </div>
              )}
            </div>

            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--explorer-text-secondary, #475569)" }}>
                  {profile.countryFlag} {profile.country}
                </span>
                <span style={{ color: "#cbd5e1" }}>·</span>
                <span style={{ fontSize: "0.82rem", color: "var(--explorer-text-secondary, #64748b)" }}>
                  {profile.eraOrYear}
                </span>
                {profile.isSurvivor && (
                  <>
                    <span style={{ color: "#cbd5e1" }}>·</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: "rgba(13, 148, 136, 0.12)",
                        color: "#0d9488",
                        border: "1px solid rgba(13, 148, 136, 0.3)",
                      }}
                    >
                      Survivor · Living Leader
                    </span>
                  </>
                )}
                {profile.verificationStatus && (
                  <>
                    <span style={{ color: "#cbd5e1" }}>·</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background:
                          profile.verificationStatus === "Verified" || profile.verificationStatus === "Historically Verified"
                            ? "rgba(16, 185, 129, 0.12)"
                            : profile.verificationStatus === "Partially Verified"
                            ? "rgba(245, 158, 11, 0.12)"
                            : "rgba(59, 130, 246, 0.12)",
                        color:
                          profile.verificationStatus === "Verified" || profile.verificationStatus === "Historically Verified"
                            ? "#059669"
                            : profile.verificationStatus === "Partially Verified"
                            ? "#d97706"
                            : "#2563eb",
                        border:
                          profile.verificationStatus === "Verified" || profile.verificationStatus === "Historically Verified"
                            ? "1px solid rgba(16, 185, 129, 0.3)"
                            : profile.verificationStatus === "Partially Verified"
                            ? "1px solid rgba(245, 158, 11, 0.3)"
                            : "1px solid rgba(59, 130, 246, 0.3)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <CheckCircle2 size={11} />
                      {profile.verificationStatus}
                    </span>
                  </>
                )}
              </div>

              <h2
                id="modal-title"
                style={{
                  fontSize: "1.65rem",
                  fontWeight: 800,
                  color: "var(--site-heading, #0f172a)",
                  margin: "0 0 4px",
                }}
              >
                {profile.name}
              </h2>

              <p
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#e11d48",
                  margin: "0 0 12px",
                }}
              >
                {profile.roleAndField}
              </p>

              {/* Verified Historical Quote if Authenticated */}
              {profile.verifiedQuote && (
                <div
                  style={{
                    background: "rgba(13, 148, 136, 0.08)",
                    borderLeft: "3px solid #0d9488",
                    padding: "10px 14px",
                    borderRadius: "0 8px 8px 0",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0d9488", marginBottom: "4px" }}>
                    {t("verifiedQuoteLabel")}
                  </div>
                  <div style={{ fontSize: "0.86rem", fontStyle: "italic", lineHeight: 1.5, color: "var(--explorer-text-secondary, #1e293b)", marginBottom: "4px" }}>
                    &ldquo;{profile.verifiedQuote.quote}&rdquo;
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                    — Source: {profile.verifiedQuote.source}
                  </div>
                </div>
              )}

              {/* UltimateHealth Editorial Reflection */}
              <div
                style={{
                  background: "rgba(244, 63, 94, 0.06)",
                  borderLeft: "3px solid #e11d48",
                  padding: "10px 14px",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#e11d48", marginBottom: "4px" }}>
                  {t("editorialLessonLabel")}
                </div>
                <div style={{ fontSize: "0.84rem", lineHeight: 1.5, color: "var(--explorer-text-secondary, #334155)" }}>
                  {profile.coreMessage}
                </div>
              </div>
            </div>
          </div>

          {/* 1. Who Was This Person? */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#e11d48", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 8px" }}>
              <User size={15} />
              1. Who Was This Person?
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--explorer-text-secondary, #334155)", margin: 0 }}>
              {profile.whoWasThisPerson}
            </p>
          </div>

          {/* 2. Professional & Social Contributions */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0d9488", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 8px" }}>
              <Heart size={15} />
              2. What They Contributed to the World
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--explorer-text-secondary, #334155)", margin: 0, whiteSpace: "pre-line" }}>
              {profile.contributions}
            </p>
          </div>

          {/* 3. Documented Factual Context */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#d97706", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 8px" }}>
              <Shield size={15} />
              3. What Happened (Sensitive Factual Context)
            </h3>
            <div
              style={{
                background: "var(--explorer-bg, #f8fafc)",
                border: "1px solid var(--explorer-border, #e2e8f0)",
                borderRadius: "12px",
                padding: "14px 16px",
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "var(--explorer-text-secondary, #475569)",
                whiteSpace: "pre-line",
              }}
            >
              {profile.factualContext}

              {profile.editorialNotes && (
                <div style={{ marginTop: "12px", padding: "10px 12px", background: "rgba(244, 63, 94, 0.06)", borderLeft: "3px solid #e11d48", borderRadius: "0 6px 6px 0", fontSize: "0.82rem", color: "#475569" }}>
                  <strong style={{ color: "#be123c" }}>Editorial & Legal Notice:</strong> {profile.editorialNotes}
                </div>
              )}

              {profile.disputedFacts && profile.disputedFacts.length > 0 && (
                <div style={{ marginTop: "12px", padding: "10px 12px", background: "rgba(245, 158, 11, 0.08)", borderLeft: "3px solid #d97706", borderRadius: "0 6px 6px 0", fontSize: "0.82rem", color: "#92400e" }}>
                  <strong>Unresolved / Disputed Circumstances:</strong>
                  <ul style={{ margin: "4px 0 0", paddingLeft: "18px" }}>
                    {profile.disputedFacts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.verifiedFacts && profile.verifiedFacts.length > 0 && (
                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px dashed var(--explorer-border, #cbd5e1)" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#059669", marginBottom: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <CheckCircle2 size={13} />
                    Verified Facts {profile.lastVerifiedAt && `(Audited ${profile.lastVerifiedAt})`}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "0.82rem", color: "var(--explorer-text-secondary, #475569)", lineHeight: 1.6 }}>
                    {profile.verifiedFacts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 4. Societal Impact & Institutional Reforms */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#4f46e5", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 8px" }}>
              <Landmark size={15} />
              4. Societal Impact & Subsequent Reforms
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--explorer-text-secondary, #334155)", margin: 0, whiteSpace: "pre-line" }}>
              {profile.societalImpact}
            </p>
          </div>

          {/* 5. What We Can Learn & Implement Today */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#be123c", display: "flex", alignItems: "center", gap: "6px", margin: "0 0 8px" }}>
              <Award size={15} />
              5. What Society Must Learn & Implement Today
            </h3>
            <div
              style={{
                background: "rgba(244, 63, 94, 0.06)",
                border: "1px solid rgba(244, 63, 94, 0.25)",
                borderRadius: "12px",
                padding: "14px 16px",
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "var(--site-heading, #1e293b)",
                fontWeight: 600,
                whiteSpace: "pre-line",
              }}
            >
              {profile.actionableLesson}
            </div>
          </div>

          {/* 6. Living Memorial Guide by UltimateHealth */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)",
              border: "1.5px solid rgba(244, 63, 94, 0.3)",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "#e11d48", display: "flex", alignItems: "center", gap: "6px" }}>
                <BookOpen size={14} />
                6. UltimateHealth Living Memorial Initiative
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(217, 119, 6, 0.12)",
                  color: "#d97706",
                  border: "1px solid rgba(217, 119, 6, 0.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Clock size={12} />
                {profile.memorialPublication.initiativeStatus || "Proposed Initiative"}
              </span>
            </div>

            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--site-heading, #0f172a)", margin: "0 0 6px" }}>
              {profile.memorialPublication.title}
            </h4>

            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--explorer-text-secondary, #64748b)", marginBottom: "8px" }}>
              Focus: {profile.memorialPublication.focus}
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--explorer-text-secondary, #475569)", margin: 0, whiteSpace: "pre-line" }}>
              {profile.memorialPublication.deliverable}
            </p>
          </div>

          {/* 7. References and Further Reading */}
          <div style={{ borderTop: "1px solid var(--explorer-border, #e2e8f0)", paddingTop: "18px" }}>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--explorer-text-secondary, #94a3b8)", margin: "0 0 10px" }}>
              7. Verified Primary Sources & Court / Human Rights Archives
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {profile.references.map((ref, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.84rem" }}>
                  <ExternalLink size={14} style={{ color: "#94a3b8", flexShrink: 0, marginTop: "3px" }} />
                  <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "6px", minWidth: 0 }}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", fontWeight: 600, textDecoration: "underline" }}
                    >
                      {ref.title}
                    </a>
                    {ref.isPrimary && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: "4px",
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "#059669",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Primary Record
                      </span>
                    )}
                    {ref.publisher && (
                      <span style={{ color: "var(--explorer-text-secondary, #64748b)", fontSize: "0.78rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                        ({ref.publisher})
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            background: "var(--explorer-bg, #f8fafc)",
            borderTop: "1px solid var(--explorer-border, #e2e8f0)",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {onSelectPrev && (
              <button
                type="button"
                onClick={onSelectPrev}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--explorer-border, #cbd5e1)",
                  background: "var(--explorer-surface, #ffffff)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--explorer-text-secondary, #475569)",
                  cursor: "pointer",
                }}
              >
                ← Previous
              </button>
            )}
            {onSelectNext && (
              <button
                type="button"
                onClick={onSelectNext}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--explorer-border, #cbd5e1)",
                  background: "var(--explorer-surface, #ffffff)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--explorer-text-secondary, #475569)",
                  cursor: "pointer",
                }}
              >
                Next →
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              background: "#e11d48",
              color: "#ffffff",
              fontSize: "0.82rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
}
