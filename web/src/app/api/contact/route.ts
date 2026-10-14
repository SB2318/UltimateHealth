import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string) =>
  EMAIL_PATTERN.test(email.trim()) && !/[\r\n]/.test(email);

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

    const { name, email, subject, message } = body || {};
    const trimmedName = String(name || "").trim().slice(0, 80);
    const trimmedEmail = String(email || "").trim().toLowerCase();
    const trimmedSubject = String(subject || "").trim().slice(0, 120);
    const trimmedMessage = String(message || "").trim().slice(0, 2000);

    if (!trimmedName || !isValidEmail(trimmedEmail) || !trimmedSubject || !trimmedMessage) {
      return NextResponse.json(
        { error: "Valid name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const backendUrl =
      process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://ultimatehealth.blog";

    try {
      // Forward to backend API server-to-server
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://ultimatehealth.blog",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        }),
      });

      if (res.ok) {
        return NextResponse.json(
          { success: true, message: "Message sent successfully!" },
          { status: 200 }
        );
      }
    } catch (backendError) {
      console.warn("Backend contact forward warning:", backendError);
    }

    // Fallback response so user experience is not disrupted
    return NextResponse.json(
      { success: true, message: "Message received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact message error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
