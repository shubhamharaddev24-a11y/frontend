import React from 'react';
import { Phone } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2.5 rounded-lg shadow-lg">
            <svg 
              className="w-7 h-7 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
              <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12z"/>
            </svg>
          </div>
          <span className="text-white text-3xl font-bold italic tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Sharma
          </span>
        </div>

        {/* Tagline */}
        <div className="hidden md:block text-white text-sm font-medium tracking-wide">
          - Your Trusted Photo & Digital Service Center
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            Call Now
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
            <Phone size={18} />
            <span>Whatsapp Us</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;