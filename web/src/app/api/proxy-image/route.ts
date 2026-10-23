import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    // In local dev, fetch will bypass SSL due to NODE_TLS_REJECT_UNAUTHORIZED
    let response = await fetch(url);
    
    if (!response.ok) {
      // Fallback to default verified health image if remote URL fails
      const fallbackUrl =
        "https://raw.githubusercontent.com/SB2318/UltimateHealth-DataSources/refs/heads/main/assets/356561546-ddbcd3a4-8c14-449f-8fd8-c9eb63b65908.png";
      response = await fetch(fallbackUrl);
      if (!response.ok) {
        return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
      }
    }

    const contentType = response.headers.get("content-type") || "image/webp";
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
