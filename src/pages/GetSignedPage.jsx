import React, { useState, useEffect, useRef } from "react";
import {
  DollarSign, Radio, Users, Music, Globe, Star,
  Mic2, Headphones, TrendingUp, Send, CheckCircle,
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap
} from "lucide-react";
import { HALL_OF_FAME } from "../data/content";

const LABEL_SERVICES = [
  { icon: DollarSign,  color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.12)",  title: "Advances & Creative Support",   desc: "Up to $500K catalog advances backed by streaming projections — zero personal liability." },
  { icon: Star,        color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.12)",  title: "Editorial Playlisting",         desc: "Direct pitch pipeline to Spotify, Apple Music, and Amazon editorial curators worldwide." },
  { icon: Radio,       color: "#38BDF8", bg: "rgba(56,189,248,0.12)", title: "Radio Promotion",               desc: "Hands-on pitching to BBC Radio 1, SiriusXM, Apple Music 1 and global terrestrial stations." },
  { icon: TrendingUp,  color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.12)",  title: "Sync Licensing",                desc: "Placed in film, TV, and advertising through our global sync partnerships." },
  { icon: Users,       color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.12)",  title: "Artist Marketing",              desc: "Data-driven campaign strategy across social platforms, DSP ad slots, and press." },
  { icon: Music,       color: "#38BDF8", bg: "rgba(56,189,248,0.12)", title: "Release Strategy",              desc: "Full rollout planning: pre-save campaigns, metadata, artwork, and phased drops." },
  { icon: Globe,       color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.12)",  title: "Distribution",                  desc: "Instant delivery to 150+ stores worldwide including Spotify, Apple Music, TikTok, and Beatport." },
  { icon: Headphones,  color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.12)",  title: "Content ID",                    desc: "Full YouTube monetization for every upload, cover, and remix of your music." },
  { icon: Mic2,        color: "#38BDF8", bg: "rgba(56,189,248,0.12)", title: "Neighbouring Rights",           desc: "Automatically collect performer and master rights royalties from broadcast and streaming globally." },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Release with Tunewave", desc: "Distribute your music to 150+ platforms, build your catalog and grow your streaming numbers. Our A&R team starts listening immediately." },
  { num: "02", title: "We Are Listening",       desc: "Our dedicated label team tracks your progress — streams, playlisting traction, social engagement, and sync potential." },
  { num: "03", title: "Stand Out, Get Signed",  desc: "Top performers receive a direct invitation to Tunewave Label Services — no cold pitching, no gatekeepers required." },
];

