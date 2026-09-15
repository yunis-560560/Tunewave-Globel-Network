import React, { useState } from 'react';
import { 
  Target, Sparkles, ArrowRight, CheckCircle2, ChevronDown, 
  BarChart3, Zap, Layers, Play, ExternalLink, HelpCircle, 
  Sliders, ShieldCheck, DollarSign, Users, Eye, TrendingUp,
  Globe2, Music2, Share2, Compass, Check
} from 'lucide-react';

export default function AdLauncherPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0);

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
      a: "Yes! While TuneWave artists enjoy automatic catalog linking and streamlined one-click setup, Ad Launcher works with any public Spotify track, Apple Music pre-save link, or YouTube video URL regardless of your digital distributor."
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
      
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', padding: '50px 0 80px', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          {/* Eyebrow badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span className="pill-badge" style={{ 
              color: 'var(--tw-cyan)', 
              background: 'rgba(0, 229, 255, 0.12)', 
              border: '1px solid rgba(0, 229, 255, 0.3)' 
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
              className="glass-panel"
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 18,
            maxWidth: 960,
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '-0.02em' }}>Spotify & YT</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Direct Ad Network Access</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-lime)', letterSpacing: '-0.02em' }}>3 Clicks</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Zero Technical Setup</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-sky)', letterSpacing: '-0.02em' }}>100% Real</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Verified Human Listeners</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
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
      <section id="features" style={{ padding: '80px 0', background: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid var(--tw-line)', borderBottom: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              01 · WHY AD LAUNCHER
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 12, marginBottom: 12 }}>
              Built Specifically for Musicians & Labels
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
              Say goodbye to confusing pixel setups, complicated Business Managers, and wasted ad budgets.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28
          }}>
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 34, borderRadius: 20 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(0, 229, 255, 0.12)',
                color: 'var(--tw-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                border: '1px solid rgba(0, 229, 255, 0.3)'
              }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                Targeted at real music fans
              </h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Audiences are pre-built around actual listening habits, favorite subgenres, and related artists. Zero spam clicks or bot farms.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem', color: 'var(--tw-text-dim)', paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="var(--tw-cyan)" /> Lookalike listener modelling
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="var(--tw-cyan)" /> Genre-specific playlist retargeting
                </div>
              </div>
            </div>

            <div className="glass-panel card-shimmer-sweep" style={{ padding: 34, borderRadius: 20 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(139, 92, 246, 0.12)',
                color: 'var(--tw-sky)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                Spotify & YouTube unified
              </h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                One simple dashboard handles ad campaigns across multiple major DSPs and video networks without configuring separate ad managers.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem', color: 'var(--tw-text-dim)', paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="var(--tw-purple)" /> Automated video & audio formatting
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="var(--tw-purple)" /> Multi-channel budget balancing
                </div>
              </div>
            </div>

            <div className="glass-panel card-shimmer-sweep" style={{ padding: 34, borderRadius: 20 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--tw-lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                Live performance dashboard
              </h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Watch your streaming metrics surge with transparent analytics updating in real time, tracking cost per click, stream lift, and playlist adds.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem', color: 'var(--tw-text-dim)', paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="var(--tw-lime)" /> Hourly conversion refresh
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} color="var(--tw-lime)" /> Downloadable PDF campaign recap
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
                Distribute your release with TuneWave or simply grab your existing Spotify or YouTube link to get started.
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

      {/* 7. BOTTOM CTA BANNER */}
      <section style={{ padding: '60px 0 30px' }}>
        <div className="container" style={{ maxWidth: 940 }}>
          <div className="glass-panel" style={{
            padding: 56,
            borderRadius: 28,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(9, 7, 20, 0.95) 50%, rgba(59, 130, 246, 0.1) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.3)'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 14 }}>
              Ready to promote your release?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--tw-text-dim)', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Launch targeted music ads across Spotify and YouTube in minutes. Reach real fans, ignite algorithmic playlists, and build a lasting audience.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const el = document.getElementById('ad-builder');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-cyan"
                style={{ padding: '16px 36px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span>Launch Ad Campaign</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('/promo')}
                className="glass-panel"
                style={{
                  padding: '16px 30px',
                  borderRadius: 12,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--tw-text-white)',
                  cursor: 'pointer',
                  border: '1px solid var(--tw-line)'
                }}
              >
                View Full Promo Packages
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
