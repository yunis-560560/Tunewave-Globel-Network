import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../data/content';
import { BarChart3, Megaphone, Link2, Music2, Wand2, Smartphone, ArrowRight } from 'lucide-react';

export default function GrowSection({ onNavigate, lang = 'en' }) {
  const t = TRANSLATIONS[lang]?.act3 || TRANSLATIONS.en.act3;
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animFrameId = useRef(null);

  // 9 isolated 3D singer frames (transparent PNGs, no checkerboard)
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

  // Mouse-scroll controlled rotation with smooth RAF lerp interpolation:
  // Prevents jumping, flickering, or snapping on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start rotation when section header enters view
      const startTrigger = windowHeight * 0.6;
      // Complete 360° and reach bottom CTA outline as cards scroll
      const scrollRange = rect.height - windowHeight * 0.45;

      const raw = (startTrigger - rect.top) / Math.max(scrollRange, 1);
      targetProgress.current = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Continuous smooth interpolation loop (lerp)
    let running = true;
    const loop = () => {
      if (!running) return;
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0008) {
        currentProgress.current += diff * 0.14;
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

  // Preload all 9 frames to guarantee zero lag or flicker
  useEffect(() => {
    SINGER_FRAMES.forEach(frame => {
      const img = new Image();
      img.src = frame.src;
    });
  }, []);

  const currentAngle = scrollProgress * 360;

  // Determine active frame index based on current scroll angle
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
    return 0;                         // 360° returns to 0° female front
  };

  const activeIndex = getActiveFrameIndex(currentAngle);
  const activeFrame = SINGER_FRAMES[activeIndex];
  
  // Smooth scroll-based downward glide toward the CTA outline
  // Moves the singer downward as you scroll so her bottom meets the ACCELERATE YOUR SOUND border
  const singerTranslateY = (scrollProgress) * 36;

  const TOOLS = [
    {
      id: "analytics",
      icon: BarChart3,
      badge: "UPGRADED",
      badgeColor: "#00E5FF",
      title: "Real-Time Analytics & Trends",
      desc: "Live stream stats, royalty velocities, playlist tracking, and demographic audience heatmaps to see what's actually driving growth.",
      cta: "EXPLORE ANALYTICS →"
    },
    {
      id: "ad-launcher",
      icon: Megaphone,
      badge: "AUTOMATED",
      badgeColor: "#00E5FF",
      title: "Smart Promo & Ad Launcher",
      desc: "Run hyper-targeted campaigns across Instagram, TikTok, YouTube, and Spotify in under 2 minutes with automated conversion tracking.",
      cta: "LAUNCH CAMPAIGN →"
    },
    {
      id: "presave",
      icon: Link2,
      badge: "FREE FOREVER",
      badgeColor: "#38BDF8",
      title: "Custom Pre-Save SmartLinks",
      desc: "Capture fans before release day. Automatically add tracks to listeners' Spotify and Apple Music libraries the second they drop.",
      cta: "GENERATE LINK →"
    },
    {
      id: "playlist",
      icon: Music2,
      badge: "DIRECT ACCESS",
      badgeColor: "#00F2FE",
      title: "Editorial Playlist Pitching",
      desc: "Pitch directly to TuneWave's in-house curators and secure priority review for verified Spotify editorial playlists.",
      cta: "SUBMIT TRACK →"
    },
    {
      id: "mastering",
      icon: Wand2,
      badge: "AI ENGINE",
      badgeColor: "#EC4899",
      title: "Studio-Grade AI Mastering",
      desc: "Hear your mix polished to commercial loudness and clarity in 30 seconds. Preview for free before approving your release masters.",
      cta: "MASTER A TRACK →"
    },
    {
      id: "app",
      icon: Smartphone,
      badge: "IOS & ANDROID",
      badgeColor: "#00E5FF",
      title: "The TuneWave Mobile App",
      desc: "Manage releases, monitor real-time streaming notifications, and withdraw royalties straight to your bank account on the go.",
      cta: "DOWNLOAD APP →"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      style={{
        padding: '110px 0',
        position: 'relative',
        background: 'var(--tw-bg-dark)',
        borderBottom: '1px solid var(--tw-line)',
        transition: 'background 0.25s ease',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Kicker */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div className="pulse-dot" style={{ backgroundColor: 'var(--tw-cyan)', boxShadow: '0 0 10px var(--tw-cyan)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--tw-cyan)' }}>
            {t.num} · {t.kicker.toUpperCase()}
          </span>
        </div>

        {/* Section Headline */}
        <div className="reveal-up" style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--tw-text-white)'
          }}>
            {t.headline} <br />
            <span className="text-cyan-gradient">{t.headlineAccent}</span>
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--tw-text-dim)',
            maxWidth: '740px',
            marginTop: 18,
            lineHeight: 1.6
          }}>
            {t.lede}
          </p>
        </div>

        {/* Responsive 2-Column Section: 3x2 Grid Cards on Left + Pinned 360° 3D Singer on Right */}
        <div className="grow-section-layout" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.45fr) minmax(360px, 0.95fr)',
          gap: 48,
          alignItems: 'stretch',
          marginBottom: 0,
          position: 'relative'
        }}>
          
          {/* LEFT SIDE: 3-row × 2-column Grid of 6 Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20
          }}>
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="glass-panel grow-tool-card card-shimmer-sweep"
                  style={{
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    minHeight: 250
                  }}
                  onClick={() => {
                    if (tool.id === 'ad-launcher') {
                      onNavigate('/ad-launcher');
                    } else if (tool.id === 'playlist') {
                      onNavigate('/playlists');
                    } else if (tool.id === 'app') {
                      onNavigate('/app');
                    } else {
                      onNavigate('/promo');
                    }
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(0, 126, 167, 0.1)',
                        border: '1px solid var(--tw-line)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--tw-cyan)',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}>
                        <Icon size={22} />
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

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>
                      {tool.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', lineHeight: 1.55, marginBottom: 20 }}>
                      {tool.desc}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--tw-cyan)'
                  }}>
                    <span className="grow-tool-arrow">{tool.cta}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Large Isolated 3D Singer Character extending vertically to touch the CTA section outline */}
          <div style={{
            position: 'sticky',
            top: '75px',
            height: 'calc(100vh - 100px)',
            maxHeight: '840px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            perspective: 1200,
            overflow: 'visible'
          }}>
            {/* Ambient Stage Glow Backdrop */}
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '100%',
              background: 'radial-gradient(ellipse at 50% 60%, rgba(0, 229, 255, 0.18) 0%, rgba(109, 40, 217, 0.08) 50%, transparent 75%)',
              pointerEvents: 'none',
              filter: 'blur(40px)',
              zIndex: 0
            }} />


            {/* Singer Container: Extended vertically with smooth scroll downward movement */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: 480,
              height: '92%',
              maxHeight: 740,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              transform: `translateY(${singerTranslateY}px)`,
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 2
            }}>
              {/* Stack of all 9 frames crossfaded by proximity to scroll angle */}
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
                      maxHeight: 720,
                      width: 'auto',
                      objectFit: 'contain',
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? 'scale(1)' : 'scale(0.98)',
                      transition: 'opacity 0.14s ease-out, transform 0.14s ease-out',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 24px rgba(0, 229, 255, 0.28))'
                    }}
                  />
                );
              })}

              {/* Stage Lighting Pedestal Floor Reflection directly meeting the lower section */}
              <div style={{
                position: 'absolute',
                bottom: -6,
                width: 280,
                height: 32,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.55) 0%, rgba(0, 126, 167, 0.2) 50%, transparent 75%)',
                filter: 'blur(6px)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        </div>

        {/* Ready to Release CTA Strip (Visually connected at top outline with the singer) */}
        <div className="reveal-up card-shimmer-sweep" style={{
          background: 'linear-gradient(135deg, rgba(0, 126, 167, 0.1) 0%, rgba(109, 40, 217, 0.08) 100%)',
          border: '1px solid var(--tw-cyan)',
          borderRadius: 24,
          padding: '40px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          marginTop: 24,
          position: 'relative',
          zIndex: 3
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              ACCELERATE YOUR SOUND
            </div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--tw-text-white)' }}>
              Ready to release? Start free in <span style={{ color: 'var(--tw-lime)' }}>60 seconds.</span>
            </h3>
          </div>

          <button
            onClick={() => onNavigate('/signup')}
            className="btn-cyan"
            style={{ padding: '16px 36px', fontSize: '1rem' }}
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
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .grow-section-layout > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
