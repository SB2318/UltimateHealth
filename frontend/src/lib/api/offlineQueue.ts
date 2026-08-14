import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const OFFLINE_QUEUE_KEY = 'offline_write_queue';

interface QueuedRequest {
  url: string;
  method: string;
  data?: any;
}

/**
 * Guards against overlapping flushes.
 *
 * `flushOfflineQueue` reads the whole queue, removes it, then replays each
 * request. Without this flag two concurrent flushes (e.g. rapid connectivity
 * transitions) would both read the same snapshot and replay every request,
 * producing duplicate POSTs/PUTs/DELETEs (duplicate likes, follows, writes).
 */
let flushInProgress = false;

export const enqueueOfflineWrite = async (request: QueuedRequest) => {
  try {
    const queueJson = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    const queue: QueuedRequest[] = queueJson ? JSON.parse(queueJson) : [];
    if (!Array.isArray(queue)) {
      return;
    }
    // Persist only url/method/data. An Authorization header (or any other
    // header) passed by a caller must never reach AsyncStorage, so build a
    // fresh object instead of spreading `request`.
    queue.push({
      url: request.url,
      method: request.method,
      data: request.data,
    });
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to enqueue offline write:', error);
  }
};

/**
 * Discards every queued write. Called during logout / session teardown so
 * that writes enqueued under one identity can never be replayed under another
 * user's session (or as an unauthenticated guest, which would 401 and trigger
 * a spurious session-expiry teardown).
 */
export const clearOfflineQueue = async () => {
  try {
    await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
  } catch (error) {
    console.error('Failed to clear offline write queue:', error);
  }
};

export const flushOfflineQueue = async () => {
  if (flushInProgress) {
    return;
  }
  flushInProgress = true;
  try {
    const queueJson = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!queueJson) return;

    const queue: QueuedRequest[] = JSON.parse(queueJson);
    if (!Array.isArray(queue) || queue.length === 0) return;

    // Clear the queue before processing to avoid duplicates if flushed concurrently
    await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);

    for (const req of queue) {
      try {
        // Headers are intentionally NOT persisted: the Authorization header
        // contains the bearer token, which must never be written to plaintext
        // AsyncStorage. On replay, the global axios request interceptor
        // re-attaches a fresh token for the current session.
        await axios({
          url: req.url,
          method: req.method,
          data: req.data,
        });
      } catch (error: any) {
        // Re-enqueue only if it's a network error
        if (!error.response && error.isAxiosError) {
          await enqueueOfflineWrite(req);
        }
      }
    }
  } catch (error) {
    console.error('Failed to flush offline queue:', error);
  } finally {
    flushInProgress = false;
  }
};

// Start listening to connectivity changes to flush queue
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    flushOfflineQueue();
  }
});
