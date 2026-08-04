import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-[#E0D7CC]/80 dark:border-[#3D342E]/80 bg-[#FAF6F0] dark:bg-[#181412] text-[#1A1A1A] dark:text-[#F2EDE4] py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Logo />
            <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0] leading-relaxed max-w-md font-light">
              Preserving raw emotions, timeless love stories, cinematic wedding films, and powering business growth with custom software engineering, digital marketing, and branding.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C6B]">
              Navigation
            </p>
            <nav className="flex flex-col gap-2 text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0] uppercase tracking-[0.15em]">
              <Link to="/" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/gallery" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                Portfolio & Gallery
              </Link>
              <Link to="/services" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                Divisions & Services
              </Link>
              <Link to="/contact" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                Book Us / Contact
              </Link>
              <Link to="/login" className="hover:text-[#1A1A1A] dark:hover:text-white transition-colors">
                Staff Portal
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C6B]">
              Connect & Visit
            </p>
            <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed">
              Main bazaar road near bus stand, opposite Saralgaon Police Chowki, Murbad.
            </p>
            <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#B8ABA0]">
              Direct: <span className="font-semibold text-[#1A1A1A] dark:text-[#F2EDE4]">+91 92714 56749</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E0D7CC]/60 dark:border-[#3D342E]/60 pt-6 text-xs text-[#4A4A4A] dark:text-[#B8ABA0] sm:flex-row">
          <p>© {new Date().getFullYear()} Shubham Media & Digital Services. All rights reserved.</p>
          <p className="font-serif italic">Crafted in Viya Films luxury aesthetic.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

