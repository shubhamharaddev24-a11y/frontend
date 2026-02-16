import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMotionVariants } from "../utils/motion";
import AnimatedHero from "../components/AnimatedHero";
import ParallaxSection from "../components/ParallaxSection";
import MagneticButton from "../components/MagneticButton";
import RevealOnScroll from "../components/RevealOnScroll";
import OptimizedImage from "../components/OptimizedImage";
import PhotoCounter from "../components/PhotoCounter";
import VideoTestimonials from "../components/VideoTestimonials";

const Home = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();

  return (
    <div className="bg-brandBg text-brandTextPrimary">
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Quick service highlights with parallax */}
      <ParallaxSection 
        className="border-y border-brandBorder/70 bg-brandSurfaceSoft/60 py-12"
        speed={0.2}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
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
          ].map((item, index) => (
            <RevealOnScroll
              key={item.title}
              delay={index * 0.1}
              direction="up"
              className="flex-1 space-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandAccentSoft">
                {item.title}
              </p>
              <p className="text-xs text-brandTextMuted">{item.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </ParallaxSection>

      {/* Services summary */}
      <section className="bg-brandBg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={0.2} direction="up" className="mb-8 text-center sm:mb-10">
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
        </RevealOnScroll>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            ].map((service, index) => (
              <RevealOnScroll
                key={service.name}
                delay={0.3 + index * 0.05}
                direction="up"
                className="flex h-full flex-col rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm shadow-md hover:shadow-xl transition-shadow"
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
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Counter Section */}
      <PhotoCounter />

      {/* Featured work preview */}
      <section className="bg-brandSurface py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll delay={0.4} direction="up" className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
          </RevealOnScroll>

          <div className="grid gap-4 sm:grid-cols-3">
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
            ].map((item, index) => (
              <RevealOnScroll
                key={item.title}
                delay={0.5 + index * 0.1}
                direction="scale"
                className="group relative overflow-hidden rounded-2xl border border-brandBorder/70 bg-black"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
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
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <VideoTestimonials />

      {/* Trust + contact CTA */}
      <section className="bg-brandBg py-12 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <RevealOnScroll delay={0.7} direction="left" className="flex-1 space-y-3">
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
          </RevealOnScroll>
          <RevealOnScroll delay={0.8} direction="right" className="flex flex-1 flex-col gap-3 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm shadow-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandTextMuted">
              Visit or call
            </p>
            <p className="text-sm text-brandTextMuted">
              Located on the main bazaar , near the bus stand, opposite to saralgaon police chowki ,murbad- easy to reach
              by foot..
            </p>
            <p className="text-sm">
              Phone:{" "}
              <span className="font-semibold text-white">+91 92714 56749</span>
            </p>
            <p className="text-sm text-brandTextMuted">
              Everyday studio timings: <span className="text-white">9:00 AM – 8:00 PM</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <MagneticButton
                href="tel:9271456749"
                className="flex-1 items-center justify-center rounded-full bg-brandAccent px-6 py-2.5 text-xs font-semibold text-black shadow-md shadow-brandAccent/40 hover:bg-amber-400 sm:text-sm"
              >
                Call Shubham Photos Studio
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="flex-1 items-center justify-center rounded-full border border-brandAccent/60 bg-brandSurface px-6 py-2.5 text-xs font-semibold text-brandAccent hover:bg-brandSurfaceSoft sm:text-sm"
              >
                Open contact details
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Home;
