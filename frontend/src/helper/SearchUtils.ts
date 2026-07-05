/**
 * Escapes special regex characters in a string to prevent regex injection
 * @param str - The string to escape
 * @returns The escaped string safe for use in regex patterns
 */
export const escapeRegexSpecialChars = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Sanitizes user search input by removing dangerous characters
 * and trimming whitespace
 * @param input - The raw user input
 * @returns The sanitized search string
 */
export const sanitizeSearchInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Trim whitespace from both ends
  let sanitized = input.trim();

  // Remove null bytes and control characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

  // Limit length to prevent abuse (max 500 chars)
  sanitized = sanitized.substring(0, 500);

  return sanitized;
};

/**
 * Validates search input for safe use in queries
 * @param input - The search input to validate
 * @returns True if input is valid and safe
 */
export const isValidSearchInput = (input: string): boolean => {
  if (!input || typeof input !== 'string') {
    return false;
  }

  // Check for minimum length (at least 1 character after trimming)
  if (input.trim().length === 0) {
    return false;
  }

  // Check for maximum length (kept independent of sanitizeSearchInput's
  // truncation so this function is safe to call on raw, unsanitized input too)
  if (input.length > 500) {
    return false;
  }

  return true;
};

/**
 * Creates a safe regex pattern for case-insensitive matching
 * @param searchTerm - The search term from user input
 * @returns A regex pattern that safely matches the search term
 */
export const createSafeRegexPattern = (searchTerm: string): RegExp | null => {
  try {
    const escaped = escapeRegexSpecialChars(searchTerm);
    // Use 'i' only (no 'g') - a global flag makes the returned RegExp stateful
    // across repeated .test() calls via lastIndex, which breaks case-insensitive
    // matching on subsequent calls with the same instance.
    return new RegExp(escaped, 'i');
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Failed to create regex pattern for term:', searchTerm, error);
    return null;
  }
};
