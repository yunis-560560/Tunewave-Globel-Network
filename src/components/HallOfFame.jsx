import React, { useRef, useEffect, useState, useCallback } from 'react';
import { HALL_OF_FAME } from '../data/content';
import ClienteleSection from './ClienteleSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HallOfFame() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Mouse drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Keep progress indicator in sync with viewport scrollLeft
  const handleViewportScroll = () => {
    if (!viewportRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const pct = Math.max(0, Math.min(1, scrollLeft / maxScroll));
      setProgress(pct);
    }
  };

  // Desktop vertical scroll translates viewport scrollLeft
  const calculateTranslation = useCallback(() => {
    if (!sectionRef.current || !viewportRef.current) return;
    if (window.innerWidth <= 768) return; // Allow native swipe/touch on mobile

    const sectionEl = sectionRef.current;
    const rect = sectionEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const navbarHeight = 76;
    const totalScrollableDistance = rect.height - (windowHeight - navbarHeight);

    if (totalScrollableDistance <= 0) return;

    const scrolled = navbarHeight - rect.top;
    const rawProgress = scrolled / totalScrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    const maxScroll = viewportRef.current.scrollWidth - viewportRef.current.clientWidth;
    if (maxScroll > 0) {
      viewportRef.current.scrollLeft = clampedProgress * maxScroll;
      setProgress(clampedProgress);
    }
  }, []);

  useEffect(() => {
    let animationFrameId;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateTranslation);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    calculateTranslation();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [calculateTranslation]);

  // Auto-scroll ONLY in mobile version (<= 768px)
  const isInteractingRef = useRef(false);
  const pauseTimerRef = useRef(null);

  const pauseAutoScrollTemporarily = () => {
    isInteractingRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 4500); // Resume auto-scroll 4.5s after user stops interacting
  };

  useEffect(() => {
    const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

    const interval = setInterval(() => {
      // ONLY run on mobile version
      if (!isMobile() || !viewportRef.current || isInteractingRef.current || isDraggingRef.current) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
      const cardStep = 262; // 250px card width + 12px gap
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 20) {
        // Smoothly loop back to first artist
        viewportRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Advance to next artist card
        viewportRef.current.scrollBy({ left: cardStep, behavior: 'smooth' });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  // Mouse drag support for smooth horizontal panning
  const handleMouseDown = (e) => {
    pauseAutoScrollTemporarily();
    if (!viewportRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - viewportRef.current.offsetLeft;
    scrollLeftRef.current = viewportRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    viewportRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Interactive Next / Prev Arrow Navigation
  const scrollByDirection = (dir) => {
    pauseAutoScrollTemporarily();
    if (!viewportRef.current) return;
    const cardWidth = window.innerWidth <= 768 ? 262 : 360;
    viewportRef.current.scrollBy({
      left: dir * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Top Selection: CLIENTELE Section with authentic logos and animation from a3labels.in */}
      <ClienteleSection />

      {/* Main Artists Horizontal Scroll Section */}
      <section ref={sectionRef} className="madverse-artists-section" id="artists-hall-of-fame">
        <div className="madverse-artists-sticky">
          {/* Top Header - Exact Referral Style from Madverse */}
          <div className="madverse-artists-header reveal-up">
            <div className="madverse-artists-kicker">
              <span
                className="pulse-dot"
                style={{
                  backgroundColor: '#00FF66',
                  boxShadow: '0 0 10px #00FF66',
                  width: 7,
                  height: 7
                }}
              />
              <span>OUR ARTISTS · 04 HALL OF FAME</span>
            </div>

            <h2 className="madverse-artists-title">
              TRUSTED BY 7,000+ ARTISTS TO<br />
              DISTRIBUTE, MONETISE &amp; GROW
            </h2>

            <p className="madverse-artists-sub">
              From bedroom uploads to <strong>Grammy stages</strong>. Breakout independent stars, chart toppers, and viral innovators scale with Tunewave.
            </p>
          </div>

          {/* Edge-to-Edge Cards Viewport */}
          <div
            ref={viewportRef}
            className="madverse-artists-viewport"
            onScroll={handleViewportScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={pauseAutoScrollTemporarily}
            onTouchMove={pauseAutoScrollTemporarily}
          >
            <div ref={trackRef} className="madverse-artists-track">
              {HALL_OF_FAME.map((artist, idx) => (
                <div key={idx} className="madverse-artist-card card-shimmer-sweep">
                  {/* Artist Photo */}
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="madverse-artist-img"
                    loading="lazy"
                    draggable="false"
                  />

                  {/* Default Bottom Scrim */}
                  <div className="madverse-artist-base-scrim" />

                  {/* Default Visible Meta Info */}
                  <div className="madverse-artist-meta-default">
                    <div>
                      <div className="madverse-artist-default-name">{artist.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#00FF66', fontWeight: 700, marginTop: 3 }}>
                        {artist.stats}
                      </div>
                    </div>
                    <span className="madverse-artist-badge">{artist.genre}</span>
                  </div>

                  {/* Full-bleed Hover Overlay (Matching Madverse Nucleya / Arpit Bala) */}
                  <div className="madverse-artist-hover-overlay">
                    <div className="madverse-artist-hover-name">{artist.name}</div>
                    <div className="madverse-artist-hover-info">
                      <span className="madverse-artist-hover-stats">{artist.stats}</span>
                      <span className="madverse-artist-hover-dot">·</span>
                      <span className="madverse-artist-hover-genre">{artist.genre}</span>
                    </div>
                    <div className="madverse-artist-hover-accolade">
                      {artist.accolade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bar with Progress Track & Interactive Navigation Controls */}
          <div className="madverse-artists-footer-bar">
            <div className="madverse-progress-track">
              <div
                className="madverse-progress-fill"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="madverse-scroll-indicator">
                <span>SWIPE OR EXPLORE</span>
                <span className="madverse-indicator-arrow">→</span>
              </div>

              {/* Next & Previous Arrow Buttons */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => scrollByDirection(-1)}
                  className="madverse-nav-btn"
                  title="Previous artist"
                  aria-label="Previous artist"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollByDirection(1)}
                  className="madverse-nav-btn"
                  title="Next artist"
                  aria-label="Next artist"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
