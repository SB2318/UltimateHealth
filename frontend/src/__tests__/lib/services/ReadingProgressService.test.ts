import {
  deleteReadingProgressItem,
  getReadingProgressItem,
  setReadingProgressItem,
} from '../../../lib/storage/MMKVUtils';
import {
  clearProgress,
  getProgress,
  saveProgress,
} from '../../../lib/services/ReadingProgressService';

jest.mock('../../../lib/storage/MMKVUtils', () => ({
  deleteReadingProgressItem: jest.fn(),
  getReadingProgressItem: jest.fn(),
  setReadingProgressItem: jest.fn(),
}));

const mockedGetReadingProgressItem =
  getReadingProgressItem as jest.MockedFunction<typeof getReadingProgressItem>;
const mockedSetReadingProgressItem =
  setReadingProgressItem as jest.MockedFunction<typeof setReadingProgressItem>;
const mockedDeleteReadingProgressItem =
  deleteReadingProgressItem as jest.MockedFunction<
    typeof deleteReadingProgressItem
  >;

describe('ReadingProgressService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedDeleteReadingProgressItem.mockResolvedValue();
    mockedSetReadingProgressItem.mockResolvedValue();
  });

  it('returns valid progress for the requested article', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(
      JSON.stringify({
        articleId: 'article-1',
        scrollPosition: 42,
        updatedAt: 123456,
      }),
    );

    await expect(getProgress('article-1')).resolves.toEqual({
      articleId: 'article-1',
      scrollPosition: 42,
      updatedAt: 123456,
    });
  });

  it('removes malformed JSON and returns null', async () => {
    mockedGetReadingProgressItem.mockResolvedValue('{broken');

    await expect(getProgress('article-1')).resolves.toBeNull();
    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('rejects progress saved for another article', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(
      JSON.stringify({
        articleId: 'article-2',
        scrollPosition: 42,
        updatedAt: 123456,
      }),
    );

    await expect(getProgress('article-1')).resolves.toBeNull();
    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('clamps saved progress to the supported range', async () => {
    await saveProgress('article-1', 150);

    const [, serialized] = mockedSetReadingProgressItem.mock.calls[0];
    expect(JSON.parse(serialized)).toMatchObject({
      articleId: 'article-1',
      scrollPosition: 100,
    });
  });

  it('clears the requested article progress', async () => {
    await clearProgress('article-1');

    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('returns null when no progress exists', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(undefined);

    await expect(getProgress('article-1')).resolves.toBeNull();

    expect(mockedDeleteReadingProgressItem).not.toHaveBeenCalled();
  });

  it('removes progress with scroll position greater than 100', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(
      JSON.stringify({
        articleId: 'article-1',
        scrollPosition: 150,
        updatedAt: 123456,
      }),
    );

    await expect(getProgress('article-1')).resolves.toBeNull();

    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('removes progress with negative scroll position', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(
      JSON.stringify({
        articleId: 'article-1',
        scrollPosition: -10,
        updatedAt: 123456,
      }),
    );

    await expect(getProgress('article-1')).resolves.toBeNull();

    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('removes progress with invalid timestamp', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(
      JSON.stringify({
        articleId: 'article-1',
        scrollPosition: 50,
        updatedAt: 0,
      }),
    );

    await expect(getProgress('article-1')).resolves.toBeNull();

    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('removes progress with non-numeric scroll position', async () => {
    mockedGetReadingProgressItem.mockResolvedValue(
      JSON.stringify({
        articleId: 'article-1',
        scrollPosition: null,
        updatedAt: 123456,
      }),
    );

    await expect(getProgress('article-1')).resolves.toBeNull();

    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

  it('clamps negative progress to 0', async () => {
    await saveProgress('article-1', -25);

    const [, serialized] = mockedSetReadingProgressItem.mock.calls[0];

    expect(JSON.parse(serialized)).toMatchObject({
      articleId: 'article-1',
      scrollPosition: 0,
    });
  });

  it('stores the current timestamp when saving progress', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(987654321);

    await saveProgress('article-1', 75);

    expect(mockedSetReadingProgressItem).toHaveBeenCalledTimes(1);

    const [, serialized] = mockedSetReadingProgressItem.mock.calls[0];

    expect(JSON.parse(serialized)).toEqual({
      articleId: 'article-1',
      scrollPosition: 75,
      updatedAt: 987654321,
    });
  });

  it('returns null even if cleanup of invalid progress fails', async () => {
    mockedGetReadingProgressItem.mockResolvedValue('{broken');

    mockedDeleteReadingProgressItem.mockRejectedValue(
      new Error('Storage error'),
    );

    await expect(getProgress('article-1')).resolves.toBeNull();

    expect(mockedDeleteReadingProgressItem).toHaveBeenCalledWith(
      'reading_progress_article-1',
    );
  });

});
