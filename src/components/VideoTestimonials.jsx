import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, MapPin, X, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      customerName: "Rohini & Sanket",
      weddingDate: "December 2023",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Shubham captured our wedding perfectly! The traditional rituals and emotional moments were documented so beautifully.",
      rating: 5,
      location: "Murbad, Maharashtra",
      duration: "3:45"
    },
    {
      id: 2,
      customerName: "Priya & Rahul",
      weddingDate: "November 2023",
      thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Amazing photography & film! The team captured every single detail. Our wedding highlight feel like a Bollywood movie!",
      rating: 5,
      location: "Kalyan, Maharashtra",
      duration: "4:20"
    },
    {
      id: 3,
      customerName: "Anjali & Vikram",
      weddingDate: "October 2023",
      thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Shubham Studio made our pre-wedding shoot so comfortable and fun! The drone shots and location recommendations were top notch.",
      rating: 5,
      location: "Karjat, Maharashtra",
      duration: "2:50"
    },
    {
      id: 4,
      customerName: "Kavita & Amit",
      weddingDate: "September 2023",
      thumbnail: "https://images.unsplash.com/photo-1519225420620-d01200d87631?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "From our engagement photos to the royal wedding film, Shubham has been our family's trusted photography studio for years.",
      rating: 5,
      location: "Murbad, Maharashtra",
      duration: "5:10"
    },
    {
      id: 5,
      customerName: "Sneha & Rohan",
      weddingDate: "August 2023",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "We had a destination wedding in Karjat and the team traveled with us to capture every priceless moment with total passion.",
      rating: 5,
      location: "Karjat, Maharashtra",
      duration: "3:15"
    },
    {
      id: 6,
      customerName: "Meera & Akash",
      weddingDate: "July 2023",
      thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "The candid portraits are breathtaking. Shubham has a rare eye for capturing raw emotion and genuine smiles.",
      rating: 5,
      location: "Badlapur, Maharashtra",
      duration: "4:05"
    },
    {
      id: 7,
      customerName: "Pooja & Nikhil",
      weddingDate: "June 2023",
      thumbnail: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "We booked Shubham for our engagement and were blown away. Rebooked immediately for our big wedding day!",
      rating: 5,
      location: "Ambernath, Maharashtra",
      duration: "3:30"
    },
    {
      id: 8,
      customerName: "Trupti & Suresh",
      weddingDate: "May 2023",
      thumbnail: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "The cinematic drone coverage of our mandap ceremony gave everyone goosebumps. Exceptional professionalism!",
      rating: 5,
      location: "Ulhasnagar, Maharashtra",
      duration: "4:45"
    },
    {
      id: 9,
      customerName: "Sarika & Deepak",
      weddingDate: "April 2023",
      thumbnail: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Our wedding album is our most prized possession. The way Shubham narrated our love story through photos is heartwarming.",
      rating: 5,
      location: "Titwala, Maharashtra",
      duration: "3:55"
    },
    {
      id: 10,
      customerName: "Nisha & Gaurav",
      weddingDate: "March 2023",
      thumbnail: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      quote: "Punctual, super talented, and creative. Shubham made us feel completely relaxed in front of the lens.",
      rating: 5,
      location: "Bhivpuri, Maharashtra",
      duration: "2:40"
    },
  ];

  // Duplicated list for infinite seamless marquee loop
  const duplicated = [...testimonials, ...testimonials];

  const closeModal = () => setActiveVideo(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeVideo) closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeVideo]);

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5 text-amber-500">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-[#F2EDE4] overflow-hidden relative border-t border-[#E0D7CC]/60">
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A67C6B]">
            Client Stories & Reviews
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A3E37] font-normal leading-tight">
            Loved by Couples & Families
          </h2>
          <p className="text-sm sm:text-base text-[#88796E] font-light leading-relaxed">
            Hear directly from our happy couples and business clients about their experience with Shubham Studio.
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Slider */}
      <div className="relative w-full">
        {/* Left Gradient Fade */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-10"
          style={{ background: 'linear-gradient(to right, #F2EDE4 0%, rgba(242,237,228,0) 100%)' }} 
        />

        {/* Right Gradient Fade */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-10"
          style={{ background: 'linear-gradient(to left, #F2EDE4 0%, rgba(242,237,228,0) 100%)' }} 
        />

        {/* Marquee Track */}
        <div
          className={`marquee-track flex gap-6 ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicated.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              onClick={() => setActiveVideo(testimonial)}
              className="group flex-shrink-0 w-72 sm:w-80 bg-white border border-[#E0D7CC]/80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#221C19]">
                <img
                  src={testimonial.thumbnail}
                  alt={`${testimonial.customerName} wedding film`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#4A3E37]/90 text-white border border-white/30 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:bg-[#A67C6B] group-hover:scale-110 transition-all duration-300">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Video Duration Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full tracking-wider">
                  {testimonial.duration}
                </div>
              </div>

              {/* Info & Review Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-base font-medium text-[#4A3E37] group-hover:text-[#A67C6B] transition-colors leading-tight">
                      {testimonial.customerName}
                    </h3>
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#88796E] font-light mt-1">
                    <MapPin className="w-3 h-3 text-[#A67C6B]" />
                    <span>{testimonial.location}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial.weddingDate}</span>
                  </div>
                </div>

                <p className="text-xs text-[#88796E] italic font-light leading-relaxed pt-3 border-t border-[#E0D7CC]/60 line-clamp-2">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mt-12 px-6"
      >
        <Link
          to="/gallery"
          className="px-8 py-3.5 bg-[#4A3E37] text-white hover:bg-[#A67C6B] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 rounded-none"
        >
          Explore Full Portfolio & Films
        </Link>
      </motion.div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-[#181412] text-white rounded-xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#221C19]">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#F2EDE4]">
                    {activeVideo.customerName}
                  </h3>
                  <p className="text-xs text-[#B8ABA0] font-light">
                    {activeVideo.weddingDate} · {activeVideo.location}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video iFrame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={activeVideo.videoUrl}
                  title={`${activeVideo.customerName} Wedding Film`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Review Quote Banner */}
              <div className="p-4 sm:p-5 bg-[#221C19] border-t border-white/10 flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#D4A594] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-[#F2EDE4] italic font-light leading-relaxed">
                    "{activeVideo.quote}"
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating rating={activeVideo.rating} />
                    <span className="text-[11px] text-[#B8ABA0] font-medium">5.0 Star Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonials;