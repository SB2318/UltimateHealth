import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string) =>
  EMAIL_PATTERN.test(email.trim()) && !/[\r\n]/.test(email);

const subscribers = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const trimmedEmail = String(email || "").trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Prevent duplicate subscriptions
    if (subscribers.has(trimmedEmail)) {
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 409 }
      );
    }

    // Save subscriber (temporary - in memory)
    subscribers.add(trimmedEmail);

    console.log("New subscriber:", trimmedEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}