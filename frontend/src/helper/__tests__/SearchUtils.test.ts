import {
  escapeRegexSpecialChars,
  sanitizeSearchInput,
  isValidSearchInput,
  createSafeRegexPattern,
} from '../SearchUtils';

describe('SearchUtils', () => {
  describe('escapeRegexSpecialChars', () => {
    it('should escape regex special characters', () => {
      expect(escapeRegexSpecialChars('C++')).toBe('C\\+\\+');
      expect(escapeRegexSpecialChars('test.*')).toBe('test\\.\\*');
      expect(escapeRegexSpecialChars('[abc]')).toBe('\\[abc\\]');
      expect(escapeRegexSpecialChars('(group)')).toBe('\\(group\\)');
    });

    it('should handle normal text', () => {
      expect(escapeRegexSpecialChars('hello world')).toBe('hello world');
      expect(escapeRegexSpecialChars('test123')).toBe('test123');
    });

    it('should handle empty and null inputs', () => {
      expect(escapeRegexSpecialChars('')).toBe('');
      expect(escapeRegexSpecialChars(' ')).toBe(' ');
    });
  });

  describe('sanitizeSearchInput', () => {
    it('should trim whitespace', () => {
      expect(sanitizeSearchInput('  hello  ')).toBe('hello');
      expect(sanitizeSearchInput('  test  ')).toBe('test');
    });

    it('should remove control characters', () => {
      const inputWithControlChar = 'hello\x00world';
      expect(sanitizeSearchInput(inputWithControlChar)).toBe('helloworld');
    });

    it('should limit length to 500 characters', () => {
      const longString = 'a'.repeat(600);
      expect(sanitizeSearchInput(longString).length).toBe(500);
    });

    it('should handle normal input', () => {
      expect(sanitizeSearchInput('C++')).toBe('C++');
      expect(sanitizeSearchInput('test search')).toBe('test search');
    });

    it('should handle null/empty input', () => {
      expect(sanitizeSearchInput('')).toBe('');
    });
  });

  describe('isValidSearchInput', () => {
    it('should validate correct input', () => {
      expect(isValidSearchInput('test')).toBe(true);
      expect(isValidSearchInput('C++')).toBe(true);
      expect(isValidSearchInput('hello world')).toBe(true);
    });

    it('should reject empty input', () => {
      expect(isValidSearchInput('')).toBe(false);
      expect(isValidSearchInput('   ')).toBe(false);
    });

    it('should reject input longer than 500 characters', () => {
      const longString = 'a'.repeat(501);
      expect(isValidSearchInput(longString)).toBe(false);
    });

    it('should reject null input', () => {
      expect(isValidSearchInput(null as any)).toBe(false);
    });
  });

  describe('createSafeRegexPattern', () => {
    it('should create valid regex for safe terms', () => {
      const pattern = createSafeRegexPattern('test');
      expect(pattern).not.toBeNull();
      expect(pattern?.test('TEST')).toBe(true);
    });

    it('should escape special characters in pattern', () => {
      const pattern = createSafeRegexPattern('C++');
      expect(pattern).not.toBeNull();
      expect(pattern?.test('C++')).toBe(true);
    });

    it('should be case insensitive', () => {
      const pattern = createSafeRegexPattern('hello');
      expect(pattern?.test('HELLO')).toBe(true);
      expect(pattern?.test('Hello')).toBe(true);
    });
  });
});
