import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";

const About = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();

  return (
    <div className="bg-brandBg pb-16 pt-24 text-brandTextPrimary sm:pt-28">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-4"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={variants.fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
            About Shubham Media & Digital Services
          </p>
          <h1 className="text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
            A creative agency rooted in local trust and digital excellence.
          </h1>
          <p className="text-sm text-brandTextMuted sm:text-base">
            Shubham Media & Digital Services is a forward-thinking agency that combines
            creative media and modern technology. Through our physical division, 
            <strong> Shubham Photos Studio</strong> in Saralgaon, we continue to serve 
            the local Murbad community with professional wedding films, prints, and 
            e-governance services. Concurrently, our digital division delivers custom 
            full-stack websites, software applications, SEO, and graphic branding solutions.
          </p>
        </motion.div>
 
        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-2"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants.staggerContainer}
        >
          <motion.div className="space-y-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm text-brandTextMuted" variants={variants.fadeUpShort} {...variants.cardHoverSubtle}>
            <h2 className="text-sm font-semibold text-brandTextPrimary">
              Our story & evolution
            </h2>
            <p>
              We started as a local neighborhood passport and photo studio near Murbad. 
              Over the years, we covered hundreds of weddings, traditional Marathi rituals, 
              local festivals, and corporate openings, earning the lifelong trust of local families.
            </p>
            <p>
              As the digital landscape grew, we integrated professional software engineering, 
              modern web designs, and search engine optimization (SEO) into our offerings. Today, 
              we act as a single point of contact for families needing timeless memories and businesses 
              demanding digital growth.
            </p>
          </motion.div>
          <motion.div className="space-y-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm text-brandTextMuted" variants={variants.fadeUpShort} {...variants.cardHoverSubtle}>
            <h2 className="text-sm font-semibold text-brandTextPrimary">
              What we stand for
            </h2>
            <ul className="space-y-2">
              <li>
                • Clear communication regarding event shoots, project delivery timelines, and pricing.
              </li>
              <li>
                • Blending local traditional styles with high-end modern gear, cinema editing, and clean web code.
              </li>
              <li>
                • Treating every client with equal respect—whether for a single passport photo or a full enterprise web application.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;

