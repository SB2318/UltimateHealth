import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP_DIR = dirname(fileURLToPath(import.meta.url));

const read = (relativePath) => readFileSync(join(APP_DIR, relativePath), "utf8");

const stylesheets = readdirSync(APP_DIR).filter((name) => name.endsWith(".css"));

// Guards the regressions fixed in #1174. These are cheap structural checks, not
// a substitute for profiling — they exist because each of these mistakes is easy
// to reintroduce and expensive on the critical path.

test("Tailwind is imported by exactly one stylesheet", () => {
  const importers = stylesheets.filter((name) =>
    /@import\s+["']tailwindcss["']/.test(read(name))
  );

  assert.deepEqual(
    importers,
    ["globals.css"],
    `Every stylesheet that imports "tailwindcss" compiles the whole framework ` +
      `into its own bundle. Two importers shipped ~200 KB of duplicated ` +
      `render-blocking CSS on every route. Import shared styles from ` +
      `globals.css instead. Found: ${importers.join(", ") || "none"}`
  );
});

test("globals2.css design tokens are still reachable", () => {
  // globals2.css no longer pulls in Tailwind itself, so it must be chained from
  // globals.css or its custom variant and :root tokens would silently vanish.
  assert.match(read("globals.css"), /@import\s+["']\.\/globals2\.css["']/);
  assert.match(read("globals2.css"), /@custom-variant\s+dark/);
});

test("the root layout does not import both stylesheets", () => {
  const layout = read("[locale]/layout.tsx");

  assert.match(layout, /import\s+["']\.\.\/globals\.css["']/);
  assert.equal(
    /import\s+["']\.\.\/globals2\.css["']/.test(layout),
    false,
    "globals2.css is imported through globals.css; importing it here as well " +
      "emits a second Tailwind bundle."
  );
});

test("Inter is instantiated once", () => {
  const layout = read("[locale]/layout.tsx");
  const instances = layout.match(/\bInter\(/g) ?? [];

  assert.equal(
    instances.length,
    1,
    "Each next/font instance emits its own @font-face set and font files. " +
      "Reuse a single Inter instance across CSS variables."
  );
});

test("the landing page is a server component", () => {
  const page = read("[locale]/page.tsx");

  assert.equal(
    /^\s*["']use client["']/m.test(page),
    false,
    "Marking the landing page as a client component pulls every static section " +
      "— hero, feature grids, programs, footer — into the client bundle and " +
      "makes hydration walk the whole page. Keep interactivity in the islands " +
      "under components/home/ instead."
  );
});

test("the features grid renders without an artificial loading delay", () => {
  const features = read("../components/home/FeaturesSection.tsx");

  assert.equal(
    /setTimeout/.test(features),
    false,
    "The feature cards are static content. A timed skeleton state delays " +
      "content that needs no fetching and forces a layout shift."
  );
  assert.equal(/Skeleton/.test(features), false);
});
