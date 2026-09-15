import React, { useState, useEffect, useRef } from "react";
import {
  DollarSign, Radio, Users, Music, Globe, Star,
  Mic2, Headphones, TrendingUp, Send, CheckCircle,
  ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import { HALL_OF_FAME } from "../data/content";

const LABEL_SERVICES = [
  { icon: DollarSign,  color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.10)",  title: "Advances & Creative Support",   desc: "Up to $500K catalog advances backed by streaming projections —” zero personal liability." },
  { icon: Star,        color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.10)",  title: "Editorial Playlisting",         desc: "Direct pitch pipeline to Spotify, Apple Music, and Amazon editorial curators worldwide." },
  { icon: Radio,       color: "#38BDF8", bg: "rgba(56,189,248,0.10)", title: "Radio Promotion",               desc: "Hands-on pitching to BBC Radio 1, SiriusXM, Apple Music 1 and global terrestrial stations." },
  { icon: TrendingUp,  color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.10)",  title: "Sync Licensing",                desc: "Placed in film, TV, and advertising through our global sync partnerships." },
  { icon: Users,       color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.10)",  title: "Artist Marketing",              desc: "Data-driven campaign strategy across social platforms, DSP ad slots, and press." },
  { icon: Music,       color: "#38BDF8", bg: "rgba(56,189,248,0.10)", title: "Release Strategy",              desc: "Full rollout planning: pre-save campaigns, metadata, artwork, and phased drops." },
  { icon: Globe,       color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.10)",  title: "Distribution",                  desc: "Instant delivery to 150+ stores worldwide including Spotify, Apple Music, TikTok, and Beatport." },
  { icon: Headphones,  color: "var(--tw-cyan)", bg: "rgba(0,229,255,0.10)",  title: "Content ID",                    desc: "Full YouTube monetization for every upload, cover, and remix of your music." },
  { icon: Mic2,        color: "#38BDF8", bg: "rgba(56,189,248,0.10)", title: "Neighbouring Rights",           desc: "Automatically collect performer and master rights royalties from broadcast and streaming globally." },
];

const HOW_IT_WORKS = [
  { num: "01", title: "Release with TuneWave", desc: "Distribute your music to 150+ platforms, build your catalog and grow your streaming numbers. Our A&R team starts listening immediately." },
  { num: "02", title: "We Are Listening",       desc: "Our dedicated label team tracks your progress —” streams, playlisting traction, social engagement, and sync potential." },
  { num: "03", title: "Stand Out, Get Signed",  desc: "Top performers receive a direct invitation to TuneWave Label Services —” no cold pitching, no gatekeepers required." },
];

export default function GetSignedPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [rosterIdx, setRosterIdx] = useState(0);
  const rosterRef = useRef(null);

  const visibleCards = 3;
  const maxIdx = HALL_OF_FAME.length - visibleCards;

  const scroll = (dir) => setRosterIdx(prev => Math.max(0, Math.min(prev + dir, maxIdx)));

  useEffect(() => {
    if (rosterRef.current) {
      const cardW = rosterRef.current.scrollWidth / HALL_OF_FAME.length;
      rosterRef.current.scrollTo({ left: rosterIdx * cardW, behavior: "smooth" });
    }
  }, [rosterIdx]);

  const inputStyle = {
    width: "100%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)",
    borderRadius: 10, padding: "12px 16px", color: "var(--tw-text-white)", fontSize: "0.9rem", outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box"
  };

  const brandBtn = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)", color: "#040D1A", border: "none",
    borderRadius: 9999, fontWeight: 800, fontSize: "0.9rem",
    letterSpacing: "0.06em", cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 0 30px rgba(0,229,255,0.25)"
  };

  return (
    <div style={{ paddingTop: 0, paddingBottom: 100, background: "var(--tw-bg-dark)" }}>

      {/* HERO */}
      <section style={{ position: "relative", padding: "120px 0 80px", overflow: "hidden", borderBottom: "1px solid var(--tw-line)" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)" }} />
        </div>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="reveal-up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", color: "var(--tw-cyan)", border: "1px solid rgba(0,229,255,0.3)", padding: "5px 14px", borderRadius: 9999, background: "rgba(0,229,255,0.07)" }}>LABEL SERVICES</span>
            </div>
            <h1 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 22, color: "var(--tw-text-white)" }}>
              Get signed where<br />
              <span style={{ color: "var(--tw-cyan)" }}>you started.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--tw-text-dim)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              TuneWave Label Services spots the next wave of independent artists and offers catalog advances, A&R support, global radio pitching, and sync representation —” all without surrendering your masters.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => onNavigate && onNavigate("/signup")} style={{ ...brandBtn, padding: "14px 28px" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 45px rgba(0,229,255,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.25)"; }}
              >START DISTRIBUTING <ArrowRight size={16} /></button>
              <button onClick={() => document.getElementById("gs-how-it-works")?.scrollIntoView({ behavior: "smooth" })} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "var(--tw-text-white)", border: "1px solid var(--tw-line-bright)", padding: "14px 28px", borderRadius: 9999, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#00E5FF"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--tw-line-bright)"}
              >How It Works</button>
            </div>
          </div>
          <div className="reveal-up" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {HALL_OF_FAME.slice(0, 4).map((artist, i) => (
              <div key={i} style={{ background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)", borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", gap: 10, transition: "border-color 0.2s, transform 0.2s", transform: i % 2 === 1 ? "translateY(20px)" : "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.transform = i % 2 === 1 ? "translateY(16px)" : "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line-bright)"; e.currentTarget.style.transform = i % 2 === 1 ? "translateY(20px)" : "none"; }}
              >
                <img src={artist.avatar} alt={artist.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 10 }} />
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--tw-text-white)" }}>{artist.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--tw-cyan)", fontWeight: 700 }}>{artist.stats}</span>
                  <span style={{ fontSize: "0.68rem", color: "var(--tw-text-muted)", background: "var(--tw-bg-surface)", padding: "2px 8px", borderRadius: 9999 }}>{artist.genre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LABEL SERVICES GRID */}
      <section style={{ padding: "100px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", color: "var(--tw-cyan)", marginBottom: 16 }}>01 LABEL SERVICES SUPPORT</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1, maxWidth: 600 }}>
              What is on the table when we <span style={{ color: "var(--tw-cyan)" }}>sign you.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {LABEL_SERVICES.map((s, i) => (
              <div key={i} style={{ background: "var(--tw-bg-card)", border: "1px solid var(--tw-line)", borderRadius: 16, padding: "28px", transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}><s.icon size={20} /></div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--tw-text-white)", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--tw-text-dim)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="dark-inverted-section" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #080B11 0%, #0c1829 50%, #080B11 100%)", padding: "80px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.06) 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: "var(--tw-text-white)", marginBottom: 16, lineHeight: 1.1 }}>
            Independent. <span style={{ color: "var(--tw-cyan)" }}>Never alone.</span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.88)", marginBottom: 36, maxWidth: 540, margin: "0 auto 36px" }}>
            TuneWave gives you full creative freedom while a world-class label team works behind the scenes to amplify your reach.
          </p>
          <button onClick={() => onNavigate && onNavigate("/signup")} style={{ ...brandBtn, padding: "16px 36px", boxShadow: "0 0 40px rgba(0,229,255,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(0,229,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.3)"; }}
          >SIGN UP FOR FREE <ArrowRight size={16} /></button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="gs-how-it-works" style={{ padding: "100px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", color: "var(--tw-cyan)", marginBottom: 16 }}>02 HOW IT WORKS</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1 }}>
              Three steps. <span style={{ color: "var(--tw-cyan)" }}>Invite only.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ background: "var(--tw-bg-card)", border: "1px solid var(--tw-line)", borderRadius: 20, padding: "36px 28px", position: "relative", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "rgba(0,229,255,0.06)", position: "absolute", top: 16, right: 20, lineHeight: 1, fontFamily: "var(--tw-font-heading)" }}>{step.num}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--tw-cyan)", letterSpacing: "0.1em", marginBottom: 16 }}>{step.num}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--tw-text-dim)", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROSTER */}
      <section style={{ padding: "100px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", color: "var(--tw-cyan)", marginBottom: 16 }}>03 ROSTER</div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1 }}>Every genre. <span style={{ color: "#38BDF8" }}>Every stage.</span></h2>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ dir: -1, disabled: rosterIdx === 0, Icon: ChevronLeft }, { dir: 1, disabled: rosterIdx >= maxIdx, Icon: ChevronRight }].map(({ dir, disabled, Icon }, bi) => (
                <button key={bi} onClick={() => scroll(dir)} disabled={disabled} style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line-bright)", color: disabled ? "var(--tw-text-muted)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => { if (!disabled) e.currentTarget.style.borderColor = "#00E5FF"; }}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--tw-line-bright)"}
                ><Icon size={18} /></button>
              ))}
            </div>
          </div>
          <div ref={rosterRef} style={{ display: "flex", gap: 20, overflow: "hidden" }}>
            {HALL_OF_FAME.map((artist, i) => (
              <div key={i} style={{ flexShrink: 0, width: "calc((100% - 40px) / 3)", background: "var(--tw-bg-card)", border: "1px solid var(--tw-line)", borderRadius: 20, overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <img src={artist.avatar} alt={artist.name} style={{ width: "100%", height: 220, objectFit: "cover" }} />
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 6 }}>{artist.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--tw-text-dim)" }}>{artist.genre}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--tw-cyan)" }}>{artist.stats}</span>
                  </div>
                  <div style={{ marginTop: 10, fontSize: "0.72rem", color: "var(--tw-text-muted)", background: "var(--tw-bg-surface)", padding: "4px 10px", borderRadius: 9999, display: "inline-block" }}>{artist.accolade}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANCES */}
      <section style={{ padding: "100px 0", borderBottom: "1px solid var(--tw-line)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", color: "var(--tw-cyan)", marginBottom: 16 }}>04 ADVANCES</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.15, marginBottom: 20 }}>
                Keep your masters.<br /><span style={{ color: "var(--tw-cyan)" }}>Access real funding.</span>
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--tw-text-dim)", lineHeight: 1.7, marginBottom: 36 }}>
                Non-recoupable catalog advances based on your projected streaming income —” you never sign away ownership, publishing, or creative control.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Zero personal liability", "100% master ownership retained", "No multi-album lock-ins", "Transparent royalty reporting"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,229,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle size={13} color="#00E5FF" />
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "var(--tw-text-dim)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { value: "5", label: "Continents", sub: "Global reach" },
                { value: "15+", label: "Countries", sub: "Active markets" },
                { value: "$500K", label: "Max Advance", sub: "Per catalog" },
                { value: "100%", label: "Master Rights", sub: "Always yours" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "var(--tw-bg-card)", border: "1px solid var(--tw-line)", borderRadius: 16, padding: "28px 20px", textAlign: "center", transition: "border-color 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00E5FF"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--tw-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--tw-cyan)", fontFamily: "var(--tw-font-heading)", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--tw-text-white)", marginTop: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--tw-text-muted)", marginTop: 4 }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: "var(--tw-text-white)", lineHeight: 1.1, marginBottom: 20 }}>
                Start with one release.<br />
                <span style={{ color: "var(--tw-cyan)" }}>Let the music do the talking.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--tw-text-dim)", maxWidth: 540, margin: "0 auto" }}>
                Submit your music to our A&R team. We listen to every submission and reach out directly when your project fits an active campaign.
              </p>
            </div>
            <div style={{ background: "var(--tw-bg-surface)", border: "1px solid var(--tw-line-bright)", borderRadius: 24, padding: "48px 44px", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 4 }}>Submit Your Music to TuneWave A&amp;R</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--tw-text-dim)", marginBottom: 12 }}>Our A&amp;R team reviews every submission. If your project fits, a manager will reach out within 5-7 business days.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                      { label: "Artist / Band Name", type: "text", ph: "e.g. Nova Luna" },
                      { label: "Contact Email", type: "email", ph: "mgmt@artist.com" },
                      { label: "Spotify Profile URL", type: "url", ph: "https://open.spotify.com/artist/..." },
                      { label: "Demo / Unreleased Link", type: "url", ph: "https://soundcloud.com/private-link" },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--tw-text-dim)", marginBottom: 6, letterSpacing: "0.04em" }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.ph} style={inputStyle}
                          onFocus={e => e.currentTarget.style.borderColor = "#00E5FF"}
                          onBlur={e => e.currentTarget.style.borderColor = "var(--tw-line-bright)"}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--tw-text-dim)", marginBottom: 6, letterSpacing: "0.04em" }}>Recent Milestones &amp; Upcoming Releases</label>
                    <textarea rows={4} placeholder="Monthly listeners, streaming milestones, touring dates, release windows..." style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => e.currentTarget.style.borderColor = "#00E5FF"}
                      onBlur={e => e.currentTarget.style.borderColor = "var(--tw-line-bright)"}
                    />
                  </div>
                  <button type="submit" style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)", color: "#040D1A", border: "none", borderRadius: 9999, fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.06em", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8, transition: "box-shadow 0.2s, transform 0.2s", boxShadow: "0 0 30px rgba(0,229,255,0.25)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,229,255,0.45)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.25)"; }}
                  >
                    <Send size={17} /> SUBMIT TO A&amp;R EVALUATION
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: "2px solid rgba(0,229,255,0.3)" }}>
                    <CheckCircle size={36} color="#00E5FF" />
                  </div>
                  <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--tw-text-white)", marginBottom: 12 }}>Application Received</h2>
                  <p style={{ color: "var(--tw-text-dim)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.6 }}>
                    Our A&amp;R team reviews submissions continuously. If your project fits, we will reach out within 5-7 business days.
                  </p>
                  <button onClick={() => setSubmitted(false)} style={{ background: "transparent", color: "var(--tw-cyan)", border: "1px solid rgba(0,229,255,0.4)", padding: "12px 28px", borderRadius: 9999, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,229,255,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >Submit Another Project</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
