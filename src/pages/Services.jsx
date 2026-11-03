import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Zap,
  Globe,
  Camera,
  Code2,
  Users2,
  Palette,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { serviceService } from "../services";

// 6 Core Agency Divisions & Services (Matching Editorial Reference)
const DIVISIONS = [
  {
    id: "photography",
    pillar: "CREATE",
    number: "01",
    urlSlug: "create / cinematic-films",
    title: "Media Services & Visual Arts",
    tagline: "4K Cinematic Wedding Films & Heritage Portraiture",
    description:
      "Preserving human emotion through 4K ProRes cinema cameras, aerial drone footage, and heirloom DaVinci color grading across the world.",
    image: "/images/0f6a59c61160c0369b02a9eb93977763.jpg",
    imageAlt: "Cinematic Marathi Wedding Ceremony",
    badge: "Cinema & Aerial",
    icon: Camera,
    tilt: -1.2,
    features: [
      "Wedding photography & cinematic 4K video films",
      "Sunset outdoor pre-wedding shoots with drone capture",
      "Event coverage (Engagements, birthdays & celebrations)",
      "Instant studio portrait printing & visa compliance",
      "Heirloom album design, acrylic framing & archival lamination",
      "Scanning & AI digital restoration of vintage family photos",
    ],
    ctaText: "Book Photoshoot",
    ctaLink: "/contact",
  },
  {
    id: "design-branding",
    pillar: "CREATE",
    number: "02",
    urlSlug: "create / design-branding",
    title: "Design & Graphic Branding",
    tagline: "High-Impact Offline Media, Flex & Brand Identity",
    description:
      "Commanding visual assets for brand campaigns, political rallies, corporate identity systems, and traditional wedding stationery.",
    image: "/images/bw-couple-sunburst-banner.png",
    imageAlt: "Graphic Design & Flex Studio",
    badge: "Print & Identity",
    icon: Palette,
    tilt: 1.1,
    features: [
      "Political rally banners, hoarding layouts & flex designs",
      "Shop front 3D glow-sign boards & corporate visual assets",
      "Traditional Marathi Lagna-Patrika, welcome boards & flex",
      "Premium business cards, brochures & promotional flyers",
      "Vector brand logos & Instagram post/reel marketing packs",
      "Rapid print production coordination with precision finish",
    ],
    ctaText: "Order Designs",
    ctaLink: "/contact",
  },
  {
    id: "web-dev",
    pillar: "INNOVATE",
    number: "03",
    urlSlug: "innovate / web-engineering",
    title: "Web Development Division",
    tagline: "Custom MERN Stack Web Applications & Digital Portals",
    description:
      "Modern, ultra-fast web architectures engineered for sub-second loads, automated lead generation, and Google search dominance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "High Performance Web Development",
    badge: "MERN Stack • Speed",
    icon: Code2,
    tilt: -0.9,
    features: [
      "Custom Full-Stack web platforms (MongoDB, Express, React, Node)",
      "High-converting landing pages & automated booking funnels",
      "Digital wedding invitation portals with Google Maps & RSVP",
      "E-commerce stores with razor-fast UPI payment gateways",
      "Speed optimization (99+ Core Web Vitals) & AWS/Vercel hosting",
      "Continuous site maintenance, backups & 24/7 security hardening",
    ],
    ctaText: "Explore Web Solutions",
    ctaLink: "/contact",
  },
  {
    id: "digital-marketing",
    pillar: "INNOVATE",
    number: "04",
    urlSlug: "innovate / growth-seo",
    title: "Digital Marketing & Local SEO",
    tagline: "#1 Google Search Pack & Data-Driven Growth",
    description:
      "Drive high-intent customer inquiries, establish local search pack authority, and scale brand engagement across global markets.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "SEO & Growth Marketing Analytics",
    badge: "SEO Dominance",
    icon: TrendingUp,
    tilt: 1.3,
    features: [
      "Google Business Profile (GMB) #1 Local Search pack ranking",
      "Data-backed Search Engine Optimization (SEO) campaigns",
      "High-engagement Instagram & YouTube Reels video production",
      "Precision Meta & Google Ad campaigns with positive ROI",
      "Automated WhatsApp CRM & instant lead response workflows",
      "Reputation management & customer review generation strategies",
    ],
    ctaText: "Start Growth Campaign",
    ctaLink: "/contact",
  },
  {
    id: "cyber-dtp",
    pillar: "CONNECT",
    number: "05",
    urlSlug: "connect / cyber-desk",
    title: "Cyber Desk & Citizen Services",
    tagline: "Essential E-Governance, Digital CVs & High-Speed Printing",
    description:
      "Reliable digital documentation assistance, official citizen desk tasks, student college admissions, and rapid printing in Saralgaon.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "Official Cyber Desk Services",
    badge: "Citizen Support",
    icon: FileCheck,
    tilt: -1.1,
    features: [
      "Custom Marriage Biodata & professional corporate resumes",
      "Online college admissions, exam forms & government scholarships",
      "Aadhaar updates, PAN card filing & digital identity eKYC",
      "High-volume document xerox, color printing & archival lamination",
      "Digital document conversions, typing & Marathi/English drafting",
      "Direct walk-in assistance at Saralgaon physical desk",
    ],
    ctaText: "Enquire Citizen Desk",
    ctaLink: "https://wa.me/918830331309?text=Hi%20CREAONNECT%20Cyber%20Desk%2C%20I%20need%20assistance.",
    isExternal: true,
  },
  {
    id: "creator-marketplace",
    pillar: "CONNECT",
    number: "06",
    urlSlug: "connect / creator-gigs",
    title: "Creator Gig Marketplace",
    tagline: "Decentralized Orders with 10% Platform Fee & Escrow",
    description:
      "Post custom photoshoot orders worldwide or claim verified client gigs in your city. Keep 90% payout with zero upfront platform fees.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=85",
    imageAlt: "Creator Gig Marketplace",
    badge: "Live Gigs • 90% Pay",
    icon: Users2,
    tilt: 1.0,
    features: [
      "12h–24h countdown client photoshoot orders ready to claim",
      "Direct client-to-creator matching without broker middlemen",
      "Guaranteed 100% milestone payment escrow protection",
      "Instant UPI withdrawal upon client shoot approval",
      "Creator profile trust rating & verified gear portfolio showcase",
      "Worldwide client reach across all major creative categories",
    ],
    ctaText: "Launch Marketplace",
    ctaLink: "/dashboard",
  },
];

const Services = () => {
  const [services, setServices] = useState(DIVISIONS);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Fetch dynamic CMS services if configured
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await serviceService.getAllServices();
        const servicesList = servicesData.data?.services;

        if (Array.isArray(servicesList) && servicesList.length > 0) {
          const merged = DIVISIONS.map((def) => {
            const apiMatch = servicesList.find(
              (s) => s.name?.toLowerCase() === def.title.toLowerCase() || s._id === def.id
            );
            if (!apiMatch) return def;
            return {
              ...def,
              title: apiMatch.name || def.title,
              description: apiMatch.description || def.description,
              features: apiMatch.features?.length > 0 ? apiMatch.features : def.features,
            };
          });
          setServices(merged);
        }
      } catch (err) {
        // Fallback gracefully
      }
    };

    fetchServices();
  }, []);

  const filteredServices =
    activeFilter === "ALL"
      ? services
      : services.filter((s) => s.pillar === activeFilter);

  return (
    <div className="bg-brandBg text-brandTextPrimary min-h-screen pb-28 pt-28 sm:pt-36 px-4 sm:px-8 lg:px-14 relative overflow-hidden transition-colors duration-300">
      {/* Background Soft Architectural Gradient */}
      <div className="absolute top-0 right-0 w-[500px] lg:w-[800px] h-[500px] pointer-events-none opacity-30 dark:opacity-20 bg-gradient-to-b from-[#76B900]/15 via-transparent to-transparent -z-10" />

      <section className="mx-auto max-w-7xl space-y-12 relative z-10">
        {/* ===================================================================== */}
        {/* EDITORIAL HEADER (AWWWARDS / AGENCY CALIBER)                         */}
        {/* ===================================================================== */}
        <div className="space-y-5 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-widest text-[#76B900]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#76B900]" />
            <span>Architecture & Capabilities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brandTextPrimary font-normal tracking-tight leading-[1.08]"
          >
            Create • Innovate • Connect
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base text-brandTextMuted font-light leading-relaxed max-w-2xl"
          >
            A multidisciplinary creative studio and technology laboratory. We preserve heirloom legacies through cinematic 4K films, engineer high-performance web systems, and bridge regional talent to global marketplace demand.
          </motion.p>
        </div>

        {/* ===================================================================== */}
        {/* PILLAR FILTER BAR (MINIMALIST & PROFESSIONAL)                         */}
        {/* ===================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-brandBorder/80">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: "All Divisions", count: services.length },
              { id: "CREATE", label: "01 / Create", count: services.filter((s) => s.pillar === "CREATE").length },
              { id: "INNOVATE", label: "02 / Innovate", count: services.filter((s) => s.pillar === "INNOVATE").length },
              { id: "CONNECT", label: "03 / Connect", count: services.filter((s) => s.pillar === "CONNECT").length },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-brandTextPrimary text-brandBg dark:bg-white dark:text-black font-semibold shadow-sm"
                      : "bg-brandSurface hover:bg-brandSurfaceSoft text-brandTextMuted hover:text-brandTextPrimary border border-brandBorder/80"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-2 text-[10px] ${isActive ? "opacity-70" : "text-brandTextMuted"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-brandTextMuted">
            <Globe size={13} className="text-[#76B900]" />
            <span>Serving Clients Worldwide</span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* EDITORIAL BROWSER SHOWCASE CARDS (MATCHING RONASIT REFERENCE)          */}
        {/* ===================================================================== */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((card, idx) => {
              const IconComponent = card.icon || Camera;

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative"
                >
                  {/* Card Container with subtle tilt that gracefully levels on hover */}
                  <article
                    className="relative flex flex-col h-full bg-brandSurface border border-brandBorder dark:border-white/10 group-hover:border-[#76B900]/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-[#76B900]/5 transition-all duration-500 transform lg:group-hover:-translate-y-1.5"
                    style={{
                      transform: `rotate(${card.tilt * 0.6}deg)`,
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "rotate(0deg) translateY(-6px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `rotate(${card.tilt * 0.6}deg) translateY(0px)`;
                    }}
                  >
                    {/* Top Browser Window Header (RonasIT Style) */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-brandBg/60 dark:bg-black/40 border-b border-brandBorder/80 select-none">
                      {/* Window Traffic Dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20 inline-block" />
                      </div>

                      {/* Minimalist Address Pill */}
                      <div className="flex-1 max-w-[200px] sm:max-w-[240px] mx-3 px-3 py-1 rounded-md bg-brandSurface/80 dark:bg-white/5 border border-brandBorder/60 text-[10px] font-mono text-brandTextMuted truncate text-center">
                        {card.urlSlug}
                      </div>

                      {/* Pillar Badge */}
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#76B900] bg-[#76B900]/10 border border-[#76B900]/20 px-2.5 py-0.5 rounded-full">
                        {card.pillar}
                      </span>
                    </div>

                    {/* High-Resolution Visual Preview Header */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                      <img
                        src={card.image}
                        alt={card.imageAlt || card.title}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 select-none"
                      />
                      {/* Ambient Gradient Overlay for text clarity */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Overlay Meta Tag */}
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-medium">
                          <IconComponent size={13} className="text-[#76B900]" />
                          <span>{card.badge}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                          {card.number}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Content Body */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6">
                      <div className="space-y-3.5">
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-brandTextPrimary leading-tight group-hover:text-[#76B900] transition-colors">
                          {card.title}
                        </h2>

                        <p className="text-xs font-mono uppercase tracking-wider text-[#76B900] font-semibold">
                          {card.tagline}
                        </p>

                        <p className="text-xs sm:text-sm text-brandTextMuted font-light leading-relaxed">
                          {card.description}
                        </p>

                        <div className="h-px w-full bg-brandBorder/60 my-4" />

                        {/* Deliverables & Capabilities Checklist */}
                        <div className="space-y-2.5">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-brandTextMuted font-semibold">
                            Core Capabilities:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brandTextMuted font-light">
                            {card.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={13} className="text-[#76B900] shrink-0 mt-0.5" />
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action Bar Footer */}
                      <div className="pt-5 border-t border-brandBorder/60 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {/* Direct WhatsApp Enquiry */}
                          <a
                            href={`https://wa.me/918830331309?text=Hi%20CREAONNECT%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(
                              card.title
                            )}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brandTextPrimary !text-brandBg hover:bg-[#76B900] hover:!text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all !no-underline select-none"
                          >
                            <MessageCircle size={13} />
                            <span>WhatsApp</span>
                          </a>

                          {/* Direct Call */}
                          <a
                            href="tel:8830331309"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-brandBorder hover:border-[#76B900] text-brandTextPrimary hover:text-[#76B900] text-xs font-bold uppercase tracking-wider rounded-lg transition-all !no-underline select-none"
                          >
                            <Phone size={13} />
                            <span>Call</span>
                          </a>
                        </div>

                        {/* Deep Link to Section */}
                        {card.isExternal ? (
                          <a
                            href={card.ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#76B900] hover:underline !no-underline ml-auto"
                          >
                            <span>{card.ctaText}</span>
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <Link
                            to={card.ctaLink}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#76B900] hover:underline !no-underline ml-auto"
                          >
                            <span>{card.ctaText}</span>
                            <ArrowUpRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ===================================================================== */}
        {/* BOTTOM SECTION: CREATOR GIG MARKETPLACE BANNER                         */}
        {/* ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-20 overflow-hidden rounded-2xl border border-[#76B900]/30 bg-gradient-to-r from-[#76B900]/10 via-brandSurface to-brandSurfaceSoft/40 p-8 sm:p-12 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#76B900]/20 border border-[#76B900]/30 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#76B900]">
                <Zap size={14} className="text-[#76B900]" />
                <span>Worldwide Creator Marketplace</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-brandTextPrimary tracking-tight">
                Post Orders with Expiry Countdown or Claim Paid Gigs
              </h3>

              <p className="text-xs sm:text-sm text-brandTextMuted leading-relaxed font-light">
                Connect directly between clients (Person 1) and verified photographers or creators (Person 2). Enjoy transparent 10% platform facilitation and 100% milestone escrow protection worldwide.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all !no-underline select-none"
              >
                Explore Gig Board
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-brandBorder hover:border-[#76B900] text-brandTextPrimary hover:text-[#76B900] text-xs font-bold uppercase tracking-wider rounded-lg transition-all !no-underline select-none"
              >
                Sign In to Earn
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