export default function GetSignedPage({ onNavigate, theme = "dark" }) {
  const [submitted, setSubmitted] = useState(false);
  const [rosterIdx, setRosterIdx] = useState(0);
  const rosterRef = useRef(null);

  // 3D Parallax Mouse tilt in Hero
  const heroRef = useRef(null);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // Intersection observers for top-to-bottom card flipping animations
  const servicesSectionRef = useRef(null);
  const stepsSectionRef = useRef(null);
  const advancesSectionRef = useRef(null);

  const [servicesInView, setServicesInView] = useState(false);
  const [stepsInView, setStepsInView] = useState(false);
  const [advancesInView, setAdvancesInView] = useState(false);

  const visibleCards = 3;
  const maxIdx = HALL_OF_FAME.length - visibleCards;

  const scroll = (dir) => setRosterIdx(prev => Math.max(0, Math.min(prev + dir, maxIdx)));

  useEffect(() => {
    if (rosterRef.current) {
      const cardW = rosterRef.current.scrollWidth / HALL_OF_FAME.length;
      rosterRef.current.scrollTo({ left: rosterIdx * cardW, behavior: "smooth" });
    }
  }, [rosterIdx]);

  // Handle section entrance and re-trigger on enter/leave
  useEffect(() => {
    const handleScroll = () => {
      const checkSection = (ref, setFn) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Section is considered entered if its top has reached 85% of viewport and bottom hasn't scrolled completely away
        const isEntered = rect.top < windowHeight * 0.85 && rect.bottom > 120;
        setFn(isEntered);
      };

      checkSection(servicesSectionRef, setServicesInView);
      checkSection(stepsSectionRef, setStepsInView);
      checkSection(advancesSectionRef, setAdvancesInView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount after rendering
    const timer = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 9;
    const rotateX = -((y - centerY) / centerY) * 9;
    setHeroTilt({ x: rotateX, y: rotateY });
    setCursorPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
    setCursorPos({ x: 50, y: 50 });
  };

  const inputStyle = {
    width: "100%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)",
    borderRadius: 12, padding: "14px 18px", color: "var(--tw-text-white)", fontSize: "0.92rem", outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s", boxSizing: "border-box"
  };

  const brandBtn = {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)", color: "#040D1A", border: "none",
    borderRadius: 9999, fontWeight: 800, fontSize: "0.92rem",
    letterSpacing: "0.06em", cursor: "pointer",
    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    boxShadow: "0 0 32px rgba(0,229,255,0.3)"
  };

  return (
    <div style={{ paddingTop: 0, paddingBottom: 100, background: "var(--tw-bg-dark)", position: "relative", overflow: "hidden" }}>
      {/* Styles for 3D card flips, glass highlights, and physics animations */}
      <style>{`
        @keyframes gsCardFlipTopToBottom {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg) translateY(-40px) scale(0.92);
            filter: blur(8px);
          }
          55% {
            opacity: 0.95;
            transform: perspective(1200px) rotateX(10deg) translateY(4px) scale(1.02);
            filter: blur(1px);
          }
          80% {
            transform: perspective(1200px) rotateX(-4deg) translateY(-2px) scale(0.995);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes gsGlowOrb {
          0%, 100% { opacity: 0.45; transform: scale(1) translate(0, 0); }
          50% { opacity: 0.85; transform: scale(1.08) translate(15px, -15px); }
        }

        @keyframes gsEqualizer {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }

        .gs-flip-card {
          opacity: 0;
          transform: perspective(1200px) rotateX(-90deg) translateY(-40px) scale(0.92);
          transform-origin: top center;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .gs-flip-card.in-view {
          animation: gsCardFlipTopToBottom 0.82s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .gs-interactive-card {
          position: relative;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }
        .gs-interactive-card:hover {
          transform: translateY(-8px) scale(1.015) !important;
          box-shadow: 0 16px 36px rgba(0, 229, 255, 0.18), 0 0 20px rgba(0, 229, 255, 0.12) !important;
          border-color: rgba(0, 229, 255, 0.65) !important;
        }
        .gs-hero-artist-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .gs-hero-artist-card:hover {
          border-color: rgba(0, 229, 255, 0.8) !important;
          box-shadow: 0 20px 40px rgba(0, 229, 255, 0.25) !important;
        }

        /* ── Responsive Layout & Media Queries ── */
        .gs-hero-section {
          position: relative;
          padding: 120px 0 90px;
          overflow: hidden;
          border-bottom: 1px solid var(--tw-line);
          background: radial-gradient(ellipse at 50% 20%, rgba(0, 229, 255, 0.08) 0%, transparent 65%);
        }
        .gs-hero-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 64px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .gs-hero-artist-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          perspective: 1200px;
          transform-style: preserve-3d;
        }
        .gs-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .gs-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }
        .gs-advances-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .gs-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .gs-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .gs-form-wrapper {
          background: var(--tw-bg-surface);
          border: 1px solid var(--tw-line-bright);
          border-radius: 28px;
          padding: 52px 48px;
          box-shadow: 0 35px 90px rgba(0,0,0,0.45), 0 0 30px rgba(0,229,255,0.06);
          backdrop-filter: blur(16px);
        }
        .gs-roster-card {
          flex-shrink: 0;
          width: calc((100% - 48px) / 3);
          background: var(--tw-bg-card);
          border: 1px solid var(--tw-line);
          border-radius: 22px;
          overflow: hidden;
        }

        @media (max-width: 960px) {
          .gs-hero-section {
            padding: 50px 0 60px !important;
          }
          .gs-hero-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .gs-services-grid,
          .gs-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .gs-advances-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .gs-hero-artist-grid {
            perspective: none !important;
            transform-style: flat !important;
            max-width: 440px;
            margin: 0 auto;
            width: 100%;
          }
          .gs-hero-artist-card {
            transform: none !important;
          }
          .gs-roster-card {
            width: calc((100% - 24px) / 2) !important;
          }
        }

        @media (max-width: 640px) {
          .gs-hero-section {
            padding: 32px 0 44px !important;
          }
          .gs-hero-artist-grid {
            gap: 10px !important;
            max-width: 100% !important;
          }
          .gs-hero-artist-card {
            padding: 12px 10px !important;
            border-radius: 14px !important;
          }
          .gs-hero-artist-card .gs-artist-thumb {
            height: 100px !important;
          }
          .gs-form-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .gs-form-wrapper {
            padding: 24px 16px !important;
            border-radius: 18px !important;
          }
          .gs-stats-grid {
            gap: 10px !important;
          }
          .gs-roster-card {
            width: 86% !important;
            min-width: 240px !important;
          }
        }
      `}</style>

      {/* HERO SECTION WITH 3D SPOTLIGHT & PARALLAX ARTIST CARDS */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="gs-hero-section"
      >
        {/* Dynamic Interactive Cursor Spotlight */}
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            pointerEvents: "none", 
            background: `radial-gradient(650px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(0, 229, 255, 0.12) 0%, transparent 70%)`,
            transition: "background 0.15s ease-out"
          }} 
        />

        {/* Floating Ambient Light Orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-15%", left: "-8%", width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)", animation: "gsGlowOrb 8s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", bottom: "-15%", right: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", animation: "gsGlowOrb 10s ease-in-out infinite alternate-reverse" }} />
        </div>

        <div className="container gs-hero-container">
          <div className="reveal-up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ 
                fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.14em", 
                color: "var(--tw-cyan)", border: "1px solid rgba(0,229,255,0.35)", 
                padding: "6px 16px", borderRadius: 9999, background: "rgba(0,229,255,0.08)",
                display: "inline-flex", alignItems: "center", gap: 6,
                boxShadow: "0 0 20px rgba(0,229,255,0.2)"
              }}>
                <Sparkles size={14} /> TUNEWAVE LABEL SERVICES
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(2.3rem, 5.8vw, 4.4rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 22, color: "var(--tw-text-white)", letterSpacing: "-0.02em" }}>
              Get signed where<br />
              <span style={{ 
                background: "linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                you started.
              </span>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.12rem)", color: "var(--tw-text-dim)", lineHeight: 1.75, marginBottom: 38, maxWidth: 510 }}>
              Tunewave Label Services spots the next wave of independent artists and offers catalog advances, A&R support, global radio pitching, and sync representation — all without surrendering your masters.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => onNavigate && onNavigate("/signup")} style={{ ...brandBtn, padding: "16px 32px" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,229,255,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(0,229,255,0.3)"; }}
              >
                START DISTRIBUTING <ArrowRight size={17} />
              </button>
              <button onClick={() => document.getElementById("gs-how-it-works")?.scrollIntoView({ behavior: "smooth" })} 
                style={{ 
                  display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", 
                  color: "var(--tw-text-white)", border: "1px solid var(--tw-line-bright)", padding: "16px 30px", 
                  borderRadius: 9999, fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", 
                  transition: "all 0.25s ease", backdropFilter: "blur(10px)" 
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.background = "rgba(0,229,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                How It Works
              </button>
            </div>
          </div>

          {/* 3D TILT ARTIST GALLERY IN HERO */}
          <div className="gs-hero-artist-grid">
            {HALL_OF_FAME.slice(0, 4).map((artist, i) => {
              const depthZ = 15 + (i % 2) * 18;
              const staggeredY = i % 2 === 1 ? 24 : 0;
              return (
                <div 
                  key={i} 
                  className="gs-hero-artist-card"
                  style={{ 
                    background: "var(--tw-bg-card)", 
                    border: "1px solid var(--tw-line-bright)", 
                    borderRadius: 18, 
                    padding: "18px", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 12, 
                    backdropFilter: "blur(12px)",
                    transform: `rotateX(${heroTilt.x * (i % 2 === 0 ? 0.8 : 1.15)}deg) rotateY(${heroTilt.y * (i < 2 ? 0.8 : 1.15)}deg) translateZ(${depthZ}px) translateY(${staggeredY}px)`,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.3)"
                  }}
                >
                  <div className="gs-artist-thumb" style={{ position: "relative", overflow: "hidden", borderRadius: 12, height: 130 }}>
                    <img 
                      src={artist.avatar} 
                      alt={artist.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(4, 13, 26, 0.82)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 9999, display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 12 }}>
                        <span style={{ width: 2, background: "#00E5FF", borderRadius: 1, animation: "gsEqualizer 1.2s infinite ease-in-out" }} />
                        <span style={{ width: 2, background: "#00E5FF", borderRadius: 1, animation: "gsEqualizer 0.9s 0.2s infinite ease-in-out" }} />
                        <span style={{ width: 2, background: "#00E5FF", borderRadius: 1, animation: "gsEqualizer 1.4s 0.4s infinite ease-in-out" }} />
                      </div>
                      <span style={{ fontSize: "0.65rem", color: "#00E5FF", fontWeight: 800 }}>LIVE</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--tw-text-white)" }}>{artist.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--tw-cyan)", fontWeight: 800 }}>{artist.stats}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--tw-text-muted)", background: "var(--tw-bg-surface)", padding: "3px 10px", borderRadius: 9999, border: "1px solid var(--tw-line)" }}>{artist.genre}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 01: LABEL SERVICES GRID WITH CASCADING 3D FLIP ENTRANCE */}
      <section 
        ref={servicesSectionRef} 
        style={{ position: "relative", padding: "110px 0", borderBottom: "1px solid var(--tw-line)", perspective: 1200 }}
      >
        <div className="container">
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--tw-cyan)", marginBottom: 16 }}>
              <ShieldCheck size={16} /> 01 LABEL SERVICES SUPPORT
            </div>
            <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1, maxWidth: 650 }}>
              What is on the table when we <span style={{ color: "var(--tw-cyan)" }}>sign you.</span>
            </h2>
          </div>

          <div className="gs-services-grid">
            {LABEL_SERVICES.map((s, i) => (
              <div 
                key={i} 
                className={`gs-interactive-card gs-flip-card ${servicesInView ? "in-view" : ""}`}
                style={{ 
                  background: "var(--tw-bg-card)", 
                  border: "1px solid var(--tw-line)", 
                  borderRadius: 20, 
                  padding: "32px 28px", 
                  cursor: "default",
                  animationDelay: `${0.04 + i * 0.08}s`
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: `0 0 20px ${s.bg}` }}>
                  <s.icon size={22} />
                </div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--tw-text-dim)", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="dark-inverted-section" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #080B11 0%, #0c1829 50%, #080B11 100%)", padding: "90px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.06) 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 750, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.4rem)", fontWeight: 900, color: "var(--tw-text-white)", marginBottom: 18, lineHeight: 1.1 }}>
            Independent. <span style={{ color: "var(--tw-cyan)" }}>Never alone.</span>
          </h2>
          <p style={{ fontSize: "1.15rem", color: "rgba(255, 255, 255, 0.9)", marginBottom: 38, maxWidth: 560, margin: "0 auto 38px", lineHeight: 1.7 }}>
            Tunewave gives you full creative freedom while a world-class label team works behind the scenes to amplify your reach.
          </p>
          <button onClick={() => onNavigate && onNavigate("/signup")} style={{ ...brandBtn, padding: "18px 40px", boxShadow: "0 0 45px rgba(0,229,255,0.35)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 65px rgba(0,229,255,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 0 45px rgba(0,229,255,0.35)"; }}
          >
            SIGN UP FOR FREE <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* SECTION 02: HOW IT WORKS WITH 3D FLIP ENTRANCE */}
      <section 
        id="gs-how-it-works" 
        ref={stepsSectionRef} 
        style={{ position: "relative", padding: "110px 0", borderBottom: "1px solid var(--tw-line)", perspective: 1200 }}
      >
        <div className="container">
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--tw-cyan)", marginBottom: 16 }}>
              <Zap size={16} /> 02 HOW IT WORKS
            </div>
            <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1 }}>
              Three steps. <span style={{ color: "var(--tw-cyan)" }}>Invite only.</span>
            </h2>
          </div>

          <div className="gs-steps-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div 
                key={i} 
                className={`gs-interactive-card gs-flip-card ${stepsInView ? "in-view" : ""}`}
                style={{ 
                  background: "var(--tw-bg-card)", 
                  border: "1px solid var(--tw-line)", 
                  borderRadius: 22, 
                  padding: "40px 30px", 
                  position: "relative", 
                  overflow: "hidden",
                  animationDelay: `${0.08 + i * 0.14}s`
                }}
              >
                <div style={{ fontSize: "4.2rem", fontWeight: 900, color: "rgba(0,229,255,0.07)", position: "absolute", top: 12, right: 20, lineHeight: 1, fontFamily: "var(--tw-font-heading)", userSelect: "none" }}>{step.num}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--tw-cyan)", letterSpacing: "0.12em", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E5FF", boxShadow: "0 0 10px #00E5FF" }} />
                  STEP {step.num}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 14 }}>{step.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--tw-text-dim)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROSTER CAROUSEL */}
      <section style={{ padding: "110px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--tw-cyan)", marginBottom: 16 }}>03 ROSTER</div>
              <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1 }}>Every genre. <span style={{ color: "#38BDF8" }}>Every stage.</span></h2>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[{ dir: -1, disabled: rosterIdx === 0, Icon: ChevronLeft }, { dir: 1, disabled: rosterIdx >= maxIdx, Icon: ChevronRight }].map(({ dir, disabled, Icon }, bi) => (
                <button key={bi} onClick={() => scroll(dir)} disabled={disabled} style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)", color: disabled ? "var(--tw-text-muted)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,229,255,0.3)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
          <div ref={rosterRef} style={{ display: "flex", gap: 24, overflow: "hidden", scrollBehavior: "smooth" }}>
            {HALL_OF_FAME.map((artist, i) => (
              <div key={i} className="gs-interactive-card gs-roster-card">
                <div style={{ position: "relative", overflow: "hidden", height: 230 }}>
                  <img src={artist.avatar} alt={artist.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} 
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ padding: "22px 26px" }}>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 8 }}>{artist.name}</div>
                  <div style={{ display: "flex", verticalAlign: "middle", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--tw-text-dim)" }}>{artist.genre}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--tw-cyan)" }}>{artist.stats}</span>
                  </div>
                  <div style={{ marginTop: 12, fontSize: "0.74rem", color: "var(--tw-text-muted)", background: "var(--tw-bg-surface)", padding: "5px 12px", borderRadius: 9999, display: "inline-block", border: "1px solid var(--tw-line)" }}>{artist.accolade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: ADVANCES WITH CASCADING 3D FLIP ENTRANCE */}
      <section 
        ref={advancesSectionRef} 
        style={{ position: "relative", padding: "110px 0", borderBottom: "1px solid var(--tw-line)", perspective: 1200 }}
      >
        <div className="container">
          <div className="gs-advances-grid">
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.15em", color: "var(--tw-cyan)", marginBottom: 16 }}>04 ADVANCES</div>
              <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.15, marginBottom: 22 }}>
                Keep your masters.<br /><span style={{ color: "var(--tw-cyan)" }}>Access real funding.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--tw-text-dim)", lineHeight: 1.75, marginBottom: 38 }}>
                Non-recoupable catalog advances based on your projected streaming income — you never sign away ownership, publishing, or creative control.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Zero personal liability", "100% master ownership retained", "No multi-album lock-ins", "Transparent royalty reporting"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,229,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 10px rgba(0,229,255,0.2)" }}>
                      <CheckCircle size={14} color="#00E5FF" />
                    </div>
                    <span style={{ fontSize: "0.95rem", color: "var(--tw-text-dim)", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Stat Cards with Cascading 3D Flip */}
            <div className="gs-stats-grid">
              {[
                { value: "5", label: "Continents", sub: "Global reach" },
                { value: "15+", label: "Countries", sub: "Active markets" },
                { value: "$500K", label: "Max Advance", sub: "Per catalog" },
                { value: "100%", label: "Master Rights", sub: "Always yours" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`gs-interactive-card gs-flip-card ${advancesInView ? "in-view" : ""}`}
                  style={{ 
                    background: "var(--tw-bg-card)", 
                    border: "1px solid var(--tw-line)", 
                    borderRadius: 20, 
                    padding: "32px 24px", 
                    textAlign: "center",
                    animationDelay: `${0.06 + i * 0.1}s`
                  }}
                >
                  <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "var(--tw-cyan)", fontFamily: "var(--tw-font-heading)", lineHeight: 1, textShadow: "0 0 25px rgba(0,229,255,0.35)" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--tw-text-white)", marginTop: 8 }}>{stat.label}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--tw-text-muted)", marginTop: 4 }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM WITH POLISHED GLASS GLOW */}
      <section style={{ padding: "110px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1, marginBottom: 22 }}>
                Start with one release.<br />
                <span style={{ color: "var(--tw-cyan)" }}>Let the music do the talking.</span>
              </h2>
              <p style={{ fontSize: "1.1rem", color: "var(--tw-text-dim)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Submit your music to our A&R team. We listen to every submission and reach out directly when your project fits an active campaign.
              </p>
            </div>
            <div className="gs-form-wrapper">
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 4 }}>Submit Your Music to Tunewave A&amp;R</h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--tw-text-dim)", marginBottom: 12 }}>Our A&amp;R team reviews every submission. If your project fits, a manager will reach out within 5-7 business days.</p>
                  <div className="gs-form-grid">
                    {[
                      { label: "Artist / Band Name", type: "text", ph: "e.g. Nova Luna" },
                      { label: "Contact Email", type: "email", ph: "mgmt@artist.com" },
                      { label: "Spotify Profile URL", type: "url", ph: "https://open.spotify.com/artist/..." },
                      { label: "Demo / Unreleased Link", type: "url", ph: "https://soundcloud.com/private-link" },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--tw-text-dim)", marginBottom: 8, letterSpacing: "0.04em" }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.ph} style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,229,255,0.2)"; }}
                          onBlur={e => { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--tw-text-dim)", marginBottom: 8, letterSpacing: "0.04em" }}>Recent Milestones &amp; Upcoming Releases</label>
                    <textarea rows={4} placeholder="Monthly listeners, streaming milestones, touring dates, release windows..." style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,229,255,0.2)"; }}
                      onBlur={e => { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  <button type="submit" style={{ width: "100%", padding: "18px", background: "linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)", color: "#040D1A", border: "none", borderRadius: 9999, fontWeight: 800, fontSize: "0.98rem", letterSpacing: "0.06em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10, transition: "box-shadow 0.25s, transform 0.25s", boxShadow: "0 0 35px rgba(0,229,255,0.3)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 55px rgba(0,229,255,0.55)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 35px rgba(0,229,255,0.3)"; }}
                  >
                    <Send size={18} /> SUBMIT TO A&amp;R EVALUATION
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 76, height: 76, borderRadius: "50%", background: "rgba(0,229,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: "2px solid rgba(0,229,255,0.4)", boxShadow: "0 0 25px rgba(0,229,255,0.25)" }}>
                    <CheckCircle size={40} color="#00E5FF" />
                  </div>
                  <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--tw-text-white)", marginBottom: 14 }}>Application Received</h2>
                  <p style={{ color: "var(--tw-text-dim)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto 30px", lineHeight: 1.7 }}>
                    Our A&amp;R team reviews submissions continuously. If your project fits, we will reach out within 5-7 business days.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{ background: "transparent", color: "var(--tw-cyan)", border: "1px solid rgba(0,229,255,0.4)", padding: "14px 32px", borderRadius: 9999, fontWeight: 700, cursor: "pointer", fontSize: "0.92rem", transition: "all 0.25s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.12)"; e.currentTarget.style.borderColor = "#00E5FF"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; }}
                  >
                    Submit Another Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
