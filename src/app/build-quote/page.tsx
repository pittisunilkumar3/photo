"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./build-quote.css";

const STEP1_OPTIONS = [
  { 
    id: "candid", 
    label: "Candid Photography", 
    icon: "📷", 
    description: "Natural, spontaneous moments captured beautifully",
    image: "/images/candid-wedding.jpg"
  },
  { 
    id: "traditional", 
    label: "Traditional Photography", 
    icon: "📸", 
    description: "Classic posed shots with family and friends",
    image: "/images/traditional-wedding.jpg"
  },
];

const STEP2_OPTIONS = [
  { 
    id: "traditional-photo", 
    label: "Traditional Photo", 
    icon: "📸", 
    description: "Classic posed photographs",
    image: "/images/traditional-photo-real.jpg"
  },
  { 
    id: "traditional-video", 
    label: "Traditional Video", 
    icon: "🎥", 
    description: "Full event video coverage",
    image: "/images/traditional-video-real.jpg"
  },
  { 
    id: "candid-photo", 
    label: "Candid Photo", 
    icon: "📷", 
    description: "Natural, spontaneous moments",
    image: "/images/candid-photo-real.jpg"
  },
  { 
    id: "candid-video", 
    label: "Candid Video", 
    icon: "🎬", 
    description: "Cinematic candid footage",
    image: "/images/candid-video-real.jpg"
  },
  { 
    id: "drone", 
    label: "Drone", 
    icon: "🚁", 
    description: "Aerial shots & coverage",
    image: "/images/drone-wedding.jpg"
  },
];

