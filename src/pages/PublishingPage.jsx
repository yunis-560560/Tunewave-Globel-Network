import React, { useState, useEffect, useRef } from 'react';
import { 
  DollarSign, Globe2, Sparkles, ShieldCheck, ArrowRight, CheckCircle2, 
  ChevronDown, Play, Radio, Music, Tv, Film, Disc, Layers, HelpCircle, 
  TrendingUp, Star, Video, ExternalLink, Zap, Award
} from 'lucide-react';

export default function PublishingPage({ onNavigate, theme }) {
  const isLight = theme === 'light';
  const [openFaq, setOpenFaq] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Left-to-Right auto highlight sequence for Core Benefits Cards (0 -> 1 -> 2 -> 0)
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const [isHighlightPaused, setIsHighlightPaused] = useState(false);

  useEffect(() => {
    if (isHighlightPaused) return;
    const interval = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHighlightPaused]);

  // 3D Mouse Parallax State for Hero Section
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const bg3DTransform = `perspective(1000px) rotateX(${mousePos.y * -3.5}deg) rotateY(${mousePos.x * 4.5}deg) scale(1.06) translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 0)`;
  const card3DTransform = `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * -5}deg) translate3d(${mousePos.x * 14}px, ${mousePos.y * 10}px, 20px)`;

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

  const ctaBg3DTransform = `perspective(1000px) rotateX(${ctaMousePos.y * -4}deg) rotateY(${ctaMousePos.x * 5}deg) scale(1.08) translate3d(${ctaMousePos.x * -16}px, ${ctaMousePos.y * -12}px, 0)`;
  const ctaContent3DTransform = `perspective(1000px) rotateX(${ctaMousePos.y * 3}deg) rotateY(${ctaMousePos.x * -3}deg) translate3d(${ctaMousePos.x * 8}px, ${ctaMousePos.y * 6}px, 15px)`;

  // 3D Mouse Parallax State for "Not Claiming Publishing" Section
  const unclaimedRef = useRef(null);
  const [unclaimedMousePos, setUnclaimedMousePos] = useState({ x: 0, y: 0 });

  const handleUnclaimedMouseMove = (e) => {
    if (!unclaimedRef.current) return;
    const rect = unclaimedRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setUnclaimedMousePos({ x, y });
  };

  const handleUnclaimedMouseLeave = () => {
    setUnclaimedMousePos({ x: 0, y: 0 });
  };

  const unclaimedCard3DTransform = `perspective(1200px) rotateX(${unclaimedMousePos.y * -3.5}deg) rotateY(${unclaimedMousePos.x * 4.5}deg) scale(1.01)`;
  const unclaimedBg3DTransform = `scale(1.08) translate3d(${unclaimedMousePos.x * -18}px, ${unclaimedMousePos.y * -14}px, 0)`;
  const unclaimedLeft3DTransform = `translate3d(${unclaimedMousePos.x * 12}px, ${unclaimedMousePos.y * 8}px, 20px)`;
  const unclaimedRight3DTransform = `perspective(1000px) rotateX(${unclaimedMousePos.y * 5}deg) rotateY(${unclaimedMousePos.x * -6}deg) translate3d(${unclaimedMousePos.x * 16}px, ${unclaimedMousePos.y * 10}px, 35px)`;

  // Scroll & entrance animation observers
  const royaltiesRef = useRef(null);
  const [royaltiesInView, setRoyaltiesInView] = useState(false);
  const stepsRef = useRef(null);
  const [stepsInView, setStepsInView] = useState(false);
  const faqRef = useRef(null);
  const [faqInView, setFaqInView] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkVisibility = () => {
      const vh = window.innerHeight;

      // Royalties grid
      if (royaltiesRef.current) {
        const rect = royaltiesRef.current.getBoundingClientRect();
        if (rect.top < vh * 0.82 && rect.bottom > 60) {
          setRoyaltiesInView(true);
        } else if (rect.top > vh + 60 || rect.bottom < -60) {
          setRoyaltiesInView(false);
        }
      }

      // Steps timeline
      if (stepsRef.current) {
        const rect = stepsRef.current.getBoundingClientRect();
        if (rect.top < vh * 0.82 && rect.bottom > 60) {
          setStepsInView(true);
        } else if (rect.top > vh + 60 || rect.bottom < -60) {
          setStepsInView(false);
        }
      }

      // FAQs
      if (faqRef.current) {
        const rect = faqRef.current.getBoundingClientRect();
        if (rect.top < vh * 0.85 && rect.bottom > 60) {
          setFaqInView(true);
        } else if (rect.top > vh + 60 || rect.bottom < -60) {
          setFaqInView(false);
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    const obsOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

    const royaltiesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRoyaltiesInView(true);
      else setRoyaltiesInView(false);
    }, obsOptions);

    const stepsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStepsInView(true);
      else setStepsInView(false);
    }, obsOptions);

    const faqObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFaqInView(true);
      else setFaqInView(false);
    }, obsOptions);

    if (royaltiesRef.current) royaltiesObserver.observe(royaltiesRef.current);
    if (stepsRef.current) stepsObserver.observe(stepsRef.current);
    if (faqRef.current) faqObserver.observe(faqRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    checkVisibility();

    return () => {
      royaltiesObserver.disconnect();
      stepsObserver.disconnect();
      faqObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const PUBLISHING_FAQS = [
    {
      q: "What is music publishing?",
      a: "Music publishing is the management and collection of royalties generated from the composition and songwriting of your music (the lyrics, melody, chords and arrangement). While distribution collects royalties for the master sound recording, publishing collects mechanical, performance and sync royalties whenever your songs are streamed, downloaded, performed live, or broadcast on TV, radio, and public venues."
    },
    {
      q: "What's the difference between a PRO and a music publisher?",
      a: "A Performing Rights Organization (PRO like BMI, ASCAP, PRS) only collects performance royalties within their specific territory or reciprocal agreements. A music publisher like Tunewave Publishing collects both performance and mechanical royalties globally from over 60 collection societies worldwide, uncovers uncollected 'black box' royalties, and actively pitches your catalog for sync licensing briefs."
    },
    {
      q: "Do I need an IPI number to register for publishing royalties?",
      a: "An IPI (Interested Party Information) or CAE number is a unique 9 to 11 digit identifier assigned to songwriters and publishers. When you sign up for Tunewave Publishing, if you already have an IPI number from your local society, you can enter it directly. If you don't have one yet, our team will assist you in generating and affiliating your writer credentials."
    },
    {
      q: "What are mechanical royalties?",
      a: "Mechanical royalties are paid to songwriters and publishers whenever a song is reproduced or mechanically copied into physical formats (vinyl, CD) or digital interactive formats (Spotify, Apple Music on-demand streams, iTunes downloads). In most countries, mechanicals are handled separately from performance royalties and require a publisher to collect them."
    },
    {
      q: "What are performance royalties?",
      a: "Performance royalties are generated whenever your composition is performed publicly. This includes live gigs, festival sets, radio broadcasts, TV shows, bars, clubs, digital radio, and even non-interactive webcasts. Tunewave logs your live setlists so you get paid every time you perform your original songs on stage."
    },
    {
      q: "How long does it take to start receiving publishing royalties?",
      a: "Collection societies worldwide operate on different quarterly accounting schedules (often between 6 to 9 months in arrears due to international reciprocal accounting). Once we register your songs across global collection databases, royalties start appearing in your Tunewave dashboard each quarter alongside your regular distribution earnings."
    }
  ];

  const ROYALTIES_DATA = [
    {
      id: "streaming",
      title: "Streaming",
      tag: "MECHANICAL & PERFORMANCE",
      icon: Music,
      color: "var(--tw-cyan)",
      body: "Mechanical streaming royalties generated whenever your music is streamed on Spotify, Apple Music, Tidal, Amazon Music, Deezer and 150+ interactive streaming services."
    },
    {
      id: "download",
      title: "Download",
      tag: "DIGITAL REPRODUCTION",
      icon: Disc,
      color: "#38BDF8",
      body: "Mechanical download royalties generated every time your songs or albums are purchased and downloaded on stores like iTunes, Amazon, Qobuz and Beatport."
    },
    {
      id: "youtube",
      title: "YouTube",
      tag: "CONTENT ID & UGC",
      icon: Video,
      color: "#EF4444",
      body: "Micro-sync and mechanical royalties whenever your music is played in user-generated videos, covers, live streams, shorts and official uploads across the YouTube ecosystem."
    },
    {
      id: "performance",
      title: "Performance",
      tag: "BROADCAST & VENUES",
      icon: Radio,
      color: "#8B5CF6",
      body: "Performance royalties collected from live concert performances, tour sets, club DJ spins, terrestrial radio stations, satellite radio, digital webcasts and TV broadcasts."
    },
    {
      id: "sync",
      title: "Sync",
      tag: "TV, FILM & ADS",
      icon: Film,
      color: "#0EA5E9",
      body: "Sync licensing fees and downstream broadcast performance royalties whenever your songs are synchronized into movies, television shows, video games, trailers, and commercial campaigns."
    },
    {
      id: "much-more",
      title: "+ Much More",
      tag: "GLOBAL SOCIETIES",
      icon: Globe2,
      color: "#F59E0B",
      body: "Publishing royalties gathered from hundreds of territorial collection societies, neighboring rights organizations, karaoke machines, jukeboxes, and background music services globally."
    }
  ];

  const TIMELINE_STEPS = [
    {
      num: "01",
      title: "Sign up & register your music",
      desc: "When you sign up for Publishing, we register all your music with collection points around the world, maximising your potential income.",
      badge: "STEP 1: REGISTRATION"
    },
    {
      num: "02",
      title: "Claim your missing royalties",
      desc: "Once you're registered, we get to work uncovering and claiming all of the publishing royalties you're due from past uncollected streams and live plays.",
      badge: "STEP 2: RETROACTIVE CLAIMS"
    },
    {
      num: "03",
      title: "Pitch for TV, film & more",
      desc: "Browse our client's latest sync briefs and submit for any that suit your style. If our sync team think it's a fit, we'll pitch it directly to music supervisors.",
      badge: "STEP 3: SYNC PLACEMENTS",
      link: { text: "About sync →", path: "/sync" }
    },
    {
      num: "04",
      title: "You get paid",
      desc: "Royalties land directly in your Tunewave account alongside your income from streaming and sales, keeping every payment in one clear place.",
      badge: "STEP 4: DIRECT PAYOUTS"
    }
  ];

  const REVIEWS = [
    {
      author: "Maurizio Fiordaliso",
      location: "France",
      date: "9 June 2026",
      role: "Electronic Producer",
      badge: "European Mechanicals",
      avatar: "MF",
      avatarBg: "linear-gradient(135deg, #00E5FF, #007EA7)",
      quote: "After dealing with frustrating account issues and poor support on a previous platform, making the switch to Tunewave Publishing has been the best move for my career. They unlocked royalties from my European radio plays I had no idea were waiting for me."
    },
    {
      author: "rkdigitalmusik",
      location: "UK",
      date: "30 May 2026",
      role: "Indie Label Owner",
      badge: "Quarterly Mechanicals",
      avatar: "RK",
      avatarBg: "linear-gradient(135deg, #10B981, #059669)",
      quote: "Tunewave support have been great to help sort out any issues I've had and the publishing platform is super intuitive with lots of useful functionality. Royalties from Spotify mechanicals arrive on time every quarter."
    },
    {
      author: "Lighten Letsholo",
      location: "South Africa",
      date: "28 May 2026",
      role: "Songwriter & Composer",
      badge: "Global Rights Protected",
      avatar: "LL",
      avatarBg: "linear-gradient(135deg, #F59E0B, #D97706)",
      quote: "Tunewave are very friendly, reliable, and professional, with an incredible body of knowledge about global publishing societies. You guys are my new home. Thank you for protecting my songwriting!"
    },
    {
      author: "Klaus Baumgartner",
      location: "Germany",
      date: "14 May 2026",
      role: "Film Score Composer",
      badge: "Sync Licensing",
      avatar: "KB",
      avatarBg: "linear-gradient(135deg, #A855F7, #7C3AED)",
      quote: "Within four months of affiliating my catalog with Tunewave, my compositions were pitched for an indie film festival sync brief and cleared GEMA mechanical payouts seamlessly."
    },
    {
      author: "Elena Rostova",
      location: "United States",
      date: "22 April 2026",
      role: "Pop Songwriter",
      badge: "BMI & ASCAP Collection",
      avatar: "ER",
      avatarBg: "linear-gradient(135deg, #EC4899, #DB2777)",
      quote: "The transparency is second to none. Being able to see mechanical income side-by-side with live show setlist performance royalties in one dashboard is a game-changer for independent writers."
    }
  ];

  return (
    <div className="publishing-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* ── Page Custom Animations & Theme Overrides ─────────────── */}
      <style>{`
        /* 3D Top-to-Bottom Card Flip */
        @keyframes pubCardFlipTopToBottom {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg) translateY(-30px);
            transform-origin: top center;
          }
          55% {
            opacity: 1;
            transform: perspective(1200px) rotateX(15deg) translateY(0);
            transform-origin: top center;
          }
          75% {
            transform: perspective(1200px) rotateX(-5deg);
            transform-origin: top center;
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) translateY(0);
            transform-origin: top center;
          }
        }

        .pub-flip-item {
          opacity: 0;
          transform: perspective(1200px) rotateX(-90deg);
          transform-origin: top center;
          backface-visibility: hidden;
          will-change: transform, opacity;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        .pub-flip-item.in-view {
          animation: pubCardFlipTopToBottom 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .pub-flip-item:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(0, 229, 255, 0.45) !important;
          box-shadow: 0 16px 36px rgba(0, 229, 255, 0.16) !important;
        }

        /* Pulse Radar Dot */
        @keyframes pubRadarPulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(0, 229, 255, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 229, 255, 0);
          }
        }

        .pub-live-dot {
          animation: pubRadarPulse 2s infinite;
        }

        /* ── Core Benefits Cards - Left-to-Right Highlight Sequence ── */
        .pub-highlight-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease, 
                      background 0.4s ease,
                      opacity 0.4s ease;
        }

        .pub-highlight-card:not(.is-active) {
          opacity: 0.82;
          transform: translateY(0) scale(1);
        }

        .pub-highlight-card:hover,
        .pub-highlight-card.is-active {
          opacity: 1 !important;
        }

        /* Top Accent Beam */
        .pub-card-top-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          border-radius: 20px 20px 0 0;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
          z-index: 5;
        }

        .pub-highlight-card.is-active .pub-card-top-beam {
          opacity: 1;
          transform: scaleX(1);
        }

        /* Scanning Light Sweep on Active Card */
        @keyframes pubCardShineBeam {
          0% {
            transform: translateX(-120%) skewX(-20deg);
            opacity: 0;
          }
          35% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(220%) skewX(-20deg);
            opacity: 0;
          }
        }

        .pub-card-shine-beam {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 55%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
          pointer-events: none;
          z-index: 2;
          opacity: 0;
        }

        [data-theme="light"] .pub-card-shine-beam {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
        }

        .pub-highlight-card.is-active .pub-card-shine-beam {
          animation: pubCardShineBeam 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        /* Active card icons scale animation */
        .pub-highlight-card.is-active .pub-card-icon-box {
          transform: scale(1.08);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Dark mode card active variants */
        .pub-card-var-0.is-active {
          border-color: #00E5FF !important;
          box-shadow: 0 22px 50px -10px rgba(0, 229, 255, 0.45), 0 0 28px rgba(0, 229, 255, 0.22) !important;
          transform: translateY(-8px) scale(1.02);
          background: linear-gradient(180deg, rgba(12, 18, 28, 0.96) 0%, rgba(0, 126, 167, 0.18) 100%) !important;
        }

        .pub-card-var-1.is-active {
          border-color: #10B981 !important;
          box-shadow: 0 22px 50px -10px rgba(16, 185, 129, 0.45), 0 0 28px rgba(16, 185, 129, 0.22) !important;
          transform: translateY(-8px) scale(1.02);
          background: linear-gradient(180deg, rgba(12, 18, 28, 0.96) 0%, rgba(16, 185, 129, 0.18) 100%) !important;
        }

        .pub-card-var-2.is-active {
          border-color: #A855F7 !important;
          box-shadow: 0 22px 50px -10px rgba(168, 85, 247, 0.45), 0 0 28px rgba(168, 85, 247, 0.22) !important;
          transform: translateY(-8px) scale(1.02);
          background: linear-gradient(180deg, rgba(12, 18, 28, 0.96) 0%, rgba(139, 92, 246, 0.18) 100%) !important;
        }

        /* Light mode card active variants */
        [data-theme="light"] .pub-card-var-0.is-active {
          border: 2px solid #0096C7 !important;
          box-shadow: 0 22px 45px -10px rgba(0, 150, 199, 0.35), 0 0 25px rgba(0, 180, 216, 0.2) !important;
          transform: translateY(-8px) scale(1.02);
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(0, 150, 199, 0.06) 100%) !important;
        }

        [data-theme="light"] .pub-card-var-1.is-active {
          border: 2px solid #059669 !important;
          box-shadow: 0 22px 45px -10px rgba(16, 185, 129, 0.35), 0 0 25px rgba(16, 185, 129, 0.2) !important;
          transform: translateY(-8px) scale(1.02);
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(16, 185, 129, 0.06) 100%) !important;
        }

        [data-theme="light"] .pub-card-var-2.is-active {
          border: 2px solid #7C3AED !important;
          box-shadow: 0 22px 45px -10px rgba(139, 92, 246, 0.35), 0 0 25px rgba(139, 92, 246, 0.2) !important;
          transform: translateY(-8px) scale(1.02);
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(139, 92, 246, 0.06) 100%) !important;
        }

        /* Step Indicator Tracker Pills */
        .pub-step-pill {
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
          border: 1px solid var(--tw-line);
          background: rgba(255, 255, 255, 0.04);
          color: var(--tw-text-dim);
          position: relative;
          overflow: hidden;
        }

        [data-theme="light"] .pub-step-pill {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #64748B;
        }

        .pub-step-pill.is-active {
          color: var(--tw-text-white) !important;
          border-color: currentColor !important;
        }

        [data-theme="light"] .pub-step-pill.is-active {
          color: #0F172A !important;
          background: #F8FAFC !important;
        }

        @keyframes pubStepFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        .pub-step-fill-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2.5px;
          width: 0%;
        }

        .pub-step-pill.is-active .pub-step-fill-bar {
          animation: pubStepFill 2.8s linear infinite;
        }

        /* ── 3D "Not Claiming Publishing" Banner ── */
        .pub-unclaimed-wrap {
          position: relative;
          perspective: 1400px;
        }

        .pub-unclaimed-card-3d {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          transform-style: preserve-3d;
          border: 1px solid rgba(0, 229, 255, 0.35);
          box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 229, 255, 0.14);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .pub-unclaimed-3d-backdrop {
          position: absolute;
          inset: -35px -45px -35px -45px;
          background-image: url('/Not%20claiming%20publishing%20background%20image.png');
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          filter: brightness(0.92) contrast(1.1);
          will-change: transform;
          z-index: 0;
        }

        .pub-unclaimed-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(8, 12, 20, 0.94) 0%, rgba(8, 12, 20, 0.76) 45%, rgba(8, 12, 20, 0.42) 100%),
                      radial-gradient(ellipse at 85% 50%, rgba(0, 229, 255, 0.22) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* 3D Floating Vinyl Record Hologram */
        @keyframes pubVinylSpin3D {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .pub-vinyl-spin {
          animation: pubVinylSpin3D 25s linear infinite;
        }

        /* 3D Floating Note Levitation */
        @keyframes pubNoteFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(6deg);
          }
        }

        @keyframes pubNoteFloatAlt {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(-8deg);
          }
        }

        .pub-floating-note-1 {
          animation: pubNoteFloat 4.5s ease-in-out infinite;
        }

        .pub-floating-note-2 {
          animation: pubNoteFloatAlt 5.2s ease-in-out infinite 0.8s;
        }

        /* 3D Sound Pulse Rings */
        @keyframes pubAudioWavePulse {
          0% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.85);
            opacity: 0.8;
          }
        }

        .pub-audio-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 229, 255, 0.35);
          pointer-events: none;
          animation: pubAudioWavePulse 3.5s ease-in-out infinite;
        }

        /* ── Light Mode Design System ────────────────────────────── */
        [data-theme="light"] .publishing-page {
          background-color: #F8FAFC !important;
        }

        [data-theme="light"] .pub-card-surface {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06) !important;
        }

        [data-theme="light"] .pub-card-surface h1,
        [data-theme="light"] .pub-card-surface h2,
        [data-theme="light"] .pub-card-surface h3,
        [data-theme="light"] .pub-card-surface h4,
        [data-theme="light"] .pub-heading-text {
          color: #0F172A !important;
        }

        [data-theme="light"] .pub-sub-text {
          color: #334155 !important;
        }

        [data-theme="light"] .pub-muted-text {
          color: #64748B !important;
        }

        [data-theme="light"] .pub-sub-box {
          background: #F1F5F9 !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        [data-theme="light"] .pub-sub-box-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .pub-society-chip {
          background: #F1F5F9 !important;
          color: #0F172A !important;
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
        }

        [data-theme="light"] .pub-society-chip:hover {
          background: #E2E8F0 !important;
          border-color: #0284C7 !important;
          color: #0284C7 !important;
        }

        [data-theme="light"] .pub-stat-val {
          color: #0F172A !important;
        }

        [data-theme="light"] .pub-unclaimed-card,
        [data-theme="light"] .pub-unclaimed-card-3d {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 150, 199, 0.28) !important;
          box-shadow: 0 25px 70px -15px rgba(0, 150, 199, 0.22), 0 10px 30px rgba(0, 0, 0, 0.06) !important;
        }

        [data-theme="light"] .pub-unclaimed-3d-backdrop {
          filter: brightness(1.02) contrast(1.02) !important;
        }

        [data-theme="light"] .pub-unclaimed-overlay {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 50%, rgba(255, 255, 255, 0.55) 100%),
                      radial-gradient(ellipse at 85% 50%, rgba(0, 180, 216, 0.15) 0%, transparent 60%) !important;
        }

        [data-theme="light"] .pub-unclaimed-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .pub-unclaimed-sub {
          color: #1E293B !important;
          font-weight: 500 !important;
        }

        [data-theme="light"] .pub-breakdown-box {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08) !important;
        }

        [data-theme="light"] .pub-breakdown-item-1 {
          background: #F1F5F9 !important;
          border-left: 4px solid #475569 !important;
        }

        [data-theme="light"] .pub-breakdown-item-1 strong {
          color: #0F172A !important;
          font-weight: 800 !important;
        }

        [data-theme="light"] .pub-breakdown-item-1 span {
          color: #334155 !important;
          font-weight: 700 !important;
        }

        [data-theme="light"] .pub-breakdown-item-1 p {
          color: #334155 !important;
          font-weight: 500 !important;
        }

        [data-theme="light"] .pub-breakdown-item-2 {
          background: rgba(2, 132, 199, 0.09) !important;
          border-left: 4px solid #0284C7 !important;
        }

        [data-theme="light"] .pub-breakdown-item-2 strong {
          color: #0284C7 !important;
          font-weight: 800 !important;
        }

        [data-theme="light"] .pub-breakdown-item-2 span {
          color: #0284C7 !important;
          font-weight: 800 !important;
        }

        [data-theme="light"] .pub-breakdown-item-2 p {
          color: #1E293B !important;
          font-weight: 500 !important;
        }

        [data-theme="light"] .pub-breakdown-text {
          color: #0F172A !important;
          font-weight: 800 !important;
        }

        [data-theme="light"] .pub-footnote-text {
          color: #334155 !important;
          font-weight: 600 !important;
        }

        [data-theme="light"] .pub-faq-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .pub-faq-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .pub-faq-answer {
          color: #475569 !important;
        }

        /* ── 3D Hero Background Styles ── */
        .pub-hero-3d-backdrop {
          position: absolute;
          inset: -25px -35px -25px -35px;
          background-image: url('/music_publish_dark_mode.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(1.24) contrast(1.06);
          will-change: transform, filter;
          z-index: 0;
        }

        [data-theme="light"] .pub-hero-3d-backdrop {
          background-image: url('/music_publish_light_mode.png') !important;
          filter: brightness(1.12) contrast(1.03) !important;
        }

        .pub-hero-overlay-dark {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(8, 11, 17, 0.76) 0%, rgba(8, 11, 17, 0.35) 50%, rgba(8, 11, 17, 0.68) 100%),
                      radial-gradient(ellipse at 65% 40%, rgba(0, 229, 255, 0.18) 0%, transparent 65%),
                      linear-gradient(180deg, rgba(8, 11, 17, 0.2) 0%, transparent 25%, transparent 75%, rgba(8, 11, 17, 0.95) 100%);
          pointer-events: none;
          z-index: 1;
        }

        [data-theme="light"] .pub-hero-overlay-dark {
          background: linear-gradient(90deg, rgba(248, 250, 252, 0.82) 0%, rgba(248, 250, 252, 0.38) 50%, rgba(248, 250, 252, 0.75) 100%),
                      radial-gradient(ellipse at 65% 40%, rgba(0, 126, 167, 0.12) 0%, transparent 65%),
                      linear-gradient(180deg, rgba(248, 250, 252, 0.2) 0%, transparent 25%, transparent 75%, rgba(248, 250, 252, 0.95) 100%) !important;
        }

        .pub-hero-content-wrap {
          position: relative;
          z-index: 2;
        }

        /* ── Continuous Right-to-Left Reviews Ribbon ── */
        @keyframes pubReviewsRTL {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .pub-reviews-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: pubReviewsRTL 45s linear infinite;
          will-change: transform;
        }

        .pub-reviews-track:hover {
          animation-play-state: paused !important;
        }

        .pub-review-card {
          width: 380px;
          min-width: 380px;
          max-width: 380px;
          flex-shrink: 0;
          padding: 28px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: default;
        }

        .pub-review-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(0, 229, 255, 0.45) !important;
          box-shadow: 0 20px 45px -10px rgba(0, 229, 255, 0.2) !important;
        }

        [data-theme="light"] .pub-review-card:hover {
          border-color: #0284C7 !important;
          box-shadow: 0 20px 40px -10px rgba(2, 132, 199, 0.2) !important;
        }

        /* ── 3D CTA Card Background Styles ── */
        .pub-cta-card-wrap {
          position: relative;
          overflow: hidden;
          perspective: 1200px;
          border-radius: 28px;
          padding: clamp(48px, 6vw, 76px) clamp(24px, 5vw, 60px);
          border: 1px solid rgba(0, 229, 255, 0.35);
          text-align: center;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 229, 255, 0.12);
        }

        .pub-cta-3d-bg {
          position: absolute;
          inset: -30px -40px -30px -40px;
          background-image: url('/Ready%20to%20claim%20background%20image.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.88) contrast(1.1);
          will-change: transform;
          z-index: 0;
        }

        .pub-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(9, 13, 21, 0.72) 0%, rgba(9, 13, 21, 0.40) 50%, rgba(9, 13, 21, 0.82) 100%),
                      radial-gradient(circle at center, transparent 35%, rgba(9, 13, 21, 0.65) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .pub-cta-content {
          position: relative;
          z-index: 2;
          transform-style: preserve-3d;
        }

        [data-theme="light"] .pub-cta-card-wrap {
          border-color: rgba(0, 126, 167, 0.28) !important;
          box-shadow: 0 30px 70px -15px rgba(0, 126, 167, 0.22), 0 10px 30px rgba(0,0,0,0.05) !important;
        }

        [data-theme="light"] .pub-cta-3d-bg {
          filter: brightness(1.05) contrast(1.02) !important;
        }

        [data-theme="light"] .pub-cta-overlay {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.46) 50%, rgba(255, 255, 255, 0.84) 100%),
                      radial-gradient(circle at center, transparent 35%, rgba(255, 255, 255, 0.55) 100%) !important;
        }
      `}</style>

      {/* 1. HERO SECTION WITH 3D IMAGE BACKGROUND */}
      <section 
        ref={heroRef}
        className="pub-hero-section"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{ 
          position: 'relative', 
          padding: '60px 0 90px', 
          overflow: 'hidden',
          perspective: 1200
        }}
      >
        {/* 3D Background Image Canvas Layer */}
        <div 
          className="pub-hero-3d-backdrop"
          style={{
            transform: bg3DTransform,
            transition: mousePos.x === 0 && mousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out'
          }}
        />

        {/* Ambient Lighting & Contrast Gradient Overlay */}
        <div className="pub-hero-overlay-dark" />

        <div className="container pub-hero-content-wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 54, alignItems: 'center' }}>
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ 
                  color: 'var(--tw-cyan)', 
                  background: 'rgba(0, 126, 167, 0.12)', 
                  border: '1px solid rgba(0, 229, 255, 0.3)' 
                }}>
                  <Sparkles size={13} style={{ marginRight: 4 }} />
                  EXCLUSIVE TO Tunewave PRO
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                Music <br />
                <span className="text-cyan-gradient">
                  Publishing.
                </span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                You might be missing out on royalties you didn't know existed. Let's claim what you're owed across global streaming, performance, and sync.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700
                  }}
                >
                  <span>Sign Up to Pro</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
                <button 
                  onClick={() => onNavigate('/pricing')}
                  className="btn-glass"
                  style={{
                    padding: '16px 30px',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}
                >
                  About Tunewave Pro →
                </button>
              </div>

              {/* Quick trust strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--tw-line)' }}>
                <div style={{ display: 'flex', gap: 4, color: '#FACC15' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)' }}>
                  Rated <strong style={{ color: "var(--tw-text-white)" }}>4.2 / 5</strong> on Trustpilot from over 6,200+ artists
                </div>
              </div>
            </div>

            {/* Hero Interactive Graphic Card: Songwriter Earnings Hub with 3D Parallax */}
            <div 
              className="reveal-scale" 
              style={{ 
                position: 'relative',
                transform: card3DTransform,
                transition: mousePos.x === 0 && mousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out',
                willChange: 'transform'
              }}
            >
              <div 
                className="pub-card-surface glass-panel card-shimmer-sweep" 
                style={{
                  borderRadius: 24,
                  padding: '36px 32px',
                  border: isLight ? '1px solid rgba(0, 126, 167, 0.28)' : '1px solid rgba(0, 229, 255, 0.35)',
                  background: isLight 
                    ? 'rgba(255, 255, 255, 0.88)' 
                    : 'rgba(9, 13, 21, 0.85)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: isLight 
                    ? '0 30px 70px -15px rgba(0, 126, 167, 0.2), 0 10px 30px rgba(0,0,0,0.06)' 
                    : '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 229, 255, 0.15)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.1em' }}>
                      GLOBAL ROYALTIES RADAR
                    </div>
                    <div className="pub-heading-text" style={{ fontSize: '1.4rem', fontWeight: 800, color: "var(--tw-text-white)" }}>
                      Songwriter Earnings Hub
                    </div>
                  </div>
                  <span 
                    className="pill-badge" 
                    style={{ 
                      background: 'rgba(0, 229, 255, 0.12)', 
                      color: 'var(--tw-cyan)', 
                      borderColor: 'rgba(0, 229, 255, 0.35)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span 
                      className="pub-live-dot" 
                      style={{ 
                        width: 7, 
                        height: 7, 
                        borderRadius: '50%', 
                        background: 'var(--tw-cyan)', 
                        display: 'inline-block' 
                      }} 
                    />
                    LIVE TRACKING
                  </span>
                </div>

                {/* Revenue comparison bar */}
                <div 
                  className="pub-sub-box"
                  style={{
                    padding: '20px',
                    borderRadius: 16,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--tw-line)',
                    marginBottom: 20
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.86rem' }}>
                    <span className="pub-muted-text" style={{ color: 'var(--tw-text-dim)', fontWeight: 600 }}>Without Publishing (Master only)</span>
                    <span className="pub-stat-val" style={{ color: 'var(--tw-text-white)', fontWeight: 700 }}>$1,000</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(100, 116, 139, 0.2)', overflow: 'hidden', marginBottom: 16 }}>
                    <div style={{ width: '65%', height: '100%', background: '#64748B', borderRadius: 4 }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--tw-cyan)', fontWeight: 700 }}>With Tunewave Publishing (+20% Unlocked)</span>
                    <span style={{ color: 'var(--tw-cyan)', fontWeight: 800 }}>$1,240</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: 'rgba(0, 229, 255, 0.15)', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, var(--tw-cyan), #38BDF8)', borderRadius: 5 }} />
                  </div>
                </div>

                {/* Stream breakdown cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
                  <div 
                    className="pub-sub-box"
                    style={{ 
                      padding: '14px', 
                      borderRadius: 12, 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid var(--tw-line)' 
                    }}
                  >
                    <div className="pub-muted-text" style={{ fontSize: '0.72rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Mechanical Income</div>
                    <div className="pub-sub-box-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--tw-cyan)', marginTop: 4 }}>Spotify &amp; Apple</div>
                    <div style={{ fontSize: '0.75rem', color: '#0EA5E9', marginTop: 2, fontWeight: 600 }}>Auto-collected direct</div>
                  </div>
                  <div 
                    className="pub-sub-box"
                    style={{ 
                      padding: '14px', 
                      borderRadius: 12, 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid var(--tw-line)' 
                    }}
                  >
                    <div className="pub-muted-text" style={{ fontSize: '0.72rem', color: 'var(--tw-text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Performance Rights</div>
                    <div className="pub-sub-box-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38BDF8', marginTop: 4 }}>Radio &amp; Live Shows</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--tw-cyan)', marginTop: 2, fontWeight: 600 }}>PRS, ASCAP, BMI</div>
                  </div>
                </div>

                {/* Global Society Pill Row with Theme Support */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--tw-line)' }}>
                  <span className="pub-muted-text" style={{ fontSize: '0.72rem', color: 'var(--tw-text-dim)', fontWeight: 800, letterSpacing: '0.05em' }}>
                    CONNECTED SOCIETIES:
                  </span>
                  {['PRS', 'ASCAP', 'BMI', 'GEMA', 'SACEM', 'SOCAN', 'APRA'].map((soc) => (
                    <span 
                      key={soc} 
                      className="pub-society-chip"
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--tw-text-white)',
                        border: '1px solid var(--tw-line-bright)',
                        transition: 'all 0.2s ease',
                        cursor: 'default'
                      }}
                    >
                      {soc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 01 · EARN MORE */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                01 · EARN MORE
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              Earn more from <span className="text-cyan-gradient">your music.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', lineHeight: 1.6, marginBottom: 28 }}>
              Streaming royalties are only half the story. Publishing collects the mechanical, performance, sync and YouTube income that 80% of independent artists never see.
            </p>

            {/* Left-to-Right Step Progression Tracker */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 12, 
                flexWrap: 'wrap'
              }}
            >
              {[
                { id: 0, num: '01', title: 'Worldwide Registration', color: isLight ? '#0096C7' : 'var(--tw-cyan)' },
                { id: 1, num: '02', title: 'Fair & Direct Payments', color: isLight ? '#059669' : '#10B981' },
                { id: 2, num: '03', title: 'Sync Opportunities', color: isLight ? '#7C3AED' : '#A855F7' }
              ].map((step) => {
                const isActive = activeHighlightIndex === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveHighlightIndex(step.id);
                    }}
                    onMouseEnter={() => {
                      setIsHighlightPaused(true);
                      setActiveHighlightIndex(step.id);
                    }}
                    onMouseLeave={() => setIsHighlightPaused(false)}
                    className={`pub-step-pill ${isActive ? 'is-active' : ''}`}
                    style={{
                      color: isActive ? step.color : undefined,
                      borderColor: isActive ? step.color : undefined,
                      boxShadow: isActive ? `0 4px 18px -3px ${step.color}50` : 'none'
                    }}
                  >
                    <span style={{ 
                      width: 22, 
                      height: 22, 
                      borderRadius: '50%', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      background: isActive ? step.color : (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.1)'),
                      color: isActive ? '#FFFFFF' : 'inherit'
                    }}>
                      {step.num}
                    </span>
                    <span>{step.title}</span>
                    {isActive && !isHighlightPaused && (
                      <div 
                        className="pub-step-fill-bar" 
                        style={{ background: step.color }} 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28
          }}>
            {/* Card 1 - Worldwide */}
            <div 
              onClick={() => setActiveHighlightIndex(0)}
              onMouseEnter={() => {
                setIsHighlightPaused(true);
                setActiveHighlightIndex(0);
              }}
              onMouseLeave={() => setIsHighlightPaused(false)}
              className={`pub-card-surface glass-panel pub-highlight-card pub-card-var-0 ${activeHighlightIndex === 0 ? 'is-active' : ''}`} 
              style={{
                padding: '40px 32px',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Accent Beam */}
              <div 
                className="pub-card-top-beam" 
                style={{ background: 'linear-gradient(90deg, #00E5FF, #0284C7)' }} 
              />
              {/* Sweep Scanbeam */}
              <div className="pub-card-shine-beam" />

              <div>
                <div 
                  className="pub-card-icon-box"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: isLight ? 'rgba(0, 150, 199, 0.12)' : 'rgba(0, 126, 167, 0.18)',
                    color: isLight ? '#0096C7' : 'var(--tw-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    border: isLight ? '1px solid rgba(0, 150, 199, 0.25)' : '1px solid rgba(0, 229, 255, 0.35)'
                  }}
                >
                  <Globe2 size={26} />
                </div>
                <h3 className="pub-heading-text" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                  Register unlimited music worldwide
                </h3>
                <p className="pub-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  We'll register your music for publishing royalties across the globe, while you keep full ownership and 100% of your copyright.
                </p>
              </div>

              <div style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid var(--tw-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: isLight ? '#0096C7' : 'var(--tw-cyan)',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}>
                  <CheckCircle2 size={18} />
                  <span>Worldwide Coverage</span>
                </div>
                {activeHighlightIndex === 0 && (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: isLight ? 'rgba(0, 150, 199, 0.12)' : 'rgba(0, 229, 255, 0.18)',
                    color: isLight ? '#0096C7' : 'var(--tw-cyan)',
                    border: isLight ? '1px solid rgba(0, 150, 199, 0.3)' : '1px solid rgba(0, 229, 255, 0.35)'
                  }}>
                    Step 01
                  </span>
                )}
              </div>
            </div>

            {/* Card 2 - Payments */}
            <div 
              onClick={() => setActiveHighlightIndex(1)}
              onMouseEnter={() => {
                setIsHighlightPaused(true);
                setActiveHighlightIndex(1);
              }}
              onMouseLeave={() => setIsHighlightPaused(false)}
              className={`pub-card-surface glass-panel pub-highlight-card pub-card-var-1 ${activeHighlightIndex === 1 ? 'is-active' : ''}`} 
              style={{
                padding: '40px 32px',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Accent Beam */}
              <div 
                className="pub-card-top-beam" 
                style={{ background: 'linear-gradient(90deg, #10B981, #059669)' }} 
              />
              {/* Sweep Scanbeam */}
              <div className="pub-card-shine-beam" />

              <div>
                <div 
                  className="pub-card-icon-box"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: isLight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
                    color: isLight ? '#059669' : '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    border: isLight ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <DollarSign size={26} />
                </div>
                <h3 className="pub-heading-text" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                  Fair and direct payments
                </h3>
                <p className="pub-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  We only take a 10% commission on publishing royalties we collect and you keep the rest. You won't find a better deal anywhere else in the industry.
                </p>
              </div>

              <div style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid var(--tw-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: isLight ? '#059669' : '#10B981',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}>
                  <CheckCircle2 size={18} />
                  <span>90% Songwriter Retained</span>
                </div>
                {activeHighlightIndex === 1 && (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: isLight ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
                    color: isLight ? '#059669' : '#10B981',
                    border: isLight ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(16, 185, 129, 0.35)'
                  }}>
                    Step 02
                  </span>
                )}
              </div>
            </div>

            {/* Card 3 - Sync */}
            <div 
              onClick={() => setActiveHighlightIndex(2)}
              onMouseEnter={() => {
                setIsHighlightPaused(true);
                setActiveHighlightIndex(2);
              }}
              onMouseLeave={() => setIsHighlightPaused(false)}
              className={`pub-card-surface glass-panel pub-highlight-card pub-card-var-2 ${activeHighlightIndex === 2 ? 'is-active' : ''}`} 
              style={{
                padding: '40px 32px',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Accent Beam */}
              <div 
                className="pub-card-top-beam" 
                style={{ background: 'linear-gradient(90deg, #A855F7, #7C3AED)' }} 
              />
              {/* Sweep Scanbeam */}
              <div className="pub-card-shine-beam" />

              <div>
                <div 
                  className="pub-card-icon-box"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: isLight ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.18)',
                    color: isLight ? '#7C3AED' : '#A855F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    border: isLight ? '1px solid rgba(139, 92, 246, 0.25)' : '1px solid rgba(139, 92, 246, 0.35)'
                  }}
                >
                  <Tv size={26} />
                </div>
                <h3 className="pub-heading-text" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                  New royalties &amp; sync opportunities
                </h3>
                <p className="pub-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                  Unlock new royalties and exposure worldwide. Earn royalties every time your music is performed live or heard, and pitch tracks for TV &amp; film placements.
                </p>
              </div>

              <div style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid var(--tw-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: isLight ? '#7C3AED' : '#A855F7',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}>
                  <CheckCircle2 size={18} />
                  <span>Daily Sync Briefs</span>
                </div>
                {activeHighlightIndex === 2 && (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: 9999,
                    background: isLight ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.18)',
                    color: isLight ? '#7C3AED' : '#A855F7',
                    border: isLight ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(139, 92, 246, 0.35)'
                  }}>
                    Step 03
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MID-BANNER: NOT CLAIMING PUBLISHING ROYALTIES? YOU'RE MISSING OUT (3D Background Parallax Experience) */}
      <section id="missing-out" style={{ padding: '60px 0', overflow: 'hidden' }}>
        <div className="container pub-unclaimed-wrap">
          <div 
            ref={unclaimedRef}
            onMouseMove={handleUnclaimedMouseMove}
            onMouseLeave={handleUnclaimedMouseLeave}
            className="pub-unclaimed-card-3d card-shimmer-sweep" 
            style={{
              borderRadius: 28,
              padding: 'clamp(38px, 6vw, 68px)',
              position: 'relative',
              overflow: 'hidden',
              perspective: 1200,
              transform: unclaimedCard3DTransform,
              transition: unclaimedMousePos.x === 0 && unclaimedMousePos.y === 0 
                ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease' 
                : 'transform 0.12s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* 3D Background Image Canvas with Parallax */}
            <div 
              className="pub-unclaimed-3d-backdrop" 
              style={{
                transform: unclaimedBg3DTransform,
                transition: unclaimedMousePos.x === 0 && unclaimedMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            />

            {/* Ambient Lighting & High-Contrast Gradient Overlay */}
            <div className="pub-unclaimed-overlay" />

            {/* Dynamic Interactive Soundwave Glare Spotlight */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
                background: `radial-gradient(circle 500px at ${(unclaimedMousePos.x + 1) * 50}% ${(unclaimedMousePos.y + 1) * 50}%, ${isLight ? 'rgba(0, 180, 216, 0.18)' : 'rgba(0, 229, 255, 0.16)'}, transparent 75%)`,
                mixBlendMode: isLight ? 'multiply' : 'screen'
              }}
            />

            {/* 3D Sound Pulse Rings floating near the vinyl */}
            <div 
              style={{
                position: 'absolute',
                right: '18%',
                top: '50%',
                transform: `translate(50%, -50%) translate3d(${unclaimedMousePos.x * -10}px, ${unclaimedMousePos.y * -8}px, 10px)`,
                width: 380,
                height: 380,
                pointerEvents: 'none',
                zIndex: 1,
                opacity: isLight ? 0.35 : 0.5
              }}
            >
              <div className="pub-audio-ring" style={{ inset: 0 }} />
              <div className="pub-audio-ring" style={{ inset: 40, animationDelay: '-1.2s' }} />
              <div className="pub-audio-ring" style={{ inset: 85, animationDelay: '-2.4s' }} />
            </div>

            {/* 3D Floating Holographic Vinyl Record (echoing the vinyl in the background image) */}
            <div 
              style={{
                position: 'absolute',
                right: -30,
                top: '50%',
                transform: `translateY(-50%) translate3d(${unclaimedMousePos.x * -25}px, ${unclaimedMousePos.y * -20}px, 30px) rotateY(${unclaimedMousePos.x * 12}deg)`,
                width: 290,
                height: 290,
                pointerEvents: 'none',
                zIndex: 2,
                opacity: isLight ? 0.45 : 0.6,
                transition: unclaimedMousePos.x === 0 && unclaimedMousePos.y === 0 ? 'transform 0.8s ease-out' : 'transform 0.12s ease-out'
              }}
            >
              <div 
                className="pub-vinyl-spin"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #0B111E 0%, #0B111E 26%, #1E293B 27%, #0F172A 35%, #1E293B 36%, #0F172A 48%, #1E293B 49%, #090D15 70%, #000000 100%)',
                  boxShadow: '0 0 35px rgba(0, 229, 255, 0.35), inset 0 0 15px rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isLight ? '2px solid rgba(0, 150, 199, 0.4)' : '2px solid rgba(0, 229, 255, 0.45)'
                }}
              >
                {/* Vinyl Label */}
                <div style={{
                  width: 82,
                  height: 82,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--tw-cyan), #007EA7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(0, 229, 255, 0.6)'
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#090D15', border: '2px solid rgba(255,255,255,0.4)' }} />
                </div>
              </div>
            </div>

            {/* 3D Floating Music Notes with Parallax Levitation */}
            <div 
              className="pub-floating-note-1"
              style={{
                position: 'absolute',
                top: 32,
                left: '46%',
                transform: `translate3d(${unclaimedMousePos.x * 24}px, ${unclaimedMousePos.y * 18}px, 50px)`,
                color: 'var(--tw-cyan)',
                opacity: isLight ? 0.75 : 0.85,
                filter: 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.6))',
                pointerEvents: 'none',
                zIndex: 4
              }}
            >
              <Music size={28} />
            </div>

            <div 
              className="pub-floating-note-2"
              style={{
                position: 'absolute',
                bottom: 36,
                left: '30%',
                transform: `translate3d(${unclaimedMousePos.x * -20}px, ${unclaimedMousePos.y * -16}px, 45px)`,
                color: isLight ? '#0284C7' : '#38BDF8',
                opacity: isLight ? 0.65 : 0.75,
                filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.5))',
                pointerEvents: 'none',
                zIndex: 4
              }}
            >
              <Sparkles size={22} />
            </div>

            {/* Foreground Content Grid with 3D Depth */}
            <div 
              style={{
                position: 'relative',
                zIndex: 3,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 48,
                alignItems: 'center',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Left Column Content */}
              <div 
                style={{
                  transform: unclaimedLeft3DTransform,
                  transition: unclaimedMousePos.x === 0 && unclaimedMousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out',
                  padding: '28px 32px',
                  borderRadius: 22,
                  background: isLight ? 'rgba(255, 255, 255, 0.88)' : 'rgba(9, 13, 21, 0.55)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isLight ? '1px solid rgba(255, 255, 255, 0.95)' : '1px solid rgba(0, 229, 255, 0.18)',
                  boxShadow: isLight ? '0 12px 35px rgba(0, 150, 199, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)' : 'none'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span 
                    className="pill-badge" 
                    style={{ 
                      color: isLight ? '#0284C7' : 'var(--tw-cyan)', 
                      borderColor: isLight ? 'rgba(2, 132, 199, 0.35)' : 'rgba(0, 229, 255, 0.4)',
                      background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(0, 229, 255, 0.12)',
                      fontWeight: 800
                    }}
                  >
                    UNCLAIMED REVENUE
                  </span>
                </div>

                <h2 className="pub-unclaimed-title" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 20,
                  color: isLight ? '#0F172A' : 'var(--tw-text-white)'
                }}>
                  Not claiming publishing royalties? <br />
                  <span className={isLight ? undefined : 'text-cyan-gradient'} style={{ color: isLight ? '#0284C7' : undefined }}>
                    You're missing out.
                  </span>
                </h2>

                <p className="pub-unclaimed-sub" style={{ 
                  fontSize: '1.14rem', 
                  color: isLight ? '#1E293B' : 'rgba(255, 255, 255, 0.9)', 
                  fontWeight: isLight ? 500 : 400,
                  lineHeight: 1.68, 
                  marginBottom: 32 
                }}>
                  You could be earning extra revenue whenever your music is performed live or broadcast in any kind of media. You can even claim additional publishing royalties every time your music is streamed on Spotify, Apple Music and YouTube.
                </p>

                <button 
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
              </div>

              {/* Right Column Breakdown Box with 3D Float & Glass Panel */}
              <div 
                className="pub-breakdown-box" 
                style={{
                  background: isLight ? '#FFFFFF' : 'rgba(9, 13, 21, 0.88)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: 22,
                  padding: '34px 32px',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(0, 229, 255, 0.35)',
                  boxShadow: isLight ? '0 20px 45px rgba(0, 0, 0, 0.08)' : '0 25px 50px rgba(0,0,0,0.65), 0 0 25px rgba(0, 229, 255, 0.12)',
                  transform: unclaimedRight3DTransform,
                  transition: unclaimedMousePos.x === 0 && unclaimedMousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out'
                }}
              >
                <h4 className="pub-breakdown-text" style={{ fontSize: '1.2rem', fontWeight: 800, color: isLight ? '#0F172A' : "var(--tw-text-white)", marginBottom: 18 }}>
                  Every Stream Generates Two Halves:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div 
                    className="pub-breakdown-item-1"
                    style={{ 
                      padding: '18px 20px', 
                      borderRadius: 14, 
                      background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)', 
                      borderLeft: isLight ? '5px solid #475569' : '4px solid #64748B' 
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong className="pub-breakdown-text" style={{ color: isLight ? '#0F172A' : "var(--tw-text-white)", fontSize: '1rem', fontWeight: 800 }}>1. Master Recording Royalties</strong>
                      <span className="pub-muted-text" style={{ fontSize: '0.8rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', fontWeight: 700 }}>Collected by Distributor</span>
                    </div>
                    <p className="pub-muted-text" style={{ fontSize: '0.9rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', marginTop: 6, lineHeight: 1.5, fontWeight: isLight ? 500 : 400 }}>
                      Paid to whoever funded or owns the master audio recording.
                    </p>
                  </div>

                  <div 
                    className="pub-breakdown-item-2"
                    style={{ 
                      padding: '18px 20px', 
                      borderRadius: 14, 
                      background: isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(0, 229, 255, 0.08)', 
                      borderLeft: isLight ? '5px solid #0284C7' : '4px solid var(--tw-cyan)' 
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: isLight ? '#0284C7' : 'var(--tw-cyan)', fontSize: '1rem', fontWeight: 800 }}>2. Composition / Publishing Royalties</strong>
                      <span style={{ fontSize: '0.8rem', color: isLight ? '#0284C7' : 'var(--tw-cyan)', fontWeight: 800 }}>Collected by Tunewave</span>
                    </div>
                    <p className="pub-sub-text" style={{ fontSize: '0.9rem', color: isLight ? '#1E293B' : 'var(--tw-text-dim)', marginTop: 6, lineHeight: 1.5, fontWeight: isLight ? 500 : 400 }}>
                      Mechanical + Performance royalties paid to the songwriters, composers, and lyricists.
                    </p>
                  </div>
                </div>

                <div className="pub-footnote-text" style={{ marginTop: 22, textAlign: 'center', fontSize: '0.9rem', color: isLight ? '#334155' : 'var(--tw-text-dim)', fontWeight: 600 }}>
                  Without a publisher, half of your royalties sit unclaimed in overseas black boxes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 02 · HOW IT WORKS (Cascading 3D Flip on scroll) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                02 · HOW IT WORKS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              From sign-up to <br />
              <span className="text-cyan-gradient">first payout.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Collecting, pitching and paying you what you're owed.
            </p>
          </div>

          <div 
            ref={stepsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
              perspective: 1200
            }}
          >
            {TIMELINE_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className={`pub-card-surface glass-panel card-shimmer-sweep pub-flip-item ${stepsInView ? 'in-view' : ''}`}
                style={{
                  borderRadius: 20,
                  padding: '32px 28px',
                  border: '1px solid var(--tw-line)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  animationDelay: `${0.12 + idx * 0.15}s`
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <span style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: 'var(--tw-cyan)',
                      fontFamily: 'monospace',
                      lineHeight: 1
                    }}>
                      {step.num}
                    </span>
                    <span 
                      className="pub-sub-box"
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--tw-text-dim)'
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="pub-heading-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                    {step.title}
                  </h3>

                  <p className="pub-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>

                {step.link && (
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                    <span 
                      onClick={() => onNavigate(step.link.path)}
                      style={{ cursor: 'pointer', color: 'var(--tw-cyan)', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      {step.link.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEDIA CALLOUT: GET YOUR MUSIC ON TV & FILM */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div 
            className="pub-card-surface glass-panel card-shimmer-sweep" 
            style={{
              borderRadius: 28,
              padding: 'clamp(36px, 6vw, 64px)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, #090D15 100%)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center',
              boxShadow: '0 25px 50px -15px rgba(0,0,0,0.5)'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span className="pill-badge" style={{ color: '#8B5CF6', borderColor: '#8B5CF6' }}>
                  Tunewave SYNC SHOWREEL
                </span>
              </div>

              <h2 className="pub-heading-text" style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 18,
                color: 'var(--tw-text-white)'
              }}>
                Get your music on <br />
                <span style={{ color: '#8B5CF6' }}>TV &amp; film.</span>
              </h2>

              <p className="pub-sub-text" style={{ fontSize: '1.12rem', color: 'var(--tw-text-dim)', lineHeight: 1.65, marginBottom: 28 }}>
                The Tunewave Sync team work hard to get our artists featured in TV shows, movies, ads, games and media. We pitch your music sync for opportunities around the world. Watch our showreel to see spots we've secured on Netflix, HBO, EA Sports and more.
              </p>

              <button 
                onClick={() => onNavigate('/sync')}
                className="btn-cyan"
                style={{
                  padding: '14px 30px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  color: "#FFFFFF",
                  border: 'none',
                  boxShadow: '0 10px 25px rgba(139, 92, 246, 0.35)'
                }}
              >
                <span>MORE about sync</span>
                <ArrowRight size={16} className="btn-icon-hover" />
              </button>
            </div>

            {/* Video Player Box */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', aspectRatio: '16/9', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              {!isPlayingVideo ? (
                <div 
                  onClick={() => setIsPlayingVideo(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    background: 'url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80) center/cover'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: 68,
                      height: 68,
                      borderRadius: '50%',
                      background: 'var(--tw-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#090D15',
                      boxShadow: '0 0 30px var(--tw-cyan-glow)',
                      transition: 'transform 0.2s ease'
                    }}>
                      <Play size={28} fill="#090D15" style={{ marginLeft: 4 }} />
                    </div>
                    <span style={{ marginTop: 14, color: "#FFFFFF", fontWeight: 700, fontSize: '0.95rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                      Play Tunewave Sync Showreel
                    </span>
                  </div>
                </div>
              ) : (
                <iframe 
                  src="https://www.youtube.com/embed/b6vGSQkFyMo?autoplay=1&rel=0" 
                  title="Tunewave Sync Showreel"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 03 · ROYALTIES GRID (3D Cascading Flipping Animation on Enter) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                03 · ROYALTIES
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 18,
              color: 'var(--tw-text-white)'
            }}>
              Every royalty <span className="text-cyan-gradient">you'll claim.</span>
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Streaming, performance, sync and more. Tunewave Publishing collects from hundreds of sources across the globe.
            </p>
          </div>

          <div 
            ref={royaltiesRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
              perspective: 1200
            }}
          >
            {ROYALTIES_DATA.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id}
                  className={`pub-card-surface glass-panel card-shimmer-sweep pub-flip-item ${royaltiesInView ? 'in-view' : ''}`}
                  style={{
                    borderRadius: 20,
                    padding: '36px 30px',
                    border: '1px solid var(--tw-line)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    animationDelay: `${0.1 + (idx % 3) * 0.14 + Math.floor(idx / 3) * 0.18}s`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${item.color}40`
                      }}>
                        <IconComp size={22} />
                      </div>
                      <span 
                        className="pub-sub-box"
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          padding: '4px 8px',
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.05)',
                          color: 'var(--tw-text-dim)'
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="pub-heading-text" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                      {item.title}
                    </h3>

                    <p className="pub-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {item.body}
                    </p>
                  </div>

                  <div style={{ marginTop: 24, paddingTop: 14, borderTop: '1px solid var(--tw-line)', display: 'flex', alignItems: 'center', gap: 6, color: item.color, fontSize: '0.82rem', fontWeight: 700 }}>
                    <CheckCircle2 size={15} /> Fully administered
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TRUSTPILOT & ARTIST REVIEWS (Continuous Right-to-Left Scroll) */}
      <section style={{ padding: '80px 0 70px', borderTop: '1px solid var(--tw-line)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: 44 }}>
          <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                  TRUSTED WORLDWIDE
                </span>
              </div>
              <h2 className="pub-heading-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)' }}>
                Don't just take our word <span className="text-cyan-gradient">for it.</span>
              </h2>
            </div>

            <div 
              className="pub-card-surface"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 24px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--tw-line)'
              }}
            >
              <div className="pub-heading-text" style={{ fontSize: '1.8rem', fontWeight: 900, color: "var(--tw-text-white)" }}>4.2</div>
              <div>
                <div style={{ display: 'flex', gap: 3, color: '#22C55E', marginBottom: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--tw-text-dim)' }}>
                  Trustpilot · <strong style={{ color: "var(--tw-text-white)" }}>6,257+ artist reviews</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width seamless Right-to-Left Scrolling Track */}
        <div 
          className="pub-reviews-viewport"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '12px 0 24px',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
          }}
        >
          <div className="pub-reviews-track">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].map((rev, idx) => (
              <div 
                key={idx}
                className="pub-card-surface glass-panel card-shimmer-sweep pub-review-card"
                style={{
                  borderRadius: 20,
                  padding: '30px 28px',
                  border: '1px solid var(--tw-line)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 3, color: '#22C55E' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#22C55E" color="#22C55E" />
                      ))}
                    </div>
                    {rev.badge && (
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        color: 'var(--tw-cyan)', 
                        background: 'rgba(0, 229, 255, 0.08)',
                        border: '1px solid rgba(0, 229, 255, 0.25)',
                        padding: '3px 8px',
                        borderRadius: 12
                      }}>
                        {rev.badge}
                      </span>
                    )}
                  </div>
                  <p className="pub-heading-text" style={{ color: 'var(--tw-text-white)', fontSize: '0.94rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 20 }}>
                    "{rev.quote}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--tw-line)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {rev.avatar && (
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: rev.avatarBg || 'var(--tw-cyan)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        flexShrink: 0
                      }}>
                        {rev.avatar}
                      </div>
                    )}
                    <div>
                      <strong style={{ color: 'var(--tw-cyan)', fontSize: '0.9rem', display: 'block' }}>{rev.author}</strong>
                      {rev.role && <div style={{ color: 'var(--tw-text-dim)', fontSize: '0.75rem' }}>{rev.role}</div>}
                    </div>
                  </div>
                  <span className="pub-muted-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.78rem', textAlign: 'right' }}>
                    {rev.date} · <strong style={{ color: 'var(--tw-text-white)' }}>{rev.location}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PUBLISHING FAQS ACCORDION (3D Flip Animation on enter) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', borderColor: 'var(--tw-cyan)' }}>
                KNOWLEDGE BASE
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              Music Publishing <span className="text-cyan-gradient">FAQs</span>
            </h2>
            <p style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem' }}>
              Everything you need to know about claiming, collecting, and protecting your global songwriter rights.
            </p>
          </div>

          <div 
            ref={faqRef}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, perspective: 1200 }}
          >
            {PUBLISHING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`pub-faq-card glass-panel pub-flip-item ${faqInView ? 'in-view' : ''}`}
                  style={{
                    borderRadius: 16,
                    border: isOpen ? '1px solid rgba(0, 229, 255, 0.4)' : '1px solid var(--tw-line)',
                    background: isOpen ? 'rgba(0, 229, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    animationDelay: `${0.1 + idx * 0.12}s`
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
                    <span className="pub-faq-title">{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? 'var(--tw-cyan)' : 'var(--tw-text-dim)',
                        flexShrink: 0,
                        marginLeft: 16
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div 
                      className="pub-faq-answer"
                      style={{
                        padding: '0 24px 22px',
                        color: 'var(--tw-text-dim)',
                        fontSize: '0.95rem',
                        lineHeight: 1.65,
                        borderTop: '1px solid var(--tw-line)',
                        paddingTop: 16
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA STRIP WITH 3D IMAGE BACKGROUND */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div 
            ref={ctaRef}
            className="pub-cta-card-wrap glass-panel card-shimmer-sweep"
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
          >
            {/* 3D Background Canvas Layer */}
            <div 
              className="pub-cta-3d-bg"
              style={{
                transform: ctaBg3DTransform,
                transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out'
              }}
            />

            {/* Ambient Lighting & Contrast Overlay */}
            <div className="pub-cta-overlay" />

            {/* 3D Foreground Content Layer */}
            <div 
              className="pub-cta-content"
              style={{
                transform: ctaContent3DTransform,
                transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out'
              }}
            >
              <h2 className="pub-heading-text" style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 18,
                color: 'var(--tw-text-white)'
              }}>
                Ready to claim what you're owed? <br />
                <span className="text-cyan-gradient">Get started in 60 seconds.</span>
              </h2>

              <p className="pub-sub-text" style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
                Join thousands of independent songwriters who collect 100% of their royalties worldwide. Unlimited releases, zero hassle.
              </p>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  padding: '18px 44px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(0, 229, 255, 0.35)'
                }}
              >
                <span>Sign up free</span>
                <ArrowRight size={20} className="btn-icon-hover" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
