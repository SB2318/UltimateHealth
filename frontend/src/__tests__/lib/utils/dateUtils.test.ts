import { TZDateMini } from '@date-fns/tz';
import {
  parseDbTimestamp,
  formatDateWithTime,
  formatTimeWithDate,
  formatDateShortYear,
  formatWithOrdinalAndDay,
  formatDateShort,
  formatRelativeTime,
} from '../../../lib/utils/dateUtils';

jest.mock('expo-localization', () => ({
  getCalendars: jest.fn(() => [{ timeZone: 'UTC' }]),
  getLocales: jest.fn(() => [{ languageTag: 'en-US' }])
}));

describe('dateUtils', () => {
  describe('parseDbTimestamp', () => {
    it('safely parses timestamps with missing timezone suffixes as local time', () => {
      const parsed = parseDbTimestamp('2026-05-26 14:30:00');
      const expectedIso = new Date('2026-05-26T14:30:00').toISOString();
      expect(parsed?.toISOString()).toBe(expectedIso);
    });

    it('safely parses timestamps with existing Z', () => {
      const parsed = parseDbTimestamp('2026-05-26T14:30:00.000Z');
      expect(parsed?.toISOString()).toBe('2026-05-26T14:30:00.000Z');
    });

    it('safely parses timestamps with explicit offset', () => {
      const parsed = parseDbTimestamp('2026-05-26T14:30:00+05:30');
      // 14:30 +05:30 is 09:00 UTC
      expect(parsed?.toISOString()).toBe('2026-05-26T09:00:00.000Z');
    });

    it('returns null for invalid dates', () => {
      const parsed = parseDbTimestamp('invalid-date');
      expect(parsed).toBeNull();
    });
  });

  describe('formatting', () => {
    it('formats formatDateWithTime correctly', () => {
      // 2026-05-26T14:30:00Z formatted in UTC
      const formatted = formatDateWithTime('2026-05-26T14:30:00Z');
      expect(formatted).toBe('May 26th 2026, 2:30 PM');

      expect(formatDateWithTime(null)).toBe('');
      expect(formatDateWithTime(undefined)).toBe('');
      expect(formatDateWithTime('invalid')).toBe('');
    });

    it('formats formatTimeWithDate correctly', () => {
      const formatted = formatTimeWithDate('2026-05-26T14:30:00Z');
      expect(formatted).toBe('02:30 PM 26/05/2026');

      expect(formatTimeWithDate(null)).toBe('');
      expect(formatTimeWithDate(undefined)).toBe('');
      expect(formatTimeWithDate('invalid')).toBe('');
    });

    it('formats formatDateShortYear correctly', () => {
      const formatted = formatDateShortYear('2026-05-26T14:30:00Z');
      expect(formatted).toBe('26/05/2026');

      expect(formatDateShortYear(null)).toBe('');
      expect(formatDateShortYear(undefined)).toBe('');
      expect(formatDateShortYear('invalid')).toBe('');
    });

    it('formats formatWithOrdinalAndDay correctly', () => {
      const formatted = formatWithOrdinalAndDay('2026-05-26T14:30:00Z');
      // 2026-05-26 is a Tuesday
      expect(formatted).toBe('26 May, Tue, 2:30 PM');

      expect(formatWithOrdinalAndDay(null)).toBe('');
      expect(formatWithOrdinalAndDay(undefined)).toBe('');
      expect(formatWithOrdinalAndDay('invalid')).toBe('');
    });

    it('formats formatRelativeTime for recent timestamps', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-05-26T16:30:00Z'));

      expect(formatRelativeTime('2026-05-26T16:25:00Z')).toBe('5 minutes ago');
      expect(formatRelativeTime('2026-05-26T14:30:00Z')).toBe('about 2 hours ago');
      expect(formatRelativeTime('2026-05-23T16:30:00Z')).toBe('3 days ago');
      expect(formatRelativeTime('2026-05-19T16:30:00Z')).toBe('7 days ago');

      jest.useRealTimers();
    });

    it('falls back to a localized full date for older timestamps', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-06-05T16:30:00Z'));

      expect(formatRelativeTime('2026-05-26T14:30:00Z')).toBe(
        '26 May, 2026, 2:30 PM'
      );

      // More than one month old
      expect(formatRelativeTime('2026-04-26T14:30:00Z')).toBe(
        '26 Apr, 2026, 2:30 PM'
      );

      // More than one year old
      expect(formatRelativeTime('2025-05-26T14:30:00Z')).toBe(
        '26 May, 2025, 2:30 PM'
      );

      jest.useRealTimers();
    });

    it('returns an empty string for invalid relative timestamps', () => {
      expect(formatRelativeTime(null)).toBe('');
      expect(formatRelativeTime(undefined)).toBe('');
      expect(formatRelativeTime('invalid')).toBe('');
    });

    it('formats formatDateShort correctly', () => {
      const formatted = formatDateShort('2026-05-26T14:30:00Z');
      expect(formatted).toBe('26 May');

      expect(formatDateShort(null)).toBe('');
      expect(formatDateShort(undefined)).toBe('');
      expect(formatDateShort('invalid')).toBe('');
    });
  });

  describe('timezone mock behavior', () => {
    it('formats dates correctly in America/New_York', () => {
      jest.resetModules();
      jest.doMock('expo-localization', () => ({
        getCalendars: jest.fn(() => [{ timeZone: 'America/New_York' }]),
        getLocales: jest.fn(() => [{ languageTag: 'en-US' }])
      }));

      const { formatDateWithTime } = require('../../../lib/utils/dateUtils');
      // 2026-05-26 is in Daylight Saving Time (EDT) which is UTC-4
      // 14:30 UTC is 10:30 AM EDT
      const formatted = formatDateWithTime('2026-05-26T14:30:00Z');
      expect(formatted).toContain('10:30 AM');
    });
  });
});