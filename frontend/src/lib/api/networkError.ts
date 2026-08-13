/**
 * Distinguishes "the request never reached the server" from "the server
 * answered and refused".
 *
 * Only the former should fall back to cached content. A 404 or 403 is a
 * decision the server actually made, and quietly serving a stale cached copy
 * in its place would hide real errors — including an article that was taken
 * down, which matters for health content.
 *
 * Axios reports a connectivity failure as an error carrying no `response`.
 */
export const isOfflineError = (error: any): boolean => {
  if (!error) {
    return false;
  }
  if (error.response) {
    return false;
  }
  return (
    error.code === 'ERR_NETWORK' ||
    error.code === 'ECONNABORTED' ||
    error.message === 'Network Error' ||
    Boolean(error.request)
  );
};
