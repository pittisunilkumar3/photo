"use client";

import React, { useState, useEffect, useRef, useCallback, HTMLAttributes } from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 500, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const dragStartX = useRef(0);
    const dragStartRotation = useRef(0);
    const lastDragX = useRef(0);
    const dragVelocity = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setRotation(scrollProgress * 360);

        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    // Auto-rotate when not scrolling and not dragging
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling && !isDragging) {
          // Apply drag momentum
          if (Math.abs(dragVelocity.current) > 0.01) {
            setRotation((prev) => prev + dragVelocity.current);
            dragVelocity.current *= 0.95; // friction
          } else {
            dragVelocity.current = 0;
            setRotation((prev) => prev + autoRotateSpeed);
          }
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, isDragging, autoRotateSpeed]);

    // Mouse drag handlers
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
      // Only respond to left click
      if (e.button !== 0) return;
      setIsDragging(true);
      dragStartX.current = e.clientX;
      lastDragX.current = e.clientX;
      dragStartRotation.current = rotation;
      dragVelocity.current = 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }, [rotation]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      const sensitivity = 0.4;
      const newRotation = dragStartRotation.current + deltaX * sensitivity;
      setRotation(newRotation);

      // Track velocity for momentum
      dragVelocity.current = (e.clientX - lastDragX.current) * sensitivity;
      lastDragX.current = e.clientX;
    }, [isDragging]);

    const handlePointerUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{
          perspective: "2000px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
            transition: isDragging ? "none" : undefined,
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);
            // Scale front items slightly larger
            const scale = 1 - (normalizedAngle / 360) * 0.15;

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute w-[280px] h-[370px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-140px",
                  marginTop: "-185px",
                  opacity,
                  transition: isDragging ? "none" : "opacity 0.3s linear, transform 0.3s linear",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: normalizedAngle < 60
                      ? "0 25px 60px rgba(201,165,92,0.2), 0 10px 30px rgba(0,0,0,0.4)"
                      : "0 20px 50px rgba(0,0,0,0.3)",
                    border: normalizedAngle < 60
                      ? "1px solid rgba(201,165,92,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    loading="lazy"
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: item.photo.pos || "center",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      padding: "16px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      color: "#fff",
                    }}
                  >
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{item.common}</h2>
                    <em style={{ fontSize: 13, opacity: 0.8 }}>{item.binomial}</em>
                    <p style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>Photo by: {item.photo.by}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
