import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Code2, Users2, ArrowUpRight, Sparkles, Cpu, Handshake } from "lucide-react";
import { useMotionVariants } from "../utils/motion";

const pillars = [
  {
    id: "create",
    badge: "Pillar 01",
    name: "CREATE",
    tagline: "Photography • Video • Design • Branding",
    desc: "Capturing cinematic wedding films, timeless heirloom photography, and high-impact graphic branding that moves people.",
    points: [
      "Traditional & Cinematic Wedding Films",
      "Scenic Outdoor Pre-Wedding Sessions",
      "Brand Identity, Logo & Print Stationery",
      "Heirloom Photo Framing & Restoration",
    ],
    icon: Camera,
    accentIcon: Sparkles,
    route: "/services#photography",
    color: "#A67C6B",
    bgAccent: "from-[#A67C6B]/15 to-transparent",
  },
  {
    id: "innovate",
    badge: "Pillar 02",
    name: "INNOVATE",
    tagline: "Web Development • AI • Digital Solutions • Marketing",
    desc: "Architecting modern full-stack web applications, AI-assisted tools, local SEO ranking, and data-driven lead generation.",
    points: [
      "MERN Stack & React Web Applications",
      "Local SEO & Google Business Rank #1",
      "Social Media Growth & Ad Campaigns",
      "Interactive Digital Wedding Invitations",
    ],
    icon: Code2,
    accentIcon: Cpu,
    route: "/services#web-dev",
    color: "#8C6A5A",
    bgAccent: "from-[#8C6A5A]/15 to-transparent",
  },
  {
    id: "connect",
    badge: "Pillar 03",
    name: "CONNECT",
    tagline: "Clients ↔ Creators ↔ Businesses",
    desc: "The seamless bridge between clients, creative directors, and growing enterprises, backed by our trusted local digital desk.",
    points: [
      "Direct Creative Collaboration & Consultation",
      "B2B Growth & Local Business Partnerships",
      "Cyber Desk & Essential e-Governance Services",
      "End-to-End Delivery & Transparent Communication",
    ],
    icon: Users2,
    accentIcon: Handshake,
    route: "/contact",
    color: "#725345",
    bgAccent: "from-[#725345]/15 to-transparent",
  },
];

const ThreePillarsSection = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();

  return (
    <section className="py-20 md:py-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60">
      <motion.div
        className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={variants.fadeUp}
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase bg-[#A67C6B]/15 text-[#A67C6B] border border-[#A67C6B]/25">
          The CREAONNECT Framework • (CREATE + CONNECT)
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F2EDE4] font-normal leading-tight">
          Three Pillars of Modern Excellence
        </h2>
        <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed">
          We bring together artistic imagination, cutting-edge software engineering, and authentic community connections under one unified creative ecosystem.
        </p>
      </motion.div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pillars.map((p, idx) => {
          const IconComponent = p.icon;
          const AccentIcon = p.accentIcon;
          return (
            <motion.div
              key={p.id}
              className="group relative rounded-2xl bg-white dark:bg-[#221C19] border border-[#E0D7CC]/80 dark:border-[#3D342E]/80 p-8 sm:p-9 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              initial={reduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.12 }}
              variants={variants.fadeUpShort}
            >
              {/* Subtle Ambient Gradient on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative space-y-5">
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#A67C6B] font-semibold bg-[#A67C6B]/10 px-2.5 py-1 rounded-md">
                    {p.badge}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#A67C6B]/10 dark:bg-[#A67C6B]/20 flex items-center justify-center text-[#A67C6B] group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={24} />
                  </div>
                </div>

                {/* Pillar Title & Tagline */}
                <div>
                  <h3 className="font-serif text-3xl font-normal tracking-wide text-[#1A1A1A] dark:text-[#F2EDE4] flex items-center gap-2">
                    {p.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A67C6B] mt-1">
                    {p.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed">
                  {p.desc}
                </p>

                {/* Feature Bullet Points */}
                <ul className="space-y-2.5 pt-2 border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#4A4A4A] dark:text-[#B8ABA0] font-light">
                      <span className="text-[#A67C6B] mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Link */}
              <div className="relative mt-8 pt-4 border-t border-[#E0D7CC]/40 dark:border-[#3D342E]/40 flex items-center justify-between">
                <Link
                  to={p.route}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#A67C6B] group-hover:text-[#1A1A1A] dark:group-hover:text-white transition-colors"
                >
                  <span>Explore {p.name}</span>
                  <ArrowUpRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <AccentIcon size={16} className="text-[#A67C6B]/50 group-hover:text-[#A67C6B] transition-colors" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ThreePillarsSection;
