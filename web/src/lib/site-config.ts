/**
 * Shared landing-page configuration. Kept out of the page components so both the
 * server-rendered sections and the small client islands can read the same values
 * without dragging one another across the server/client boundary.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://uhsocial.in";
export const HELP_CENTER_URL = process.env.NEXT_PUBLIC_HELP_CENTER_URL || "https://uhsocial.in/docs";
export const FEEDBACK_URL = process.env.NEXT_PUBLIC_FEEDBACK_URL || "https://github.com/SB2318/UltimateHealth/issues";
export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "";
export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
export const PRIVACY_POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "#";
export const TERMS_OF_USE_URL = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL || "#";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim());
