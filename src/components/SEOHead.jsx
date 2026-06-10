import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  image,
  keywords,
  jsonLd 
}) => {
  const siteTitle = 'Shubham Media & Digital Services';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = 'https://smediadigitalservices.com';
  const siteDescription = 'Shubham Media & Digital Services offers professional web development (MERN stack), local digital marketing/SEO, graphic design, and premium cinematic photography through Shubham Photos Studio in Murbad.';
  const defaultImage = 'https://smediadigitalservices.com/images/og-image.jpg';

  const structuredData = jsonLd || {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Shubham Media & Digital Services",
    "description": siteDescription,
    "url": siteUrl,
    "telephone": "+91 92714 56749",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Bazaar, Near Bus Stand, Opposite Saralgaon Police Chowki",
      "addressLocality": "Murbad",
      "addressRegion": "Maharashtra",
      "postalCode": "421401",
      "addressCountry": "India"
    },
    "openingHours": "Mo-Su 09:00-20:00",
    "image": defaultImage,
    "priceRange": "$$",
    "sameAs": [
      "https://wa.me/919271456749",
      "https://instagram.com/shubhammedia"
    ],
    "services": [
      "Web Development",
      "Digital Marketing & SEO",
      "Graphic Design",
      "Wedding Photography",
      "Cinematography", 
      "Passport Photos",
      "DTP Services",
      "Album Design"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:site" content="@shubhamphotos" />
      
      {/* Additional SEO Meta */}
      <meta name="author" content="Shubham Media & Digital Services" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Murbad, Maharashtra" />
      <meta name="ICBM" content="Murbad, Maharashtra, India" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Helmet>
  );
};

export default SEOHead;
