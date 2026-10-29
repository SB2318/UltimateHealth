/**
 * safeFetch — Resilient fetch wrapper with configurable timeout
 * Prevents 10-second Node.js UND_ERR_CONNECT_TIMEOUT freezes and unhandled crashes
 * during server transitions, DNS updates, or offline local development.
 */
export async function safeFetch(
  url: string,
  options: RequestInit & { next?: { revalidate?: number | false } } = {},
  timeoutMs = 3000
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } catch {
    // Return null gracefully on connect timeout, DNS error, or offline state
    return null;
  } finally {
    clearTimeout(timer);
  }
}
