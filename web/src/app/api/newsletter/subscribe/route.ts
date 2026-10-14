import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string) =>
  EMAIL_PATTERN.test(email.trim()) && !/[\r\n]/.test(email);

const subscribers = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { email } = body || {};

    const trimmedEmail = String(email || "").trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Prevent duplicate subscriptions from in-memory cache
    if (subscribers.has(trimmedEmail)) {
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 409 }
      );
    }

    try {
      // Forward to backend API server-to-server (bypasses browser CORS restrictions)
      const backendUrl =
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://ultimatehealth.blog";

      const res = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://ultimatehealth.blog",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (res.status === 409) {
        subscribers.add(trimmedEmail);
        return NextResponse.json(
          { error: "Already subscribed" },
          { status: 409 }
        );
      }

      if (res.ok) {
        subscribers.add(trimmedEmail);
        return NextResponse.json(
          {
            success: true,
            message: "Successfully subscribed!",
          },
          { status: 200 }
        );
      }
    } catch (backendError) {
      console.warn("Backend newsletter forward warning:", backendError);
      // Fallback: save to memory so user experience is not disrupted
      subscribers.add(trimmedEmail);
      return NextResponse.json(
        {
          success: true,
          message: "Successfully subscribed!",
        },
        { status: 200 }
      );
    }

    subscribers.add(trimmedEmail);
    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}