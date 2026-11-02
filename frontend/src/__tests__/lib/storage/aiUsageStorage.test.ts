import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getTodayDateKey,
  getDailyUsageRecord,
  getCharacterDailyUsage,
  incrementCharacterDailyUsage,
  getAllCharactersRemaining,
  checkAndResetDailyChatSession,
  isMessageFromToday,
  MAX_DAILY_MESSAGES_PER_CHARACTER,
  AI_USAGE_STORAGE_KEY,
  AI_CHAT_LAST_ACTIVE_DATE_KEY,
  FALLBACK_WELCOME_MESSAGE,
  getFallbackQuotaExceededMessage,
} from '@/src/lib/storage/aiUsageStorage';

describe('aiUsageStorage', () => {
  let storageMap: Record<string, string> = {};

  beforeEach(() => {
    jest.clearAllMocks();
    storageMap = {};

    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
      return Promise.resolve(storageMap[key] || null);
    });

    (AsyncStorage.setItem as jest.Mock).mockImplementation((key: string, value: string) => {
      storageMap[key] = value;
      return Promise.resolve();
    });
  });

  describe('getTodayDateKey', () => {
    it('returns date in YYYY-MM-DD format', () => {
      const key = getTodayDateKey();
      expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('getCharacterDailyUsage', () => {
    it('defaults to 5 remaining when no usage recorded', async () => {
      const usage = await getCharacterDailyUsage('char-1');
      expect(usage.used).toBe(0);
      expect(usage.remaining).toBe(5);
      expect(usage.maxLimit).toBe(5);
      expect(usage.isLimitReached).toBe(false);
    });

    it('resets usage if stored date is from a previous day', async () => {
      storageMap[AI_USAGE_STORAGE_KEY] = JSON.stringify({
        date: '2020-01-01',
        counts: { 'char-1': 5 },
      });

      const usage = await getCharacterDailyUsage('char-1');
      expect(usage.used).toBe(0);
      expect(usage.remaining).toBe(5);
      expect(usage.isLimitReached).toBe(false);
    });
  });

  describe('incrementCharacterDailyUsage', () => {
    it('increments usage count and decrements remaining', async () => {
      const result1 = await incrementCharacterDailyUsage('char-1');
      expect(result1.used).toBe(1);
      expect(result1.remaining).toBe(4);
      expect(result1.isLimitReached).toBe(false);

      const result2 = await incrementCharacterDailyUsage('char-1');
      expect(result2.used).toBe(2);
      expect(result2.remaining).toBe(3);
    });

    it('reaches limit after 5 messages', async () => {
      for (let i = 0; i < 4; i++) {
        await incrementCharacterDailyUsage('char-2');
      }
      const finalResult = await incrementCharacterDailyUsage('char-2');
      expect(finalResult.used).toBe(5);
      expect(finalResult.remaining).toBe(0);
      expect(finalResult.isLimitReached).toBe(true);
    });
  });

  describe('getAllCharactersRemaining', () => {
    it('returns remaining counts map for all recorded characters', async () => {
      await incrementCharacterDailyUsage('char-a');
      await incrementCharacterDailyUsage('char-a');
      await incrementCharacterDailyUsage('char-b');

      const remainingMap = await getAllCharactersRemaining();
      expect(remainingMap['char-a']).toBe(3);
      expect(remainingMap['char-b']).toBe(4);
    });
  });

  describe('checkAndResetDailyChatSession', () => {
    it('returns isNewDay: true when no previous session exists', async () => {
      const result = await checkAndResetDailyChatSession();
      expect(result.isNewDay).toBe(true);
      expect(storageMap[AI_CHAT_LAST_ACTIVE_DATE_KEY]).toBe(getTodayDateKey());
    });

    it('returns isNewDay: false if app already accessed today', async () => {
      storageMap[AI_CHAT_LAST_ACTIVE_DATE_KEY] = getTodayDateKey();
      const result = await checkAndResetDailyChatSession();
      expect(result.isNewDay).toBe(false);
    });

    it('returns isNewDay: true when previous session date was yesterday', async () => {
      storageMap[AI_CHAT_LAST_ACTIVE_DATE_KEY] = '2020-01-01';
      const result = await checkAndResetDailyChatSession();
      expect(result.isNewDay).toBe(true);
      expect(storageMap[AI_CHAT_LAST_ACTIVE_DATE_KEY]).toBe(getTodayDateKey());
    });
  });

  describe('isMessageFromToday', () => {
    it('returns true for timestamps from today', () => {
      const now = new Date();
      expect(isMessageFromToday(now.toISOString())).toBe(true);
      expect(isMessageFromToday(now)).toBe(true);
    });

    it('returns false for timestamps from yesterday or older', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isMessageFromToday(yesterday.toISOString())).toBe(false);
      expect(isMessageFromToday('2020-01-01T10:00:00.000Z')).toBe(false);
    });

    it('returns true when timestamp is undefined (for test mocks)', () => {
      expect(isMessageFromToday(undefined)).toBe(true);
    });
  });

  describe('fallback messages', () => {
    it('provides fallback welcome message', () => {
      expect(FALLBACK_WELCOME_MESSAGE).toBe(
        "Hello! 👋 I'm here to assist you. How can I help you today?",
      );
    });

    it('provides fallback quota exceeded message', () => {
      const msg = getFallbackQuotaExceededMessage('Dr. Health');
      expect(msg).toContain('5 messages with Dr. Health');
      expect(msg).toContain('midnight');
    });
  });
});
