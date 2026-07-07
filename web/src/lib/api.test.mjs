import assert from "node:assert/strict";
import test from "node:test";
import { normalizeApiUrl } from "./api-url.mjs";

const baseUrls = [
  "https://example.com",
  "https://example.com/",
  "https://example.com/api",
  "https://example.com/api/",
];
const paths = ["user/login", "/user/login", "api/user/login", "/api/user/login"];

test("normalizes API base URLs and request paths", () => {
  for (const baseUrl of baseUrls) {
    for (const path of paths) {
      assert.equal(
        normalizeApiUrl(baseUrl, path),
        "https://example.com/api/user/login",
        `${baseUrl} with ${path}`
      );
    }
  }
});

test("collapses extra boundary slashes without changing nested paths", () => {
  assert.equal(
    normalizeApiUrl("https://example.com///", "///api///admin/login"),
    "https://example.com/api/admin/login"
  );
});

test("returns the API root when the request path is empty or api", () => {
  assert.equal(normalizeApiUrl("https://example.com", ""), "https://example.com/api");
  assert.equal(normalizeApiUrl("https://example.com/", "/api/"), "https://example.com/api");
});
