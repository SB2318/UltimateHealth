"use client";

import React, { useRef, useEffect, useState } from "react";
import { timelineEvents } from "../../data/heroesData";

const categoryColors: Record<string, string> = {
  Surgery: "bg-rose-500/20 text-rose-300 border-rose-400/40",
  Research: "bg-blue-500/20 text-blue-300 border-blue-400/40",
  "Public Health": "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
  Rural: "bg-green-500/20 text-green-300 border-green-400/40",
  Infrastructure: "bg-orange-500/20 text-orange-300 border-orange-400/40",
  Sanitation: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
  Vaccine: "bg-purple-500/20 text-purple-300 border-purple-400/40",
  "Mental Health": "bg-violet-500/20 text-violet-300 border-violet-400/40",
};

const dotColors: Record<string, string> = {
  Surgery: "bg-rose-400",
  Research: "bg-blue-400",
  "Public Health": "bg-emerald-400",
  Rural: "bg-green-400",
  Infrastructure: "bg-orange-400",
  Sanitation: "bg-cyan-400",
  Vaccine: "bg-purple-400",
  "Mental Health": "bg-violet-400",
};

export default function TimelineSection() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(new Array(timelineEvents.length).fill(false));

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="timeline" className="py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
            Journey Through Time
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Impact on India
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Major healthcare milestones that shaped modern medicine across the nation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              const dotColor = dotColors[event.category] || "bg-teal-400";
              const badgeColor = categoryColors[event.category] || "bg-teal-500/20 text-teal-300 border-teal-400/40";

              return (
                <div
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className={`relative flex items-center gap-8 transition-all duration-700 ${
                    visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-none`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
                    <div
                      className={`inline-block p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm
                        hover:border-teal-500/30 hover:bg-slate-800/80 transition-all duration-300 group cursor-default`}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : "justify-start"} justify-start`}>
                        <span className="text-3xl font-black text-teal-400">{event.year}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badgeColor}`}>
                          {event.category}
                        </span>
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed">{event.event}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0 hidden md:flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${dotColor} ring-4 ring-slate-900 shadow-lg`} />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
