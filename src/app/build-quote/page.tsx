"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./build-quote.css";

// Step 1: Photography
const STEP1_OPTIONS = [
  { id: "candid", label: "Candid Photography", icon: "📷", description: "Natural, spontaneous moments captured beautifully", image: "/images/candid-wedding.jpg" },
  { id: "traditional", label: "Traditional Photography", icon: "📸", description: "Classic posed shots with family and friends", image: "/images/traditional-wedding.jpg" },
];

// Step 2: Engagement
const STEP2_OPTIONS = [
  { id: "traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/traditional-photo-real.jpg" },
  { id: "traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/traditional-video-real.jpg" },
  { id: "candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/candid-photo-real.jpg" },
  { id: "candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/candid-video-real.jpg" },
  { id: "drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/drone-wedding.jpg" },
];

// Step 3: Pellikoduku
const STEP3_OPTIONS = [
  { id: "pellikoduku-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/pellikoduku-traditional-photo.jpg" },
  { id: "pellikoduku-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/pellikoduku-traditional-video.jpg" },
  { id: "pellikoduku-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/pellikoduku-candid-photo.jpg" },
];

// Step 4: Groom Haldi
const STEP4_OPTIONS = [
  { id: "groom-haldi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/groom-haldi-candid-photo.jpg" },
  { id: "groom-haldi-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/groom-haldi-candid-video.jpg" },
];

// Step 5: Pellikuthuru
const STEP5_OPTIONS = [
  { id: "pellikuthuru-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/pellikuthuru-traditional-photo.jpg" },
  { id: "pellikuthuru-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/pellikuthuru-traditional-video.jpg" },
  { id: "pellikuthuru-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/pellikuthuru-candid-photo.jpg" },
];

// Step 6: Bride Haldi
const STEP6_OPTIONS = [
  { id: "bride-haldi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/bride-haldi-candid-photo.jpg" },
  { id: "bride-haldi-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/bride-haldi-candid-video.jpg" },
];

// Step 7: Reception
const STEP7_OPTIONS = [
  { id: "reception-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/reception-traditional-photo.jpg" },
  { id: "reception-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/reception-traditional-video.jpg" },
  { id: "reception-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/reception-candid-photo.jpg" },
  { id: "reception-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/reception-candid-video.jpg" },
  { id: "reception-drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/reception-drone.jpg" },
];

// Step 8: The Big Day
const STEP8_OPTIONS = [
  { id: "bigday-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/bigday-traditional-photo.jpg" },
  { id: "bigday-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/bigday-traditional-video.jpg" },
  { id: "bigday-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/bigday-candid-photo.jpg" },
  { id: "bigday-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/bigday-candid-video.jpg" },
  { id: "bigday-drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/bigday-drone.jpg" },
];

// Step 9: Vratham
const STEP9_OPTIONS = [
  { id: "vratham-traditional-photo", label: "Traditional Photo", icon: "📸", description: "Classic posed photographs", image: "/images/vratham-traditional-photo.jpg" },
  { id: "vratham-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/vratham-traditional-video.jpg" },
];

// Step 10: Do we have Sangeet? (Yes/No)
const STEP10_OPTIONS = [
  { id: "sangeet-yes", label: "Yes", icon: "✅", description: "Include Sangeet in the package", image: "/images/sangeet-yes.jpg" },
  { id: "sangeet-no", label: "No", icon: "❌", description: "Skip Sangeet from the package", image: "/images/sangeet-no.jpg" },
];

// Step 11: Sangeet Services
const STEP11_OPTIONS = [
  { id: "sangeet-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/sangeet-candid-photo.jpg" },
  { id: "sangeet-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/sangeet-candid-video.jpg" },
  { id: "sangeet-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/sangeet-traditional-video.jpg" },
  { id: "sangeet-drone", label: "Drone", icon: "🚁", description: "Aerial shots & coverage", image: "/images/sangeet-drone.jpg" },
];

// Step 12: Do we have Mehandi? (Yes/No)
const STEP12_OPTIONS = [
  { id: "mehandi-yes", label: "Yes", icon: "✅", description: "Include Mehandi in the package", image: "/images/sangeet-yes.jpg" },
  { id: "mehandi-no", label: "No", icon: "❌", description: "Skip Mehandi from the package", image: "/images/sangeet-no.jpg" },
];

