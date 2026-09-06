/**
 * The only place that talks to the `/user/*` authentication endpoints.
 *
 * Everything above this layer (context, hook, pages) works with plain objects
 * and `AuthError`, so swapping the backend — or putting a BFF route in front of
 * it — does not reach into the UI.
 */

import { getApiUrl } from "@/lib/api";

import { readApiErrorMessage, readAuthSession } from "./auth-helpers.js";
import { getStoredToken } from "./auth-storage";
import {
  AuthError,
  type AuthSession,
  type RegistrationResult,
  type AuthUser,
  type LoginCredentials,
  type RegisterPayload,
  type ResetPasswordPayload,
} from "./types";

/**
 * The mobile client identifies itself with `x-client-type: mobile`; the backend
 * uses this to decide between a token and a cookie session.
 */
const CLIENT_TYPE = "web";

/** `/user/login` requires an FCM token; the web client has no push registration. */
const WEB_FCM_PLACEHOLDER = "web-client-login";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
  /** Send the bearer token when one is stored. */
  authenticated?: boolean;
  fallbackError: string;
}

async function request(path: string, options: RequestOptions): Promise<unknown> {
  const { method = "POST", body, authenticated = false, fallbackError } = options;

  const headers: Record<string, string> = {
    "x-client-type": CLIENT_TYPE,
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (authenticated) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(getApiUrl(path), {
      method,
      headers,
      credentials: "include",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    // Network-level failure: there is no status and no body to read.
    throw new AuthError(
      error instanceof Error && error.message
        ? `Could not reach the server. ${error.message}`
        : "Could not reach the server.",
      0
    );
  }

  // A 204, or an HTML error page from a proxy, will not parse as JSON.
  let payload: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    throw new AuthError(
      readApiErrorMessage(payload, fallbackError),
      response.status
    );
  }

  return payload;
}

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const payload = await request("/user/login", {
    body: {
      email: credentials.email.trim(),
      password: credentials.password,
      fcmToken: WEB_FCM_PLACEHOLDER,
    },
    fallbackError: "Login failed. Please check your details and try again.",
  });

  return readAuthSession(payload) as AuthSession;
}

/**
 * Creates the account. This does NOT sign the user in.
 *
 * `/user/register` replies with a short-lived email-verification token at the
 * top level and no user. Feeding it to `sendVerificationEmail` is what actually
 * sends the mail; the user signs in afterwards. The mobile client does the same
 * — see `frontend/src/screens/auth/SignUpScreenSecond.tsx`, which keeps the
 * token in local state, posts it to `/user/verifyEmail`, then navigates to the
 * login screen. Treating this token as a session would store a credential that
 * is not one and skip email verification entirely.
 */
export async function register(payload: RegisterPayload): Promise<RegistrationResult> {
  // Doctor-only fields are rejected outright for non-doctors, so they are
  // dropped rather than sent as empty strings.
  const body: Record<string, unknown> = {
    user_name: payload.user_name.trim(),
    user_handle: payload.user_handle.trim().replace(/^@/, ""),
    email: payload.email.trim(),
    password: payload.password,
    isDoctor: payload.isDoctor,
  };

  if (payload.Profile_image) body.Profile_image = payload.Profile_image;
  if (payload.contact_detail) body.contact_detail = payload.contact_detail.trim();

  if (payload.isDoctor) {
    body.qualification = payload.qualification?.trim();
    body.specialization = payload.specialization?.trim();
    body.Years_of_experience = payload.Years_of_experience;
  }

  const response = await request("/user/register", {
    body,
    fallbackError: "Registration failed. Please check your details and try again.",
  });

  // readAuthSession is reused only to find the top-level token; the value is a
  // verification token, never a session token.
  return { verificationToken: readAuthSession(response).token };
}

/**
 * Asks the backend to send the verification mail for a freshly created account,
 * using the token `register` returned.
 */
export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<string> {
  const payload = await request("/user/verifyEmail", {
    body: { email: email.trim(), token: verificationToken },
    fallbackError: "Could not send the verification email.",
  });

  return readApiErrorMessage(payload, "Verification email sent.");
}

export async function logout(): Promise<void> {
  await request("/user/logout", {
    authenticated: true,
    fallbackError: "Could not sign you out. Please try again.",
  });
}

/** Resolves the signed-in user, or null when there is no live session. */
export async function getProfile(): Promise<AuthUser | null> {
  try {
    const payload = await request("/user/getprofile", {
      method: "GET",
      authenticated: true,
      fallbackError: "Could not load your profile.",
    });

    const session = readAuthSession(payload);
    if (session.user) return session.user as AuthUser;

    // `/user/getprofile` returns the profile directly rather than under `user`.
    if (payload && typeof payload === "object") {
      const body = payload as Record<string, unknown>;
      const inner = body.data;
      const candidate =
        inner && typeof inner === "object" && !Array.isArray(inner) ? inner : body;
      return Object.keys(candidate).length > 0 ? (candidate as AuthUser) : null;
    }
    return null;
  } catch (error) {
    // 401/403 simply means "not signed in", which is not an error worth raising.
    if (error instanceof AuthError && (error.status === 401 || error.status === 403)) {
      return null;
    }
    throw error;
  }
}

/** Sends the six-digit reset OTP to the given address. */
export async function requestPasswordReset(email: string): Promise<string> {
  const payload = await request("/user/forgotpassword", {
    body: { email: email.trim() },
    fallbackError: "Could not send the reset code. Please try again.",
  });

  return readApiErrorMessage(
    payload,
    "If that address is registered, a reset code is on its way."
  );
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<string> {
  const response = await request("/user/verifypassword", {
    body: {
      email: payload.email.trim(),
      otp: payload.otp.trim(),
      newPassword: payload.newPassword,
    },
    fallbackError: "Could not reset your password. Please try again.",
  });

  return readApiErrorMessage(response, "Your password has been reset.");
}
