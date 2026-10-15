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

    const { name, email, subject, message, attachments, attachment } = body || {};
    const trimmedName = String(name || "").trim().slice(0, 100);
    const trimmedEmail = String(email || "").trim().toLowerCase();
    const trimmedSubject = String(subject || "").trim().slice(0, 160);
    const trimmedMessage = String(message || "").trim();

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

    const allAttachments = Array.isArray(attachments)
      ? attachments
      : attachment
      ? [attachment]
      : [];

    const forwardPayload: Record<string, any> = {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    };

    if (allAttachments.length > 0) {
      forwardPayload.attachments = allAttachments;
    }

    try {
      // Forward to backend contact endpoint
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://ultimatehealth.blog",
        },
        body: JSON.stringify(forwardPayload),
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
