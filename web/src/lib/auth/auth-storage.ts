/**
 * Where the access token lives between page loads.
 *
 * The backend also sets a session cookie (every request here sends
 * `credentials: "include"`), so the token is a convenience for attaching an
 * `Authorization` header — it is not the only thing keeping a session alive.
 * Keeping it behind this module means swapping localStorage for a different
 * strategy later is a one-file change.
 */

const TOKEN_KEY = "uh.auth.token";

/** Mirrors the stored value so reads work during SSR and before hydration. */
let inMemoryToken: string | null = null;

function getStore(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    // Storage can throw when cookies/site data are blocked; the in-memory copy
    // still carries the session for the life of the page.
    return null;
  }
}

export function getStoredToken(): string | null {
  if (inMemoryToken) return inMemoryToken;
  const store = getStore();
  if (!store) return null;
  try {
    inMemoryToken = store.getItem(TOKEN_KEY);
  } catch {
    inMemoryToken = null;
  }
  return inMemoryToken;
}

export function setStoredToken(token: string | null): void {
  inMemoryToken = token;
  const store = getStore();
  if (!store) return;
  try {
    if (token) {
      store.setItem(TOKEN_KEY, token);
    } else {
      store.removeItem(TOKEN_KEY);
    }
  } catch {
    // Ignore quota/permission failures — the in-memory copy is enough.
  }
}

export function clearStoredToken(): void {
  setStoredToken(null);
}
