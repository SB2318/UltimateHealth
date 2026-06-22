import { useState, useEffect } from 'react';
import { retrieveItem, storeItem } from '../helper/Utils';

export const DYSLEXIA_MODE_KEY = 'article_dyslexia_mode';

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
        console.error('Failed to load dyslexia mode:', error);
      }
    };
    loadDyslexiaMode();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDyslexiaMode = () => {
    const nextValue = !isDyslexiaMode;
    setIsDyslexiaMode(nextValue);
    storeItem(DYSLEXIA_MODE_KEY, String(nextValue)).catch(err => 
      console.error('Failed to save dyslexia mode:', err)
    );
  };

  return { isDyslexiaMode, toggleDyslexiaMode };
};
