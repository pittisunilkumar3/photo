"use client";

import { useState } from "react";
import {
  InteractivePhotoStack,
} from "@/components/ui/photo-stack";
import { MasonryGallery } from "@/components/ui/masonry-gallery";
import { CircularFlipGallery } from "@/components/ui/circular-flip-gallery";
import { ExpandingGallery } from "@/components/ui/expanding-gallery";
import { InteractiveBentoGallery } from "@/components/ui/bento-gallery";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { InfiniteScroll } from "@/components/ui/infinite-scroll";
import { ImageGallery } from "@/components/ui/image-gallery";
import { KineticText, KineticOnce } from "@/components/ui/kinetic-text";
import { VaporizeLoader } from "@/components/ui/vaporize-loader";

const photos = [
  { id: 1, src: "/images/portrait1.jpg", title: "Golden Hour Portrait", category: "Portrait", tall: true },
  { id: 2, src: "/images/landscape2.jpg", title: "Mountain Serenity", category: "Landscape" },
  { id: 3, src: "/images/wedding1.jpg", title: "Eternal Love", category: "Wedding" },
  { id: 4, src: "/images/street1.jpg", title: "Urban Nights", category: "Street", tall: true },
  { id: 5, src: "/images/portrait2.jpg", title: "Natural Beauty", category: "Portrait" },
  { id: 6, src: "/images/arch1.jpg", title: "Modern Lines", category: "Architecture" },
  { id: 7, src: "/images/landscape1.jpg", title: "Alpine Dawn", category: "Landscape", tall: true },
  { id: 8, src: "/images/wedding2.jpg", title: "First Dance", category: "Wedding" },
  { id: 9, src: "/images/street2.jpg", title: "City Lights", category: "Street" },
];

const categories = ["All", "Portrait", "Landscape", "Wedding", "Street", "Architecture"];

const services = [
  { icon: "💍", title: "Wedding Photography", desc: "Capturing the magic of your special day with an artistic, documentary approach.", price: "From $2,500", features: ["Full day coverage", "Second photographer", "Online gallery", "500+ edited photos"], popular: true },
  { icon: "📸", title: "Portrait Sessions", desc: "Professional portraits that reveal your authentic self.", price: "From $450", features: ["1-2 hour session", "Multiple outfits", "Retouched images", "Print rights"] },
  { icon: "🏔️", title: "Landscape & Travel", desc: "Breathtaking landscape photography for prints and publications.", price: "Custom Quote", features: ["Location scouting", "Golden hour shoots", "Aerial drone shots", "Fine art prints"] },
  { icon: "🏢", title: "Commercial & Brand", desc: "Elevate your brand with stunning visual content.", price: "From $1,200", features: ["Creative direction", "Brand consultation", "Multiple formats", "Usage licensing"] },
  { icon: "🎉", title: "Event Photography", desc: "Professional coverage for events, galas, and parties.", price: "From $800", features: ["4-8 hour coverage", "Same-day previews", "Group photos", "Online gallery"] },
  { icon: "✨", title: "Fine Art & Editorial", desc: "Conceptual photography for magazines and galleries.", price: "Custom Quote", features: ["Creative concepts", "Styling assistance", "Post-production", "Exhibition prints"] },
];

