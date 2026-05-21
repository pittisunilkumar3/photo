"use client";

import React from "react";
import { useInView } from "framer-motion";

// Set B: 15 unique Indian wedding ceremony photos
const columns: { src: string; alt: string; aspect: string }[][] = [
  // Column 1
  [
    { src: "/images/bride-haldi-candid-photo.jpg", alt: "Bride Haldi Ceremony", aspect: "3 / 4" },
    { src: "/images/candid-wedding.jpg", alt: "Candid Wedding", aspect: "16 / 10" },
    { src: "/images/mehandi-candid-photo.jpg", alt: "Mehandi Ceremony", aspect: "4 / 5" },
    { src: "/images/pellikuthuru-traditional-photo.jpg", alt: "Pellikuthuru", aspect: "3 / 4" },
    { src: "/images/vratham-traditional-photo.jpg", alt: "Vratham", aspect: "16 / 10" },
  ],
  // Column 2
  [
    { src: "/images/groom-haldi-candid-photo.jpg", alt: "Groom Haldi", aspect: "16 / 10" },
    { src: "/images/traditional-wedding.jpg", alt: "Traditional Wedding", aspect: "3 / 4" },
    { src: "/images/sangeet-candid-photo.jpg", alt: "Sangeet Night", aspect: "4 / 5" },
    { src: "/images/pellikoduku-traditional-photo.jpg", alt: "Pellikoduku", aspect: "16 / 10" },
    { src: "/images/prewedding-both.jpg", alt: "Pre-Wedding", aspect: "3 / 4" },
  ],
  // Column 3
  [
    { src: "/images/reception-candid-photo.jpg", alt: "Reception", aspect: "2 / 3" },
    { src: "/images/drone-wedding.jpg", alt: "Drone Shot", aspect: "16 / 10" },
    { src: "/images/cocktail-candid-photo.jpg", alt: "Cocktail Night", aspect: "4 / 5" },
    { src: "/images/prewedding-photo.jpg", alt: "Pre-Wedding Portrait", aspect: "3 / 4" },
    { src: "/images/reception-traditional-photo.jpg", alt: "Reception Traditional", aspect: "16 / 10" },
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
