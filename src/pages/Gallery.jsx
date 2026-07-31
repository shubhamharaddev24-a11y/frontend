import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const categories = [
  { id: "all", label: "ALL WORK" },
  { id: "weddings", label: "WEDDING FILMS & MOMENTS" },
  { id: "prewedding", label: "PRE-WEDDING & PORTRAITS" },
  { id: "banners", label: "BRANDING & DESIGN" },
];

const images = [
  {
    category: "weddings",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85",
    alt: "Grand Indian wedding mandap ceremony.",
  },
  {
    category: "weddings",
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&auto=format&fit=crop&q=85",
    alt: "Bride getting ready in traditional gold attire & saree.",
  },
  {
    category: "weddings",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85",
    alt: "Evening wedding rituals under golden festive lights.",
  },
  {
    category: "prewedding",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&auto=format&fit=crop&q=85",
    alt: "Sunset pre-wedding shoot by open fields.",
  },
  {
    category: "prewedding",
    src: "https://images.unsplash.com/photo-1525286116112-b59af11adad1?w=1200&auto=format&fit=crop&q=85",
    alt: "Candid couple walk in natural landscape.",
  },
  {
    category: "prewedding",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=85",
    alt: "Outdoor celebration & candid couple portrait.",
  },
  {
    category: "banners",
    src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&auto=format&fit=crop&q=85",
    alt: "Colourful flex banners for local events & political branding.",
  },
  {
    category: "banners",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=85",
    alt: "Digital web application dashboard & brand identity.",
  },
  {
    category: "banners",
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&auto=format&fit=crop&q=85",
    alt: "Cinematic portrait & photography studio work.",
  },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const reduceMotion = useReducedMotion();

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <div className="bg-[#F2EDE4] dark:bg-[#181412] text-[#4A3E37] dark:text-[#F2EDE4] min-h-screen pb-20 pt-32 px-6 sm:px-12">
      <section className="mx-auto max-w-7xl space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#88796E] dark:text-[#B8ABA0]">
            PORTFOLIO & GALLERY
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A3E37] dark:text-[#F2EDE4] font-normal leading-tight">
            Timeless Love Stories & Visual Collections
          </h1>
          <p className="text-sm sm:text-base text-[#88796E] dark:text-[#B8ABA0] font-light leading-relaxed">
            A curated glimpse into our wedding films, pre-wedding couple shoots, and branding design work.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-[#E0D7CC]/60 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                activeCategory === cat.id
                  ? "bg-[#4A3E37] text-white dark:bg-[#F2EDE4] dark:text-[#181412]"
                  : "bg-white/60 dark:bg-[#221C19] text-[#88796E] dark:text-[#B8ABA0] hover:text-[#4A3E37]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredImages.map((img, idx) => (
            <motion.div
              layout
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative overflow-hidden bg-white dark:bg-[#221C19] aspect-[4/5] shadow-sm hover:shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-xs text-white/90 font-serif leading-snug">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;

