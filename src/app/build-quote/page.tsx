"use client";

import React from "react";
import Link from "next/link";
import "./build-quote.css";

export default function BuildQuotePage() {
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
          <a href="#how-it-works" className="quote-hero-btn">
            Build Your Quote
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Video Section */}
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

      {/* How It Works */}
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
            <a
              href="#quote-builder"
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
                textDecoration: "none",
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
            </a>
          </div>
        </div>
      </section>

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
