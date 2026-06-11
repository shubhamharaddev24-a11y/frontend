import React from "react";

const Logo = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`${className} shrink-0`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(255,122,24,0.15)]"
      >
        <defs>
          {/* Top-Left Wing: Orange to Yellow */}
          <linearGradient id="logo-orange-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5a00" />
            <stop offset="60%" stopColor="#ff9f00" />
            <stop offset="100%" stopColor="#ffcc00" />
          </linearGradient>

          {/* Top/Center Wing: Yellow to Green */}
          <linearGradient id="logo-yellow-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffcc00" />
            <stop offset="40%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Center-Right/Purple: Green to Purple */}
          <linearGradient id="logo-green-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Bottom-Right/Pink: Purple to Pink */}
          <linearGradient id="logo-purple-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>

          {/* Bottom-Left/Blue: Pink to Blue */}
          <linearGradient id="logo-pink-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>

          {/* Left/Teal: Blue to Orange */}
          <linearGradient id="logo-blue-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#ff5a00" />
          </linearGradient>

          {/* Clip-path to ensure the outer boundary is a perfect circle */}
          <clipPath id="logo-circle-clip">
            <circle cx="250" cy="250" r="210" />
          </clipPath>

          {/* Mask to cut out the transparent letter "S" channel */}
          <mask id="logo-s-mask">
            {/* White circle: Keep everything in the circle visible */}
            <circle cx="250" cy="250" r="215" fill="#ffffff" />
            {/* Black S path: Cut this path out to make it transparent */}
            <path
              d="M 390 85
                 C 240 50, 130 150, 190 230
                 C 220 260, 280 240, 310 270
                 C 370 350, 260 450, 110 415"
              fill="none"
              stroke="#000000"
              strokeWidth="60"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>

        {/* Masked and Clipped group that builds the multi-segment circle wheel */}
        <g mask="url(#logo-s-mask)" clipPath="url(#logo-circle-clip)">
          {/* Segment 1: Top-Left (Orange-Yellow) */}
          <path
            d="M 250 250 L 0 150 L 0 0 L 200 0 Z"
            fill="url(#logo-orange-yellow)"
          />
          {/* Segment 2: Top-Right (Yellow-Green) */}
          <path
            d="M 250 250 L 200 0 L 500 0 L 500 180 Z"
            fill="url(#logo-yellow-green)"
          />
          {/* Segment 3: Center-Right (Green-Purple) */}
          <path
            d="M 250 250 L 500 180 L 500 350 L 350 450 Z"
            fill="url(#logo-green-purple)"
          />
          {/* Segment 4: Bottom-Right (Purple-Pink) */}
          <path
            d="M 250 250 L 350 450 L 500 500 L 200 500 Z"
            fill="url(#logo-purple-pink)"
          />
          {/* Segment 5: Bottom-Left (Pink-Blue) */}
          <path
            d="M 250 250 L 200 500 L 0 500 L 0 300 Z"
            fill="url(#logo-pink-blue)"
          />
          {/* Segment 6: Left-Sweep (Blue-Orange) */}
          <path
            d="M 250 250 L 0 300 L 0 150 Z"
            fill="url(#logo-blue-orange)"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
