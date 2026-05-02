import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { MessageCircle ,Phone,Menu,X } from "lucide-react";
import { useMotionVariants, useReducedMotionProps } from "../utils/motion";
import ThemeToggle from "./ThemeToggle";
import logoShubham from "../assets/logo-shubham-photos-studio.png";
const navItems = [
  { label: "Home", to: "/" },
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
          className="flex shrink-0 items-center rounded-lg outline-none ring-brandAccent/70 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="Shubham Photos Studio — Home"
        >
          <img
            src={logoShubham}
            alt="Shubham Photos Studio"
            width={560}
            height={280}
            decoding="async"
            draggable={false}
            className="h-16 w-auto object-contain object-left sm:h-[4.5rem] md:h-20 lg:h-[5.25rem]"
          />
        </NavLink>

        {/* Navigation - desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.to} {...variants.navLinkHover}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-brandAccent" : "text-white/70 hover:text-white"
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
    className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brandAccent px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-black/30 hover:bg-brandAccentSoft transition-colors"
    {...variants.buttonHover}
    aria-label="Call Now"
  >
    <Phone size={14} />
    <span>Call Now</span>
  </motion.a>

  {/* WhatsApp Button */}
  <motion.a
    href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%20-%20I%20would%20like%20to%20enquire%20about%20your%20services."
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/20 text-white shadow-sm transition hover:bg-black/30 active:scale-95 sm:px-4 sm:py-2 sm:gap-2"
    {...variants.buttonHover}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={18} />
    <span className="hidden text-xs font-semibold sm:inline">
      WhatsApp
    </span>
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
            className="border-t border-white/10 bg-black/85 px-4 pb-4 pt-3 text-sm text-white md:hidden"
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
                      `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brandAccent/10 text-brandAccent"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
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

