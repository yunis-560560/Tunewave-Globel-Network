import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Disc3, Radio, ArrowUpRight } from 'lucide-react';

const CLIENTELE_PARTNERS = [
  {
    id: 'folk-hyderabad',
    name: 'Folk Hyderabad',
    tagline: 'Official Regional Music Label',
    genre: 'Folk & Regional Anthems',
    desc: 'Telangana’s powerhouse folk label managing chart-topping cultural anthems, festive tracks, and viral regional hits.',
    logo: '/clientele/Folk_Hyderabad.png',
    fallbackLogo: '/clientele/Folk_Hyderabad.png',
    accent: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
    features: ['Official Vevo Channel', 'Telangana Folk Catalog', '100% Direct Royalties']
  },
  {
    id: 'vemula-folk-music',
    name: 'Vemula Folk Music',
    tagline: 'Folk & Devotional Record Label',
    genre: 'Traditional & Folk Audio',
    desc: 'Premier independent folk music house producing viral cultural ballads, live performance singles & regional releases.',
    logo: '/clientele/vemula_folk_music.jpg',
    fallbackLogo: '/clientele/channels4_profile (5).jpg.jpeg',
    accent: '#00E5FF',
    accentGlow: 'rgba(0, 229, 255, 0.35)',
    accentBg: 'rgba(0, 229, 255, 0.12)',
    accentBorder: 'rgba(0, 229, 255, 0.3)',
    features: ['150+ Store Syndication', 'YouTube Content ID', 'Exclusive Audio Rights']
  },
  {
    id: 'bhavishya-sri-music',
    name: 'Bhavishya Sri Music',
    tagline: 'Film & Soundtrack Media House',
    genre: 'Cinematic & Devotional Audio',
    desc: 'Prominent cinema and devotional record label distributing official movie scores, singles & multi-language catalogs.',
    logo: '/clientele/bhavishya_sri_music.jpg',
    fallbackLogo: '/clientele/channels4_profile (7).jpg.jpeg',
    accent: '#EF4444',
    accentGlow: 'rgba(239, 68, 68, 0.35)',
    accentBg: 'rgba(239, 68, 68, 0.12)',
    accentBorder: 'rgba(239, 68, 68, 0.3)',
    features: ['Cinematic Distribution', 'Global Sync Monetization', 'Official Label Services']
  },
  {
    id: 'independent-creator-studio',
    name: 'Creator Studio Partner',
    tagline: 'Independent Artist Network',
    genre: 'Indie & Contemporary Hits',
    desc: 'High-growth independent creator label driving breakout singles, artist collaborations, and short-form audio trends.',
    logo: '/clientele/independent_creator_studio.jpg',
    fallbackLogo: '/clientele/avatars-LPXWtISm22CpDzVl-q5A7bA-t1080x1080.jpg.jpeg',
    accent: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.35)',
    accentBg: 'rgba(139, 92, 246, 0.12)',
    accentBorder: 'rgba(139, 92, 246, 0.3)',
    features: ['Artist Channel Network', 'Automated Split Payouts', 'Smart Pre-Save Links']
  }
];

