import {
  getReadingHistory,
  recordArticleView,
  clearReadingHistory,
} from '../../../lib/services/ReadingHistoryService';

const mockStorage = {
  getString: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
};

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => mockStorage),
}));

describe('ReadingHistoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockStorage.getString.mockReset();
    mockStorage.set.mockReset();
    mockStorage.remove.mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns empty array when no history exists', () => {
    mockStorage.getString.mockReturnValue(undefined);

    expect(getReadingHistory()).toEqual([]);
  });

  it('returns parsed history successfully', () => {
    const history = [
      {
        articleId: '1',
        title: 'Test',
        authorName: 'Author',
        category: 'Health',
        coverImage: '',
        viewedAt: 123,
      },
    ];

    mockStorage.getString.mockReturnValue(JSON.stringify(history));

    expect(getReadingHistory()).toEqual(history);
  });

  it('handles corrupted JSON safely', () => {
    mockStorage.getString.mockReturnValue('{invalid json');

    expect(getReadingHistory()).toEqual([]);
    expect(mockStorage.remove).toHaveBeenCalledWith('reading_history');
  });

  it('records a new article view with timestamp', () => {
    mockStorage.getString.mockReturnValue(undefined);

    const now = 1234567890;
    jest.spyOn(Date, 'now').mockReturnValue(now);

    recordArticleView({
      articleId: '1',
      title: 'Test',
      authorName: 'Author',
      category: 'Health',
      coverImage: '',
    });

    expect(mockStorage.set).toHaveBeenCalled();

    const savedHistory = JSON.parse(
      mockStorage.set.mock.calls[0][1]
    );

    expect(savedHistory).toHaveLength(1);

    expect(savedHistory[0]).toEqual({
      articleId: '1',
      title: 'Test',
      authorName: 'Author',
      category: 'Health',
      coverImage: '',
      viewedAt: now,
    });
  });

  it('moves existing article to front when viewed again', () => {
    const existingHistory = [
      {
        articleId: '1',
        title: 'Old',
        authorName: 'Author',
        category: 'Health',
        coverImage: '',
        viewedAt: 1000,
      },
      {
        articleId: '2',
        title: 'Second',
        authorName: 'Author',
        category: 'Health',
        coverImage: '',
        viewedAt: 500,
      },
    ];

    mockStorage.getString.mockReturnValue(
      JSON.stringify(existingHistory)
    );

    jest.spyOn(Date, 'now').mockReturnValue(70000);

    recordArticleView({
      articleId: '1',
      title: 'Old',
      authorName: 'Author',
      category: 'Health',
      coverImage: '',
    });

    const savedHistory = JSON.parse(
      mockStorage.set.mock.calls[0][1]
    );

    expect(savedHistory[0].articleId).toBe('1');
    expect(savedHistory[0].viewedAt).toBe(70000);
  });

  it('skips duplicate view within debounce window', () => {
    mockStorage.set.mockClear();

    const now = 100000;

    mockStorage.getString.mockReturnValue(
      JSON.stringify([
        {
          articleId: '1',
          title: 'Test',
          authorName: 'Author',
          category: 'Health',
          coverImage: '',
          viewedAt: now - 1000,
        },
      ])
    );

    jest.spyOn(Date, 'now').mockReturnValue(now);

    recordArticleView({
      articleId: '1',
      title: 'Test',
      authorName: 'Author',
      category: 'Health',
      coverImage: '',
    });

    expect(mockStorage.set).not.toHaveBeenCalled();
  });

  it('limits history to 50 items', () => {
    const history = Array.from({ length: 50 }, (_, i) => ({
      articleId: `${i}`,
      title: `Article ${i}`,
      authorName: 'Author',
      category: 'Health',
      coverImage: '',
      viewedAt: i,
    }));

    mockStorage.getString.mockReturnValue(
      JSON.stringify(history)
    );

    recordArticleView({
      articleId: 'new',
      title: 'Newest',
      authorName: 'Author',
      category: 'Health',
      coverImage: '',
    });

    const savedHistory = JSON.parse(
      mockStorage.set.mock.calls[0][1]
    );

    expect(savedHistory).toHaveLength(50);
    expect(savedHistory[0].articleId).toBe('new');
  });

  it('clears reading history', () => {
    clearReadingHistory();

    expect(mockStorage.remove).toHaveBeenCalledWith(
      'reading_history'
    );
  });
});
