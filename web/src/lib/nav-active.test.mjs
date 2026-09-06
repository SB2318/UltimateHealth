import assert from "node:assert/strict";
import test from "node:test";
import { isNavRouteActive } from "./nav-active.js";

const LOCALES = ["en", "de", "es", "fr", "hr"];
const BASE_PATH = "/frontend/v2";

test("matches the route in local development, where there is no base path", () => {
  assert.equal(isNavRouteActive("/articles", "/articles", { locales: LOCALES }), true);
  assert.equal(isNavRouteActive("/en/articles", "/articles", { locales: LOCALES }), true);
});

test("matches the route behind the deployment base path and locale segment", () => {
  const options = { basePath: BASE_PATH, locales: LOCALES };

  for (const locale of LOCALES) {
    assert.equal(
      isNavRouteActive(`${BASE_PATH}/${locale}/articles`, "/articles", options),
      true,
      `locale ${locale}`
    );
  }

  assert.equal(isNavRouteActive(`${BASE_PATH}/articles`, "/articles", options), true);
});

test("keeps the articles entry active while reading a single article", () => {
  const options = { basePath: BASE_PATH, locales: LOCALES };

  assert.equal(isNavRouteActive(`${BASE_PATH}/en/articles/abc123`, "/articles", options), true);
  assert.equal(isNavRouteActive("/en/articles/abc123", "/articles", options), true);
});

test("does not match a different route", () => {
  const options = { basePath: BASE_PATH, locales: LOCALES };

  assert.equal(isNavRouteActive(`${BASE_PATH}/en/contribute`, "/articles", options), false);
  assert.equal(isNavRouteActive(`${BASE_PATH}/en`, "/articles", options), false);
  assert.equal(isNavRouteActive(`${BASE_PATH}/en/medical-glossary`, "/articles", options), false);
});

test("matches whole segments only, never a partial prefix", () => {
  const options = { basePath: BASE_PATH, locales: LOCALES };

  assert.equal(isNavRouteActive(`${BASE_PATH}/en/articles-archive`, "/articles", options), false);
  assert.equal(isNavRouteActive("/en/medical-glossary", "/medical", options), false);
});

test("ignores query strings and hash fragments", () => {
  const options = { basePath: BASE_PATH, locales: LOCALES };

  assert.equal(isNavRouteActive(`${BASE_PATH}/en/articles?page=3`, "/articles", options), true);
  assert.equal(isNavRouteActive(`${BASE_PATH}/en/articles#top`, "/articles", options), true);
});

test("accepts an href that already carries the base path", () => {
  const options = { basePath: BASE_PATH, locales: LOCALES };

  assert.equal(
    isNavRouteActive(`${BASE_PATH}/en/articles`, `${BASE_PATH}/articles`, options),
    true
  );
});

test("never marks the home route active, it has no dedicated nav entry", () => {
  assert.equal(isNavRouteActive("/en", "/", { locales: LOCALES }), false);
  assert.equal(isNavRouteActive("/en/articles", "/", { locales: LOCALES }), false);
});

test("tolerates a missing pathname during the first client render", () => {
  assert.equal(isNavRouteActive("", "/articles", { locales: LOCALES }), false);
});
