import React, { useState } from 'react';
import { 
  Smartphone, ArrowRight, CheckCircle2, TrendingUp, Wallet, Bell, 
  ChevronDown, Star, Radio, Share2, Gift, Disc3, ShieldCheck, 
  Sparkles, Layers, BarChart3, Globe2, Music2, ExternalLink
} from 'lucide-react';

export default function AppPage({ onNavigate, theme }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToDownload = () => {
    const el = document.getElementById('app-download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FAQS = [
    {
      q: "Is the Tunewave app free?",
      a: "Yes. The app is free for everyone on any plan, whether that's Starter, Pro or Labels. No extra fees, no in-app upgrades. Just the perfect companion for Tunewave artists."
    },
    {
      q: "Where can I download the Tunewave app?",
      a: "It's available to download for both Apple and Android."
    },
    {
      q: "Can I release new music from the app?",
      a: "Yes. Upload your audio and artwork, pick your stores and distribute to Spotify, Apple Music, YouTube, Amazon, TikTok and 150+ more platforms, directly from the Tunewave app."
    },
    {
      q: "What data is in the Tunewave app?",
      a: "You'll find stats and real-time data covering streams, royalties and playlist placements."
    },
    {
      q: "Can I withdraw my royalties from the app?",
      a: "Yes. Cash out to your bank in a few taps using the same payout details linked to your account."
    },
    {
      q: "Can I view my playlist placements in the app?",
      a: "Yes! Our app tracks your latest playlist inclusions and how many streams you racked up from each feature."
    }
  ];

  const REVIEWS = [
    {
      name: "Maurizio Fiordaliso",
      meta: "9 June 2026 · France",
      text: "After dealing with frustrating account issues and poor support on a previous platform, making the switch to Tunewave has been a great move for my career."
    },
    {
      name: "rkdigitalmusik",
      meta: "30 May 2026 · UK",
      text: "Tunewave support have been great to help sort out any issues I've had and the platform is good to use with lots of useful functionality. Would I recommend? Yes, definitely!"
    },
    {
      name: "Lighten Letsholo",
      meta: "28 May 2026 · South Africa",
      text: "Tunewave are very friendly, reliable, and professional, with an incredible body of knowledge. You guys are my new home. Thank you Tunewave Team."
    },
    {
      name: "Kyle Butler",
      meta: "14 May 2026 · USA",
      text: "Tunewave made it possible for me to make my dreams a reality. I struggled to get music distributed because of such complex platforms. But not with Tunewave!"
    }
  ];

  return (
    <div style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', padding: '40px 0 80px', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            {/* Left Copy */}
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 126, 167, 0.12)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                  <Smartphone size={13} style={{ marginRight: 4 }} />
                  Tunewave Music App
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                Manage your music <br />
                <span className="text-cyan-gradient">on the move.</span>
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 28,
                maxWidth: '560px'
              }}>
                Unlimited releases, real-time music data, instant payouts, milestone alerts and artist tools, all in one app. Free for every Tunewave member. Available on iOS and Android.
              </p>

              {/* Bullets */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', marginBottom: 36 }}>
                {[
                  "Upload to 150+ music platforms",
                  "Withdraw earnings instantly",
                  "Push alerts for releases & royalties",
                  "Live stats & playlist tracking"
                ].map((bullet, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'rgba(0, 229, 255, 0.15)',
                      border: '1px solid var(--tw-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tw-cyan)' }} />
                    </div>
                    <span style={{ fontSize: '0.92rem', color: 'var(--tw-text-white)', fontWeight: 500 }}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* App Store & Google Play Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <a 
                  href="#app-download" 
                  className="btn-glass"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 22px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'var(--tw-text-white)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.41 2.18-1.21 3.13-.96 1.13-2.13 1.79-3.4 1.7-.16-1.07.41-2.21 1.18-3.06.78-.86 2.07-1.51 3.43-1.77zM21 17.13c-.55 1.27-1.21 2.51-2.05 3.59-.95 1.21-2.06 2.42-3.45 2.43-1.36.02-1.8-.83-3.36-.83-1.55 0-2.04.81-3.32.85-1.34.05-2.36-1.31-3.32-2.51-1.93-2.46-3.41-6.93-1.42-9.94 1-1.49 2.78-2.43 4.69-2.46 1.31-.02 2.55.91 3.36.91.81 0 2.31-1.13 3.9-.97.66.03 2.51.27 3.7 2.04-.09.06-2.21 1.31-2.19 3.92.03 3.11 2.71 4.14 2.74 4.15-.02.07-.42 1.46-1.38 2.82z"/>
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Download on the</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>App Store</div>
                  </div>
                </a>

                <a 
                  href="#app-download" 
                  className="btn-glass"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 22px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'var(--tw-text-white)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="gp_c1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00C6FF"/><stop offset="100%" stopColor="#0072FF"/></linearGradient>
                      <linearGradient id="gp_c2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE000"/><stop offset="100%" stopColor="#FF8A00"/></linearGradient>
                      <linearGradient id="gp_c3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF3A44"/><stop offset="100%" stopColor="#C31162"/></linearGradient>
                      <linearGradient id="gp_c4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00F076"/><stop offset="100%" stopColor="#00B85A"/></linearGradient>
                    </defs>
                    <path d="M3.6 1.8c-.36.4-.6 1.02-.6 1.82v16.76c0 .8.24 1.42.6 1.82l8.2-9.2-8.2-9.2z" fill="url(#gp_c1)"/>
                    <path d="M14.62 14.4 11.8 12l2.82-3.4 4.7 2.7c1.34.78 1.34 2.06 0 2.84l-4.7 2.26z" fill="url(#gp_c2)"/>
                    <path d="M3.6 22.2c.5.56 1.34.62 2.32.06l11.4-6.5-2.7-2.66-11.02 9.1z" fill="url(#gp_c3)"/>
                    <path d="M3.6 1.8 14.62 11.4l2.7-2.66L5.92 1.74c-.98-.56-1.82-.5-2.32.06z" fill="url(#gp_c4)"/>
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Get it on</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Phone Mockup with Floating Data Chips */}
            <div className="reveal-scale" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Outer Glow */}
              <div style={{
                position: 'absolute',
                inset: -20,
                background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(109, 40, 217, 0.1) 50%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0
              }} />

              {/* Interactive Phone Frame */}
              <div className="dark-inverted-section" style={{
                position: 'relative',
                zIndex: 1,
                width: 320,
                maxWidth: '100%',
                borderRadius: 44,
                padding: 12,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))',
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.8), 0 0 40px rgba(0, 229, 255, 0.15)'
              }}>
                <div style={{
                  background: '#090D15',
                  borderRadius: 34,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '20px 16px'
                }}>
                  {/* Dynamic Island / Notch */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <div style={{ width: 80, height: 18, background: '#000000', borderRadius: 20 }} />
                  </div>

                  {/* Phone Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Welcome back,</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: "#FFFFFF" }}>Nova Luna</div>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #00E5FF, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: '0.8rem' }}>
                      NL
                    </div>
                  </div>

                  {/* Balance Widget inside phone */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 126, 167, 0.25), rgba(9, 13, 21, 0.8))',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    borderRadius: 18,
                    padding: '16px',
                    marginBottom: 16
                  }}>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Available Royalties
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: "#FFFFFF", margin: '4px 0 10px', letterSpacing: '-0.02em' }}>
                      $1,512,313
                    </div>
                    <button 
                      onClick={() => alert("Royalty withdrawal initialized directly to your verified bank account.")}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 10,
                        background: '#00E5FF',
                        color: '#090D15',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Withdraw Instantly
                    </button>
                  </div>

                  {/* Streams Activity Graph inside phone */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 18,
                    padding: '14px',
                    marginBottom: 16
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: "#FFFFFF" }}>Total Streams</span>
                      <span style={{ fontSize: '0.72rem', color: '#00E5FF', fontWeight: 700 }}>+12.4%</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>123,450,210</div>
                    
                    {/* Simulated Mini Bar Chart */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 44, paddingTop: 4 }}>
                      {[40, 65, 50, 85, 70, 95, 100].map((val, i) => (
                        <div key={i} style={{ flex: 1, height: `${val}%`, background: i === 6 ? '#00E5FF' : 'rgba(0, 229, 255, 0.35)', borderRadius: 4 }} />
                      ))}
                    </div>
                  </div>

                  {/* Live Track Placements */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: 14, padding: 10 }}>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginBottom: 6 }}>Recent Release</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: '#6D28D9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Music2 size={16} color="#FFF" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: "#FFFFFF" }}>Solaris Horizon</div>
                        <div style={{ fontSize: '0.68rem', color: '#00E5FF' }}>Live on 150+ stores</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Chip 1 (Top-Left): +12.4% Streams */}
              <div 
                className="chip-float card-shimmer-sweep dark-inverted-section"
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: -24,
                  background: 'rgba(9, 13, 21, 0.92)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  borderRadius: 16,
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  zIndex: 2
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0, 229, 255, 0.15)', color: '#00E5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  ↑
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: "#FFFFFF" }}>+12.4%</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Streams this week</div>
                </div>
              </div>

              {/* Floating Chip 2 (Mid-Right): $1,512,313 Available now */}
              <div 
                className="chip-float card-shimmer-sweep dark-inverted-section"
                style={{
                  position: 'absolute',
                  top: '44%',
                  right: -30,
                  background: 'rgba(9, 13, 21, 0.92)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  borderRadius: 16,
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  zIndex: 2,
                  animationDelay: '1.2s'
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0, 229, 255, 0.15)', color: '#00E5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  $
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: "#FFFFFF" }}>$1,512,313</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Available now</div>
                </div>
              </div>

              {/* Floating Chip 3 (Bottom-Left): 123M All stores */}
              <div 
                className="chip-float card-shimmer-sweep dark-inverted-section"
                style={{
                  position: 'absolute',
                  bottom: '8%',
                  left: -20,
                  background: 'rgba(9, 13, 21, 0.92)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(109, 40, 217, 0.4)',
                  borderRadius: 16,
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  zIndex: 2,
                  animationDelay: '2.1s'
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(109, 40, 217, 0.15)', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  ♪
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: "#FFFFFF" }}>123M</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>All stores, 4-11 Aug</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY THE APP SECTION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>WHY THE APP</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              Your music, <span className="text-cyan-gradient">in real time.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Your music career moves fast. The Tunewave app moves with it. Check in any time, get notified when it matters, and never be tied to a desk again.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24
          }}>
            {/* Item 1 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(0, 126, 167, 0.12)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                color: 'var(--tw-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                Live music data
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Streams, downloads, listeners and earnings update the moment they hit.
              </p>
            </div>

            {/* Item 2 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(21, 128, 61, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wallet size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                Cash out anywhere
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Withdraw your royalties straight to your bank in a few taps, wherever you are.
              </p>
            </div>

            {/* Item 3 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(109, 40, 217, 0.12)',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                color: '#A78BFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bell size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                Push when it counts
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Land on a playlist, hit a new milestone or receive a payout? We'll notify you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE ROWS: WHAT YOU GET */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 70 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>WHAT YOU GET</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              Upload, earn &amp; track stats <span className="text-cyan-gradient">with a few taps.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              The Tunewave app is built for how artists actually work. Release from anywhere, check in for the latest data and learn exactly where your music is making an impact.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 70 }}>
            {/* ROW 1: Release Everywhere */}
            <div className="reveal-up glass-panel card-shimmer-sweep" style={{
              padding: '48px 40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#A78BFA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Release everywhere
                </span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-text-white)', margin: '12px 0 16px' }}>
                  Drop new music, wherever you are.
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
                  Distribute to Spotify, Apple Music, YouTube, Amazon, TikTok and every global platform straight from the app. Upload, schedule and manage releases whenever the moment hits.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    "Upload and release on the go",
                    "150+ music stores and platforms",
                    "Schedule releases and check status anytime"
                  ].map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={18} color="#00E5FF" />
                      <span style={{ fontSize: '0.95rem', color: 'var(--tw-text-white)', fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Card */}
              <div className="dark-inverted-section" style={{
                background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.25), #0B0F19)',
                border: '1px solid rgba(167, 139, 250, 0.35)',
                borderRadius: 24,
                padding: 28,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: "#FFFFFF" }}>Release Builder</div>
                  <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 6, background: '#00E5FF', color: '#040D1A', fontWeight: 800 }}>READY TO DROP</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Select Target Stores</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                    {['Spotify', 'Apple Music', 'Amazon', 'TikTok', 'YouTube', 'Tidal', 'Deezer', 'Pandora'].map(s => (
                      <span key={s} style={{ fontSize: '0.78rem', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.3)', color: '#00E5FF', padding: '4px 10px', borderRadius: 8 }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Delivery status: Direct ingestion to 150+ music DSPs scheduled.
                </div>
              </div>
            </div>

            {/* ROW 2: Streaming Data */}
            <div className="reveal-up glass-panel card-shimmer-sweep" style={{
              padding: '48px 40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center'
            }}>
              {/* Visual Card (on left in desktop) */}
              <div className="dark-inverted-section" style={{
                background: 'linear-gradient(135deg, rgba(0, 126, 167, 0.25), #0B0F19)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                borderRadius: 24,
                padding: 28,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                order: 2
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: "#FFFFFF" }}>Live Stream Pulse</div>
                  <span style={{ fontSize: '0.75rem', color: '#00E5FF', fontWeight: 800 }}>LIVE ANALYTICS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                  {[
                    { label: 'Spotify', pct: 64, streams: '78.9M' },
                    { label: 'Apple Music', pct: 22, streams: '27.1M' },
                    { label: 'TikTok / ByteDance', pct: 10, streams: '12.3M' },
                    { label: 'Amazon & Others', pct: 4, streams: '5.1M' }
                  ].map((row, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: "#FFFFFF", marginBottom: 4 }}>
                        <span>{row.label}</span>
                        <span style={{ color: '#00E5FF', fontWeight: 700 }}>{row.streams}</span>
                      </div>
                      <div style={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${row.pct}%`, background: '#00E5FF', borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                  Aggregated globally across all territories. Filtered by 24h cadence.
                </div>
              </div>

              <div style={{ order: 1 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#007EA7', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Streaming data
                </span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-text-white)', margin: '12px 0 16px' }}>
                  Track every stream as it happens.
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
                  Stay ahead of the curve with up-to-date numbers and in-depth analytics across Spotify, Apple Music, YouTube, Amazon, TikTok and 150+ other platforms. Filter by track, store, territory and more.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    "Per-store breakdown",
                    "Per-track and per-release filters",
                    "Week, month, 90-day and year views"
                  ].map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={18} color="#00E5FF" />
                      <span style={{ fontSize: '0.95rem', color: 'var(--tw-text-white)', fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROW 3: Earnings */}
            <div className="reveal-up glass-panel card-shimmer-sweep" style={{
              padding: '48px 40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Earnings
                </span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-text-white)', margin: '12px 0 16px' }}>
                  Cash out your royalties in an instant.
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
                  Get notified when royalties are paid into your account and withdraw to your bank in just a few taps.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    "Live account balance",
                    "Direct bank withdrawals",
                    "Full transaction history"
                  ].map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={18} color="#00E5FF" />
                      <span style={{ fontSize: '0.95rem', color: 'var(--tw-text-white)', fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Card */}
              <div className="dark-inverted-section" style={{
                background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.25), #0B0F19)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: 24,
                padding: 28,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: "#FFFFFF" }}>Royalty Vault</div>
                  <span style={{ fontSize: '0.75rem', color: '#00E5FF', fontWeight: 800 }}>100% ARTIST SHARE</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 18, marginBottom: 16 }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Available For Withdrawal</div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: "#FFFFFF", margin: '6px 0' }}>$1,512,313.40</div>
                  <div style={{ fontSize: '0.75rem', color: '#00E5FF' }}>✓ 0% distribution fee deducted</div>
                </div>
                <button 
                  onClick={() => alert("Payout routed directly to linked checking account.")}
                  className="btn-cyan" 
                  style={{ width: '100%', padding: '12px' }}
                >
                  Withdraw to Bank Account
                </button>
              </div>
            </div>

            {/* ROW 4: Audience */}
            <div className="reveal-up glass-panel card-shimmer-sweep" style={{
              padding: '48px 40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center'
            }}>
              {/* Visual Card (order 2) */}
              <div className="dark-inverted-section" style={{
                background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.25), #0B0F19)',
                border: '1px solid rgba(167, 139, 250, 0.35)',
                borderRadius: 24,
                padding: 28,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                order: 2
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: "#FFFFFF" }}>Top Global Territories</div>
                  <span style={{ fontSize: '0.75rem', color: '#A78BFA', fontWeight: 800 }}>DEMOGRAPHICS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                  {[
                    { country: '🇺🇸 United States', count: '48,200 listeners' },
                    { country: '🇬🇧 United Kingdom', count: '32,150 listeners' },
                    { country: '🇩🇪 Germany', count: '18,400 listeners' },
                    { country: '🇧🇷 Brazil', count: '14,900 listeners' },
                    { country: '🇯🇵 Japan', count: '9,820 listeners' }
                  ].map((row, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, fontSize: '0.85rem', color: "#FFFFFF" }}>
                      <span>{row.country}</span>
                      <span style={{ color: '#00E5FF' }}>{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ order: 1 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#A78BFA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Audience
                </span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-text-white)', margin: '12px 0 16px' }}>
                  Get to know your listeners.
                </h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
                  See where your fans live, what playlists they found you on and which tracks keep them coming back. Take the guesswork out of touring, marketing and plugging your next release.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    "Top countries and cities",
                    "Listener demographics",
                    "In-depth fan data"
                  ].map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={18} color="#A78BFA" />
                      <span style={{ fontSize: '0.95rem', color: 'var(--tw-text-white)', fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AND THERE'S MORE: TOOLKIT GRID */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>AND THERE'S MORE</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              The rest of the toolkit, <span className="text-cyan-gradient">in your pocket.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Playlist tracking, pre-save SmartLinks, artist perks and access to your whole catalog. Everything else Tunewave does best, sized down for a quick check on the go.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24
          }}>
            {/* Card 1 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.24) 0%, rgba(139, 92, 246, 0.08) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(168, 85, 247, 0.30)',
                color: '#C084FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Radio size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                Playlist Tracker
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Know the second your track lands on an editorial or user playlist. Plus how many streams it pulls in.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(14, 165, 233, 0.08) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(0, 229, 255, 0.30)',
                color: '#00E5FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Share2 size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                SmartLinks &amp; Pre-Saves
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Spin up shareable links to your pre-saves and live releases across every platform. All from your phone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.24) 0%, rgba(20, 184, 166, 0.08) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(16, 185, 129, 0.30)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gift size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                Tunewave Perks
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Discounts, opportunities and industry tools, free with your Tunewave membership.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.24) 0%, rgba(234, 88, 12, 0.08) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(249, 115, 22, 0.30)',
                color: '#FB923C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Disc3 size={22} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                Your Back Catalog
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                Check the status of every release and browse your full catalog from anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MID-BANNER */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
            padding: '60px 48px',
            borderRadius: 28,
            background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(9, 13, 21, 0.95))',
            border: '1px solid rgba(167, 139, 250, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 20
          }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              maxWidth: '780px'
            }}>
              Follow your music journey <span className="text-cyan-gradient">as it unfolds.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: '#CBD5E1',
              maxWidth: '620px',
              lineHeight: 1.6
            }}>
              Every stream, every listener, every payout. Tap the app and watch it all happen live from your phone. Free for all Tunewave artists.
            </p>
            <button 
              onClick={scrollToDownload}
              className="btn-cyan"
              style={{
                padding: '16px 36px',
                fontSize: '1.05rem',
                marginTop: 10
              }}
            >
              <span>Get the app</span>
              <ArrowRight size={18} className="btn-icon-hover" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. TRUSTED REVIEWS SECTION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>TRUSTED</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--tw-text-white)'
              }}>
                Don't just take our word <span className="text-cyan-gradient">for it.</span>
              </h2>
            </div>

            {/* Trustpilot Block */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#00B67A', marginBottom: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#00B67A" color="#00B67A" />
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--tw-text-white)' }}>
                  <strong>Great</strong> · 6,257 artist reviews
                </div>
              </div>
              <div style={{ height: 32, width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--tw-text-white)' }}>
                4.2 <span style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)' }}>/ 5</span>
              </div>
            </div>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: 24
          }}>
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="glass-panel card-shimmer-sweep" style={{
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 18
              }}>
                <div>
                  <div style={{ display: 'flex', gap: 3, color: '#00B67A', marginBottom: 14 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#00B67A" color="#00B67A" />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 20 }}>
                    "{rev.text}"
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>{rev.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-muted)' }}>{rev.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-purple)' }}>SUPPORT &amp; FAQS</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                color: 'var(--tw-text-white)'
              }}>
                Frequently asked questions.
              </h2>
              <p style={{ color: 'var(--tw-text-dim)' }}>
                Everything you need to know about the Tunewave companion app.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: '22px 26px',
                    cursor: 'pointer',
                    borderRadius: 16,
                    border: '1px solid var(--tw-line)'
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)', margin: 0 }}>
                      {faq.q}
                    </h3>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: openFaq === i ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ChevronDown
                        size={18}
                        color="var(--tw-cyan)"
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: openFaq === i ? 'rotate(180deg)' : 'none'
                        }}
                      />
                    </div>
                  </div>
                  {openFaq === i && (
                    <p style={{ marginTop: 14, color: 'var(--tw-text-dim)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM DOWNLOAD BANNER */}
      <section id="app-download" style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up glass-panel card-shimmer-sweep dark-inverted-section" style={{
            padding: '60px 48px',
            borderRadius: 32,
            background: 'linear-gradient(135deg, rgba(0, 126, 167, 0.25), rgba(9, 13, 21, 0.95))',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Get the app
              </span>
              <h2 style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: '12px 0 16px'
              }}>
                Take Tunewave with you. <br />
                <span className="text-cyan-gradient">Anywhere.</span>
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#CBD5E1',
                lineHeight: 1.6,
                marginBottom: 32,
                maxWidth: '520px'
              }}>
                Download the app now for free. Sign in with your existing Tunewave info and dive into your account straight from your phone.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <a 
                  href="#app-download" 
                  className="btn-glass"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 26px',
                    borderRadius: 14,
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.41 2.18-1.21 3.13-.96 1.13-2.13 1.79-3.4 1.7-.16-1.07.41-2.21 1.18-3.06.78-.86 2.07-1.51 3.43-1.77zM21 17.13c-.55 1.27-1.21 2.51-2.05 3.59-.95 1.21-2.06 2.42-3.45 2.43-1.36.02-1.8-.83-3.36-.83-1.55 0-2.04.81-3.32.85-1.34.05-2.36-1.31-3.32-2.51-1.93-2.46-3.41-6.93-1.42-9.94 1-1.49 2.78-2.43 4.69-2.46 1.31-.02 2.55.91 3.36.91.81 0 2.31-1.13 3.9-.97.66.03 2.51.27 3.7 2.04-.09.06-2.21 1.31-2.19 3.92.03 3.11 2.71 4.14 2.74 4.15-.02.07-.42 1.46-1.38 2.82z"/>
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Download on the</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>App Store</div>
                  </div>
                </a>

                <a 
                  href="#app-download" 
                  className="btn-glass"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 26px',
                    borderRadius: 14,
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="gp_b1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00C6FF"/><stop offset="100%" stopColor="#0072FF"/></linearGradient>
                      <linearGradient id="gp_b2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE000"/><stop offset="100%" stopColor="#FF8A00"/></linearGradient>
                      <linearGradient id="gp_b3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF3A44"/><stop offset="100%" stopColor="#C31162"/></linearGradient>
                      <linearGradient id="gp_b4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00F076"/><stop offset="100%" stopColor="#00B85A"/></linearGradient>
                    </defs>
                    <path d="M3.6 1.8c-.36.4-.6 1.02-.6 1.82v16.76c0 .8.24 1.42.6 1.82l8.2-9.2-8.2-9.2z" fill="url(#gp_b1)"/>
                    <path d="M14.62 14.4 11.8 12l2.82-3.4 4.7 2.7c1.34.78 1.34 2.06 0 2.84l-4.7 2.26z" fill="url(#gp_b2)"/>
                    <path d="M3.6 22.2c.5.56 1.34.62 2.32.06l11.4-6.5-2.7-2.66-11.02 9.1z" fill="url(#gp_b3)"/>
                    <path d="M3.6 1.8 14.62 11.4l2.7-2.66L5.92 1.74c-.98-.56-1.82-.5-2.32.06z" fill="url(#gp_b4)"/>
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Get it on</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Dual App Screen Preview Visual */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div className="dark-inverted-section" style={{
                width: 280,
                background: '#090D15',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: 36,
                padding: '24px 18px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
              }}>
                <div style={{ width: 60, height: 14, background: '#000', borderRadius: 10, margin: '0 auto 16px' }} />
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Active Account</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: "#FFFFFF", marginBottom: 12 }}>Nova Luna Records</div>
                <div style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.25)', borderRadius: 12, padding: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#00E5FF' }}>Available Royalties</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: "#FFFFFF" }}>$1,512,313</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Live Releases</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00E5FF', marginTop: 4 }}>14 Active · 100% Ingested</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
