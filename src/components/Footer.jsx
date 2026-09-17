import React, { useState } from 'react';
import Logo from './Logo';
import { Building2, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

/* ─── Social icon data ──────────────────────────────────────── */
const SOCIALS = [
  {
    label: 'Instagram',
    href: '#instagram',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    label: 'YouTube',
    href: '#youtube',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    href: '#linkedin',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  {
    label: 'X / Twitter',
    href: '#twitter',
    svg: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  }
];

/* ─── Nav link columns ──────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Distribution',   path: '/distribute'  },
      { label: 'Publishing',     path: '/publishing'  },
      { label: 'Learn',          path: '/advice'      },
      { label: 'Pricing',        path: '/pricing'     },
      { label: 'FAQ',            path: '/advice'      },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',          path: '/about'       },
      { label: 'Enterprise',     path: '/enterprise'  },
      { label: 'Contact',        path: '/contact'     },
      { label: 'Login',          path: '/login'       },
      { label: 'Sign Up',        path: '/signup'      },
    ]
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms & Conditions',    path: '/terms'           },
      { label: 'Privacy Policy',        path: '/privacy'         },
      { label: 'Cookie Policy',         path: '/cookie'          },
      { label: 'Refund Policy',         path: '/refund'          },
      { label: 'Community Guidelines',  path: '/community'       },
      { label: 'Copyright & Takedown',  path: '/copyright'       },
      { label: 'Distribution Agreement',path: '/dist-agreement'  },
      { label: 'Publishing Agreement',  path: '/pub-agreement'   },
    ]
  }
];

/* ─── Footer ─────────────────────────────────────────────────── */
export default function Footer({ onNavigate, theme = 'dark' }) {
  const [email, setEmail]   = useState('');
  const [sent,  setSent]    = useState(false);
  const isLight             = theme === 'light';

  // ── Token system ──────────────────────────────────────────────
  const bg         = isLight ? '#f5f7fa'         : '#09090b';
  const borderTop  = isLight ? 'rgba(0,0,0,0.07)': 'rgba(255,255,255,0.06)';
  const divider    = isLight ? 'rgba(0,0,0,0.06)': 'rgba(255,255,255,0.06)';
  const headingClr = isLight ? '#0f172a'         : '#ffffff';
  const bodyClr    = isLight ? '#64748b'         : '#8896a8';
  const linkHoverClr = '#00c8e0';

  function handleSubscribe() {
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setEmail('');
  }

  return (
    <footer style={{
      background: bg,
      borderTop: `1px solid ${borderTop}`,
      fontFamily: "'Inter', 'Outfit', sans-serif",
      color: bodyClr,
      transition: 'background 0.25s ease, color 0.25s ease',
    }}>

      {/* ── TOP BAND: Logo / tagline / newsletter ─────────────── */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 40,
        padding: 'clamp(36px, 5vw, 64px) 16px clamp(24px, 4vw, 48px)',
        borderBottom: `1px solid ${divider}`,
      }}>

        {/* Brand column */}
        <div style={{ maxWidth: 300, width: '100%' }}>
          <Logo size="large" theme={theme} />
          <p style={{
            marginTop: 16,
            fontSize: '0.88rem',
            lineHeight: 1.7,
            color: bodyClr,
          }}>
            Artists' &amp; Labels' Dream Destination. Powering the future of independent digital music distribution, rights management, and royalty publishing across 150+ global stores.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                style={{
                  width: 36, height: 36, borderRadius: 9,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
                  color: isLight ? '#475569' : '#94a3b8',
                  border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isLight ? 'rgba(0,200,224,0.12)' : 'rgba(0,200,224,0.15)';
                  e.currentTarget.style.color = '#00c8e0';
                  e.currentTarget.style.borderColor = 'rgba(0,200,224,0.35)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = isLight ? '#475569' : '#94a3b8';
                  e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter-wrap" style={{
          background: isLight ? '#ffffff' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 16,
          padding: '24px 28px',
          maxWidth: 420,
          width: '100%',
          boxShadow: isLight ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: headingClr, marginBottom: 6 }}>
            Join the Tunewave Industry Dispatch
          </div>
          <p style={{ fontSize: '0.8rem', color: bodyClr, marginBottom: 16, lineHeight: 1.6 }}>
            Get algorithm updates, playlist opportunities, and release strategies delivered weekly.
          </p>
          <div className="footer-newsletter-row" style={{ display: 'flex', gap: 8 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              placeholder="Enter your email"
              style={{
                flex: 1,
                background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 8,
                padding: '10px 14px',
                color: headingClr,
                fontSize: '0.86rem',
                outline: 'none',
              }}
            />
            <button
              className="btn-cyan"
              style={{ padding: '10px 18px', fontSize: '0.84rem', whiteSpace: 'nowrap' }}
              onClick={handleSubscribe}
            >
              {sent ? '✓ Sent!' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LINK GRID ───────────────────────────────────────── */}
      <div className="container footer-link-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '40px 48px',
        padding: '52px 16px',
        borderBottom: `1px solid ${divider}`,
      }}>
        {NAV_COLS.map(col => (
          <div key={col.heading}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.11em',
              textTransform: 'uppercase',
              color: headingClr,
              marginBottom: 18,
            }}>
              {col.heading}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <FooterLink
                    label={link.label}
                    onClick={() => onNavigate(link.path)}
                    bodyClr={bodyClr}
                    hoverClr={linkHoverClr}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Extra: Distribute column */}
        <div>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.11em',
            textTransform: 'uppercase', color: headingClr, marginBottom: 18,
          }}>
            Distribute
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[
              { label: 'Music Distribution',       path: '/distribute'  },
              { label: 'Music Video Distribution', path: '/distribute'  },
              { label: 'AI Audio Mastering',       path: '/distribute'  },
              { label: 'Free Pre-Save Links',      path: '/distribute'  },
              { label: 'Beatport Label Setup',     path: '/distribute'  },
            ].map(link => (
              <li key={link.label}>
                <FooterLink label={link.label} onClick={() => onNavigate(link.path)} bodyClr={bodyClr} hoverClr={linkHoverClr} />
              </li>
            ))}
          </ul>
        </div>

        {/* Extra: Monetize column */}
        <div>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.11em',
            textTransform: 'uppercase', color: headingClr, marginBottom: 18,
          }}>
            Monetize
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[
              { label: 'Publishing Administration', path: '/publishing' },
              { label: 'Sync Licensing Briefs',     path: '/sync'       },
              { label: 'YouTube Content ID',         path: '/monetize'   },
              { label: 'AI Music Protection',        path: '/monetize'   },
              { label: 'Automated Splits',           path: '/monetize'   },
            ].map(link => (
              <li key={link.label}>
                <FooterLink label={link.label} onClick={() => onNavigate(link.path)} bodyClr={bodyClr} hoverClr={linkHoverClr} />
              </li>
            ))}
          </ul>
        </div>

        {/* Extra: Grow column */}
        <div>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.11em',
            textTransform: 'uppercase', color: headingClr, marginBottom: 18,
          }}>
            Grow
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[
              { label: 'Music Promotion',            path: '/promo'      },
              { label: 'Editorial Playlist Pitching',path: '/playlists'  },
              { label: 'Ad Launcher Engine',         path: '/ad-launcher'},
              { label: 'Promo Packages',             path: '/promo'      },
              { label: 'Spotify Pitching',           path: '/playlists'  },
            ].map(link => (
              <li key={link.label}>
                <FooterLink label={link.label} onClick={() => onNavigate(link.path)} bodyClr={bodyClr} hoverClr={linkHoverClr} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── COMPANY & HEADQUARTERS INFORMATION STRIP ──────────────── */}
      <div className="container" style={{ padding: '36px 0', borderBottom: `1px solid ${divider}` }}>
        <div style={{
          background: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)',
          border: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.07)'}`,
          borderRadius: 18,
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
          alignItems: 'center'
        }}>
          {/* Entity Name */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              <Building2 size={13} />
              Corporate Entity
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: headingClr }}>
              {COMPANY_INFO.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: bodyClr, marginTop: 4 }}>
              Digital Music Distribution &amp; Rights Management
            </div>
          </div>

          {/* Support Email */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              <Mail size={13} />
              Official Support Email
            </div>
            <div>
              <a 
                href={`mailto:${COMPANY_INFO.email}`} 
                style={{ fontSize: '0.92rem', fontWeight: 700, color: headingClr, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--tw-cyan)'}
                onMouseLeave={e => e.currentTarget.style.color = headingClr}
              >
                {COMPANY_INFO.email}
              </a>
            </div>
            <div style={{ fontSize: '0.78rem', color: bodyClr, marginTop: 4 }}>
              Direct email support for all artists &amp; labels
            </div>
          </div>

          {/* Location & Address */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              <MapPin size={13} />
              Corporate Location
            </div>
            <div style={{ fontSize: '0.86rem', color: headingClr, lineHeight: 1.45, fontWeight: 500 }}>
              {COMPANY_INFO.address}
            </div>
          </div>

          {/* Support Hours */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
              <Clock size={13} />
              Support Hours
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: headingClr }}>
              {COMPANY_INFO.supportHours} (IST)
            </div>
            <div style={{ marginTop: 8 }}>
              <button
                onClick={() => onNavigate('/about')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--tw-cyan)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>About Company</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────────── */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        padding: '24px 0 28px',
        fontSize: '0.78rem',
        color: bodyClr,
      }}>
        <span>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <FooterLink label="About Us" onClick={() => onNavigate('/about')} bodyClr={bodyClr} hoverClr={linkHoverClr} small />
          {['Terms of Service', 'Privacy Notice', 'Cookie Settings', 'Security & 2FA'].map(t => (
            <FooterLink key={t} label={t} onClick={() => {}} bodyClr={bodyClr} hoverClr={linkHoverClr} small />
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Small reusable animated link ──────────────────────────── */
function FooterLink({ label, onClick, bodyClr, hoverClr, small = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: small ? '0.78rem' : '0.875rem',
        color: hovered ? hoverClr : bodyClr,
        cursor: 'pointer',
        transition: 'color 0.18s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontWeight: small ? 400 : 400,
      }}
    >
      {label}
    </span>
  );
}
