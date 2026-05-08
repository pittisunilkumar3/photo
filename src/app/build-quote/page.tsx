"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./build-quote.css";

// Price mapping
const PRICES: Record<string, number> = {
  "candid": 18000, "traditional": 12000,
  "traditional-photo": 12000, "traditional-video": 18000, "candid-photo": 18000, "candid-video": 15000, "drone": 18000,
  "pellikoduku-traditional-photo": 12000, "pellikoduku-traditional-video": 18000, "pellikoduku-candid-photo": 18000,
  "groom-haldi-candid-photo": 18000, "groom-haldi-candid-video": 18000,
  "pellikuthuru-traditional-photo": 12000, "pellikuthuru-traditional-video": 18000, "pellikuthuru-candid-photo": 18000,
  "bride-haldi-candid-photo": 18000, "bride-haldi-candid-video": 18000,
  "reception-traditional-photo": 12000, "reception-traditional-video": 18000, "reception-candid-photo": 18000, "reception-candid-video": 15000, "reception-drone": 18000,
  "bigday-traditional-photo": 12000, "bigday-traditional-video": 12000, "bigday-candid-photo": 25000, "bigday-candid-video": 25000, "bigday-drone": 18000,
  "vratham-traditional-photo": 12000, "vratham-traditional-video": 12000,
  "sangeet-candid-photo": 18000, "sangeet-candid-video": 18000, "sangeet-traditional-video": 12000, "sangeet-drone": 18000,
  "mehandi-candid-photo": 18000, "mehandi-traditional-video": 18000,
  "cocktail-candid-photo": 18000, "cocktail-candid-video": 18000,
  "candid-album-pressbook": 20000, "candid-album-magnum": 30000,
  "traditional-album-pressbook": 15000, "traditional-album-magnum": 30000,
  "output-1month": 90000, "output-5months": 0,
  "prewedding-only-photo": 30000, "prewedding-both": 30000,
  "documentary-style": 35000,
};

