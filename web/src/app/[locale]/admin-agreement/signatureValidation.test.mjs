import assert from "node:assert/strict";
import test from "node:test";

import {
  canvasPixelsHaveInk,
  denormalizeCanvasPoint,
  isSignatureValid,
  isValidCanvasRect,
  normalizeCanvasPoint,
} from "./signatureValidation.js";

const makeStroke = (count, getPoint) =>
  Array.from({ length: count }, (_, index) => getPoint(index, count));

test("canvasPixelsHaveInk returns false for fully transparent pixels", () => {
  assert.equal(canvasPixelsHaveInk(new Uint8ClampedArray(16)), false);
});

test("canvasPixelsHaveInk returns true when any alpha channel has ink", () => {
  const pixels = new Uint8ClampedArray(16);
  pixels[7] = 255;

  assert.equal(canvasPixelsHaveInk(pixels), true);
});

test("isSignatureValid rejects signatures with too few points", () => {
  const strokes = [makeStroke(19, (index) => ({ x: index / 100, y: index / 100 }))];

  assert.equal(isSignatureValid(strokes), false);
});

test("isSignatureValid rejects signatures that do not span enough canvas area", () => {
  const strokes = [makeStroke(20, (index) => ({ x: 0.2 + index / 1000, y: 0.3 + index / 1000 }))];

  assert.equal(isSignatureValid(strokes), false);
});

test("isSignatureValid accepts signatures with enough points and bounds across strokes", () => {
  const strokes = [
    makeStroke(10, (index) => ({ x: 0.1 + index * 0.01, y: 0.2 + index * 0.01 })),
    makeStroke(10, (index) => ({ x: 0.4 + index * 0.01, y: 0.5 + index * 0.01 })),
  ];

  assert.equal(isSignatureValid(strokes), true);
});

test("isSignatureValid rejects signatures when any point contains NaN", () => {
  const strokes = [
    Array.from({ length: 20 }, (_, i) =>
      i === 10 ? { x: Number.NaN, y: 0.5 } : { x: 0.1 + i * 0.01, y: 0.1 + i * 0.01 },
    ),
  ];

  assert.equal(isSignatureValid(strokes), false);
});

test("isSignatureValid rejects signatures when any point contains Infinity", () => {
  const strokes = [
    Array.from({ length: 20 }, (_, i) =>
      i === 5 ? { x: Number.POSITIVE_INFINITY, y: 0.2 } : { x: 0.1 + i * 0.01, y: 0.1 + i * 0.01 },
    ),
  ];

  assert.equal(isSignatureValid(strokes), false);
});

const validRect = { left: 10, top: 20, width: 400, height: 150 };

test("isValidCanvasRect rejects zero or non-finite dimensions", () => {
  assert.equal(isValidCanvasRect({ left: 0, top: 0, width: 0, height: 150 }), false);
  assert.equal(isValidCanvasRect({ left: 0, top: 0, width: 400, height: 0 }), false);
  assert.equal(isValidCanvasRect({ left: 0, top: 0, width: Number.NaN, height: 150 }), false);
  assert.equal(isValidCanvasRect(null), false);
});

test("normalizeCanvasPoint returns null for invalid canvas geometry", () => {
  assert.equal(normalizeCanvasPoint(100, 80, { left: 0, top: 0, width: 0, height: 150 }), null);
  assert.equal(normalizeCanvasPoint(100, 80, { left: 0, top: 0, width: 400, height: 0 }), null);
});

test("normalizeCanvasPoint returns finite normalized coordinates for valid geometry", () => {
  const point = normalizeCanvasPoint(210, 95, validRect);

  assert.deepEqual(point, { x: 0.5, y: 0.5 });
});

test("denormalizeCanvasPoint returns null for invalid geometry or points", () => {
  assert.equal(denormalizeCanvasPoint({ x: 0.5, y: 0.5 }, { left: 0, top: 0, width: 0, height: 150 }), null);
  assert.equal(denormalizeCanvasPoint({ x: Number.NaN, y: 0.5 }, validRect), null);
});

test("denormalizeCanvasPoint maps normalized points back to CSS pixels", () => {
  const point = denormalizeCanvasPoint({ x: 0.5, y: 0.5 }, validRect);

  assert.deepEqual(point, { x: 200, y: 75 });
});

