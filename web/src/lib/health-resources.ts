import { getApiUrl } from "@/lib/api";
import { safeFetch } from "@/lib/safe-fetch";
import type {
  HealthResource,
  ResourcePlacement,
} from "@/types/health-resource";
import {
  parseHealthResourcePayload,
  parseHealthResourcesPayload,
  parsePlacementPayload,
} from "./health-resources-helpers.mjs";

/**
 * Public health resources API client.
 *
 * NOTE: the backend endpoints below do not exist yet — the live API answers
 * 404 ("Cannot GET /api/v1/health-resources", verified 2026-11-27). Every
 * function here therefore treats a missing, non-OK, or malformed response
 * as empty and never throws to the UI; the directory link fallback is the
 * designed behaviour until the backend ships these endpoints.
 */

const ISR = { next: { revalidate: 60 } } as const;

/** GET /v1/resource-placements/:name — null when unavailable. */
export async function fetchResourcePlacement(
  name: string
): Promise<ResourcePlacement | null> {
  try {
    const res = await safeFetch(
      getApiUrl(`/v1/resource-placements/${encodeURIComponent(name)}`),
      ISR,
      8000
    );
    if (!res || !res.ok) return null;
    const data: unknown = await res.json();
    return parsePlacementPayload(
      data as Record<string, unknown>,
      name
    ) as ResourcePlacement | null;
  } catch (err) {
    console.error("fetchResourcePlacement error:", err);
    return null;
  }
}

/** GET /v1/health-resources — [] when unavailable. */
export async function fetchHealthResources(): Promise<HealthResource[]> {
  try {
    const res = await safeFetch(getApiUrl("/v1/health-resources"), ISR, 8000);
    if (!res || !res.ok) return [];
    const data: unknown = await res.json();
    return parseHealthResourcesPayload(data) as HealthResource[];
  } catch (err) {
    console.error("fetchHealthResources error:", err);
    return [];
  }
}

/** GET /v1/health-resources/:slug — null when unavailable. */
export async function fetchHealthResourceBySlug(
  slug: string
): Promise<HealthResource | null> {
  try {
    const res = await safeFetch(
      getApiUrl(`/v1/health-resources/${encodeURIComponent(slug)}`),
      ISR,
      8000
    );
    if (!res || !res.ok) return null;
    const data: unknown = await res.json();
    return parseHealthResourcePayload(data) as HealthResource | null;
  } catch (err) {
    console.error("fetchHealthResourceBySlug error:", err);
    return null;
  }
}
