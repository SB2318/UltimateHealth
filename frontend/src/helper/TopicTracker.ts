import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArticleData, PodcastData } from '../type';

const TRACKING_HISTORY_KEY = 'PERSONALIZED_HEALTH_TOPIC_TRACKING_HISTORY';

export interface TrackingInteraction {
  topic: string;
  points: number;
  action: string;
  timestamp: string; // ISO string
}

export const TOPICS = {
  SLEEP_HEALTH: 'Sleep Health',
  NUTRITION: 'Nutrition',
  FITNESS: 'Fitness',
  MENTAL_WELLNESS: 'Mental Wellness',
};

const ACTION_WEIGHTS = {
  VIEW_ARTICLE: 5,
  SAVE_ARTICLE: 15,
  LIKE_ARTICLE: 10,
  VIEW_PODCAST: 8,
  LIKE_PODCAST: 12,
  COMMENT: 12,
  SEARCH: 3,
  CHATBOT: 4,
};

// Map keywords and category tags to primary topics
export const mapTextToTopics = (title: string = '', tags: string[] = []): string[] => {
  const matchedTopics = new Set<string>();
  const normalizedText = (title + ' ' + tags.join(' ')).toLowerCase();

  // Sleep Health Mapping
  if (
    normalizedText.match(/(sleep|insomnia|rest|circadian|nap|bedtime|dream|fatigue|apnea|snoring)/)
  ) {
    matchedTopics.add(TOPICS.SLEEP_HEALTH);
  }

  // Nutrition Mapping
  if (
    normalizedText.match(/(diet|nutrition|food|eating|calorie|keto|vegan|protein|gut|gastroenterology|endocrinology|metabolic|carb|vitamin|meal)/) ||
    tags.some(t => ['gastroenterology', 'endocrinology'].includes(t.toLowerCase()))
  ) {
    matchedTopics.add(TOPICS.NUTRITION);
  }

  // Fitness Mapping
  if (
    normalizedText.match(/(fitness|exercise|workout|gym|running|cardio|muscle|strength|orthopedics|physical|sports|jog|stretch|yoga)/) ||
    tags.some(t => ['orthopedics'].includes(t.toLowerCase()))
  ) {
    matchedTopics.add(TOPICS.FITNESS);
  }

  // Mental Wellness Mapping
  if (
    normalizedText.match(/(mental|mind|stress|anxiety|depression|psychiatry|neurology|meditation|therapy|mindfulness|psychology|mood|cognitive)/) ||
    tags.some(t => ['psychiatry', 'neurology'].includes(t.toLowerCase()))
  ) {
    matchedTopics.add(TOPICS.MENTAL_WELLNESS);
  }

  // Fallback: If no primary topic matches, check standard tags or return a default/empty
  return Array.from(matchedTopics);
};

export const recordInteraction = async (action: keyof typeof ACTION_WEIGHTS, title: string, tags: string[]) => {
  try {
    const topics = mapTextToTopics(title, tags);
    if (topics.length === 0) return;

    const points = ACTION_WEIGHTS[action];
    const timestamp = new Date().toISOString();

    const historyStr = await AsyncStorage.getItem(TRACKING_HISTORY_KEY);
    let history: TrackingInteraction[] = historyStr ? JSON.parse(historyStr) : [];

    // Add entry for each matched topic
    topics.forEach(topic => {
      history.push({
        topic,
        points,
        action,
        timestamp,
      });
    });

    // Prune history to keep only last 1000 items to save storage
    if (history.length > 1000) {
      history = history.slice(history.length - 1000);
    }

    await AsyncStorage.setItem(TRACKING_HISTORY_KEY, JSON.stringify(history));
    console.log(`[TopicTracker] Recorded action ${action} for topics ${topics.join(', ')}`);
  } catch (error) {
    console.error('[TopicTracker] Error recording interaction:', error);
  }
};

export const trackArticle = async (action: 'VIEW_ARTICLE' | 'SAVE_ARTICLE' | 'LIKE_ARTICLE', article: ArticleData) => {
  const tags = article.tags ? article.tags.map(t => t.name) : [];
  await recordInteraction(action, article.title + ' ' + article.description, tags);
};

export const trackPodcast = async (action: 'VIEW_PODCAST' | 'LIKE_PODCAST', podcast: PodcastData) => {
  const tags = podcast.tags ? podcast.tags.map(t => t.name) : [];
  await recordInteraction(action, podcast.title + ' ' + podcast.description, tags);
};

export const trackSearch = async (query: string) => {
  await recordInteraction('SEARCH', query, []);
};

