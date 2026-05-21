"use client";

import React from "react";

const images = [
  "/images/hero-bg1.jpg",
  "/images/candid-wedding.jpg",
  "/images/hero-bg2.jpg",
  "/images/traditional-wedding.jpg",
  "/images/hero-bg3.jpg",
  "/images/drone-wedding.jpg",
  "/images/hero-bg4.jpg",
  "/images/prewedding-both.jpg",
  "/images/hero-bg5.jpg",
  "/images/bride-haldi-candid-photo.jpg",
];

const duplicated = [...images, ...images];

export function InfiniteScroll() {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        padding: "40px 0",
        background: "linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
      }}
    >
      {/* Mask for fade edges */}
      <style>{`
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .inf-scroll-track {
          animation: infiniteScroll 25s linear infinite;
        }
        .inf-scroll-track:hover {
          animation-play-state: paused;
        }
        .inf-scroll-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .inf-scroll-item:hover {
          transform: scale(1.08);
          filter: brightness(1.15);
        }
        .inf-scroll-mask {
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>

      <div className="inf-scroll-mask" style={{ width: "100%" }}>
        <div className="inf-scroll-track" style={{ display: "flex", gap: 20, width: "max-content" }}>
          {duplicated.map((image, index) => (
            <div
              key={index}
              className="inf-scroll-item"
              style={{
                flexShrink: 0,
                width: 280,
                height: 320,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={image}
                alt={`Gallery image ${(index % images.length) + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