// Step 13: Mehandi Services
const STEP13_OPTIONS = [
  { id: "mehandi-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/mehandi-candid-photo.jpg" },
  { id: "mehandi-traditional-video", label: "Traditional Video", icon: "🎥", description: "Full event video coverage", image: "/images/mehandi-traditional-video.jpg" },
];

// Step 14: Cocktail Party? (Yes/No)
const STEP14_OPTIONS = [
  { id: "cocktail-yes", label: "Yes", icon: "✅", description: "Include Cocktail Party", image: "/images/sangeet-yes.jpg" },
  { id: "cocktail-no", label: "No", icon: "❌", description: "Skip Cocktail Party", image: "/images/sangeet-no.jpg" },
];

// Step 15: Cocktail Party Services
const STEP15_OPTIONS = [
  { id: "cocktail-candid-photo", label: "Candid Photo", icon: "📷", description: "Natural, spontaneous moments", image: "/images/cocktail-candid-photo.jpg" },
  { id: "cocktail-candid-video", label: "Candid Video", icon: "🎬", description: "Cinematic candid footage", image: "/images/cocktail-candid-video.jpg" },
];

// Step 16: Do you really need albums? (Yes/No)
const STEP16_OPTIONS = [
  { id: "albums-yes", label: "Yes", icon: "✅", description: "Include albums in the package", image: "/images/sangeet-yes.jpg" },
  { id: "albums-no", label: "No", icon: "❌", description: "Skip albums", image: "/images/sangeet-no.jpg" },
];

// Step 17: Candid Album
const STEP17_OPTIONS = [
  { id: "candid-album-pressbook", label: "Press Book", icon: "📖", description: "Classic press book album", image: "/images/album-pressbook.jpg" },
  { id: "candid-album-magnum", label: "Magnum", icon: "📚", description: "Premium magnum album", image: "/images/album-magnum.jpg" },
];

// Step 18: Traditional Album
const STEP18_OPTIONS = [
  { id: "traditional-album-pressbook", label: "Press Book", icon: "📖", description: "Classic press book album", image: "/images/album-pressbook.jpg" },
  { id: "traditional-album-magnum", label: "Magnum", icon: "📚", description: "Premium magnum album", image: "/images/album-magnum.jpg" },
];

// Step 19: When do you want your output? (Post Production)
const STEP19_OPTIONS = [
  { id: "output-1month", label: "One Month", icon: "📅", description: "Get your output in 1 month", image: "/images/sangeet-yes.jpg" },
  { id: "output-5months", label: "Five Months", icon: "📆", description: "Get your output in 5 months", image: "/images/sangeet-no.jpg" },
];

// Step 20: Do we have pre-wedding shoot? (Yes/No)
const STEP20_OPTIONS = [
  { id: "prewedding-yes", label: "Yes", icon: "✅", description: "Include pre-wedding shoot", image: "/images/sangeet-yes.jpg" },
  { id: "prewedding-no", label: "No", icon: "❌", description: "Skip pre-wedding shoot", image: "/images/sangeet-no.jpg" },
];

// Step 21: Romantic pre-wedding
const STEP21_OPTIONS = [
  { id: "prewedding-only-photo", label: "Only Photo", icon: "📷", description: "Photo coverage only", image: "/images/prewedding-photo.jpg" },
  { id: "prewedding-both", label: "Both Photo & Video", icon: "🎬", description: "Complete photo and video coverage", image: "/images/prewedding-both.jpg" },
];

// Step 22: Which shooting style do you prefer?
const STEP22_OPTIONS = [
  { id: "documentary-style", label: "Documentary Style", icon: "🎬", description: "Cinematic documentary approach", image: "/images/documentary-style.jpg" },
];

