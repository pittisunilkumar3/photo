"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./build-quote.css";

/* ── Types ── */
interface QuoteSelections {
  events: string[];
  photographyTypes: string[];
  duration: number;
  albumType: string;
  outputFormat: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  message: string;
}

/* ── Data ── */
const EVENTS = [
  { id: "wedding", label: "Wedding Day", icon: "💍", price: 50000 },
  { id: "prewedding", label: "Pre-Wedding", icon: "💑", price: 25000 },
  { id: "engagement", label: "Engagement", icon: "💍", price: 20000 },
  { id: "reception", label: "Reception", icon: "🎉", price: 30000 },
  { id: "haldi", label: "Haldi", icon: "🌼", price: 15000 },
  { id: "mehndi", label: "Mehndi", icon: "🌿", price: 15000 },
  { id: "sangeet", label: "Sangeet", icon: "🎵", price: 20000 },
];

const PHOTOGRAPHY_TYPES = [
  { id: "candid", label: "Candid Photography", icon: "📷", description: "Natural, spontaneous moments captured beautifully", price: 30000 },
  { id: "traditional", label: "Traditional Photography", icon: "📸", description: "Classic posed shots with family and friends", price: 20000 },
  { id: "cinematic", label: "Cinematic Video", icon: "🎬", description: "Movie-style wedding film with storytelling", price: 45000 },
  { id: "drone", label: "Drone / Aerial", icon: "🚁", description: "Stunning aerial views of your venue and celebrations", price: 25000 },
  { id: "album", label: "Photo Album", icon: "📖", description: "Premium quality printed album with your best shots", price: 15000 },
  { id: "instant", label: "Instant Prints", icon: "🖼️", description: "On-site photo prints for guests to take home", price: 10000 },
];

const ALBUM_TYPES = [
  { id: "none", label: "No Album", price: 0 },
  { id: "classic", label: "Classic Album", price: 15000 },
  { id: "premium", label: "Premium Leather", price: 30000 },
  { id: "luxury", label: "Luxury Coffee Table", price: 50000 },
];

const OUTPUT_FORMATS = [
  { id: "photos", label: "Digital Photos", icon: "🖼️", price: 0 },
  { id: "video", label: "Highlight Video", icon: "🎥", price: 20000 },
  { id: "fullvideo", label: "Full Length Video", icon: "📹", price: 35000 },
  { id: "reel", label: "Social Media Reels", icon: "📱", price: 10000 },
];

