import React, { useState, useEffect, useRef } from 'react';
import { 
  Clapperboard, Tv, Film, Play, Sparkles, ArrowRight, CheckCircle2, 
  ChevronDown, ExternalLink, ShieldCheck, DollarSign, Radio, Music, 
  Award, Globe2, Layers, Headphones 
} from 'lucide-react';

export default function SyncPage({ onNavigate, theme }) {
  const isLight = theme === 'light';
  const [openFaq, setOpenFaq] = useState(0);
  const [activePlacement, setActivePlacement] = useState(0);

  // 3D Mouse Parallax State for Hero Section
  const heroRef = useRef(null);
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setHeroMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMousePos({ x: 0, y: 0 });
  };

  const heroBg3DTransform = `scale(1.08) translate3d(${heroMousePos.x * -24}px, ${heroMousePos.y * -16}px, 0)`;
  const heroBriefCard3DTransform = `perspective(1200px) rotateX(${heroMousePos.y * -4}deg) rotateY(${heroMousePos.x * 5}deg) translate3d(${heroMousePos.x * 12}px, ${heroMousePos.y * 8}px, 20px)`;
  const heroContent3DTransform = `translate3d(${heroMousePos.x * 8}px, ${heroMousePos.y * 6}px, 12px)`;

  // 3D Mouse Parallax State for Bottom CTA Section
  const ctaRef = useRef(null);
  const [ctaMousePos, setCtaMousePos] = useState({ x: 0, y: 0 });

  const handleCtaMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setCtaMousePos({ x, y });
  };

  const handleCtaMouseLeave = () => {
    setCtaMousePos({ x: 0, y: 0 });
  };

  const ctaCard3DTransform = `perspective(1200px) rotateX(${ctaMousePos.y * -3.5}deg) rotateY(${ctaMousePos.x * 4.5}deg) scale(1.01)`;
  const ctaBg3DTransform = `scale(1.08) translate3d(${ctaMousePos.x * -18}px, ${ctaMousePos.y * -14}px, 0)`;
  const ctaContent3DTransform = `translate3d(${ctaMousePos.x * 10}px, ${ctaMousePos.y * 6}px, 20px)`;

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-stagger');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const SYNC_FAQS = [
    {
      q: "What is sync licensing?",
      a: "Sync (synchronization) licensing refers to granting permission to synchronize your musical composition and sound recording with moving visual media, such as movies, TV series, video games, commercials, documentaries, and trailers. When a brand or production studio uses your track, they pay you an upfront sync fee, plus ongoing broadcast performance royalties."
    },
    {
      q: "Do I keep 100% of my sync licensing fee?",
      a: "Yes! Unlike traditional sync agencies that take 20% to 50% cuts of your upfront sync fees, Tunewave Pro allows artists to keep 100% of their upfront sync licensing fee on every placement negotiated through our direct sync briefs. You maintain full ownership and control of your master and publishing rights."
    },
    {
      q: "What kind of music gets chosen for sync licensing?",
      a: "Music supervisors search for songs across every imaginable genre — from hard-hitting trap and hip-hop to cinematic indie-folk, atmospheric synth-pop, lo-fi beats, and heavy rock. The most important criteria are emotional resonance, high-quality production, clear vocal delivery, and the availability of instrumental/stems."
    },
    {
      q: "What's the difference between master rights and publishing rights in sync?",
      a: "Every sync placement requires clearance for two distinct rights: the Master Right (the actual audio sound recording) and the Publishing Right (the underlying lyrics and composition). Tunewave makes your music 'one-stop' or easy to clear by representing both or having your clearance metadata pre-verified, which music supervisors love because it removes legal friction."
    },
    {
      q: "Do I need instrumental and clean versions of my tracks?",
      a: "Having instrumental versions, clean (explicit-free) edits, and vocal stems significantly boosts your chances of securing a sync placement. Editors frequently need instrumental beds to place beneath dialogue, or clean edits for daytime television and global PG-13 commercials."
    }
  ];

  const RECENT_PLACEMENTS = [
    {
      tag: "Peacock / Netflix",
      title: "Grouptherapy. × Bel-Air",
      desc: "Grouptherapy. — high-energy placement on the hit Bel-Air drama series.",
      brand: "Bel-Air",
      color: "#A78BFA",
      bgImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=mYZN3gqgG84"
    },
    {
      tag: "Global Campaign",
      title: "Rak Su × Hugo Boss",
      desc: "Rak Su — international sync placement on Hugo Boss digital and TV campaign.",
      brand: "Hugo Boss",
      color: "var(--tw-cyan)",
      bgImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=BmNx2gxpsAM"
    },
    {
      tag: "Commercial Film",
      title: "The Boze × Royal Enfield",
      desc: "The Boze — featured soundtrack on The Art Of Motorcycling Season 3.",
      brand: "Royal Enfield",
      color: "#38BDF8",
      bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=jIAp5MleHS8"
    },
    {
      tag: "Fitness & Lifestyle",
      title: "Trillary Banks × Gymshark",
      desc: "Trillary Banks — high-impact placement in a global Gymshark sportswear launch.",
      brand: "Gymshark",
      color: "#F43F5E",
      bgImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://vimeo.com/79988821"
    }
  ];

  const BRANDS_ROW1 = [
    { name: "Netflix", tag: "Streaming", color: "#E50914" },
    { name: "HBO Max", tag: "Original Series", color: "#A78BFA" },
    { name: "Amazon Prime", tag: "Global Studios", color: "#00A8E1" },
    { name: "BBC", tag: "Broadcast TV", color: "#F97316" },
    { name: "EA Sports", tag: "Video Games", color: "#22C55E" },
    { name: "Gymshark", tag: "Commercials", color: "#F43F5E" }
  ];

  const BRANDS_ROW2 = [
    { name: "Hugo Boss", tag: "Fashion Campaign", color: "var(--tw-cyan)" },
    { name: "ITV", tag: "UK Network", color: "#38BDF8" },
    { name: "ABC", tag: "Primetime", color: "#EAB308" },
    { name: "Canon", tag: "Brand Media", color: "#EF4444" },
    { name: "Bravo", tag: "Entertainment", color: "#8B5CF6" },
    { name: "Hulu", tag: "Originals", color: "#10B981" }
  ];

  const TIMELINE_STEPS = [
    {
      num: "01",
      title: "Join Tunewave Pro",
      desc: "Sign up to Tunewave Pro to unlock our exclusive Sync Dashboard, plus publishing administration, YouTube Content ID, and advanced pitching tools.",
      badge: "STEP 1: ACCESS"
    },
    {
      num: "02",
      title: "Browse our syncs",
      desc: "Browse our live active opportunities and find a sync brief that suits your music. Pitch for TV series, feature films, high-budget ads, console games and beyond.",
      badge: "STEP 2: CURATED BRIEFS"
    },
    {
      num: "03",
      title: "Pitch your music",
      desc: "Submit the right tracks for the right briefs. Our experienced sync team reviews every single submission and directly pitches the music that fits the supervisor's vision.",
      badge: "STEP 3: SUPERVISOR PITCH"
    }
  ];

  return (
    <div className="sync-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* Dynamic Theme Styles & Animation Engine for Sync Page */}
      <style>{`
        /* ── Hero 3D Parallax & Overlays ── */
        .sync-hero-section {
          position: relative;
          padding: 50px 0 95px;
          overflow: hidden;
          perspective: 1200px;
        }

        .sync-hero-3d-bg {
          position: absolute;
          inset: -30px -40px -30px -40px;
          background-image: url('/login_background_image/Sync%20background%20image.png');
          background-size: cover;
          background-position: center 40%;
          background-repeat: no-repeat;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          will-change: transform;
          filter: brightness(0.9) contrast(1.1);
        }

        [data-theme="light"] .sync-hero-3d-bg {
          filter: brightness(1.03) contrast(1.02) !important;
        }

        .sync-hero-overlay-h {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(8,11,17,0.94) 0%, rgba(8,11,17,0.85) 45%, rgba(8,11,17,0.65) 75%, rgba(8,11,17,0.88) 100%);
        }
        .sync-hero-overlay-v {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(8,11,17,0.5) 0%, transparent 20%, transparent 80%, rgba(8,11,17,0.98) 100%);
        }

        [data-theme="light"] .sync-hero-overlay-h {
          background: linear-gradient(90deg, rgba(248,250,252,0.94) 0%, rgba(248,250,252,0.82) 48%, rgba(248,250,252,0.42) 75%, rgba(248,250,252,0.85) 100%) !important;
        }
        [data-theme="light"] .sync-hero-overlay-v {
          background: linear-gradient(180deg, rgba(248,250,252,0.3) 0%, transparent 20%, transparent 80%, rgba(248,250,252,0.98) 100%) !important;
        }

        .sync-hero-title {
          color: #FFFFFF !important;
        }
        .sync-hero-desc {
          color: #94A3B8 !important;
        }
        [data-theme="light"] .sync-hero-title {
          color: #0F172A !important;
        }
        [data-theme="light"] .sync-hero-desc {
          color: #1E293B !important;
          font-weight: 500 !important;
        }

        .sync-hero-badge {
          color: #C4B5FD;
          background: rgba(167, 139, 250, 0.15);
          border: 1px solid rgba(167, 139, 250, 0.35);
        }
        [data-theme="light"] .sync-hero-badge {
          color: #7C3AED;
          background: rgba(124, 58, 237, 0.08);
          border: 1px solid rgba(124, 58, 237, 0.25);
        }

        .sync-hero-gradient-text {
          background: linear-gradient(135deg, var(--tw-lime) 0%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        [data-theme="light"] .sync-hero-gradient-text {
          background: linear-gradient(135deg, #007EA7 0%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sync-hero-card {
          border-radius: 24px;
          padding: 36px 32px;
          border: 1px solid rgba(167, 139, 250, 0.25);
          background: radial-gradient(circle at top right, rgba(167, 139, 250, 0.12), rgba(9, 13, 21, 0.96));
          backdrop-filter: blur(16px);
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.8);
        }
        [data-theme="light"] .sync-hero-card {
          border: 1px solid rgba(124, 58, 237, 0.18) !important;
          background: rgba(255, 255, 255, 0.94) !important;
          box-shadow: 0 24px 60px -15px rgba(124, 58, 237, 0.12), 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
        }

        .sync-hero-card-title {
          color: #FFFFFF !important;
        }
        [data-theme="light"] .sync-hero-card-title {
          color: #0F172A !important;
        }

        /* ── Audio Equalizer & Live Ping Micro-Animations ── */
        @keyframes syncLivePing {
          0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(163, 230, 53, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(163, 230, 53, 0); }
          100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(163, 230, 53, 0); }
        }
        @keyframes syncLivePingLight {
          0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(5, 150, 105, 0); }
          100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
        }

        .sync-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--tw-lime);
          display: inline-block;
          animation: syncLivePing 2s infinite;
        }
        [data-theme="light"] .sync-live-dot {
          background: #059669 !important;
          animation: syncLivePingLight 2s infinite;
        }

        @keyframes syncEqBarBounce {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }

        .sync-eq-container {
          display: inline-flex;
          align-items: flex-end;
          gap: 2.5px;
          height: 16px;
          margin-left: 8px;
        }

        .sync-eq-bar {
          width: 3px;
          border-radius: 2px;
          background: var(--tw-lime);
          display: inline-block;
        }
        [data-theme="light"] .sync-eq-bar {
          background: #059669 !important;
        }

        /* Interactive Brief Rows with Hover Elevation */
        .sync-hero-brief-item {
          padding: 18px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 14px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .sync-hero-brief-item:hover {
          transform: translateX(8px);
          background: rgba(167, 139, 250, 0.09) !important;
          border-color: rgba(167, 139, 250, 0.45) !important;
          box-shadow: 0 8px 24px -6px rgba(167, 139, 250, 0.2);
        }
        [data-theme="light"] .sync-hero-brief-item {
          background: rgba(241, 245, 249, 0.75) !important;
          border: 1px solid rgba(0, 0, 0, 0.06) !important;
        }
        [data-theme="light"] .sync-hero-brief-item:hover {
          background: rgba(124, 58, 237, 0.07) !important;
          border-color: rgba(124, 58, 237, 0.35) !important;
          box-shadow: 0 8px 20px -6px rgba(124, 58, 237, 0.15) !important;
        }

        .sync-hero-brief-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #FFFFFF;
        }
        [data-theme="light"] .sync-hero-brief-title {
          color: #0F172A !important;
        }

        .sync-hero-pitch-badge {
          background: rgba(163, 230, 53, 0.15);
          color: var(--tw-lime);
          border: 1px solid rgba(163, 230, 53, 0.3);
        }
        [data-theme="light"] .sync-hero-pitch-badge {
          background: rgba(5, 150, 105, 0.1) !important;
          color: #059669 !important;
          border: 1px solid rgba(5, 150, 105, 0.25) !important;
        }

        .sync-hero-upfront-amount {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--tw-lime);
        }
        [data-theme="light"] .sync-hero-upfront-amount {
          color: #059669 !important;
        }

        .sync-hero-stat-1 {
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--tw-lime);
        }
        [data-theme="light"] .sync-hero-stat-1 {
          color: #007EA7 !important;
        }

        .sync-hero-stat-2 {
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--tw-cyan);
        }
        [data-theme="light"] .sync-hero-stat-2 {
          color: #0284C7 !important;
        }

        .sync-hero-stat-3 {
          font-size: 1.3rem;
          font-weight: 900;
          color: #A78BFA;
        }
        [data-theme="light"] .sync-hero-stat-3 {
          color: #7C3AED !important;
        }

        .sync-hero-btn-about {
          padding: 16px 30px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }
        [data-theme="light"] .sync-hero-btn-about {
          border-color: rgba(0, 0, 0, 0.16) !important;
          color: #0F172A !important;
          background: rgba(255, 255, 255, 0.7) !important;
        }
        .sync-hero-btn-about:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
        }
        [data-theme="light"] .sync-hero-btn-about:hover {
          background: rgba(255, 255, 255, 0.95) !important;
          border-color: rgba(0, 0, 0, 0.3) !important;
        }

        .sync-hero-stats-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        [data-theme="light"] .sync-hero-stats-row {
          border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        .sync-hero-stats-divider {
          height: 30px;
          width: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        [data-theme="light"] .sync-hero-stats-divider {
          background: rgba(0, 0, 0, 0.1) !important;
        }

        /* ── Section 01: How It Works Interactive 3D Step Cards ── */
        .sync-step-card {
          position: relative;
          border-radius: 22px;
          padding: 38px 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }
        .sync-step-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--tw-lime), #A78BFA, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sync-step-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(163, 230, 53, 0.45) !important;
          box-shadow: 0 24px 50px -12px rgba(163, 230, 53, 0.15), 0 0 35px rgba(167, 139, 250, 0.1);
        }
        .sync-step-card:hover::before {
          opacity: 1;
        }
        [data-theme="light"] .sync-step-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
        }
        [data-theme="light"] .sync-step-card:hover {
          border-color: rgba(124, 58, 237, 0.4) !important;
          box-shadow: 0 24px 50px -12px rgba(124, 58, 237, 0.16) !important;
        }

        .sync-step-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--tw-text-white);
          margin-bottom: 12px;
        }
        [data-theme="light"] .sync-step-title {
          color: #0F172A !important;
        }

        /* ── Section 02: Recent Syncs Cinematic Cards ── */
        .sync-placement-card {
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          position: relative;
        }
        .sync-placement-card:hover {
          transform: translateY(-10px) scale(1.02);
        }
        .sync-placement-thumb {
          position: relative;
          height: 210px;
          overflow: hidden;
        }
        .sync-placement-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sync-placement-card:hover .sync-placement-img {
          transform: scale(1.09);
        }
        .sync-play-btn-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease;
          z-index: 2;
        }
        .sync-placement-card:hover .sync-play-btn-overlay {
          transform: translate(-50%, -50%) scale(1.15);
          background: rgba(124, 58, 237, 0.85);
          box-shadow: 0 0 25px rgba(167, 139, 250, 0.7);
        }
        [data-theme="light"] .sync-placement-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
        }

        .sync-placement-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--tw-text-white);
          margin: 6px 0 10px;
        }
        [data-theme="light"] .sync-placement-title {
          color: #0F172A !important;
        }

        /* ── Section 03: Brands Infinite Marquee Stream ── */
        @keyframes syncMarqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes syncMarqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .sync-marquee-wrap {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 8px 0;
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }

        .sync-marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
        }

        .sync-marquee-track-left {
          animation: syncMarqueeLeft 30s linear infinite;
        }
        .sync-marquee-track-right {
          animation: syncMarqueeRight 30s linear infinite;
        }

        .sync-marquee-wrap:hover .sync-marquee-track {
          animation-play-state: paused;
        }

        .sync-brand-pill {
          padding: 22px 36px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
          cursor: pointer;
        }
        .sync-brand-pill:hover {
          transform: translateY(-4px) scale(1.05);
          border-color: rgba(167, 139, 250, 0.5) !important;
          background: rgba(167, 139, 250, 0.1) !important;
          box-shadow: 0 12px 28px -6px rgba(167, 139, 250, 0.3) !important;
        }
        [data-theme="light"] .sync-brand-pill {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04) !important;
        }
        [data-theme="light"] .sync-brand-pill:hover {
          border-color: rgba(124, 58, 237, 0.4) !important;
          background: rgba(124, 58, 237, 0.06) !important;
          box-shadow: 0 12px 28px -6px rgba(124, 58, 237, 0.18) !important;
        }

        .sync-brand-name {
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--tw-text-white);
          letter-spacing: -0.02em;
        }
        [data-theme="light"] .sync-brand-name {
          color: #0F172A !important;
        }

        /* ── 3D Bottom CTA Section ── */
        .sync-cta-card-wrap {
          position: relative;
          overflow: hidden;
          perspective: 1200px;
          border-radius: 28px;
          padding: clamp(48px, 6vw, 76px) clamp(24px, 5vw, 60px);
          border: 1px solid rgba(167, 139, 250, 0.35);
          text-align: center;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 35px rgba(167, 139, 250, 0.15);
          transform-style: preserve-3d;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .sync-cta-3d-bg {
          position: absolute;
          inset: -35px -45px -35px -45px;
          background-image: url('/login_background_image/Sync%20background%20image.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.88) contrast(1.1);
          will-change: transform;
          z-index: 0;
        }

        .sync-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(9, 13, 21, 0.78) 0%, rgba(9, 13, 21, 0.45) 50%, rgba(9, 13, 21, 0.88) 100%),
                      radial-gradient(circle at center, rgba(124, 58, 237, 0.18) 0%, rgba(9, 13, 21, 0.6) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .sync-cta-content {
          position: relative;
          z-index: 3;
          transform-style: preserve-3d;
        }

        [data-theme="light"] .sync-cta-card-wrap {
          border: 1px solid rgba(124, 58, 237, 0.25) !important;
          box-shadow: 0 30px 70px -15px rgba(124, 58, 237, 0.18), 0 10px 30px rgba(0,0,0,0.05) !important;
        }

        [data-theme="light"] .sync-cta-3d-bg {
          filter: brightness(1.04) contrast(1.02) !important;
        }

        [data-theme="light"] .sync-cta-overlay {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(255, 255, 255, 0.94) 100%),
                      radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(248, 250, 252, 0.8) 100%) !important;
        }

        [data-theme="light"] .sync-cta-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .sync-cta-sub {
          color: #1E293B !important;
          font-weight: 500 !important;
        }

        @keyframes syncFloatLevitate {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(6deg);
          }
        }

        .sync-floating-note-1 {
          animation: syncFloatLevitate 4.8s ease-in-out infinite;
        }

        .sync-floating-note-2 {
          animation: syncFloatLevitate 5.4s ease-in-out infinite 0.9s;
        }
      `}</style>

      {/* 1. HERO SECTION WITH 3D MOUSE PARALLAX & GLOW */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="sync-hero-section"
      >
        {/* 3D Background Image Canvas with Parallax */}
        <div 
          className="sync-hero-3d-bg"
          style={{
            transform: heroBg3DTransform,
            transition: heroMousePos.x === 0 && heroMousePos.y === 0 
              ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
              : 'transform 0.12s ease-out'
          }}
        />

        {/* Ambient Gradient Overlays for Readability & High Contrast across Dark and Light Themes */}
        <div className="sync-hero-overlay-h" />
        <div className="sync-hero-overlay-v" />

        {/* Dynamic Interactive Mouse Spotlight Glare */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `radial-gradient(circle 600px at ${(heroMousePos.x + 1) * 50}% ${(heroMousePos.y + 1) * 50}%, ${isLight ? 'rgba(124, 58, 237, 0.09)' : 'rgba(167, 139, 250, 0.16)'}, transparent 70%)`,
            mixBlendMode: isLight ? 'multiply' : 'screen'
          }}
        />

        {/* Floating 3D Cinematic & Music Badges with Parallax */}
        <div 
          className="sync-floating-note-1"
          style={{
            position: 'absolute',
            top: 32,
            right: '9%',
            transform: `translate3d(${heroMousePos.x * -30}px, ${heroMousePos.y * -22}px, 60px)`,
            color: '#A78BFA',
            opacity: isLight ? 0.75 : 0.85,
            filter: 'drop-shadow(0 0 16px rgba(167, 139, 250, 0.6))',
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          <Clapperboard size={36} />
        </div>

        <div 
          className="sync-floating-note-2"
          style={{
            position: 'absolute',
            bottom: 45,
            left: '5%',
            transform: `translate3d(${heroMousePos.x * 26}px, ${heroMousePos.y * 20}px, 45px)`,
            color: isLight ? '#7C3AED' : 'var(--tw-lime)',
            opacity: isLight ? 0.7 : 0.85,
            filter: 'drop-shadow(0 0 14px rgba(163, 230, 53, 0.5))',
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          <Headphones size={32} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 4vw, 54px)', alignItems: 'center' }}>
            <div 
              style={{
                opacity: 1,
                transform: heroContent3DTransform,
                transition: heroMousePos.x === 0 && heroMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge sync-hero-badge">
                  <Clapperboard size={13} style={{ marginRight: 4 }} />
                  PART OF Tunewave PRO
                </span>
              </div>

              <h1 className="sync-hero-title" style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: isLight ? '#0F172A' : '#FFFFFF'
              }}>
                Sync <br />
                <span className="sync-hero-gradient-text">
                  Licensing.
                </span>
              </h1>

              <p className="sync-hero-desc" style={{
                fontSize: '1.2rem',
                color: isLight ? '#1E293B' : 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                Pitch your music for the latest sync briefs across movies, TV shows, video games, ads and more with Tunewave Sync. Keep 100% of your sync fee.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                    color: '#FFFFFF',
                    WebkitTextFillColor: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 12px 30px -8px rgba(124, 58, 237, 0.45)',
                    cursor: 'pointer'
                  }}
                >
                  <span>Sign Up to Pro</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
                <button 
                  onClick={() => onNavigate('/pricing')}
                  className="sync-hero-btn-about"
                >
                  About Tunewave Pro →
                </button>
              </div>

              <div className="sync-hero-stats-row">
                <div>
                  <div className="sync-hero-stat-1">100%</div>
                  <div style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--tw-text-muted)', fontWeight: 600 }}>Sync Fee Retained</div>
                </div>
                <div className="sync-hero-stats-divider" />
                <div>
                  <div className="sync-hero-stat-2">500+</div>
                  <div style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--tw-text-muted)', fontWeight: 600 }}>Annual Placements</div>
                </div>
                <div className="sync-hero-stats-divider" />
                <div>
                  <div className="sync-hero-stat-3">0%</div>
                  <div style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--tw-text-muted)', fontWeight: 600 }}>Exclusivity Lock</div>
                </div>
              </div>
            </div>

            {/* Hero Sync Monitor Card with 3D Tilt */}
            <div 
              style={{
                opacity: 1,
                transform: heroBriefCard3DTransform,
                transition: heroMousePos.x === 0 && heroMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            >
              <div className="glass-panel card-shimmer-sweep sync-hero-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: isLight ? '#7C3AED' : 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                      ACTIVE SYNC BRIEF FEED
                    </div>
                    <div className="sync-hero-card-title" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                      Tunewave Sync Portal
                    </div>
                  </div>
                  <span className="pill-badge sync-hero-pitch-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span className="sync-live-dot" />
                    OPEN FOR PITCHING
                  </span>
                </div>

                {/* Brief 1 */}
                <div className="sync-hero-brief-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#EF4444' }}>NETFLIX DRAMA SERIES</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="sync-hero-upfront-amount">$12,500 UPFRONT</span>
                      <div className="sync-eq-container">
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 1.1s ease-in-out infinite 0.1s' }} />
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 0.9s ease-in-out infinite 0.3s' }} />
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 1.3s ease-in-out infinite 0.5s' }} />
                      </div>
                    </div>
                  </div>
                  <div className="sync-hero-brief-title">Upbeat Indie-Pop / Neo-Soul Anthem</div>
                  <div style={{ fontSize: '0.8rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)', marginTop: 4 }}>End credits placement. High priority, instrumentals required.</div>
                </div>

                {/* Brief 2 */}
                <div className="sync-hero-brief-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--tw-cyan)' }}>EA SPORTS CONSOLE GAME</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="sync-hero-upfront-amount">$8,000 UPFRONT</span>
                      <div className="sync-eq-container">
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 1.2s ease-in-out infinite 0.2s' }} />
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 0.8s ease-in-out infinite 0.4s' }} />
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 1.4s ease-in-out infinite 0.1s' }} />
                      </div>
                    </div>
                  </div>
                  <div className="sync-hero-brief-title">Driving UK Drill / Bass-Heavy Trap</div>
                  <div style={{ fontSize: '0.8rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)', marginTop: 4 }}>In-game menu & gameplay soundtrack. Global broadcast rights.</div>
                </div>

                {/* Brief 3 */}
                <div className="sync-hero-brief-item" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#A78BFA' }}>GLOBAL AUTOMOTIVE AD</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="sync-hero-upfront-amount">$20,000 UPFRONT</span>
                      <div className="sync-eq-container">
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 1.0s ease-in-out infinite 0.3s' }} />
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 1.3s ease-in-out infinite 0.1s' }} />
                        <span className="sync-eq-bar" style={{ animation: 'syncEqBarBounce 0.9s ease-in-out infinite 0.5s' }} />
                      </div>
                    </div>
                  </div>
                  <div className="sync-hero-brief-title">Cinematic Ambient / Electronic Build</div>
                  <div style={{ fontSize: '0.8rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)', marginTop: 4 }}>Worldwide TV, cinema & social web license. 12 months usage.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 01 · HOW IT WORKS WITH INTERACTIVE 3D STEP CARDS */}
      <section style={{ padding: '90px 0', borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up is-in-view" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: isLight ? '#059669' : 'var(--tw-lime)', borderColor: isLight ? '#059669' : 'var(--tw-lime)' }}>
                01 · HOW IT WORKS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: isLight ? '#0F172A' : 'var(--tw-text-white)'
            }}>
              We help artists land <br />
              <span style={{ color: isLight ? '#007EA7' : 'var(--tw-lime)' }}>big features.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: isLight ? '#475569' : 'var(--tw-text-dim)', lineHeight: 1.6 }}>
              Our client's latest sync briefs are posted directly to the Tunewave Sync Dashboard. Sign up for Pro to get access and pitch your music. You never know where it could take you.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28
          }}>
            {TIMELINE_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="sync-step-card card-shimmer-sweep"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <span style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      color: isLight ? '#007EA7' : 'var(--tw-lime)',
                      fontFamily: 'monospace',
                      textShadow: isLight ? 'none' : '0 0 20px rgba(163, 230, 53, 0.4)'
                    }}>
                      {step.num}
                    </span>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      padding: '5px 10px',
                      borderRadius: 6,
                      background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
                      color: isLight ? '#475569' : 'var(--tw-text-dim)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span className="sync-live-dot" style={{ width: 5, height: 5 }} />
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="sync-step-title">
                    {step.title}
                  </h3>

                  <p style={{ color: isLight ? '#475569' : 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>

                <div style={{ marginTop: 28, paddingTop: 18, borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)' }}>
                  <span 
                    onClick={() => onNavigate('/signup')}
                    style={{ 
                      cursor: 'pointer', 
                      color: isLight ? '#007EA7' : 'var(--tw-lime)', 
                      fontWeight: 700, 
                      fontSize: '0.92rem', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: 6,
                      transition: 'gap 0.2s ease'
                    }}
                  >
                    Start pitching →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION 02 · RECENT SYNCS SHOWCASE WITH CINEMATIC HOVER */}
      <section style={{ padding: '90px 0', borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div className="reveal-up is-in-view" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 20 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: isLight ? '#7C3AED' : '#A78BFA', borderColor: isLight ? '#7C3AED' : '#A78BFA' }}>
                  02 · LATEST PLACEMENTS
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 800, color: isLight ? '#0F172A' : 'var(--tw-text-white)' }}>
                Recent <span style={{ color: isLight ? '#7C3AED' : '#A78BFA' }}>Tunewave syncs.</span>
              </h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: isLight ? '#475569' : 'var(--tw-text-dim)', maxWidth: '420px', lineHeight: 1.6 }}>
              A snapshot of the sync placements we've secured for our artists across global streaming and broadcast media.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 26
          }}>
            {RECENT_PLACEMENTS.map((item, idx) => (
              <div 
                key={idx}
                className="sync-placement-card card-shimmer-sweep"
                style={{
                  border: isLight ? '1px solid rgba(0,0,0,0.08)' : `1px solid rgba(255,255,255,0.08)`,
                }}
              >
                {/* Thumbnail with Cinematic Play Button and Zoom on Hover */}
                <div className="sync-placement-thumb">
                  <img src={item.bgImage} alt={item.title} className="sync-placement-img" />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(9,13,21,0.92) 0%, rgba(9,13,21,0.2) 60%)'
                  }} />
                  
                  {/* Floating Play Button Overlay */}
                  <div className="sync-play-btn-overlay">
                    <Play size={20} fill="#FFFFFF" style={{ marginLeft: 2 }} />
                  </div>

                  <span style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '5px 12px',
                    borderRadius: 8,
                    background: 'rgba(0,0,0,0.75)',
                    color: item.color,
                    border: `1px solid ${item.color}50`,
                    backdropFilter: 'blur(6px)',
                    zIndex: 2
                  }}>
                    {item.brand}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#7C3AED' : 'var(--tw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                      {item.tag}
                    </span>
                    <h3 className="sync-placement-title">
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: isLight ? '#475569' : 'var(--tw-text-dim)', lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: 22, paddingTop: 16, borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <a 
                      href={item.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: item.color,
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'gap 0.2s ease'
                      }}
                    >
                      <span>Watch the placement</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION 03 · BRANDS WHERE OUR ARTISTS GET PLACED (INFINITE MARQUEE STREAM) */}
      <section style={{ padding: '90px 0', borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255, 255, 255, 0.06)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: 36 }}>
          <div className="reveal-up is-in-view" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isLight ? '#7C3AED' : 'var(--tw-text-dim)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              BRANDS WE'VE WORKED WITH
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: isLight ? '#0F172A' : 'var(--tw-text-white)', marginTop: 8 }}>
              Where our artists <span style={{ color: isLight ? '#007EA7' : 'var(--tw-lime)' }}>get placed.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: isLight ? '#64748B' : 'var(--tw-text-dim)', marginTop: 10 }}>
              Hover over any studio or network to inspect active licensing partnerships.
            </p>
          </div>
        </div>

        {/* Dual-Row Continuous Infinite Marquee Ribbon */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Row 1: Leftward Infinite Stream */}
          <div className="sync-marquee-wrap">
            <div className="sync-marquee-track sync-marquee-track-left">
              {[...BRANDS_ROW1, ...BRANDS_ROW1, ...BRANDS_ROW1, ...BRANDS_ROW1].map((brand, idx) => (
                <div key={idx} className="sync-brand-pill">
                  <span style={{ 
                    width: 10, 
                    height: 10, 
                    borderRadius: '50%', 
                    background: brand.color,
                    boxShadow: `0 0 10px ${brand.color}` 
                  }} />
                  <div>
                    <div className="sync-brand-name">{brand.name}</div>
                    <div style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                      {brand.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Infinite Stream */}
          <div className="sync-marquee-wrap">
            <div className="sync-marquee-track sync-marquee-track-right">
              {[...BRANDS_ROW2, ...BRANDS_ROW2, ...BRANDS_ROW2, ...BRANDS_ROW2].map((brand, idx) => (
                <div key={idx} className="sync-brand-pill">
                  <span style={{ 
                    width: 10, 
                    height: 10, 
                    borderRadius: '50%', 
                    background: brand.color,
                    boxShadow: `0 0 10px ${brand.color}` 
                  }} />
                  <div>
                    <div className="sync-brand-name">{brand.name}</div>
                    <div style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                      {brand.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SYNC FAQS ACCORDION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#A78BFA', borderColor: '#A78BFA' }}>
                SYNC ESSENTIALS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              Sync Licensing <span style={{ color: '#A78BFA' }}>FAQs</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem' }}>
              Everything you need to know about pitching, briefs, contracts, and keeping 100% of your sync fees.
            </p>
          </div>

          <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SYNC_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{
                    borderRadius: 16,
                    border: isOpen ? '1px solid rgba(167, 139, 250, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isOpen ? 'rgba(167, 139, 250, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '22px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: "var(--tw-text-white)",
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? '#A78BFA' : '#64748B',
                        flexShrink: 0,
                        marginLeft: 16
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 22px',
                      color: 'var(--tw-text-dim)',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingTop: 16
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA STRIP WITH 3D BACKGROUND PARALLAX */}
      <section style={{ padding: '60px 0 20px', overflow: 'hidden' }}>
        <div className="container">
          <div 
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="sync-cta-card-wrap card-shimmer-sweep"
            style={{
              transform: ctaCard3DTransform,
              transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 
                ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease' 
                : 'transform 0.12s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* 3D Background Image Canvas with Parallax */}
            <div 
              className="sync-cta-3d-bg" 
              style={{
                transform: ctaBg3DTransform,
                transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            />

            {/* Ambient Lighting & Contrast Gradient Overlay */}
            <div className="sync-cta-overlay" />

            {/* Dynamic Interactive Mouse Spotlight Glare */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
                background: `radial-gradient(circle 500px at ${(ctaMousePos.x + 1) * 50}% ${(ctaMousePos.y + 1) * 50}%, ${isLight ? 'rgba(124, 58, 237, 0.12)' : 'rgba(167, 139, 250, 0.18)'}, transparent 75%)`,
                mixBlendMode: isLight ? 'multiply' : 'screen'
              }}
            />

            {/* Floating 3D Music Notes with Parallax Levitation */}
            <div 
              className="sync-floating-note-1"
              style={{
                position: 'absolute',
                top: 36,
                left: '12%',
                transform: `translate3d(${ctaMousePos.x * 24}px, ${ctaMousePos.y * 18}px, 50px)`,
                color: '#A78BFA',
                opacity: isLight ? 0.75 : 0.85,
                filter: 'drop-shadow(0 0 12px rgba(167, 139, 250, 0.6))',
                pointerEvents: 'none',
                zIndex: 4
              }}
            >
              <Music size={32} />
            </div>

            <div 
              className="sync-floating-note-2"
              style={{
                position: 'absolute',
                bottom: 40,
                right: '14%',
                transform: `translate3d(${ctaMousePos.x * -20}px, ${ctaMousePos.y * -16}px, 45px)`,
                color: isLight ? '#7C3AED' : 'var(--tw-cyan)',
                opacity: isLight ? 0.65 : 0.8,
                filter: 'drop-shadow(0 0 10px rgba(124, 58, 237, 0.5))',
                pointerEvents: 'none',
                zIndex: 4
              }}
            >
              <Sparkles size={28} />
            </div>

            {/* Content Layer in 3D Space */}
            <div 
              className="sync-cta-content"
              style={{
                transform: ctaContent3DTransform,
                transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out'
              }}
            >
              <h2 className="sync-cta-title" style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 18,
                color: isLight ? '#0F172A' : 'var(--tw-text-white)'
              }}>
                Ready to land your first sync placement? <br />
                <span style={{ color: isLight ? '#0284C7' : 'var(--tw-lime)' }}>Get started in 60 seconds.</span>
              </h2>

              <p className="sync-cta-sub" style={{ fontSize: '1.15rem', color: isLight ? '#1E293B' : 'var(--tw-text-dim)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
                Join Tunewave Pro today and pitch your music to world-class music supervisors, directors, and advertising agencies.
              </p>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  padding: '18px 44px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                  color: "#FFFFFF",
                  border: 'none',
                  boxShadow: '0 12px 30px -8px rgba(167, 139, 250, 0.5)',
                  cursor: 'pointer'
                }}
              >
                <span>Sign up to Pro</span>
                <ArrowRight size={20} className="btn-icon-hover" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
