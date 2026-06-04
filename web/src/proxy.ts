import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

export default function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  const nonce = crypto.randomUUID().replace(/-/g, "");

  const csp = isDev
    ? [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
        "font-src 'self' https://cdnjs.cloudflare.com",
        "img-src 'self' data: blob: https:",
        "connect-src 'self' http: https: ws:",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
      ].join("; ")
    : [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
        "style-src 'self' https://cdnjs.cloudflare.com",
        "font-src 'self' https://cdnjs.cloudflare.com",
        "img-src 'self' data: blob: https:",
        "connect-src 'self' https:",
        "object-src 'none'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
      ].join("; ");

  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains"
  );

  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};