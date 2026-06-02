"use client";

import React, { useState, useEffect, useCallback } from "react";
import { inspirationalQuotes } from "../../data/heroesData";

export default function QuoteSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 300);
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % inspirationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, goTo]);

  const quote = inspirationalQuotes[current];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Large quote mark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-teal-500/10 text-[200px] font-serif leading-none pointer-events-none select-none">
        "
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
          Words of Wisdom
        </span>

        <div
          className={`mt-10 transition-all duration-300 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed italic">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <cite className="block mt-6 text-teal-400 font-semibold not-italic tracking-wide">
            — {quote.author}
          </cite>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {inspirationalQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Quote ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-teal-400"
                  : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
