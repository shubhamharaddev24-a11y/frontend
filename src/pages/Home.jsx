import React, { useMemo, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useMotionVariants } from "../utils/motion";
import AnimatedHero from "../components/AnimatedHero";
import ParallaxSection from "../components/ParallaxSection";
import MagneticButton from "../components/MagneticButton";
import RevealOnScroll from "../components/RevealOnScroll";
import OptimizedImage from "../components/OptimizedImage";
import PhotoCounter from "../components/PhotoCounter";
import VideoTestimonials from "../components/VideoTestimonials";
import AnimatedServiceCard from "../components/AnimatedServiceCard";
import SplitText from "../components/SplitText";
import {
  Code,
  TrendingUp,
  Camera,
  Palette,
  Laptop,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const [activeService, setActiveService] = useState(null);
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.15 });

  const servicesList = useMemo(() => [
    {
      name: "Web Development Division",
      points: [
        "Custom Full-Stack web applications (MERN)",
        "Corporate portfolio websites & high-converting landing pages",
        "Digital wedding invitation sites with RSVP and maps",
      ],
      mainIcon: Code,
      themeColor: "#ff7a18",
      shadowColor: "rgba(255, 122, 24, 0.25)"
    },
    {
      name: "Digital Marketing & SEO",
      points: [
        "Google Business Profile optimization and local map ranking",
        "On-page & Off-page SEO to drive organic Google search traffic",
        "Social media growth & production (Instagram Reels & YouTube)",
      ],
      mainIcon: TrendingUp,
      themeColor: "#3b82f6",
      shadowColor: "rgba(59, 130, 246, 0.25)"
    },
    {
      name: "Media Division (Shubham Photos Studio)",
      points: [
        "Cinematic wedding films, trailers, and traditional photography",
        "Scenic sunset outdoor pre-wedding & baby portraits",
        "Instant passport printing, photo scanning & framing in Saralgaon",
      ],
      mainIcon: Camera,
      themeColor: "#10b981",
      shadowColor: "rgba(16, 185, 129, 0.25)"
    },
    {
      name: "Graphic Design & Branding",
      points: [
        "Political campaign banners, rally posters & flex designs",
        "Marathi Lagna-Patrika and event cards (traditional & modern)",
        "Visiting cards, brochures, and corporate brand designs",
      ],
      mainIcon: Palette,
      themeColor: "#a855f7",
      shadowColor: "rgba(168, 85, 247, 0.25)"
    },
    {
      name: "Cyber Desk & DTP Services",
      points: [
        "Professional biodata and marriage resume creation",
        "Student CV/resumes and online job applications",
        "Aadhaar, PAN, and local e-governance service support",
      ],
      mainIcon: Laptop,
      themeColor: "#ec4899",
      shadowColor: "rgba(236, 72, 153, 0.25)"
    }
  ], []);

  return (
    <div className="bg-brandBg text-brandTextPrimary">
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Quick service highlights with parallax */}
      <ParallaxSection
        className="border-y border-brandBorder/70 bg-brandSurfaceSoft/60 py-12"
        speed={0.2}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          {[
            {
              title: "Wedding photography & films",
              body: "Full-day coverage, village baraat, traditional rituals and cinematic couple moments.",
            },
            {
              title: "Prints, albums & DTP",
              body: "Passport photos, instant prints, album design, biodata and resume creation.",
            },
            {
              title: "Banners, cards & digital",
              body: "Wedding cards, political banners, flex posters and future-ready cyber desk.",
            },
          ].map((item, index) => (
            <RevealOnScroll
              key={item.title}
              delay={index * 0.1}
              direction="up"
              className="flex-1 space-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandAccentSoft">
                {item.title}
              </p>
              <p className="text-xs text-brandTextMuted">{item.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </ParallaxSection>

      {/* Services summary */}
      <section className="bg-brandBg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={0.2} direction="up" className="mb-8 text-center sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
              Divisions & Services
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
              <SplitText>High-level media, technology and marketing services.</SplitText>
            </h2>
            <p className="mt-3 text-sm text-brandTextMuted sm:text-base">
              Powering local and digital growth through customized web development, local SEO marketing, custom print branding, and professional cinematic films.
            </p>
          </RevealOnScroll>

          <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service, index) => (
              <AnimatedServiceCard
                key={service.name}
                index={index}
                name={service.name}
                points={service.points}
                mainIcon={service.mainIcon}
                themeColor={service.themeColor}
                shadowColor={service.shadowColor}
                onClick={() => setActiveService(service)}
                reveal={isGridInView}
              />
            ))}
            {/* Custom CTA card matching layout style with firework entrance */}
            <motion.div
              initial={{ opacity: 0, x: -120, y: -100, scale: 0.1, rotate: 8 }}
              animate={isGridInView ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : { opacity: 0, x: -120, y: -100, scale: 0.1, rotate: 8 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 11,
                mass: 1,
                delay: 5 * 0.1
              }}
              className="hidden lg:block p-[1px] rounded-2xl bg-brandBorder/60 transition-all duration-500 hover:bg-brandBorder"
            >
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-brandSurface/30 via-brandBg to-brandSurfaceSoft/40 p-6 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-radial-gradient from-brandAccent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandAccentSoft">
                    Need Custom Solutions?
                  </p>
                  <h3 className="text-lg font-bold text-brandTextPrimary leading-snug">
                    Let's design and build something special together.
                  </h3>
                  <p className="text-xs text-brandTextMuted leading-relaxed font-light">
                    Have a custom project requirement in mind? From custom branding designs to complex web dashboards and enterprise local marketing, we have you covered.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-brandBorder/40 relative z-10">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandAccent hover:text-brandAccentSoft transition-all duration-300 group"
                  >
                    <span>Start a conversation</span>
                    <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Counter Section */}
      <PhotoCounter />

      {/* Featured work preview */}
      <section className="bg-brandSurface py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={0.4} direction="up" className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
                Featured work
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
                Real couples, real village stories.
              </h2>
              <p className="mt-3 text-sm text-brandTextMuted sm:max-w-md">
                A quick glimpse of weddings, pre-wedding shoots and banner designs
                captured by our team.
              </p>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-semibold text-brandAccent hover:text-brandAccentSoft"
            >
              Open full gallery →
            </Link>
          </RevealOnScroll>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Evening wedding in the village temple",
                image:
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=80",
              },
              {
                title: "Pre-wedding by the fields at sunset",
                image:
                  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&auto=format&fit=crop&q=80",
              },
              {
                title: "Colourful flex banners for local events",
                image:
                  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=900&auto=format&fit=crop&q=80",
              },
            ].map((item, index) => (
              <RevealOnScroll
                key={item.title}
                delay={0.5 + index * 0.1}
                direction="scale"
                className="group relative overflow-hidden rounded-2xl border border-brandBorder/70 bg-black"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brandAccentSoft">
                    Featured frame
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <VideoTestimonials />

      {/* Trust + contact CTA */}
      <section className="bg-brandBg py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <RevealOnScroll delay={0.7} direction="left" className="flex-1 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
              Creative Agency & Local Studio
            </p>
            <h2 className="text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
              <SplitText>A team that answers every day — for code, marketing, or photography.</SplitText>
            </h2>
            <p className="text-sm text-brandTextMuted sm:text-base">
              Whether you need to scale your online business with full-stack web applications, run Google marketing campaigns, or book premium cinematography for a family wedding, we manage your media and digital needs with utmost care.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.8} direction="right" className="flex flex-1 flex-col gap-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandTextMuted">
              Visit or call
            </p>
            <p className="text-sm text-brandTextMuted">
              Located on the main bazaar near the bus stand, opposite to saralgaon police chowki, murbad.
              Our photography division counters are fully active daily.
            </p>
            <p className="text-sm">
              Phone:{" "}
              <span className="font-semibold text-brandTextPrimary">+91 92714 56749</span>
            </p>
            <p className="text-sm text-brandTextMuted">
              Everyday timings: <span className="text-brandTextPrimary">9:00 AM – 8:00 PM</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <MagneticButton
                href="tel:9271456749"
                className="flex-1 items-center justify-center rounded-full bg-brandAccent px-6 py-2.5 text-xs font-semibold text-black shadow-md shadow-brandAccent/30 hover:bg-brandAccentSoft sm:text-sm"
              >
                Call Shubham Media
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="flex-1 items-center justify-center rounded-full border border-brandAccent/60 bg-brandSurface px-6 py-2.5 text-xs font-semibold text-brandAccent hover:bg-brandSurfaceSoft sm:text-sm"
              >
                Open contact details
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Morphing Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={() => setActiveService(null)} />
            
            <motion.div
              layoutId={`service-card-${activeService.name}`}
              className="relative w-full max-w-lg rounded-3xl border border-brandBorder bg-brandSurface p-6 shadow-2xl z-10"
              style={{
                "--card-theme-color": activeService.themeColor,
                "--card-shadow-color": activeService.shadowColor
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-brandBorder bg-brandSurfaceSoft text-brandTextMuted hover:text-brandTextPrimary hover:scale-105 transition-all"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="space-y-5">
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--card-theme-color)] bg-brandSurfaceSoft text-[var(--card-theme-color)]">
                    {React.createElement(activeService.mainIcon, { size: 22 })}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: activeService.themeColor }}>
                      Division Details
                    </p>
                    <h3 className="text-xl font-bold text-brandTextPrimary">
                      {activeService.name}
                    </h3>
                  </div>
                </div>

                <hr className="border-brandBorder/60" />

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brandTextMuted">
                    Core Capabilities & Features
                  </p>
                  <ul className="space-y-2.5 text-sm text-brandTextMuted">
                    {activeService.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: activeService.themeColor }} />
                        <span className="leading-relaxed font-light">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-brandBorder/40 flex gap-3">
                  <Link
                    to="/services"
                    className="flex-1 text-center rounded-full bg-[var(--card-theme-color)] py-2.5 text-xs font-semibold text-black hover:brightness-110 transition-all"
                  >
                    Explore all details
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 text-center rounded-full border border-brandBorder bg-brandSurfaceSoft py-2.5 text-xs font-semibold text-brandTextPrimary hover:bg-brandSurface transition-all"
                  >
                    Get instant quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
