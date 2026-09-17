import React, { useState, useEffect, useRef } from 'react';
import { PRICING_PLANS, COMPARISON_DATA } from '../data/content';
import { Check, X, HelpCircle, Star, ArrowRight, ShieldCheck, ChevronDown, Sparkles, Zap, Layers } from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83 }
};

const FAQS = [
  {
    q: "Do you really let artists keep 100% of their royalties?",
    a: "Yes, 100%. Whether your track receives 10,000 streams or 100 million streams, Tunewave does not deduct any percentage cut from your master royalties. All net revenue reported by Spotify, Apple Music, and other DSPs is credited directly to your artist balance."
  },
  {
    q: "Are there any hidden fees or renewal penalties?",
    a: "No. You pay a single annual subscription fee. All future updates, store additions, barcodes (ISRC & UPC), and royalty splits are completely free forever."
  },
  {
    q: "How does the Labels plan work?",
    a: "The Labels plan allows managers, record labels, and collectives to release unlimited music for 5 up to 40+ artists under custom imprint names, with individual collaborator accounting statements and separate artist permissions."
  },
  {
    q: "Can I upgrade or switch plans at any time?",
    a: "Absolutely. You can start on the Starter tier and instantly upgrade to Pro or Labels as your catalog grows, with prorated billing applied automatically."
  },
  {
    q: "How fast do my releases get delivered to Spotify and Apple Music?",
    a: "Most releases are delivered and live across all major stores within 48 to 72 hours. We recommend uploading 3-4 weeks in advance to maximize Spotify editorial playlist pitching."
  }
];

