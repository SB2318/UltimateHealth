"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Check, Globe, ChevronDown } from "lucide-react";
import { withBasePath } from "@/lib/basePath";

interface LocaleOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const locales: LocaleOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷" },
];

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = locales.find((l) => l.code === currentLocale) || locales[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    // Replace current locale segment in pathname
    let cleanPath = pathname;
    for (const l of locales) {
      if (cleanPath.startsWith(`/${l.code}/`) || cleanPath === `/${l.code}`) {
        cleanPath = cleanPath.replace(`/${l.code}`, `/${newLocale}`);
        break;
      }
    }
    if (!cleanPath.startsWith(`/${newLocale}`)) {
      cleanPath = `/${newLocale}${cleanPath === "/" ? "" : cleanPath}`;
    }

    // Direct page transition to ensure complete locale change
    window.location.href = withBasePath(cleanPath);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      {/* ── Trigger Button ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Select Language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "10px",
          background: isOpen ? "rgba(0, 229, 255, 0.12)" : "rgba(255, 255, 255, 0.05)",
          border: isOpen ? "1px solid #00e5ff" : "1px solid rgba(255, 255, 255, 0.12)",
          color: isOpen ? "#00e5ff" : "#f1f5f9",
          cursor: "pointer",
          fontSize: "0.8125rem",
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "0.06em",
          boxShadow: isOpen ? "0 0 16px rgba(0, 229, 255, 0.25)" : "none",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "rgba(0, 229, 255, 0.5)";
            e.currentTarget.style.color = "#00e5ff";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            e.currentTarget.style.color = "#f1f5f9";
          }
        }}
      >
        <Globe size={15} style={{ color: "#00e5ff" }} />
        <span>{activeOption.code.toUpperCase()}</span>
        <ChevronDown
          size={13}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            opacity: 0.7,
          }}
        />
      </button>

      {/* ── Dropdown Menu ── */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "220px",
            background: "#101020",
            border: "1px solid rgba(0, 229, 255, 0.35)",
            borderRadius: "14px",
            padding: "6px",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.15)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            backdropFilter: "blur(20px)",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          {/* Header title */}
          <div
            style={{
              padding: "6px 10px 4px",
              fontSize: "0.6875rem",
              fontWeight: 800,
              fontFamily: "monospace",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              marginBottom: "4px",
            }}
          >
            Select Language
          </div>

          {locales.map((locale) => {
            const isActive = currentLocale === locale.code;
            return (
              <button
                key={locale.code}
                onClick={() => handleLocaleChange(locale.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: isActive ? "rgba(0, 229, 255, 0.15)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1rem" }}>{locale.flag}</span>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#00e5ff" : "#f1f5f9",
                        lineHeight: 1.2,
                      }}
                    >
                      {locale.nativeName}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.6875rem",
                        color: isActive ? "rgba(0, 229, 255, 0.7)" : "#64748b",
                        lineHeight: 1.2,
                      }}
                    >
                      {locale.name} ({locale.code.toUpperCase()})
                    </span>
                  </div>
                </div>

                {isActive && <Check size={16} style={{ color: "#00e5ff" }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}