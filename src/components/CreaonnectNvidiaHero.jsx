import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  Zap,
  Code2,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle,
  Play,
  TrendingUp,
  MapPin
} from "lucide-react";

const SLIDES = [
  {
    id: "cinematography",
    category: "Cinematic Media & Weddings",
    headline: "A New Era of Cinematic Wedding Films",
    description:
      "CREAONNECT captures your legacy of love with 4K cinema cameras, aerial drone films, and heirloom DaVinci color grading. Pre-wedding and full wedding bookings now open.",
    ctaText: "Book Photoshoot",
    ctaLink: "/contact",
    secondaryText: "Explore Portfolio",
    secondaryLink: "/gallery",
    tabCategory: "Wedding Cinematography",
    tabTitle: "4K Heirloom Films & Pre-Wedding Shoots",
    image: "/images/wedding-varmala-moment.png",
    objectPosition: "center 8%",
    floatingBadge: "🎬 4K Cinema ProRes • Sony FX3",
    statBadge: { value: "100%", label: "Cinematic Color Grade" },
    secondaryImage: "/images/wedding-marathi-tika.png"
  },
  {
    id: "marketplace",
    category: "Creative Gig Marketplace",
    headline: "Earn Money With Your Camera Across the World",
    description:
      "Browse live photoshoot gig orders with 12h–24h countdown expiry. Accept verified orders, connect with clients directly, and keep 90% of order value with transparent 10% platform commission.",
    ctaText: "Claim Gigs & Earn",
    ctaLink: "/dashboard",
    secondaryText: "Post an Order",
    secondaryLink: "/dashboard",
    tabCategory: "Creator Marketplace",
    tabTitle: "Take Photoshoot Orders & Make Money",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=85",
    objectPosition: "center 40%",
    floatingBadge: "⚡ 10% Commission • Instant Payout",
    statBadge: { value: "₹16,200", label: "Average Creator Take-Home" },
    isMarketplaceCard: true
  },
  {
    id: "web-development",
    category: "Web & Digital Innovation",
    headline: "Engineering High-Performance Web Platforms",
    description:
      "Custom Full-Stack MERN web applications, #1 Google local SEO search dominance, and digital wedding invitation portals with interactive maps and automated RSVP.",
    ctaText: "Explore Web Solutions",
    ctaLink: "/services",
    secondaryText: "View Case Studies",
    secondaryLink: "/about",
    tabCategory: "Full-Stack Web & SEO",
    tabTitle: "Engineered for Speed • MERN & SEO",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85",
    objectPosition: "center center",
    floatingBadge: "⚡ 99+ Core Web Vitals • MERN Architecture",
    statBadge: { value: "#1 Rank", label: "Google Local Search Pack" }
  },
  {
    id: "commercial-studio",
    category: "Studio & Commercial Production",
    headline: "Commercial Brand Campaigns & Studio Lookbooks",
    description:
      "High-impact fashion lookbooks, studio lighting setups, corporate brand commercials, and campaign flex designs tailored for commanding authority and driving client sales.",
    ctaText: "View Studio Gallery",
    ctaLink: "/gallery",
    secondaryText: "Contact Studio Team",
    secondaryLink: "/contact",
    tabCategory: "Commercial & Studio",
    tabTitle: "Brand Identity, Lookbooks & Flex",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=85",
    objectPosition: "center 25%",
    floatingBadge: "📸 High-Fashion Studio Lighting",
    statBadge: { value: "+240%", label: "Brand Inquiries Growth" }
  }
];

