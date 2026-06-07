export type BreadcrumbItem = {
  label: string;
  onPress?: () => void;
  isCurrent?: boolean;
};

export type RelatedArticleItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  authorName: string;
  articleId: number;
  authorId?: string;
  recordId?: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  category?: string;
};

// The context value exposed to consumers via useGlossary()
export type GlossaryContextValue = {
  terms: GlossaryTerm[];
  selectedTerm: GlossaryTerm | null;
  highlightTerm: (term: string) => void;
  dismissGlossary: () => void;
  isVisible: boolean;
};

export type ArticleHeroProps = {
  title: string;
  subtitle?: string;
  imageUri?: string;
  imageAlt?: string;
  category?: string;
  authorName?: string;
  authorImage?: string;
  publishedAt?: string;
  readingTime?: string;
  viewCount?: number;
  isDarkMode?: boolean;
};

export type ArticleMetaProps = {
  authorName?: string;
  authorImage?: string;
  publishedAt?: string;
  readingTime?: string;
  viewCount?: number;
  isDarkMode?: boolean;
  compact?: boolean;
};

export type ArticleContentProps = {
  htmlContent: string;
  fontScale?: number;
  isDarkMode?: boolean;
};

export type AccessibilityControlsProps = {
  fontScale: number;
  onDecrease: () => void;
  onIncrease: () => void;
  // TTS integration — all optional so the bar can render without TTS
  isPlaying?: boolean;
  isPaused?: boolean;
  playerVisible?: boolean;
  onTTSPlay?: () => void;
  onTTSPause?: () => void;
  onTTSStop?: () => void;
  speechRate?: number;
  speedLabel?: string;
  onSpeedChange?: () => void;
  isDarkMode?: boolean;
};

export type RelatedArticlesProps = {
  articles: RelatedArticleItem[];
  onArticlePress: (item: RelatedArticleItem) => void;
  isDarkMode?: boolean;
};
