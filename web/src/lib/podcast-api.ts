import { getApiUrl } from "@/lib/api";
import { safeFetch } from "@/lib/safe-fetch";
import type { PodcastData, PodcastEpisode } from "@/types/podcast";
import {
  PODCAST_FALLBACK_IMAGES,
  SAMPLE_AUDIO_FALLBACKS,
  SEED_EPISODES,
  SEED_PODCASTS,
  resolvePodcastCoverUrl,
  resolvePodcastAudioUrl,
  formatPodcastDuration,
  formatPodcastDate,
  getPodcastAuthorInfo,
  normalizePodcast,
} from "./podcast-helpers.mjs";

export {
  PODCAST_FALLBACK_IMAGES,
  SAMPLE_AUDIO_FALLBACKS,
  SEED_EPISODES,
  SEED_PODCASTS,
  resolvePodcastCoverUrl,
  resolvePodcastAudioUrl,
  formatPodcastDuration,
  formatPodcastDate,
  getPodcastAuthorInfo,
  normalizePodcast,
};

/**
 * Fetch published podcasts from public endpoint:
 * https://ultimatehealth.blog/api/podcast/published-podcasts
 * (or fallback /podcast/user-published)
 * Falls back to SEED_PODCASTS only when API endpoints are completely unreachable.
 */
export async function fetchPublishedPodcasts(page = 1, limit = 12): Promise<{
  podcasts: PodcastData[];
  totalPages: number;
  total: number;
}> {
  const ISR = { next: { revalidate: 60 } } as const;

  try {
    // In browser, route through internal API proxy to avoid CORS; on server, call backend directly
    const primaryUrl =
      typeof window !== "undefined"
        ? `/api/podcasts?page=${page}&limit=${limit}`
        : getApiUrl(`/podcast/published-podcasts?page=${page}&limit=${limit}`);

    const res = await safeFetch(primaryUrl, ISR, 8000);

    if (res && res.ok) {
      const data = await res.json();
      const list = data.allPodcasts || data.publishedPodcasts || data.podcasts || (Array.isArray(data) ? data : []);
      if (Array.isArray(list) && list.length > 0) {
        const normalized = list
          .filter((p: any) => (!p.status || p.status === "published") && !p.is_removed)
          .map(normalizePodcast);

        const totalPages = data.totalPages || (normalized.length > 0 ? Math.ceil(normalized.length / limit) : 1);
        const total = typeof data.total === "number" ? data.total : (data.totalCount || normalized.length);
        return { podcasts: normalized, totalPages, total };
      }
    }

    // 2. Secondary fallback endpoint: /podcast/user-published
    const fallbackUrl =
      typeof window !== "undefined"
        ? `/api/podcasts?endpoint=user-published&page=${page}&limit=${limit}`
        : getApiUrl(`/podcast/user-published?page=${page}&limit=${limit}`);

    const fallbackRes = await safeFetch(fallbackUrl, ISR, 4000);

    if (fallbackRes && fallbackRes.ok) {
      const data = await fallbackRes.json();
      const list = data.allPodcasts || data.publishedPodcasts || data.podcasts || (Array.isArray(data) ? data : []);
      if (Array.isArray(list) && list.length > 0) {
        const normalized = list
          .filter((p: any) => (!p.status || p.status === "published") && !p.is_removed)
          .map(normalizePodcast);

        const totalPages = data.totalPages || (normalized.length > 0 ? Math.ceil(normalized.length / limit) : 1);
        const total = typeof data.total === "number" ? data.total : (data.totalCount || normalized.length);
        return { podcasts: normalized, totalPages, total };
      }
    }
  } catch (err) {
    console.error("fetchPublishedPodcasts error:", err);
  }

  // API unreachable — use seed content so the page always shows podcasts
  const seedNormalized = (SEED_PODCASTS as any[]).map(normalizePodcast);
  return {
    podcasts: seedNormalized,
    totalPages: 1,
    total: seedNormalized.length,
  };
}

/**
 * Fetch a single podcast by its ID from public endpoint
 */
export async function fetchPodcastById(id: string): Promise<PodcastData | null> {
  const ISR = { next: { revalidate: 60 } } as const;

  try {
    const url =
      typeof window !== "undefined"
        ? `/api/podcasts/${encodeURIComponent(id)}`
        : getApiUrl(`/podcast/details?podcast_id=${encodeURIComponent(id)}`);

    const res = await safeFetch(url, ISR, 8000);

    if (res && res.ok) {
      const data = await res.json();
      const item = data.podcast || data.data || data;
      if (item && (item._id || item.title)) {
        return normalizePodcast(item);
      }
    }

    // Try alternate query parameter podcastId
    const altUrl = getApiUrl(`/podcast/details?podcastId=${encodeURIComponent(id)}`);
    const altRes = await safeFetch(altUrl, ISR, 4000);

    if (altRes && altRes.ok) {
      const data = await altRes.json();
      const item = data.podcast || data.data || data;
      if (item && (item._id || item.title)) {
        return normalizePodcast(item);
      }
    }
  } catch (err) {
    console.error("fetchPodcastById error:", err);
  }

  // Check seed data as final fallback (for seed podcast IDs like "podcast-cardio-bp")
  const seedMatch = (SEED_PODCASTS as any[]).find((p) => String(p._id) === String(id));
  if (seedMatch) return normalizePodcast(seedMatch);

  return null;
}

/**
 * Fetch podcast episode series containers from public endpoint
 */
export async function fetchPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const ISR = { next: { revalidate: 120 } } as const;

  try {
    const url = getApiUrl(`/podcast-episodes`);
    const res = await safeFetch(url, ISR, 3500);

    if (res && res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.episodes || [];
      if (Array.isArray(list)) {
        return list.map((ep: any) => ({
          _id: String(ep._id || ep.id),
          id: String(ep._id || ep.id),
          name: ep.name || "Health Episode Series",
          description: ep.description || "",
          podcasts_count: typeof ep.podcasts_count === "number" ? ep.podcasts_count : (ep.podcastsCount || 0),
          podcastsCount: typeof ep.podcasts_count === "number" ? ep.podcasts_count : (ep.podcastsCount || 0),
          cover_image: resolvePodcastCoverUrl(ep.cover_image, { title: ep.name }),
          createdAt: ep.created_at || ep.createdAt || new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.error("fetchPodcastEpisodes error:", err);
  }

  // API unreachable — return seed episode series
  return (SEED_EPISODES as any[]) as PodcastEpisode[];
}

/**
 * Fetch podcasts in an episode series
 */
export async function fetchEpisodePodcasts(episodeId: string): Promise<PodcastData[]> {
  const ISR = { next: { revalidate: 60 } } as const;

  try {
    const url = getApiUrl(`/episodes/${encodeURIComponent(episodeId)}/podcasts`);
    const res = await safeFetch(url, ISR, 3500);

    if (res && res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.podcasts || [];
      if (Array.isArray(list)) {
        return list.map(normalizePodcast);
      }
    }
  } catch (err) {
    console.error("fetchEpisodePodcasts error:", err);
  }

  return [];
}
