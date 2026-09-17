import React, { useState, useEffect, useRef } from 'react';
import {
  DollarSign, CircleDollarSign, Clapperboard, Video, Split, Globe2,
  ShieldCheck, ArrowRight, Sparkles, TrendingUp, Music, Sliders,
  CheckCircle2, ChevronRight, Calculator, Radio, Award, Eye, Coins,
  Laptop, ExternalLink, Flame, BarChart3, Check
} from 'lucide-react';

// Custom hook for smooth count-up animation
function useCountUp(target, startAnimation = true, duration = 1200) {
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
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(ease * target);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target, startAnimation, duration]);

  return val;
}

export default function MonetizePage({ onNavigate, theme = 'dark' }) {
  const isLight = theme === 'light';

  // 3D Parallax Tilt for Hero / Spotlight Card
  const [heroTilt, setHeroTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const cardRef = useRef(null);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setHeroTilt({
      rotX: -normY * 12,
      rotY: normX * 14,
      glareX: Math.round((x / rect.width) * 100),
      glareY: Math.round((y / rect.height) * 100)
    });
    setIsHeroHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHeroHovered(false);
    setHeroTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  };

  // Interactive Splits Simulator State
  const [artistSplit, setArtistSplit] = useState(60);
  const producerSplit = 100 - artistSplit;
  const samplePayout = 5400;

  // Interactive Missing Royalties Calculator State
  const [monthlyStreams, setMonthlyStreams] = useState(250000);
  const streamOptions = [
    { label: '50K', value: 50000 },
    { label: '250K', value: 250000 },
    { label: '1M', value: 1000000 },
    { label: '5M', value: 5000000 },
  ];

  // Calculated estimates
  const baseDspEarnings = Math.round(monthlyStreams * 0.0038);
  const publishingUnclaimed = Math.round(baseDspEarnings * 0.24);
  const syncOpportunity = Math.round(baseDspEarnings * 0.35);
  const contentIdEarnings = Math.round(baseDspEarnings * 0.18);
  const totalMonetized = baseDspEarnings + publishingUnclaimed + syncOpportunity + contentIdEarnings;

  const animatedTotalMonetized = useCountUp(totalMonetized, true, 800);
  const animatedBaseDsp = useCountUp(baseDspEarnings, true, 800);
  const animatedUnclaimed = useCountUp(publishingUnclaimed + syncOpportunity + contentIdEarnings, true, 800);

  // Live Sync Marquee Feed
  const SYNC_FEED = [
    { show: "Cyber Odyssey (Netflix Sci-Fi)", payout: "$4,800", type: "Sync Placement", territory: "Global" },
    { show: "Apex Racing League (EA Sports)", payout: "$7,250", type: "Game Soundtrack", territory: "Worldwide" },
    { show: "Vogue Autumn Runway Campaign", payout: "$3,400", type: "Commercial Sync", territory: "US & EU" },
    { show: "Tokyo Midnight Neo-Noir Series", payout: "$5,100", type: "Streaming Series", territory: "Asia-Pac" },
    { show: "Red Bull Extreme Energy Doc", payout: "$2,950", type: "Digital Feature", territory: "Worldwide" }
  ];

  const PILLARS = [
    {
      id: "publishing",
      icon: Globe2,
      title: "Global Publishing Administration",
      badge: "60+ SOCIETIES",
      badgeColor: "#00E5FF",
      accentGrad: "linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(16, 185, 129, 0.12) 100%)",
      borderColor: "rgba(0, 229, 255, 0.35)",
      desc: "Direct registration across PRS, ASCAP, BMI, GEMA, SACEM, SOCAN & APRA AMCOS so your performance and mechanical royalties never get abandoned in foreign black boxes.",
      cta: "Explore Publishing Hub",
      path: "/publishing",
      perks: ["Mechanical & Performance Payouts", "Black Box Royalty Recovery", "Zero Ownership Transfer"]
    },
    {
      id: "sync",
      icon: Clapperboard,
      title: "Exclusive Sync Licensing Briefs",
      badge: "HOLLYWOOD & NETFLIX",
      badgeColor: "#C084FC",
      accentGrad: "linear-gradient(135deg, rgba(168, 85, 247, 0.24) 0%, rgba(139, 92, 246, 0.10) 100%)",
      borderColor: "rgba(168, 85, 247, 0.35)",
      desc: "Tunewave's sync team pitches your catalog directly to music supervisors, ad agency producers, film directors, and video game sound designers seeking fresh indie tracks.",
      cta: "Explore Sync Licensing",
      path: "/sync",
      perks: ["Upfront Sync Fees + Royalties", "Curated Music Supervisor Pitches", "Non-Exclusive Representation"]
    },
    {
      id: "content-id",
      icon: Video,
      title: "YouTube Content ID & Shorts",
      badge: "AUTOMATED CLAIMS",
      badgeColor: "#F87171",
      accentGrad: "linear-gradient(135deg, rgba(239, 68, 68, 0.24) 0%, rgba(244, 63, 94, 0.10) 100%)",
      borderColor: "rgba(239, 68, 68, 0.35)",
      desc: "Monetize millions of fan covers, TikTok videos, reels, and YouTube shorts containing your audio tracks through acoustic audio fingerprinting and automatic claim monetization.",
      cta: "Explore Content ID Engine",
      path: "/tools/youtube-content-id",
      perks: ["Acoustic Fingerprint Protection", "Shorts & Fan Cover Monetization", "Channel Whitelist Exemption"]
    },
    {
      id: "splits",
      icon: Split,
      title: "Frictionless Auto-Splits",
      badge: "ZERO TRANSFER FEES",
      badgeColor: "#34D399",
      accentGrad: "linear-gradient(135deg, rgba(16, 185, 129, 0.24) 0%, rgba(20, 184, 166, 0.10) 100%)",
      borderColor: "rgba(16, 185, 129, 0.35)",
      desc: "Collaborate freely. Add producer, lyricist, and featured artist percentages. Our smart ledger splits monthly earnings directly into their accounts with full transparent audit trails.",
      cta: "Zero-Fee Automatic Splits",
      path: "/signup",
      perks: ["Independent Multi-Payee Portals", "Direct Multi-Currency Bank Deposits", "Instant Recoupment Support"]
    }
  ];

  return (
    <div className="monetize-page-wrapper" style={{ paddingTop: 30, paddingBottom: 110, position: 'relative', overflow: 'hidden' }}>
      {/* ── Ambient Background Glow & Particles ─────────────────────── */}
      <div className="monetize-ambient-mesh" aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120vw',
        height: '900px',
        background: isLight
          ? 'radial-gradient(ellipse at 50% 10%, rgba(0, 126, 167, 0.15) 0%, rgba(16, 185, 129, 0.08) 35%, transparent 70%)'
          : 'radial-gradient(ellipse at 50% 10%, rgba(0, 229, 255, 0.16) 0%, rgba(16, 185, 129, 0.10) 35%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Floating Animated Currency & Royalty Tokens */}
      <div className="monetize-floating-token token-1" aria-hidden="true">$</div>
      <div className="monetize-floating-token token-2" aria-hidden="true">€</div>
      <div className="monetize-floating-token token-3" aria-hidden="true">♪</div>
      <div className="monetize-floating-token token-4" aria-hidden="true">£</div>
      <div className="monetize-floating-token token-5" aria-hidden="true">♫</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── 1. HERO HEADER ────────────────────────────────────────── */}
        <div className="monetize-hero-header" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span className="pill-badge monetize-hero-badge" style={{
              color: isLight ? '#007EA7' : 'var(--tw-cyan)',
              background: isLight ? 'rgba(0, 126, 167, 0.08)' : 'rgba(0, 229, 255, 0.12)',
              border: isLight ? '1px solid rgba(0, 126, 167, 0.25)' : '1px solid rgba(0, 229, 255, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: 50
            }}>
              <span className="pulse-dot" style={{
                background: isLight ? '#007EA7' : 'var(--tw-cyan)',
                boxShadow: isLight ? '0 0 10px rgba(0, 126, 167, 0.5)' : '0 0 10px var(--tw-cyan)'
              }} />
              02 · COMPLETE MUSIC MONETIZATION SUITE
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            marginBottom: 22,
            color: isLight ? '#0F172A' : '#FFFFFF'
          }}>
            Every single stream. <br />
            <span className="text-cyan-gradient" style={{ display: 'inline-block' }}>
              Every unclaimed royalty.
            </span>
          </h1>

          <p style={{
            fontSize: '1.22rem',
            color: isLight ? '#334155' : 'var(--tw-text-dim)',
            lineHeight: 1.7,
            maxWidth: 720,
            margin: '0 auto 36px',
            fontWeight: 500
          }}>
            Digital streaming is just the tip of the iceberg. Unlock international publishing collections,
            lucrative sync placements for film & television, and automated YouTube Content ID audio fingerprinting.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/signup')}
              className="btn-cyan monetize-hero-cta"
              style={{ padding: '16px 36px', fontSize: '1.02rem', fontWeight: 700 }}
            >
              <span>Collect Missing Royalties Free</span>
              <ArrowRight size={18} className="btn-icon-hover" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('monetize-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-glass"
              style={{ padding: '16px 30px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Calculator size={18} color={isLight ? '#007EA7' : 'var(--tw-cyan)'} />
              <span>Simulate Royalty Earnings</span>
            </button>
          </div>
        </div>

        {/* ── 2. LIVE 3D INTERACTIVE MONETIZATION MATRIX CARD ────────── */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="monetize-3d-console card-shimmer-sweep"
          style={{
            transform: isHeroHovered
              ? `perspective(1000px) rotateX(${heroTilt.rotX}deg) rotateY(${heroTilt.rotY}deg) scale3d(1.01, 1.01, 1.01)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: isHeroHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: 26,
            padding: '36px 34px',
            background: isLight
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 249, 255, 0.92) 100%)'
              : 'linear-gradient(135deg, rgba(14, 22, 38, 0.95) 0%, rgba(8, 12, 20, 0.98) 100%)',
            border: isLight ? '1px solid rgba(0, 126, 167, 0.22)' : '1px solid rgba(0, 229, 255, 0.35)',
            boxShadow: isLight
              ? '0 24px 50px -15px rgba(0, 126, 167, 0.15)'
              : '0 30px 60px -20px rgba(0, 0, 0, 0.8), 0 0 35px -10px rgba(0, 229, 255, 0.22)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 68
          }}
        >
          {/* Specular Glare Movement Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${heroTilt.glareX}% ${heroTilt.glareY}%, ${isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.18)'} 0%, transparent 55%)`,
              opacity: isHeroHovered ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
            borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 20
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLight ? '#007EA7' : 'var(--tw-cyan)'
                }}>
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                    Multi-Channel Royalty Consolidation
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: isLight ? '#475569' : 'var(--tw-text-dim)' }}>
                    Real-time aggregated revenue pipeline across 150+ stores, societies, and sync networks.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                background: isLight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
                border: '1px solid #10B981',
                padding: '6px 14px',
                borderRadius: 50,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span className="pulse-dot" style={{ background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                <span>100% ARTIST OWNERSHIP</span>
              </div>
            </div>
          </div>

          {/* 5 Revenue Streams Progress Bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { label: 'DSP Streams (Spotify / Apple / Amazon)', share: '45%', amount: '$3,840.00', color: '#00E5FF', icon: Music },
              { label: 'Global Publishing (Mechanicals & Broadcast)', share: '24%', amount: '$2,048.00', color: '#10B981', icon: Globe2 },
              { label: 'Sync Brief Placements (TV / Commercials)', share: '18%', amount: '$1,536.00', color: '#C084FC', icon: Clapperboard },
              { label: 'YouTube Content ID Fingerprint Claims', share: '9%', amount: '$768.00', color: '#F87171', icon: Video },
              { label: 'Automated Collaborator Splits (Net)', share: '4%', amount: '$341.00', color: '#FBBF24', icon: Split }
            ].map((stream, idx) => {
              const Icon = stream.icon;
              return (
                <div key={idx} className="monetize-stream-box" style={{
                  padding: '18px 20px',
                  borderRadius: 16,
                  background: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.25s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon size={16} color={stream.color} />
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isLight ? '#1E293B' : '#E2E8F0' }}>
                        {stream.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: stream.color }}>
                      {stream.amount}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 4,
                    background: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div
                      className="monetize-bar-fill"
                      style={{
                        width: stream.share,
                        height: '100%',
                        borderRadius: 4,
                        background: stream.color,
                        boxShadow: `0 0 10px ${stream.color}66`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. LIVE SYNC PLACEMENTS TICKER ────────────────────────── */}
        <div style={{
          marginBottom: 64,
          padding: '14px 22px',
          borderRadius: 18,
          background: isLight ? 'rgba(0, 126, 167, 0.04)' : 'rgba(0, 229, 255, 0.05)',
          border: isLight ? '1px solid rgba(0, 126, 167, 0.16)' : '1px solid rgba(0, 229, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: isLight ? '#007EA7' : 'var(--tw-cyan)'
          }}>
            <Flame size={16} />
            <span>RECENT SYNC CLEARANCES:</span>
          </div>

          <div className="monetize-ticker-track">
            <div className="monetize-ticker-content">
              {SYNC_FEED.concat(SYNC_FEED).map((item, idx) => (
                <div key={idx} className="monetize-ticker-pill" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 14px',
                  borderRadius: 20,
                  background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                  marginRight: 16,
                  fontSize: '0.82rem'
                }}>
                  <span style={{ fontWeight: 600, color: isLight ? '#0F172A' : '#FFFFFF' }}>{item.show}</span>
                  <span style={{ color: '#10B981', fontWeight: 800 }}>{item.payout}</span>
                  <span style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : 'var(--tw-text-muted)' }}>({item.type})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4. 2x2 BALANCED FEATURE PILLARS WITH HOVER DEPTH ───────── */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>FOUR CORE MONETIZATION PILLARS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', margin: 0 }}>
            Everything you need to turn notes into <span className="text-cyan-gradient">sustainable income.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 74
        }}>
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => onNavigate(pillar.path)}
                className="glass-panel card-shimmer-sweep monetize-feature-card"
                style={{
                  padding: '36px 32px',
                  cursor: 'pointer',
                  borderRadius: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: isLight ? '#FFFFFF' : undefined,
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : undefined,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: pillar.accentGrad,
                      border: `1px solid ${pillar.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pillar.badgeColor,
                      boxShadow: `0 8px 20px -5px ${pillar.badgeColor}40`
                    }}>
                      <Icon size={25} strokeWidth={2.2} />
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: pillar.badgeColor,
                      background: `${pillar.badgeColor}15`,
                      border: `1px solid ${pillar.badgeColor}35`,
                      padding: '4px 10px',
                      borderRadius: 20
                    }}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    marginBottom: 12,
                    color: isLight ? '#0F172A' : '#FFFFFF'
                  }}>
                    {pillar.title}
                  </h3>

                  <p style={{
                    color: isLight ? '#334155' : 'var(--tw-text-dim)',
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    marginBottom: 20
                  }}>
                    {pillar.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    {pillar.perks.map((perk, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                        <Check size={15} color={pillar.badgeColor} />
                        <span style={{ color: isLight ? '#1E293B' : '#CBD5E1', fontWeight: 500 }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  paddingTop: 16,
                  borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: pillar.badgeColor,
                  fontWeight: 700,
                  fontSize: '0.92rem'
                }}>
                  <span>{pillar.cta}</span>
                  <ArrowRight size={16} className="btn-icon-hover" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 5. INTERACTIVE MISSING ROYALTIES ESTIMATOR ─────────────── */}
        <div id="monetize-calculator" style={{
          borderRadius: 26,
          padding: '44px 38px',
          background: isLight
            ? 'linear-gradient(135deg, rgba(0, 126, 167, 0.05) 0%, #FFFFFF 100%)'
            : 'linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(14, 20, 32, 0.95) 100%)',
          border: isLight ? '1px solid rgba(0, 126, 167, 0.22)' : '1px solid rgba(0, 229, 255, 0.3)',
          boxShadow: isLight ? '0 20px 45px -15px rgba(0, 126, 167, 0.12)' : '0 25px 55px -15px rgba(0, 0, 0, 0.7)',
          marginBottom: 70
        }}>
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.35)' }}>
                INTERACTIVE ESTIMATOR
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 10 }}>
              How much missing revenue are you leaving behind?
            </h3>
            <p style={{ color: isLight ? '#475569' : 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
              Most distributors collect streaming payouts only. See what happens when publishing administration,
              sync pitching, and Content ID monetization work simultaneously.
            </p>
          </div>

          <div style={{ maxWidth: 680, margin: '0 auto 36px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: isLight ? '#1E293B' : '#CBD5E1' }}>
                Estimated Monthly Streams:
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: isLight ? '#007EA7' : 'var(--tw-cyan)' }}>
                {monthlyStreams.toLocaleString()} streams
              </span>
            </div>

            <input
              type="range"
              min={25000}
              max={2500000}
              step={25000}
              value={monthlyStreams}
              onChange={(e) => setMonthlyStreams(Number(e.target.value))}
              style={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                accentColor: isLight ? '#007EA7' : '#00E5FF',
                cursor: 'pointer',
                marginBottom: 16
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {streamOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMonthlyStreams(opt.value)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    background: monthlyStreams === opt.value
                      ? (isLight ? '#007EA7' : 'var(--tw-cyan)')
                      : (isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)'),
                    color: monthlyStreams === opt.value
                      ? '#000000'
                      : (isLight ? '#334155' : 'var(--tw-text-dim)'),
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {opt.label} Streams
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Cards: Standard vs Tunewave */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 840, margin: '0 auto' }}>
            <div style={{
              padding: '28px 24px',
              borderRadius: 20,
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
              border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#64748B' : 'var(--tw-text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                Typical Distributor (Streaming Only)
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: isLight ? '#334155' : '#94A3B8', marginBottom: 12 }}>
                ${Math.round(animatedBaseDsp).toLocaleString()}
              </div>
              <p style={{ fontSize: '0.85rem', color: isLight ? '#64748B' : 'var(--tw-text-muted)', lineHeight: 1.5, margin: 0 }}>
                Misses out on international performance royalties, mechanical collection, and fan UGC claims.
              </p>
            </div>

            <div style={{
              padding: '28px 24px',
              borderRadius: 20,
              background: isLight ? 'rgba(0, 126, 167, 0.08)' : 'rgba(0, 229, 255, 0.12)',
              border: isLight ? '2px solid #007EA7' : '2px solid var(--tw-cyan)',
              boxShadow: isLight ? '0 10px 30px -10px rgba(0, 126, 167, 0.25)' : '0 12px 35px -10px rgba(0, 229, 255, 0.3)',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: isLight ? '#007EA7' : 'var(--tw-cyan)',
                color: '#000000',
                padding: '3px 14px',
                borderRadius: 20,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.06em'
              }}>
                FULL STACK REVENUE
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#007EA7' : 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 8, marginTop: 4 }}>
                With Tunewave Complete Rights Suite
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 6 }}>
                ${Math.round(animatedTotalMonetized).toLocaleString()}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 20,
                background: '#10B9811A',
                color: '#10B981',
                fontWeight: 800,
                fontSize: '0.82rem',
                marginBottom: 12
              }}>
                <TrendingUp size={14} />
                +${Math.round(animatedUnclaimed).toLocaleString()} Extra Collected
              </div>
              <p style={{ fontSize: '0.85rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', lineHeight: 1.5, margin: 0 }}>
                Streaming + Publishing Administration + Direct Sync Pitches + Automated YouTube Content ID.
              </p>
            </div>
          </div>
        </div>

        {/* ── 6. INTERACTIVE AUTO-SPLITS SIMULATOR ───────────────────── */}
        <div style={{
          borderRadius: 24,
          padding: '38px 34px',
          background: isLight ? '#FFFFFF' : 'rgba(19, 27, 42, 0.65)',
          border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid var(--tw-line-bright)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 36,
          alignItems: 'center',
          marginBottom: 64
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#34D399', borderColor: 'rgba(52, 211, 153, 0.35)' }}>
                TRANSPARENT COLLABORATION
              </span>
            </div>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 12 }}>
              Split pay. Zero drama. Automatic deposits.
            </h3>
            <p style={{ color: isLight ? '#475569' : 'var(--tw-text-dim)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 20 }}>
              Say goodbye to awkward manual accounting and endless bank transfers. Set percentages once, and every time
              royalties land, Tunewave pays every contributor directly to their account.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={18} color="#34D399" />
                <span style={{ fontSize: '0.9rem', color: isLight ? '#1E293B' : '#E2E8F0' }}>Each collaborator gets private dashboard access & 1099/tax forms</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={18} color="#34D399" />
                <span style={{ fontSize: '0.9rem', color: isLight ? '#1E293B' : '#E2E8F0' }}>Zero middleman processing deductions or fees on splits</span>
              </div>
            </div>
          </div>

          <div style={{
            padding: '28px 24px',
            borderRadius: 20,
            background: isLight ? 'rgba(0, 126, 167, 0.04)' : 'rgba(0, 0, 0, 0.45)',
            border: isLight ? '1px solid rgba(0, 126, 167, 0.2)' : '1px solid rgba(52, 211, 153, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                SPLIT RATIO SIMULATOR
              </span>
              <span style={{ fontSize: '0.8rem', color: '#34D399', fontWeight: 700 }}>
                Based on ${samplePayout.toLocaleString()} Release Royalties
              </span>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 8, fontWeight: 700 }}>
                <span style={{ color: isLight ? '#007EA7' : 'var(--tw-cyan)' }}>Lead Artist ({artistSplit}%)</span>
                <span style={{ color: '#C084FC' }}>Producer ({producerSplit}%)</span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                value={artistSplit}
                onChange={(e) => setArtistSplit(Number(e.target.value))}
                style={{ width: '100%', height: 6, borderRadius: 3, accentColor: isLight ? '#007EA7' : 'var(--tw-cyan)', cursor: 'pointer' }}
              />
            </div>

            {/* Live Visual Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                border: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: isLight ? '#64748B' : 'var(--tw-text-muted)' }}>Lead Artist Payout</div>
                  <div style={{ fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', fontSize: '1.1rem' }}>
                    ${Math.round((samplePayout * artistSplit) / 100).toLocaleString()}
                  </div>
                </div>
                <div style={{ alignSelf: 'center', fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#007EA7' : 'var(--tw-cyan)' }}>
                  {artistSplit}%
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 12,
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                border: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: isLight ? '#64748B' : 'var(--tw-text-muted)' }}>Beat Producer Payout</div>
                  <div style={{ fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', fontSize: '1.1rem' }}>
                    ${Math.round((samplePayout * producerSplit) / 100).toLocaleString()}
                  </div>
                </div>
                <div style={{ alignSelf: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#C084FC' }}>
                  {producerSplit}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 7. BOTTOM CALL TO ACTION BANNER ───────────────────────── */}
        <div style={{
          borderRadius: 26,
          padding: '50px 40px',
          textAlign: 'center',
          background: isLight
            ? 'linear-gradient(135deg, rgba(0, 126, 167, 0.08) 0%, rgba(240, 249, 255, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(0, 229, 255, 0.16) 0%, rgba(14, 165, 233, 0.06) 50%, rgba(8, 12, 20, 0.95) 100%)',
          border: isLight ? '1px solid rgba(0, 126, 167, 0.25)' : '1px solid rgba(0, 229, 255, 0.35)',
          boxShadow: isLight ? '0 20px 45px -12px rgba(0, 126, 167, 0.12)' : '0 25px 60px -20px rgba(0, 229, 255, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 14 }}>
            Stop letting third parties pocket your publishing.
          </h2>
          <p style={{ fontSize: '1.12rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Join thousands of independent songwriters, producers, and labels collecting 100% of their worldwide royalties through Tunewave.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/signup')}
              className="btn-cyan"
              style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 700 }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={18} className="btn-icon-hover" />
            </button>
            <button
              onClick={() => onNavigate('/pricing')}
              className="btn-glass"
              style={{ padding: '16px 30px', fontSize: '1rem', fontWeight: 600 }}
            >
              <span>Explore Plans</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── CSS KEYFRAMES & MICRO-INTERACTIONS ────────────────────── */}
      <style>{`
        /* Hero Header Entrance */
        .monetize-hero-header {
          animation: heroEntrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes heroEntrance {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Floating Currency & Audio Tokens */
        .monetize-floating-token {
          position: absolute;
          font-size: 2.2rem;
          font-weight: 800;
          color: ${isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.14)'};
          user-select: none;
          pointer-events: none;
          z-index: 0;
          animation: floatToken 16s ease-in-out infinite alternate;
        }
        .token-1 { top: 90px; left: 8%; animation-duration: 14s; animation-delay: 0s; }
        .token-2 { top: 160px; right: 10%; animation-duration: 18s; animation-delay: -3s; }
        .token-3 { top: 380px; left: 4%; animation-duration: 16s; animation-delay: -5s; font-size: 2.8rem; }
        .token-4 { top: 520px; right: 6%; animation-duration: 20s; animation-delay: -2s; }
        .token-5 { top: 700px; left: 12%; animation-duration: 17s; animation-delay: -7s; font-size: 2.5rem; }

        @keyframes floatToken {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(12deg) scale(1.08); }
          100% { transform: translateY(15px) rotate(-8deg); }
        }

        /* Ticker Animation */
        .monetize-ticker-track {
          display: flex;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }
        .monetize-ticker-content {
          display: inline-flex;
          animation: monetizeTicker 28s linear infinite;
        }
        .monetize-ticker-content:hover {
          animation-play-state: paused;
        }
        @keyframes monetizeTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Stream Box Micro-Interaction */
        .monetize-stream-box:hover {
          transform: translateY(-3px);
          border-color: ${isLight ? 'rgba(0, 126, 167, 0.35)' : 'rgba(0, 229, 255, 0.4)'} !important;
          box-shadow: 0 10px 24px -6px ${isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.15)'};
        }

        /* Feature Card Interactive Hover Glow */
        .monetize-feature-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: ${isLight
            ? '0 20px 45px -10px rgba(0, 126, 167, 0.18)'
            : '0 22px 50px -12px rgba(0, 229, 255, 0.28)'} !important;
        }

        /* Shimmer bar in revenue console */
        @keyframes monetizeBarSweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
