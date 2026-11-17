import { NextRequest, NextResponse } from "next/server";

const ALLOWED_IMAGE_HOSTS = new Set([
  "ultimatehealth.blog",
  "uhsocial.in",
  "raw.githubusercontent.com",
  "github.com",
  "user-images.githubusercontent.com",
  "avatars.githubusercontent.com",
  "images.unsplash.com",
  "images.pexels.com",
  "picsum.photos",
  "encrypted-tbn0.gstatic.com",
]);

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

const FALLBACK_URL =
  "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";

function isAllowedHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (ALLOWED_IMAGE_HOSTS.has(lower)) return true;
  // Allow subdomains of trusted CDN hosts
  if (lower.endsWith(".githubusercontent.com") || lower.endsWith(".unsplash.com") || lower.endsWith(".pexels.com")) {
    return true;
  }
  // Allow localhost only in local development
  if (process.env.NODE_ENV === "development" && (lower === "localhost" || lower === "127.0.0.1")) {
    return true;
  }
  return false;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const urlParam = searchParams.get("url");

  if (!urlParam) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(urlParam);
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  // Security: Disallow non-http/https protocols
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return new NextResponse("Invalid protocol", { status: 400 });
  }

  // Security: Disallow non-HTTPS unless in local development
  if (parsed.protocol !== "https:" && process.env.NODE_ENV !== "development") {
    return new NextResponse("HTTPS required", { status: 400 });
  }

  // Security: Enforce domain whitelist (prevent SSRF to internal/cloud metadata/private IPs)
  if (!isAllowedHost(parsed.hostname)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  try {
    let response = await fetch(parsed.toString(), {
      redirect: "error", // Prevent open redirect SSRF bypasses
    });

    if (!response.ok) {
      // Fallback to default verified health image if remote URL fails
      response = await fetch(FALLBACK_URL, { redirect: "error" });
      if (!response.ok) {
        return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
      }
    }

    const rawContentType = response.headers.get("content-type") || "image/webp";
    const mimeType = rawContentType.split(";")[0].trim().toLowerCase();

    if (!ALLOWED_CONTENT_TYPES.has(mimeType)) {
      return new NextResponse("Invalid image content type", { status: 415 });
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
