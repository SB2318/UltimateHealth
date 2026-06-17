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
export default function proxy(request: NextRequest) {
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
   * - img-src: Allow same origin, blobs, data URIs, and trusted image providers
   * - connect-src: Restrict to same origin and specific API endpoints
   * - report-uri: Send violations to our API endpoint for monitoring
   */
  const cspDirectives = [
    "default-src 'self'",
    isDev
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'" // unsafe-eval required for Next.js HMR/Fast Refresh
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
      // The application currently uses inline React styles and
      // framework-generated styling. Removing 'unsafe-inline'
      // would require migration to a nonce- or hash-based approach.  
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' blob: data: https://raw.githubusercontent.com https://github.com https://user-images.githubusercontent.com https://avatars.githubusercontent.com",
    // IMPORTANT:
// If new external services are integrated (APIs, analytics,
// monitoring, authentication providers, etc.), their origins
// must be added to connect-src. Otherwise browser requests
// will be blocked by the Content Security Policy.
    "connect-src 'self' https://uhsocial.in https://api.github.com" + (isDev ? " http: ws:" : ""),
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
  ];

  if (!isDev) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  const csp = cspDirectives.join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

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
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
