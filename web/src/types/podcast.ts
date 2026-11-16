export interface PodcastAuthor {
  _id?: string;
  name?: string;
  user_name?: string;
  user_handle?: string;
  Profile_image?: string;
  avatar?: string;
  email?: string;
  bio?: string;
  role?: string;
}

export interface PodcastTag {
  _id?: string;
  id?: number | string;
  name?: string;
  label?: string;
}

export interface PodcastEpisode {
  _id: string;
  id?: string;
  user_id?: string | PodcastAuthor;
  name: string;
  description: string;
  podcasts_count?: number;
  podcastsCount?: number;
  cover_image?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface PodcastData {
  _id: string;
  title: string;
  description: string;
  audio_url: string;
  cover_image?: string;
  duration?: number; // In milliseconds or seconds
  user_id?: PodcastAuthor | string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  article_id?: number | null;
  tags?: (PodcastTag | string)[];
  category?: string;
  likedUsers?: (PodcastAuthor | string)[];
  savedUsers?: (PodcastAuthor | string)[];
  viewUsers?: (PodcastAuthor | string)[];
  viewCount?: number;
  commentCount?: number;
  status?: string;
  is_removed?: boolean;
  language?: string;
  episode_id?: string | PodcastEpisode | null;
  episode_number?: number;
  updated_at?: string;
  createdAt?: string;
  created_at?: string;
  filePath?: string;
  downloadAt?: string | null;
}

export interface PublishedPodcastsResponse {
  totalPages: number;
  total?: number;
  publishedPodcasts?: PodcastData[];
  allPodcasts?: PodcastData[];
  podcasts?: PodcastData[];
}
