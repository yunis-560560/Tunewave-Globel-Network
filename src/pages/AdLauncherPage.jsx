import React, { useState, useRef } from 'react';
import { 
  Target, Sparkles, ArrowRight, CheckCircle2, ChevronDown, 
  BarChart3, Zap, Layers, Play, ExternalLink, HelpCircle, 
  Sliders, ShieldCheck, DollarSign, Users, Eye, TrendingUp,
  Globe2, Music2, Share2, Compass, Check, Radio, Disc3, Music
} from 'lucide-react';

export default function AdLauncherPage({ onNavigate, theme = 'dark' }) {
  const [openFaq, setOpenFaq] = useState(0);

  const isLight = theme === 'light';
  const heroRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = ((x / rect.width) - 0.5) * 2;
    const normY = ((y / rect.height) - 0.5) * 2;
    heroRef.current.style.setProperty('--ad-tilt-x', normX.toFixed(3));
    heroRef.current.style.setProperty('--ad-tilt-y', normY.toFixed(3));
    heroRef.current.style.setProperty('--ad-cursor-x', `${((x / rect.width) * 100).toFixed(1)}%`);
    heroRef.current.style.setProperty('--ad-cursor-y', `${((y / rect.height) * 100).toFixed(1)}%`);
  };

  const handleHeroMouseLeave = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--ad-tilt-x', '0');
    heroRef.current.style.setProperty('--ad-tilt-y', '0');
    heroRef.current.style.setProperty('--ad-cursor-x', '50%');
    heroRef.current.style.setProperty('--ad-cursor-y', '45%');
  };

  // 3D Parallax Tilt for Bottom CTA Banner
  const ctaRef = useRef(null);
  const handleCtaMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = ((x / rect.width) - 0.5) * 2;
    const normY = ((y / rect.height) - 0.5) * 2;
    ctaRef.current.style.setProperty('--cta-tilt-x', normX.toFixed(3));
    ctaRef.current.style.setProperty('--cta-tilt-y', normY.toFixed(3));
  };

  const handleCtaMouseLeave = () => {
    if (!ctaRef.current) return;
    ctaRef.current.style.setProperty('--cta-tilt-x', '0');
    ctaRef.current.style.setProperty('--cta-tilt-y', '0');
  };

  // Interactive Ad Builder State
  const [selectedPlatform, setSelectedPlatform] = useState('spotify');
  const [selectedGoal, setSelectedGoal] = useState('streams');
  const [budget, setBudget] = useState(250);
  const [similarArtist, setSimilarArtist] = useState('Billie Eilish, Lorde, Clairo');
  const [trackLink, setTrackLink] = useState('');
  const [campaignLaunched, setCampaignLaunched] = useState(false);

  // Calculated estimates based on budget and platform
  const estimatedReach = Math.round(budget * (selectedPlatform === 'spotify' ? 95 : selectedPlatform === 'youtube' ? 140 : 120));
  const estimatedConversions = Math.round(budget * (selectedPlatform === 'spotify' ? 9.5 : selectedPlatform === 'youtube' ? 14 : 11));
  const cpc = (budget / (estimatedConversions * 1.3)).toFixed(2);

  const AD_FAQS = [
    {
      q: "How much does it cost to use Ad Launcher?",
      a: "Campaigns start at a minimum budget of $100. Over 85% of your total spend goes directly to platform media inventory (Spotify, YouTube, Instagram, TikTok) with a transparent 15% management fee covering AI optimization, automated ad creative formatting, and real-time dashboard analytics."
    },
    {
      q: "Can I use Ad Launcher if my music is distributed elsewhere?",
      a: "Yes! While Tunewave artists enjoy automatic catalog linking and streamlined one-click setup, Ad Launcher works with any public Spotify track, Apple Music pre-save link, or YouTube video URL regardless of your digital distributor."
    },
    {
      q: "Where will my ads appear?",
      a: "Depending on your selection, your ads will run directly in Spotify's mobile and desktop apps (as native audio prompts and sponsored recommendation cards), on YouTube (as skippable and in-feed music discovery video ads), on Instagram Reels & Stories, or on TikTok's For You Page."
    },
    {
      q: "How does Ad Launcher target the right listeners?",
      a: "When you enter 2-4 similar sound-alike artists, our algorithmic ad engine parses real streaming listener demographics, genre affinities, and user playlists to build laser-targeted lookalike audiences of real fans who already listen to music identical to yours."
    },
    {
      q: "What metrics can I track in my dashboard?",
      a: "Your dedicated live dashboard displays total impressions, video views, click-through rate (CTR), cost per click (CPC), playlist saves, Spotify profile visits, and estimated follower conversion rates updated every 6 hours."
    },
    {
      q: "How long does a campaign run?",
      a: "You can set your campaign duration between 7 and 21 days. We recommend 10 to 14 days to allow the platform machine learning algorithms sufficient data to optimize your cost per listen and reach the highest-converting listeners."
    }
  ];

  const handleLaunchCampaign = (e) => {
    e.preventDefault();
    setCampaignLaunched(true);
    setTimeout(() => {
      setCampaignLaunched(false);
    }, 3500);
  };

  return (
    <div className="ad-launcher-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      
      {/* 1. HERO SECTION WITH 3D HARDWARE-ACCELERATED STAGE & INTERACTIVE PARALLAX */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="ad-hero-3d-section"
        style={{ position: 'relative', padding: '65px 0 85px', overflow: 'hidden', perspective: 1200 }}
      >
        {/* 3D Hardware-Accelerated Stage (run_music background image.png) */}
        <div className="ad-hero-3d-stage">
          <img 
            src="/run_music%20background%20image.png" 
            alt="Run Music Ads 3D Stage" 
            className="ad-hero-3d-art"
            loading="eager"
          />
        </div>

        {/* Atmospheric Depth & Lighting Mask */}
        <div className="ad-hero-3d-atmosphere" />

        {/* Dynamic Cursor Spotlight */}
        <div className="ad-hero-3d-spotlight" />

        {/* 3D Floating Particles & Badges */}
        <div className="ad-hero-float-elem ad-float-1">
          <div className="ad-float-badge">
            <Radio size={20} style={{ color: 'var(--tw-cyan)' }} />
          </div>
        </div>
        <div className="ad-hero-float-elem ad-float-2">
          <div className="ad-float-badge">
            <Sparkles size={18} style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }} />
          </div>
        </div>
        <div className="ad-hero-float-elem ad-float-3">
          <div className="ad-float-badge">
            <BarChart3 size={20} style={{ color: 'var(--tw-sky)' }} />
          </div>
        </div>

        {/* Elevated 3D Foreground Content */}
        <div className="container ad-hero-3d-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          {/* Eyebrow badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span className="pill-badge" style={{ 
              color: 'var(--tw-cyan)', 
              background: isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.12)', 
              border: isLight ? '1px solid rgba(0, 126, 167, 0.3)' : '1px solid rgba(0, 229, 255, 0.3)' 
            }}>
              <Target size={13} style={{ marginRight: 4 }} />
              AD LAUNCHER · AUTOMATED MUSIC ADVERTISING
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: 'var(--tw-text-white)',
            marginBottom: 20,
            letterSpacing: '-0.02em',
            maxWidth: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Run music ads & reach <br />
            <span className="text-cyan-gradient">future fans.</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--tw-text-dim)',
            maxWidth: 720,
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Drop the link to your music, pick a campaign type and our Ad Launcher targets the right fans on YouTube or Spotify in a few clicks. No complex ad manager required.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 54 }}>
            <a
              href="#ad-builder"
              className="btn-cyan"
              style={{ padding: '15px 34px', fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
            >
              <Zap size={18} />
              <span>Build Campaign</span>
            </a>
            <a
              href="#features"
              className="ad-cta-secondary"
              style={{
                padding: '15px 28px',
                fontSize: '0.98rem',
                fontWeight: 700,
                color: 'var(--tw-text-white)',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                border: '1px solid var(--tw-line)'
              }}
            >
              <span>Explore Ad Channels</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* 4 Stats Cards */}
          <div className="ad-stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 18,
            maxWidth: 960,
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div className="ad-stat-card card-shimmer-sweep" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '-0.02em' }}>Spotify & YT</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Direct Ad Network Access</div>
            </div>
            <div className="ad-stat-card card-shimmer-sweep" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: isLight ? '#059669' : 'var(--tw-lime)', letterSpacing: '-0.02em' }}>3 Clicks</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Zero Technical Setup</div>
            </div>
            <div className="ad-stat-card card-shimmer-sweep" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-sky)', letterSpacing: '-0.02em' }}>100% Real</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Verified Human Listeners</div>
            </div>
            <div className="ad-stat-card card-shimmer-sweep" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '-0.02em' }}>Live ROI</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Real-time Stream Tracking</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE AD CAMPAIGN BUILDER */}
      <section id="ad-builder" style={{ padding: '40px 0 90px' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              SELF-SERVE AD CONFIGURATOR
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 10, marginBottom: 8 }}>
              Customise Your Campaign in Seconds
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1rem', maxWidth: 620, margin: '0 auto' }}>
              Select your platform, specify sound-alike artists, set your budget, and see instant projected reach.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 36,
            alignItems: 'start'
          }}>
            
            {/* Left Column: Configurator Form */}
            <div className="glass-panel" style={{ padding: 36, borderRadius: 24, border: '1px solid var(--tw-line)' }}>
              <form onSubmit={handleLaunchCampaign} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                {/* 1. Target Network */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    1. Select Target Network
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                    {[
                      { id: 'spotify', label: 'Spotify Audio', icon: Music2, color: 'var(--tw-cyan)' },
                      { id: 'youtube', label: 'YouTube Video', icon: Play, color: '#EF4444' },
                      { id: 'instagram', label: 'Instagram Reels', icon: Share2, color: '#EC4899' },
                      { id: 'tiktok', label: 'TikTok In-Feed', icon: Zap, color: 'var(--tw-lime)' }
                    ].map(item => {
                      const Icon = item.icon;
                      const isSelected = selectedPlatform === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedPlatform(item.id)}
                          style={{
                            padding: '16px 14px',
                            borderRadius: 14,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: isSelected ? '1px solid var(--tw-cyan)' : '1px solid var(--tw-line)',
                            background: isSelected ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10
                          }}
                        >
                          <Icon size={22} color={item.color} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--tw-text-white)' : 'var(--tw-text-dim)' }}>
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Campaign Objective */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    2. Select Campaign Objective
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                    {[
                      { id: 'streams', title: 'Drive Streams & Saves', desc: 'Boost algorithmic momentum & Spotify radio adds' },
                      { id: 'views', title: 'Grow Video Views', desc: 'Accelerate official music video plays & subscribers' },
                      { id: 'presaves', title: 'Pre-Save Campaign', desc: 'Build release-day listeners before your drop' },
                      { id: 'followers', title: 'Artist Follower Growth', desc: 'Target fans who follow your Spotify profile' }
                    ].map(goal => {
                      const isSelected = selectedGoal === goal.id;
                      return (
                        <div
                          key={goal.id}
                          onClick={() => setSelectedGoal(goal.id)}
                          style={{
                            padding: 16,
                            borderRadius: 14,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            border: isSelected ? '1px solid var(--tw-cyan)' : '1px solid var(--tw-line)',
                            background: isSelected ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: isSelected ? 'var(--tw-text-white)' : 'var(--tw-text-dim)' }}>
                              {goal.title}
                            </span>
                            {isSelected && <Check size={14} color="var(--tw-cyan)" />}
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', marginTop: 4, lineHeight: 1.4 }}>
                            {goal.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Similar Artists */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    3. Similar Artists (Audience AI Calibrator)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Billie Eilish, Lorde, Clairo"
                    value={similarArtist}
                    onChange={(e) => setSimilarArtist(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 12,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--tw-line)',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', marginTop: 4, display: 'block' }}>
                    Our system cross-references these fanbases to target listeners with verified affinity.
                  </span>
                </div>

                {/* 4. Track Link */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    4. Your Track or Video Link
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://open.spotify.com/track/... or YouTube link"
                    value={trackLink}
                    onChange={(e) => setTrackLink(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 12,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--tw-line)',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* 5. Budget Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      5. Campaign Budget
                    </label>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-cyan)' }}>
                      ${budget} USD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1500"
                    step="50"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: 6,
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.1)',
                      accentColor: 'var(--tw-cyan)',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--tw-text-dim)', marginTop: 6 }}>
                    <span>$100 (Starter Push)</span>
                    <span>$500 (Pro Push)</span>
                    <span>$1,500 (Breakout Push)</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-cyan"
                  style={{
                    padding: '16px 28px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer'
                  }}
                >
                  <Zap size={18} />
                  <span>Launch Campaign for ${budget}</span>
                </button>

                {campaignLaunched && (
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: 12,
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: 'var(--tw-cyan)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <CheckCircle2 size={18} />
                    <span>Campaign configured! Redirecting to secure checkout & live tracking...</span>
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: AI Forecast Engine */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="glass-panel" style={{
                padding: 36,
                borderRadius: 24,
                border: '1px solid rgba(0, 229, 255, 0.3)',
                background: 'linear-gradient(145deg, rgba(12, 10, 26, 0.95) 0%, rgba(0, 229, 255, 0.05) 100%)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 18, borderBottom: '1px solid var(--tw-line)', marginBottom: 24 }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      AI Forecast Engine
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 2 }}>
                      Projected Results
                    </h3>
                  </div>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(0, 229, 255, 0.12)',
                    color: 'var(--tw-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <BarChart3 size={22} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Users size={20} color="var(--tw-cyan)" />
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)' }}>Estimated Ad Impressions</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--tw-text-white)' }}>
                          {(estimatedReach * 0.85).toLocaleString()} "“ {(estimatedReach * 1.25).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <TrendingUp size={20} color="var(--tw-lime)" />
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)' }}>Projected Conversions</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--tw-lime)' }}>
                          ~{estimatedConversions.toLocaleString()} {selectedGoal === 'views' ? 'Video Views' : 'Direct Streams'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <DollarSign size={20} color="var(--tw-purple)" />
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)' }}>Estimated Cost Per Result</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--tw-sky)' }}>
                          ${cpc} / conversion
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Compass size={20} color="var(--tw-cyan)" />
                      <div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)' }}>Audience Affinity Score</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--tw-cyan)' }}>
                          98.4% Match
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--tw-line)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--tw-text-dim)' }}>
                    <CheckCircle2 size={14} color="var(--tw-cyan)" />
                    <span>Real human listeners, strictly no bots</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--tw-text-dim)' }}>
                    <CheckCircle2 size={14} color="var(--tw-cyan)" />
                    <span>Transparent spend: 85% pure media buy</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--tw-text-dim)' }}>
                    <CheckCircle2 size={14} color="var(--tw-cyan)" />
                    <span>Live dashboard tracking 24/7</span>
                  </div>
                </div>
              </div>

              {/* Micro Testimonial */}
              <div className="glass-panel" style={{ padding: 22, borderRadius: 16, fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.55 }}>
                <span style={{ color: 'var(--tw-text-white)', fontWeight: 700 }}>
                  "Ad Launcher did in 48 hours what weeks of manual posting couldn't."
                </span> "” DJ Kray, Melbourne, AU (Over 34,000 streams on debut single).
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. 01 · WHY AD LAUNCHER (3 CORE ADVANTAGES) */}
      <section 
        id="features" 
        className="ad-features-section"
        style={{ 
          padding: '96px 0', 
          position: 'relative',
          overflow: 'hidden',
          background: isLight 
            ? 'linear-gradient(180deg, #F8FAFC 0%, #EDF4FA 50%, #F8FAFC 100%)' 
            : 'linear-gradient(180deg, #080B11 0%, #0B101C 50%, #080B11 100%)',
          borderTop: isLight ? '1px solid rgba(0, 126, 167, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)', 
          borderBottom: isLight ? '1px solid rgba(0, 126, 167, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)' 
        }}
      >
        {/* Soft Ambient Radial Aura */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 90vw)',
          height: 380,
          background: isLight
            ? 'radial-gradient(ellipse, rgba(0, 126, 167, 0.09) 0%, rgba(2, 132, 199, 0.03) 50%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(0, 229, 255, 0.11) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="ad-badge-glow">
              <span className="ad-dot-pulse" />
              <span>01 · WHY AD LAUNCHER</span>
            </div>
            <h2 style={{ 
              fontSize: 'clamp(2.1rem, 4.5vw, 3.2rem)', 
              fontWeight: 900, 
              color: isLight ? '#0F172A' : '#FFFFFF', 
              marginTop: 16, 
              marginBottom: 14,
              letterSpacing: '-0.025em'
            }}>
              Built Specifically for <span className="ad-heading-accent">Musicians &amp; Labels</span>
            </h2>
            <p style={{ 
              color: isLight ? '#475569' : '#94A3B8', 
              fontSize: '1.05rem', 
              maxWidth: 620, 
              margin: '0 auto',
              lineHeight: 1.65 
            }}>
              Say goodbye to confusing pixel setups, complicated Business Managers, and wasted ad budgets.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28,
            position: 'relative'
          }}>
            {/* Card 1: Cyan Identity - Targeted at real music fans */}
            <div className="ad-advantage-card ad-card-cyan">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="ad-feature-icon-wrap ad-icon-cyan">
                  <Target size={24} />
                </div>
                <span className="ad-feature-tag tag-cyan">
                  Precision Audiences
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 12 }}>
                Targeted at real music fans
              </h3>
              <p style={{ color: isLight ? '#475569' : '#94A3B8', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: 24 }}>
                Audiences are pre-built around actual listening habits, favorite subgenres, and related artists. Zero spam clicks or bot farms.
              </p>

              <div className="ad-checklist-wrap" style={{ borderTopColor: isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(255, 255, 255, 0.08)' }}>
                <div className="ad-check-item">
                  <div className="ad-check-bullet bullet-cyan">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Lookalike listener modelling</span>
                </div>
                <div className="ad-check-item">
                  <div className="ad-check-bullet bullet-cyan">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Genre-specific playlist retargeting</span>
                </div>
              </div>
            </div>

            {/* Card 2: Violet / Sky Identity - Spotify & YouTube unified */}
            <div className="ad-advantage-card ad-card-purple">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="ad-feature-icon-wrap ad-icon-purple">
                  <Layers size={24} />
                </div>
                <span className="ad-feature-tag tag-purple">
                  Omnichannel Sync
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 12 }}>
                Spotify &amp; YouTube unified
              </h3>
              <p style={{ color: isLight ? '#475569' : '#94A3B8', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: 24 }}>
                One simple dashboard handles ad campaigns across multiple major DSPs and video networks without configuring separate ad managers.
              </p>

              <div className="ad-checklist-wrap" style={{ borderTopColor: isLight ? 'rgba(124, 58, 237, 0.12)' : 'rgba(255, 255, 255, 0.08)' }}>
                <div className="ad-check-item">
                  <div className="ad-check-bullet bullet-purple">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Automated video &amp; audio formatting</span>
                </div>
                <div className="ad-check-item">
                  <div className="ad-check-bullet bullet-purple">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Multi-channel budget balancing</span>
                </div>
              </div>
            </div>

            {/* Card 3: Emerald Identity - Live performance dashboard */}
            <div className="ad-advantage-card ad-card-green">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div className="ad-feature-icon-wrap ad-icon-green">
                  <BarChart3 size={24} />
                </div>
                <span className="ad-feature-tag tag-green">
                  Real-Time Telemetry
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF', marginBottom: 12 }}>
                Live performance dashboard
              </h3>
              <p style={{ color: isLight ? '#475569' : '#94A3B8', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: 24 }}>
                Watch your streaming metrics surge with transparent analytics updating in real time, tracking cost per click, stream lift, and playlist adds.
              </p>

              <div className="ad-checklist-wrap" style={{ borderTopColor: isLight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.08)' }}>
                <div className="ad-check-item">
                  <div className="ad-check-bullet bullet-green">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Hourly conversion refresh</span>
                </div>
                <div className="ad-check-item">
                  <div className="ad-check-bullet bullet-green">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Downloadable PDF campaign recap</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. 02 · HOW IT WORKS (3 STEPS) */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              02 · HOW IT WORKS
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 12, marginBottom: 12 }}>
              3 Simple Steps to Liftoff
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
              From pasting your track link to streaming to thousands of new fans worldwide.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28
          }}>
            <div className="glass-panel" style={{ padding: 32, borderRadius: 20 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(0, 229, 255, 0.25)', marginBottom: 8 }}>01</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 8 }}>Release Your Music</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Distribute your release with Tunewave or simply grab your existing Spotify or YouTube link to get started.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: 32, borderRadius: 20 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(139, 92, 246, 0.25)', marginBottom: 8 }}>02</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 8 }}>Customise Your Campaign</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Choose your goal (streams, views, or pre-saves), calibrate your audience with similar artists, and set your budget.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: 32, borderRadius: 20 }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(16, 185, 129, 0.25)', marginBottom: 8 }}>03</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 8 }}>Launch & Track</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Our automated ad engine publishes and optimizes your ads across networks while you monitor real-time streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MID-BANNER PROMO */}
      <section style={{ padding: '60px 0', background: 'rgba(0, 229, 255, 0.04)', borderTop: '1px solid var(--tw-line)', borderBottom: '1px solid var(--tw-line)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 650 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              UNIFIED CAMPAIGN ENGINE
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 8, marginBottom: 8 }}>
              Run all your ads in one place.
            </h3>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem' }}>
              Skip the frustration of managing 4 different advertising accounts. Ad Launcher orchestrates everything under one clean dashboard.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('ad-builder');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-cyan"
            style={{ padding: '14px 28px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span>Start Your Campaign</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 6. FAQS ACCORDION */}
      <section style={{ padding: '70px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 10, marginBottom: 8 }}>
              Ad Launcher FAQ
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem' }}>
              Clear answers on pricing, platforms, targeting, and analytics.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {AD_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-panel"
                  style={{
                    borderRadius: 16,
                    border: isOpen ? '1px solid rgba(0, 229, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isOpen ? 'rgba(0, 229, 255, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--tw-text-white)',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: isOpen ? 'var(--tw-cyan)' : 'var(--tw-text-dim)',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      color: 'var(--tw-text-dim)',
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                      paddingTop: 14
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

      {/* 7. BOTTOM CTA BANNER WITH 3D PARALLAX & AMBIENT ANIMATION */}
      <section style={{ padding: '70px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: 1040, position: 'relative', zIndex: 2 }}>
          <div
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="ad-cta-3d-card"
          >
            {/* 3D Background Image Layer with Parallax & Float */}
            <img
              src="/login_background_image/Ready to release background image.png"
              alt="Promote your music release"
              aria-hidden="true"
              className="ad-cta-3d-img"
            />

            {/* Cinematic Radial & Gradient Overlays for rich contrast */}
            <div className="ad-cta-3d-overlay" />
            <div className="ad-cta-3d-glow" />

            {/* Shimmer Sheen Sweep */}
            <div className="ad-cta-sheen" />

            {/* Foreground Content with 3D Depth */}
            <div className="ad-cta-3d-content">
              {/* Badge */}
              <div className="ad-cta-badge">
                <Sparkles size={13} />
                <span>Amplify Your Streaming</span>
              </div>

              <h2 className="ad-cta-title">
                Ready to <span className="ad-cta-gradient-text">promote your release?</span>
              </h2>

              <p className="ad-cta-desc">
                Launch targeted music ads across Spotify and YouTube in minutes. Reach real fans, ignite algorithmic playlists, and build a lasting audience.
              </p>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const el = document.getElementById('ad-builder');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-cyan ad-cta-primary-btn"
                >
                  <span>Launch Ad Campaign</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('/promo')}
                  className="ad-cta-secondary-btn"
                >
                  View Full Promo Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded CSS Styles for 3D Hardware-Accelerated Hero Stage */}
      <style>{`
        /* ── Ad Launcher 3D Hero Stage & Parallax ── */
        .ad-hero-3d-section {
          background: #080b11;
          border-bottom: 1px solid var(--tw-line);
          transition: background 0.3s ease;
        }

        [data-theme="light"] .ad-hero-3d-section {
          background: #f1f7fa;
          border-bottom: 1px solid rgba(0, 126, 167, 0.16);
        }

        .ad-hero-3d-stage {
          position: absolute;
          inset: -8%;
          pointer-events: none;
          z-index: 1;
          transform-style: preserve-3d;
          transform: translate3d(
            calc(var(--ad-tilt-x, 0) * -28px),
            calc(var(--ad-tilt-y, 0) * -18px),
            -35px
          ) rotateX(calc(var(--ad-tilt-y, 0) * 3.2deg)) rotateY(calc(var(--ad-tilt-x, 0) * -4.2deg));
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        @keyframes adHeroAmbientFloat {
          0% {
            transform: scale(1.05) translateY(0px) rotate(0deg);
          }
          50% {
            transform: scale(1.07) translateY(-6px) rotate(0.4deg);
          }
          100% {
            transform: scale(1.05) translateY(0px) rotate(0deg);
          }
        }

        .ad-hero-3d-art {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 50%;
          transform: scale(1.06);
          animation: adHeroAmbientFloat 16s ease-in-out infinite alternate;
          will-change: transform;
        }

        [data-theme="light"] .ad-hero-3d-art {
          filter: brightness(1.02) contrast(1.03) saturate(1.1);
          opacity: 0.96;
        }

        [data-theme="dark"] .ad-hero-3d-art {
          filter: brightness(0.72) contrast(1.2) saturate(1.25) hue-rotate(-5deg);
          opacity: 0.85;
        }

        .ad-hero-3d-atmosphere {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          transition: background 0.4s ease;
        }

        [data-theme="light"] .ad-hero-3d-atmosphere {
          background: 
            radial-gradient(ellipse 70% 75% at 50% 48%, rgba(241, 247, 250, 0.92) 0%, rgba(241, 247, 250, 0.70) 45%, rgba(241, 247, 250, 0.12) 85%),
            linear-gradient(180deg, rgba(241, 247, 250, 0.6) 0%, transparent 20%, transparent 80%, rgba(241, 247, 250, 0.95) 100%);
        }

        [data-theme="dark"] .ad-hero-3d-atmosphere {
          background: 
            radial-gradient(ellipse 65% 72% at 50% 48%, rgba(8, 11, 17, 0.90) 0%, rgba(8, 11, 17, 0.68) 48%, rgba(8, 11, 17, 0.15) 85%),
            linear-gradient(180deg, rgba(8, 11, 17, 0.7) 0%, transparent 20%, transparent 78%, rgba(8, 11, 17, 0.95) 100%);
        }

        .ad-hero-3d-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          opacity: 0.65;
          mix-blend-mode: screen;
          background: radial-gradient(
            650px circle at var(--ad-cursor-x, 50%) var(--ad-cursor-y, 45%),
            rgba(0, 229, 255, 0.22),
            rgba(14, 165, 233, 0.12) 40%,
            transparent 75%
          );
          transition: opacity 0.3s ease;
        }

        [data-theme="light"] .ad-hero-3d-spotlight {
          mix-blend-mode: soft-light;
          background: radial-gradient(
            650px circle at var(--ad-cursor-x, 50%) var(--ad-cursor-y, 45%),
            rgba(0, 126, 167, 0.25),
            rgba(14, 165, 233, 0.15) 45%,
            transparent 70%
          );
        }

        /* Floating 3D badges */
        .ad-hero-float-elem {
          position: absolute;
          pointer-events: none;
          z-index: 4;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .ad-float-1 {
          top: 20%;
          left: 7%;
          transform: translate3d(
            calc(var(--ad-tilt-x, 0) * -36px),
            calc(var(--ad-tilt-y, 0) * -28px),
            55px
          );
          animation: adFloatItem1 6.5s ease-in-out infinite;
        }

        .ad-float-2 {
          top: 22%;
          right: 8%;
          transform: translate3d(
            calc(var(--ad-tilt-x, 0) * 38px),
            calc(var(--ad-tilt-y, 0) * 32px),
            65px
          );
          animation: adFloatItem2 7.5s ease-in-out infinite 0.8s;
        }

        .ad-float-3 {
          bottom: 24%;
          left: 10%;
          transform: translate3d(
            calc(var(--ad-tilt-x, 0) * -26px),
            calc(var(--ad-tilt-y, 0) * 24px),
            45px
          );
          animation: adFloatItem1 8s ease-in-out infinite 1.4s;
        }

        .ad-float-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--tw-line-bright);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35);
        }

        [data-theme="light"] .ad-float-badge {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(0, 126, 167, 0.18);
          box-shadow: 0 10px 25px -5px rgba(0, 126, 167, 0.15);
        }

        @keyframes adFloatItem1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }

        @keyframes adFloatItem2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(14px) rotate(-4deg); }
        }

        /* 3D Elevated Hero Stat Cards */
        .ad-stat-card {
          background: rgba(14, 20, 32, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--tw-line);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ad-stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 229, 255, 0.45);
          box-shadow: 0 16px 36px -8px rgba(0, 229, 255, 0.25);
        }

        .ad-cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.25s ease;
        }

        .ad-cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--tw-cyan) !important;
          transform: translateY(-2px);
        }

        [data-theme="light"] .ad-stat-card {
          background: rgba(255, 255, 255, 0.88) !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 8px 24px rgba(0, 126, 167, 0.06) !important;
        }

        [data-theme="light"] .ad-stat-card:hover {
          border-color: #007EA7 !important;
          box-shadow: 0 16px 36px -8px rgba(0, 126, 167, 0.22) !important;
        }

        [data-theme="light"] .ad-cta-secondary {
          background: #ffffff !important;
          color: #0F172A !important;
          border-color: rgba(0, 0, 0, 0.12) !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .ad-cta-secondary:hover {
          border-color: #007EA7 !important;
        }

        /* ── Why Ad Launcher Section Styles & Animations ── */
        .ad-features-section {
          transition: background 0.3s ease;
        }
        .ad-badge-glow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.35);
          color: #00E5FF;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.25);
        }
        [data-theme="light"] .ad-badge-glow {
          background: rgba(0, 126, 167, 0.08);
          border-color: rgba(0, 126, 167, 0.25);
          color: #007EA7;
          box-shadow: 0 2px 12px rgba(0, 126, 167, 0.12);
        }
        .ad-dot-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00E5FF;
          box-shadow: 0 0 10px #00E5FF;
          animation: adDotPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        [data-theme="light"] .ad-dot-pulse {
          background: #007EA7;
          box-shadow: 0 0 8px #007EA7;
        }
        @keyframes adDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        .ad-heading-accent {
          background: linear-gradient(135deg, #00E5FF 0%, #38BDF8 50%, #2DD4BF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .ad-heading-accent {
          background: linear-gradient(135deg, #007EA7 0%, #0284C7 50%, #0D9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ad-advantage-card {
          position: relative;
          border-radius: 22px;
          padding: 34px 28px;
          overflow: hidden;
          background: rgba(14, 20, 32, 0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 40px -15px rgba(0, 0, 0, 0.5);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          will-change: transform;
        }
        [data-theme="light"] .ad-advantage-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 126, 167, 0.14);
          box-shadow: 0 12px 30px -10px rgba(0, 80, 120, 0.07);
        }
        .ad-advantage-card::after {
          content: '';
          position: absolute;
          top: -60%;
          left: -60%;
          width: 220%;
          height: 220%;
          background: linear-gradient(65deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%);
          transform: translateX(-100%) rotate(25deg);
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        [data-theme="light"] .ad-advantage-card::after {
          background: linear-gradient(65deg, transparent 40%, rgba(0, 126, 167, 0.08) 50%, transparent 60%);
        }
        .ad-advantage-card:hover::after {
          transform: translateX(100%) rotate(25deg);
        }
        .ad-advantage-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .ad-card-cyan:hover {
          border-color: rgba(0, 229, 255, 0.55) !important;
          box-shadow: 0 24px 50px -12px rgba(0, 229, 255, 0.28), 0 0 20px rgba(0, 229, 255, 0.12) !important;
        }
        [data-theme="light"] .ad-card-cyan:hover {
          border-color: #007EA7 !important;
          box-shadow: 0 24px 50px -12px rgba(0, 126, 167, 0.22) !important;
        }
        .ad-card-purple:hover {
          border-color: rgba(168, 85, 247, 0.55) !important;
          box-shadow: 0 24px 50px -12px rgba(168, 85, 247, 0.28), 0 0 20px rgba(168, 85, 247, 0.12) !important;
        }
        [data-theme="light"] .ad-card-purple:hover {
          border-color: #7C3AED !important;
          box-shadow: 0 24px 50px -12px rgba(124, 58, 237, 0.22) !important;
        }
        .ad-card-green:hover {
          border-color: rgba(16, 185, 129, 0.55) !important;
          box-shadow: 0 24px 50px -12px rgba(16, 185, 129, 0.28), 0 0 20px rgba(16, 185, 129, 0.12) !important;
        }
        [data-theme="light"] .ad-card-green:hover {
          border-color: #059669 !important;
          box-shadow: 0 24px 50px -12px rgba(5, 150, 105, 0.22) !important;
        }
        .ad-feature-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
          animation: adIconFloat 4s ease-in-out infinite;
        }
        .ad-advantage-card:hover .ad-feature-icon-wrap {
          transform: scale(1.14) rotate(4deg);
        }
        @keyframes adIconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .ad-icon-cyan {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.18) 0%, rgba(14, 165, 233, 0.12) 100%);
          color: #00E5FF;
          border: 1px solid rgba(0, 229, 255, 0.4);
          box-shadow: 0 0 16px rgba(0, 229, 255, 0.2);
        }
        [data-theme="light"] .ad-icon-cyan {
          background: rgba(0, 126, 167, 0.1);
          color: #007EA7;
          border-color: rgba(0, 126, 167, 0.3);
          box-shadow: 0 2px 10px rgba(0, 126, 167, 0.15);
        }
        .ad-icon-purple {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(139, 92, 246, 0.12) 100%);
          color: #C084FC;
          border: 1px solid rgba(168, 85, 247, 0.4);
          box-shadow: 0 0 16px rgba(168, 85, 247, 0.2);
          animation-delay: 1.3s;
        }
        [data-theme="light"] .ad-icon-purple {
          background: rgba(124, 58, 237, 0.1);
          color: #7C3AED;
          border-color: rgba(124, 58, 237, 0.3);
          box-shadow: 0 2px 10px rgba(124, 58, 237, 0.15);
        }
        .ad-icon-green {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.12) 100%);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
          animation-delay: 2.6s;
        }
        [data-theme="light"] .ad-icon-green {
          background: rgba(5, 150, 105, 0.1);
          color: #059669;
          border-color: rgba(5, 150, 105, 0.3);
          box-shadow: 0 2px 10px rgba(5, 150, 105, 0.15);
        }
        .ad-feature-tag {
          font-size: 0.70rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
        }
        .ad-checklist-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ad-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.84rem;
          font-weight: 600;
          color: #94A3B8;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        [data-theme="light"] .ad-check-item {
          color: #475569;
        }
        .ad-advantage-card:hover .ad-check-item {
          transform: translateX(4px);
        }
        .ad-check-bullet {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .ad-advantage-card:hover .ad-check-bullet {
          transform: scale(1.15);
        }
        .bullet-cyan {
          background: rgba(0, 229, 255, 0.15);
          color: #00E5FF;
          border: 1px solid rgba(0, 229, 255, 0.3);
        }
        [data-theme="light"] .bullet-cyan {
          background: rgba(0, 126, 167, 0.12);
          color: #007EA7;
          border-color: rgba(0, 126, 167, 0.25);
        }
        .bullet-purple {
          background: rgba(168, 85, 247, 0.15);
          color: #C084FC;
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        [data-theme="light"] .bullet-purple {
          background: rgba(124, 58, 237, 0.12);
          color: #7C3AED;
          border-color: rgba(124, 58, 237, 0.25);
        }
        .bullet-green {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        [data-theme="light"] .bullet-green {
          background: rgba(5, 150, 105, 0.12);
          color: #059669;
          border-color: rgba(5, 150, 105, 0.25);
        }

        /* ── Bottom CTA 3D Card with Parallax & Ambient Float ── */
        .ad-cta-3d-card {
          position: relative;
          border-radius: 32px;
          padding: clamp(48px, 6vw, 72px) clamp(24px, 5vw, 60px);
          text-align: center;
          overflow: hidden;
          perspective: 1200px;
          transform-style: preserve-3d;
          transform: perspective(1200px) rotateX(calc(var(--cta-tilt-y, 0) * -5deg)) rotateY(calc(var(--cta-tilt-x, 0) * 6.5deg));
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          will-change: transform;
          background: #080C16;
          border: 1px solid rgba(0, 229, 255, 0.35);
          box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.2);
        }
        [data-theme="light"] .ad-cta-3d-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 126, 167, 0.28);
          box-shadow: 0 25px 65px -15px rgba(0, 126, 167, 0.22), 0 0 35px rgba(0, 126, 167, 0.08);
        }
        .ad-cta-3d-card:hover {
          border-color: rgba(0, 229, 255, 0.7) !important;
          box-shadow: 0 35px 85px -15px rgba(0, 229, 255, 0.35), 0 0 40px rgba(0, 229, 255, 0.25) !important;
        }
        [data-theme="light"] .ad-cta-3d-card:hover {
          border-color: #007EA7 !important;
          box-shadow: 0 35px 80px -12px rgba(0, 126, 167, 0.32), 0 0 40px rgba(0, 126, 167, 0.15) !important;
        }
        .ad-cta-3d-img {
          position: absolute;
          inset: -5%;
          width: 110%;
          height: 110%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.06) translate3d(calc(var(--cta-tilt-x, 0) * -18px), calc(var(--cta-tilt-y, 0) * -14px), -20px);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          animation: adCtaImgFloat 14s ease-in-out infinite alternate;
          will-change: transform;
          user-select: none;
          pointer-events: none;
          opacity: 0.85;
          filter: brightness(0.85) contrast(1.2) saturate(1.25);
        }
        [data-theme="light"] .ad-cta-3d-img {
          opacity: 0.96;
          filter: brightness(1.02) contrast(1.05) saturate(1.08);
        }
        @keyframes adCtaImgFloat {
          0% {
            transform: scale(1.06) translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: scale(1.11) translate3d(-8px, -5px, 0) rotate(0.35deg);
          }
          100% {
            transform: scale(1.06) translate3d(8px, 6px, 0) rotate(-0.3deg);
          }
        }
        .ad-cta-3d-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 75% 75% at 50% 50%, rgba(8, 12, 24, 0.85) 0%, rgba(8, 12, 24, 0.68) 45%, rgba(6, 9, 18, 0.88) 100%), linear-gradient(180deg, rgba(8, 12, 24, 0.4) 0%, rgba(8, 12, 24, 0.65) 100%);
          pointer-events: none;
          z-index: 1;
        }
        [data-theme="light"] .ad-cta-3d-overlay {
          background: radial-gradient(ellipse 75% 75% at 50% 50%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.65) 45%, rgba(240, 248, 255, 0.35) 75%, rgba(230, 242, 255, 0.55) 100%);
        }
        .ad-cta-3d-glow {
          position: absolute;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 80%;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, rgba(168, 85, 247, 0.15) 45%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 2;
          animation: adCtaGlowPulse 6s ease-in-out infinite alternate;
        }
        [data-theme="light"] .ad-cta-3d-glow {
          background: radial-gradient(circle, rgba(0, 126, 167, 0.16) 0%, rgba(56, 189, 248, 0.1) 45%, transparent 70%);
        }
        @keyframes adCtaGlowPulse {
          0% { opacity: 0.6; transform: translateX(-50%) scale(0.95); }
          100% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }
        .ad-cta-sheen {
          position: absolute;
          top: -60%;
          left: -60%;
          width: 220%;
          height: 220%;
          background: linear-gradient(65deg, transparent 40%, rgba(255, 255, 255, 0.12) 50%, transparent 60%);
          transform: translateX(-100%) rotate(25deg);
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 2;
        }
        [data-theme="light"] .ad-cta-sheen {
          background: linear-gradient(65deg, transparent 40%, rgba(0, 126, 167, 0.1) 50%, transparent 60%);
        }
        .ad-cta-3d-card:hover .ad-cta-sheen {
          transform: translateX(100%) rotate(25deg);
        }
        .ad-cta-3d-content {
          position: relative;
          z-index: 3;
          transform: translateZ(35px);
        }
        .ad-cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(0, 229, 255, 0.14);
          border: 1px solid rgba(0, 229, 255, 0.35);
          color: #00E5FF;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.25);
        }
        [data-theme="light"] .ad-cta-badge {
          background: rgba(0, 126, 167, 0.1);
          border-color: rgba(0, 126, 167, 0.28);
          color: #007EA7;
          box-shadow: 0 2px 10px rgba(0, 126, 167, 0.12);
        }
        .ad-cta-title {
          font-size: clamp(2.1rem, 5vw, 3.2rem);
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 16px;
          line-height: 1.2;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.9);
          letter-spacing: -0.02em;
        }
        [data-theme="light"] .ad-cta-title {
          color: #0F172A;
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
        }
        .ad-cta-gradient-text {
          background: linear-gradient(135deg, #00E5FF 0%, #38BDF8 50%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.45));
          text-shadow: none !important;
        }
        [data-theme="light"] .ad-cta-gradient-text {
          background: linear-gradient(135deg, #007EA7 0%, #0284C7 50%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: none;
        }
        .ad-cta-desc {
          font-size: clamp(1rem, 2vw, 1.14rem);
          color: #E2E8F0;
          max-width: 640px;
          margin: 0 auto 36px;
          line-height: 1.65;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
        }
        [data-theme="light"] .ad-cta-desc {
          color: #334155;
          text-shadow: none;
        }
        .ad-cta-primary-btn {
          padding: 16px 36px;
          font-size: 1rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 229, 255, 0.45), 0 0 20px rgba(0, 229, 255, 0.25);
          transition: all 0.25s ease;
        }
        .ad-cta-primary-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 35px rgba(0, 229, 255, 0.6), 0 0 25px rgba(0, 229, 255, 0.35) !important;
        }
        [data-theme="light"] .ad-cta-primary-btn {
          box-shadow: 0 8px 25px rgba(0, 126, 167, 0.3), 0 2px 8px rgba(0, 126, 167, 0.15);
        }
        [data-theme="light"] .ad-cta-primary-btn:hover {
          box-shadow: 0 10px 30px rgba(0, 126, 167, 0.4) !important;
        }
        .ad-cta-secondary-btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
        }
        [data-theme="light"] .ad-cta-secondary-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #0F172A;
          border: 1px solid rgba(0, 126, 167, 0.25);
          box-shadow: 0 4px 15px rgba(0, 80, 120, 0.08);
        }
        .ad-cta-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.16) !important;
          border-color: rgba(0, 229, 255, 0.5) !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 229, 255, 0.2) !important;
        }
        [data-theme="light"] .ad-cta-secondary-btn:hover {
          background: #FFFFFF !important;
          color: #007EA7 !important;
          border-color: #007EA7 !important;
          box-shadow: 0 6px 20px rgba(0, 126, 167, 0.2) !important;
        }
      `}</style>

    </div>
  );
}
