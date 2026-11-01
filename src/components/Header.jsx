import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { useMotionVariants, useReducedMotionProps } from "../utils/motion";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/gallery" },
  { label: "Services", to: "/services" },
  { label: "Gig Market", to: "/dashboard" },
];

// Clean & minimal announcement marquee ticker matching GSAP style (1-2 clean lines, comfortable height, no bold)
const TickerItemOne = () => (
  <div className="inline-flex items-center text-xs sm:text-[12.5px] font-normal text-black tracking-normal shrink-0 px-10 sm:px-14">
    <span className="mr-2 text-sm leading-none select-none">📢</span>
    <span className="text-black">CREAONNECT is now live worldwide — </span>
    <NavLink
      to="/dashboard"
      className="mx-1 underline underline-offset-2 decoration-black/50 hover:decoration-black hover:opacity-80 transition-all font-medium !text-black"
    >
      earn with creative gigs
    </NavLink>
    <span className="text-black/75 mx-1">or</span>
    <NavLink
      to="/dashboard"
      className="mx-1 underline underline-offset-2 decoration-black/50 hover:decoration-black hover:opacity-80 transition-all font-medium !text-black"
    >
      book a photoshoot order
    </NavLink>
    <span className="text-black ml-1">with 100% escrow protection.</span>
    <span className="mx-10 sm:mx-14 text-black/35 font-light select-none">•</span>
  </div>
);

const TickerItemTwo = () => (
  <div className="inline-flex items-center text-xs sm:text-[12.5px] font-normal text-black tracking-normal shrink-0 px-10 sm:px-14">
    <span className="mr-2 text-sm leading-none select-none">✦</span>
    <span className="text-black">On-demand photography, reels, design & digital services worldwide — </span>
    <NavLink
      to="/services"
      className="mx-1 underline underline-offset-2 decoration-black/50 hover:decoration-black hover:opacity-80 transition-all font-medium !text-black"
    >
      explore services
    </NavLink>
    <span className="text-black ml-1">with 10% flat platform fee.</span>
    <span className="mx-10 sm:mx-14 text-black/35 font-light select-none">•</span>
  </div>
);

