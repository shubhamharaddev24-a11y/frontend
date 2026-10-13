import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useContent } from "../contexts/ContentContext";

const categories = [
  { id: "all", label: "ALL WORK" },
  { id: "wedding", label: "WEDDING FILMS & MOMENTS" },
  { id: "prewedding", label: "PRE-WEDDING & PORTRAITS" },
  { id: "banner", label: "FLEX & EVENT BANNERS" },
  // { id: "graphic", label: "BRANDING & DESIGN" },
  // { id: "development", label: "WEB DEVELOPMENT" },
];

const DEFAULT_IMAGES = [
  {
    category: "wedding",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=85",
    title: "Grand Indian wedding mandap ceremony.",
    aspectRatio: "4/5",
    objectPosition: "center 20%",
  },
  {
    category: "wedding",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&auto=format&fit=crop&q=85",
    title: "Bride getting ready in traditional gold attire & saree.",
    aspectRatio: "4/5",
    objectPosition: "center 20%",
  },
  {
    category: "wedding",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85",
    title: "Evening wedding rituals under golden festive lights.",
    aspectRatio: "4/5",
    objectPosition: "center 20%",
  },
  {
    category: "prewedding",
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&auto=format&fit=crop&q=85",
    title: "Sunset pre-wedding shoot by open fields.",
    aspectRatio: "4/5",
    objectPosition: "center 20%",
  },
  {
    category: "prewedding",
    imageUrl: "https://images.unsplash.com/photo-1525286116112-b59af11adad1?w=1200&auto=format&fit=crop&q=85",
    title: "Candid couple walk in natural landscape.",
    aspectRatio: "4/5",
    objectPosition: "center 20%",
  },
  {
    category: "banner",
    imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&auto=format&fit=crop&q=85",
    title: "Colourful flex banners for local events & political branding.",
    aspectRatio: "4/5",
    objectPosition: "center 20%",
  },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const reduceMotion = useReducedMotion();
  const { getSection, formatImageUrl } = useContent();

  const cmsData = getSection("portfolio_items", { items: DEFAULT_IMAGES });
  const allImages = (cmsData.items && cmsData.items.length > 0) ? cmsData.items : DEFAULT_IMAGES;

  const filteredImages = activeCategory === "all"
    ? allImages
    : allImages.filter((img) =>
      img.category === activeCategory ||
      (activeCategory === "wedding" && img.category === "weddings") ||
      (activeCategory === "banner" && (img.category === "banners" || img.category === "banner"))
    );

  return (
    <div className="bg-brandBg text-brandTextPrimary min-h-screen pb-20 pt-32 px-6 sm:px-12">
      <section className="mx-auto max-w-7xl space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandAccent">
            PORTFOLIO & GALLERY
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brandTextPrimary font-normal leading-tight">
            Timeless Love Stories & Visual Collections
          </h1>
          <p className="text-sm sm:text-base text-brandTextMuted font-light leading-relaxed">
            A curated glimpse into our wedding films, pre-wedding couple shoots, and branding design work.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-brandBorder/60 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all ${
                activeCategory === cat.id
                  ? "bg-brandTextPrimary !text-brandBg dark:bg-gradient-to-r dark:from-[#C49B89] dark:via-[#D4AF37] dark:to-[#A67C6B] dark:!text-[#0C0A09] font-bold shadow-md"
                  : "bg-brandSurface border border-brandBorder/60 text-brandTextMuted hover:text-brandTextPrimary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id || img.imageUrl || img.src || idx}
              className="group relative overflow-hidden bg-brandSurface aspect-[4/5] shadow-sm hover:shadow-md rounded-2xl border border-brandBorder/50 transition-all duration-300 transform-gpu"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "300px 400px",
              }}
            >
              <img
                src={formatImageUrl(img.imageUrl || img.src)}
                alt={img.title || img.alt || "Portfolio image"}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: img.objectPosition || "center 20%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <p className="text-xs text-white/90 font-serif leading-snug">
                  {img.title || img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;

