export const MIN_SIGNATURE_POINT_COUNT = 20;
export const MIN_SIGNATURE_WIDTH_RATIO = 0.1;
export const MIN_SIGNATURE_HEIGHT_RATIO = 0.13;

export function canvasPixelsHaveInk(pixels) {
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] !== 0) return true;
  }
  return false;
}

function isFinitePoint(point) {
  return (
    typeof point?.x === "number" &&
    typeof point?.y === "number" &&
    Number.isFinite(point.x) &&
    Number.isFinite(point.y)
  );
}

export function isSignatureValid(
  strokes,
  {
    minPointCount = MIN_SIGNATURE_POINT_COUNT,
    minWidthRatio = MIN_SIGNATURE_WIDTH_RATIO,
    minHeightRatio = MIN_SIGNATURE_HEIGHT_RATIO,
  } = {},
) {
  const points = strokes.flat();

  // Determinism guard: if any point is corrupted (NaN/Infinity), reject.
  // This prevents timing/layout-dependent acceptance when canvas geometry
  // is temporarily invalid during resize/visibility transitions.
  if (points.some((p) => !isFinitePoint(p))) return false;

  if (points.length < minPointCount) return false;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = 0;
  let maxY = 0;

  points.forEach((point) => {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  });

  const width = maxX - minX;
  const height = maxY - minY;

  // Extra safety: if bounds become non-finite for any reason, reject.
  if (!Number.isFinite(width) || !Number.isFinite(height)) return false;

  return width > minWidthRatio && height > minHeightRatio;
}

