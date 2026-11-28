import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

/**
 * Internal Next.js API proxy for public health resources.
 * Lets the client-side ResourcePlacement fetch without hitting CORS
 * restrictions (same pattern as /api/podcasts).
 *
 * GET /api/health-resources?placement=<name> proxies
 *   GET /v1/resource-placements/:name
 * GET /api/health-resources proxies GET /v1/health-resources
 *
 * The backend endpoints do not exist yet (404); the proxy forwards the
 * backend status so the UI can show its designed fallback.
 */
export async function GET(request: NextRequest) {
  const placement = request.nextUrl.searchParams.get("placement");

  try {
    const targetUrl = placement
      ? getApiUrl(`/v1/resource-placements/${encodeURIComponent(placement)}`)
      : getApiUrl("/v1/health-resources");

    const res = await fetch(targetUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend responded with ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Internal Health Resources API Route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
