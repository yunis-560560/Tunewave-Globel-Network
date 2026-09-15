import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DistributionSection from './components/DistributionSection';
import MonetizeSection from './components/MonetizeSection';
import GrowSection from './components/GrowSection';
import HallOfFame from './components/HallOfFame';
import Footer from './components/Footer';

// Pages
import PricingPage from './pages/PricingPage';
import ReviewsPage from './pages/ReviewsPage';
import GetSignedPage from './pages/GetSignedPage';
import AdvicePage from './pages/AdvicePage';
import DistributePage from './pages/DistributePage';
import VevoPage from './pages/VevoPage';
import MonetizePage from './pages/MonetizePage';
import PublishingPage from './pages/PublishingPage';
import SyncPage from './pages/SyncPage';
import YouTubeContentIdPage from './pages/YouTubeContentIdPage';
import GrowPage from './pages/GrowPage';
import PromoPage from './pages/PromoPage';
import PlaylistsPage from './pages/PlaylistsPage';
import AdLauncherPage from './pages/AdLauncherPage';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ArtistDashboard from './pages/ArtistDashboard';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [lang, setLang] = useState('en');
  const [artistName, setArtistName] = useState('Nova Luna');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('tunewave_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [useEmblemAsset, setUseEmblemAsset] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('tunewave_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Global Scroll Reveal Observer (Echoa / Madverse / Westones high-performance scroll triggers)
  useEffect(() => {
    let observer;
    const timeoutId = setTimeout(() => {
      const observerCallback = (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            obs.unobserve(entry.target);
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      });

      const targets = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-up, .reveal-scale, .reveal-stagger, .glass-panel, .dist-showcase-card'
      );

      targets.forEach(el => {
        // If element is already in the upper viewport on load, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-in-view');
        } else {
          observer.observe(el);
        }
      });
    }, 60);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [currentPath]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLogoVariant = () => {
    setUseEmblemAsset(prev => !prev);
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/pricing':
        return <PricingPage onNavigate={navigate} theme={theme} />;
      case '/reviews':
        return <ReviewsPage onNavigate={navigate} theme={theme} />;
      case '/about':
      case '/about-us':
      case '/company':
      case '/contact':
      case '/support':
        return <AboutPage onNavigate={navigate} theme={theme} />;
      case '/get-signed':
        return <GetSignedPage onNavigate={navigate} />;
      case '/advice':
        return <AdvicePage onNavigate={navigate} theme={theme} />;
      case '/distribute':
      case '/sell-your-music':
        return <DistributePage onNavigate={navigate} theme={theme} />;
      case '/sell-your-music/vevo':
      case '/vevo':
      case '/music-videos':
        return <VevoPage onNavigate={navigate} theme={theme} />;
      case '/monetize':
        return <MonetizePage onNavigate={navigate} theme={theme} />;
      case '/publishing':
        return <PublishingPage onNavigate={navigate} theme={theme} />;
      case '/sync':
        return <SyncPage onNavigate={navigate} theme={theme} />;
      case '/tools/youtube-content-id':
      case '/youtube-content-id':
        return <YouTubeContentIdPage onNavigate={navigate} theme={theme} />;
      case '/grow':
        return <GrowPage onNavigate={navigate} theme={theme} />;
      case '/promo':
      case '/music-promotion':
        return <PromoPage onNavigate={navigate} theme={theme} />;
      case '/playlists':
      case '/playlists0':
      case '/editorial-playlists':
        return <PlaylistsPage onNavigate={navigate} theme={theme} />;
      case '/ad-launcher':
      case '/ads':
      case '/automated-ad-launcher':
        return <AdLauncherPage onNavigate={navigate} theme={theme} />;
      case '/app':
        return <AppPage onNavigate={navigate} theme={theme} />;
      case '/login':
        return (
          <LoginPage
            onNavigate={navigate}
            onLoginSuccess={() => setArtistName('Nova Luna')}
            theme={theme}
            onToggleTheme={toggleTheme}
            lang={lang}
            onLangChange={(newLang) => setLang(newLang)}
          />
        );
      case '/signup':
        return (
          <SignupPage
            onNavigate={navigate}
            onSignupSuccess={(name) => setArtistName(name)}
            theme={theme}
            onToggleTheme={toggleTheme}
            lang={lang}
            onLangChange={(newLang) => setLang(newLang)}
          />
        );
      case '/artist/dashboard':
        return (
          <ArtistDashboard
            artistName={artistName}
            onNavigate={navigate}
          />
        );
      case '/':
      default:
        return (
          <>
            <Hero onNavigate={navigate} lang={lang} />
            <DistributionSection onNavigate={navigate} lang={lang} />
            <MonetizeSection onNavigate={navigate} lang={lang} />
            <GrowSection onNavigate={navigate} lang={lang} />
            <HallOfFame />
          </>
        );
    }
  };

  const isLoginPage = currentPath === '/login' || currentPath === '/signup';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isLoginPage && (
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          lang={lang}
          onLangChange={(newLang) => setLang(newLang)}
          theme={theme}
          onToggleTheme={toggleTheme}
          useEmblemAsset={useEmblemAsset}
          onToggleLogoVariant={toggleLogoVariant}
        />
      )}

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </main>

      {/* Hide full footer in dashboard view and login page for a clean immersive feel */}
      {currentPath !== '/artist/dashboard' && !isLoginPage && (
        <Footer onNavigate={navigate} theme={theme} useEmblemAsset={useEmblemAsset} />
      )}
    </div>
  );
}
