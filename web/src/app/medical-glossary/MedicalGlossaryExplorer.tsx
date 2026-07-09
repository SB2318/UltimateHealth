"use client";

import { useMemo, useState } from "react";
import { glossaryEntries } from "./glossary-data";

export default function MedicalGlossaryExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(glossaryEntries.map((entry) => entry.category)),
    ];
  }, []);

  const filteredEntries = useMemo(() => {
    return glossaryEntries.filter((entry) => {
      const matchesSearch =
        entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        entry.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
  <h1 className="text-4xl font-bold tracking-tight">
    Medical Glossary
  </h1>
  <p className="mt-3 text-muted-foreground">
    Search and explore medical terms...
  </p>
</div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 md:flex-row w-full min-w-0 mx-auto max-w-3xl">
        <input
          type="text"
          placeholder="Search medical terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border px-4 py-3"
        >
          {categories.map((category) => (
            <option key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="text-sm text-muted-foreground text-center">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {filteredEntries.length}
        </span>{" "}
        medical terms
      </div>

      {/* Results */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <h3 className="text-lg font-semibold">
            No results found
          </h3>

          <p className="mt-2 text-muted-foreground">
            Try adjusting your search query or category filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredEntries.map((entry) => (
            <article
              key={entry.term}
              className="rounded-xl border bg-white p-6 transition hover:shadow-md"
            >
              {/* Category */}
              <div className="mb-3">
                <span className="rounded-full border px-3 py-1 text-xs font-medium">
                  {entry.category}
                </span>
              </div>

              {/* Term */}
              <h2 className="text-xl font-semibold">
                {entry.term}
              </h2>

              {/* Definition */}
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {entry.definition}
              </p>

              {/* Related Terms */}
              {entry.relatedTerms.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-2 text-sm font-semibold">
                    Related Terms
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {entry.relatedTerms.map((term) => (
                      <span
                        key={term}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}