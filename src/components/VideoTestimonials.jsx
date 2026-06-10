import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Maximize2 } from 'lucide-react';

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef({});
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      customerName: "Rohini & Sanket",
      weddingDate: "December 2023",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Shubham captured our wedding perfectly! The traditional rituals, the emotional moments, everything was documented beautifully.",
      rating: 5,
      location: "Murbad, Maharashtra"
    },
    {
      id: 2,
      customerName: "Priya & Rahul",
      weddingDate: "November 2023",
      thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Amazing photography and videography! The team was so professional and captured every detail. Our wedding video is like a Bollywood movie!",
      rating: 5,
      location: "Kalyan, Maharashtra"
    },
    {
      id: 3,
      customerName: "Anjali & Vikram",
      weddingDate: "October 2023",
      thumbnail: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Shubham Photos Studio made our pre-wedding shoot so much fun! The outdoor locations he suggested were absolutely stunning.",
      rating: 5,
      location: "Karjat, Maharashtra"
    },
    {
      id: 4,
      customerName: "Kavita & Amit",
      weddingDate: "September 2023",
      thumbnail: "https://images.unsplash.com/photo-1519225420620-d01200d87631?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "From passport photos to our wedding album, Shubham has been our trusted photographer for years. Quality and professionalism at its best!",
      rating: 5,
      location: "Murbad, Maharashtra"
    },
    {
      id: 5,
      customerName: "Sneha & Rohan",
      weddingDate: "August 2023",
      thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "We had a destination wedding in Karjat and the team traveled with us to capture every beautiful moment. Truly outstanding work!",
      rating: 5,
      location: "Karjat, Maharashtra"
    },
    {
      id: 6,
      customerName: "Meera & Akash",
      weddingDate: "July 2023",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "The candid photos are absolutely stunning. Shubham has an eye for capturing genuine emotions. Our family loves every single shot!",
      rating: 5,
      location: "Badlapur, Maharashtra"
    },
    {
      id: 7,
      customerName: "Pooja & Nikhil",
      weddingDate: "June 2023",
      thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "We booked Shubham for our engagement and were blown away. Immediately rebooked for the wedding. Simply the best in the area!",
      rating: 5,
      location: "Ambernath, Maharashtra"
    },
    {
      id: 8,
      customerName: "Trupti & Suresh",
      weddingDate: "May 2023",
      thumbnail: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "The drone shots of our mandap ceremony gave us goosebumps! Every frame looks like it's from a film. Highly recommend Shubham Studio.",
      rating: 5,
      location: "Ulhasnagar, Maharashtra"
    },
    {
      id: 9,
      customerName: "Sarika & Deepak",
      weddingDate: "April 2023",
      thumbnail: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Our wedding album is the most treasured thing we own. The way Shubham narrated our love story through photos is truly heartwarming.",
      rating: 5,
      location: "Titwala, Maharashtra"
    },
    {
      id: 10,
      customerName: "Nisha & Gaurav",
      weddingDate: "March 2023",
      thumbnail: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Professional, punctual and incredibly talented. Shubham made us both so comfortable in front of the camera. Best decision ever!",
      rating: 5,
      location: "Bhivpuri, Maharashtra"
    },
  ];

  // Duplicate for seamless infinite loop
  const duplicated = [...testimonials, ...testimonials];

  const openVideoModal = (testimonial) => {
    setActiveVideo(testimonial);
  };

  const closeModal = () => {
    setActiveVideo(null);
    setIsPlaying({});
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeVideo) closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeVideo]);

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-600'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // Inject keyframes for infinite scroll animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .marquee-track {
        display: flex;
        width: max-content;
        animation: marquee-scroll 40s linear infinite;
      }
      .marquee-track:hover {
        animation-play-state: paused;
      }
      .marquee-track.paused {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div ref={sectionRef} className="py-12 sm:py-16 bg-brandBg overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Customer Stories
          </h2>
          <p className="text-lg text-brandTextMuted max-w-3xl mx-auto">
            Hear directly from our happy couples and business clients about their experience with us.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Slider — full bleed outside container */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10"
          style={{ background: 'linear-gradient(to right, var(--color-brandBg, #0f0f0f), transparent)' }} />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10"
          style={{ background: 'linear-gradient(to left, var(--color-brandBg, #0f0f0f), transparent)' }} />

        {/* Scrolling Track */}
        <div
          className={`marquee-track ${isPaused ? 'paused' : ''}`}
          ref={trackRef}
        >
          {duplicated.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-64 sm:w-72 mx-3 group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              onClick={() => openVideoModal(testimonial)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={testimonial.thumbnail}
                  alt={`${testimonial.customerName} wedding testimonial`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-brandAccent flex items-center justify-center shadow-lg shadow-brandAccent/40"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-5 h-5 text-black ml-1" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-medium">
                  3:45
                </div>
              </div>

              {/* Info Panel */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <h3 className="font-semibold text-white text-sm leading-tight">
                      {testimonial.customerName}
                    </h3>
                    <p className="text-xs text-brandTextMuted mt-0.5">
                      {testimonial.weddingDate} · {testimonial.location}
                    </p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>

                <p className="text-xs text-brandTextMuted line-clamp-2 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center mt-12 px-4"
      >
        <button className="inline-flex items-center px-8 py-3 rounded-full bg-brandAccent text-black font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-brandAccent/40 hover:shadow-xl transform hover:scale-105 duration-200">
          View More Testimonials
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video */}
              <div className="relative aspect-video">
                <iframe
                  src={activeVideo.videoUrl}
                  title={`${activeVideo.customerName} Wedding Testimonial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                {/* Controls bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(prev => ({ ...prev, [activeVideo.id]: !prev[activeVideo.id] }))}
                        className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        {isPlaying[activeVideo.id] ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info strip */}
              <div className="absolute top-4 left-4 right-16 text-white">
                <h3 className="text-lg font-semibold mb-0.5">{activeVideo.customerName}</h3>
                <p className="text-sm opacity-75">{activeVideo.weddingDate} · {activeVideo.location}</p>
                <div className="mt-1">
                  <StarRating rating={activeVideo.rating} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoTestimonials;