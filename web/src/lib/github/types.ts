export interface GitHubUser {
  login: string;
  id: number;
  node_id?: string;
  avatar_url: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  type: string;
  site_admin?: boolean;
  contributions: number;
  name?: string | null;
  bio?: string | null;
}

export interface GitHubCommitStats {
  total: number;
  weeks: Array<{
    w: number;
    a: number;
    d: number;
    c: number;
  }>;
  author: GitHubUser;
}

export interface DynamicContributor {
  handle: string;
  name: string;
  img: string;
  url: string;
  years: number[];
  commits: number;
  additions: number;
  deletions: number;
  area: string;
  summary: string;
  isNew?: boolean;
}

export interface ContributorsApiResponse {
  success: boolean;
  isLive: boolean;
  source: 'github-api' | 'local-fallback';
  total: number;
  contributors: DynamicContributor[];
  admin: DynamicContributor;
  rateLimitRemaining?: number;
  lastUpdated: string;
}
