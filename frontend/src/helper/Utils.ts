import NetInfo from '@react-native-community/netinfo';
import {Category, CategoryType, PodcastData} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_STORAGE_DATA} from './APIUtils';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {secureClearAllItems} from './SecureStorageUtils';
import {
  deleteItem as deletePodcastCache,
  retrieveItem as retrievePodcastCache,
  setItem as setPodcastCache,
  type PodcastDownloadRecord,
} from './MMKVUtils';

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
    case 'mp3':
      type = 'audio/mpeg';
      break;
    case 'wav':
      type = 'audio/wav';
      break;
    case 'x-wav':
      type = 'audio/x-wav';
      break;
    case 'ogg':
      type = 'audio/ogg';
      break;
    case 'opus':
      type = 'audio/opus';
      break;
    case 'aac':
      type = 'audio/aac';
      break;
    case 'x-aac':
      type = 'audio/x-aac';
      break;
    case 'flac':
      type = 'audio/flac';
      break;
    case 'x-flac':
      type = 'audio/x-flac';
      break;
    case 'mp4':
      type = 'audio/mp4';
      break;
    case 'm4a':
      type = 'audio/x-m4a';
      break;
    case 'webm':
      type = 'audio/webm';
      break;
    case 'x-midi':
      type = 'audio/x-midi';
      break;
    case 'amr':
      type = 'audio/amr';
      break;
    case '3gpp':
      type = 'audio/3gpp';
      break;
    case '3gpp2':
      type = 'audio/3gpp2';
      break;
    case 'basic':
      type = 'audio/basic';
      break;
    case 'vnd.wave':
      type = 'audio/vnd.wave';
      break;
    case 'vnd.rn-realaudio':
      type = 'audio/vnd.rn-realaudio';
      break;
    case 'vnd.dts':
      type = 'audio/vnd.dts';
      break;
    case 'vnd.dts.hd':
      type = 'audio/vnd.dts.hd';
      break;
    case 'vnd.digital-winds':
      type = 'audio/vnd.digital-winds';
      break;
    case 'vnd.lucent.voice':
      type = 'audio/vnd.lucent.voice';
      break;
    case 'vnd.ms-playready.media.pya':
      type = 'audio/vnd.ms-playready.media.pya';
      break;
    case 'vnd.nuera.ecelp4800':
      type = 'audio/vnd.nuera.ecelp4800';
      break;
    case 'vnd.nuera.ecelp7470':
      type = 'audio/vnd.nuera.ecelp7470';
      break;
    case 'vnd.nuera.ecelp9600':
      type = 'audio/vnd.nuera.ecelp9600';
      break;
    case 'vnd.sealedmedia.softseal.mpeg':
      type = 'audio/vnd.sealedmedia.softseal.mpeg';
      break;
    case 'x-ms-wma':
      type = 'audio/x-ms-wma';
      break;

    default:
      type = 'application/octet-stream';
  }
  return type;
};

export function formatCount(count: number) {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return Math.floor(count / 1000) + 'k';
  } else {
    return Math.floor(count / 1000000) + 'M';
  }
}

export const handleExternalClick = (request: any) => {
  const {url} = request;

  // External link
  if (url.startsWith('http')) {
    Linking.openURL(url);
    return false;
  }

  return true;
};

export function msToTime(ms: number): string {
  let totalSeconds = Math.floor(ms);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number): string => num.toString().padStart(2, '0');

  let result =
    hours >= 1
      ? `${pad(hours)}h:${pad(minutes)}m`
      : `${pad(minutes)}m:${pad(seconds)}s`;

  return result;
}

// Async Storage for get Item
export const retrieveItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
    console.log('Error reading value', e);
  }
};

// Async Storage Store Item
export const storeItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log(`Value saved for key : ${key}`, value);
  } catch (e) {
    console.log('Async Storage Data error', e);
  }
};

// Async storage remove item
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

export const writeDownloadedPodcasts = async (
  data: PodcastDownloadRecord[],
) => {
  await setPodcastCache(data);
};

export const removeDownloadedPodcasts = async () => {
  await deletePodcastCache();
};

// export const clearStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     await secureClearAllItems();
//     //navigation.navigate('LoginScreen');
//     console.log('All storage cleared successfully.');
//   } catch (error) {
//     console.error('Error removing item:', error);
//   }
// };

