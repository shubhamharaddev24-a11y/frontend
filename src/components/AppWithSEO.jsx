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
          title: 'Professional Wedding Photography & Digital Services',
          description: 'Shubham Photos Studio offers professional wedding photography, pre-wedding shoots, passport photos, DTP services, and custom banner design in Murbad, Maharashtra.',
          canonical: baseUrl,
          keywords: 'wedding photography, passport photos, DTP services, photo studio Murbad, digital printing, banner design',
          type: 'website'
        };

      case '/about':
        return {
          title: 'About Shubham Photos Studio - Murbad',
          description: 'Learn about Shubham Photos Studio, your trusted local photography service center in Murbad offering professional photography and digital services since 2010.',
          canonical: `${baseUrl}/about`,
          keywords: 'about Shubham Photos, photo studio Murbad, professional photographer, digital services',
          type: 'website'
        };

      case '/services':
        return {
          title: 'Photography Services - Wedding, Passport & DTP',
          description: 'Complete photography services including wedding photography, pre-wedding shoots, passport photos, digital printing, banner design, and DTP services in Murbad.',
          canonical: `${baseUrl}/services`,
          keywords: 'photography services, wedding photography Murbad, passport photos, digital printing, banner design, DTP services',
          type: 'website'
        };

      case '/gallery':
        return {
          title: 'Photo Gallery - Wedding & Portrait Photography',
          description: 'Browse our portfolio of wedding photography, pre-wedding shoots, portraits, and event photography from Shubham Photos Studio in Murbad.',
          canonical: `${baseUrl}/gallery`,
          keywords: 'photo gallery, wedding photography portfolio, pre-wedding photos, portrait photography Murbad',
          type: 'website'
        };

      case '/contact':
        return {
          title: 'Contact Shubham Photos Studio - Murbad',
          description: 'Contact Shubham Photos Studio in Murbad for wedding photography, passport photos, digital printing, and custom banner design services. Call +91 92714 56749.',
          canonical: `${baseUrl}/contact`,
          keywords: 'contact photo studio, Shubham Photos phone, wedding photographer Murbad, digital services contact',
          type: 'website'
        };

      default:
        return {
          title: 'Shubham Photos Studio - Professional Photography Services',
          description: 'Professional photography studio in Murbad offering wedding photography, passport photos, DTP services, digital printing, and custom banners.',
          canonical: baseUrl,
          keywords: 'photo studio Murbad, wedding photography, digital services, passport photos',
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
