"use client";

import React, { useEffect, useRef } from "react";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;
      const amplitude = h * 0.12;
      const speed = 0.015;

      // Draw heartbeat line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(52, 211, 153, 0.35)";
      ctx.lineWidth = 2;

      for (let x = 0; x < w; x++) {
        const phase = (x / w) * Math.PI * 8 + frame * speed;
        const segment = Math.floor((x / w) * 12);

        let y = midY;

        if (segment % 12 === 4) {
          // QRS complex spike
          const local = ((x / w) * 12) % 1;
          if (local < 0.2) y = midY - amplitude * local * 5;
          else if (local < 0.25) y = midY + amplitude * 0.5;
          else if (local < 0.4) y = midY - amplitude * (0.4 - local) * 4;
          else y = midY;
        } else if (segment % 12 === 2) {
          // P wave
          y = midY - amplitude * 0.2 * Math.sin(((x / w) * 12) % 1 * Math.PI);
        } else if (segment % 12 === 7) {
          // T wave
          y = midY - amplitude * 0.3 * Math.sin(((x / w) * 12) % 1 * Math.PI);
        } else {
          y = midY + Math.sin(phase * 0.3) * 4;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      frame++;
      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-600/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Heartbeat canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-teal-300 text-sm font-medium tracking-widest uppercase">
            GirlScript Summer of Code 2026
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          Healthcare{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
              Heroes
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400/0 via-teal-400 to-teal-400/0" />
          </span>{" "}
          of India
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Honoring doctors and healthcare contributors whose work transformed lives, improved
          accessibility, inspired innovation, and strengthened medical awareness across India.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-full transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-400/40 hover:scale-105"
          >
            Explore Contributions
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <a
            href="#timeline"
            className="px-8 py-4 border border-slate-600 hover:border-teal-500/50 text-slate-300 hover:text-white font-medium rounded-full transition-all duration-300 hover:bg-slate-800/50"
          >
            View Timeline
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "25+", label: "Healthcare Heroes" },
            { value: "6", label: "Specialties" },
            { value: "70+", label: "Years of Impact" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-teal-300">{stat.value}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
