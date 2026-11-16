import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

/**
 * Internal Next.js API proxy for podcasts:
 * Allows client-side browser pagination and filtering without hitting CORS restrictions.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";
  const endpoint = searchParams.get("endpoint") === "user-published" ? "user-published" : "published-podcasts";

  try {
    const targetUrl = getApiUrl(`/podcast/${endpoint}?page=${page}&limit=${limit}`);
    const res = await fetch(targetUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend responded with ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Internal Podcasts API Route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
