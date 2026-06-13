const URL_REPORT_FIELDS = new Set([
  "blocked-uri",
  "document-uri",
  "referrer",
  "source-file",
]);

const LOGGED_REPORT_FIELDS = new Set([
  "blocked-uri",
  "column-number",
  "disposition",
  "document-uri",
  "effective-directive",
  "line-number",
  "original-policy",
  "referrer",
  "script-sample",
  "source-file",
  "status-code",
  "violated-directive",
]);

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sanitizeLogValue(value) {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  ) {
    return value;
  }

  return "";
}

/**
 * Sanitizes query parameters, fragments, and tokens from a URL string to
 * prevent sensitive data exposure in logs.
 */
export function sanitizeUrl(url) {
  if (typeof url !== "string") return "";

  try {
    const parsed = new URL(url);
    if (parsed.search) parsed.search = "?[redacted]";
    if (parsed.hash) parsed.hash = "#[redacted]";
    return parsed.toString();
  } catch {
    const queryIndex = url.indexOf("?");
    const hashIndex = url.indexOf("#");
    const sensitiveIndexes = [queryIndex, hashIndex].filter((index) => index !== -1);

    if (sensitiveIndexes.length === 0) return url;

    const firstSensitiveIndex = Math.min(...sensitiveIndexes);
    const marker = url[firstSensitiveIndex] === "?" ? "?[redacted]" : "#[redacted]";
    return url.substring(0, firstSensitiveIndex) + marker;
  }
}

export function sanitizeCspReport(report) {
  if (!isPlainObject(report)) return undefined;

  const sanitizedReport = {};

  for (const [field, value] of Object.entries(report)) {
    if (!LOGGED_REPORT_FIELDS.has(field)) continue;

    sanitizedReport[field] = URL_REPORT_FIELDS.has(field)
      ? sanitizeUrl(value)
      : sanitizeLogValue(value);
  }

  return sanitizedReport;
}
