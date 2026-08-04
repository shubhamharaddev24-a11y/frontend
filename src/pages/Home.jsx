import React, { useMemo, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useMotionVariants } from "../utils/motion";
import AnimatedHero from "../components/AnimatedHero";
import RevealOnScroll from "../components/RevealOnScroll";
import PhotoCounter from "../components/PhotoCounter";
import VideoTestimonials from "../components/VideoTestimonials";
import AnimatedServiceCard from "../components/AnimatedServiceCard";
import { useContent } from "../contexts/ContentContext";
import {
  Code,
  TrendingUp,
  Camera,
  Palette,
  Laptop,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const [activeService, setActiveService] = useState(null);
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.15 });
  const { getSection, formatImageUrl } = useContent();

  const servicesList = useMemo(() => [
    {
      name: "Web Development Division",
      points: [
        "Custom Full-Stack web applications (MERN)",
        "Corporate portfolio websites & high-converting landing pages",
        "Digital wedding invitation sites with RSVP and maps",
      ],
      mainIcon: Code,
      themeColor: "#A67C6B",
      shadowColor: "rgba(166, 124, 107, 0.2)"
    },
    {
      name: "Digital Marketing & SEO",
      points: [
        "Google Business Profile optimization and local map ranking",
        "On-page & Off-page SEO to drive organic Google search traffic",
        "Social media growth & production (Instagram Reels & YouTube)",
      ],
      mainIcon: TrendingUp,
      themeColor: "#A67C6B",
      shadowColor: "rgba(166, 124, 107, 0.2)"
    },
    {
      name: "Media Division (Shubham Photos Studio)",
      points: [
        "Cinematic wedding films, trailers, and traditional photography",
        "Scenic sunset outdoor pre-wedding & baby portraits",
        "Instant passport printing, photo scanning & framing in Saralgaon",
      ],
      mainIcon: Camera,
      themeColor: "#A67C6B",
      shadowColor: "rgba(166, 124, 107, 0.2)"
    },
    {
      name: "Graphic Design & Branding",
      points: [
        "Political campaign banners, rally posters & flex designs",
        "Marathi Lagna-Patrika and event cards (traditional & modern)",
        "Visiting cards, brochures, and corporate brand designs",
      ],
      mainIcon: Palette,
      themeColor: "#A67C6B",
      shadowColor: "rgba(166, 124, 107, 0.2)"
    },
    {
      name: "Cyber Desk & DTP Services",
      points: [
        "Professional biodata and marriage resume creation",
        "Student CV/resumes and online job applications",
        "Aadhaar, PAN, and local e-governance service support",
      ],
      mainIcon: Laptop,
      themeColor: "#A67C6B",
      shadowColor: "rgba(166, 124, 107, 0.2)"
    }
  ], []);

  return (
    <div className="bg-[#F2EDE4] dark:bg-[#181412] text-[#1A1A1A] dark:text-[#F2EDE4] font-sans selection:bg-[#A67C6B]/20">
      {/* 1. Full-Bleed Animated Hero Carousel */}
      <AnimatedHero />

      {/* 2. Philosophy & Welcome Intro Section (2-Column Layout matching Viya Films screenshot 2) */}
      <section className="py-20 md:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F2EDE4] leading-tight font-normal">
              into unforgettable memories.
            </h2>
            <div className="space-y-5 text-sm sm:text-base text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed">
              <p>
                Welcome to Shubham Media & Digital, where every image tells a heartfelt love story. We are passionate about capturing the true essence of each couple's journey, preserving their most cherished moments through timeless photography and film.
              </p>
              <p>
                Our goal is simple: to document emotions that are raw, meaningful, and unforgettable. Whether it's a grand wedding celebration, sunset pre-wedding, or an intimate ceremony, we strive to portray your special day in a way that feels authentic to you.
              </p>
              <p>
                Take a glimpse into our collection of stories and see the magic unfold. Each experience is a reflection of joy, laughter, and deep emotions that make their journey extraordinary. Let us inspire you with the beautiful memories we've helped create.
              </p>
              <p className="pt-2 italic font-serif text-[#1A1A1A] dark:text-[#F2EDE4]">
                Step into a world of storytelling through our lens, where every frame is a work of art.
              </p>
            </div>
          </div>

          {/* Right Column Portrait Image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl shadow-xl aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/marathi-wedding-ritual.jpg"
                alt="Marathi wedding ritual of groom and bride"
                className="w-full h-full object-cover object-[center_15%] brightness-95 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Precious Moments Showcase Grid (Matching Viya Films screenshot 3) */}
      <section className="py-16 md:py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60">
        {/* Editorial Text Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed">
            the vows to the laughter, weaves a story of commitment and joy.
          </p>
          <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light">
            These are moments too precious to be forgotten.
          </p>
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#1A1A1A] dark:text-[#F2EDE4] font-medium pt-2">
            We ensure they live on forever, turning fleeting emotions into timeless memories.
          </h3>
        </div>

        {/* 3 Vertical Portrait Grid (Matching Viya Films couple portrait set) */}
        {(() => {
          const defaultPortraits = [
            {
              imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&auto=format&fit=crop&q=85",
              objectPosition: "center 25%",
              title: "Groom and bride standing together at sunset"
            },
            {
              imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=85",
              objectPosition: "center 20%",
              title: "Candid playful close portrait of couple laughing"
            },
            {
              imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&auto=format&fit=crop&q=85",
              objectPosition: "center 20%",
              title: "Romantic couple embrace portrait at golden hour"
            }
          ];

          const showcaseData = getSection("home_showcase_portraits", { items: defaultPortraits });
          const showcaseItems = (showcaseData.items && showcaseData.items.length > 0)
            ? showcaseData.items
            : defaultPortraits;

          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {showcaseItems.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id || item.imageUrl || idx}
                  className="overflow-hidden rounded-lg shadow-md aspect-[3/4] group bg-[#FAF6F0] dark:bg-[#221C19]"
                >
                  <img
                    src={formatImageUrl(item.imageUrl || item.url)}
                    alt={item.title || item.alt || "Feature Portrait"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.objectPosition || item.pos || "center 20%" }}
                  />
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* 4. Full-Width B&W Banner with Centered Quote Overlay (Matching Viya Films screenshot) */}
      <section className="w-full relative h-screen min-h-[600px] overflow-hidden bg-black flex items-end justify-center">
        <img
          src="/images/bw-couple-sunburst-banner.png"
          alt="Cinematic B&W sunburst couple pre-wedding portrait banner"
          className="w-full h-full object-cover object-[center_30%] brightness-100"
        />
        {/* Soft luxury dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

        {/* Centered Quote Overlay Text (Floating over the image) */}
        <div className="absolute bottom-16 sm:bottom-24 inset-x-0 z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed drop-shadow-md">
            Time flies, and you can't relive moments once they're gone. But through our lens, we create a window for you to revisit them.
          </p>
          <p className="text-xs uppercase tracking-[0.35em] font-sans text-white/80 pt-2">
            SHUBHAM MEDIA & FILMS
          </p>
        </div>
      </section>

      {/* 5. Signature White Navigation Cards (Matching Viya Films screenshot 5) */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "ABOUT",
              subtitle: "GET TO KNOW US",
              link: "/about"
            },
            {
              title: "PORTFOLIO",
              subtitle: "EXPLORE OUR WORK",
              link: "/gallery"
            },
            {
              title: "BOOK US",
              subtitle: "GET IN TOUCH",
              link: "/contact"
            }
          ].map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white dark:bg-[#221C19] p-10 sm:p-14 rounded-none border border-[#E0D7CC]/60 dark:border-[#3D342E]/60 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
            >
              <h4 className="font-sans text-lg sm:text-xl font-medium tracking-[0.25em] text-[#1A1A1A] dark:text-[#F2EDE4] uppercase group-hover:text-[#A67C6B] transition-colors">
                {card.title}
              </h4>
              <p className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#4A4A4A] dark:text-[#B8ABA0] mt-3">
                {card.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Company Divisions & Services Showcase */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#4A4A4A] dark:text-[#B8ABA0]">
            Full Capabilities
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F2EDE4] mt-2">
            Media, Technology & Digital Divisions
          </h2>
          <p className="text-sm text-[#4A4A4A] dark:text-[#B8ABA0] mt-3">
            From high-end wedding films and portraits to full-stack web applications, local SEO, and print designs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, index) => (
            <AnimatedServiceCard
              key={service.name}
              index={index}
              name={service.name}
              points={service.points}
              mainIcon={service.mainIcon}
              themeColor={service.themeColor}
              shadowColor={service.shadowColor}
              onClick={() => setActiveService(service)}
            />
          ))}
        </div>
      </section>

      {/* 7. Counter Section */}
      <PhotoCounter />

      {/* 8. Video Testimonials */}
      <VideoTestimonials />

      {/* 9. Contact / Visit Studio Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-[#221C19] border border-[#E0D7CC]/60 dark:border-[#3D342E]/60 p-8 sm:p-12 rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4A4A4A] dark:text-[#B8ABA0]">
              Visit Our Studio
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F2EDE4]">
              Shubham Photos Studio & Digital Center
            </h3>
            <p className="text-sm text-[#4A4A4A] dark:text-[#B8ABA0] leading-relaxed">
              Located on the main bazaar road near the bus stand, opposite Saralgaon Police Chowki, Murbad. Open daily from 9:00 AM – 8:00 PM for photography bookings, digital services, and consultations.
            </p>
            <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F2EDE4]">
              Phone / WhatsApp: <span className="font-semibold">+91 92714 56749</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.2em] text-center rounded-none hover:bg-[#A67C6B] transition-colors inline-block"
            >
              Book Us / Contact
            </Link>
            <a
              href="tel:9271456749"
              className="px-8 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.2em] text-center rounded-none hover:border-[#A67C6B] hover:text-[#A67C6B] transition-colors inline-block"
            >
              Call Studio
            </a>
          </div>
        </div>
      </section>

      {/* Morphing Detail Modal for Services */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setActiveService(null)} />
            <motion.div
              layoutId={`service-card-${activeService.name}`}
              className="relative w-full max-w-lg rounded-2xl border border-[#E0D7CC] bg-white dark:bg-[#221C19] p-8 shadow-2xl z-10 text-[#1A1A1A] dark:text-[#F2EDE4]"
            >
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#FAF6F0] dark:hover:bg-[#2C2521] text-[#4A4A4A]"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] dark:text-[#F2EDE4]">
                  {activeService.name}
                </h3>
                <hr className="border-[#E0D7CC]/60" />
                <ul className="space-y-3 text-sm text-[#4A4A4A] dark:text-[#B8ABA0]">
                  {activeService.points.map((pt, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-[#A67C6B]">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 flex gap-4">
                  <Link
                    to="/contact"
                    className="flex-1 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider text-center"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
