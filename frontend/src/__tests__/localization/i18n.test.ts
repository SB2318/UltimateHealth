import { i18n, t } from '../../localization/i18n';
import { SUPPORTED_LANGUAGES } from '../../localization/translations';

describe('Localization Framework (i18n)', () => {
  beforeEach(async () => {
    await i18n.setLanguage('en');
  });

  it('translates English keys correctly', () => {
    expect(t('common.apply')).toBe('Apply');
    expect(t('common.exitGuest')).toBe('Exit Guest');
    expect(t('tabs.home')).toBe('Home');
  });

  it('translates Hindi keys when language is switched', async () => {
    await i18n.setLanguage('hi');
    expect(i18n.getLanguage()).toBe('hi');
    expect(t('common.apply')).toBe('लागू करें');
    expect(t('common.exitGuest')).toBe('अतिथि मोड छोड़ें');
    expect(t('tabs.home')).toBe('होम');
  });

  it('translates Bengali keys when language is switched', async () => {
    await i18n.setLanguage('bn');
    expect(i18n.getLanguage()).toBe('bn');
    expect(t('common.apply')).toBe('প্রয়োগ করুন');
    expect(t('tabs.home')).toBe('হোম');
  });

  it('translates Tamil keys when language is switched', async () => {
    await i18n.setLanguage('ta');
    expect(i18n.getLanguage()).toBe('ta');
    expect(t('common.apply')).toBe('பயன்படுத்து');
    expect(t('tabs.home')).toBe('முகப்பு');
  });

  it('translates Telugu keys when language is switched', async () => {
    await i18n.setLanguage('te');
    expect(i18n.getLanguage()).toBe('te');
    expect(t('common.apply')).toBe('వర్తించు');
    expect(t('tabs.home')).toBe('హోమ్');
  });

  it('interpolates parameters correctly', async () => {
    await i18n.setLanguage('en');
    expect(t('home.languagesSelected', { count: 3 })).toBe('3 language(s) selected');
  });

  it('falls back to English when key is missing in selected language', async () => {
    await i18n.setLanguage('hi');
    expect(t('nonexistent.nested.key')).toBe('nonexistent.nested.key');
  });

  it('supports all 13 official web Indian languages', () => {
    const list = i18n.getSupportedLanguages();
    expect(list.length).toBe(13);
    const codes = list.map(l => l.code);
    expect(codes).toEqual([
      'en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur',
    ]);
  });
});
