import React, { useState, useRef, useEffect } from 'react';
import {
  Film, Video, Play, ArrowRight, CheckCircle2, ChevronDown,
  Sparkles, Globe2, ShieldCheck, DollarSign, Users, Award,
  BarChart3, Zap, Layers, Radio, ExternalLink
} from 'lucide-react';

export default function VevoPage({ onNavigate, theme }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const stepsSectionRef = useRef(null);
  const [stepsInView, setStepsInView] = useState(false);
  const toolkitSectionRef = useRef(null);
  const [toolkitInView, setToolkitInView] = useState(false);

  useEffect(() => {
    const stepsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStepsInView(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const toolkitObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setToolkitInView(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (stepsSectionRef.current) stepsObserver.observe(stepsSectionRef.current);
    if (toolkitSectionRef.current) toolkitObserver.observe(toolkitSectionRef.current);

    return () => {
      if (stepsSectionRef.current) stepsObserver.unobserve(stepsSectionRef.current);
      if (toolkitSectionRef.current) toolkitObserver.unobserve(toolkitSectionRef.current);
    };
  }, []);

  const VEVO_FAQS = [
    {
      q: "Can I get my music video on Vevo?",
      a: "Yes! When you sign up for a free account with TuneWave, we'll get you set up with an official Artist channel on Vevo that you can populate with all your previous and/or upcoming music videos for fans to watch. Make sure to read our music video guidelines to ensure your video meets Vevo's specific content requirements."
    },
    {
      q: "How much money will I make from Vevo?",
      a: "Similar to platforms like Spotify & Apple Music, Vevo royalties are based on a cost per stream. This price can vary based on the different subscription plans and locations of listeners, so the amount of money you make from Vevo may vary too."
    },
    {
      q: "When will I get paid by Vevo?",
      a: "When you release to Vevo through TuneWave, you'll receive 100% of the royalties you're owed directly into your TuneWave account. There can be a wait time of up to two months between uploading your videos to the platform and your royalties arriving."
    },
    {
      q: "How do I get more views on Vevo music videos?",
      a: "Artists who use Vevo to host their music videos will automatically get opportunities for playlisting and editorial support on Vevo's social media. If you want to find out more about how to boost your views on Vevo, check out our Advice blog and subscribe to our newsletter for the latest tips and tricks."
    },
    {
      q: "How do I start putting music videos on Vevo?",
      a: "You can start right now. When you create a free account with TuneWave, you'll be able to set up and upload videos to your official Vevo artist channel. Once your videos are live, you can start earning royalties from views and streams. Simple as that!"
    }
  ];

  const TOOLKIT_ITEMS = [
    {
      title: "Unlimited Releases",
      desc: "Release as much music as you like to every major music platform worldwide.",
      icon: Layers,
      color: "var(--tw-cyan)"
    },
    {
      title: "Free Pre-Save SmartLinks",
      desc: "Let fans pre-save your music before it drops and share your release everywhere with just one link.",
      icon: Sparkles,
      color: "#38BDF8"
    },
    {
      title: "Keep 100% Royalties",
      desc: "Keep 100% of the royalties you earn and all of the rights to your music.",
      icon: DollarSign,
      color: "var(--tw-cyan)"
    },
    {
      title: "Publishing, Sync & More",
      desc: "Access tools and services to boost your profile and earnings, including publishing, sync pitching, chart registration and more.",
      icon: Zap,
      color: "#0EA5E9"
    },
    {
      title: "Advanced Analytics",
      desc: "Explore streaming insights, download numbers and listener demographic data. Get the TuneWave app to track stats from your phone.",
      icon: BarChart3,
      color: "var(--tw-cyan)"
    },
    {
      title: "Fast Payouts",
      desc: "Get paid royalties directly into your account and withdraw your earnings with a couple of clicks.",
      icon: ShieldCheck,
      color: "#38BDF8"
    },
    {
      title: "Split Payments",
      desc: "Automatically split royalties with your collaborators, producers, features, songwriters or anyone else who's earned a cut.",
      icon: Users,
      color: "#0284C7"
    },
    {
      title: "Get Signed",
      desc: "We scout talent from our distribution services and sign them to label services deals where we can offer more marketing support.",
      icon: Award,
      color: "var(--tw-cyan)"
    },
    {
      title: "More Stores",
      desc: "Distribute to 150+ stores in a single upload. Land on every platform that pays.",
      icon: Globe2,
      color: "#38BDF8"
    }
  ];

  const HOF_ARTISTS = [
    {
      name: "Ed Sheeran",
      stat: "30Bn+ Streams",
      badge: "Multiple Grammy Award Winner",
      img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Sam Smith",
      stat: "4Bn+ Streams",
      badge: "Multiple Grammy Award Winner",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Tems",
      stat: "1Bn+ Streams",
      badge: "Grammy Award Winner",
      img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Chance the Rapper",
      stat: "3Bn+ Streams",
      badge: "3x Grammy Award Winner",
      img: "https://images.unsplash.com/photo-1520523839898-507127043818?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Dave",
      stat: "Two UK #1 Albums",
      badge: "Brits Album Of Year Winner",
      img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80"
    },
    {
      name: "Sidhu Moosewala",
      stat: "300M+ Streams",
      badge: "41M Spotify Followers",
      img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div style={{ paddingTop: 0, paddingBottom: 100 }}>
      {/* 1. HERO COVER SECTION */}
      <section
        className="vevo-hero-cover-section"
        style={{
          position: 'relative',
          padding: '70px 0 100px',
          overflow: 'hidden',
          backgroundImage: 'url("/Get%20Your%20Music%20Videos%20background%20image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          minHeight: 580,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 30,
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: '#0284C7',
                    background: 'rgba(2, 132, 199, 0.12)',
                    border: '1px solid rgba(2, 132, 199, 0.28)'
                  }}
                >
                  <Film size={13} />
                  OFFICIAL VEVO PARTNER
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 20,
                color: '#0F172A',
                letterSpacing: '-0.03em'
              }}>
                Get Your Music <br />
                Videos <br />
                <span style={{ color: '#000000' }}>
                  on VEVO.
                </span>
              </h1>

              <p style={{
                fontSize: '1.08rem',
                color: '#334155',
                lineHeight: 1.65,
                marginBottom: 32,
                maxWidth: '520px',
                fontWeight: 500
              }}>
                Set up an Official Vevo Channel, upload all of your music videos and keep 100% of the royalties you generate. With TuneWave, it's cheap and easy to get your visuals live on Vevo and start earning even more from your music.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button
                  onClick={() => onNavigate('/signup')}
                  style={{
                    padding: '15px 32px',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    borderRadius: 30,
                    background: '#0084B4',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0, 132, 180, 0.35)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 132, 180, 0.45)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 132, 180, 0.35)';
                  }}
                >
                  <span>Upload Your Music</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate('/pricing')}
                  style={{
                    padding: '15px 30px',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    borderRadius: 30,
                    background: 'rgba(255, 255, 255, 0.75)',
                    color: '#0F172A',
                    border: '1px solid rgba(15, 23, 42, 0.16)',
                    backdropFilter: 'blur(8px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
                  }}
                >
                  <span>View Video Plans</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right 4K Video Player Mockup on Podium */}
            <div className="reveal-scale" style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: -10 }}>
              <div className="card-shimmer-sweep" style={{
                borderRadius: 24,
                overflow: 'hidden',
                width: '100%',
                maxWidth: 490,
                background: '#090D15',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 25px 60px -15px rgba(0, 20, 50, 0.45)'
              }}>
                {/* 16:9 Video Canvas Frame */}
                <div style={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  background: 'linear-gradient(135deg, #0d1527, #060a12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Vevo Badge in player */}
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: 'rgba(255, 255, 255, 0.92)',
                    color: '#040D1A',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}>
                    VEVO
                  </div>

                  {/* Play Button */}
                  <div
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 100%)',
                      color: "#040D1A",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 30px rgba(0, 229, 255, 0.6)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <Play size={28} fill="#040D1A" color="#040D1A" style={{ marginLeft: 4 }} />
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 16,
                    color: "#FFFFFF",
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    4K ULTRA HD · OFFICIAL ARTIST CHANNEL
                  </div>
                </div>

                {/* Video Info Bar */}
                <div style={{ padding: '20px 24px', background: '#0B0F19', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: "#FFFFFF" }}>Nova Luna - Luminescence (Official Video)</div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--tw-cyan)', fontWeight: 700 }}>MONETIZED</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: '0.78rem', color: '#94A3B8' }}>
                    <span style={{ color: '#CBD5E1' }}>NovaLunaVEVO</span>
                    <span>•</span>
                    <span style={{ color: '#CBD5E1' }}>1,420,890 views</span>
                    <span>•</span>
                    <span style={{ color: 'var(--tw-cyan)' }}>100% Royalties Paid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GETTING STARTED: 5 STEPS */}
      <section
        ref={stepsSectionRef}
        style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}
      >
        <style>{`
          /* ── Header Text Animation On Scroll ───────────────────────── */
          .vevo-steps-header {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, opacity;
          }
          .vevo-steps-header.in-view {
            opacity: 1;
            transform: translateY(0);
          }

          /* ── 3D Card Top-to-Bottom Flipping Animation ────────────────── */
          @keyframes cardFlipTopToBottom {
            0% {
              opacity: 0;
              transform: perspective(1200px) rotateX(-90deg) translateY(-30px);
              transform-origin: top center;
            }
            55% {
              opacity: 1;
              transform: perspective(1200px) rotateX(16deg) translateY(0);
              transform-origin: top center;
            }
            75% {
              transform: perspective(1200px) rotateX(-6deg);
              transform-origin: top center;
            }
            100% {
              opacity: 1;
              transform: perspective(1200px) rotateX(0deg) translateY(0);
              transform-origin: top center;
            }
          }

          .step-card-flip {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg);
            transform-origin: top center;
            backface-visibility: hidden;
            will-change: transform, opacity;
            transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          }

          .step-card-flip.in-view {
            animation: cardFlipTopToBottom 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .step-card-flip:hover {
            transform: translateY(-4px) scale(1.01) !important;
            border-color: rgba(0, 229, 255, 0.45) !important;
            box-shadow: 0 14px 32px rgba(0, 229, 255, 0.15) !important;
          }

          /* Light mode styling */
          [data-theme="light"] .vevo-steps-title {
            color: #0f172a !important;
          }
          [data-theme="light"] .vevo-steps-subtitle {
            color: #475569 !important;
          }
          [data-theme="light"] .step-card-flip {
            background: #ffffff !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04) !important;
          }
          [data-theme="light"] .step-card-text {
            color: #0f172a !important;
          }
          [data-theme="light"] .step-card-badge {
            background: rgba(0, 163, 255, 0.12) !important;
            border: 1px solid rgba(0, 163, 255, 0.28) !important;
            color: #0284c7 !important;
          }
        `}</style>

        <div className="container">
          <div className={`vevo-steps-header ${stepsInView ? 'in-view' : ''}`} style={{ textAlign: 'center', marginBottom: 50 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 126, 167, 0.12)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>01 · GETTING STARTED</span>
            </div>
            <h2 className="vevo-steps-title" style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              How to Get Your Music on <span className="text-cyan-gradient">VEVO</span>
            </h2>
            <p className="vevo-steps-subtitle" style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Follow these simple steps and put your official visuals in front of millions worldwide.
            </p>
          </div>

          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, perspective: 1200 }}>
            {[
              "Create a free TuneWave account.",
              "Set up an official Vevo artist channel.",
              "Upload your music videos to Vevo.",
              "Add credits and any collaborators to be paid by Vevo automatically.",
              "Keep 100% of the royalties your videos earn."
            ].map((step, idx) => (
              <div
                key={idx}
                className={`glass-panel card-shimmer-sweep step-card-flip ${stepsInView ? 'in-view' : ''}`}
                style={{
                  padding: '24px 30px',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  animationDelay: `${0.12 + idx * 0.15}s`
                }}
              >
                <div
                  className="step-card-badge"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(0, 229, 255, 0.12)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: 'var(--tw-cyan)',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {idx + 1}
                </div>
                <div className="step-card-text" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--tw-text-white)' }}>
                  {step}
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <button
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                <span>Upload Your Music</span>
                <ArrowRight size={18} className="btn-icon-hover" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY VEVO */}
      <section
        className="why-vevo-section"
        style={{
          padding: '90px 0',
          borderTop: '1px solid var(--tw-line)',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url("/Why%20Upload%20Your%20Music%20Videos%20to%20VEVO%20image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal-up why-vevo-card" style={{
            padding: '54px 48px',
            borderRadius: 28,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{
                  padding: '6px 14px',
                  borderRadius: 30,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#0284C7',
                  background: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(2, 132, 199, 0.28)'
                }}>
                  02 · WHY VEVO
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.15,
                margin: '12px 0 20px'
              }}>
                Why Upload Your Music Videos to <span style={{ color: '#0090FF' }}>VEVO?</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#475569', fontSize: '1.02rem', lineHeight: 1.62 }}>
                <p>
                  Vevo is one of the most popular places for fans to watch &amp; stream music videos from the artists they love.
                </p>
                <p>
                  Putting your music videos on Vevo will help you find new fans, generate more engagement, and increase the money you make from streaming royalties compared to uploading to YouTube alone.
                </p>
                <p>
                  As one of Vevo's official partners, when you distribute your music through TuneWave, you can guarantee you'll get paid every single time someone views your videos on the platform.
                </p>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { title: "Higher CPM Ad Monetization", desc: "Vevo commands premium ad rates compared to standard YouTube video uploads." },
                { title: "Official Artist Channel Integration", desc: "Your Vevo uploads syndicate automatically to your unified YouTube Artist Channel." },
                { title: "Editorial Playlisting Opportunities", desc: "Pitch directly for Vevo DSCVR, Live Performances, and global playlist features." },
                { title: "100% Royalty Retention", desc: "Keep 100% of the video royalties generated across all global views." }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <CheckCircle2 size={20} color="#0090FF" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TUNEWAVE TOOLKIT: 9 FEATURES */}
      <section
        ref={toolkitSectionRef}
        style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}
      >
        <style>{`
          .toolkit-line-wrap {
            overflow: hidden;
            display: block;
            padding: 3px 0;
          }
          .toolkit-line-item {
            display: block;
            opacity: 0;
            transform: translateY(45px);
            transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: transform, opacity;
          }
          .toolkit-line-item.in-view {
            opacity: 1;
            transform: translateY(0);
          }
          [data-theme="light"] .toolkit-title {
            color: #0f172a !important;
          }
          [data-theme="light"] .toolkit-subtitle {
            color: #475569 !important;
          }

          /* ── 3D Card Left-to-Right Flipping Animation ─────────────── */
          @keyframes cardFlipLeftToRight {
            0% {
              opacity: 0;
              transform: perspective(1200px) rotateY(-85deg) translateX(-35px);
              transform-origin: center left;
            }
            55% {
              opacity: 1;
              transform: perspective(1200px) rotateY(14deg) translateX(0);
              transform-origin: center left;
            }
            75% {
              transform: perspective(1200px) rotateY(-5deg);
              transform-origin: center left;
            }
            100% {
              opacity: 1;
              transform: perspective(1200px) rotateY(0deg) translateX(0);
              transform-origin: center left;
            }
          }

          .toolkit-card-flip {
            opacity: 0;
            transform: perspective(1200px) rotateY(-85deg);
            transform-origin: center left;
            backface-visibility: hidden;
            will-change: transform, opacity;
            transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          }

          .toolkit-card-flip.in-view {
            animation: cardFlipLeftToRight 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .toolkit-card-flip:hover {
            transform: translateY(-6px) scale(1.02) !important;
            border-color: rgba(0, 229, 255, 0.45) !important;
            box-shadow: 0 16px 36px rgba(0, 229, 255, 0.15) !important;
          }

          /* Light mode card adaptations */
          [data-theme="light"] .toolkit-card-flip {
            background: #ffffff !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
          }
          [data-theme="light"] .toolkit-card-title {
            color: #0f172a !important;
          }
          [data-theme="light"] .toolkit-card-desc {
            color: #475569 !important;
          }
        `}</style>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            {/* Pill Badge - Line 0 */}
            <div className="toolkit-line-wrap" style={{ marginBottom: 12 }}>
              <div
                className={`toolkit-line-item ${toolkitInView ? 'in-view' : ''}`}
                style={{ transitionDelay: '0.1s', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>03 · THE TUNEWAVE TOOLKIT</span>
              </div>
            </div>

            {/* Line 1: Why use TuneWave. */}
            <div className="toolkit-line-wrap" style={{ marginBottom: 16 }}>
              <h2
                className={`toolkit-title toolkit-line-item ${toolkitInView ? 'in-view' : ''}`}
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  color: 'var(--tw-text-white)',
                  transitionDelay: '0.32s',
                  margin: 0
                }}
              >
                Why use <span className="text-cyan-gradient">TuneWave.</span>
              </h2>
            </div>

            {/* Line-by-Line Subtitle */}
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <div className="toolkit-line-wrap">
                <p
                  className={`toolkit-subtitle toolkit-line-item ${toolkitInView ? 'in-view' : ''}`}
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--tw-text-dim)',
                    lineHeight: 1.6,
                    margin: 0,
                    transitionDelay: '0.55s'
                  }}
                >
                  Everything you need to launch, monetize and expand your music visuals and
                </p>
              </div>
              <div className="toolkit-line-wrap">
                <p
                  className={`toolkit-subtitle toolkit-line-item ${toolkitInView ? 'in-view' : ''}`}
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--tw-text-dim)',
                    lineHeight: 1.6,
                    margin: 0,
                    transitionDelay: '0.78s'
                  }}
                >
                  catalog worldwide.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            perspective: 1400
          }}>
            {TOOLKIT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`glass-panel card-shimmer-sweep toolkit-card-flip ${toolkitInView ? 'in-view' : ''}`}
                  style={{
                    padding: 32,
                    borderRadius: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    animationDelay: `${0.2 + (i % 3) * 0.15 + Math.floor(i / 3) * 0.18}s`
                  }}
                >
                  <div style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${item.color}`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="toolkit-card-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>
                    {item.title}
                  </h3>
                  <p className="toolkit-card-desc" style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HALL OF FAME: FROM BEDROOM TO GRAMMY */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>HALL OF FAME</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              From bedroom uploads to <span className="text-cyan-gradient">Grammy stages.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Supporting over 2 million artists worldwide. Independents, breakout stars and household names. All started with TuneWave.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24
          }}>
            {HOF_ARTISTS.map((art, idx) => (
              <div key={idx} className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                background: '#0B0F19',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ height: 220, position: 'relative' }}>
                  <img
                    src={art.img}
                    alt={art.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #0B0F19 0%, rgba(11, 15, 25, 0.4) 40%, transparent 100%)'
                  }} />
                </div>
                <div style={{ padding: '16px 20px 24px', position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
                    {art.name}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--tw-cyan)', fontWeight: 700, marginBottom: 4 }}>
                    {art.stat}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                    {art.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VEVO EXPLAINED & FAQS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 126, 167, 0.12)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>VEVO EXPLAINED</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                color: 'var(--tw-text-white)'
              }}>
                Vevo Music Video Distribution <span className="text-cyan-gradient">Explained</span>
              </h2>
              <p style={{ color: 'var(--tw-text-dim)' }}>
                Common questions about distributing and monetizing videos on Vevo.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {VEVO_FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: '22px 26px',
                    cursor: 'pointer',
                    borderRadius: 16,
                    border: openFaq === i ? '1px solid rgba(0, 229, 255, 0.35)' : '1px solid var(--tw-line)',
                    boxShadow: openFaq === i ? '0 8px 24px -6px rgba(0, 229, 255, 0.12)' : 'none',
                    transition: 'all 0.2s ease'
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

      {/* 7. BOTTOM CLOSE */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div className="vevo-cta-card card-shimmer-sweep" style={{
            padding: '54px 48px',
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient Overlay for contrast & vibrancy across both themes */}
            <div className="vevo-cta-overlay" style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
              <div className="vevo-cta-badge" style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 8
              }}>
                Ready to release?
              </div>
              <h3 className="vevo-cta-title" style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)',
                fontWeight: 800,
                margin: 0,
                lineHeight: 1.2
              }}>
                Distribute to Vevo with TuneWave.
              </h3>
            </div>

            <button
              onClick={() => onNavigate('/signup')}
              className="btn-cyan"
              style={{
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 700,
                position: 'relative',
                zIndex: 1
              }}
            >
              <span>Sign up for free</span>
              <ArrowRight size={18} className="btn-icon-hover" />
            </button>
          </div>
        </div>

        <style>{`
          .vevo-cta-card {
            background-image: url('/login_background_image/Your%20music%20journey%20begins%20here%20background.png') !important;
            background-size: cover !important;
            background-position: center center !important;
            background-repeat: no-repeat !important;
            border: 1px solid rgba(0, 229, 255, 0.35) !important;
            box-shadow: 0 20px 50px -10px rgba(0, 229, 255, 0.2) !important;
          }
          .vevo-cta-overlay {
            background: linear-gradient(90deg, rgba(8, 12, 22, 0.88) 0%, rgba(9, 14, 26, 0.68) 50%, rgba(8, 12, 22, 0.82) 100%) !important;
          }
          .vevo-cta-badge {
            color: var(--tw-cyan) !important;
            text-shadow: 0 0 12px rgba(0, 229, 255, 0.5);
          }
          .vevo-cta-title {
            color: #FFFFFF !important;
            text-shadow: 0 2px 14px rgba(0, 0, 0, 0.8);
          }

          [data-theme="light"] .vevo-cta-card {
            background-image: url('/login_background_image/Your%20music%20journey%20begins%20here%20background.png') !important;
            border: 1px solid rgba(0, 163, 196, 0.28) !important;
            box-shadow: 0 20px 45px -12px rgba(0, 126, 167, 0.16) !important;
          }
          [data-theme="light"] .vevo-cta-overlay {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.42) 50%, rgba(255, 255, 255, 0.80) 100%) !important;
          }
          [data-theme="light"] .vevo-cta-badge {
            color: #0090af !important;
            text-shadow: none !important;
          }
          [data-theme="light"] .vevo-cta-title {
            color: #0F172A !important;
            text-shadow: none !important;
          }

          @media (max-width: 768px) {
            .vevo-cta-card {
              padding: 38px 24px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
