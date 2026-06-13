"use client";

import { useEffect, useState, useMemo } from "react";
import type { RichContent, HeadingBlock } from "@/types/article";

interface TableOfContentsProps {
  content: RichContent;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => {
    return content.blocks.filter(
      (block): block is HeadingBlock =>
        block.type === "heading" && (block.level === 2 || block.level === 3)
    );
  }, [content.blocks]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      rootMargin: "-100px 0px -65% 0px",
      threshold: 0,
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
      const yOffset = -85; // Offset to account for sticky header height
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
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
