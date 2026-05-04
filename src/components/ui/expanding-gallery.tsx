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
      justifyContent: "center",
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
            flex: "1 1 0%",
            height: "100%",
            borderRadius: 12,
            overflow: "hidden",
            cursor: "pointer",
            transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            minWidth: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.flex = "5 1 0%";
            el.style.zIndex = "10";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.flex = "1 1 0%";
            el.style.zIndex = "1";
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
            }}
          />
        </div>
      ))}
    </div>
  );
}
