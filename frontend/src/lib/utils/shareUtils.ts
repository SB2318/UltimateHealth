import { Clipboard } from 'react-native';
import { SHARE_BASE_URL } from '../api/APIUtils';

/**
 * Generates the unified share URL for an article.
 * @param articleId The ID of the article.
 * @param authorId The ID of the author.
 * @param recordId The PocketBase record ID of the article.
 * @returns The absolute share URL.
 */
export const generateArticleShareUrl = (
  articleId: string | number,
  authorId: string | number,
  recordId: string
): string => {
  const params = new URLSearchParams({
    articleId: String(articleId),
    authorId: String(authorId),
    recordId,
  });

  return `${SHARE_BASE_URL}/api/share/article?${params.toString()}`;
};

/**
 * Generates the unified share URL for a podcast.
 * Safely encodes audioUrl even when it already contains query parameters or auth tokens.
 * @param trackId The ID of the podcast track.
 * @param audioUrl The podcast audio URL.
 * @returns The absolute share URL with safely encoded query parameters.
 */
export const generatePodcastShareUrl = (
  trackId: string | number,
  audioUrl: string
): string => {
  const params = new URLSearchParams();
  params.set('trackId', String(trackId));
  // Ensure complex audio URLs with tokens/expiry query parameters are preserved and safely encoded
  params.set('audioUrl', encodeURIComponent(audioUrl.trim()));

  return `${SHARE_BASE_URL}/api/share/podcast?${params.toString()}`;
};

/**
 * Copies the article share link to the Clipboard.
 * @param articleId The ID of the article.
 * @param authorId The ID of the author.
 * @param recordId The PocketBase record ID of the article.
 */
export const copyArticleShareLink = (
  articleId: string | number,
  authorId: string | number,
  recordId: string
): void => {
  const url = generateArticleShareUrl(articleId, authorId, recordId);
  Clipboard.setString(url);
};

/**
 * Copies the podcast share link to the Clipboard.
 * @param trackId The ID of the podcast track.
 * @param audioUrl The podcast audio URL.
 */
export const copyPodcastShareLink = (
  trackId: string | number,
  audioUrl: string
): void => {
  const url = generatePodcastShareUrl(trackId, audioUrl);
  Clipboard.setString(url);
};
