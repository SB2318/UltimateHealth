import { NextResponse } from "next/server";
import { sanitizeCspReport } from "./sanitizeCspReport";

/**
 * CSP Report API Endpoint
 * 
 * Receives Content-Security-Policy violation reports from the browser.
 * In production, these logs are sanitized before reporting.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let report: Record<string, unknown>;

    try {
      report = JSON.parse(rawBody);
    } catch (jsonError) {
      console.error("CSP Report: Error parsing JSON body:", jsonError);
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const cspReport = sanitizeCspReport(report?.["csp-report"]);

    // Log the violation report (or forward to monitoring service like Sentry)
    if (cspReport) {
      console.warn("CSP Violation Reported:", cspReport);
    } else {
      console.warn("CSP Violation Reported: Missing or invalid csp-report payload");
    }

    // Return 204 No Content as recommended to prevent response feedback loops
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("CSP Report: Unexpected error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
