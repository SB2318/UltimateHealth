"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const CURSOR_GLOW_STORAGE_KEY = "cursorGlowEnabled";
const CURSOR_GLOW_EVENT = "cursor-glow-preference-change";
const DNA_TRAIL_MAX_POINTS = 38;

const getCursorGlowSnapshot = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CURSOR_GLOW_STORAGE_KEY) === "true";
};

const subscribeToCursorGlow = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.storageArea === window.localStorage && event.key === CURSOR_GLOW_STORAGE_KEY) {
      callback();
    }
  };
  const onCustomEvent: EventListener = () => callback();

  window.addEventListener("storage", onStorage);
  window.addEventListener(CURSOR_GLOW_EVENT, onCustomEvent);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CURSOR_GLOW_EVENT, onCustomEvent);
  };
};

/**
 * DNA helix cursor trail. Renders nothing — it appends its own <canvas> to
 * <body>. The animation loop only runs while the effect is switched on; it used
 * to run at 60fps for the whole session even when disabled.
 *
 * Never created on touch devices or when the user prefers reduced motion.
 */
export default function DnaCursor() {
  const cursorGlowEnabled = useSyncExternalStore(
    subscribeToCursorGlow,
    getCursorGlowSnapshot,
    () => false
  );
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!cursorGlowEnabled) return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) { document.body.classList.add("touch-device"); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "dna-cursor-canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = "1";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    const trail: { x: number; y: number; t: number }[] = [];
    let dnaT = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const draw = () => {
      dnaT += 0.06;
      trail.unshift({ x: mouseX, y: mouseY, t: dnaT });
      if (trail.length > DNA_TRAIL_MAX_POINTS) trail.pop();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((pt, i) => {
        const age = i / trail.length;
        const alpha = (1 - age) * 0.92;
        const dotR = (1 - age) * 5.5 + 1;
        const offset = Math.sin(pt.t * 2.2) * 14 * (1 - age * 0.4);

        ctx.beginPath();
        ctx.arc(pt.x + offset, pt.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,165,233,${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x - offset, pt.y, dotR * 0.72, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${alpha * 0.78})`;
        ctx.fill();

        if (i % 4 === 0 && i + 4 < trail.length) {
          ctx.beginPath();
          ctx.moveTo(pt.x + offset, pt.y);
          ctx.lineTo(pt.x - offset, pt.y);
          ctx.strokeStyle = `rgba(125,211,252,${alpha * 0.38})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      canvas.remove();
    };
  }, [cursorGlowEnabled]);

  return null;
}
