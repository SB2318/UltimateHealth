import {generatePodcastShareUrl} from '../shareUtils';

jest.mock('../APIUtils', () => ({
  SHARE_BASE_URL: 'https://ultimatehealth.example',
}));

describe('generatePodcastShareUrl', () => {
  it('encodes podcast track and audio URL query parameters', () => {
    const url = generatePodcastShareUrl(
      'track 42',
      'https://cdn.example.com/audio file.mp3?token=a+b&quality=high',
    );

    expect(url).toBe(
      'https://ultimatehealth.example/api/share/podcast?trackId=track%2042&audioUrl=https%3A%2F%2Fcdn.example.com%2Faudio%20file.mp3%3Ftoken%3Da%2Bb%26quality%3Dhigh',
    );
  });
});
