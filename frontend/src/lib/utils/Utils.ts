import NetInfo from '@react-native-community/netinfo';
import {Category, CategoryType, PodcastData} from '../../schemas/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_STORAGE_DATA} from '../api/APIUtils';
import {Alert, Linking, Platform, PermissionsAndroid, DeviceEventEmitter} from 'react-native';
import {sanitizeHtml} from './htmlSanitizer';

import {secureClearAllItems} from '../storage/SecureStorageUtils';
import {clearOfflineQueue} from '../api/offlineQueue';
import { debugLog, debugWarn, debugError } from '../utils/debugLog';
import {
  deleteItem as deletePodcastCache,
  retrieveItem as retrievePodcastCache,
  setItem as setPodcastCache,
  type PodcastDownloadRecord,
} from '../storage/MMKVUtils';

let RNFS: any = null;

if (Platform.OS !== 'web') {
  RNFS = require('react-native-fs');
}

export const checkInternetConnection = (
  callback: (isConnected: boolean) => void,
) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    return callback(state.isConnected ? state.isConnected : false);
  });
  return unsubscribe;
};

export const getMimeTypes = (ext: string): string => {
  let type = '';
  switch (ext.toLowerCase()) {
    case 'mp3': type = 'audio/mpeg'; break;
    case 'wav': type = 'audio/wav'; break;
    case 'x-wav': type = 'audio/x-wav'; break;
    case 'ogg': type = 'audio/ogg'; break;
    case 'opus': type = 'audio/opus'; break;
    case 'aac': type = 'audio/aac'; break;
    case 'x-aac': type = 'audio/x-aac'; break;
    case 'flac': type = 'audio/flac'; break;
    case 'x-flac': type = 'audio/x-flac'; break;
    case 'mp4': type = 'audio/mp4'; break;
    case 'm4a': type = 'audio/x-m4a'; break;
    case 'webm': type = 'audio/webm'; break;
    case 'x-midi': type = 'audio/x-midi'; break;
    case 'amr': type = 'audio/amr'; break;
    case '3gpp': type = 'audio/3gpp'; break;
    case '3gpp2': type = 'audio/3gpp2'; break;
    case 'basic': type = 'audio/basic'; break;
    case 'vnd.wave': type = 'audio/vnd.wave'; break;
    case 'vnd.rn-realaudio': type = 'audio/vnd.rn-realaudio'; break;
    case 'vnd.dts': type = 'audio/vnd.dts'; break;
    case 'vnd.dts.hd': type = 'audio/vnd.dts.hd'; break;
    case 'vnd.digital-winds': type = 'audio/vnd.digital-winds'; break;
    case 'vnd.lucent.voice': type = 'audio/vnd.lucent.voice'; break;
    case 'vnd.ms-playready.media.pya': type = 'audio/vnd.ms-playready.media.pya'; break;
    case 'vnd.nuera.ecelp4800': type = 'audio/vnd.nuera.ecelp4800'; break;
    case 'vnd.nuera.ecelp7470': type = 'audio/vnd.nuera.ecelp7470'; break;
    case 'vnd.nuera.ecelp9600': type = 'audio/vnd.nuera.ecelp9600'; break;
    case 'vnd.sealedmedia.softseal.mpeg': type = 'audio/vnd.sealedmedia.softseal.mpeg'; break;
    case 'x-ms-wma': type = 'audio/x-ms-wma'; break;
    default: type = 'application/octet-stream';
  }
  return type;
};

export function formatCount(count: number) {
  if (count < 1000) return count.toString();
  else if (count < 1000000) return Math.floor(count / 1000) + 'k';
  else return Math.floor(count / 1000000) + 'M';
}

// Only safe, externally-openable schemes are allowed to leave the WebView.
// Anything else (javascript:, data:, vbscript:, file:, custom schemes, ...)
// is blocked so injected content cannot trigger script execution.
const SAFE_EXTERNAL_URL = /^(https?|mailto|tel|sms):/i;

export const handleExternalClick = (request: any) => {
  const {url} = request;
  if (SAFE_EXTERNAL_URL.test(url ?? '')) {
    Linking.openURL(url);
  }
  return false;
};

// Sanitizer for content rendered inside WebViews.
// Re-exported so existing imports stay valid.
export {sanitizeHtml};

export function msToTime(val: number): string {
  if (!val || isNaN(val) || val <= 0) return '00:00';
  // If val is > 10000, it's in milliseconds; otherwise it's already in seconds
  let totalSeconds = val > 10000 ? Math.floor(val / 1000) : Math.floor(val);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad = (num: number): string => num.toString().padStart(2, '0');
  return hours >= 1
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

export const retrieveItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    debugLog('Error reading value', e);
  }
};