export default function BuildQuotePage() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<QuoteSelections>({
    events: [],
    photographyTypes: [],
    duration: 8,
    albumType: "none",
    outputFormat: [],
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    venue: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ── Helpers ── */
  const toggleSelection = (field: "events" | "photographyTypes" | "outputFormat", id: string) => {
    setSelections(prev => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter(item => item !== id)
        : [...prev[field], id],
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    selections.events.forEach(id => {
      const event = EVENTS.find(e => e.id === id);
      if (event) total += event.price;
    });
    selections.photographyTypes.forEach(id => {
      const type = PHOTOGRAPHY_TYPES.find(t => t.id === id);
      if (type) total += type.price;
    });
    const album = ALBUM_TYPES.find(a => a.id === selections.albumType);
    if (album) total += album.price;
    selections.outputFormat.forEach(id => {
      const format = OUTPUT_FORMATS.find(f => f.id === id);
      if (format) total += format.price;
    });
    // Duration multiplier
    if (selections.duration > 8) {
      total += (selections.duration - 8) * 5000;
    }
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const total = calculateTotal();

  /* ── Render ── */
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
          <a href="#quote-builder" className="quote-hero-btn">
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
      <section className="quote-how-it-works">
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

      {/* Quote Builder */}
      <section className="quote-builder" id="quote-builder">
        <div className="quote-builder-container">
          {/* Progress Bar */}
          <div className="quote-progress">
            <div className="quote-progress-steps">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`quote-progress-step ${step >= i ? "active" : ""}`}>
                  <div className="quote-progress-circle">{i}</div>
                  <span className="quote-progress-label">
                    {i === 1 ? "Events" : i === 2 ? "Photography" : i === 3 ? "Albums" : "Details"}
                  </span>
                </div>
              ))}
            </div>
            <div className="quote-progress-bar">
              <div className="quote-progress-fill" style={{ width: `${((step - 1) / 3) * 100}%` }} />
            </div>
          </div>

          {/* Live Price Display */}
          <div className="quote-live-price">
            <div className="quote-price-label">Your Estimated Quote</div>
            <div className="quote-price-value">
              ₹{total.toLocaleString("en-IN")}
            </div>
            <div className="quote-price-note">*Prices may vary based on requirements</div>
          </div>

          {/* Step 1: Events */}
          {step === 1 && (
            <div className="quote-step-content">
              <h2 className="quote-step-title">
                How Much To Shoot My Wedding?
              </h2>
              <p className="quote-step-description">
                Let&apos;s estimate the cost by selecting the Events, Albums & Output duration
              </p>

              <div className="quote-events-grid">
                {EVENTS.map(event => (
                  <button
                    key={event.id}
                    className={`quote-event-card ${selections.events.includes(event.id) ? "selected" : ""}`}
                    onClick={() => toggleSelection("events", event.id)}
                  >
                    <span className="quote-event-icon">{event.icon}</span>
                    <span className="quote-event-label">{event.label}</span>
                    <span className="quote-event-price">₹{event.price.toLocaleString("en-IN")}</span>
                    {selections.events.includes(event.id) && (
                      <span className="quote-event-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Duration Slider */}
              <div className="quote-duration-section">
                <label className="quote-duration-label">
                  Coverage Duration: <strong>{selections.duration} hours</strong>
                </label>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={selections.duration}
                  onChange={e => setSelections(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="quote-duration-slider"
                />
                <div className="quote-duration-range">
                  <span>4 hrs</span>
                  <span>8 hrs</span>
                  <span>12 hrs</span>
                  <span>16 hrs</span>
                  <span>24 hrs</span>
                </div>
                {selections.duration > 8 && (
                  <div className="quote-duration-extra">
                    + ₹{((selections.duration - 8) * 5000).toLocaleString("en-IN")} for extra {selections.duration - 8} hours
                  </div>
                )}
              </div>

              <div className="quote-nav-buttons">
                <div />
                <button className="quote-btn-next" onClick={() => setStep(2)}>
                  NEXT STEP
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Photography Types */}
          {step === 2 && (
            <div className="quote-step-content">
              <h2 className="quote-step-title">
                What Photography Do You Want?
              </h2>
              <p className="quote-step-description">
                Choose the styles and services that match your vision
              </p>

              <div className="quote-photo-grid">
                {PHOTOGRAPHY_TYPES.map(type => (
                  <button
                    key={type.id}
                    className={`quote-photo-card ${selections.photographyTypes.includes(type.id) ? "selected" : ""}`}
                    onClick={() => toggleSelection("photographyTypes", type.id)}
                  >
                    <div className="quote-photo-icon">{type.icon}</div>
                    <div className="quote-photo-info">
                      <h3 className="quote-photo-label">{type.label}</h3>
                      <p className="quote-photo-desc">{type.description}</p>
                    </div>
                    <div className="quote-photo-price">₹{type.price.toLocaleString("en-IN")}</div>
                    {selections.photographyTypes.includes(type.id) && (
                      <div className="quote-photo-check">✓</div>
                    )}
                  </button>
                ))}
              </div>

              <div className="quote-nav-buttons">
                <button className="quote-btn-prev" onClick={() => setStep(1)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  PREVIOUS
                </button>
                <button className="quote-btn-next" onClick={() => setStep(3)}>
                  NEXT STEP
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Albums & Output */}
          {step === 3 && (
            <div className="quote-step-content">
              <h2 className="quote-step-title">
                Albums & Output Formats
              </h2>
              <p className="quote-step-description">
                Choose your album type and desired output formats
              </p>

              {/* Album Selection */}
              <div className="quote-album-section">
                <h3 className="quote-subsection-title">Select Album Type</h3>
                <div className="quote-album-grid">
                  {ALBUM_TYPES.map(album => (
                    <button
                      key={album.id}
                      className={`quote-album-card ${selections.albumType === album.id ? "selected" : ""}`}
                      onClick={() => setSelections(prev => ({ ...prev, albumType: album.id }))}
                    >
                      <span className="quote-album-label">{album.label}</span>
                      <span className="quote-album-price">
                        {album.price === 0 ? "Free" : `₹${album.price.toLocaleString("en-IN")}`}
                      </span>
                      {selections.albumType === album.id && (
                        <span className="quote-album-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Formats */}
              <div className="quote-output-section">
                <h3 className="quote-subsection-title">Output Formats</h3>
                <div className="quote-output-grid">
                  {OUTPUT_FORMATS.map(format => (
                    <button
                      key={format.id}
                      className={`quote-output-card ${selections.outputFormat.includes(format.id) ? "selected" : ""}`}
                      onClick={() => toggleSelection("outputFormat", format.id)}
                    >
                      <span className="quote-output-icon">{format.icon}</span>
                      <span className="quote-output-label">{format.label}</span>
                      <span className="quote-output-price">
                        {format.price === 0 ? "Included" : `+₹${format.price.toLocaleString("en-IN")}`}
                      </span>
                      {selections.outputFormat.includes(format.id) && (
                        <span className="quote-output-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quote-nav-buttons">
                <button className="quote-btn-prev" onClick={() => setStep(2)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  PREVIOUS
                </button>
                <button className="quote-btn-next" onClick={() => setStep(4)}>
                  NEXT STEP
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact & Seal the Deal */}
          {step === 4 && !isSubmitted && (
            <div className="quote-step-content">
              <h2 className="quote-step-title">
                Seal The Deal And Save The Date
              </h2>
              <p className="quote-step-description">
                Enter your details to receive a personalized quote via email, connect with our team to finalize the details and reserve your spot with a 30% deposit to secure your special day
              </p>

              {/* Quote Summary */}
              <div className="quote-summary">
                <h3 className="quote-summary-title">Your Quote Summary</h3>
                <div className="quote-summary-items">
                  {selections.events.map(id => {
                    const event = EVENTS.find(e => e.id === id);
                    return event ? (
                      <div key={id} className="quote-summary-item">
                        <span>{event.icon} {event.label}</span>
                        <span>₹{event.price.toLocaleString("en-IN")}</span>
                      </div>
                    ) : null;
                  })}
                  {selections.photographyTypes.map(id => {
                    const type = PHOTOGRAPHY_TYPES.find(t => t.id === id);
                    return type ? (
                      <div key={id} className="quote-summary-item">
                        <span>{type.icon} {type.label}</span>
                        <span>₹{type.price.toLocaleString("en-IN")}</span>
                      </div>
                    ) : null;
                  })}
                  {selections.albumType !== "none" && (
                    <div className="quote-summary-item">
                      <span>📖 {ALBUM_TYPES.find(a => a.id === selections.albumType)?.label}</span>
                      <span>₹{(ALBUM_TYPES.find(a => a.id === selections.albumType)?.price || 0).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {selections.outputFormat.map(id => {
                    const format = OUTPUT_FORMATS.find(f => f.id === id);
                    return format && format.price > 0 ? (
                      <div key={id} className="quote-summary-item">
                        <span>{format.icon} {format.label}</span>
                        <span>₹{format.price.toLocaleString("en-IN")}</span>
                      </div>
                    ) : null;
                  })}
                  {selections.duration > 8 && (
                    <div className="quote-summary-item">
                      <span>⏰ Extra {selections.duration - 8} hours</span>
                      <span>₹{((selections.duration - 8) * 5000).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>
                <div className="quote-summary-total">
                  <span>Estimated Total</span>
                  <span className="quote-total-value">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="quote-deposit-note">
                  <span>30% Deposit to Secure</span>
                  <span className="quote-deposit-value">₹{Math.round(total * 0.3).toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Contact Form */}
              <form className="quote-contact-form" onSubmit={handleSubmit}>
                <div className="quote-form-grid">
                  <div className="quote-form-group">
                    <label className="quote-form-label">Full Name *</label>
                    <input
                      type="text"
                      className="quote-form-input"
                      placeholder="John & Jane Doe"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="quote-form-group">
                    <label className="quote-form-label">Email Address *</label>
                    <input
                      type="email"
                      className="quote-form-input"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="quote-form-group">
                    <label className="quote-form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="quote-form-input"
                      placeholder="+91 98765 43210"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="quote-form-group">
                    <label className="quote-form-label">Wedding Date</label>
                    <input
                      type="date"
                      className="quote-form-input"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="quote-form-group full-width">
                    <label className="quote-form-label">Venue / Location</label>
                    <input
                      type="text"
                      className="quote-form-input"
                      placeholder="City, Venue Name"
                      value={formData.venue}
                      onChange={e => setFormData({ ...formData, venue: e.target.value })}
                    />
                  </div>
                  <div className="quote-form-group full-width">
                    <label className="quote-form-label">Additional Message</label>
                    <textarea
                      className="quote-form-textarea"
                      placeholder="Tell us about your special day, any special requests..."
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="quote-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Your Quote..." : "Get My Personalized Quote"}
                  {!isSubmitting && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                      <path d="m21.854 2.147-10.94 10.939" />
                    </svg>
                  )}
                </button>
              </form>

              <div className="quote-nav-buttons">
                <button className="quote-btn-prev" onClick={() => setStep(3)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  PREVIOUS
                </button>
                <div />
              </div>
            </div>
          )}

          {/* Success State */}
          {isSubmitted && (
            <div className="quote-success">
              <div className="quote-success-icon">🎉</div>
              <h2 className="quote-success-title">Quote Request Sent Successfully!</h2>
              <p className="quote-success-message">
                Thank you for choosing COUPLE AURA! We&apos;ve sent your personalized quote to <strong>{formData.email}</strong>. 
                Our team will contact you within 24 hours to finalize the details.
              </p>
              <div className="quote-success-details">
                <div className="quote-success-detail">
                  <span>📞</span>
                  <span>We&apos;ll call you at {formData.phone}</span>
                </div>
                <div className="quote-success-detail">
                  <span>💰</span>
                  <span>Estimated Quote: ₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="quote-success-detail">
                  <span>📅</span>
                  <span>Secure your date with 30% deposit: ₹{Math.round(total * 0.3).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Link href="/" className="quote-success-btn">
                Back to Home
              </Link>
            </div>
          )}
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
