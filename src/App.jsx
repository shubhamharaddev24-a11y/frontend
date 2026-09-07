import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import Starfield from "./components/Starfield";
import FloatingContactButtons from "./components/FloatingContactButtons";
import Lenis from "lenis";
import "./App.css";

import Practice from "./pages/Practice";

// Lazy loaded page components for optimal initial bundle sizes
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Sleek and premium visual loader for dynamic page transition states
const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-brandBg">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-brandAccent border-t-transparent shadow-sm"></div>
  </div>
);

// Child component that reads browser location and injects the corresponding SEO config
const AppContent = () => {
  const location = useLocation();

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // spring-like deceleration
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Keep default scroll behaviors on touchscreens
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  // Reset scroll position instantly on path transitions
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const getSEOConfig = (pathname) => {
    const baseUrl = "https://creaonnect.com";

    switch (pathname) {
      case "/":
        return {
          title: "CREAONNECT | Create • Innovate • Connect",
          description: "CREAONNECT delivers custom MERN stack websites, local SEO marketing, graphic branding, and premium wedding cinematography across three pillars: Create, Innovate, Connect.",
          canonical: baseUrl,
          keywords: "creaonnect, create innovate connect, web development Murbad, digital marketing Thane, wedding cinematography, photo studio Saralgaon, local SEO, graphic design",
          type: "website"
        };

      case "/about":
        return {
          title: "About Us | CREAONNECT Three Pillars",
          description: "Learn how CREAONNECT combines professional software development, local search engine optimization, and timeless cinematic photography.",
          canonical: `${baseUrl}/about`,
          keywords: "about creaonnect, create innovate connect, web agency Murbad, digital solutions company",
          type: "website"
        };

      case "/services":
        return {
          title: "Web Development, Marketing & Media Services",
          description: "Explore our divisions: full-stack web applications, local SEO & marketing campaigns, custom print designs, and professional wedding photography (Shubham Photos Studio).",
          canonical: `${baseUrl}/services`,
          keywords: "MERN stack development, local SEO optimization, wedding photographer Murbad, banner printing, cyber desk services",
          type: "website"
        };

      case "/gallery":
        return {
          title: "Our Work Portfolio & Cinematic Gallery",
          description: "Browse our projects including custom corporate web portals, local business marketing creatives, and professional wedding photography/cinematography.",
          canonical: `${baseUrl}/gallery`,
          keywords: "web portfolio, design gallery, wedding photo gallery Murbad, cinematic video highlights",
          type: "website"
        };

      case "/contact":
        return {
          title: "Contact Us - Hire Developers & Book Photographers",
          description: "Get in touch with us for full-stack web design, search marketing campaigns, or premium event shoots. Call +91 92714 56749 or chat on WhatsApp.",
          canonical: `${baseUrl}/contact`,
          keywords: "contact web developer Murbad, hire digital marketing Thane, book wedding photographer, phone number",
          type: "website"
        };

      case "/login":
        return {
          title: "Admin Portal Sign-In",
          description: "Log in to the administrative panel to manage client leads, gallery media, and bookings.",
          canonical: `${baseUrl}/login`,
          keywords: "admin login, shubham media admin panel",
          type: "website"
        };

      case "/admin":
        return {
          title: "Control Panel & Management Dashboard",
          description: "Dashboard to view and manage service inquiries, bookings, customer leads, and gallery updates.",
          canonical: `${baseUrl}/admin`,
          keywords: "admin dashboard, lead management, booking dashboard",
          type: "website"
        };

      default:
        return {
          title: "Professional Digital & Media Solutions",
          description: "Creative digital agency in Thane offering MERN development, local SEO, and cinematic wedding photography.",
          canonical: baseUrl,
          keywords: "digital solutions, web development, photography studio, marketing Thane",
          type: "website"
        };
    }
  };

  const seoConfig = getSEOConfig(location.pathname);

  return (
    <>
      <SEOHead {...seoConfig} />
      <div className="flex min-h-screen flex-col bg-brandBg text-brandTextPrimary">
        <Starfield />
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/practice" element={<Practice />} /> 
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {!location.pathname.startsWith("/admin") && <FloatingContactButtons />}
      </div>
    </>
  );

};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
