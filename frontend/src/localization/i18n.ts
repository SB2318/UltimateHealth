import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { translations, SupportedLanguageCode, SUPPORTED_LANGUAGES } from './translations';
import { en } from './translations/en';

const LOCALE_STORAGE_KEY = '@ultimatehealth_app_locale';

type Listener = (lang: string) => void;

class I18nManager {
  private currentLanguage: string = 'en';
  private listeners: Set<Listener> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    this.currentLanguage = this.detectSystemLanguage();
  }

  public detectSystemLanguage(): string {
    try {
      const locales = Localization.getLocales ? Localization.getLocales() : [];
      const primary = locales[0]?.languageCode?.toLowerCase() || 'en';
      for (const lang of SUPPORTED_LANGUAGES) {
        if (primary.startsWith(lang.code)) return lang.code;
      }
      return 'en';
    } catch {
      return 'en';
    }
  }

  public async init(): Promise<string> {
    if (this.isInitialized) return this.currentLanguage;
    try {
      const savedLang = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
      if (savedLang && translations[savedLang]) {
        this.currentLanguage = savedLang;
      } else {
        this.currentLanguage = this.detectSystemLanguage();
      }
    } catch (e) {
      this.currentLanguage = 'en';
    }
    this.isInitialized = true;
    return this.currentLanguage;
  }

  public getLanguage(): string {
    return this.currentLanguage;
  }

  public async setLanguage(lang: string): Promise<void> {
    const normalized = lang.toLowerCase();
    const target = translations[normalized] ? normalized : 'en';
    this.currentLanguage = target;
    try {
      await AsyncStorage.setItem(LOCALE_STORAGE_KEY, target);
    } catch (e) {
      console.warn('[I18n] Failed to persist locale to storage:', e);
    }
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentLanguage);
      } catch (e) {
        console.error('[I18n] Error in listener callback:', e);
      }
    });
  }

  /**
   * Translate a dotted key path (e.g. 'common.apply')
   */
  public t(key: string, params?: Record<string, string | number>): string {
    const dict = translations[this.currentLanguage] || translations.en || en;
    const fallbackDict = translations.en || en;

    const resolveKey = (source: any, path: string): string | undefined => {
      const parts = path.split('.');
      let cur = source;
      for (const part of parts) {
        if (!cur || typeof cur !== 'object') return undefined;
        cur = cur[part];
      }
      return typeof cur === 'string' ? cur : undefined;
    };

    let result = resolveKey(dict, key) || resolveKey(fallbackDict, key) || key;

    if (params && typeof result === 'string') {
      Object.keys(params).forEach((paramKey) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(params[paramKey]));
      });
    }

    return result;
  }

  public getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }
}

export const i18n = new I18nManager();
export const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);