export default function ClienteleSection() {
  const [activePartner, setActivePartner] = useState(null);

  // Repeat 4x for a perfectly seamless 16-item marquee ribbon
  const marqueeItems = [
    ...CLIENTELE_PARTNERS,
    ...CLIENTELE_PARTNERS,
    ...CLIENTELE_PARTNERS,
    ...CLIENTELE_PARTNERS
  ];

  return (
    <section 
      className="clientele-section"
      style={{
        position: 'relative',
        padding: '84px 0 80px 0',
        background: 'var(--tw-bg-dark)',
        borderTop: '1px solid var(--tw-line)',
        borderBottom: '1px solid var(--tw-line)',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Ambient background glows */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85%',
          height: '420px',
          background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.07) 0%, rgba(139, 92, 246, 0.04) 45%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          zIndex: 0
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Executive Header */}
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 14,
              padding: '6px 16px',
              borderRadius: 30,
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--tw-cyan)',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.25)'
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: 'var(--tw-cyan)',
                boxShadow: '0 0 10px var(--tw-cyan)',
                display: 'inline-block'
              }}
            />
            <span>TRUSTED PARTNER LABELS &amp; STUDIOS</span>
          </div>

          <h2 
            className="clientele-title"
            style={{
              fontFamily: 'var(--tw-font-heading)',
              fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--tw-text-white)',
              margin: '0 0 16px 0'
            }}
          >
            CLIENTELE
          </h2>

          <p 
            className="clientele-subtitle"
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.12rem)',
              color: 'var(--tw-text-dim)',
              maxWidth: 680,
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Powering catalog distribution, official channels, and revenue infrastructure for premier record labels and media houses.
          </p>
        </div>

        {/* 4 Feature Partner Spotlight Cards Grid */}
        <div 
          className="clientele-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginBottom: 48
          }}
        >
          {CLIENTELE_PARTNERS.map((partner) => {
            const isHovered = activePartner === partner.id;

            return (
              <div
                key={partner.id}
                onMouseEnter={() => setActivePartner(partner.id)}
                onMouseLeave={() => setActivePartner(null)}
                className="clientele-partner-card"
                style={{
                  position: 'relative',
                  borderRadius: 22,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(11, 15, 25, 0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isHovered 
                    ? `1px solid ${partner.accent}` 
                    : '1px solid rgba(255, 255, 255, 0.09)',
                  boxShadow: isHovered
                    ? `0 20px 40px -10px ${partner.accentGlow}, 0 4px 12px rgba(0,0,0,0.4)`
                    : '0 8px 24px rgba(0, 0, 0, 0.25)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                {/* Top Glowing Brand Accent Line */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${partner.accent}, transparent)`,
                    opacity: isHovered ? 1 : 0.4,
                    transition: 'opacity 0.3s ease'
                  }}
                />

                {/* Top Row: Genre Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: partner.accent,
                      background: partner.accentBg,
                      border: `1px solid ${partner.accentBorder}`,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {partner.genre}
                  </span>
                </div>

                {/* Centered Logo Frame */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                  <div 
                    className="clientele-logo-frame"
                    style={{
                      width: 86,
                      height: 86,
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      padding: 4,
                      boxShadow: isHovered 
                        ? `0 0 24px ${partner.accentGlow}` 
                        : '0 6px 18px rgba(0,0,0,0.2)',
                      border: `2px solid ${isHovered ? partner.accent : 'rgba(255, 255, 255, 0.8)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.35s ease',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)'
                    }}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      loading="lazy"
                      onError={(e) => {
                        if (partner.fallbackLogo && e.currentTarget.src !== partner.fallbackLogo) {
                          e.currentTarget.src = partner.fallbackLogo;
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>

                {/* Partner Name & Tagline */}
                <div style={{ textAlign: 'center', marginBottom: 14 }}>
                  <h3 
                    className="clientele-card-name"
                    style={{
                      fontSize: '1.24rem',
                      fontWeight: 800,
                      color: 'var(--tw-text-white)',
                      margin: '0 0 6px 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {partner.name}
                  </h3>
                  <div 
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: partner.accent,
                      letterSpacing: '0.03em'
                    }}
                  >
                    {partner.tagline}
                  </div>
                </div>

                {/* Partner Description */}
                <p 
                  className="clientele-card-desc"
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--tw-text-dim)',
                    lineHeight: 1.55,
                    textAlign: 'center',
                    marginBottom: 20,
                    flexGrow: 1
                  }}
                >
                  {partner.desc}
                </p>

                {/* Highlights list */}
                <div 
                  className="clientele-features-box"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    padding: '12px 14px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  {partner.features.map((feat, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        fontSize: '0.78rem',
                        color: 'var(--tw-text-white)',
                        fontWeight: 600
                      }}
                    >
                      <CheckCircle2 size={13} color={partner.accent} style={{ flexShrink: 0 }} />
                      <span className="clientele-feature-text">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Seamless Infinite Marquee Ribbon */}
        <div style={{ position: 'relative', marginTop: 16 }}>
          <div 
            style={{
              textAlign: 'center',
              marginBottom: 16,
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: 'var(--tw-text-dim)',
              textTransform: 'uppercase'
            }}
          >
            Continuous Catalog Streaming &amp; Rights Network
          </div>

          <div 
            className="clientele-marquee-wrapper"
            style={{
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              padding: '8px 0 12px 0'
            }}
          >
            <div 
              className="clientele-marquee-track"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                width: 'max-content',
                animation: 'clientele-scroll 24s linear infinite'
              }}
            >
              {marqueeItems.map((client, idx) => (
                <div 
                  key={`${client.id}-${idx}`}
                  className="clientele-marquee-chip"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 18px 8px 10px',
                    borderRadius: 40,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = client.accent;
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    loading="lazy"
                    onError={(e) => {
                      if (client.fallbackLogo && e.currentTarget.src !== client.fallbackLogo) {
                        e.currentTarget.src = client.fallbackLogo;
                      }
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `1.5px solid ${client.accent}`,
                      background: '#FFFFFF'
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span 
                      className="clientele-chip-name"
                      style={{ 
                        fontSize: '0.84rem', 
                        fontWeight: 700, 
                        color: 'var(--tw-text-white)',
                        lineHeight: 1.2
                      }}
                    >
                      {client.name}
                    </span>
                    <span 
                      style={{ 
                        fontSize: '0.68rem', 
                        color: client.accent, 
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {client.tagline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes clientele-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }

        .clientele-marquee-track:hover {
          animation-play-state: paused;
        }

        /* ── Light Mode Adaptations ───────────────────────────────── */
        [data-theme="light"] .clientele-section {
          background: #F8FAFC !important;
          border-top-color: rgba(0, 0, 0, 0.06) !important;
          border-bottom-color: rgba(0, 0, 0, 0.06) !important;
        }

        [data-theme="light"] .clientele-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .clientele-subtitle {
          color: #475569 !important;
        }

        [data-theme="light"] .clientele-partner-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
        }

        [data-theme="light"] .clientele-card-name {
          color: #0F172A !important;
        }

        [data-theme="light"] .clientele-card-desc {
          color: #475569 !important;
        }

        [data-theme="light"] .clientele-features-box {
          background: #F1F5F9 !important;
          border: 1px solid rgba(0, 0, 0, 0.05) !important;
        }

        [data-theme="light"] .clientele-feature-text {
          color: #1E293B !important;
        }

        [data-theme="light"] .clientele-marquee-chip {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .clientele-chip-name {
          color: #0F172A !important;
        }
      `}</style>
    </section>
  );
}
