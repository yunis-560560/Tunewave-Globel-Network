import React from 'react';
import { DollarSign, CircleDollarSign, Clapperboard, Video, Split, Globe2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function MonetizePage({ onNavigate }) {
  return (
    <div style={{ paddingTop: 40, paddingBottom: 100 }}>
      <div className="container">
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-lime)', borderColor: 'var(--tw-lime)' }}>
              02 · PUBLISHING, SYNC & RIGHTS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20,
            color: 'var(--tw-text-white)'
          }}>
            Every stream. <br />
            <span style={{ color: 'var(--tw-lime)' }}>Every single royalty.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--tw-text-dim)', maxWidth: '700px', margin: '0 auto 36px' }}>
            Streaming is only the foundation. Unlock global songwriting royalties, mechanical income, sync briefs for TV and films, and automated YouTube Content ID.
          </p>

          <button onClick={() => onNavigate('/signup')} className="btn-cyan" style={{ padding: '16px 36px' }}>
            <span>Collect All Missing Royalties</span>
            <ArrowRight size={18} className="btn-icon-hover" />
          </button>
        </div>

        {/* 4 Pillars Grid */}
        <div className="reveal-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          marginBottom: 80
        }}>
          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/publishing')}
          >
            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(16, 185, 129, 0.12) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25), 0 8px 20px -4px rgba(0, 229, 255, 0.30)',
                color: '#00E5FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                transition: 'transform 0.3s ease'
              }}>
                <Globe2 size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Global Publishing Administration</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We register your compositions across 60+ global collection societies (PRS, ASCAP, BMI, GEMA, SACEM, APRA AMCOS) so international broadcast royalties never get lost in black boxes.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#00E5FF', fontWeight: 700, fontSize: '0.9rem' }}>
              Explore Publishing Page →
            </div>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/sync')}
          >
            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.24) 0%, rgba(139, 92, 246, 0.10) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25), 0 8px 20px -4px rgba(168, 85, 247, 0.30)',
                color: '#C084FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                transition: 'transform 0.3s ease'
              }}>
                <Clapperboard size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Exclusive Sync Licensing Briefs</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Our sync team receives daily music briefs from advertising agencies, Hollywood studios, Netflix creators, and indie game developers seeking tracks across all genres.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#C084FC', fontWeight: 700, fontSize: '0.9rem' }}>
              Explore Sync Licensing Page →
            </div>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/tools/youtube-content-id')}
          >
            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.24) 0%, rgba(244, 63, 94, 0.10) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25), 0 8px 20px -4px rgba(239, 68, 68, 0.30)',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                transition: 'transform 0.3s ease'
              }}>
                <Video size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>YouTube Content ID & Shorts</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Monetize fan-made cover videos, tutorials, dance challenges, and background tracks using your music. Automated fingerprinting protects and monetizes your audio.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#F87171', fontWeight: 700, fontSize: '0.9rem' }}>
              Explore YouTube Content ID Page →
            </div>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.24) 0%, rgba(20, 184, 166, 0.10) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25), 0 8px 20px -4px rgba(16, 185, 129, 0.30)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                transition: 'transform 0.3s ease'
              }}>
                <Split size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Frictionless Auto-Splits</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Collaborating on a song? Input your producer's and co-writer's emails and percentages. Our backend splits payouts automatically upon receipt, with zero transfer fees.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#34D399', fontWeight: 700, fontSize: '0.9rem' }}>
              Zero-fee automated payouts ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
