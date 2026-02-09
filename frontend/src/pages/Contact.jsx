import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
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
          className="mb-8 space-y-3 sm:mb-10"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
            Contact
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Visit, call or message Shubham Photos Studio.
          </h1>
          <p className="max-w-2xl text-sm text-brandTextMuted sm:text-base">
            We are happy to talk about weddings, albums, banners, passport
            photos or any studio work you need. Calls and messages are answered
            by the studio team directly.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-[1.2fr,1.3fr]"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="space-y-4 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm text-brandTextMuted">
            <h2 className="text-sm font-semibold text-white">
              Studio contact details
            </h2>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                Phone
              </p>
              <p className="mt-1 text-sm text-brandTextPrimary">
                +91 92714 56749
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                WhatsApp
              </p>
              <p className="mt-1 text-sm text-brandTextPrimary">
                +91 92714 56749
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                Studio address
              </p>
              <p className="mt-1 text-sm">
                Main bazaar road near bus stand, close to the vegetable market.
                The studio is on the ground floor with clear board outside.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                Working hours
              </p>
              <p className="mt-1 text-sm">
                Every day: <span className="text-brandTextPrimary">9:00 AM – 8:00 PM</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-xs">
              <a
                href="tel:9271456749"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-brandAccent px-5 py-2 font-semibold text-black shadow-md shadow-brandAccent/40 hover:bg-amber-400"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%2C%20I%20would%20like%20to%20book%20a%20shoot%20or%20know%20your%20prices."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-brandAccent/60 bg-brandSurface px-5 py-2 font-semibold text-brandAccent hover:bg-brandSurfaceSoft"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brandBorder bg-brandSurface">
            <iframe
              title="Shubham Photos Studio map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.632823324528!2d75.8788!3d17.4369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z17LjI2ICBD"
              className="h-64 w-full border-0 md:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;

