import {fetchWithTimeout} from './ApiTimeout';

/**
 * API Call Helpers
 * 
 * This module provides an abstraction layer over all types of API calls (POST, GET, UPDATE, DELETE)
 * with support for authenticated and non-authenticated requests.
 * All functions use fetchWithTimeout to ensure requests don't hang indefinitely.
 */

/**
 * Makes an authenticated POST request with a bearer token.
 * 
 * @template T - The expected response type
 * @param url - The API endpoint URL
 * @param params - The request body data (will be JSON stringified)
 * @param authToken - The authentication bearer token
 * @returns Promise resolving to the parsed JSON response
 * @throws {ApiTimeoutError} When the request exceeds the timeout duration
 * 
 * @example
 * ```typescript
 * interface User { id: string; name: string; }
 * const user = await postMethodCallwithToken<User>(
 *   'https://api.example.com/users',
 *   { name: 'John Doe' },
 *   'your-auth-token'
 * );
 * ```
 */
export function postMethodCallwithToken<T = unknown>(
  url: string,
  params: unknown,
  authToken: string,
): Promise<T> {
  return fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(params),
  }).then(response => {
  .catch(err => console.error(err))