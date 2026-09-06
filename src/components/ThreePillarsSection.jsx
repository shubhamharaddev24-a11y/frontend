import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Camera, Code2, Users2, Sparkles, Cpu, Handshake } from "lucide-react";
import "./ThreePillarsSection.css";

const pillars = [
  {
    id: "create",
    badge: "Pillar 01",
    name: "CREATE",
    tagline: "Photography • Video • Design • Branding",
    desc: "Capturing cinematic wedding films, timeless heirloom photography, and high-impact graphic branding that moves people.",
    points: [
      "Traditional & Cinematic Wedding Films",
      "Scenic Outdoor Pre-Wedding Sessions",
      "Brand Identity, Logo & Print Stationery",
      "Heirloom Photo Framing & Restoration",
    ],
    icon: Camera,
    accentIcon: Sparkles,
    route: "/services#photography",
    color: "#A67C6B",
    mediaImage: "/images/prewedding-palace-arch.jpg",
    mediaBadge: "Cinematography & Heirloom Photography",
    mediaHeadline: "Preserving Moments That Echo Forever",
    objectPosition: "center 28%",
  },
  {
    id: "innovate",
    badge: "Pillar 02",
    name: "INNOVATE",
    tagline: "Web Development • AI • Digital Solutions • Marketing",
    desc: "Architecting modern full-stack web applications, AI-assisted tools, local SEO ranking, and data-driven lead generation.",
    points: [
      "MERN Stack & React Web Applications",
      "Local SEO & Google Business Rank #1",
      "Social Media Growth & Ad Campaigns",
      "Interactive Digital Wedding Invitations",
    ],
    icon: Code2,
    accentIcon: Cpu,
    route: "/services#web-dev",
    color: "#8C6A5A",
    mediaImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85",
    mediaBadge: "Full-Stack Technology & SEO",
    mediaHeadline: "High-Performance Modern Web Systems",
    objectPosition: "center 35%",
  },
  {
    id: "connect",
    badge: "Pillar 03",
    name: "CONNECT",
    tagline: "Clients ↔ Creators ↔ Businesses",
    desc: "The seamless bridge between clients, creative directors, and growing enterprises, backed by our trusted local digital desk.",
    points: [
      "Direct Creative Collaboration & Consultation",
      "B2B Growth & Local Business Partnerships",
      "Cyber Desk & Essential e-Governance Services",
      "End-to-End Delivery & Transparent Communication",
    ],
    icon: Users2,
    accentIcon: Handshake,
    route: "/contact",
    color: "#725345",
    mediaImage: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1200&auto=format&fit=crop&q=85",
    mediaBadge: "Creative Consultation & Partnerships",
    mediaHeadline: "Connecting Passion, Vision & Community",
    objectPosition: "center 25%",
  },
];

const ThreePillarsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef(null);
  const PIN_TOP = 92; // Synchronized with CSS sticky top: 92px

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) return;

          const rect = trackRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalScrollDistance = rect.height - windowHeight;

          // Effective scroll distance once card pins at top: PIN_TOP
          const scrollDistance = PIN_TOP - rect.top;

          if (scrollDistance <= 0) {
            setActiveIndex(0);
            setScrollProgress(0);
          } else if (scrollDistance >= totalScrollDistance) {
            setActiveIndex(pillars.length - 1);
            setScrollProgress(1);
          } else {
            const progress = Math.min(Math.max(scrollDistance / totalScrollDistance, 0), 1);
            setScrollProgress(progress);

            if (progress < 0.33) {
              setActiveIndex(0);
            } else if (progress < 0.67) {
              setActiveIndex(1);
            } else {
              setActiveIndex(2);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const lenis = window.lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  const handlePillClick = (index) => {
    setActiveIndex(index); // Instant responsive visual feedback

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

      {/* 2. Desktop Sticky Scroll Section Runway */}
      <div className="pillars-sticky-track" ref={trackRef}>
        <div className="pillars-sticky-window">
          <div className="pillars-card-shell">
            {/* Top Subtle Scroll Progress Line */}
            <div className="pillar-progress-track">
              <div
                className="pillar-progress-fill"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>

            {/* Left Column: Interactive Content Tabs */}
            <div className="pillar-left-panel">
              {/* Step Navigation Pills & Status */}
              <div className="pillar-pills-row">
                <div className="pillar-pills-group">
                  {pillars.map((pillar, idx) => (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => handlePillClick(idx)}
                      className={`pillar-pill-btn ${
                        activeIndex === idx ? "is-active" : ""
                      }`}
                      aria-label={`Jump to ${pillar.name}`}
                    >
                      <span>0{idx + 1}</span>
                      <span>{pillar.name}</span>
                    </button>
                  ))}
                </div>
                <span className="pillar-scroll-hint">
                  0{activeIndex + 1} / 03
                </span>
              </div>

              {/* Morphing Tab Content */}
              <div className="pillar-tab-stage">
                {pillars.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className={`pillar-tab-slide ${
                      activeIndex === idx ? "is-active" : ""
                    }`}
                  >
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
                ))}
              </div>

              {/* Dynamic CTA Button with Dual-Arrow Micro-Animation */}
              <div className="pillar-bottom-bar">
                <Link
                  to={pillars[activeIndex].route}
                  className="pillar-cta-btn"
                >
                  <span className="pillar-cta-text">
                    Explore {pillars[activeIndex].name}
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

            {/* Right Column: Morphing Media Visual Canvas */}
            <div className="pillar-right-panel">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className={`pillar-media-slide ${
                    activeIndex === idx ? "is-active" : ""
                  }`}
                >
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
              ))}
            </div>
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
