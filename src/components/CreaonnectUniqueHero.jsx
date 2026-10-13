import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowDown, 
  Check, 
  Sparkles, 
  Code2, 
  Camera, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Zap,
  Play,
  Pause
} from "lucide-react";

const SLIDES = [
  {
    id: "web-dev",
    category: "INNOVATE",
    badge: "Full-Stack Web Division",
    title: "MERN Stack Web Platform & SEO Engine",
    date: "Sprint #24 • Active Production",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=85",
    accentColor: "#D4A373", // Champagne Gold
    bgGradient: "from-amber-900/40 via-[#1A1512] to-black",
    tagline: "Sub-second edge deployment with 99+ Core Web Vitals.",
    notesTitle: "Platform Architecture & Client Portal",
    tasks: [
      { text: "Custom MERN architecture with sub-second page loads", done: true },
      { text: "Automated digital wedding RSVP & interactive map portal", done: true },
      { text: "Google Local Search SEO optimized (#1 ranking target)", done: true }
    ],
    floatingAttendees: [
      { name: "Shubham H.", role: "Lead Engineer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" },
      { name: "Pooja P.", role: "Client Partner", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80" }
    ],
    statusPill: "⚡ 99.4% Google Vitals"
  },
  {
    id: "cinema",
    category: "CREATE",
    badge: "Media & Cinema Studio",
    title: "4K Cinematic Wedding Films & Commercial Media",
    date: "Post-Production • DaVinci Luxe Grade",
    image: "/images/wedding-varmala-moment.png",
    accentColor: "#A67C6B", // Terracotta
    bgGradient: "from-[#4A2F25]/40 via-[#14100E] to-black",
    tagline: "Filmed on Sony FX3 cinema cameras with heirloom grade color.",
    notesTitle: "The Royal Varmala Film Delivery",
    tasks: [
      { text: "4K ProRes HQ 10-bit raw footage captured on Sony FX3", done: true },
      { text: "Meticulous DaVinci Resolve golden heirloom color grade", done: true },
      { text: "Master archival delivery with cinematic teaser & reels", done: true }
    ],
    floatingAttendees: [
      { name: "Tanmay M.", role: "Cinematographer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80" },
      { name: "Aditi S.", role: "Colorist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80" }
    ],
    statusPill: "🎬 4K Cinema ProRes"
  },
  {
    id: "marketing",
    category: "GROWTH",
    badge: "Digital Marketing & Branding",
    title: "Google Map Ranking & High-Conversion Brand Campaigns",
    date: "Monthly Review • 240% Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=85",
    accentColor: "#10B981", // Emerald
    bgGradient: "from-emerald-950/40 via-[#0E1512] to-black",
    tagline: "Drive real inquiries to your retail showroom or local service business.",
    notesTitle: "Saralgaon & Murbad Business Growth",
    tasks: [
      { text: "Google Business Profile optimization (#1 local 3-pack rank)", done: true },
      { text: "Political banners, rally flex & high-impact corporate designs", done: true },
      { text: "Social media video ad campaigns with +240% inquiry uplift", done: true }
    ],
    floatingAttendees: [
      { name: "Rahul V.", role: "Growth Strategist", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80" },
      { name: "Kavita D.", role: "Brand Designer", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80" }
    ],
    statusPill: "📈 +240% Footfall"
  },
  {
    id: "marketplace",
    category: "CONNECT",
    badge: "Creator Network & Escrow",
    title: "Regional Creator Dispatch & Milestone Escrow",
    date: "Live Match • 100% Protected",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=85",
    accentColor: "#3B82F6", // Sapphire Blue
    bgGradient: "from-blue-950/40 via-[#0B1017] to-black",
    tagline: "Connecting businesses with top 1% local photographers and developers.",
    notesTitle: "Client Brief & Smart Escrow Vault",
    tasks: [
      { text: "Automated match with verified local photographers & designers", done: true },
      { text: "Client funds locked in 100% milestone escrow vault", done: true },
      { text: "Instant payout dispatched upon client milestone approval", done: true }
    ],
    floatingAttendees: [
      { name: "Suresh K.", role: "Verified Creator", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80" },
      { name: "Neha R.", role: "Business Client", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80" }
    ],
    statusPill: "🛡️ 100% Escrow Safe"
  }
];

const CreaonnectUniqueHero = () => {
  const reduceMotion = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const INTERVAL_STEP = 50;

  // Auto-Slide Timer with interactive pause-on-hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((current) => (current + 1) % SLIDES.length);
          return 0;
        }
        return prev + (INTERVAL_STEP / SLIDE_DURATION) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(timer);
  }, [isPaused, currentIdx]);

  const activeSlide = SLIDES[currentIdx];

  const handleManualSelect = (idx) => {
    setCurrentIdx(idx);
    setProgress(0);
  };

  return (
    <section 
      className="relative min-h-[94vh] bg-[#F4EFEA] dark:bg-[#0B0908] text-[#1A1A1A] dark:text-[#F4EFEA] pt-28 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-14 overflow-hidden selection:bg-[#A67C6B]/30 flex flex-col justify-center"
    >
      
      {/* 1. Ambient Lighting Atmosphere */}
      <div 
        className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] sm:w-[1000px] h-[500px] pointer-events-none opacity-40 dark:opacity-70 blur-3xl transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse 65% 50% at 50% 0%, ${activeSlide.accentColor}33 0%, rgba(0,0,0,0) 70%)`
        }}
      />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 2. Main Granola-Inspired Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN: Bold Granola-Style Editorial Headline & Call to Action   */}
        {/* ===================================================================== */}
        <div className="lg:col-span-5 space-y-7 text-center lg:text-left">
          
          {/* Top Granola-Style Pill Badge */}
          <motion.div 
            key={`badge-${activeSlide.id}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DFD5] dark:bg-[#1A1614] border border-[#A67C6B]/35 shadow-sm backdrop-blur-sm"
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeSlide.accentColor }}
            />
            <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-[#8C6A5A] dark:text-[#D4A373]">
              {activeSlide.badge}
            </span>
          </motion.div>

          {/* Grand High-Impact Headline (Granola Serif Typography) */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-normal tracking-tight text-[#1A1A1A] dark:text-white leading-[1.06]">
            The hybrid studio <br />
            <span className="italic font-light text-[#A67C6B] dark:text-[#D4A373]">for visionary</span>{" "}
            <span className="font-sans font-extrabold text-[#1A1A1A] dark:text-white">
              brands &amp; films.
            </span>
          </h1>

          {/* Clean Granola Subtitle */}
          <p className="text-base sm:text-lg text-[#55504A] dark:text-[#B8ABA0] font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
            From 4K cinematic wedding heirlooms to high-converting MERN web platforms and local search dominance. Everything engineered with uncompromised precision.
          </p>

          {/* Granola Bold Primary Pill CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
            <Link
              to="/gallery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#A67C6B] dark:bg-gradient-to-r dark:from-[#C49B89] dark:via-[#D4AF37] dark:to-[#A67C6B] dark:hover:opacity-95 !text-white dark:!text-[#0C0A09] font-semibold text-sm sm:text-base px-8 py-4 transition-all shadow-md active:scale-95 group !no-underline"
            >
              <span className="!text-inherit">Explore Portfolio</span>
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform !text-inherit" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/80 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-[#DCD2C6] dark:border-white/15 !text-[#1A1A1A] dark:!text-white font-medium text-sm sm:text-base px-7 py-4 transition-all shadow-sm active:scale-95 !no-underline"
            >
              <span className="!text-inherit">Start a Project</span>
              <ArrowRight size={16} className="!text-inherit" />
            </Link>
          </div>

          {/* Slide Progress Navigator Pills */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-2">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleManualSelect(idx)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  currentIdx === idx
                    ? "bg-[#1A1A1A] !text-white dark:bg-[#C49B89] dark:!text-[#0C0A09] font-bold shadow-sm"
                    : "bg-[#E8DFD5]/60 dark:bg-white/5 text-[#55504A] dark:text-white/60 hover:text-black dark:hover:text-white"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="hidden sm:inline">{slide.category}</span>
                {currentIdx === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] dark:bg-[#0C0A09]" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: Layered Granola Visual Stage & Auto-Slide Notepad Card  */}
        {/* ===================================================================== */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          {/* Main Stage Canvas with Layered Cards (Pause only when hovering over the card) */}
          <div 
            className="relative w-full max-w-lg sm:max-w-xl h-[470px] sm:h-[530px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* LAYER 1 (BACKGROUND): The Business & Studio Image Card with Crazy Spring Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-image-${activeSlide.id}`}
                initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="absolute inset-x-2 inset-y-4 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black"
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-full object-cover object-[center_30%] brightness-75 contrast-105"
                />
                
                {/* Gradient vignette for rich contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Background Card Top Pill */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-white bg-black/60 backdrop-blur-md border border-white/15 shadow-sm">
                    {activeSlide.statusPill}
                  </span>
                </div>

                {/* Background Card Bottom Tagline */}
                <div className="absolute bottom-5 left-6 right-6 z-10 text-white/90">
                  <p className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">
                    Division {currentIdx + 1} / {SLIDES.length}
                  </p>
                  <p className="font-serif text-sm sm:text-base text-white/90 font-light mt-0.5 line-clamp-1">
                    {activeSlide.tagline}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* LAYER 2 (FOREGROUND): The Granola-Style Notepad Document Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`notepad-${activeSlide.id}`}
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative z-20 w-[92%] sm:w-[86%] rounded-2xl sm:rounded-3xl bg-[#FAF7F2]/95 dark:bg-[#161210]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.45)] text-[#1A1A1A] dark:text-[#FAF7F2]"
              >
                
                {/* macOS Granola Window Dots & Auto-Slide Progress Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
                    <span className="ml-2 text-[11px] font-mono text-[#8C8278] dark:text-[#B8ABA0]">
                      creaonnect.{activeSlide.id}
                    </span>
                  </div>

                  {/* Top Right Mini Live Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                      Synced
                    </span>
                  </div>
                </div>

                {/* Auto-Slide Micro Progress Bar across the card */}
                <div className="w-full h-1 bg-black/5 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full transition-all duration-75"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: activeSlide.accentColor 
                    }}
                  />
                </div>

                {/* Document Header (Granola Style) */}
                <div className="pt-4 space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A] dark:text-white leading-tight">
                    {activeSlide.notesTitle}
                  </h3>

                  {/* Metadata Chips: Date & Division Icon */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-xs font-mono text-[#55504A] dark:text-[#B8ABA0]">
                      <Calendar size={12} />
                      {activeSlide.date}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-xs font-mono text-[#55504A] dark:text-[#B8ABA0]">
                      <Clock size={12} />
                      CREAONNECT Studio
                    </span>
                  </div>
                </div>

                {/* Document Content / Tasks (Granola Note Format) */}
                <div className="pt-5 space-y-3 font-sans">
                  {activeSlide.tasks.map((task, i) => (
                    <motion.div
                      key={task.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.3 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3A3530] dark:text-[#DDD3C9] leading-snug"
                    >
                      <div 
                        className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white"
                        style={{ backgroundColor: activeSlide.accentColor }}
                      >
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="font-light">{task.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Granola Bottom Call Attendees / Live Collaborators (Bottom-Right Video Tiles) */}
                <div className="mt-6 pt-3.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {activeSlide.floatingAttendees.map((att) => (
                        <img
                          key={att.name}
                          src={att.avatar}
                          alt={att.name}
                          className="w-7 h-7 rounded-full border-2 border-[#FAF7F2] dark:border-[#161210] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#776E65] dark:text-[#A89D93]">
                      Verified Specialist Team
                    </span>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-xs font-mono font-medium hover:underline text-[#8C6A5A] dark:text-[#D4A373]"
                  >
                    <span>Deploy Work</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Granola Video Call Overlay Thumbnail (Bottom Right Floating Camera Tiles) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`video-tile-${activeSlide.id}`}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 15 }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.2 }}
                className="hidden sm:flex flex-col gap-1.5 absolute -bottom-4 -right-3 z-30 p-1.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                {activeSlide.floatingAttendees.map((att, idx) => (
                  <div key={att.name} className="relative w-16 h-14 rounded-xl overflow-hidden border border-white/10 bg-black/50">
                    <img
                      src={att.avatar}
                      alt={att.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 px-1 rounded bg-black/70 text-[8px] font-mono text-white/90">
                      {att.name.split(" ")[0]}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CreaonnectUniqueHero;
