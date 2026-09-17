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
            Tunewave delivers data intelligence, algorithmic momentum, and automated advertising tools designed specifically for modern independent music.
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
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.22) 0%, rgba(14, 165, 233, 0.10) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.38)',
                boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25), 0 8px 20px -4px rgba(0, 229, 255, 0.30)',
                color: '#00E5FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 22,
                transition: 'transform 0.3s ease'
              }}>
                <Send size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Direct Editorial Pitching</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Submit your unreleased songs directly to our in-house playlist curators. Tunewave artists are prioritized across verified Spotify genre tastemaker lists.
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00E5FF', display: 'flex', alignItems: 'center', gap: 6 }}>
              Explore Spotify Playlists <ArrowRight size={14} />
            </span>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/ad-launcher')}
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
                <Megaphone size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Automated Ad Launcher</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Launch targeted Meta, YouTube and Spotify ads connected to your music. Pick a campaign type, set your budget, and reach new fans in 3 clicks.
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34D399', display: 'flex', alignItems: 'center', gap: 6 }}>
              Configure Music Ads <ArrowRight size={14} />
            </span>
          </div>

          <div 
            className="glass-panel card-shimmer-sweep" 
            style={{ padding: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => onNavigate('/promo')}
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
                <BarChart3 size={24} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 10, color: 'var(--tw-text-white)' }}>Music Promotion Packages</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                Collaborate with dedicated in-house publicists, playlist pitchers, and PR specialists to spark momentum and land verified press coverage.
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C084FC', display: 'flex', alignItems: 'center', gap: 6 }}>
              View Promo Packages <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
