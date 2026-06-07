/**
 * ArticleDetailScreen
 *
 * Production-ready article reading screen that composes all article-specific
 * components into a single, accessible, responsive page.
 *
 * Architecture overview
 * ─────────────────────
 *   GlossaryProvider              — future term-highlight context
 *     SafeAreaView
 *       ReadingProgressBar        — sticky top bar, fills as user scrolls
 *       ScrollView
 *         Breadcrumbs             — Home › Articles › Category › Title
 *         ArticleHero             — full-bleed image + title + ArticleMeta
 *         AccessibilityControls   — font A- / A+ and TTS play / pause / stop
 *         ArticleContent          — HTML renderer with rich callout CSS
 *         ResearchSummaryCard     — AI-generated summary (existing component)
 *         StructuredPodcastCard   — related podcasts (existing component)
 *         RelatedArticles         — responsive grid of related articles
 *       ArticleActionBar          — Like · Comment · Share · Translate · Improve · Save
 *       AuthorRow                 — avatar, name, follower count, Follow button
 *       FloatingTTSPlayer         — visible when TTS is active
 *
 * Navigation params (same as ArticleScreen so deep links work with either):
 *   articleId : number
 *   authorId? : string
 *   recordId? : string
 *
 * To register: add 'ArticleDetailScreen' to RootStackParamList in type.ts and
 * StackNavigation.tsx alongside the existing ArticleScreen entry.
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import Tts from 'react-native-tts';
import LottieView from 'lottie-react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Existing hooks
import { useGetArticleDetails } from '@/src/hooks/useGetArticleDetail';
import { useGetArticleContent } from '@/src/hooks/useGetArticleContent';
import { useGetProfile } from '@/src/hooks/useGetProfile';
import { useLikeArticle } from '@/src/hooks/useLikeArticle';
import { useSaveArticle } from '@/src/hooks/useSaveArticle';
import { useUpdateFollowStatusByArticle } from '@/src/hooks/useUpdateFollowStatus';
import { useUpdateReadEvent } from '@/src/hooks/useUpdateReadEvent';
import { useUpdateViewCount } from '@/src/hooks/useUpdateViewCount';

// Existing components
import Loader from '../../components/Loader';
import LoadingSpinner from '../../components/LoadingSpinner';
import ResearchSummaryCard from '../../components/ResearchSummaryCard';
import StructuredPodcastCard from '../../components/StructuredPodcastCard';

// Existing services / helpers
import { generateArticleSummary, ArticleSummary } from '../../services/SummaryService';
import { setUserHandle } from '../../store/UserSlice';
import { formatCount, handleExternalClick, retrieveItem, StatusEnum, storeItem } from '../../helper/Utils';
import { PRIMARY_COLOR } from '../../helper/Theme';
import { GET_IMAGE, GET_STORAGE_DATA } from '../../helper/APIUtils';
import { useSocket } from '../../contexts/SocketContext';
import { ArticleData, ArticleScreenProp } from '../../type';

// New article-specific components
import { GlossaryProvider } from '../../components/article/GlossaryProvider';
import { Breadcrumbs } from '../../components/article/Breadcrumbs';
import { ArticleHero } from '../../components/article/ArticleHero';
import { ArticleContent } from '../../components/article/ArticleContent';
import { AccessibilityControls } from '../../components/article/AccessibilityControls';
import { RelatedArticles } from '../../components/article/RelatedArticles';
import type { RelatedArticleItem } from '../../components/article/types';

// Mock data (replace with real API call)
import {
  MOCK_RELATED_ARTICLES,
  estimateReadingTime,
} from '../../constants/mockArticleData';

import {
  ProfessionalColors,
  Spacing,
  Typography,
  BorderRadius,
} from '../../styles/GlassStyles';

// ─── Constants ────────────────────────────────────────────────────────────────

const CHUNK_SIZE = 120;
const FONT_SCALE_KEY = 'article_font_scale';
const FONT_SCALE_MIN = 0.8;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.1;
const BASE_FONT_SIZE = 16;
const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5];
const SPEED_LABELS: Record<number, string> = {
  0.5: '0.5×',
  0.75: '0.75×',
  1.0: '1×',
  1.25: '1.25×',
  1.5: '1.5×',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const clampFontScale = (v: number) =>
  Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, v));

const debounce = (fn: (...a: any[]) => void, ms: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
};

const buildAuthorImageUri = (profileImage?: string): string | undefined => {
  if (!profileImage || profileImage.trim() === '') return undefined;
  return profileImage.startsWith('http')
    ? profileImage
    : `${GET_STORAGE_DATA}/${profileImage}`;
};

const buildArticleImageUri = (imageUtils?: string[]): string | undefined => {
  if (!imageUtils || imageUtils.length === 0) return undefined;
  const img = imageUtils[0];
  return img.startsWith('http') ? img : `${GET_IMAGE}/${img}`;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Re-uses the ArticleScreen navigation param type.
 * Register this screen under a separate key if you want both to coexist.
 */
