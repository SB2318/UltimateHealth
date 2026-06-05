import { NextResponse } from "next/server";

/**
 * Sanitizes query parameters and tokens from a URL string to prevent
 * sensitive data exposure in logs.
 */
function sanitizeUrl(url: any): string {
  if (typeof url !== "string") return "";
  try {
    const parsed = new URL(url);
    if (parsed.search) {
      parsed.search = "?[redacted]";
    }
    return parsed.toString();
  } catch {
    const qIndex = url.indexOf("?");
    return qIndex !== -1 ? url.substring(0, qIndex) + "?[redacted]" : url;
  }
}

/**
 * CSP Report API Endpoint
 * 
 * Receives Content-Security-Policy violation reports from the browser.
 * In production, these logs are sanitized before reporting.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let report: any;
    
    try {
      report = JSON.parse(rawBody);
    } catch (jsonError) {
      console.error("CSP Report: Error parsing JSON body:", jsonError);
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }
    
    // Sanitize the report fields to prevent leaking sensitive tokens in logs
    const cspReport = report?.["csp-report"];
    if (cspReport) {
      if (cspReport["document-uri"]) {
        cspReport["document-uri"] = sanitizeUrl(cspReport["document-uri"]);
      }
      if (cspReport["referrer"]) {
        cspReport["referrer"] = sanitizeUrl(cspReport["referrer"]);
      }
      if (cspReport["blocked-uri"]) {
        cspReport["blocked-uri"] = sanitizeUrl(cspReport["blocked-uri"]);
      }
    }
    
    // Log the violation report (or forward to monitoring service like Sentry)
    console.warn("CSP Violation Reported:", report);
    
    // Return 204 No Content as recommended to prevent response feedback loops
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("CSP Report: Unexpected error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
