import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ 
  children, 
  className = "", 
  onClick, 
  href, 
  target = "_self",
  magnetStrength = 0.3,
  ...props 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({
      x: x * magnetStrength,
      y: y * magnetStrength
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      href={href}
      target={href ? target : undefined}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{
          x: position.x,
          y: position.y
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15
        }}
      >
        {children}
      </motion.div>
    </MotionComponent>
  );
};

export default MagneticButton;
