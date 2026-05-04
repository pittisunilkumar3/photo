"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  previousX: number;
  previousY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
  scale: number;
  rotation: number;
  turbulence: number;
};

export function VaporizeLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const stateRef = useRef<"forming" | "holding" | "vaporizing" | "done">("forming");
  const [, forceRender] = useState(0);

  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to full viewport
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Calculate font size — fill ~80% of screen width
    const text = "Lumière";
    let fontSize = Math.min(w * 0.2, 280);
    // Shrink until text fits within 85% of width
    ctx.font = `900 ${fontSize}px Georgia, serif`;
    let measured = ctx.measureText(text).width;
    while (measured > w * 0.85 && fontSize > 40) {
      fontSize -= 4;
      ctx.font = `900 ${fontSize}px Georgia, serif`;
      measured = ctx.measureText(text).width;
    }

    // Draw text to canvas to create particles
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgb(201, 165, 92)";
    ctx.font = `900 ${fontSize}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, w / 2, h / 2);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const particles: Particle[] = [];
    const step = Math.max(1, Math.round(fontSize / 60)); // adaptive sampling

    for (let py = 0; py < h; py += step) {
      for (let px = 0; px < w; px += step) {
        const idx = (py * w + px) * 4;
        const alpha = data[idx + 3];
        if (alpha > 20) {
          particles.push({
            x: px,
            y: py,
            originalX: px,
            originalY: py,
            previousX: px,
            previousY: py,
            color: `rgba(${data[idx]}, ${data[idx + 1]}, ${data[idx + 2]}, ${alpha / 255})`,
            opacity: alpha / 255,
            originalAlpha: alpha / 255,
            velocityX: 0,
            velocityY: 0,
            angle: Math.random() * Math.PI * 2,
            speed: 0,
            scale: 1,
            rotation: Math.random() * Math.PI * 2,
            turbulence: Math.random() * 0.3,
          });
        }
      }
    }

    particlesRef.current = particles;
    ctx.clearRect(0, 0, w, h);

    // Reset state
    stateRef.current = "forming";
    fadeOpacityRef.current = 0;
    vaporizeProgressRef.current = 0;

    const drawGlow = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(201, 165, 92, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, w, h);

      const state = stateRef.current;

      if (state === "forming") {
        fadeOpacityRef.current += dt * 1.2;
        const opacity = Math.min(1, fadeOpacityRef.current);

        particlesRef.current.forEach((p) => {
          p.opacity = opacity * p.originalAlpha;
          const c = `rgba(201, 165, 92, ${p.opacity})`;
          ctx.fillStyle = c;
          ctx.fillRect(p.x, p.y, step, step);
          if (opacity > 0.5) drawGlow(p.x, p.y, step + 1, `rgba(201, 165, 92, ${p.opacity * 0.3})`);
        });

        if (opacity >= 1) {
          stateRef.current = "holding";
        }
      } else if (state === "holding") {
        particlesRef.current.forEach((p) => {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, step, step);
          drawGlow(p.x, p.y, step + 1, `rgba(201, 165, 92, ${p.originalAlpha * 0.3})`);
        });
      } else if (state === "vaporizing") {
        vaporizeProgressRef.current += dt * 60;
        const progress = Math.min(100, vaporizeProgressRef.current);
        let allGone = true;

        particlesRef.current.forEach((p) => {
          const shouldVaporize = p.originalX <= (w * progress) / 100;

          if (shouldVaporize) {
            if (p.speed === 0) {
              p.speed = Math.random() * 6 + 2;
              p.angle = Math.random() * Math.PI * 2;
              p.velocityX = Math.cos(p.angle) * p.speed;
              p.velocityY = Math.sin(p.angle) * p.speed;
              p.shouldFadeQuickly = Math.random() > 0.5;
            }

            p.velocityY += 0.05;
            p.velocityX *= 0.98;
            p.velocityY *= 0.98;
            p.velocityX += (Math.random() - 0.5) * p.turbulence * 0.5;
            p.velocityY += (Math.random() - 0.5) * p.turbulence * 0.5;

            p.previousX = p.x;
            p.previousY = p.y;
            p.x += p.velocityX;
            p.y += p.velocityY;

            if (p.x < -100 || p.x > w + 100 || p.y < -100 || p.y > h + 100) {
              p.opacity = 0;
            }

            p.opacity *= p.shouldFadeQuickly ? 0.94 : 0.98;

            if (p.opacity > 0.01) {
              allGone = false;
              // Trail
              ctx.beginPath();
              ctx.moveTo(p.previousX, p.previousY);
              ctx.lineTo(p.x, p.y);
              ctx.strokeStyle = `rgba(201, 165, 92, ${p.opacity * 0.3})`;
              ctx.lineWidth = 1;
              ctx.stroke();

              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              const c = `rgba(201, 165, 92, ${p.opacity})`;
              ctx.fillStyle = c;
              ctx.fillRect(-1, -1, 3, 3);
              drawGlow(0, 0, 5, c);
              ctx.restore();
            }
          } else {
            allGone = false;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, step, step);
          }
        });

        if (progress >= 100 && allGone) {
          stateRef.current = "done";
          forceRender((n) => n + 1);
          return; // stop loop
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // After forming + holding, start vaporizing
    const holdTimer = setTimeout(() => {
      stateRef.current = "vaporizing";
      vaporizeProgressRef.current = 0;
    }, 4000); // ~1s forming + ~3s holding
  }, []);

  useEffect(() => {
    startAnimation();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [startAnimation]);

  // When done, notify parent
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (stateRef.current === "done" && !done) {
      setDone(true);
      const timer = setTimeout(() => onCompleteRef.current(), 500);
      return () => clearTimeout(timer);
    }
  }, [done]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0a0a0a",
        transition: "opacity 0.5s ease",
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "all",
      }}
    >
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0 }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
