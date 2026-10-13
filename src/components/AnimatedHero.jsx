import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";

const DEFAULT_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=2400&auto=format&fit=crop&q=85",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    objectPosition: "center 30%",
    isMonochrome: false,
    title: "Destination Pre-Weddings & Editorial Stories",
    subtitle: "Preserving raw emotions, scenic landscapes, and unforgettable moments",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=2400&auto=format&fit=crop&q=85",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    objectPosition: "center 20%",
    isMonochrome: false,
    title: "Sacred Indian Vows & Joyful Moments",
    subtitle: "Capturing love, laughter, and family celebrations with artistic perfection",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=2400&auto=format&fit=crop&q=85",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    objectPosition: "center 25%",
    isMonochrome: false,
    title: "Authentic Celebrations & Wedding Cinema",
    subtitle: "Documenting your journey with elegance and editorial depth",
  },
];

const AnimatedHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const reduceMotion = useReducedMotion();
  const { getSection } = useContent();

  const heroData = getSection('hero_slides', { items: DEFAULT_SLIDES });
  const slides = (heroData.items && heroData.items.length > 0) ? heroData.items : DEFAULT_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setVideoError(false);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex] || slides[0] || {};

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-[#181412]">
      {/* Background Image/Video Carousel Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {(currentSlide.mediaType === 'video' || (!currentSlide.mediaType && currentSlide.videoUrl)) && !videoError ? (
            <video
              src={currentSlide.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover brightness-95"
              style={{ objectPosition: currentSlide.objectPosition || "center 20%" }}
            />
          ) : (
            <img
              src={currentSlide.imageUrl || currentSlide.image}
              alt={currentSlide.title || "Shubham Media"}
              className={`w-full h-full object-cover brightness-105 contrast-[1.02] ${
                currentSlide.isMonochrome ? "grayscale contrast-125" : ""
              }`}
              style={{ objectPosition: currentSlide.objectPosition || "center 20%" }}
            />
          )}
          {/* Soft luxury gradient overlay - bright and luminous */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Left Navigation Arrow (←) */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Previous Slide"
      >
        <span className="text-3xl font-light leading-none select-none">←</span>
      </button>

      {/* Right Navigation Arrow (→) */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Next Slide"
      >
        <span className="text-3xl font-light leading-none select-none">→</span>
      </button>

      {/* Bottom Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id || idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimatedHero;
