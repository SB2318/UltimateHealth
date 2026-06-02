"use client";

import React, { useState } from "react";
import { Hero } from "../../data/heroesData";

interface DoctorCardProps {
  hero: Hero;
  index: number;
}

const categoryColors: Record<string, string> = {
  "Cardiology & Surgery": "from-rose-500/20 to-red-500/10 border-rose-500/30",
  "Public Health & Research": "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
  "Rural Healthcare & Social Impact": "from-emerald-500/20 to-green-500/10 border-emerald-500/30",
  "Mental Health & Awareness": "from-purple-500/20 to-violet-500/10 border-purple-500/30",
  "Medical Education & Innovation": "from-amber-500/20 to-yellow-500/10 border-amber-500/30",
  "Healthcare Worker Safety & Awareness": "from-teal-500/20 to-cyan-500/10 border-teal-500/30",
};

const categoryBadgeColors: Record<string, string> = {
  "Cardiology & Surgery": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Public Health & Research": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Rural Healthcare & Social Impact": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Mental Health & Awareness": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Medical Education & Innovation": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Healthcare Worker Safety & Awareness": "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

const specialtyIcons: Record<string, string> = {
  "Affordable Cardiac Care": "🫀",
  "Cardiovascular Surgery": "🫀",
  "Ophthalmology": "👁️",
  "Diabetology": "🩺",
  "Cardiothoracic Surgery": "🫁",
  "Tuberculosis & Public Health": "🧬",
  "Vaccine Research": "💉",
  "Gynecology & Obstetrics": "🌸",
  "Oncology": "🎗️",
  "Pulmonology": "🫁",
  "Rural Healthcare": "🌾",
  "Public Sanitation Impact": "🚿",
  "Healthcare Infrastructure": "🏥",
  "Mental Health": "🧠",
  "Psychiatry": "🧠",
  "Ophthalmology & Education": "👁️",
  "Microbiology & HIV Research": "🔬",
  "Biomedical Inspiration Crossover": "🚀",
  "Healthcare Safety Awareness & Pulmonology": "🛡️",
};

interface DoctorCardFullProps extends DoctorCardProps {
  category: string;
}

export default function DoctorCard({ hero, index, category }: DoctorCardFullProps) {
  const [expanded, setExpanded] = useState(false);
  const gradientClass = categoryColors[category] || "from-slate-500/20 to-slate-500/10 border-slate-500/30";
  const badgeClass = categoryBadgeColors[category] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  const icon = specialtyIcons[hero.specialty] || "⚕️";

  return (
    <div
      className={`group relative rounded-2xl border bg-gradient-to-br ${gradientClass} backdrop-blur-sm
        transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
      aria-expanded={expanded}
      aria-label={`${hero.name} - ${hero.specialty}`}
    >
      {/* Glassmorphism shine */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClass} border flex items-center justify-center text-2xl`}>
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-tight mb-1">{hero.name}</h3>
            <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full border font-medium ${badgeClass}`}>
              {hero.specialty}
            </span>
          </div>

          {/* Expand icon */}
          <span
            className={`text-slate-400 transition-transform duration-300 mt-1 ${expanded ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </div>

        {/* Summary */}
        <p className="text-slate-300 text-sm leading-relaxed">{hero.summary}</p>

        {/* Expanded contributions */}
        {expanded && (
          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Notable Contributions
            </p>
            <ul className="space-y-2">
              {hero.notable_contributions.map((contribution, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-teal-400 mt-0.5 flex-shrink-0">✦</span>
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Impact badge */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {expanded ? "Click to collapse" : "Click to see contributions"}
          </span>
          <span className="text-xs text-teal-400/60 font-medium">Impact ✦</span>
        </div>
      </div>
    </div>
  );
}
