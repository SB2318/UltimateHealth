import { isPathSafe } from '../helper/Utils';

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/data/user/0/com.ultimatehealth/files',
  ExternalDirectoryPath: '/storage/emulated/0/Android/data/com.ultimatehealth/files',
  exists: jest.fn(),
  mkdir: jest.fn(),
  downloadFile: jest.fn(),
  unlink: jest.fn(),
  read: jest.fn(),
}));

describe('Podcast Offline Resiliency Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isPathSafe', () => {
    it('allows safe sandboxed paths', () => {
      const safePath = '/data/user/0/com.ultimatehealth/files/podcast_123.mp3';
      expect(isPathSafe(safePath)).toBe(true);
    });

    it('blocks directory traversal outside of DocumentDirectoryPath using relative paths', () => {
      const unsafePath = '/data/user/0/com.ultimatehealth/files/../secret.txt';
      expect(isPathSafe(unsafePath)).toBe(false);
    });

    it('blocks paths that are completely outside the sandboxed directory', () => {
      const unsafePath = '/etc/passwd';
      expect(isPathSafe(unsafePath)).toBe(false);
    });
  });
});
