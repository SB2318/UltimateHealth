export const MIN_SIGNATURE_POINT_COUNT = 20;
export const MIN_SIGNATURE_WIDTH_RATIO = 0.1;
export const MIN_SIGNATURE_HEIGHT_RATIO = 0.13;

export function canvasPixelsHaveInk(pixels) {
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] !== 0) return true;
  }
  return false;
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

  return maxX - minX > minWidthRatio && maxY - minY > minHeightRatio;
}