export const trackChatbot = async (message: string) => {
  await recordInteraction('CHATBOT', message, []);
};

export const trackComment = async (title: string, tags: string[] = []) => {
  await recordInteraction('COMMENT', title, tags);
};

export interface TopicScore {
  topic: string;
  score: number;
  percentage: number;
}

export const getTopicScores = async (): Promise<TopicScore[]> => {
  try {
    const historyStr = await AsyncStorage.getItem(TRACKING_HISTORY_KEY);
    if (!historyStr) return getDummyScores();

    const history: TrackingInteraction[] = JSON.parse(historyStr);
    if (history.length === 0) return getDummyScores();

    const scores: Record<string, number> = {
      [TOPICS.SLEEP_HEALTH]: 0,
      [TOPICS.NUTRITION]: 0,
      [TOPICS.FITNESS]: 0,
      [TOPICS.MENTAL_WELLNESS]: 0,
    };

    history.forEach(item => {
      if (scores[item.topic] !== undefined) {
        scores[item.topic] += item.points;
      }
    });

    const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);
    if (totalScore === 0) return getDummyScores();

    return Object.entries(scores).map(([topic, score]) => ({
      topic,
      score,
      percentage: Math.round((score / totalScore) * 100),
    })).sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('[TopicTracker] Error fetching scores:', error);
    return getDummyScores();
  }
};

export interface TrendPoint {
  label: string; // Week or Month name
  [TOPICS.SLEEP_HEALTH]: number;
  [TOPICS.NUTRITION]: number;
  [TOPICS.FITNESS]: number;
  [TOPICS.MENTAL_WELLNESS]: number;
}

export const getTrendReport = async (period: 'weekly' | 'monthly'): Promise<TrendPoint[]> => {
  try {
    const historyStr = await AsyncStorage.getItem(TRACKING_HISTORY_KEY);
    const history: TrackingInteraction[] = historyStr ? JSON.parse(historyStr) : [];

    const now = new Date();
    const result: TrendPoint[] = [];

    if (period === 'weekly') {
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const start = new Date();
        start.setDate(now.getDate() - (i + 1) * 7);
        const end = new Date();
        end.setDate(now.getDate() - i * 7);

        const point: TrendPoint = {
          label: i === 0 ? 'This Week' : `W -${i}`,
          [TOPICS.SLEEP_HEALTH]: 0,
          [TOPICS.NUTRITION]: 0,
          [TOPICS.FITNESS]: 0,
          [TOPICS.MENTAL_WELLNESS]: 0,
        };

        history.forEach(item => {
          const itemDate = new Date(item.timestamp);
          if (itemDate >= start && itemDate <= end) {
            if (point[item.topic as keyof typeof TOPICS] !== undefined) {
              point[item.topic as keyof typeof TOPICS] += item.points;
            }
          }
        });

        result.push(point);
      }
    } else {
      // Last 4 months
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 3; i >= 0; i--) {
        const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = monthNames[targetDate.getMonth()];

        const point: TrendPoint = {
          label,
          [TOPICS.SLEEP_HEALTH]: 0,
          [TOPICS.NUTRITION]: 0,
          [TOPICS.FITNESS]: 0,
          [TOPICS.MENTAL_WELLNESS]: 0,
        };

        history.forEach(item => {
          const itemDate = new Date(item.timestamp);
          if (itemDate.getMonth() === targetDate.getMonth() && itemDate.getFullYear() === targetDate.getFullYear()) {
            if (point[item.topic as keyof typeof TOPICS] !== undefined) {
              point[item.topic as keyof typeof TOPICS] += item.points;
            }
          }
        });

        result.push(point);
      }
    }

    return result;
  } catch (error) {
    console.error('[TopicTracker] Error fetching trend report:', error);
    return [];
  }
};

export const getUnexploredTopics = async (): Promise<string[]> => {
  const scores = await getTopicScores();
  const unexplored = scores.filter(s => s.score === 0).map(s => s.topic);
  // Default fallback if all are explored
  if (unexplored.length === 0) {
    const leastExplored = [...scores].sort((a, b) => a.score - b.score);
    return [leastExplored[0].topic];
  }
  return unexplored;
};

// Baseline mock scores so dashboard is populated beautifully on first load!
const getDummyScores = (): TopicScore[] => [
  { topic: TOPICS.SLEEP_HEALTH, score: 85, percentage: 42 },
  { topic: TOPICS.NUTRITION, score: 50, percentage: 25 },
  { topic: TOPICS.FITNESS, score: 36, percentage: 18 },
  { topic: TOPICS.MENTAL_WELLNESS, score: 30, percentage: 15 },
];
