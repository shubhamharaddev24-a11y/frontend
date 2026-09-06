import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Film,
  Code2,
  Sparkles,
  Users2,
  Handshake,
  CheckCircle2,
  Layers,
  Zap,
} from "lucide-react";
import "./ThreePillarsSection.css";

const pillars = [
  {
    id: "create",
    number: "01",
    name: "CREATE",
    badge: "Media Studio • Visual Arts",
    tagline: "Photography • Films • Traditional Design",
    desc: "Preserving human emotion and heritage through cinematic wedding films, portraiture, and high-impact traditional and modern graphic art.",
    points: [
      "Cinematic 4K Wedding Films & Drone Cinematography",
      "Sunset Outdoor Pre-Wedding & Candid Couple Portraits",
      "Traditional Marathi Lagna-Patrika, Banners & Flex Design",
      "Studio Portraits, Passport Printing & Archival Framing",
    ],
    icon: Camera,
    accentIcon: Film,
    route: "/gallery",
    color: "#A67C6B",
    mediaImage: "/images/wedding-varmala-moment.png",
    mediaBadge: "4K Cinema & Film Studio",
    mediaHeadline: "Heirloom Stories Captured with Artistic Soul",
    objectPosition: "center 20%",
  },
  {
    id: "innovate",
    number: "02",
    name: "INNOVATE",
    badge: "Tech Division • Software Systems",
    tagline: "Web Development • AI • Digital Solutions • Marketing",
    desc: "Architecting modern full-stack web applications, AI-assisted tools, local SEO ranking, and data-driven lead generation.",
    points: [
      "Custom MERN Stack Web Applications with sub-second loads",
      "Local SEO Optimization & Google Business Profile #1 Rank",
      "Targeted Social Media Ad Production (Reels & Shorts)",
      "Interactive Digital Wedding Invitation Portals with RSVP",
    ],
    icon: Code2,
    accentIcon: Sparkles,
    route: "/services",
    color: "#D4A373",
    mediaImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85",
    mediaBadge: "Full-Stack Technology & SEO",
    mediaHeadline: "High-Performance Modern Web Systems",
    objectPosition: "center 30%",
  },
  {
    id: "connect",
    number: "03",
    name: "CONNECT",
    badge: "Ecosystem • Marketplace Exchange",
    tagline: "Marketplace • Creators • Businesses • Cyber Desk",
    desc: "Bridging local talent with commercial demand through verified freelancer matching, milestone escrow protection, and community cyber support.",
    points: [
      "Decentralized Creator Exchange connecting clients with talent",
      "100% Secure Milestone Escrow Payments with zero early fees",
      "Cyber Desk & DTP Services (Biodata, CVs & E-Governance)",
      "Collaborative creator studios for Thane & Murbad artists",
    ],
    icon: Users2,
    accentIcon: Handshake,
    route: "/contact",
    color: "#725345",
    mediaImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=85",
    mediaBadge: "Creative Consultation & Partnerships",
    mediaHeadline: "Connecting Passion, Vision & Community",
    objectPosition: "center 25%",
  },
];

const ThreePillarsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const trackRef = useRef(null);
  const sliderRef = useRef(null);
  const progressFillRef = useRef(null);
  const PIN_TOP = 92; // Synchronized with CSS sticky top: 92px

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current || !sliderRef.current) return;

          const rect = trackRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalScrollDistance = rect.height - windowHeight;

          // Effective scroll distance once track pins at top: PIN_TOP
          const scrollDistance = PIN_TOP - rect.top;

          let progress = 0;
          if (scrollDistance <= 0) {
            progress = 0;
          } else if (scrollDistance >= totalScrollDistance) {
            progress = 1;
          } else {
            progress = Math.min(Math.max(scrollDistance / totalScrollDistance, 0), 1);
          }

          // Direct hardware-accelerated horizontal translation of the container
          const parentWidth = sliderRef.current.parentElement ? sliderRef.current.parentElement.clientWidth : window.innerWidth;
          const maxSlide = Math.max(0, sliderRef.current.scrollWidth - parentWidth);
          const currentTranslateX = progress * maxSlide;
          sliderRef.current.style.transform = `translate3d(-${currentTranslateX}px, 0, 0)`;

          // Progress fill line
          if (progressFillRef.current) {
            progressFillRef.current.style.transform = `scaleX(${progress})`;
          }

          // Active pillar index for pill navigation
          const nextIndex = progress < 0.35 ? 0 : progress < 0.70 ? 1 : 2;
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const lenis = window.lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handlePillClick = (index) => {
    setActiveIndex(index);

    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const totalScrollDistance = rect.height - windowHeight;

    const targetFraction = index / (pillars.length - 1 || 1);
    const targetScrollY =
      currentScrollY +
      rect.top -
      PIN_TOP +
      targetFraction * totalScrollDistance +
      15;

    if (window.lenis) {
      window.lenis.scrollTo(targetScrollY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  };

  return (
    <section className="pillars-section-wrapper border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60">
      {/* 1. Framework Intro Header */}
      <div className="pillars-intro">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase bg-[#A67C6B]/15 text-[#A67C6B] border border-[#A67C6B]/25 mb-3">
          The CREAONNECT Framework • (CREATE + CONNECT)
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F2EDE4] font-normal leading-tight">
          Three Pillars of Modern Excellence
        </h2>
        <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed mt-3 max-w-2xl mx-auto">
          We bring together artistic imagination, cutting-edge software engineering, and authentic community connections under one unified creative ecosystem.
        </p>
      </div>

      {/* 2. Desktop Sticky Scroll Section Runway with Horizontal Sliding Containers */}
      <div className="pillars-sticky-track" ref={trackRef}>
        <div className="pillars-sticky-window">
          {/* Top Subtle Scroll Progress Line */}
          <div className="pillar-progress-track">
            <div
              ref={progressFillRef}
              className="pillar-progress-fill"
            />
          </div>

          {/* HORIZONTAL SLIDING TRACK: Containers slide smoothly to the side as you scroll */}
          <div className="pillars-slider-track" ref={sliderRef}>
            {pillars.map((pillar, idx) => (
              <div key={pillar.id} className="pillars-card-shell">
                {/* Left Column: Interactive Content Tabs */}
                <div className="pillar-left-panel">
                  {/* Step Navigation Pills & Status */}
                  <div className="pillar-pills-row">
                    <div className="pillar-pills-group">
                      {pillars.map((p, pIdx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handlePillClick(pIdx)}
                          className={`pillar-pill-btn ${
                            activeIndex === pIdx ? "is-active" : ""
                          }`}
                          aria-label={`Jump to ${p.name}`}
                        >
                          <span>0{pIdx + 1}</span>
                          <span>{p.name}</span>
                        </button>
                      ))}
                    </div>
                    <span className="pillar-scroll-hint">
                      0{idx + 1} / 03
                    </span>
                  </div>

                  {/* Pillar Card Content */}
                  <div className="pillar-tab-stage">
                    <div className="pillar-tab-slide is-active">
                      <span className="pillar-badge-tag">{pillar.badge}</span>
                      <h3 className="pillar-title">{pillar.name}</h3>
                      <p className="pillar-tagline">{pillar.tagline}</p>
                      <div className="pillar-divider" />
                      <p className="pillar-desc">{pillar.desc}</p>
                      <ul className="pillar-points-list">
                        {pillar.points.map((pt, i) => (
                          <li key={i} className="pillar-point-item">
                            <span className="pillar-point-dot">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Dynamic CTA Button with Dual-Arrow Animation */}
                  <div className="pillar-bottom-bar">
                    <Link
                      to={pillar.route}
                      className="pillar-cta-btn"
                    >
                      <span className="pillar-cta-text">
                        Explore {pillar.name}
                      </span>
                      <div className="pillar-cta-icon-wrap">
                        <div className="pillar-cta-icon _1">
                          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.66699 11.3332L11.3337 4.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.66699 4.6665H11.3337V11.3332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="pillar-cta-icon _2">
                          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.66699 11.3332L11.3337 4.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.66699 4.6665H11.3337V11.3332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div className="pillar-cta-bg-bubble" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: High-Res Media Visual Canvas */}
                <div className="pillar-right-panel">
                  <div className="pillar-media-slide is-active">
                    <img
                      src={pillar.mediaImage}
                      alt={pillar.name}
                      className="pillar-media-img"
                      style={{ objectPosition: pillar.objectPosition || "center center" }}
                    />
                    <div className="pillar-media-overlay">
                      <span className="pillar-media-badge">
                        {pillar.mediaBadge}
                      </span>
                      <h4 className="pillar-media-headline">
                        {pillar.mediaHeadline}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mobile Fallback (Clean Stacked Cards on Mobile Screens) */}
      <div className="pillars-mobile-stack px-4 pb-16">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="pillar-mobile-card">
            <div className="pillar-mobile-media-wrap">
              <img
                src={pillar.mediaImage}
                alt={pillar.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: pillar.objectPosition || "center center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-[11px] font-semibold tracking-wider text-white uppercase bg-black/50 px-2.5 py-1 rounded">
                  {pillar.mediaBadge}
                </span>
              </div>
            </div>
            <div className="pillar-mobile-content-wrap">
              <span className="text-[11px] font-mono font-bold text-[#A67C6B] uppercase tracking-wider">
                {pillar.badge}
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F2EDE4] mt-1">
                {pillar.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A67C6B] mt-0.5 mb-3">
                {pillar.tagline}
              </p>
              <p className="text-xs text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed mb-4">
                {pillar.desc}
              </p>
              <ul className="space-y-2 mb-5 border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60 pt-3">
                {pillar.points.map((pt, i) => (
                  <li key={i} className="text-xs text-[#4A4A4A] dark:text-[#B8ABA0] flex items-start gap-1.5 font-light">
                    <span className="text-[#A67C6B]">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={pillar.route}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 border border-[#A67C6B] text-[#1A1A1A] dark:text-[#F2EDE4] rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#A67C6B] hover:text-white transition-colors"
              >
                <span>Explore {pillar.name}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreePillarsSection;
