import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border bg-slate-200 dark:bg-slate-700 p-2 transition-colors hover:bg-slate-300 dark:hover:bg-slate-600 ${className}`}
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
          className={`absolute w-4 h-4 text-amber-500 transition-all ${
            isDark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        />
        <Moon 
          className={`absolute w-4 h-4 text-slate-400 transition-all ${
            isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        />
      </motion.div>
      
      {/* Subtle glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDark ? 'bg-amber-500/20' : 'bg-slate-400/10'
        }`}
        animate={{ 
          scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: isDark ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2]
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
