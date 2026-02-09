import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const categories = [
  { id: "weddings", label: "Wedding Moments" },
  { id: "prewedding", label: "Pre-Wedding" },
  { id: "banners", label: "Banners & Posters" },
];

const images = [
  {
    category: "weddings",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=80",
    alt: "Couple during evening wedding rituals under lights.",
  },
  {
    category: "weddings",
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&auto=format&fit=crop&q=80",
    alt: "Bride getting ready with jewellery and traditional attire.",
  },
  {
    category: "prewedding",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&auto=format&fit=crop&q=80",
    alt: "Couple posing in a cinematic pre-wedding shoot.",
  },
  {
    category: "prewedding",
    src: "https://images.unsplash.com/photo-1525286116112-b59af11adad1?w=900&auto=format&fit=crop&q=80",
    alt: "Couple enjoying a walk in nature.",
  },
  {
    category: "banners",
    src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=900&auto=format&fit=crop&q=80",
    alt: "Colourful political and event banners displayed outdoors.",
  },
  {
    category: "banners",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80",
    alt: "Business poster design on a street billboard.",
  },
];

const Gallery = () => {
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
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 space-y-3 sm:mb-10"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
            Gallery
          </p>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            A small preview of the stories we capture.
          </h1>
          <p className="max-w-2xl text-sm text-brandTextMuted sm:text-base">
            Here is a glimpse of weddings, pre-wedding shoots and banner work
            from Shubham Photos Studio. Full albums and sample designs are
            available at the studio.
          </p>
        </motion.div>

        {/* Category labels */}
        <div className="mb-5 flex flex-wrap gap-3 text-xs text-brandTextMuted">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="rounded-full border border-brandBorder bg-brandSurface/80 px-3 py-1"
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Image grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {images.map((img) => (
            <motion.figure
              key={img.src}
              className="group relative overflow-hidden rounded-2xl border border-brandBorder/70 bg-black"
              whileHover={
                reduceMotion ? undefined : { scale: 1.01, transition: { duration: 0.4 } }
              }
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-xs text-brandTextMuted">
                {img.alt}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;

