import React, { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMotionVariants } from "../utils/motion";
import { serviceService } from "../services";
import SplitText from "../components/SplitText";

const sections = [
  {
    id: "photography",
    title: "Media Services (Shubham Photos Studio)",
    description:
      "Timeless memories, wedding films, and professional photography captured by our dedicated studio branch.",
    items: [
      "Wedding photography and videography (Traditional & Cinematic)",
      "Pre-wedding shoots at scenic outdoor locations near Murbad",
      "Event coverage (Engagements, birthdays, and school functions)",
      "Passport and visa photos with instant studio printing",
      "Custom album design, photo framing, and laminations",
      "Scanning and restoration of old, damaged family photos",
    ],
  },
  {
    id: "web-dev",
    title: "Web Development Division",
    description:
      "Modern, fast, and responsive websites to establish your business online.",
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
    title: "Digital Marketing Division",
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
    id: "design-branding",
    title: "Design & Graphic Branding",
    description:
      "Professional visual assets for your offline promotions and branding.",
    items: [
      "Political banners, rally posters, and flex designs",
      "Shop front board designs and corporate identity assets",
      "Wedding welcome boards, backdrops, and Marathi Lagna-Patrika",
      "Visiting cards, brochures, and promotional pamphlets",
      "Custom logo designs and social media post templates",
    ],
  },
  {
    id: "cyber-dtp",
    title: "Cyber Desk & DTP Services",
    description:
      "Your physical point of contact in Saralgaon for essential digital document tasks.",
    items: [
      "Professional biodata and marriage CV creation",
      "Student resumes and job application documents",
      "Aadhaar updates, eKYC assistance, and PAN card services (Coming Soon)",
      "Online college admissions and government scholarship forms (Coming Soon)",
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

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
            <SplitText>Comprehensive Media, Technology & Design Solutions.</SplitText>
          </h1>
          <p className="max-w-2xl text-sm text-brandTextMuted sm:text-base">
            From professional cinematography and wedding albums at our local 
            <strong> Shubham Photos Studio</strong> counter, to custom websites, 
            local SEO marketing, and digital branding — we deliver high-level solutions.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {error ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            services.map((section) => (
              <motion.article
                key={section.id || section._id}
                className="slimy-card text-sm mouse-glow-card"
                onMouseMove={handleMouseMove}
                style={{
                  "--card-shadow-color": "rgba(255, 122, 24, 0.12)"
                }}
                initial={reduceMotion ? "show" : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={variants.fadeUpShort}
              >
                <div className="card__border"></div>
                <div className="flex items-center gap-3">
                  <h2 className="card_title">
                    {section.title}
                  </h2>
                  {section.comingSoon && (
                    <span className="rounded-full bg-brandAccent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brandAccent relative z-10">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="card_paragraph">
                  {section.description}
                </p>
                <hr className="line" />
                <ul className="card__list">
                  {(section.items || []).map((item, index) => (
                    <li key={index} className="card__list_item">
                      <span className="check">
                        <svg
                          className="check_svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <span className="list_text">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 text-xs relative z-10">
                  <a
                    href="https://wa.me/919271456749?text=Hi%20Shubham%20Media%20%26%20Digital%20Services%2C%20I%20want%20to%20enquire%20about%20your%20services."
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
                    Call team
                  </a>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;

