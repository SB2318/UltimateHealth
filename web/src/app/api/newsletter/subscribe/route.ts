import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string) =>
  EMAIL_PATTERN.test(email.trim()) && !/[\r\n]/.test(email);

// In-memory cache capped at 5000 items to prevent memory exhaustion
const MAX_SUBSCRIBERS_CACHE = 5000;
const subscribers = new Set<string>();

function addSubscriberToCache(email: string) {
  if (subscribers.size >= MAX_SUBSCRIBERS_CACHE) {
    const firstItem = subscribers.values().next().value;
    if (firstItem) subscribers.delete(firstItem);
  }
  subscribers.add(email);
}

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

    // Generic success response to avoid subscriber enumeration
    const genericSuccess = {
      success: true,
      message: "Thank you for subscribing! You will receive our health updates.",
    };

    if (subscribers.has(trimmedEmail)) {
      return NextResponse.json(genericSuccess, { status: 200 });
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

      addSubscriberToCache(trimmedEmail);

      return NextResponse.json(genericSuccess, { status: 200 });
    } catch (backendError) {
      console.warn("Backend newsletter forward warning:", backendError);
      addSubscriberToCache(trimmedEmail);
      return NextResponse.json(genericSuccess, { status: 200 });
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}