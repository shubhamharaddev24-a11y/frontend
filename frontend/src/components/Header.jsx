import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { MessageCircle ,Phone,Menu,X } from "lucide-react";
import { useMotionVariants, useReducedMotionProps } from "../utils/motion";
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
      className="fixed top-0 inset-x-0 z-50 border-b border-brandBorder/80"
      variants={variants.headerScroll}
      animate={scrolled ? "scrolled" : "top"}
      initial="top"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brandAccent to-amber-500 shadow-lg">
            <span className="text-xl font-semibold text-black">SP</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-brandTextPrimary">
              Shubham Photos Studio
            </p>
           <p className="hidden text-xs text-brandTextMuted sm:block">
  Your Trusted Photo & Digital Service Center
</p>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.to} {...variants.navLinkHover}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-brandAccent" : "text-brandTextMuted hover:text-brandTextPrimary"
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
  {/* Call Button */}
  <motion.a
    href="tel:9271456749"
    className="hidden sm:inline-flex items-center gap-2 rounded-full border border-brandAccent/60 bg-brandSurface px-4 py-2 text-xs font-semibold text-brandAccent shadow-sm hover:bg-brandAccent/10"
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
    className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#25D366] shadow-sm transition hover:shadow-md active:scale-95 sm:px-4 sm:py-2 sm:gap-2"
    {...variants.buttonHover}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={18} />
    <span className="hidden text-xs font-semibold text-black sm:inline">
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
            className="border-t border-brandBorder/70 bg-brandSurface/95 px-4 pb-4 pt-3 text-sm text-brandTextPrimary md:hidden"
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
                          : "text-brandTextMuted hover:bg-brandSurfaceSoft hover:text-brandTextPrimary"
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

