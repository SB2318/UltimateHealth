import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import * as SecureStore from 'expo-secure-store';  // ✅ ADD THIS IMPORT
import {
  secureStoreItem,
  secureRetrieveItem,
  SECURE_KEYS,
} from '../helper/SecureStorageUtils';
import { LanguageCode, isValidLanguageCode } from '../constants/languages';

type LanguagesUpdater = LanguageCode[] | ((prev: LanguageCode[]) => LanguageCode[]);

interface PreferencesContextType {
  preferredLanguages: LanguageCode[];
  setPreferredLanguages: (languages: LanguagesUpdater) => Promise<void>;
  addLanguagePreference: (language: LanguageCode) => Promise<void>;
  removeLanguagePreference: (language: LanguageCode) => Promise<void>;
  isLoading: boolean;
  hasLanguagePreferences: boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

interface PreferencesProviderProps {
  children: ReactNode;
}

/**
 * PreferencesProvider - Manages user preferences including language preferences
 * Persists to expo-secure-store and maintains in-memory state
 */
export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({
  children,
}) => {
  const [preferredLanguages, setInternalPreferredLanguages] = useState<LanguageCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const stored = await secureRetrieveItem(
          SECURE_KEYS.LANGUAGE_PREFERENCES
        );
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as LanguageCode[];
            // Validate all languages
            const validLanguages = parsed.filter(lang =>
              isValidLanguageCode(lang)
            );
            setInternalPreferredLanguages(validLanguages);
          } catch (parseError) {
            console.error(
              '[PreferencesContext] Failed to parse stored languages:',
              parseError
            );
            setInternalPreferredLanguages([]);
          }
        }
      } catch (error) {
        console.error(
          '[PreferencesContext] Error loading preferences:',
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to secure storage
  const savePreferencesToStorage = useCallback(
    async (languages: LanguageCode[]): Promise<void> => {
      try {
        if (languages.length === 0) {
          // ✅ FIXED: Delete the key when preferences are cleared
          await SecureStore.deleteItemAsync(SECURE_KEYS.LANGUAGE_PREFERENCES);
          return;
        }
        await secureStoreItem(
          SECURE_KEYS.LANGUAGE_PREFERENCES,
          JSON.stringify(languages)
        );
      } catch (error) {
        console.error(
          '[PreferencesContext] Error saving preferences:',
          error
        );
      }
    },
    []
  );

  // Serializes writes to SecureStore. Without this, two back-to-back
  // setPreferredLanguages calls (no await between them) each resolve their
  // own `resolved` value correctly against React's queued state updates,
  // but their `savePreferencesToStorage` calls race independently — the
  // call whose I/O happens to finish last wins, even if it started first
  // and resolved an older value. Chaining onto `pendingWrite` forces writes
  // to land in call order, so the persisted value never regresses behind
  // an earlier, now-superseded one.
  const pendingWriteRef = React.useRef<Promise<void>>(Promise.resolve());

  // Resolves `languages` (value or updater) against the latest committed
  // state via React's functional setState, then persists exactly that
  // resolved value. This closes the lost-update race: two near-simultaneous
  // calls each get queued against the state React actually commits, rather
  // than both branching off the same stale closure snapshot.
  const setPreferredLanguages = useCallback(
    async (languages: LanguagesUpdater): Promise<void> => {
      let resolved: LanguageCode[] = [];
      setInternalPreferredLanguages(prev => {
        const next =
          typeof languages === 'function' ? languages(prev) : languages;
        resolved = next.filter(lang => isValidLanguageCode(lang));
        return resolved;
      });
      const write = pendingWriteRef.current.then(() =>
        savePreferencesToStorage(resolved)
      );
      pendingWriteRef.current = write;
      await write;
    },
    [savePreferencesToStorage]
  );

  // ✅ FIXED: Derives the next array from the latest committed state via
  // a functional updater, not from `preferredLanguages` captured in this
  // callback's closure, so concurrent toggles no longer clobber each other.
  const addLanguagePreference = useCallback(
    async (language: LanguageCode): Promise<void> => {
      if (!isValidLanguageCode(language)) {
        console.warn(
          `[PreferencesContext] Invalid language code: ${language}`
        );
        return;
      }
      await setPreferredLanguages(prev =>
        prev.includes(language) ? prev : [...prev, language]
      );
    },
    [setPreferredLanguages]
  );

  // ✅ FIXED: Derives the next array from the latest committed state via
  // a functional updater, not from `preferredLanguages` captured in this
  // callback's closure, so concurrent toggles no longer clobber each other.
  const removeLanguagePreference = useCallback(
    async (language: LanguageCode): Promise<void> => {
      await setPreferredLanguages(prev =>
        prev.includes(language)
          ? prev.filter(lang => lang !== language)
          : prev
      );
    },
    [setPreferredLanguages]
  );

  const value: PreferencesContextType = {
    preferredLanguages,
    setPreferredLanguages,
    addLanguagePreference,
    removeLanguagePreference,
    isLoading,
    hasLanguagePreferences: preferredLanguages.length > 0,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

/**
 * Hook to use PreferencesContext
 * Must be called within PreferencesProvider
 */
export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error(
      'usePreferences must be used within a PreferencesProvider'
    );
  }
  return context;
};