import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PhotoCounter = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Motion values for counters
  const customers = useMotionValue(0);
  const weddings = useMotionValue(0);
  const years = useMotionValue(0);

  // Spring animations
  const customersCount = useSpring(customers, { stiffness: 100, damping: 30 });
  const weddingsCount = useSpring(weddings, { stiffness: 100, damping: 30 });
  const yearsCount = useSpring(years, { stiffness: 100, damping: 30 });

  // Transform values for display
  const displayCustomers = useTransform(customersCount, latest => Math.round(latest));
  const displayWeddings = useTransform(weddingsCount, latest => Math.round(latest));
  const displayYears = useTransform(yearsCount, latest => Math.round(latest));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Animate counters with staggered timing
      const timer1 = setTimeout(() => {
        customers.set(10000);
      }, 200);
      
      const timer2 = setTimeout(() => {
        weddings.set(500);
      }, 600);
      
      const timer3 = setTimeout(() => {
        years.set(13);
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInView, hasAnimated, customers, weddings, years]);

  const stats = [
    {
      value: displayCustomers,
      suffix: "+",
      label: "Happy Customers",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM9 11a5 5 0 00-5 5v1h10v-1a5 5 0 00-5-5z" />
        </svg>
      ),
      color: "text-amber-400",
      bgColor: "bg-white/5 backdrop-blur-md",
      borderColor: "border-white/10",
      iconBg: "bg-amber-500/20"
    },
    {
      value: displayWeddings,
      suffix: "+",
      label: "Weddings Covered",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      color: "text-rose-400",
      bgColor: "bg-white/5 backdrop-blur-md",
      borderColor: "border-white/10",
      iconBg: "bg-rose-500/20"
    },
    {
      value: displayYears,
      suffix: "+",
      label: "Years Experience",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      color: "text-emerald-400",
      bgColor: "bg-white/5 backdrop-blur-md",
      borderColor: "border-white/10",
      iconBg: "bg-emerald-500/20"
    }
  ];

  return (
    <div ref={ref} className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Our Community
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Over a decade of capturing precious memories and serving the Murbad community with professional photography and digital services.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3 max-w-5xl mx-auto">
  {stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      className={`
        relative overflow-hidden rounded-xl border p-6 text-center
        ${stat.bgColor} ${stat.borderColor}
        transition-all duration-300 hover:shadow-xl hover:shadow-white/5
        group cursor-pointer
      `}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <div className={`absolute inset-0 ${stat.color} opacity-20`} />
      </div>

      {/* Icon */}
      <motion.div 
        className={`
          inline-flex items-center justify-center w-12 h-12 rounded-full 
          ${stat.iconBg} mb-3
        `}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <div className={stat.color}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {stat.icon.props.children}
          </svg>
        </div>
      </motion.div>

      {/* Counter */}
      <div className="relative">
        <div 
          className={`
            text-3xl sm:text-4xl font-bold mb-2
            ${stat.color}
          `}
        >
          <motion.span>{stat.value}</motion.span>
          <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
        </div>
        
        {/* Animated underline */}
        <motion.div
          className={`h-0.5 w-12 mx-auto rounded-full mb-2 ${stat.color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
        />
      </div>

      {/* Label */}
      <p className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-300">
        {stat.label}
      </p>

      {/* Floating particles effect */}
      {hasAnimated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`
                absolute w-1.5 h-1.5 rounded-full
                ${stat.color} opacity-60
              `}
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 40}%`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0], 
                opacity: [0, 0.6, 0],
                y: [0, -20, -40]
              }}
              transition={{
                duration: 2,
                delay: 1.5 + index * 0.2 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  ))}
</div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 rounded-full bg-amber-500 dark:bg-amber-400 text-black font-semibold hover:bg-amber-600 dark:hover:bg-amber-500 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            Join Our Happy Customers
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoCounter;