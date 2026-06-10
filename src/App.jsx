import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import "./App.css";

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

  const getSEOConfig = (pathname) => {
    const baseUrl = "https://smediadigitalservices.com";

    switch (pathname) {
      case "/":
        return {
          title: "Custom Web Development & Cinematography Murbad",
          description: "Shubham Media & Digital Services delivers custom MERN stack websites, local SEO marketing, graphic branding, and premium wedding cinematography in Murbad, Maharashtra.",
          canonical: baseUrl,
          keywords: "web development Murbad, digital marketing Thane, wedding cinematography, photo studio Saralgaon, local SEO, graphic design",
          type: "website"
        };

      case "/about":
        return {
          title: "About Us - Web Agency & Photo Studio",
          description: "Learn how Shubham Media & Digital Services combines professional software development, local search engine optimization, and the trusted photography legacy of Shubham Photos Studio.",
          canonical: `${baseUrl}/about`,
          keywords: "about Shubham Media, web agency Murbad, local photography legacy, digital solutions company",
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
        <Header />
        <main className="flex-1 pt-20">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
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
