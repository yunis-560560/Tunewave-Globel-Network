import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../data/content';
import { 
  BarChart3, 
  Megaphone, 
  Link2, 
  Music2, 
  Wand2, 
  Smartphone, 
  ArrowRight,
  Tv,
  Film,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function GrowSection({ onNavigate, lang = 'en' }) {
  const t = TRANSLATIONS[lang]?.act3 || TRANSLATIONS.en.act3;
  const sectionRef = useRef(null);
  const singerCardRef = useRef(null);
  
  // 360 rotation states
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animFrameId = useRef(null);
  const isMouseActive = useRef(false);
  const lastMouseTime = useRef(0);

  // 3D Tilt perspective states for interactive mouse responsiveness
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });

  // 2x2 Grid View Page state (Page 0: Tools 1-4, Page 1: Tools 5-8)
  const [activePage, setActivePage] = useState(0);

  // 9 isolated 3D singer frames extracted directly from user's "all singers.png"
  const SINGER_FRAMES = [
    { angle: 0,   src: '/singers/female_0.png',   label: 'Female · 0° (Front)' },
    { angle: 45,  src: '/singers/female_45.png',  label: 'Female · 45°' },
    { angle: 90,  src: '/singers/female_90.png',  label: 'Female · 90° (Profile)' },
    { angle: 135, src: '/singers/female_135.png', label: 'Female · 135°' },
    { angle: 180, src: '/singers/female_180.png', label: 'Female · 180° (Back)' },
    { angle: 225, src: '/singers/male_225.png',   label: 'Male · 225° (Back-Left)' },
    { angle: 270, src: '/singers/male_270.png',   label: 'Male · 270° (Back)' },
    { angle: 315, src: '/singers/male_315.png',   label: 'Male · 315° (Front-Left)' },
    { angle: 350, src: '/singers/male_350.png',   label: 'Male · 350° (Facing Front)' },
  ];

  // Mouse Movement Interaction: Moving mouse across the section rotates the singer 360°
  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current) return;
    isMouseActive.current = true;
    lastMouseTime.current = Date.now();

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Direct mapping: moving mouse across section drives rotation from 0 to 1 (0° to 360°)
    const normX = Math.max(0, Math.min(1, x / rect.width));
    targetProgress.current = normX;

    // Subtle 3D perspective tilt
    const normY = Math.max(0, Math.min(1, y / rect.height));
    setTilt({
      rotY: (normX - 0.5) * 14,
      rotX: (normY - 0.5) * -10
    });
  };

  const handleMouseLeave = () => {
    isMouseActive.current = false;
    setTilt({ rotX: 0, rotY: 0 });
  };

  // Scroll rotation fallback when mouse is not actively hovered
  useEffect(() => {
    const handleScroll = () => {
      // If user recently moved mouse in section, let mouse action take priority
      if (isMouseActive.current && Date.now() - lastMouseTime.current < 800) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startTrigger = windowHeight * 0.75;
      const scrollRange = rect.height;
      const raw = (startTrigger - rect.top) / Math.max(scrollRange, 1);
      targetProgress.current = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Smooth RAF lerp interpolation loop for zero stutter
    let running = true;
    const loop = () => {
      if (!running) return;
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgress.current += diff * 0.16;
        setScrollProgress(currentProgress.current);
      } else if (currentProgress.current !== targetProgress.current) {
        currentProgress.current = targetProgress.current;
        setScrollProgress(targetProgress.current);
      }
      animFrameId.current = requestAnimationFrame(loop);
    };
    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Preload all frames for instant switching
  useEffect(() => {
    SINGER_FRAMES.forEach(frame => {
      const img = new Image();
      img.src = frame.src;
    });
  }, []);

  const currentAngle = scrollProgress * 360;

  // Active frame index selection
  const getActiveFrameIndex = (angle) => {
    if (angle < 22.5) return 0;       // 0° female front
    if (angle < 67.5) return 1;       // 45° female
    if (angle < 112.5) return 2;      // 90° female profile
    if (angle < 157.5) return 3;      // 135° female back-three-quarter
    if (angle < 202.5) return 4;      // 180° female full back
    if (angle < 247.5) return 5;      // 225° male back-three-quarter
    if (angle < 292.5) return 6;      // 270° male full back
    if (angle < 332.5) return 7;      // 315° male front-three-quarter
    if (angle < 356) return 8;        // 350° male front
    return 0;                         // 360° wraps to 0° female front
  };

  const activeIndex = getActiveFrameIndex(currentAngle);

  // TOOLS organized into Page 1 (2x2 grid) and Page 2 (2x2 grid)
  const TOOLS_PAGE_1 = [
    {
      id: "analytics",
      icon: BarChart3,
      badge: "UPGRADED",
      badgeColor: "#00E5FF",
      title: "Real-Time Analytics & Trends",
      desc: "Live stream stats, royalty velocities, playlist tracking, and demographic audience heatmaps to see what's actually driving growth.",
      cta: "EXPLORE ANALYTICS →",
      path: "/promo"
    },
    {
      id: "ad-launcher",
      icon: Megaphone,
      badge: "AUTOMATED",
      badgeColor: "#00E5FF",
      title: "Smart Promo & Ad Launcher",
      desc: "Run hyper-targeted campaigns across Instagram, TikTok, YouTube, and Spotify in under 2 minutes with automated conversion tracking.",
      cta: "LAUNCH CAMPAIGN →",
      path: "/ad-launcher"
    },
    {
      id: "presave",
      icon: Link2,
      badge: "FREE FOREVER",
      badgeColor: "#38BDF8",
      title: "Custom Pre-Save SmartLinks",
      desc: "Capture fans before release day. Automatically add tracks to listeners' Spotify and Apple Music libraries the second they drop.",
      cta: "GENERATE LINK →",
      path: "/promo"
    },
    {
      id: "playlist",
      icon: Music2,
      badge: "DIRECT ACCESS",
      badgeColor: "#00F2FE",
      title: "Editorial Playlist Pitching",
      desc: "Pitch directly to TuneWave's in-house curators and secure priority review for verified Spotify editorial playlists.",
      cta: "SUBMIT TRACK →",
      path: "/playlists"
    }
  ];

  const TOOLS_PAGE_2 = [
    {
      id: "mastering",
      icon: Wand2,
      badge: "AI ENGINE",
      badgeColor: "#EC4899",
      title: "Studio-Grade AI Mastering",
      desc: "Hear your mix polished to commercial loudness and clarity in 30 seconds. Preview for free before approving your release masters.",
      cta: "MASTER A TRACK →",
      path: "/distribute"
    },
    {
      id: "app",
      icon: Smartphone,
      badge: "IOS & ANDROID",
      badgeColor: "#00E5FF",
      title: "The TuneWave Mobile App",
      desc: "Manage releases, monitor real-time streaming notifications, and withdraw royalties straight to your bank account on the go.",
      cta: "DOWNLOAD APP →",
      path: "/app"
    },
    {
      id: "vevo",
      icon: Tv,
      badge: "OFFICIAL VEVO",
      badgeColor: "#E11D48",
      title: "Official Vevo Video Channels",
      desc: "Distribute official 4K music videos to Vevo on YouTube, access premium CPM ad rates, and monetize every viewer worldwide.",
      cta: "EXPLORE VEVO →",
      path: "/vevo"
    },
    {
      id: "sync",
      icon: Film,
      badge: "GLOBAL SYNC",
      badgeColor: "#8B5CF6",
      title: "Sync & TV/Film Placement",
      desc: "Pitch tracks for placements in Netflix originals, HBO series, EA Sports titles, and prime global brand television campaigns.",
      cta: "EXPLORE SYNC →",
      path: "/sync"
    }
  ];

  const renderCard = (tool) => {
    const Icon = tool.icon;
    return (
      <div
        key={tool.id}
        className="glass-panel grow-tool-card card-shimmer-sweep"
        style={{
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          minHeight: 200,
          borderRadius: 16,
          background: 'var(--tw-bg-card)',
          border: '1px solid var(--tw-line)',
          transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
        }}
        onClick={() => onNavigate(tool.path)}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(0, 126, 167, 0.1)',
              border: '1px solid var(--tw-line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--tw-cyan)',
              transition: 'transform 0.3s ease'
            }}>
              <Icon size={20} />
            </div>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: 9999,
              background: `${tool.badgeColor}18`,
              color: tool.badgeColor,
              border: `1px solid ${tool.badgeColor}35`,
              letterSpacing: '0.08em'
            }}>
              {tool.badge}
            </span>
          </div>

          <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: 8, color: 'var(--tw-text-white)' }}>
            {tool.title}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--tw-text-dim)', lineHeight: 1.5, marginBottom: 14 }}>
            {tool.desc}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--tw-cyan)'
        }}>
          <span className="grow-tool-arrow">{tool.cta}</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '90px 0',
        position: 'relative',
        background: 'var(--tw-bg-dark)',
        borderBottom: '1px solid var(--tw-line)',
        transition: 'background 0.25s ease',
        overflow: 'hidden'
      }}
    >
      {/* Full 100% Laptop Size Container */}
      <div className="container" style={{ maxWidth: '100%', width: '100%', padding: '0 clamp(20px, 3.5vw, 60px)' }}>
        
        {/* Section Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div className="pulse-dot" style={{ backgroundColor: 'var(--tw-cyan)', boxShadow: '0 0 10px var(--tw-cyan)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--tw-cyan)' }}>
            {t.num} · {t.kicker.toUpperCase()}
          </span>
        </div>

        <div className="reveal-up" style={{ marginBottom: 36 }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: 'var(--tw-text-white)'
          }}>
            {t.headline} <br />
            <span className="text-cyan-gradient">{t.headlineAccent}</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--tw-text-dim)',
            maxWidth: '780px',
            marginTop: 14,
            lineHeight: 1.6
          }}>
            {t.lede}
          </p>
        </div>

        {/* 2-Column Layout: 2x2 Grid View + Interactive 3D Singer on Right */}
        <div className="grow-section-layout" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(360px, 0.9fr)',
          gap: 36,
          alignItems: 'stretch',
          position: 'relative'
        }}>
          
          {/* LEFT SIDE: 2x2 Grid with Below Scroll Option */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            
            {/* Overflow viewport container for 2x2 slides */}
            <div style={{ overflow: 'hidden', width: '100%', borderRadius: 18 }}>
              <div 
                style={{
                  display: 'flex',
                  width: '200%',
                  transform: `translateX(-${activePage * 50}%)`,
                  transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform'
                }}
              >
                {/* Slide 1: 2x2 Grid (Tools 1–4) */}
                <div style={{ 
                  width: '50%', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 16, 
                  paddingRight: 8,
                  boxSizing: 'border-box'
                }}>
                  {TOOLS_PAGE_1.map((tool) => renderCard(tool))}
                </div>

                {/* Slide 2: 2x2 Grid (Tools 5–8) */}
                <div style={{ 
                  width: '50%', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 16, 
                  paddingLeft: 8,
                  boxSizing: 'border-box'
                }}>
                  {TOOLS_PAGE_2.map((tool) => renderCard(tool))}
                </div>
              </div>
            </div>

            {/* BELOW SCROLL OPTION: Interactive Navigation & Scroll Track */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              padding: '12px 18px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--tw-line)',
              borderRadius: 14,
              marginTop: 4
            }}>
              {/* Left: View Selection Tabs */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setActivePage(0)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activePage === 0 ? 'var(--tw-cyan)' : 'rgba(255, 255, 255, 0.05)',
                    color: activePage === 0 ? '#080B11' : 'var(--tw-text-white)',
                    border: activePage === 0 ? '1px solid var(--tw-cyan)' : '1px solid var(--tw-line)'
                  }}
                >
                  01 · Audience & Promotion (4 Tools)
                </button>
                <button
                  onClick={() => setActivePage(1)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activePage === 1 ? 'var(--tw-cyan)' : 'rgba(255, 255, 255, 0.05)',
                    color: activePage === 1 ? '#080B11' : 'var(--tw-text-white)',
                    border: activePage === 1 ? '1px solid var(--tw-cyan)' : '1px solid var(--tw-line)'
                  }}
                >
                  02 · Studio, Vevo & Sync (4 Tools)
                </button>
              </div>

              {/* Center: Visual Progress Scroll Track */}
              <div 
                style={{
                  flex: 1,
                  minWidth: 100,
                  maxWidth: 220,
                  height: 6,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 9999,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setActivePage(activePage === 0 ? 1 : 0)}
                title="Click to switch tool views"
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: activePage === 0 ? '0%' : '50%',
                    width: '50%',
                    background: 'linear-gradient(90deg, var(--tw-cyan), var(--tw-cyan-bright))',
                    borderRadius: 9999,
                    transition: 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>

              {/* Right: Next / Prev Arrows */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-text-muted)', marginRight: 4 }}>
                  {activePage + 1} / 2
                </span>
                <button
                  onClick={() => setActivePage(0)}
                  disabled={activePage === 0}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: '1px solid var(--tw-line)',
                    background: activePage === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.08)',
                    color: activePage === 0 ? 'var(--tw-text-muted)' : 'var(--tw-text-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: activePage === 0 ? 'not-allowed' : 'pointer'
                  }}
                  title="Previous tools"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActivePage(1)}
                  disabled={activePage === 1}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: '1px solid var(--tw-line)',
                    background: activePage === 1 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.08)',
                    color: activePage === 1 ? 'var(--tw-text-muted)' : 'var(--tw-text-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: activePage === 1 ? 'not-allowed' : 'pointer'
                  }}
                  title="Next tools"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: 3D Singer Character Driven Directly By Mouse Movement */}
          <div 
            ref={singerCardRef}
            style={{
              position: 'relative',
              height: '100%',
              minHeight: 480,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              perspective: 1200,
              overflow: 'visible'
            }}
          >
            {/* Ambient Cyan Stage Glow */}
            <div style={{
              position: 'absolute',
              width: '130%',
              height: '110%',
              background: 'radial-gradient(ellipse at 50% 60%, rgba(0, 229, 255, 0.22) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 75%)',
              pointerEvents: 'none',
              filter: 'blur(45px)',
              zIndex: 0
            }} />

            {/* Singer Container: Direct Mouse-Controlled Rotation + 3D Tilt */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 460,
              height: '100%',
              maxHeight: 520,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              transform: `perspective(1000px) rotateY(${tilt.rotY}deg) rotateX(${tilt.rotX}deg)`,
              transition: 'transform 0.12s ease-out',
              zIndex: 2
            }}>
              {/* Stack of all 9 frames from all singers.png */}
              {SINGER_FRAMES.map((frame, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <img
                    key={frame.src}
                    src={frame.src}
                    alt={frame.label}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      height: '100%',
                      maxHeight: 500,
                      width: 'auto',
                      objectFit: 'contain',
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? 'scale(1)' : 'scale(0.98)',
                      transition: 'opacity 0.12s ease-out, transform 0.12s ease-out',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 24px rgba(0, 229, 255, 0.28))'
                    }}
                  />
                );
              })}

              {/* Stage Lighting Pedestal Floor Reflection */}
              <div style={{
                position: 'absolute',
                bottom: -4,
                width: 260,
                height: 28,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.6) 0%, rgba(0, 126, 167, 0.2) 50%, transparent 75%)',
                filter: 'blur(6px)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        </div>

        {/* Ready to Release CTA Strip */}
        <div className="reveal-up card-shimmer-sweep" style={{
          background: 'linear-gradient(135deg, rgba(0, 126, 167, 0.1) 0%, rgba(109, 40, 217, 0.08) 100%)',
          border: '1px solid var(--tw-cyan)',
          borderRadius: 20,
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          marginTop: 28,
          position: 'relative',
          zIndex: 3
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              ACCELERATE YOUR SOUND
            </div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 800, color: 'var(--tw-text-white)' }}>
              Ready to release? Start free in <span style={{ color: 'var(--tw-lime)' }}>60 seconds.</span>
            </h3>
          </div>

          <button
            onClick={() => onNavigate('/signup')}
            className="btn-cyan"
            style={{ padding: '14px 32px', fontSize: '0.96rem' }}
          >
            <span>Sign Up For Free</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .grow-section-layout {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .grow-section-layout > div:first-child > div:first-child > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
