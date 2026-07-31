import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MouseGlowCard from "./MouseGlowCard";

const AnimatedServiceCard = ({ name, points, index, mainIcon: MainIcon, themeColor, shadowColor, onClick }) => {
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="h-full cursor-pointer relative"
      style={{ willChange: "transform, opacity" }}
      onClick={onClick}
    >
      <MouseGlowCard
        className="happy-card group h-full flex flex-col justify-between p-6"
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
            <h3 className="font-serif text-xl font-normal text-[#1A1A1A] dark:text-[#F2EDE4] group-hover:text-[#A67C6B] transition-colors">
              {name}
            </h3>
            {MainIcon && (
              <div className="p-2.5 rounded-full bg-[#FAF6F0] dark:bg-[#2C2521] text-[#A67C6B] shrink-0">
                <MainIcon size={20} />
              </div>
            )}
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light">
            {points.map((point) => (
              <li key={point} className="flex gap-2 items-start">
                <span className="text-[#A67C6B]">•</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-[#E0D7CC]/40 dark:border-[#3D342E]/40">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A67C6B]">
            <span>Explore Division</span>
            <ArrowRight size={13} className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedServiceCard;
