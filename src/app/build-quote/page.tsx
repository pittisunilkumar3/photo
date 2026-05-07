"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./build-quote.css";

const PHOTOGRAPHY_TYPES = [
  { 
    id: "candid", 
    label: "Candid Photography", 
    icon: "📷", 
    description: "Natural, spontaneous moments captured beautifully",
    image: "/images/portrait1.jpg"
  },
  { 
    id: "traditional", 
    label: "Traditional Photography", 
    icon: "📸", 
    description: "Classic posed shots with family and friends",
    image: "/images/portrait2.jpg"
  },
];

export default function BuildQuotePage() {
  const [started, setStarted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="build-quote-page">
      {/* Hero Section */}
      <section className="quote-hero">
        <div className="quote-hero-bg">
          <img
            src="/images/wedding1.jpg"
            alt="Wedding Photography"
            className="quote-hero-img"
          />
        </div>
        <div className="quote-hero-overlay" />
        <div className="quote-hero-content">
          <div className="quote-hero-badge">
            <img
              src="/images/logo1.jpeg"
              alt="COUPLE AURA Logo"
              className="quote-hero-logo"
            />
            <span>COUPLE AURA</span>
          </div>
          <h1 className="quote-hero-title">
            Ready To Build Your Own<br />
            <span className="text-gold">Wedding Quotation?</span>
          </h1>
          <p className="quote-hero-subtitle">
            Select what you love and get instant pricing with a real quote that updates as you make your selections
          </p>
          {!started && (
            <button 
              className="quote-hero-btn"
              onClick={() => setStarted(true)}
            >
              Start Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* Photography Selection Section - Shows after clicking Start Now */}
      {started && (
        <section className="quote-photography-section" style={{
          padding: "80px 20px",
          background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            maxWidth: 900,
            width: "100%",
            textAlign: "center",
          }}>
            {/* Question */}
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

            {/* Photography Options */}
            <div style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 50,
            }}>
              {PHOTOGRAPHY_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type.id);
                return (
                  <div
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    style={{
                      width: 320,
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
                    {/* Camera Image */}
                    <div style={{
                      position: "relative",
                      height: 220,
                      overflow: "hidden",
                    }}>
                      <img
                        src={type.image}
                        alt={type.label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                          transform: isSelected ? "scale(1.05)" : "scale(1)",
                        }}
                      />
                      {/* Overlay */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: isSelected 
                          ? "linear-gradient(to top, rgba(201,165,92,0.8), transparent)" 
                          : "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                        transition: "all 0.3s ease",
                      }} />
                      
                      {/* Camera Icon */}
                      <div style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: isSelected 
                          ? "#c9a55c" 
                          : "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                      }}>
                        {type.icon}
                      </div>

                      {/* Checkmark */}
                      {isSelected && (
                        <div style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#c9a55c",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          color: "#fff",
                          fontWeight: 700,
                        }}>
                          ✓
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div style={{
                      padding: "24px 20px",
                    }}>
                      <h3 style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: isSelected ? "#c9a55c" : "#fff",
                        marginBottom: 8,
                        transition: "color 0.3s ease",
                      }}>
                        {type.label}
                      </h3>
                      <p style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.6)",
                        margin: 0,
                        lineHeight: 1.5,
                      }}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Step Button */}
            {selectedTypes.length > 0 && (
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)",
                  color: "#fff",
                  fontSize: 16,
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
                onClick={() => alert(`Selected: ${selectedTypes.join(", ")}`)}
              >
                Next Step
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </section>
      )}

      {/* Video Section - Only show when not started */}
      {!started && (
        <section className="quote-video-section">
          <div className="quote-video-container">
            <div className="quote-video-image-side">
              <img
                src="/images/wedding2.jpg"
                alt="Wedding Cinematic"
                className="quote-video-thumb"
              />
              <div className="quote-video-play-overlay">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            <div className="quote-video-text-side">
              <h2 className="quote-video-title">Watch Our Quick Video</h2>
              <p className="quote-video-description">
                Discover our services, including candid photography, traditional photography, albums, and more
              </p>
              <ul className="quote-video-features">
                <li>📷 Candid & Traditional Photography</li>
                <li>🎬 Cinematic Wedding Films</li>
                <li>📖 Premium Photo Albums</li>
                <li>🚁 Drone / Aerial Coverage</li>
                <li>📱 Social Media Reels</li>
              </ul>
              <button className="quote-video-play-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Video
              </button>
            </div>
          </div>
        </section>
      )}

      {/* How It Works - Only show when not started */}
      {!started && (
        <section className="quote-how-it-works" id="how-it-works">
          <div className="quote-how-container">
            <h2 className="section-title">Build Your Quote</h2>
            <p className="section-subtitle">
              Select what you love and get instant pricing with a real quote that updates as you make your selections
            </p>
            
            <div className="quote-steps-grid">
              <div className="quote-step-card">
                <div className="quote-step-number">01</div>
                <div className="quote-step-icon">📋</div>
                <h3>Select Your Events</h3>
              </div>
              <div className="quote-step-card">
                <div className="quote-step-number">02</div>
                <div className="quote-step-icon">📷</div>
                <h3>Pick Photography Style</h3>
              </div>
              <div className="quote-step-card">
                <div className="quote-step-number">03</div>
                <div className="quote-step-icon">🎁</div>
                <h3>Add Albums & Output</h3>
              </div>
              <div className="quote-step-card">
                <div className="quote-step-number">04</div>
                <div className="quote-step-icon">✨</div>
                <h3>Seal The Deal</h3>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button
                onClick={() => setStarted(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)",
                  color: "#fff",
                  fontSize: 16,
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
                Start Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <img
              src="/images/logo1.jpeg"
              alt="COUPLE AURA Logo"
              className="quote-footer-logo"
            />
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
