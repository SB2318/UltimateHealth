"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".fade-in,.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale";

/**
 * Adds the reveal classes to scroll-animated elements as they enter the
 * viewport. Renders nothing, so the sections it animates can stay on the server.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(REVEAL_SELECTOR)
        .forEach((el) => el.classList.add("visible", "revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible", "revealed"); }),
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
