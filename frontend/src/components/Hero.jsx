import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&auto=format&fit=crop&q=80')`,
      }}
    >
      <div className="text-center px-4 z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Capture. <span className="text-orange-400">Print.</span> Create.
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 font-medium">
          One Stop Solution for All Your Photo & Digital Needs
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-bold transition-all shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105">
          Get in Touch
        </button>
      </div>

      {/* Decorative camera equipment on the right side (optional) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-80">
        <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;