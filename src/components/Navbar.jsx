import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import { MEGA_MENUS, TRANSLATIONS } from '../data/content';
import { ChevronDown, ArrowRight, Menu, X, Check, Sun, Moon } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' }
];

export default function Navbar({
  currentPath = '/',
  onNavigate,
  lang = 'en',
  onLangChange,
  theme = 'dark',
  onToggleTheme,
  useEmblemAsset = false,
  onToggleLogoVariant
}) {
  const [activeMega, setActiveMega] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);

  const t = TRANSLATIONS[lang]?.nav || TRANSLATIONS.en.nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMegaToggle = (key) => {
    setActiveMega(activeMega === key ? null : key);
  };

  const isLight = theme === 'light';

  // Tunewave Music clean nav item style: pure text, no box, smooth hover
  const navItemStyle = (isActive) => ({
    background: 'transparent',
    border: 'none',
    padding: '8px 0',
    fontSize: '0.94rem',
    fontWeight: 600,
    color: isActive
      ? (isLight ? '#007EA7' : '#00E5FF')
      : (isLight ? '#0F172A' : '#FFFFFF'),
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    cursor: 'pointer',
    transition: 'color 0.15s ease, opacity 0.15s ease',
    opacity: isActive ? 1 : 0.92,
    letterSpacing: '-0.01em'
  });

  return (
    <header
      className="header-wrapper"
      style={{
        background: isLight
          ? 'rgba(255, 255, 255, 0.96)'
          : '#000000', // Crisp pitch-black background matching reference image
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled
          ? (isLight ? '0 10px 30px rgba(0, 0, 0, 0.06)' : '0 10px 35px rgba(0, 0, 0, 0.7)')
          : 'none',
        borderBottom: isLight
          ? '1px solid rgba(0, 0, 0, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
      }}
    >
      <div
        className="container"
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1440px',
          padding: '0 clamp(16px, 3vw, 36px)'
        }}
      >
        {/* Brand Logo on Left */}
        <div
          onClick={() => onNavigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Logo theme={theme} />
        </div>

        {/* Right-aligned Navigation Links & Actions (Matches reference format and spacing) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 2vw, 32px)', marginLeft: 'auto' }}>
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'clamp(20px, 2vw, 30px)'
            }}
            className="desktop-nav"
          >
            {/* 1. Distribute with dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                style={navItemStyle(activeMega === 'distribute' || currentPath === '/distribute' || currentPath === '/sell-your-music')}
                onClick={() => handleMegaToggle('distribute')}
                onMouseEnter={(e) => {
                  setActiveMega('distribute');
                  e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
                }}
                onMouseLeave={(e) => {
                  if (activeMega !== 'distribute' && currentPath !== '/distribute') {
                    e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                  }
                }}
              >
                <span>{t.distribute}</span>
                <ChevronDown
                  size={12}
                  strokeWidth={2.2}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: activeMega === 'distribute' ? 'rotate(180deg)' : 'none',
                    opacity: 0.85
                  }}
                />
              </button>
            </div>

            {/* 2. Monetize with dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                style={navItemStyle(activeMega === 'monetize' || currentPath === '/monetize' || currentPath === '/publishing')}
                onClick={() => handleMegaToggle('monetize')}
                onMouseEnter={(e) => {
                  setActiveMega('monetize');
                  e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
                }}
                onMouseLeave={(e) => {
                  if (activeMega !== 'monetize' && currentPath !== '/monetize') {
                    e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                  }
                }}
              >
                <span>{t.monetize}</span>
                <ChevronDown
                  size={12}
                  strokeWidth={2.2}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: activeMega === 'monetize' ? 'rotate(180deg)' : 'none',
                    opacity: 0.85
                  }}
                />
              </button>
            </div>

            {/* 3. Grow with dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                style={navItemStyle(activeMega === 'grow' || currentPath === '/grow')}
                onClick={() => handleMegaToggle('grow')}
                onMouseEnter={(e) => {
                  setActiveMega('grow');
                  e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
                }}
                onMouseLeave={(e) => {
                  if (activeMega !== 'grow' && currentPath !== '/grow') {
                    e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                  }
                }}
              >
                <span>{t.grow}</span>
                <ChevronDown
                  size={12}
                  strokeWidth={2.2}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: activeMega === 'grow' ? 'rotate(180deg)' : 'none',
                    opacity: 0.85
                  }}
                />
              </button>
            </div>

            {/* 4. Get Signed */}
            <button
              style={navItemStyle(currentPath === '/get-signed')}
              onClick={() => { setActiveMega(null); onNavigate('/get-signed'); }}
              onMouseEnter={(e) => {
                setActiveMega(null);
                e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/get-signed') {
                  e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                }
              }}
            >
              {t.getSign}
            </button>

            {/* 5. Pricing */}
            <button
              style={navItemStyle(currentPath === '/pricing')}
              onClick={() => { setActiveMega(null); onNavigate('/pricing'); }}
              onMouseEnter={(e) => {
                setActiveMega(null);
                e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/pricing') {
                  e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                }
              }}
            >
              {t.pricing}
            </button>

            {/* 6. Reviews */}
            <button
              style={navItemStyle(currentPath === '/reviews')}
              onClick={() => { setActiveMega(null); onNavigate('/reviews'); }}
              onMouseEnter={(e) => {
                setActiveMega(null);
                e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/reviews') {
                  e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                }
              }}
            >
              {t.reviews}
            </button>

            {/* 7. Advice */}
            <button
              style={navItemStyle(currentPath === '/advice')}
              onClick={() => { setActiveMega(null); onNavigate('/advice'); }}
              onMouseEnter={(e) => {
                setActiveMega(null);
                e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/advice') {
                  e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                }
              }}
            >
              {t.advice}
            </button>

            {/* 8. About */}
            <button
              style={navItemStyle(currentPath === '/about')}
              onClick={() => { setActiveMega(null); onNavigate('/about'); }}
              onMouseEnter={(e) => {
                setActiveMega(null);
                e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/about') {
                  e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                }
              }}
            >
              About
            </button>
          </nav>

          {/* Action Buttons: Login (Bordered Box) + Try For Free (Tunewave Cyan Brand Button) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Login Button (clean bordered container matching screenshot) */}
            <button
              onClick={() => onNavigate('/login')}
              className="desktop-nav"
              style={{
                display: 'none',
                background: 'transparent',
                border: isLight ? '1px solid rgba(15, 23, 42, 0.22)' : '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: 8,
                padding: '8px 18px',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: isLight ? '#0F172A' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isLight ? '#007EA7' : '#00E5FF';
                e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF';
                e.currentTarget.style.background = isLight ? 'rgba(0, 126, 167, 0.05)' : 'rgba(0, 229, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isLight ? 'rgba(15, 23, 42, 0.22)' : 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {t.login}
            </button>

            {/* Try For Free Button (Tunewave Cyan Gradient Matching Brand) */}
            <button
              onClick={() => onNavigate('/signup')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '9px 22px',
                borderRadius: 10,
                background: isLight
                  ? 'linear-gradient(135deg, #007EA7 0%, #0284C7 100%)'
                  : 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)',
                color: isLight ? '#FFFFFF' : '#040D1A',
                fontSize: '0.92rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: isLight
                  ? '0 4px 18px rgba(0, 126, 167, 0.35)'
                  : '0 4px 20px -2px rgba(0, 229, 255, 0.5), 0 0 12px rgba(0, 242, 254, 0.3)',
                transition: 'transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                lineHeight: 1.2
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                e.currentTarget.style.boxShadow = isLight
                  ? '0 6px 24px rgba(0, 126, 167, 0.5)'
                  : '0 8px 28px rgba(0, 229, 255, 0.65), 0 0 20px rgba(0, 242, 254, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = isLight
                  ? '0 4px 18px rgba(0, 126, 167, 0.35)'
                  : '0 4px 20px -2px rgba(0, 229, 255, 0.5), 0 0 12px rgba(0, 242, 254, 0.3)';
              }}
            >
              <span>{t.tryFree}</span>
            </button>
          </div>

          {/* Right Utility Items: Language Selector + Theme Toggle + Mobile Hamburger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              paddingLeft: 6,
              borderLeft: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.12)'
            }}
          >
            {/* Language Selector */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 2px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: isLight ? '#0F172A' : '#94A3B8',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = isLight ? '#0F172A' : '#94A3B8'}
              >
                <span>{lang ? lang.toUpperCase() : 'EN'}</span>
                <ChevronDown size={12} style={{ opacity: 0.8 }} />
              </button>

              {langMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    background: isLight ? '#FFFFFF' : '#0F0D1C',
                    border: isLight ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 12,
                    boxShadow: isLight ? '0 15px 35px rgba(0, 0, 0, 0.12)' : '0 20px 45px rgba(0, 0, 0, 0.7)',
                    width: 150,
                    padding: 6,
                    zIndex: 110,
                    backdropFilter: 'blur(16px)',
                    animation: 'megaFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {LANGUAGES.map((item) => (
                    <div
                      key={item.code}
                      onClick={() => {
                        if (onLangChange) onLangChange(item.code);
                        setLangMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: 8,
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        color: lang === item.code ? (isLight ? '#007EA7' : '#00E5FF') : (isLight ? '#1E293B' : '#E2E8F0'),
                        background: lang === item.code ? (isLight ? 'rgba(0, 126, 167, 0.1)' : 'rgba(0, 229, 255, 0.12)') : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{item.name}</span>
                      {lang === item.code && <Check size={14} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'transparent',
                border: 'none',
                color: isLight ? '#64748B' : '#94A3B8',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = isLight ? '#007EA7' : '#00E5FF'}
              onMouseLeave={(e) => e.currentTarget.style.color = isLight ? '#64748B' : '#94A3B8'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: 8,
                color: isLight ? '#0F172A' : '#FFFFFF',
                borderRadius: 8,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Render Active Desktop Mega Menu */}
      {activeMega && (
        <MegaMenu
          data={MEGA_MENUS[activeMega]}
          theme={theme}
          onClose={() => setActiveMega(null)}
          onNavigate={(path) => {
            setActiveMega(null);
            onNavigate(path);
          }}
        />
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            background: isLight ? 'rgba(255, 255, 255, 0.98)' : '#000000',
            backdropFilter: 'blur(30px)',
            zIndex: 99,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { path: '/distribute', label: t.distribute },
              { path: '/monetize', label: t.monetize },
              { path: '/grow', label: t.grow },
              { path: '/get-signed', label: t.getSign },
              { path: '/pricing', label: t.pricing },
              { path: '/reviews', label: t.reviews },
              { path: '/advice', label: t.advice },
              { path: '/about', label: 'About' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => { onNavigate(item.path); setMobileMenuOpen(false); }}
                style={{
                  padding: '14px 4px',
                  textAlign: 'left',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: currentPath === item.path
                    ? (isLight ? '#007EA7' : '#00E5FF')
                    : (isLight ? '#0F172A' : '#FFFFFF'),
                  borderBottom: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onNavigate('/login'); setMobileMenuOpen(false); }}
              style={{
                padding: '12px 16px',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 600,
                color: isLight ? '#0F172A' : '#FFFFFF',
                background: 'transparent',
                border: isLight ? '1px solid rgba(15, 23, 42, 0.22)' : '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: 8,
                cursor: 'pointer',
                marginTop: 12
              }}
            >
              {t.login || 'Login'}
            </button>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <button
              onClick={() => { onNavigate('/signup'); setMobileMenuOpen(false); }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 10,
                background: isLight
                  ? 'linear-gradient(135deg, #007EA7 0%, #0284C7 100%)'
                  : 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)',
                color: isLight ? '#FFFFFF' : '#040D1A',
                fontSize: '1rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: isLight
                  ? '0 4px 20px rgba(0, 126, 167, 0.4)'
                  : '0 4px 24px rgba(0, 229, 255, 0.5)'
              }}
            >
              <span>{t.tryFree}</span>
            </button>
          </div>
        </div>
      )}

      {/* Media query styling */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
