"use client";

import { useState } from "react";
import { Users, Shield, Lightbulb, ShieldCheck } from "lucide-react";
import TributeHero from "./TributeHero";
import TributeExplorer from "./TributeExplorer";
import TributeMemorialSeries from "./TributeMemorialSeries";
import SocietalLessonsMatrix from "./SocietalLessonsMatrix";
import EditorialCharter from "./EditorialCharter";

export type TributeTab = "stories" | "memorial" | "lessons" | "charter";

export default function TributeHubClient() {
  const [activeTab, setActiveTab] = useState<TributeTab>("stories");

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
        onExploreClick={() => handleTabChange("stories")}
        onMemorialSeriesClick={() => handleTabChange("memorial")}
      />

      {/* ── Accessible Primary Content Navigation / Tab Switcher ── */}
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
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Accessible Tabs Bar */}
          <div
            role="tablist"
            aria-label="Tribute Sections"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              background: "var(--explorer-surface, #ffffff)",
              border: "1px solid var(--explorer-border, #e2e8f0)",
              borderRadius: "18px",
              padding: "8px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
              marginBottom: "40px",
            }}
          >
            {[
              { id: "stories", label: "Human Stories", count: "30 Profiles", icon: Users },
              { id: "memorial", label: "Living Memorial Toolkits", count: "30 Guides · Coming Soon", icon: Shield },
              { id: "lessons", label: "10 Societal Lessons", count: "Actionable Reforms", icon: Lightbulb },
              { id: "charter", label: "Editorial Charter", count: "Ethics & Manifesto", icon: ShieldCheck },
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
                    flex: "1 1 200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isSelected ? "none" : "1px solid transparent",
                    background: isSelected ? "#e11d48" : "transparent",
                    color: isSelected ? "#ffffff" : "var(--explorer-text-secondary, #475569)",
                    boxShadow: isSelected ? "0 4px 14px rgba(225, 29, 72, 0.25)" : "none",
                  }}
                >
                  <Icon size={18} style={{ color: isSelected ? "#ffffff" : "#e11d48" }} />
                  <div style={{ textAlign: "left" }}>
                    <div>{tab.label}</div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        opacity: isSelected ? 0.9 : 0.65,
                      }}
                    >
                      {tab.count}
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
            style={{
              paddingBottom: "80px",
              minHeight: "450px",
              boxSizing: "border-box",
            }}
          >
            {activeTab === "stories" && <TributeExplorer />}
            {activeTab === "memorial" && <TributeMemorialSeries />}
            {activeTab === "lessons" && <SocietalLessonsMatrix />}
            {activeTab === "charter" && <EditorialCharter />}
          </div>
        </div>
      </section>
    </div>
  );
}
