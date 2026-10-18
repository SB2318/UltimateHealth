import { fetchFromGitHub, REPO_OWNER, REPO_NAME } from './client';
import { GitHubUser, DynamicContributor, ContributorsApiResponse } from './types';
import { ALL_CONTRIBUTORS, PROJECT_ADMIN } from '@/app/[locale]/our-contributors/contributors-data';

const BOT_LOGINS = new Set([
  'github-actions[bot]',
  'dependabot[bot]',
  'imgbot[bot]',
  'sonarcloud[bot]',
  'snyk-bot',
  'codecov[bot]',
]);

export async function getDynamicContributors(): Promise<ContributorsApiResponse> {
  const currentYear = new Date().getFullYear();
  const knownMap = new Map<string, DynamicContributor>();

  // Populate known map from local dataset
  ALL_CONTRIBUTORS.forEach((c) => {
    const key = c.handle.replace('@', '').toLowerCase();
    knownMap.set(key, { ...c });
  });

  const adminKey = PROJECT_ADMIN.handle.replace('@', '').toLowerCase();

  // Fetch up to 300 contributors from GitHub API (3 pages of 100)
  const ghContributors: GitHubUser[] = [];
  let page = 1;
  let hasMore = true;
  let isLive = false;
  let remainingQuota: number | undefined;

  try {
    while (hasMore && page <= 3) {
      const res = await fetchFromGitHub<GitHubUser[]>(
        `/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100&page=${page}`,
        { revalidate: 3600 }
      );

      if (res.remaining !== undefined) {
        remainingQuota = res.remaining;
      }

      if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        isLive = true;
        ghContributors.push(...res.data);
        if (res.data.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }
  } catch (err) {
    console.warn('[GitHub API] Error fetching contributors, using fallback:', err);
  }

  // If GitHub API succeeded and returned users
  if (isLive && ghContributors.length > 0) {
    const activeAdmin: DynamicContributor = { ...PROJECT_ADMIN };

    for (const gh of ghContributors) {
      const login = (gh.login || '').trim();
      const loginLower = login.toLowerCase();

      // Skip bots
      if (BOT_LOGINS.has(loginLower) || gh.type === 'Bot' || loginLower.endsWith('[bot]')) {
        continue;
      }

      // If it's the admin
      if (loginLower === adminKey) {
        activeAdmin.commits = Math.max(activeAdmin.commits, gh.contributions);
        if (gh.avatar_url) activeAdmin.img = gh.avatar_url;
        continue;
      }

      // Check if known in our dataset
      const existing = knownMap.get(loginLower);
      if (existing) {
        existing.commits = Math.max(existing.commits, gh.contributions);
        if (gh.avatar_url) existing.img = gh.avatar_url;
      } else {
        // Newly discovered contributor from GitHub API!
        knownMap.set(loginLower, {
          handle: `@${login}`,
          name: gh.name || login,
          img: gh.avatar_url || `https://github.com/${login}.png`,
          url: gh.html_url || `https://github.com/${login}`,
          years: [currentYear],
          commits: gh.contributions,
          additions: gh.contributions * 25,
          deletions: gh.contributions * 5,
          area: 'Community Contributor',
          summary: `Contributed ${gh.contributions} ${gh.contributions === 1 ? 'commit' : 'commits'} via GitHub`,
          isNew: true,
        });
      }
    }

    const contributorsList = Array.from(knownMap.values());

    return {
      success: true,
      isLive: true,
      source: 'github-api',
      total: contributorsList.length + 1,
      contributors: contributorsList,
      admin: activeAdmin,
      rateLimitRemaining: remainingQuota,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Graceful fallback to rich local dataset
  return {
    success: true,
    isLive: false,
    source: 'local-fallback',
    total: ALL_CONTRIBUTORS.length + 1,
    contributors: [...ALL_CONTRIBUTORS],
    admin: { ...PROJECT_ADMIN },
    rateLimitRemaining: remainingQuota,
    lastUpdated: new Date().toISOString(),
  };
}
