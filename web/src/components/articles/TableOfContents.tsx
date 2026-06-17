"use client";

import { useEffect, useState, useMemo } from "react";
import type { RichContent } from "@/types/article";
import {
  ARTICLE_STICKY_HEADER_HEIGHT_PX,
  ARTICLE_TOC_INTERSECTION_THRESHOLD,
  extractTocHeadings,
  getArticleScrollTargetY,
  getArticleTocObserverRootMargin,
} from "./article-layout.js";

interface TableOfContentsProps {
  content: RichContent;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => extractTocHeadings(content.blocks), [content.blocks]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      // Shrink the observer root below the sticky header (top) and above the
      // lower viewport (bottom %) so the active heading reflects what the reader
      // is actually reading, not merely what barely entered the top edge.
      rootMargin: getArticleTocObserverRootMargin(),
      threshold: ARTICLE_TOC_INTERSECTION_THRESHOLD,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = getArticleScrollTargetY(
        el.getBoundingClientRect().top,
        window.scrollY,
        ARTICLE_STICKY_HEADER_HEIGHT_PX,
      );
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      // Update browser history/hash without scrolling
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="space-y-4" aria-label="Table of contents">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 text-left border-none p-0 m-0 bg-none -webkit-text-fill-color-inherit">
        Table of Contents
      </h2>
      <ul className="space-y-2.5 text-sm">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className="relative"
              style={{
                paddingLeft: heading.level === 3 ? "1.25rem" : "0.75rem",
              }}
            >
              {/* Active state indicator dot/line */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#667eea]" />
              )}
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={`block py-0.5 transition-all duration-200 hover:text-[#667eea] ${
                  isActive
                    ? "font-semibold text-[#667eea]"
                    : "text-slate-500 hover:translate-x-0.5"
                }`}
                {...(isActive && { "aria-current": "true" })}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
