import AsyncStorage from '@react-native-async-storage/async-storage';

export const MAX_DAILY_MESSAGES_PER_CHARACTER = 5;
export const AI_USAGE_STORAGE_KEY = '@ai_character_daily_usage';
export const AI_CHAT_LAST_ACTIVE_DATE_KEY = '@ai_chat_last_active_date';

export const FALLBACK_WELCOME_MESSAGE = "Hello! 👋 I'm here to assist you. How can I help you today?";

export const getFallbackQuotaExceededMessage = (characterName?: string): string => {
  const name = characterName ? characterName : 'this character';
  return `⏳ You have reached your daily limit of ${MAX_DAILY_MESSAGES_PER_CHARACTER} messages with ${name} for today. Your chat log and messages will refresh tomorrow at midnight. Take care! 🌿`;
};

interface DailyUsageRecord {
  date: string; // YYYY-MM-DD
  counts: Record<string, number>;
}

export const getTodayDateKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDailyUsageRecord = async (): Promise<DailyUsageRecord> => {
  const today = getTodayDateKey();
  try {
    const raw = await AsyncStorage.getItem(AI_USAGE_STORAGE_KEY);
    if (!raw) {
      return { date: today, counts: {} };
    }
    const parsed: DailyUsageRecord = JSON.parse(raw);
    if (parsed.date !== today) {
      // New calendar day: reset counts
      const freshRecord: DailyUsageRecord = { date: today, counts: {} };
      await AsyncStorage.setItem(AI_USAGE_STORAGE_KEY, JSON.stringify(freshRecord));
      return freshRecord;
    }
    return parsed;
  } catch (error) {
    console.warn('Failed to read AI usage from AsyncStorage', error);
    return { date: today, counts: {} };
  }
};

export const getCharacterDailyUsage = async (
  characterId: string | number | undefined,
): Promise<{
  used: number;
  remaining: number;
  maxLimit: number;
  isLimitReached: boolean;
}> => {
  const charKey = characterId ? String(characterId) : 'default';
  const record = await getDailyUsageRecord();
  const used = record.counts[charKey] || 0;
  const remaining = Math.max(0, MAX_DAILY_MESSAGES_PER_CHARACTER - used);
  return {
    used,
    remaining,
    maxLimit: MAX_DAILY_MESSAGES_PER_CHARACTER,
    isLimitReached: remaining <= 0,
  };
};

export const incrementCharacterDailyUsage = async (
  characterId: string | number | undefined,
): Promise<{
  used: number;
  remaining: number;
  maxLimit: number;
  isLimitReached: boolean;
}> => {
  const charKey = characterId ? String(characterId) : 'default';
  const today = getTodayDateKey();
  const record = await getDailyUsageRecord();
  const currentCount = record.counts[charKey] || 0;
  const newCount = currentCount + 1;

  record.counts[charKey] = newCount;
  record.date = today;

  try {
    await AsyncStorage.setItem(AI_USAGE_STORAGE_KEY, JSON.stringify(record));
  } catch (error) {
    console.warn('Failed to save AI usage to AsyncStorage', error);
  }

  const remaining = Math.max(0, MAX_DAILY_MESSAGES_PER_CHARACTER - newCount);
  return {
    used: newCount,
    remaining,
    maxLimit: MAX_DAILY_MESSAGES_PER_CHARACTER,
    isLimitReached: remaining <= 0,
  };
};

/**
 * Retrieves remaining message count map for all characters for today
 */
export const getAllCharactersRemaining = async (): Promise<Record<string, number>> => {
  const record = await getDailyUsageRecord();
  const remainingMap: Record<string, number> = {};
  for (const [charId, count] of Object.entries(record.counts)) {
    remainingMap[charId] = Math.max(0, MAX_DAILY_MESSAGES_PER_CHARACTER - count);
  }
  return remainingMap;
};

/**
 * Checks if the day has rolled over since the last active chat session.
 * Used to clear yesterday's chat log when a user reopens the app on a new day.
 */
export const checkAndResetDailyChatSession = async (): Promise<{
  isNewDay: boolean;
  today: string;
}> => {
  const today = getTodayDateKey();
  try {
    const lastActiveDate = await AsyncStorage.getItem(AI_CHAT_LAST_ACTIVE_DATE_KEY);
    if (!lastActiveDate || lastActiveDate !== today) {
      await AsyncStorage.setItem(AI_CHAT_LAST_ACTIVE_DATE_KEY, today);
      return { isNewDay: true, today };
    }
    return { isNewDay: false, today };
  } catch (error) {
    console.warn('Failed to verify daily chat session date', error);
    return { isNewDay: false, today };
  }
};

/**
 * Determines whether a message was sent on today's calendar date.
 * If the timestamp is from a previous day, returns false so that
 * the previous day's conversation log is filtered out and cleared.
 */
export const isMessageFromToday = (
  timestamp: string | number | Date | undefined,
): boolean => {
  if (!timestamp) return true; // Preserve test mocks that don't supply timestamps
  try {
    const messageDate = new Date(timestamp);
    if (isNaN(messageDate.getTime())) return true;
    const now = new Date();
    return (
      messageDate.getFullYear() === now.getFullYear() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getDate() === now.getDate()
    );
  } catch {
    return true;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Chat message persistence (offline-first local cache per character)
// ─────────────────────────────────────────────────────────────────────────────

export const AI_CHAT_MESSAGES_KEY_PREFIX = '@ai_chat_messages_';

/**
 * Load cached chat messages for a specific character from AsyncStorage.
 * Returns null if no cached messages exist.
 */
export const getCharacterChatMessages = async (
  characterId: string | number | undefined,
): Promise<any[] | null> => {
  const key = `${AI_CHAT_MESSAGES_KEY_PREFIX}${characterId ?? 'default'}`;
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as any[];
  } catch (error) {
    console.warn('Failed to read cached chat messages', error);
    return null;
  }
};

/**
 * Save chat messages for a specific character to AsyncStorage so they
 * survive unmount, navigation, and app restarts without a network call.
 */
export const saveCharacterChatMessages = async (
  characterId: string | number | undefined,
  messages: any[],
): Promise<void> => {
  const key = `${AI_CHAT_MESSAGES_KEY_PREFIX}${characterId ?? 'default'}`;
  try {
    await AsyncStorage.setItem(key, JSON.stringify(messages));
  } catch (error) {
    console.warn('Failed to save chat messages to AsyncStorage', error);
  }
};

/**
 * Remove cached chat messages for a specific character from AsyncStorage.
 * Called when the user clears their conversation history.
 */
export const clearCharacterChatMessages = async (
  characterId: string | number | undefined,
): Promise<void> => {
  const key = `${AI_CHAT_MESSAGES_KEY_PREFIX}${characterId ?? 'default'}`;
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear cached chat messages', error);
  }
};
