"use client";

/**
 * Holds the single source of truth for who is signed in.
 *
 * Mounted once in the locale layout, so any client component can read the
 * session through `useAuth()` without prop drilling or a second profile fetch.
 */

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import * as authService from "@/lib/auth/auth-service";
import { clearStoredToken, setStoredToken } from "@/lib/auth/auth-storage";
import type {
  AuthContextValue,
  AuthStatus,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/lib/auth/types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  // Late-resolving requests must not overwrite a newer session (or a sign-out
  // that happened while they were in flight).
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const applySession = useCallback((nextUser: AuthUser | null) => {
    if (!isMountedRef.current) return;
    setUser(nextUser);
    setStatus(nextUser ? "authenticated" : "unauthenticated");
  }, []);

  const refresh = useCallback(async () => {
    try {
      const profile = await authService.getProfile();
      applySession(profile);
    } catch {
      // A failed check means we cannot prove a session, so treat it as signed
      // out rather than leaving the app stuck on "loading".
      applySession(null);
    }
  }, [applySession]);

  // Restore the session on first mount so a refresh does not sign the user out.
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const session = await authService.login(credentials);
      if (session.token) setStoredToken(session.token);

      // Some deployments return only the token, so fall back to the profile
      // endpoint rather than reporting a signed-in user we cannot describe.
      const nextUser = session.user ?? (await authService.getProfile());
      applySession(nextUser);
      return nextUser;
    },
    [applySession]
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    // Registration never produces a session. `/user/register` returns an
    // email-verification token, and posting it back to `/user/verifyEmail` is
    // what sends the mail; the user signs in afterwards. Storing that token as
    // a session would put a non-credential in the Authorization header and skip
    // verification entirely.
    const { verificationToken } = await authService.register(payload);

    if (isMountedRef.current) setStatus("unauthenticated");

    if (!verificationToken) {
      return {
        verificationEmailSent: false,
        message:
          "Account created, but no verification email could be requested. Try signing in, or use the resend option.",
      };
    }

    try {
      const message = await authService.sendVerificationEmail(
        payload.email,
        verificationToken
      );
      return { verificationEmailSent: true, message };
    } catch (error) {
      // The account exists — reporting a failed registration here would push the
      // user to submit again and hit a duplicate-account error.
      return {
        verificationEmailSent: false,
        message:
          error instanceof Error
            ? `Account created, but the verification email failed to send: ${error.message}`
            : "Account created, but the verification email failed to send.",
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      // Clear locally even if the call failed — the user asked to sign out.
      clearStoredToken();
      applySession(null);
    }
  }, [applySession]);

  const requestPasswordReset = useCallback(
    (email: string) => authService.requestPasswordReset(email),
    []
  );

  const resetPassword = useCallback(
    (payload: ResetPasswordPayload) => authService.resetPassword(payload),
    []
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      loading: status === "loading",
      isAuthenticated: status === "authenticated",
      login,
      register,
      logout,
      requestPasswordReset,
      resetPassword,
      refresh,
    }),
    [user, status, login, register, logout, requestPasswordReset, resetPassword, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
