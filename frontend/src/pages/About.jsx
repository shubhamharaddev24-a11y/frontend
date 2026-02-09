import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const About = () => {
  const reduceMotion = useReducedMotion();
  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    }),
    [],
  );

  return (
    <div className="bg-brandBg pb-16 pt-10 text-brandTextPrimary sm:pt-14">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-4"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
            About Shubham Photos Studio
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            A neighbourhood studio built on long-term trust.
          </h1>
          <p className="text-sm text-brandTextMuted sm:text-base">
            Shubham Photos Studio started as a small passport photo counter and
            has grown into a complete photo and digital service centre for our
            village. We capture weddings, design albums, print banners and help
            people with the documents that matter in daily life.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-2"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="space-y-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm text-brandTextMuted">
            <h2 className="text-sm font-semibold text-white">
              Our story & experience
            </h2>
            <p>
              Over the years, Shubham Photos Studio has covered hundreds of
              wedding functions, village processions, school events and small
              ceremonies. Many families now have our photos in every important
              album at home.
            </p>
            <p>
              We understand how precious wedding moments are for parents,
              couples and relatives. That is why we keep backups, deliver
              albums carefully and never compromise on print quality.
            </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm text-brandTextMuted">
            <h2 className="text-sm font-semibold text-white">
              What we believe in
            </h2>
            <ul className="space-y-2">
              <li>
                • Clear communication about shoots, prices and delivery dates.
              </li>
              <li>
                • Blending traditional village style with modern cameras,
                lenses and editing.
              </li>
              <li>
                • Treating every client – whether for a single passport photo or
                a large wedding – with the same respect.
              </li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;

