type Store = Record<string, string>;

const createMMKVMock = (
  store: Store,
  overrides: Partial<{
    setImpl: (key: string, value: string) => void;
    getImpl: (key: string) => string | undefined;
    deleteImpl: (key: string) => void;
  }> = {},
) => ({
  set: jest.fn((key: string, value: string) => {
    if (overrides.setImpl) {
      overrides.setImpl(key, value);
      return;
    }
    store[key] = value;
  }),
  getString: jest.fn((key: string) => {
    if (overrides.getImpl) {
      return overrides.getImpl(key);
    }
    return store[key];
  }),
  delete: jest.fn((key: string) => {
    if (overrides.deleteImpl) {
      overrides.deleteImpl(key);
      return;
    }
    delete store[key];
  }),
  clearAll: jest.fn(() => {
    Object.keys(store).forEach(k => delete store[k]);
  }),
});

const PODCAST_KEY = 'DOWNLOAD_PODCAST_DATA';
const READING_KEY = 'reading_progress_article-1';
const READING_ASYNC_KEY = `reading_progress:${READING_KEY}`;

type ModuleUnderTest = typeof import('../../../lib/storage/MMKVUtils');
type AsyncStorageMock = {
  setItem: jest.Mock;
  getItem: jest.Mock;
  removeItem: jest.Mock;
};

const bootstrap = (
  mmkvInstance: ReturnType<typeof createMMKVMock> | null,
): {mod: ModuleUnderTest; asyncStorage: AsyncStorageMock} => {
  jest.resetModules();
  jest.doMock('react-native-mmkv', () => ({
    createMMKV: jest.fn(() => mmkvInstance),
  }));
  const mod = require('../MMKVUtils') as ModuleUnderTest;
  const asyncStorage =
    require('@react-native-async-storage/async-storage') as AsyncStorageMock;
  asyncStorage.setItem.mockClear();
  asyncStorage.getItem.mockClear();
  asyncStorage.removeItem.mockClear();
  asyncStorage.getItem.mockResolvedValue(null);
  asyncStorage.setItem.mockResolvedValue(undefined);
  asyncStorage.removeItem.mockResolvedValue(undefined);
  return {mod, asyncStorage};
};

