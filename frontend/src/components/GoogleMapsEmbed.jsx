import React, { useEffect, useRef } from 'react';

const GoogleMapsEmbed = ({ 
  address = "Main Bazaar, Near Bus Stand, Opposite Saralgaon Police Chowki, Murbad, Maharashtra 421401",
  title = "Shubham Photos Studio",
  zoom = 16,
  className = ""
}) => {
  const mapRef = useRef();

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: zoom,
          center: { lat: 19.1508, lng: 73.3426 }, // Murbad coordinates
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f5f5" }]
            }
          ]
        });

        const marker = new window.google.maps.Marker({
          position: { lat: 19.1508, lng: 73.3426 },
          map: map,
          title: title,
          animation: window.google.maps.Animation.DROP
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">${title}</h3>
              <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
              <p style="margin: 10px 0 0 0;">
                <strong>Phone:</strong> +91 92714 56749<br>
                <strong>Hours:</strong> Mon-Sun 9:00 AM - 8:00 PM
              </p>
              <a href="tel:+919271456749" 
                 style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #f97316; color: white; text-decoration: none; border-radius: 4px;">
                Call Now
              </a>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [address, title, zoom]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        style={{ minHeight: '400px' }}
        aria-label={`Map showing location of ${title}`}
      />
      
      {/* Fallback static map */}
      <noscript>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(address)}&zoom=${zoom}&maptype=roadmap`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          aria-label={`Static map of ${title}`}
          className="rounded-lg"
        />
      </noscript>
      
      {/* Schema.org structured data for the location */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          "name": title,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Main Bazaar, Near Bus Stand, Opposite Saralgaon Police Chowki",
            "addressLocality": "Murbad",
            "addressRegion": "Maharashtra",
            "postalCode": "421401",
            "addressCountry": "India"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.1508,
            "longitude": 73.3426
          },
          "telephone": "+91 92714 56749",
          "openingHours": "Mo-Su 09:00-20:00"
        })}
      </script>
    </div>
  );
};

export default GoogleMapsEmbed;
