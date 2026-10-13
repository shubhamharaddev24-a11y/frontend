import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";
import EnvelopeCard from "../components/EnvelopeCard";

const About = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();

  return (
    <div className="bg-brandBg text-brandTextPrimary min-h-screen pb-20 pt-32 px-6 sm:px-12">
      <section className="mx-auto max-w-5xl space-y-12">
        <motion.div
          className="space-y-4 text-center max-w-3xl mx-auto"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={variants.fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandAccent">
            ABOUT CREAONNECT
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brandTextPrimary font-normal leading-tight">
            A creative & digital agency powered by three pillars of excellence.
          </h1>
          <p className="text-sm sm:text-base text-brandTextMuted font-light leading-relaxed pt-2">
            <strong>CREAONNECT</strong> brings together high-end photography, cinematic wedding films, modern software engineering, and community-driven digital services. Built on the three pillars of <strong>CREATE</strong>, <strong>INNOVATE</strong>, and <strong>CONNECT</strong>, we serve families with timeless memories while empowering businesses with modern digital tools.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants.staggerContainer}
        >
          <motion.div className="space-y-3 rounded-2xl border border-brandBorder bg-brandSurface p-8 text-sm text-brandTextMuted font-light leading-relaxed shadow-sm" variants={variants.fadeUpShort}>
            <h2 className="font-serif text-xl font-normal text-brandTextPrimary">
              Our Story & Evolution
            </h2>
            <p>
              We began with a passion for visual storytelling and community trust. Over the years, we captured hundreds of traditional Indian weddings, Marathi rituals, and family milestones, earning the lifelong confidence of our clients.
            </p>
            <p>
              As technology evolved, we expanded our creative studio into <strong>CREAONNECT</strong>: integrating modern full-stack web development, search engine marketing, and digital branding to act as a single point of contact for families needing priceless memories and businesses demanding digital growth.
            </p>
          </motion.div>
          <motion.div className="space-y-3 rounded-2xl border border-brandBorder bg-brandSurface p-8 text-sm text-brandTextMuted font-light leading-relaxed shadow-sm" variants={variants.fadeUpShort}>
            <h2 className="font-serif text-xl font-normal text-brandTextPrimary">
              The Three Pillars Philosophy
            </h2>
            <ul className="space-y-2">
              <li>• <strong>CREATE:</strong> Preserving raw emotions and authentic milestones with cinematic clarity and timeless visual art.</li>
              <li>• <strong>INNOVATE:</strong> Architecting fast web applications, clean codebases, and local SEO strategies that drive measurable results.</li>
              <li>• <strong>CONNECT:</strong> Building a seamless bridge between clients, creative directors, and growing enterprises with total transparency.</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Centered Thank You Envelope Section */}
        <motion.div
          className="mt-16 flex flex-col items-center justify-center text-center gap-5"
          variants={variants.fadeUp}
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A67C6B]">
            A Special Note
          </p>
          <EnvelopeCard
            title="Thank You"
            subtitle="It's so nice that you took the time to read our story."
            body="Wishing you a fantastic day ahead!"
            signature="CREAONNECT"
            useLogoSeal={true}
          />
          <p className="text-xs text-[#88796E] dark:text-[#B8ABA0] italic font-light">
            Hover or tap the envelope seal to open the letter.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;