describe('MMKVUtils podcast cache', () => {
  it('reads and writes via MMKV when healthy', async () => {
    const store: Store = {};
    const mmkv = createMMKVMock(store);
    const {mod, asyncStorage} = bootstrap(mmkv);

    const record = {
      _id: '1',
      title: 'test',
      filePath: '/tmp/a.mp3',
      downloadAt: new Date('2026-06-01T00:00:00Z'),
    } as never;

    await mod.setItem([record]);
    expect(mmkv.set).toHaveBeenCalledWith(PODCAST_KEY, expect.any(String));

    const result = await mod.retrieveItem();
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('1');
    expect(asyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('falls back to AsyncStorage and invalidates MMKV when write throws', async () => {
    const store: Store = {
      [PODCAST_KEY]: JSON.stringify([{_id: 'stale', downloadAt: '2020-01-01'}]),
    };
    const mmkv = createMMKVMock(store, {
      setImpl: () => {
        throw new Error('mmkv full');
      },
    });
    const {mod, asyncStorage} = bootstrap(mmkv);

    const record = {
      _id: 'fresh',
      title: 'test',
      filePath: '/tmp/a.mp3',
      downloadAt: new Date('2026-06-01T00:00:00Z'),
    } as never;

    await mod.setItem([record]);

    expect(mmkv.delete).toHaveBeenCalledWith(PODCAST_KEY);
    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      PODCAST_KEY,
      expect.stringContaining('fresh'),
    );

    asyncStorage.getItem.mockResolvedValue(
      JSON.stringify([{_id: 'fresh', downloadAt: '2026-06-01T00:00:00Z'}]),
    );

    const result = await mod.retrieveItem();
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('fresh');
  });

  it('reads from AsyncStorage when MMKV returns empty but AsyncStorage has data', async () => {
    const store: Store = {};
    const mmkv = createMMKVMock(store);
    const {mod, asyncStorage} = bootstrap(mmkv);

    asyncStorage.getItem.mockResolvedValue(
      JSON.stringify([{_id: 'from-async', downloadAt: '2026-06-01T00:00:00Z'}]),
    );

    const result = await mod.retrieveItem();
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('from-async');
  });

  it('falls back to AsyncStorage when MMKV read throws', async () => {
    const mmkv = createMMKVMock(
      {},
      {
        getImpl: () => {
          throw new Error('mmkv corrupt');
        },
      },
    );
    const {mod, asyncStorage} = bootstrap(mmkv);

    asyncStorage.getItem.mockResolvedValue(
      JSON.stringify([{_id: 'from-async', downloadAt: '2026-06-01T00:00:00Z'}]),
    );

    const result = await mod.retrieveItem();
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('from-async');
  });

  it('deletes from both stores', async () => {
    const store: Store = {[PODCAST_KEY]: '[]'};
    const mmkv = createMMKVMock(store);
    const {mod, asyncStorage} = bootstrap(mmkv);

    await mod.deleteItem();

    expect(mmkv.delete).toHaveBeenCalledWith(PODCAST_KEY);
    expect(asyncStorage.removeItem).toHaveBeenCalledWith(PODCAST_KEY);
  });
});

describe('MMKVUtils reading progress', () => {
  it('writes reading progress to MMKV when healthy', async () => {
    const store: Store = {};
    const mmkv = createMMKVMock(store);
    const {mod, asyncStorage} = bootstrap(mmkv);

    await mod.setReadingProgressItem(READING_KEY, 'progress-payload');

    expect(mmkv.set).toHaveBeenCalledWith(READING_KEY, 'progress-payload');
    expect(asyncStorage.setItem).not.toHaveBeenCalled();

    const value = await mod.getReadingProgressItem(READING_KEY);
    expect(value).toBe('progress-payload');
  });

  it('falls back to AsyncStorage under prefixed key when MMKV write throws', async () => {
    const mmkv = createMMKVMock(
      {},
      {
        setImpl: () => {
          throw new Error('mmkv write failed');
        },
      },
    );
    const {mod, asyncStorage} = bootstrap(mmkv);

    await mod.setReadingProgressItem(READING_KEY, 'fallback-value');

    expect(mmkv.delete).toHaveBeenCalledWith(READING_KEY);
    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      READING_ASYNC_KEY,
      'fallback-value',
    );

    asyncStorage.getItem.mockResolvedValue('fallback-value');
    const value = await mod.getReadingProgressItem(READING_KEY);
    expect(value).toBe('fallback-value');
  });

  it('does not throw when MMKV set throws (previously uncaught)', async () => {
    const mmkv = createMMKVMock(
      {},
      {
        setImpl: () => {
          throw new Error('mmkv exploded');
        },
      },
    );
    const {mod} = bootstrap(mmkv);

    await expect(
      mod.setReadingProgressItem(READING_KEY, 'v'),
    ).resolves.toBeUndefined();
  });

  it('deletes reading progress from both stores', async () => {
    const store: Store = {[READING_KEY]: 'x'};
    const mmkv = createMMKVMock(store);
    const {mod, asyncStorage} = bootstrap(mmkv);

    await mod.deleteReadingProgressItem(READING_KEY);

    expect(mmkv.delete).toHaveBeenCalledWith(READING_KEY);
    expect(asyncStorage.removeItem).toHaveBeenCalledWith(READING_ASYNC_KEY);
  });
});

describe('MMKVUtils without MMKV module', () => {
  it('uses AsyncStorage for podcasts when MMKV is unavailable', async () => {
    const {mod, asyncStorage} = bootstrap(null);

    const record = {
      _id: '1',
      title: 't',
      filePath: '/tmp/a.mp3',
      downloadAt: new Date('2026-06-01T00:00:00Z'),
    } as never;

    await mod.setItem([record]);
    expect(asyncStorage.setItem).toHaveBeenCalledWith(
      PODCAST_KEY,
      expect.stringContaining('"_id":"1"'),
    );

    asyncStorage.getItem.mockResolvedValue(
      JSON.stringify([{_id: '1', downloadAt: '2026-06-01T00:00:00Z'}]),
    );
    const result = await mod.retrieveItem();
    expect(result).toHaveLength(1);
  });
});
