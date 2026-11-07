"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Users, HeartHandshake, Award, Lightbulb, ShieldCheck } from "lucide-react";
import TributeHero from "./TributeHero";
import TributeExplorer from "./TributeExplorer";
import SurvivorVoicesSection from "./SurvivorVoicesSection";
import ChangemakersSection from "./ChangemakersSection";
import SocietalLessonsMatrix from "./SocietalLessonsMatrix";
import EditorialCharter from "./EditorialCharter";

export type TributeTab = "remember" | "listen" | "recognise" | "learn" | "charter";

export default function TributeHubClient() {
  const t = useTranslations("tribute");
  const [activeTab, setActiveTab] = useState<TributeTab>("remember");

  const handleTabChange = (tab: TributeTab) => {
    setActiveTab(tab);
    const navEl = document.getElementById("tribute-content-nav");
    if (navEl) {
      navEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Hero Section */}
      <TributeHero
        onExploreClick={() => handleTabChange("remember")}
        onMemorialSeriesClick={() => handleTabChange("learn")}
      />

      {/* ── Four-Pillar Primary Content Navigation ── */}
      <section
        id="tribute-content-nav"
        style={{
          width: "100%",
          padding: "32px 20px 0",
          background: "var(--explorer-bg, #f8fafc)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* 4 Pillars Tablist */}
          <div
            role="tablist"
            aria-label="Humanitarian Initiative Pillars"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "18px",
              padding: "8px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
              marginBottom: "40px",
            }}
          >
            {[
              {
                id: "remember",
                label: t("pillarRemember"),
                subLabel: t("tabRememberSub"),
                count: t("tabRememberCount"),
                icon: Users,
                activeColor: "#e11d48",
              },
              {
                id: "listen",
                label: t("pillarListen"),
                subLabel: t("tabListenSub"),
                count: t("tabListenCount"),
                icon: HeartHandshake,
                activeColor: "#0d9488",
              },
              {
                id: "recognise",
                label: t("pillarRecognise"),
                subLabel: t("tabRecogniseSub"),
                count: t("tabRecogniseCount"),
                icon: Award,
                activeColor: "#2563eb",
              },
              {
                id: "learn",
                label: t("pillarLearn"),
                subLabel: t("tabLearnSub"),
                count: t("tabLearnCount"),
                icon: Lightbulb,
                activeColor: "#d97706",
              },
              {
                id: "charter",
                label: t("tabCharterLabel"),
                subLabel: t("tabCharterSub"),
                count: t("tabCharterCount"),
                icon: ShieldCheck,
                activeColor: "#4f46e5",
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as TributeTab)}
                  style={{
                    flex: "1 1 180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isSelected ? "none" : "1px solid transparent",
                    background: isSelected ? tab.activeColor : "transparent",
                    color: isSelected ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                    boxShadow: isSelected ? "0 4px 14px rgba(0, 0, 0, 0.15)" : "none",
                  }}
                >
                  <Icon size={18} style={{ color: isSelected ? "#ffffff" : tab.activeColor }} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 800, letterSpacing: "0.04em" }}>{tab.label}</div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        opacity: isSelected ? 0.9 : 0.65,
                      }}
                    >
                      {tab.subLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            style={{ width: "100%", paddingBottom: "70px", boxSizing: "border-box" }}
          >
            {activeTab === "remember" && <TributeExplorer initialCategory="all" />}
            {activeTab === "listen" && <SurvivorVoicesSection />}
            {activeTab === "recognise" && <ChangemakersSection />}
            {activeTab === "learn" && <SocietalLessonsMatrix />}
            {activeTab === "charter" && <EditorialCharter />}
          </div>
        </div>
      </section>
    </div>
  );
}
