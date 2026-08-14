import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  enqueueOfflineWrite,
  clearOfflineQueue,
  flushOfflineQueue,
} from '../../../lib/api/offlineQueue';

jest.mock('axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('offlineQueue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('persists url/method/data but never headers', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    await enqueueOfflineWrite({
      url: '/article/like',
      method: 'POST',
      data: {articleId: '42'},
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const [key, serialized] = (AsyncStorage.setItem as jest.Mock).mock
      .calls[0] as [string, string];

    expect(key).toBe('offline_write_queue');

    const saved = JSON.parse(serialized);
    expect(saved).toHaveLength(1);
    expect(saved[0]).toEqual({
      url: '/article/like',
      method: 'POST',
      data: {articleId: '42'},
    });
    expect(saved[0]).not.toHaveProperty('headers');
  });

  it('drops headers even when a caller passes them', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    await enqueueOfflineWrite({
      url: '/article/follow',
      method: 'PUT',
      data: {id: '7'},
      headers: {Authorization: 'Bearer SECRET_TOKEN'},
    } as any);

    const [, serialized] = (AsyncStorage.setItem as jest.Mock).mock
      .calls[0] as [string, string];
    const saved = JSON.parse(serialized);
    expect(saved[0]).not.toHaveProperty('headers');
    expect(saved[0].headers).toBeUndefined();
  });

  it('ignores a corrupted non-array queue instead of overwriting it', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({not: 'an array'}),
    );

    await enqueueOfflineWrite({url: '/x', method: 'POST'});

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('clears the queue', async () => {
    await clearOfflineQueue();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      'offline_write_queue',
    );
  });

  it('flushes queued writes without replaying stored headers', async () => {
    mockedAxios.mockResolvedValue({data: {ok: true}} as any);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([
        {
          url: '/article/like',
          method: 'POST',
          data: {articleId: '42'},
          headers: {Authorization: 'Bearer LEAKED_TOKEN'},
        },
      ]),
    );

    await flushOfflineQueue();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      'offline_write_queue',
    );
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    const call = mockedAxios.mock.calls[0][0] as any;
    expect(call.url).toBe('/article/like');
    expect(call.method).toBe('POST');
    expect(call.data).toEqual({articleId: '42'});
    expect(call.headers).toBeUndefined();
  });

  it('re-enqueues a request that fails with a network error', async () => {
    mockedAxios.mockRejectedValueOnce({
      isAxiosError: true,
      response: undefined,
    });

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([
        {url: '/article/like', method: 'POST', data: {articleId: '42'}},
      ]),
    );
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    await flushOfflineQueue();

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const [, serialized] = (AsyncStorage.setItem as jest.Mock).mock
      .calls[0] as [string, string];
    const saved = JSON.parse(serialized);
    expect(saved).toEqual([
      {url: '/article/like', method: 'POST', data: {articleId: '42'}},
    ]);
  });

  it('does not run two flushes concurrently', async () => {
    let resolveFirst: () => void;
    const gate = new Promise<void>(resolve => {
      resolveFirst = resolve;
    });

    mockedAxios.mockImplementationOnce(
      () => gate.then(() => ({data: {ok: true}} as any)),
    );
    mockedAxios.mockResolvedValue({data: {ok: true}} as any);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([
        {url: '/a', method: 'POST', data: {id: 1}},
        {url: '/b', method: 'POST', data: {id: 2}},
      ]),
    );

    const first = flushOfflineQueue();
    const second = flushOfflineQueue();
    (resolveFirst as () => void)();

    await Promise.all([first, second]);

    expect(mockedAxios).toHaveBeenCalledTimes(2);
  });
});
