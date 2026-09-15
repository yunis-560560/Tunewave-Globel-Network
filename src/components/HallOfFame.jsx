import React, { useRef, useEffect, useState, useCallback } from 'react';
import { HALL_OF_FAME } from '../data/content';
import ClienteleSection from './ClienteleSection';

export default function HallOfFame() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Mouse drag support
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const calculateTranslation = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    const rect = sectionEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const navbarHeight = 76;
    const totalScrollableDistance = rect.height - (windowHeight - navbarHeight);

    if (totalScrollableDistance <= 0) return;

    // Calculate how much we've scrolled inside the section after pinning below navbar
    const scrolled = navbarHeight - rect.top;
    const rawProgress = scrolled / totalScrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    setProgress(clampedProgress);

    const trackWidth = trackEl.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewportWidth + 48);

    const targetX = clampedProgress * maxTranslate;
    trackEl.style.transform = `translate3d(-${targetX}px, 0, 0)`;
  }, []);

  useEffect(() => {
    let animationFrameId;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateTranslation);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial calculation
    calculateTranslation();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [calculateTranslation]);

  // Optional mouse drag panning
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    const style = window.getComputedStyle(trackRef.current);
    const matrix = new DOMMatrixReadOnly(style.transform);
    scrollLeftRef.current = -matrix.m41;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const deltaX = e.pageX - startXRef.current;
    const maxTranslate = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48);
    const newX = Math.max(0, Math.min(maxTranslate, scrollLeftRef.current - deltaX));
    trackRef.current.style.transform = `translate3d(-${newX}px, 0, 0)`;
    setProgress(maxTranslate > 0 ? newX / maxTranslate : 0);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
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
              From bedroom uploads to <strong>Grammy stages</strong>. Breakout independent stars, chart toppers, and viral innovators scale with TuneWave.
            </p>
          </div>

          {/* Edge-to-Edge Cards Viewport */}
          <div
            ref={viewportRef}
            className="madverse-artists-viewport"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
                      <span className="madverse-artist-hover-dot">"¢</span>
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

          {/* Footer Bar with Progress Track & Scroll Prompt */}
          <div className="madverse-artists-footer-bar">
            <div className="madverse-progress-track">
              <div
                className="madverse-progress-fill"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <div className="madverse-scroll-indicator">
              <span>SCROLL DOWN TO EXPLORE</span>
              <span className="madverse-indicator-arrow">→</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
