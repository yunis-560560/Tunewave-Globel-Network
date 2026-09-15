import React from 'react';
import { DollarSign, Clapperboard, Video, Split, Globe2, ShieldCheck, ArrowRight } from 'lucide-react';

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
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(21, 128, 61, 0.12)', color: 'var(--tw-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Globe2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Global Publishing Administration</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We register your compositions across 60+ global collection societies (PRS, ASCAP, BMI, GEMA, SACEM, APRA AMCOS) so international broadcast royalties never get lost in black boxes.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tw-lime)', fontWeight: 700, fontSize: '0.9rem' }}>
              Explore Publishing Page →
            </div>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/sync')}
          >
            <div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(109, 40, 217, 0.12)', color: 'var(--tw-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Clapperboard size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Exclusive Sync Licensing Briefs</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Our sync team receives daily music briefs from advertising agencies, Hollywood studios, Netflix creators, and indie game developers seeking tracks across all genres.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tw-purple)', fontWeight: 700, fontSize: '0.9rem' }}>
              Explore Sync Licensing Page →
            </div>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/tools/youtube-content-id')}
          >
            <div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Video size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>YouTube Content ID & Shorts</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Monetize fan-made cover videos, tutorials, dance challenges, and background tracks using your music. Automated fingerprinting protects and monetizes your audio.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontWeight: 700, fontSize: '0.9rem' }}>
              Explore YouTube Content ID Page →
            </div>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0, 229, 255, 0.12)', color: 'var(--tw-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Split size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Frictionless Auto-Splits</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Collaborating on a song? Input your producer's and co-writer's emails and percentages. Our backend splits payouts automatically upon receipt, with zero transfer fees.
              </p>
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tw-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
              Zero-fee automated payouts ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