const STEP1_OPTIONS = [
  { id: "candid", label: "Candid Photography", icon: "📷", description: "Natural, spontaneous moments", image: "/images/candid-wedding.jpg" },
  { id: "traditional", label: "Traditional Photography", icon: "📸", description: "Classic posed shots", image: "/images/traditional-wedding.jpg" },
];
const STEP2_OPTIONS = [
  { id: "traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/traditional-photo-real.jpg" },
  { id: "traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/traditional-video-real.jpg" },
  { id: "candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/candid-photo-real.jpg" },
  { id: "candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/candid-video-real.jpg" },
  { id: "drone", label: "Drone", icon: "🚁", description: "Aerial shots", image: "/images/drone-wedding.jpg" },
];
const STEP3_OPTIONS = [
  { id: "pellikoduku-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/pellikoduku-traditional-photo.jpg" },
  { id: "pellikoduku-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/pellikoduku-traditional-video.jpg" },
  { id: "pellikoduku-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/pellikoduku-candid-photo.jpg" },
];
const STEP4_OPTIONS = [
  { id: "groom-haldi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/groom-haldi-candid-photo.jpg" },
  { id: "groom-haldi-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/groom-haldi-candid-video.jpg" },
];
const STEP5_OPTIONS = [
  { id: "pellikuthuru-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/pellikuthuru-traditional-photo.jpg" },
  { id: "pellikuthuru-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/pellikuthuru-traditional-video.jpg" },
  { id: "pellikuthuru-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/pellikuthuru-candid-photo.jpg" },
];
const STEP6_OPTIONS = [
  { id: "bride-haldi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/bride-haldi-candid-photo.jpg" },
  { id: "bride-haldi-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/bride-haldi-candid-video.jpg" },
];
const STEP7_OPTIONS = [
  { id: "reception-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/reception-traditional-photo.jpg" },
  { id: "reception-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/reception-traditional-video.jpg" },
  { id: "reception-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/reception-candid-photo.jpg" },
  { id: "reception-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/reception-candid-video.jpg" },
  { id: "reception-drone", label: "Drone", icon: "🚁", description: "Aerial shots", image: "/images/reception-drone.jpg" },
];
const STEP8_OPTIONS = [
  { id: "bigday-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/bigday-traditional-photo.jpg" },
  { id: "bigday-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/bigday-traditional-video.jpg" },
  { id: "bigday-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/bigday-candid-photo.jpg" },
  { id: "bigday-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/bigday-candid-video.jpg" },
  { id: "bigday-drone", label: "Drone", icon: "🚁", description: "Aerial shots", image: "/images/bigday-drone.jpg" },
];
const STEP9_OPTIONS = [
  { id: "vratham-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/vratham-traditional-photo.jpg" },
  { id: "vratham-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/vratham-traditional-video.jpg" },
];
const STEP10_OPTIONS = [
  { id: "sangeet-yes", label: "Yes", icon: "✅", description: "Include Sangeet", image: "/images/sangeet-yes.jpg" },
  { id: "sangeet-no", label: "No", icon: "❌", description: "Skip Sangeet", image: "/images/sangeet-no.jpg" },
];
const STEP11_OPTIONS = [
  { id: "sangeet-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/sangeet-candid-photo.jpg" },
  { id: "sangeet-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/sangeet-candid-video.jpg" },
  { id: "sangeet-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/sangeet-traditional-video.jpg" },
  { id: "sangeet-drone", label: "Drone", icon: "🚁", description: "Aerial shots", image: "/images/sangeet-drone.jpg" },
];
const STEP12_OPTIONS = [
  { id: "mehandi-yes", label: "Yes", icon: "✅", description: "Include Mehandi", image: "/images/sangeet-yes.jpg" },
  { id: "mehandi-no", label: "No", icon: "❌", description: "Skip Mehandi", image: "/images/sangeet-no.jpg" },
];
const STEP13_OPTIONS = [
  { id: "mehandi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/mehandi-candid-photo.jpg" },
  { id: "mehandi-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video", image: "/images/mehandi-traditional-video.jpg" },
];
const STEP14_OPTIONS = [
  { id: "cocktail-yes", label: "Yes", icon: "✅", description: "Include Cocktail Party", image: "/images/sangeet-yes.jpg" },
  { id: "cocktail-no", label: "No", icon: "❌", description: "Skip Cocktail Party", image: "/images/sangeet-no.jpg" },
];
const STEP15_OPTIONS = [
  { id: "cocktail-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural moments", image: "/images/cocktail-candid-photo.jpg" },
  { id: "cocktail-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic footage", image: "/images/cocktail-candid-video.jpg" },
];
const STEP16_OPTIONS = [
  { id: "albums-yes", label: "Yes", icon: "✅", description: "Include albums", image: "/images/sangeet-yes.jpg" },
  { id: "albums-no", label: "No", icon: "❌", description: "Skip albums", image: "/images/sangeet-no.jpg" },
];
const STEP17_OPTIONS = [
  { id: "candid-album-pressbook", label: "Press Book", icon: "📖", description: "Classic press book", image: "/images/album-pressbook.jpg" },
  { id: "candid-album-magnum", label: "Magnum", icon: "📚", description: "Premium magnum", image: "/images/album-magnum.jpg" },
];
const STEP18_OPTIONS = [
  { id: "traditional-album-pressbook", label: "Press Book", icon: "📖", description: "Classic press book", image: "/images/album-pressbook.jpg" },
  { id: "traditional-album-magnum", label: "Magnum", icon: "📚", description: "Premium magnum", image: "/images/album-magnum.jpg" },
];
const STEP19_OPTIONS = [
  { id: "output-1month", label: "One Month", icon: "📅", description: "Get output in 1 month", image: "/images/sangeet-yes.jpg" },
  { id: "output-5months", label: "Five Months", icon: "📆", description: "Get output in 5 months", image: "/images/sangeet-no.jpg" },
];
const STEP20_OPTIONS = [
  { id: "prewedding-yes", label: "Yes", icon: "✅", description: "Include pre-wedding", image: "/images/sangeet-yes.jpg" },
  { id: "prewedding-no", label: "No", icon: "❌", description: "Skip pre-wedding", image: "/images/sangeet-no.jpg" },
];
const STEP21_OPTIONS = [
  { id: "prewedding-only-photo", label: "Only Photo", icon: "📷", description: "Photo only", image: "/images/prewedding-photo.jpg" },
  { id: "prewedding-both", label: "Both Photo & Video", icon: "🎬", description: "Photo and video", image: "/images/prewedding-both.jpg" },
];
const STEP22_OPTIONS = [
  { id: "documentary-style", label: "Documentary Style", icon: "🎬", description: "Cinematic documentary", image: "/images/documentary-style.jpg" },
];

