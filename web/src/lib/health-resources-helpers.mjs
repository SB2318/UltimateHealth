/**
 * health-resources-helpers — pure, dependency-free helpers for public
 * health resources. Kept in plain .mjs (like podcast-helpers.mjs) so the
 * logic is directly testable with node --test without a bundler.
 */

export const SOURCE_TYPE_LABELS = {
  government: "Government",
  "verified-ngo": "Verified NGO",
  "public-interest": "Public interest",
};

export const HEALTH_RESOURCES_DISCLAIMER =
  "UltimateHealth is an independent health information platform. Listing a public resource does not imply government affiliation or endorsement.";

const VALID_SOURCE_TYPES = new Set([
  "government",
  "verified-ngo",
  "public-interest",
]);

function asNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : "";
}

function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function slugifyTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Normalize one raw backend record into a HealthResource.
 * Returns null when the record has no usable title (nothing to show).
 * Never throws on malformed input.
 */
export function normalizeHealthResource(raw) {
  if (!raw || typeof raw !== "object") return null;

  const title = asNonEmptyString(raw.title || raw.name);
  if (!title) return null;

  const sourceType = VALID_SOURCE_TYPES.has(raw.sourceType)
    ? raw.sourceType
    : "public-interest";

  return {
    id: String(raw._id ?? raw.id ?? raw.slug ?? slugifyTitle(title)),
    slug: asNonEmptyString(raw.slug) || slugifyTitle(title),
    title,
    description: asNonEmptyString(raw.description || raw.summary),
    provider: asNonEmptyString(
      raw.provider || raw.authority || raw.organization || raw.source
    ),
    category: asNonEmptyString(raw.category) || "General",
    sourceType,
    region: asNonEmptyString(raw.region),
    resourceType: asNonEmptyString(raw.resourceType || raw.type),
    tags: asStringArray(raw.tags),
    thumbnailUrl: asNonEmptyString(raw.thumbnailUrl || raw.thumbnail || raw.imageUrl) || undefined,
    freeAccess: typeof raw.freeAccess === "boolean" ? raw.freeAccess : undefined,
    officialUrl: asNonEmptyString(raw.officialUrl || raw.url || raw.sourceUrl),
    eligibility: asNonEmptyString(raw.eligibility) || undefined,
    lastVerifiedAt: asNonEmptyString(raw.lastVerifiedAt || raw.verifiedAt) || undefined,
  };
}

/** Extract the resource array from the shapes a backend may return. */
function extractResourceArray(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    for (const key of ["resources", "healthResources", "data", "items"]) {
      if (Array.isArray(data[key])) return data[key];
    }
  }
  return [];
}

/**
 * Parse a list payload (GET /v1/health-resources) into HealthResource[].
 * Any non-list, empty, or malformed payload yields [] — never throws.
 */
export function parseHealthResourcesPayload(data) {
  return extractResourceArray(data)
    .map(normalizeHealthResource)
    .filter(Boolean);
}

/**
 * Parse a placement payload (GET /v1/resource-placements/:name).
 * Returns null when the payload carries no usable resources.
 */
export function parsePlacementPayload(data, name) {
  if (Array.isArray(data)) {
    const resources = parseHealthResourcesPayload(data);
    return resources.length > 0 ? { name, resources } : null;
  }
  if (!data || typeof data !== "object") return null;
  const resources = parseHealthResourcesPayload(data);
  if (resources.length === 0) return null;
  const placementName = asNonEmptyString(data.name || data.placement) || name;
  return { name: placementName, resources };
}

/** Parse a single-resource payload (GET /v1/health-resources/:slug). */
export function parseHealthResourcePayload(data) {
  if (!data || typeof data !== "object") return null;
  const item = data.healthResource ?? data.resource ?? data.data ?? data;
  return normalizeHealthResource(item);
}

/**
 * Client-side filtering for the directory: text query matches title,
 * description, and tags; category / region / resourceType match exactly.
 * "all" (or an empty value) disables that filter.
 */
export function filterHealthResources(resources, filters) {
  const { query = "", category = "all", region = "all", resourceType = "all" } = filters || {};
  const needle = query.trim().toLowerCase();

  return (resources || []).filter((resource) => {
    if (category !== "all" && resource.category !== category) return false;
    if (region !== "all" && resource.region !== region) return false;
    if (resourceType !== "all" && resource.resourceType !== resourceType) return false;
    if (needle) {
      const haystack = [resource.title, resource.description, ...(resource.tags || [])]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

/** Sorted, de-duplicated filter options derived from the fetched list. */
export function deriveFilterOptions(resources) {
  const pick = (key) => {
    const values = new Set();
    for (const resource of resources || []) {
      const value = asNonEmptyString(resource[key]);
      if (value) values.add(value);
    }
    return [...values].sort((a, b) => a.localeCompare(b));
  };

  return {
    categories: pick("category"),
    regions: pick("region"),
    resourceTypes: pick("resourceType"),
  };
}

/**
 * Placement render state: loading skeleton while fetching, the card list
 * when resources exist, otherwise the static directory fallback card.
 */
export function resolvePlacementState({ loading, error, resources }) {
  if (loading) return "loading";
  if (error) return "fallback";
  if (Array.isArray(resources) && resources.length > 0) return "list";
  return "fallback";
}

/**
 * Props for an external official-source link. The rel pair is mandatory:
 * it prevents the target page from reaching window.opener.
 */
export function buildExternalLinkProps(url) {
  return {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}
