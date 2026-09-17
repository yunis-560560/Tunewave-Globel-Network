import React, { useState } from 'react';
import Logo from '../components/Logo';
import { 
  BarChart3, Upload, Disc, Play, Pause, DollarSign, ArrowUpRight, 
  CheckCircle, Radio, Sparkles, Plus, Clock, Globe, X 
} from 'lucide-react';

export default function ArtistDashboard({ artistName = 'Nova Luna', onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const [releases, setReleases] = useState([
    {
      id: 1,
      title: "Midnight Echoes",
      type: "Single",
      releaseDate: "2026-08-20",
      streams: "682,410",
      earnings: "$2,854.20",
      status: "Live on 150+ Stores",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80"
    },
    {
      id: 2,
      title: "Electric Horizon (VIP Mix)",
      type: "Single",
      releaseDate: "2026-07-14",
      streams: "419,200",
      earnings: "$1,752.40",
      status: "Live on 150+ Stores",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80"
    },
    {
      id: 3,
      title: "Cybernetic Soul",
      type: "EP (4 Tracks)",
      releaseDate: "2026-05-02",
      streams: "741,300",
      earnings: "$3,105.80",
      status: "Live on 150+ Stores",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80"
    }
  ]);

  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackType, setNewTrackType] = useState('Single');

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newRelease = {
      id: Date.now(),
      title: newTrackTitle || 'Untitled Release',
      type: newTrackType,
      releaseDate: new Date().toISOString().split('T')[0],
      streams: "0",
      earnings: "$0.00",
      status: "Processing (48h Ingest)",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80"
    };
    setReleases([newRelease, ...releases]);
    setShowUploadModal(false);
    setNewTrackTitle('');
  };

  return (
    <div style={{ padding: '36px 0 80px', minHeight: '90vh' }}>
      <div className="container">
        {/* Top Artist Bar */}
        {/* Top Artist Bar */}
        <div className="reveal-up" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          background: 'var(--tw-bg-card)',
          border: '1px solid var(--tw-line-bright)',
          borderRadius: 20,
          padding: '24px 32px',
          marginBottom: 36,
          boxShadow: 'var(--tw-shadow-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--tw-cyan) 0%, var(--tw-purple) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: "var(--tw-text-white)"
            }}>
              {artistName.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--tw-text-white)' }}>{artistName}</h1>
                <span className="pill-badge live" style={{ padding: '2px 8px', fontSize: '0.68rem' }}>
                  ? VERIFIED ARTIST
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--tw-text-muted)', marginTop: 2 }}>
                Tunewave Global Network ID: TW-8842-GL · Pro Distribution Active
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-cyan"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              <Plus size={16} />
              <span>Create New Release</span>
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="btn-glass"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              Public Site
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="reveal-stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 36
        }}>
          <div className="glass-panel card-shimmer-sweep" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-muted)' }}>TOTAL STREAMS</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--tw-cyan)', fontWeight: 700 }}>+24.8% ?</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--tw-text-white)', fontFamily: "'Space Grotesk', sans-serif" }}>
              1,842,910
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-muted)', marginTop: 6 }}>
              Across Spotify, Apple, TikTok, Tidal
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-muted)' }}>ROYALTIES READY</span>
              <span className="pill-badge live" style={{ padding: '2px 8px', fontSize: '0.68rem' }}>100% CUT</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--tw-cyan)', fontFamily: "'Space Grotesk', sans-serif" }}>
              $7,712.40
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--tw-text-muted)' }}>Cleared for instant payout</span>
              <button
                onClick={() => setWithdrawSuccess(true)}
                style={{ fontSize: '0.75rem', color: 'var(--tw-cyan)', fontWeight: 700, textDecoration: 'underline' }}
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-muted)' }}>EDITORIAL PLAYLISTS</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--tw-purple)', fontWeight: 700 }}>4 ACTIVE</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--tw-lime)', fontFamily: "'Space Grotesk', sans-serif" }}>
              14 Placements
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-muted)', marginTop: 6 }}>
              Includes New Music Friday & Dance Rising
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--tw-text-muted)' }}>DSP DELIVERY STATUS</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }} />
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--tw-text-white)', fontFamily: "'Space Grotesk', sans-serif" }}>
              100% Ingested
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-muted)', marginTop: 6 }}>
              Live in 150+ countries worldwide
            </div>
          </div>
        </div>

        {/* Withdrawal Success Alert */}
        {withdrawSuccess && (
          <div style={{
            background: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            borderRadius: 14,
            padding: '16px 20px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CheckCircle size={20} color="#00E5FF" />
              <span style={{ fontSize: '0.9rem', color: '#E2E8F0' }}>
                Withdrawal of <strong>$7,712.40</strong> initiated! Funds will land in your linked bank account within 24 hours.
              </span>
            </div>
            <button onClick={() => setWithdrawSuccess(false)} style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
              Dismiss
            </button>
          </div>
        )}

        {/* Catalog Table */}
        <div style={{
          background: 'var(--tw-bg-card)',
          border: '1px solid var(--tw-line-bright)',
          borderRadius: 20,
          padding: '28px 32px',
          boxShadow: 'var(--tw-shadow-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)' }}>Active Discography & Releases</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--tw-text-dim)' }}>All catalog masters distributed through Tunewave Global Network</p>
            </div>

            {/* Audio Waveform Simulator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'var(--tw-cyan)',
                  color: "var(--tw-text-white)",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <div className="waveform-container">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="waveform-bar"
                    style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--tw-line)', color: 'var(--tw-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Release Title</th>
                  <th style={{ padding: '12px 16px' }}>Type</th>
                  <th style={{ padding: '12px 16px' }}>Release Date</th>
                  <th style={{ padding: '12px 16px' }}>Total Streams</th>
                  <th style={{ padding: '12px 16px' }}>Master Earnings</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {releases.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--tw-line)' }}>
                    <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <img
                        src={item.cover}
                        alt=""
                        style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>{item.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-muted)' }}>ISRC: QZ-TW2-26-00{item.id.toString().slice(-4)}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--tw-text-dim)', fontSize: '0.88rem' }}>{item.type}</td>
                    <td style={{ padding: '16px', color: 'var(--tw-text-dim)', fontSize: '0.88rem' }}>{item.releaseDate}</td>
                    <td style={{ padding: '16px', fontWeight: 700, color: 'var(--tw-text-white)', fontSize: '0.92rem' }}>{item.streams}</td>
                    <td style={{ padding: '16px', fontWeight: 800, color: 'var(--tw-cyan)', fontSize: '0.95rem' }}>{item.earnings}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 9999,
                        background: 'rgba(0, 229, 255, 0.12)',
                        color: 'var(--tw-cyan)',
                        border: '1px solid rgba(0, 229, 255, 0.3)'
                      }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(20px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}>
            <div style={{
              background: 'var(--tw-bg-surface)',
              border: '1px solid var(--tw-line-bright)',
              borderRadius: 24,
              padding: 36,
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--tw-text-white)' }}>Distribute New Track</h3>
                <button onClick={() => setShowUploadModal(false)} style={{ color: 'var(--tw-text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--tw-text-dim)', marginBottom: 6 }}>
                    Track Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neon Sunset"
                    value={newTrackTitle}
                    onChange={(e) => setNewTrackTitle(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--tw-bg-card)',
                      border: '1px solid var(--tw-line-bright)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--tw-text-dim)', marginBottom: 6 }}>
                    Release Format
                  </label>
                  <select
                    value={newTrackType}
                    onChange={(e) => setNewTrackType(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--tw-bg-card)',
                      border: '1px solid var(--tw-line-bright)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Single">Single (1 Track)</option>
                    <option value="EP">EP (2-6 Tracks)</option>
                    <option value="Album">Full Album (7+ Tracks)</option>
                  </select>
                </div>

                {/* Dropzone mockup */}
                <div style={{
                  border: '2px dashed rgba(0, 229, 255, 0.3)',
                  borderRadius: 14,
                  padding: '28px 20px',
                  textAlign: 'center',
                  background: 'rgba(0, 229, 255, 0.03)'
                }}>
                  <Upload size={32} color="#00E5FF" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    Upload 24-bit WAV or FLAC Audio
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 4 }}>
                    Lossless masters are converted automatically for Spotify & Apple Lossless
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button type="submit" className="btn-cyan" style={{ flex: 1 }}>
                    Confirm & Submit to Stores
                  </button>
                  <button type="button" onClick={() => setShowUploadModal(false)} className="btn-glass">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