export const clearStorage = async () => {
  try {
    //    await AsyncStorage.clear();
    // Explicitly clear known user-related keys from AsyncStorage
    await Promise.all([
      AsyncStorage.removeItem(KEYS.USER_TOKEN_EXPIRY_DATE),
      AsyncStorage.removeItem(KEYS.USER_ID),
      AsyncStorage.removeItem(KEYS.USER_HANDLE),
    ]);
    await secureClearAllItems();
    //navigation.navigate('LoginScreen');
    console.log('All user-related storage cleared successfully.');
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
  return `<!DOCTYPE html>
<html>
<head>

<title>${title}</title>
<style>
/**
 * Copyright 2024,UltimateHealth. All rights reserved.
 */
body {
  font-family: Arial, sans-serif;
  font-size: 18px; 
  line-height: 1.6; 
  color: #333; 
}

h1 {
  color: #00698f;
}

h2 {
  color: #008000;
}

h3 {
  color: #660066;
}

h4 {
  color: #0099CC;
}

h5 {
  color: #FF9900;
}

h6 {
  color: #663300;
}

ul {
  list-style-type: disc;
}

li {
  margin-bottom: 10px;
}

article {
  width: 95%;
  margin: 20px auto;
}
table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
  }
.tag-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.tag-list li {
  margin-right: 10px;
}

.tag {
  color: blue;
  text-decoration: none;
}
</style>
</head>
<body>
${body}
<hr>
<ul class="tag-list">
  ${tags
    .map(tag => `<li><a class="tag" href="#">#${tag.name}</a></li>`)
    .join('')}
</ul>
<h3>Author</h3>
<h4>${author}</a></h4>
</body>
`;
};

// General purpose podcast app, no need to encrypted download data here,
// We will ensure that, there will be no copyrighted content, or we can't give access to download
// copyrighted content, as per ultimatehealth system
export const requestStoragePermissions = async () => {
  if (Platform.OS !== 'android') return true;

  if ((Platform.Version as number) < 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    return (
      granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
    );
  } else {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    ]);

    return granted['android.permission.READ_MEDIA_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED;
  }
};

export const isPathSafe = (path: string): boolean => {
  const safePrefix = RNFS.DocumentDirectoryPath;
  const normalizedPath = path.replace(/\\/g, '/');
  const normalizedPrefix = safePrefix.replace(/\\/g, '/');
  if (normalizedPath.includes('..')) {
    return false;
  }
  return normalizedPath.startsWith(normalizedPrefix);
};

const ALLOWED_EXTENSIONS = new Set(['mp3', 'wav', 'aac', 'm4a', 'flac', 'ogg', 'opus', 'webm']);

const getFileExtension = (urlOrPath: string): string => {
  const parts = urlOrPath.split('?')[0].split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
};

const validateMediaUrl = async (url: string): Promise<boolean> => {
  const ext = getFileExtension(url);
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    console.warn(`Validation failed: Disallowed file extension: ${ext}`);
    return false;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType) {
        const mime = contentType.toLowerCase();
        if (!mime.startsWith('audio/') && mime !== 'application/octet-stream') {
          console.warn(`Validation failed: Content-Type is not audio: ${contentType}`);
          return false;
        }
      }
    }
  } catch (error) {
    console.log('MIME validation head request failed, falling back to extension check', error);
  }
  return true;
};

const validateFileSignature = async (filePath: string): Promise<boolean> => {
  try {
    const exists = await RNFS.exists(filePath);
    if (!exists) return false;

    // Read first 8 bytes for ID3, RIFF, FLAC, Ogg, MP3 raw frame sync
    const header = await RNFS.read(filePath, 8, 0, 'base64');

    if (header.startsWith('SUQz')) return true; // ID3 (MP3)
    if (header.startsWith('UklGR')) return true; // RIFF (WAV)
    if (header.startsWith('Zkxha')) return true; // FLAC
    if (header.startsWith('T2dnUw')) return true; // Ogg
    if (header.startsWith('/7')) return true; // MP3 raw frame sync

    // Check MPEG-4 (M4A) at offset 4: ftyp (base64 ZnR5c)
    const offsetHeader = await RNFS.read(filePath, 4, 4, 'base64');
    if (offsetHeader.startsWith('ZnR5c')) return true;

    console.warn('File signature validation failed for base64 headers:', { header, offsetHeader });
    return false;
  } catch (error) {
    console.error('Error validating file signature:', error);
    return true; // Fallback to true if read fails to avoid blocking users
  }
};

export const updateLastPlayedTimestamp = async (podcastId: string) => {
  try {
    const existingPodcasts = await readDownloadedPodcasts();
    if (!Array.isArray(existingPodcasts)) return;

    let updated = false;
    const freshPodcasts = existingPodcasts.map(item => {
      if (item._id === podcastId) {
        updated = true;
        return {
          ...item,
          lastPlayedAt: new Date(),
        };
      }
      return item;
    });

    if (updated) {
      await writeDownloadedPodcasts(freshPodcasts);
      console.log('Updated last played timestamp for podcast:', podcastId);
    }
  } catch (err) {
    console.log('Error updating last played timestamp:', err);
  }
};

/** Download podcast */

export const downloadAudio = async (_podcast: PodcastData) => {
  // Check for existing downloads
  const storageGranted = await requestStoragePermissions();
  if (!storageGranted) {
    Alert.alert('Storage permission denied');
    return;
  }
  const existingPodcasts = await readDownloadedPodcasts();
  try {
    let _existingPodcasts = Array.isArray(existingPodcasts) ? existingPodcasts : [];

    // Check for existing downloads
    const isPodcastFound = _existingPodcasts.some((d: any) => d._id === _podcast._id);

    if (isPodcastFound) {
      return {
        message: 'File already saved',
        success: true,
      };
    }

    const downloadUrl = `${GET_STORAGE_DATA}/${_podcast.audio_url}`;
    const isValid = await validateMediaUrl(downloadUrl);
    if (!isValid) {
      return {
        message: 'Invalid or unsupported media format',
        success: false,
      };
    }

    // LRU Cache eviction policy (Limit: 5 podcasts)
    const MAX_CACHE_LIMIT = 5;
    if (_existingPodcasts.length >= MAX_CACHE_LIMIT) {
      const sortedPodcasts = [..._existingPodcasts].sort((a, b) => {
        const timeA = (a.lastPlayedAt ? new Date(a.lastPlayedAt) : a.downloadAt).getTime();
        const timeB = (b.lastPlayedAt ? new Date(b.lastPlayedAt) : b.downloadAt).getTime();
        return timeA - timeB;
      });

      while (sortedPodcasts.length >= MAX_CACHE_LIMIT) {
        const toEvict = sortedPodcasts.shift();
        if (toEvict) {
          if (toEvict.filePath && (await RNFS.exists(toEvict.filePath))) {
            await RNFS.unlink(toEvict.filePath);
            console.log('LRU cache evicted local file:', toEvict.filePath);
          }
          _existingPodcasts = _existingPodcasts.filter(p => p._id !== toEvict._id);
        }
      }
    }

    // download the file
    const path = await downloadFile(_podcast.audio_url, _podcast.title);
    if (path) {
      // Validate file signature after download
      const isSignatureValid = await validateFileSignature(path);
      if (!isSignatureValid) {
        if (await RNFS.exists(path)) {
          await RNFS.unlink(path);
        }
        return {
          message: 'File failed signature integrity validation',
          success: false,
        };
      }

      if (!Array.isArray(_existingPodcasts)) {
        _existingPodcasts = [];
      }

      const newPodcast: PodcastDownloadRecord = {
        ..._podcast,
        filePath: path,
        downloadAt: new Date(),
        lastPlayedAt: new Date(),
      };
      _existingPodcasts.push(newPodcast);
      await writeDownloadedPodcasts(_existingPodcasts);

      return {
        message: 'File saved successfully',
        success: true,
      };
    } else {
      return {
        message: 'Something went wrong, try again after sometime',
        success: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: 'Something went wrong, try again after sometime',
      success: false,
    };
  }
};

const downloadFile = async (key: string, title: string) => {
  const safeTitle = title.substring(0, 15).replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${safeTitle}_${Date.now()}.mp3`;
  const downloadUrl = `${GET_STORAGE_DATA}/${key}`;

  const customDirectory = RNFS.DocumentDirectoryPath;
  const filePath = `${customDirectory}/${fileName}`;

  if (!isPathSafe(filePath)) {
    console.error('Path traversal attempt detected:', filePath);
    return null;
  }

  const directoryExists = await RNFS.exists(customDirectory);

  if (!directoryExists) {
    await RNFS.mkdir(customDirectory);
  }
  const result = await RNFS.downloadFile({
    fromUrl: downloadUrl,
    toFile: filePath,
  }).promise;

  if (result.statusCode === 200) {
    console.log('Audio downloaded to:', filePath);
    return filePath;
  } else {
    console.error('Download failed:', result.statusCode);
    return null;
  }
};