const ArticleDetailScreen = ({ navigation, route }: ArticleScreenProp) => {
  const { articleId, authorId, recordId } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const { user_id, isGuest } = useSelector((state: any) => state.user);
  const socket = useSocket();

  // ── Data fetching ──────────────────────────────────────────────────────────

  const { data: user } = useGetProfile();
  const {
    data: article,
    isLoading: articleLoading,
    refetch,
  } = useGetArticleDetails(articleId);

  const resolvedRecordId = article?.pb_recordId || recordId;
  const { data: articleContent } = useGetArticleContent(resolvedRecordId);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const { mutate: likeMutation, isPending: likeMutationPending } = useLikeArticle(Number(articleId));
  const { mutate: saveMutation, isPending: saveMutationPending } = useSaveArticle(Number(articleId));
  const { mutate: followMutation, isPending: followMutationPending } = useUpdateFollowStatusByArticle();
  const { mutate: updateReadEvent } = useUpdateReadEvent(articleId);
  const { mutate: updateViewCount } = useUpdateViewCount(articleId ?? 0);

  // ── Local state ────────────────────────────────────────────────────────────

  const [fontScale, setFontScale] = useState(1);
  const [readEventSave, setReadEventSave] = useState(false);
  const [summary, setSummary] = useState<ArticleSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // TTS state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.5);
  const chunkIndexRef = useRef(0);
  const wordsRef = useRef<string[]>([]);

  // Reading progress (0–1) drives the sticky progress bar
  const readingProgressAnim = useRef(new Animated.Value(0)).current;
  const [readingProgress, setReadingProgress] = useState(0);

  // ── Derived values ─────────────────────────────────────────────────────────

  const likedUsers = article?.likedUsers ?? [];
  const totalLikes = likedUsers.length;
  const isLiked = likedUsers.some((u) => u._id === user_id);
  const isSaved = article?.savedUsers?.includes(user_id) ?? false;
  const authorUser = article?.authorId as any;
  const isFollowing = authorUser?.followers?.some((f: any) => f._id === user_id) ?? false;

  const articleImageUri = buildArticleImageUri(article?.imageUtils);
  const authorImageUri = buildAuthorImageUri(authorUser?.Profile_image);

  const readingTime = articleContent
    ? estimateReadingTime(articleContent)
    : undefined;

  // ── Effects ────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isGuest) updateViewCount(articleId, { onError: console.error });
    return () => {
      setIsPlaying(false);
      setIsPaused(false);
      setPlayerVisible(false);
      Tts.stop();
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-error');
    };
  }, [articleId, isGuest, updateViewCount]);

  useEffect(() => { refetch(); }, [articleId, refetch]);

  useEffect(() => {
    if (user) dispatch(setUserHandle(user.user_handle));
  }, [dispatch, user]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const stored = await retrieveItem(FONT_SCALE_KEY).catch(() => null);
      if (!mounted || !stored) return;
      const parsed = Number(stored);
      if (!Number.isNaN(parsed)) setFontScale(clampFontScale(parsed));
    })();
    return () => { mounted = false; };
  }, []);

  // AI summary
  useEffect(() => {
    const raw = article?.content || (article as any)?.body || '';
    if (!raw || raw.length < 100) { setSummary(null); return; }
    setSummary(null);
    setSummaryLoading(true);
    generateArticleSummary(raw)
      .then(setSummary)
      .catch(() => setSummary(null))
      .finally(() => setSummaryLoading(false));
  }, [article?.content, (article as any)?.body]);

  // Animate progress bar whenever readingProgress changes
  useEffect(() => {
    Animated.timing(readingProgressAnim, {
      toValue: readingProgress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [readingProgress, readingProgressAnim]);

  // ── Font scale ─────────────────────────────────────────────────────────────

  const debouncedPersist = useCallback(
    debounce((v: number) => storeItem(FONT_SCALE_KEY, v.toFixed(2)).catch(console.error), 300),
    [],
  );

  const handleDecreaseFont = useCallback(() => {
    const v = clampFontScale(fontScale - FONT_SCALE_STEP);
    setFontScale(v);
    debouncedPersist(v);
  }, [fontScale, debouncedPersist]);

  const handleIncreaseFont = useCallback(() => {
    const v = clampFontScale(fontScale + FONT_SCALE_STEP);
    setFontScale(v);
    debouncedPersist(v);
  }, [fontScale, debouncedPersist]);

  // ── TTS ────────────────────────────────────────────────────────────────────

  const stripHtml = (html: string) =>
    html
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const ensureLanguage = async (lang: string) => {
    const voices = await Tts.voices();
    const voice = voices.find((v) => v.language === lang && !v.notInstalled);
    if (voice) {
      await Tts.setDefaultVoice(voice.id);
      return true;
    }
    if (Platform.OS === 'android') Tts.requestInstallData();
    return false;
  };

  const speakNextChunk = () => {
    const { current: words } = wordsRef;
    const idx = chunkIndexRef.current;
    if (idx >= words.length) {
      setIsPlaying(false); setIsPaused(false); setPlayerVisible(false);
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-error');
      return;
    }
    const chunk = words.slice(idx, idx + CHUNK_SIZE).join(' ');
    chunkIndexRef.current = idx + CHUNK_SIZE;
    Tts.speak(chunk);
  };

  const handleTtsPlay = useCallback(async () => {
    if (!articleContent) return;
    try {
      await Tts.stop();
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-error');
      const lang = article?.language || 'en-IN';
      const ready = await ensureLanguage(lang);
      if (!ready) return;
      await Tts.setDefaultLanguage(lang);
      Tts.setDefaultPitch(1.0);
      Tts.setDefaultRate(speechRate);
      const words = stripHtml(articleContent).split(/\s+/);
      wordsRef.current = words;
      chunkIndexRef.current = 0;
      Tts.addEventListener('tts-finish', speakNextChunk);
      Tts.addEventListener('tts-error', () => {
        setIsPlaying(false); setIsPaused(false); setPlayerVisible(false);
      });
      setIsPlaying(true); setIsPaused(false); setPlayerVisible(true);
      speakNextChunk();
    } catch {
      setIsPlaying(false); setIsPaused(false); setPlayerVisible(false);
    }
  }, [articleContent, article?.language, speechRate]);

  const handleTtsPause = useCallback(async () => {
    if (isPaused) {
      setIsPlaying(true); setIsPaused(false);
      chunkIndexRef.current = Math.max(0, chunkIndexRef.current - CHUNK_SIZE);
      Tts.addEventListener('tts-finish', speakNextChunk);
      Tts.addEventListener('tts-error', () => {
        setIsPlaying(false); setIsPaused(false); setPlayerVisible(false);
      });
      speakNextChunk();
    } else {
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-error');
      await Tts.stop();
      setIsPlaying(false); setIsPaused(true);
    }
  }, [isPaused]);

  const handleTtsStop = useCallback(async () => {
    await Tts.stop();
    Tts.removeAllListeners('tts-finish');
    Tts.removeAllListeners('tts-error');
    wordsRef.current = [];
    chunkIndexRef.current = 0;
    setIsPlaying(false); setIsPaused(false); setPlayerVisible(false);
  }, []);

  const handleSpeedChange = useCallback(() => {
    const next = SPEED_OPTIONS[(SPEED_OPTIONS.indexOf(speechRate) + 1) % SPEED_OPTIONS.length];
    setSpeechRate(next);
    Tts.setDefaultRate(next);
    if (isPlaying && !isPaused) {
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-error');
      chunkIndexRef.current = Math.max(0, chunkIndexRef.current - CHUNK_SIZE);
      Tts.stop().then(() => {
        Tts.addEventListener('tts-finish', speakNextChunk);
        Tts.addEventListener('tts-error', () => {
          setIsPlaying(false); setIsPaused(false); setPlayerVisible(false);
        });
        speakNextChunk();
      });
    }
  }, [speechRate, isPlaying, isPaused]);

  // ── Article actions ────────────────────────────────────────────────────────

  const guardGuest = useCallback((title: string, description: string, iconName: string) => {
    navigation.navigate('GuestPlaceholderScreen', { title, description, iconName });
  }, [navigation]);

  const handleLike = useCallback(() => {
    if (isGuest) { guardGuest('Sign In Required', 'Please sign in to like this article.', 'heart'); return; }
    if (!article) { Alert.alert('Article not found'); return; }
    likeMutation(undefined, {
      onSuccess: (data: { article: ArticleData; likeStatus: boolean }) => {
        if (data?.likeStatus && socket) {
          socket.emit('notification', {
            type: 'likePost',
            userId: data.article.authorId,
            articleId: data.article._id,
            podcastId: null,
            articleRecordId: data.article.pb_recordId,
            title: user ? `${user.user_handle} liked your post` : 'Someone liked your post',
            message: data.article.title,
          });
        }
        refetch();
      },
      onError: () => Snackbar.show({ text: 'Something went wrong, try again!', duration: Snackbar.LENGTH_LONG }),
    });
  }, [isGuest, article, likeMutation, socket, user, refetch, guardGuest]);

  const handleSave = useCallback(() => {
    if (isGuest) { guardGuest('Sign In Required', 'Please sign in to save this article.', 'bookmark'); return; }
    if (!article) { Alert.alert('Article not found'); return; }
    saveMutation(undefined, {
      onSuccess: () => {
        refetch();
        Snackbar.show({
          text: isSaved ? 'Article removed from saved' : 'Article saved!',
          duration: Snackbar.LENGTH_SHORT,
        });
      },
      onError: () => Snackbar.show({ text: 'Something went wrong, try again!', duration: Snackbar.LENGTH_LONG }),
    });
  }, [isGuest, article, saveMutation, isSaved, refetch, guardGuest]);

  const handleFollow = useCallback(() => {
    if (isGuest) { guardGuest('Sign In Required', 'Please sign in to follow this author.', 'user-plus'); return; }
    followMutation(articleId.toString(), {
      onSuccess: (data) => {
        if (data && socket) {
          socket.emit('notification', {
            type: 'userFollow',
            userId: authorId,
            message: { title: `${user?.user_handle} has followed you`, body: '' },
          });
        }
        refetch();
      },
      onError: () => Snackbar.show({ text: 'Something went wrong, try again!', duration: Snackbar.LENGTH_SHORT }),
    });
  }, [isGuest, followMutation, articleId, socket, authorId, user, refetch, guardGuest]);

  const handleShare = useCallback(async () => {
    if (!article) return;
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n\n${article.description}`,
        title: article.title,
      });
    } catch {
      Snackbar.show({ text: 'Failed to share article', duration: Snackbar.LENGTH_SHORT });
    }
  }, [article]);

  const handleTranslate = useCallback(() => {
    if (isGuest) { guardGuest('Sign In Required', 'Please sign in to translate this article.', 'translate'); return; }
    if (!article) { Alert.alert('Article not found'); return; }
    if (!articleContent) {
      Snackbar.show({ text: 'Content still loading. Please try again.', duration: Snackbar.LENGTH_SHORT });
      return;
    }
    navigation.navigate('ArticleDescriptionScreen', {
      article,
      htmlContent: articleContent,
      translationSource: {
        sourceArticleId: article._id,
        sourceArticleRecordId: article.pb_recordId || recordId || '',
        sourceLanguage: article.language || 'en-IN',
        sourceTitle: article.title,
      },
    });
  }, [isGuest, article, articleContent, navigation, recordId, guardGuest]);

  const handleImprove = useCallback(() => {
    if (isGuest) { guardGuest('Sign In Required', 'Please sign in to improve this article.', 'auto-fix'); return; }
    if (!article || !articleContent) {
      Snackbar.show({ text: 'Content still loading. Please try again.', duration: Snackbar.LENGTH_SHORT });
      return;
    }
    navigation.navigate('EditorScreen', {
      title: article.title,
      description: article.description,
      selectedGenres: article.tags,
      imageUtils: article.imageUtils[0],
      articleData: article,
      requestId: undefined,
      pb_record_id: article.pb_recordId,
      authorName: user?.user_handle ?? '',
      htmlContent: articleContent,
      language: article.language,
    });
  }, [isGuest, article, articleContent, navigation, user, guardGuest]);

  // ── Scroll handler ─────────────────────────────────────────────────────────

  const handleScroll = useCallback((e: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const scrollable = contentSize.height - layoutMeasurement.height;
    if (scrollable > 0) {
      const progress = Math.min(1, contentOffset.y / scrollable);
      setReadingProgress(progress);
    }

    // Record read event when user reaches the bottom
    const atBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (
      atBottom &&
      article &&
      !readEventSave &&
      !isGuest &&
      article.status === StatusEnum.PUBLISHED
    ) {
      updateReadEvent(undefined, {
        onSuccess: () => {
          setReadEventSave(true);
          Snackbar.show({ text: 'Read status updated.', duration: Snackbar.LENGTH_SHORT });
        },
      });
    }
  }, [article, readEventSave, isGuest, updateReadEvent]);

  // ── Breadcrumb items ───────────────────────────────────────────────────────

  const breadcrumbItems = [
    { label: 'Home', onPress: () => navigation.navigate('TabNavigation') },
    { label: 'Articles', onPress: () => navigation.goBack() },
    ...(article?.tags?.[0]?.name
      ? [{ label: article.tags[0].name, onPress: () => navigation.goBack() }]
      : []),
    ...(article ? [{ label: article.title, isCurrent: true }] : []),
  ];

  // ── Related articles handler ───────────────────────────────────────────────

  const handleRelatedArticlePress = useCallback(
    (item: RelatedArticleItem) => {
      navigation.push('ArticleScreen', {
        articleId: item.articleId,
        authorId: item.authorId,
        recordId: item.recordId,
      });
    },
    [navigation],
  );

  // ── Loading / error states ─────────────────────────────────────────────────

  if (articleLoading) return <Loader />;

  // ── Theme values ───────────────────────────────────────────────────────────

  const bg = isDarkMode ? ProfessionalColors.gray900 : ProfessionalColors.white;
  const footerBg = isDarkMode ? '#111827' : '#ffffff';
  const footerBorder = isDarkMode ? '#1f2937' : '#E5E5E5';
  const pillBg = isDarkMode ? '#1f2937' : '#F3F4F6';
  const activePillBg = isDarkMode ? '#3b82f6' : '#EFF6FF';
  const pillText = isDarkMode ? '#d1d5db' : '#4b5563';
  const progressBarWidth = readingProgressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <GlossaryProvider terms={[]}>
      <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>

        {/* ── Sticky reading progress bar ──────────────────── */}
        <View
          style={styles.progressBarTrack}
          accessibilityRole="progressbar"
          accessibilityLabel={`Reading progress: ${Math.round(readingProgress * 100)}%`}
          accessibilityValue={{ min: 0, max: 100, now: Math.round(readingProgress * 100) }}
        >
          <Animated.View
            style={[styles.progressBarFill, { width: progressBarWidth }]}
          />
        </View>

        {/* ── Main scrollable content ───────────────────────── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={breadcrumbItems}
            onBackPress={() => navigation.goBack()}
            isDarkMode={isDarkMode}
          />

          {/* Hero section */}
          {article && (
            <ArticleHero
              title={article.title}
              subtitle={article.description || article.summary}
              imageUri={articleImageUri}
              imageAlt={article.title}
              category={article.tags?.[0]?.name}
              authorName={article.authorName}
              authorImage={authorImageUri}
              publishedAt={article.lastUpdated || article.assigned_date || undefined}
              readingTime={readingTime}
              viewCount={article.viewCount}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Accessibility controls: font size + TTS */}
          {article && (
            <AccessibilityControls
              fontScale={fontScale}
              onDecrease={handleDecreaseFont}
              onIncrease={handleIncreaseFont}
              isPlaying={isPlaying}
              isPaused={isPaused}
              playerVisible={playerVisible}
              onTTSPlay={handleTtsPlay}
              onTTSPause={handleTtsPause}
              onTTSStop={handleTtsStop}
              speechRate={speechRate}
              speedLabel={SPEED_LABELS[speechRate]}
              onSpeedChange={handleSpeedChange}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Liked-by avatars */}
          {article && totalLikes > 0 && (
            <View style={styles.avatarsContainer}>
              {likedUsers
                .slice(Math.max(0, totalLikes - 3))
                .map((likedUser, index) => {
                  const uri = buildAuthorImageUri(likedUser.Profile_image) ??
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
                  return (
                    <View
                      key={likedUser._id || index}
                      style={[styles.avatar, { left: index * 15 }]}
                    >
                      <Image source={{ uri }} style={styles.avatarImage} />
                    </View>
                  );
                })}
              {totalLikes > 3 && (
                <View style={[styles.avatar, styles.avatarMore, { left: 45 }]}>
                  <Text style={styles.avatarMoreText}>+{totalLikes - 3}</Text>
                </View>
              )}
            </View>
          )}

          {/* Article body */}
          {articleContent && (
            <ArticleContent
              htmlContent={articleContent}
              fontScale={fontScale}
              isDarkMode={isDarkMode}
            />
          )}

          {/* AI research summary */}
          <ResearchSummaryCard summary={summary} loading={summaryLoading} />

          {/* Related podcasts */}
          {article?.relatedPodcasts && article.relatedPodcasts.length > 0 && (
            <StructuredPodcastCard relatedEpisodes={article.relatedPodcasts} />
          )}

          {/* Related articles */}
          <RelatedArticles
            articles={MOCK_RELATED_ARTICLES}
            onArticlePress={handleRelatedArticlePress}
            isDarkMode={isDarkMode}
          />
        </ScrollView>

        {/* ── Footer action bar ─────────────────────────────── */}
        <View style={[styles.footer, { backgroundColor: footerBg, borderTopColor: footerBorder }]}>
          <View style={[styles.actionRow, { borderBottomColor: footerBorder }]}>
            {/* Like */}
            <ActionPill
              icon={<FontAwesome name="heart" size={16} color={isLiked ? PRIMARY_COLOR : pillText} />}
              label={article?.likeCount ? formatCount(article.likeCount) : '0'}
              onPress={handleLike}
              active={isLiked}
              loading={likeMutationPending}
              activeBg={activePillBg}
              inactiveBg={pillBg}
              textColor={isLiked ? PRIMARY_COLOR : pillText}
              accessibilityLabel={isLiked ? 'Unlike article' : 'Like article'}
            />

            {/* Comment */}
            <ActionPill
              icon={<MaterialCommunityIcons name="comment-outline" size={16} color={pillText} />}
              label="Comment"
              onPress={() => {
                if (isGuest) {
                  guardGuest('Sign In Required', 'Please sign in to comment.', 'comment');
                  return;
                }
                if (article) {
                  navigation.navigate('CommentScreen', {
                    articleId: Number(article._id),
                    mentionedUsers: article.mentionedUsers,
                    article,
                  });
                }
              }}
              active={false}
              activeBg={activePillBg}
              inactiveBg={pillBg}
              textColor={pillText}
              accessibilityLabel="Open comments"
            />

            {/* Share */}
            <ActionPill
              icon={<FontAwesome name="share" size={16} color={pillText} />}
              label="Share"
              onPress={handleShare}
              active={false}
              activeBg={activePillBg}
              inactiveBg={pillBg}
              textColor={pillText}
              accessibilityLabel="Share article"
            />

            {/* Translate */}
            <ActionPill
              icon={<MaterialCommunityIcons name="translate" size={16} color={pillText} />}
              label="Translate"
              onPress={handleTranslate}
              active={false}
              activeBg={activePillBg}
              inactiveBg={pillBg}
              textColor={pillText}
              accessibilityLabel="Translate article"
            />

            {/* Improve */}
            <ActionPill
              icon={<MaterialCommunityIcons name="auto-fix" size={16} color={pillText} />}
              label="Improve"
              onPress={handleImprove}
              active={false}
              activeBg={activePillBg}
              inactiveBg={pillBg}
              textColor={pillText}
              accessibilityLabel="Improve article"
            />

            {/* Save */}
            <ActionPill
              icon={
                <FontAwesome
                  name={isSaved ? 'bookmark' : 'bookmark-o'}
                  size={16}
                  color={isSaved ? PRIMARY_COLOR : pillText}
                />
              }
              label="Save"
              onPress={handleSave}
              active={isSaved}
              loading={saveMutationPending}
              activeBg={activePillBg}
              inactiveBg={pillBg}
              textColor={isSaved ? PRIMARY_COLOR : pillText}
              accessibilityLabel={isSaved ? 'Remove from saved' : 'Save article'}
            />
          </View>

          {/* Author row */}
          <View style={styles.authorRow}>
            <TouchableOpacity
              style={styles.authorLeft}
              onPress={() => {
                if (isGuest) { guardGuest('Sign In Required', 'Please sign in to view profiles.', 'user'); return; }
                navigation.navigate('UserProfileScreen', {
                  authorId: authorUser?._id || authorId,
                  author_handle: undefined,
                });
              }}
              accessibilityRole="button"
              accessibilityLabel={`View ${article?.authorName}'s profile`}
            >
              <Image
                source={{
                  uri: authorImageUri ??
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
                style={styles.authorAvatar}
              />
              <View>
                <Text style={[styles.authorName, { color: isDarkMode ? ProfessionalColors.gray100 : ProfessionalColors.gray900 }]}>
                  {article?.authorName ?? ''}
                </Text>
                <Text style={[styles.authorFollowers, { color: isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray500 }]}>
                  {authorUser?.followers?.length ?? 0}{' '}
                  {(authorUser?.followers?.length ?? 0) === 1 ? 'follower' : 'followers'}
                </Text>
                {article?.contributors && article.contributors.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      if (isGuest) { guardGuest('Sign In Required', 'Please sign in to view contributors.', 'users'); return; }
                      navigation.navigate('SocialScreen', {
                        type: 3,
                        articleId: Number(article._id),
                        social_user_id: undefined,
                      });
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="See all contributors"
                  >
                    <Text style={styles.contributorsLink}>See all contributors</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>

            {article && user_id !== authorUser?._id && (
              followMutationPending ? (
                <LoadingSpinner size={40} />
              ) : (
                <TouchableOpacity
                  style={styles.followBtn}
                  onPress={handleFollow}
                  accessibilityRole="button"
                  accessibilityLabel={isFollowing ? 'Unfollow author' : 'Follow author'}
                >
                  <Text style={styles.followBtnText}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* ── TTS bot animation ─────────────────────────────── */}
        {isPlaying && (
          <View style={styles.botContainer} pointerEvents="none">
            <LottieView
              source={require('../../assets/LottieAnimation/TalkBotAnimation.json')}
              autoPlay
              loop={isPlaying}
              style={{ width: 180, height: 180 }}
            />
          </View>
        )}

        {/* ── Floating TTS media player ─────────────────────── */}
        {playerVisible && (
          <View style={styles.ttsPlayer}>
            <View style={styles.ttsPlayerInner}>
              <TouchableOpacity
                style={styles.ttsSpeedBtn}
                onPress={handleSpeedChange}
                accessibilityRole="button"
                accessibilityLabel={`Playback speed ${SPEED_LABELS[speechRate]}. Tap to change.`}
              >
                <Text style={styles.ttsSpeedText}>{SPEED_LABELS[speechRate]}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ttsCtrlBtn, (!isPlaying && !isPaused) && { opacity: 0.4 }]}
                onPress={handleTtsPause}
                disabled={!isPlaying && !isPaused}
                accessibilityRole="button"
                accessibilityLabel={isPaused ? 'Resume reading' : 'Pause reading'}
              >
                <FontAwesome5
                  name={isPaused ? 'play' : 'pause'}
                  size={16}
                  color={PRIMARY_COLOR}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.ttsCtrlBtn}
                onPress={handleTtsStop}
                accessibilityRole="button"
                accessibilityLabel="Stop reading"
              >
                <FontAwesome5 name="stop" size={16} color="#EF4444" />
              </TouchableOpacity>

              <Text style={styles.ttsStatus}>
                {isPaused ? 'Paused' : isPlaying ? 'Playing…' : 'Stopped'}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </GlossaryProvider>
  );
};

export default ArticleDetailScreen;

// ─── ActionPill sub-component ─────────────────────────────────────────────────

type ActionPillProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  active: boolean;
  loading?: boolean;
  activeBg: string;
  inactiveBg: string;
  textColor: string;
  accessibilityLabel: string;
};

const ActionPill = ({
  icon,
  label,
  onPress,
  active,
  loading,
  activeBg,
  inactiveBg,
  textColor,
  accessibilityLabel,
}: ActionPillProps) => (
  <TouchableOpacity
    style={[styles.pill, { backgroundColor: active ? activeBg : inactiveBg }]}
    onPress={onPress}
    disabled={loading}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityState={{ selected: active }}
  >
    {loading ? <LoadingSpinner size={16} /> : icon}
    <Text style={[styles.pillText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  // Reading progress bar
  progressBarTrack: {
    height: 3,
    width: '100%',
    backgroundColor: 'transparent',
  },
  progressBarFill: {
    height: 3,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 2,
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 12,
  },

  // Liked-by avatars strip
  avatarsContainer: {
    position: 'relative',
    height: 60,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  avatar: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarMore: {
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },

  // Footer
  footer: {
    borderTopWidth: 1,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  pill: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: 3,
    minHeight: 52,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '600',
  },

  // Author row
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    ...Typography.bodySmall,
    fontWeight: '700',
  },
  authorFollowers: {
    ...Typography.caption,
  },
  contributorsLink: {
    ...Typography.caption,
    color: PRIMARY_COLOR,
    fontWeight: '600',
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 18,
  },
  followBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },

  // TTS bot
  botContainer: {
    position: 'absolute',
    bottom: 175,
    right: 16,
    zIndex: 100,
  },

  // Floating TTS player
  ttsPlayer: {
    position: 'absolute',
    bottom: 165,
    left: 12,
    right: 12,
    zIndex: 200,
    elevation: 12,
  },
  ttsPlayerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  ttsSpeedBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: 16,
    backgroundColor: PRIMARY_COLOR,
  },
  ttsSpeedText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  ttsCtrlBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttsStatus: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
});
