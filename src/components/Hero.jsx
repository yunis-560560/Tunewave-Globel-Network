import React from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Globe,
  Tv
} from 'lucide-react';
import { TRANSLATIONS } from '../data/content';

export default function Hero({ onNavigate, lang = 'en' }) {
  const t = TRANSLATIONS[lang]?.hero || TRANSLATIONS.en.hero;

  return (
    <section className="hero-full-bg-section">
      {/* Full Background Video (Cloned directly from Echoa: https://echoa-128.webflow.io/) */}
      <div className="hero-full-video-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://cdn.prod.website-files.com/696cc361a7e2afabf07de814%2F6979d2c01474021feca86502_4553939-hd_1920_1080_30fps_poster.0000000.jpg"
          className="hero-video-element"
        >
          <source 
            src="https://cdn.prod.website-files.com/696cc361a7e2afabf07de814%2F6979d2c01474021feca86502_4553939-hd_1920_1080_30fps_mp4.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://cdn.prod.website-files.com/696cc361a7e2afabf07de814%2F6979d2c01474021feca86502_4553939-hd_1920_1080_30fps_webm.webm" 
            type="video/webm" 
          />
        </video>

        {/* High-End Studio Overlay: Scrim ONLY on the left for text readability; crystal clear on the right */}
        <div className="hero-video-scrim" />
        <div className="hero-video-vignette" />
        <div className="hero-video-studio-glow" />
      </div>

      <div className="container hero-content-container">
        <div className="hero-text-content">
          
          {/* Main Headline (Left-aligned, exact text, mask reveal typography) */}
          <h1 className="hero-main-title">
            <span className="hero-title-mask">
              <span className="hero-title-line hero-line-1">{t.titlePart1}</span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line hero-line-2 text-cyan-gradient hero-title-glow">
                {t.titleHighlight}
              </span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line hero-line-3">{t.titlePart2}</span>
            </span>
          </h1>

          {/* Subtitle (Left-aligned, exact text) */}
          <p className="hero-main-subtitle hero-anim-fade-up hero-delay-4">
            {t.subtitle}
          </p>

          {/* Action Buttons (Original buttons, Left-Aligned) */}
          <div className="hero-actions-group hero-anim-fade-up hero-delay-5">
            <button
              onClick={() => onNavigate('/signup')}
              className="btn-cyan hero-btn-primary"
            >
              <span>{t.startBtn}</span>
              <ArrowRight size={18} className="btn-icon-hover" />
            </button>

            <button
              onClick={() => onNavigate('/distribute')}
              className="btn-glass hero-btn-secondary"
            >
              <span>{t.exploreBtn}</span>
              <ChevronRight size={18} className="btn-icon-hover" />
            </button>
          </div>

          {/* Live Social Proof Badge Bar */}
          <div className="hero-proof-bar hero-anim-fade-up hero-delay-6">
            <div className="avatar-group">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Artist avatar"
                  className={`avatar-img hero-avatar-pop hero-avatar-${i}`}
                  style={{ marginLeft: i === 0 ? 0 : -10 }}
                />
              ))}
            </div>

            <div className="pill-badge live">
              <span className="pulse-dot" />
              <span>{t.liveBadge}</span>
            </div>

            <div className="proof-info">
              <div className="proof-rating-row">
                <span>{t.trustedBy}</span>
                <div className="stars-flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#00E5FF" stroke="#00E5FF" />
                  ))}
                </div>
              </div>
              <div className="proof-sub text-muted">
                {t.statsLine}
              </div>
            </div>
          </div>

          {/* 3 Quick Value Feature Cards */}
          <div className="hero-feature-cards hero-anim-fade-up hero-delay-7 reveal-stagger is-in-view">
            <div className="feature-card-mini card-shimmer-sweep">
              <Globe size={18} className="feat-icon" />
              <div>
                <div className="feat-title">Digital Distribution</div>
                <div className="feat-desc">150+ stores worldwide</div>
              </div>
            </div>

            <div className="feature-card-mini card-shimmer-sweep">
              <ShieldCheck size={18} className="feat-icon" />
              <div>
                <div className="feat-title">Rights Protection</div>
                <div className="feat-desc">100% artist retention</div>
              </div>
            </div>

            <div className="feature-card-mini card-shimmer-sweep">
              <Tv size={18} className="feat-icon" />
              <div>
                <div className="feat-title">YouTube Monetization</div>
                <div className="feat-desc">Content ID & OAC sync</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
