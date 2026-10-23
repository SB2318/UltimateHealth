"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Check, Globe, ChevronDown } from "lucide-react";
import { withBasePath, BASE_PATH } from "@/lib/basePath";

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

    // Strip any leading BASE_PATH if present to prevent duplicate /web prefixes
    if (BASE_PATH && cleanPath.startsWith(BASE_PATH)) {
      cleanPath = cleanPath.slice(BASE_PATH.length) || "/";
    }

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
    <>
      <style>{`
        /* ── Language Switcher Container ── */
        .lang-switcher-wrapper {
          position: relative;
          display: inline-block;
        }

        /* ── Trigger Button (Default: Light Mode) ── */
        .lang-switcher-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #1e293b;
          cursor: pointer;
          font-size: 0.8125rem;
          font-weight: 700;
          font-family: ui-monospace, SFMono-Regular, monospace;
          letter-spacing: 0.05em;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        .lang-switcher-btn:hover {
          border-color: #818cf8;
          color: #4f46e5;
          background: #f8fafc;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
        }
        .lang-switcher-btn.open {
          background: #ede9fe;
          border-color: #7c3aed;
          color: #7c3aed;
          box-shadow: 0 0 14px rgba(124, 58, 237, 0.2);
        }
        .lang-switcher-globe {
          color: #7c3aed;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .lang-switcher-chevron {
          transition: transform 0.2s ease;
          opacity: 0.7;
        }
        .lang-switcher-btn.open .lang-switcher-chevron {
          transform: rotate(180deg);
        }

        /* ── Dropdown Menu (Default: Light Mode) ── */
        .lang-switcher-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 6px;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.04);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: langDropdownFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes langDropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .lang-switcher-header {
          padding: 8px 12px 6px;
          font-size: 0.6875rem;
          font-weight: 800;
          font-family: ui-monospace, SFMono-Regular, monospace;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 4px;
        }

        .lang-switcher-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.15s ease;
        }
        .lang-switcher-item:hover:not(.active) {
          background: #f8fafc;
          border-color: #f1f5f9;
        }
        .lang-switcher-item.active {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(99, 102, 241, 0.12) 100%);
          border-color: rgba(124, 58, 237, 0.25);
        }
        .lang-switcher-native {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.25;
        }
        .lang-switcher-item.active .lang-switcher-native {
          color: #6d28d9;
          font-weight: 700;
        }
        .lang-switcher-name {
          display: block;
          font-size: 0.6875rem;
          color: #64748b;
          line-height: 1.2;
        }
        .lang-switcher-item.active .lang-switcher-name {
          color: #7c3aed;
          font-weight: 600;
        }
        .lang-switcher-check {
          color: #7c3aed;
          flex-shrink: 0;
        }

        /* ── Dark Mode Overrides (html.dark) ── */
        html.dark .lang-switcher-btn {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
          box-shadow: none;
        }
        html.dark .lang-switcher-btn:hover {
          border-color: rgba(0, 229, 255, 0.5);
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.08);
          box-shadow: 0 0 12px rgba(0, 229, 255, 0.15);
        }
        html.dark .lang-switcher-btn.open {
          background: rgba(0, 229, 255, 0.12);
          border-color: #00e5ff;
          color: #00e5ff;
          box-shadow: 0 0 16px rgba(0, 229, 255, 0.25);
        }
        html.dark .lang-switcher-globe {
          color: #00e5ff;
        }
        html.dark .lang-switcher-dropdown {
          background: #101020;
          border-color: rgba(0, 229, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.15);
        }
        html.dark .lang-switcher-header {
          color: #64748b;
          border-bottom-color: rgba(255, 255, 255, 0.06);
        }
        html.dark .lang-switcher-item:hover:not(.active) {
          background: rgba(255, 255, 255, 0.06);
          border-color: transparent;
        }
        html.dark .lang-switcher-item.active {
          background: rgba(0, 229, 255, 0.15);
          border-color: rgba(0, 229, 255, 0.4);
        }
        html.dark .lang-switcher-native {
          color: #f1f5f9;
        }
        html.dark .lang-switcher-item.active .lang-switcher-native {
          color: #00e5ff;
        }
        html.dark .lang-switcher-name {
          color: #64748b;
        }
        html.dark .lang-switcher-item.active .lang-switcher-name {
          color: rgba(0, 229, 255, 0.7);
        }
        html.dark .lang-switcher-check {
          color: #00e5ff;
        }
      `}</style>

      <div ref={containerRef} className="lang-switcher-wrapper">
        {/* ── Trigger Button ── */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Select Language"
          className={`lang-switcher-btn${isOpen ? " open" : ""}`}
        >
          <Globe size={15} className="lang-switcher-globe" />
          <span>{activeOption.code.toUpperCase()}</span>
          <ChevronDown size={13} className="lang-switcher-chevron" />
        </button>

        {/* ── Dropdown Menu ── */}
        {isOpen && (
          <div className="lang-switcher-dropdown">
            {/* Header title */}
            <div className="lang-switcher-header">
              Select Language
            </div>

            {locales.map((locale) => {
              const isActive = currentLocale === locale.code;
              return (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`lang-switcher-item${isActive ? " active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1rem" }}>{locale.flag}</span>
                    <div>
                      <span className="lang-switcher-native">
                        {locale.nativeName}
                      </span>
                      <span className="lang-switcher-name">
                        {locale.name} ({locale.code.toUpperCase()})
                      </span>
                    </div>
                  </div>

                  {isActive && <Check size={16} className="lang-switcher-check" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}