import React from "react";

const Logo = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* 3-Pillar Geometric Emblem in Signature Electric Green (#76B900) */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#76B900]/20 via-[#76B900]/10 to-transparent border border-[#76B900]/50 shadow-sm text-[#76B900] transition-transform duration-300 hover:scale-105">
        <svg
          viewBox="0 0 36 36"
          className="w-5 h-5 fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Node 1: Create */}
          <circle cx="11.5" cy="12.5" r="4" stroke="#76B900" strokeWidth="2.2" />
          <circle cx="11.5" cy="12.5" r="1.5" fill="#76B900" stroke="none" />

          {/* Node 2: Innovate */}
          <circle cx="24.5" cy="12.5" r="4" stroke="#76B900" strokeWidth="2.2" />
          <circle cx="24.5" cy="12.5" r="1.5" fill="#76B900" stroke="none" />

          {/* Node 3: Connect */}
          <circle cx="18" cy="24.5" r="4" stroke="#76B900" strokeWidth="2.2" />
          <circle cx="18" cy="24.5" r="1.5" fill="#76B900" stroke="none" />

          {/* Dynamic Interconnecting Lines */}
          <line x1="15.5" y1="12.5" x2="20.5" y2="12.5" stroke="#76B900" strokeWidth="1.8" strokeDasharray="1.5 1.5" />
          <line x1="13.5" y1="16" x2="16" y2="21" stroke="#76B900" strokeWidth="1.8" />
          <line x1="22.5" y1="16" x2="20" y2="21" stroke="#76B900" strokeWidth="1.8" />
        </svg>
      </div>

      {/* Brand Wordmark & Pillars Tagline - Completely Black, Not Mixed */}
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center font-sans font-black text-2xl sm:text-[26px] tracking-[0.04em] select-none text-black dark:text-white transition-colors">
          CREAONNECT
        </div>
        <span className="text-[8px] sm:text-[8.5px] font-sans font-bold uppercase tracking-[0.24em] text-black/75 dark:text-neutral-300 mt-0.5">
          Create • Innovate • Connect
        </span>
      </div>
    </div>
  );
};

export default Logo;
