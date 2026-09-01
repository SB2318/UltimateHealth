export type CalloutVariant = "tip" | "note" | "warning" | "info";
export type HeadingLevel = 2 | 3 | 4;
export type ListType = "ordered" | "unordered";

export interface HeadingBlock {
  type: "heading";
  level: HeadingLevel;
  text: string;
  /** Anchor ID for in-page navigation links */
  id: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  /** Supports inline HTML: <strong>, <em>, <a href="...">. Plain text enables glossary term highlighting. */
  html: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface BlockquoteBlock {
  type: "blockquote";
  text: string;
  attribution?: string;
}

export interface CalloutBlock {
  type: "callout";
  variant: CalloutVariant;
  title: string;
  text: string;
}

export interface ListBlock {
  type: "list";
  listType: ListType;
  /** Each item may contain inline HTML for bold, italics, links */
  items: string[];
}

export interface DividerBlock {
  type: "divider";
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | BlockquoteBlock
  | CalloutBlock
  | ListBlock
  | DividerBlock;

export interface RichContent {
  blocks: ContentBlock[];
}

export interface ArticleAuthor {
  name: string;
  role: string;
  /** Two-letter initials shown in the avatar circle */
  avatarInitials: string;
  /** CSS color value for the avatar background */
  avatarColor: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  /** Short description used in listings and meta tags */
  excerpt: string;
  content: RichContent;
  imageUrl: string | null;
  imageAlt: string;
  author: ArticleAuthor;
  /** ISO 8601 date string, e.g. "2026-01-15" */
  publishedAt: string;
  updatedAt?: string;
  /** Human-readable duration, e.g. "12 min read" */
  readingTime: string;
  category: string;
  tags: string[];
}
