import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AnimatedServiceCard = ({ name, points, index, mainIcon: MainIcon, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white dark:bg-[#221C19] border border-[#E0D7CC]/70 dark:border-[#3D342E]/70 p-7 sm:p-8 rounded-none flex flex-col justify-between h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-xl font-normal text-[#4A3E37] dark:text-[#F2EDE4] group-hover:text-[#A67C6B] transition-colors">
              {name}
            </h3>
            {MainIcon && (
              <div className="p-2.5 rounded-full bg-[#FAF6F0] dark:bg-[#2C2521] text-[#A67C6B] shrink-0">
                <MainIcon size={20} />
              </div>
            )}
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#88796E] dark:text-[#B8ABA0] font-light">
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
