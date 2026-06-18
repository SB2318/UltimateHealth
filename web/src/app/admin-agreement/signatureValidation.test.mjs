import assert from "node:assert/strict";
import test from "node:test";

import { canvasPixelsHaveInk, isSignatureValid } from "./signatureValidation.js";

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