export const cleanUpDownloads = async () => {
  const existingPodcasts = await readDownloadedPodcasts();
  if (!Array.isArray(existingPodcasts)) {
    return;
  }
  const freshPodcasts: PodcastDownloadRecord[] = [];
  const now = Date.now();
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

  for (const item of existingPodcasts) {
    const age = now - item.downloadAt.getTime();

    if (Number.isFinite(age) && age > THIRTY_DAYS_MS) {
      if (item.filePath && (await RNFS.exists(item.filePath))) {
        await RNFS.unlink(item.filePath);
        console.log('Deleted old file:', item.filePath);
      }
    } else {
      freshPodcasts.push(item);
    }
  }
  await writeDownloadedPodcasts(freshPodcasts);
  console.log('Cleanup completed. Remaining items:', freshPodcasts.length);
};

export const deleteFromDownloads = async (_podcast: PodcastData) => {
  const existingPodcasts = await readDownloadedPodcasts();
  if (!Array.isArray(existingPodcasts)) {
    return;
  }
  try {
    const freshPodcasts: PodcastDownloadRecord[] = [];

    for (const item of existingPodcasts) {
      if (item._id === _podcast._id) {
        // unlink
        if (item.filePath && (await RNFS.exists(item.filePath))) {
          await RNFS.unlink(item.filePath);
          console.log('Deleted old file:', item.filePath);
        }
      } else {
        freshPodcasts.push(item);
      }
    }
    await writeDownloadedPodcasts(freshPodcasts);
    console.log('Cleanup completed. Remaining items:', freshPodcasts.length);
    return true;
  } catch (err) {
    console.log('cleaned up error', err);
    return false;
  }
};

