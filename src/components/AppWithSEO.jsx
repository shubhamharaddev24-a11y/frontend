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
          title: 'CREAONNECT | Create • Innovate • Connect | Media & Digital Agency',
          description: 'CREAONNECT delivers cinematic photography & films (Create), full-stack web development & digital solutions (Innovate), and community partnerships (Connect).',
          canonical: baseUrl,
          keywords: 'creaonnect, create innovate connect, web development Murbad, digital marketing Thane, wedding cinematography, photo studio Saralgaon, local SEO, graphic design',
          type: 'website'
        };

      case '/about':
        return {
          title: 'About CREAONNECT | Our Story & Three Pillars',
          description: 'Learn how CREAONNECT combines professional software development, local search engine optimization, and timeless cinematic photography.',
          canonical: `${baseUrl}/about`,
          keywords: 'about creaonnect, create innovate connect, web agency Murbad, photography studio, digital solutions company',
          type: 'website'
        };

      case '/services':
        return {
          title: 'Services & Divisions | CREAONNECT',
          description: 'Explore our divisions across three pillars: Create (Media & Design), Innovate (Web Development & Marketing), and Connect (Cyber Desk & Community Hub).',
          canonical: `${baseUrl}/services`,
          keywords: 'creaonnect services, MERN stack development, local SEO optimization, wedding photographer Murbad, banner printing, cyber desk services',
          type: 'website'
        };

      case '/gallery':
        return {
          title: 'Portfolio & Gallery | CREAONNECT',
          description: 'Browse our projects including custom corporate web portals, local business marketing creatives, and professional wedding photography/cinematography.',
          canonical: `${baseUrl}/gallery`,
          keywords: 'creaonnect portfolio, web portfolio, design gallery, wedding photo gallery Murbad, cinematic video highlights',
          type: 'website'
        };

      case '/contact':
        return {
          title: 'Contact CREAONNECT | Connect With Us',
          description: 'Get in touch with CREAONNECT for full-stack web design, search marketing campaigns, or premium wedding cinematography. Call +91 92714 56749 or chat on WhatsApp.',
          canonical: `${baseUrl}/contact`,
          keywords: 'contact creaonnect, hire web developer, digital marketing Thane, book wedding photographer, phone number',
          type: 'website'
        };

      default:
        return {
          title: 'CREAONNECT | Create • Innovate • Connect',
          description: 'Creative digital & media agency offering MERN development, local SEO, and cinematic wedding photography.',
          canonical: baseUrl,
          keywords: 'creaonnect, digital solutions, web development, photography studio, marketing Thane',
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
