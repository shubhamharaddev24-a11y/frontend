import React from "react";

const Logo = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-1 shrink-0 ${className}`}>
      <div className="relative flex items-center">
        {/* Main Cursive Brand Name */}
        <span className="font-script text-3xl sm:text-4xl text-brandTextPrimary tracking-wide select-none transition-colors">
          Shubham
        </span>
        {/* Playful Heart & Camera Lens Motif (Top right of text) */}
        <div className="relative -top-3 left-0.5 flex items-center">
          <svg
            viewBox="0 0 40 40"
            className="w-6 h-6 text-brandAccent fill-none stroke-current"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Camera Body with Heart top */}
            <path d="M12 14h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2z" />
            <circle cx="20" cy="22" r="4.5" />
            <path d="M16 14v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M25 10c1.2-1.5 3.5-1.5 4.5 0s0 3.5-2 5l-2.5 2.5L22.5 15c-2-1.5-3-3.5-2-5s3.3-1.5 4.5 0z" fill="#A67C6B" stroke="none" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col text-left leading-tight pl-1 border-l border-brandBorder/60">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-brandTextPrimary">
          FILMS
        </span>
        <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-brandTextMuted">
          & DIGITAL
        </span>
      </div>
    </div>
  );
};

export default Logo;
