"use client";

import { useState, useEffect, useRef } from "react";

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

const cardData = [
  {
    image: "/images/portrait1.jpg",
    title: "Golden Hour",
    description: "Capturing the perfect moment when day meets night",
  },
  {
    image: "/images/landscape2.jpg",
    title: "Paradise Found",
    description: "Escape to pristine landscapes and crystal waters",
  },
  {
    image: "/images/wedding1.jpg",
    title: "Vintage Memories",
    description: "Preserving moments with timeless elegance",
  },
  {
    image: "/images/portrait2.jpg",
    title: "Natural Beauty",
    description: "Finding art in nature's simplest forms",
  },
  {
    image: "/images/arch1.jpg",
    title: "Creative Expression",
    description: "Where imagination meets artistic vision",
  },
  {
    image: "/images/landscape1.jpg",
    title: "Mountain Majesty",
    description: "Standing tall among nature's giants",
  },
  {
    image: "/images/street1.jpg",
    title: "Urban Lines",
    description: "Geometry and light in modern spaces",
  },
  {
    image: "/images/wedding2.jpg",
    title: "Warm Moments",
    description: "Finding comfort in life's simple pleasures",
  },
  {
    image: "/images/street2.jpg",
    title: "Cosmic Wonder",
    description: "Exploring the infinite beauty above us",
  },
  {
    image: "/images/hero1.jpg",
    title: "Nature's Path",
    description: "Following trails through seasonal beauty",
  },
  {
    image: "/images/landscape1.jpg",
    title: "Pure Design",
    description: "Elegance through thoughtful simplicity",
  },
  {
    image: "/images/arch1.jpg",
    title: "Ocean Power",
    description: "Witnessing nature's raw energy and grace",
  },
  {
    image: "/images/portrait1.jpg",
    title: "Knowledge Keeper",
    description: "Stories waiting to be discovered",
  },
  {
    image: "/images/street2.jpg",
    title: "Night Lights",
    description: "When the city comes alive with energy",
  },
  {
    image: "/images/landscape2.jpg",
    title: "Desert Dreams",
    description: "Finding beauty in vast, open spaces",
  },
  {
    image: "/images/wedding2.jpg",
    title: "Weathered Journey",
    description: "Stories carved by time and tide",
  },
];

function FlipCard({ image, title, description, className, style }: {
  image: string; title: string; description: string; className?: string; style?: React.CSSProperties;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={cn(className)}
      style={{
        ...style,
        perspective: 1000,
        width: 96,
        height: 128,
        cursor: "pointer",
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          transition: "transform 0.7s ease",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front — image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            overflow: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
        {/* Back — title & description */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: "#1a1a1a",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            textAlign: "center",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: 11, color: "#f5f5f5", margin: "0 0 4px" }}>{title}</h3>
          <p style={{ fontSize: 9, color: "#888", margin: 0, lineHeight: 1.4 }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export function CircularFlipGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) setSize(galleryRef.current.offsetWidth);
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (galleryRef.current) ro.observe(galleryRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let id: number;
    const animate = () => {
      setRotation((prev) => prev + 0.00005);
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const radius = size * 0.4;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
      <div
        ref={galleryRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 650,
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Central text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            pointerEvents: "none",
            padding: 40,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(18px, 3vw, 32px)",
              fontWeight: 700,
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.3,
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
              margin: "0 0 8px",
            }}
          >
            Every Photo<br />Tells a Story
          </h2>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: 3,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Hover to Explore
          </p>
        </div>

        {/* Circular cards */}
        {size > 0 &&
          cardData.map((card, index) => {
            const angle =
              (index / cardData.length) * 2 * Math.PI - Math.PI / 2 + rotation;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            return (
              <FlipCard
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) rotate(${(angle + Math.PI / 2) * (180 / Math.PI)}deg)`,
                  zIndex: 5,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
