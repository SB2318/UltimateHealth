import {
  generateArticleShareUrl,
  generatePodcastShareUrl,
} from '../../../lib/utils/shareUtils';

describe('generateArticleShareUrl', () => {
  it('generates web article URL using pb_recordId', () => {
    const url = generateArticleShareUrl(42, 'author-1', 'pb_rec_12345');
    expect(url).toBe('https://ultimatehealth.blog/web/en/articles/pb_rec_12345');
  });

  it('falls back to articleId when recordId is empty', () => {
    const url = generateArticleShareUrl(42, 'author-1', '');
    expect(url).toBe('https://ultimatehealth.blog/web/en/articles/42');
  });
});

describe('generatePodcastShareUrl', () => {
  it('encodes podcast share parameters safely', () => {
    const trackId = 'podcast 123';
    const audioUrl =
      'https://example.com/audio.mp3?token=abc&expires=123 456';

    const url = generatePodcastShareUrl(trackId, audioUrl);
    const parsedUrl = new URL(url);

    expect(parsedUrl.searchParams.get('trackId')).toBe(trackId);
    expect(parsedUrl.searchParams.get('audioUrl')).toBe(audioUrl);
  });

  it('preserves audio URLs containing query parameters', () => {
    const audioUrl =
      'https://example.com/audio.mp3?token=abc&expires=123';

    const url = generatePodcastShareUrl('podcast-1', audioUrl);
    const parsedUrl = new URL(url);

    expect(parsedUrl.searchParams.get('audioUrl')).toBe(audioUrl);
  });
});
