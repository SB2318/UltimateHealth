import AsyncStorage from '@react-native-async-storage/async-storage';
import {PodcastData} from '../type';

type MMKVStorageLike = {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
  clearAll: () => void;
};

type SerializedPodcastDownloadRecord = Omit<PodcastData, 'filePath' | 'downloadAt'> & {
  filePath: string;
  downloadAt: string;
  audioUrl?: string;
  audio_url?: string;
};

export type PodcastDownloadRecord = Omit<SerializedPodcastDownloadRecord, 'downloadAt'> & {
  downloadAt: Date;
};

const PODCAST_STORAGE_KEY = 'DOWNLOAD_PODCAST_DATA';
const PODCAST_CACHE_ID = 'podcast_cache';
const READING_PROGRESS_CACHE_ID = 'reading_progress_cache';
const READING_PROGRESS_ASYNC_PREFIX = 'reading_progress:';

let podcastMMKV: MMKVStorageLike | null = null;
let hasAttemptedInitialization = false;
let podcastMMKVUnhealthy = false;
let readingProgressMMKV: MMKVStorageLike | null = null;
let hasAttemptedReadingProgressInitialization = false;
let readingProgressMMKVUnhealthy = false;

const initializeMMKV = (): MMKVStorageLike | null => {
  if (hasAttemptedInitialization) {
    return podcastMMKV;
  }

  hasAttemptedInitialization = true;

  try {
    const mmkvModule = require('react-native-mmkv') as {
      createMMKV?: (config: {id: string}) => MMKVStorageLike;
    };

    if (mmkvModule?.createMMKV) {
      podcastMMKV = mmkvModule.createMMKV({id: PODCAST_CACHE_ID});
    }
  } catch (error) {
    if (__DEV__) {
      console.error('MMKV module not available, falling back to AsyncStorage', error);
    }
    podcastMMKV = null;
  }

  return podcastMMKV;
};

const initializeReadingProgressMMKV = (): MMKVStorageLike | null => {
  if (hasAttemptedReadingProgressInitialization) {
    return readingProgressMMKV;
  }

  hasAttemptedReadingProgressInitialization = true;

  try {
    const mmkvModule = require('react-native-mmkv') as {
      createMMKV?: (config: {id: string}) => MMKVStorageLike;
    };

    if (mmkvModule?.createMMKV) {
      readingProgressMMKV = mmkvModule.createMMKV({
        id: READING_PROGRESS_CACHE_ID,
      });
    }
  } catch (error) {
    if (__DEV__) {
      console.error('Reading progress MMKV module not available', error);
    }
    readingProgressMMKV = null;
  }

  return readingProgressMMKV;
};

const parsePodcastData = (
  value: string | null | undefined,
): PodcastDownloadRecord[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as SerializedPodcastDownloadRecord[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(item => ({
      ...item,
      downloadAt: new Date(item.downloadAt),
    }));
  } catch (error) {
    if (__DEV__) {
      console.error('Podcast cache parse error', error);
    }
    return [];
  }
};

const invalidatePodcastMMKV = (mmkv: MMKVStorageLike): void => {
  try {
    mmkv.delete(PODCAST_STORAGE_KEY);
  } catch (error) {
    if (__DEV__) {
      console.error('MMKV invalidation after failed write also failed', error);
    }
  }
};

const persistPodcastData = async (value: string): Promise<void> => {
  const mmkv = initializeMMKV();

  if (mmkv && !podcastMMKVUnhealthy) {
    try {
      mmkv.set(PODCAST_STORAGE_KEY, value);
      return;
    } catch (error) {
      if (__DEV__) {
        console.error('MMKV write error, marking cache unhealthy', error);
      }
      podcastMMKVUnhealthy = true;
      invalidatePodcastMMKV(mmkv);
    }
  }

  await AsyncStorage.setItem(PODCAST_STORAGE_KEY, value);
};

export const setItem = async (
  value: PodcastDownloadRecord[],
): Promise<void> => {
  await persistPodcastData(JSON.stringify(value ?? []));
};

export const retrieveItem = async (): Promise<PodcastDownloadRecord[]> => {
  const mmkv = initializeMMKV();

  if (mmkv && !podcastMMKVUnhealthy) {
    try {
      const mmkvValue = mmkv.getString(PODCAST_STORAGE_KEY);
      if (mmkvValue) {
        return parsePodcastData(mmkvValue);
      }

      const asyncValue = await AsyncStorage.getItem(PODCAST_STORAGE_KEY);
      if (asyncValue) {
        return parsePodcastData(asyncValue);
      }
      return [];
    } catch (error) {
      if (__DEV__) {
        console.error('MMKV read error, falling back to AsyncStorage', error);
      }
      podcastMMKVUnhealthy = true;
    }
  }

  const storedValue = await AsyncStorage.getItem(PODCAST_STORAGE_KEY);
  return parsePodcastData(storedValue);
};

export const deleteItem = async (): Promise<void> => {
  const mmkv = initializeMMKV();

  if (mmkv) {
    try {
      mmkv.delete(PODCAST_STORAGE_KEY);
    } catch (error) {
      if (__DEV__) {
        console.error('MMKV delete error', error);
      }
      podcastMMKVUnhealthy = true;
    }
  }

  await AsyncStorage.removeItem(PODCAST_STORAGE_KEY);
};

export const clearMMKV = async (): Promise<void> => {
  const mmkv = initializeMMKV();

  if (mmkv) {
    try {
      mmkv.clearAll();
    } catch (error) {
      if (__DEV__) {
        console.error('MMKV clear error', error);
      }
      podcastMMKVUnhealthy = true;
    }
  }

  await AsyncStorage.removeItem(PODCAST_STORAGE_KEY);
};

export const setReadingProgressItem = async (
  key: string,
  value: string,
): Promise<void> => {
  const mmkv = initializeReadingProgressMMKV();

  if (mmkv && !readingProgressMMKVUnhealthy) {
    try {
      mmkv.set(key, value);
      return;
    } catch (error) {
      if (__DEV__) {
        console.error('Reading progress MMKV write error', error);
      }
      readingProgressMMKVUnhealthy = true;
      try {
        mmkv.delete(key);
      } catch (deleteError) {
        if (__DEV__) {
          console.error(
            'Reading progress MMKV invalidation after failed write also failed',
            deleteError,
          );
        }
      }
    }
  }

  await AsyncStorage.setItem(`${READING_PROGRESS_ASYNC_PREFIX}${key}`, value);
};

export const getReadingProgressItem = async (
  key: string,
): Promise<string | null> => {
  const mmkv = initializeReadingProgressMMKV();

  if (mmkv && !readingProgressMMKVUnhealthy) {
    try {
      const mmkvValue = mmkv.getString(key);
      if (mmkvValue !== undefined && mmkvValue !== null) {
        return mmkvValue;
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Reading progress MMKV read error', error);
      }
      readingProgressMMKVUnhealthy = true;
    }
  }

  return AsyncStorage.getItem(`${READING_PROGRESS_ASYNC_PREFIX}${key}`);
};

export const deleteReadingProgressItem = async (key: string): Promise<void> => {
  const mmkv = initializeReadingProgressMMKV();

  if (mmkv) {
    try {
      mmkv.delete(key);
    } catch (error) {
      if (__DEV__) {
        console.error('Reading progress MMKV delete error', error);
      }
      readingProgressMMKVUnhealthy = true;
    }
  }

  await AsyncStorage.removeItem(`${READING_PROGRESS_ASYNC_PREFIX}${key}`);
};
