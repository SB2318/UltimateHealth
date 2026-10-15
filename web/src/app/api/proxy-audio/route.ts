import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Audio streaming proxy to bypass cross-origin resource policy (CORP) & CSP restrictions.
 * Supports HTTP Range requests for seamless audio scrubbing and buffering.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing audio URL", { status: 400 });
  }

  // Security: only allow ultimatehealth.blog audio files
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "ultimatehealth.blog" && parsed.hostname !== "localhost") {
      return new NextResponse("Host not allowed", { status: 403 });
    }
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  try {
    const rangeHeader = request.headers.get("range");
    const fetchHeaders: HeadersInit = {};
    if (rangeHeader) {
      fetchHeaders["range"] = rangeHeader;
    }

    const response = await fetch(url, {
      headers: fetchHeaders,
    });

    if (!response.ok && response.status !== 206) {
      return new NextResponse(`Failed to fetch audio: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type") || "audio/mpeg";
    const contentLength = response.headers.get("content-length");
    const contentRange = response.headers.get("content-range");
    const acceptRanges = response.headers.get("accept-ranges") || "bytes";

    const resHeaders = new Headers();
    resHeaders.set("Content-Type", contentType);
    resHeaders.set("Accept-Ranges", acceptRanges);
    resHeaders.set("Cache-Control", "public, max-age=604800, immutable");
    resHeaders.set("Access-Control-Allow-Origin", "*");
    if (contentLength) resHeaders.set("Content-Length", contentLength);
    if (contentRange) resHeaders.set("Content-Range", contentRange);

    return new NextResponse(response.body, {
      status: response.status,
      headers: resHeaders,
    });
  } catch (error) {
    console.error("Audio proxy error:", error);
    return new NextResponse("Internal Audio Proxy Error", { status: 500 });
  }
}
