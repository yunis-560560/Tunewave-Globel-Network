import React from 'react';

const CLIENTELE_LOGOS = [
  { name: 'Popcorn Music', file: '/clientele/Popcorn_Music.png' },
  { name: 'Arrow Cinemas', file: '/clientele/Arrow_Music.png' },
  { name: 'Nibhish Digital Media', file: '/clientele/Nibhish_digital_media.png' },
  { name: 'Haadio', file: '/clientele/Haadio.png' },
  { name: 'Sy TV', file: '/clientele/Sy_tv.png' },
  { name: 'Disco Recording Company', file: '/clientele/Disco_Recording_Company.png' },
  { name: 'Sathish Picture House', file: '/clientele/Sathish_Picture_House.png' },
  { name: 'Folk Marley Records', file: '/clientele/Folk_Marley_Records.png' },
  { name: 'Manam Music', file: '/clientele/Manam_Music.png' },
  { name: 'CS Records', file: '/clientele/CS_Record_1.png' }
];

export default function ClienteleSection() {
  // Triple duplicated array for silky-smooth infinite seamless loop on any screen width
  const marqueeItems = [...CLIENTELE_LOGOS, ...CLIENTELE_LOGOS, ...CLIENTELE_LOGOS];

  return (
    <section 
      className="clientele-section"
      style={{
        position: 'relative',
        padding: '72px 0 64px 0',
        background: 'var(--tw-bg-dark)',
        borderTop: '1px solid var(--tw-line)',
        borderBottom: '1px solid var(--tw-line)',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Ambient background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '140%',
          background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.05) 0%, rgba(109, 40, 217, 0.03) 50%, transparent 75%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          zIndex: 0
        }} 
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Executive Header */}
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 40 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 12,
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--tw-cyan)'
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
            style={{
              fontFamily: 'var(--tw-font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--tw-text-white)',
              margin: '0 0 14px 0'
            }}
          >
            CLIENTELE
          </h2>

          <p 
            style={{
              fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)',
              color: 'var(--tw-text-dim)',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.55
            }}
          >
            Powering catalog distribution, official channels, and revenue infrastructure for premier record labels and media houses.
          </p>
        </div>

        {/* Marquee Wrapper with Smooth Edge Fade Masks */}
        <div 
          className="clientele-marquee-wrapper"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            padding: '16px 0 24px 0'
          }}
        >
          <div 
            className="clientele-marquee-track"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 36,
              width: 'max-content',
              animation: 'clientele-scroll 32s linear infinite'
            }}
          >
            {marqueeItems.map((client, idx) => (
              <div 
                key={`${client.name}-${idx}`}
                className="clientele-logo-card"
                title={client.name}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 16,
                  background: '#FFFFFF',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  boxSizing: 'border-box',
                  flexShrink: 0,
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease'
                }}
              >
                <img 
                  src={client.file} 
                  alt={client.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes clientele-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .clientele-marquee-track:hover {
          animation-play-state: paused;
        }

        .clientele-logo-card:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 16px 36px rgba(0, 229, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.25) !important;
          border-color: rgba(0, 229, 255, 0.5) !important;
        }
      `}</style>
    </section>
  );
}
