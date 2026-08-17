import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SEOHead from "./SEOHead";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";

const AppWithSEO = () => {
  const location = useLocation();
  
  // SEO configuration based on current route
  const getSEOConfig = (pathname) => {
    const baseUrl = 'https://frontend-smoky-eight-54.vercel.app';

    switch (pathname) {
      case '/':
        return {
          title: 'Shubham Media & Digital Services | Custom Web Development & Cinematography Murbad',
          description: 'Shubham Media & Digital Services delivers custom MERN stack websites, local SEO marketing, graphic branding, and premium wedding cinematography in Murbad, Maharashtra.',
          canonical: baseUrl,
          keywords: 'web development Murbad, digital marketing Thane, wedding cinematography, photo studio Saralgaon, local SEO, graphic design',
          type: 'website'
        };

      case '/about':
        return {
          title: 'About Shubham Media & Digital Services - Murbad',
          description: 'Learn how Shubham Media & Digital Services combines professional software development, local search engine optimization, and the trusted photography legacy of Shubham Photos Studio.',
          canonical: `${baseUrl}/about`,
          keywords: 'about Shubham Media, web agency Murbad, local photography legacy, digital solutions company',
          type: 'website'
        };

      case '/services':
        return {
          title: 'Media, Web Development & Marketing Services - Murbad',
          description: 'Explore our divisions: full-stack web applications, local SEO & marketing campaigns, custom print designs, and professional wedding photography (Shubham Photos Studio).',
          canonical: `${baseUrl}/services`,
          keywords: 'MERN stack development, local SEO optimization, wedding photographer Murbad, banner printing, cyber desk services',
          type: 'website'
        };

      case '/gallery':
        return {
          title: 'Portfolio & Gallery - Shubham Media & Digital Services',
          description: 'Browse our projects including custom corporate web portals, local business marketing creatives, and professional wedding photography/cinematography.',
          canonical: `${baseUrl}/gallery`,
          keywords: 'web portfolio, design gallery, wedding photo gallery Murbad, cinematic video highlights',
          type: 'website'
        };

      case '/contact':
        return {
          title: 'Contact Shubham Media & Digital Services - Murbad',
          description: 'Get in touch with us for full-stack web design, search marketing campaigns, or premium event shoots. Call +91 92714 56749 or chat on WhatsApp.',
          canonical: `${baseUrl}/contact`,
          keywords: 'contact web developer Murbad, hire digital marketing Thane, book wedding photographer, phone number',
          type: 'website'
        };

      default:
        return {
          title: 'Shubham Media & Digital Services | Professional Digital & Media Solutions',
          description: 'Creative digital agency in Thane offering MERN development, local SEO, and cinematic wedding photography.',
          canonical: baseUrl,
          keywords: 'digital solutions, web development, photography studio, marketing Thane',
          type: 'website'
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AppWithSEO;
