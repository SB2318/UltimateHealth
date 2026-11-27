/**
 * Shared types for public health resources and ad-slot placements.
 * The backend endpoints for these resources do not exist yet
 * (GET /api/v1/health-resources, GET /api/v1/resource-placements/:name),
 * so every fetch in @/lib/health-resources treats a missing or failed
 * response as empty and the UI falls back to the directory link.
 */

export type HealthResourceSourceType =
  | "government"
  | "verified-ngo"
  | "public-interest";

export interface HealthResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Publishing authority: government body, NGO, or public-interest org. */
  provider: string;
  category: string;
  sourceType: HealthResourceSourceType;
  region: string;
  resourceType: string;
  tags: string[];
  thumbnailUrl?: string;
  freeAccess?: boolean;
  /** Official source URL. External links must open in a new tab. */
  officialUrl: string;
  eligibility?: string;
  lastVerifiedAt?: string;
}

export interface ResourcePlacement {
  name: string;
  resources: HealthResource[];
}
