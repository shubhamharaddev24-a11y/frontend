import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const FloatingContactButtons = () => {
  return (
    <aside
      aria-label="Quick contact options"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 pointer-events-none select-none"
    >
      {/* 1. Phone Call Action Button */}
      <div className="relative flex items-center gap-3 pointer-events-auto group">
        {/* Tooltip on Hover (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#181412]/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl border border-white/15 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Call +91 92714 56749</span>
        </div>

        {/* Pulsing Ripple Wave for Phone */}
        <div className="relative">
          <span className="absolute -inset-1.5 rounded-full bg-emerald-500/40 animate-ping duration-1000 pointer-events-none" />
          <span className="absolute -inset-3 rounded-full bg-emerald-500/20 animate-pulse pointer-events-none" />

          {/* Actual Call Button */}
          <motion.a
            href="tel:9271456749"
            aria-label="Call +91 92714 56749"
            animate={{
              scale: [1, 1.07, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
              delay: 1.2, // Alternating rhythmic pump with WhatsApp
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/40 border border-emerald-300/30 transition-shadow hover:shadow-emerald-500/50"
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
          </motion.a>
        </div>
      </div>

      {/* 2. Official WhatsApp Action Button */}
      <div className="relative flex items-center gap-3 pointer-events-auto group">
        {/* Tooltip on Hover (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#181412]/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl border border-white/15 whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat on WhatsApp</span>
        </div>

        {/* Pulsing Ripple Wave for WhatsApp */}
        <div className="relative">
          <span className="absolute -inset-1.5 rounded-full bg-[#25D366]/40 animate-ping duration-1000 pointer-events-none" />
          <span className="absolute -inset-3 rounded-full bg-[#25D366]/20 animate-pulse pointer-events-none" />

          {/* Actual WhatsApp Button */}
          <motion.a
            href="https://wa.me/919271456749?text=Hi%20CREAONNECT%2C%20I%20want%20to%20enquire%20about%20your%20services%20(Photography%2C%20Web%20Development%20or%20Marketing)."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with CREAONNECT on WhatsApp"
            animate={{
              scale: [1, 1.09, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] via-[#20BA5A] to-[#128C7E] text-white shadow-xl shadow-green-950/40 border border-emerald-200/40 transition-shadow hover:shadow-[#25D366]/60"
          >
            {/* Real Official WhatsApp Logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-sm"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.21 1.488 4.793 1.489 5.485 0 9.948-4.467 9.95-9.953.001-2.657-1.02-5.155-2.877-7.017C16.6 1.81 14.107.784 11.457.784c-5.49 0-9.957 4.469-9.96 9.957-.001 1.796.485 3.548 1.408 5.105L1.874 21.98l6.21-1.626-.037-.02-.02-.012z" />
              <path d="M16.924 13.917c-.295-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.662.148-.195.297-.759.962-.93.158-.172-.1-.344-.226-.52-.382-.693-.618-1.162-1.38-1.298-1.614-.136-.233-.015-.36.1-.478.105-.107.23-.27.345-.405.115-.135.153-.225.23-.375.075-.15.038-.282-.018-.394-.057-.113-.467-1.127-.64-1.542-.168-.406-.338-.351-.466-.358-.12-.006-.258-.007-.396-.007-.138 0-.363.052-.553.26-.191.208-.728.712-.728 1.734s.744 2.01 1.01 2.37c.265.36 1.463 2.234 3.544 3.132.495.213.882.34 1.182.436.498.158.951.135 1.309.082.399-.058 1.748-.713 1.996-1.402.248-.689.248-1.28.173-1.402-.075-.12-.27-.225-.565-.373z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </aside>
  );
};

export default FloatingContactButtons;
