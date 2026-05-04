"use client";

import React from "react";

const images = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=800&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=800&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=800&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=800&auto=format&fit=crop",
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
