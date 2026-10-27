"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import type { Stroke, Point } from "../types";
import { agreementStyles as css } from "../styles";
import {
  canvasPixelsHaveInk,
  denormalizeCanvasPoint,
  isSignatureValid as hasValidSignatureBounds,
  isValidCanvasRect,
  normalizeCanvasPoint,
} from "../signatureValidation";

const SIGNATURE_STROKE = "#2d3748";
const SIGNATURE_LINE_WIDTH = 2;

interface SignaturePadProps {
  locked: boolean;
  signatureDataUrl: string | null;
  onSignatureChange: (hasSig: boolean, isValid: boolean) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function SignaturePad({
  locked,
  signatureDataUrl,
  onSignatureChange,
  canvasRef,
}: SignaturePadProps) {
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  const strokesRef = useRef<Stroke[]>([]);
  const activeStrokeRef = useRef<Stroke>([]);

  const isSigValid = useCallback(() => {
    return hasValidSignatureBounds(strokes);
  }, [strokes]);

  const drawStrokes = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    strokesRef.current.forEach((stroke) => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x * width, stroke[0].y * height);
      stroke.slice(1).forEach((point) => ctx.lineTo(point.x * width, point.y * height));
      ctx.stroke();
      ctx.closePath();
    });
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (!isValidCanvasRect(rect)) return;

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * pixelRatio);
    canvas.height = Math.round(rect.height * pixelRatio);
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.strokeStyle = SIGNATURE_STROKE;
    ctx.lineWidth = SIGNATURE_LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    drawStrokes(ctx, rect.width, rect.height);

    const lastPoint = activeStrokeRef.current.at(-1);
    if (lastPoint) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.x * rect.width, lastPoint.y * rect.height);
    }
  }, [canvasRef, drawStrokes]);

  useEffect(() => {
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [setupCanvas]);

  useEffect(() => {
    onSignatureChange(hasSignature, isSigValid());
  }, [hasSignature, isSigValid, onSignatureChange]);

  const getPos = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientPoint = "touches" in e ? e.touches[0] : e;
    if (!clientPoint) return null;

    return normalizeCanvasPoint(clientPoint.clientX, clientPoint.clientY, rect);
  };

  const toCanvasPoint = (point: Point): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return denormalizeCanvasPoint(point, canvas.getBoundingClientRect());
  };

  const updateStrokes = (nextStrokes: Stroke[]) => {
    strokesRef.current = nextStrokes;
    setStrokes(nextStrokes);
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (locked) return;

    const pos = getPos(e);
    if (!pos) return;

    const canvasPoint = toCanvasPoint(pos);
    if (!canvasPoint) return;

    activeStrokeRef.current = [pos];
    updateStrokes([...strokesRef.current, activeStrokeRef.current]);
    setIsDrawing(true);

    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(canvasPoint.x, canvasPoint.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || locked) return;

    const pos = getPos(e);
    if (!pos) return;

    const activeStroke = [...activeStrokeRef.current, pos];
    activeStrokeRef.current = activeStroke;
    updateStrokes([...strokesRef.current.slice(0, -1), activeStroke]);

    const canvasPoint = toCanvasPoint(pos);
    if (!canvasPoint) return;

    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.lineTo(canvasPoint.x, canvasPoint.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDraw = () => {
    if (isDrawing) {
      canvasRef.current!.getContext("2d")!.closePath();
      activeStrokeRef.current = [];
      setIsDrawing(false);
    }
  };

  const clearSignature = () => {
    if (locked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    activeStrokeRef.current = [];
    updateStrokes([]);
    setHasSignature(false);
  };

  return (
    <div style={css.canvasContainer}>
      <label style={css.canvasLabel}>
        Draw Your Signature <span style={{ color: "#e53e3e" }}>*</span>
      </label>
      {locked && signatureDataUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={signatureDataUrl}
            alt="Your drawn digital signature"
            loading="lazy"
            style={css.signatureImg}
          />
        </>
      ) : (
        <canvas
          ref={canvasRef}
          id="signatureCanvas"
          style={css.canvas}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      )}

      {!locked && (
        <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center", justifyContent: "center", flexWrap: "wrap" as const }}>
          <button type="button" id="clearBtn" className="hide-in-agreement-screenshot" onClick={clearSignature} style={css.btnClear}>
            Clear Signature
          </button>
          <span style={{ fontSize: 12, color: "#718096", fontStyle: "italic" }}>
            Draw your signature using mouse or touch
          </span>
        </div>
      )}

      {!locked && hasSignature && !isSigValid() && (
        <div style={{ color: "#e53e3e", fontSize: 13, marginTop: 8, fontWeight: 500, textAlign: "center" }}>
          ⚠️ Please draw a more complete signature
        </div>
      )}
    </div>
  );
}
