import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Film, 
  Code2, 
  Users2, 
  Camera, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  SlidersHorizontal,
  Play
} from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CreaonnectScrollHero = () => {
  const containerRef = useRef(null);
  const marqueeTextRef = useRef(null);
  const imagePortalRef = useRef(null);
  const overlayTextRef = useRef(null);

  const [lutFilter, setLutFilter] = useState("golden");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Horizontal Marquee Typography Drifting on Scroll
      gsap.to(marqueeTextRef.current, {
        x: "-28%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2
        }
      });

      // 2. Smooth Image Scaling & Clipping Expansion
      gsap.fromTo(
        imagePortalRef.current,
        {
          scale: 0.88,
          borderRadius: "28px"
        },
        {
          scale: 1.02,
          borderRadius: "16px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center center",
            scrub: 1
          }
        }
      );

      // 3. Ambient Title Subtly Glides Upward
      gsap.to(overlayTextRef.current, {
        y: -40,
        opacity: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "35% top",
          scrub: 0.8
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[165vh] bg-[#F2EDE4] dark:bg-[#0A0908] text-[#1A1A1A] dark:text-[#F2EDE4]">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-12 selection:bg-[#A67C6B]/30 bg-[#F2EDE4] dark:bg-[#0A0908]">
        
        {/* Warm Obsidian & Terracotta Ambient Lighting */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[500px] pointer-events-none opacity-60 dark:opacity-100"
          style={{
            background: "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(166, 124, 107, 0.25) 0%, rgba(212, 163, 115, 0.08) 40%, rgba(0,0,0,0) 80%)"
          }}
        />

        {/* ===================================================================== */}
        {/* 1. HORIZONTAL DRIFTING MARQUEE (GSAP Scroll-Linked Parallax) */}
        {/* ===================================================================== */}
        <div className="absolute top-28 sm:top-32 inset-x-0 overflow-hidden pointer-events-none z-0 opacity-25">
          <div 
            ref={marqueeTextRef}
            className="flex whitespace-nowrap text-6xl sm:text-8xl md:text-9xl font-serif font-black tracking-tight text-transparent select-none"
            style={{
              WebkitTextStroke: "1.5px rgba(166, 124, 107, 0.25)",
              willChange: "transform"
            }}
          >
            <span>CREAONNECT • CINEMATIC ARTISTRY • DIGITAL PRECISION • CREATOR MARKETPLACE •&nbsp;</span>
            <span>CREAONNECT • CINEMATIC ARTISTRY • DIGITAL PRECISION • CREATOR MARKETPLACE •&nbsp;</span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. EDITORIAL BRAND TITLE (High-Contrast in both Light & Dark Mode) */}
        {/* ===================================================================== */}
        <div ref={overlayTextRef} className="relative z-10 max-w-4xl mx-auto text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5DCD1]/90 dark:bg-[#181412] border border-[#A67C6B]/40 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A67C6B] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#8C6A5A] dark:text-[#D4A373] font-semibold">
              Creative • Innovate • Connect
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1A1A1A] dark:text-white leading-tight">
            Where Cinema Artistry <br />
            <span className="italic font-light text-[#A67C6B] dark:text-[#D4A373]">Meets</span>{" "}
            <span className="font-sans font-extrabold bg-gradient-to-r from-[#1A1A1A] via-[#6D5347] to-[#A67C6B] dark:from-white dark:via-[#F2EDE4] dark:to-[#A67C6B] bg-clip-text text-transparent">
              Digital Precision.
            </span>
          </h1>
        </div>

        {/* ===================================================================== */}
        {/* 3. CENTRAL THEATER STAGE: Fit-To-Viewport (Never Cuts Off at Bottom!) */}
        {/* ===================================================================== */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex-1 flex items-center justify-center my-auto px-2">
          <div 
            ref={imagePortalRef}
            className="relative w-full h-[60vh] sm:h-[66vh] max-h-[540px] rounded-3xl bg-[#120F0D] border border-white/15 p-2.5 sm:p-4 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden"
            style={{ willChange: "transform, border-radius" }}
          >
            {/* macOS Window Top Control Bar */}
            <div className="shrink-0 flex items-center justify-between gap-2 pb-2.5 px-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] font-mono text-[#8C7A70] hidden sm:inline">
                  creaonnect.cinema.master
                </span>
              </div>

              {/* Real-time Color LUT Switcher */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setLutFilter("golden")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    lutFilter === "golden" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Golden Luxe
                </button>
                <button
                  onClick={() => setLutFilter("warm")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    lutFilter === "warm" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Warm 35mm
                </button>
                <button
                  onClick={() => setLutFilter("raw")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    lutFilter === "raw" ? "bg-[#A67C6B] text-white font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Natural Raw
                </button>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 hidden sm:inline">
                ● 4K ProRes HQ
              </span>
            </div>

            {/* Display Canvas with Flexbox constraint */}
            <div className="flex-1 min-h-0 relative rounded-xl overflow-hidden bg-black mt-2.5 border border-white/5">
              <img
                src="/images/wedding-varmala-moment.png"
                alt="The Royal Marathi Wedding Varmala"
                className={`w-full h-full object-cover object-[center_20%] transition-all duration-500 ${
                  lutFilter === "golden"
                    ? "brightness-95 contrast-105 saturate-110"
                    : lutFilter === "warm"
                    ? "brightness-100 sepia-[0.25] saturate-125 contrast-110"
                    : "brightness-95 contrast-95 saturate-90"
                }`}
              />

              {/* Overlay Information */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35 p-4 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/70 text-[#F2EDE4] backdrop-blur-md border border-white/15">
                    <Film size={11} className="text-[#A67C6B]" />
                    Shot on Sony Cinema FX3
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-mono text-[#D4A373] tracking-widest uppercase">
                      Editorial Wedding Cinema
                    </p>
                    <h3 className="font-serif text-lg sm:text-2xl text-white font-medium mt-0.5">
                      The Royal Marathi Varmala & Mandap Celebration
                    </h3>
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
            </div>

          </div>
        </div>

        {/* 4. Bottom Scroll Cue */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center pb-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5DCD1]/90 dark:bg-white/5 border border-[#A67C6B]/40 dark:border-white/10 text-[11px] font-mono text-[#5A453D] dark:text-[#B8ABA0] backdrop-blur-md shadow-sm">
            <span>Scroll to explore</span>
            <span className="text-[#A67C6B] dark:text-[#D4A373] animate-bounce">↓</span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default CreaonnectScrollHero;
