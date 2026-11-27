"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HealthResource } from "@/types/health-resource";
import {
  parsePlacementPayload,
  resolvePlacementState,
} from "@/lib/health-resources-helpers.mjs";
import HealthResourceCard from "./HealthResourceCard";

interface ResourcePlacementProps {
  placement: string;
  locale?: string;
}

/**
 * Ad-slot fallback placement. Fetches its resources from the internal
 * /api/health-resources proxy (avoids browser CORS); the backend
 * endpoints do not exist yet, so the designed outcome today is the
 * static fallback card linking to the directory — never a blank slot,
 * never fake resource data, never a layout shift (fixed min-height).
 */
export default function ResourcePlacement({
  placement,
  locale = "en",
}: ResourcePlacementProps) {
  const [resources, setResources] = useState<HealthResource[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `/api/health-resources?placement=${encodeURIComponent(placement)}`
        );
        if (!res.ok) {
          if (!cancelled) setError(true);
          return;
        }
        const data: unknown = await res.json();
        const parsed = parsePlacementPayload(data, placement);
        if (!cancelled) {
          setResources(parsed ? (parsed.resources as HealthResource[]) : []);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [placement]);

  const state = resolvePlacementState({
    loading: resources === null && !error,
    error,
    resources: resources ?? [],
  });

  if (state === "loading") {
    return (
      <section
        aria-label="Public health resources"
        aria-busy="true"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="min-h-[220px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900" />
      </section>
    );
  }

  if (state === "list") {
    return (
      <section
        aria-label="Public health resources"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Public Health Resources
          </h2>
          <Link
            href={`/${locale}/health-resources`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Browse all resources
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(resources ?? []).map((resource) => (
            <HealthResourceCard
              key={resource.id}
              resource={resource}
              locale={locale}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Public health resources"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="min-h-[220px] rounded-2xl border border-teal-600/20 bg-teal-600/5 p-6 dark:border-teal-400/20 dark:bg-teal-400/5 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
          Public Health Resources
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          Trusted public health guidance, in one place
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Explore government and verified public health resources — helplines,
          official guidance, and support services — curated for everyone.
        </p>
        <Link
          href={`/${locale}/health-resources`}
          aria-label="Learn more about Public Health Resources"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600"
        >
          Learn more about Public Health
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
