import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const OFFLINE_QUEUE_KEY = 'offline_write_queue';

interface QueuedRequest {
  url: string;
  method: string;
  data?: any;
  headers?: any;
}

export const enqueueOfflineWrite = async (request: QueuedRequest) => {
  try {
    const queueJson = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    const queue: QueuedRequest[] = queueJson ? JSON.parse(queueJson) : [];
    queue.push(request);
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to enqueue offline write:', error);
  }
};

export const flushOfflineQueue = async () => {
  try {
    const queueJson = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    if (!queueJson) return;

    const queue: QueuedRequest[] = JSON.parse(queueJson);
    if (queue.length === 0) return;

    // Clear the queue before processing to avoid duplicates if flushed concurrently
    await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);

    for (const req of queue) {
      try {
        await axios({
          url: req.url,
          method: req.method,
          data: req.data,
          headers: req.headers,
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
  }
};

// Start listening to connectivity changes to flush queue
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    flushOfflineQueue();
  }
});
