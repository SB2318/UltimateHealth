import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeCspReport, sanitizeUrl } from "./sanitizeCspReport.js";

test("sanitizeUrl redacts URL query parameters and fragments", () => {
  assert.equal(
    sanitizeUrl("https://example.com/account?token=secret#session=also-secret"),
    "https://example.com/account?[redacted]#[redacted]",
  );
});

test("sanitizeUrl redacts query parameters from non-standard URL strings", () => {
  assert.equal(sanitizeUrl("/account?token=secret"), "/account?[redacted]");
});

test("sanitizeCspReport keeps only sanitized CSP report log fields", () => {
  const sanitizedReport = sanitizeCspReport({
    "document-uri": "https://health.example/patient?token=secret",
    referrer: "https://referrer.example/path?session=secret",
    "blocked-uri": "https://cdn.example/script.js?apiKey=secret",
    "source-file": "https://health.example/app.js#access-token",
    "violated-directive": "script-src-elem",
    "line-number": 42,
    "status-code": 200,
    metadata: { authorization: "Bearer secret" },
  });

  assert.deepEqual(sanitizedReport, {
    "document-uri": "https://health.example/patient?[redacted]",
    referrer: "https://referrer.example/path?[redacted]",
    "blocked-uri": "https://cdn.example/script.js?[redacted]",
    "source-file": "https://health.example/app.js#[redacted]",
    "violated-directive": "script-src-elem",
    "line-number": 42,
    "status-code": 200,
  });
});

test("sanitizeCspReport returns undefined for invalid report payloads", () => {
  assert.equal(sanitizeCspReport(undefined), undefined);
  assert.equal(sanitizeCspReport(null), undefined);
  assert.equal(sanitizeCspReport("not a report"), undefined);
});
