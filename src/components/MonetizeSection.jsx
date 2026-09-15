import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../data/content';
import { DollarSign, Clapperboard, Video, Split, ArrowRight, ShieldCheck, RotateCw, Check, Lock, Sparkles } from 'lucide-react';

// Custom hook for smooth numerical count-up on scroll reveal
function useCountUp(target, startAnimation, duration = 1500) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startAnimation) {
      setVal(0);
      return;
    }
    let startTime = null;
    let animId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo for silky smooth deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(ease * target);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [startAnimation, target, duration]);

  return val;
}

export default function MonetizeSection({ onNavigate, lang = 'en' }) {
  const t = TRANSLATIONS[lang]?.act2 || TRANSLATIONS.en.act2;
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // 360° 3D Mouse Movement Rotation States
  const cardContainerRef = useRef(null);
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const lastMouseX = useRef(null);
  const accumulatedAngle = useRef(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    
    // Normalised position across the card from 0 to 1
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Direct progress mapping: moving mouse across the card rotates it 360 degrees in full 3D!
    const progressX = Math.max(0, Math.min(1, x / rect.width));
    const targetRotY = progressX * 360;
    
    // Vertical tilt for natural 3D perspective depth (-20deg to +20deg)
    const progressY = Math.max(0, Math.min(1, y / rect.height));
    const targetRotX = (progressY - 0.5) * -22;
    
    setRotY(targetRotY);
    setRotX(targetRotX);
    setGlarePos({
      x: Math.round(progressX * 100),
      y: Math.round(progressY * 100)
    });
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    lastMouseX.current = null;
    accumulatedAngle.current = 0;
    setRotY(0);
    setRotX(0);
  };

  const handleSpin360 = (e) => {
    e.stopPropagation();
    setIsAutoSpinning(true);
    setRotY(prev => prev + 360);
    setTimeout(() => {
      setIsAutoSpinning(false);
    }, 1000);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      lastMouseX.current = e.touches[0].clientX;
      setIsHovered(true);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0 && lastMouseX.current !== null) {
      const deltaX = e.touches[0].clientX - lastMouseX.current;
      accumulatedAngle.current += deltaX * 1.25;
      setRotY(accumulatedAngle.current);
      lastMouseX.current = e.touches[0].clientX;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Re-arm animation when user scrolls out of view
          setIsInView(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const EARNINGS_ITEMS = [
    { label: "DSP Streaming (Spotify, Apple, Amazon)", rawAmount: 1842.30, pct: 68, icon: DollarSign, color: "#00E5FF" },
    { label: "Global Publishing (PRS, ASCAP, BMI, GEMA)", rawAmount: 685.50, pct: 45, icon: ShieldCheck, color: "#00F2FE" },
    { label: "Sync Placements (Netflix Series / Commercials)", rawAmount: 3200.00, pct: 85, icon: Clapperboard, color: "#38BDF8" },
    { label: "YouTube Content ID & Shorts Claims", rawAmount: 412.80, pct: 32, icon: Video, color: "#0EA5E9" },
    { label: "Auto-Split Collab Royalties (Zero Cut)", rawAmount: 290.40, pct: 24, icon: Split, color: "#22D3EE" }
  ];

  const totalRaw = 6431.00;
  const animatedTotal = useCountUp(totalRaw, isInView, 1600);

  // Staggered animated counts for each row
  const count0 = useCountUp(EARNINGS_ITEMS[0].rawAmount, isInView, 1400);
  const count1 = useCountUp(EARNINGS_ITEMS[1].rawAmount, isInView, 1400);
  const count2 = useCountUp(EARNINGS_ITEMS[2].rawAmount, isInView, 1500);
  const count3 = useCountUp(EARNINGS_ITEMS[3].rawAmount, isInView, 1300);
  const count4 = useCountUp(EARNINGS_ITEMS[4].rawAmount, isInView, 1200);
  const rowCounts = [count0, count1, count2, count3, count4];

  const formatCurrency = (amount) => {
    return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '110px 0',
        position: 'relative',
        background: 'var(--tw-bg-surface)',
        borderBottom: '1px solid var(--tw-line)',
        transition: 'background 0.25s ease',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 229, 255, 0.25), 0 10px 30px rgba(0, 0, 0, 0.4); }
          50% { box-shadow: 0 0 28px rgba(0, 229, 255, 0.45), 0 15px 40px rgba(0, 0, 0, 0.6); }
        }
        @keyframes shimmerBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes radarPing {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        .monetize-card-enter {
          opacity: 0;
          transform: translateY(32px) scale(0.98);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .monetize-card-enter.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .monetize-row-item {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .monetize-row-item.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .feature-card-enter {
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .feature-card-enter.in-view {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div className="container">
        {/* Kicker badge with scroll reveal */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div className="pulse-dot" style={{ backgroundColor: 'var(--tw-cyan)', boxShadow: '0 0 10px var(--tw-cyan)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--tw-cyan)' }}>
            {t.num} · {t.kicker.toUpperCase()}
          </span>
        </div>

        {/* Section Headline with one-by-one sequential scroll reveal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 22,
          marginBottom: 56
        }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: 'var(--tw-text-white)',
            margin: 0
          }}>
            {/* Line 1: Every stream. (Word-by-word sequential reveal) */}
            <div style={{ overflow: 'hidden', display: 'flex', gap: '0.28em', flexWrap: 'wrap' }}>
              {t.headline.split(' ').map((word, idx) => (
                <span
                  key={`h1-${idx}`}
                  style={{
                    display: 'inline-block',
                    transform: isInView ? 'translateY(0)' : 'translateY(120%)',
                    opacity: isInView ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${160 + idx * 140}ms, opacity 0.7s ease ${160 + idx * 140}ms`,
                    willChange: 'transform, opacity'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Line 2: Every royalty. (Word-by-word cyan sequential reveal) */}
            <div style={{ overflow: 'hidden', display: 'flex', gap: '0.28em', flexWrap: 'wrap', color: 'var(--tw-cyan)', marginTop: 4 }}>
              {t.headlineAccent.split(' ').map((word, idx) => (
                <span
                  key={`h2-${idx}`}
                  style={{
                    display: 'inline-block',
                    transform: isInView ? 'translateY(0)' : 'translateY(120%)',
                    opacity: isInView ? 1 : 0,
                    transition: `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${460 + idx * 140}ms, opacity 0.7s ease ${460 + idx * 140}ms`,
                    willChange: 'transform, opacity'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </h2>

          {/* Lede Paragraph: Sequential word-by-word reveal */}
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--tw-text-dim)',
            maxWidth: '740px',
            lineHeight: 1.65,
            margin: 0
          }}>
            {t.lede.split(' ').map((word, idx) => (
              <span
                key={`p-${idx}`}
                style={{
                  display: 'inline-block',
                  marginRight: '0.26em',
                  transform: isInView ? 'translateY(0)' : 'translateY(12px)',
                  opacity: isInView ? 1 : 0,
                  transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${720 + idx * 20}ms, opacity 0.5s ease ${720 + idx * 20}ms`,
                  willChange: 'transform, opacity'
                }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Action CTAs: Staggered entrance following the text */}
          <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
            <div style={{
              transform: isInView ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.95)',
              opacity: isInView ? 1 : 0,
              transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1400ms, opacity 0.65s ease 1400ms'
            }}>
              <button
                onClick={() => onNavigate('/monetize')}
                className="btn-cyan"
              >
                <span>{t.ctaPrimary}</span>
              </button>
            </div>
            <div style={{
              transform: isInView ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.95)',
              opacity: isInView ? 1 : 0,
              transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 1520ms, opacity 0.65s ease 1520ms'
            }}>
              <button
                onClick={() => onNavigate('/monetize')}
                className="btn-glass"
              >
                <span>{t.ctaSecondary}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid: Interactive Live Earnings Dashboard vs Feature Stack */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 36,
          alignItems: 'center'
        }}>
          {/* 3D Perspective Stage for Interactive 360° Mouse Movement Rotation */}
          <div 
            ref={cardContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeave}
            style={{
              perspective: 1400,
              perspectiveOrigin: '50% 50%',
              position: 'relative',
              userSelect: 'none',
              cursor: isHovered ? 'grabbing' : 'grab',
              padding: '10px 0'
            }}
          >
            {/* 3D Rotating Card Body */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                transition: (isHovered && !isAutoSpinning) 
                  ? 'transform 0.08s ease-out' 
                  : 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: 24,
                willChange: 'transform'
              }}
            >
              {/* FRONT FACE: Artist Earnings Mockup Card */}
              <div 
                className={`monetize-card-enter ${isInView ? 'in-view' : ''} card-shimmer-sweep`} 
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  background: 'var(--tw-bg-surface)',
                  border: '1px solid var(--tw-line-bright)',
                  borderRadius: 24,
                  padding: 32,
                  boxShadow: isInView ? 'var(--tw-shadow-card)' : 'none',
                  position: 'relative',
                  animation: isInView ? 'pulseGlow 6s ease-in-out infinite' : 'none'
                }}
              >
                {/* Dynamic Specular Glare across front surface */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 24,
                  pointerEvents: 'none',
                  background: isHovered 
                    ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)` 
                    : 'none',
                  transition: 'opacity 0.2s ease',
                  zIndex: 3
                }} />

                {/* Header with dots, Title, 360° indicator and LIVE pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                  borderBottom: '1px solid var(--tw-line-bright)',
                  marginBottom: 24
                }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00E5FF' }} />
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                    Artist Earnings · This Month
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* 360° Interactive Badge & Click to Spin */}
                    <button 
                      onClick={handleSpin360}
                      title="Click or move mouse to rotate 360° in 3D"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '3px 8px',
                        background: 'rgba(0, 229, 255, 0.12)',
                        border: '1px solid rgba(0, 229, 255, 0.35)',
                        borderRadius: 20,
                        color: 'var(--tw-cyan)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <RotateCw size={10} style={{ animation: isAutoSpinning ? 'spin 0.8s linear infinite' : 'none' }} />
                      <span>360°</span>
                    </button>

                    <div className="pill-badge live" style={{ 
                      padding: '4px 10px', 
                      fontSize: '0.72rem', 
                      fontWeight: 800,
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span style={{ position: 'relative', display: 'inline-block', width: 7, height: 7 }}>
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: '#10B981',
                          animation: 'radarPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite'
                        }} />
                        <span style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          background: '#10B981'
                        }} />
                      </span>
                      <span>LIVE</span>
                    </div>
                  </div>
                </div>

                {/* Rows with staggered entrance and scroll-triggered filling progress bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {EARNINGS_ITEMS.map((row, idx) => {
                    const Icon = row.icon;
                    const formattedVal = formatCurrency(rowCounts[idx]);

                    return (
                      <div 
                        key={idx} 
                        className={`monetize-row-item ${isInView ? 'in-view' : ''}`}
                        style={{ transitionDelay: `${120 + idx * 70}ms` }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              background: `${row.color}18`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: row.color,
                              transition: 'transform 0.2s ease',
                              transform: isInView ? 'scale(1)' : 'scale(0.8)'
                            }}>
                              <Icon size={16} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--tw-text-white)' }}>
                              {row.label}
                            </span>
                          </div>
                          <span style={{ 
                            fontSize: '0.95rem', 
                            fontWeight: 800, 
                            color: 'var(--tw-text-white)', 
                            fontFamily: "'Space Grotesk', sans-serif",
                            minWidth: 85,
                            textAlign: 'right'
                          }}>
                            {formattedVal}
                          </span>
                        </div>

                        {/* Animated Progress Bar: Fills smoothly on scroll */}
                        <div style={{
                          width: '100%',
                          height: 6,
                          background: 'var(--tw-bg-card)',
                          borderRadius: 3,
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div 
                            style={{
                              width: isInView ? `${row.pct}%` : '0%',
                              height: '100%',
                              background: row.color,
                              borderRadius: 3,
                              boxShadow: `0 0 12px ${row.color}`,
                              transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${200 + idx * 100}ms`,
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Shimmer highlight sweeping across the progress bar */}
                            {isInView && (
                              <div style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                width: '40%',
                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                                animation: `shimmerBar 2.2s infinite ease-in-out ${idx * 200}ms`
                              }} />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total Paid Row with Dynamic Count-up animation */}
                <div style={{
                  marginTop: 28,
                  paddingTop: 20,
                  borderTop: '1px solid var(--tw-line-bright)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
                }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Total Deposited Directly
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--tw-cyan)', fontWeight: 600 }}>
                      ✓ Instant withdrawal ready
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 900, 
                    color: 'var(--tw-cyan)', 
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '-0.02em',
                    transition: 'color 0.3s ease'
                  }}>
                    {formatCurrency(animatedTotal)}
                  </div>
                </div>

                {/* Interactive 360° Mouse Hint Banner */}
                <div style={{
                  marginTop: 18,
                  paddingTop: 12,
                  borderTop: '1px dashed var(--tw-line)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontSize: '0.72rem',
                  color: 'var(--tw-text-dim)',
                  letterSpacing: '0.03em'
                }}>
                  <RotateCw size={12} color="var(--tw-cyan)" />
                  <span>Move mouse across card to rotate <strong>360°</strong> in 3D</span>
                </div>
              </div>

              {/* BACK FACE: TuneWave Direct Deposit & Royalty Vault Certificate */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(145deg, var(--tw-bg-surface) 0%, rgba(0, 229, 255, 0.08) 50%, var(--tw-bg-surface) 100%)',
                  border: '1px solid var(--tw-cyan)',
                  borderRadius: 24,
                  padding: 32,
                  boxShadow: '0 20px 50px rgba(0, 229, 255, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  boxSizing: 'border-box'
                }}
              >
                {/* Back Specular Glare */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 24,
                  pointerEvents: 'none',
                  background: isHovered 
                    ? `radial-gradient(circle at ${100 - glarePos.x}% ${glarePos.y}%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)` 
                    : 'none',
                  zIndex: 3
                }} />

                {/* Header with dots and Secure Vault Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--tw-line-bright)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00E5FF' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', marginLeft: 8 }}>
                      ENCRYPTED ARTIST VAULT
                    </span>
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    borderRadius: 12,
                    background: 'rgba(0, 229, 255, 0.12)',
                    border: '1px solid rgba(0, 229, 255, 0.35)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: 'var(--tw-cyan)'
                  }}>
                    <Check size={12} />
                    VERIFIED DIRECT ROUTE
                  </div>
                </div>

                {/* EMV Holographic Chip & Card Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '14px 0' }}>
                  {/* Microchip graphic */}
                  <div style={{
                    width: 46,
                    height: 36,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 50%, #ffd700 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,215,0,0.6)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.3)' }} />
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33%', width: 1, background: 'rgba(0,0,0,0.3)' }} />
                    <div style={{ position: 'absolute', top: 0, bottom: 0, right: '33%', width: 1, background: 'rgba(0,0,0,0.3)' }} />
                    <div style={{ position: 'absolute', inset: 6, borderRadius: 3, border: '1px solid rgba(0,0,0,0.25)' }} />
                  </div>

                  {/* Wireless Waveform NFC icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tw-cyan)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12.01" y2="20" />
                    </svg>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.1em' }}>DIRECT WIRE</span>
                  </div>
                </div>

                {/* Direct Routing Credentials */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--tw-line-bright)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  marginBottom: 16
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Instant Payout Destination
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--tw-text-white)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                    TW-VAULT •••• •••• 4829
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--tw-line)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--tw-text-dim)' }}>Royalty Retained</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#10B981' }}>100% Zero Cut</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--tw-text-dim)' }}>Settlement Rails</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--tw-cyan)' }}>Stripe · Wise · ACH · SEPA</span>
                  </div>
                </div>

                {/* Security and Compliance Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                  <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid var(--tw-line)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--tw-text-dim)' }}>Settlement Velocity</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>&lt; 60 Seconds Instant</div>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: 8, border: '1px solid var(--tw-line)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--tw-text-dim)' }}>Security Protocol</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>256-Bit Ledger · SOC2</div>
                  </div>
                </div>

                {/* Back Face Footer Balance */}
                <div style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--tw-line-bright)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Total Verified Payout
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--tw-cyan)', fontWeight: 600 }}>
                      ✓ 150+ Digital Storefronts
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '1.9rem', 
                    fontWeight: 900, 
                    color: 'var(--tw-cyan)', 
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '-0.02em'
                  }}>
                    {formatCurrency(animatedTotal)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Feature Cards List with staggered cascade entrance & micro-interactions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Card 1: Music Publishing Royalties */}
            <div 
              className={`glass-panel feature-card-enter ${isInView ? 'in-view' : ''}`} 
              style={{ 
                padding: 24, 
                display: 'flex', 
                gap: 20, 
                cursor: 'pointer', 
                transitionDelay: '150ms',
                transform: hoveredCard === 1 ? 'translateY(-4px) scale(1.01)' : (isInView ? 'translateX(0)' : 'translateX(36px)'),
                borderColor: hoveredCard === 1 ? 'var(--tw-cyan)' : 'var(--tw-line)',
                boxShadow: hoveredCard === 1 ? '0 12px 30px -8px rgba(0, 229, 255, 0.25)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onNavigate('/publishing')}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(21, 128, 61, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--tw-cyan)',
                flexShrink: 0,
                transform: hoveredCard === 1 ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.25s ease'
              }}>
                <DollarSign size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6, color: 'var(--tw-text-white)' }}>
                    Music Publishing Royalties
                  </h3>
                  <ArrowRight 
                    size={15} 
                    color="var(--tw-cyan)" 
                    style={{
                      transform: hoveredCard === 1 ? 'translateX(5px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
                  Collect up to 20% in hidden songwriting royalties and mechanicals that traditional distributors leave behind.
                </p>
              </div>
            </div>

            {/* Card 2: Film, TV & Game Sync */}
            <div 
              className={`glass-panel feature-card-enter ${isInView ? 'in-view' : ''}`} 
              style={{ 
                padding: 24, 
                display: 'flex', 
                gap: 20, 
                cursor: 'pointer', 
                transitionDelay: '270ms',
                transform: hoveredCard === 2 ? 'translateY(-4px) scale(1.01)' : (isInView ? 'translateX(0)' : 'translateX(36px)'),
                borderColor: hoveredCard === 2 ? 'var(--tw-purple)' : 'var(--tw-line)',
                boxShadow: hoveredCard === 2 ? '0 12px 30px -8px rgba(14, 165, 233, 0.25)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onNavigate('/sync')}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(139, 92, 246, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--tw-purple)',
                flexShrink: 0,
                transform: hoveredCard === 2 ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.25s ease'
              }}>
                <Clapperboard size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6, color: 'var(--tw-text-white)' }}>
                    Film, TV & Game Sync
                  </h3>
                  <ArrowRight 
                    size={15} 
                    color="var(--tw-purple)" 
                    style={{
                      transform: hoveredCard === 2 ? 'translateX(5px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
                  Pitch your catalog to music supervisors at Netflix, HBO, Sony PlayStation, EA Games, and worldwide brands.
                </p>
              </div>
            </div>

            {/* Card 3: YouTube Content ID & Shorts */}
            <div 
              className={`glass-panel feature-card-enter ${isInView ? 'in-view' : ''}`} 
              style={{ 
                padding: 24, 
                display: 'flex', 
                gap: 20, 
                cursor: 'pointer', 
                transitionDelay: '390ms',
                transform: hoveredCard === 3 ? 'translateY(-4px) scale(1.01)' : (isInView ? 'translateX(0)' : 'translateX(36px)'),
                borderColor: hoveredCard === 3 ? '#EF4444' : 'var(--tw-line)',
                boxShadow: hoveredCard === 3 ? '0 12px 30px -8px rgba(239, 68, 68, 0.25)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onNavigate('/tools/youtube-content-id')}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(239, 68, 68, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                flexShrink: 0,
                transform: hoveredCard === 3 ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.25s ease'
              }}>
                <Video size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6, color: 'var(--tw-text-white)' }}>
                    YouTube Content ID & Shorts
                  </h3>
                  <ArrowRight 
                    size={15} 
                    color="#EF4444" 
                    style={{
                      transform: hoveredCard === 3 ? 'translateX(5px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
                  Automated audio fingerprinting turns every user-generated upload, dance trend, and cover video into revenue.
                </p>
              </div>
            </div>

            {/* Card 4: Auto-Split Collaborators */}
            <div 
              className={`glass-panel feature-card-enter ${isInView ? 'in-view' : ''}`} 
              style={{ 
                padding: 24, 
                display: 'flex', 
                gap: 20, 
                cursor: 'pointer', 
                transitionDelay: '510ms',
                transform: hoveredCard === 4 ? 'translateY(-4px) scale(1.01)' : (isInView ? 'translateX(0)' : 'translateX(36px)'),
                borderColor: hoveredCard === 4 ? '#10B981' : 'var(--tw-line)',
                boxShadow: hoveredCard === 4 ? '0 12px 30px -8px rgba(16, 185, 129, 0.25)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onNavigate('/monetize')}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                flexShrink: 0,
                transform: hoveredCard === 4 ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.25s ease'
              }}>
                <Split size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6, color: 'var(--tw-text-white)' }}>
                    Auto-Split Collaborators
                  </h3>
                  <ArrowRight 
                    size={15} 
                    color="#10B981" 
                    style={{
                      transform: hoveredCard === 4 ? 'translateX(5px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
                  Split percentages with featured artists, co-writers, and beat producers automatically when royalties arrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
