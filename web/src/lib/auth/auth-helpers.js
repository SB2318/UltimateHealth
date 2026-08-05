/**
 * Pure helpers shared by the authentication service, context and forms.
 *
 * These deliberately hold no React or network code so the rules that must match
 * the backend — password strength, handle format, response envelope — can be
 * unit tested on their own.
 */

/** Backend accepts 2-50 characters for a display name. */
export const USER_NAME_MIN = 2;
export const USER_NAME_MAX = 50;

/** Backend accepts 3-20 characters, alphanumeric or underscore, for a handle. */
export const USER_HANDLE_MIN = 3;
export const USER_HANDLE_MAX = 20;

/** Backend requires 8+ chars with an upper, lower, number and special char. */
export const PASSWORD_MIN = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_PATTERN = /^[A-Za-z0-9_]+$/;
const OTP_PATTERN = /^\d{6}$/;

/**
 * @param {unknown} value
 * @returns {string}
 */
function asTrimmedString(value) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * @param {unknown} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return EMAIL_PATTERN.test(asTrimmedString(email));
}

/**
 * @param {unknown} name
 * @returns {string | null} an error message, or null when valid
 */
export function validateUserName(name) {
  const value = asTrimmedString(name);
  if (!value) return "Enter your name.";
  if (value.length < USER_NAME_MIN || value.length > USER_NAME_MAX) {
    return `Name must be between ${USER_NAME_MIN} and ${USER_NAME_MAX} characters.`;
  }
  return null;
}

/**
 * @param {unknown} handle
 * @returns {string | null} an error message, or null when valid
 */
export function validateUserHandle(handle) {
  const value = asTrimmedString(handle).replace(/^@/, "");
  if (!value) return "Choose a handle.";
  if (value.length < USER_HANDLE_MIN || value.length > USER_HANDLE_MAX) {
    return `Handle must be between ${USER_HANDLE_MIN} and ${USER_HANDLE_MAX} characters.`;
  }
  if (!HANDLE_PATTERN.test(value)) {
    return "Handle can only contain letters, numbers and underscores.";
  }
  return null;
}

/**
 * Mirrors the backend password policy so the user is told what is wrong before
 * a round trip rather than after one.
 *
 * @param {unknown} password
 * @returns {string | null} an error message, or null when valid
 */
export function validatePassword(password) {
  const value = typeof password === "string" ? password : "";
  if (value.length < PASSWORD_MIN) {
    return `Password must be at least ${PASSWORD_MIN} characters.`;
  }
  if (!/[a-z]/.test(value)) return "Password must include a lowercase letter.";
  if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter.";
  if (!/\d/.test(value)) return "Password must include a number.";
  if (!/[^A-Za-z0-9]/.test(value)) {
    return "Password must include a special character.";
  }
  return null;
}

/**
 * @param {unknown} otp
 * @returns {boolean}
 */
export function isValidOtp(otp) {
  return OTP_PATTERN.test(asTrimmedString(otp));
}

/**
 * The API sometimes wraps its payload in an extra `data` envelope, so callers
 * cannot assume the body is the payload.
 *
 * @param {unknown} payload
 * @returns {Record<string, unknown>}
 */
export function unwrapEnvelope(payload) {
  if (!payload || typeof payload !== "object") return {};
  const body = /** @type {Record<string, unknown>} */ (payload);
  const inner = body.data;
  if (inner && typeof inner === "object" && !Array.isArray(inner)) {
    return /** @type {Record<string, unknown>} */ (inner);
  }
  return body;
}

/**
 * Reads the session out of a login/register response. The token sits at the top
 * level of the payload — never inside `user` — and the field name varies by
 * endpoint, so all three known aliases are accepted.
 *
 * @param {unknown} payload
 * @returns {{user: Record<string, unknown> | null, token: string | null}}
 */
export function readAuthSession(payload) {
  const body = unwrapEnvelope(payload);
  const token =
    asTrimmedString(body.token) ||
    asTrimmedString(body.accessToken) ||
    asTrimmedString(body.refreshToken);

  const user =
    body.user && typeof body.user === "object"
      ? /** @type {Record<string, unknown>} */ (body.user)
      : null;

  return { user, token: token || null };
}

/**
 * Resolves a caller-supplied post-login destination to a safe same-origin path,
 * or null when it points anywhere else.
 *
 * A `startsWith("/") && !startsWith("//")` check is NOT enough. Browsers treat a
 * backslash as a path separator in http(s) URLs and strip control characters
 * while parsing, so `/\evil.com`, `/\/evil.com` and `/<TAB>/evil.com` all
 * navigate off-site despite passing that test. Resolving against the real origin
 * and comparing origins is the only reliable check — plus a final guard against
 * `/..//evil.com`, which resolves same-origin but yields a protocol-relative path.
 *
 * @param {unknown} candidate the untrusted `next` value
 * @param {string} origin the current origin, e.g. `window.location.origin`
 * @returns {string | null} a path safe to navigate to, or null
 */
export function safeRedirectPath(candidate, origin) {
  if (!candidate || typeof candidate !== "string" || !origin) return null;

  // Strip the characters a URL parser would drop, so they cannot smuggle a
  // authority section past the leading-slash check.
  const cleaned = candidate.replace(/[\u0000-\u001F\u007F]/g, "");
  if (!cleaned.startsWith("/")) return null;

  try {
    const url = new URL(cleaned, origin);
    if (url.origin !== origin) return null;

    const path = `${url.pathname}${url.search}${url.hash}`;
    if (path.startsWith("//")) return null;
    return path;
  } catch {
    return null;
  }
}

/**
 * Pulls the most useful message out of an error body, which may use `error`,
 * `message`, or nest either inside the `data` envelope.
 *
 * @param {unknown} payload
 * @param {string} fallback
 * @returns {string}
 */
export function readApiErrorMessage(payload, fallback) {
  const body = unwrapEnvelope(payload);
  const direct = asTrimmedString(body.error) || asTrimmedString(body.message);
  if (direct) return direct;

  // `unwrapEnvelope` prefers the inner object, so check the outer one too.
  if (payload && typeof payload === "object") {
    const outer = /** @type {Record<string, unknown>} */ (payload);
    const outerMessage =
      asTrimmedString(outer.error) || asTrimmedString(outer.message);
    if (outerMessage) return outerMessage;
  }

  return fallback;
}