export const storeItem = async (key: string, value: string) => {
  try {
    if (value === undefined || value === null) {
      console.warn(`[AsyncStorage] Attempted to store null/undefined value for key: ${key}`);
      return;
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    debugLog('Async Storage Data error', e);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

export const readDownloadedPodcasts = async (): Promise<PodcastDownloadRecord[]> => {
  return retrievePodcastCache();
};

export const writeDownloadedPodcasts = async (data: PodcastDownloadRecord[]) => {
  await setPodcastCache(data);
};

export const removeDownloadedPodcasts = async () => {
  await deletePodcastCache();
};

export const clearStorage = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(KEYS.USER_TOKEN_EXPIRY_DATE),
      AsyncStorage.removeItem(KEYS.USER_ID),
      AsyncStorage.removeItem(KEYS.USER_HANDLE),
      clearOfflineQueue(),
    ]);
    await secureClearAllItems();
    debugLog('All user-related storage cleared successfully.');
  } catch (error) {
    console.error('Error clearing user-related storage:', error);
  }
};

export const createHTMLStructure = (
  title: string,
  body: string,
  tags: Category[],
  social_link: string,
  author: string,
) => {
  const safeTitle = sanitizeHtml(title);
  const safeBody = sanitizeHtml(body);
  const safeAuthor = sanitizeHtml(author);
  const safeTags = (tags || []).map(tag => ({
    ...tag,
    name: sanitizeHtml(tag?.name ?? ''),
  }));
  return `<!DOCTYPE html>
<html>
<head>
<title>${safeTitle}</title>
<style>
body { font-family: Arial, sans-serif; font-size: 18px; line-height: 1.6; color: #333; }
h1 { color: #00698f; } h2 { color: #008000; } h3 { color: #660066; }
h4 { color: #0099CC; } h5 { color: #FF9900; } h6 { color: #663300; }
ul { list-style-type: disc; } li { margin-bottom: 10px; }
article { width: 95%; margin: 20px auto; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f0f0f0; }
.tag-list { list-style-type: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; }
.tag-list li { margin-right: 10px; }
.tag { color: blue; text-decoration: none; }
</style>
</head>
<body>
${safeBody}
<hr>
<ul class="tag-list">
  ${safeTags.map(tag => `<li><a class="tag" href="#">#${tag.name}</a></li>`).join('')}
</ul>
<h3>Author</h3>
<h4>${safeAuthor}</h4>
</body>
</html>`;
};


// General purpose podcast app, no need to encrypted download data here,
// We will ensure that, there will be no copyrighted content, or we can't give access to download
// copyrighted content, as per ultimatehealth system

export const requestStoragePermissions = async () => {
  if (Platform.OS !== 'android') return true;

  if ((Platform.Version as number) < 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    return (
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    );

  } else {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    ]);
    return granted['android.permission.READ_MEDIA_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED;
  }
};

export type DownloadProgressEvent = {
  podcastId: string;
  progress: number;
  status: 'starting' | 'downloading' | 'completed' | 'error';
  message?: string;
};

export const downloadAudio = async (
  _podcast: PodcastData,
  onProgress?: (progress: number) => void,
) => {
  if (!_podcast || !_podcast.audio_url) {
    return {message: 'Audio URL is not available for this podcast', success: false};
  }

  // Non-blocking permission check — if denied, falls back to DocumentDirectoryPath
  try {
    await requestStoragePermissions();
  } catch (_e) {
    // Ignore and proceed with internal storage
  }

  DeviceEventEmitter.emit('podcast-download-progress', {
    podcastId: _podcast._id,
    progress: 0,
    status: 'starting',
  });

  const existingPodcasts = await readDownloadedPodcasts();
  try {
    let _existingPodcasts = Array.isArray(existingPodcasts) ? existingPodcasts : [];

    if (_existingPodcasts.length >= 5) {
      DeviceEventEmitter.emit('podcast-download-progress', {
        podcastId: _podcast._id,
        progress: 0,
        status: 'error',
        message: "You can't keep more than 5 audio",
      });
      return {message: "You can't keep more than 5 audio", success: false};
    }

    const isPodcastFound = _existingPodcasts.some((d: any) => d._id === _podcast._id);
    if (isPodcastFound) {
      DeviceEventEmitter.emit('podcast-download-progress', {
        podcastId: _podcast._id,
        progress: 1,
        status: 'completed',
        message: 'File already saved',
      });
      return {message: 'File already saved', success: true};
    }

    const path = await downloadFile(_podcast.audio_url, _podcast.title, (ratio) => {
      onProgress?.(ratio);
      DeviceEventEmitter.emit('podcast-download-progress', {
        podcastId: _podcast._id,
        progress: ratio,
        status: 'downloading',
      });
    });

    if (path) {
      if (!Array.isArray(_existingPodcasts)) _existingPodcasts = [];
      const newPodcast: PodcastDownloadRecord = {
        ..._podcast,
        filePath: path,
        downloadAt: new Date(),
      };
      _existingPodcasts.push(newPodcast);
      await writeDownloadedPodcasts(_existingPodcasts);

      DeviceEventEmitter.emit('podcast-download-progress', {
        podcastId: _podcast._id,
        progress: 1,
        status: 'completed',
        message: 'File saved successfully',
      });

      return {message: 'File saved successfully', success: true};
    } else {
      DeviceEventEmitter.emit('podcast-download-progress', {
        podcastId: _podcast._id,
        progress: 0,
        status: 'error',
        message: 'Download failed. Please check internet connection.',
      });
      return {message: 'Download failed. Please check internet connection.', success: false};
    }
  } catch (err) {
    debugLog(err);
    DeviceEventEmitter.emit('podcast-download-progress', {
      podcastId: _podcast._id,
      progress: 0,
      status: 'error',
      message: 'Something went wrong, try again after sometime',
    });
    return {message: 'Something went wrong, try again after sometime', success: false};
  }
};

const downloadFile = async (
  key: string,
  title: string,
  onProgress?: (ratio: number) => void,
) => {
  if (!key) {
    console.error('downloadFile called without audio url/key');
    return null;
  }

  const safeTitle = (title || 'podcast')
    .substring(0, 30)
    .trim()
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .replace(/\s+/g, '_');
  const fileName = `${safeTitle || 'podcast'}_${Date.now()}.mp3`;

  // Support full HTTP/HTTPS URLs (e.g. Cloudinary, S3) and relative storage keys
  let downloadUrl = key.trim();
  if (!downloadUrl.startsWith('http://') && !downloadUrl.startsWith('https://')) {
    downloadUrl = `${GET_STORAGE_DATA}/${downloadUrl}`;
  }

  // Determine target directory: prefer public Downloads on Android if writable, fallback to DocumentDirectoryPath
  let customDirectory = `${RNFS.DocumentDirectoryPath}/Podcasts`;

  if (Platform.OS === 'android') {
    try {
      const publicPodcastsDir = `${RNFS.DownloadDirectoryPath}/UltimateHealth/Podcasts`;
      const exists = await RNFS.exists(publicPodcastsDir);
      if (!exists) {
        await RNFS.mkdir(publicPodcastsDir);
      }
      customDirectory = publicPodcastsDir;
    } catch (_e) {
      customDirectory = `${RNFS.DocumentDirectoryPath}/Podcasts`;
    }
  }

  try {
    const directoryExists = await RNFS.exists(customDirectory);
    if (!directoryExists) await RNFS.mkdir(customDirectory);
  } catch (_e) {
    customDirectory = RNFS.DocumentDirectoryPath;
  }

  const filePath = `${customDirectory}/${fileName}`;

  try {
    const result = await RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: filePath,
      progressDivider: 2,
      progress: (res: any) => {
        if (res.contentLength > 0) {
          const ratio = Math.min(1, Math.max(0, res.bytesWritten / res.contentLength));
          onProgress?.(ratio);
        }
      },
    }).promise;

    if (result.statusCode === 200) {
      debugLog('Audio downloaded to:', filePath);
      return filePath;
    } else {
      console.error('Download failed with status code:', result.statusCode);
      if (await RNFS.exists(filePath)) {
        await RNFS.unlink(filePath).catch(() => {});
      }
      return null;
    }
  } catch (err) {
    console.error('Download file error:', err);
    if (await RNFS.exists(filePath)) {
      await RNFS.unlink(filePath).catch(() => {});
    }
    return null;
  }
};

export const cleanUpDownloads = async () => {
  const existingPodcasts = await readDownloadedPodcasts();
  if (!Array.isArray(existingPodcasts)) return;

  const freshPodcasts: PodcastDownloadRecord[] = [];
  const now = Date.now();
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

  for (const item of existingPodcasts) {
    const age = now - item.downloadAt.getTime();
    if (Number.isFinite(age) && age > THIRTY_DAYS_MS) {
      if (item.filePath && (await RNFS.exists(item.filePath))) {
        await RNFS.unlink(item.filePath);
        debugLog('Deleted old file:', item.filePath);
      }
    } else {
      freshPodcasts.push(item);
    }
  }
  await writeDownloadedPodcasts(freshPodcasts);
  debugLog('Cleanup completed. Remaining items:', freshPodcasts.length);
};

export const deleteFromDownloads = async (_podcast: PodcastData) => {
  const existingPodcasts = await readDownloadedPodcasts();
  if (!Array.isArray(existingPodcasts)) return;

  try {
    const freshPodcasts: PodcastDownloadRecord[] = [];
    for (const item of existingPodcasts) {
      if (item._id === _podcast._id) {
        if (item.filePath && (await RNFS.exists(item.filePath))) {
          await RNFS.unlink(item.filePath);
          debugLog('Deleted old file:', item.filePath);
        }
      } else {
        freshPodcasts.push(item);
      }
    }
    await writeDownloadedPodcasts(freshPodcasts);
    debugLog('Cleanup completed. Remaining items:', freshPodcasts.length);
    return true;
  } catch (err) {
    debugLog('cleaned up error', err);
    return false;
  }
};

export const updateOfflinePodcastLikeStatus = async (_podcast: PodcastData) => {
  try {
    const existingPodcasts = await readDownloadedPodcasts();
    const freshPodcasts: PodcastDownloadRecord[] = [];
    for (const item of existingPodcasts) {
      if (item._id === _podcast._id) {
        freshPodcasts.push({...item, ..._podcast, downloadAt: item.downloadAt, filePath: item.filePath});
      } else {
        freshPodcasts.push(item);
      }
    }
    await writeDownloadedPodcasts(freshPodcasts);
    debugLog('Update completed');
  } catch (err) {
    debugLog(err);
  }
};

export const createFeebackHTMLStructure = (feedback: string) => {
  return `<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; font-size: 18px; line-height: 1.6; color: #333; }
h1 { color: #00698f; } h2 { color: #008000; } h3 { color: #660066; }
h4 { color: #0099CC; } h5 { color: #FF9900; } h6 { color: #663300; }
ul { list-style-type: disc; } li { margin-bottom: 10px; }
article { width: 95%; margin: 20px auto; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f0f0f0; }
.tag-list { list-style-type: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; }
.tag-list li { margin-right: 10px; }
.tag { color: blue; text-decoration: none; }
</style>
</head>
<body>
${feedback}
<hr>
</body>
</html>`;
};

export const KEYS = {
  USER_ID: 'USER_ID',
  USER_TOKEN_EXPIRY_DATE: 'USER_TOKEN_EXPIRY_DATE',
  VULTR_CHAT_MODEL: 'zephyr-7b-beta-f32',
  VULTR_COLLECTION: 'care_companion',
  USER_HANDLE: 'USER_HANDLE',
  DOWNLOAD_PODCAST_DATA: 'DOWNLOAD_PODCAST_DATA',
};

export const VULTR_CHAT_ROLES = {
  user: 'user',
  system: 'system',
  assistant: 'assistant',
};

export const VULTR_CHAT_PROFILE_AVTARS = {
  user: '',
  system: '',
  assistant: 'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
};

export const ttsLanguageList = [
  {name: 'English (India)', code: 'en-IN'},
  {name: 'Hindi', code: 'hi-IN'},
  {name: 'Bengali', code: 'bn-IN'},
  {name: 'Tamil', code: 'ta-IN'},
  {name: 'Telugu', code: 'te-IN'},
  {name: 'Marathi', code: 'mr-IN'},
  {name: 'Gujarati', code: 'gu-IN'},
  {name: 'Kannada', code: 'kn-IN'},
  {name: 'Malayalam', code: 'ml-IN'},
  {name: 'Punjabi', code: 'pa-IN'},
  {name: 'Odia', code: 'or-IN'},
  {name: 'Assamese', code: 'as-IN'},
  {name: 'Urdu (India)', code: 'ur-IN'},
];

export const Categories: CategoryType[] = [
  {id: 1, name: 'Cardiology'},
  {id: 2, name: 'Neurology'},
  {id: 3, name: 'Oncology'},
  {id: 4, name: 'Dermatology'},
  {id: 5, name: 'Gastroenterology'},
  {id: 6, name: 'Endocrinology'},
  {id: 7, name: 'Pediatrics'},
  {id: 8, name: 'Orthopedics'},
  {id: 9, name: 'Psychiatry'},
  {id: 10, name: 'Pulmonology'},
];

export const StatusEnum = {
  UNASSIGNED: 'unassigned',
  IN_PROGRESS: 'in-progress',
  REVIEW_PENDING: 'review-pending',
  PUBLISHED: 'published',
  DISCARDED: 'discarded',
  AWAITING_USER: 'awaiting-user',
};