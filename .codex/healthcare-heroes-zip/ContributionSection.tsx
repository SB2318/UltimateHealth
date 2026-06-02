"use client";

import React, { useState } from "react";

interface FormState {
  heroName: string;
  specialty: string;
  contribution: string;
  submitterName: string;
  source: string;
}

const initialForm: FormState = {
  heroName: "",
  specialty: "",
  contribution: "",
  submitterName: "",
  source: "",
};

export default function ContributionSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.heroName || !form.contribution) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate submission
    setLoading(false);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
            Community
          </span>
          <h2 className="mt-3 text-4xl font-black text-white leading-tight">
            Nominate a Healthcare Hero
          </h2>
          <p className="mt-4 text-slate-400">
            Know a healthcare contributor whose story deserves recognition? Help us grow this
            archive of inspiration.
          </p>
        </div>

        {submitted ? (
          <div className="text-center p-12 rounded-3xl border border-teal-500/30 bg-teal-500/10">
            <div className="text-5xl mb-4">🙏</div>
            <h3 className="text-white text-xl font-bold mb-2">Thank you for your nomination!</h3>
            <p className="text-slate-400 text-sm">
              Our team will review your submission and reach out if we need more information.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 border border-teal-500/30 text-teal-400 rounded-full text-sm hover:bg-teal-500/10 transition-colors duration-200"
            >
              Nominate Another Hero
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Hero's Name *
                </label>
                <input
                  type="text"
                  name="heroName"
                  value={form.heroName}
                  onChange={handleChange}
                  placeholder="Dr. Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white
                    placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1
                    focus:ring-teal-500/20 transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Specialty / Field
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology, Rural Health"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white
                    placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1
                    focus:ring-teal-500/20 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Key Contribution *
              </label>
              <textarea
                name="contribution"
                value={form.contribution}
                onChange={handleChange}
                placeholder="Describe their impact on Indian healthcare in a few sentences..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white
                  placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1
                  focus:ring-teal-500/20 transition-all duration-200 text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="submitterName"
                  value={form.submitterName}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white
                    placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1
                    focus:ring-teal-500/20 transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Source / Reference
                </label>
                <input
                  type="text"
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  placeholder="Wikipedia, news article URL..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white
                    placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1
                    focus:ring-teal-500/20 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !form.heroName || !form.contribution}
              className="w-full py-4 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 disabled:text-slate-500
                text-slate-950 font-bold rounded-xl transition-all duration-300 hover:shadow-lg
                hover:shadow-teal-500/20 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Nomination"
              )}
            </button>

            <p className="text-center text-xs text-slate-600">
              All submissions are reviewed for factual accuracy before being added to the archive.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
