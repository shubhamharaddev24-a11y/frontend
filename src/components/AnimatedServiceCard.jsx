import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MouseGlowCard from "./MouseGlowCard";
import FireworkSparks from "./FireworkSparks";

const AnimatedServiceCard = ({ name, points, index, mainIcon: MainIcon, themeColor, shadowColor, onClick, reveal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const activeReveal = reveal !== undefined ? reveal : isInView;
  const [showSparks, setShowSparks] = useState(false);

  useEffect(() => {
    if (!activeReveal) return;

    // Fire sparks exactly when the card reaches its final position and recoils
    const timer = setTimeout(() => {
      setShowSparks(true);
    }, index * 80 + 300);

    // Automatic cleanup: unmount sparks after 1 second to release memory and prevent DOM weight
    const cleanupTimer = setTimeout(() => {
      setShowSparks(false);
    }, index * 80 + 1300);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, [activeReveal, index]);

  // Coordinates to collect cards at the center of the container grid
  const getCollectOffset = (idx) => {
    switch (idx) {
      case 0: // Top-left -> shift down-right
        return { x: 120, y: 100, rotate: -12 };
      case 1: // Top-center -> shift down
        return { x: 0, y: 120, rotate: 0 };
      case 2: // Top-right -> shift down-left
        return { x: -120, y: 100, rotate: 12 };
      case 3: // Bottom-left -> shift up-right
        return { x: 120, y: -100, rotate: -8 };
      case 4: // Bottom-center -> shift up
        return { x: 0, y: -120, rotate: 0 };
      case 5: // Bottom-right -> shift up-left
        return { x: -120, y: -100, rotate: 8 };
      default:
        return { x: 0, y: 0, rotate: 0 };
    }
  };

  const collectOffset = getCollectOffset(index);

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        x: collectOffset.x, 
        y: collectOffset.y, 
        scale: 0.1, 
        rotate: collectOffset.rotate 
      }}
      animate={activeReveal ? { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1, 
        rotate: 0 
      } : { 
        opacity: 0, 
        x: collectOffset.x, 
        y: collectOffset.y, 
        scale: 0.1, 
        rotate: collectOffset.rotate 
      }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 11, // Bouncy fireworks recoil effect
        mass: 1,
        delay: index * 0.1
      }}
      className="h-full cursor-pointer relative"
      style={{ willChange: "transform, opacity" }}
      onClick={onClick}
    >
      {/* Reusable sparkle burst component centered on card */}
      {showSparks && <FireworkSparks color={themeColor} />}

      <MouseGlowCard
        className="happy-card group h-full flex flex-col justify-between p-6 relative z-10"
        style={{
          "--card-theme-color": themeColor,
          "--card-shadow-color": shadowColor
        }}
      >
        {/* Expanding circle overlay (starts small behind the icon) */}
        <div className="overlay-circle" />

        {/* Card Header Content */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="card-title text-base font-bold text-brandTextPrimary tracking-wide sm:text-lg">
              {name}
            </h3>
            {/* The icon circle wrapper */}
            <div className="icon-circle shrink-0">
              {MainIcon && <MainIcon size={20} className="relative z-10" />}
            </div>
          </div>

          {/* Service points list */}
          <ul className="space-y-3 text-xs sm:text-sm text-brandTextMuted">
            {points.map((point, pIndex) => (
              <li
                key={point}
                className="card-point flex gap-2.5 items-start transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionDelay: `${pIndex * 30}ms` }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: themeColor }}
                />
                <span className="leading-relaxed font-light">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Link / Card Footer */}
        <div className="card-link mt-8 pt-4 border-t border-brandBorder/40">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-brandAccentSoft transition-all duration-300"
            style={{ color: themeColor }}
          >
            <span>
              View full service details
            </span>
            <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </MouseGlowCard>
    </motion.div>
  );
};

export default AnimatedServiceCard;
