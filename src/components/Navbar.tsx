"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", isPage: true },
  { href: "/build-quote", label: "Build Quote", isPage: true },
  { href: "/3d-gallery", label: "3D Gallery", isPage: true },
  { href: "/our-clicks", label: "Our Clicks", isPage: true },
  { href: "#about", label: "About", isPage: false },
  { href: "#services", label: "Services", isPage: false },
  { href: "#contact", label: "Contact", isPage: false },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "services", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.href === "/") {
      return pathname === "/" && activeSection === "home";
    }
    if (link.isPage) {
      return pathname === link.href;
    }
    return pathname === "/" && activeSection === link.href.replace("#", "");
  };

  const handleNavClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.href === "/") {
      // Home link
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else if (link.isPage) {
      // Page links like /build-quote, /3d-gallery
      router.push(link.href);
    } else {
      // Hash links like #about, #services
      if (pathname === "/") {
        const sectionId = link.href.replace("#", "");
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${link.href}`);
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          transition: "all 0.5s ease",
          background: isScrolled ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.3)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
          borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
          boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}>
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, { href: "/", label: "Home", isPage: true })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <img
              src="/images/logo1.jpeg"
              alt="COUPLE AURA"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(201,165,92,0.6)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: 16,
                fontWeight: 700,
                color: isScrolled ? "#c9a55c" : "#fff",
                letterSpacing: 1,
                lineHeight: 1.2,
              }}>
                COUPLE AURA
              </span>
              <span style={{
                fontSize: 8,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: isScrolled ? "#888" : "rgba(255,255,255,0.7)",
                lineHeight: 1,
              }}>
                Photography
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="nav-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: isActive(link) ? 600 : 500,
                  letterSpacing: 0.5,
                  textDecoration: "none",
                  borderRadius: 6,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  color: isActive(link)
                    ? "#c9a55c"
                    : isScrolled
                      ? "#555"
                      : "rgba(255,255,255,0.85)",
                  background: isActive(link) ? "rgba(201,165,92,0.1)" : "transparent",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Book Now Button */}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              if (pathname === "/") {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#contact");
              }
            }}
            style={{
              padding: "8px 20px",
              background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 50,
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 10px rgba(201,165,92,0.3)",
            }}
            className="nav-book-btn"
          >
            Book a Session
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              padding: 6,
              cursor: "pointer",
              color: isScrolled ? "#333" : "#fff",
            }}
            className="nav-mobile-btn"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 300,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              zIndex: 9999,
              boxShadow: "0 0 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 24,
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 32,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src="/images/logo1.jpeg" alt="COUPLE AURA" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 14, fontWeight: 700, color: "#c9a55c" }}>COUPLE AURA</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 8,
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 12px",
                        fontSize: 18,
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontWeight: isActive(link) ? 700 : 600,
                        textDecoration: "none",
                        borderRadius: 8,
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        color: isActive(link) ? "#c9a55c" : "#333",
                        background: isActive(link) ? "rgba(201,165,92,0.08)" : "transparent",
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <span style={{
                        fontSize: 12,
                        color: "#c9a55c",
                        opacity: 0.5,
                        fontFamily: "var(--font-inter), sans-serif",
                      }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: "auto" }}>
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    if (pathname === "/") {
                      const el = document.getElementById("contact");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    } else {
                      router.push("/#contact");
                    }
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "14px 0",
                    background: "linear-gradient(135deg, #c9a55c 0%, #d4b86a 100%)",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 50,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Book a Session
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-book-btn { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
