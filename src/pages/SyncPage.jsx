import React, { useState } from 'react';
import { 
  Clapperboard, Tv, Film, Play, Sparkles, ArrowRight, CheckCircle2, 
  ChevronDown, ExternalLink, ShieldCheck, DollarSign, Radio, Music, 
  Award, Globe2, Layers, Headphones 
} from 'lucide-react';

export default function SyncPage({ onNavigate, theme }) {
  const isLight = theme === 'light' || (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light');
  const [openFaq, setOpenFaq] = useState(0);
  const [activePlacement, setActivePlacement] = useState(0);

  const SYNC_FAQS = [
    {
      q: "What is sync licensing?",
      a: "Sync (synchronization) licensing refers to granting permission to synchronize your musical composition and sound recording with moving visual media, such as movies, TV series, video games, commercials, documentaries, and trailers. When a brand or production studio uses your track, they pay you an upfront sync fee, plus ongoing broadcast performance royalties."
    },
    {
      q: "Do I keep 100% of my sync licensing fee?",
      a: "Yes! Unlike traditional sync agencies that take 20% to 50% cuts of your upfront sync fees, TuneWave Pro allows artists to keep 100% of their upfront sync licensing fee on every placement negotiated through our direct sync briefs. You maintain full ownership and control of your master and publishing rights."
    },
    {
      q: "What kind of music gets chosen for sync licensing?",
      a: "Music supervisors search for songs across every imaginable genre — from hard-hitting trap and hip-hop to cinematic indie-folk, atmospheric synth-pop, lo-fi beats, and heavy rock. The most important criteria are emotional resonance, high-quality production, clear vocal delivery, and the availability of instrumental/stems."
    },
    {
      q: "What's the difference between master rights and publishing rights in sync?",
      a: "Every sync placement requires clearance for two distinct rights: the Master Right (the actual audio sound recording) and the Publishing Right (the underlying lyrics and composition). TuneWave makes your music 'one-stop' or easy to clear by representing both or having your clearance metadata pre-verified, which music supervisors love because it removes legal friction."
    },
    {
      q: "Do I need instrumental and clean versions of my tracks?",
      a: "Having instrumental versions, clean (explicit-free) edits, and vocal stems significantly boosts your chances of securing a sync placement. Editors frequently need instrumental beds to place beneath dialogue, or clean edits for daytime television and global PG-13 commercials."
    }
  ];

  const RECENT_PLACEMENTS = [
    {
      tag: "Peacock / Netflix",
      title: "Grouptherapy. × Bel-Air",
      desc: "Grouptherapy. — high-energy placement on the hit Bel-Air drama series.",
      brand: "Bel-Air",
      color: "#A78BFA",
      bgImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=mYZN3gqgG84"
    },
    {
      tag: "Global Campaign",
      title: "Rak Su × Hugo Boss",
      desc: "Rak Su — international sync placement on Hugo Boss digital and TV campaign.",
      brand: "Hugo Boss",
      color: "var(--tw-cyan)",
      bgImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=BmNx2gxpsAM"
    },
    {
      tag: "Commercial Film",
      title: "The Boze × Royal Enfield",
      desc: "The Boze — featured soundtrack on The Art Of Motorcycling Season 3.",
      brand: "Royal Enfield",
      color: "var(--tw-cyan)",
      bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=jIAp5MleHS8"
    },
    {
      tag: "Fitness & Lifestyle",
      title: "Trillary Banks × Gymshark",
      desc: "Trillary Banks — high-impact placement in a global Gymshark sportswear launch.",
      brand: "Gymshark",
      color: "#F43F5E",
      bgImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://vimeo.com/79988821"
    }
  ];

  const BRANDS = [
    { name: "Netflix", tag: "Streaming" },
    { name: "HBO Max", tag: "Original Series" },
    { name: "Amazon Prime", tag: "Global Studios" },
    { name: "BBC", tag: "Broadcast TV" },
    { name: "EA Sports", tag: "Video Games" },
    { name: "Gymshark", tag: "Commercials" },
    { name: "Hugo Boss", tag: "Fashion Campaign" },
    { name: "ITV", tag: "UK Network" },
    { name: "ABC", tag: "Primetime" },
    { name: "Canon", tag: "Brand Media" },
    { name: "Bravo", tag: "Entertainment" },
    { name: "Hulu", tag: "Originals" }
  ];

  const TIMELINE_STEPS = [
    {
      num: "01",
      title: "Join TuneWave Pro",
      desc: "Sign up to TuneWave Pro to unlock our exclusive Sync Dashboard, plus publishing administration, YouTube Content ID, and advanced pitching tools.",
      badge: "STEP 1: ACCESS"
    },
    {
      num: "02",
      title: "Browse our syncs",
      desc: "Browse our live active opportunities and find a sync brief that suits your music. Pitch for TV series, feature films, high-budget ads, console games and beyond.",
      badge: "STEP 2: CURATED BRIEFS"
    },
    {
      num: "03",
      title: "Pitch your music",
      desc: "Submit the right tracks for the right briefs. Our experienced sync team reviews every single submission and directly pitches the music that fits the supervisor's vision.",
      badge: "STEP 3: SUPERVISOR PITCH"
    }
  ];

  return (
    <div className="sync-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* Dynamic Theme Styles for Sync Hero */}
      <style>{`
        .sync-hero-overlay-h {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(8,11,17,0.94) 0%, rgba(8,11,17,0.85) 45%, rgba(8,11,17,0.65) 75%, rgba(8,11,17,0.88) 100%);
        }
        .sync-hero-overlay-v {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(8,11,17,0.5) 0%, transparent 20%, transparent 80%, rgba(8,11,17,0.98) 100%);
        }

        [data-theme="light"] .sync-hero-overlay-h {
          background: linear-gradient(90deg, rgba(248,250,252,0.93) 0%, rgba(248,250,252,0.82) 48%, rgba(248,250,252,0.42) 75%, rgba(248,250,252,0.82) 100%);
        }
        [data-theme="light"] .sync-hero-overlay-v {
          background: linear-gradient(180deg, rgba(248,250,252,0.3) 0%, transparent 20%, transparent 80%, rgba(248,250,252,0.98) 100%);
        }

        .sync-hero-badge {
          color: #C4B5FD;
          background: rgba(167, 139, 250, 0.15);
          border: 1px solid rgba(167, 139, 250, 0.35);
        }
        [data-theme="light"] .sync-hero-badge {
          color: #7C3AED;
          background: rgba(124, 58, 237, 0.08);
          border: 1px solid rgba(124, 58, 237, 0.25);
        }

        .sync-hero-gradient-text {
          background: linear-gradient(135deg, var(--tw-lime) 0%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .sync-hero-gradient-text {
          background: linear-gradient(135deg, #007EA7 0%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sync-hero-card {
          border-radius: 24px;
          padding: 36px 32px;
          border: 1px solid rgba(167, 139, 250, 0.25);
          background: radial-gradient(circle at top right, rgba(167, 139, 250, 0.12), rgba(9, 13, 21, 0.96));
          backdrop-filter: blur(16px);
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8);
        }
        [data-theme="light"] .sync-hero-card {
          border: 1px solid rgba(124, 58, 237, 0.18);
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 24px 60px -15px rgba(124, 58, 237, 0.12), 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }

        .sync-hero-brief-item {
          padding: 18px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 14px;
        }
        [data-theme="light"] .sync-hero-brief-item {
          background: rgba(241, 245, 249, 0.75);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .sync-hero-pitch-badge {
          background: rgba(163, 230, 53, 0.15);
          color: var(--tw-lime);
          border: 1px solid rgba(163, 230, 53, 0.3);
        }
        [data-theme="light"] .sync-hero-pitch-badge {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          border: 1px solid rgba(5, 150, 105, 0.25);
        }

        .sync-hero-upfront-amount {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--tw-lime);
        }
        [data-theme="light"] .sync-hero-upfront-amount {
          color: #059669;
        }

        .sync-hero-stat-1 {
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--tw-lime);
        }
        [data-theme="light"] .sync-hero-stat-1 {
          color: #007EA7;
        }

        .sync-hero-stat-2 {
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--tw-cyan);
        }
        [data-theme="light"] .sync-hero-stat-2 {
          color: #0284C7;
        }

        .sync-hero-stat-3 {
          font-size: 1.3rem;
          font-weight: 900;
          color: #A78BFA;
        }
        [data-theme="light"] .sync-hero-stat-3 {
          color: #7C3AED;
        }

        .sync-hero-btn-about {
          padding: 16px 30px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }
        [data-theme="light"] .sync-hero-btn-about {
          border-color: rgba(0, 0, 0, 0.16);
          color: #0F172A;
          background: rgba(255, 255, 255, 0.7);
        }
        .sync-hero-btn-about:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
        }
        [data-theme="light"] .sync-hero-btn-about:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(0, 0, 0, 0.3);
        }

        .sync-hero-stats-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        [data-theme="light"] .sync-hero-stats-row {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .sync-hero-stats-divider {
          height: 30px;
          width: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        [data-theme="light"] .sync-hero-stats-divider {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', padding: '50px 0 90px', overflow: 'hidden' }}>
        {/* Background 3D image */}
        <img
          src="/login_background_image/Sync background image.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />

        {/* Ambient Gradient Overlays for Readability & High Contrast across Dark and Light Themes */}
        <div className="sync-hero-overlay-h" />
        <div className="sync-hero-overlay-v" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 54, alignItems: 'center' }}>
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge sync-hero-badge">
                  <Clapperboard size={13} style={{ marginRight: 4 }} />
                  PART OF TUNEWAVE PRO
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                Sync <br />
                <span className="sync-hero-gradient-text">
                  Licensing.
                </span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                Pitch your music for the latest sync briefs across movies, TV shows, video games, ads and more with TuneWave Sync. Keep 100% of your sync fee.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                    color: '#FFFFFF',
                    WebkitTextFillColor: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 12px 30px -8px rgba(124, 58, 237, 0.45)'
                  }}
                >
                  <span>Sign Up to Pro</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
                <button 
                  onClick={() => onNavigate('/pricing')}
                  className="sync-hero-btn-about"
                >
                  About TuneWave Pro →
                </button>
              </div>

              <div className="sync-hero-stats-row">
                <div>
                  <div className="sync-hero-stat-1">100%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-muted)' }}>Sync Fee Retained</div>
                </div>
                <div className="sync-hero-stats-divider" />
                <div>
                  <div className="sync-hero-stat-2">500+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-muted)' }}>Annual Placements</div>
                </div>
                <div className="sync-hero-stats-divider" />
                <div>
                  <div className="sync-hero-stat-3">0%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-muted)' }}>Exclusivity Lock</div>
                </div>
              </div>
            </div>

            {/* Hero Sync Monitor Card */}
            <div className="reveal-scale">
              <div className="glass-panel card-shimmer-sweep sync-hero-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                      ACTIVE SYNC BRIEF FEED
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: "var(--tw-text-white)" }}>
                      TuneWave Sync Portal
                    </div>
                  </div>
                  <span className="pill-badge sync-hero-pitch-badge">
                    OPEN FOR PITCHING
                  </span>
                </div>

                {/* Brief 1 */}
                <div className="sync-hero-brief-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#EF4444' }}>NETFLIX DRAMA SERIES</span>
                    <span className="sync-hero-upfront-amount">$12,500 UPFRONT</span>
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: "var(--tw-text-white)" }}>Upbeat Indie-Pop / Neo-Soul Anthem</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>End credits placement. High priority, instrumentals required.</div>
                </div>

                {/* Brief 2 */}
                <div className="sync-hero-brief-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)' }}>EA SPORTS CONSOLE GAME</span>
                    <span className="sync-hero-upfront-amount">$8,000 UPFRONT</span>
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: "var(--tw-text-white)" }}>Driving UK Drill / Bass-Heavy Trap</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>In-game menu & gameplay soundtrack. Global broadcast rights.</div>
                </div>

                {/* Brief 3 */}
                <div className="sync-hero-brief-item" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#A78BFA' }}>GLOBAL AUTOMOTIVE AD</span>
                    <span className="sync-hero-upfront-amount">$20,000 UPFRONT</span>
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: "var(--tw-text-white)" }}>Cinematic Ambient / Electronic Build</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>Worldwide TV, cinema & social web license. 12 months usage.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 01 · HOW IT WORKS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-lime)', borderColor: 'var(--tw-lime)' }}>
                01 · HOW IT WORKS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              We help artists land <br />
              <span style={{ color: 'var(--tw-lime)' }}>big features.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
              Our client's latest sync briefs are posted directly to the TuneWave Sync Dashboard. Sign up for Pro to get access and pitch your music. You never know where it could take you.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28
          }}>
            {TIMELINE_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="glass-panel card-shimmer-sweep"
                style={{
                  borderRadius: 20,
                  padding: '36px 30px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <span style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: 'var(--tw-lime)',
                      fontFamily: 'monospace'
                    }}>
                      {step.num}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--tw-text-dim)'
                    }}>
                      {step.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                    {step.title}
                  </h3>

                  <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>

                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span 
                    onClick={() => onNavigate('/signup')}
                    style={{ cursor: 'pointer', color: 'var(--tw-lime)', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    Start pitching →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION 02 · RECENT SYNCS SHOWCASE */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: '#A78BFA', borderColor: '#A78BFA' }}>
                  02 · LATEST PLACEMENTS
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: 'var(--tw-text-white)' }}>
                Recent <span style={{ color: '#A78BFA' }}>TuneWave syncs.</span>
              </h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--tw-text-dim)', maxWidth: '420px', lineHeight: 1.6 }}>
              A snapshot of the sync placements we've secured for our artists across global streaming and broadcast media.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24
          }}>
            {RECENT_PLACEMENTS.map((item, idx) => (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  position: 'relative',
                  height: 200,
                  background: `url(${item.bgImage}) center/cover`
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(9,13,21,0.9) 0%, rgba(9,13,21,0.2) 60%)'
                  }} />
                  <span style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: 'rgba(0,0,0,0.7)',
                    color: item.color,
                    border: `1px solid ${item.color}40`
                  }}>
                    {item.brand}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                      {item.tag}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: "var(--tw-text-white)", margin: '6px 0 10px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <a 
                      href={item.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        color: item.color,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      Watch the placement <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION 03 · BRANDS WE WORK WITH (LOGO WALL) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--tw-text-dim)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              BRANDS WE'VE WORKED WITH
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 8 }}>
              Where our artists <span style={{ color: 'var(--tw-lime)' }}>get placed.</span>
            </h2>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: 16
          }}>
            {BRANDS.map((brand, idx) => (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  padding: '28px 20px',
                  borderRadius: 14,
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: "var(--tw-text-white)", letterSpacing: '-0.02em' }}>
                  {brand.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {brand.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SYNC FAQS ACCORDION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#A78BFA', borderColor: '#A78BFA' }}>
                SYNC ESSENTIALS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              Sync Licensing <span style={{ color: '#A78BFA' }}>FAQs</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem' }}>
              Everything you need to know about pitching, briefs, contracts, and keeping 100% of your sync fees.
            </p>
          </div>

          <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SYNC_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{
                    borderRadius: 16,
                    border: isOpen ? '1px solid rgba(167, 139, 250, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isOpen ? 'rgba(167, 139, 250, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: "var(--tw-text-white)",
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? '#A78BFA' : '#64748B',
                        flexShrink: 0,
                        marginLeft: 16
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      color: 'var(--tw-text-dim)',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: 16
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA STRIP */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep" style={{
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 70px)',
            background: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.12) 0%, rgba(9, 13, 21, 0.98) 100%)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            textAlign: 'center',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8)'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              Ready to land your first sync placement? <br />
              <span style={{ color: 'var(--tw-lime)' }}>Get started in 60 seconds.</span>
            </h2>

            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Join TuneWave Pro today and pitch your music to world-class music supervisors, directors, and advertising agencies.
            </p>

            <button 
              onClick={() => onNavigate('/signup')}
              className="btn-cyan"
              style={{
                padding: '18px 44px',
                fontSize: '1.1rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                color: "var(--tw-text-white)",
                border: 'none',
                boxShadow: '0 12px 30px -8px rgba(167, 139, 250, 0.5)'
              }}
            >
              <span>Sign up to Pro</span>
              <ArrowRight size={20} className="btn-icon-hover" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
