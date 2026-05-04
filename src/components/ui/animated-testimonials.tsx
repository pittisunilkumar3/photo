"use client";

import * as React from "react";
import { motion, type Variants, type Easing } from "framer-motion";

interface Testimonial {
  imgSrc: string;
  alt: string;
}

interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  ctaText: string;
  ctaHref: string;
}

const imagePositions = [
  { top: "5%", left: "15%", className: "hidden lg:block", w: 96, h: 96 },
  { top: "15%", left: "35%", className: "hidden md:block", w: 80, h: 80 },
  { top: "5%", left: "55%", className: "hidden md:block", w: 64, h: 64 },
  { top: "10%", right: "15%", className: "hidden lg:block", w: 112, h: 112 },
  { top: "25%", right: "5%", className: "hidden md:block", w: 80, h: 80 },
  { top: "45%", right: "10%", className: "hidden lg:block", w: 96, h: 96 },
  { top: "50%", left: "5%", className: "hidden md:block", w: 112, h: 112 },
  { bottom: "5%", left: "20%", className: "hidden lg:block", w: 80, h: 80 },
  { bottom: "15%", left: "45%", className: "hidden md:block", w: 64, h: 64 },
  { bottom: "10%", right: "30%", className: "hidden md:block", w: 96, h: 96 },
  { bottom: "2%", right: "15%", className: "hidden lg:block", w: 80, h: 80 },
  { top: "10%", left: "5%", className: "block md:hidden", w: 64, h: 64 },
  { top: "5%", right: "10%", className: "block md:hidden", w: 80, h: 80 },
  { bottom: "5%", left: "10%", className: "block md:hidden", w: 80, h: 80 },
  { bottom: "10%", right: "5%", className: "block md:hidden", w: 64, h: 64 },
];

const imageVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: Math.random() * 0.5,
    },
  },
};

function floatingAnimation(): { y: number[]; transition: { duration: number; repeat: number; repeatType: "reverse"; ease: Easing } } {
  return {
    y: [0, Math.random() * -15 - 5, 0],
    transition: {
      duration: Math.random() * 4 + 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut" as Easing,
    },
  };
}

export function AnimatedTestimonialGrid({
  testimonials,
  badgeText,
  title,
  description,
  ctaText,
  ctaHref,
}: AnimatedTestimonialGridProps) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "100px 16px 120px",
        minHeight: 500,
      }}
    >
      {/* Floating images */}
      {testimonials.slice(0, imagePositions.length).map((testimonial, index) => {
        const pos = imagePositions[index];
        const style: React.CSSProperties = {
          position: "absolute",
          top: pos.top,
          left: pos.left,
          right: pos.right,
          bottom: pos.bottom,
          width: pos.w,
          height: pos.h,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        };

        return (
          <motion.div
            key={index}
            className={pos.className}
            style={style}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.12, zIndex: 20 }}
          >
            <motion.img
              src={testimonial.imgSrc}
              alt={testimonial.alt}
              animate={floatingAnimation()}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          </motion.div>
        );
      })}

      {/* Central content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        {badgeText && (
          <div
            style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: 999,
              background: "rgba(201,165,92,0.12)",
              color: "#c9a55c",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            {badgeText}
          </div>
        )}
        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#1a1a1a",
            marginBottom: 16,
            maxWidth: 700,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "#666",
            maxWidth: 520,
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          {description}
        </p>
        <a
          href={ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 32px",
            borderRadius: 999,
            background: "#c9a55c",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(201,165,92,0.3)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#b8933f";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#c9a55c";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          {ctaText}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
