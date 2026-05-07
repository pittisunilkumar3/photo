"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./build-quote.css";

const STEP1_OPTIONS = [
  { id: "candid", label: "Candid Photography", icon: "📷", description: "Natural, spontaneous moments captured beautifully", image: "/images/candid-wedding.jpg" },
  { id: "traditional", label: "Traditional Photography", icon: "📸", description: "Classic posed shots with family and friends", image: "/images/traditional-wedding.jpg" },
];

const STEP2_OPTIONS = [
  { id: "traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/traditional-photo-real.jpg" },
  { id: "traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/traditional-video-real.jpg" },
  { id: "candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/candid-photo-real.jpg" },
  { id: "candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/candid-video-real.jpg" },
  { id: "drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/drone-wedding.jpg" },
];

const STEP3_OPTIONS = [
  { id: "pellikoduku-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/pellikoduku-traditional-photo.jpg" },
  { id: "pellikoduku-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/pellikoduku-traditional-video.jpg" },
  { id: "pellikoduku-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/pellikoduku-candid-photo.jpg" },
];

const STEP4_OPTIONS = [
  { id: "groom-haldi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/groom-haldi-candid-photo.jpg" },
  { id: "groom-haldi-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/groom-haldi-candid-video.jpg" },
];

const STEP5_OPTIONS = [
  { id: "pellikuthuru-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/pellikuthuru-traditional-photo.jpg" },
  { id: "pellikuthuru-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/pellikuthuru-traditional-video.jpg" },
  { id: "pellikuthuru-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/pellikuthuru-candid-photo.jpg" },
];

const STEP6_OPTIONS = [
  { id: "bride-haldi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/bride-haldi-candid-photo.jpg" },
  { id: "bride-haldi-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/bride-haldi-candid-video.jpg" },
];

const STEP7_OPTIONS = [
  { id: "reception-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/reception-traditional-photo.jpg" },
  { id: "reception-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/reception-traditional-video.jpg" },
  { id: "reception-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/reception-candid-photo.jpg" },
  { id: "reception-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/reception-candid-video.jpg" },
  { id: "reception-drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/reception-drone.jpg" },
];

const STEP8_OPTIONS = [
  { id: "bigday-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/bigday-traditional-photo.jpg" },
  { id: "bigday-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/bigday-traditional-video.jpg" },
  { id: "bigday-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/bigday-candid-photo.jpg" },
  { id: "bigday-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/bigday-candid-video.jpg" },
  { id: "bigday-drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/bigday-drone.jpg" },
];

const STEP9_OPTIONS = [
  { id: "vratham-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/vratham-traditional-photo.jpg" },
  { id: "vratham-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/vratham-traditional-video.jpg" },
];

const STEP10_OPTIONS = [
  { id: "sangeet-yes", label: "Yes", icon: "✅", description: "Include Sangeet in the package", image: "/images/sangeet-yes.jpg" },
  { id: "sangeet-no", label: "No", icon: "❌", description: "Skip Sangeet from the package", image: "/images/sangeet-no.jpg" },
];

