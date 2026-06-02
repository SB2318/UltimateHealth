"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { glossaryEntries, type GlossaryEntry } from "./glossary-data";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const normalize = (value: string) => value.trim().toLowerCase();

export function MedicalGlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("All");

  const availableLetters = useMemo(
    () => new Set(glossaryEntries.map((entry) => entry.term[0]?.toUpperCase())),
    []
  );

  const filteredEntries = useMemo(() => {
    const normalizedQuery = normalize(query);

    return glossaryEntries
      .filter((entry) => activeLetter === "All" || entry.term.toUpperCase().startsWith(activeLetter))
      .filter((entry) => {
        if (!normalizedQuery) return true;

        const haystack = [
          entry.term,
          entry.definition,
          entry.category,
          ...entry.relatedTerms,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [activeLetter, query]);

  const groupedEntries = useMemo(() => {
    return filteredEntries.reduce<Record<string, GlossaryEntry[]>>((groups, entry) => {
      const letter = entry.term[0]?.toUpperCase() || "#";
      groups[letter] = groups[letter] || [];
      groups[letter].push(entry);
      return groups;
    }, {});
  }, [filteredEntries]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-xl shadow-slate-200/60 backdrop-blur md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Browse terms
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Find clear definitions without leaving the page
            </h2>
          </div>

          <div className="w-full lg:max-w-md">
            <label
              htmlFor="medical-glossary-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search medical terms
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              />
              <Input
                id="medical-glossary-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search medical terms..."
                className="h-11 rounded-2xl border-slate-300 bg-white pl-10 text-base shadow-sm"
              />
            </div>
          </div>
        </div>

        <nav
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Medical glossary alphabetical filter"
        >
          <button
            type="button"
            onClick={() => setActiveLetter("All")}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
              activeLetter === "All"
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
            }`}
          >
            All
          </button>
          {alphabet.map((letter) => {
            const isAvailable = availableLetters.has(letter);
            return (
              <button
                type="button"
                key={letter}
                onClick={() => isAvailable && setActiveLetter(letter)}
                disabled={!isAvailable}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
                  activeLetter === letter
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                } disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300`}
              >
                {letter}
              </button>
            );
          })}
        </nav>

        <div
          className="mt-5 text-sm font-medium text-slate-600"
          aria-live="polite"
          aria-atomic="true"
        >
          {filteredEntries.length === 1
            ? "1 glossary term found"
            : `${filteredEntries.length} glossary terms found`}
          {query ? ` for "${query}"` : ""}
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">No glossary terms found</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Try a shorter keyword, search by category, or clear the search field to browse
            the full glossary.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveLetter("All");
            }}
            className="mt-6 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {Object.entries(groupedEntries).map(([letter, entries]) => (
            <section key={letter} aria-labelledby={`glossary-letter-${letter}`}>
              <h2
                id={`glossary-letter-${letter}`}
                className="mb-4 border-b border-slate-200 pb-2 text-3xl font-bold text-slate-950"
              >
                {letter}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {entries.map((entry) => (
                  <article
                    key={entry.term}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-slate-950">{entry.term}</h3>
                      <Badge
                        variant="outline"
                        className="h-auto rounded-full border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800"
                      >
                        {entry.category}
                      </Badge>
                    </div>
                    <p className="mt-3 text-base leading-7 text-slate-700">{entry.definition}</p>
                    <div className="mt-4 flex flex-wrap gap-2" aria-label={`Related terms for ${entry.term}`}>
                      {entry.relatedTerms.map((relatedTerm) => (
                        <span
                          key={relatedTerm}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
