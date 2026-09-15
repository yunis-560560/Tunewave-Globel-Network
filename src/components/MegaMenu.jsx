import React from 'react';
import { 
  Music, Film, Smartphone, Sparkles, Link as LinkIcon, Disc, Image as ImageIcon, 
  FileText, ShieldCheck, DollarSign, Clapperboard, Tv, Video, Award, Radio, 
  TrendingUp, Send, Target, Layers, Trophy, Building, Gift, Calendar, ArrowRight 
} from 'lucide-react';

const ICON_MAP = {
  distro: Music,
  video: Film,
  app: Smartphone,
  publishing: DollarSign,
  sync: Clapperboard,
  youtube: Video,
  promo: TrendingUp,
  playlists: Send,
  ads: Target
};

export default function MegaMenu({ data, theme = 'dark', onClose, onNavigate }) {
  if (!data) return null;
  const isLight = theme === 'light';

  return (
    <div 
      className="mega-menu-overlay"
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        background: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(9, 13, 21, 0.98)',
        backdropFilter: 'blur(30px)',
        borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isLight ? '0 30px 60px -15px rgba(0, 0, 0, 0.12)' : '0 30px 60px -15px rgba(0, 0, 0, 0.8)',
        padding: '36px 0 48px',
        zIndex: 90,
        animation: 'megaFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mega-card-item {
          transition: all 0.2s ease;
          border: 1px solid ${isLight ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.06)'};
          background: ${isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)'};
          border-radius: 14px;
          padding: 20px;
          cursor: pointer;
          display: flex;
          gap: 16px;
        }
        .mega-card-item:hover {
          background: ${isLight ? 'rgba(0, 126, 167, 0.05)' : 'rgba(255, 255, 255, 0.06)'};
          border-color: ${isLight ? 'rgba(0, 126, 167, 0.35)' : 'rgba(0, 229, 255, 0.4)'};
          transform: translateY(-2px);
        }
        .mega-tool-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 8px;
          color: ${isLight ? '#334155' : '#94A3B8'};
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.15s ease;
          cursor: pointer;
        }
        .mega-tool-link:hover {
          background: ${isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)'};
          color: ${isLight ? '#007EA7' : '#00E5FF'};
          padding-left: 18px;
        }
      `}</style>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48 }}>
        {/* Left Column: Featured Products */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: '#64748B', textTransform: 'uppercase' }}>
              {data.eyebrow}
            </span>
            <div style={{ height: 1, flex: 1, background: 'rgba(255, 255, 255, 0.06)' }} />
          </div>

          <h3 style={{ fontSize: '1.75rem', marginBottom: 24, fontWeight: 700, color: isLight ? '#0F172A' : '#FFFFFF' }}>
            {data.title} <span style={{ color: isLight ? '#007EA7' : '#00E5FF' }}>{data.titleAccent}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {data.featured.map((item) => {
              const IconComponent = ICON_MAP[item.icon] || Music;
              return (
                <div 
                  key={item.id} 
                  className="mega-card-item"
                  onClick={() => {
                    if (item.id === 'app' || item.id.includes('app')) {
                      onNavigate('/app');
                    } else if (item.id === 'video-distro' || item.id.includes('video') || item.id.includes('vevo')) {
                      onNavigate('/sell-your-music/vevo');
                    } else if (item.id === 'music-distro' || item.id.includes('distro')) {
                      onNavigate('/sell-your-music');
                    } else if (item.id.includes('publishing')) {
                      onNavigate('/publishing');
                    } else if (item.id.includes('sync')) {
                      onNavigate('/sync');
                    } else if (item.id.includes('youtube')) {
                      onNavigate('/tools/youtube-content-id');
                    } else if (item.id === 'promo' || item.id.includes('promo')) {
                      onNavigate('/promo');
                    } else if (item.id === 'playlists' || item.id.includes('playlist')) {
                      onNavigate('/playlists');
                    } else if (item.id === 'ad-launcher' || item.id.includes('ad')) {
                      onNavigate('/ad-launcher');
                    } else {
                      onNavigate('/grow');
                    }
                    onClose();
                  }}
                >
                  <div style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0, 229, 255, 0.1)', 
                    border: isLight ? '1px solid rgba(0, 126, 167, 0.25)' : '1px solid rgba(0, 229, 255, 0.25)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: isLight ? '#007EA7' : '#00E5FF',
                    flexShrink: 0
                  }}>
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: isLight ? '#0F172A' : '#FFFFFF' }}>{item.title}</h4>
                      {item.badge && (
                        <span style={{ 
                          fontSize: '0.62rem', 
                          padding: '1px 6px', 
                          borderRadius: 4, 
                          background: isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.15)', 
                          color: isLight ? '#007EA7' : '#00E5FF', 
                          fontWeight: 800,
                          letterSpacing: '0.05em' 
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: isLight ? '#475569' : '#94A3B8', lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Release & Growth Tools */}
        <div style={{ 
          borderLeft: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)', 
          paddingLeft: 36,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', color: isLight ? '#64748B' : '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>
              Specialized Tools & Features
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {data.tools.map((tool, idx) => (
                <div 
                  key={idx} 
                  className="mega-tool-link"
                  onClick={() => {
                    onNavigate(tool.path);
                    onClose();
                  }}
                >
                  <span>{tool.title}</span>
                  <ArrowRight size={14} opacity={0.6} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick App Store Badge */}
          <div 
            style={{ 
              marginTop: 24, 
              padding: '16px', 
              borderRadius: 12, 
              background: isLight ? 'rgba(0, 126, 167, 0.06)' : 'rgba(0, 229, 255, 0.05)', 
              border: isLight ? '1px solid rgba(0, 126, 167, 0.2)' : '1px solid rgba(0, 229, 255, 0.15)',
              cursor: 'pointer'
            }}
            onClick={() => {
              onNavigate('/app');
              onClose();
            }}
          >
            <div style={{ fontSize: '0.78rem', color: isLight ? '#007EA7' : '#00E5FF', fontWeight: 700, marginBottom: 6 }}>
              TUNEWAVE ARTIST APP
            </div>
            <p style={{ fontSize: '0.8rem', color: isLight ? '#475569' : '#94A3B8', marginBottom: 10 }}>
              Track daily streams and instant royalty payouts directly from your pocket.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: '0.75rem', color: isLight ? '#0F172A' : '#FFFFFF', padding: '4px 10px', background: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)', borderRadius: 6 }}>
                iOS App Store
              </span>
              <span style={{ fontSize: '0.75rem', color: isLight ? '#0F172A' : '#FFFFFF', padding: '4px 10px', background: isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)', borderRadius: 6 }}>
                Google Play
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
