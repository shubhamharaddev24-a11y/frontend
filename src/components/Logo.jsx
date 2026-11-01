import React from "react";

const Logo = ({ className = "h-11", showTagline = true, iconOnly = false }) => {
  if (iconOnly) {
    return (
      <img
        src="/logo-emblem.png"
        alt="CREAONNECT"
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 select-none ${className}`}>
      {/* Official CREAONNECT Stylized C-Chevron Emblem */}
      <img
        src="/logo-emblem.png"
        alt="CREAONNECT"
        className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 hover:scale-105 shrink-0"
      />

      {/* Brand Wordmark & Official 3 Pillars Tagline */}
      <div className="flex flex-col text-left justify-center leading-none">
        <span className="font-sans font-black text-xl sm:text-[23px] tracking-[0.05em] text-black dark:text-white transition-colors">
          CREAONNECT
        </span>
        {showTagline && (
          <div className="flex items-center gap-1 sm:gap-1.5 text-[7px] sm:text-[8px] font-sans font-bold uppercase tracking-[0.24em] text-black/85 dark:text-neutral-300 mt-1">
            <span>CREATE</span>
            <span className="text-[#76B900] text-[9px] font-black leading-none">•</span>
            <span>INNOVATE</span>
            <span className="text-[#76B900] text-[9px] font-black leading-none">•</span>
            <span>CONNECT</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
