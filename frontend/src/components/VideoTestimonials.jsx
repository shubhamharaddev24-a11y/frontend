import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Maximize2 } from 'lucide-react';

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef({});
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const testimonials = [
    {
      id: 1,
      customerName: "Rohini & Sanket",
      weddingDate: "December 2023",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Shubham captured our wedding perfectly! The traditional rituals, the emotional moments, everything was documented beautifully. We still look at our photos and relive the magic.",
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
    }
  ];

  const handlePlayPause = (videoId) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      if (isPlaying[videoId]) {
        videoElement.pause();
        setIsPlaying(prev => ({ ...prev, [videoId]: false }));
      } else {
        videoElement.play();
        setIsPlaying(prev => ({ ...prev, [videoId]: true }));
      }
    }
  };

  const openVideoModal = (testimonial) => {
    setActiveVideo(testimonial);
  };

  const closeModal = () => {
    // Pause all videos when closing modal
    Object.keys(videoRefs.current).forEach(key => {
      const video = videoRefs.current[key];
      if (video && !video.paused) {
        video.pause();
      }
    });
    setActiveVideo(null);
    setIsPlaying({});
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeVideo) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeVideo]);

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-600'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div ref={sectionRef} className="py-12 sm:py-16 bg-brandBg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            Hear directly from our happy couples about their experience with Shubham Photos Studio
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:shadow-brandAccent/10 transition-all duration-300 border border-brandBorder/50"
              onClick={() => openVideoModal(testimonial)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={testimonial.thumbnail}
                  alt={`${testimonial.customerName} wedding testimonial`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Play Button Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-brandAccent flex items-center justify-center shadow-lg shadow-brandAccent/40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-6 h-6 text-black ml-1" />
                  </motion.div>
                </motion.div>

                {/* Video Duration Badge */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  3:45
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 bg-brandSurface border-t border-brandBorder/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      {testimonial.customerName}
                    </h3>
                    <p className="text-xs text-brandTextMuted">
                      {testimonial.weddingDate} • {testimonial.location}
                    </p>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
                
                <p className="text-sm text-brandTextMuted line-clamp-2">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-brandAccent/5 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center px-8 py-3 rounded-full bg-brandAccent text-black font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-brandAccent/40 hover:shadow-xl transform hover:scale-105 duration-200">
            View More Testimonials
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>

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
              className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden border border-brandBorder/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video Container */}
              <div className="relative aspect-video">
                <iframe
                  src={activeVideo.videoUrl}
                  title={`${activeVideo.customerName} Wedding Testimonial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                
                {/* Custom Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause Button */}
                      <button
                        onClick={() => handlePlayPause(activeVideo.id)}
                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        {isPlaying[activeVideo.id] ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                      
                      {/* Volume Control */}
                      <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Fullscreen Button */}
                    <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info Overlay */}
              <div className="absolute top-4 left-4 right-16 text-white">
                <h3 className="text-lg font-semibold mb-1">{activeVideo.customerName}</h3>
                <p className="text-sm opacity-80">{activeVideo.weddingDate} • {activeVideo.location}</p>
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