import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SplitText = ({ children, className = "", delay = 0, speed = 0.6 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  if (typeof children !== "string") return <span className={className}>{children}</span>;

  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: "115%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: speed,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block overflow-hidden pb-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span className="inline-block" variants={childVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
