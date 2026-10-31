import { resolveDeepLinkTarget } from '../../../lib/platform/DeepLinkService';
import * as ExpoLinking from 'expo-linking';

jest.mock('expo-linking', () => ({
  createURL: jest.fn(() => 'ultimatehealth://'),
  parse: jest.fn((url: string) => {
    const urlObject = new URL(url);

    return {
      path: (urlObject.hostname + urlObject.pathname).replace(/^\/+/, ''),
      queryParams: {},
      scheme: urlObject.protocol.replace(':', ''),
      hostname: urlObject.hostname,
    };
  }),
}));

describe('DeepLinkService', () => {
  describe('resolveDeepLinkTarget', () => {
    it('should correctly resolve the create-post deep link', () => {
      (ExpoLinking.parse as jest.Mock).mockReturnValueOnce({
        path: 'create-post',
        queryParams: {},
        scheme: 'ultimatehealth',
        hostname: '',
      });

      const url = 'ultimatehealth://create-post';
      const result = resolveDeepLinkTarget(url);

      expect(result).toEqual({
        name: 'ArticleDescriptionScreen',
        params: {
          article: undefined,
          htmlContent: undefined,
          translationSource: undefined,
        },
        requiresAuth: true,
      });
    });

    it('should resolve https://ultimatehealth.blog/web/en/articles/{pb_recordId} deep links', () => {
      (ExpoLinking.parse as jest.Mock).mockReturnValueOnce({
        path: 'web/en/articles/pb_rec_abc123',
        queryParams: {},
        scheme: 'https',
        hostname: 'ultimatehealth.blog',
      });

      const url = 'https://ultimatehealth.blog/web/en/articles/pb_rec_abc123';
      const result = resolveDeepLinkTarget(url);

      expect(result).toEqual({
        name: 'ArticleScreen',
        params: {
          articleId: 'pb_rec_abc123',
          authorId: undefined,
          recordId: 'pb_rec_abc123',
        },
        requiresAuth: false,
      });
    });
  });
});