const CreaonnectNvidiaHero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const INTERVAL_STEP = 50; // update every 50ms for buttery-smooth progress

  // Preload all slide images on mount to eliminate flicker/blank states
  useEffect(() => {
    SLIDES.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
      if (slide.secondaryImage) {
        const img = new Image();
        img.src = slide.secondaryImage;
      }
    });
  }, []);

  // Smooth Auto-Play Progress Loop with absolute timing (Strict-Mode safe, never skips slides)
  useEffect(() => {
    if (isPaused) return;

    // Preserve existing progress if resuming after pause
    const initialElapsed = (progress / 100) * SLIDE_DURATION;
    const startTime = Date.now() - initialElapsed;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

      if (elapsed >= SLIDE_DURATION) {
        clearInterval(timer);
        setProgress(0);
        setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
      } else {
        setProgress(pct);
      }
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [currentIdx, isPaused]);

  const activeSlide = SLIDES[currentIdx];

  const handleSelectSlide = (idx) => {
    setProgress(0);
    setCurrentIdx(idx);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section
      className="relative bg-brandBg text-brandTextPrimary pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-14 overflow-hidden border-b border-brandBorder transition-colors duration-300"
    >
      {/* Background Subtle Gradient Glow matching NVIDIA metallic atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] lg:w-[900px] h-full pointer-events-none opacity-40 dark:opacity-20 bg-gradient-to-l from-[#F3F4F6] via-[#FAFAFB] to-transparent dark:from-[#1E1B18] dark:to-transparent -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between min-h-[520px] lg:min-h-[580px]">
        {/* ===================================================================== */}
        {/* TOP / MAIN SECTION: 2-COLUMN NVIDIA HERO DISPLAY                      */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 py-4 lg:py-8">
          
          {/* LEFT COLUMN: NVIDIA BOLD TYPOGRAPHY & GREEN BUTTON */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Category Label (Small bold header like NVIDIA "Artificial Intelligence") */}
                <div className="text-xs sm:text-sm font-bold tracking-tight text-black dark:text-[#76B900] uppercase">
                  {activeSlide.category}
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-black text-brandTextPrimary tracking-tight leading-[1.08]">
                  {activeSlide.headline}
                </h1>

                {/* Paragraph Description */}
                <p className="text-sm sm:text-base text-brandTextMuted max-w-xl font-normal leading-relaxed">
                  {activeSlide.description}
                </p>

                {/* Action Button Cluster with NVIDIA Signature Green (#76B900) */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    to={activeSlide.ctaLink}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#76B900] hover:bg-[#68A500] text-black text-sm font-extrabold tracking-wide uppercase transition-all shadow-sm active:scale-95 !no-underline select-none"
                    style={{ borderRadius: "2px" }}
                  >
                    <span>{activeSlide.ctaText}</span>
                  </Link>

                  <Link
                    to={activeSlide.secondaryLink}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brandTextPrimary hover:text-[#76B900] transition-colors !no-underline group"
                  >
                    <span>{activeSlide.secondaryText}</span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 text-[#76B900]" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: PAYU-STYLE BORDERLESS HERO IMAGE WITH ATMOSPHERIC EMERALD GLOW & SEAMLESS FEATHERING */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* PayU Ambient Emerald Radial Glow behind subject */}
            <div
              className="absolute -top-16 -right-10 w-[380px] sm:w-[520px] lg:w-[620px] h-[380px] sm:h-[520px] lg:h-[620px] pointer-events-none rounded-full blur-[90px] opacity-40 dark:opacity-55 -z-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(118, 185, 0, 0.35) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)"
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${activeSlide.id}`}
                initial={{ opacity: 0, scale: 0.97, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full max-w-xl lg:max-w-none flex items-center justify-center"
              >
                {/* PayU-Style Unboxed Container (Hover pauses carousel strictly on image) */}
                <div
                  className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] flex items-center justify-center lg:justify-end cursor-pointer select-none"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Seamless Feathered Image Container (No hard borders, no outer boxes - 100% PayU Style) */}
                  <div
                    className="relative w-full h-full flex items-center justify-center lg:justify-end overflow-hidden"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 94%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,1) 82%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 94%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,1) 82%, transparent 100%)",
                      WebkitMaskComposite: "source-in",
                      maskComposite: "intersect"
                    }}
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.headline}
                      className="w-full h-full object-cover sm:object-contain lg:object-cover object-bottom sm:object-center transition-all duration-700 pointer-events-none select-none"
                      style={{ objectPosition: activeSlide.objectPosition || "center 15%" }}
                    />

                    {/* Left Blend Gradient (Guarantees seamless dissolve into background) */}
                    <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-brandBg via-brandBg/60 to-transparent pointer-events-none" />

                    {/* Bottom Blend Gradient (Smoothly dissolves into bottom tabs border) */}
                    <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-brandBg via-brandBg/70 to-transparent pointer-events-none" />

                    {/* Top Blend Subtle Gradient */}
                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-brandBg/40 to-transparent pointer-events-none" />
                  </div>

                  {/* PayU-Style Floating Pill Badge (Positioned over left edge of image) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.35 }}
                    className={`absolute ${
                      activeSlide.isMarketplaceCard
                        ? "bottom-24 sm:bottom-32"
                        : "bottom-12 sm:bottom-18"
                    } left-2 sm:left-4 lg:-left-6 z-20 flex items-center gap-2.5 px-4 py-2 sm:py-2.5 rounded-full bg-black/80 dark:bg-[#07130F]/90 backdrop-blur-md border border-white/20 dark:border-[#76B900]/40 shadow-2xl text-xs sm:text-sm text-white select-none transition-all`}
                  >
                    <div className="h-5 w-5 rounded-full bg-[#76B900]/25 border border-[#76B900] flex items-center justify-center text-[#76B900] flex-shrink-0">
                      <CheckCircle size={13} className="text-[#76B900]" />
                    </div>
                    <span className="font-semibold tracking-tight text-white/95">
                      {activeSlide.floatingBadge.replace(/^[^\w\d]+/, "").trim()}
                    </span>
                    {activeSlide.statBadge && (
                      <span className="bg-[#76B900] text-black text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full ml-1">
                        {activeSlide.statBadge.value}
                      </span>
                    )}
                  </motion.div>

                  {/* Floating Live Marketplace Widget (if slide 2) */}
                  {activeSlide.isMarketplaceCard && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="absolute bottom-3 left-2 sm:left-4 lg:-left-6 bg-brandSurface/95 dark:bg-black/85 backdrop-blur-md p-3.5 rounded-2xl border border-brandBorder dark:border-white/15 shadow-2xl text-left text-xs space-y-1.5 max-w-[240px] z-20"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#76B900]">Live Job Feed</span>
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          ⏳ 08h left
                        </span>
                      </div>
                      <div className="font-extrabold text-brandTextPrimary truncate">Pre-Wedding • Lonavala</div>
                      <div className="flex items-center justify-between font-bold border-t border-brandBorder/60 pt-1">
                        <span className="text-brandTextMuted text-[10px]">Your Payout:</span>
                        <span className="text-[#76B900] font-black">₹16,200</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Minimal Sleek Slide Navigation Arrows */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20 opacity-80 hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous slide"
                      className="h-8 w-8 rounded-full bg-black/60 hover:bg-[#76B900] hover:text-black text-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all active:scale-95"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next slide"
                      className="h-8 w-8 rounded-full bg-black/60 hover:bg-[#76B900] hover:text-black text-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all active:scale-95"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* BOTTOM SECTION: NVIDIA PROGRESS SLIDER TABS (EXACT MATCH TO IMAGES!) */}
        {/* ===================================================================== */}
        <div className="pt-6 sm:pt-10 border-t border-brandBorder">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentIdx;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className="group text-left focus:outline-none transition-all cursor-pointer select-none"
                >
                  {/* Progress Line Track at Top of Tab */}
                  <div className="h-[3.5px] w-full bg-brandBorder relative overflow-hidden rounded-full mb-2.5">
                    {/* Active Filling Progress Line (NVIDIA Green #76B900) */}
                    {isActive ? (
                      <div
                        className="h-full bg-[#76B900] transition-all duration-[50ms] ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    ) : (
                      <div className="h-full w-0 group-hover:w-full group-hover:bg-[#76B900]/40 transition-all duration-300" />
                    )}
                  </div>

                  {/* Tab Text: Category Label & Title (Exact NVIDIA Styling) */}
                  <div className="space-y-0.5">
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? "text-brandTextPrimary"
                          : "text-brandTextMuted group-hover:text-brandTextPrimary"
                      }`}
                    >
                      {slide.tabCategory}
                    </div>

                    <div
                      className={`text-xs font-semibold line-clamp-1 transition-colors ${
                        isActive
                          ? "text-[#76B900]"
                          : "text-brandTextMuted group-hover:text-brandTextPrimary"
                      }`}
                    >
                      {slide.tabTitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CreaonnectNvidiaHero;
