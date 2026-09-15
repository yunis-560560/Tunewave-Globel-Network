import React, { useState } from 'react';
import { 
  Music, Sparkles, ArrowRight, CheckCircle2, ChevronDown, 
  Play, ExternalLink, Filter, Search, Send, Disc3, Radio,
  Headphones, Heart, Share2, Check, HelpCircle, Flame, Users, Clock, X
} from 'lucide-react';

export default function PlaylistsPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [pitchModalPlaylist, setPitchModalPlaylist] = useState(null);
  const [pitchFormSubmitted, setPitchFormSubmitted] = useState(false);
  const [pitchData, setPitchData] = useState({
    artistName: '',
    trackTitle: '',
    spotifyUrl: '',
    genre: '',
    pitchNote: ''
  });

  const PLAYLISTS_DATA = [
    {
      id: 'tw-coffee',
      title: 'TuneWave Coffee',
      category: 'chill',
      categoryLabel: 'Indie & Chill',
      followers: '48.5K',
      tracks: 120,
      description: 'Mellow morning acoustic, gentle indie pop, and lo-fi melodies to kick off your day with warm tranquility.',
      tags: ['Acoustic', 'Chill Pop', 'Morning', 'Instrumental'],
      accentColor: 'rgba(56, 189, 248, 0.12)', iconColor: '#38BDF8',
      curator: 'TuneWave Acoustic Desk'
    },
    {
      id: 'tw-discovered',
      title: 'TuneWave Discovered',
      category: 'indie',
      categoryLabel: 'Indie & Chill',
      followers: '85.2K',
      tracks: 95,
      description: 'The frontline of independent talent. Breaking underground hits, next-gen bedroom pop, and standout indie tracks.',
      tags: ['Indie Rock', 'Alt-Pop', 'Breaking Artists', 'New Music'],
      accentColor: 'rgba(0, 229, 255, 0.15)',
      iconcolor: 'var(--tw-cyan)',
      curator: 'Global Editorial Lead'
    },
    {
      id: 'headphones',
      title: 'HEADPHONES',
      category: 'urban',
      categoryLabel: 'Hip-Hop & Urban',
      followers: '62.8K',
      tracks: 80,
      description: 'Late-night heavy 808s, introspective lyricism, modern trap anthems, and underground hip-hop mastery.',
      tags: ['Hip-Hop', 'Trap', 'Boom Bap', 'Dark Beats'],
      accentColor: 'rgba(14, 165, 233, 0.12)', iconColor: '#0EA5E9',
      curator: 'TuneWave Urban Dept'
    },
    {
      id: 'patterned',
      title: 'Patterned',
      category: 'chill',
      categoryLabel: 'Indie & Chill',
      followers: '34.1K',
      tracks: 75,
      description: 'Polyrhythmic grooves, future jazz, left-field neo-soul, and organic beat culture. Curated for the crate digger.',
      tags: ['Neo-Soul', 'Future Beats', 'Leftfield', 'Nu-Jazz'],
      accentColor: 'rgba(0, 229, 255, 0.12)', iconcolor: 'var(--tw-cyan)',
      curator: 'Soul & Groove Desk'
    },
    {
      id: 'feeling-it',
      title: 'Feeling It - New R&B',
      category: 'urban',
      categoryLabel: 'Hip-Hop & Urban',
      followers: '41.6K',
      tracks: 65,
      description: 'Velvety contemporary R&B, soulful vocal runs, sultry slow jams, and magnetic midnight romantic rhythms.',
      tags: ['R&B', 'Soul', 'Slow Jams', 'Vocals'],
      accentColor: 'rgba(244, 63, 94, 0.15)',
      iconColor: '#F43F5E',
      curator: 'R&B Editorial Curators'
    },
    {
      id: 'speaker-wajda',
      title: 'Speaker Wajda',
      category: 'global',
      categoryLabel: 'Latin & Global',
      followers: '29.3K',
      tracks: 90,
      description: 'Pumping Punjabi drill, high-octane Urban Desi bangers, UK Punjabi club mixes, and forward-thinking diaspora heat.',
      tags: ['Punjabi Drill', 'Urban Desi', 'Bhangra Bass', 'Desi Trap'],
      accentColor: 'rgba(234, 179, 8, 0.15)',
      iconColor: '#EAB308',
      curator: 'South Asian Sounds'
    },
    {
      id: 'the-drop',
      title: 'The Drop',
      category: 'electronic',
      categoryLabel: 'Electronic & Dance',
      followers: '52.4K',
      tracks: 110,
      description: 'Peak-time festival weapons, melodic house, energetic techno, and bass-heavy dancefloor anthems.',
      tags: ['EDM', 'Melodic Techno', 'Tech House', 'Bass'],
      accentColor: 'rgba(59, 130, 246, 0.15)',
      iconColor: '#3B82F6',
      curator: 'TuneWave Electronic Club'
    },
    {
      id: 'loud-in-the-car',
      title: 'Loud In The Car',
      category: 'urban',
      categoryLabel: 'Hip-Hop & Urban',
      followers: '77.9K',
      tracks: 85,
      description: 'Turn the volume up until the speakers rattle. High-energy drill, aggressive trap drops, and driving companion anthems.',
      tags: ['Car Banger', 'Drill', 'Hype', 'Gym Workout'],
      accentColor: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#EF4444',
      curator: 'Hype & Energy Curation'
    },
    {
      id: 'brazil-com-s',
      title: 'Brazil com S',
      category: 'global',
      categoryLabel: 'Latin & Global',
      followers: '31.7K',
      tracks: 70,
      description: 'Authentic Brazilian rhythm: Baile funk carioca, modern Bossa Nova, MPB refresh, and São Paulo trap.',
      tags: ['Funk Carioca', 'MPB', 'Bossa Nova', 'Brasil Urbano'],
      accentColor: 'rgba(34, 197, 94, 0.15)',
      iconColor: '#22C55E',
      curator: 'Latin America Team'
    },
    {
      id: 'musica-pa-farra',
      title: 'Música Pa\' Farra',
      category: 'global',
      categoryLabel: 'Latin & Global',
      followers: '46.8K',
      tracks: 100,
      description: 'The ultimate Latin fiesta selector: Reggaeton clásico & nuevo, dembow, Latin trap, and Caribbean dance grooves.',
      tags: ['Reggaeton', 'Dembow', 'Fiesta', 'Latin Pop'],
      accentColor: 'rgba(249, 115, 22, 0.15)',
      iconColor: '#F97316',
      curator: 'Latin Urban Editors'
    },
    {
      id: 'african-glow',
      title: 'African Glow',
      category: 'global',
      categoryLabel: 'Latin & Global',
      followers: '58.3K',
      tracks: 95,
      description: 'Lagos to Johannesburg. Sun-drenched Afrobeats, deep Amapiano log-drums, Afro-fusion, and highlife textures.',
      tags: ['Afrobeats', 'Amapiano', 'Afro-Fusion', 'Highlife'],
      accentColor: 'rgba(56, 189, 248, 0.12)', iconColor: '#38BDF8',
      curator: 'African Sounds Desk'
    },
    {
      id: 'conexion-latina',
      title: 'Conexión Latina',
      category: 'global',
      categoryLabel: 'Latin & Global',
      followers: '38.0K',
      tracks: 80,
      description: 'Spanning across Latin America: Indie rock en español, electro-cumbia, alternative pop, and bilingual rhythms.',
      tags: ['Indie Español', 'Latin Pop', 'Cumbia', 'Alt-Latin'],
      accentColor: 'rgba(20, 184, 166, 0.15)',
      iconColor: '#14B8A6',
      curator: 'Latin Alternative Desk'
    },
    {
      id: 'asia-topia',
      title: 'Asia Topia',
      category: 'global',
      categoryLabel: 'Latin & Global',
      followers: '24.6K',
      tracks: 60,
      description: 'Pan-Asian contemporary soundscapes: K-Indie, Japanese City Pop vibes, Asian hip-hop, and bedroom electro-pop.',
      tags: ['K-Indie', 'City Pop', 'Asian Lo-Fi', 'Pop'],
      accentColor: 'rgba(168, 85, 247, 0.15)',
      iconColor: '#A855F7',
      curator: 'Asia-Pacific Editorial'
    },
    {
      id: 'the-indie-hitlist',
      title: 'The Indie Hitlist',
      category: 'indie',
      categoryLabel: 'Indie & Chill',
      followers: '67.1K',
      tracks: 88,
      description: 'The premier weekly destination for jangly guitars, post-punk vitality, fuzzy shoegaze, and indie anthems.',
      tags: ['Indie Rock', 'Post-Punk', 'Dream Pop', 'Alternative'],
      accentColor: 'rgba(0, 229, 255, 0.12)',
      iconcolor: 'var(--tw-cyan)',
      curator: 'Rock & Indie Lead'
    },
    {
      id: 'folkify',
      title: 'Folkify',
      category: 'indie',
      categoryLabel: 'Indie & Chill',
      followers: '36.5K',
      tracks: 70,
      description: 'Intimate storytelling, fingerpicked guitars, rich vocal harmonies, and raw modern singer-songwriter pieces.',
      tags: ['Modern Folk', 'Acoustic', 'Storyteller', 'Americana'],
      accentColor: 'rgba(0, 242, 254, 0.12)', iconColor: '#00F2FE',
      curator: 'Folk & Roots Desk'
    }
  ];

  const PLAYLIST_FAQS = [
    {
      q: "Who can pitch music to TuneWave playlists?",
      a: "Anyone can pitch! While our editorial curation desk prioritizes artists who distribute their catalog through TuneWave, our submission system is open to all independent artists, bands, producers, and labels worldwide."
    },
    {
      q: "Do you charge fees for playlist pitching or inclusion?",
      a: "Never. TuneWave will never charge pitching fees, submission costs, or payola. Charging artists for playlist placement violates Spotify's platform terms of service. Our curators choose songs purely based on musical merit, production excellence, and fit for the playlist's listener mood."
    },
    {
      q: "When should I submit my track?",
      a: "We recommend pitching at least 2 to 3 weeks before your official release date if you have a Spotify pre-save link. If your track is already live on streaming platforms, you can submit at any time — our curation desk meets twice weekly on Tuesdays and Fridays to review new releases."
    },
    {
      q: "How many playlists can I pitch my music to?",
      a: "You can pitch your track to whichever playlist best matches your genre and sonic energy. If our curators feel your track is also a great match for other TuneWave playlists, they will cross-feature or route your track internally across our network."
    },
    {
      q: "How will I know if my track gets added?",
      a: "If your track is chosen by our curation team, you'll receive a notification email with direct links to the playlist, and our social media team regularly tags featured artists on Instagram, TikTok, and Twitter (@TuneWaveMusic)."
    }
  ];

  const filteredPlaylists = PLAYLISTS_DATA.filter(pl => {
    const matchesCategory = activeCategory === 'all' || pl.category === activeCategory;
    const matchesSearch = 
      pl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pl.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePitchSubmit = (e) => {
    e.preventDefault();
    setPitchFormSubmitted(true);
    setTimeout(() => {
      setPitchFormSubmitted(false);
      setPitchModalPlaylist(null);
      setPitchData({
        artistName: '',
        trackTitle: '',
        spotifyUrl: '',
        genre: '',
        pitchNote: ''
      });
    }, 2800);
  };

  return (
    <div className="playlists-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', padding: '50px 0 80px', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          
          {/* Eyebrow badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span className="pill-badge" style={{ 
              color: 'var(--tw-cyan)', 
              background: 'rgba(0, 229, 255, 0.12)', 
              border: '1px solid rgba(0, 229, 255, 0.3)' 
            }}>
              <Radio size={13} style={{ marginRight: 4 }} />
              SPOTIFY EDITORIAL PLAYLISTS · 100% FREE SUBMISSIONS
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: 'var(--tw-text-white)',
            marginBottom: 20,
            letterSpacing: '-0.02em',
            maxWidth: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Submit to our <br />
            <span className="text-cyan-gradient">Spotify Playlists.</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--tw-text-dim)',
            maxWidth: 720,
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Browse our verified playlists and pitch your track below. Our editorial team reviews every single submission and we love featuring TuneWave-distributed artists across the globe.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 54 }}>
            <a
              href="#playlists-browser"
              className="btn-cyan"
              style={{ padding: '15px 34px', fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
            >
              <Music size={18} />
              <span>Pitch Your Music</span>
            </a>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel"
              style={{
                padding: '15px 28px',
                fontSize: '0.98rem',
                fontWeight: 700,
                color: 'var(--tw-text-white)',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                border: '1px solid var(--tw-line)'
              }}
            >
              <span>Follow on Spotify</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* 4 Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 18,
            maxWidth: 960,
            margin: '0 auto',
            textAlign: 'left'
          }}>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '-0.02em' }}>15+</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Curated Playlists</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-lime)', letterSpacing: '-0.02em' }}>550K+</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Active Monthly Listeners</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-purple)', letterSpacing: '-0.02em' }}>Weekly</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Editorial Refresh Cycles</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: 16 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '-0.02em' }}>100% Free</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', fontWeight: 600, marginTop: 4 }}>Zero Pitching or Add Fees</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PLAYLISTS DIRECTORY */}
      <section id="playlists-browser" style={{ padding: '40px 0 90px' }}>
        <div className="container">
          
          {/* Header Row: Title & Search */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 20, 
            marginBottom: 32 
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--tw-text-white)', letterSpacing: '-0.02em' }}>
                  Our Official Playlists
                </h2>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 229, 255, 0.1)' }}>
                  {filteredPlaylists.length} Available
                </span>
              </div>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.94rem', marginTop: 6 }}>
                Select your genre below to find the ideal match for your latest track.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--tw-text-dim)' }} />
              <input
                type="text"
                placeholder="Search by name, mood, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--tw-line)',
                  color: 'var(--tw-text-white)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
            {[
              { id: 'all', label: 'All Playlists' },
              { id: 'indie', label: 'Indie & Chill' },
              { id: 'urban', label: 'Hip-Hop & Urban' },
              { id: 'electronic', label: 'Electronic & Dance' },
              { id: 'global', label: 'Latin & Global' }
            ].map(cat => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 10,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: active ? '1px solid var(--tw-cyan)' : '1px solid var(--tw-line)',
                    background: active ? 'var(--tw-cyan)' : 'rgba(255, 255, 255, 0.03)',
                    color: active ? '#000000' : 'var(--tw-text-dim)'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Playlists Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 26
          }}>
            {filteredPlaylists.map(pl => (
              <div 
                key={pl.id}
                className="glass-panel card-shimmer-sweep"
                style={{
                  padding: 28,
                  borderRadius: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--tw-line)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div>
                  {/* Top Row: Icon + Stats */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: pl.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pl.iconColor,
                      border: `1px solid ${pl.iconColor}40`
                    }}>
                      <Disc3 size={24} />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: 9999,
                        background: 'rgba(0, 229, 255, 0.12)',
                        color: 'var(--tw-cyan)',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Users size={12} />
                        {pl.followers}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>
                        {pl.tracks} tracks
                      </div>
                    </div>
                  </div>

                  {/* Category Eyebrow & Title */}
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--tw-cyan)', textTransform: 'uppercase', marginBottom: 6 }}>
                    {pl.categoryLabel}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                    {pl.title}
                  </h3>

                  <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 18 }}>
                    {pl.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
                    {pl.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--tw-text-dim)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                  <button
                    onClick={() => setPitchModalPlaylist(pl)}
                    className="btn-cyan"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    <Send size={13} />
                    <span>Pitch Track</span>
                  </button>

                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(pl.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel"
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--tw-text-white)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      border: '1px solid var(--tw-line)'
                    }}
                  >
                    <Play size={12} fill="currentColor" />
                    <span>Listen</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {filteredPlaylists.length === 0 && (
            <div className="glass-panel" style={{ padding: 48, textAlign: 'center', borderRadius: 20 }}>
              <Disc3 size={40} style={{ color: 'var(--tw-text-dim)', margin: '0 auto 12px', opacity: 0.5 }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>No playlists match your filter</h4>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', marginTop: 4 }}>Try clearing search keywords or choosing a different genre tab.</p>
              <button 
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="btn-cyan"
                style={{ marginTop: 16, padding: '8px 20px', fontSize: '0.82rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. HOW PITCHING WORKS (3 STEPS) */}
      <section style={{ padding: '80px 0', background: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid var(--tw-line)', borderBottom: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              THE PITCHING PIPELINE
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 12, marginBottom: 12 }}>
              How Playlist Pitching Works
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
              Get your tracks evaluated by genuine music curators with zero automated bot playlists or payola.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28
          }}>
            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, borderRadius: 20 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(0, 229, 255, 0.12)',
                color: 'var(--tw-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: 20,
                border: '1px solid rgba(0, 229, 255, 0.3)'
              }}>
                01
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                Submit your track
              </h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                Provide your Spotify track URL or pre-save link along with genre tags and a brief pitch note outlining your release backstory.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--tw-cyan)', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> Takes less than 60 seconds
              </div>
            </div>

            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, borderRadius: 20 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(139, 92, 246, 0.12)',
                color: 'var(--tw-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: 20,
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                02
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                Our curators listen
              </h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                Our internal editorial curation team listens to every single incoming submission across all genres twice a week without algorithms.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--tw-purple)', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> Real humans, no AI scrapers
              </div>
            </div>

            <div className="glass-panel card-shimmer-sweep" style={{ padding: 32, borderRadius: 20 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(0, 229, 255, 0.12)',
                color: 'var(--tw-lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: 20,
                border: '1px solid rgba(0, 229, 255, 0.3)'
              }}>
                03
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 10 }}>
                Get featured worldwide
              </h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 20 }}>
                Accepted tracks are slotted directly into high-rotation playlist positions and boosted to our 550,000+ monthly listener community.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--tw-lime)', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> Zero fees, 100% royalties kept
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CURATOR PRO-TIPS SECTION */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: 48, borderRadius: 24, border: '1px solid var(--tw-line)' }}>
            <div style={{ marginBottom: 36 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                EDITORIAL STANDARDS
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 10, marginBottom: 8 }}>
                Tips to maximize your playlist acceptance
              </h2>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem' }}>
                Follow these industry standards vetted by Spotify playlist curators to increase your chances of placement.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20
            }}>
              <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
                <Clock size={24} color="var(--tw-cyan)" style={{ marginBottom: 14 }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)', marginBottom: 6 }}>Pitch Early</h4>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                  Submit 2 to 4 weeks prior to release day so our curators can schedule your track into upcoming Friday editorial refreshes.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
                <Headphones size={24} color="var(--tw-purple)" style={{ marginBottom: 14 }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)', marginBottom: 6 }}>Master Loudness</h4>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                  Ensure your master audio hits Spotify's broadcast streaming standard of -14 LUFS integrated without digital clipping.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
                <Sparkles size={24} color="var(--tw-lime)" style={{ marginBottom: 14 }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)', marginBottom: 6 }}>Spotify Profile</h4>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                  Keep your artist profile verified with an updated high-res bio, canvas video loops, and active social links.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
                <Flame size={24} color="#00E5FF" style={{ marginBottom: 14 }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)', marginBottom: 6 }}>Craft Your Pitch</h4>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                  Tell us who produced it, what emotional mood it evokes, and any viral social momentum behind the release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS ACCORDION */}
      <section style={{ padding: '70px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
              GOT QUESTIONS?
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 10, marginBottom: 8 }}>
              Playlists FAQ
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem' }}>
              Everything you need to know about our Spotify playlist pitching system.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PLAYLIST_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-panel"
                  style={{
                    borderRadius: 16,
                    border: isOpen ? '1px solid rgba(0, 229, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isOpen ? 'rgba(0, 229, 255, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--tw-text-white)',
                      fontSize: '1rem',
                      fontWeight: 700
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: isOpen ? 'var(--tw-cyan)' : 'var(--tw-text-dim)',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      color: 'var(--tw-text-dim)',
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                      paddingTop: 14
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section style={{ padding: '60px 0 30px' }}>
        <div className="container" style={{ maxWidth: 940 }}>
          <div className="glass-panel" style={{
            padding: 56,
            borderRadius: 28,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(9, 7, 20, 0.95) 50%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.3)'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 14 }}>
              Not a TuneWave member yet?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--tw-text-dim)', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.6 }}>
              Join thousands of independent artists releasing music to 150+ stores worldwide. Members get priority submission review and automated sync pitching.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate && onNavigate('/pricing')}
                className="btn-cyan"
                style={{ padding: '16px 36px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span>Get Started with TuneWave</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setPitchModalPlaylist(PLAYLISTS_DATA[0])}
                className="glass-panel"
                style={{
                  padding: '16px 30px',
                  borderRadius: 12,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--tw-text-white)',
                  cursor: 'pointer',
                  border: '1px solid var(--tw-line)'
                }}
              >
                Pitch Music Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE PITCH MODAL */}
      {pitchModalPlaylist && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: 580,
            borderRadius: 24,
            padding: 36,
            background: 'rgba(12, 10, 26, 0.98)',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--tw-line)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Direct Editorial Pitch
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--tw-text-white)', marginTop: 2 }}>
                  Pitch to {pitchModalPlaylist.title}
                </h3>
              </div>
              <button
                onClick={() => setPitchModalPlaylist(null)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: 'var(--tw-text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {pitchFormSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(0, 229, 255, 0.15)',
                  color: 'var(--tw-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  border: '1px solid rgba(0, 229, 255, 0.4)'
                }}>
                  <Check size={32} />
                </div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 8 }}>
                  Submission Received!
                </h4>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
                  Our editorial curators review all incoming pitches on Tuesdays and Fridays. You will receive an email if your track is selected.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePitchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--tw-text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                      Artist Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Luna Eclipse"
                      value={pitchData.artistName}
                      onChange={(e) => setPitchData({ ...pitchData, artistName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--tw-line)',
                        color: 'var(--tw-text-white)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--tw-text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                      Track Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Midnight Drive"
                      value={pitchData.trackTitle}
                      onChange={(e) => setPitchData({ ...pitchData, trackTitle: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--tw-line)',
                        color: 'var(--tw-text-white)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--tw-text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                    Spotify Track URL or Pre-Save Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://open.spotify.com/track/... or pre-save link"
                    value={pitchData.spotifyUrl}
                    onChange={(e) => setPitchData({ ...pitchData, spotifyUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--tw-line)',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--tw-text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                    Primary Genre *
                  </label>
                  <select
                    required
                    value={pitchData.genre}
                    onChange={(e) => setPitchData({ ...pitchData, genre: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: 'rgba(15, 12, 30, 0.95)',
                      border: '1px solid var(--tw-line)',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value="">Select genre...</option>
                    <option value="Indie Pop / Rock">Indie Pop / Rock</option>
                    <option value="Hip-Hop / Rap">Hip-Hop / Rap</option>
                    <option value="R&B / Soul">R&B / Soul</option>
                    <option value="Electronic / Dance">Electronic / Dance</option>
                    <option value="Latin / Reggaeton">Latin / Reggaeton</option>
                    <option value="Afrobeats">Afrobeats</option>
                    <option value="Acoustic / Folk">Acoustic / Folk</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--tw-text-dim)', textTransform: 'uppercase', marginBottom: 6 }}>
                    Curator Pitch Note (Tell us your story)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe the track, mood, production backstory, or social momentum..."
                    value={pitchData.pitchNote}
                    onChange={(e) => setPitchData({ ...pitchData, pitchNote: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--tw-line)',
                      color: 'var(--tw-text-white)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => setPitchModalPlaylist(null)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: 'var(--tw-text-dim)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-cyan"
                    style={{
                      padding: '10px 24px',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Send size={14} />
                    <span>Submit Pitch for Free</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
