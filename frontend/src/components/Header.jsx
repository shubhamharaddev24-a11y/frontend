import React from "react";
import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const reduceMotion = useReducedMotion();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-brandBorder/80 bg-black/60 backdrop-blur-xl">
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
            <p className="text-xs text-brandTextMuted">
              Your Trusted Photo & Digital Service Center
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-brandAccent" : "text-brandTextMuted hover:text-brandTextPrimary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Call / WhatsApp */}
        <div className="flex items-center gap-2">
          <motion.a
            href="tel:9271456749"
            className="hidden rounded-full border border-brandAccent/60 bg-brandSurface px-4 py-2 text-xs font-semibold text-brandAccent shadow-sm hover:bg-brandAccent/10 sm:inline-flex"
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            Call Now
          </motion.a>
          <motion.a
            href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%20-%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brandAccent px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-brandAccent/40 hover:bg-amber-400"
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            <span>WhatsApp</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
};

export default Header;

