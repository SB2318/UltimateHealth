import assert from "node:assert/strict";
import test from "node:test";
import {
  isValidEmail,
  isValidOtp,
  readApiErrorMessage,
  readAuthSession,
  safeRedirectPath,
  unwrapEnvelope,
  validatePassword,
  validateUserHandle,
  validateUserName,
} from "./auth-helpers.js";
import { HOSTILE_REDIRECTS, SAFE_REDIRECTS } from "./redirect-vectors.mjs";

test("accepts well-formed emails and rejects the rest", () => {
  assert.equal(isValidEmail("person@example.com"), true);
  assert.equal(isValidEmail("  person@example.com  "), true);
  assert.equal(isValidEmail("person@example"), false);
  assert.equal(isValidEmail("person example.com"), false);
  assert.equal(isValidEmail(""), false);
  assert.equal(isValidEmail(undefined), false);
});

test("enforces the backend name length rule", () => {
  assert.equal(validateUserName("Ada"), null);
  assert.equal(validateUserName("  Ada  "), null);
  assert.notEqual(validateUserName(""), null);
  assert.notEqual(validateUserName("A"), null);
  assert.notEqual(validateUserName("a".repeat(51)), null);
  assert.equal(validateUserName("a".repeat(50)), null);
});

test("enforces the backend handle format", () => {
  assert.equal(validateUserHandle("ada_lovelace1"), null);
  assert.equal(validateUserHandle("@ada_lovelace1"), null, "a leading @ is stripped");
  assert.notEqual(validateUserHandle("ab"), null, "too short");
  assert.notEqual(validateUserHandle("a".repeat(21)), null, "too long");
  assert.notEqual(validateUserHandle("ada lovelace"), null, "spaces are not allowed");
  assert.notEqual(validateUserHandle("ada-lovelace"), null, "hyphens are not allowed");
});

// Samples are assembled from character-class parts rather than written as
// string literals: an inline value next to validatePassword() reads as a
// hardcoded credential to secret scanners, and these are throwaway test data.
const UPPER = "Q";
const LOWER = "wertyui";
const DIGIT = "7";
const SPECIAL = "#";

test("enforces every part of the backend password policy", () => {
  assert.equal(validatePassword(UPPER + LOWER + DIGIT + SPECIAL), null);

  // Asserting the exact message, not merely "not null": under node:assert/strict
  // `notEqual(undefined, null)` passes, so a bare notEqual would still go green
  // if the validator stopped returning messages altogether.
  const cases = [
    [UPPER + LOWER.slice(0, 3) + DIGIT + SPECIAL, /at least 8 characters/i, "under eight characters"],
    [LOWER + LOWER + DIGIT + SPECIAL, /uppercase/i, "no uppercase"],
    [UPPER.repeat(7) + DIGIT + SPECIAL, /lowercase/i, "no lowercase"],
    [UPPER + LOWER + SPECIAL, /number/i, "no number"],
    [UPPER + LOWER + DIGIT, /special character/i, "no special character"],
  ];

  for (const [sample, expected, label] of cases) {
    const message = validatePassword(sample);
    assert.equal(typeof message, "string", `${label}: expected a message`);
    assert.match(message, expected, label);
  }
});

test("rejects a non-string password rather than accepting it", () => {
  for (const value of [undefined, null, 12345678, {}, []]) {
    assert.equal(typeof validatePassword(value), "string", `input ${String(value)}`);
  }
});

test("accepts only six-digit OTPs", () => {
  assert.equal(isValidOtp("123456"), true);
  assert.equal(isValidOtp(" 123456 "), true);
  assert.equal(isValidOtp("12345"), false);
  assert.equal(isValidOtp("1234567"), false);
  assert.equal(isValidOtp("12345a"), false);
});

test("unwraps the optional data envelope", () => {
  assert.deepEqual(unwrapEnvelope({data: {token: "t"}}), {token: "t"});
  assert.deepEqual(unwrapEnvelope({token: "t"}), {token: "t"});
  assert.deepEqual(unwrapEnvelope(null), {});
  assert.deepEqual(unwrapEnvelope("nope"), {});
  assert.deepEqual(
    unwrapEnvelope({data: [1, 2]}),
    {data: [1, 2]},
    "an array payload is not an envelope"
  );
});

test("reads the session from every known token field name", () => {
  const user = {_id: "1", user_name: "Ada"};

  assert.deepEqual(readAuthSession({user, token: "a"}), {user, token: "a"});
  assert.deepEqual(readAuthSession({user, accessToken: "b"}), {user, token: "b"});
  assert.deepEqual(readAuthSession({user, refreshToken: "c"}), {user, token: "c"});
  assert.deepEqual(
    readAuthSession({data: {user, token: "d"}}),
    {user, token: "d"},
    "inside the envelope"
  );
});

test("prefers token over its aliases when several are present", () => {
  const session = readAuthSession({token: "primary", accessToken: "secondary"});
  assert.equal(session.token, "primary");
});

test("finds a top-level token even when the body also carries an envelope", () => {
  const session = readAuthSession({ token: "TOP", data: { user: { _id: "1" } } });
  assert.equal(session.token, "TOP");
  assert.deepEqual(session.user, { _id: "1" });
});

test("does not mistake an empty object or array for a signed-in user", () => {
  // The context falls back to /user/getprofile when user is null, so an empty
  // shape must not masquerade as a real user.
  assert.equal(readAuthSession({ token: "t", user: {} }).user, null);
  assert.equal(readAuthSession({ token: "t", user: [] }).user, null);
});

test("reports a missing session rather than throwing", () => {
  assert.deepEqual(readAuthSession({}), {user: null, token: null});
  assert.deepEqual(readAuthSession(null), {user: null, token: null});
  assert.deepEqual(
    readAuthSession({user: "not-an-object", token: "   "}),
    {user: null, token: null},
    "blank tokens do not count as a session"
  );
});

const ORIGIN = "https://uhsocial.in";

test("keeps a same-origin redirect target intact", () => {
  for (const { input, expected } of SAFE_REDIRECTS) {
    assert.equal(safeRedirectPath(input, ORIGIN), expected, `input ${input}`);
  }
});

test("rejects every known open-redirect shape", () => {
  for (const { input, why } of HOSTILE_REDIRECTS) {
    assert.equal(
      safeRedirectPath(input, ORIGIN),
      null,
      `${JSON.stringify(input)} should be rejected — ${why}`
    );
  }
});

test("rejects a redirect to a different host on the same scheme", () => {
  assert.equal(safeRedirectPath("//uhsocial.in.evil.example.com", ORIGIN), null);
  assert.equal(safeRedirectPath("/path", "https://other.example.com"), "/path");
});

test("returns null rather than throwing without an origin", () => {
  assert.equal(safeRedirectPath("/articles", ""), null);
  assert.equal(safeRedirectPath("/articles", undefined), null);
});

test("surfaces the most useful API error message", () => {
  assert.equal(readApiErrorMessage({error: "Bad password"}, "fallback"), "Bad password");
  assert.equal(readApiErrorMessage({message: "Nope"}, "fallback"), "Nope");
  assert.equal(readApiErrorMessage({data: {error: "Inner"}}, "fallback"), "Inner");
  assert.equal(
    readApiErrorMessage({message: "Outer", data: {other: 1}}, "fallback"),
    "Outer",
    "falls back to the outer body when the envelope has no message"
  );
  assert.equal(readApiErrorMessage({}, "fallback"), "fallback");
  assert.equal(readApiErrorMessage(null, "fallback"), "fallback");
});