export default function BuildQuotePage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', weddingDate: '', venue: '', phone: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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
  const [step11Selected, setStep11Selected] = useState<string[]>([]);
  const [step12Selected, setStep12Selected] = useState<string[]>([]);
  const [step13Selected, setStep13Selected] = useState<string[]>([]);
  const [step14Selected, setStep14Selected] = useState<string[]>([]);
  const [step15Selected, setStep15Selected] = useState<string[]>([]);
  const [step16Selected, setStep16Selected] = useState<string[]>([]);
  const [step17Selected, setStep17Selected] = useState<string[]>([]);
  const [step18Selected, setStep18Selected] = useState<string[]>([]);
  const [step19Selected, setStep19Selected] = useState<string[]>([]);
  const [step20Selected, setStep20Selected] = useState<string[]>([]);
  const [step21Selected, setStep21Selected] = useState<string[]>([]);
  const [step22Selected, setStep22Selected] = useState<string[]>([]);

  const toggleMulti = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) => {
    setter(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    setShowError(false);
  };
  const toggleSingle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) => {
    setter(prev => prev.includes(id) ? [] : [id]);
    setShowError(false);
  };

  const toggleStep1 = toggleMulti(setStep1Selected);
  const toggleStep2 = toggleMulti(setStep2Selected);
  const toggleStep3 = toggleMulti(setStep3Selected);
  const toggleStep4 = toggleMulti(setStep4Selected);
  const toggleStep5 = toggleMulti(setStep5Selected);
  const toggleStep6 = toggleMulti(setStep6Selected);
  const toggleStep7 = toggleMulti(setStep7Selected);
  const toggleStep8 = toggleMulti(setStep8Selected);
  const toggleStep9 = toggleMulti(setStep9Selected);
  const toggleStep10 = toggleSingle(setStep10Selected);
  const toggleStep11 = toggleMulti(setStep11Selected);
  const toggleStep12 = toggleSingle(setStep12Selected);
  const toggleStep13 = toggleMulti(setStep13Selected);
  const toggleStep14 = toggleSingle(setStep14Selected);
  const toggleStep15 = toggleMulti(setStep15Selected);
  const toggleStep16 = toggleSingle(setStep16Selected);
  const toggleStep17 = toggleMulti(setStep17Selected);
  const toggleStep18 = toggleMulti(setStep18Selected);
  const toggleStep19 = toggleSingle(setStep19Selected);
  const toggleStep20 = toggleSingle(setStep20Selected);
  const toggleStep21 = toggleSingle(setStep21Selected);
  const toggleStep22 = toggleSingle(setStep22Selected);

  const getAllSelectedIds = () => {
    return [
      ...step1Selected, ...step2Selected, ...step3Selected, ...step4Selected,
      ...step5Selected, ...step6Selected, ...step7Selected, ...step8Selected,
      ...step9Selected, ...step11Selected, ...step13Selected, ...step15Selected,
      ...step17Selected, ...step18Selected, ...step19Selected,
      ...step21Selected, ...step22Selected
    ];
  };

  const getSelectionDetails = () => {
    const details: { category: string; items: { name: string; price: number }[] }[] = [];
    const addCategory = (name: string, ids: string[]) => {
      const items = ids.filter(id => PRICES[id] !== undefined && PRICES[id] > 0).map(id => ({
        name: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        price: PRICES[id]
      }));
      if (items.length > 0) details.push({ category: name, items });
    };
    addCategory("Photography", step1Selected);
    addCategory("Engagement", step2Selected);
    addCategory("Pellikoduku", step3Selected);
    addCategory("Groom Haldi", step4Selected);
    addCategory("Pellikuthuru", step5Selected);
    addCategory("Bride Haldi", step6Selected);
    addCategory("Reception", step7Selected);
    addCategory("The Big Day", step8Selected);
    addCategory("Vratham", step9Selected);
    if (step10Selected.includes("sangeet-yes")) addCategory("Sangeet", step11Selected);
    if (step12Selected.includes("mehandi-yes")) addCategory("Mehandi", step13Selected);
    if (step14Selected.includes("cocktail-yes")) addCategory("Cocktail Party", step15Selected);
    if (step16Selected.includes("albums-yes")) {
      addCategory("Candid Album", step17Selected);
      addCategory("Traditional Album", step18Selected);
    }
    if (step19Selected.includes("output-1month")) addCategory("Post Production", step19Selected);
    if (step20Selected.includes("prewedding-yes")) {
      addCategory("Pre-Wedding Shoot", step21Selected);
      addCategory("Shooting Style", step22Selected);
    }
    return details;
  };

  const calculateTotal = () => {
    return getAllSelectedIds().reduce((sum, id) => sum + (PRICES[id] || 0), 0);
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleNext = () => {
    const stepSelections: Record<number, string[]> = {
      1: step1Selected, 2: step2Selected, 3: step3Selected, 4: step4Selected,
      5: step5Selected, 6: step6Selected, 7: step7Selected, 8: step8Selected,
      9: step9Selected, 10: step10Selected, 11: step11Selected, 12: step12Selected,
      13: step13Selected, 14: step14Selected, 15: step15Selected, 16: step16Selected,
      17: step17Selected, 18: step18Selected, 19: step19Selected, 20: step20Selected,
      21: step21Selected, 22: step22Selected
    };
    if (stepSelections[currentStep]?.length === 0) { setShowError(true); return; }
    if (currentStep === 10) { setCurrentStep(step10Selected.includes("sangeet-yes") ? 11 : 12); setShowError(false); return; }
    if (currentStep === 11) { setCurrentStep(12); setShowError(false); return; }
    if (currentStep === 12) { setCurrentStep(step12Selected.includes("mehandi-yes") ? 13 : 14); setShowError(false); return; }
    if (currentStep === 13) { setCurrentStep(14); setShowError(false); return; }
    if (currentStep === 14) { setCurrentStep(step14Selected.includes("cocktail-yes") ? 15 : 16); setShowError(false); return; }
    if (currentStep === 15) { setCurrentStep(16); setShowError(false); return; }
    if (currentStep === 16) { setCurrentStep(step16Selected.includes("albums-yes") ? 17 : 19); setShowError(false); return; }
    if (currentStep === 17) { setCurrentStep(18); setShowError(false); return; }
    if (currentStep === 18) { setCurrentStep(19); setShowError(false); return; }
    if (currentStep === 19) { setCurrentStep(20); setShowError(false); return; }
    if (currentStep === 20) { if (step20Selected.includes("prewedding-yes")) setCurrentStep(21); else setShowCongrats(true); setShowError(false); return; }
    if (currentStep === 21) { setCurrentStep(22); setShowError(false); return; }
    if (currentStep === 22) { setShowCongrats(true); setShowError(false); return; }
    if (currentStep < 9) { setCurrentStep(currentStep + 1); setShowError(false); }
  };

  const handlePrevious = () => {
    if (currentStep === 11) setCurrentStep(10);
    else if (currentStep === 13) setCurrentStep(12);
    else if (currentStep === 15) setCurrentStep(14);
    else if (currentStep === 17) setCurrentStep(16);
    else if (currentStep === 18) setCurrentStep(17);
    else if (currentStep === 19) setCurrentStep(step16Selected.includes("albums-yes") ? 18 : 16);
    else if (currentStep === 21) setCurrentStep(20);
    else if (currentStep === 22) setCurrentStep(21);
    else if (currentStep > 1) setCurrentStep(currentStep - 1);
    setShowError(false);
  };

  const renderOptionCard = (option: any, isSelected: boolean, onClick: () => void) => {
    const price = PRICES[option.id];
    return (
      <div key={option.id} onClick={onClick} style={{
        width: 280, cursor: "pointer", borderRadius: 16, overflow: "hidden",
        border: isSelected ? "3px solid #c9a55c" : "3px solid rgba(255,255,255,0.1)",
        background: isSelected ? "rgba(201,165,92,0.1)" : "rgba(255,255,255,0.05)",
        transition: "all 0.3s ease", transform: isSelected ? "scale(1.02)" : "scale(1)",
        boxShadow: isSelected ? "0 10px 40px rgba(201,165,92,0.3)" : "0 4px 20px rgba(0,0,0,0.3)",
      }}>
        <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#1a1a1a" }}>
          <img src={option.image} alt={option.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: isSelected ? "scale(1.05)" : "scale(1)" }} />
          <div style={{ position: "absolute", inset: 0, background: isSelected ? "linear-gradient(to top, rgba(201,165,92,0.6), transparent)" : "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 44, height: 44, borderRadius: "50%", background: isSelected ? "#c9a55c" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, backdropFilter: "blur(10px)" }}>
            {option.icon}
          </div>
          {isSelected && (
            <div style={{ position: "absolute", top: 12, left: 12, width: 28, height: 28, borderRadius: "50%", background: "#c9a55c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", fontWeight: 700 }}>✓</div>
          )}
          {price !== undefined && price > 0 && (
            <div style={{ position: "absolute", bottom: 12, left: 12, padding: "6px 14px", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", borderRadius: 20, border: "1px solid rgba(201,165,92,0.5)" }}>
              <span style={{ color: "#c9a55c", fontSize: 14, fontWeight: 700 }}>{formatPrice(price)}</span>
            </div>
          )}
        </div>
        <div style={{ padding: "18px 16px" }}>
          <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 18, fontWeight: 700, color: isSelected ? "#c9a55c" : "#fff", marginBottom: 6 }}>{option.label}</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>{option.description}</p>
        </div>
      </div>
    );
  };

  const getCurrentOptions = () => {
    const options: Record<number, any[]> = {
      1: STEP1_OPTIONS, 2: STEP2_OPTIONS, 3: STEP3_OPTIONS, 4: STEP4_OPTIONS, 5: STEP5_OPTIONS,
      6: STEP6_OPTIONS, 7: STEP7_OPTIONS, 8: STEP8_OPTIONS, 9: STEP9_OPTIONS, 10: STEP10_OPTIONS,
      11: STEP11_OPTIONS, 12: STEP12_OPTIONS, 13: STEP13_OPTIONS, 14: STEP14_OPTIONS, 15: STEP15_OPTIONS,
      16: STEP16_OPTIONS, 17: STEP17_OPTIONS, 18: STEP18_OPTIONS, 19: STEP19_OPTIONS, 20: STEP20_OPTIONS,
      21: STEP21_OPTIONS, 22: STEP22_OPTIONS
    };
    return options[currentStep] || STEP1_OPTIONS;
  };

  const getSelectedForStep = () => {
    const selections: Record<number, string[]> = {
      1: step1Selected, 2: step2Selected, 3: step3Selected, 4: step4Selected, 5: step5Selected,
      6: step6Selected, 7: step7Selected, 8: step8Selected, 9: step9Selected, 10: step10Selected,
      11: step11Selected, 12: step12Selected, 13: step13Selected, 14: step14Selected, 15: step15Selected,
      16: step16Selected, 17: step17Selected, 18: step18Selected, 19: step19Selected, 20: step20Selected,
      21: step21Selected, 22: step22Selected
    };
    return selections[currentStep] || [];
  };

  const getToggleForStep = () => {
    const toggles: Record<number, (id: string) => void> = {
      1: toggleStep1, 2: toggleStep2, 3: toggleStep3, 4: toggleStep4, 5: toggleStep5,
      6: toggleStep6, 7: toggleStep7, 8: toggleStep8, 9: toggleStep9, 10: toggleStep10,
      11: toggleStep11, 12: toggleStep12, 13: toggleStep13, 14: toggleStep14, 15: toggleStep15,
      16: toggleStep16, 17: toggleStep17, 18: toggleStep18, 19: toggleStep19, 20: toggleStep20,
      21: toggleStep21, 22: toggleStep22
    };
    return toggles[currentStep] || toggleStep1;
  };

  const getStepTitle = () => {
    const titles: Record<number, string> = {
      1: "What Photography do you want?", 2: "Engagement", 3: "Pellikoduku", 4: "Groom Haldi",
      5: "Pellikuthuru", 6: "Bride Haldi", 7: "Reception", 8: "The Big Day", 9: "Vratham",
      10: "Do we have Sangeet?", 11: "Sangeet", 12: "Do we have Mehandi?", 13: "Mehandi",
      14: "Cocktail Party?", 15: "Cocktail Party", 16: "Do you really need albums?",
      17: "Candid Album", 18: "Traditional Album", 19: "When do you want your output?",
      20: "Do we have pre-wedding shoot?", 21: "Romantic Pre-Wedding", 22: "Which shooting style do you prefer?"
    };
    return titles[currentStep] || "Select Options";
  };

  const getStepDescription = () => {
    const descriptions: Record<number, string> = {
      1: "Select one or both options", 2: "Select engagement services", 3: "Select Pellikoduku services",
      4: "Select Groom Haldi services", 5: "Select Pellikuthuru services", 6: "Select Bride Haldi services",
      7: "Select Reception services", 8: "Select Big Day services", 9: "Select Vratham services",
      10: "Would you like to include Sangeet?", 11: "Select Sangeet services", 12: "Would you like to include Mehandi?",
      13: "Select Mehandi services", 14: "Would you like to include Cocktail Party?", 15: "Select Cocktail services",
      16: "Would you like to include albums?", 17: "Select Candid Album", 18: "Select Traditional Album",
      19: "Post Production timeline", 20: "Would you like pre-wedding shoot?", 21: "Select pre-wedding style", 22: "Select shooting style"
    };
    return descriptions[currentStep] || "Select options to continue";
  };

  const getButtonText = () => {
    if (currentStep === 22) return "Get Quote";
    if (currentStep === 20 && step20Selected.includes("prewedding-no")) return "Get Quote";
    return "Next Step";
  };

  // Congratulations page with form
  if (showCongrats) {
    const selectionDetails = getSelectionDetails();
    const total = calculateTotal();
    
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)", padding: "60px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "#c9a55c", marginBottom: 8 }}>
              Congratulations!
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>Your personalized wedding quotation</p>
          </div>

          {/* Summary Table */}
          <div style={{ background: "rgba(201,165,92,0.08)", border: "1px solid rgba(201,165,92,0.2)", borderRadius: 16, padding: 30, marginBottom: 30 }}>
            <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, fontWeight: 700, color: "#c9a55c", marginBottom: 24, textAlign: "center" }}>
              Wedding Quote Summary
            </h2>
            
            {/* Table Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 10, padding: "14px 20px", background: "rgba(201,165,92,0.15)", borderRadius: 10, marginBottom: 16 }}>
              <span style={{ color: "#c9a55c", fontWeight: 700, fontSize: 14 }}>Service / Event</span>
              <span style={{ color: "#c9a55c", fontWeight: 700, fontSize: 14, textAlign: "right" }}>Amount</span>
            </div>

            {/* Table Rows */}
            {selectionDetails.map((category, catIndex) => (
              <div key={catIndex} style={{ marginBottom: 20 }}>
                <div style={{ color: "#c9a55c", fontWeight: 600, fontSize: 13, padding: "10px 20px", background: "rgba(201,165,92,0.08)", borderRadius: 8, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                  {category.category}
                </div>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 10, padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ color: "#fff", fontSize: 14 }}>{item.name}</span>
                    <span style={{ color: "#fff", fontSize: 14, textAlign: "right", fontWeight: 600, fontFamily: "monospace" }}>{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Total */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 10, padding: "20px", background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)", borderRadius: 10, marginTop: 24 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>Final Total</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 20, textAlign: "right", fontFamily: "monospace" }}>{formatPrice(total)}</span>
            </div>
          </div>

          {/* Contact Form */}
          {!formSubmitted ? (
            <div style={{ background: "rgba(201,165,92,0.08)", border: "1px solid rgba(201,165,92,0.2)", borderRadius: 16, padding: 40, marginBottom: 30 }}>
              <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, fontWeight: 700, color: "#c9a55c", marginBottom: 8, textAlign: "center" }}>
                Get Your Final Quote
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 30, textAlign: "center" }}>
                Fill in your details and we&apos;ll send you the complete quotation
              </p>
              
              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 500, margin: "0 auto" }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: "block", color: "#c9a55c", fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "#c9a55c"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(201,165,92,0.3)"}
                  />
                </div>

                {/* Wedding Date */}
                <div>
                  <label style={{ display: "block", color: "#c9a55c", fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Wedding Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, weddingDate: e.target.value }))}
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "#c9a55c"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(201,165,92,0.3)"}
                  />
                </div>

                {/* Wedding Venue */}
                <div>
                  <label style={{ display: "block", color: "#c9a55c", fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Wedding Venue / Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                    placeholder="Enter wedding venue or city"
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "#c9a55c"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(201,165,92,0.3)"}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: "block", color: "#c9a55c", fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "#c9a55c"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(201,165,92,0.3)"}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: "block", color: "#c9a55c", fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Email ID *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.3s" }}
                    onFocus={(e) => e.target.style.borderColor = "#c9a55c"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(201,165,92,0.3)"}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "16px 32px", background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)",
                    color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 50, border: "none",
                    cursor: "pointer", boxShadow: "0 4px 20px rgba(201,165,92,0.3)", transition: "all 0.3s ease",
                    marginTop: 10
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(201,165,92,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,165,92,0.3)"; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  Submit & Get Quote
                </button>
              </form>
            </div>
          ) : (
            /* Thank You Message */
            <div style={{ background: "rgba(201,165,92,0.08)", border: "1px solid rgba(201,165,92,0.2)", borderRadius: 16, padding: 40, marginBottom: 30, textAlign: "center" }}>
              <div style={{ fontSize: 50, marginBottom: 16 }}>✅</div>
              <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, fontWeight: 700, color: "#c9a55c", marginBottom: 12 }}>
                Thank You, {formData.fullName}!
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 20, lineHeight: 1.6 }}>
                Your wedding quotation has been submitted successfully.<br />
                We will contact you at <strong style={{ color: "#c9a55c" }}>{formData.email}</strong> or <strong style={{ color: "#c9a55c" }}>{formData.phone}</strong> shortly.
              </p>
              <div style={{ background: "rgba(201,165,92,0.1)", borderRadius: 10, padding: 20, maxWidth: 400, margin: "0 auto" }}>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Estimated Total</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#c9a55c", fontFamily: "monospace" }}>{formatPrice(total)}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => { setShowCongrats(false); setCurrentStep(1); setFormSubmitted(false); setFormData({ fullName: '', weddingDate: '', venue: '', phone: '', email: '' }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px",
                background: "transparent", color: "#c9a55c", fontSize: 14, fontWeight: 600,
                borderRadius: 50, border: "2px solid #c9a55c", cursor: "pointer", transition: "all 0.3s ease",
              }}
            >
              Start New Quote
            </button>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px",
              background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)", color: "#fff", fontSize: 14, fontWeight: 600,
              borderRadius: 50, border: "none", cursor: "pointer", textDecoration: "none",
            }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <p className="quote-hero-subtitle">Select what you love and get instant pricing</p>
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
        <section style={{ padding: "80px 20px", background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: 1000, width: "100%", textAlign: "center" }}>
            {/* Step Indicator */}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 40, flexWrap: "wrap" }}>
              {Array.from({ length: 22 }, (_, i) => i + 1).map(step => (
                <div key={step} style={{ color: currentStep >= step ? "#c9a55c" : "rgba(255,255,255,0.3)" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: currentStep >= step ? "#c9a55c" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>{step}</div>
                </div>
              ))}
            </div>

            {/* Running Total */}
            <div style={{ marginBottom: 20, padding: "12px 24px", background: "rgba(201,165,92,0.1)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 50, display: "inline-block" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Current Total: </span>
              <span style={{ color: "#c9a55c", fontSize: 18, fontWeight: 700 }}>{formatPrice(calculateTotal())}</span>
            </div>

            {/* Step Title */}
            <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>{getStepTitle()}</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 50 }}>{getStepDescription()}</p>

            {/* Options Grid */}
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              {getCurrentOptions().map(option => renderOptionCard(option, getSelectedForStep().includes(option.id), () => getToggleForStep()(option.id)))}
            </div>

            {/* Error Message */}
            {showError && (
              <div style={{ padding: "14px 24px", background: "rgba(220, 53, 69, 0.15)", border: "1px solid rgba(220, 53, 69, 0.3)", borderRadius: 12, color: "#ff6b6b", fontSize: 15, fontWeight: 500, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, maxWidth: 400, margin: "0 auto 24px" }}>
                <span style={{ fontSize: 20 }}>⚠️</span> You need to select at least one item
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {currentStep > 1 && (
                <button onClick={handlePrevious} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "transparent", color: "#c9a55c", fontSize: 15, fontWeight: 600, borderRadius: 50, border: "2px solid #c9a55c", cursor: "pointer", transition: "all 0.3s ease" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Previous Step
                </button>
              )}
              <button onClick={handleNext} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)", color: "#fff", fontSize: 15, fontWeight: 600, borderRadius: 50, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(201,165,92,0.3)", transition: "all 0.3s ease" }}>
                {getButtonText()}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
