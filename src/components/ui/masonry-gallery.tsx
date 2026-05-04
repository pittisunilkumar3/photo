"use client";

import React from "react";
import { useInView } from "framer-motion";

const columns: { src: string; alt: string; aspect: string }[][] = [
  // Column 1 — mix of tall and wide
  [
    { src: "/images/portrait1.jpg", alt: "Golden Hour Portrait", aspect: "3 / 4" },
    { src: "/images/landscape2.jpg", alt: "Mountain Serenity", aspect: "16 / 10" },
    { src: "/images/wedding2.jpg", alt: "First Dance", aspect: "4 / 5" },
    { src: "/images/street2.jpg", alt: "City Lights", aspect: "3 / 4" },
    { src: "/images/landscape1.jpg", alt: "Alpine Dawn", aspect: "16 / 10" },
    { src: "/images/portrait2.jpg", alt: "Natural Beauty", aspect: "2 / 3" },
  ],
  // Column 2
  [
    { src: "/images/wedding1.jpg", alt: "Eternal Love", aspect: "16 / 10" },
    { src: "/images/portrait2.jpg", alt: "Natural Beauty", aspect: "3 / 4" },
    { src: "/images/arch1.jpg", alt: "Modern Lines", aspect: "4 / 3" },
    { src: "/images/hero1.jpg", alt: "Studio Vision", aspect: "2 / 3" },
    { src: "/images/street1.jpg", alt: "Urban Nights", aspect: "16 / 10" },
    { src: "/images/wedding2.jpg", alt: "Wedding Dance", aspect: "4 / 5" },
  ],
  // Column 3
  [
    { src: "/images/landscape1.jpg", alt: "Alpine Dawn", aspect: "4 / 3" },
    { src: "/images/wedding1.jpg", alt: "Wedding Bells", aspect: "3 / 4" },
    { src: "/images/portrait1.jpg", alt: "Soft Light", aspect: "2 / 3" },
    { src: "/images/landscape2.jpg", alt: "Misty Mountains", aspect: "16 / 10" },
    { src: "/images/arch1.jpg", alt: "Glass & Steel", aspect: "3 / 4" },
    { src: "/images/street1.jpg", alt: "Night Stories", aspect: "4 / 5" },
  ],
];

export function MasonryGallery() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
        alignItems: "start",
      }}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {col.map((photo, i) => (
              <MasonryImage
                key={`${colIndex}-${i}`}
                src={photo.src}
                alt={photo.alt}
                aspect={photo.aspect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MasonryImage({ src, alt, aspect }: { src: string; alt: string; aspect: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [loaded, setLoaded] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        overflow: "hidden",
        background: "#eae8e0",
        cursor: "pointer",
        borderRadius: 6,
      }}
    >
      <img
        alt={alt}
        src={src}
        loading="lazy"
        draggable={false}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: isInView && loaded ? 1 : 0,
          transform: isInView && loaded
            ? hovered ? "scale(1.06)" : "scale(1)"
            : "scale(1.08)",
          transition: hovered
            ? "transform 0.4s ease"
            : "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
        }}
      />
      {/* Gradient overlay on hover */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-end",
        padding: "16px 20px",
      }}>
        <div style={{ color: "#fff" }}>
          <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{alt}</p>
        </div>
      </div>
    </div>
  );
}