const testimonials = [
  { name: "Sarah & James", role: "Wedding Clients", image: "/images/avatar1.jpg", quote: "Alex captured our wedding day so beautifully that every time we look at our photos, we relive those magical moments. The attention to emotion and detail is unmatched." },
  { name: "Michael Chen", role: "Corporate Client", image: "/images/avatar2.jpg", quote: "Working with Alex was an incredible experience. The brand photography was exactly what we needed — modern, professional, and full of character." },
  { name: "Emma Rodriguez", role: "Magazine Editor", image: "/images/avatar3.jpg", quote: "Alex's editorial work is consistently outstanding. Creative vision and technical mastery combine to produce images that tell compelling stories." },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <>
      {/* ===== VAPORIZE LOADER ===== */}
      {loading && <VaporizeLoader onComplete={() => setLoading(false)} />}

      {/* ===== MAIN SITE ===== */}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.6s ease" }}>

      {/* ==================== SIDE MENU ==================== */}
      <button
        onClick={() => setSideMenuOpen(true)}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 9998,
          width: 44, height: 44, borderRadius: 12,
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
      </button>

      {/* Overlay */}
      {sideMenuOpen && (
        <div
          onClick={() => setSideMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 9998, backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Sidebar Panel */}
      <div
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
          background: "#111", zIndex: 9999,
          transform: sideMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "32px 24px",
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 22, fontWeight: 700, color: "#c9a55c" }}>Menu</span>
          <button
            onClick={() => setSideMenuOpen(false)}
            style={{ background: "none", border: "none", color: "#888", cursor: "pointer", padding: 4 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <a href="/" style={{ display: "block", padding: "14px 16px", color: "#ccc", textDecoration: "none", borderRadius: 10, marginBottom: 4, fontSize: 15, fontWeight: 500, background: "rgba(255,255,255,0.04)" }}>
          🏠 Home
        </a>
        <a href="/3d-gallery" style={{ display: "block", padding: "14px 16px", color: "#ccc", textDecoration: "none", borderRadius: 10, marginBottom: 4, fontSize: 15, fontWeight: 500, background: "rgba(255,255,255,0.04)" }}>
          🌌 3D Gallery
        </a>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a href="#portfolio" onClick={() => setSideMenuOpen(false)} style={{ display: "block", padding: "10px 16px", color: "#888", textDecoration: "none", fontSize: 14, borderRadius: 8, marginBottom: 2 }}>Portfolio</a>
          <a href="#about" onClick={() => setSideMenuOpen(false)} style={{ display: "block", padding: "10px 16px", color: "#888", textDecoration: "none", fontSize: 14, borderRadius: 8, marginBottom: 2 }}>About</a>
          <a href="#services" onClick={() => setSideMenuOpen(false)} style={{ display: "block", padding: "10px 16px", color: "#888", textDecoration: "none", fontSize: 14, borderRadius: 8, marginBottom: 2 }}>Services</a>
          <a href="#contact" onClick={() => setSideMenuOpen(false)} style={{ display: "block", padding: "10px 16px", color: "#888", textDecoration: "none", fontSize: 14, borderRadius: 8, marginBottom: 2 }}>Contact</a>
        </div>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="hero">
        <div className="hero-overlay" />

        {/* Full background gallery */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <ImageGallery />
        </div>

        {/* Text overlay on top */}
        <div style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 40px",
          pointerEvents: "none",
        }}
        className="hero-text-overlay"
        >
          <div style={{ pointerEvents: "auto" }}>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Award-Winning Photography
            </div>
            <h1 className="hero-title">
              Capturing<br /><span>Timeless Beauty</span>
            </h1>
            <p className="hero-desc">
              Every moment is a story waiting to be told. Through my lens, I transform
              fleeting instants into eternal memories that speak to the soul.
            </p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn-gold">
                View Portfolio
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
              </a>
              <a href="#about" className="btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Watch Showreel
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Projects</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">12</div>
                <div className="hero-stat-label">Years</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">98%</div>
                <div className="hero-stat-label">Happy</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">15+</div>
                <div className="hero-stat-label">Awards</div>
              </div>
            </div>
          </div>
        </div>

        <a href="#portfolio" className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </a>
      </section>

      {/* ==================== PORTFOLIO ==================== */}
      <section id="portfolio" style={{ padding: "80px 0 0" }}>
        <div className="section-header" style={{ padding: "0 40px", marginBottom: 40 }}>
          <KineticOnce text="Portfolio" tag="div" className="section-label" />
          <h2 className="section-title"><KineticOnce text="Selected Works" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="A curated collection of my finest work across various genres of photography" tag="p" className="section-desc" style={{ fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <MasonryGallery />
      </section>

      {/* ==================== CIRCULAR FLIP GALLERY ==================== */}
      <section style={{ background: "#0a0a0a", padding: "60px 40px" }}>
        <div className="section-header">
          <KineticOnce text="Gallery" tag="div" className="section-label" style={{ color: "#c9a55c" }} />
          <h2 className="section-title" style={{ color: "#fff" }}><KineticOnce text="Photo Circle" tag="span" style={{ color: "#fff", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Hover cards to flip and reveal details" tag="p" className="section-desc" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <CircularFlipGallery />
      </section>

      {/* ==================== INFINITE SCROLL ==================== */}
      <section style={{ background: "#0a0a0a" }}>
        <div style={{ textAlign: "center", paddingTop: 60, paddingBottom: 20 }}>
          <KineticOnce text="Showcase" tag="div" className="section-label" style={{ color: "#c9a55c" }} />
          <h2 className="section-title" style={{ color: "#fff" }}><KineticOnce text="Nature Gallery" tag="span" style={{ color: "#fff", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Hover to pause the scroll" tag="p" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }} />
        </div>
        <InfiniteScroll />
      </section>

      {/* ==================== PHOTO DIVIDER ==================== */}
      <div className="photo-divider">
        <img src="/images/divider.jpg" alt="" loading="lazy" />
        <div className="photo-divider-overlay">
          <div className="photo-divider-quote">
            &ldquo;<KineticOnce text="Photography is the story I fail to put into words" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", color: "inherit" }} />&rdquo;
            <span>— Destin Sparks</span>
          </div>
        </div>
      </div>

      {/* ==================== BENTO GALLERY ==================== */}
      <section className="section">
        <div className="section-header">
          <KineticOnce text="Gallery" tag="div" className="section-label" />
          <h2 className="section-title"><KineticOnce text="Creative Bento" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Drag to rearrange, click to view" tag="p" className="section-desc" style={{ fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <InteractiveBentoGallery />
      </section>

      {/* ==================== 3D CIRCULAR GALLERY ==================== */}
      <section style={{ width: "100%", background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)" }}>
        <div style={{ position: "sticky", top: 0, width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ textAlign: "center", position: "absolute", top: 40, zIndex: 10 }}>
            <KineticOnce text="Gallery" tag="div" className="section-label" style={{ color: "#c9a55c" }} />
            <h2 className="section-title" style={{ color: "#fff" }}><KineticOnce text="3D Carousel" tag="span" style={{ color: "#fff", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
            <KineticOnce text="Scroll to rotate, drag to spin" tag="p" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 8 }} />
          </div>
          <div style={{ width: "100%", height: "100%" }}>
            <CircularGallery
              items={[
                { common: "Golden Portrait", binomial: "Portrait Photography", photo: { url: "/images/portrait1.jpg", text: "Golden hour portrait", by: "Alex Morgan" } },
                { common: "Mountain Serenity", binomial: "Landscape Photography", photo: { url: "/images/landscape2.jpg", text: "Mountain landscape", pos: "50% 30%", by: "Alex Morgan" } },
                { common: "Eternal Love", binomial: "Wedding Photography", photo: { url: "/images/wedding1.jpg", text: "Wedding couple", by: "Alex Morgan" } },
                { common: "Urban Nights", binomial: "Street Photography", photo: { url: "/images/street1.jpg", text: "City at night", by: "Alex Morgan" } },
                { common: "Natural Beauty", binomial: "Portrait Photography", photo: { url: "/images/portrait2.jpg", text: "Natural portrait", by: "Alex Morgan" } },
                { common: "Modern Lines", binomial: "Architecture Photography", photo: { url: "/images/arch1.jpg", text: "Modern architecture", by: "Alex Morgan" } },
                { common: "Alpine Dawn", binomial: "Landscape Photography", photo: { url: "/images/landscape1.jpg", text: "Alpine mountains", by: "Alex Morgan" } },
                { common: "First Dance", binomial: "Wedding Photography", photo: { url: "/images/wedding2.jpg", text: "Wedding dance", by: "Alex Morgan" } },
                { common: "City Lights", binomial: "Street Photography", photo: { url: "/images/street2.jpg", text: "City streets", by: "Alex Morgan" } },
                { common: "Creative Vision", binomial: "Studio Photography", photo: { url: "/images/hero1.jpg", text: "Studio portrait", by: "Alex Morgan" } },
              ]}
              radius={500}
              autoRotateSpeed={0.015}
            />
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="section section-alt">
        <div className="about-grid">
          <div className="about-img-wrap">
            <img src="/images/hero1.jpg" alt="Photographer" className="about-img" loading="lazy" />
            <div className="about-img-card">
              <div className="about-img-card-num">12+</div>
              <div className="about-img-card-txt">Years of Experience</div>
            </div>
          </div>
          <div className="about-content">
            <KineticOnce text="About Me" tag="div" className="section-label" />
            <h3><KineticOnce text="The Artist Behind the Lens" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h3>
            <p>I&apos;m Alex Morgan, a passionate photographer based in New York City. For over 12 years, I&apos;ve been dedicated to the art of visual storytelling.</p>
            <p>My philosophy is simple: every person, every place, every moment has a unique beauty. My job is to find it, frame it, and preserve it forever.</p>
            <div className="skills">
              {[["Portrait Photography", 98], ["Landscape Photography", 95], ["Wedding Photography", 97], ["Photo Editing", 92]].map(([name, val]) => (
                <div key={name} className="skill">
                  <div className="skill-header"><span className="skill-name">{name}</span><span className="skill-value">{val}%</span></div>
                  <div className="skill-bar"><div className="skill-fill" style={{ width: `${val}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE PHOTO STACK ==================== */}
      <section className="section" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff" }}>
        <div className="section-header">
          <KineticOnce text="Showcase" tag="div" className="section-label" style={{ color: "#c9a55c" }} />
          <h2 className="section-title" style={{ color: "#fff" }}><KineticOnce text="Our Team" tag="span" style={{ color: "#fff", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Hover to spread, click to bring to front" tag="p" className="section-desc" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <InteractivePhotoStack
          items={[
            { src: "/images/team1.jpg", name: "Alexandre" },
            { src: "/images/team2.jpg", name: "Isabella" },
            { src: "/images/team3.jpg", name: "Sophia" },
            { src: "/images/team4.jpg", name: "Mia" },
            { src: "/images/portrait1.jpg", name: "Charlotte" },
          ]}
          title={<>Our Creative Team</>}
        />
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="section">
        <div className="section-header">
          <KineticOnce text="Services" tag="div" className="section-label" />
          <h2 className="section-title"><KineticOnce text="What I Offer" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Tailored photography services to meet your unique vision" tag="p" className="section-desc" style={{ fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              {s.popular && <div className="service-popular">Most Popular</div>}
              <div className="service-icon"><span>{s.icon}</span></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-features">{s.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
              <div className="service-footer">
                <span className="service-price">{s.price}</span>
                <a href="#contact" className="service-link">Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== EXPANDING GALLERY ==================== */}
      <section className="section">
        <div className="section-header">
          <KineticOnce text="Latest Work" tag="div" className="section-label" />
          <h2 className="section-title"><KineticOnce text="Our Creations" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Each piece crafted with intention and style" tag="p" className="section-desc" style={{ fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <ExpandingGallery />
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="section section-alt">
        <div className="section-header">
          <KineticOnce text="Testimonials" tag="div" className="section-label" />
          <h2 className="section-title"><KineticOnce text="Client Stories" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-quote-icon">&ldquo;</div>
          <div className="testimonial-stars">{[1,2,3,4,5].map(i => <span key={i} className="testimonial-star">★</span>)}</div>
          <p className="testimonial-text">&ldquo;{testimonials[currentTestimonial].quote}&rdquo;</p>
          <div className="testimonial-author">
            <img src={testimonials[currentTestimonial].image} alt="" className="testimonial-avatar" loading="lazy" />
            <div>
              <div className="testimonial-name">{testimonials[currentTestimonial].name}</div>
              <div className="testimonial-role">{testimonials[currentTestimonial].role}</div>
            </div>
          </div>
        </div>
        <div className="testimonial-nav">
          <button className="testimonial-btn" onClick={() => setCurrentTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => <div key={i} className={`testimonial-dot ${i === currentTestimonial ? "active" : ""}`} onClick={() => setCurrentTestimonial(i)} />)}
          </div>
          <button className="testimonial-btn" onClick={() => setCurrentTestimonial(p => (p + 1) % testimonials.length)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section">
        <div className="section-header">
          <KineticOnce text="Contact" tag="div" className="section-label" />
          <h2 className="section-title"><KineticOnce text="Let's Connect" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h2>
          <KineticOnce text="Ready to create something beautiful together?" tag="p" className="section-desc" style={{ fontFamily: "inherit", fontSize: "inherit" }} />
        </div>
        <div className="contact-grid">
          <div>
            <h3 className="section-title" style={{ fontSize: 26, marginBottom: 20, textAlign: "left" }}><KineticOnce text="Get in Touch" tag="span" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }} /></h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--secondary)", marginBottom: 28 }}>Whether you have a specific project in mind or just want to explore possibilities, I&apos;m here to help.</p>
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>, label: "Email", value: "hello@lumiere.photo" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>, label: "Studio", value: "123 Photography Lane, NYC" },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: "Hours", value: "Mon - Sat, 9AM - 7PM" },
            ].map(item => (
              <div key={item.label} className="contact-info-card">
                <div className="contact-info-icon">{item.icon}</div>
                <div><div className="contact-info-label">{item.label}</div><div className="contact-info-value">{item.value}</div></div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-input" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Service</label><select className="form-select" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}><option value="">Select a service</option><option value="wedding">Wedding</option><option value="portrait">Portrait</option><option value="commercial">Commercial</option><option value="event">Event</option></select></div>
              <div className="form-group full"><label className="form-label">Message</label><textarea className="form-textarea" placeholder="Tell me about your project..." required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} /></div>
            </div>
            <button type="submit" className="form-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
            </button>
            {isSubmitted && <div className="form-success">✓ Thank you! Your message has been sent. I&apos;ll respond within 24 hours.</div>}
          </form>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <p>Capturing life&apos;s most precious moments with artistry and passion. Based in New York, available worldwide.</p>
            <div className="footer-social">
              <a href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg></a>
              <a href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
              <a href="#"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">{["Home", "Portfolio", "About", "Services", "Contact"].map(l => <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">{["Wedding Photography", "Portrait Sessions", "Commercial / Brand", "Event Coverage", "Fine Art"].map(l => <li key={l}><a href="#services">{l}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="footer-title">Studio Hours</h4>
            <ul className="footer-links"><li><a href="#">Mon-Fri: 9AM-7PM</a></li><li><a href="#">Sat: 10AM-5PM</a></li><li><a href="#">Sun: By Appointment</a></li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Lumière Photography. All rights reserved.</p>
          <p>Made with ❤️ by <a href="#">Alex Morgan</a></p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
      </button>

      </div>{/* end main site wrapper */}
    </>
  );
}
