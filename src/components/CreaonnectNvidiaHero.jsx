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
    floatingBadge: "🎬 4K Cinema ProRes • Sony FX3",
    statBadge: { value: "100%", label: "Cinematic Color Grade" },
    secondaryImage: "/images/prewedding-palace-arch.jpg"
  },
  {
    id: "marketplace",
    category: "Creative Gig Marketplace",
    headline: "Earn Money With Your Camera Across Maharashtra",
    description:
      "Browse live photoshoot gig orders with 12h–24h countdown expiry. Accept verified orders, connect with clients directly, and keep 90% of order value with transparent 10% platform commission.",
    ctaText: "Claim Gigs & Earn",
    ctaLink: "/dashboard",
    secondaryText: "Post an Order",
    secondaryLink: "/dashboard",
    tabCategory: "Creator Marketplace",
    tabTitle: "Take Photoshoot Orders & Make Money",
    image: "/images/marathi-wedding-ritual.jpg",
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
    image: "/images/bw-couple-sunburst-banner.png",
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

          {/* RIGHT COLUMN: LAYERED 3D-ANGLED VISUAL SHOWCASE (LIKE NVIDIA LAPTOP PERSPECTIVE) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${activeSlide.id}`}
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full max-w-lg lg:max-w-none flex items-center justify-center"
              >
                {/* 3D Angled Layered Showcase Container - Hover paused strictly on image area */}
                <div
                  className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  
                  {/* Background Angled Perspective Card */}
                  <div className="absolute top-2 right-4 sm:right-8 w-4/5 h-4/5 rounded-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#333] shadow-lg opacity-40 dark:opacity-20 transform rotate-6 scale-95 pointer-events-none">
                    <img
                      src={activeSlide.secondaryImage || activeSlide.image}
                      alt="Background preview"
                      className="w-full h-full object-cover filter blur-[0.5px]"
                    />
                  </div>

                  {/* Main Hero Card (Layered with metallic bevel like NVIDIA hardware screen) */}
                  <div className="relative w-full sm:w-[92%] h-[280px] sm:h-[350px] lg:h-[380px] rounded-2xl overflow-hidden border-2 border-brandBorder shadow-2xl bg-brandSurface group">
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.headline}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay for crisp text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Bottom Floating Pill inside image */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                        <span className="h-2 w-2 rounded-full bg-[#76B900] animate-pulse" />
                        <span className="font-bold tracking-tight">{activeSlide.floatingBadge}</span>
                      </div>

                      {activeSlide.statBadge && (
                        <div className="bg-[#76B900] text-black px-3 py-1 rounded-full font-extrabold text-[11px] shadow-md hidden sm:block">
                          {activeSlide.statBadge.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating Live Marketplace Widget if slide 2 */}
                  {activeSlide.isMarketplaceCard && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute -bottom-2 -left-2 sm:left-2 bg-brandSurface p-3.5 rounded-xl border border-brandBorder shadow-xl text-left text-xs space-y-1.5 max-w-[240px] z-20"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#76B900]">Live Job Feed</span>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                          ⏳ 08h left
                        </span>
                      </div>
                      <div className="font-extrabold text-brandTextPrimary truncate">Pre-Wedding • Lonavala</div>
                      <div className="flex items-center justify-between font-bold border-t border-brandBorder pt-1">
                        <span className="text-brandTextMuted text-[10px]">Your Payout:</span>
                        <span className="text-[#76B900] font-black">₹16,200</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Manual Arrow Controls (Like in NVIDIA Screenshot 2 & 3) */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous slide"
                      className="h-8 w-8 bg-[#76B900] hover:bg-[#68A500] text-black flex items-center justify-center shadow-sm transition-all active:scale-95"
                      style={{ borderRadius: "2px" }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next slide"
                      className="h-8 w-8 bg-[#76B900] hover:bg-[#68A500] text-black flex items-center justify-center shadow-sm transition-all active:scale-95"
                      style={{ borderRadius: "2px" }}
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
