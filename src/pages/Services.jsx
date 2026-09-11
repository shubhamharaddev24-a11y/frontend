import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";
import { serviceService } from "../services";

const sections = [
  {
    id: "photography",
    pillar: "CREATE",
    title: "Media Services & Visual Arts",
    description:
      "Timeless memories, wedding films, and professional photography captured with cinematic elegance.",
    items: [
      "Wedding photography and videography (Traditional & Cinematic)",
      "Pre-wedding shoots at scenic outdoor locations near Murbad",
      "Event coverage (Engagements, birthdays, and celebrations)",
      "Passport and visa photos with instant studio printing",
      "Custom album design, photo framing, and laminations",
      "Scanning and restoration of old, damaged family photos",
    ],
  },
  {
    id: "design-branding",
    pillar: "CREATE",
    title: "Design & Graphic Branding",
    description:
      "Professional visual assets for your offline promotions, print media, and corporate branding.",
    items: [
      "Political banners, rally posters, and flex designs",
      "Shop front board designs and corporate identity assets",
      "Wedding welcome boards, backdrops, and Marathi Lagna-Patrika",
      "Visiting cards, brochures, and promotional pamphlets",
      "Custom logo designs and social media post templates",
    ],
  },
  {
    id: "web-dev",
    pillar: "INNOVATE",
    title: "Web Development Division",
    description:
      "Modern, fast, and responsive websites to establish your business authority online.",
    items: [
      "Custom Full-Stack web applications (MERN Stack)",
      "Business and corporate portfolio websites",
      "High-converting landing pages and product funnels",
      "Digital wedding invitation websites with maps and RSVP",
      "E-commerce stores and custom customer portals",
      "Website maintenance, speed optimization, and hosting setup",
    ],
  },
  {
    id: "digital-marketing",
    pillar: "INNOVATE",
    title: "Digital Marketing & Growth",
    description:
      "Drive traffic, build authority, and acquire local customers for your brand.",
    items: [
      "Google Business Profile (GMB) setup and local search optimization",
      "Search Engine Optimization (SEO) to rank #1 on Google",
      "Social Media Management (Instagram, YouTube, Facebook)",
      "Lead generation campaigns and Google/Meta advertisement setups",
      "WhatsApp Business automation and customer relationship tools",
    ],
  },
  {
    id: "cyber-dtp",
    pillar: "CONNECT",
    title: "Cyber Desk & Citizen Services",
    description:
      "Your physical point of contact in Saralgaon for essential digital document tasks and citizen services.",
    items: [
      "Professional biodata and marriage CV creation",
      "Student resumes and job application documents",
      "Aadhaar updates, eKYC assistance, and PAN card services",
      "Online college admissions and government scholarship forms",
      "High-volume document printing, copying, and laminations",
    ],
  },
];

const Services = () => {
  const reduceMotion = useReducedMotion();
  const variants = useMotionVariants();
  const { fadeUp } = variants;
  const [services, setServices] = useState(sections);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await serviceService.getAllServices();
        const servicesList = servicesData.data?.services;
        
        if (Array.isArray(servicesList) && servicesList.length > 0) {
          const mappedServices = servicesList.map(s => ({
            id: s._id,
            title: s.name,
            description: s.description,
            items: s.features && s.features.length > 0 ? s.features : (s.includes || []),
            comingSoon: !s.isActive
          }));
          setServices(mappedServices);
        }
      } catch (err) {
        console.error('Failed to fetch services, using static fallback:', err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-brandBg text-brandTextPrimary min-h-screen pb-20 pt-32 px-6 sm:px-12">
      <section className="mx-auto max-w-7xl space-y-12">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandAccent">
            DIVISIONS & SERVICES
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brandTextPrimary font-normal leading-tight">
            Create • Innovate • Connect
          </h1>
          <p className="text-sm sm:text-base text-brandTextMuted font-light leading-relaxed">
            From professional cinematography and wedding albums, to custom full-stack web applications, local SEO marketing, and digital citizen desk services.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((section) => (
            <motion.article
              key={section.id || section._id}
              className="bg-brandSurface border border-brandBorder p-8 sm:p-10 rounded-2xl space-y-5 shadow-sm hover:shadow-md transition-all duration-300"
              initial={reduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={variants.fadeUpShort}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  {section.pillar && (
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest font-bold text-brandAccent bg-brandAccent/10 px-2.5 py-0.5 rounded">
                      Pillar: {section.pillar}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl font-normal text-brandTextPrimary">
                    {section.title}
                  </h2>
                </div>
                {section.comingSoon && (
                  <span className="rounded-full bg-brandAccent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brandAccent">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-brandTextMuted font-light leading-relaxed">
                {section.description}
              </p>
              <hr className="border-brandBorder/60" />
              <ul className="space-y-3 text-xs sm:text-sm text-brandTextMuted font-light">
                {(section.items || []).map((item, index) => (
                  <li key={index} className="flex gap-2.5 items-start">
                    <span className="text-brandAccent">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919271456749?text=Hi%20Shubham%20Media%20%26%20Digital%20Services%2C%20I%20want%20to%20enquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-brandTextPrimary !text-brandBg text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-brandAccent hover:!text-white rounded-xl !no-underline"
                >
                  WhatsApp Enquiry
                </a>
                <a
                  href="tel:9271456749"
                  className="px-6 py-2.5 border border-brandBorder !text-brandTextPrimary text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-brandAccent hover:!text-brandAccent rounded-xl !no-underline"
                >
                  Call Team
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

