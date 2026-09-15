import React, { useState } from 'react';
import { 
  TrendingUp, Sparkles, ArrowRight, CheckCircle2, ChevronDown, 
  Send, Newspaper, Share2, ShieldCheck, Zap, Layers, Play, 
  Star, DollarSign, Calendar, MessageSquare, ExternalLink, HelpCircle, Check 
} from 'lucide-react';

export default function PromoPage({ onNavigate, theme = 'dark' }) {
  const [openFaq, setOpenFaq] = useState(0);

  const isLight = theme === 'light';

  const PROMO_FAQS = [
    {
      q: "What happens after I buy a Promo Campaign?",
      a: "You'll receive a confirmation email with all the information you need to launch your campaign. This includes a link to our Promo Questionnaire where you can share details about yourself, your release, your target audience, and your preferred campaign kickoff date."
    },
    {
      q: "When will my Promo Campaign start?",
      a: "You can start your campaign at any time within 12 months of purchase. Just let us know your target release date on the questionnaire and our dedicated campaign managers will be in touch in the lead-up to your kickoff."
    },
    {
      q: "Should I choose Promo or Promo Plus?",
      a: "It depends on your goals and budget. Our standard Promo campaign provides an effective 4-week marketing push across playlisting, PR, and custom graphics. Promo Plus gives you a full 6-week campaign with managed TikTok and Instagram paid ad spend, making it ideal for high-priority single or album rollouts."
    },
    {
      q: "Do you guarantee playlist placements?",
      a: "We never make fake guarantees — no honest, legitimate promotion team can promise algorithmic or editorial placements without breaching platform policies. What we do guarantee is that your track is pitched directly to our active network of verified tastemakers and independent curators, and we guarantee at least two published online press/blog features regardless of playlist outcomes."
    },
    {
      q: "Will I keep my royalties?",
      a: "Yes — 100% of your royalties stay yours forever. TuneWave Promo is a flat-fee marketing service, not a label contract. We never take any percentage of your master royalties, streaming income, or publishing rights."
    },
    {
      q: "Which genres do you work with?",
      a: "We run campaigns across hip-hop, trap, indie rock, pop, electronic/dance, R&B, afrobeats, latin, country, jazz, classical, and experimental. Every campaign is custom-built around your specific genre aesthetics and subculture audiences."
    },
    {
      q: "Can I get a refund?",
      a: "If you haven't returned your campaign questionnaire yet, you can request a 100% full refund at any time. Once our design, copywriting, and PR teams have begun production, we cannot refund the labor performed, but our team will work closely with you to ensure you are delighted with the deliverables."
    },
    {
      q: "How do I keep track of my campaign?",
      a: "Your dedicated Promo Manager will reach out prior to launch and maintain regular direct contact via email or WhatsApp. You will review and approve all press releases and promo graphics before they go live, and receive detailed weekly analytics reports tracking stream velocity, playlist adds, and ad engagement."
    }
  ];

  const MARQUEE_ITEMS = [
    "Editorial Playlist Pitching", "Online Press Campaign", "Social Media Strategy", 
    "Spotify · Apple · Tidal", "TikTok & Instagram Ads", "PR & Playlisting Guide", 
    "Curator Network Access", "Weekly Analytics Reports", "Dedicated Promo Manager",
    "Custom Promo Graphics", "Video Teaser Edits", "Priority Support"
  ];

  const REVIEWS = [
    {
      name: "Julio Estrada",
      country: "US",
      role: "Hip-Hop Artist",
      text: "Since I started music in 2023 TuneWave has definitely made this journey worth it. The promo package landed my track on two major music blogs and three tastemaker playlists right on release week."
    },
    {
      name: "David Brooks",
      country: "GB",
      role: "Indie-Rock Producer",
      text: "Working with the Promo team has been exceptional. As an independent artist, having a dedicated PR manager draft my press release and handle curator pitching gave my track the credibility it needed."
    },
    {
      name: "Odjugo Godbless",
      country: "NG",
      role: "Afrobeats Creator",
      text: "My experience with the Promo campaign was phenomenal! The TikTok and Instagram ads they set up brought in thousands of real new followers and listeners across Spotify."
    },
    {
      name: "Christina Matovu",
      country: "GB",
      role: "Soul / R&B Singer",
      text: "The whole team pushed through with incredible energy. The custom graphics pack and social rollout schedule kept my audience engaged for weeks after release day."
    },
    {
      name: "Franco Albertini",
      country: "US",
      role: "Electronic Producer",
      text: "I worked with TuneWave on a PROMO campaign which gave me so many valuable insights on how to build momentum and pitch directly to curators. Highly recommended!"
    }
  ];

  return (
    <div className="promo-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', padding: '40px 0 80px', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 54, alignItems: 'center' }}>
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ 
                  color: 'var(--tw-cyan)', 
                  background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0, 229, 255, 0.12)', 
                  border: isLight ? '1px solid rgba(0, 126, 167, 0.25)' : '1px solid rgba(0, 229, 255, 0.3)' 
                }}>
                  <TrendingUp size={13} style={{ marginRight: 4 }} />
                  ARTIST MARKETING SUITE
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                <em>Music Promotion</em> <br />
                <span style={{
                  background: isLight 
                    ? 'linear-gradient(135deg, #007EA7 0%, #059669 100%)' 
                    : 'linear-gradient(135deg, var(--tw-cyan) 0%, var(--tw-lime) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Made Easy.
                </span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                Playlisting. Online press. Social strategy. Sponsored ads and custom graphics. Launch a high-impact, budget-friendly music marketing campaign managed by our in-house team.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <a 
                  href="#campaigns"
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span>Start your campaign</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </a>

                <span style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', maxWidth: '250px', lineHeight: 1.45 }}>
                  Lock your campaign in now. <strong style={{ color: 'var(--tw-text-white)' }}>Launch anytime in the next 12 months.</strong>
                </span>
              </div>

              {/* Trust Metric Strip */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 24, 
                marginTop: 40, 
                paddingTop: 20, 
                borderTop: '1px solid var(--tw-line)' 
              }}>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--tw-cyan)' }}>2 Guaranteed</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', fontWeight: 500 }}>Online Press Features</div>
                </div>
                <div style={{ height: 30, width: 1, background: 'var(--tw-line)' }} />
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)' }}>100%</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', fontWeight: 500 }}>Keep Your Royalties</div>
                </div>
                <div style={{ height: 30, width: 1, background: 'var(--tw-line)' }} />
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: isLight ? '#7C3AED' : 'var(--tw-purple)' }}>1-on-1</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)', fontWeight: 500 }}>Dedicated Publicist</div>
                </div>
              </div>
            </div>

            {/* Hero Dashboard Preview Card */}
            <div className="reveal-scale">
              <div className="glass-panel card-shimmer-sweep" style={{
                borderRadius: 24,
                padding: '36px 32px',
                border: isLight ? '1px solid rgba(0, 126, 167, 0.22)' : '1px solid rgba(0, 229, 255, 0.25)',
                background: isLight 
                  ? 'radial-gradient(circle at top right, rgba(0, 126, 167, 0.08), #FFFFFF)' 
                  : 'radial-gradient(circle at top right, rgba(0, 229, 255, 0.12), rgba(9, 13, 21, 0.98))',
                boxShadow: isLight 
                  ? '0 20px 50px -15px rgba(0, 126, 167, 0.15)' 
                  : '0 30px 60px -20px rgba(0, 0, 0, 0.8)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                      CAMPAIGN COMMAND CENTER
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: "var(--tw-text-white)" }}>
                      Release Traction Monitor
                    </div>
                  </div>
                  <span className="pill-badge" style={{ 
                    background: 'rgba(34, 197, 94, 0.15)', 
                    color: '#16A34A', 
                    borderColor: 'rgba(34, 197, 94, 0.3)',
                    fontWeight: 700 
                  }}>
                    ACTIVE PROMO
                  </span>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
                  <div style={{ 
                    padding: '16px', 
                    borderRadius: 14, 
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--tw-line)' 
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Curator Pitches</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--tw-cyan)', marginTop: 4 }}>142</div>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: 2, fontWeight: 600 }}>+18 playlist adds</div>
                  </div>
                  <div style={{ 
                    padding: '16px', 
                    borderRadius: 14, 
                    background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--tw-line)' 
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Press Coverage</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)', marginTop: 4 }}>4 Outlets</div>
                    <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: 2, fontWeight: 600 }}>2 Features Published</div>
                  </div>
                </div>

                {/* Recent Campaign Milestones */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)', 
                    border: '1px solid var(--tw-line)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} />
                      <span style={{ fontSize: '0.85rem', color: "var(--tw-text-white)", fontWeight: 500 }}>Press Release distributed to 350+ music writers</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#059669' : 'var(--tw-lime)', fontWeight: 700 }}>COMPLETED</span>
                  </div>

                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)', 
                    border: '1px solid var(--tw-line)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color="var(--tw-cyan)" />
                      <span style={{ fontSize: '0.85rem', color: "var(--tw-text-white)", fontWeight: 500 }}>TikTok & Instagram video ads launched</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--tw-cyan)', fontWeight: 700 }}>LIVE (3.4K CLICKS)</span>
                  </div>

                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: 10, 
                    background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.3)', 
                    border: '1px solid var(--tw-line)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color={isLight ? '#7C3AED' : 'var(--tw-purple)'} />
                      <span style={{ fontSize: '0.85rem', color: "var(--tw-text-white)", fontWeight: 500 }}>Spotify editorial & independent pitching</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#7C3AED' : 'var(--tw-purple)', fontWeight: 700 }}>IN PROGRESS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MARQUEE STRIP */}
      <section style={{
        padding: '20px 0',
        background: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
        borderTop: '1px solid var(--tw-line)',
        borderBottom: '1px solid var(--tw-line)',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, idx) => (
            <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: '0.88rem', fontWeight: 700, color: 'var(--tw-text-dim)', letterSpacing: '0.04em' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tw-cyan)' }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 3. BENTO: WHAT DO YOU GET? */}
      <section id="campaigns" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ 
                color: isLight ? '#059669' : 'var(--tw-lime)', 
                borderColor: isLight ? 'rgba(5, 150, 105, 0.35)' : 'var(--tw-lime)' 
              }}>
                WHAT DO YOU GET?
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              Everything in a <br />
              <span style={{ color: 'var(--tw-cyan)' }}>TuneWave Promo campaign.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Engineered by industry publicists to get your songs onto real playlists, blogs, and feeds.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24
          }}>
            {/* 1. Playlist Pitching */}
            <div className="glass-panel card-shimmer-sweep" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.12)', color: 'var(--tw-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={22} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.06em', background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0,229,255,0.1)', padding: '4px 10px', borderRadius: 6 }}>
                  PLAYLISTS
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Playlist Pitching</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We'll pitch your track to our active network of playlist curators across Spotify, Apple Music, Tidal and YouTube Music.
              </p>
            </div>

            {/* 2. Online Press */}
            <div className="glass-panel card-shimmer-sweep" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: isLight ? 'rgba(5, 150, 105, 0.12)' : 'rgba(163, 230, 53, 0.12)', color: isLight ? '#059669' : 'var(--tw-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Newspaper size={22} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: isLight ? '#059669' : 'var(--tw-lime)', letterSpacing: '0.06em', background: isLight ? 'rgba(5, 150, 105, 0.1)' : 'rgba(163,230,53,0.1)', padding: '4px 10px', borderRadius: 6 }}>
                  PR & PRESS
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Online Press</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Close relationships with bloggers and journalists let us secure at least two online features or reviews — guaranteed.
              </p>
            </div>

            {/* 3. Social Strategy */}
            <div className="glass-panel card-shimmer-sweep" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(244, 63, 94, 0.12)', color: '#F43F5E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={22} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F43F5E', letterSpacing: '0.06em', background: 'rgba(244,63,94,0.1)', padding: '4px 10px', borderRadius: 6 }}>
                  SOCIAL
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Social Strategy</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                A tailored Instagram and TikTok posting plan written by our social team and designed to grow your reach in your genre.
              </p>
            </div>

            {/* 4. Risk-Free Promo Guarantee Card */}
            <div className="glass-panel card-shimmer-sweep" style={{
              borderRadius: 20,
              padding: 32,
              border: isLight ? '1px solid rgba(5, 150, 105, 0.35)' : '1px solid rgba(163, 230, 53, 0.3)',
              background: isLight 
                ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.07), #FFFFFF)' 
                : 'linear-gradient(135deg, rgba(163, 230, 53, 0.08), rgba(9, 13, 21, 0.95))'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%', 
                  background: isLight ? '#059669' : 'var(--tw-lime)', 
                  color: isLight ? '#FFFFFF' : '#090D15', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 900 
                }}>
                  <Check size={18} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)" }}>Risk-Free Promo</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--tw-text-dim)', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Keep 100% of your royalties
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Start anytime within 12 months
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Pay over 3 months at 0%
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Cancel anytime before kickoff
                </li>
              </ul>
            </div>

            {/* 5. Paid Ad Campaign */}
            <div className="glass-panel card-shimmer-sweep" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(167, 139, 250, 0.12)', color: isLight ? '#7C3AED' : '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={22} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: isLight ? '#7C3AED' : '#A78BFA', letterSpacing: '0.06em', background: isLight ? 'rgba(124, 58, 237, 0.1)' : 'rgba(167,139,250,0.1)', padding: '4px 10px', borderRadius: 6 }}>
                  PROMO+ EXCLUSIVE
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Paid Ad Campaign</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Carefully-targeted TikTok and Instagram ads pushing your release to new listeners. Only available with Promo Plus.
              </p>
            </div>

            {/* 6. Priority Distro & Support */}
            <div className="glass-panel card-shimmer-sweep" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: isLight ? 'rgba(0, 126, 167, 0.12)' : 'rgba(0, 229, 255, 0.12)', color: 'var(--tw-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.06em', background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0,229,255,0.1)', padding: '4px 10px', borderRadius: 6 }}>
                  PRIORITY
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>Priority Distro & Support</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Your release goes to stores super-fast. You also skip the queue and speak directly to the promo team whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING & PACKAGES SECTION */}
      <section id="pricing" style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                OUR PROMO PACKAGES
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              We know music marketing inside out. <br />
              <span style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }}>Pick the campaign that fits.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, maxWidth: '960px', margin: '0 auto' }}>
            {/* Standard Promo */}
            <div className="glass-panel" style={{
              borderRadius: 24,
              padding: 40,
              border: '1px solid var(--tw-line)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em' }}>
                  STANDARD CAMPAIGN
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: "var(--tw-text-white)", margin: '8px 0 16px' }}>TuneWave Promo</h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: "var(--tw-text-white)" }}>$249</span>
                  <span style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', fontWeight: 500 }}>One-time · 4 week campaign</span>
                </div>

                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 28 }}>
                  <strong style={{ color: 'var(--tw-text-white)' }}>4 week</strong> all-in-one campaign for artists who want an affordable and effective music marketing package.
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.92rem', color: 'var(--tw-text-dim)' }}>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> 4-week structured campaign</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Playlist pitching across curators</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> 2 guaranteed online blog features</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Press release written & distributed</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Tailored Instagram & TikTok plan</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> PR & playlisting strategy guide</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Custom graphics pack + 2 promo videos</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Campaign reports & analytics</li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CheckCircle2 size={16} color="var(--tw-cyan)" /> Priority distro & team support</li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  fontSize: '1rem', 
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <span>Start your campaign</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Promo Plus (Featured) */}
            <div className="glass-panel card-shimmer-sweep" style={{
              borderRadius: 24,
              padding: 40,
              border: isLight ? '2px solid #059669' : '2px solid var(--tw-lime)',
              background: isLight 
                ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.06), #FFFFFF)' 
                : 'linear-gradient(135deg, rgba(163, 230, 53, 0.08), rgba(9, 13, 21, 0.98))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'visible'
            }}>
              <span style={{
                position: 'absolute',
                top: -14,
                right: 32,
                fontSize: '0.72rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                padding: '6px 14px',
                borderRadius: 20,
                background: isLight ? '#059669' : 'var(--tw-lime)',
                color: isLight ? '#FFFFFF' : '#090D15'
              }}>
                MOST POPULAR
              </span>

              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isLight ? '#059669' : 'var(--tw-lime)', letterSpacing: '0.08em' }}>
                  ACCELERATED ROLLOUT
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: "var(--tw-text-white)", margin: '8px 0 16px' }}>TuneWave Promo Plus</h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: '3rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)' }}>$399</span>
                  <span style={{ color: 'var(--tw-text-dim)', fontSize: '0.9rem', fontWeight: 500 }}>One-time · 6 week campaign</span>
                </div>

                <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24 }}>
                  <strong style={{ color: 'var(--tw-text-white)' }}>Everything in Promo, plus</strong> two extra weeks of marketing, paid advertising management, and dedicated publicist care.
                </p>

                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isLight ? '#059669' : 'var(--tw-lime)', marginBottom: 12, textTransform: 'uppercase' }}>
                  Everything in Promo, plus:
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.92rem', color: 'var(--tw-text-dim)' }}>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> 6 Week Campaign (vs 4)
                  </li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> TikTok & Instagram Ad Campaign Management
                  </li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> Dedicated paid-ads manager & creative testing
                  </li>
                  <li style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, color: "var(--tw-text-white)" }}>
                    <CheckCircle2 size={16} color={isLight ? '#059669' : 'var(--tw-lime)'} /> TuneWave Pro Perks & Label Submission Review
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  background: isLight 
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                    : 'linear-gradient(135deg, var(--tw-lime) 0%, #15803D 100%)',
                  color: isLight ? '#FFFFFF' : '#090D15',
                  border: 'none',
                  boxShadow: isLight 
                    ? '0 10px 25px -8px rgba(5, 150, 105, 0.4)' 
                    : '0 10px 30px -8px rgba(163, 230, 53, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <span>Start your campaign</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 32, color: 'var(--tw-text-dim)', fontSize: '0.9rem' }}>
            *Spread the cost over <strong style={{ color: 'var(--tw-text-white)' }}>3 months with 0% interest</strong> with flexible checkout.
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              How do we <br />
              <span style={{ color: 'var(--tw-cyan)' }}>do it?</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div className="glass-panel" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--tw-cyan)', fontFamily: 'monospace', marginBottom: 12 }}>01</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Get To Know You</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Before we get started, we'll take time to learn all about you and your music. Once we've got all the info to maximise your promo potential, we get to work on your campaign.
              </p>
            </div>

            <div className="glass-panel" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: isLight ? '#059669' : 'var(--tw-lime)', fontFamily: 'monospace', marginBottom: 12 }}>02</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Develop Your Brand</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Now it's time to pitch your music to our network of playlist curators, music bloggers and journalists. We'll also create your custom social schedule, promo graphics, and ads.
              </p>
            </div>

            <div className="glass-panel" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: isLight ? '#7C3AED' : 'var(--tw-purple)', fontFamily: 'monospace', marginBottom: 12 }}>03</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Achieve Real Results</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We pitch your music to verified independent playlist curators. Plus our direct relationships with tastemakers secure you at least two published blog writeups.
              </p>
            </div>

            <div className="glass-panel" style={{ borderRadius: 20, padding: 32, border: '1px solid var(--tw-line)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F43F5E', fontFamily: 'monospace', marginBottom: 12 }}>04</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 10 }}>We Help You DIY</h3>
              <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We know the show goes on after your campaign is over, so we give you weekly reports, curator feedback, and our exclusive PR and playlisting handbook to keep growing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ARTIST REVIEWS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 54px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)' }}>
              What our artists <span style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }}>say.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="glass-panel" style={{ borderRadius: 20, padding: 28, border: '1px solid var(--tw-line)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: 2, color: '#FACC15', marginBottom: 14 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                  </div>
                  <p style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 20 }}>
                    "{rev.text}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--tw-line)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: "var(--tw-text-white)", fontSize: '0.92rem' }}>{rev.name}</strong>
                    <div style={{ color: 'var(--tw-text-dim)', fontSize: '0.78rem' }}>{rev.role}</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', background: isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0,229,255,0.1)', padding: '2px 8px', borderRadius: 4 }}>
                    {rev.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROMO FAQS ACCORDION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                ANSWERS & DETAILS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              Music Promotion <span style={{ color: 'var(--tw-cyan)' }}>FAQs</span>
            </h2>
          </div>

          <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PROMO_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{
                    borderRadius: 16,
                    border: isOpen 
                      ? (isLight ? '1px solid var(--tw-cyan)' : '1px solid rgba(0, 229, 255, 0.35)') 
                      : '1px solid var(--tw-line)',
                    background: isOpen 
                      ? (isLight ? 'rgba(0, 126, 167, 0.04)' : 'rgba(0, 229, 255, 0.03)') 
                      : undefined,
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
                        color: isOpen ? 'var(--tw-cyan)' : 'var(--tw-text-dim)',
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
                      borderTop: '1px solid var(--tw-line)',
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

      {/* 8. BOTTOM CTA STRIP */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div className="glass-panel card-shimmer-sweep" style={{
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 70px)',
            background: isLight 
              ? 'radial-gradient(circle at center, rgba(0, 126, 167, 0.09) 0%, #FFFFFF 100%)' 
              : 'radial-gradient(circle at center, rgba(0, 229, 255, 0.12) 0%, rgba(9, 13, 21, 0.98) 100%)',
            border: isLight ? '1px solid rgba(0, 126, 167, 0.25)' : '1px solid rgba(0, 229, 255, 0.3)',
            textAlign: 'center',
            boxShadow: isLight 
              ? '0 20px 50px -15px rgba(0, 126, 167, 0.15)' 
              : '0 30px 60px -20px rgba(0,0,0,0.8)'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              Ready to promote your release? <br />
              <span style={{ color: isLight ? '#059669' : 'var(--tw-lime)' }}>Launch a campaign today.</span>
            </h2>

            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              Lock in your campaign today and activate anytime within 12 months. Keep 100% of all royalties.
            </p>

            <button 
              onClick={() => onNavigate('/signup')}
              className="btn-cyan"
              style={{
                padding: '18px 44px',
                fontSize: '1.1rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
              }}
            >
              <span>Get started now</span>
              <ArrowRight size={20} className="btn-icon-hover" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
