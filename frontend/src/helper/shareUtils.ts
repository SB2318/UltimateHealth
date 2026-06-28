import { Clipboard } from 'react-native';
import { SHARE_BASE_URL } from './APIUtils';

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

export const generatePodcastShareUrl = (
  trackId: string | number,
  audioUrl: string
): string => {
  const params = [
    `trackId=${encodeURIComponent(String(trackId))}`,
    `audioUrl=${encodeURIComponent(audioUrl)}`,
  ].join('&');

  return `${SHARE_BASE_URL}/api/share/podcast?${params}`;
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
