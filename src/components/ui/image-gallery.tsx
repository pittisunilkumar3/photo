"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    gsap: any;
    MotionPathPlugin: any;
  }
}

interface ImageData {
  title: string;
  url: string;
}

const images: ImageData[] = [
  { title: "Golden Portrait", url: "/images/portrait1.jpg" },
  { title: "Mountain Serenity", url: "/images/landscape2.jpg" },
  { title: "Eternal Love", url: "/images/wedding1.jpg" },
  { title: "Urban Nights", url: "/images/street1.jpg" },
  { title: "Natural Beauty", url: "/images/portrait2.jpg" },
  { title: "Modern Lines", url: "/images/arch1.jpg" },
];

export function ImageGallery() {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const autoplayTimer = useRef<number | null>(null);

  useEffect(() => {
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin);
        setGsapReady(true);
        return;
      }
      const gsapScript = document.createElement("script");
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script");
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };
        document.body.appendChild(motionPathScript);
      };
      document.body.appendChild(gsapScript);
    };
    loadScripts();
  }, []);

  const onClick = (index: number) => {
    if (!disabled) setOpened(index);
  };

  const onInPlace = (index: number) => setInPlace(index);

  const next = useCallback(() => {
    setOpened((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
  }, []);

  const prev = useCallback(() => {
    setOpened((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  }, []);

  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (!gsapReady) return;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 4500);
    return () => { if (autoplayTimer.current) clearInterval(autoplayTimer.current); };
  }, [opened, gsapReady, next]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "80vmin",
          width: "80vmin",
          maxHeight: 550,
          maxWidth: 550,
          overflow: "hidden",
          borderRadius: 20,
          boxShadow:
            "0 2.8px 2.2px rgba(0,0,0,0.02), 0 6.7px 5.3px rgba(0,0,0,0.028), 0 12.5px 10px rgba(0,0,0,0.035), 0 22.3px 17.9px rgba(0,0,0,0.042), 0 41.8px 33.4px rgba(0,0,0,0.05), 0 100px 80px rgba(0,0,0,0.07)",
        }}
      >
        {gsapReady &&
          images.map((image, i) => (
            <div
              key={image.url}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "100%",
                zIndex: inPlace === i ? i : images.length + 1,
              }}
            >
              <GalleryImage
                total={images.length}
                id={i}
                url={image.url}
                title={image.title}
                open={opened === i}
                inPlace={inPlace === i}
                onInPlace={onInPlace}
              />
            </div>
          ))}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 100, height: "100%", width: "100%", pointerEvents: "none" }}>
          <Tabs images={images} onSelect={onClick} />
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prev}
        disabled={disabled}
        aria-label="Previous"
        style={{
          position: "absolute",
          left: -60,
          top: "50%",
          zIndex: 101,
          display: "flex",
          height: 52,
          width: 52,
          transform: "translateY(-50%)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.4 : 1,
          outline: "none",
          transition: "all 0.3s ease",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        disabled={disabled}
        aria-label="Next"
        style={{
          position: "absolute",
          right: -60,
          top: "50%",
          zIndex: 101,
          display: "flex",
          height: 52,
          width: 52,
          transform: "translateY(-50%)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.4 : 1,
          outline: "none",
          transition: "all 0.3s ease",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

interface GalleryImageProps {
  url: string;
  title: string;
  open: boolean;
  inPlace: boolean;
  id: number;
  onInPlace: (id: number) => void;
  total: number;
}

function GalleryImage({ url, title, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef<SVGCircleElement>(null);

  const gap = 10;
  const circleRadius = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.4;
  const width = 400;
  const height = 400;
  const scale = 700;
  const bigSize = circleRadius * scale;
  const overlap = 0;

  const getPosSmall = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  });
  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  });
  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 7 });
  const getPosEnd = () => ({ cx: width / 2 - bigSize + overlap, cy: height / 2, r: bigSize });
  const getPosStart = () => ({ cx: width / 2 + bigSize - overlap, cy: height / 2, r: bigSize });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    setLoaded(false);
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration;
      const upDuration = firstLoad ? 0 : 0.2;
      const bounceDuration = firstLoad ? 0.01 : 1;

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, { ...defaults, ...getPosCenter(), duration: upDuration, ease: "power3.inOut" })
          .to(clip.current, {
            ...defaults,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          });
      } else {
        const delay = firstLoad ? 0 : flipDuration + upDuration;
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, { ...defaults, ...getPosCenter(), delay, duration: flipDuration, ease: "power4.out" })
          .to(clip.current, {
            ...defaults,
            motionPath: { path: [getPosSmallAbove(), getPosSmall()], curviness: 1 },
            duration: bounceDuration,
            ease: "bounce.out",
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ height: "100%", width: "100%" }}
    >
      <defs>
        <clipPath id={`${id}_circleClip`}>
          <circle cx="0" cy="0" r={circleRadius} ref={clip} />
        </clipPath>
        <clipPath id={`${id}_squareClip`}>
          <rect width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        <image width={width} height={height} href={url} style={{ pointerEvents: "none" }} />
      </g>
    </svg>
  );
}

interface TabsProps {
  images: ImageData[];
  onSelect: (index: number) => void;
}

function Tabs({ images, onSelect }: TabsProps) {
  const gap = 10;
  const circleRadius = 7;
  const width = 400;
  const height = 400;

  const getPosX = (i: number) =>
    width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap);
  const getPosY = () => height - 30;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ height: "100%", width: "100%" }}
    >
      {images.map((image, i) => (
        <g key={image.url} style={{ pointerEvents: "auto" }}>
          <defs>
            <clipPath id={`tab_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          <image
            x={getPosX(i) - circleRadius}
            y={getPosY() - circleRadius}
            width={circleRadius * 2}
            height={circleRadius * 2}
            href={image.url}
            clipPath={`url(#tab_${i}_clip)`}
            style={{ pointerEvents: "none" }}
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            style={{ cursor: "pointer", fill: "rgba(255,255,255,0)", stroke: "rgba(255,255,255,0.7)", transition: "all 0.3s" }}
            strokeWidth="2"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 2}
          />
        </g>
      ))}
    </svg>
  );
}
