import {
  formatDateWithTime,
  formatTimeWithDate,
  formatWithOrdinalAndDay,
} from '../dateUtils';

jest.mock('expo-localization', () => ({
  getCalendars: jest.fn(() => [{ timeZone: 'UTC' }]),
  getLocales: jest.fn(() => [{ languageTag: 'en-US' }])
}));

describe('dateUtils - midnight bug reproduction', () => {
  const midnightUTC = '2026-05-26T00:00:00Z';
  const noonUTC = '2026-05-26T12:00:00Z';

  it('formats 12:00 AM correctly in formatDateWithTime', () => {
    const formatted = formatDateWithTime(midnightUTC);
    expect(formatted).toContain('12:00 AM');
    expect(formatted).not.toContain('00:00 AM');
  });

  it('formats 12:00 PM correctly in formatDateWithTime', () => {
    const formatted = formatDateWithTime(noonUTC);
    expect(formatted).toContain('12:00 PM');
  });

  it('formats 12:00 AM correctly in formatTimeWithDate', () => {
    const formatted = formatTimeWithDate(midnightUTC);
    expect(formatted).toContain('12:00 AM');
    expect(formatted).not.toContain('00:00 AM');
  });

  it('formats 12:00 AM correctly in formatWithOrdinalAndDay', () => {
    const formatted = formatWithOrdinalAndDay(midnightUTC);
    expect(formatted).toContain('12:00 AM');
    expect(formatted).not.toContain('00:00 AM');
  });
});