export const updateOfflinePodcastLikeStatus = async (_podcast: PodcastData) => {
  try {
    const existingPodcasts = await readDownloadedPodcasts();
    const freshPodcasts: PodcastDownloadRecord[] = [];
    for (const item of existingPodcasts) {
      if (item._id === _podcast._id) {
        freshPodcasts.push({
          ...item,
          ..._podcast,
          downloadAt: item.downloadAt,
          filePath: item.filePath,
        });
      } else {
        freshPodcasts.push(item);
      }
    }

    await writeDownloadedPodcasts(freshPodcasts);
    console.log('Update completed');
  } catch (err) {
    console.log(err);
  }
};

export const createFeebackHTMLStructure = (feedback: string) => {
  return `<!DOCTYPE html>
<html>
<head>
<style>
/**
 * Copyright 2024,UltimateHealth. All rights reserved.
 */
body {
  font-family: Arial, sans-serif;
  font-size: 18px; 
  line-height: 1.6; 
  color: #333; 
}

h1 {
  color: #00698f;
}

h2 {
  color: #008000;
}

h3 {
  color: #660066;
}

h4 {
  color: #0099CC;
}

h5 {
  color: #FF9900;
}

h6 {
  color: #663300;
}

ul {
  list-style-type: disc;
}

li {
  margin-bottom: 10px;
}

article {
  width: 95%;
  margin: 20px auto;
}
table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
  }
.tag-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.tag-list li {
  margin-right: 10px;
}

.tag {
  color: blue;
  text-decoration: none;
}
</style>
</head>
<body>
${feedback}
<hr>
</body>
`;
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
  assistant:
    'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
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
  UNASSIGNED: 'unassigned', // can't change
  IN_PROGRESS: 'in-progress', // can't change
  REVIEW_PENDING: 'review-pending', // can't change
  PUBLISHED: 'published',
  DISCARDED: 'discarded', // can't change
  AWAITING_USER: 'awaiting-user',
};
