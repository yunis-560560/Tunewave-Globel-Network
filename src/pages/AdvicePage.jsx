import React, { useState } from "react";
import { BLOG_ARTICLES } from "../data/content";
import { Search, Clock, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

// ── Category config ──────────────────────────────────────────
const ALL_CATEGORIES = ["All stories", "Release Strategy", "Royalties & Legal", "Marketing"];

// ── Per-category pill colors (adaptive for both Dark and Light modes) ─────
const getCategoryStyle = (cat, isLight) => {
  if (isLight) {
    switch (cat) {
      case "Release Strategy":
        return {
          bg: "rgba(0, 126, 167, 0.09)",
          color: "#007EA7",
          border: "1px solid rgba(0, 126, 167, 0.25)",
          dot: "#007EA7"
        };
      case "Royalties & Legal":
        return {
          bg: "rgba(2, 132, 199, 0.09)",
          color: "#0284C7",
          border: "1px solid rgba(2, 132, 199, 0.25)",
          dot: "#0284C7"
        };
      case "Marketing":
      default:
        return {
          bg: "rgba(15, 118, 110, 0.09)",
          color: "#0F766E",
          border: "1px solid rgba(15, 118, 110, 0.25)",
          dot: "#0F766E"
        };
    }
  } else {
    switch (cat) {
      case "Release Strategy":
        return {
          bg: "rgba(0, 229, 255, 0.12)",
          color: "#00E5FF",
          border: "1px solid rgba(0, 229, 255, 0.28)",
          dot: "#00E5FF"
        };
      case "Royalties & Legal":
        return {
          bg: "rgba(0, 242, 254, 0.12)",
          color: "#00F2FE",
          border: "1px solid rgba(0, 242, 254, 0.28)",
          dot: "#00F2FE"
        };
      case "Marketing":
      default:
        return {
          bg: "rgba(56, 189, 248, 0.12)",
          color: "#38BDF8",
          border: "1px solid rgba(56, 189, 248, 0.28)",
          dot: "#38BDF8"
        };
    }
  }
};

// ── Fallback images by category ──────────────────────────────
const CAT_IMAGES = {
  "Release Strategy":  "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80",
  "Royalties & Legal": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  "Marketing":         "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
};
const articleImg = (a) => a.image || CAT_IMAGES[a.category] || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80";

const ARTICLES_PER_PAGE = 9;

export default function AdvicePage({ onNavigate, theme }) {
  // Check theme dynamically
  const isLight = theme === "light" || (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light");
  const catStyle = (cat) => getCategoryStyle(cat, isLight);

  const [activeCategory, setActiveCategory] = useState("All stories");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);

  // ── Filter ──────────────────────────────────────────────────
  const filtered = BLOG_ARTICLES.filter(post => {
    const matchesCat = activeCategory === "All stories" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  const FEATURED = BLOG_ARTICLES[0];
  const TOP_THREE = BLOG_ARTICLES.slice(1, 4);
  const POPULAR = BLOG_ARTICLES.slice(0, 6);

  const handleSearch = (val) => { setSearchTerm(val); setPage(1); };
  const handleCat = (cat) => { setActiveCategory(cat); setPage(1); };

  return (
    <div style={{ paddingTop: 0, paddingBottom: 0, background: "var(--tw-bg-dark)" }}>
      <style>{`
        @media (max-width: 768px) {
          .advice-featured-card {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .advice-featured-image {
            order: -1;
            height: 220px !important;
            max-height: 220px !important;
          }
          .advice-featured-image img {
            height: 100% !important;
          }
          .advice-featured-content {
            padding: 24px 20px !important;
          }
          .advice-top-three-grid {
            grid-template-columns: 1fr !important;
          }
          .advice-top-three-item {
            border-right: none !important;
            border-bottom: 1px solid var(--tw-line) !important;
          }
          .advice-top-three-item:last-child {
            border-bottom: none !important;
          }
          .advice-popular-grid {
            grid-template-columns: 1fr !important;
          }
          .advice-popular-col {
            border-right: none !important;
            padding: 4px 0 !important;
          }
          .advice-articles-grid {
            grid-template-columns: 1fr !important;
          }
          .advice-hero-section {
            padding: 44px 0 0 !important;
          }
          .advice-search-wrapper {
            margin-bottom: 32px !important;
          }
          .advice-modal-body {
            padding: 22px 18px 28px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .advice-articles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="advice-hero-section" style={{ padding: "80px 0 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">

          {/* Big headline */}
          <h1 style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, color: "var(--tw-text-white)", maxWidth: 700 }}>
            Music advice for{" "}
            <span style={{ color: "var(--tw-cyan)" }}>independent artists.</span>
          </h1>

          {/* Search bar */}
          <div className="advice-search-wrapper" style={{ position: "relative", maxWidth: 480, marginBottom: 52 }}>
            <Search size={17} color="var(--tw-text-muted)" style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
              style={{
                width: "100%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)",
                borderRadius: 9999, padding: "14px 20px 14px 48px", color: "var(--tw-text-white)", fontSize: "0.92rem",
                outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
              }}
              onFocus={e => e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"}
              onBlur={e => e.currentTarget.style.borderColor = "var(--tw-line-bright)"}
            />
          </div>

          {/* Featured Editor's Pick — 50/50 split */}
          <div className="advice-featured-card" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            borderRadius: 20, overflow: "hidden",
            border: "1px solid var(--tw-line-bright)",
            minHeight: 360, cursor: "pointer",
            transition: "border-color 0.2s, transform 0.2s"
          }}
            onClick={() => setSelectedArticle(FEATURED)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {/* Left: adaptive content panel */}
            <div className="advice-featured-content" style={{ background: "var(--tw-bg-card)", padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 800, padding: "5px 12px", borderRadius: 9999,
                    background: isLight ? "#007EA7" : "var(--tw-cyan)",
                    color: isLight ? "#FFFFFF" : "#040D1A",
                    letterSpacing: "0.06em"
                  }}>
                    {FEATURED.category.toUpperCase()}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--tw-text-dim)", letterSpacing: "0.06em" }}>
                    EDITOR&apos;S PICK
                  </span>
                </div>
                <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.2, marginBottom: 16 }}>
                  {FEATURED.title}
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--tw-text-dim)", lineHeight: 1.7 }}>
                  {FEATURED.excerpt}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28 }}>
                <span style={{ fontSize: "0.8rem", color: "var(--tw-text-muted)" }}>{FEATURED.date}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.88rem", fontWeight: 700, color: "var(--tw-cyan)" }}>
                  Read the story <ArrowRight size={15} />
                </span>
              </div>
            </div>
            {/* Right: image */}
            <div className="advice-featured-image" style={{ overflow: "hidden" }}>
              <img src={articleImg(FEATURED)} alt={FEATURED.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
          </div>
        </div>

        {/* ── TOP 3 sub-featured ── */}
        <div className="container" style={{ marginTop: 0 }}>
          <div className="advice-top-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, borderTop: "1px solid var(--tw-line)", marginTop: 0 }}>
            {TOP_THREE.map((article, i) => (
              <div key={article.id} className="advice-top-three-item" style={{
                borderRight: i < 2 ? "1px solid var(--tw-line)" : "none",
                cursor: "pointer", overflow: "hidden",
                transition: "background 0.2s"
              }}
                onClick={() => setSelectedArticle(article)}
                onMouseEnter={e => e.currentTarget.style.background = "var(--tw-bg-surface)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Image with ghost number */}
                <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                  <img src={articleImg(article)} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                  {/* Ghost number */}
                  <div style={{
                    position: "absolute", bottom: 8, left: 16,
                    fontSize: "5rem", fontWeight: 900, lineHeight: 1, fontFamily: "var(--tw-font-heading)",
                    color: "rgba(255,255,255,0.22)", textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    pointerEvents: "none", userSelect: "none"
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{
                      fontSize: "0.64rem", fontWeight: 800, padding: "3px 10px", borderRadius: 9999,
                      background: catStyle(article.category).bg,
                      color: catStyle(article.category).color,
                      border: catStyle(article.category).border,
                      letterSpacing: "0.06em"
                    }}>
                      {article.category.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--tw-text-muted)" }}>{article.date}</span>
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--tw-text-white)", lineHeight: 1.3, marginBottom: 8 }}>{article.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "var(--tw-text-dim)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOST POPULAR ──────────────────────────────────── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: isLight ? "#007EA7" : "#00E5FF",
              boxShadow: isLight ? "0 0 10px rgba(0,126,167,0.5)" : "0 0 10px rgba(0,229,255,0.8)"
            }} />
            <span style={{
              fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em",
              color: isLight ? "#007EA7" : "var(--tw-cyan)"
            }}>MOST POPULAR</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "var(--tw-text-white)", marginBottom: 36, letterSpacing: "-0.02em" }}>
            What artists are reading right now.
          </h2>

          <div className="advice-popular-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {POPULAR.map((article, i) => {
              const cs = catStyle(article.category);
              return (
                <div key={article.id} className="advice-popular-col" style={{
                  borderTop: "1px solid var(--tw-line)",
                  borderRight: i % 2 === 0 ? "1px solid var(--tw-line)" : "none",
                  padding: i % 2 === 0 ? "8px 24px 8px 0" : "8px 0 8px 24px",
                }}>
                  <div
                    className="popular-article-row"
                    onClick={() => setSelectedArticle(article)}
                    style={{
                      display: "flex", alignItems: "center", gap: 20, padding: "14px 16px",
                      borderRadius: 12, cursor: "pointer",
                      transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                      position: "relative"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = isLight ? "rgba(0, 126, 167, 0.05)" : "rgba(0, 229, 255, 0.05)";
                      if (isLight) e.currentTarget.style.boxShadow = "0 4px 20px -2px rgba(0, 126, 167, 0.08)";
                      e.currentTarget.style.transform = "translateX(4px)";
                      const num = e.currentTarget.querySelector('.popular-num');
                      if (num) {
                        num.style.opacity = "1";
                        num.style.transform = "scale(1.06)";
                      }
                      const title = e.currentTarget.querySelector('.popular-title');
                      if (title) {
                        title.style.color = isLight ? "#007EA7" : "#00E5FF";
                      }
                      const thumb = e.currentTarget.querySelector('.popular-thumb');
                      if (thumb) {
                        thumb.style.transform = "scale(1.05)";
                        thumb.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateX(0)";
                      const num = e.currentTarget.querySelector('.popular-num');
                      if (num) {
                        num.style.opacity = isLight ? "0.45" : "0.35";
                        num.style.transform = "scale(1)";
                      }
                      const title = e.currentTarget.querySelector('.popular-title');
                      if (title) {
                        title.style.color = "var(--tw-text-white)";
                      }
                      const thumb = e.currentTarget.querySelector('.popular-thumb');
                      if (thumb) {
                        thumb.style.transform = "scale(1)";
                        thumb.style.boxShadow = "none";
                      }
                    }}
                  >
                    {/* Rank Number */}
                    <div
                      className="popular-num"
                      style={{
                        fontSize: "2.6rem", fontWeight: 900,
                        color: isLight ? "#007EA7" : "#00E5FF",
                        opacity: isLight ? 0.45 : 0.35,
                        fontFamily: "var(--tw-font-heading)",
                        lineHeight: 1, flexShrink: 0, minWidth: 54,
                        letterSpacing: "-0.03em",
                        transition: "all 0.22s ease",
                        userSelect: "none"
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Thumbnail */}
                    <img
                      src={articleImg(article)}
                      alt={article.title}
                      className="popular-thumb"
                      style={{
                        width: 62, height: 62, borderRadius: 10, objectFit: "cover", flexShrink: 0,
                        transition: "transform 0.22s ease, box-shadow 0.22s ease"
                      }}
                    />
                    {/* Text */}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ marginBottom: 6 }}>
                        <span style={{
                          fontSize: "0.64rem", fontWeight: 800, padding: "3px 10px", borderRadius: 9999,
                          background: cs.bg, color: cs.color, border: cs.border,
                          letterSpacing: "0.06em", display: "inline-block"
                        }}>
                          {article.category.toUpperCase()}
                        </span>
                      </div>
                      <h3
                        className="popular-title"
                        style={{
                          fontSize: "0.92rem", fontWeight: 700, color: "var(--tw-text-white)",
                          lineHeight: 1.35, transition: "color 0.2s ease"
                        }}
                      >
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── LATEST STORIES / ALL ARTICLES ─────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          {/* Section label */}
          <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", color: "var(--tw-text-muted)", marginBottom: 10 }}>
            LATEST STORIES
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 900, color: "var(--tw-text-white)", marginBottom: 28 }}>
            All articles.
          </h2>

          {/* Category filter pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
            {ALL_CATEGORIES.map(cat => {
              const active = activeCategory === cat;
              return (
                <button key={cat} onClick={() => handleCat(cat)} style={{
                  padding: "8px 20px", borderRadius: 9999, fontSize: "0.83rem", fontWeight: 700,
                  background: active
                    ? (isLight ? "linear-gradient(135deg, #007EA7 0%, #0284C7 100%)" : "linear-gradient(135deg, #00F2FE 0%, #00E5FF 100%)")
                    : "var(--tw-bg-card)",
                  color: active ? (isLight ? "#FFFFFF" : "#040D1A") : "var(--tw-text-dim)",
                  border: "1px solid " + (active ? (isLight ? "#007EA7" : "#00E5FF") : "var(--tw-line-bright)"),
                  cursor: "pointer", transition: "all 0.15s ease",
                  boxShadow: active ? (isLight ? "0 4px 14px rgba(0,126,167,0.25)" : "0 4px 14px rgba(0,229,255,0.25)") : "none"
                }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = isLight ? "#007EA7" : "#00E5FF"; e.currentTarget.style.color = isLight ? "#007EA7" : "#00E5FF"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.color = "var(--tw-text-dim)"; } }}
                >{cat}</button>
              );
            })}
          </div>

          {/* 3-column article cards grid */}
          {paginated.length > 0 ? (
            <div className="advice-articles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 64 }}>
              {paginated.map(article => {
                const cs = catStyle(article.category);
                return (
                  <div key={article.id} style={{
                    background: "var(--tw-bg-card)", border: "1px solid var(--tw-line)",
                    borderRadius: 16, overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    cursor: "pointer", transition: "border-color 0.2s, transform 0.2s"
                  }}
                    onClick={() => setSelectedArticle(article)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = isLight ? "#007EA7" : cs.color; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {/* Image with category badge */}
                    <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                      <img src={articleImg(article)} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />
                      {/* Category badge overlaid on image */}
                      <span style={{
                        position: "absolute", top: 12, left: 12,
                        fontSize: "0.62rem", fontWeight: 800, padding: "4px 11px", borderRadius: 9999,
                        background: isLight ? "#007EA7" : cs.color,
                        color: isLight ? "#FFFFFF" : (cs.color === "#00E5FF" ? "#080B11" : "#fff"),
                        letterSpacing: "0.06em",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
                      }}>
                        {article.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--tw-text-white)", lineHeight: 1.35, marginBottom: 10, flex: 1 }}>
                        {article.title}
                      </h3>
                      <p style={{
                        fontSize: "0.82rem", color: "var(--tw-text-dim)", lineHeight: 1.65, marginBottom: 20,
                        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden"
                      }}>
                        {article.excerpt}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--tw-line)", paddingTop: 14 }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--tw-text-muted)" }}>{article.date}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontWeight: 700, color: "var(--tw-cyan)" }}>
                          Read <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--tw-text-dim)" }}>
              <Search size={36} style={{ margin: "0 auto 16px", display: "block", opacity: 0.3 }} />
              <p>No articles found. Try a different search or category.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 16 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)", color: page === 1 ? "var(--tw-text-muted)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: page === 1 ? "not-allowed" : "pointer" }}
              ><ChevronLeft size={16} /></button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: page === n ? "linear-gradient(135deg, #00F2FE 0%, #00E5FF 100%)" : "var(--tw-bg-card)",
                  color: page === n ? "#040D1A" : "var(--tw-text-dim)",
                  border: "1px solid " + (page === n ? "#00E5FF" : "var(--tw-line-bright)"),
                  fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", transition: "all 0.15s"
                }}
                  onMouseEnter={e => { if (page !== n) { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.color = "#00E5FF"; } }}
                  onMouseLeave={e => { if (page !== n) { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.color = "var(--tw-text-dim)"; } }}
                >{n}</button>
              ))}

              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)", color: page === totalPages ? "var(--tw-text-muted)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: page === totalPages ? "not-allowed" : "pointer" }}
              ><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </section>

      {/* ─── READING MODAL ─────────────────────────────────── */}
      {selectedArticle && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{
            background: "var(--tw-bg-surface)", border: "1px solid var(--tw-line-bright)",
            borderRadius: 24, maxWidth: 760, maxHeight: "88vh", overflowY: "auto",
            width: "100%", position: "relative", boxShadow: "0 30px 80px rgba(0,0,0,0.6)"
          }}>
            {/* Header image */}
            <div style={{ height: 260, overflow: "hidden", borderRadius: "24px 24px 0 0" }}>
              <img src={articleImg(selectedArticle)} alt={selectedArticle.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div className="advice-modal-body" style={{ padding: "36px 48px 48px" }}>
              <button onClick={() => setSelectedArticle(null)} style={{ position: "absolute", top: 20, right: 20, width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "var(--tw-text-white)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X size={17} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 800, padding: "4px 12px", borderRadius: 9999,
                  background: catStyle(selectedArticle.category).bg,
                  color: catStyle(selectedArticle.category).color,
                  border: catStyle(selectedArticle.category).border,
                  letterSpacing: "0.06em"
                }}>{selectedArticle.category.toUpperCase()}</span>
                <span style={{ color: "var(--tw-text-muted)", fontSize: "0.8rem" }}>"¢</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--tw-text-dim)", fontSize: "0.8rem" }}>
                  <Clock size={13} /> {selectedArticle.readTime}
                </div>
                <span style={{ color: "var(--tw-text-muted)", fontSize: "0.8rem" }}>"¢</span>
                <span style={{ fontSize: "0.8rem", color: "var(--tw-text-muted)" }}>{selectedArticle.date}</span>
              </div>

              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: 28, color: "var(--tw-text-white)" }}>
                {selectedArticle.title}
              </h2>

              <div style={{ fontSize: "1rem", color: "var(--tw-text-dim)", lineHeight: 1.85, whiteSpace: "pre-line" }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--tw-line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <span style={{ fontSize: "0.88rem", color: "var(--tw-text-dim)" }}>Ready to put this into practice?</span>
                <button onClick={() => { setSelectedArticle(null); onNavigate && onNavigate("/signup"); }} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)", color: "#040D1A", border: "none",
                  borderRadius: 9999, padding: "12px 24px", fontWeight: 800, fontSize: "0.88rem",
                  cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s",
                  boxShadow: "0 4px 24px -2px rgba(0,229,255,0.45)"
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >START RELEASING FREE <ArrowRight size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
