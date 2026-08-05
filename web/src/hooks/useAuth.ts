"use client";

import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import type { AuthContextValue } from "@/lib/auth/types";

/**
 * Reads the current session.
 *
 * Throws outside `<AuthProvider>` rather than returning a signed-out shape,
 * because a silently unauthenticated app is far harder to debug than a crash
 * pointing at the missing provider.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside <AuthProvider>. It is mounted in app/[locale]/layout.tsx."
    );
  }

  return context;
}
