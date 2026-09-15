import React, { useState } from 'react';
import { PRICING_PLANS, COMPARISON_DATA } from '../data/content';
import { Check, X, HelpCircle, Star, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83 }
};

const FAQS = [
  {
    q: "Do you really let artists keep 100% of their royalties?",
    a: "Yes, 100%. Whether your track receives 10,000 streams or 100 million streams, TuneWave does not deduct any percentage cut from your master royalties. All net revenue reported by Spotify, Apple Music, and other DSPs is credited directly to your artist balance."
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

  const isLight = theme === 'light';
  const curr = CURRENCIES[currency];

  const labelTiers = PRICING_PLANS[2].sliderTiers;
  const currentLabelTier = labelTiers[labelIndex];

  const formatPrice = (usdAmount) => {
    const converted = Math.round(usdAmount * curr.rate);
    return `${curr.symbol}${converted}`;
  };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 100 }}>
      <div className="container">
        {/* Header with Title and Currency Toggle */}
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="pill-badge">Transparent Pricing</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20
          }}>
            One price. <span className="text-cyan-gradient">Unlimited releases.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--tw-text-dim)', maxWidth: '680px', margin: '0 auto 32px' }}>
            Keep 100% of your royalties and rights with our industry-leading artist tools included on every tier.
          </p>

          {/* Currency Switcher */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--tw-bg-card)',
            border: '1px solid var(--tw-line-bright)',
            borderRadius: 9999,
            padding: 4
          }}>
            {Object.keys(CURRENCIES).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className="tab-pill-btn"
                style={{
                  padding: '6px 16px',
                  borderRadius: 9999,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: currency === code ? '#FFFFFF' : 'var(--tw-text-dim)',
                  background: currency === code ? 'var(--tw-cyan)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {code} ({CURRENCIES[code].symbol})
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="reveal-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          marginBottom: 96,
          alignItems: 'stretch',
          paddingTop: 16
        }}>
          {/* Card 1: Starter */}
          <div className="glass-panel card-shimmer-sweep" style={{
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid var(--tw-line)'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tw-text-muted)', letterSpacing: '0.1em' }}>
                // STARTER
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '16px 0 8px' }}>
                <span style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--tw-text-white)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {formatPrice(19)}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--tw-text-dim)' }}>/year</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5, marginBottom: 28 }}>
                Unlimited uploads to Spotify, Apple, and 150+ stores for 1 artist.
              </p>

              <button
                onClick={() => onNavigate('/signup')}
                className="btn-glass"
                style={{ width: '100%', marginBottom: 32 }}
              >
                Choose Starter
              </button>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-white)', textTransform: 'uppercase', marginBottom: 16 }}>
                What's included:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.88rem', color: 'var(--tw-text-dim)' }}>
                {PRICING_PLANS[0].features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Check size={16} color="var(--tw-cyan)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Pro (Highlighted) */}
          <div className="glass-panel" style={{
            border: '2px solid var(--tw-cyan)',
            borderRadius: 24,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'visible',
            boxShadow: 'var(--tw-shadow-glow)'
          }}>
            {/* Most popular badge */}
            <div style={{
              position: 'absolute',
              top: -15,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--tw-cyan)',
              color: isLight ? '#FFFFFF' : '#040D1A',
              padding: '6px 18px',
              borderRadius: 9999,
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              zIndex: 10,
              boxShadow: isLight ? '0 4px 14px rgba(0, 126, 167, 0.35)' : '0 4px 14px rgba(0, 229, 255, 0.45)',
              whiteSpace: 'nowrap'
            }}>
              <Star size={13} fill={isLight ? '#FFFFFF' : '#040D1A'} color={isLight ? '#FFFFFF' : '#040D1A'} />
              <span>MOST POPULAR</span>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                // PRO
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '16px 0 8px' }}>
                <span style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--tw-text-white)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {formatPrice(59)}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--tw-text-dim)' }}>/year</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.5, marginBottom: 28 }}>
                Unlock sync licensing briefs, global publishing royalties, and 2 artist profiles.
              </p>

              <button
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{ width: '100%', marginBottom: 32 }}
              >
                Choose Pro
              </button>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-white)', textTransform: 'uppercase', marginBottom: 16 }}>
                Everything in Starter, plus:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.88rem', color: 'var(--tw-text-dim)' }}>
                {PRICING_PLANS[1].features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Check size={16} color="var(--tw-cyan)" />
                    <span style={{ fontWeight: i < 3 ? 600 : 400 }}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: Labels with Dynamic Interactive Slider */}
          <div className="glass-panel" style={{
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid var(--tw-line)'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tw-lime)', letterSpacing: '0.1em' }}>
                // LABELS & ROSTERS
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '16px 0 8px' }}>
                <span style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--tw-text-white)', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {formatPrice(currentLabelTier.price)}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--tw-text-dim)' }}>/year</span>
              </div>

              {/* Interactive Label Slider */}
              <div style={{
                background: 'var(--tw-bg-surface)',
                border: '1px solid var(--tw-line)',
                borderRadius: 14,
                padding: '16px',
                margin: '16px 0 24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
                  <span style={{ color: 'var(--tw-text-dim)' }}>Roster Size:</span>
                  <span style={{ color: 'var(--tw-lime)' }}>For up to {currentLabelTier.count} artists</span>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--tw-text-muted)', marginTop: 4 }}>
                  <span>5 artists</span>
                  <span>15</span>
                  <span>40+ artists</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('/signup')}
                className="btn-glass"
                style={{ width: '100%', marginBottom: 32, borderColor: 'var(--tw-lime)', color: 'var(--tw-lime)' }}
              >
                Choose Labels ({currentLabelTier.count} Artists)
              </button>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-white)', textTransform: 'uppercase', marginBottom: 16 }}>
                Label Features:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.88rem', color: 'var(--tw-text-dim)' }}>
                {PRICING_PLANS[2].features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Check size={16} color="var(--tw-lime)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Competitor Comparison Matrix */}
        <div style={{
          background: 'var(--tw-bg-surface)',
          border: '1px solid var(--tw-line-bright)',
          borderRadius: 24,
          padding: '48px 36px',
          marginBottom: 96,
          overflowX: 'auto',
          boxShadow: 'var(--tw-shadow-card)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: 10, color: 'var(--tw-text-white)' }}>
              How do we compare?
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1rem' }}>
              See how TuneWave Global Network stacks up against legacy distribution platforms.
            </p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700, textAlign: 'center' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--tw-line-bright)' }}>
                <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: '0.85rem', color: 'var(--tw-text-muted)', textTransform: 'uppercase' }}>Feature</th>
                <th style={{ padding: '16px 20px', color: 'var(--tw-cyan)', fontWeight: 800, fontSize: '1.05rem', background: 'rgba(0, 126, 167, 0.08)', borderRadius: '8px 8px 0 0' }}>TuneWave</th>
                <th style={{ padding: '16px 20px', color: 'var(--tw-text-dim)', fontSize: '0.9rem' }}>CD Baby</th>
                <th style={{ padding: '16px 20px', color: 'var(--tw-text-dim)', fontSize: '0.9rem' }}>DistroKid</th>
                <th style={{ padding: '16px 20px', color: 'var(--tw-text-dim)', fontSize: '0.9rem' }}>TuneCore</th>
                <th style={{ padding: '16px 20px', color: 'var(--tw-text-dim)', fontSize: '0.9rem' }}>UnitedMasters</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--tw-line)' }}>
                  <td style={{ textAlign: 'left', padding: '16px 20px', fontWeight: 600, color: 'var(--tw-text-white)', fontSize: '0.92rem' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '16px 20px', background: 'rgba(0, 126, 167, 0.08)' }}>
                    <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', background: 'var(--tw-cyan)', alignItems: 'center', justifyContent: 'center', color: "var(--tw-text-white)", fontWeight: 900, fontSize: '0.85rem' }}>✓</span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {row.cdbaby === true ? (
                      <span style={{ color: '#94A3B8', fontWeight: 700 }}>✓</span>
                    ) : (
                      <span style={{ color: 'var(--tw-text-muted)' }}>✕</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {typeof row.distrokid === 'string' ? (
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>{row.distrokid}</span>
                    ) : row.distrokid ? (
                      <span style={{ color: '#94A3B8', fontWeight: 700 }}>✓</span>
                    ) : (
                      <span style={{ color: 'var(--tw-text-muted)' }}>✕</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {row.tunecore ? <span style={{ color: '#94A3B8', fontWeight: 700 }}>✓</span> : <span style={{ color: 'var(--tw-text-muted)' }}>✕</span>}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    {row.unitedmasters ? <span style={{ color: '#94A3B8', fontWeight: 700 }}>✓</span> : <span style={{ color: 'var(--tw-text-muted)' }}>✕</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQs Accordion */}
        <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8, color: 'var(--tw-text-white)' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--tw-text-dim)' }}>
              Everything you need to know about plans, payouts, and rights.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{ padding: '20px 24px', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>{faq.q}</h3>
                  <ChevronDown
                    size={18}
                    color="var(--tw-cyan)"
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: openFaq === i ? 'rotate(180deg)' : 'none'
                    }}
                  />
                </div>
                {openFaq === i && (
                  <p style={{ marginTop: 14, color: 'var(--tw-text-dim)', lineHeight: 1.6, fontSize: '0.92rem' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
