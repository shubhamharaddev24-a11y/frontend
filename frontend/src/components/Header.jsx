import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle ,Phone,Menu,X } from "lucide-react";
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
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
           <p className="hidden text-xs text-brandTextMuted sm:block">
  Your Trusted Photo & Digital Service Center
</p>
          </div>
        </div>

        {/* Navigation - desktop */}
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

        {/* Call / WhatsApp + mobile menu */}
        <div className="flex items-center gap-2">
  {/* Call Button */}
  <motion.a
    href="tel:9271456749"
    className="hidden sm:inline-flex items-center gap-2 rounded-full border border-brandAccent/60 bg-brandSurface px-4 py-2 text-xs font-semibold text-brandAccent shadow-sm hover:bg-brandAccent/10"
    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
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
    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={18} />
    <span className="hidden text-xs font-semibold text-black sm:inline">
      WhatsApp
    </span>
  </motion.a>

  {/* Mobile menu toggle */}
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-full border border-brandBorder bg-brandSurface p-2 text-brandTextPrimary md:hidden"
    aria-label="Toggle navigation"
    onClick={() => setOpen((prev) => !prev)}
  >
    {open ? <X size={18} /> : <Menu size={18} />}
  </button>
</div>

      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-brandBorder/70 bg-brandSurface/95 px-4 pb-4 pt-3 text-sm text-brandTextPrimary md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
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
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

