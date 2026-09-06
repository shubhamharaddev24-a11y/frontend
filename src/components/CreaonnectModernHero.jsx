import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Film, 
  Code2, 
  Users2, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers,
  Camera,
  ChevronRight,
  SlidersHorizontal,
  Play,
  Activity,
  Zap,
  Star,
  Flame
} from "lucide-react";

const CreaonnectModernHero = () => {
  const reduceMotion = useReducedMotion();
  
  // Active showcase mode: 'cinema' (Image Mode) | 'code' (Interactive Web Card) | 'marketplace' (Creator Card)
  const [activeTab, setActiveTab] = useState("cinema");
  const [lutFilter, setLutFilter] = useState("golden");
  const [performanceRate, setPerformanceRate] = useState(99);

  // Floating gentle physics variants
  const floatVariant1 = reduceMotion ? {} : {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };
  const floatVariant2 = reduceMotion ? {} : {
    y: [0, 9, 0],
    transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
  };
  const floatVariant3 = reduceMotion ? {} : {
    y: [0, -7, 0],
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
  };

  return (
    <section className="relative min-h-[92vh] bg-[#0A0908] text-[#F2EDE4] pt-28 sm:pt-32 pb-20 px-4 sm:px-8 lg:px-14 overflow-hidden selection:bg-[#A67C6B]/30 flex flex-col justify-center">
      
      {/* 1. Warm Obsidian & Terracotta Glow Atmosphere */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(166, 124, 107, 0.22) 0%, rgba(212, 163, 115, 0.07) 45%, rgba(0,0,0,0) 80%)"
        }}
      />
      <div className="absolute top-1/4 -left-24 w-80 h-80 bg-[#A67C6B]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-24 w-80 h-80 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 2. Main Hero Layout Grid: Left Column Text & CTAs, Right Column Interactive Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN: Editorial Branding, Typography & Actions */}
        {/* ===================================================================== */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          {/* Top Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181412] border border-[#A67C6B]/30 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#A67C6B] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#D4A373]">
              Cinema • Technology • Creator Platform
            </span>
          </motion.div>

          {/* Bold Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-[58px] font-normal tracking-tight text-white leading-[1.12]"
          >
            Where Cinematic Artistry <br />
            <span className="italic font-light text-[#D4A373]">Meets</span>{" "}
            <span className="font-sans font-extrabold bg-gradient-to-r from-white via-[#F2EDE4] to-[#A67C6B] bg-clip-text text-transparent">
              Digital Precision.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#B8ABA0] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Documenting life's most heartfelt wedding chapters through 4K cinema while empowering businesses with modern full-stack web platforms and an on-demand creator exchange.
          </motion.p>

          {/* Interactive Mode Quick Switcher Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2"
          >
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#8C7A70] mb-2.5">
              Select Interactive Preview:
            </p>
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-[#14100E] p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab("cinema")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeTab === "cinema"
                    ? "bg-[#A67C6B] text-white font-bold shadow-md shadow-[#A67C6B]/25"
                    : "text-[#B8ABA0] hover:text-white"
                }`}
              >
                <Camera size={13} />
                <span>01. 4K Cinema Reel</span>
              </button>

              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeTab === "code"
                    ? "bg-[#D4A373] text-black font-bold shadow-md shadow-[#D4A373]/25"
                    : "text-[#B8ABA0] hover:text-white"
                }`}
              >
                <Code2 size={13} />
                <span>02. Web Engine Card</span>
              </button>

              <button
                onClick={() => setActiveTab("marketplace")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeTab === "marketplace"
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25"
                    : "text-[#B8ABA0] hover:text-white"
                }`}
              >
                <Users2 size={13} />
                <span>03. Creator Hub</span>
              </button>
            </div>
          </motion.div>

          {/* Primary & Secondary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A67C6B] to-[#926959] hover:from-[#B48877] hover:to-[#A67C6B] text-white font-semibold text-sm px-6 py-3.5 shadow-lg shadow-[#A67C6B]/25 transition-all active:scale-95"
            >
              <span>Explore Creative & Tech Services</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm px-6 py-3.5 backdrop-blur-md transition-all active:scale-95"
            >
              <span>Book Consultation</span>
            </Link>
          </motion.div>

          {/* Micro Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div>
              <p className="text-lg sm:text-xl font-mono font-bold text-[#D4A373]">500+</p>
              <p className="text-[11px] text-[#B8ABA0]">Weddings Preserved</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-mono font-bold text-emerald-400">99.4%</p>
              <p className="text-[11px] text-[#B8ABA0]">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-mono font-bold text-blue-400">100%</p>
              <p className="text-[11px] text-[#B8ABA0]">Escrow Protected</p>
            </div>
          </motion.div>

        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN: Interactive 3D Perspective Stage (Image ↔ Content Card) */}
        {/* ===================================================================== */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          
          {/* Floating Ambient Badge 1 (Top Left) */}
          <motion.div
            animate={floatVariant1}
            className="hidden sm:flex absolute -left-4 -top-6 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181412]/95 backdrop-blur-md border border-[#A67C6B]/30 shadow-xl"
          >
            <div className="w-6 h-6 rounded-lg bg-[#A67C6B]/20 text-[#D4A373] flex items-center justify-center">
              <Film size={13} />
            </div>
            <span className="text-[11px] font-mono text-white font-medium">4K ProRes 10-Bit</span>
          </motion.div>

          {/* Floating Ambient Badge 2 (Bottom Right) */}
          <motion.div
            animate={floatVariant2}
            className="hidden sm:flex absolute -right-3 -bottom-5 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181412]/95 backdrop-blur-md border border-emerald-500/30 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">Google Rank #1 ⚡</span>
          </motion.div>

          {/* THE MAIN INTERACTIVE STAGE CARD */}
          <div className="relative w-full max-w-lg sm:max-w-xl rounded-3xl bg-[#120F0D] border border-white/15 p-3 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            
            {/* Window Top Control Header */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] font-mono text-[#8C7A70]">
                  creaonnect.experience.live
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  Active
                </span>
              </div>
            </div>

            {/* Display Viewport */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-black mt-3 border border-white/5">
              <AnimatePresence mode="wait">
                
                {/* ------------------------------------------------------------- */}
                {/* 1. CINEMA REEL & IMAGE MODE (4K Royal Wedding Film) */}
                {/* ------------------------------------------------------------- */}
                {activeTab === "cinema" && (
                  <motion.div
                    key="tab-cinema-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/images/wedding-varmala-moment.png"
                      alt="The Royal Marathi Wedding Varmala"
                      className={`w-full h-full object-cover object-[center_20%] transition-all duration-500 ${
                        lutFilter === "golden"
                          ? "brightness-95 contrast-105 saturate-110"
                          : lutFilter === "warm"
                          ? "brightness-100 sepia-[0.25] saturate-125 contrast-110"
                          : "brightness-90 grayscale contrast-125"
                      }`}
                    />

                    {/* Gradient Overlay & Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 p-4 sm:p-5 flex flex-col justify-between">
                      {/* Top LUT grading selector */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-black/70 text-[#F2EDE4] backdrop-blur-md border border-white/15">
                          <Film size={11} className="text-[#A67C6B]" />
                          DaVinci Studio Grade
                        </span>

                        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
                          <button
                            onClick={() => setLutFilter("golden")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                              lutFilter === "golden" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                            }`}
                          >
                            Golden
                          </button>
                          <button
                            onClick={() => setLutFilter("warm")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                              lutFilter === "warm" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                            }`}
                          >
                            Warm 35mm
                          </button>
                          <button
                            onClick={() => setLutFilter("mono")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                              lutFilter === "mono" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                            }`}
                          >
                            Noir
                          </button>
                        </div>
                      </div>

                      {/* Bottom Caption & Link */}
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-mono text-[#D4A373] uppercase tracking-wider">
                            Real Marathi Celebration
                          </p>
                          <h3 className="font-serif text-base sm:text-xl text-white font-medium mt-0.5 leading-snug">
                            The Royal Varmala & Mandap Film
                          </h3>
                        </div>
                        <Link
                          to="/gallery"
                          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-mono transition-all border border-white/10"
                        >
                          <span>Full Gallery</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 2. ANIMATED INTERACTIVE CONTENT CARD (Web & MERN Stack Engine) */}
                {/* ------------------------------------------------------------- */}
                {activeTab === "code" && (
                  <motion.div
                    key="tab-code-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full h-full p-4 sm:p-5 bg-[#100D0B] flex flex-col justify-between overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#D4A373]/20 border border-[#D4A373]/40 flex items-center justify-center text-[#D4A373]">
                          <Code2 size={16} />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-white leading-none">
                            MERN Stack Web Engine
                          </h4>
                          <p className="text-[10px] text-[#B8ABA0] mt-0.5">
                            Edge deployed • Sub-second latency • SEO #1
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 size={11} /> 99/100 Score
                      </span>
                    </div>

                    {/* Gauges */}
                    <div className="grid grid-cols-3 gap-2.5 my-2">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                        <span className="text-[9px] font-mono text-[#B8ABA0] uppercase">Google Vitals</span>
                        <p className="text-xl font-mono font-bold text-emerald-400">99 / 100</p>
                        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full w-[99%]" />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                        <span className="text-[9px] font-mono text-[#B8ABA0] uppercase">Global Speed</span>
                        <p className="text-xl font-mono font-bold text-[#D4A373]">0.7s</p>
                        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                          <div className="bg-[#D4A373] h-full rounded-full w-[95%]" />
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                        <span className="text-[9px] font-mono text-[#B8ABA0] uppercase">SEO Inquiries</span>
                        <p className="text-xl font-mono font-bold text-cyan-400">+99.4%</p>
                        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                          <div className="bg-cyan-400 h-full rounded-full w-[99%]" />
                        </div>
                      </div>
                    </div>

                    {/* Live Interactive Slider */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-white">Performance Simulator: {performanceRate}%</span>
                        <p className="text-[10px] text-[#B8ABA0]">
                          Simulate responsive bundle optimizations and edge caching.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 min-w-[150px]">
                        <input
                          type="range"
                          min="60"
                          max="100"
                          value={performanceRate}
                          onChange={(e) => setPerformanceRate(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A373]"
                        />
                        <span className="text-xs font-mono font-bold text-[#D4A373] min-w-[32px]">
                          {performanceRate}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 3. CREATOR & CLIENT REGIONAL MARKETPLACE CARD */}
                {/* ------------------------------------------------------------- */}
                {activeTab === "marketplace" && (
                  <motion.div
                    key="tab-market-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full h-full p-4 sm:p-5 bg-[#0D0B09] flex flex-col justify-between overflow-y-auto"
                  >
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Users2 size={11} /> Regional Talent Exchange
                      </span>
                      <h4 className="font-serif text-lg text-white font-medium">
                        Client Submits Order ↔ Verified Talent Delivers
                      </h4>
                      <p className="text-xs text-[#B8ABA0] font-light">
                        Guaranteed milestone escrow for wedding editors, drone pilots & web developers.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 my-2">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[9px] text-[#B8ABA0] font-mono">Platform Fee</span>
                        <p className="text-base sm:text-lg font-mono font-bold text-emerald-400">0% Early Tier</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[9px] text-[#B8ABA0] font-mono">Client Escrow</span>
                        <p className="text-base sm:text-lg font-mono font-bold text-blue-400">100% Protected</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[9px] text-[#B8ABA0] font-mono">Payout Velocity</span>
                        <p className="text-base sm:text-lg font-mono font-bold text-amber-400">&lt; 24h</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-xs text-white">Join 50+ local creators on the early waitlist</span>
                      <Link to="/contact" className="text-xs font-mono text-[#D4A373] hover:underline font-semibold">
                        Apply as Talent ↗
                      </Link>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CreaonnectModernHero;
