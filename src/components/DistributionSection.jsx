import React, { useState, useEffect, useRef } from 'react';
import { PLATFORMS, TRANSLATIONS } from '../data/content';
import { 
  CheckCircle2, 
  Globe2, 
  Radio, 
  Zap, 
  ArrowRight,
  Share2,
  Disc3,
  SlidersHorizontal,
  Coins,
  Headphones,
  TrendingUp,
  ShieldCheck,
  Split,
  Play,
  Pause,
  Music,
  ExternalLink,
  Move
} from 'lucide-react';

export default function DistributionSection({ onNavigate, lang = 'en' }) {
  const t = TRANSLATIONS[lang]?.act1 || TRANSLATIONS.en.act1;
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeBadge, setActiveBadge] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubcardsExpanded, setIsSubcardsExpanded] = useState(false);
  const hasTriggeredExpansionRef = useRef(false);
  const showcaseRef = useRef(null);

  // Theme detection for marquee logo wordmarks
  const [isLightMode, setIsLightMode] = useState(() => {
    return typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.getAttribute('data-theme') === 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Track scroll position for floating badges & trigger entrance expansion when fully visible
  useEffect(() => {
    let ticking = false;

    const triggerExpansion = () => {
      if (hasTriggeredExpansionRef.current) return;
      hasTriggeredExpansionRef.current = true;
      setIsSubcardsExpanded(true);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (showcaseRef.current) {
            const rect = showcaseRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            
            // Starts moving as the card enters the lower viewport
            // Full expansion when reaching the upper center
            const start = vh * 0.95;
            const end = vh * 0.20;
            const raw = (start - rect.top) / (start - end);
            const clamped = Math.max(0, Math.min(1.0, raw));
            setScrollProgress(clamped);

            // Trigger entrance expansion smoothly when section enters viewport
            if (!hasTriggeredExpansionRef.current) {
              if (rect.top < vh * 0.85 && rect.bottom > 60) {
                triggerExpansion();
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // IntersectionObserver to detect when section enters view
    let observer = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && showcaseRef.current) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (hasTriggeredExpansionRef.current) return;
          const rect = entry.boundingClientRect;
          const vh = window.innerHeight;

          if (entry.isIntersecting || (rect.top < vh * 0.85 && rect.bottom > 60)) {
            triggerExpansion();
            observer.disconnect();
          }
        });
      }, {
        threshold: [0.1, 0.25, 0.5, 0.75, 1.0]
      });
      observer.observe(showcaseRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const floatingBadges = [
    { id: 'social', label: 'Social DSPs', icon: Share2, top: '-20px', left: '22px', vx: -16, vy: -20, rot: -4, anim: 'dist-float-1', info: 'Auto-delivery to TikTok, Instagram & YouTube' },
    { id: 'release', label: '48h Release', icon: Disc3, top: '-24px', left: '38%', vx: 0, vy: -22, rot: 2, anim: 'dist-float-2', info: 'Expedited DSP ingestion within 48 hours' },
    { id: 'smartlinks', label: 'SmartLinks', icon: SlidersHorizontal, top: '-20px', right: '22px', vx: 16, vy: -20, rot: 4, anim: 'dist-float-3', info: 'Free pre-save pages & custom landing URLs' },
    { id: 'stores', label: '150+ Stores', icon: Globe2, top: '46%', left: '-14px', vx: -18, vy: -3, rot: -4, anim: 'dist-float-2', info: 'Spotify, Apple Music, Beatport, Amazon & 150+ stores' },
    { id: 'royalties', label: '100% Royalties', icon: Coins, bottom: '-20px', left: '22px', vx: -16, vy: 20, rot: -4, anim: 'dist-float-1', info: 'Zero royalty cuts, keep every penny you earn' },
    { id: 'audio', label: 'Lossless Audio', icon: Headphones, bottom: '-20px', left: '28%', vx: -8, vy: 20, rot: -2, anim: 'dist-float-3', info: '24-bit 192kHz master audio & Dolby Atmos support' },
    { id: 'counter', label: 'Stream Counter', icon: TrendingUp, bottom: '-20px', right: '28%', vx: 8, vy: 20, rot: 2, anim: 'dist-float-2', info: 'Live daily stream counters & real-time trend charts' },
    { id: 'contentId', label: 'Content ID', icon: ShieldCheck, top: '48%', right: '-14px', vx: 18, vy: -3, rot: 4, anim: 'dist-float-1', info: 'Automatic digital fingerprinting on YouTube & Meta' },
    { id: 'splitpay', label: 'Split Pay', icon: Split, bottom: '-20px', right: '22px', vx: 16, vy: 20, rot: 4, anim: 'dist-float-3', info: 'Automatic revenue splitting for bandmates & producers' }
  ];

  return (
    <section className="dist-section-wrapper" style={{
      padding: 'clamp(48px, 6vw, 100px) 0',
      position: 'relative',
      background: 'var(--tw-bg-surface)',
      borderTop: '1px solid var(--tw-line)',
      borderBottom: '1px solid var(--tw-line)',
      transition: 'background 0.25s ease'
    }}>
      <div className="container dist-container-outer" style={{ maxWidth: '100%', width: '100%', padding: '0 clamp(24px, 4vw, 64px)', boxSizing: 'border-box' }}>

        {/* ============================================================
            REFERRAL SHOWCASE DESIGN: 3-PANEL CARD WITH 9 FLOATING BADGES
            ============================================================ */}
        <div className="dist-showcase-container reveal-up" ref={showcaseRef}>
          
          {/* Central 3-Panel Showcase Card */}
          <div className="dist-showcase-card card-shimmer-sweep">

            {/* Desktop Floating Badges: Move outside dynamically as user scrolls */}
            {floatingBadges.map((b) => {
              const Icon = b.icon;
              const isSelected = activeBadge === b.id;
              
              // Calculate outward moving coordinates tied to scroll
              const transX = b.vx * scrollProgress;
              const transY = b.vy * scrollProgress;
              const rot = b.rot * scrollProgress;
              const scale = 1 + (0.05 * scrollProgress);

              return (
                <div
                  key={b.id}
                  className={`dist-floating-badge dist-desktop-badge ${scrollProgress > 0.35 ? 'expanded' : ''}`}
                  style={{
                    top: b.top,
                    bottom: b.bottom,
                    left: b.left,
                    right: b.right,
                    transform: `translate3d(${transX}px, ${transY}px, 0) rotate(${rot}deg) scale(${scale})`,
                    borderColor: isSelected ? 'var(--tw-cyan)' : undefined,
                    boxShadow: isSelected ? '0 0 25px var(--tw-cyan-glow)' : undefined
                  }}
                  onClick={() => setActiveBadge(activeBadge === b.id ? null : b.id)}
                  title={b.info}
                >
                  <div className={`dist-badge-inner-float ${b.anim}`}>
                    <div className="dist-badge-icon-wrap">
                      <Icon size={24} strokeWidth={2.2} />
                    </div>
                    <span className="dist-badge-label">{b.label}</span>
                  </div>
                </div>
              );
            })}

            {/* Left Column: Music Artist Portrait */}
            <div className={`dist-showcase-left-panel dist-expand-subcard ${isSubcardsExpanded ? 'is-expanded' : ''}`}>
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80" 
                alt="Featured Tunewave Music Creator" 
                loading="lazy"
              />
              <div className="dist-strip-overlay-tag">
                <span>Verified Artist · 1.8M Streams</span>
              </div>
            </div>

            {/* Center Column: Real Tunewave Editorial Content */}
            <div className="dist-showcase-center-panel">
              
              {/* Kicker Badge */}
              <div className="dist-showcase-tag">
                <div className="pulse-dot" />
                <span>{t.num} · {t.kicker.toUpperCase()}</span>
              </div>

              {/* Headline */}
              <h2 className="dist-showcase-title">
                {t.headline} <br />
                <span className="text-cyan-gradient">{t.headlineAccent}</span>
              </h2>

              {/* Subkicker */}
              <div className="dist-showcase-subkicker">
                ALL 150+ STORES · FAST 48H DELIVERY · 100% ROYALTIES
              </div>

              {/* Lede Paragraph */}
              <p className="dist-showcase-lede">
                {t.lede}
              </p>

              {/* Action Buttons */}
              <div className="dist-showcase-actions" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan dist-showcase-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <span>{t.ctaPrimary}</span>
                </button>
                <button
                  onClick={() => onNavigate('/distribute')}
                  className="btn-glass dist-showcase-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <span>{t.ctaSecondary}</span>
                </button>
              </div>

              {/* Live Audio Distribution Preview Bar */}
              <div className="dist-player-preview">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    background: 'var(--tw-cyan)',
                    color: '#080B11',
                    border: 'none',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  title={isPlaying ? "Pause track preview" : "Play track preview"}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 2 }} />}
                </button>

                <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-white)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    Neon Horizons (Master Edit)
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--tw-text-muted)' }}>
                    {isPlaying ? 'Delivering Lossless 24-bit Stream' : 'Ready to Release Worldwide'}
                  </div>
                </div>

                <div className="dist-equalizer">
                  <div className="dist-eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                  <div className="dist-eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                  <div className="dist-eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                  <div className="dist-eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                  <div className="dist-eq-bar" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                </div>
              </div>

              {/* Active Badge Explainer Pill (if clicked) */}
              {activeBadge && (
                <div style={{
                  marginTop: 14,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--tw-cyan)',
                  background: 'rgba(0, 229, 255, 0.08)',
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: '1px solid var(--tw-cyan-glow)'
                }}>
                  {floatingBadges.find(b => b.id === activeBadge)?.info}
                </div>
              )}

            </div>

            {/* Right Column: Two Vertical Photo Strips (Studio + Stage) */}
            <div className="dist-showcase-right-panels">
              <div className={`dist-photo-strip dist-expand-subcard dist-strip-1 ${isSubcardsExpanded ? 'is-expanded' : ''}`}>
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop&q=80" 
                  alt="24-bit Lossless Studio Mastering" 
                  loading="lazy"
                />
                <div className="dist-strip-overlay-tag">
                  <span>Studio Master</span>
                </div>
              </div>

              <div className={`dist-photo-strip dist-expand-subcard dist-strip-2 ${isSubcardsExpanded ? 'is-expanded' : ''}`}>
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80" 
                  alt="Global Concert & Streaming Audience" 
                  loading="lazy"
                />
                <div className="dist-strip-overlay-tag">
                  <span>Global Reach</span>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Badges Grid (Shown on small screens where absolute badges wrap) */}
          <div className="dist-badges-mobile-dock">
            {floatingBadges.map((b) => {
              const Icon = b.icon;
              return (
                <div 
                  key={`mob-${b.id}`} 
                  className="dist-floating-badge"
                  onClick={() => setActiveBadge(activeBadge === b.id ? null : b.id)}
                >
                  <div className="dist-badge-icon-wrap">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <span className="dist-badge-label">{b.label}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Key Stats Row */}
        <div className="reveal-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 64
        }}>
          <div className="glass-panel card-shimmer-sweep" style={{ padding: 32 }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--tw-cyan)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
              ∞
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: 12, marginBottom: 8, color: 'var(--tw-text-white)' }}>
              Unlimited Releases
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
              Upload as many singles, EPs, and albums as you like without per-release fees or hidden deductions.
            </p>
          </div>

          <div className="glass-panel card-shimmer-sweep" style={{ padding: 32 }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--tw-lime)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
              150+
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: 12, marginBottom: 8, color: 'var(--tw-text-white)' }}>
              DSP Stores & Networks
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
              Global reach covering Western majors, TikTok viral sounds, Asian platforms (Tencent, NetEase), and Boomplay.
            </p>
          </div>

          <div className="glass-panel card-shimmer-sweep" style={{ padding: 32 }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--tw-purple)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
              100%
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: 12, marginBottom: 8, color: 'var(--tw-text-white)' }}>
              Royalty Retained
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
              Keep every cent your music makes. No middleman cuts, no surprise renewal penalties, zero asterisks.
            </p>
          </div>
        </div>

        {/* Stores Continuous Right-to-Left Logo Marquee (A3Labels Style) */}
        <div className="a3-logo-marquee-section reveal-up">
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: 'var(--tw-text-muted)',
            textTransform: 'uppercase',
            marginBottom: 24,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}>
            <span className="pulse-dot" />
            <span>WHERE YOUR MUSIC LANDS IN 48 HOURS</span>
            <span className="pulse-dot" />
          </div>

          <div className="a3-logo-marquee-mask">
            <div className="a3-logo-track">
              {[
                { name: "TikTok", icon: "/logos of all apps/TikTok logo.png" },
                { name: "Instagram", icon: "/logos of all apps/instagram logo.jpg" },
                { name: "Deezer", icon: "/logos of all apps/deezer logo.png" },
                { name: "Amazon Music", icon: "/logos of all apps/amazon music logo.jpg" },
                { name: "JioSaavn", icon: "/logos of all apps/jio saavn logo.jpg" },
                { name: "Apple Music", icon: "/logos of all apps/Apple Music logo.jpg" },
                { name: "YouTube Music", icon: "/logos of all apps/YouTube Music logo.png" },
                { name: "Spotify", icon: "/logos of all apps/Spotify logo.png" },
                { name: "TikTok", icon: "/logos of all apps/TikTok logo.png" },
                { name: "Instagram", icon: "/logos of all apps/instagram logo.jpg" },
                { name: "Deezer", icon: "/logos of all apps/deezer logo.png" },
                { name: "Amazon Music", icon: "/logos of all apps/amazon music logo.jpg" },
                { name: "JioSaavn", icon: "/logos of all apps/jio saavn logo.jpg" },
                { name: "Apple Music", icon: "/logos of all apps/Apple Music logo.jpg" },
                { name: "YouTube Music", icon: "/logos of all apps/YouTube Music logo.png" },
                { name: "Spotify", icon: "/logos of all apps/Spotify logo.png" },
                { name: "TikTok", icon: "/logos of all apps/TikTok logo.png" },
                { name: "Instagram", icon: "/logos of all apps/instagram logo.jpg" },
                { name: "Deezer", icon: "/logos of all apps/deezer logo.png" },
                { name: "Amazon Music", icon: "/logos of all apps/amazon music logo.jpg" },
                { name: "JioSaavn", icon: "/logos of all apps/jio saavn logo.jpg" },
                { name: "Apple Music", icon: "/logos of all apps/Apple Music logo.jpg" },
                { name: "YouTube Music", icon: "/logos of all apps/YouTube Music logo.png" },
                { name: "Spotify", icon: "/logos of all apps/Spotify logo.png" }
              ].map((logo, i) => (
                <div 
                  key={`a3logo-${i}`} 
                  className="a3-logo-item"
                  title={`Delivered to ${logo.name}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', textDecoration: 'none' }}
                >
                  <img 
                    src={logo.icon} 
                    alt={logo.name} 
                    style={{ 
                      width: 28, 
                      height: 28, 
                      borderRadius: 7, 
                      objectFit: 'contain',
                      display: 'block',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }} 
                    loading="lazy" 
                  />
                  <span style={{ 
                    fontWeight: 800, 
                    fontSize: '0.92rem', 
                    color: isLightMode ? '#0F172A' : '#FFFFFF', 
                    letterSpacing: '-0.01em', 
                    whiteSpace: 'nowrap' 
                  }}>
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