export default function BuildQuotePage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // All selections
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

  // Toggle functions (multi-select)
  const toggleMulti = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) => {
    setter(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    setShowError(false);
  };

  // Toggle functions (single-select for Yes/No)
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

  const getSelections = () => {
    const selections: string[] = [];
    if (step1Selected.length > 0) selections.push(`Photography: ${step1Selected.join(", ")}`);
    if (step2Selected.length > 0) selections.push(`Engagement: ${step2Selected.join(", ")}`);
    if (step3Selected.length > 0) selections.push(`Pellikoduku: ${step3Selected.join(", ")}`);
    if (step4Selected.length > 0) selections.push(`Groom Haldi: ${step4Selected.join(", ")}`);
    if (step5Selected.length > 0) selections.push(`Pellikuthuru: ${step5Selected.join(", ")}`);
    if (step6Selected.length > 0) selections.push(`Bride Haldi: ${step6Selected.join(", ")}`);
    if (step7Selected.length > 0) selections.push(`Reception: ${step7Selected.join(", ")}`);
    if (step8Selected.length > 0) selections.push(`The Big Day: ${step8Selected.join(", ")}`);
    if (step9Selected.length > 0) selections.push(`Vratham: ${step9Selected.join(", ")}`);
    if (step10Selected.includes("sangeet-yes")) selections.push(`Sangeet: Yes`);
    if (step10Selected.includes("sangeet-no")) selections.push(`Sangeet: No`);
    if (step11Selected.length > 0) selections.push(`Sangeet Services: ${step11Selected.join(", ")}`);
    if (step12Selected.includes("mehandi-yes")) selections.push(`Mehandi: Yes`);
    if (step12Selected.includes("mehandi-no")) selections.push(`Mehandi: No`);
    if (step13Selected.length > 0) selections.push(`Mehandi Services: ${step13Selected.join(", ")}`);
    if (step14Selected.includes("cocktail-yes")) selections.push(`Cocktail Party: Yes`);
    if (step14Selected.includes("cocktail-no")) selections.push(`Cocktail Party: No`);
    if (step15Selected.length > 0) selections.push(`Cocktail Services: ${step15Selected.join(", ")}`);
    if (step16Selected.includes("albums-yes")) selections.push(`Albums: Yes`);
    if (step16Selected.includes("albums-no")) selections.push(`Albums: No`);
    if (step17Selected.length > 0) selections.push(`Candid Album: ${step17Selected.join(", ")}`);
    if (step18Selected.length > 0) selections.push(`Traditional Album: ${step18Selected.join(", ")}`);
    if (step19Selected.length > 0) selections.push(`Output Timeline: ${step19Selected.join(", ")}`);
    if (step20Selected.includes("prewedding-yes")) selections.push(`Pre-Wedding Shoot: Yes`);
    if (step20Selected.includes("prewedding-no")) selections.push(`Pre-Wedding Shoot: No`);
    if (step21Selected.length > 0) selections.push(`Pre-Wedding Style: ${step21Selected.join(", ")}`);
    if (step22Selected.length > 0) selections.push(`Shooting Style: ${step22Selected.join(", ")}`);
    return selections;
  };

  const handleNext = () => {
    // Validation for current step
    const stepSelections: Record<number, string[]> = {
      1: step1Selected, 2: step2Selected, 3: step3Selected, 4: step4Selected,
      5: step5Selected, 6: step6Selected, 7: step7Selected, 8: step8Selected,
      9: step9Selected, 10: step10Selected, 11: step11Selected, 12: step12Selected,
      13: step13Selected, 14: step14Selected, 15: step15Selected, 16: step16Selected,
      17: step17Selected, 18: step18Selected, 19: step19Selected, 20: step20Selected,
      21: step21Selected, 22: step22Selected
    };

    if (stepSelections[currentStep]?.length === 0) {
      setShowError(true);
      return;
    }

    // Step 10: Sangeet - conditional flow
    if (currentStep === 10) {
      if (step10Selected.includes("sangeet-yes")) {
        setCurrentStep(11);
      } else {
        setCurrentStep(12);
      }
      setShowError(false);
      return;
    }

    // Step 11: Sangeet services -> Step 12
    if (currentStep === 11) {
      setCurrentStep(12);
      setShowError(false);
      return;
    }

    // Step 12: Mehandi - conditional flow
    if (currentStep === 12) {
      if (step12Selected.includes("mehandi-yes")) {
        setCurrentStep(13);
      } else {
        setCurrentStep(14);
      }
      setShowError(false);
      return;
    }

    // Step 13: Mehandi services -> Step 14
    if (currentStep === 13) {
      setCurrentStep(14);
      setShowError(false);
      return;
    }

    // Step 14: Cocktail Party - conditional flow
    if (currentStep === 14) {
      if (step14Selected.includes("cocktail-yes")) {
        setCurrentStep(15);
      } else {
        setCurrentStep(16);
      }
      setShowError(false);
      return;
    }

    // Step 15: Cocktail services -> Step 16
    if (currentStep === 15) {
      setCurrentStep(16);
      setShowError(false);
      return;
    }

    // Step 16: Albums - conditional flow
    if (currentStep === 16) {
      if (step16Selected.includes("albums-yes")) {
        setCurrentStep(17);
      } else {
        setCurrentStep(19);
      }
      setShowError(false);
      return;
    }

    // Step 17: Candid Album -> Step 18
    if (currentStep === 17) {
      setCurrentStep(18);
      setShowError(false);
      return;
    }

    // Step 18: Traditional Album -> Step 19
    if (currentStep === 18) {
      setCurrentStep(19);
      setShowError(false);
      return;
    }

    // Step 19: Output timeline -> Step 20
    if (currentStep === 19) {
      setCurrentStep(20);
      setShowError(false);
      return;
    }

    // Step 20: Pre-wedding - conditional flow
    if (currentStep === 20) {
      if (step20Selected.includes("prewedding-yes")) {
        setCurrentStep(21);
      } else {
        setShowCongrats(true);
      }
      setShowError(false);
      return;
    }

    // Step 21: Pre-wedding style -> Step 22
    if (currentStep === 21) {
      setCurrentStep(22);
      setShowError(false);
      return;
    }

    // Step 22: Final step -> Congratulations
    if (currentStep === 22) {
      setShowCongrats(true);
      setShowError(false);
      return;
    }

    // Steps 1-9: Linear flow
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
    }
  };

  const handlePrevious = () => {
    // Reverse the conditional logic for going back
    if (currentStep === 11) {
      setCurrentStep(10);
    } else if (currentStep === 13) {
      setCurrentStep(12);
    } else if (currentStep === 15) {
      setCurrentStep(14);
    } else if (currentStep === 17) {
      setCurrentStep(16);
    } else if (currentStep === 18) {
      setCurrentStep(17);
    } else if (currentStep === 19) {
      if (step16Selected.includes("albums-yes")) {
        setCurrentStep(18);
      } else {
        setCurrentStep(16);
      }
    } else if (currentStep === 21) {
      setCurrentStep(20);
    } else if (currentStep === 22) {
      setCurrentStep(21);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    setShowError(false);
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
    const options: Record<number, any[]> = {
      1: STEP1_OPTIONS, 2: STEP2_OPTIONS, 3: STEP3_OPTIONS, 4: STEP4_OPTIONS,
      5: STEP5_OPTIONS, 6: STEP6_OPTIONS, 7: STEP7_OPTIONS, 8: STEP8_OPTIONS,
      9: STEP9_OPTIONS, 10: STEP10_OPTIONS, 11: STEP11_OPTIONS, 12: STEP12_OPTIONS,
      13: STEP13_OPTIONS, 14: STEP14_OPTIONS, 15: STEP15_OPTIONS, 16: STEP16_OPTIONS,
      17: STEP17_OPTIONS, 18: STEP18_OPTIONS, 19: STEP19_OPTIONS, 20: STEP20_OPTIONS,
      21: STEP21_OPTIONS, 22: STEP22_OPTIONS
    };
    return options[currentStep] || STEP1_OPTIONS;
  };

  const getSelectedForStep = () => {
    const selections: Record<number, string[]> = {
      1: step1Selected, 2: step2Selected, 3: step3Selected, 4: step4Selected,
      5: step5Selected, 6: step6Selected, 7: step7Selected, 8: step8Selected,
      9: step9Selected, 10: step10Selected, 11: step11Selected, 12: step12Selected,
      13: step13Selected, 14: step14Selected, 15: step15Selected, 16: step16Selected,
      17: step17Selected, 18: step18Selected, 19: step19Selected, 20: step20Selected,
      21: step21Selected, 22: step22Selected
    };
    return selections[currentStep] || [];
  };

  const getToggleForStep = () => {
    const toggles: Record<number, (id: string) => void> = {
      1: toggleStep1, 2: toggleStep2, 3: toggleStep3, 4: toggleStep4,
      5: toggleStep5, 6: toggleStep6, 7: toggleStep7, 8: toggleStep8,
      9: toggleStep9, 10: toggleStep10, 11: toggleStep11, 12: toggleStep12,
      13: toggleStep13, 14: toggleStep14, 15: toggleStep15, 16: toggleStep16,
      17: toggleStep17, 18: toggleStep18, 19: toggleStep19, 20: toggleStep20,
      21: toggleStep21, 22: toggleStep22
    };
    return toggles[currentStep] || toggleStep1;
  };

  const getStepTitle = () => {
    const titles: Record<number, string> = {
      1: "What Photography do you want?", 2: "Engagement", 3: "Pellikoduku",
      4: "Groom Haldi", 5: "Pellikuthuru", 6: "Bride Haldi", 7: "Reception",
      8: "The Big Day", 9: "Vratham", 10: "Do we have Sangeet?", 11: "Sangeet",
      12: "Do we have Mehandi?", 13: "Mehandi", 14: "Cocktail Party?",
      15: "Cocktail Party", 16: "Do you really need albums?", 17: "Candid Album",
      18: "Traditional Album", 19: "When do you want your output?",
      20: "Do we have pre-wedding shoot?", 21: "Romantic Pre-Wedding",
      22: "Which shooting style do you prefer?"
    };
    return titles[currentStep] || "Select Options";
  };

  const getStepDescription = () => {
    const descriptions: Record<number, string> = {
      1: "Select one or both options to continue", 2: "Select the services you need for your engagement",
      3: "Select the services you need for Pellikoduku", 4: "Select the services you need for Groom Haldi",
      5: "Select the services you need for Pellikuthuru", 6: "Select the services you need for Bride Haldi",
      7: "Select the services you need for Reception", 8: "Select the services you need for The Big Day",
      9: "Select the services you need for Vratham", 10: "Would you like to include Sangeet?",
      11: "Select the services you need for Sangeet", 12: "Would you like to include Mehandi?",
      13: "Select the services you need for Mehandi", 14: "Would you like to include Cocktail Party?",
      15: "Select the services for Cocktail Party (Part time)", 16: "Would you like to include albums?",
      17: "Select your preferred Candid Album", 18: "Select your preferred Traditional Album",
      19: "Post Production timeline", 20: "Would you like to include pre-wedding shoot?",
      21: "Select your pre-wedding style", 22: "Select your preferred shooting style"
    };
    return descriptions[currentStep] || "Select options to continue";
  };

  const isLastStep = () => {
    if (currentStep === 22) return true;
    if (currentStep === 10 && step10Selected.includes("sangeet-no")) return false;
    if (currentStep === 12 && step12Selected.includes("mehandi-no")) return false;
    if (currentStep === 14 && step14Selected.includes("cocktail-no")) return false;
    if (currentStep === 16 && step16Selected.includes("albums-no")) return false;
    if (currentStep === 20 && step20Selected.includes("prewedding-no")) return true;
    return false;
  };

  const getButtonText = () => {
    if (currentStep === 22) return "Get Quote";
    if (currentStep === 20 && step20Selected.includes("prewedding-no")) return "Get Quote";
    if (currentStep === 10 && step10Selected.includes("sangeet-no")) return "Next Step";
    if (currentStep === 12 && step12Selected.includes("mehandi-no")) return "Next Step";
    if (currentStep === 14 && step14Selected.includes("cocktail-no")) return "Next Step";
    if (currentStep === 16 && step16Selected.includes("albums-no")) return "Next Step";
    return "Next Step";
  };

  // Congratulations page
  if (showCongrats) {
    const selections = getSelections();
    return (
      <div className="build-quote-page" style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ maxWidth: 700, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#c9a55c", marginBottom: 16 }}>
            Congratulations!
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 40 }}>
            Your wedding quotation has been generated
          </p>
          
          <div style={{ background: "rgba(201,165,92,0.1)", border: "1px solid rgba(201,165,92,0.3)", borderRadius: 16, padding: 30, marginBottom: 30, textAlign: "left" }}>
            <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, fontWeight: 700, color: "#c9a55c", marginBottom: 20, textAlign: "center" }}>
              Your Selected Services
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {selections.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
                  <span style={{ color: "#c9a55c", fontSize: 16 }}>✓</span>
                  <span style={{ color: "#fff", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)", borderRadius: 16, padding: 30, marginBottom: 30 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 8 }}>Final Estimated Price</p>
            <p style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>Contact for Quote</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>hello@coupleaura.com</p>
          </div>

          <button
            onClick={() => { setShowCongrats(false); setCurrentStep(1); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
              background: "transparent", color: "#c9a55c", fontSize: 15, fontWeight: 600,
              borderRadius: 50, border: "2px solid #c9a55c", cursor: "pointer", transition: "all 0.3s ease",
            }}
          >
            Start New Quote
          </button>
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
              gap: 6,
              marginBottom: 40,
              flexWrap: "wrap",
            }}>
              {Array.from({ length: 22 }, (_, i) => i + 1).map(step => (
                <div key={step} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  color: currentStep >= step ? "#c9a55c" : "rgba(255,255,255,0.3)",
                }}>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: currentStep >= step ? "#c9a55c" : "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                  }}>{step}</div>
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
                {getButtonText()}
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
