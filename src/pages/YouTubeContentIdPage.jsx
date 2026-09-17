import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, Play, Sparkles, ArrowRight, CheckCircle2, ChevronDown, 
  ShieldCheck, DollarSign, Search, Music, AlertCircle, HelpCircle, 
  Star, ExternalLink, RefreshCw, Layers, Radio, Zap
} from 'lucide-react';

export default function YouTubeContentIdPage({ onNavigate, theme }) {
  const isLight = theme === 'light';
  const [openFaq, setOpenFaq] = useState(0);
  const [activeGuideTab, setActiveGuideTab] = useState('what-is-cid');

  // 3D Mouse Parallax State for Hero Section with 3D Background Image
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

  const heroBg3DTransform = `scale(1.08) translate3d(${heroMousePos.x * -26}px, ${heroMousePos.y * -18}px, 0)`;
  const heroRadarCard3DTransform = `perspective(1200px) rotateX(${heroMousePos.y * -4}deg) rotateY(${heroMousePos.x * 5}deg) translate3d(${heroMousePos.x * 12}px, ${heroMousePos.y * 8}px, 25px)`;
  const heroText3DTransform = `translate3d(${heroMousePos.x * 8}px, ${heroMousePos.y * 6}px, 15px)`;

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

  // Observers for 3D flip-in entrance animations
  const royaltyBoxesRef = useRef(null);
  const [royaltyBoxesInView, setRoyaltyBoxesInView] = useState(false);
  const timelineRef = useRef(null);
  const [timelineInView, setTimelineInView] = useState(false);
  const faqRef = useRef(null);
  const [faqInView, setFaqInView] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkVisibility = () => {
      const vh = window.innerHeight;

      if (royaltyBoxesRef.current) {
        const rect = royaltyBoxesRef.current.getBoundingClientRect();
        if (rect.top < vh * 0.82 && rect.bottom > 60) {
          setRoyaltyBoxesInView(true);
        } else if (rect.top > vh + 60 || rect.bottom < -60) {
          setRoyaltyBoxesInView(false);
        }
      }

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        if (rect.top < vh * 0.82 && rect.bottom > 60) {
          setTimelineInView(true);
        } else if (rect.top > vh + 60 || rect.bottom < -60) {
          setTimelineInView(false);
        }
      }

      if (faqRef.current) {
        const rect = faqRef.current.getBoundingClientRect();
        if (rect.top < vh * 0.85 && rect.bottom > 60) {
          setFaqInView(true);
        } else if (rect.top > vh + 60 || rect.bottom < -60) {
          setFaqInView(false);
        }
      }

      // Check stacking cards to trigger animated text reveals
      const stackCards = document.querySelectorAll('.yt-stack-item');
      stackCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < vh * 0.92 && rect.bottom > 60) {
          card.classList.add('in-view');
        }
      });
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

    const royaltyObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRoyaltyBoxesInView(true);
      else setRoyaltyBoxesInView(false);
    }, obsOptions);

    const timelineObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimelineInView(true);
      else setTimelineInView(false);
    }, obsOptions);

    const faqObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFaqInView(true);
      else setFaqInView(false);
    }, obsOptions);

    const stackObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    if (royaltyBoxesRef.current) royaltyObserver.observe(royaltyBoxesRef.current);
    if (timelineRef.current) timelineObserver.observe(timelineRef.current);
    if (faqRef.current) faqObserver.observe(faqRef.current);

    const stackCards = document.querySelectorAll('.yt-stack-item');
    stackCards.forEach((card) => stackObserver.observe(card));

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    checkVisibility();

    return () => {
      royaltyObserver.disconnect();
      timelineObserver.disconnect();
      faqObserver.disconnect();
      stackObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const CONTENT_ID_FAQS = [
    {
      q: "How does YouTube Content ID work?",
      a: "When you distribute a song through Tunewave and select YouTube Content ID, our system generates a unique digital acoustic fingerprint of your audio recording and submits it to YouTube's master database. Every single video uploaded to YouTube is continuously scanned against this reference file. When a match is detected, an automated monetization claim is placed on your behalf."
    },
    {
      q: "Can I whitelist my own YouTube channel?",
      a: "Yes! If you have your own Official YouTube Channel and want to monetize your videos directly through your own YouTube Partner Program (YPP) or avoid receiving automated copyright claim notices on your own uploads, you can simply submit your channel ID to be added to Tunewave's whitelist."
    },
    {
      q: "What happens when a claim is placed on a fan's video?",
      a: "When Content ID claims a video that uses your song, the video remains visible and playable to the public. Advertisements are placed on the video, and the ad revenue generated by those views is routed directly into your Tunewave account. The creator's channel does not receive a copyright strike."
    },
    {
      q: "What tracks are eligible for YouTube Content ID?",
      a: "To register for YouTube Content ID, you MUST own 100% exclusive rights to both the master recording and underlying composition. Tracks that use non-exclusive beats (leased from sites like BeatStars), royalty-free loops (like GarageBand or Splice packs without exclusive melody clearance), public domain recordings, or ambient nature sounds are strictly ineligible according to YouTube guidelines."
    },
    {
      q: "Can I monetize cover songs with YouTube Content ID?",
      a: "No. Cover songs are not eligible for YouTube Content ID because you do not own exclusive rights to the underlying musical composition written by another songwriter. However, you can still distribute cover songs to streaming platforms like Spotify and Apple Music with a mechanical license."
    },
    {
      q: "How and when do I get paid for YouTube Content ID?",
      a: "YouTube reports and remits advertising revenue on a monthly accounting cycle (typically around 60 days after the close of each calendar month). Once YouTube pays, your earnings appear directly in your Tunewave balance, ready for instant withdrawal."
    }
  ];

  const ROYALTY_BOXES = [
    {
      title: "User-uploaded live performances",
      desc: "Fans capturing your gigs and festival performances on their phones. Monetize every live clip and fan video containing your audio.",
      tag: "CONCERTS & GIGS",
      icon: Music,
      color: "#EF4444"
    },
    {
      title: "Samples of your music in videos",
      desc: "Vloggers, fitness influencers, dance challenge creators, and tutorial makers using your track as background music.",
      tag: "CREATOR VIDEOS & SHORTS",
      icon: Video,
      color: "var(--tw-cyan)"
    },
    {
      title: "Official music and behind-the-scenes",
      desc: "Your official music videos, visualizers, lyric videos, studio vlogs, and acoustic session uploads across YouTube.",
      tag: "OFFICIAL VISUALS",
      icon: Play,
      color: "#38BDF8"
    }
  ];

  const TIMELINE_STEPS = [
    {
      num: "01",
      title: "Register Your Music",
      desc: "Sign up for Tunewave Pro and select YouTube Content ID as a store destination in our Release Builder during upload.",
      badge: "AUDIO FINGERPRINTING"
    },
    {
      num: "02",
      title: "Detection & Matching",
      desc: "YouTube's Content ID system continuously scans billions of hours of video across the entire platform for matching audio.",
      badge: "AUTOMATED SCANNING"
    },
    {
      num: "03",
      title: "Claim Your Royalties",
      desc: "You'll receive 100% of the ad royalties generated from all identified uses of your music on YouTube, paid straight to your balance.",
      badge: "MONTHLY PAYOUTS"
    }
  ];

  const GUIDE_SECTIONS = [
    {
      id: "what-is-cid",
      title: "What is Content ID?",
      content: (
        <div>
          <h4 className="yt-heading-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 12 }}>
            YouTube's Digital Rights Identification System
          </h4>
          <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            YouTube Content ID is YouTube's proprietary identification system designed to help artists and copyright owners automatically identify their music and any videos that contain their copyrighted content.
          </p>
          <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', lineHeight: 1.7 }}>
            Content ID helps protect content owners from copyright infringements by comparing every single video uploaded against an internal database of reference files submitted by certified music partners like Tunewave.
          </p>
        </div>
      )
    },
    {
      id: "what-used-for",
      title: "What is it used for?",
      content: (
        <div>
          <h4 className="yt-heading-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 12 }}>
            Monetizing Every Corner of YouTube
          </h4>
          <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            Artists and content creators can use Content ID as a way of monetising their music across the whole of YouTube. If someone is using your songs, you should be getting paid for it.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              "Any uploaded live performances by yourself or fans",
              "Any samples or audio clips appearing across YouTube Shorts",
              "Fan or officially posted clips from tours, festivals, and DJ sets",
              "Background music in gaming playthroughs, makeup tutorials, and travel vlogs"
            ].map((item, idx) => (
              <li key={idx} className="yt-sub-text" style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--tw-text-dim)', fontSize: '0.94rem' }}>
                <CheckCircle2 size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: "claims-explained",
      title: "What is a Content ID claim?",
      content: (
        <div>
          <h4 className="yt-heading-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 12 }}>
            Automated Monetization, Not a Strike
          </h4>
          <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', lineHeight: 1.7, marginBottom: 16 }}>
            YouTube Content ID claims are generated automatically whenever someone uploads a video which contains matching audio, no matter how brief a clip. When this happens, you have options:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <div className="yt-sub-box" style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
              <strong style={{ color: '#EF4444' }}>1. Monetize the Video</strong>
              <p className="yt-muted-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)', marginTop: 6, lineHeight: 1.5 }}>
                Ads run on the upload and all generated ad revenue is routed into your Tunewave account. The video stays live.
              </p>
            </div>
            <div className="yt-sub-box" style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
              <strong style={{ color: 'var(--tw-cyan)' }}>2. Track Statistics</strong>
              <p className="yt-muted-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)', marginTop: 6, lineHeight: 1.5 }}>
                Monitor viewership and engagement analytics to see how your music is spreading globally.
              </p>
            </div>
            <div className="yt-sub-box" style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--tw-line)' }}>
              <strong style={{ color: '#F97316' }}>3. Block If Necessary</strong>
              <p className="yt-muted-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)', marginTop: 6, lineHeight: 1.5 }}>
                Restrict the video from being viewed if someone blatantly copies your entire unreleased track.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "eligibility",
      title: "Content ID Eligibility",
      content: (
        <div>
          <h4 className="yt-heading-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 12 }}>
            Ensure Your Music is Eligible
          </h4>
          <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', lineHeight: 1.7, marginBottom: 14 }}>
            To safeguard the ecosystem, YouTube enforces strict eligibility rules. Your audio must consist exclusively of your own original material.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
              <strong style={{ color: '#22C55E', fontSize: '0.92rem' }}>✓ What IS Eligible:</strong>
              <ul style={{ paddingLeft: 16, marginTop: 8, fontSize: '0.82rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                <li>100% Original master audio</li>
                <li>Exclusive beats you own entirely</li>
                <li>Original lyrics, composition &amp; arrangement</li>
              </ul>
            </div>
            <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
              <strong style={{ color: '#EF4444', fontSize: '0.92rem' }}>✗ What is NOT Eligible:</strong>
              <ul style={{ paddingLeft: 16, marginTop: 8, fontSize: '0.82rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                <li>Non-exclusive leased beats (BeatStars)</li>
                <li>Public domain or royalty-free loops (Splice)</li>
                <li>Karaoke, soundalikes, or cover songs</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="youtube-content-id-page" style={{ paddingTop: 30, paddingBottom: 100 }}>
      {/* ── Page Custom Animations & Theme Styling ───────────────── */}
      <style>{`
        /* 3D Top-to-Bottom Card Flip */
        @keyframes ytCardFlipTopToBottom {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg) translateY(-28px);
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

        .yt-flip-item {
          opacity: 0;
          transform: perspective(1200px) rotateX(-90deg);
          transform-origin: top center;
          backface-visibility: hidden;
          will-change: transform, opacity;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        .yt-flip-item.in-view {
          animation: ytCardFlipTopToBottom 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .yt-flip-item:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(239, 68, 68, 0.45) !important;
          box-shadow: 0 16px 36px rgba(239, 68, 68, 0.16) !important;
        }

        /* Radar Pulse Animation */
        @keyframes ytRadarPing {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        .yt-live-dot {
          animation: ytRadarPing 2s infinite;
        }

        /* ── Light Mode Design System ────────────────────────────── */
        [data-theme="light"] .youtube-content-id-page {
          background-color: #F8FAFC !important;
        }

        [data-theme="light"] .yt-card-surface {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06) !important;
        }

        [data-theme="light"] .yt-heading-text {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-sub-text {
          color: #334155 !important;
        }

        [data-theme="light"] .yt-muted-text {
          color: #64748B !important;
        }

        [data-theme="light"] .yt-sub-box {
          background: #F1F5F9 !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        /* Radar Match Items In Light Mode */
        [data-theme="light"] .yt-match-item {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .yt-match-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-match-views {
          color: #0284C7 !important;
        }

        [data-theme="light"] .yt-match-sub {
          color: #64748B !important;
        }

        [data-theme="light"] .yt-banner-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.06) !important;
        }

        [data-theme="light"] .yt-power-suite-box {
          background: #F1F5F9 !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .yt-3way-box {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .yt-3way-item {
          background: #F8FAFC !important;
        }

        [data-theme="light"] .yt-faq-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04) !important;
        }

        [data-theme="light"] .yt-faq-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-faq-answer {
          color: #475569 !important;
        }

        /* ── 3D Bottom CTA Section ── */
        .yt-cta-card-wrap {
          position: relative;
          overflow: hidden;
          perspective: 1200px;
          border-radius: 28px;
          padding: clamp(48px, 6vw, 76px) clamp(24px, 5vw, 60px);
          border: 1px solid rgba(239, 68, 68, 0.35);
          text-align: center;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 35px rgba(239, 68, 68, 0.15);
          transform-style: preserve-3d;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .yt-cta-3d-bg {
          position: absolute;
          inset: -35px -45px -35px -45px;
          background-image: url('/login_background_image/Ready%20to%20release%20background%20image.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.88) contrast(1.1);
          will-change: transform;
          z-index: 0;
        }

        .yt-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(9, 13, 21, 0.78) 0%, rgba(9, 13, 21, 0.42) 50%, rgba(9, 13, 21, 0.88) 100%),
                      radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, rgba(9, 13, 21, 0.6) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .yt-cta-content {
          position: relative;
          z-index: 3;
          transform-style: preserve-3d;
        }

        [data-theme="light"] .yt-cta-card-wrap {
          border: 1px solid rgba(239, 68, 68, 0.25) !important;
          box-shadow: 0 30px 70px -15px rgba(239, 68, 68, 0.16), 0 10px 30px rgba(0,0,0,0.05) !important;
        }

        [data-theme="light"] .yt-cta-3d-bg {
          filter: brightness(1.04) contrast(1.02) !important;
        }

        [data-theme="light"] .yt-cta-overlay {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.72) 50%, rgba(255, 255, 255, 0.94) 100%),
                      radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(248, 250, 252, 0.8) 100%) !important;
        }

        [data-theme="light"] .yt-cta-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-cta-sub {
          color: #1E293B !important;
          font-weight: 500 !important;
        }

        @keyframes ytFloatLevitate {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(6deg);
          }
        }

        .yt-floating-note-1 {
          animation: ytFloatLevitate 4.8s ease-in-out infinite;
        }

        .yt-floating-note-2 {
          animation: ytFloatLevitate 5.4s ease-in-out infinite 0.9s;
        }

        /* ── Sticky Stacking Cards Series (Section 02 to Section 06) ── */
        .yt-stack-wrapper {
          position: relative;
          padding: 30px 0 60px;
        }

        .yt-stack-item {
          position: sticky;
          margin-bottom: clamp(60px, 8vh, 100px);
          will-change: transform;
        }

        .yt-stack-item:last-child {
          margin-bottom: 30px;
        }

        .yt-stack-item-1 {
          top: 84px;
          z-index: 10;
        }

        .yt-stack-item-2 {
          top: 96px;
          z-index: 11;
        }

        .yt-stack-item-3 {
          top: 108px;
          z-index: 12;
        }

        .yt-stack-item-4 {
          top: 120px;
          z-index: 13;
        }

        .yt-stack-item-5 {
          top: 132px;
          z-index: 14;
        }

        .yt-stack-card {
          position: relative;
          border-radius: 28px;
          background: #090D15;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, #090D15 100%);
          border: 1px solid rgba(239, 68, 68, 0.32);
          box-shadow: 
            0 -14px 32px -6px rgba(0, 0, 0, 0.7),
            0 24px 60px -12px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(239, 68, 68, 0.06);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        [data-theme="light"] .yt-stack-card {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.09) !important;
          box-shadow: 
            0 -10px 28px -6px rgba(0, 0, 0, 0.08),
            0 20px 50px -12px rgba(0, 0, 0, 0.12) !important;
        }

        /* ── Staggered Text & Element Reveal Animations ── */
        .yt-anim-badge {
          opacity: 0;
          transform: translateY(-14px) scale(0.96);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .yt-anim-title {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
          will-change: opacity, transform;
        }

        .yt-anim-desc {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
          will-change: opacity, transform;
        }

        .yt-anim-btn {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
          will-change: opacity, transform;
        }

        .yt-anim-side {
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.18s;
          will-change: opacity, transform;
        }

        .yt-stack-item.in-view .yt-anim-badge,
        .yt-stack-item.in-view .yt-anim-title,
        .yt-stack-item.in-view .yt-anim-desc,
        .yt-stack-item.in-view .yt-anim-btn,
        .yt-stack-item.in-view .yt-anim-side {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* Ambient Glowing Top Border Highlight on Active Card */
        .yt-stack-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #EF4444, #F97316, transparent);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          z-index: 2;
        }

        .yt-stack-item.in-view .yt-stack-card::before {
          opacity: 1;
        }

        /* Step Badge Live Pulse */
        @keyframes ytStepPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
          }
        }

        .yt-step-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #EF4444;
          display: inline-block;
          margin-right: 6px;
          animation: ytStepPulse 2.2s infinite;
        }

        /* Equalizer Animation for Card 2 */
        @keyframes ytEqBounce {
          0% { height: 4px; }
          50% { height: 26px; }
          100% { height: 8px; }
        }

        .yt-eq-bar {
          width: 3.5px;
          border-radius: 3px;
          background: linear-gradient(180deg, #EF4444 0%, #F97316 100%);
          display: inline-block;
        }

        /* Hover elevation on interactive rows */
        .yt-interactive-hover-row {
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }

        .yt-interactive-hover-row:hover {
          transform: translateX(6px);
          background: rgba(239, 68, 68, 0.08) !important;
          border-color: rgba(239, 68, 68, 0.45) !important;
        }

        /* ── Hero 3D Background Image & Overlays ── */
        .yt-hero-section {
          position: relative;
          padding: 40px 0 90px;
          overflow: hidden;
          perspective: 1200px;
        }

        .yt-hero-3d-bg {
          position: absolute;
          inset: -30px -40px -30px -40px;
          background-image: url('/youtudepage%20background%20image.png');
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          will-change: transform;
          filter: brightness(0.62) contrast(1.18);
        }

        .yt-hero-overlay-h {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(8,11,17,0.92) 0%, rgba(8,11,17,0.72) 48%, rgba(8,11,17,0.4) 75%, rgba(8,11,17,0.88) 100%);
        }

        .yt-hero-overlay-v {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(8,11,17,0.3) 0%, transparent 20%, transparent 75%, rgba(8,11,17,0.98) 100%);
        }

        .yt-hero-title {
          color: #FFFFFF !important;
        }

        .yt-hero-desc {
          color: #94A3B8 !important;
        }

        .yt-hero-radar-card {
          border-radius: 24px;
          padding: 36px 32px;
          border: 1px solid rgba(239, 68, 68, 0.35);
          background: radial-gradient(circle at top right, rgba(239, 68, 68, 0.16), #090D15) !important;
          backdrop-filter: blur(16px);
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7);
        }

        .yt-hero-radar-card .yt-heading-text {
          color: #FFFFFF !important;
        }

        .yt-hero-radar-card .yt-match-title {
          color: #FFFFFF !important;
        }

        .yt-hero-radar-card .yt-match-views {
          color: #FFFFFF !important;
        }

        .yt-hero-radar-card .yt-match-sub {
          color: #94A3B8 !important;
        }

        .yt-hero-radar-card .yt-match-item {
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid var(--tw-line) !important;
        }

        /* Light Mode Hero Overlays & High-Contrast Typography */
        [data-theme="light"] .yt-hero-3d-bg {
          filter: brightness(1.02) contrast(1.03) !important;
        }

        [data-theme="light"] .yt-hero-overlay-h {
          background: linear-gradient(90deg, rgba(248,250,252,0.92) 0%, rgba(248,250,252,0.75) 45%, rgba(248,250,252,0.28) 75%, rgba(248,250,252,0.85) 100%) !important;
        }

        [data-theme="light"] .yt-hero-overlay-v {
          background: linear-gradient(180deg, rgba(248,250,252,0.35) 0%, transparent 20%, transparent 75%, rgba(248,250,252,0.98) 100%) !important;
        }

        [data-theme="light"] .yt-hero-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-hero-desc {
          color: #1E293B !important;
          font-weight: 500 !important;
        }

        [data-theme="light"] .yt-hero-metric-num {
          font-weight: 900 !important;
        }

        [data-theme="light"] .yt-hero-metric-label {
          color: #475569 !important;
          font-weight: 600 !important;
        }

        [data-theme="light"] .yt-hero-radar-card {
          border: 1px solid rgba(239, 68, 68, 0.22) !important;
          background: rgba(255, 255, 255, 0.94) !important;
          box-shadow: 0 24px 60px -15px rgba(239, 68, 68, 0.15), 0 10px 30px rgba(0, 0, 0, 0.05) !important;
        }

        [data-theme="light"] .yt-hero-radar-card .yt-heading-text {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-hero-radar-card .yt-match-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .yt-hero-radar-card .yt-match-views {
          color: #0284C7 !important;
        }

        [data-theme="light"] .yt-hero-radar-card .yt-match-sub {
          color: #64748B !important;
        }

        [data-theme="light"] .yt-hero-radar-card .yt-match-item {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04) !important;
        }

        @media (max-width: 768px) {
          .yt-stack-item {
            position: relative !important;
            top: auto !important;
            margin-bottom: 28px !important;
          }
        }
      `}</style>

      {/* 1. HERO SECTION WITH 3D BACKGROUND IMAGE & PARALLAX */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="yt-hero-section"
      >
        {/* 3D Background Image Canvas with Parallax */}
        <div 
          className="yt-hero-3d-bg" 
          style={{
            transform: heroBg3DTransform,
            transition: heroMousePos.x === 0 && heroMousePos.y === 0 
              ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
              : 'transform 0.12s ease-out'
          }}
        />

        {/* Ambient Gradient Overlays for High Contrast Across Dark and Light Themes */}
        <div className="yt-hero-overlay-h" />
        <div className="yt-hero-overlay-v" />

        {/* Dynamic Interactive Mouse Cursor Spotlight Glare */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `radial-gradient(circle 600px at ${(heroMousePos.x + 1) * 50}% ${(heroMousePos.y + 1) * 50}%, ${isLight ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.18)'}, transparent 70%)`,
            mixBlendMode: isLight ? 'multiply' : 'screen'
          }}
        />

        {/* Floating 3D Music & Play Badges with Parallax */}
        <div 
          style={{
            position: 'absolute',
            top: 25,
            right: '8%',
            transform: `translate3d(${heroMousePos.x * -32}px, ${heroMousePos.y * -24}px, 60px)`,
            color: '#EF4444',
            opacity: isLight ? 0.75 : 0.85,
            filter: 'drop-shadow(0 0 16px rgba(239, 68, 68, 0.6))',
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          <Play size={34} fill="#EF4444" />
        </div>

        <div 
          style={{
            position: 'absolute',
            bottom: 35,
            left: '6%',
            transform: `translate3d(${heroMousePos.x * 28}px, ${heroMousePos.y * 22}px, 45px)`,
            color: isLight ? '#EF4444' : 'var(--tw-cyan)',
            opacity: isLight ? 0.7 : 0.85,
            filter: 'drop-shadow(0 0 14px rgba(239, 68, 68, 0.5))',
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          <Sparkles size={30} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 54, alignItems: 'center' }}>
            <div 
              className="yt-hero-content-left"
              style={{
                opacity: 1,
                transform: heroText3DTransform,
                transition: heroMousePos.x === 0 && heroMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ 
                  color: '#EF4444', 
                  background: isLight ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.12)', 
                  border: '1px solid rgba(239, 68, 68, 0.3)' 
                }}>
                  <Video size={13} style={{ marginRight: 4 }} />
                  EXCLUSIVE TO Tunewave PRO
                </span>
              </div>

              <h1 className="yt-hero-title" style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                color: isLight ? '#0F172A' : 'var(--tw-text-white)'
              }}>
                YouTube <br />
                <span style={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Content ID.
                </span>
              </h1>

              <p className="yt-hero-desc" style={{
                fontSize: '1.2rem',
                color: isLight ? '#1E293B' : 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 36,
                maxWidth: '560px'
              }}>
                Track and protect your music across YouTube. Register songs for Content ID with Tunewave Pro and claim even more royalties from every video, short, and fan upload.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button 
                  onClick={() => onNavigate('/signup')}
                  className="btn-cyan"
                  style={{
                    padding: '16px 36px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    color: "#FFFFFF",
                    border: 'none',
                    boxShadow: '0 12px 30px -8px rgba(239, 68, 68, 0.4)',
                    cursor: 'pointer'
                  }}
                >
                  <span>Sign up free</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
                <button 
                  onClick={() => onNavigate('/pricing')}
                  className="btn-glass"
                  style={{
                    padding: '16px 30px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: isLight ? '#0F172A' : '#FFFFFF',
                    borderColor: isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)',
                    background: isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.06)',
                    cursor: 'pointer'
                  }}
                >
                  See pricing →
                </button>
              </div>

              {/* Quick trust metrics */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 40, paddingTop: 20, borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid var(--tw-line)' }}>
                <div>
                  <div className="yt-hero-metric-num" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#EF4444' }}>100%</div>
                  <div className="yt-hero-metric-label" style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--tw-text-dim)' }}>Automated Detection</div>
                </div>
                <div style={{ height: 30, width: 1, background: isLight ? 'rgba(0,0,0,0.1)' : 'var(--tw-line)' }} />
                <div>
                  <div className="yt-hero-metric-num" style={{ fontSize: '1.3rem', fontWeight: 900, color: isLight ? '#0284C7' : 'var(--tw-cyan)' }}>2.5Bn+</div>
                  <div className="yt-hero-metric-label" style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--tw-text-dim)' }}>Monthly YouTube Scans</div>
                </div>
                <div style={{ height: 30, width: 1, background: isLight ? 'rgba(0,0,0,0.1)' : 'var(--tw-line)' }} />
                <div>
                  <div className="yt-hero-metric-num" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#22C55E' }}>0%</div>
                  <div className="yt-hero-metric-label" style={{ fontSize: '0.75rem', color: isLight ? '#475569' : 'var(--tw-text-dim)' }}>Effort Required</div>
                </div>
              </div>
            </div>

            {/* Hero Live Audio Fingerprinting Monitor Card with 3D Parallax Tilt */}
            <div 
              className="yt-hero-content-right"
              style={{
                opacity: 1,
                transform: heroRadarCard3DTransform,
                transition: heroMousePos.x === 0 && heroMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            >
              <div 
                className="yt-hero-radar-card card-shimmer-sweep" 
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EF4444', letterSpacing: '0.1em' }}>
                      YOUTUBE CONTENT ID RADAR
                    </div>
                    <div className="yt-heading-text" style={{ fontSize: '1.3rem', fontWeight: 800, color: "var(--tw-text-white)" }}>
                      Audio Fingerprint Matcher
                    </div>
                  </div>
                  <span 
                    className="pill-badge" 
                    style={{ 
                      background: 'rgba(239, 68, 68, 0.12)', 
                      color: '#EF4444', 
                      borderColor: 'rgba(239, 68, 68, 0.35)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span 
                      className="yt-live-dot" 
                      style={{ 
                        width: 7, 
                        height: 7, 
                        borderRadius: '50%', 
                        background: '#EF4444', 
                        display: 'inline-block' 
                      }} 
                    />
                    ACTIVE MATCHING
                  </span>
                </div>

                {/* Live Match 1 */}
                <div 
                  className="yt-match-item"
                  style={{
                    padding: '18px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--tw-line)',
                    marginBottom: 14
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#EF4444', letterSpacing: '0.04em' }}>MATCH IDENTIFIED · 100% MONETIZED</span>
                    <span className="yt-match-views" style={{ fontSize: '0.82rem', fontWeight: 800, color: "var(--tw-text-white)" }}>1.4M VIEWS</span>
                  </div>
                  <div className="yt-match-title" style={{ fontSize: '1rem', fontWeight: 700, color: "var(--tw-text-white)" }}>Dance Choreography Viral Short</div>
                  <div className="yt-match-sub" style={{ fontSize: '0.82rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>Audio match: 0:14 - 0:45. Ad revenue routing to your account.</div>
                </div>

                {/* Live Match 2 */}
                <div 
                  className="yt-match-item"
                  style={{
                    padding: '18px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--tw-line)',
                    marginBottom: 14
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.04em' }}>MATCH IDENTIFIED · FAN LIVE CLIP</span>
                    <span className="yt-match-views" style={{ fontSize: '0.82rem', fontWeight: 800, color: "var(--tw-text-white)" }}>380K VIEWS</span>
                  </div>
                  <div className="yt-match-title" style={{ fontSize: '1rem', fontWeight: 700, color: "var(--tw-text-white)" }}>London Festival Mainstage Live Set</div>
                  <div className="yt-match-sub" style={{ fontSize: '0.82rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>Uploaded by fan. Sound recording verified &amp; claimed.</div>
                </div>

                {/* Live Match 3 */}
                <div 
                  className="yt-match-item"
                  style={{
                    padding: '18px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--tw-line)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#8B5CF6', letterSpacing: '0.04em' }}>CREATOR VLOG BACKGROUND</span>
                    <span className="yt-match-views" style={{ fontSize: '0.82rem', fontWeight: 800, color: "var(--tw-text-white)" }}>820K VIEWS</span>
                  </div>
                  <div className="yt-match-sub" style={{ fontSize: '0.82rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>Full chorus used in intro. Royalties added to monthly report.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY STACKING CARDS SERIES (01 GLOBAL REACH ➔ 05 MASTERCLASS) ── */}
      <div className="yt-stack-wrapper">
        {/* CARD 1: GLOBAL REACH · REGISTER MUSIC */}
        <div className="yt-stack-item yt-stack-item-1 in-view">
          <div className="container">
            <div 
              className="yt-banner-card yt-stack-card glass-panel card-shimmer-sweep" 
              style={{
                borderRadius: 28,
                padding: 'clamp(36px, 6vw, 64px)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, #090D15 100%)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 48,
                alignItems: 'center',
                boxShadow: '0 20px 50px -15px rgba(0,0,0,0.5)'
              }}
            >
              <div>
                <div className="yt-anim-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444', display: 'inline-flex', alignItems: 'center' }}>
                    <span className="yt-step-live-dot" />
                    01 / 05 · GLOBAL REACH
                  </span>
                </div>

                <h2 className="yt-heading-text yt-anim-title" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 18,
                  color: 'var(--tw-text-white)'
                }}>
                  Register music for <br />
                  <span style={{ color: '#EF4444' }}>YouTube Content ID</span>
                </h2>

                <p className="yt-sub-text yt-anim-desc" style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', lineHeight: 1.65, marginBottom: 28 }}>
                  Monetise your music across the entire YouTube platform with Content ID and get paid every time your tracks are featured in any video, short, or live stream.
                </p>

                <div className="yt-anim-btn">
                  <button 
                    onClick={() => onNavigate('/signup')}
                    className="btn-cyan"
                    style={{
                      padding: '14px 32px',
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                      color: "#FFFFFF",
                      border: 'none',
                      boxShadow: '0 10px 25px rgba(239, 68, 68, 0.35)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Get Started Now</span>
                    <ArrowRight size={16} className="btn-icon-hover" />
                  </button>
                </div>
              </div>

              <div 
                className="yt-power-suite-box yt-anim-side" 
                style={{
                  background: '#090D15',
                  borderRadius: 20,
                  padding: '32px',
                  border: '1px solid var(--tw-line)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#EF4444', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                  THE CONTENT ID POWER SUITE
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="yt-interactive-hover-row" style={{ display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 12, border: '1px solid transparent' }}>
                    <CheckCircle2 size={20} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong className="yt-heading-text" style={{ color: "var(--tw-text-white)", fontSize: '0.95rem' }}>Automated Claim Generation</strong>
                      <p className="yt-muted-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.85rem', marginTop: 2 }}>Zero manual searching. Content ID finds and claims clips in real time.</p>
                    </div>
                  </div>
                  <div className="yt-interactive-hover-row" style={{ display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 12, border: '1px solid transparent' }}>
                    <CheckCircle2 size={20} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong className="yt-heading-text" style={{ color: "var(--tw-text-white)", fontSize: '0.95rem' }}>YouTube Shorts Monetization</strong>
                      <p className="yt-muted-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.85rem', marginTop: 2 }}>Collect your rightful share of the YouTube Shorts Creator Pool whenever audio is used.</p>
                    </div>
                  </div>
                  <div className="yt-interactive-hover-row" style={{ display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 12, border: '1px solid transparent' }}>
                    <CheckCircle2 size={20} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong className="yt-heading-text" style={{ color: "var(--tw-text-white)", fontSize: '0.95rem' }}>Artist Channel Whitelisting</strong>
                      <p className="yt-muted-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.85rem', marginTop: 2 }}>Keep your own artist channel claim-free with instant one-click whitelisting.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: WHAT IS YOUTUBE CONTENT ID? */}
        <div className="yt-stack-item yt-stack-item-2">
          <div className="container">
            <div 
              className="yt-banner-card yt-stack-card glass-panel card-shimmer-sweep" 
              style={{
                borderRadius: 28,
                padding: 'clamp(36px, 6vw, 64px)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, #090D15 100%)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 48,
                alignItems: 'center'
              }}
            >
              {/* Visual Callout */}
              <div 
                className="yt-card-surface glass-panel yt-anim-side" 
                style={{
                  borderRadius: 24,
                  padding: '36px',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), #090D15)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.24) 0%, rgba(244, 63, 94, 0.08) 100%)',
                      border: '1px solid rgba(239, 68, 68, 0.38)',
                      boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), 0 6px 18px -3px rgba(239, 68, 68, 0.30)',
                      color: '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Search size={22} strokeWidth={2.2} />
                    </div>
                    <h3 className="yt-heading-text" style={{ fontSize: '1.25rem', fontWeight: 800, color: "var(--tw-text-white)" }}>How Detection Works</h3>
                  </div>

                  {/* Real-Time Equalizer Waveform Animation */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }} title="Acoustic Reference Fingerprint Visualizer">
                    {[12, 22, 8, 26, 15, 20, 9, 25, 17, 11, 26, 13, 19, 7].map((h, i) => (
                      <span 
                        key={i} 
                        className="yt-eq-bar" 
                        style={{ 
                          height: h, 
                          animation: `ytEqBounce 1.${(i % 5) + 1}s ease-in-out infinite ${(i * 0.12).toFixed(2)}s` 
                        }} 
                      />
                    ))}
                  </div>
                </div>

                <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 16 }}>
                  Every second, over 500 hours of video are uploaded to YouTube. The Content ID algorithm parses every incoming audio track, matching pitch, rhythm, waveforms, and spectrums against your original files.
                </p>
                <div 
                  className="yt-sub-box"
                  style={{ 
                    padding: '14px', 
                    borderRadius: 12, 
                    background: 'rgba(239, 68, 68, 0.08)', 
                    border: '1px solid rgba(239, 68, 68, 0.25)', 
                    fontSize: '0.84rem', 
                    color: '#EF4444',
                    fontWeight: 600
                  }}
                >
                  ✓ Works even if audio is pitched, tempo-shifted, or masked by background noise.
                </div>
              </div>

              {/* Text Copy */}
              <div>
                <div className="yt-anim-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444', display: 'inline-flex', alignItems: 'center' }}>
                    <span className="yt-step-live-dot" />
                    02 / 05 · WHAT IS CONTENT ID
                  </span>
                </div>

                <h2 className="yt-heading-text yt-anim-title" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 18,
                  color: 'var(--tw-text-white)'
                }}>
                  What is <br />
                  <span style={{ color: '#EF4444' }}>YouTube Content ID?</span>
                </h2>

                <p className="yt-sub-text yt-anim-desc" style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', lineHeight: 1.65, marginBottom: 20 }}>
                  Content ID lets artists claim royalties whenever their copyrighted music appears on YouTube. This means getting paid each time anyone uploads your performances or uses samples of your music in their videos.
                </p>

                <p className="yt-muted-text yt-anim-btn" style={{ fontSize: '0.96rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                  Instead of issuing manual takedown notices or letting third parties profit from your creative work, Content ID puts revenue generation on complete autopilot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: HOW DOES IT WORK */}
        <div className="yt-stack-item yt-stack-item-3">
          <div className="container">
            <div 
              className="yt-banner-card yt-stack-card glass-panel card-shimmer-sweep" 
              style={{
                borderRadius: 28,
                padding: 'clamp(36px, 6vw, 64px)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(9, 13, 21, 0.98) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 48,
                alignItems: 'center'
              }}
            >
              <div>
                <div className="yt-anim-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444', display: 'inline-flex', alignItems: 'center' }}>
                    <span className="yt-step-live-dot" />
                    03 / 05 · HOW IT WORKS
                  </span>
                </div>

                <h2 className="yt-heading-text yt-anim-title" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 20,
                  color: 'var(--tw-text-white)'
                }}>
                  How does YouTube <br />
                  <span style={{ color: '#EF4444' }}>Content ID work?</span>
                </h2>

                <p className="yt-sub-text yt-anim-desc" style={{ fontSize: '1.12rem', color: 'var(--tw-text-dim)', lineHeight: 1.65, marginBottom: 32 }}>
                  YouTube Content ID uses a digital footprint of your music to find it across the platform. As a verified YouTube partner, Tunewave registers your tracks directly with Content ID, ensuring that every upload featuring your music is identified and linked back to your royalty account.
                </p>

                <div className="yt-anim-btn">
                  <button 
                    onClick={() => onNavigate('/signup')}
                    className="btn-cyan"
                    style={{
                      padding: '16px 36px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      boxShadow: '0 10px 25px rgba(239, 68, 68, 0.35)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Sign up free</span>
                    <ArrowRight size={18} className="btn-icon-hover" />
                  </button>
                </div>
              </div>

              <div 
                className="yt-3way-box yt-anim-side" 
                style={{
                  background: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: 20,
                  padding: '32px',
                  border: '1px solid var(--tw-line)'
                }}
              >
                <h4 className="yt-heading-text" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
                  The 3-Way Advantage:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="yt-3way-item yt-interactive-hover-row" style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #EF4444' }}>
                    <strong className="yt-heading-text" style={{ color: 'var(--tw-text-white)' }}>1. Uninterrupted Fans</strong>
                    <p className="yt-muted-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>
                      Fans can freely make dance videos and covers without getting strikes or account bans.
                    </p>
                  </div>

                  <div className="yt-3way-item yt-interactive-hover-row" style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid var(--tw-cyan)' }}>
                    <strong style={{ color: 'var(--tw-cyan)' }}>2. 100% Monetization</strong>
                    <p className="yt-muted-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>
                      Every single view generated by that creator now pays ad revenue into your pocket.
                    </p>
                  </div>

                  <div className="yt-3way-item yt-interactive-hover-row" style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #8B5CF6' }}>
                    <strong style={{ color: '#8B5CF6' }}>3. Real-Time Tracking</strong>
                    <p className="yt-muted-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)', marginTop: 4 }}>
                      See which songs are trending across YouTube creators and where your audience lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: PROTECT YOUR MUSIC & UNLOCK EXTRA ROYALTIES */}
        <div className="yt-stack-item yt-stack-item-4">
          <div className="container">
            <div 
              className="yt-banner-card yt-stack-card glass-panel card-shimmer-sweep" 
              style={{
                borderRadius: 28,
                padding: 'clamp(36px, 6vw, 64px)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, #090D15 100%)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 48,
                alignItems: 'center'
              }}
            >
              <div>
                <div className="yt-anim-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444', display: 'inline-flex', alignItems: 'center' }}>
                    <span className="yt-step-live-dot" />
                    04 / 05 · Tunewave PRO &amp; LABELS
                  </span>
                </div>

                <h2 className="yt-heading-text yt-anim-title" style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 18,
                  color: 'var(--tw-text-white)'
                }}>
                  Protect your music &amp; <br />
                  <span style={{ color: '#EF4444' }}>unlock extra royalties</span>
                </h2>

                <p className="yt-sub-text yt-anim-desc" style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)', lineHeight: 1.65, marginBottom: 28 }}>
                  Available to all Tunewave Pro and Label artists, YouTube Content ID can be added to any of your releases within the Release Builder. Content ID automatically launches a claim anytime someone uses your copyrighted content without your permission, safeguarding your work on YouTube.
                </p>

                <div className="yt-anim-btn">
                  <button 
                    onClick={() => onNavigate('/signup')}
                    className="btn-cyan"
                    style={{
                      padding: '14px 32px',
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                      color: "#FFFFFF",
                      border: 'none',
                      boxShadow: '0 10px 25px rgba(239, 68, 68, 0.35)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Get started</span>
                    <ArrowRight size={16} className="btn-icon-hover" />
                  </button>
                </div>
              </div>

              <div 
                className="yt-card-surface glass-panel yt-anim-side" 
                style={{
                  borderRadius: 24,
                  padding: '36px',
                  border: '1px solid var(--tw-line)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <h3 className="yt-heading-text" style={{ fontSize: '1.2rem', fontWeight: 800, color: "var(--tw-text-white)", marginBottom: 16 }}>
                  Release Builder Integration:
                </h3>
                <div 
                  className="yt-sub-box yt-interactive-hover-row"
                  style={{ 
                    padding: '16px', 
                    borderRadius: 12, 
                    background: 'rgba(239, 68, 68, 0.06)', 
                    border: '1px solid rgba(239, 68, 68, 0.25)', 
                    marginBottom: 16 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={14} color="#FFF" />
                      </div>
                      <span className="yt-heading-text" style={{ fontWeight: 800, color: "var(--tw-text-white)", fontSize: '0.95rem' }}>YouTube Content ID</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#EF4444', display: 'inline-flex', alignItems: 'center' }}>
                      <span className="yt-step-live-dot" style={{ width: 5, height: 5, marginRight: 4 }} />
                      ACTIVE IN PRO
                    </span>
                  </div>
                  <p className="yt-muted-text" style={{ fontSize: '0.84rem', color: 'var(--tw-text-dim)', marginTop: 8 }}>
                    Checked by default during track submission. Automatic digital fingerprinting upon release.
                  </p>
                </div>

                <p className="yt-sub-text" style={{ fontSize: '0.88rem', color: 'var(--tw-text-dim)', lineHeight: 1.6 }}>
                  Never worry about filling out copyright claim forms or hiring expensive lawyers to track down unauthorized usage. Everything is managed hands-free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: IN-DEPTH MASTERCLASS · YOUTUBE CONTENT ID EXPLAINED */}
        <div className="yt-stack-item yt-stack-item-5">
          <div className="container">
            <div 
              className="yt-banner-card yt-stack-card glass-panel card-shimmer-sweep" 
              style={{
                borderRadius: 28,
                padding: 'clamp(36px, 5vw, 56px)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, #090D15 100%)'
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 36px' }}>
                <div className="yt-anim-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444', display: 'inline-flex', alignItems: 'center' }}>
                    <span className="yt-step-live-dot" />
                    05 / 05 · IN-DEPTH MASTERCLASS
                  </span>
                </div>
                <h2 className="yt-heading-text yt-anim-title" style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 16,
                  color: 'var(--tw-text-white)'
                }}>
                  YouTube Content ID <span style={{ color: '#EF4444' }}>Explained.</span>
                </h2>
                <p className="yt-sub-text yt-anim-desc" style={{ fontSize: '1.1rem', color: 'var(--tw-text-dim)' }}>
                  Explore the rules, rights, and best practices for monetizing your music on YouTube.
                </p>
              </div>

              {/* Guide Tabs */}
              <div className="yt-anim-side" style={{ maxWidth: '960px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
                  {GUIDE_SECTIONS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveGuideTab(tab.id)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: 10,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: activeGuideTab === tab.id ? '1px solid #EF4444' : '1px solid var(--tw-line)',
                        background: activeGuideTab === tab.id ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255,255,255,0.03)',
                        color: activeGuideTab === tab.id ? '#EF4444' : 'var(--tw-text-dim)'
                      }}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                <div 
                  className="yt-card-surface glass-panel" 
                  style={{
                    borderRadius: 20,
                    padding: 'clamp(28px, 4vw, 44px)',
                    border: '1px solid var(--tw-line)',
                    background: 'rgba(255, 255, 255, 0.02)'
                  }}
                >
                  {GUIDE_SECTIONS.find(s => s.id === activeGuideTab)?.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. SECTION 07 · PICTURE BOX ROYALTIES GRID (3D Flip Animation on enter) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444' }}>
                WHERE YOU EARN
              </span>
            </div>
            <h2 className="yt-heading-text" style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              YouTube Content ID <span style={{ color: '#EF4444' }}>Royalties:</span>
            </h2>
          </div>

          <div 
            ref={royaltyBoxesRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
              perspective: 1200
            }}
          >
            {ROYALTY_BOXES.map((box, idx) => {
              const IconComp = box.icon;
              return (
                <div 
                  key={idx}
                  className={`yt-card-surface glass-panel card-shimmer-sweep yt-flip-item ${royaltyBoxesInView ? 'in-view' : ''}`}
                  style={{
                    borderRadius: 20,
                    padding: '36px 30px',
                    border: '1px solid var(--tw-line)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    animationDelay: `${0.12 + idx * 0.16}s`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: box.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${box.color}40`
                      }}>
                        <IconComp size={22} />
                      </div>
                      <span 
                        className="yt-sub-box"
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
                        {box.tag}
                      </span>
                    </div>

                    <h3 className="yt-heading-text" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                      {box.title}
                    </h3>

                    <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      {box.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: 24, paddingTop: 14, borderTop: '1px solid var(--tw-line)', display: 'flex', alignItems: 'center', gap: 6, color: box.color, fontSize: '0.82rem', fontWeight: 700 }}>
                    <CheckCircle2 size={15} color={box.color} /> Auto-Claimed 24/7
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. SECTION 08 · 3-STEP TIMELINE (3D Flip Animation on enter) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444' }}>
                HOW IT WORKS
              </span>
            </div>
            <h2 className="yt-heading-text" style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              How does YouTube <br />
              <span style={{ color: '#EF4444' }}>Content ID work?</span>
            </h2>
            <p className="yt-sub-text" style={{ fontSize: '1.15rem', color: 'var(--tw-text-dim)' }}>
              Making sure your music is protected and identified across YouTube is simple with Tunewave.
            </p>
          </div>

          <div 
            ref={timelineRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 28,
              perspective: 1200
            }}
          >
            {TIMELINE_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className={`yt-card-surface glass-panel card-shimmer-sweep yt-flip-item ${timelineInView ? 'in-view' : ''}`}
                style={{
                  borderRadius: 20,
                  padding: '36px 30px',
                  border: '1px solid var(--tw-line)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  animationDelay: `${0.12 + idx * 0.16}s`
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <span style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: '#EF4444',
                      fontFamily: 'monospace'
                    }}>
                      {step.num}
                    </span>
                    <span 
                      className="yt-sub-box"
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

                  <h3 className="yt-heading-text" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 12 }}>
                    {step.title}
                  </h3>

                  <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>

                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                  <span 
                    onClick={() => onNavigate('/signup')}
                    style={{ cursor: 'pointer', color: '#EF4444', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    Claim your audio →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTENT ID FAQS (3D Flip Animation on enter) */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge" style={{ color: '#EF4444', borderColor: '#EF4444' }}>
                ANSWERS &amp; ASSISTANCE
              </span>
            </div>
            <h2 className="yt-heading-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--tw-text-white)', marginBottom: 16 }}>
              YouTube Content ID <span style={{ color: '#EF4444' }}>FAQs</span>
            </h2>
            <p className="yt-sub-text" style={{ color: 'var(--tw-text-dim)', fontSize: '1.05rem' }}>
              Common questions about claims, whitelisting channels, cover songs, and receiving payments.
            </p>
          </div>

          <div 
            ref={faqRef}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, perspective: 1200 }}
          >
            {CONTENT_ID_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`yt-faq-card glass-panel yt-flip-item ${faqInView ? 'in-view' : ''}`}
                  style={{
                    borderRadius: 16,
                    border: isOpen ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--tw-line)',
                    background: isOpen ? 'rgba(239, 68, 68, 0.04)' : 'rgba(255, 255, 255, 0.02)',
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
                    <span className="yt-faq-title">{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                        color: isOpen ? '#EF4444' : 'var(--tw-text-dim)',
                        flexShrink: 0,
                        marginLeft: 16
                      }} 
                    />
                  </button>

                  {isOpen && (
                    <div 
                      className="yt-faq-answer"
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

      {/* 10. BOTTOM CTA STRIP WITH 3D BACKGROUND PARALLAX */}
      <section style={{ padding: '60px 0 20px', overflow: 'hidden' }}>
        <div className="container">
          <div 
            ref={ctaRef}
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="yt-cta-card-wrap card-shimmer-sweep"
            style={{
              transform: ctaCard3DTransform,
              transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 
                ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease' 
                : 'transform 0.12s ease-out, border-color 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            {/* 3D Background Image Canvas with Parallax */}
            <div 
              className="yt-cta-3d-bg" 
              style={{
                transform: ctaBg3DTransform,
                transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 
                  ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' 
                  : 'transform 0.12s ease-out'
              }}
            />

            {/* Ambient Lighting & Contrast Gradient Overlay */}
            <div className="yt-cta-overlay" />

            {/* Dynamic Interactive Mouse Spotlight Glare */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
                background: `radial-gradient(circle 500px at ${(ctaMousePos.x + 1) * 50}% ${(ctaMousePos.y + 1) * 50}%, ${isLight ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.2)'}, transparent 75%)`,
                mixBlendMode: isLight ? 'multiply' : 'screen'
              }}
            />

            {/* Floating 3D Music Notes with Parallax Levitation */}
            <div 
              className="yt-floating-note-1"
              style={{
                position: 'absolute',
                top: 36,
                left: '12%',
                transform: `translate3d(${ctaMousePos.x * 24}px, ${ctaMousePos.y * 18}px, 50px)`,
                color: '#EF4444',
                opacity: isLight ? 0.75 : 0.85,
                filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.6))',
                pointerEvents: 'none',
                zIndex: 4
              }}
            >
              <Music size={32} />
            </div>

            <div 
              className="yt-floating-note-2"
              style={{
                position: 'absolute',
                bottom: 40,
                right: '14%',
                transform: `translate3d(${ctaMousePos.x * -20}px, ${ctaMousePos.y * -16}px, 45px)`,
                color: isLight ? '#EF4444' : 'var(--tw-cyan)',
                opacity: isLight ? 0.65 : 0.8,
                filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))',
                pointerEvents: 'none',
                zIndex: 4
              }}
            >
              <Sparkles size={28} />
            </div>

            {/* Content Layer in 3D Space */}
            <div 
              className="yt-cta-content"
              style={{
                transform: ctaContent3DTransform,
                transition: ctaMousePos.x === 0 && ctaMousePos.y === 0 ? 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1)' : 'transform 0.12s ease-out'
              }}
            >
              <h2 className="yt-cta-title" style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 18,
                color: isLight ? '#0F172A' : '#FFFFFF'
              }}>
                Ready to release? <br />
                <span style={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Get started in 60 seconds.
                </span>
              </h2>

              <p className="yt-cta-sub" style={{ fontSize: '1.15rem', color: isLight ? '#1E293B' : 'var(--tw-text-dim)', maxWidth: '640px', margin: '0 auto 36px', lineHeight: 1.6 }}>
                Protect every track across YouTube, Spotify, and 150+ stores. Keep 100% of your earnings.
              </p>

              <button 
                onClick={() => onNavigate('/signup')}
                className="btn-cyan"
                style={{
                  padding: '18px 44px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 12px 30px -8px rgba(239, 68, 68, 0.45)',
                  cursor: 'pointer'
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
