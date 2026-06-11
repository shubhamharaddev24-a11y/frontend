import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const HERO_BG =
  "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=2400&auto=format&fit=crop&q=80";

const AnimatedHero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Background image (100vw x 100vh, object-fit: cover) */}
      <motion.img
        src={HERO_BG}
        alt="Premium cinematic photography background"
        className="absolute inset-0 w-full h-full object-cover object-[30%_center] md:object-center"
        initial={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
        animate={reduceMotion ? { scale: 1 } : { scale: [1.08, 1.02, 1.06] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
        }
      />

      {/* Cinematic overlay (60–70% black gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      {/* Centered content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Premium Photography
            <span className="text-brandAccent">.</span>
            <br />
            Digital Services, Done Right.
          </motion.h1>

          <motion.p
            className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Weddings, portraits, albums, printing, banners, and everyday digital work —
            crafted with a cinematic eye and professional delivery.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.div
              className="inline-flex items-center justify-center rounded-full bg-brandAccent px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-black/30 hover:bg-brandAccentSoft"
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Link to="/contact">Book a Shoot</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
