import React from "react";

const Logo = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Refined 3-Pillar Geometric Emblem (Create • Innovate • Connect) */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#A67C6B]/20 via-[#A67C6B]/10 to-transparent border border-[#A67C6B]/30 shadow-sm text-[#A67C6B] transition-transform duration-300 hover:scale-105">
        <svg
          viewBox="0 0 36 36"
          className="w-5 h-5 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Node 1: Create (Aperture / Art) */}
          <circle cx="11.5" cy="12.5" r="4" className="stroke-[#1A1A1A] dark:stroke-[#F2EDE4]" strokeWidth="2.2" />
          <circle cx="11.5" cy="12.5" r="1.5" className="fill-[#1A1A1A] dark:fill-[#F2EDE4]" stroke="none" />

          {/* Node 2: Innovate (Digital / Tech) */}
          <circle cx="24.5" cy="12.5" r="4" className="stroke-[#A67C6B]" strokeWidth="2.2" />
          <circle cx="24.5" cy="12.5" r="1.5" className="fill-[#A67C6B]" stroke="none" />

          {/* Node 3: Connect (Bridge / Community) */}
          <circle cx="18" cy="24.5" r="4" className="stroke-[#A67C6B]" strokeWidth="2.2" />
          <circle cx="18" cy="24.5" r="1.5" className="fill-[#A67C6B]" stroke="none" />

          {/* Dynamic Interconnecting Lines */}
          <line x1="15.5" y1="12.5" x2="20.5" y2="12.5" strokeDasharray="1.5 1.5" />
          <line x1="13.5" y1="16" x2="16" y2="21" />
          <line x1="22.5" y1="16" x2="20" y2="21" />
        </svg>
      </div>

      {/* Brand Wordmark & Pillars Tagline */}
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center font-sans font-black text-2xl sm:text-[26px] tracking-[0.04em] select-none">
          {/* CREA in Bold Editorial Charcoal/Black */}
          <span className="text-[#1A1A1A] dark:text-[#F2EDE4] transition-colors">
            CREA
          </span>
          {/* ONNECT in Signature Warm Terracotta */}
          <span className="text-[#A67C6B] transition-colors">
            ONNECT
          </span>
        </div>
        <span className="text-[8px] sm:text-[8.5px] font-sans font-semibold uppercase tracking-[0.24em] text-[#8C6A5A] dark:text-[#B8ABA0] mt-0.5">
          Create • Innovate • Connect
        </span>
      </div>
    </div>
  );
};

export default Logo;
