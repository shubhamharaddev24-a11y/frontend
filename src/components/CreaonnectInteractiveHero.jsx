import React, { useState, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValueEvent, 
  useReducedMotion 
} from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Film, 
  Code2, 
  Users2, 
  Camera,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  ArrowUpRight
} from "lucide-react";

const CreaonnectInteractiveHero = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Active showcase tab inside the portal
  const [activePillar, setActivePillar] = useState("create"); // 'create' | 'innovate' | 'connect'
  const [lutGrade, setLutGrade] = useState("golden"); // 'golden' | 'film35' | 'raw'
  const [webSpeed, setWebSpeed] = useState(99);

  // Short, snappy scroll track (140vh) so it opens FAST on the very first scroll flick
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // FAST OPENING: The screen opens completely within the first 20% of scroll!
  // 1. Header Text: Fades out rapidly within scroll progress 0 -> 0.12
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [0, -35]);

  // 2. Floating Badges: Glide outward and fade fast within 0 -> 0.12
  const leftCardX = useTransform(scrollYProgress, [0, 0.14], [0, -120]);
  const rightCardX = useTransform(scrollYProgress, [0, 0.14], [0, 120]);
  const floatingCardsOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // 3. Central Theater Screen:
  // Starts at scale 0.85 (neatly tucked below headline),
  // and FAST-EXPANDS to full size (scale 1.0) and moves to vertical center (y: 0) by progress 0.18!
  const screenScale = useTransform(scrollYProgress, [0, 0.18], [0.85, 1.0]);
  const screenY = useTransform(scrollYProgress, [0, 0.18], [55, -10]);
  const screenWidth = useTransform(scrollYProgress, [0, 0.18], ["86%", "96%"]);
  const screenRadius = useTransform(scrollYProgress, [0, 0.18], ["22px", "14px"]);
  const screenGlow = useTransform(
    scrollYProgress, 
    [0, 0.18], 
    [
      "0 15px 40px rgba(0,0,0,0.8)", 
      "0 25px 80px rgba(166, 124, 107, 0.3)"
    ]
  );
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Automatically switch slides as user scrolls through the opened view
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActivePillar("create");
    } else if (latest < 0.65) {
      setActivePillar("innovate");
    } else {
      setActivePillar("connect");
    }
  });

  return (
    // Responsive scroll runway: 140vh enables rapid, snappy opening with immediate full-screen payoff
    <section ref={containerRef} className="relative h-[145vh] bg-[#090807] text-[#F2EDE4]">
      
      {/* Sticky Fullscreen Viewport - Fits 100vh with NO clipping */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-3 sm:px-6 lg:px-10 selection:bg-[#A67C6B]/30">
        
        {/* Warm Obsidian & Terracotta Ambient Lighting */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(166, 124, 107, 0.22) 0%, rgba(212, 163, 115, 0.08) 40%, rgba(0,0,0,0) 80%)"
          }}
        />
        <div className="absolute top-1/2 -left-28 w-60 h-60 bg-[#A67C6B]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-28 w-60 h-60 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ======================================================================= */}
        {/* 1. EDITORIAL HEADLINE (Floats at top, fades out swiftly on initial scroll) */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            y: reduceMotion ? 0 : headerY,
            opacity: reduceMotion ? 1 : headerOpacity
          }}
          className="absolute top-16 sm:top-20 inset-x-0 z-20 max-w-4xl mx-auto text-center space-y-2 px-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1614]/80 border border-[#A67C6B]/30 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A67C6B] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#D4A373]">
              Cinema Studio • Digital Engineering • Creator Marketplace
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            Where Cinematic Artistry <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D4A373]">Meets</span>{" "}
            <span className="font-sans font-extrabold bg-gradient-to-r from-[#FFFFFF] via-[#F2EDE4] to-[#A67C6B] bg-clip-text text-transparent">
              Digital Engineering
            </span>
          </h1>
        </motion.div>

        {/* ======================================================================= */}
        {/* 2. FLOATING BESPOKE BADGES (Disperse quickly when scrolling) */}
        {/* ======================================================================= */}
        {/* Left Badge: 4K Cinema */}
        <motion.div
          style={{
            x: reduceMotion ? 0 : leftCardX,
            opacity: reduceMotion ? 1 : floatingCardsOpacity
          }}
          className="hidden xl:flex absolute left-8 top-32 z-30 w-52 flex-col rounded-2xl bg-[#14110F]/90 backdrop-blur-xl border border-[#A67C6B]/30 p-3.5 shadow-2xl space-y-2 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#A67C6B]/20 border border-[#A67C6B]/40 flex items-center justify-center text-[#D4A373]">
              <Film size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-none">Sony FX3 Cinema</p>
              <p className="text-[10px] text-[#A67C6B] font-mono mt-0.5">4K 10-Bit ProRes</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div className="bg-[#A67C6B] h-full rounded-full w-[94%]" />
          </div>
        </motion.div>

        {/* Right Badge: Creator Hub */}
        <motion.div
          style={{
            x: reduceMotion ? 0 : rightCardX,
            opacity: reduceMotion ? 1 : floatingCardsOpacity
          }}
          className="hidden xl:flex absolute right-8 top-32 z-30 w-52 flex-col rounded-2xl bg-[#14110F]/90 backdrop-blur-xl border border-[#A67C6B]/30 p-3.5 shadow-2xl space-y-2 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Users2 size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-none">Creator Network</p>
              <p className="text-[10px] text-blue-300 font-mono mt-0.5">50+ Vetted Talent</p>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[88%]" />
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* 3. THE EXPANDING THEATER PORTAL (FIT-TO-VIEWPORT: NEVER CUT OFF AT BOTTOM) */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            y: reduceMotion ? 0 : screenY,
            scale: reduceMotion ? 1 : screenScale,
            width: reduceMotion ? "94%" : screenWidth,
            borderRadius: reduceMotion ? "16px" : screenRadius,
            boxShadow: reduceMotion ? "0 20px 50px rgba(0,0,0,0.8)" : screenGlow
          }}
          className="relative max-w-6xl w-full h-[66vh] sm:h-[72vh] max-h-[580px] rounded-2xl sm:rounded-3xl bg-[#120F0D] border border-white/15 p-2.5 sm:p-4 transition-colors z-20 flex flex-col justify-between"
        >
          {/* Window Header Bar (Fixed height, never wraps weirdly) */}
          <div className="shrink-0 flex items-center justify-between gap-2 pb-2.5 px-2 border-b border-white/10">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[10px] sm:text-[11px] font-mono text-[#8C7A70] hidden sm:inline">
                creaonnect.experience.stage
              </span>
            </div>

            {/* 3 Bespoke Switcher Tabs */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActivePillar("create")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
                  activePillar === "create"
                    ? "bg-[#A67C6B] text-white shadow-md font-bold"
                    : "text-[#B8ABA0] hover:text-white"
                }`}
              >
                <Camera size={12} />
                <span>01. Cinema</span>
              </button>

              <button
                onClick={() => setActivePillar("innovate")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
                  activePillar === "innovate"
                    ? "bg-[#D4A373] text-black font-bold shadow-md"
                    : "text-[#B8ABA0] hover:text-white"
                }`}
              >
                <Code2 size={12} />
                <span>02. Web Studio</span>
              </button>

              <button
                onClick={() => setActivePillar("connect")}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all ${
                  activePillar === "connect"
                    ? "bg-blue-600 text-white shadow-md font-bold"
                    : "text-[#B8ABA0] hover:text-white"
                }`}
              >
                <Users2 size={12} />
                <span>03. Marketplace</span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-[#D4A373] bg-[#D4A373]/10 px-2 py-0.5 rounded-full border border-[#D4A373]/20 hidden md:inline">
              ● Live 4K Stage
            </span>
          </div>

          {/* Canvas Display Area (Fills remaining height: min-h-0 guarantees NO vertical overflow!) */}
          <div className="flex-1 min-h-0 relative rounded-xl overflow-hidden bg-black mt-2.5 border border-white/5">
            <AnimatePresence mode="wait">
              
              {/* --------------------------------------------------------------- */}
              {/* TAB 1: 4K WEDDING CINEMA WITH REAL-TIME DAVINCI LUT SWITCHER   */}
              {/* --------------------------------------------------------------- */}
              {activePillar === "create" && (
                <motion.div
                  key="tab-create"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <img
                    src="/images/wedding-varmala-moment.png"
                    alt="The Royal Marathi Wedding Varmala"
                    className={`w-full h-full object-cover object-[center_22%] transition-all duration-500 ${
                      lutGrade === "golden"
                        ? "brightness-95 contrast-105 saturate-110"
                        : lutGrade === "film35"
                        ? "brightness-100 sepia-[0.3] saturate-125 contrast-110"
                        : "brightness-95 contrast-95 saturate-90"
                    }`}
                  />

                  {/* High-Fidelity Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35 p-4 sm:p-6 flex flex-col justify-between">
                    {/* Top Row: DaVinci Tag & Color LUT Switcher */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/70 text-[#F2EDE4] backdrop-blur-md border border-white/15">
                        <Film size={11} className="text-[#A67C6B]" />
                        DaVinci Resolve 19 Color Grading
                      </span>

                      <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
                        <button
                          onClick={() => setLutGrade("golden")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                            lutGrade === "golden" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                          }`}
                        >
                          Golden Luxe
                        </button>
                        <button
                          onClick={() => setLutGrade("film35")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                            lutGrade === "film35" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                          }`}
                        >
                          Warm 35mm
                        </button>
                        <button
                          onClick={() => setLutGrade("raw")}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                            lutGrade === "raw" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                          }`}
                        >
                          Natural Raw
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Title & Action (Always 100% visible inside the frame!) */}
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-mono text-[#D4A373] tracking-widest uppercase">
                          Precious Heirloom Memories
                        </p>
                        <h3 className="font-serif text-lg sm:text-2xl text-white font-medium mt-0.5">
                          The Royal Marathi Varmala & Mandap Celebration
                        </h3>
                        <p className="text-[11px] text-[#B8ABA0] hidden sm:block mt-0.5">
                          Shot on Sony Cinema FX3 • Mastered in 4K ProRes HQ
                        </p>
                      </div>
                      <Link
                        to="/gallery"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-mono transition-all border border-white/15"
                      >
                        <span>Full Gallery</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --------------------------------------------------------------- */}
              {/* TAB 2: WEB STUDIO WITH LIVE PERFORMANCE GAUGES & SPEED SLIDER   */}
              {/* --------------------------------------------------------------- */}
              {activePillar === "innovate" && (
                <motion.div
                  key="tab-innovate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full p-4 sm:p-6 bg-[#110E0C] flex flex-col justify-between overflow-y-auto"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#D4A373]/20 border border-[#D4A373]/40 flex items-center justify-center text-[#D4A373] shrink-0">
                        <Code2 size={16} />
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-sm sm:text-base text-white">
                          CREAONNECT Full-Stack Engine (MERN)
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-[#B8ABA0]">
                          Sub-second edge speed • Digital wedding RSVP invitation portals • High-converting landing pages
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 size={11} /> 99/100 Vitals
                    </span>
                  </div>

                  {/* 3 Metric Gauges */}
                  <div className="grid grid-cols-3 gap-2.5 my-2">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#B8ABA0] uppercase">Google Web Vitals</span>
                      <p className="text-lg sm:text-2xl font-mono font-bold text-emerald-400">99 / 100</p>
                      <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full w-[99%]" />
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#B8ABA0] uppercase">Global Latency</span>
                      <p className="text-lg sm:text-2xl font-mono font-bold text-[#D4A373]">0.7s</p>
                      <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                        <div className="bg-[#D4A373] h-full rounded-full w-[95%]" />
                      </div>
                    </div>

                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#B8ABA0] uppercase">SEO Multiplier</span>
                      <p className="text-lg sm:text-2xl font-mono font-bold text-cyan-400">+99.4%</p>
                      <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full w-[99%]" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Slider Controller */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-white">Edge Performance Simulator: {webSpeed}%</span>
                      <p className="text-[10px] text-[#B8ABA0]">
                        Drag to simulate edge compression, dynamic routing & asset payloads.
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 min-w-[170px]">
                      <input
                        type="range"
                        min="60"
                        max="100"
                        value={webSpeed}
                        onChange={(e) => setWebSpeed(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A373]"
                      />
                      <span className="text-xs font-mono font-bold text-[#D4A373] min-w-[32px]">
                        {webSpeed}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --------------------------------------------------------------- */}
              {/* TAB 3: CREATOR & CLIENT REGIONAL MARKETPLACE                    */}
              {/* --------------------------------------------------------------- */}
              {activePillar === "connect" && (
                <motion.div
                  key="tab-connect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full p-4 sm:p-6 bg-[#0E0C0A] flex flex-col justify-between overflow-y-auto"
                >
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <Users2 size={11} /> Regional Creative Exchange
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl text-white">
                      Clients Submit Orders ↔ Verified Creators Deliver
                    </h3>
                    <p className="text-xs text-[#B8ABA0] font-light max-w-lg leading-relaxed">
                      Escrow-protected milestones for wedding colorists, drone pilots, web developers, and graphic designers.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 my-2">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[9px] text-[#B8ABA0] font-mono">Platform Fee</span>
                      <p className="text-base sm:text-xl font-mono font-bold text-emerald-400">0% Early Tier</p>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[9px] text-[#B8ABA0] font-mono">Client Escrow</span>
                      <p className="text-base sm:text-xl font-mono font-bold text-blue-400">100% Protected</p>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[9px] text-[#B8ABA0] font-mono">Payout Velocity</span>
                      <p className="text-base sm:text-xl font-mono font-bold text-amber-400">&lt; 24 Hours</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-white">Join 50+ regional creators on the early access waitlist</span>
                    <Link to="/contact" className="text-xs font-mono text-[#D4A373] hover:underline font-semibold">
                      Apply as Talent ↗
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* 4. Bottom Scroll Cue */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : scrollCueOpacity }}
          className="absolute bottom-3 inset-x-0 z-20 flex justify-center pointer-events-none"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#B8ABA0] backdrop-blur-md">
            <span>Scroll down to expand screen</span>
            <span className="text-[#D4A373] animate-bounce">↓</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default CreaonnectInteractiveHero;