export default function BuildQuotePage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Selected, setStep1Selected] = useState<string[]>([]);
  const [step2Selected, setStep2Selected] = useState<string[]>([]);
  const [step3Selected, setStep3Selected] = useState<string[]>([]);
  const [step4Selected, setStep4Selected] = useState<string[]>([]);
  const [step5Selected, setStep5Selected] = useState<string[]>([]);
  const [step6Selected, setStep6Selected] = useState<string[]>([]);
  const [step7Selected, setStep7Selected] = useState<string[]>([]);
  const [step8Selected, setStep8Selected] = useState<string[]>([]);
  const [step9Selected, setStep9Selected] = useState<string[]>([]);
  const [step10Selected, setStep10Selected] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const toggleStep1 = (id: string) => { setStep1Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep2 = (id: string) => { setStep2Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep3 = (id: string) => { setStep3Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep4 = (id: string) => { setStep4Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep5 = (id: string) => { setStep5Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep6 = (id: string) => { setStep6Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep7 = (id: string) => { setStep7Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep8 = (id: string) => { setStep8Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep9 = (id: string) => { setStep9Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };
  const toggleStep10 = (id: string) => { setStep10Selected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]); setShowError(false); };

  const handleNext = () => {
    if (currentStep === 1 && step1Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 2 && step2Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 3 && step3Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 4 && step4Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 5 && step5Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 6 && step6Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 7 && step7Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 8 && step8Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 9 && step9Selected.length === 0) { setShowError(true); return; }
    if (currentStep === 10 && step10Selected.length === 0) { setShowError(true); return; }
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
    } else {
      alert(`Step 1: ${step1Selected.join(", ")}\nStep 2: ${step2Selected.join(", ")}\nStep 3: ${step3Selected.join(", ")}\nStep 4: ${step4Selected.join(", ")}\nStep 5: ${step5Selected.join(", ")}\nStep 6: ${step6Selected.join(", ")}\nStep 7: ${step7Selected.join(", ")}\nStep 8: ${step8Selected.join(", ")}\nStep 9: ${step9Selected.join(", ")}\nStep 10: ${step10Selected.join(", ")}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowError(false);
    }
  };

  const renderOptionCard = (option: any, isSelected: boolean, onClick: () => void) => (
    <div key={option.id} onClick={onClick} style={{
      width: 280, cursor: "pointer", borderRadius: 16, overflow: "hidden",
      border: isSelected ? "3px solid #c9a55c" : "3px solid rgba(255,255,255,0.1)",
      background: isSelected ? "rgba(201,165,92,0.1)" : "rgba(255,255,255,0.05)",
      transition: "all 0.3s ease", transform: isSelected ? "scale(1.02)" : "scale(1)",
      boxShadow: isSelected ? "0 10px 40px rgba(201,165,92,0.3)" : "0 4px 20px rgba(0,0,0,0.3)",
    }}>
      <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#1a1a1a" }}>
        <img src={option.image} alt={option.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: isSelected ? "scale(1.05)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: isSelected ? "linear-gradient(to top, rgba(201,165,92,0.6), transparent)" : "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", transition: "all 0.3s ease" }} />
        <div style={{ position: "absolute", top: 12, right: 12, width: 44, height: 44, borderRadius: "50%", background: isSelected ? "#c9a55c" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, transition: "all 0.3s ease", backdropFilter: "blur(10px)" }}>
          {option.icon}
        </div>
        {isSelected && (
          <div style={{ position: "absolute", top: 12, left: 12, width: 28, height: 28, borderRadius: "50%", background: "#c9a55c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", fontWeight: 700 }}>
            ✓
          </div>
        )}
      </div>
      <div style={{ padding: "18px 16px" }}>
        <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 18, fontWeight: 700, color: isSelected ? "#c9a55c" : "#fff", marginBottom: 6, transition: "color 0.3s ease" }}>
          {option.label}
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.4 }}>
          {option.description}
        </p>
      </div>
    </div>
  );

  const getCurrentOptions = () => {
    switch (currentStep) {
      case 1: return STEP1_OPTIONS;
      case 2: return STEP2_OPTIONS;
      case 3: return STEP3_OPTIONS;
      case 4: return STEP4_OPTIONS;
      case 5: return STEP5_OPTIONS;
      case 6: return STEP6_OPTIONS;
      case 7: return STEP7_OPTIONS;
      case 8: return STEP8_OPTIONS;
      case 9: return STEP9_OPTIONS;
      case 10: return STEP10_OPTIONS;
      default: return STEP1_OPTIONS;
    }
  };

  const getSelectedForStep = () => {
    switch (currentStep) {
      case 1: return step1Selected;
      case 2: return step2Selected;
      case 3: return step3Selected;
      case 4: return step4Selected;
      case 5: return step5Selected;
      case 6: return step6Selected;
      case 7: return step7Selected;
      case 8: return step8Selected;
      case 9: return step9Selected;
      case 10: return step10Selected;
      default: return step1Selected;
    }
  };

  const getToggleForStep = () => {
    switch (currentStep) {
      case 1: return toggleStep1;
      case 2: return toggleStep2;
      case 3: return toggleStep3;
      case 4: return toggleStep4;
      case 5: return toggleStep5;
      case 6: return toggleStep6;
      case 7: return toggleStep7;
      case 8: return toggleStep8;
      case 9: return toggleStep9;
      case 10: return toggleStep10;
      default: return toggleStep1;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "What Photography do you want?";
      case 2: return "Engagement";
      case 3: return "Pellikoduku";
      case 4: return "Groom Haldi";
      case 5: return "Pellikuthuru";
      case 6: return "Bride Haldi";
      case 7: return "Reception";
      case 8: return "The Big Day";
      case 9: return "Vratham";
      case 10: return "Do we have Sangeet?";
      default: return "Select Options";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Select one or both options to continue";
      case 2: return "Select the services you need for your engagement";
      case 3: return "Select the services you need for Pellikoduku";
      case 4: return "Select the services you need for Groom Haldi";
      case 5: return "Select the services you need for Pellikuthuru";
      case 6: return "Select the services you need for Bride Haldi";
      case 7: return "Select the services you need for Reception";
      case 8: return "Select the services you need for The Big Day";
      case 9: return "Select the services you need for Vratham";
      case 10: return "Would you like to include Sangeet?";
      default: return "Select options to continue";
    }
  };

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
              gap: 8,
              marginBottom: 40,
              flexWrap: "wrap",
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(step => (
                <div key={step} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: currentStep >= step ? "#c9a55c" : "rgba(255,255,255,0.3)",
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: currentStep >= step ? "#c9a55c" : "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                  }}>{step}</div>
                  <span style={{ fontSize: 9, fontWeight: 600 }}>
                    {step === 1 ? "Photo" : step === 2 ? "Engage" : step === 3 ? "Pelli" : step === 4 ? "G.Haldi" : step === 5 ? "Pelli" : step === 6 ? "B.Haldi" : step === 7 ? "Recep" : step === 8 ? "BigDay" : step === 9 ? "Vratham" : "Sangeet"}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Title */}
            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 12,
            }}>
              {getStepTitle()}
            </h2>
            <p style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 50,
            }}>
              {getStepDescription()}
            </p>

            {/* Options Grid */}
            <div style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 40,
            }}>
              {getCurrentOptions().map(option => 
                renderOptionCard(
                  option, 
                  getSelectedForStep().includes(option.id), 
                  () => getToggleForStep()(option.id)
                )
              )}
            </div>

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
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,165,92,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Previous Step
                </button>
              )}

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
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(201,165,92,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,165,92,0.3)"; }}
              >
                {currentStep === 10 ? "Get Quote" : "Next Step"}
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
