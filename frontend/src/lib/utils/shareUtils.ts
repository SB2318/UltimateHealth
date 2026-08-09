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
  return `${SHARE_BASE_URL}/api/share/article?articleId=${articleId}&authorId=${authorId}&recordId=${recordId}`;
};
/**
 * Generates the unified share URL for a podcast.
 * @param trackId The ID of the podcast track.
 * @param audioUrl The podcast audio URL.
 * @returns The absolute share URL with safely encoded query parameters.
 */
export const generatePodcastShareUrl = (
  trackId: string | number,
  audioUrl: string
): string => {
  const params = new URLSearchParams({
    trackId: String(trackId),
    audioUrl,
  });

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
