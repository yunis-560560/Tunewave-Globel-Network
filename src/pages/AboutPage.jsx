import React, { useState, useRef } from 'react';
import { 
  Building2, Mail, Clock, MapPin, Globe, ShieldCheck, 
  Sparkles, Award, Users, ArrowRight, CheckCircle2, 
  Send, Headphones, Music, Compass, HeartHandshake, Copy, Check
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export default function AboutPage({ onNavigate, theme = 'dark' }) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('distribution');
  const [contactMessage, setContactMessage] = useState('');

  const [heroTilt, setHeroTilt] = useState({ rotX: 0, rotY: 0, posX: 0, posY: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const heroRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setHeroTilt({
      rotX: -y * 14,
      rotY: x * 16,
      posX: -x * 32,
      posY: -y * 22,
    });
    setIsHeroHovered(true);
  };

  const handleHeroMouseLeave = () => {
    setIsHeroHovered(false);
    setHeroTilt({ rotX: 0, rotY: 0, posX: 0, posY: 0 });
  };

  const isLight = theme === 'light';

  const copyEmail = () => {
    navigator.clipboard.writeText(COMPANY_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  const STATS = [
    { value: "150+", label: "Digital Store Destinations", desc: "Global reach to all major DSPs" },
    { value: "100%", label: "Royalty Retention", desc: "Creators keep everything they earn" },
    { value: "2M+", label: "Tracks Distributed", desc: "Powering independent musicians" },
    { value: "Mon-Fri", label: "Dedicated Support", desc: "11:00 AM - 6:00 PM IST" }
  ];

  const PILLARS = [
    {
      icon: Compass,
      title: "Democratized Global Distribution",
      desc: "Delivering your releases to Spotify, Apple Music, TikTok, Instagram, YouTube, Amazon Music, Beatport, and 150+ stores with zero middleman deductions.",
      badge: "GLOBAL REACH"
    },
    {
      icon: ShieldCheck,
      title: "100% Artist Ownership & Rights",
      desc: "You retain 100% of your copyright, master ownership, and streaming earnings. We never lock you into predatory deals or restrict your career freedom.",
      badge: "CREATOR FIRST"
    },
    {
      icon: Sparkles,
      title: "Advanced Rights & Monetization",
      desc: "Comprehensive YouTube Content ID fingerprinting, automated collaborator royalty splits, sync licensing representation, and global publishing collection.",
      badge: "TECH ENGINE"
    },
    {
      icon: Headphones,
      title: "Human, Responsive Artist Care",
      desc: "Real music industry professionals assisting you during active support hours. Fast turnarounds on metadata clearance, ISRCs, and payouts.",
      badge: "DEDICATED SERVICE"
    }
  ];

  return (
    <div style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* ── 1. HERO SECTION WITH 3D BACKGROUND ────────────────────────── */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="about-hero-section"
        style={{ 
          position: 'relative', 
          padding: '60px 0 85px', 
          overflow: 'hidden',
          perspective: 1200
        }}
      >
        {/* 3D Background Image Canvas with Parallax Tilt + Ambient Wave Float */}
        <div 
          className={`about-bg-canvas ${!isHeroHovered ? 'about-bg-ambient-float' : ''}`}
          style={{
            position: 'absolute',
            inset: '-8%',
            width: '116%',
            height: '116%',
            pointerEvents: 'none',
            zIndex: 0,
            transformStyle: 'preserve-3d',
            transform: isHeroHovered 
              ? `perspective(1200px) rotateX(${heroTilt.rotX}deg) rotateY(${heroTilt.rotY}deg) translate3d(${heroTilt.posX}px, ${heroTilt.posY}px, 0) scale(1.12)`
              : undefined,
            transition: isHeroHovered ? 'transform 0.12s ease-out' : 'transform 0.85s cubic-bezier(0.2, 0.8, 0.3, 1)',
            willChange: 'transform'
          }}
        >
          <img 
            src="/about_image_background.png" 
            alt="TuneWave Global Network World Stage" 
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block'
            }}
          />
        </div>

        {/* Ambient Overlays for Depth, Contrast, and Seamless Theme Integration */}
        <div className="about-hero-overlay" style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <span className="pill-badge about-pill" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 126, 167, 0.12)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                <Building2 size={13} style={{ marginRight: 4 }} />
                OFFICIAL COMPANY PROFILE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              marginBottom: 22,
              color: 'var(--tw-text-white)'
            }}>
              About <br />
              <span className="text-cyan-gradient">
                {COMPANY_INFO.name}.
              </span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--tw-text-dim)',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 720,
              margin: '0 auto 36px',
              fontWeight: 500
            }}>
              Tunewave Global Network is an independent digital music distribution and rights management ecosystem. 
              We build next-generation technology to empower creators, recording artists, and independent record labels 
              to release music globally, protect their intellectual property, and maximize their streaming royalties.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 700 }}
              >
                <span>Start Distributing Free</span>
                <ArrowRight size={18} className="btn-icon-hover" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('company-details-card');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-glass"
                style={{ padding: '16px 30px', fontSize: '1rem', fontWeight: 600 }}
              >
                <span>Company Details &amp; Contact</span>
                <ArrowRight size={18} className="btn-icon-hover" />
              </button>
            </div>
          </div>

          {/* Quick Stats Grid with Frosted 3D Glass Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginTop: 64
          }}>
            {STATS.map((stat, i) => (
              <div key={i} className="glass-panel card-shimmer-sweep about-stat-card" style={{
                padding: '24px 20px',
                borderRadius: 18,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--tw-cyan)', marginBottom: 6 }}>
                  {stat.value}
                </div>
                <div className="about-stat-label" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tw-text-white)', marginBottom: 4 }}>
                  {stat.label}
                </div>
                <div className="about-stat-desc" style={{ fontSize: '0.82rem', color: 'var(--tw-text-dim)' }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes about3dAmbientFloat {
            0% {
              transform: perspective(1200px) scale(1.08) translate3d(0px, 0px, 0px) rotate3d(1, 1, 0, 0deg);
            }
            25% {
              transform: perspective(1200px) scale(1.11) translate3d(-14px, -10px, 15px) rotate3d(1, -1, 0, 1.4deg);
            }
            50% {
              transform: perspective(1200px) scale(1.1) translate3d(12px, -14px, 25px) rotate3d(-1, 1, 0, 1.8deg);
            }
            75% {
              transform: perspective(1200px) scale(1.11) translate3d(14px, 8px, 15px) rotate3d(-1, -1, 0, 1.2deg);
            }
            100% {
              transform: perspective(1200px) scale(1.08) translate3d(0px, 0px, 0px) rotate3d(1, 1, 0, 0deg);
            }
          }

          .about-bg-ambient-float {
            animation: about3dAmbientFloat 18s ease-in-out infinite alternate;
          }

          /* Dark Mode Overlay */
          .about-hero-overlay {
            background: 
              radial-gradient(ellipse at 50% 35%, rgba(7, 11, 20, 0.65) 0%, rgba(8, 13, 24, 0.80) 55%, rgba(6, 10, 19, 0.95) 90%),
              linear-gradient(to bottom, rgba(6, 10, 19, 0.35) 0%, transparent 25%, transparent 68%, var(--tw-bg-dark) 100%);
          }

          .about-stat-card {
            background: rgba(9, 14, 26, 0.68) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(0, 229, 255, 0.28) !important;
            box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(0, 229, 255, 0.15) !important;
            transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
          }
          .about-stat-card:hover {
            transform: translateY(-6px) scale(1.02) !important;
            border-color: rgba(0, 229, 255, 0.5) !important;
            box-shadow: 0 22px 50px -10px rgba(0, 229, 255, 0.25) !important;
          }

          /* Light Mode Overrides */
          [data-theme="light"] .about-hero-overlay {
            background: 
              radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.76) 0%, rgba(245, 248, 252, 0.62) 55%, rgba(240, 245, 250, 0.92) 90%),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 25%, transparent 68%, var(--tw-bg-dark) 100%) !important;
          }
          [data-theme="light"] .about-pill {
            background: rgba(0, 126, 167, 0.08) !important;
            border-color: rgba(0, 126, 167, 0.25) !important;
          }
          [data-theme="light"] .about-stat-card {
            background: rgba(255, 255, 255, 0.82) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(0, 163, 196, 0.22) !important;
            box-shadow: 0 16px 36px -10px rgba(0, 126, 167, 0.12) !important;
          }
          [data-theme="light"] .about-stat-card:hover {
            transform: translateY(-6px) scale(1.02) !important;
            border-color: rgba(0, 163, 196, 0.45) !important;
            box-shadow: 0 22px 45px -10px rgba(0, 163, 196, 0.2) !important;
          }
          [data-theme="light"] .about-stat-label {
            color: #0F172A !important;
          }
          [data-theme="light"] .about-stat-desc {
            color: #475569 !important;
          }
        `}</style>
      </section>

      {/* ── 2. OFFICIAL COMPANY PROFILE CARD ──────────────────────── */}
      <section id="company-details-card" style={{ padding: '70px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 126, 167, 0.12)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                VERIFIED HEADQUARTERS &amp; SUPPORT
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--tw-text-white)'
            }}>
              Official Company <span className="text-cyan-gradient">Information</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', maxWidth: 600, margin: '10px auto 0' }}>
              Transparent, registered corporate details and official contact channels.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            alignItems: 'stretch'
          }}>
            {/* Left Main Information Panel */}
            <div className="glass-panel card-shimmer-sweep" style={{
              padding: '40px 36px',
              borderRadius: 24,
              border: '1px solid rgba(0, 229, 255, 0.25)',
              background: isLight ? '#FFFFFF' : 'linear-gradient(145deg, rgba(14, 20, 32, 0.95), rgba(8, 11, 17, 0.95))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 28
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(0, 229, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--tw-cyan)'
                  }}>
                    <Building2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em' }}>
                      REGISTERED ENTITY
                    </div>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--tw-text-white)', margin: 0 }}>
                      {COMPANY_INFO.name}
                    </h3>
                  </div>
                </div>

                <p style={{ color: 'var(--tw-text-dim)', lineHeight: 1.65, fontSize: '0.96rem', marginBottom: 28 }}>
                  Tunewave Global Network operates as a specialized music technology provider enabling creators 
                  across India and internationally to distribute, protect, and monetize music catalog on global DSPs.
                </p>

                {/* Company Details List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Address */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '16px',
                    borderRadius: 14,
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--tw-line)'
                  }}>
                    <MapPin size={20} color="var(--tw-cyan)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 3 }}>
                        Registered Location / Office Address
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--tw-text-white)', lineHeight: 1.55 }}>
                        {COMPANY_INFO.address}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--tw-text-muted)', marginTop: 4 }}>
                        Hyderabad, Telangana · Pincode: {COMPANY_INFO.pincode} · India
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '16px',
                    borderRadius: 14,
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--tw-line)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <Mail size={20} color="var(--tw-cyan)" style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 2 }}>
                          Official Email
                        </div>
                        <a 
                          href={`mailto:${COMPANY_INFO.email}`} 
                          style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--tw-text-white)', textDecoration: 'none' }}
                          className="hover-underline"
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </div>

                    <button 
                      onClick={copyEmail}
                      title="Copy email to clipboard"
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0, 229, 255, 0.1)',
                        border: copied ? '1px solid #22C55E' : '1px solid rgba(0, 229, 255, 0.3)',
                        color: copied ? '#22C55E' : 'var(--tw-cyan)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        cursor: 'pointer'
                      }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  {/* Support Hours */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px',
                    borderRadius: 14,
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--tw-line)'
                  }}>
                    <Clock size={20} color="var(--tw-cyan)" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 2 }}>
                        Support &amp; Operations Hours
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                        {COMPANY_INFO.supportHours} (IST)
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--tw-text-muted)', marginTop: 2 }}>
                        Dedicated technical &amp; artist distribution assistance
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                paddingTop: 20,
                borderTop: '1px solid var(--tw-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: 'var(--tw-text-dim)' }}>
                  <span className="pulse-dot" />
                  <span>Support Status: Active &amp; Accepting Inquiries</span>
                </div>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="btn-cyan"
                  style={{ padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  <Mail size={15} />
                  <span>Email Support Directly</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Contact & Inquiries Card */}
            <div className="glass-panel card-shimmer-sweep" style={{
              padding: '40px 36px',
              borderRadius: 24,
              border: '1px solid var(--tw-line-bright)',
              background: isLight ? '#FFFFFF' : 'rgba(19, 27, 42, 0.65)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>GET IN TOUCH</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                  Send an Inquiry
                </h3>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 24 }}>
                  Have questions about song delivery, copyright claims, or label enterprise partnerships? 
                  Our team is ready to assist you during business hours ({COMPANY_INFO.supportHours}).
                </p>

                {formSent ? (
                  <div style={{
                    padding: '30px 24px',
                    borderRadius: 16,
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    textAlign: 'center',
                    margin: '20px 0'
                  }}>
                    <CheckCircle2 size={40} color="#22C55E" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 6 }}>
                      Inquiry Received!
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--tw-text-dim)', margin: 0 }}>
                      Thank you for contacting Tunewave Global Network. We will respond to your email at our earliest during support hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--tw-text-dim)', marginBottom: 6 }}>
                        YOUR NAME / ARTIST NAME
                      </label>
                      <input 
                        type="text"
                        required
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. DJ Nova / Luna Music"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--tw-line-bright)',
                          color: 'var(--tw-text-white)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--tw-text-dim)', marginBottom: 6 }}>
                        EMAIL ADDRESS
                      </label>
                      <input 
                        type="email"
                        required
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        placeholder="you@domain.com"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--tw-line-bright)',
                          color: 'var(--tw-text-white)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--tw-text-dim)', marginBottom: 6 }}>
                        TOPIC
                      </label>
                      <select 
                        value={contactTopic}
                        onChange={e => setContactTopic(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: isLight ? '#F1F5F9' : 'var(--tw-bg-card)',
                          border: '1px solid var(--tw-line-bright)',
                          color: 'var(--tw-text-white)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="distribution">Music &amp; Video Distribution</option>
                        <option value="royalties">Royalties, Accounting &amp; Payouts</option>
                        <option value="content-id">YouTube Content ID &amp; Claims</option>
                        <option value="publishing">Publishing &amp; Sync Licensing</option>
                        <option value="label">Label &amp; Enterprise Inquiries</option>
                        <option value="other">General Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--tw-text-dim)', marginBottom: 6 }}>
                        MESSAGE
                      </label>
                      <textarea 
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={e => setContactMessage(e.target.value)}
                        placeholder="How can Tunewave Global Network assist your releases?"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 10,
                          background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--tw-line-bright)',
                          color: 'var(--tw-text-white)',
                          fontSize: '0.92rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="btn-cyan"
                      style={{ padding: '14px 28px', fontSize: '0.95rem', fontWeight: 700, marginTop: 6 }}
                    >
                      <span>Submit Inquiry</span>
                      <Send size={16} className="btn-icon-hover" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR PILLARS & MISSION ────────────────────────────────── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>CORE FOUNDATION</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--tw-text-white)'
            }}>
              Why Creators Trust <span className="text-cyan-gradient">Tunewave.</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', maxWidth: 660, margin: '12px auto 0', lineHeight: 1.6 }}>
              Built from the ground up to solve the friction of the legacy music industry with cutting-edge transparency.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24
          }}>
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="glass-panel card-shimmer-sweep" style={{
                  padding: '36px 30px',
                  borderRadius: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16
                }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(0, 229, 255, 0.12)',
                    border: '1px solid rgba(0, 229, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--tw-cyan)'
                  }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                      {pillar.badge}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', margin: '6px 0 10px' }}>
                      {pillar.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.65, margin: 0 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. LOCATION & CAMPUS HIGHLIGHT ──────────────────────────── */}
      <section style={{ padding: '70px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
            padding: '48px 40px',
            borderRadius: 28,
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(14, 165, 233, 0.08) 45%, rgba(8, 11, 17, 0.95) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 36,
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                TECHNOLOGY &amp; OPERATIONS HUB
              </div>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16 }}>
                Based in Hyderabad's Technology Hub.
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7, fontSize: '1.02rem', marginBottom: 24 }}>
                Located in Madhapur, Jubilee Enclave — the vibrant innovation epicentre of Hyderabad, Telangana. 
                Our distributed engineering and artist operations team powers music creators locally and globally.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, color: '#E2E8F0', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={16} color="var(--tw-cyan)" />
                  <span>1-98/3/5/23 To 27, Jubilee Enclave, Madhapur, Shaikpet</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={16} color="var(--tw-cyan)" />
                  <span>Hyderabad, Telangana, India · Pincode: 500081</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={16} color="var(--tw-cyan)" />
                  <span>Operations Schedule: Monday - Friday (11:00 AM - 6:00 PM)</span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              borderRadius: 20,
              padding: '30px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 18
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Globe size={24} color="var(--tw-cyan)" />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>Global Distribution Gateways</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Direct DSP Ingestion Pipeline</div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                From Hyderabad to 150+ international stores, we ensure high fidelity audio encoding, DDEX metadata compliance, and expedited delivery cycles.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="btn-cyan" 
                  style={{ padding: '12px 24px', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
                >
                  <span>Contact {COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CTA BANNER ────────────────────────────────────── */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
            padding: '54px 44px',
            borderRadius: 28,
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.18), rgba(14, 165, 233, 0.1) 40%, rgba(9, 13, 21, 0.95) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            boxShadow: '0 20px 50px -10px rgba(0, 229, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                Join Tunewave Global Network
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                Take your music to the world today.
              </h3>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 700 }}
              >
                <span>Sign up free</span>
                <ArrowRight size={18} className="btn-icon-hover" />
              </button>
              <button 
                onClick={() => onNavigate('/pricing')}
                className="btn-glass"
                style={{ padding: '16px 30px', fontSize: '1rem', fontWeight: 600 }}
              >
                <span>View Plans</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
