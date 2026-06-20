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
    <div className="w-full space-y-12">
      {/* Search and Navigation Box */}
      <div className="rounded-3xl border border-slate-200/60 bg-white p-6 md:p-10 lg:p-12 w-full shadow-xl shadow-slate-100 text-center flex flex-col items-center">
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#667eea] mb-2">
            BROWSE TERMS
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#3c3b88] md:text-3xl lg:text-4xl max-w-2xl mx-auto mb-6">
            Find clear definitions without leaving the page
          </h2>
        </div>

        <div className="w-full max-w-xl mx-auto">
          <label
            htmlFor="medical-glossary-search"
            className="mb-3 block text-xs font-bold tracking-widest text-slate-400 uppercase"
          >
            SEARCH MEDICAL TERMS
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            />
            <Input
              id="medical-glossary-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a term, category, or keyword..."
              className="h-12 rounded-full border-slate-200 bg-white pl-12 text-base shadow-sm text-center focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 transition-all duration-200"
            />
          </div>
        </div>

        <nav
          className="mt-10 flex flex-wrap justify-center gap-3 w-full max-w-4xl mx-auto"
          aria-label="Medical glossary alphabetical filter"
        >
          <button
            type="button"
            onClick={() => setActiveLetter("All")}
            className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-all duration-200 rounded-full border ${
              activeLetter === "All"
                ? "border-[#667eea] bg-[#667eea] text-white shadow-md shadow-[#667eea]/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-[#667eea]/40 hover:text-[#667eea] hover:shadow-sm"
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
                className={`flex items-center justify-center w-10 h-10 text-sm font-bold transition-all duration-200 rounded-full border ${
                  activeLetter === letter
                    ? "border-[#667eea] bg-[#667eea] text-white shadow-md shadow-[#667eea]/20"
                    : "border-slate-200 bg-white text-slate-700 hover:border-[#667eea]/40 hover:text-[#667eea] hover:shadow-sm"
                } disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50/50 disabled:text-slate-300 disabled:shadow-none`}
              >
                {letter}
              </button>
            );
          })}
        </nav>

        <div
          className="mt-8 text-sm font-medium text-slate-500 text-center w-full"
          aria-live="polite"
          aria-atomic="true"
        >
          {filteredEntries.length === 1
            ? "1 glossary term found"
            : `${filteredEntries.length} glossary terms found`}
          {query ? ` for "${query}"` : ""}
        </div>
      </div>

      {/* Glossary List / Results */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm max-w-2xl mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 mx-auto mb-4 border border-slate-100">
            <Search className="size-6 text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">No glossary terms found</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600 leading-relaxed text-sm">
            Try a shorter keyword, search by category, or clear the search field to browse
            the full glossary.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveLetter("All");
            }}
            className="mt-6 rounded-full bg-[#667eea] hover:bg-[#5a6fd6] px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md shadow-[#667eea]/20 hover:shadow-lg"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedEntries).map(([letter, entries]) => (
            <section key={letter} aria-labelledby={`glossary-letter-${letter}`} className="scroll-mt-28">
              <h2
                id={`glossary-letter-${letter}`}
                className="mb-6 flex items-center gap-3 border-b border-slate-200/80 pb-3 text-3xl font-black text-slate-950"
              >
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center font-black text-lg shadow-sm shadow-[#667eea]/20">
                  {letter}
                </span>
                <span>{letter}</span>
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {entries.map((entry) => (
                  <article
                    key={entry.term}
                    className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#667eea]/20 hover:shadow-xl hover:shadow-slate-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-950 tracking-tight">{entry.term}</h3>
                        <Badge
                          variant="outline"
                          className="h-auto rounded-full border-[#667eea]/20 bg-[#667eea]/5 text-[#667eea] font-semibold px-3 py-1 text-xs"
                        >
                          {entry.category}
                        </Badge>
                      </div>
                      <p className="mt-4 text-base leading-7 text-slate-600 font-normal">{entry.definition}</p>
                    </div>
                    
                    <div className="mt-6 border-t border-slate-100 pt-4" aria-label={`Related terms for ${entry.term}`}>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Related Terms</span>
                      <div className="flex flex-wrap gap-2">
                        {entry.relatedTerms.map((relatedTerm) => (
                          <span
                            key={relatedTerm}
                            className="rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-800"
                          >
                            {relatedTerm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
