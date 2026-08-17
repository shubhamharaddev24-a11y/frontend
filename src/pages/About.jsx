import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";
import EnvelopeCard from "../components/EnvelopeCard";

const About = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();

  return (
    <div className="bg-[#F2EDE4] dark:bg-[#181412] text-[#1A1A1A] dark:text-[#F2EDE4] min-h-screen pb-20 pt-32 px-6 sm:px-12">
      <section className="mx-auto max-w-5xl space-y-12">
        <motion.div
          className="space-y-4 text-center max-w-3xl mx-auto"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={variants.fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4A4A4A] dark:text-[#B8ABA0]">
            ABOUT SHUBHAM MEDIA & DIGITAL
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F2EDE4] font-normal leading-tight">
            A creative agency rooted in local trust and digital excellence.
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed pt-2">
            Shubham Media & Digital Services combines high-end photography, cinematic wedding films, and modern software engineering. Through our physical division,
            <strong className="font-medium text-[#1A1A1A] dark:text-[#F2EDE4]"> Shubham Photos Studio</strong> in Saralgaon, we serve the local Murbad community with timeless photo stories, prints, and e-governance services, alongside enterprise web applications and SEO.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants.staggerContainer}
        >
          <motion.div className="space-y-3 rounded-none border border-[#E0D7CC]/70 dark:border-[#3D342E]/70 bg-white dark:bg-[#221C19] p-8 text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed" variants={variants.fadeUpShort}>
            <h2 className="font-serif text-xl font-normal text-[#1A1A1A] dark:text-[#F2EDE4]">
              Our Story & Journey
            </h2>
            <p>
              We started as a local neighborhood studio near Murbad. Over the years, we covered hundreds of traditional Indian weddings, Marathi rituals, and family milestones, earning the lifelong trust of local families.
            </p>
            <p>
              Integrating modern web development, search engine marketing, and digital branding, we act as a single point of contact for families needing timeless memories and businesses demanding digital growth.
            </p>
          </motion.div>
          <motion.div className="space-y-3 rounded-none border border-[#E0D7CC]/70 dark:border-[#3D342E]/70 bg-white dark:bg-[#221C19] p-8 text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed" variants={variants.fadeUpShort}>
            <h2 className="font-serif text-xl font-normal text-[#1A1A1A] dark:text-[#F2EDE4]">
              Our Core Philosophy
            </h2>
            <ul className="space-y-2">
              <li>• Preserving raw emotions and authentic couple moments with cinematic clarity.</li>
              <li>• Seamless communication regarding event coverage, delivery timelines, and pricing.</li>
              <li>• Blending traditional warmth with state-of-the-art camera gear, color grading, and clean web architecture.</li>
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
            signature="SHUBHAM MEDIA"
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

