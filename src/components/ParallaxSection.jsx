import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ParallaxSection = ({ children, className = "", bgImage, speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ y, opacity }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            y: useTransform(scrollYProgress, [0, 1], [0, -100])
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default ParallaxSection;
