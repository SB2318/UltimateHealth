const WORDS_PER_MINUTE = 200;

/**
 * Converts article HTML or plain text into the words used for read-time
 * estimation.
 */
export function getReadableWordCount(content?: string | null): number {
  if (!content || content.trim().length === 0) {
    return 0;
  }

  const plainText = content
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<img[^>]*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return plainText ? plainText.split(/\s+/).length : 0;
}

/**
 * Calculates estimated reading time from raw HTML or plain text.
 * A short or empty article is always presented as a one-minute read.
 */
export function getReadTime(content: string): string {
  return `${calculateReadTime(content)} min read`;
}

/**
 * Calculates estimated read time in minutes
 * @param content - Plain text article content
 * @returns Estimated read time in minutes
 */
export function calculateReadTime(content: string): number {
  const wordCount = getReadableWordCount(content);
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}