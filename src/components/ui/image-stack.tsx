"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Seeded pseudo-random number generator
class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next(): number { this.seed = (this.seed * 9301 + 49297) % 233280; return this.seed / 233280; }
  range(min: number, max: number): number { return min + this.next() * (max - min); }
}

interface ImageData { src: string; alt: string; id: string; }
interface ScatterPosition { x: number; y: number; rotation: number; scale: number; }

export interface ImageStackProps {
  images?: ImageData[];
  maxRotation?: number;
  scatterRadius?: number;
  seed?: number;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0, staggerChildren: 1.5 } },
};

const cardVariants = {
  hidden: (custom: { zIndex: number }) => ({
    x: 0, y: 0, rotate: 0, scale: 1, zIndex: custom.zIndex,
  }),
  visible: (custom: { position: ScatterPosition; zIndex: number; springConfig: any }) => ({
    x: custom.position.x,
    y: custom.position.y,
    rotate: custom.position.rotation,
    scale: custom.position.scale,
    zIndex: custom.zIndex,
    transition: custom.springConfig,
  }),
};

export default function ImageStack({
  images = [
    { id: "1", src: "/images/landscape1.jpg", alt: "Alpine Dawn" },
    { id: "2", src: "/images/landscape2.jpg", alt: "Mountain Serenity" },
    { id: "3", src: "/images/portrait1.jpg", alt: "Golden Portrait" },
    { id: "4", src: "/images/street1.jpg", alt: "Urban Nights" },
    { id: "5", src: "/images/wedding1.jpg", alt: "Eternal Love" },
  ],
  maxRotation = 15,
  scatterRadius = 40,
  seed = 12345,
  className = "",
}: ImageStackProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [scatterPositions, setScatterPositions] = React.useState<ScatterPosition[]>([]);
  const [currentSeed, setCurrentSeed] = React.useState(seed);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const generateScatterPositions = React.useCallback(
    (seedValue: number) => {
      const rng = new SeededRandom(seedValue);
      return images.map(() => ({
        x: rng.range(-280, -240),
        y: rng.range(-scatterRadius, scatterRadius),
        rotation: rng.range(-maxRotation, maxRotation),
        scale: rng.range(0.95, 1.05),
      }));
    },
    [images, scatterRadius, maxRotation]
  );

  React.useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = images.map(
        (image) =>
          new Promise<string>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(image.id);
            img.onerror = () => resolve(image.id);
            img.src = image.src;
          })
      );
      await Promise.all(loadPromises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, [images]);

  React.useEffect(() => {
    setScatterPositions(generateScatterPositions(currentSeed));
  }, [currentSeed, generateScatterPositions]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imagesLoaded) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [imagesLoaded]);

  const reshuffle = () => {
    setCurrentSeed(Math.floor(Math.random() * 1000000));
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  const springConfig = prefersReducedMotion
    ? { type: "tween" as const, duration: 0.3 }
    : { type: "spring" as const, stiffness: 100, damping: 20 };

  return (
    <div
      style={{ position: "relative", width: "100%", height: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      className={className}
    >
      <motion.div
        ref={containerRef}
        style={{ position: "relative", width: "100%", height: "100%", perspective: 1000 }}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {!imagesLoaded && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
            Loading images...
          </div>
        )}

        {images.map((image, index) => {
          const position = scatterPositions[index];
          if (!position) return null;

          return (
            <motion.div
              key={`${image.id}-${currentSeed}`}
              variants={cardVariants}
              custom={{
                position,
                zIndex: images.length - index,
                springConfig,
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -160,
                marginTop: -225,
              }}
            >
              <div
                onClick={reshuffle}
                style={{
                  background: "#fff",
                  padding: 20,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                  border: "1px solid #e8e5df",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 30px 60px rgba(201,165,92,0.3)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(0,0,0,0.15)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{ width: 320, height: 384, objectFit: "cover", display: "block" }}
                />
                <div style={{ marginTop: 12, textAlign: "center", fontSize: 16, color: "#666", fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}>
                  {image.alt}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
