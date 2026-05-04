"use client";

import { useEffect, useRef, useState, useMemo } from "react";

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
  rotationSpeed: number;
  turbulence: number;
};

export function VaporizeLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [animationState, setAnimationState] = useState<"forming" | "holding" | "vaporizing" | "done">("forming");

  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);

  const config = useMemo(
    () => ({
      color: "rgb(201, 165, 92)",
      font: {
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "clamp(48px, 10vw, 100px)",
        fontWeight: 700,
      },
      animation: {
        holdDuration: 2000,
      },
      spread: 5,
      density: 5,
      effects: {
        turbulence: 0.3,
        glow: true,
        trail: true,
        gravity: 0.05,
      },
    }),
    []
  );

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    updateCanvasSize();

    const createParticles = (text: string) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = config.color;
      ctx.font = `${config.font.fontWeight} ${config.font.fontSize} ${config.font.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const particles: Particle[] = [];
      const sampleRate = 3;

      for (let y = 0; y < canvas.height; y += sampleRate) {
        for (let x = 0; x < canvas.width; x += sampleRate) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 0) {
            particles.push({
              x,
              y,
              originalX: x,
              originalY: y,
              previousX: x,
              previousY: y,
              color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${alpha / 255})`,
              opacity: alpha / 255,
              originalAlpha: alpha / 255,
              velocityX: 0,
              velocityY: 0,
              angle: Math.random() * Math.PI * 2,
              speed: 0,
              scale: 1,
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.2,
              turbulence: Math.random() * config.effects.turbulence,
            });
          }
        }
      }

      particlesRef.current = particles;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawGlow = (x: number, y: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(201, 165, 92, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTrail = (particle: Particle) => {
      ctx.beginPath();
      ctx.moveTo(particle.previousX, particle.previousY);
      ctx.lineTo(particle.x, particle.y);
      ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity * 0.3})`);
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (animationState) {
        case "forming": {
          fadeOpacityRef.current += deltaTime * 1.5;
          const opacity = Math.min(1, fadeOpacityRef.current);

          particlesRef.current.forEach((particle) => {
            particle.opacity = opacity * particle.originalAlpha;
            ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
            ctx.fillRect(particle.x, particle.y, 2, 2);
            if (config.effects.glow) {
              drawGlow(particle.x, particle.y, 2, particle.color.replace(/[\d.]+\)$/, `${particle.opacity * 0.5})`));
            }
          });

          if (opacity >= 1) {
            setAnimationState("holding");
          }
          break;
        }

        case "holding": {
          particlesRef.current.forEach((particle) => {
            ctx.fillStyle = particle.color;
            ctx.fillRect(particle.x, particle.y, 2, 2);
            if (config.effects.glow) {
              drawGlow(particle.x, particle.y, 2, particle.color);
            }
          });
          break;
        }

        case "vaporizing": {
          vaporizeProgressRef.current += deltaTime * 80;
          const progress = Math.min(100, vaporizeProgressRef.current);

          let allVaporized = true;

          particlesRef.current.forEach((particle) => {
            const shouldVaporize = particle.originalX <= (canvas.width * progress) / 100;

            if (shouldVaporize) {
              if (particle.speed === 0) {
                particle.speed = Math.random() * config.spread + 2;
                particle.angle = Math.random() * Math.PI * 2;
                particle.velocityX = Math.cos(particle.angle) * particle.speed;
                particle.velocityY = Math.sin(particle.angle) * particle.speed;
                particle.shouldFadeQuickly = Math.random() > config.density / 10;
              }

              particle.velocityY += config.effects.gravity;
              particle.velocityX *= 0.98;
              particle.velocityY *= 0.98;
              particle.velocityX += (Math.random() - 0.5) * particle.turbulence * 0.5;
              particle.velocityY += (Math.random() - 0.5) * particle.turbulence * 0.5;

              particle.previousX = particle.x;
              particle.previousY = particle.y;
              particle.x += particle.velocityX;
              particle.y += particle.velocityY;

              if (particle.x < -50 || particle.x > canvas.width + 50 || particle.y < -50 || particle.y > canvas.height + 50) {
                particle.opacity = 0;
              }

              if (particle.shouldFadeQuickly) {
                particle.opacity *= 0.95;
              } else {
                particle.opacity *= 0.98;
              }

              if (particle.opacity > 0.01) allVaporized = false;

              if (particle.opacity > 0.01) {
                if (config.effects.trail) drawTrail(particle);
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.scale(particle.scale, particle.scale);
                const pColor = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
                ctx.fillStyle = pColor;
                ctx.fillRect(-1, -1, 2, 2);
                if (config.effects.glow) drawGlow(0, 0, 4, pColor);
                ctx.restore();
              }
            } else {
              allVaporized = false;
              ctx.fillStyle = particle.color;
              ctx.fillRect(particle.x, particle.y, 2, 2);
            }
          });

          if (progress >= 100 && allVaporized) {
            setAnimationState("done");
          }
          break;
        }

        case "done": {
          // nothing to draw
          break;
        }
      }

      if (animationState !== "done") {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Initialize
    createParticles("Lumière");
    animationFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", updateCanvasSize);

    // Hold the text for a moment, then vaporize
    const holdTimer = setTimeout(() => {
      setAnimationState("vaporizing");
      vaporizeProgressRef.current = 0;
    }, config.animation.holdDuration);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(holdTimer);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [config, animationState]);

  // When done, notify parent
  useEffect(() => {
    if (animationState === "done") {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [animationState, onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.4s ease",
        opacity: animationState === "done" ? 0 : 1,
      }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}
