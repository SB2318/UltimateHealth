import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security Middleware for UltimateHealth Web
 * 
 * Implements:
 * - Content Security Policy (CSP) with Nonces
 * - Security Headers (HSTS, X-Frame-Options, etc.)
 * - Permissions Policy
 */
export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  // Generate a cryptographically strong nonce for CSP
  // Uses 16 bytes (128 bits) of entropy, Base64 encoded
  // Standard UUIDs are less ideal for nonces than random bytes
  const nonce = btoa(
    Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => String.fromCharCode(b))
      .join("")
  );

  /**
   * CSP Configuration
   * - default-src: Restrict to same origin
   * - script-src: Use nonces in production with strict-dynamic, allow unsafe-eval in dev for HMR
   * - style-src: Allow same origin and inline styles
   * - img-src: Allow same origin, blobs, data URIs, and specific GitHub domains
   * - connect-src: Restrict to same origin and https (plus http/ws in dev)
   * - report-uri: Send violations to our API endpoint for monitoring
   */
  const cspDirectives = [
    "default-src 'self'",
    isDev
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' blob: data: https://raw.githubusercontent.com https://github.com https://user-images.githubusercontent.com",
    "connect-src 'self'" + (isDev ? " http: https: ws:" : " https:"),
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
  ];

  if (!isDev) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  const csp = cspDirectives.join("; ");

  const response = NextResponse.next();

  // Set CSP and Nonce headers
  // The x-nonce header is used by RootLayout to inject the nonce into rendered scripts
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);

  // Standard Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions Policy: Harden browser capability restrictions
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), autoplay=(), fullscreen=(self), payment=(), usb=(), gyroscope=(), magnetometer=()"
  );

  // HSTS: 2 years duration, include subdomains and enable preloading
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Cross-Origin Isolation Policies
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return response;
}

// Next.js Middleware configuration
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
