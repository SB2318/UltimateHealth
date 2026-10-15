/**
 * Text Extractor for Article Listen System
 * Extracts clean, speakable text segments from article HTML or structured blocks.
 */

export interface SpeechSegment {
  id: number;
  text: string;
  isHeading?: boolean;
}

export function extractArticleSpeechSegments(
  title: string,
  authorName: string,
  rawHtml?: string,
  rawContentBlocks?: Array<{ type: string; html?: string; text?: string }>
): SpeechSegment[] {
  const segments: SpeechSegment[] = [];
  let nextId = 0;

  // Segment 0: Title and author intro
  segments.push({
    id: nextId++,
    text: `${title}. Written by ${authorName}.`,
    isHeading: true,
  });

  if (rawHtml) {
    // Process HTML content
    // 1. Remove script, style, comments, and SVG
    let cleaned = rawHtml
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<svg[\s\S]*?<\/svg>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "");

    // 2. Extract headings, paragraphs, and list items
    const blockRegex = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
    let match: RegExpExecArray | null;

    while ((match = blockRegex.exec(cleaned)) !== null) {
      const tag = match[1].toLowerCase();
      const rawText = match[2];

      // Strip inner tags & decode HTML entities
      const text = rawText
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();

      if (text.length > 2) {
        // Split very long paragraphs into sentence chunks (max ~200 characters per speech chunk)
        const isHeading = tag.startsWith("h");
        if (text.length > 220 && !isHeading) {
          const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
          for (const s of sentences) {
            const trimmed = s.trim();
            if (trimmed.length > 2) {
              segments.push({
                id: nextId++,
                text: trimmed,
                isHeading: false,
              });
            }
          }
        } else {
          segments.push({
            id: nextId++,
            text,
            isHeading,
          });
        }
      }
    }
  } else if (rawContentBlocks && rawContentBlocks.length > 0) {
    for (const block of rawContentBlocks) {
      const rawText = block.text || block.html || "";
      const text = rawText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (text.length > 2) {
        segments.push({
          id: nextId++,
          text,
          isHeading: block.type === "heading",
        });
      }
    }
  }

  // End segment
  segments.push({
    id: nextId++,
    text: "Thank you for listening to this health article on UltimateHealth.",
    isHeading: false,
  });

  return segments;
}

/**
 * Calculates estimated listening duration in seconds based on words and speech rate.
 */
export function estimateListeningDuration(
  segments: SpeechSegment[],
  rate = 1.0
): number {
  const totalWords = segments.reduce((acc, seg) => {
    return acc + seg.text.trim().split(/\s+/).length;
  }, 0);

  // Average natural speech is ~140 words per minute at 1.0x rate
  const wordsPerMinute = 140 * rate;
  const minutes = totalWords / wordsPerMinute;
  return Math.max(10, Math.round(minutes * 60));
}

export function formatDurationSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
