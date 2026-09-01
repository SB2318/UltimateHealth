"use client";

import { useState } from "react";

export type FontSize = "sm" | "md" | "lg";

interface AccessibilityControlsProps {
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
}

const FONT_OPTIONS: { value: FontSize; label: string; ariaLabel: string; textClass: string }[] = [
  { value: "sm", label: "A", ariaLabel: "Small text", textClass: "text-xs" },
  { value: "md", label: "A", ariaLabel: "Default text size", textClass: "text-sm" },
  { value: "lg", label: "A", ariaLabel: "Large text", textClass: "text-base" },
];

/**
 * Floating accessibility control panel for article reading preferences.
 *
 * FUTURE expansion hooks:
 * - High contrast mode toggle
 * - Text-to-speech playback controls
 * - Line spacing adjustment
 * - Font family switch (serif / sans-serif)
 * - Bookmark current reading position
 */
export default function AccessibilityControls({
  fontSize,
  onFontSizeChange,
}: AccessibilityControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      aria-label="Accessibility settings"
    >
      {/* Control panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Article accessibility options"
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Text size */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Text Size
            </p>
            <div
              className="flex gap-1.5 items-end"
              role="group"
              aria-label="Select text size"
            >
              {FONT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onFontSizeChange(opt.value)}
                  aria-pressed={fontSize === opt.value}
                  aria-label={opt.ariaLabel}
                  className={[
                    "flex-1 py-2 rounded-xl border-2 font-bold transition-all duration-150",
                    opt.textClass,
                    fontSize === opt.value
                      ? "border-[#667eea] bg-[#667eea]/10 text-[#667eea]"
                      : "border-gray-200 text-gray-500 hover:border-gray-300",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-3 border-gray-100" />

          {/* Future features — placeholders */}
          <div className="space-y-2">
            <button
              disabled
              title="Coming soon"
              className="w-full flex items-center gap-2.5 text-left px-1 py-1 rounded text-xs text-gray-400 cursor-not-allowed"
            >
              <span aria-hidden="true">🔊</span>
              <span>Text to Speech</span>
              <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                Soon
              </span>
            </button>
            <button
              disabled
              title="Coming soon"
              className="w-full flex items-center gap-2.5 text-left px-1 py-1 rounded text-xs text-gray-400 cursor-not-allowed"
            >
              <span aria-hidden="true">🔖</span>
              <span>Bookmark Article</span>
              <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                Soon
              </span>
            </button>
            <button
              disabled
              title="Coming soon"
              className="w-full flex items-center gap-2.5 text-left px-1 py-1 rounded text-xs text-gray-400 cursor-not-allowed"
            >
              <span aria-hidden="true">🌙</span>
              <span>High Contrast</span>
              <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                Soon
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close accessibility settings" : "Open accessibility settings"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg hover:border-[#667eea]/30 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#667eea]"
      >
        <span className="text-lg" aria-hidden="true">
          ♿
        </span>
      </button>
    </div>
  );
}
