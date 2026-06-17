"use client";

import { useEffect, useState } from "react";

/**
 * Sticky reading progress bar fixed to the very top of the viewport.
 * Tracks scroll progress through the entire document.
 *
 * FUTURE: Can be enhanced to track progress through a specific content
 * element ref for more precise article-only tracking.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docScrollable > 0 ? (scrollTop / docScrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-[70] h-[3px] transition-[width] duration-100 will-change-[width]"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 0 6px rgba(102, 126, 234, 0.6)",
      }}
    />
  );
}
