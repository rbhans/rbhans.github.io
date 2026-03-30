"use client";

import { useEffect, useRef } from "react";

export function TopoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pendingRef = useRef<boolean>(false);
  const lastBitmapRef = useRef<ImageBitmap | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("bitmaprenderer") || canvas.getContext("2d");
    if (!ctx) return;

    // Create the worker
    const worker = new Worker(
      new URL("./topo-worker.ts", import.meta.url)
    );
    workerRef.current = worker;
    startTimeRef.current = Date.now();

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    let frameId = 0;

    // When worker sends back a rendered frame, display it and request next
    worker.onmessage = (e: MessageEvent) => {
      const { bitmap, frameId: returnedId } = e.data;
      pendingRef.current = false;

      if (lastBitmapRef.current) {
        lastBitmapRef.current.close();
      }
      lastBitmapRef.current = bitmap;

      if ("transferFromImageBitmap" in ctx) {
        (ctx as ImageBitmapRenderingContext).transferFromImageBitmap(bitmap);
      } else {
        (ctx as CanvasRenderingContext2D).clearRect(0, 0, w, h);
        (ctx as CanvasRenderingContext2D).drawImage(bitmap, 0, 0);
      }
    };

    // Request frames at a steady interval
    function requestFrame() {
      if (pendingRef.current) {
        // Worker still computing, skip this tick
        animRef.current = requestAnimationFrame(() => setTimeout(requestFrame, 120));
        return;
      }

      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      // Slow continuous drift through the noise field
      // ~1.5 noise-units per second = smooth perceptible morphing
      const offsetX = elapsed * 1.5;
      const offsetY = elapsed * 0.8;

      pendingRef.current = true;
      frameId++;
      worker.postMessage({ w, h, offsetX, offsetY, frameId });

      // Request next frame after a short delay (~8fps target for the worker)
      animRef.current = requestAnimationFrame(() => setTimeout(requestFrame, 120));
    }

    // Small delay so page load animations aren't affected
    const startDelay = setTimeout(requestFrame, 800);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animRef.current);
      worker.terminate();
      if (lastBitmapRef.current) lastBitmapRef.current.close();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.10]"
    />
  );
}
