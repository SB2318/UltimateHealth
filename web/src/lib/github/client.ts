/**
 * GitHub API Client with caching, rate-limit awareness, and safe fallback.
 */

const GITHUB_API_BASE = 'https://api.github.com';
export const REPO_OWNER = 'SB2318';
export const REPO_NAME = 'UltimateHealth';

export async function fetchFromGitHub<T>(
  endpoint: string,
  options: { revalidate?: number; timeout?: number } = {}
): Promise<{ data: T | null; status: number; remaining?: number; error?: string }> {
  const { revalidate = 3600, timeout = 10000 } = options;
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'UltimateHealth-Web/1.0',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${GITHUB_API_BASE}${endpoint}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      next: { revalidate },
    });

    clearTimeout(timeoutId);

    const remaining = response.headers.get('x-ratelimit-remaining')
      ? parseInt(response.headers.get('x-ratelimit-remaining') || '0', 10)
      : undefined;

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return {
        data: null,
        status: response.status,
        remaining,
        error: `GitHub API error ${response.status}: ${errText.slice(0, 100)}`,
      };
    }

    const data = (await response.json()) as T;
    return { data, status: response.status, remaining };
  } catch (err: any) {
    return {
      data: null,
      status: 500,
      error: err.name === 'AbortError' ? 'GitHub API request timed out' : err.message,
    };
  }
}
