import { useMemo } from 'react';

// Reusable motion variants for consistent animations across the app
export const useMotionVariants = () => {
  
  return useMemo(() => ({
    // Page and section entry animations
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    },
    
    fadeUpShort: {
      hidden: { opacity: 0, y: 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    },
    
    fadeIn: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    },
    
    // Stagger container for children animations
    staggerContainer: {
      hidden: {},
      show: { 
        transition: { 
          staggerChildren: 0.1, 
          delayChildren: 0.05 
        } 
      },
    },
    
    staggerSlowContainer: {
      hidden: {},
      show: { 
        transition: { 
          staggerChildren: 0.15, 
          delayChildren: 0.1 
        } 
      },
    },
    
    // Card hover animations
    cardHover: {
      whileHover: { 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 25 }
      },
      whileTap: { scale: 0.98 }
    },
    
    cardHoverSubtle: {
      whileHover: { 
        y: -4, 
        transition: { type: "spring", stiffness: 400, damping: 30 }
      }
    },
    
    // Button animations
    buttonTap: {
      whileTap: { scale: 0.96 }
    },
    
    buttonHover: {
      whileHover: { 
        scale: 1.03,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      },
      whileTap: { scale: 0.96 }
    },
    
    // Image animations
    imageFadeIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }
      },
    },
    
    imageHover: {
      whileHover: { 
        scale: 1.03,
        transition: { duration: 0.3, ease: "easeOut" }
      }
    },
    
    // Navigation animations
    navLinkHover: {
      whileHover: { 
        y: -1,
        transition: { duration: 0.2, ease: "easeOut" }
      }
    },
    
    // Modal/Drawer animations
    modalOverlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    },
    
    modalContent: {
      initial: { opacity: 0, scale: 0.96, y: 20 },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }
      },
      exit: { 
        opacity: 0, 
        scale: 0.96, 
        y: 20,
        transition: { duration: 0.2 }
      }
    },
    
    // Mobile menu animations
    mobileMenuOverlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    },
    
    mobileMenuContent: {
      initial: { x: "100%", opacity: 0 },
      animate: { 
        x: 0, 
        opacity: 1,
        transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }
      },
      exit: { 
        x: "100%", 
        opacity: 0,
        transition: { duration: 0.2 }
      }
    },
    
    // Header scroll animation (transparent over hero, solid on scroll)
    headerScroll: {
      scrolled: {
        backgroundColor: "var(--header-bg-scrolled)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: "var(--header-border-scrolled)",
        transition: { duration: 0.3, ease: "easeOut" }
      },
      top: {
        backgroundColor: "var(--header-bg-top)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderColor: "var(--header-border-top)",
        transition: { duration: 0.3, ease: "easeOut" }
      }
    }
  }), []);
};

// Hook for reduced motion considerations
export const useReducedMotionProps = (reduceMotion) => {
  return useMemo(() => {
    if (reduceMotion) {
      return {
        initial: "show",
        whileHover: undefined,
        whileTap: undefined,
        animate: undefined,
        variants: undefined
      };
    }
    return {};
  }, [reduceMotion]);
};

// Common viewport settings for scroll-triggered animations
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "-50px 0px"
};

// Optimized motion features for performance
export const motionFeatures = {
  reducedMotion: "user",
  layout: false,
  animation: true,
  transform: true,
  transition: true
};
