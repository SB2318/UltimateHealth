import { retrieveItem, storeItem } from '@/src/lib/utils/Utils';
import { useState, useEffect, useCallback } from 'react';


export const DYSLEXIA_MODE_KEY = 'article_dyslexia_mode';

/**
 * Custom hook to manage the state and persistence of Dyslexia-Friendly Reading Mode.
 * Handles loading from and saving to localStorage (AsyncStorage).
 */
export const useDyslexiaMode = () => {
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadDyslexiaMode = async () => {
      try {
        const storedValue = await retrieveItem(DYSLEXIA_MODE_KEY);
        if (!isMounted || !storedValue) return;
        if (storedValue === 'true') {
          setIsDyslexiaMode(true);
        }
      } catch (error) {
        console.error('Failed to load dyslexia mode preference:', error);
      }
    };
    loadDyslexiaMode();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDyslexiaMode = useCallback(async () => {
    const nextValue = !isDyslexiaMode;
    // Optimistic UI update
    setIsDyslexiaMode(nextValue);
    try {
      await storeItem(DYSLEXIA_MODE_KEY, String(nextValue));
    } catch (err) {
      console.error('Failed to save dyslexia mode preference:', err);
      // Revert state if persistence fails
      setIsDyslexiaMode(!nextValue);
    }
  }, [isDyslexiaMode]);

  return { isDyslexiaMode, toggleDyslexiaMode };
};
