import React, { useState } from 'react';
import { 
  DollarSign, Globe2, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, 
  ChevronDown, Play, Radio, Music, Tv, Film, Disc, Layers, HelpCircle, 
  TrendingUp, Star, Video, ExternalLink 
} from 'lucide-react';

export default function PublishingPage({ onNavigate, theme }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const PUBLISHING_FAQS = [
    {
      q: "What is music publishing?",
      a: "Music publishing is the management and collection of royalties generated from the composition and songwriting of your music (the lyrics, melody, chords and arrangement). While distribution collects royalties for the sound recording (master), publishing collects mechanical, performance and sync royalties whenever your songs are streamed, downloaded, performed live, or broadcast on TV, radio, and public venues."
    },
    {
      q: "What's the difference between a PRO and a music publisher?",
      a: "A Performing Rights Organization (PRO like BMI, ASCAP, PRS) only collects performance royalties within their specific territory or reciprocal agreements. A music publisher like TuneWave Publishing collects both performance and mechanical royalties globally from over 60 collection societies worldwide, uncovers uncollected 'black box' royalties, and actively pitches your catalog for sync licensing briefs."
    },
    {
      q: "Do I need an IPI number to register for publishing royalties?",
      a: "An IPI (Interested Party Information) or CAE number is a unique 9 to 11 digit identifier assigned to songwriters and publishers. When you sign up for TuneWave Publishing, if you already have an IPI number from your local society, you can enter it directly. If you don't have one yet, our team will assist you in generating and affiliating your writer credentials."
    },
    {
      q: "What are mechanical royalties?",
      a: "Mechanical royalties are paid to songwriters and publishers whenever a song is reproduced or mechanically copied into physical formats (vinyl, CD) or digital interactive formats (Spotify, Apple Music on-demand streams, iTunes downloads). In most countries, mechanicals are handled separately from performance royalties and require a publisher to collect them."
    },
    {
      q: "What are performance royalties?",
      a: "Performance royalties are generated whenever your composition is performed publicly. This includes live gigs, festival sets, radio broadcasts, TV shows, bars, clubs, digital radio, and even non-interactive webcasts. TuneWave logs your live setlists so you get paid every time you perform your original songs on stage."
    },
    {
      q: "How long does it take to start receiving publishing royalties?",
      a: "Collection societies worldwide operate on different quarterly accounting schedules (often between 6 to 9 months in arrears due to international reciprocal accounting). Once we register your songs across global collection databases, royalties start appearing in your TuneWave dashboard each quarter alongside your regular distribution earnings."
    }
  ];

  const ROYALTIES_DATA = [
    {
      id: "streaming",
      title: "Streaming",
      tag: "MECHANICAL & PERFORMANCE",
      icon: Music,
      color: "var(--tw-cyan)",
      body: "Mechanical streaming royalties generated whenever your music is streamed on Spotify, Apple Music, Tidal, Amazon Music, Deezer and 150+ interactive streaming services."
    },
    {
      id: "download",
      title: "Download",
      tag: "DIGITAL REPRODUCTION",
      icon: Disc,
      color: "#38BDF8",
      body: "Mechanical download royalties generated every time your songs or albums are purchased and downloaded on stores like iTunes, Amazon, Qobuz and Beatport."
    },
    {
      id: "youtube",
      title: "YouTube",
      tag: "CONTENT ID & UGC",
      icon: Video,
      color: "#EF4444",
      body: "Micro-sync and mechanical royalties whenever your music is played in user-generated videos, covers, live streams, shorts and official uploads across the YouTube ecosystem."
    },
    {
      id: "performance",
      title: "Performance",
      tag: "BROADCAST & VENUES",
      icon: Radio,
      color: "#A78BFA",
      body: "Performance royalties collected from live concert performances, tour sets, club DJ spins, terrestrial radio stations, satellite radio, digital webcasts and TV broadcasts."
    },
    {
      id: "sync",
      title: "Sync",
      tag: "TV, FILM & ADS",
      icon: Film,
      color: "var(--tw-sky)",
      body: "Sync licensing fees and downstream broadcast performance royalties whenever your songs are synchronized into movies, television shows, video games, trailers, and commercial campaigns."
    },
    {
      id: "much-more",
      title: "+ Much More",
      tag: "GLOBAL SOCIETIES",
      icon: Globe2,
      color: "var(--tw-cyan)",
      body: "Publishing royalties gathered from hundreds of territorial collection societies, neighboring rights organizations, karaoke machines, jukeboxes, and background music services globally."
    }
  ];

  const TIMELINE_STEPS = [
    {
      num: "01",
      title: "Sign up & register your music",
      desc: "When you sign up for Publishing, we register all your music with collection points around the world, maximising your potential income.",
      badge: "STEP 1: REGISTRATION"
    },
    {
      num: "02",
      title: "Claim your missing royalties",
      desc: "Once you're registered, we get to work uncovering and claiming all of the publishing royalties you're due from past uncollected streams and live plays.",
      badge: "STEP 2: RETROACTIVE CLAIMS"
    },
    {
      num: "03",
      title: "Pitch for TV, film & more",
      desc: "Browse our client's latest sync briefs and submit for any that suit your style. If our sync team think it's a fit, we'll pitch it directly to music supervisors.",
      badge: "STEP 3: SYNC PLACEMENTS",
      link: { text: "About sync →", path: "/sync" }
    },
    {
      num: "04",
      title: "You get paid",
      desc: "Royalties land directly in your TuneWave account alongside your income from streaming and sales, keeping every payment in one clear place.",
      badge: "STEP 4: DIRECT PAYOUTS"
    }
  ];

  const REVIEWS = [
    {
      author: "Maurizio Fiordaliso",
      location: "France",
      date: "9 June 2026",
      quote: "After dealing with frustrating account issues and poor support on a previous platform, making the switch to TuneWave Publishing has been the best move for my career. They unlocked royalties from my European radio plays I had no idea were waiting for me."
    },
    {
      author: "rkdigitalmusik",
      location: "UK",
      date: "30 May 2026",
      quote: "TuneWave support have been great to help sort out any issues I've had and the publishing platform is super intuitive with lots of useful functionality. Royalties from Spotify mechanicals arrive on time every quarter."
    },
    {
      author: "Lighten Letsholo",
      location: "South Africa",
      date: "28 May 2026",
      quote: "TuneWave are very friendly, reliable, and professional, with an incredible body of knowledge about global publishing societies. You guys are my new home. Thank you for protecting my songwriting!"
    }
  ];

  return (
    <div className="publishing-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', padding: '40px 0 80px', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 54, alignItems: 'center' }}>
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ 
                  color: 'var(--tw-cyan)', 
                  background: 'rgba(0, 126, 167, 0.12)', 
                  border: '1px solid rgba(0, 229, 255, 0.3)' 
                }}>
                  <Sparkles size={13} style={{ marginRight: 4 }} />
                  EXCLUSIVE TO TUNEWAVE PRO
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                Music <br />
                <span className="text-cyan-gradient">
                  Publishing.
                </span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                You might be missing out on royalties you didn't know existed. Let's claim what you're owed across global streaming, performance, and sync.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700
                  }}
                >
                  <span>Sign Up to Pro</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
                <button 
                  onClick={() => onNavigate('/pricing')}
                  className="btn-glass"
                  style={{
                    padding: '16px 30px',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  About TuneWave Pro →
                </button>
              </div>

              {/* Quick trust strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', gap: 4, color: '#FACC15' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)' }}>
                  Rated <strong style={{ color: "var(--tw-text-white)" }}>4.2 / 5</strong> on Trustpilot from over 6,200+ artists
                </div>
              </div>
            </div>

            {/* Hero Interactive Graphic Card */}
            <div className="reveal-scale" style={{ position: 'relative' }}>
              <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
                borderRadius: 24,
                padding: '36px 32px',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                background: 'radial-gradient(circle at top right, rgba(0, 126, 167, 0.2), #090D15)',
                boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.8)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00E5FF', letterSpacing: '0.1em' }}>
                      GLOBAL ROYALTIES RADAR
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: "#FFFFFF" }}>
                      Songwriter Earnings Hub
                    </div>
                  </div>
                  <span className="pill-badge" style={{ background: 'rgba(0, 229, 255, 0.15)', color: '#00E5FF', borderColor: 'rgba(0, 229, 255, 0.35)' }}>
                    LIVE TRACKING
                  </span>
                </div>

                {/* Revenue comparison bar */}
                <div style={{
                  padding: '20px',
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: 20
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                    <span style={{ color: '#94A3B8' }}>Without Publishing (Master only)</span>
                    <span style={{ color: '#CBD5E1' }}>$1,000</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 16 }}>
                    <div style={{ width: '65%', height: '100%', background: '#475569', borderRadius: 4 }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.88rem' }}>
                    <span style={{ color: '#00E5FF', fontWeight: 700 }}>With TuneWave Publishing (+20% Unlocked)</span>
                    <span style={{ color: '#00E5FF', fontWeight: 800 }}>$1,240</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #00E5FF, #38BDF8)', borderRadius: 5 }} />
                  </div>
                </div>

                {/* Stream breakdown cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
                  <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Mechanical Income</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#00E5FF', marginTop: 4 }}>Spotify & Apple</div>
                    <div style={{ fontSize: '0.75rem', color: '#38BDF8', marginTop: 2 }}>Auto-collected direct</div>
                  </div>
                  <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Performance Rights</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38BDF8', marginTop: 4 }}>Radio & Live Shows</div>
                    <div style={{ fontSize: '0.75rem', color: '#00E5FF', marginTop: 2 }}>PRS, ASCAP, BMI</div>
                  </div>
                </div>

                {/* Global Society Pill Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700 }}>CONNECTED SOCIETIES:</span>
                  {['PRS', 'ASCAP', 'BMI', 'GEMA', 'SACEM', 'SOCAN', 'APRA'].map((soc) => (
                    <span key={soc} style={{
                      fontSize: '0.7rem',
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}>
                      {soc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 01 · EARN MORE */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                01 · EARN MORE
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              Earn more from <span className="text-cyan-gradient">your music.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
              Streaming royalties are only half the story. Publishing collects the mechanical, performance, sync and YouTube income that 80% of independent artists never see.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28
          }}>
            {/* Card 1 */}
            <div className="glass-panel card-shimmer-sweep" style={{
              padding: '40px 32px',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(0, 126, 167, 0.15)',
                  color: 'var(--tw-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  border: '1px solid rgba(0, 229, 255, 0.25)'
                }}>
                  <Globe2 size={26} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                  Register unlimited music worldwide
                </h3>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  We'll register your music for publishing royalties across the globe, while you keep full ownership and 100% of your copyright.
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tw-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
                <CheckCircle2 size={16} /> Worldwide Coverage
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-panel card-shimmer-sweep" style={{
              padding: '40px 32px',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(0, 229, 255, 0.12)',
                  color: 'var(--tw-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  border: '1px solid rgba(0, 229, 255, 0.25)'
                }}>
                  <DollarSign size={26} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                  Fair and direct payments
                </h3>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  We only take a 10% commission on publishing royalties we collect and you keep the rest. You won't find a better deal anywhere else in the industry.
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tw-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
                <CheckCircle2 size={16} /> 90% Songwriter Retained
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-panel card-shimmer-sweep" style={{
              padding: '40px 32px',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(167, 139, 250, 0.12)',
                  color: '#A78BFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  border: '1px solid rgba(167, 139, 250, 0.25)'
                }}>
                  <Tv size={26} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                  New royalties & sync opportunities
                </h3>
                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  Unlock new royalties and exposure worldwide. Earn royalties every time your music is performed live or heard, and pitch tracks for TV & film placements.
                </p>
              </div>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', gap: 6, color: '#A78BFA', fontSize: '0.85rem', fontWeight: 700 }}>
                <CheckCircle2 size={16} /> Daily Sync Briefs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MID-BANNER: NOT CLAIMING PUBLISHING ROYALTIES? YOU'RE MISSING OUT */}
      <section id="missing-out" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
            borderRadius: 28,
            padding: 'clamp(36px, 6vw, 64px)',
            background: 'linear-gradient(135deg, rgba(0, 126, 167, 0.2) 0%, #090D15 100%)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'rgba(0, 229, 255, 0.4)' }}>
                  UNCLAIMED REVENUE
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 20,
                color: '#FFFFFF'
              }}>
                Not claiming publishing royalties? <br />
                <span className="text-cyan-gradient">You're missing out.</span>
              </h2>

              <p style={{ fontSize: '1.12rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: 32 }}>
                You could be earning extra revenue whenever your music is performed live or broadcast in any kind of media. You can even claim additional publishing royalties every time your music is streamed on Spotify, Apple Music and YouTube.
              </p>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700
                }}
              >
                <span>Get Started</span>
                <ArrowRight size={18} className="btn-icon-hover" />
              </button>
            </div>

            {/* Visual Box */}
            <div className="dark-inverted-section" style={{
              background: '#090D15',
              borderRadius: 20,
              padding: '32px',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
                Every Stream Generates Two Halves:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', borderLeft: '4px solid #64748B' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: "#FFFFFF" }}>1. Master Recording Royalties</strong>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Collected by Distributor</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: 4 }}>
                    Paid to whoever funded or owns the master audio recording.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(0, 229, 255, 0.08)', borderLeft: '4px solid #00E5FF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#00E5FF' }}>2. Composition / Publishing Royalties</strong>
                    <span style={{ fontSize: '0.75rem', color: '#00E5FF', fontWeight: 700 }}>Collected by TuneWave</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: 4 }}>
                    Mechanical + Performance royalties paid to the songwriters, composers, and lyricists.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8' }}>
                Without a publisher, half of your royalties sit unclaimed in overseas black boxes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 02 · HOW IT WORKS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                02 · HOW IT WORKS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              From sign-up to <br />
              <span className="text-cyan-gradient">first payout.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Collecting, pitching and paying you what you're owed.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24
          }}>
            {TIMELINE_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="glass-panel card-shimmer-sweep"
                style={{
                  borderRadius: 20,
                  padding: '32px 28px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <span style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: 'var(--tw-cyan)',
                      fontFamily: 'monospace',
                      lineHeight: 1
                    }}>
                      {step.num}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--tw-text-dim)'
                    }}>
                      {step.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                    {step.title}
                  </h3>

                  <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>

                {step.link && (
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span 
                      onClick={() => onNavigate(step.link.path)}
                      style={{ cursor: 'pointer', color: 'var(--tw-cyan)', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      {step.link.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEDIA CALLOUT: GET YOUR MUSIC ON TV & FILM */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
            borderRadius: 28,
            padding: 'clamp(36px, 6vw, 64px)',
            border: '1px solid rgba(167, 139, 250, 0.35)',
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, #090D15 100%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span className="pill-badge" style={{ color: '#A78BFA', borderColor: '#A78BFA' }}>
                  TUNEWAVE SYNC SHOWREEL
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 18,
                color: '#FFFFFF'
              }}>
                Get your music on <br />
                <span style={{ color: '#A78BFA' }}>TV & film.</span>
              </h2>

              <p style={{ fontSize: '1.12rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: 28 }}>
                The TuneWave Sync team work hard to get our artists featured in TV shows, movies, ads, games and media. We pitch your music sync for opportunities around the world. Watch our showreel to see spots we've secured on Netflix, HBO, EA Sports and more.
              </p>

              <button 
                onClick={() => onNavigate('/sync')}
                className="btn-cyan"
                style={{
                  padding: '14px 30px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                  color: "#FFFFFF",
                  border: 'none'
                }}
              >
                <span>MORE about sync</span>
                <ArrowRight size={16} className="btn-icon-hover" />
              </button>
            </div>

            {/* Video Player Box */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', aspectRatio: '16/9', background: '#000' }}>
              {!isPlayingVideo ? (
                <div 
                  onClick={() => setIsPlayingVideo(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    background: 'url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80) center/cover'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: 68,
                      height: 68,
                      borderRadius: '50%',
                      background: '#00E5FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#090D15',
                      boxShadow: '0 0 30px rgba(0, 229, 255, 0.6)',
                      transition: 'transform 0.2s ease'
                    }}>
                      <Play size={28} fill="#090D15" style={{ marginLeft: 4 }} />
                    </div>
                    <span style={{ marginTop: 14, color: "#FFFFFF", fontWeight: 700, fontSize: '0.95rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                      Play TuneWave Sync Showreel
                    </span>
                  </div>
                </div>
              ) : (
                <iframe 
                  src="https://www.youtube.com/embed/b6vGSQkFyMo?autoplay=1&rel=0" 
                  title="TuneWave Sync Showreel"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 03 · ROYALTIES GRID */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                03 · ROYALTIES
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              Every royalty <span className="text-cyan-gradient">you'll claim.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Streaming, performance, sync and more. TuneWave Publishing collects from hundreds of sources across the globe.
            </p>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24
          }}>
            {ROYALTIES_DATA.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  className="glass-panel card-shimmer-sweep"
                  style={{
                    borderRadius: 20,
                    padding: '36px 30px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <IconComp size={22} />
                      </div>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--tw-text-dim)'
                      }}>
                        {item.tag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                      {item.title}
                    </h3>

                    <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {item.body}
                    </p>
                  </div>

                  <div style={{ marginTop: 24, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 6, color: item.color, fontSize: '0.82rem', fontWeight: 700 }}>
                    <CheckCircle2 size={15} /> Fully administered
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TRUSTPILOT & ARTIST REVIEWS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                  TRUSTED WORLDWIDE
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)' }}>
                Don't just take our word <span className="text-cyan-gradient">for it.</span>
              </h2>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 24px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: "var(--tw-text-white)" }}>4.2</div>
              <div>
                <div style={{ display: 'flex', gap: 3, color: '#22C55E', marginBottom: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)' }}>
                  Trustpilot · <strong style={{ color: "var(--tw-text-white)" }}>6,257+ artist reviews</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24
          }}>
            {REVIEWS.map((rev, idx) => (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 20,
                  padding: '32px 28px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: 3, color: '#22C55E', marginBottom: 16 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p style={{ color: 'var(--tw-text-white)', fontSize: '0.96rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 20 }}>
                    "{rev.quote}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--tw-cyan)', fontSize: '0.9rem' }}>{rev.author}</strong>
                  <span style={{ color: '#64748B', fontSize: '0.8rem' }}>{rev.date} · {rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PUBLISHING FAQS ACCORDION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                KNOWLEDGE BASE
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              Music Publishing <span className="text-cyan-gradient">FAQs</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem' }}>
              Everything you need to know about claiming, collecting, and protecting your global songwriter rights.
            </p>
          </div>

          <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PUBLISHING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
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
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: "var(--tw-text-white)",
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? 'var(--tw-cyan)' : '#64748B',
                        flexShrink: 0,
                        marginLeft: 16
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      color: 'var(--tw-text-dim)',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: 16
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

      {/* 9. BOTTOM CTA STRIP */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep dark-inverted-section" style={{
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 70px)',
            background: 'radial-gradient(circle at center, rgba(0, 126, 167, 0.25) 0%, #090D15 100%)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            textAlign: 'center',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8)'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 18,
              color: '#FFFFFF'
            }}>
              Ready to claim what you're owed? <br />
              <span className="text-cyan-gradient">Get started in 60 seconds.</span>
            </h2>

            <p style={{ fontSize: '1.15rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Join thousands of independent songwriters who collect 100% of their royalties worldwide. Unlimited releases, zero hassle.
            </p>

            <button 
              onClick={() => onNavigate('/signup')}
              className="btn-cyan"
              style={{
                padding: '18px 44px',
                fontSize: '1.1rem',
                fontWeight: 800
              }}
            >
              <span>Sign up free</span>
              <ArrowRight size={20} className="btn-icon-hover" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
