import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 select-none outline-none ${
        isDark
          ? "border-[#382C25] bg-[#1C1714] text-[#FAF6F0] hover:border-[#C49B89]/60 hover:bg-[#261F1B] shadow-sm shadow-black/40"
          : "border-[#E0D7CC] bg-[#FAF6F0] text-[#1A1A1A] hover:border-[#A67C6B]/60 hover:bg-white shadow-sm"
      } ${className}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      >
        {/* Sun Icon for Light Mode */}
        <Sun
          className={`absolute w-4 h-4 text-[#A67C6B] transition-all duration-300 ${
            isDark ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
          }`}
        />
        {/* Moon Icon for Dark Mode */}
        <Moon
          className={`absolute w-4 h-4 text-[#D4AF37] transition-all duration-300 ${
            isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'
          }`}
        />
      </motion.div>

      {/* Subtle Ambient Radial Glow */}
      <span
        className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ${
          isDark ? 'bg-[#D4AF37]/10 opacity-100' : 'bg-[#A67C6B]/10 opacity-80'
        }`}
      />
    </motion.button>
  );
};

export default ThemeToggle;
