import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const reveal = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    }),
    [],
  );

  const stagger = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
    }),
    [],
  );

  const hoverCard = useMemo(
    () =>
      shouldReduceMotion
        ? {}
        : {
            whileHover: { y: -4, scale: 1.01 },
            transition: { type: "spring", stiffness: 260, damping: 18 },
          },
    [shouldReduceMotion],
  );
  const serviceCards = [
    {
      icon: (
        <svg
          className="w-14 h-14 mx-auto"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
          <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12z" />
        </svg>
      ),
      title: "Photo Studio",
      description: "Photography & Passport Photos",
    },
    {
      icon: (
        <svg
          className="w-14 h-14 mx-auto"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
        </svg>
      ),
      title: "Wedding Cards",
      description: "Beautiful Invitations & Prints",
    },
    {
      icon: (
        <svg
          className="w-14 h-14 mx-auto"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
        </svg>
      ),
      title: "Xerox DTP Services",
      description: "Xerox, Printing & Designing",
    },
  ];

  // Auto-scroll carousel
  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [serviceCards.length, shouldReduceMotion]);

  // Scroll to current slide
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: currentSlide * cardWidth,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  }, [currentSlide, shouldReduceMotion]);

  return (
    <div className="min-h-screen bg-[#f5ede4] overflow-x-hidden">
      {/* Navbar - full screen width */}
    <header className="fixed top-0 left-0 right-0 z-50 h-[88px] bg-stone-900/90 backdrop-blur-md border-b border-stone-700/50">
  <div className="w-full h-full px-4 sm:px-6 lg:px-8 ">
    <div className="flex h-full items-center justify-between gap-3">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 h-full py-2">
        <img
          src="/logo.png"
          alt="Shubham Photos Studio"
          className="h-full w-auto object-contain h-[123px]"
        />
      </div>

      {/* Center text */}
      <p className="hidden lg:block text-white/95 text-sm font-medium tracking-wide text-center flex-1">
        Your Trusted Photo & Digital Service Center
      </p>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3 flex-shrink-0 items-center">
        <motion.a
          href="tel:9272707115"
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all shadow-md text-xs sm:text-sm whitespace-nowrap"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          Call Now
        </motion.a>
        <motion.a
          href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%20%21%20I%20would%20like%20to%20know%20more%20about%20your%20services%20and%20pricing."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all shadow-md text-xs sm:text-sm whitespace-nowrap inline-flex items-center gap-1 sm:gap-2"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:inline">Whatsapp</span>
        </motion.a>
      </div>
    </div>
  </div>
</header>

      {/* Hero Section with Background Video */}
      <section className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/background%20v1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20"
          initial={shouldReduceMotion ? "show" : "hidden"}
          animate="show"
          variants={stagger}
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight tracking-tight break-words"
            variants={reveal}
          >
            Capture. Print. Create.
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/95 mb-4 sm:mb-8 font-medium"
            variants={reveal}
          >
            One Stop Solution for All Your Photo & Digital Needs
          </motion.p>

          <motion.a
            href="#visit"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-10 py-2 sm:py-3.5 rounded-lg text-sm sm:text-base lg:text-lg font-bold transition-all shadow-xl hover:shadow-2xl"
            variants={reveal}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </section>

      {/* Service Highlights - Carousel */}
      <section className="w-full bg-[#f5ede4] py-8 sm:py-12 -mt-10 sm:-mt-16 relative z-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Desktop: Grid Layout - Full width on large screens */}
          <motion.div
            className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={shouldReduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            {serviceCards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md flex flex-col items-center text-center"
                variants={reveal}
                {...hoverCard}
              >
                <div className="text-amber-900 mb-4">{card.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-1">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-800/90">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile/Tablet: Swipeable Carousel */}
          <div className="md:hidden">
            <motion.div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth gap-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              initial={shouldReduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {serviceCards.map((card, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] snap-start"
                  variants={reveal}
                >
                  <motion.div
                    className="bg-[#faf6f0] p-6 sm:p-8 rounded-xl shadow-md flex flex-col items-center text-center h-full"
                    {...hoverCard}
                  >
                    <div className="text-amber-900 mb-4">{card.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-800/90">
                      {card.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {serviceCards.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-orange-500"
                      : "w-2 bg-orange-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="w-full bg-[#f5ede4] py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10 sm:mb-12"
            initial={shouldReduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={reveal}
          >
            <div className="inline-block">
              <div className="h-1.5 w-full bg-orange-500 rounded mb-2" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900">
                Our Services
              </h2>
              <div className="h-1.5 w-full bg-orange-500 rounded mt-2" />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-amber-800 font-medium mt-4">
              Quality & Affordable Solutions
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial={shouldReduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div
              className="bg-[#faf6f0] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={reveal}
              {...hoverCard}
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80')`,
                }}
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-1">
                  Wedding Photography
                </h3>
                <p className="text-xs sm:text-sm text-amber-700">
                  Capture Your Special Moments
                </p>
              </div>
            </motion.div>
            <motion.div
              className="bg-[#faf6f0] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={reveal}
              {...hoverCard}
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=80')`,
                }}
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-1">
                  Printing & Xerox
                </h3>
                <p className="text-xs sm:text-sm text-amber-700">
                  Xerox, Lamination, Printing
                </p>
              </div>
            </motion.div>
            <motion.div
              className="bg-[#faf6f0] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={reveal}
              {...hoverCard}
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=80')`,
                }}
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-1">
                  DTP & Design Works
                </h3>
                <p className="text-xs sm:text-sm text-amber-700">
                  Brochures, Forms, Resume
                </p>
              </div>
            </motion.div>
            <motion.div
              className="bg-[#faf6f0] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              variants={reveal}
              {...hoverCard}
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=80')`,
                }}
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-1">
                  Cyber Services
                </h3>
                <p className="text-xs sm:text-sm text-amber-700">
                  PAN, Online Forms, E-Governance
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visit Us Today Section */}
      <section id="visit" className="w-full bg-[#f5ede4] py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-10 sm:mb-12"
            initial={shouldReduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={reveal}
          >
            <div className="inline-block">
              <div className="h-1 w-full bg-orange-500 rounded mb-2" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900">
                Visit Us Today!
              </h2>
              <div className="h-1 w-full bg-orange-500 rounded mt-2" />
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200/50"
            initial={shouldReduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="rounded-l-2xl overflow-hidden h-[280px] sm:h-[400px] lg:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=700&auto=format&fit=crop&q=80"
                  alt="Sharma Digital Studio - Store Front"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-amber-900">
                        Located in your side
                      </h3>
                      <p className="text-amber-700 text-xs sm:text-sm">
                        Easy to Find Location
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-amber-900">
                        Call: 9272707115
                      </h3>
                      <p className="text-amber-700 text-xs sm:text-sm">
                        Or WhatsApp Us Anytime
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-1">
                        Open Hours
                      </h3>
                      <p className="text-amber-700 text-xs sm:text-sm">
                        9 AM - 8 PM
                      </p>
                      <p className="text-amber-700 text-xs sm:text-sm">
                        Available all time
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-200/60">
                  <motion.a
                    href="#visit"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-8 py-2 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold transition-all shadow-lg"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    Get in Touch
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 sm:mt-16 w-full">
          <svg
            className="w-full h-20 sm:h-28 md:h-32"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z"
              fill="#fed7aa"
              opacity="0.6"
            />
            <path
              d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z"
              fill="#fdba74"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};


export default Home;
