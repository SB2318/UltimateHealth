import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

/**
 * Internal Next.js API proxy for a single podcast:
 * Allows client-side browser navigation without hitting CORS restrictions.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const targetUrl = getApiUrl(`/podcast/details?podcast_id=${encodeURIComponent(id)}`);
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
    console.error("Internal Podcast Detail API Route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
