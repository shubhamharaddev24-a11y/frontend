import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    }),
    [],
  );

  const stagger = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
    }),
    [],
  );

  const hoverCard = reduceMotion
    ? {}
    : {
        whileHover: { y: -4, scale: 1.02 },
        transition: { type: "spring", stiffness: 220, damping: 22 },
      };

  return (
    <div className="bg-brandBg text-brandTextPrimary">
      {/* Hero */}
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-black">
        {/* Background video */}
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-70"
            src="/background-village-wedding.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-brandBg" />
        </div>

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:flex-row lg:items-center"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={stagger}
        >
          {/* Left copy */}
          <div className="flex-1 space-y-5">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft"
              variants={fadeUp}
            >
              Shubham Photos Studio
            </motion.p>
            <motion.h1
              className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
              variants={fadeUp}
            >
              Cinematic wedding stories
              <span className="block text-brandAccent">
                for village, traditional and modern families.
              </span>
            </motion.h1>
            <motion.p
              className="max-w-xl text-sm text-brandTextMuted sm:text-base"
              variants={fadeUp}
            >
              From passport photos to full wedding films, Shubham Photos Studio
              keeps every memory safe – with trusted local service and modern
              digital quality.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={fadeUp}
            >
              <motion.a
                href="tel:9271456749"
                className="inline-flex items-center rounded-full bg-brandAccent px-7 py-2.5 text-sm font-semibold text-black shadow-lg shadow-brandAccent/40 hover:bg-amber-400"
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              >
                Call for booking
              </motion.a>
              <motion.a
                href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20photography."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-brandAccent/60 bg-brandSurface/60 px-6 py-2.5 text-sm font-medium text-brandAccent hover:bg-brandSurface"
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              >
                WhatsApp enquiry
              </motion.a>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.16em] text-brandTextMuted"
            >
              <span>Wedding Photography & Video</span>
              <span className="hidden sm:inline">Pre-Wedding Shoots</span>
              <span className="hidden sm:inline">Printing, DTP & Stationery</span>
            </motion.div>
          </div>

          {/* Right highlight card */}
          <motion.div
            className="mt-10 w-full max-w-sm flex-1 rounded-2xl border border-brandBorder bg-gradient-to-b from-brandSurface to-brandSurfaceSoft/80 p-5 shadow-2xl lg:mt-0"
            variants={fadeUp}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brandTextMuted">
              Why people choose us
            </p>
            <ul className="mt-4 space-y-3 text-sm text-brandTextMuted">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandAccent" />
                <span>
                  Complete studio for{" "}
                  <span className="text-brandTextPrimary">
                    wedding, pre-wedding, passport and printing
                  </span>{" "}
                  under one roof.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandAccent" />
                <span>
                  Friendly village-style service with{" "}
                  <span className="text-brandTextPrimary">
                    modern editing, albums and digital delivery.
                  </span>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandAccent" />
                <span>
                  Ready for future cyber services –{" "}
                  <span className="text-brandTextPrimary">
                    Aadhaar, PAN, and online forms
                  </span>{" "}
                  from the same trusted counter.
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick service highlights */}
      <section className="border-y border-brandBorder/70 bg-brandSurfaceSoft/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          {[
            {
              title: "Wedding photography & films",
              body: "Full-day coverage, village baraat, traditional rituals and cinematic couple moments.",
            },
            {
              title: "Prints, albums & DTP",
              body: "Passport photos, instant prints, album design, biodata and resume creation.",
            },
            {
              title: "Banners, cards & digital",
              body: "Wedding cards, political banners, flex posters and future-ready cyber desk.",
            },
          ].map((item) => (
            <div key={item.title} className="flex-1 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandAccentSoft">
                {item.title}
              </p>
              <p className="text-xs text-brandTextMuted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services summary */}
      <section className="bg-brandBg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 text-center sm:mb-10"
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
              Services
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Everything you expect from a complete photo studio.
            </h2>
            <p className="mt-3 text-sm text-brandTextMuted sm:text-base">
              Wedding coverage, day-to-day studio work and digital support for your
              family, business and studies.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                name: "Wedding photography & videography",
                points: [
                  "Village and city weddings, haldi, sangeet and reception",
                  "Edited highlight films and long coverage",
                  "Custom album designing and prints",
                ],
              },
              {
                name: "Pre-wedding & portraits",
                points: [
                  "Outdoor pre-wedding concepts close to nature",
                  "Family portraits and kids' shoots",
                  "Studio lighting for formal photos",
                ],
              },
              {
                name: "Passport & print studio",
                points: [
                  "Passport, visa and ID photos with instant print",
                  "Photo lamination, enlargement and framing support",
                  "Scanning and old photo restoration",
                ],
              },
              {
                name: "Wedding cards & stationery",
                points: [
                  "Traditional Marathi lagna-patrika and modern invitations",
                  "Engagement, reception and baby naming cards",
                  "School forms, files and notebooks support",
                ],
              },
              {
                name: "Banners, posters & flex",
                points: [
                  "Political banners and meeting flex boards",
                  "Wedding, birthday and opening ceremony backdrops",
                  "Business posters and shop front branding",
                ],
              },
              {
                name: "DTP & future cyber desk",
                points: [
                  "Biodata, CV and resume design with printing",
                  "Pamphlets, ID cards and application forms",
                  "Aadhaar, PAN and online forms – coming soon",
                ],
              },
            ].map((service) => (
              <motion.div
                key={service.name}
                className="flex h-full flex-col rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm shadow-md"
                variants={fadeUp}
                {...hoverCard}
              >
                <h3 className="mb-3 text-base font-semibold text-white">
                  {service.name}
                </h3>
                <ul className="flex-1 space-y-2 text-xs text-brandTextMuted">
                  {service.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1 h-1 w-1 rounded-full bg-brandAccent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="mt-4 inline-flex text-xs font-semibold text-brandAccent hover:text-brandAccentSoft"
                >
                  View full service details →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured work preview */}
      <section className="bg-brandSurface py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
                Featured work
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Real couples, real village stories.
              </h2>
              <p className="mt-3 text-sm text-brandTextMuted sm:max-w-md">
                A quick glimpse of weddings, pre-wedding shoots and banner designs
                captured by our team.
              </p>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-semibold text-brandAccent hover:text-brandAccentSoft"
            >
              Open full gallery →
            </Link>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-3"
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                title: "Evening wedding in the village temple",
                image:
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=80",
              },
              {
                title: "Pre-wedding by the fields at sunset",
                image:
                  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&auto=format&fit=crop&q=80",
              },
              {
                title: "Colourful flex banners for local events",
                image:
                  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=900&auto=format&fit=crop&q=80",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-brandBorder/70 bg-black"
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { scale: 1.01 }}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brandAccentSoft">
                    Featured frame
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust + contact CTA */}
      <section className="bg-brandBg py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <motion.div
            className="flex-1 space-y-3"
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
              Local studio · Long-term trust
            </p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              A studio that answers every day – not only on wedding day.
            </h2>
            <p className="text-sm text-brandTextMuted sm:text-base">
              Walk in for passport photos, school projects or important wedding
              decisions. We keep your files safe, guide you through forms and
              deliver prints on time.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-1 flex-col gap-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm shadow-md"
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandTextMuted">
              Visit or call
            </p>
            <p className="text-sm text-brandTextMuted">
              Located on the main bazaar road near the bus stand, easy to reach
              by foot, two-wheeler or auto.
            </p>
            <p className="text-sm">
              Phone:{" "}
              <span className="font-semibold text-white">+91 92714 56749</span>
            </p>
            <p className="text-sm text-brandTextMuted">
              Everyday studio timings: <span className="text-white">9:00 AM – 8:00 PM</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <motion.a
                href="tel:9271456749"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-brandAccent px-6 py-2.5 text-xs font-semibold text-black shadow-md shadow-brandAccent/40 hover:bg-amber-400 sm:text-sm"
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              >
                Call Shubham Photos Studio
              </motion.a>
              <Link
                to="/contact"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-brandAccent/60 bg-brandSurface px-6 py-2.5 text-xs font-semibold text-brandAccent hover:bg-brandSurfaceSoft sm:text-sm"
              >
                Open contact details
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
