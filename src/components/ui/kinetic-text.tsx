"use client";

import React, { useEffect, useRef, useState } from "react";

interface KineticTextProps {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
  interval?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function KineticText({
  words,
  className,
  style,
  interval = 3500,
  tag: Tag = "span",
}: KineticTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let animTimeout: ReturnType<typeof setTimeout>;
    let cycleTimeout: ReturnType<typeof setTimeout>;
    let mounted = true;

    function animateWord() {
      if (!mounted || !el) return;
      const word = words[indexRef.current];
      el.innerHTML = "";

      const chars = word.split("").map((char, i) => {
        const span = document.createElement("span");
        span.className = "kinetic-char";
        span.textContent = char === " " ? "\u00A0" : char;

        const fromX = (Math.random() - 0.5) * 600;
        const fromY = (Math.random() - 0.5) * 600;
        const fromZ = (Math.random() - 0.5) * 400;
        const fromRotX = (Math.random() - 0.5) * 360;
        const fromRotY = (Math.random() - 0.5) * 360;

        span.style.setProperty("--kf-from", `translate3d(${fromX}px,${fromY}px,${fromZ}px) rotateX(${fromRotX}deg) rotateY(${fromRotY}deg)`);
        span.style.animationName = "kinetic-fly-in";
        span.style.animationDelay = `${i * 0.05}s`;
        span.style.animationPlayState = "running";

        el.appendChild(span);
        return span;
      });

      animTimeout = setTimeout(() => {
        if (!mounted) return;
        chars.forEach((span, i) => {
          const toX = (Math.random() - 0.5) * 600;
          const toY = (Math.random() - 0.5) * 600;
          const toZ = (Math.random() - 0.5) * 400;
          const toRotX = (Math.random() - 0.5) * 360;
          const toRotY = (Math.random() - 0.5) * 360;

          span.style.setProperty("--kf-to", `translate3d(${toX}px,${toY}px,${toZ}px) rotateX(${toRotX}deg) rotateY(${toRotY}deg)`);
          span.style.animationName = "kinetic-fly-out";
          span.style.animationDelay = `${(chars.length - i) * 0.04}s`;
        });
      }, interval - 1000);

      cycleTimeout = setTimeout(() => {
        if (!mounted) return;
        indexRef.current = (indexRef.current + 1) % words.length;
        animateWord();
      }, interval);
    }

    animateWord();

    return () => {
      mounted = false;
      clearTimeout(animTimeout);
      clearTimeout(cycleTimeout);
    };
  }, [words, interval]);

  return (
    <Tag ref={textRef as React.RefObject<never>} className={className} style={{ ...style, perspective: 800, display: "inline-block" }} />
  );
}

/* ===== Single-word kinetic (no cycling, one-time fly-in on scroll) ===== */
export function KineticOnce({
  text,
  className,
  style,
  tag: Tag = "span",
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !triggered) return;

    el.innerHTML = "";
    const chars = text.split("").map((char, i) => {
      const span = document.createElement("span");
      span.className = "kinetic-char";
      span.textContent = char === " " ? "\u00A0" : char;

      const fromX = (Math.random() - 0.5) * 500;
      const fromY = (Math.random() - 0.5) * 500;
      const fromZ = (Math.random() - 0.5) * 300;
      const fromRotX = (Math.random() - 0.5) * 360;
      const fromRotY = (Math.random() - 0.5) * 360;

      span.style.setProperty("--kf-from", `translate3d(${fromX}px,${fromY}px,${fromZ}px) rotateX(${fromRotX}deg) rotateY(${fromRotY}deg)`);
      span.style.animationName = "kinetic-fly-in";
      span.style.animationDelay = `${delay + i * 0.04}s`;
      span.style.animationPlayState = "running";

      el.appendChild(span);
      return span;
    });

    // After animation, set final inline text
    const timeout = setTimeout(() => {
      if (el) el.textContent = text;
    }, delay + chars.length * 40 + 700);

    return () => clearTimeout(timeout);
  }, [triggered, text, delay]);

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} style={{ ...style, perspective: 800, display: "inline-block" }} />
  );
}
