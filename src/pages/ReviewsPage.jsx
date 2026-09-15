import React, { useState, useEffect, useMemo } from "react";
import { REVIEWS_DATA } from "../data/content";
import { Star, ShieldCheck, MessageSquare, ThumbsUp, Award, Users, X, Check } from "lucide-react";

const GENRES = ["All", "Electronic", "Hip Hop", "Indie", "Afrobeats"];

const PLATFORMS = [
  { name: "Trustpilot", score: "4.8", stars: 5, count: "6,200+" },
  { name: "Google",     score: "4.9", stars: 5, count: "3,100+" },
  { name: "App Store",  score: "4.7", stars: 5, count: "12,500+" },
];

const STATS = [
  { value: "25K+",  label: "Active Artists",     icon: Users },
  { value: "4.8",   label: "Average Rating",     icon: Star },
  { value: "98%",   label: "Satisfaction Rate",  icon: ThumbsUp },
  { value: "150+",  label: "Platforms",          icon: Award },
];

export default function ReviewsPage({ onNavigate, theme = "dark" }) {
  const [filterGenre, setFilterGenre] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [starRating, setStarRating] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);

  const isLight = theme === "light";

  // Pre-generate starfield box-shadows for atmospheric cosmic depth
  const starFieldShadow = useMemo(() => {
    let starsA = [];
    for (let i = 0; i < 90; i++) {
      const x = ((i * 37 + 13) % 100);
      const y = ((i * 47 + 29) % 100);
      const alpha = 0.08 + ((i % 10) * 0.025);
      starsA.push(`${x}vw ${y}vh 0px 0 rgba(255,255,255,${alpha.toFixed(3)})`);
    }
    return starsA.join(", ");
  }, []);

  const filtered = filterGenre === "All"
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter(r => r.location.toLowerCase().includes(filterGenre.toLowerCase()));

  const inputStyle = {
    width: "100%", 
    background: isLight ? "#FFFFFF" : "rgba(19, 27, 42, 0.9)", 
    border: isLight ? "1px solid #CBD5E1" : "1px solid var(--tw-line-bright)",
    borderRadius: 10, 
    padding: "12px 16px", 
    color: isLight ? "#0F172A" : "var(--tw-text-white)", 
    fontSize: "0.9rem", 
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease", 
    boxSizing: "border-box"
  };

  return (
    <div style={{ 
      paddingTop: 0, 
      paddingBottom: 100, 
      background: isLight ? "#F8FAFC" : "#020204",
      color: isLight ? "#0F172A" : "#FFFFFF",
      minHeight: "100vh",
      position: "relative",
      transition: "background 0.3s ease, color 0.3s ease"
    }}>
      <style>{`
        /* =========================================================
           PIXEL CONTRACT B: SIGNATURE GLOW BUTTON (.btn-glow)
           Near-black with pooled cyan light at the foot + top streak
           ========================================================= */
        .btn-glow {
          display: inline-grid;
          place-items: center;
          color: #FFFFFF !important;
          position: relative;
          overflow: hidden;
          background: linear-gradient(to top,
            #9ad9ec 1px, #89dff0 2px, #79e0f1 3px, #61daef 4px, #3ec8e4 5px,
            #14a8c6 6px, #0596b3 7px, #038aa8 8px, #047796 9px, #006180 10px,
            #025066 12px, #0a4f5e 13px, #04465a 14px, #073746 16px,
            #0a2a37 18px, #0d212e 20px, #0f1824 24px, #0a121e 30px,
            #0a111d 34px, #0a111d 100%);
          box-shadow:
            inset 0 3px 3px -2px rgba(180,228,255,.10),
            inset 1px 0 0 rgba(255,255,255,.09),
            inset -1px 0 0 rgba(255,255,255,.09),
            0 1px 0 rgba(152,218,234,.38),
            1px 0 0 rgba(152,218,234,.17), -1px 0 0 rgba(152,218,234,.17),
            0 0 8px rgba(60,190,235,.10),
            0 2px 5px -3px rgba(90,220,255,.45);
          border-radius: 14px;
          cursor: pointer;
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
          user-select: none;
          text-decoration: none;
          padding: 16px 28px;
          font-family: inherit;
        }
        .btn-glow::before {
          content: "";
          position: absolute;
          left: 22%;
          right: 38%;
          top: 0.8px;
          height: 1.9px;
          z-index: 1;
          filter: blur(0.55px);
          background: linear-gradient(90deg,
            rgba(120,225,255,0) 0%,
            rgba(120,225,255,.58) 34%,
            rgba(160,240,255,.74) 50%,
            rgba(120,225,255,.58) 66%,
            rgba(120,225,255,0) 100%);
        }
        .btn-glow::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
          background: linear-gradient(90deg, rgba(200,245,255,.70), rgba(200,245,255,0) 13px),
                     linear-gradient(270deg, rgba(200,245,255,.70), rgba(200,245,255,0) 13px);
          -webkit-mask: linear-gradient(to top, #000 0, #000 6px, rgba(0,0,0,.40) 12px,
            rgba(0,0,0,.15) 18px, rgba(0,0,0,.09) 24px, rgba(0,0,0,.02) 30px, rgba(0,0,0,.02) 100%);
          mask: linear-gradient(to top, #000 0, #000 6px, rgba(0,0,0,.40) 12px,
            rgba(0,0,0,.15) 18px, rgba(0,0,0,.09) 24px, rgba(0,0,0,.02) 30px, rgba(0,0,0,.02) 100%);
        }
        .btn-glow:hover {
          transform: translateY(-2px);
          filter: brightness(1.12);
          box-shadow:
            inset 0 1px 0 rgba(200,245,255,.6),
            inset 1px 0 0 rgba(170,225,255,.35),
            inset -1px 0 0 rgba(170,225,255,.35),
            0 8px 24px rgba(20,180,225,.55);
        }
        .btn-glow span {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          line-height: 1;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 2px rgba(0,20,30,.5);
        }

        /* =========================================================
           PIXEL CONTRACT A: THE BADGE (.contract-badge)
           Fixed box with icon tile pinned to the left edge
           ========================================================= */
        .contract-badge {
          display: inline-flex;
          align-items: center;
          position: relative;
          height: 39px;
          border-radius: 12px;
          border: ${isLight ? '1px solid rgba(0, 126, 167, 0.28)' : '1px solid rgba(255,255,255,.115)'};
          background: ${isLight 
            ? 'linear-gradient(to top, rgba(0, 126, 167, 0.09) 0px, rgba(255,255,255,0.95) 100%)' 
            : `linear-gradient(to top,
                rgba(190,225,255,.175) 0px, rgba(190,225,255,.128) 2px, rgba(190,225,255,.075) 4px,
                rgba(190,225,255,.026) 6px, rgba(255,255,255,.012) 9px, rgba(255,255,255,.012) 100%)`};
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
          padding: 0 18px 0 42px;
          user-select: none;
        }
        .contract-badge i {
          position: absolute;
          left: 4px;
          top: 4px;
          width: 29px;
          height: 29px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          background: linear-gradient(to top,
            #46afc8 0px, #35abc7 2px, #0b859d 4px, #026c84 6px, #004e66 8px,
            #053f58 10px, #012c3d 12px, #031a2a 14px, #061125 16px, #090f25 19px,
            #090c1c 23px, #060d16 29px);
          box-shadow:
            inset 1px 0 0 rgba(150,220,250,.40),
            inset -1px 0 0 rgba(150,220,250,.52),
            0 0 6px rgba(60,190,230,.20),
            0 3px 8px -5px rgba(90,220,255,.6);
        }
        .contract-badge b {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: ${isLight ? '#007EA7' : 'rgba(255,255,255,.94)'};
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* Glassmorphic platform card styles */
        .rev-platform-card {
          background: ${isLight ? '#FFFFFF' : 'rgba(14, 20, 32, 0.78)'};
          border: ${isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.11)'};
          border-radius: 16px;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: ${isLight 
            ? '0 10px 25px -8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.8)' 
            : '0 12px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .rev-platform-card:hover {
          transform: translateY(-3px);
          border-color: ${isLight ? '#007EA7' : '#00E5FF'};
          box-shadow: ${isLight 
            ? '0 14px 30px -8px rgba(0, 126, 167, 0.2)' 
            : '0 16px 35px -10px rgba(0, 229, 255, 0.3)'};
        }
      `}</style>

      {/* =========================================================
         REDESIGNED HERO / SELECTION (EXACT ORIGINAL CONTENT)
         ========================================================= */}
      <section style={{ 
        position: "relative", 
        padding: "110px 0 80px", 
        overflow: "hidden", 
        borderBottom: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid var(--tw-line)",
        background: isLight
          ? "radial-gradient(ellipse at 50% 0%, rgba(0, 126, 167, 0.08) 0%, transparent 70%)"
          : `linear-gradient(180deg, rgba(25,127,255,0) 38%, rgba(25,127,255,.042) 54%, rgba(25,127,255,.052) 68%, rgba(25,127,255,.030) 100%), #020204`
      }}>
        {/* Ambient background glow & starfield particles */}
        {!isLight && (
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1px",
              height: "1px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow: starFieldShadow
            }} />
            <div style={{
              position: "absolute",
              top: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(25, 127, 255, 0.04) 45%, transparent 70%)",
              filter: "blur(40px)"
            }} />
          </div>
        )}

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* 1. PIXEL CONTRACT A: FIXED BADGE */}
          <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 24 }}>
            <div className="contract-badge">
              <i>
                <ShieldCheck size={16} color="#BFF6FF" strokeWidth={2.5} />
              </i>
              <b>Verified Artist Reviews</b>
            </div>
          </div>

          {/* 2. SECTION HEADLINE */}
          <h1 style={{ 
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)", 
            fontWeight: 900, 
            lineHeight: 1.06, 
            marginBottom: 20, 
            letterSpacing: "-0.03em",
            color: isLight ? "#0F172A" : "var(--tw-text-white)",
            fontFamily: "var(--tw-font-heading)"
          }}>
            Don&apos;t just take our<br />
            <span style={{ 
              color: isLight ? "#007EA7" : "var(--tw-cyan)",
              textShadow: isLight ? "none" : "0 0 34px rgba(0, 229, 255, 0.3)"
            }}>
              word for it.
            </span>
          </h1>

          {/* 3. SUBTITLE */}
          <p style={{ 
            fontSize: "1.15rem", 
            color: isLight ? "#334155" : "var(--tw-text-dim)", 
            lineHeight: 1.65, 
            marginBottom: 52, 
            maxWidth: 580, 
            margin: "0 auto 52px" 
          }}>
            Real reviews from thousands of charting, independent, and breakthrough artists who trust TuneWave to power their careers.
          </p>

          {/* 4. PLATFORM SCORES ROW + PIXEL CONTRACT B GLOW BUTTON */}
          <div style={{ 
            display: "flex", 
            gap: 16, 
            justifyContent: "center", 
            alignItems: "center", 
            flexWrap: "wrap", 
            marginBottom: 56 
          }}>
            {PLATFORMS.map((p, i) => (
              <div key={i} className="rev-platform-card">
                <div style={{ textAlign: "left" }}>
                  <div style={{ 
                    fontSize: "0.72rem", 
                    fontWeight: 800, 
                    color: isLight ? "#64748B" : "var(--tw-text-muted)", 
                    letterSpacing: "0.09em", 
                    marginBottom: 5,
                    textTransform: "uppercase" 
                  }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", gap: 3, marginBottom: 5 }}>
                    {[...Array(5)].map((_, si) => (
                      <div 
                        key={si} 
                        style={{ 
                          width: 17, 
                          height: 17, 
                          background: isLight ? "#007EA7" : "#00E5FF", 
                          borderRadius: 3.5, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          boxShadow: isLight ? "none" : "0 0 6px rgba(0, 229, 255, 0.35)"
                        }}
                      >
                        <Star size={10.5} fill="#fff" stroke="#fff" />
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: isLight ? "#475569" : "var(--tw-text-dim)", fontWeight: 500 }}>
                    {p.count} reviews
                  </div>
                </div>
                <div style={{ 
                  fontSize: "2.3rem", 
                  fontWeight: 900, 
                  color: isLight ? "#0F172A" : "var(--tw-text-white)", 
                  fontFamily: "var(--tw-font-heading)",
                  letterSpacing: "-0.02em"
                }}>
                  {p.score}
                </div>
              </div>
            ))}

            {/* PIXEL CONTRACT B: SIGNATURE GLOW BUTTON */}
            <button 
              onClick={() => setShowModal(true)} 
              className="btn-glow"
              title="Write your verified artist review"
            >
              <span>
                <MessageSquare size={17} />
                LEAVE A REVIEW
              </span>
            </button>
          </div>

          {/* 5. STATS GRID: FLOATING GLASS CAPSULE */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
            gap: 0, 
            background: isLight ? "#FFFFFF" : "rgba(14, 20, 32, 0.8)", 
            border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.1)", 
            borderRadius: 20, 
            overflow: "hidden", 
            maxWidth: 860, 
            margin: "0 auto",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: isLight 
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.05)" 
              : "0 20px 50px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          }}>
            {STATS.map((s, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: "26px 16px", 
                  textAlign: "center", 
                  borderRight: i < 3 ? (isLight ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)") : "none" 
                }}
              >
                <div style={{ 
                  fontSize: "1.9rem", 
                  fontWeight: 900, 
                  color: isLight ? "#007EA7" : "var(--tw-cyan)", 
                  fontFamily: "var(--tw-font-heading)",
                  letterSpacing: "-0.02em"
                }}>
                  {s.value}
                </div>
                <div style={{ 
                  fontSize: "0.82rem", 
                  color: isLight ? "#475569" : "var(--tw-text-dim)", 
                  marginTop: 4,
                  fontWeight: 500 
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
         ORIGINAL FILTER & REVIEWS GRID (CONTENT PRESERVED)
         ========================================================= */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          {/* Filter */}
          <div style={{ display: "flex", gap: 10, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
            {GENRES.map((g) => (
              <button 
                key={g} 
                onClick={() => setFilterGenre(g)} 
                style={{
                  padding: "9px 22px", 
                  borderRadius: 9999, 
                  fontSize: "0.85rem", 
                  fontWeight: 700,
                  background: filterGenre === g 
                    ? (isLight ? "#007EA7" : "#00E5FF") 
                    : (isLight ? "#FFFFFF" : "var(--tw-bg-card)"),
                  color: filterGenre === g 
                    ? "#FFFFFF" 
                    : (isLight ? "#334155" : "var(--tw-text-dim)"),
                  border: "1px solid " + (filterGenre === g 
                    ? (isLight ? "#007EA7" : "#00E5FF") 
                    : (isLight ? "rgba(0,0,0,0.12)" : "var(--tw-line-bright)")),
                  cursor: "pointer", 
                  transition: "all 0.15s ease",
                  boxShadow: filterGenre === g && !isLight ? "0 0 15px rgba(0,229,255,0.3)" : "none"
                }}
                onMouseEnter={e => { 
                  if (filterGenre !== g) { 
                    e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"; 
                    e.currentTarget.style.color = isLight ? "#007EA7" : "#00E5FF"; 
                  } 
                }}
                onMouseLeave={e => { 
                  if (filterGenre !== g) { 
                    e.currentTarget.style.borderColor = isLight ? "rgba(0,0,0,0.12)" : "var(--tw-line-bright)"; 
                    e.currentTarget.style.color = isLight ? "#334155" : "var(--tw-text-dim)"; 
                  } 
                }}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Reviews grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {filtered.map((rev) => (
              <div 
                key={rev.id} 
                className="glass-panel"
                style={{
                  background: isLight ? "#FFFFFF" : "var(--tw-bg-card)", 
                  border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid var(--tw-line)",
                  borderRadius: 20, 
                  padding: "32px",
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease"
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"; 
                  e.currentTarget.style.transform = "translateY(-4px)"; 
                  e.currentTarget.style.boxShadow = isLight 
                    ? "0 14px 35px -10px rgba(0, 126, 167, 0.15)" 
                    : "0 16px 35px -10px rgba(0, 229, 255, 0.25)";
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.borderColor = isLight ? "rgba(0,0,0,0.08)" : "var(--tw-line)"; 
                  e.currentTarget.style.transform = "translateY(0)"; 
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                    {[...Array(rev.rating)].map((_, si) => (
                      <div 
                        key={si} 
                        style={{ 
                          width: 22, 
                          height: 22, 
                          background: isLight ? "#007EA7" : "#00E5FF", 
                          borderRadius: 4, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}
                      >
                        <Star size={13} fill="#fff" stroke="#fff" />
                      </div>
                    ))}
                  </div>
                  <h3 style={{ 
                    fontSize: "1.15rem", 
                    fontWeight: 800, 
                    color: isLight ? "#0F172A" : "var(--tw-text-white)", 
                    marginBottom: 12 
                  }}>
                    "{rev.title}"
                  </h3>
                  <p style={{ 
                    fontSize: "0.92rem", 
                    color: isLight ? "#475569" : "var(--tw-text-dim)", 
                    lineHeight: 1.65, 
                    marginBottom: 24 
                  }}>
                    {rev.text}
                  </p>
                </div>
                <div style={{ 
                  borderTop: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid var(--tw-line)", 
                  paddingTop: 16, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between" 
                }}>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: isLight ? "#0F172A" : "var(--tw-text-white)" }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: isLight ? "#64748B" : "var(--tw-text-muted)", marginTop: 2 }}>
                      {rev.location}
                    </div>
                  </div>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 5, 
                    color: isLight ? "#007EA7" : "var(--tw-cyan)", 
                    fontSize: "0.75rem", 
                    fontWeight: 700,
                    background: isLight ? "rgba(0, 126, 167, 0.08)" : "rgba(0,229,255,0.1)",
                    padding: "4px 10px",
                    borderRadius: 6
                  }}>
                    <ShieldCheck size={14} />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 0", borderTop: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid var(--tw-line)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ 
            fontSize: "clamp(2rem, 4vw, 3rem)", 
            fontWeight: 900, 
            color: isLight ? "#0F172A" : "var(--tw-text-white)", 
            marginBottom: 16 
          }}>
            Join 25,000+ artists who{" "}
            <span style={{ color: isLight ? "#007EA7" : "var(--tw-cyan)" }}>
              chose TuneWave.
            </span>
          </h2>
          <p style={{ 
            fontSize: "1.05rem", 
            color: isLight ? "#475569" : "var(--tw-text-dim)", 
            marginBottom: 36, 
            maxWidth: 480, 
            margin: "0 auto 36px",
            lineHeight: 1.6
          }}>
            Start releasing music today with 100% royalty retention and tools built for independent artists.
          </p>
          <button 
            onClick={() => onNavigate && onNavigate("/signup")} 
            className="btn-glow"
          >
            <span>START FOR FREE</span>
          </button>
        </div>
      </section>

      {/* REVIEW MODAL */}
      {showModal && (
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          background: "rgba(0,0,0,0.8)", 
          backdropFilter: "blur(16px)", 
          WebkitBackdropFilter: "blur(16px)",
          zIndex: 500, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          padding: 20 
        }}>
          <div style={{ 
            background: isLight ? "#FFFFFF" : "var(--tw-bg-surface)", 
            border: isLight ? "1px solid rgba(0,0,0,0.12)" : "1px solid var(--tw-line-bright)", 
            borderRadius: 24, 
            padding: "44px 40px", 
            maxWidth: 520, 
            width: "100%", 
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)", 
            position: "relative" 
          }}>
            <button 
              onClick={() => { setShowModal(false); setSubmitted(false); setStarRating(5); }} 
              style={{ 
                position: "absolute", 
                top: 20, 
                right: 20, 
                width: 36, 
                height: 36, 
                borderRadius: "50%", 
                background: isLight ? "#F1F5F9" : "var(--tw-bg-card)", 
                border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid var(--tw-line-bright)", 
                color: isLight ? "#0F172A" : "var(--tw-text-white)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                cursor: "pointer" 
              }}
            >
              <X size={16} />
            </button>
            {!submitted ? (
              <>
                <h3 style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: 900, 
                  color: isLight ? "#0F172A" : "var(--tw-text-white)", 
                  marginBottom: 6 
                }}>
                  Write a Verified Review
                </h3>
                <p style={{ 
                  fontSize: "0.88rem", 
                  color: isLight ? "#475569" : "var(--tw-text-dim)", 
                  marginBottom: 28 
                }}>
                  Share your experience releasing and monetizing on TuneWave Global Network.
                </p>

                {/* Star picker */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ 
                    display: "block", 
                    fontSize: "0.8rem", 
                    fontWeight: 700, 
                    color: isLight ? "#475569" : "var(--tw-text-dim)", 
                    marginBottom: 10, 
                    letterSpacing: "0.04em" 
                  }}>
                    YOUR RATING
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[1,2,3,4,5].map(n => (
                      <button 
                        key={n} 
                        type="button"
                        onClick={() => setStarRating(n)}
                        onMouseEnter={() => setHoverStar(n)}
                        onMouseLeave={() => setHoverStar(0)}
                        style={{ 
                          width: 38, 
                          height: 38, 
                          borderRadius: 8, 
                          background: n <= (hoverStar || starRating) 
                            ? (isLight ? "#007EA7" : "#00E5FF") 
                            : (isLight ? "#F1F5F9" : "var(--tw-bg-card)"), 
                          border: "1px solid " + (n <= (hoverStar || starRating) 
                            ? (isLight ? "#007EA7" : "#00E5FF") 
                            : (isLight ? "#CBD5E1" : "var(--tw-line-bright)")), 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          cursor: "pointer", 
                          transition: "all 0.15s ease" 
                        }}
                      >
                        <Star 
                          size={17} 
                          fill={n <= (hoverStar || starRating) ? "#fff" : "none"} 
                          stroke={n <= (hoverStar || starRating) ? "#fff" : (isLight ? "#94A3B8" : "var(--tw-text-muted)")} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input 
                    type="text" 
                    placeholder="Artist / Producer Name" 
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"}
                    onBlur={e => e.currentTarget.style.borderColor = isLight ? "#CBD5E1" : "var(--tw-line-bright)"}
                  />
                  <input 
                    type="text" 
                    placeholder="Country & Primary Genre (e.g. UK · Alt-Pop)" 
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"}
                    onBlur={e => e.currentTarget.style.borderColor = isLight ? "#CBD5E1" : "var(--tw-line-bright)"}
                  />
                  <input 
                    type="text" 
                    placeholder="Review headline..." 
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"}
                    onBlur={e => e.currentTarget.style.borderColor = isLight ? "#CBD5E1" : "var(--tw-line-bright)"}
                  />
                  <textarea 
                    rows={4} 
                    placeholder="Your full review..." 
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"}
                    onBlur={e => e.currentTarget.style.borderColor = isLight ? "#CBD5E1" : "var(--tw-line-bright)"}
                  />
                  <button 
                    onClick={() => setSubmitted(true)} 
                    className="btn-glow"
                    style={{ width: "100%", marginTop: 6 }}
                  >
                    <span>SUBMIT VERIFIED REVIEW</span>
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ 
                  width: 72, 
                  height: 72, 
                  borderRadius: "50%", 
                  background: isLight ? "rgba(0, 126, 167, 0.1)" : "rgba(0,229,255,0.1)", 
                  border: isLight ? "2px solid rgba(0, 126, 167, 0.3)" : "2px solid rgba(0,229,255,0.3)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  margin: "0 auto 20px" 
                }}>
                  <ShieldCheck size={36} color={isLight ? "#007EA7" : "#00E5FF"} />
                </div>
                <h3 style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: 900, 
                  color: isLight ? "#0F172A" : "var(--tw-text-white)", 
                  marginBottom: 8 
                }}>
                  Review Submitted!
                </h3>
                <p style={{ 
                  color: isLight ? "#475569" : "var(--tw-text-dim)", 
                  fontSize: "0.9rem", 
                  marginBottom: 24 
                }}>
                  Thank you! Your feedback will appear after our verified artist check.
                </p>
                <button 
                  onClick={() => { setShowModal(false); setSubmitted(false); setStarRating(5); }} 
                  className="btn-glow"
                  style={{ padding: "12px 32px" }}
                >
                  <span>Close</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
