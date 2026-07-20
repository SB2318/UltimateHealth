import {
  getReadingHistory,
  recordArticleView,
  clearReadingHistory,
} from './ReadingHistoryService';

const mockStorage = {
  getString: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
};

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => mockStorage),
}));

beforeEach(() => {
  jest.clearAllMocks();

  mockStorage.getString.mockReset();
  mockStorage.set.mockReset();
  mockStorage.remove.mockReset();
});

afterEach(() => {
  jest.restoreAllMocks();
});

//First Test
describe('ReadingHistoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array when no history exists', () => {
    mockStorage.getString.mockReturnValue(undefined);

    expect(getReadingHistory()).toEqual([]);
  });
});

//Second Test
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

//Third Test
it('handles corrupted JSON safely', () => {
  mockStorage.getString.mockReturnValue('{broken');

  expect(getReadingHistory()).toEqual([]);
  expect(mockStorage.remove).toHaveBeenCalled();
});

//Fourth Test
it('records a new article view', () => {
  mockStorage.getString.mockReturnValue(undefined);

  recordArticleView({
    articleId: '1',
    title: 'Test',
    authorName: 'Author',
    category: 'Health',
    coverImage: '',
  });

  expect(mockStorage.set).toHaveBeenCalled();
});

//Fifth Test
it('clears reading history', () => {
  clearReadingHistory();

  expect(mockStorage.remove).toHaveBeenCalledWith(
    'reading_history'
  );
});

//Verify Saved Content
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

  const savedHistory = JSON.parse(
    mockStorage.set.mock.calls[0][1]
  );

  expect(savedHistory[0]).toEqual({
    articleId: '1',
    title: 'Test',
    authorName: 'Author',
    category: 'Health',
    coverImage: '',
    viewedAt: now,
  });
});

//Re-View Existing Article
it('moves existing article to front when viewed again', () => {
  const oldTime = 1000;

  mockStorage.getString.mockReturnValue(
    JSON.stringify([
      {
        articleId: '1',
        title: 'Old',
        authorName: 'Author',
        category: 'Health',
        coverImage: '',
        viewedAt: oldTime,
      },
    ])
  );

  jest.spyOn(Date, 'now').mockReturnValue(oldTime + 70000);

  recordArticleView({
    articleId: '1',
    title: 'Old',
    authorName: 'Author',
    category: 'Health',
    coverImage: '',
  });

  expect(mockStorage.set).toHaveBeenCalled();
});

//Test Debounce Behavior
it('skips duplicate view within debounce window', () => {
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