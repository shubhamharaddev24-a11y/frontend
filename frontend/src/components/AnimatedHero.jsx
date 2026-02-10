import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Camera, Aperture, Image } from "lucide-react";

const AnimatedHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 300], [0, 1]);
  const opacity = useTransform(yRange, [0, 1], [1, 0.3]);
  const scale = useTransform(yRange, [0, 1], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingIcons = [
    { Icon: Camera, delay: 0, duration: 3 },
    { Icon: Aperture, delay: 0.5, duration: 3.5 },
    { Icon: Image, delay: 1, duration: 4 },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
      style={{ opacity, scale }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10"
        animate={{
          background: [
            "linear-gradient(to right, rgba(251, 146, 60, 0.1), rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.1))",
            "linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.1), rgba(251, 146, 60, 0.1))",
            "linear-gradient(to right, rgba(234, 179, 8, 0.1), rgba(251, 146, 60, 0.1), rgba(245, 158, 11, 0.1))",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating camera icons */}
      {floatingIcons.map(({ Icon, delay, duration }, index) => (
        <motion.div
          key={index}
          className="absolute text-brandAccent/20"
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={40 + index * 10} />
        </motion.div>
      ))}

      {/* Mouse-following glow effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-brandAccent/5 blur-3xl"
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-brandAccent bg-brandAccent/10 px-4 py-2 rounded-full text-center">
            Shubham Photos Studio
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.span
            className="block text-brandAccent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Capturing Moments,
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Creating Memories
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          From intimate portraits to grand celebrations, we bring your stories
          to life with
          <motion.span
            className="text-brandAccent font-semibold"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {" "}
            cinematic quality
          </motion.span>{" "}
          and artistic vision.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.a
            href="tel:9271456749"
            className="group relative inline-flex items-center gap-2
  bg-brandAccent text-black
  px-5 py-3 text-base
  sm:px-8 sm:py-4 sm:text-lg
  rounded-full font-semibold
  shadow-2xl hover:shadow-brandAccent/50
  transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Call Now</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-brandAccent opacity-0 group-hover:opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>

          <motion.a
            href="https://wa.me/919271456749"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2
  border-2 border-brandAccent text-brandAccent
  px-5 py-3 text-base
  sm:px-8 sm:py-4 sm:text-lg
  rounded-full font-semibold
  hover:bg-brandAccent hover:text-black
  transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>WhatsApp</span>
            <motion.div
              className="w-2 h-2 bg-brandAccent rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-brandAccent rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-brandAccent rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AnimatedHero;
