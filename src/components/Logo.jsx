import React from 'react';

export default function Logo({ 
  size = 'default', 
  theme = 'dark', // 'dark' | 'light'
  showSubtitle = true, 
  className = '',
  style = {}
}) {
  const isLight = theme === 'light';
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  // Dimension scaling
  const emblemHeight = isLarge ? 48 : isSmall ? 26 : 36;
  const wordmarkHeight = isLarge ? 22 : isSmall ? 13 : 17;
  const wordmarkWidth = isLarge ? 226 : isSmall ? 133 : 175;
  const subFontSize = isLarge ? '0.74rem' : isSmall ? '0.44rem' : '0.56rem';
  const gap = isLarge ? 12 : isSmall ? 7 : 10;

  // Assets depending on theme
  const emblemSrc = isLight ? '/brand/emblem.svg' : '/brand/emblem-dark.svg';
  const wordmarkSrc = isLight ? '/brand/wordmark.svg' : '/brand/wordmark-dark.svg';

  // Colors
  const globalColor = isLight ? '#007791' : '#00E5FF';
  const globalTextShadow = isLight ? 'none' : '0 0 8px rgba(0, 229, 255, 0.45)';
  const glowFilter = isLight ? 'none' : 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.35))';

  return (
    <div 
      className={`tw-brand-logo ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: gap,
        userSelect: 'none',
        textDecoration: 'none',
        ...style
      }}
    >
      {/* 3.svg audio-wave 'T' Emblem */}
      <img
        src={emblemSrc}
        alt="Tunewave Emblem"
        className="tw-logo-emblem"
        style={{
          height: emblemHeight,
          width: 'auto',
          display: 'block',
          flexShrink: 0,
          filter: glowFilter,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease'
        }}
      />

      {/* Right Lockup: 2.svg Tunewave Wordmark + GLOBAL NETWORK */}
      <div 
        className="tw-logo-wordmark-wrap"
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: wordmarkWidth,
          flexShrink: 0,
          justifyContent: 'center'
        }}
      >
        {/* 2.svg Tunewave Wordmark */}
        <img
          src={wordmarkSrc}
          alt="Tunewave"
          className="tw-logo-wordmark-img"
          style={{
            width: '100%',
            height: wordmarkHeight,
            display: 'block',
            objectFit: 'contain',
            objectPosition: 'left center',
            filter: glowFilter,
            transition: 'filter 0.25s ease'
          }}
        />

        {/* Subtitle: G L O B A L   N E T W O R K */}
        {showSubtitle && (
          <div 
            className="tw-logo-subtitle"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontSize: subFontSize,
              fontWeight: 800,
              fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
              color: globalColor,
              textShadow: globalTextShadow,
              lineHeight: 1,
              marginTop: isLarge ? 4 : 2,
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flex: '0 0 43%' }}>
              <span>G</span><span>L</span><span>O</span><span>B</span><span>A</span><span>L</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flex: '0 0 51%' }}>
              <span>N</span><span>E</span><span>T</span><span>W</span><span>O</span><span>R</span><span>K</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
