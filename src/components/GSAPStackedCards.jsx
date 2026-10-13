import React, { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GSAPStackedCards.css";

gsap.registerPlugin(ScrollTrigger);

const cardVisuals = [
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    badge: "MERN Stack • Architecture",
    heading: "High-Performance Modern Web Systems",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    badge: "Google Business • Local Map SEO",
    heading: "Rank #1 & Drive Targeted Local Traffic",
  },
  {
    image: "/images/wedding-varmala-moment.png",
    badge: "Cinematography & Studio Framing",
    heading: "Preserving Authentic Celebrations",
  },
  {
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80",
    badge: "Brand Identity • Print & Flex",
    heading: "Visuals That Command Unmatched Attention",
  },
  {
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80",
    badge: "Saralgaon Digital Desk",
    heading: "Essential Citizen & e-Governance Services",
  },
];

const GSAPStackedCards = ({ services = [], onSelectService }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    // Connect GSAP with Lenis if available
    const lenis = window.lenis;
    const lenisHandler = () => ScrollTrigger.update();
    if (lenis) {
      lenis.on("scroll", lenisHandler);
    }

    const triggers = [];

    cards.forEach((card, index) => {
      // For all cards except the top/last card: scale down and dim as next cards scroll over
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        const anim = gsap.to(card, {
          scale: 0.93 - (cards.length - 1 - index) * 0.015,
          filter: "brightness(0.82)",
          y: -12 * (cards.length - 1 - index),
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom-=100",
            end: "top top+=140",
            scrub: true,
            id: `stack-anim-${index}`,
          },
        });

        if (anim.scrollTrigger) {
          triggers.push(anim.scrollTrigger);
        }
      }
    });

    return () => {
      if (lenis) {
        lenis.off("scroll", lenisHandler);
      }
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [services]);

  return (
    <section className="stacked-cards-section border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60">
      {/* Section Header */}
      <div className="stacked-cards-intro">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C6B] dark:text-[#D4AF37] mb-2 flex items-center justify-center gap-1.5">
          <Sparkles size={14} />
          Full Capabilities
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F2EDE4] font-normal leading-tight">
          Media, Technology & Digital Divisions
        </h2>
        <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed mt-3">
          From high-end wedding films and portraits to full-stack web applications, local SEO, and print designs.
        </p>
      </div>

      {/* GSAP Stacked Cards Track */}
      <div className="stacked-cards-track" ref={containerRef}>
        {services.map((service, index) => {
          const Icon = service.mainIcon;
          const visual = cardVisuals[index % cardVisuals.length];
          const stickyTop = 100 + index * 16; // Incremental sticky offset for tactile card fan

          return (
            <div
              key={service.name}
              ref={(el) => (cardRefs.current[index] = el)}
              className="stacked-card"
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 1,
              }}
            >
              <div className="stacked-card-inner">
                {/* Left Content Side */}
                <div className="stacked-card-content">
                  <div>
                    <div className="stacked-card-header">
                      <span className="stacked-card-number">
                        0{index + 1} / 0{services.length}
                      </span>
                      {Icon && (
                        <div className="stacked-card-icon-wrap">
                          <Icon size={22} />
                        </div>
                      )}
                    </div>

                    <h3 className="stacked-card-title">{service.name}</h3>

                    <ul className="stacked-card-points">
                      {service.points.map((point, i) => (
                        <li key={i} className="stacked-card-point">
                          <span className="stacked-card-bullet">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stacked-card-footer">
                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(service)}
                      className="stacked-card-btn"
                    >
                      <span>Inquire / View Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Right Visual Side */}
                <div className="stacked-card-visual">
                  <img
                    src={visual.image}
                    alt={service.name}
                    className="stacked-card-visual-bg"
                  />
                  <div className="stacked-card-visual-overlay">
                    <span className="stacked-card-visual-badge">
                      {visual.badge}
                    </span>
                    <h4 className="stacked-card-visual-heading">
                      {visual.heading}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GSAPStackedCards;
