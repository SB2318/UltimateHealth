"use client";

import React, { useState } from "react";
import { heroesData } from "../../data/heroesData";
import DoctorCard from "./DoctorCard";

const ALL_CATEGORIES = "All";

export default function FeaturedDoctors() {
  const categories = [ALL_CATEGORIES, ...heroesData.map((c) => c.category)];
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const filtered =
    activeCategory === ALL_CATEGORIES
      ? heroesData
      : heroesData.filter((c) => c.category === activeCategory);

  return (
    <section id="doctors" className="py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
            The Legends
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Featured Healthcare Heroes
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-lg">
            Extraordinary individuals who dedicated their lives to transforming health outcomes across India.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-teal-500 text-slate-950 border-teal-500 shadow-lg shadow-teal-500/20"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 bg-slate-800/50"
              }`}
            >
              {cat === ALL_CATEGORIES ? "All Heroes" : cat}
            </button>
          ))}
        </div>

        {/* Doctor cards by category */}
        {filtered.map((categoryGroup) => (
          <div key={categoryGroup.category} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-bold text-white">{categoryGroup.category}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-teal-500/30 to-transparent" />
              <span className="text-sm text-slate-500">
                {categoryGroup.heroes.length} hero{categoryGroup.heroes.length !== 1 ? "es" : ""}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryGroup.heroes.map((hero, i) => (
                <DoctorCard
                  key={hero.name}
                  hero={hero}
                  index={i}
                  category={categoryGroup.category}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
