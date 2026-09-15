import React from 'react';
import { Megaphone, BarChart3, Send, Wand2, Smartphone, Trophy, ArrowRight } from 'lucide-react';

export default function GrowPage({ onNavigate }) {
  return (
    <div style={{ paddingTop: 40, paddingBottom: 100 }}>
      <div className="container">
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>03 · AUDIENCE GROWTH & MARKETING</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20,
            color: 'var(--tw-text-white)'
          }}>
            Turn casual listeners into <br />
            <span className="text-cyan-gradient">a dedicated global fanbase.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--tw-text-dim)', maxWidth: '700px', margin: '0 auto 36px' }}>
            TuneWave delivers data intelligence, algorithmic momentum, and automated advertising tools designed specifically for modern independent music.
          </p>

          <button onClick={() => onNavigate('/signup')} className="btn-cyan" style={{ padding: '16px 36px' }}>
            <span>Explore Growth Toolkit</span>
            <ArrowRight size={18} className="btn-icon-hover" />
          </button>
        </div>

        {/* 3 Feature Columns */}
        <div className="reveal-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          marginBottom: 80
        }}>
          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/playlists')}
          >
            <div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0, 126, 167, 0.12)', color: 'var(--tw-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Send size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Direct Editorial Pitching</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Submit your unreleased songs directly to our in-house playlist curators. TuneWave artists are prioritized across verified Spotify genre tastemaker lists.
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-cyan)', display: 'flex', alignItems: 'center', gap: 6 }}>
              Explore Spotify Playlists <ArrowRight size={14} />
            </span>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/ad-launcher')}
          >
            <div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(21, 128, 61, 0.12)', color: 'var(--tw-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Megaphone size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Automated Ad Launcher</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Launch targeted Meta, YouTube and Spotify ads connected to your music. Pick a campaign type, set your budget, and reach new fans in 3 clicks.
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-lime)', display: 'flex', alignItems: 'center', gap: 6 }}>
              Configure Music Ads <ArrowRight size={14} />
            </span>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/promo')}
          >
            <div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(109, 40, 217, 0.12)', color: 'var(--tw-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <BarChart3 size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Music Promotion Packages</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Collaborate with dedicated in-house publicists, playlist pitchers, and PR specialists to spark momentum and land verified press coverage.
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-purple)', display: 'flex', alignItems: 'center', gap: 6 }}>
              View Promo Packages <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
