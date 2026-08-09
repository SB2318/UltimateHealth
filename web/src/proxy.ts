import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  const nonce = btoa(
    Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => String.fromCharCode(b))
      .join("")
  );

  const cspDirectives = [
    "default-src 'self'",
    isDev
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' blob: data: https://raw.githubusercontent.com https://github.com https://user-images.githubusercontent.com https://avatars.githubusercontent.com https://uhsocial.in",
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

  const intlResponse = intlMiddleware(request);

  if (intlResponse.headers.get("location")) {
    applySecurityHeaders(intlResponse, csp, nonce);
    return intlResponse;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  intlResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  applySecurityHeaders(response, csp, nonce);
  return response;
}

function applySecurityHeaders(
  response: NextResponse,
  csp: string,
  nonce: string
) {
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), autoplay=(), fullscreen=(self), payment=(), usb=(), gyroscope=(), magnetometer=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
