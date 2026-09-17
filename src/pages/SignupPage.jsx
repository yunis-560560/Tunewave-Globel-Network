import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Globe, ChevronDown, Sun, Moon, ArrowLeft, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' }
];

export default function SignupPage({
  onNavigate,
  onSignupSuccess,
  theme = 'dark',
  onToggleTheme,
  lang = 'en',
  onLangChange
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const isLight = theme === 'light';

  // Dynamic theme tokens for adaptive dark/light appearance
  const colors = {
    cardBg: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.92)',
    cardBorder: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.12)',
    cardShadow: isLight
      ? '0 20px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)'
      : '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(99, 102, 241, 0.14)',
    titleColor: isLight ? '#111827' : '#F8FAFC',
    subtitleColor: isLight ? '#374151' : '#94A3B8',
    brandPurple: isLight ? '#5533FF' : '#818CF8',
    purpleBorder: isLight ? '#5533FF' : '#818CF8',
    inputBg: isLight ? '#FFFFFF' : 'rgba(30, 41, 59, 0.75)',
    inputBorder: isLight ? '#71717A' : '#475569',
    inputBorderFocus: isLight ? '#5533FF' : '#818CF8',
    inputColor: isLight ? '#111827' : '#F8FAFC',
    inputPlaceholder: isLight ? '#9CA3AF' : '#64748B',
    continueBtnBg: isLight ? '#FFFFFF' : 'transparent',
    continueBtnHoverBg: isLight ? '#5533FF' : '#818CF8',
    continueBtnHoverText: isLight ? '#FFFFFF' : '#0F172A',
    dividerLine: isLight ? '#9CA3AF' : '#334155',
    dividerText: isLight ? '#4B5563' : '#94A3B8',
    socialBtnBg: isLight ? '#F3F4F6' : 'rgba(30, 41, 59, 0.85)',
    socialBtnHoverBg: isLight ? '#E5E7EB' : '#334155',
    socialBtnBorder: isLight ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
    socialBtnText: isLight ? '#1F2937' : '#F1F5F9',
    appleIconFill: isLight ? '#000000' : '#FFFFFF',
    disclaimerColor: isLight ? '#111827' : '#94A3B8',
    disclaimerLink: isLight ? '#111827' : '#CBD5E1',
    resetBg: isLight ? '#F0FDF4' : 'rgba(20, 83, 45, 0.25)',
    resetBorder: isLight ? '#BBF7D0' : '#166534',
    resetColor: isLight ? '#166534' : '#86EFAC',
  };

  const bgImageUrl = isLight
    ? '/login_background_image/sigup_light_mode_background.png'
    : '/login_background_image/sigup_dark_backgroud_image.png';

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSignupSuccess) {
        onSignupSuccess(email ? email.split('@')[0] : 'Tunewave Creator');
      }
      if (onNavigate) {
        onNavigate('/artist/dashboard');
      }
    }, 500);
  };

  const handleSocialAuth = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSignupSuccess) {
        onSignupSuccess(`${provider} Creator`);
      }
      if (onNavigate) {
        onNavigate('/artist/dashboard');
      }
    }, 450);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgot(false);
    }, 2500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundImage: `url("${bgImageUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      transition: 'background-image 0.3s ease',
      overflowX: 'hidden'
    }}>
      {/* Subtle backdrop overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isLight
          ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(240,248,255,0.45) 100%)'
          : 'radial-gradient(ellipse at center, rgba(4,9,18,0.3) 0%, rgba(3,6,12,0.65) 100%)',
        zIndex: 0
      }} />

      {/* Top Navigation Bar */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px clamp(20px, 4vw, 48px)'
      }}>
        <div onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
          <Logo size="small" theme={theme} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangMenuOpen(o => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.18)',
                borderRadius: 8,
                padding: '7px 12px',
                color: isLight ? '#0F172A' : '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Globe size={14} />
              {currentLang.label}
              <ChevronDown size={12} />
            </button>
            {langMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 6,
                background: isLight ? '#FFFFFF' : '#0F172A',
                boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10,
                overflow: 'hidden',
                minWidth: 130,
                zIndex: 100
              }}>
                {LANGUAGES.map(l => (
                  <div
                    key={l.code}
                    onClick={() => {
                      if (onLangChange) onLangChange(l.code);
                      setLangMenuOpen(false);
                    }}
                    style={{
                      padding: '9px 16px',
                      fontSize: '0.82rem',
                      color: lang === l.code ? colors.brandPurple : (isLight ? '#334155' : '#CBD5E1'),
                      fontWeight: lang === l.code ? 700 : 400,
                      cursor: 'pointer',
                      background: lang === l.code ? (isLight ? '#F5F3FF' : 'rgba(129,140,248,0.15)') : 'transparent'
                    }}
                  >
                    {l.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isLight ? '#0F172A' : '#FFFFFF',
                transition: 'all 0.2s ease'
              }}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          )}
        </div>
      </header>

      {/* Main Center Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px 48px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: 480,
          width: '100%',
          background: colors.cardBg,
          border: colors.cardBorder,
          borderRadius: 12,
          padding: '40px 42px 34px',
          boxShadow: colors.cardShadow,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxSizing: 'border-box',
          color: colors.titleColor,
          transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
        }}>
          {showForgot ? (
            /* Forgot Password Flow */
            <div>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: colors.brandPurple,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  padding: 0,
                  marginBottom: 20
                }}
              >
                <ArrowLeft size={16} /> Back to Sign In
              </button>

              <h1 style={{
                fontSize: '1.9rem',
                fontWeight: 800,
                color: colors.titleColor,
                marginBottom: 8,
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}>
                Reset Password
              </h1>
              <p style={{ fontSize: '0.92rem', color: colors.subtitleColor, marginBottom: 24, lineHeight: 1.4 }}>
                Enter your email address to receive password reset instructions.
              </p>

              {forgotSent ? (
                <div style={{
                  padding: '16px',
                  background: colors.resetBg,
                  border: `1px solid ${colors.resetBorder}`,
                  borderRadius: 6,
                  color: colors.resetColor,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <Check size={18} />
                  <span>Reset instructions have been sent to your email!</span>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    style={{
                      width: '100%',
                      height: 48,
                      border: `1px solid ${colors.inputBorder}`,
                      borderRadius: 4,
                      padding: '0 16px',
                      fontSize: '0.95rem',
                      color: colors.inputColor,
                      background: colors.inputBg,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: 48,
                      marginTop: 20,
                      background: colors.continueBtnBg,
                      border: `2px solid ${colors.purpleBorder}`,
                      borderRadius: 4,
                      color: colors.purpleBorder,
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.continueBtnHoverBg;
                      e.currentTarget.style.color = colors.continueBtnHoverText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.continueBtnBg;
                      e.currentTarget.style.color = colors.purpleBorder;
                    }}
                  >
                    Send Reset Link
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Main Form Matching Image 2 */
            <div>
              {/* Heading */}
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: colors.titleColor,
                margin: '0 0 6px 0',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}>
                {isSignUp ? 'Create your account' : 'Welcome back!'}
              </h1>

              {/* Subheading / Toggle */}
              <div style={{
                fontSize: '0.95rem',
                color: colors.subtitleColor,
                marginBottom: 26,
                lineHeight: 1.4
              }}>
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <span
                      onClick={() => setIsSignUp(false)}
                      style={{ color: colors.brandPurple, cursor: 'pointer', fontWeight: 500 }}
                    >
                      Sign in
                    </span>
                  </>
                ) : (
                  <>
                    New user?{' '}
                    <span
                      onClick={() => setIsSignUp(true)}
                      style={{ color: colors.brandPurple, cursor: 'pointer', fontWeight: 500 }}
                    >
                      Join now
                    </span>
                  </>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div style={{ marginBottom: 14 }}>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      height: 48,
                      border: `1px solid ${colors.inputBorder}`,
                      borderRadius: 4,
                      padding: '0 16px',
                      fontSize: '0.95rem',
                      color: colors.inputColor,
                      background: colors.inputBg,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease, background 0.3s ease, color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.inputBorderFocus}
                    onBlur={(e) => e.target.style.borderColor = colors.inputBorder}
                  />
                </div>

                {/* Password input */}
                <div>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      height: 48,
                      border: `1px solid ${colors.inputBorder}`,
                      borderRadius: 4,
                      padding: '0 16px',
                      fontSize: '0.95rem',
                      color: colors.inputColor,
                      background: colors.inputBg,
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease, background 0.3s ease, color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.inputBorderFocus}
                    onBlur={(e) => e.target.style.borderColor = colors.inputBorder}
                  />
                </div>

                {/* CONTINUE Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    height: 48,
                    marginTop: 20,
                    background: colors.continueBtnBg,
                    border: `2px solid ${colors.purpleBorder}`,
                    borderRadius: 4,
                    color: colors.purpleBorder,
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.continueBtnHoverBg;
                    e.currentTarget.style.color = colors.continueBtnHoverText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.continueBtnBg;
                    e.currentTarget.style.color = colors.purpleBorder;
                  }}
                >
                  {loading ? 'PLEASE WAIT...' : 'CONTINUE'}
                </button>
              </form>

              {/* Forgot password */}
              <div style={{ marginTop: 14 }}>
                <span
                  onClick={() => setShowForgot(true)}
                  style={{
                    color: colors.brandPurple,
                    fontSize: '0.9rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                >
                  Forgot your password?
                </span>
              </div>

              {/* Divider: —————— OR —————— */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '22px 0'
              }}>
                <div style={{ flex: 1, height: 1, background: colors.dividerLine }} />
                <span style={{
                  padding: '0 16px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: colors.dividerText,
                  letterSpacing: '0.04em'
                }}>
                  OR
                </span>
                <div style={{ flex: 1, height: 1, background: colors.dividerLine }} />
              </div>

              {/* Social Login 1: Continue with Google */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                style={{
                  width: '100%',
                  height: 48,
                  background: colors.socialBtnBg,
                  border: colors.socialBtnBorder,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  color: colors.socialBtnText,
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  transition: 'background 0.15s ease, color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.socialBtnHoverBg}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.socialBtnBg}
              >
                {/* Official Multi-color Google 'G' icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ position: 'absolute', left: 24 }}
                >
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.37 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Social Login 2: Continue with Apple */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Apple')}
                style={{
                  width: '100%',
                  height: 48,
                  marginTop: 10,
                  background: colors.socialBtnBg,
                  border: colors.socialBtnBorder,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  color: colors.socialBtnText,
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  transition: 'background 0.15s ease, color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.socialBtnHoverBg}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.socialBtnBg}
              >
                {/* Official Apple icon with adaptive fill */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={colors.appleIconFill}
                  style={{ position: 'absolute', left: 24, transition: 'fill 0.3s ease' }}
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.56.64-.99 1.7-0.86 2.72 1.01.08 2.03-.51 2.55-1.21z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>

              {/* Disclaimer */}
              <div style={{
                marginTop: 22,
                fontSize: '0.73rem',
                color: colors.disclaimerColor,
                lineHeight: 1.4,
                textAlign: 'left'
              }}>
                Protected by reCAPTCHA and subject to the Google{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.disclaimerLink, textDecoration: 'underline' }}
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.disclaimerLink, textDecoration: 'underline' }}
                >
                  Terms of Service
                </a>
                .
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
