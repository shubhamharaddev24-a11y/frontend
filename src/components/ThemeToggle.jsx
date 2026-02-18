import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/30 dark:border-white/10 dark:bg-black/20 ${className}`}
      whileHover={{ scale: 1.1, rotate: isDark ? 180 : 0 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sun 
          className={`absolute w-4 h-4 text-brandAccent transition-all ${
            isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        />
        <Moon 
          className={`absolute w-4 h-4 text-white/80 transition-all ${
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        />
      </motion.div>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-brandAccent/10"
        animate={{ 
          scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: isDark ? [0.18, 0.35, 0.18] : [0.12, 0.24, 0.12]
        }}
        transition={{ 
          duration: isDark ? 4 : 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
