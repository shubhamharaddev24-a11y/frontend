import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MouseGlowCard from "./MouseGlowCard";

const AnimatedServiceCard = ({ name, points, index, mainIcon: MainIcon, themeColor, shadowColor, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

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
      className="h-full cursor-pointer"
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