export default function PricingPage({ onNavigate, theme = 'dark' }) {
  const [currency, setCurrency] = useState('USD');
  const [labelIndex, setLabelIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [pricePulse, setPricePulse] = useState(false);

  // Section visibility for 3D flip animation
  const cardsSectionRef = useRef(null);
  const tableSectionRef = useRef(null);
  const faqSectionRef = useRef(null);

  const [cardsInView, setCardsInView] = useState(false);
  const [tableInView, setTableInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  // 3D tilt tracking for cards
  const [cardTilt, setCardTilt] = useState({ 0: { x: 0, y: 0 }, 1: { x: 0, y: 0 }, 2: { x: 0, y: 0 } });

  const isLight = theme === 'light';
  const curr = CURRENCIES[currency];

  const labelTiers = PRICING_PLANS[2].sliderTiers;
  const currentLabelTier = labelTiers[labelIndex];

  const formatPrice = (usdAmount) => {
    const converted = Math.round(usdAmount * curr.rate);
    return `${curr.symbol}${converted}`;
  };

  // Re-triggerable Intersection & Scroll Observer
  useEffect(() => {
    const handleScroll = () => {
      const checkSection = (ref, setFn) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isEntered = rect.top < windowHeight * 0.85 && rect.bottom > 100;
        setFn(isEntered);
      };

      checkSection(cardsSectionRef, setCardsInView);
      checkSection(tableSectionRef, setTableInView);
      checkSection(faqSectionRef, setFaqInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Trigger brief pulse animation on price change
  const handleCurrencyChange = (code) => {
    setCurrency(code);
    setPricePulse(true);
    setTimeout(() => setPricePulse(false), 400);
  };

  const handleCardMouseMove = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    setCardTilt(prev => ({ ...prev, [index]: { x: rotateX, y: rotateY } }));
  };

  const handleCardMouseLeave = (index) => {
    setCardTilt(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  return (
    <div style={{ 
      paddingTop: 40, 
      paddingBottom: 120, 
      background: isLight ? '#F8FAFC' : 'var(--tw-bg-dark)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Keyframe & Hover Styles */}
      <style>{`
        @keyframes pricingCardFlip {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg) translateY(-50px) scale(0.9);
            filter: blur(8px);
          }
          60% {
            opacity: 0.95;
            transform: perspective(1200px) rotateX(10deg) translateY(6px) scale(1.02);
            filter: blur(1px);
          }
          80% {
            transform: perspective(1200px) rotateX(-4deg) translateY(-2px) scale(0.995);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes proGlowPulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(0, 229, 255, 0.35), inset 0 0 15px rgba(0, 229, 255, 0.1);
            border-color: rgba(0, 229, 255, 0.8);
          }
          50% {
            box-shadow: 0 0 50px rgba(0, 229, 255, 0.6), inset 0 0 25px rgba(0, 229, 255, 0.2);
            border-color: #00F2FE;
          }
        }

        @keyframes badgeShine {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(200%); }
        }

        @keyframes pricePop {
          0% { transform: scale(0.92); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes ambientLightMove {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(30px, -20px) scale(1.15); opacity: 0.6; }
        }

        .pricing-flip-card {
          opacity: 0;
          transform: perspective(1200px) rotateX(-90deg) translateY(-50px) scale(0.9);
          transform-origin: top center;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .pricing-flip-card.in-view {
          animation: pricingCardFlip 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pricing-interactive-card {
          border-radius: 24px;
          background: ${isLight ? '#FFFFFF' : 'var(--tw-bg-card)'};
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
        }
        .pricing-interactive-card:hover {
          box-shadow: 0 20px 45px rgba(0, 229, 255, 0.22) !important;
          border-color: rgba(0, 229, 255, 0.7) !important;
        }

        .faq-accordion-item {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 16px;
          border: 1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'var(--tw-line)'};
          background: ${isLight ? '#FFFFFF' : 'var(--tw-bg-card)'};
          overflow: hidden;
        }
        .faq-accordion-item:hover {
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-2px);
        }
        .faq-accordion-item.active {
          border-color: var(--tw-cyan);
          box-shadow: 0 8px 24px rgba(0, 229, 255, 0.15);
        }

        .table-row-interactive {
          transition: background 0.2s ease;
        }
        .table-row-interactive:hover {
          background: ${isLight ? 'rgba(0, 126, 167, 0.04)' : 'rgba(0, 229, 255, 0.04)'} !important;
        }
      `}</style>

      {/* Floating Ambient Glow Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 70%)', animation: 'ambientLightMove 9s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', top: '30%', right: '5%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', animation: 'ambientLightMove 11s ease-in-out infinite alternate-reverse' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* HERO HEADER */}
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span style={{ 
              fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.14em', 
              color: 'var(--tw-cyan)', border: '1px solid rgba(0,229,255,0.3)', 
              padding: '6px 16px', borderRadius: 9999, background: 'rgba(0,229,255,0.08)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              boxShadow: '0 0 20px rgba(0,229,255,0.18)'
            }}>
              <Sparkles size={14} /> TRANSPARENT PRICING
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: 20,
            color: isLight ? '#0F172A' : 'var(--tw-text-white)'
          }}>
            One price. <span style={{
              background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #38BDF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Unlimited releases.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: isLight ? '#475569' : 'var(--tw-text-dim)', maxWidth: '680px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Keep 100% of your royalties and rights with our industry-leading artist tools included on every tier.
          </p>

          {/* Currency Switcher with smooth active highlight */}
          <div style={{
            display: 'inline-flex',
            background: isLight ? '#FFFFFF' : 'var(--tw-bg-card)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'var(--tw-line-bright)'}`,
            borderRadius: 9999,
            padding: 5,
            boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.04)' : '0 8px 24px rgba(0,0,0,0.3)'
          }}>
            {Object.keys(CURRENCIES).map((code) => {
              const isActive = currency === code;
              return (
                <button
                  key={code}
                  onClick={() => handleCurrencyChange(code)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 9999,
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: isActive ? '#040D1A' : (isLight ? '#64748B' : 'var(--tw-text-dim)'),
                    background: isActive ? 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 100%)' : 'transparent',
                    boxShadow: isActive ? '0 0 20px rgba(0,229,255,0.4)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {code} ({CURRENCIES[code].symbol})
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 PRICING CARDS WITH CASCADING 3D FLIP ENTRANCE */}
        <div 
          ref={cardsSectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            marginBottom: 110,
            alignItems: 'stretch',
            paddingTop: 16,
            perspective: 1200
          }}
        >
          {/* Card 1: Starter */}
          <div 
            className={`pricing-interactive-card pricing-flip-card ${cardsInView ? 'in-view' : ''}`}
            onMouseMove={(e) => handleCardMouseMove(0, e)}
            onMouseLeave={() => handleCardMouseLeave(0)}
            style={{
              padding: 42,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'var(--tw-line)'}`,
              animationDelay: '0.05s',
              transform: `rotateX(${cardTilt[0].x}deg) rotateY(${cardTilt[0].y}deg)`
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#64748B' : 'var(--tw-text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                // STARTER
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '18px 0 10px' }}>
                <span style={{ 
                  fontSize: '3.4rem', fontWeight: 900, 
                  color: isLight ? '#0F172A' : 'var(--tw-text-white)', 
                  fontFamily: "'Space Grotesk', sans-serif",
                  animation: pricePulse ? 'pricePop 0.35s ease' : 'none'
                }}>
                  {formatPrice(19)}
                </span>
                <span style={{ fontSize: '1.05rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)' }}>/year</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: isLight ? '#475569' : 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 30 }}>
                Unlimited uploads to Spotify, Apple, and 150+ stores for 1 artist.
              </p>

              <button
                onClick={() => onNavigate('/signup')}
                style={{ 
                  width: '100%', padding: '14px', borderRadius: 9999,
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'var(--tw-line-bright)'}`,
                  color: isLight ? '#0F172A' : '#FFFFFF', fontWeight: 700, fontSize: '0.92rem',
                  cursor: 'pointer', marginBottom: 32, transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00E5FF'; e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.1)' : 'var(--tw-line-bright)'; e.currentTarget.style.background = isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'; }}
              >
                Choose Starter
              </button>

              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#0F172A' : 'var(--tw-text-white)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
                What's included:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.9rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', padding: 0, margin: 0 }}>
                {PRICING_PLANS[0].features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={13} color="#00E5FF" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Pro (Highlighted with Glowing Aura & 3D Tilt) */}
          <div 
            className={`pricing-interactive-card pricing-flip-card ${cardsInView ? 'in-view' : ''}`}
            onMouseMove={(e) => handleCardMouseMove(1, e)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            style={{
              padding: 42,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid #00E5FF',
              position: 'relative',
              overflow: 'visible',
              animation: cardsInView ? 'pricingCardFlip 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards, proGlowPulse 4s infinite ease-in-out' : 'none',
              animationDelay: '0.15s, 1s',
              transform: `rotateX(${cardTilt[1].x}deg) rotateY(${cardTilt[1].y}deg)`
            }}
          >
            {/* Most popular badge */}
            <div style={{
              position: 'absolute',
              top: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)',
              color: '#040D1A',
              padding: '6px 20px',
              borderRadius: 9999,
              fontSize: '0.76rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              zIndex: 10,
              boxShadow: '0 4px 18px rgba(0, 229, 255, 0.5)',
              whiteSpace: 'nowrap'
            }}>
              <Star size={14} fill="#040D1A" color="#040D1A" />
              <span>MOST POPULAR</span>
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                // PRO
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '18px 0 10px' }}>
                <span style={{ 
                  fontSize: '3.4rem', fontWeight: 900, 
                  color: isLight ? '#0F172A' : 'var(--tw-text-white)', 
                  fontFamily: "'Space Grotesk', sans-serif",
                  animation: pricePulse ? 'pricePop 0.35s ease' : 'none'
                }}>
                  {formatPrice(59)}
                </span>
                <span style={{ fontSize: '1.05rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)' }}>/year</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: isLight ? '#475569' : 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 30 }}>
                Unlock sync licensing briefs, global publishing royalties, and 2 artist profiles.
              </p>

              <button
                onClick={() => onNavigate('/signup')}
                style={{ 
                  width: '100%', padding: '15px', borderRadius: 9999,
                  background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)',
                  border: 'none', color: '#040D1A', fontWeight: 900, fontSize: '0.95rem',
                  letterSpacing: '0.04em', cursor: 'pointer', marginBottom: 32,
                  boxShadow: '0 0 30px rgba(0,229,255,0.35)', transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 45px rgba(0,229,255,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.35)'; }}
              >
                Choose Pro
              </button>

              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#0F172A' : 'var(--tw-text-white)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
                Everything in Starter, plus:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.9rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', padding: 0, margin: 0 }}>
                {PRICING_PLANS[1].features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,229,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={13} color="#00E5FF" strokeWidth={3} />
                    </div>
                    <span style={{ fontWeight: i < 3 ? 700 : 400, color: i < 3 ? (isLight ? '#0F172A' : '#FFFFFF') : 'inherit' }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: Labels with Dynamic Interactive Slider */}
          <div 
            className={`pricing-interactive-card pricing-flip-card ${cardsInView ? 'in-view' : ''}`}
            onMouseMove={(e) => handleCardMouseMove(2, e)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            style={{
              padding: 42,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'var(--tw-line)'}`,
              animationDelay: '0.25s',
              transform: `rotateX(${cardTilt[2].x}deg) rotateY(${cardTilt[2].y}deg)`
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 800, color: 'var(--tw-lime)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                // LABELS &amp; ROSTERS
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '18px 0 10px' }}>
                <span style={{ 
                  fontSize: '3.4rem', fontWeight: 900, 
                  color: isLight ? '#0F172A' : 'var(--tw-text-white)', 
                  fontFamily: "'Space Grotesk', sans-serif",
                  animation: pricePulse ? 'pricePop 0.35s ease' : 'none'
                }}>
                  {formatPrice(currentLabelTier.price)}
                </span>
                <span style={{ fontSize: '1.05rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)' }}>/year</span>
              </div>

              {/* Interactive Label Slider */}
              <div style={{
                background: isLight ? '#F1F5F9' : 'var(--tw-bg-surface)',
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'var(--tw-line)'}`,
                borderRadius: 16,
                padding: '18px',
                margin: '18px 0 26px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 800, marginBottom: 10 }}>
                  <span style={{ color: isLight ? '#64748B' : 'var(--tw-text-dim)' }}>Roster Size:</span>
                  <span style={{ color: 'var(--tw-lime)', background: 'rgba(157, 255, 0, 0.1)', padding: '2px 8px', borderRadius: 6 }}>
                    Up to {currentLabelTier.count} artists
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={labelTiers.length - 1}
                  step="1"
                  value={labelIndex}
                  onChange={(e) => setLabelIndex(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--tw-lime)',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: isLight ? '#94A3B8' : 'var(--tw-text-muted)', marginTop: 6, fontWeight: 700 }}>
                  <span>5 artists</span>
                  <span>15</span>
                  <span>40+ artists</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/signup')}
                style={{ 
                  width: '100%', padding: '14px', borderRadius: 9999,
                  background: 'transparent',
                  border: '1.5px solid var(--tw-lime)',
                  color: 'var(--tw-lime)', fontWeight: 800, fontSize: '0.92rem',
                  cursor: 'pointer', marginBottom: 32, transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(157, 255, 0, 0.12)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(157, 255, 0, 0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Choose Labels ({currentLabelTier.count} Artists)
              </button>

              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#0F172A' : 'var(--tw-text-white)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>
                Label Features:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.9rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', padding: 0, margin: 0 }}>
                {PRICING_PLANS[2].features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(157, 255, 0, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={13} color="var(--tw-lime)" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* COMPETITOR COMPARISON MATRIX */}
        <div 
          ref={tableSectionRef}
          style={{
            background: isLight ? '#FFFFFF' : 'var(--tw-bg-surface)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'var(--tw-line-bright)'}`,
            borderRadius: 24,
            padding: '52px 40px',
            marginBottom: 110,
            overflowX: 'auto',
            boxShadow: isLight ? '0 8px 30px rgba(0,0,0,0.04)' : '0 20px 50px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 12 }}>
              <Layers size={15} /> TRANSPARENCY FIRST
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 900, marginBottom: 12, color: isLight ? '#0F172A' : 'var(--tw-text-white)' }}>
              How do we compare?
            </h2>
            <p style={{ color: isLight ? '#64748B' : 'var(--tw-text-dim)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
              See how Tunewave Global Network stacks up against legacy distribution platforms.
            </p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, textAlign: 'center' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'var(--tw-line-bright)'}` }}>
                <th style={{ textAlign: 'left', padding: '18px 20px', fontSize: '0.85rem', color: isLight ? '#64748B' : 'var(--tw-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Feature</th>
                <th style={{ padding: '18px 20px', color: 'var(--tw-cyan)', fontWeight: 900, fontSize: '1.1rem', background: isLight ? 'rgba(0, 126, 167, 0.08)' : 'rgba(0, 229, 255, 0.1)', borderRadius: '12px 12px 0 0', borderTop: '2px solid var(--tw-cyan)' }}>Tunewave</th>
                <th style={{ padding: '18px 20px', color: isLight ? '#64748B' : 'var(--tw-text-dim)', fontSize: '0.92rem', fontWeight: 700 }}>CD Baby</th>
                <th style={{ padding: '18px 20px', color: isLight ? '#64748B' : 'var(--tw-text-dim)', fontSize: '0.92rem', fontWeight: 700 }}>DistroKid</th>
                <th style={{ padding: '18px 20px', color: isLight ? '#64748B' : 'var(--tw-text-dim)', fontSize: '0.92rem', fontWeight: 700 }}>TuneCore</th>
                <th style={{ padding: '18px 20px', color: isLight ? '#64748B' : 'var(--tw-text-dim)', fontSize: '0.92rem', fontWeight: 700 }}>UnitedMasters</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="table-row-interactive" style={{ borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'var(--tw-line)'}` }}>
                  <td style={{ textAlign: 'left', padding: '18px 20px', fontWeight: 700, color: isLight ? '#0F172A' : 'var(--tw-text-white)', fontSize: '0.95rem' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '18px 20px', background: isLight ? 'rgba(0, 126, 167, 0.08)' : 'rgba(0, 229, 255, 0.08)' }}>
                    <span style={{ 
                      display: 'inline-flex', width: 28, height: 28, borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 100%)', 
                      alignItems: 'center', justifyContent: 'center', 
                      color: '#040D1A', fontWeight: 900, fontSize: '0.9rem',
                      boxShadow: '0 0 14px rgba(0,229,255,0.35)'
                    }}>
                      ✓
                    </span>
                  </td>
                  <td style={{ padding: '18px 20px' }}>
                    {row.cdbaby === true ? (
                      <span style={{ color: '#94A3B8', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
                    ) : (
                      <span style={{ color: isLight ? '#CBD5E1' : 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>✕</span>
                    )}
                  </td>
                  <td style={{ padding: '18px 20px' }}>
                    {typeof row.distrokid === 'string' ? (
                      <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: 6 }}>{row.distrokid}</span>
                    ) : row.distrokid ? (
                      <span style={{ color: '#94A3B8', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
                    ) : (
                      <span style={{ color: isLight ? '#CBD5E1' : 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>✕</span>
                    )}
                  </td>
                  <td style={{ padding: '18px 20px' }}>
                    {row.tunecore ? <span style={{ color: '#94A3B8', fontWeight: 800, fontSize: '1.1rem' }}>✓</span> : <span style={{ color: isLight ? '#CBD5E1' : 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>✕</span>}
                  </td>
                  <td style={{ padding: '18px 20px' }}>
                    {row.unitedmasters ? <span style={{ color: '#94A3B8', fontWeight: 800, fontSize: '1.1rem' }}>✓</span> : <span style={{ color: isLight ? '#CBD5E1' : 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>✕</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQS ACCORDION WITH ANIMATED EXPANSION */}
        <div ref={faqSectionRef} style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 12 }}>
              <HelpCircle size={15} /> ANSWERS AT A GLANCE
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)', fontWeight: 900, marginBottom: 10, color: isLight ? '#0F172A' : 'var(--tw-text-white)' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: isLight ? '#64748B' : 'var(--tw-text-dim)', fontSize: '1.05rem' }}>
              Everything you need to know about plans, payouts, and rights.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                  style={{ padding: '22px 28px', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: isLight ? '#0F172A' : 'var(--tw-text-white)', margin: 0 }}>
                      {faq.q}
                    </h3>
                    <div style={{ 
                      width: 32, height: 32, borderRadius: '50%', 
                      background: isOpen ? 'rgba(0, 229, 255, 0.15)' : (isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'all 0.25s ease'
                    }}>
                      <ChevronDown
                        size={18}
                        color={isOpen ? 'var(--tw-cyan)' : (isLight ? '#64748B' : '#94A3B8')}
                        style={{
                          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          transform: isOpen ? 'rotate(180deg)' : 'none'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Smooth height expansion */}
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                    opacity: isOpen ? 1 : 0
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ 
                        marginTop: 16, 
                        marginBottom: 4,
                        color: isLight ? '#475569' : 'var(--tw-text-dim)', 
                        lineHeight: 1.75, 
                        fontSize: '0.95rem' 
                      }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
