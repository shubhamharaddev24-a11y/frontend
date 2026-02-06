import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const VisitUs = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-orange-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <div className="h-1 w-32 bg-orange-400 rounded"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mx-6">
              Visit Us Today!
            </h2>
            <div className="h-1 w-32 bg-orange-400 rounded"></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Store Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=700&auto=format&fit=crop&q=80"
              alt="Store Front"
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Contact Information Cards */}
          <div className="space-y-5">
            {/* Location Card */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-full shadow-md flex-shrink-0">
                  <MapPin className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-900 mb-1">
                    Located in [Your City]
                  </h3>
                  <p className="text-amber-700 font-medium">
                    Easy to Find Location
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-full shadow-md flex-shrink-0">
                  <Phone className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-900 mb-1">
                    Call: 9876543210
                  </h3>
                  <p className="text-amber-700 font-medium">
                    Or WhatsApp Us Anytime
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 p-3 rounded-full shadow-md flex-shrink-0">
                  <Clock className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">
                    Open Hours
                  </h3>
                  <p className="text-amber-700 font-medium">
                    Mon-Sat: (9 AM - 3 PM,
                  </p>
                  <p className="text-amber-700 font-medium">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 text-center lg:text-left">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3">
                Get in Touch
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Footer Design */}
      <div className="mt-16">
        <svg 
          className="w-full h-32" 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z" 
            fill="#fed7aa"
            opacity="0.6"
          />
          <path 
            d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z" 
            fill="#fdba74"
          />
        </svg>
      </div>
    </section>
  );
};

export default VisitUs;