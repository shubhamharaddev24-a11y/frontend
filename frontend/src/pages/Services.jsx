import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";

const sections = [
  {
    id: "photography",
    title: "Photography & Videography",
    description:
      "Complete wedding, pre-wedding and event coverage with edited photos, films and albums.",
    items: [
      "Wedding photography and videography for village and city ceremonies",
      "Pre-wedding shoots at farms, riverside and local locations",
      "Passport size photos with instant print and soft copy",
      "Album designing, printing and gift photo frames",
      "Event photography for birthdays, engagements and school functions",
      "Photo scanning and restoration of old family prints",
    ],
  },
  {
    id: "cards",
    title: "Wedding Cards (लग्नपत्रिका)",
    description:
      "Traditional and modern invitations for every function around the wedding.",
    items: [
      "Lagna-patrika in classic Marathi designs",
      "Engagement and reception invitations",
      "Modern photo-based cards and premium papers",
      "Custom colours, fonts and layouts as per family choice",
      "Bulk printing with envelopes and numbering",
    ],
  },
  {
    id: "banners",
    title: "Banners & Posters",
    description:
      "Design and printing for political work, functions and business promotion.",
    items: [
      "Political banners for meetings, rallies and greetings",
      "Wedding welcome boards and stage backdrops",
      "Birthday and naming ceremony flex designs",
      "Business posters, shop boards and offer banners",
      "Various sizes and materials with fast delivery",
    ],
  },
  {
    id: "dtp",
    title: "DTP & Document Design",
    description:
      "Clean, professional designs for your documents, applications and IDs.",
    items: [
      "Biodata and marriage profile creation",
      "CV / Resume design for students and job seekers",
      "Application forms, notice designs and certificates",
      "ID cards for schools, coaching classes and events",
      "Pamphlets and flyers with clear layout and print",
    ],
  },
  {
    id: "stationery",
    title: "School Stationery & Copies",
    description:
      "Everyday study support for students and parents visiting the studio.",
    items: [
      "Printouts and photocopies for homework and projects",
      "Notebooks, files and basic school stationery",
      "Lamination for ID cards, mark-sheets and certificates",
      "Scanning of documents for online submission",
    ],
  },
  {
    id: "cyber",
    title: "Cyber Services (Coming Soon)",
    description:
      "Preparing a separate desk for secure online government and banking work.",
    items: [
      "Aadhaar updates and eKYC assistance",
      "PAN card related services",
      "Government and scholarship forms",
      "Online exam and admission forms",
      "Other e-governance services as they become available",
    ],
    comingSoon: true,
  },
];

const Services = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();
const { fadeUp } = variants;
  return (
    <div className="bg-brandBg pb-16 pt-24 text-brandTextPrimary sm:pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 space-y-3 sm:mb-10"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
            Our services
          </p>
          <h1 className="text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
            One studio for photography, printing and digital services.
          </h1>
          <p className="max-w-2xl text-sm text-brandTextMuted sm:text-base">
            Whether you are planning a wedding, preparing documents or printing
            school projects, Shubham Photos Studio is designed to handle
            everything calmly at one counter.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <motion.article
              key={section.id}
              className="flex h-full flex-col rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm shadow-md"
              initial={reduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={variants.fadeUpShort}
              {...variants.cardHover}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-brandTextPrimary">
                  {section.title}
                </h2>
                {section.comingSoon && (
                  <span className="rounded-full bg-brandAccent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brandAccent">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-brandTextMuted">
                {section.description}
              </p>
              <ul className="mt-3 flex-1 space-y-2 text-xs text-brandTextMuted">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-brandAccent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a
                  href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%2C%20I%20want%20to%20enquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-brandAccent px-4 py-1.5 font-semibold text-black shadow-sm shadow-brandAccent/40 hover:bg-amber-400"
                  {...variants.buttonHover}
                >
                  WhatsApp enquiry
                </a>
                <a
                  href="tel:9271456749"
                  className="inline-flex items-center rounded-full border border-brandAccent/60 bg-brandSurface px-4 py-1.5 font-semibold text-brandAccent hover:bg-brandSurfaceSoft"
                  {...variants.buttonHover}
                >
                  Call studio
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;

