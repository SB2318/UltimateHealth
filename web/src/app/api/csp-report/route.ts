import { NextResponse } from "next/server";

/**
 * CSP Report API Endpoint
 * 
 * Receives Content-Security-Policy violation reports from the browser.
 * In a production environment, these should be logged to a monitoring service.
 */
export async function POST(request: Request) {
  try {
    const report = await request.json();
    
    // Log the violation report
    // In production, consider using a service like Sentry, Datadog, or a custom logger
    console.warn("CSP Violation Reported:", report);
    
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error processing CSP report:", error);
    return NextResponse.json({ error: "Failed to process report" }, { status: 400 });
  }
}
