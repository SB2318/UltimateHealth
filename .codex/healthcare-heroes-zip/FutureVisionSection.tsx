"use client";

import React from "react";

const visions = [
  {
    icon: "🤖",
    title: "AI + Healthcare",
    description:
      "Building on the legacy of innovators like Dr. Gagandeep Kang and Dr. Soumya Swaminathan, AI is now accelerating diagnostics, drug discovery, and personalized care at scale.",
  },
  {
    icon: "🛡️",
    title: "Preventive Healthcare",
    description:
      "Inspired by Dr. Prathap C. Reddy's vision, preventive checks and early screening are becoming the cornerstone of modern health systems, saving millions before illness strikes.",
  },
  {
    icon: "🌾",
    title: "Rural Healthcare Access",
    description:
      "The SEARCH model pioneered by Dr. Abhay & Rani Bang continues to inspire community health workers who bring care to the last mile in underserved India.",
  },
  {
    icon: "🌐",
    title: "Open Healthcare Systems",
    description:
      "UltimateHealth stands on the shoulders of open knowledge — freely accessible, community-validated health content for every citizen, regardless of geography.",
  },
  {
    icon: "🧠",
    title: "Mental Health Awareness",
    description:
      "Following trailblazers like Dr. Vikram Patel, digital platforms are now bridging the massive mental health treatment gap in India's tier-2 and tier-3 cities.",
  },
  {
    icon: "🛡️",
    title: "Safer Workplaces for Healthcare Workers",
    description:
      "Dr. Moumita Debnath's legacy fuels nationwide advocacy for dignified, secure environments for every doctor, nurse, and healthcare professional in India.",
  },
];

export default function FutureVisionSection() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
            What Comes Next
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            The Future of Healthcare
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Their contributions planted seeds. UltimateHealth is committed to carrying the mission
            forward into the next chapter of Indian healthcare.
          </p>
        </div>

        {/* Vision grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visions.map((v, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-teal-500/30
                hover:bg-slate-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5"
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-teal-300 transition-colors duration-200">
                {v.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center p-12 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-950/50 to-slate-900/50">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Be Part of the Mission
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            UltimateHealth is an open-source platform. Every contributor helps carry forward the
            vision of a healthier, better-informed India.
          </p>
          <a
            href="https://github.com/SB2318/UltimateHealth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400
              text-slate-950 font-bold rounded-full transition-all duration-300 hover:scale-105
              shadow-lg shadow-teal-500/25"
          >
            Contribute on GitHub
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
