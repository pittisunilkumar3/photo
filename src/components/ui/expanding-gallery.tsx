"use client";

export function ExpandingGallery() {
  const images = [
    "/images/portrait1.jpg",
    "/images/landscape2.jpg",
    "/images/wedding1.jpg",
    "/images/street1.jpg",
    "/images/arch1.jpg",
    "/images/landscape1.jpg",
  ];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 400,
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 20px",
    }}>
      {images.map((src, idx) => (
        <div
          key={idx}
          style={{
            position: "relative",
            flexGrow: 1,
            flexShrink: 0,
            height: "100%",
            width: 180,
            borderRadius: 12,
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.flexGrow = "5";
            el.style.width = "100%";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.flexGrow = "1";
            el.style.width = "180px";
          }}
        >
          <img
            src={src}
            alt={`Gallery ${idx + 1}`}
            loading="lazy"
            draggable={false}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "transform 0.5s ease",
            }}
          />
          {/* Hover overlay with number */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "flex-end",
            padding: 16,
            pointerEvents: "none",
          }} />
        </div>
      ))}
    </div>
  );
}