export default function BuildQuotePage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Selected, setStep1Selected] = useState<string[]>([]);
  const [step2Selected, setStep2Selected] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const toggleStep1 = (id: string) => {
    setStep1Selected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    setShowError(false);
  };

  const toggleStep2 = (id: string) => {
    setStep2Selected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
    setShowError(false);
  };

  const handleNext = () => {
    if (currentStep === 1 && step1Selected.length === 0) {
      setShowError(true);
      return;
    }
    if (currentStep === 2 && step2Selected.length === 0) {
      setShowError(true);
      return;
    }
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
    } else {
      alert(`Step 1: ${step1Selected.join(", ")}\nStep 2: ${step2Selected.join(", ")}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowError(false);
    }
  };

  const renderOptionCard = (option: any, isSelected: boolean, onClick: () => void) => (
    <div
      key={option.id}
      onClick={onClick}
      style={{
        width: 280,
        cursor: "pointer",
        borderRadius: 16,
        overflow: "hidden",
        border: isSelected 
          ? "3px solid #c9a55c" 
          : "3px solid rgba(255,255,255,0.1)",
        background: isSelected 
          ? "rgba(201,165,92,0.1)" 
          : "rgba(255,255,255,0.05)",
        transition: "all 0.3s ease",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
        boxShadow: isSelected 
          ? "0 10px 40px rgba(201,165,92,0.3)" 
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image */}
      <div style={{
        position: "relative",
        height: 220,
        overflow: "hidden",
        background: "#1a1a1a",
      }}>
        <img
          src={option.image}
          alt={option.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            transform: isSelected ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: isSelected 
            ? "linear-gradient(to top, rgba(201,165,92,0.6), transparent)" 
            : "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
          transition: "all 0.3s ease",
        }} />
        
        {/* Icon */}
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: isSelected ? "#c9a55c" : "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
        }}>
          {option.icon}
        </div>

        {/* Checkmark */}
        {isSelected && (
          <div style={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#c9a55c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: "#fff",
            fontWeight: 700,
          }}>
            ✓
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: "18px 16px" }}>
        <h3 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: 18,
          fontWeight: 700,
          color: isSelected ? "#c9a55c" : "#fff",
          marginBottom: 6,
          transition: "color 0.3s ease",
        }}>
          {option.label}
        </h3>
        <p style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.6)",
          margin: 0,
          lineHeight: 1.4,
        }}>
          {option.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="build-quote-page">
      {/* Hero Section */}
      <section className="quote-hero">
        <div className="quote-hero-bg">
          <img src="/images/wedding1.jpg" alt="Wedding" className="quote-hero-img" />
        </div>
        <div className="quote-hero-overlay" />
        <div className="quote-hero-content">
          <div className="quote-hero-badge">
            <img src="/images/logo1.jpeg" alt="COUPLE AURA" className="quote-hero-logo" />
            <span>COUPLE AURA</span>
          </div>
          <h1 className="quote-hero-title">
            Ready To Build Your Own<br />
            <span className="text-gold">Wedding Quotation?</span>
          </h1>
          <p className="quote-hero-subtitle">
            Select what you love and get instant pricing with a real quote
          </p>
          {!started && (
            <button className="quote-hero-btn" onClick={() => setStarted(true)}>
              Start Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* Steps Section */}
      {started && (
        <section style={{
          padding: "80px 20px",
          background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ maxWidth: 1000, width: "100%", textAlign: "center" }}>
            
            {/* Step Indicator */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              marginBottom: 40,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: currentStep >= 1 ? "#c9a55c" : "rgba(255,255,255,0.3)",
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: currentStep >= 1 ? "#c9a55c" : "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                }}>1</div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Photography</span>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: currentStep >= 2 ? "#c9a55c" : "rgba(255,255,255,0.3)",
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: currentStep >= 2 ? "#c9a55c" : "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                }}>2</div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Engagement</span>
              </div>
            </div>

            {/* Step 1: Photography Selection */}
            {currentStep === 1 && (
              <>
                <h2 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(24px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                }}>
                  What Photography do you want?
                </h2>
                <p style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 50,
                }}>
                  Select one or both options to continue
                </p>

                <div style={{
                  display: "flex",
                  gap: 30,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 40,
                }}>
                  {STEP1_OPTIONS.map(option => 
                    renderOptionCard(option, step1Selected.includes(option.id), () => toggleStep1(option.id))
                  )}
                </div>
              </>
            )}

            {/* Step 2: Engagement */}
            {currentStep === 2 && (
              <>
                <h2 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(24px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                }}>
                  Engagement
                </h2>
                <p style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 50,
                }}>
                  Select the services you need for your engagement
                </p>

                <div style={{
                  display: "flex",
                  gap: 24,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: 40,
                }}>
                  {STEP2_OPTIONS.map(option => 
                    renderOptionCard(option, step2Selected.includes(option.id), () => toggleStep2(option.id))
                  )}
                </div>
              </>
            )}

            {/* Error Message */}
            {showError && (
              <div style={{
                padding: "14px 24px",
                background: "rgba(220, 53, 69, 0.15)",
                border: "1px solid rgba(220, 53, 69, 0.3)",
                borderRadius: 12,
                color: "#ff6b6b",
                fontSize: 15,
                fontWeight: 500,
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                maxWidth: 400,
                margin: "0 auto 24px",
              }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                You need to select at least one item to continue
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}>
              {/* Previous Button */}
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    background: "transparent",
                    color: "#c9a55c",
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: 50,
                    border: "2px solid #c9a55c",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,165,92,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Previous Step
                </button>
              )}

              {/* Next Button */}
              <button
                onClick={handleNext}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(201,165,92,0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(201,165,92,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,165,92,0.3)";
                }}
              >
                Next Step
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="quote-footer">
        <div className="quote-footer-grid">
          <div className="quote-footer-brand">
            <img src="/images/logo1.jpeg" alt="COUPLE AURA" className="quote-footer-logo" />
            <span className="quote-footer-brand-name">COUPLE AURA</span>
            <p>Capturing love stories with artistry and passion.</p>
          </div>
          <div className="quote-footer-links">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/build-quote">Build Quote</Link>
            <Link href="/our-clicks">Our Clicks</Link>
          </div>
          <div className="quote-footer-contact">
            <h4>Contact Us</h4>
            <a href="mailto:hello@coupleaura.com">hello@coupleaura.com</a>
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
        </div>
        <div className="quote-footer-bottom">
          <p>Made With ❤️ by COUPLE AURA Photography</p>
          <p>© 2024 COUPLE AURA Photography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
