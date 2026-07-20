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