const Header = () => {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const variants = useMotionVariants();

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 dark:bg-[#0C0A09]/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#362B24]/70 shadow-sm"
        : "bg-white/90 dark:bg-[#0C0A09]/90 backdrop-blur-sm border-b border-[#E5E7EB]/50 dark:border-[#362B24]/40"
        }`}
    >
      {/* ======================================================== */}
      {/* GSAP-STYLE RUNNING TICKER ANNOUNCEMENT BAR AT VERY TOP */}
      {/* ======================================================== */}
      <div className="w-full bg-[#76B900] text-black border-b border-black/10 overflow-hidden h-8 sm:h-[34px] flex items-center px-4 relative z-20 group">
        <div className="flex w-max animate-top-ticker select-none items-center">
          <TickerItemOne />
          <TickerItemTwo />
          <TickerItemOne />
          <TickerItemTwo />
        </div>
      </div>

      {/* Main Navbar: Exact spacing & distance matching GSAP reference */}
      <div className="mx-auto flex max-w-7xl items-center px-6 lg:px-8 h-14 sm:h-[58px] transition-all duration-300">
        {/* Left Side: Logo + Nav Items with exact GSAP distance */}
        <div className="flex items-center gap-8 lg:gap-10 shrink-0">
          {/* Logo / Brand */}
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2 outline-none"
            aria-label="CREAONNECT — Home"
          >
            <Logo />
          </NavLink>

          {/* Navigation - desktop (Spaced exactly like GSAP: Tools, Showcase, Community, ...) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 shrink-0">
            {navItems.map((item) => (
              <motion.div key={item.to} {...variants.navLinkHover} className="shrink-0">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative text-xs sm:text-[13px] font-medium transition-colors !no-underline py-1 flex items-center ${isActive
                      ? "!text-[#76B900] font-semibold"
                      : "text-stone-600 dark:text-[#A1A1AA] hover:text-black dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#76B900]"
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
        </div>

        {/* Right Action Cluster: Login link + Pill Button (identical to Login/Create Account + Get GSAP) */}
        <div className="ml-auto flex items-center gap-3.5 sm:gap-4 shrink-0">
          {/* Theme Toggle */}
          <div className="flex items-center justify-center shrink-0">
            <ThemeToggle />
          </div>

          {/* Clean text link: Dashboard or Sign In (Matching 'Login/Create Account') */}
          {localStorage.getItem("token") ? (
            <NavLink
              to="/dashboard"
              className="hidden sm:inline-flex items-center text-xs sm:text-[13px] font-medium text-stone-600 dark:text-[#A1A1AA] hover:text-black dark:hover:text-white transition-colors !no-underline"
            >
              <span>Dashboard</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="hidden sm:inline-flex items-center text-xs sm:text-[13px] font-medium text-stone-600 dark:text-[#A1A1AA] hover:text-black dark:hover:text-white transition-colors !no-underline"
            >
              <span>Login / Sign In</span>
            </NavLink>
          )}

          {/* Primary Action Button: Pill Button (Matching 'Get GSAP') */}
          <NavLink
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-1.5 text-xs font-semibold border border-black/80 dark:border-white/80 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all whitespace-nowrap shrink-0 !no-underline select-none"
          >
            <span>Book Shoot</span>
          </NavLink>

          {/* Mobile menu toggle */}
          <motion.button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brandBorder bg-brandSurface text-brandTextPrimary md:hidden"
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
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm font-medium transition-colors !no-underline ${isActive
                        ? "bg-brandAccent/10 !text-brandAccent"
                        : "!text-brandTextPrimary/70 hover:bg-brandSurfaceSoft hover:!text-brandTextPrimary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Quick Actions in Mobile Drawer */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-10 rounded-xl border border-brandBorder bg-brandSurfaceSoft text-xs font-bold text-brandTextPrimary !no-underline"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-10 rounded-xl bg-[#76B900] text-black text-xs font-black uppercase !no-underline"
                >
                  Book Shoot
                </NavLink>
              </div>

              {/* Theme Mode Switcher in mobile drawer */}
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-brandSurfaceSoft/40 border border-brandBorder/40 mt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-brandTextSecondary">Appearance</span>
                <ThemeToggle />
              </div>

              {/* Call & WhatsApp actions inside mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="mt-3 grid grid-cols-2 gap-2.5 border-t border-brandBorder/60 pt-4 px-1"
              >
                <a
                  href="tel:9271456749"
                  className="flex items-center justify-center gap-2 rounded-xl bg-brandAccent py-2.5 text-xs font-bold text-black hover:bg-amber-400 active:scale-95 transition-all !no-underline"
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919271456749?text=Hi%20CREAONNECT%2C%20I%20want%20to%20enquire%20about%20your%20services%20(Photography%2C%20Web%20Development%20or%20Marketing)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-brandBorder bg-brandSurfaceSoft/60 py-2.5 text-xs font-bold text-brandTextPrimary hover:text-[#25D366] hover:border-[#25D366]/40 active:scale-95 transition-all !no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-[#25D366]"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.21 1.488 4.793 1.489 5.485 0 9.948-4.467 9.95-9.953.001-2.657-1.02-5.155-2.877-7.017C16.6 1.81 14.107.784 11.457.784c-5.49 0-9.957 4.469-9.96 9.957-.001 1.796.485 3.548 1.408 5.105L1.874 21.98l6.21-1.626-.037-.02-.02-.012z" />
                    <path d="M16.924 13.917c-.295-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.662.148-.195.297-.759.962-.93.158-.172-.1-.344-.226-.52-.382-.693-.618-1.162-1.38-1.298-1.614-.136-.233-.015-.36.1-.478.105-.107.23-.27.345-.405.115-.135.153-.225.23-.375.075-.15.038-.282-.018-.394-.057-.113-.467-1.127-.64-1.542-.168-.406-.338-.351-.466-.358-.12-.006-.258-.007-.396-.007-.138 0-.363.052-.553.26-.191.208-.728.712-.728 1.734s.744 2.01 1.01 2.37c.265.36 1.463 2.234 3.544 3.132.495.213.882.34 1.182.436.498.158.951.135 1.309.082.399-.058 1.748-.713 1.996-1.402.248-.689.248-1.28.173-1.402-.075-.12-.27-.225-.565-.373z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
