"use client";

import * as React from "react";

export interface PhotoStackItem {
  src: string;
  name: string;
}

export interface InteractivePhotoStackProps {
  items: PhotoStackItem[];
  title: React.ReactNode;
  className?: string;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateSpreadPositions = (count: number) => {
  const positions: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < count; i++) {
    // Distribute cards in a visible arc/fan
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * 200 + random(-30, 30);
    const y = Math.sin(angle) * 100 + random(-20, 20);
    const r = random(-15, 15);
    positions.push({ x, y, r });
  }
  return positions;
};

const InteractivePhotoStack = React.forwardRef<
  HTMLDivElement,
  InteractivePhotoStackProps
>(({ items, title, ...props }, ref) => {
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [isGroupHovered, setIsGroupHovered] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState<number | null>(null);
  const [spreadPositions, setSpreadPositions] = React.useState<{ x: number; y: number; r: number }[]>([]);
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const displayedItems = items.slice(0, 5);
  const stackRotations = [0, -3, 4, -2, 5];

  const handleMouseEnter = () => {
    setSpreadPositions(generateSpreadPositions(displayedItems.length));
    setIsGroupHovered(true);
  };

  const handleCardClick = (index: number) => {
    if (isGroupHovered) {
      setClickedIndex(index);
      setTimeout(() => {
        setIsGroupHovered(false);
        setTopCardIndex(index);
        setClickedIndex(null);
      }, 600);
    } else {
      setTopCardIndex(index);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
      {...props}
    >
      <div
        style={{
          position: "relative",
          height: 500,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          if (!clickedIndex) {
            setIsGroupHovered(false);
            setHoveredCard(null);
          }
        }}
      >
        {displayedItems.map((item, index) => {
          const isTopCard = index === topCardIndex;
          const numItems = displayedItems.length;
          let stackPos = index - topCardIndex;
          if (stackPos < 0) stackPos += numItems;
          const isClicked = index === clickedIndex;
          const isCardHovered = hoveredCard === index && isGroupHovered && !isClicked;

          let transform: string;
          let zIndex: number;
          let boxShadow: string;
          let borderColor: string;

          if (isClicked) {
            // Clicked card flies to center and scales up
            transform = "translate(-50%, -50%) scale(1.2)";
            zIndex = 200;
            boxShadow = "0 30px 60px rgba(201,165,92,0.5), 0 0 0 3px #c9a55c";
            borderColor = "#c9a55c";
          } else if (isGroupHovered && spreadPositions[index]) {
            // Spread out
            const pos = spreadPositions[index];
            const hoverScale = isCardHovered ? 1.12 : 1;
            transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${hoverScale}) rotate(${pos.r}deg)`;
            zIndex = 100 + index;
            boxShadow = isCardHovered
              ? "0 25px 50px rgba(0,0,0,0.3), 0 0 0 2px #c9a55c"
              : "0 15px 35px rgba(0,0,0,0.2)";
            borderColor = isCardHovered ? "#c9a55c" : "rgba(255,255,255,0.2)";
          } else {
            // Stacked
            const offset = stackPos * 12;
            const scale = 1 - stackPos * 0.04;
            const rot = stackRotations[stackPos] || 0;
            transform = `translate(calc(-50% + ${offset}px), calc(-50% + ${offset * 0.5}px)) scale(${scale}) rotate(${rot}deg)`;
            zIndex = isTopCard ? numItems + 1 : numItems - stackPos;
            boxShadow = isTopCard
              ? "0 20px 40px rgba(0,0,0,0.3)"
              : "0 8px 20px rgba(0,0,0,0.15)";
            borderColor = "transparent";
          }

          return (
            <div
              key={item.name}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                height: 340,
                width: 260,
                cursor: "pointer",
                borderRadius: 16,
                background: "#fff",
                padding: 12,
                boxShadow,
                border: `2px solid ${borderColor}`,
                transform,
                zIndex,
                transition: isClicked
                  ? "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "transform, box-shadow",
              }}
            >
              <div style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                alignItems: "center",
              }}>
                <div style={{
                  height: 240,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 10,
                  background: "#f0f0f0",
                }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <p style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: 18,
                    fontStyle: "italic",
                    color: "#1a1a1a",
                    margin: 0,
                    fontWeight: 500,
                  }}>
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{
        textAlign: "center",
        fontSize: 24,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "var(--font-playfair), Georgia, serif",
      }}>
        {title}
      </h3>
    </div>
  );
});

InteractivePhotoStack.displayName = "InteractivePhotoStack";

export { InteractivePhotoStack };
