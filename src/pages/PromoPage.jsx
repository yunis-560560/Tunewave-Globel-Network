import React, { useState, useRef, useEffect } from 'react';
import { 
  TrendingUp, Sparkles, ArrowRight, CheckCircle2, ChevronDown, 
  Send, Newspaper, Share2, ShieldCheck, Zap, Layers, Play, Pause,
  Star, DollarSign, Calendar, MessageSquare, ExternalLink, HelpCircle, Check,
  ChevronLeft, ChevronRight, Quote, Sliders, Radio, BarChart3, Activity, Award
} from 'lucide-react';

function AnimatedCounter({ end, duration = 1200, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const endNum = typeof end === 'number' ? end : parseInt(end, 10);
    if (isNaN(endNum)) return;
    const startTime = performance.now();
    const step = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * (endNum - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

export default function PromoPage({ onNavigate, theme = 'dark' }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [simTier, setSimTier] = useState(1);

  const isLight = theme === 'light';

  const ctaCardRef = useRef(null);

  // Entrance & scroll observer for 3D flip card animation
  const faqSectionRef = useRef(null);
  const [faqInView, setFaqInView] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkFaqVisibility = () => {
      if (!faqSectionRef.current) return;
      const rect = faqSectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Enter into view: FAQ section top reaches viewport (at 85% of screen height) and is still in view
      const isEntering = rect.top < vh * 0.85 && rect.bottom > 80;

      if (isEntering) {
        setFaqInView(true);
      } else if (rect.top > vh + 60 || rect.bottom < -60) {
        // Reset when user leaves section so it re-triggers the flip upon entering
        setFaqInView(false);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkFaqVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    const obsOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };
    const faqObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setFaqInView(true);
      } else {
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          setFaqInView(false);
        }
      }
    }, obsOptions);

    if (faqSectionRef.current) faqObserver.observe(faqSectionRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    checkFaqVisibility();

    return () => {
      faqObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleCtaMouseMove = (e) => {
    if (!ctaCardRef.current) return;
    const rect = ctaCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = ((x / rect.width) - 0.5) * 2; // -1 to 1
    const normY = ((y / rect.height) - 0.5) * 2; // -1 to 1
    ctaCardRef.current.style.setProperty('--cta-tilt-x', normX.toFixed(3));
    ctaCardRef.current.style.setProperty('--cta-tilt-y', normY.toFixed(3));
    ctaCardRef.current.style.setProperty('--cta-cursor-x', `${((x / rect.width) * 100).toFixed(1)}%`);
    ctaCardRef.current.style.setProperty('--cta-cursor-y', `${((y / rect.height) * 100).toFixed(1)}%`);
  };

  const handleCtaMouseLeave = () => {
    if (!ctaCardRef.current) return;
    ctaCardRef.current.style.setProperty('--cta-tilt-x', '0');
    ctaCardRef.current.style.setProperty('--cta-tilt-y', '0');
    ctaCardRef.current.style.setProperty('--cta-cursor-x', '50%');
    ctaCardRef.current.style.setProperty('--cta-cursor-y', '50%');
  };

  const SIMULATOR_TIERS = [
    {
      name: "Single Debut",
      tag: "STANDARD PROMO",
      price: "$249",
      period: "4-Week Rollout",
      audience: "25K – 45K",
      pitches: 140,
      playlistAdds: "12 – 18",
      pressOutlets: "2 Guaranteed",
      pitchPct: 45,
      reachPct: 40,
      pressPct: 35,
      recommended: "Tunewave Promo ($249)",
      summary: "Ideal for first-time releases, indie singles, and artists looking to seed organic momentum into algorithmic radio."
    },
    {
      name: "Breakthrough Release",
      tag: "MOST POPULAR",
      price: "$399",
      period: "6-Week Rollout",
      audience: "75K – 120K",
      pitches: 220,
      playlistAdds: "25 – 40",
      pressOutlets: "4 Features",
      pitchPct: 78,
      reachPct: 75,
      pressPct: 70,
      recommended: "Tunewave Promo Plus ($399)",
      summary: "Comprehensive multi-platform push with curated playlist pitching, guaranteed press, and managed TikTok/IG ads."
    },
    {
      name: "Global Priority",
      tag: "FLAGSHIP CAMPAIGN",
      price: "$699+",
      period: "8-Week Custom",
      audience: "200K – 450K+",
      pitches: 350,
      playlistAdds: "60 – 100+",
      pressOutlets: "6+ Major Outlets",
      pitchPct: 100,
      reachPct: 100,
      pressPct: 95,
      recommended: "Enterprise Rollout",
      summary: "High-voltage priority rollout for label priority singles, EPs, and international album campaigns."
    }
  ];

  const PROMO_FAQS = [
    {
      q: "What happens after I buy a Promo Campaign?",
      a: "You'll receive a confirmation email with all the information you need to launch your campaign. This includes a link to our Promo Questionnaire where you can share details about yourself, your release, your target audience, and your preferred campaign kickoff date."
    },
    {
      q: "When will my Promo Campaign start?",
      a: "You can start your campaign at any time within 12 months of purchase. Just let us know your target release date on the questionnaire and our dedicated campaign managers will be in touch in the lead-up to your kickoff."
    },
    {
      q: "Should I choose Promo or Promo Plus?",
      a: "It depends on your goals and budget. Our standard Promo campaign provides an effective 4-week marketing push across playlisting, PR, and custom graphics. Promo Plus gives you a full 6-week campaign with managed TikTok and Instagram paid ad spend, making it ideal for high-priority single or album rollouts."
    },
    {
      q: "Do you guarantee playlist placements?",
      a: "We never make fake guarantees — no honest, legitimate promotion team can promise algorithmic or editorial placements without breaching platform policies. What we do guarantee is that your track is pitched directly to our active network of verified tastemakers and independent curators, and we guarantee at least two published online press/blog features regardless of playlist outcomes."
    },
    {
      q: "Will I keep my royalties?",
      a: "Yes — 100% of your royalties stay yours forever. Tunewave Promo is a flat-fee marketing service, not a label contract. We never take any percentage of your master royalties, streaming income, or publishing rights."
    },
    {
      q: "Which genres do you work with?",
      a: "We run campaigns across hip-hop, trap, indie rock, pop, electronic/dance, R&B, afrobeats, latin, country, jazz, classical, and experimental. Every campaign is custom-built around your specific genre aesthetics and subculture audiences."
    },
    {
      q: "Can I get a refund?",
      a: "If you haven't returned your campaign questionnaire yet, you can request a 100% full refund at any time. Once our design, copywriting, and PR teams have begun production, we cannot refund the labor performed, but our team will work closely with you to ensure you are delighted with the deliverables."
    },
    {
      q: "How do I keep track of my campaign?",
      a: "Your dedicated Promo Manager will reach out prior to launch and maintain regular direct contact via email or WhatsApp. You will review and approve all press releases and promo graphics before they go live, and receive detailed weekly analytics reports tracking stream velocity, playlist adds, and ad engagement."
    }
  ];

  const MARQUEE_ITEMS = [
    "Editorial Playlist Pitching", "Online Press Campaign", "Social Media Strategy", 
    "Spotify · Apple · Tidal", "TikTok & Instagram Ads", "PR & Playlisting Guide", 
    "Curator Network Access", "Weekly Analytics Reports", "Dedicated Promo Manager",
    "Custom Promo Graphics", "Video Teaser Edits", "Priority Support"
  ];

  const REVIEWS = [
    {
      name: "Julio Estrada",
      country: "US",
      role: "Hip-Hop Artist",
      badge: "Playlist Growth",
      stat: "+18 Tastemaker Adds",
      avatar: "JE",
      avatarBg: "linear-gradient(135deg, #00E5FF, #007EA7)",
      accent: "#00E5FF",
      text: "Since I started music in 2023 Tunewave has definitely made this journey worth it. The promo package landed my track on two major music blogs and three tastemaker playlists right on release week."
    },
    {
      name: "David Brooks",
      country: "GB",
      role: "Indie-Rock Producer",
      badge: "PR & Press",
      stat: "2 Major Blog Features",
      avatar: "DB",
      avatarBg: "linear-gradient(135deg, #10B981, #059669)",
      accent: "#10B981",
      text: "Working with the Promo team has been exceptional. As an independent artist, having a dedicated PR manager draft my press release and handle curator pitching gave my track the credibility it needed."
    },
    {
      name: "Odjugo Godbless",
      country: "NG",
      role: "Afrobeats Creator",
      badge: "Social Ads",
      stat: "+12.4K New Listeners",
      avatar: "OG",
      avatarBg: "linear-gradient(135deg, #F59E0B, #D97706)",
      accent: "#F59E0B",
      text: "My experience with the Promo campaign was phenomenal! The TikTok and Instagram ads they set up brought in thousands of real new followers and listeners across Spotify."
    },
    {
      name: "Christina Matovu",
      country: "GB",
      role: "Soul / R&B Singer",
      badge: "Full Rollout",
      stat: "Release Day Feature",
      avatar: "CM",
      avatarBg: "linear-gradient(135deg, #A855F7, #7C3AED)",
      accent: "#A855F7",
      text: "The whole team pushed through with incredible energy. The custom graphics pack and social rollout schedule kept my audience engaged for weeks after release day."
    },
    {
      name: "Franco Albertini",
      country: "US",
      role: "Electronic Producer",
      badge: "Curator Direct",
      stat: "Top 50 Dance Adds",
      avatar: "FA",
      avatarBg: "linear-gradient(135deg, #EC4899, #DB2777)",
      accent: "#EC4899",
      text: "I worked with Tunewave on a PROMO campaign which gave me so many valuable insights on how to build momentum and pitch directly to curators. Highly recommended!"
    }
  ];

  const heroRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current.style.setProperty('--tilt-x', x.toFixed(3));
    heroRef.current.style.setProperty('--tilt-y', y.toFixed(3));
    heroRef.current.style.setProperty('--cursor-x', `${(e.clientX - rect.left).toFixed(0)}px`);
    heroRef.current.style.setProperty('--cursor-y', `${(e.clientY - rect.top).toFixed(0)}px`);
  };

  const handleHeroMouseLeave = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--tilt-x', '0');
    heroRef.current.style.setProperty('--tilt-y', '0');
  };

  return (
    <div className="promo-page" style={{ paddingTop: 0, paddingBottom: 100 }}>
      {/* 1. HERO SECTION WITH 3D ANIMATED BACKGROUND */}
      <section 
        ref={heroRef}
        className="promo-hero-wrapper"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* 3D Animated Background Art Stage */}
        <div className="promo-3d-stage">
          <img 
            src="/Music%20Promotion%20background%20image.png" 
            alt="Music Promotion Background 3D" 
            className="promo-3d-bg-art"
          />
        </div>

        {/* 3D Atmospheric Depth & Readability Masks */}
        <div className="promo-3d-atmosphere" />

        {/* 3D Dynamic Interactive Cursor Spotlight */}
        <div className="promo-3d-spotlight" />

        {/* 3D Floating Holographic Elements */}
        <div className="promo-3d-float-layer">
          <div className="promo-3d-item promo-3d-note-1">
            <div className="promo-glyph-badge">♪</div>
          </div>
          <div className="promo-3d-item promo-3d-note-2">
            <div className="promo-glyph-badge">♫</div>
          </div>
          <div className="promo-3d-item promo-3d-note-3">
            <div className="promo-glyph-badge">♬</div>
          </div>
          <div className="promo-3d-orb-1" />
          <div className="promo-3d-orb-2" />
        </div>

        <div className="container promo-hero-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 54, alignItems: 'center' }}>
            <div className="promo-hero-text-col">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ 
                  color: 'var(--tw-cyan)', 
                  background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0, 229, 255, 0.12)', 
                  border: isLight ? '1px solid rgba(0, 126, 167, 0.25)' : '1px solid rgba(0, 229, 255, 0.3)' 
                }}>
                  <TrendingUp size={13} style={{ marginRight: 4 }} />
                  ARTIST MARKETING SUITE
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                <em>Music Promotion</em> <br />
                <span className="promo-gradient-title">
                  Made Easy.
                </span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                Playlisting. Online press. Social strategy. Sponsored ads and custom graphics. Launch a high-impact, budget-friendly music marketing campaign managed by our in-house team.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <a 
                  href="#campaigns"
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span>Start your campaign</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </a>

                <span style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', maxWidth: '250px', lineHeight: 1.45 }}>
                  Lock your campaign in now. <strong style={{ color: 'var(--tw-text-white)' }}>Launch anytime in the next 12 months.</strong>
                </span>
              </div>

              {/* Trust Metric Strip */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 24, 
                marginTop: 40, 
                paddingTop: 20, 
                borderTop: '1px solid var(--tw-line)' 
              }}>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--tw-cyan)' }}>2 Guaranteed</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', fontWeight: 500 }}>Online Press Features</div>
                </div>
                <div style={{ height: 30, width: 1, background: 'var(--tw-line)' }} />
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)' }}>100%</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', fontWeight: 500 }}>Keep Your Royalties</div>
                </div>
                <div style={{ height: 30, width: 1, background: 'var(--tw-line)' }} />
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: isLight ? '#7C3AED' : 'var(--tw-purple)' }}>1-on-1</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', fontWeight: 500 }}>Dedicated Publicist</div>
                </div>
              </div>
            </div>

            {/* Hero Dashboard Preview Card with 3D Depth */}
            <div className="promo-hero-interactive-card">
              <div className="glass-panel card-shimmer-sweep" style={{
                borderRadius: 24,
                padding: '36px 32px',
                border: isLight ? '1px solid rgba(0, 126, 167, 0.22)' : '1px solid rgba(0, 229, 255, 0.25)',
                background: isLight 
                  ? 'radial-gradient(circle at top right, rgba(0, 126, 167, 0.08), #FFFFFF)' 
                  : 'radial-gradient(circle at top right, rgba(0, 229, 255, 0.12), rgba(9, 13, 21, 0.98))',
                boxShadow: isLight 
                  ? '0 20px 50px -15px rgba(0, 126, 167, 0.15)' 
                  : '0 30px 60px -20px rgba(0, 0, 0, 0.8)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                      CAMPAIGN COMMAND CENTER
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: "var(--tw-text-white)" }}>
                      Release Traction Monitor
                    </div>
                  </div>
                  <span className="pill-badge" style={{ 
                    background: 'rgba(34, 197, 94, 0.15)', 
                    color: '#16A34A', 
                    borderColor: 'rgba(34, 197, 94, 0.3)',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span className="promo-radar-ping" />
                    <span>ACTIVE PROMO</span>
                    <div className="promo-equalizer-bars">
                      <span className="promo-eq-bar bar-1" />
                      <span className="promo-eq-bar bar-2" />
                      <span className="promo-eq-bar bar-3" />
                      <span className="promo-eq-bar bar-4" />
                    </div>
                  </span>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
                  <div style={{ 
                    padding: '16px', 
                    borderRadius: 14, 
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--tw-line)' 
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Curator Pitches</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--tw-cyan)', marginTop: 4 }}>
                      <AnimatedCounter end={142} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: 2, fontWeight: 600 }}>+18 playlist adds</div>
                  </div>
                  <div style={{ 
                    padding: '16px', 
                    borderRadius: 14, 
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--tw-line)' 
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Press Coverage</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)', marginTop: 4 }}>
                      <AnimatedCounter end={4} suffix=" Outlets" />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: 2, fontWeight: 600 }}>2 Features Published</div>
                  </div>
                </div>

                {/* Recent Campaign Milestones */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)', 
                    border: '1px solid var(--tw-line)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} />
                      <span style={{ fontSize: '0.85rem', color: "var(--tw-text-white)", fontWeight: 500 }}>Press Release distributed to 350+ music writers</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#059669' : 'var(--tw-lime)', fontWeight: 700 }}>COMPLETED</span>
                  </div>

                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)', 
                    border: '1px solid var(--tw-line)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color="var(--tw-cyan)" />
                      <span style={{ fontSize: '0.85rem', color: "var(--tw-text-white)", fontWeight: 500 }}>TikTok & Instagram video ads launched</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--tw-cyan)', fontWeight: 700 }}>
                      LIVE (<AnimatedCounter end={3400} suffix=" CLICKS" />)
                    </span>
                  </div>

                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)', 
                    border: '1px solid var(--tw-line)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color={isLight ? '#7C3AED' : 'var(--tw-purple)'} />
                      <span style={{ fontSize: '0.85rem', color: "var(--tw-text-white)", fontWeight: 500 }}>Spotify editorial & independent pitching</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#7C3AED' : 'var(--tw-purple)', fontWeight: 700 }}>IN PROGRESS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE STRIP (Continuous Right-to-Left Scroll) */}
      <section 
        className="promo-marquee-section"
        style={{
          position: 'relative',
          padding: '16px 0',
          background: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.015)',
          borderTop: '1px solid var(--tw-line)',
          borderBottom: '1px solid var(--tw-line)',
          overflow: 'hidden'
        }}
      >
        <div 
          className="promo-marquee-wrapper"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)'
          }}
        >
          <div className="promo-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <div 
                key={idx} 
                className="promo-marquee-chip"
              >
                <span className="promo-marquee-dot" />
                <span className="promo-marquee-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO: WHAT DO YOU GET? */}
      <section id="campaigns" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ 
                color: isLight ? '#059669' : 'var(--tw-lime)', 
                borderColor: isLight ? 'rgba(5, 150, 105, 0.35)' : 'var(--tw-lime)' 
              }}>
                WHAT DO YOU GET?
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              Everything in a <br />
              <span style={{ color: 'var(--tw-cyan)' }}>Tunewave Promo campaign.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Engineered by industry publicists to get your songs onto real playlists, blogs, and feeds.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24
          }}>
            {/* 1. Playlist Pitching */}
            <div className="glass-panel card-shimmer-sweep promo-bento-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div className="promo-bento-icon-box promo-icon-send" style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(14, 165, 233, 0.08) 100%)',
                  border: '1px solid rgba(0, 229, 255, 0.38)',
                  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(0, 229, 255, 0.30)',
                  color: '#00E5FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Send size={22} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#00E5FF', letterSpacing: '0.06em', background: 'rgba(0,229,255,0.12)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)' }}>
                  PLAYLISTS
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Playlist Pitching</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We'll pitch your track to our active network of playlist curators across Spotify, Apple Music, Tidal and YouTube Music.
              </p>
            </div>

            {/* 2. Online Press */}
            <div className="glass-panel card-shimmer-sweep promo-bento-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div className="promo-bento-icon-box" style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.08) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.38)',
                  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(16, 185, 129, 0.30)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Newspaper size={22} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.06em', background: 'rgba(16,185,129,0.12)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(16,185,129,0.25)' }}>
                  PR & PRESS
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Online Press</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Close relationships with bloggers and journalists let us secure at least two online features or reviews — guaranteed.
              </p>
            </div>

            {/* 3. Social Strategy */}
            <div className="glass-panel card-shimmer-sweep promo-bento-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div className="promo-bento-icon-box" style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.22) 0%, rgba(225, 29, 72, 0.08) 100%)',
                  border: '1px solid rgba(244, 63, 94, 0.38)',
                  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(244, 63, 94, 0.30)',
                  color: '#F43F5E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Share2 size={22} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F43F5E', letterSpacing: '0.06em', background: 'rgba(244,63,94,0.12)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(244,63,94,0.25)' }}>
                  SOCIAL
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Social Strategy</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                A tailored Instagram and TikTok posting plan written by our social team and designed to grow your reach in your genre.
              </p>
            </div>

            {/* 4. Risk-Free Promo Guarantee Card */}
            <div className="glass-panel card-shimmer-sweep promo-bento-card" style={{
              borderRadius: 20,
              padding: 32,
              border: isLight ? '1px solid rgba(5, 150, 105, 0.35)' : '1px solid rgba(163, 230, 53, 0.3)',
              background: isLight 
                ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.07), #FFFFFF)' 
                : 'linear-gradient(135deg, rgba(163, 230, 53, 0.08), rgba(9, 13, 21, 0.95))'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ 
                  width: 38, 
                  height: 38, 
                  borderRadius: '50%', 
                  background: isLight ? '#059669' : 'var(--tw-lime)', 
                  color: isLight ? '#FFFFFF' : '#090D15', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 900 
                }}>
                  <Check size={18} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)" }}>Risk-Free Promo</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--tw-text-dim)', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Keep 100% of your royalties
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Start anytime within 12 months
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Pay over 3 months at 0%
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Cancel anytime before kickoff
                </li>
              </ul>
            </div>

            {/* 5. Paid Ad Campaign */}
            <div className="glass-panel card-shimmer-sweep promo-bento-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div className="promo-bento-icon-box promo-icon-zap" style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.24) 0%, rgba(139, 92, 246, 0.08) 100%)',
                  border: '1px solid rgba(167, 139, 250, 0.38)',
                  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(167, 139, 250, 0.30)',
                  color: '#A78BFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap size={22} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#A78BFA', letterSpacing: '0.06em', background: 'rgba(167,139,250,0.12)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(167,139,250,0.25)' }}>
                  PROMO+ EXCLUSIVE
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Paid Ad Campaign</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Carefully-targeted TikTok and Instagram ads pushing your release to new listeners. Only available with Promo Plus.
              </p>
            </div>

            {/* 6. Priority Distro & Support */}
            <div className="glass-panel card-shimmer-sweep promo-bento-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div className="promo-bento-icon-box" style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(6, 182, 212, 0.08) 100%)',
                  border: '1px solid rgba(0, 229, 255, 0.38)',
                  boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(0, 229, 255, 0.30)',
                  color: '#00E5FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#00E5FF', letterSpacing: '0.06em', background: 'rgba(0,229,255,0.12)', padding: '4px 10px', borderRadius: 9999, border: '1px solid rgba(0,229,255,0.25)' }}>
                  PRIORITY
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Priority Distro & Support</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Your release goes to stores super-fast. You also skip the queue and speak directly to the promo team whenever you need us.
              </p>
            </div>
          </div>

          {/* INTERACTIVE CAMPAIGN REACH SIMULATOR */}
          <div className="promo-sim-container glass-panel card-shimmer-sweep" style={{
            marginTop: 64,
            background: isLight 
              ? 'radial-gradient(ellipse at top left, rgba(0, 126, 167, 0.08) 0%, #FFFFFF 85%)'
              : 'radial-gradient(ellipse at top left, rgba(0, 229, 255, 0.12) 0%, rgba(14, 20, 32, 0.96) 85%)',
            border: isLight ? '1px solid rgba(0, 126, 167, 0.28)' : '1px solid rgba(0, 229, 255, 0.3)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20, marginBottom: 32 }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>
                    <Sliders size={13} style={{ marginRight: 4 }} />
                    INTERACTIVE CAMPAIGN CALCULATOR
                  </span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 900, color: 'var(--tw-text-white)' }}>
                  Simulate Your Release Trajectory
                </h3>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.95rem', marginTop: 4 }}>
                  Compare potential audience reach, playlist adds, and curator pitches across rollout tiers.
                </p>
              </div>

              {/* Tier Toggle Tabs */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {SIMULATOR_TIERS.map((tier, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSimTier(idx)}
                    className={`promo-sim-tab-btn ${simTier === idx ? 'active' : ''}`}
                  >
                    <span>{tier.name}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 800 }}>({tier.price})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Output Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 28 }}>
              <div style={{ padding: '22px', borderRadius: 16, background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Est. Potential Listeners</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--tw-cyan)', margin: '6px 0' }}>
                  {SIMULATOR_TIERS[simTier].audience}
                </div>
                <div className="promo-sim-progress-track">
                  <div className="promo-sim-progress-fill" style={{ width: `${SIMULATOR_TIERS[simTier].reachPct}%`, background: 'var(--tw-cyan)' }} />
                </div>
              </div>

              <div style={{ padding: '22px', borderRadius: 16, background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Curator Direct Pitches</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)', margin: '6px 0' }}>
                  <AnimatedCounter end={SIMULATOR_TIERS[simTier].pitches} suffix="+" />
                </div>
                <div className="promo-sim-progress-track">
                  <div className="promo-sim-progress-fill" style={{ width: `${SIMULATOR_TIERS[simTier].pitchPct}%`, background: isLight ? '#059669' : 'var(--tw-lime)' }} />
                </div>
              </div>

              <div style={{ padding: '22px', borderRadius: 16, background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Expected Playlist Adds</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: isLight ? '#7C3AED' : 'var(--tw-purple)', margin: '6px 0' }}>
                  {SIMULATOR_TIERS[simTier].playlistAdds}
                </div>
                <div className="promo-sim-progress-track">
                  <div className="promo-sim-progress-fill" style={{ width: `${SIMULATOR_TIERS[simTier].pitchPct * 0.9}%`, background: isLight ? '#7C3AED' : 'var(--tw-purple)' }} />
                </div>
              </div>

              <div style={{ padding: '22px', borderRadius: 16, background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Press & Blog Features</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F43F5E', margin: '6px 0' }}>
                  {SIMULATOR_TIERS[simTier].pressOutlets}
                </div>
                <div className="promo-sim-progress-track">
                  <div className="promo-sim-progress-fill" style={{ width: `${SIMULATOR_TIERS[simTier].pressPct}%`, background: '#F43F5E' }} />
                </div>
              </div>
            </div>

            {/* Bottom Recommendation Strip */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 24px',
              borderRadius: 16,
              background: isLight ? 'rgba(0, 126, 167, 0.06)' : 'rgba(0, 229, 255, 0.06)',
              border: isLight ? '1px solid rgba(0, 126, 167, 0.18)' : '1px solid rgba(0, 229, 255, 0.2)',
              gap: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Sparkles size={20} color="var(--tw-cyan)" />
                <span style={{ fontSize: '0.95rem', color: 'var(--tw-text-white)' }}>
                  Recommended: <strong style={{ color: 'var(--tw-cyan)' }}>{SIMULATOR_TIERS[simTier].recommended}</strong>
                  <span style={{ color: 'var(--tw-text-dim)', marginLeft: 8 }}>— {SIMULATOR_TIERS[simTier].summary}</span>
                </span>
              </div>

              <a
                href="#pricing"
                className="btn-cyan"
                style={{
                  padding: '10px 24px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>View packages</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING & PACKAGES SECTION */}
      <section id="pricing" style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                OUR PROMO PACKAGES
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              We know music marketing inside out. <br />
              <span style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }}>Pick the campaign that fits.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, maxWidth: '960px', margin: '0 auto' }}>
            {/* Standard Promo */}
            <div className="glass-panel card-shimmer-sweep promo-standard-card" style={{
              borderRadius: 24,
              padding: 40,
              border: '1px solid var(--tw-line)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em' }}>
                  STANDARD CAMPAIGN
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: "var(--tw-text-white)", margin: '8px 0 16px' }}>Tunewave Promo</h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: "var(--tw-text-white)" }}>$249</span>
                  <span style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', fontWeight: 500 }}>One-time · 4 week campaign</span>
                </div>

                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 28 }}>
                  <strong style={{ color: 'var(--tw-text-white)' }}>4 week</strong> all-in-one campaign for artists who want an affordable and effective music marketing package.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.92rem', color: 'var(--tw-text-dim)' }}>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> 4-week structured campaign</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Playlist pitching across curators</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> 2 guaranteed online blog features</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Press release written & distributed</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Tailored Instagram & TikTok plan</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> PR & playlisting strategy guide</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Custom graphics pack + 2 promo videos</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Campaign reports & analytics</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Priority distro & team support</li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  fontSize: '1rem', 
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <span>Start your campaign</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Promo Plus (Featured) */}
            <div className="glass-panel card-shimmer-sweep promo-featured-card" style={{
              borderRadius: 24,
              padding: 40,
              border: isLight ? '2px solid #059669' : '2px solid var(--tw-lime)',
              background: isLight 
                ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.06), #FFFFFF)' 
                : 'linear-gradient(135deg, rgba(163, 230, 53, 0.08), rgba(9, 13, 21, 0.98))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'visible'
            }}>
              <span style={{
                position: 'absolute',
                top: -14,
                right: 32,
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                padding: '6px 14px',
                borderRadius: 20,
                background: isLight ? '#059669' : 'var(--tw-lime)',
                color: isLight ? '#FFFFFF' : '#090D15',
                boxShadow: isLight ? '0 0 16px rgba(5, 150, 105, 0.4)' : '0 0 20px rgba(163, 230, 53, 0.4)'
              }}>
                MOST POPULAR
              </span>

              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isLight ? '#059669' : 'var(--tw-lime)', letterSpacing: '0.08em' }}>
                  ACCELERATED ROLLOUT
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: "var(--tw-text-white)", margin: '8px 0 16px' }}>Tunewave Promo Plus</h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)' }}>$399</span>
                  <span style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', fontWeight: 500 }}>One-time · 6 week campaign</span>
                </div>

                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
                  <strong style={{ color: 'var(--tw-text-white)' }}>Everything in Promo, plus</strong> two extra weeks of marketing, paid advertising management, and dedicated publicist care.
                </p>

                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isLight ? '#059669' : 'var(--tw-lime)', marginBottom: 12, textTransform: 'uppercase' }}>
                  Everything in Promo, plus:
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.92rem', color: 'var(--tw-text-dim)' }}>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> 6 Week Campaign (vs 4)
                  </li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> TikTok & Instagram Ad Campaign Management
                  </li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Dedicated paid-ads manager & creative testing
                  </li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Tunewave Pro Perks & Label Submission Review
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  background: isLight 
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                    : 'linear-gradient(135deg, var(--tw-lime) 0%, #15803D 100%)',
                  color: isLight ? '#FFFFFF' : '#090D15',
                  border: 'none',
                  boxShadow: isLight 
                    ? '0 10px 25px -8px rgba(5, 150, 105, 0.4)' 
                    : '0 10px 30px -8px rgba(163, 230, 53, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <span>Start your campaign</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 32, color: 'var(--tw-text-dim)', fontSize: '0.9rem' }}>
            *Spread the cost over <strong style={{ color: 'var(--tw-text-white)' }}>3 months with 0% interest</strong> with flexible checkout.
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              How do we <br />
              <span style={{ color: 'var(--tw-cyan)' }}>do it?</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div className="glass-panel card-shimmer-sweep promo-step-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div className="promo-step-num" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--tw-cyan)', fontFamily: 'monospace', marginBottom: 12 }}>01</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Get To Know You</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Before we get started, we'll take time to learn all about you and your music. Once we've got all the info to maximise your promo potential, we get to work on your campaign.
              </p>
            </div>

            <div className="glass-panel card-shimmer-sweep promo-step-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div className="promo-step-num" style={{ fontSize: '2rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)', fontFamily: 'monospace', marginBottom: 12 }}>02</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Develop Your Brand</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Now it's time to pitch your music to our network of playlist curators, music bloggers and journalists. We'll also create your custom social schedule, promo graphics, and ads.
              </p>
            </div>

            <div className="glass-panel card-shimmer-sweep promo-step-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div className="promo-step-num" style={{ fontSize: '2rem', fontWeight: 900, color: isLight ? '#7C3AED' : 'var(--tw-purple)', fontFamily: 'monospace', marginBottom: 12 }}>03</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Achieve Real Results</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We pitch your music to verified independent playlist curators. Plus our direct relationships with tastemakers secure you at least two published blog writeups.
              </p>
            </div>

            <div className="glass-panel card-shimmer-sweep promo-step-card" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div className="promo-step-num" style={{ fontSize: '2rem', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace', marginBottom: 12 }}>04</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Help You DIY</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We know the show goes on after your campaign is over, so we give you weekly reports, curator feedback, and our exclusive PR and playlisting handbook to keep growing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ARTIST REVIEWS (Right-to-Left Continuous Marquee Ribbon) */}
      <section 
        className="promo-reviews-section"
        style={{ 
          padding: '84px 0 76px', 
          borderTop: '1px solid var(--tw-line)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ 
                color: isLight ? '#059669' : 'var(--tw-lime)', 
                borderColor: isLight ? 'rgba(5, 150, 105, 0.35)' : 'var(--tw-lime)' 
              }}>
                <Sparkles size={13} style={{ marginRight: 4 }} />
                VERIFIED ARTIST EXPERIENCES
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: 'var(--tw-text-white)', lineHeight: 1.15 }}>
              What our artists <span style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }}>say.</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem', marginTop: 10 }}>
              Real campaign outcomes from independent musicians, producers, and labels growing with Tunewave Promo.
            </p>
          </div>
        </div>

        {/* Full-width seamless Right-to-Left Scrolling Ribbon */}
        <div 
          className="promo-reviews-viewport"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '12px 0 24px',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}
        >
          <div className="promo-reviews-track">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].map((rev, idx) => (
              <div 
                key={idx} 
                className="glass-panel card-shimmer-sweep promo-review-card"
              >
                {/* Top Row: Stars + Verified Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 3, color: '#FACC15' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#FACC15" color="#FACC15" />
                    ))}
                  </div>

                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 5,
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    color: isLight ? '#059669' : 'var(--tw-lime)',
                    background: isLight ? 'rgba(5, 150, 105, 0.08)' : 'rgba(163, 230, 53, 0.1)',
                    border: isLight ? '1px solid rgba(5, 150, 105, 0.25)' : '1px solid rgba(163, 230, 53, 0.25)',
                    padding: '3px 9px',
                    borderRadius: 20
                  }}>
                    <CheckCircle2 size={12} />
                    {rev.badge}
                  </span>
                </div>

                {/* Review Quote */}
                <div style={{ position: 'relative', flex: 1, marginBottom: 18 }}>
                  <Quote 
                    size={32} 
                    style={{ 
                      position: 'absolute', 
                      top: -6, 
                      left: -4, 
                      opacity: 0.1, 
                      color: rev.accent,
                      pointerEvents: 'none' 
                    }} 
                  />
                  <p className="promo-review-text" style={{
                    fontSize: '0.94rem',
                    lineHeight: 1.65,
                    position: 'relative',
                    zIndex: 1,
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    "{rev.text}"
                  </p>
                </div>

                {/* Stat Pill Highlight */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 10,
                  background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--tw-line)',
                  marginBottom: 16,
                  width: 'fit-content'
                }}>
                  <TrendingUp size={13} color={rev.accent} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: rev.accent }}>
                    {rev.stat}
                  </span>
                </div>

                {/* Artist Profile Footer */}
                <div style={{ 
                  borderTop: '1px solid var(--tw-line)', 
                  paddingTop: 14, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: rev.avatarBg,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.85rem',
                      letterSpacing: '0.05em',
                      boxShadow: `0 0 12px ${rev.accent}40`,
                      flexShrink: 0
                    }}>
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="promo-review-author" style={{ fontWeight: 800, fontSize: '0.94rem', lineHeight: 1.2 }}>
                        {rev.name}
                      </div>
                      <div style={{ color: 'var(--tw-text-dim)', fontSize: '0.78rem', marginTop: 2 }}>
                        {rev.role}
                      </div>
                    </div>
                  </div>

                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 800, 
                    color: 'var(--tw-cyan)', 
                    background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0,229,255,0.1)', 
                    border: '1px solid var(--tw-line)',
                    padding: '3px 8px', 
                    borderRadius: 6 
                  }}>
                    {rev.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROMO FAQS ACCORDION (3D Flip Animation on enter) */}
      <section ref={faqSectionRef} style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                ANSWERS & DETAILS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              Music Promotion <span style={{ color: 'var(--tw-cyan)' }}>FAQs</span>
            </h2>
          </div>

          <div 
            style={{ display: 'flex', flexDirection: 'column', gap: 14, perspective: 1200 }}
          >
            {PROMO_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`promo-faq-card card-shimmer-sweep promo-flip-item ${faqInView ? 'in-view' : ''}`}
                  style={{
                    borderRadius: 16,
                    border: isOpen 
                      ? (isLight ? '1px solid var(--tw-cyan)' : '1px solid rgba(0, 229, 255, 0.45)') 
                      : '1px solid var(--tw-line)',
                    background: isOpen 
                      ? (isLight ? 'rgba(0, 126, 167, 0.04)' : 'rgba(0, 229, 255, 0.035)') 
                      : undefined,
                    overflow: 'hidden',
                    transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                    animationDelay: `${0.06 + idx * 0.08}s`
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
                        color: isOpen ? 'var(--tw-cyan)' : 'var(--tw-text-dim)',
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
                      borderTop: '1px solid var(--tw-line)',
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

      {/* 8. BOTTOM CTA STRIP WITH 3D BACKGROUND & INTERACTIVE TILT */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div 
            ref={ctaCardRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="glass-panel promo-cta-3d-card card-shimmer-sweep"
          >
            {/* 3D Background Stage */}
            <div className="promo-cta-3d-stage">
              <img 
                src="/Ready%20to%20claim%20background%20image.png" 
                alt="Ready to Promote Music Studio 3D" 
                className="promo-cta-3d-art"
                loading="lazy"
              />
            </div>

            {/* Atmospheric Depth Mask */}
            <div className="promo-cta-3d-atmosphere" />

            {/* Dynamic Cursor Spotlight */}
            <div className="promo-cta-3d-spotlight" />

            {/* Floating 3D Music Particles */}
            <div className="promo-cta-float-note promo-cta-note-left">
              <div className="promo-glyph-badge">♪</div>
            </div>
            <div className="promo-cta-float-note promo-cta-note-right">
              <div className="promo-glyph-badge">♫</div>
            </div>

            {/* Foreground Content */}
            <div className="promo-cta-content">
              <h2 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 18,
                color: 'var(--tw-text-white)'
              }}>
                Ready to promote your release? <br />
                <span style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }}>Launch a campaign today.</span>
              </h2>

              <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
                Lock in your campaign today and activate anytime within 12 months. Keep 100% of all royalties.
              </p>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  padding: '18px 44px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <span>Get started now</span>
                <ArrowRight size={20} className="btn-icon-hover" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded CSS Styles for Right-to-Left Scrolling Marquee & Reviews */}
      <style>{`
        /* ── Continuous Right-to-Left Marquee Ribbon ── */
        @keyframes promoMarqueeRTL {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .promo-marquee-track {
          display: flex;
          align-items: center;
          gap: 16px;
          width: max-content;
          animation: promoMarqueeRTL 32s linear infinite;
          will-change: transform;
        }

        .promo-marquee-track:hover {
          animation-play-state: paused;
        }

        .promo-marquee-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--tw-line);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--tw-text-white);
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: all 0.25s ease;
          cursor: default;
        }

        .promo-marquee-chip:hover {
          border-color: var(--tw-cyan);
          background: rgba(0, 229, 255, 0.08);
          transform: translateY(-2px);
        }

        .promo-marquee-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--tw-cyan);
          box-shadow: 0 0 8px var(--tw-cyan);
          flex-shrink: 0;
        }

        /* ── Continuous Right-to-Left Reviews Ribbon ── */
        @keyframes promoReviewsRTL {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .promo-reviews-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: promoReviewsRTL 45s linear infinite;
          will-change: transform;
        }

        .promo-reviews-track:hover,
        .promo-reviews-track.paused {
          animation-play-state: paused !important;
        }

        .promo-review-card {
          width: 380px;
          min-width: 380px;
          max-width: 380px;
          flex-shrink: 0;
          padding: 28px;
          border-radius: 22px;
          border: 1px solid var(--tw-line);
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: default;
        }

        .promo-review-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 229, 255, 0.45) !important;
          box-shadow: 0 20px 45px -10px rgba(0, 229, 255, 0.25) !important;
        }

        .promo-review-text {
          color: #E2E8F0;
        }

        .promo-review-author {
          color: #FFFFFF;
        }

        /* ── Light Mode Adaptations ── */
        [data-theme="light"] .promo-marquee-chip {
          background: #FFFFFF !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          color: #0F172A !important;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03) !important;
        }

        [data-theme="light"] .promo-marquee-chip:hover {
          border-color: #007EA7 !important;
          background: rgba(0, 126, 167, 0.05) !important;
        }

        [data-theme="light"] .promo-review-card {
          background: #FFFFFF !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05) !important;
        }

        [data-theme="light"] .promo-review-card:hover {
          border-color: #007EA7 !important;
          box-shadow: 0 16px 36px -8px rgba(0, 126, 167, 0.2) !important;
        }

        [data-theme="light"] .promo-review-text {
          color: #334155 !important;
        }

        [data-theme="light"] .promo-review-author {
          color: #0F172A !important;
        }

        /* ── 3D FAQ Card Top-to-Bottom Flipping Animation ── */
        .promo-faq-card {
          background: rgba(14, 20, 32, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
        }

        @keyframes promoFaqFlipTopToBottom {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg) translateY(-25px);
            transform-origin: top center;
          }
          55% {
            opacity: 1;
            transform: perspective(1200px) rotateX(15deg) translateY(0);
            transform-origin: top center;
          }
          75% {
            transform: perspective(1200px) rotateX(-5deg);
            transform-origin: top center;
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) translateY(0);
            transform-origin: top center;
          }
        }

        .promo-flip-item {
          opacity: 0;
          transform: perspective(1200px) rotateX(-90deg);
          transform-origin: top center;
          backface-visibility: hidden;
          will-change: transform, opacity;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        .promo-flip-item.in-view {
          animation: promoFaqFlipTopToBottom 0.82s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .promo-flip-item:hover {
          transform: translateY(-3px) !important;
          border-color: rgba(0, 229, 255, 0.45) !important;
          box-shadow: 0 12px 30px -6px rgba(0, 229, 255, 0.2) !important;
        }

        /* Light mode adaptation for promo-flip-item and promo-faq-card */
        [data-theme="light"] .promo-faq-card {
          background: #ffffff !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .promo-flip-item:hover {
          border-color: #007EA7 !important;
          box-shadow: 0 12px 30px -6px rgba(0, 126, 167, 0.18) !important;
        }
      `}</style>
    </div>
  );
}
