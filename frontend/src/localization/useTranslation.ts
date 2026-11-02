import { useState, useEffect, useCallback } from 'react';
import { i18n } from './i18n';
import { SUPPORTED_LANGUAGES } from './translations';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLang] = useState<string>(i18n.getLanguage());

  useEffect(() => {
    i18n.init().then((lang) => setCurrentLang(lang));
    const unsubscribe = i18n.subscribe((newLang) => {
      setCurrentLang(newLang);
    });
    return unsubscribe;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return i18n.t(key, params);
    },
    [currentLanguage],
  );

  const setLanguage = useCallback(async (lang: string) => {
    await i18n.setLanguage(lang);
  }, []);

  return {
    t,
    currentLanguage,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};

export default useTranslation;
