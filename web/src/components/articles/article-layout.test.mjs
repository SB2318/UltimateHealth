import assert from "node:assert/strict";
import test from "node:test";

import {
  ARTICLE_STICKY_HEADER_HEIGHT_PX,
  ARTICLE_TOC_INTERSECTION_THRESHOLD,
  ARTICLE_TOC_OBSERVER_BOTTOM_MARGIN_PERCENT,
  extractTocHeadings,
  getArticleScrollTargetY,
  getArticleTocObserverRootMargin,
} from "./article-layout.js";

test("getArticleTocObserverRootMargin uses the sticky header height for the top inset", () => {
  assert.equal(
    getArticleTocObserverRootMargin(),
    `-${ARTICLE_STICKY_HEADER_HEIGHT_PX}px 0px -${ARTICLE_TOC_OBSERVER_BOTTOM_MARGIN_PERCENT}% 0px`,
  );
});

test("getArticleScrollTargetY subtracts the sticky header height", () => {
  assert.equal(getArticleScrollTargetY(300, 1200), 1415);
  assert.equal(getArticleScrollTargetY(300, 1200, 100), 1400);
});

test("extractTocHeadings keeps only level 2 and 3 headings", () => {
  const blocks = [
    { type: "paragraph", html: "Intro" },
    { type: "heading", level: 2, id: "intro", text: "Intro" },
    { type: "heading", level: 3, id: "details", text: "Details" },
    { type: "heading", level: 4, id: "note", text: "Note" },
  ];

  assert.deepEqual(extractTocHeadings(blocks), [
    { type: "heading", level: 2, id: "intro", text: "Intro" },
    { type: "heading", level: 3, id: "details", text: "Details" },
  ]);
});

test("TOC observer defaults use a less aggressive active zone", () => {
  assert.equal(ARTICLE_TOC_OBSERVER_BOTTOM_MARGIN_PERCENT, 25);
  assert.equal(ARTICLE_TOC_INTERSECTION_THRESHOLD, 0.5);
});
