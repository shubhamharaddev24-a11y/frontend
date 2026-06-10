import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-brandBorder/80 bg-brandSurface mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <p className="text-sm font-semibold text-brandTextPrimary">
              Shubham Media & Digital Services
            </p>
            <p className="text-xs text-brandTextMuted">
              Premium photography, custom website development, digital marketing, graphic design, and e-governance solutions. Serving local clients via our physical division, Shubham Photos Studio.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
              Quick Links
            </p>
            <nav className="flex flex-col gap-1 text-sm text-brandTextMuted">
              <Link to="/services" className="hover:text-brandAccent">
                Services
              </Link>
              <Link to="/gallery" className="hover:text-brandAccent">
                Gallery
              </Link>
              <Link to="/about" className="hover:text-brandAccent">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-brandAccent">
                Contact
              </Link>
              <Link to="/login" className="hover:text-brandAccent">
                Staff Login
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
              Contact Us
            </p>
            <p className="text-sm text-brandTextMuted">
              Main bazaar road near bus stand, close to police chowki, saralgaon, murbad. Easy to reach from any side of town.
            </p>
            <p className="text-sm text-brandTextMuted">
              Phone: <span className="text-brandTextPrimary">+91 92714 56749</span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-brandBorder/60 pt-4 text-[11px] text-brandTextMuted sm:flex-row">
          <p>© {new Date().getFullYear()} Shubham Media & Digital Services. All rights reserved.</p>
          <p>Delivering digital excellence and timeless media memories.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

