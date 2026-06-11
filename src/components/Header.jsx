import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { useMotionVariants, useReducedMotionProps } from "../utils/motion";
import ThemeToggle from "./ThemeToggle";
import logoShubham from "../assets/logo-shubham-photos-studio.png";
import Logo from "./Logo";
const navItems = [
  // { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const variants = useMotionVariants();
  const reducedMotionProps = useReducedMotionProps(reduceMotion);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Handle scroll state for header transition
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
      variants={variants.headerScroll}
      animate={scrolled ? "scrolled" : "top"}
      initial="top"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 md:h-24 lg:px-8">
        {/* Logo / Brand — shrink-0 so flex nav/buttons never squeeze the mark */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg outline-none ring-brandAccent/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="Shubham Media & Digital Services — Home"
        >
          <Logo className="h-10 w-10" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-extrabold tracking-wider text-brandTextPrimary sm:text-base">
              SHUBHAM
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-brandAccent sm:text-[10px]">
              Media & Digital Services
            </span>
          </div>
        </NavLink>

        {/* Navigation - desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.to} {...variants.navLinkHover}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative text-xs font-medium uppercase tracking-[0.18em] transition-colors ${isActive ? "text-brandAccent" : "text-brandTextPrimary/70 hover:text-brandTextPrimary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brandAccent"
                        layoutId="activeNavIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Call / WhatsApp + mobile menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="inline-flex" />
          {/* Call Button */}
          <motion.a
            href="tel:9271456749"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brandAccent text-black shadow-md shadow-brandAccent/20 hover:bg-amber-400 transition-colors"
            {...variants.buttonHover}
            aria-label="Call Now"
          >
            <Phone size={18} />
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/919271456749?text=Hi%20Shubham%20Media%20%26%20Digital%20Services%2C%20I%20want%20to%20enquire%20about%20your%20photography%2C%20development%20or%20marketing%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brandBorder bg-brandSurfaceSoft/40 text-brandTextPrimary hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-colors active:scale-95"
            {...variants.buttonHover}
            aria-label="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.21 1.488 4.793 1.489 5.485 0 9.948-4.467 9.95-9.953.001-2.657-1.02-5.155-2.877-7.017C16.6 1.81 14.107.784 11.457.784c-5.49 0-9.957 4.469-9.96 9.957-.001 1.796.485 3.548 1.408 5.105L1.874 21.98l6.21-1.626-.037-.02-.02-.012z"/>
              <path d="M16.924 13.917c-.295-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.662.148-.195.297-.759.962-.93.158-.172-.1-.344-.226-.52-.382-.693-.618-1.162-1.38-1.298-1.614-.136-.233-.015-.36.1-.478.105-.107.23-.27.345-.405.115-.135.153-.225.23-.375.075-.15.038-.282-.018-.394-.057-.113-.467-1.127-.64-1.542-.168-.406-.338-.351-.466-.358-.12-.006-.258-.007-.396-.007-.138 0-.363.052-.553.26-.191.208-.728.712-.728 1.734s.744 2.01 1.01 2.37c.265.36 1.463 2.234 3.544 3.132.495.213.882.34 1.182.436.498.158.951.135 1.309.082.399-.058 1.748-.713 1.996-1.402.248-.689.248-1.28.173-1.402-.075-.12-.27-.225-.565-.373z"/>
            </svg>
          </motion.a>

          {/* Mobile menu toggle */}
          <motion.button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-brandBorder bg-brandSurface p-2 text-brandTextPrimary md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setOpen((prev) => !prev)}
            {...variants.buttonTap}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>

      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-brandBorder bg-brandSurface/95 px-4 pb-4 pt-3 text-sm text-brandTextPrimary md:hidden"
            variants={variants.mobileMenuContent}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                        ? "bg-brandAccent/10 text-brandAccent"
                        : "text-brandTextPrimary/70 hover:bg-brandSurfaceSoft hover:text-brandTextPrimary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

