"use client";

import { useMemo, useState } from "react";
import type { HealthResource } from "@/types/health-resource";
import {
  deriveFilterOptions,
  filterHealthResources,
} from "@/lib/health-resources-helpers.mjs";
import HealthResourceCard from "./HealthResourceCard";

interface HealthResourcesExplorerProps {
  resources: HealthResource[];
  locale?: string;
}

/**
 * Client-side directory explorer: text search (title, description, tags)
 * plus category, region, and resource-type filters over the server-fetched
 * list. No extra network calls — the list is fetched once by the page.
 */
export default function HealthResourcesExplorer({
  resources,
  locale = "en",
}: HealthResourcesExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [resourceType, setResourceType] = useState("all");

  const options = useMemo(() => deriveFilterOptions(resources), [resources]);

  const filtered = useMemo(
    () =>
      filterHealthResources(resources, {
        query,
        category,
        region,
        resourceType,
      }),
    [resources, query, category, region, resourceType]
  );

  const hasActiveFilters =
    query.trim() !== "" ||
    category !== "all" ||
    region !== "all" ||
    resourceType !== "all";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setRegion("all");
    setResourceType("all");
  }

  const selectClassName =
    "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="relative flex-1 sm:min-w-64">
          <span className="sr-only">Search public health resources</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, description, or tag"
            aria-label="Search public health resources"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />
        </label>

        <label>
          <span className="sr-only">Filter by category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
            className={selectClassName}
          >
            <option value="all">All categories</option>
            {options.categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by region</span>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            aria-label="Filter by region"
            className={selectClassName}
          >
            <option value="all">All regions</option>
            {options.regions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by resource type</span>
          <select
            value={resourceType}
            onChange={(event) => setResourceType(event.target.value)}
            aria-label="Filter by resource type"
            className={selectClassName}
          >
            <option value="all">All types</option>
            {options.resourceTypes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-600/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-teal-300"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <p
        aria-live="polite"
        className="mb-5 text-sm font-medium text-slate-600 dark:text-slate-400"
      >
        {filtered.length === 1
          ? "1 resource"
          : `${filtered.length} resources`}
        {resources.length > 0 && filtered.length !== resources.length
          ? ` (of ${resources.length} total)`
          : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource: HealthResource) => (
            <HealthResourceCard
              key={resource.id}
              resource={resource}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {resources.length === 0
              ? "No public health resources are available right now"
              : "No resources match your filters"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {resources.length === 0
              ? "The public resources service is not reachable at the moment. Please check back later — this directory lists official government and verified public health resources once the service is available."
              : "Try a different search term or clear the filters to see all resources."}
          </p>
          {resources.length > 0 && hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
