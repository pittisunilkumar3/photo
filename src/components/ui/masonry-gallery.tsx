"use client";

import React from "react";
import { useInView } from "framer-motion";

// Photo data with mixed aspect ratios for masonry effect
const columns: { src: string; alt: string; ratio: number; tall: boolean }[][] = [
  // Column 1
  [
    { src: "/images/portrait1.jpg", alt: "Golden Hour Portrait", ratio: 3 / 4, tall: true },
    { src: "/images/landscape2.jpg", alt: "Mountain Serenity", ratio: 16 / 9, tall: false },
    { src: "/images/wedding2.jpg", alt: "First Dance", ratio: 4 / 3, tall: false },
    { src: "/images/street2.jpg", alt: "City Lights", ratio: 3 / 4, tall: true },
    { src: "/images/landscape1.jpg", alt: "Alpine Dawn", ratio: 16 / 9, tall: false },
  ],
  // Column 2
  [
    { src: "/images/wedding1.jpg", alt: "Eternal Love", ratio: 16 / 9, tall: false },
    { src: "/images/portrait2.jpg", alt: "Natural Beauty", ratio: 3 / 4, tall: true },
    { src: "/images/arch1.jpg", alt: "Modern Lines", ratio: 4 / 3, tall: false },
    { src: "/images/hero1.jpg", alt: "Studio Vision", ratio: 3 / 4, tall: true },
    { src: "/images/street1.jpg", alt: "Urban Nights", ratio: 16 / 9, tall: false },
  ],
  // Column 3
  [
    { src: "/images/landscape1.jpg", alt: "Alpine Dawn", ratio: 4 / 3, tall: false },
    { src: "/images/wedding1.jpg", alt: "Wedding Bells", ratio: 3 / 4, tall: true },
    { src: "/images/portrait1.jpg", alt: "Soft Light", ratio: 16 / 9, tall: false },
    { src: "/images/landscape2.jpg", alt: "Misty Mountains", ratio: 3 / 4, tall: true },
    { src: "/images/arch1.jpg", alt: "Glass & Steel", ratio: 16 / 9, tall: false },
  ],
];

export function MasonryGallery() {
  return (
    <div style={{ width: "100%", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 20,
      }}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} style={{ display: "grid", gap: 20 }}>
            {col.map((photo, i) => (
              <MasonryImage
                key={`${colIndex}-${i}`}
                src={photo.src}
                alt={photo.alt}
                ratio={photo.ratio}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MasonryImage({ src, alt, ratio }: { src: string; alt: string; ratio: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${ratio}`,
        borderRadius: 12,
        overflow: "hidden",
        background: "#f0efe8",
        border: "1px solid #e8e5df",
        cursor: "pointer",
      }}
    >
      <img
        alt={alt}
        src={src}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: isInView && loaded ? 1 : 0,
          transform: isInView && loaded ? "scale(1)" : "scale(1.05)",
          transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
        }}
      />
      {/* Hover overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        display: "flex",
        alignItems: "flex-end",
        padding: 16,
        pointerEvents: "none",
      }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.previousElementSibling as HTMLDivElement).style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.previousElementSibling as HTMLDivElement).style.opacity = "0";
        }}
      />
    </div>
  );
}
