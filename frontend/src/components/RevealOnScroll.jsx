import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const RevealOnScroll = ({ 
  children, 
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const reduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (reduceMotion) return {};
    
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      case "scale":
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  const getFinalPosition = () => {
    if (reduceMotion) return {};
    return { opacity: 1, x: 0, y: 0, scale: 1 };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
