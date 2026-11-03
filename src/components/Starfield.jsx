import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Starfield = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    // Only run the starfield animation in dark mode
    if (!isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse positions tracking
    const mouse = { x: null, y: null, radius: 120 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Generate stars with snap-back coordinates (Optimized for 60fps)
    const numStars = Math.min(65, Math.floor((width * height) / 25000));
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      stars.push({
        x: x,
        y: y,
        origX: x,
        origY: y,
        radius: Math.random() * 0.65 + 0.1,
        alpha: Math.random() * 0.4 + 0.05,
        twinkleSpeed: 0.002 + Math.random() * 0.006,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const newNumStars = Math.min(65, Math.floor((width * height) / 25000));
      stars.length = 0;
      for (let i = 0; i < newNumStars; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        stars.push({
          x: x,
          y: y,
          origX: x,
          origY: y,
          radius: Math.random() * 0.65 + 0.1,
          alpha: Math.random() * 0.4 + 0.05,
          twinkleSpeed: 0.002 + Math.random() * 0.006,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    window.addEventListener('resize', resize);

    // Detect active scrolling to pause heavy constellation lines during scroll
    let isScrolling = false;
    let scrollTimeout;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and position stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Mouse push interaction physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            star.x += (dx / dist) * force * 2;
            star.y += (dy / dist) * force * 2;
          }
        }

        // Snap back to home position slowly
        star.x += (star.origX - star.x) * 0.05;
        star.y += (star.origY - star.y) * 0.05;

        // Twinkle logic
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 0.4) {
          star.alpha = 0.4;
          star.twinkleDir = -1;
        } else if (star.alpha <= 0.05) {
          star.alpha = 0.05;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 225, 235, ${star.alpha})`;
        ctx.fill();
      }

      // Draw constellation connection links only when not scrolling for max FPS
      if (!isScrolling) {
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            if (Math.abs(dx) > 55) continue;
            const dy = stars[i].y - stars[j].y;
            if (Math.abs(dy) > 55) continue;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 65) {
              let alpha = ((65 - dist) / 65) * 0.05;

              // Highlight connections near cursor
              if (mouse.x !== null && mouse.y !== null) {
                const mDx = (stars[i].x + stars[j].x) / 2 - mouse.x;
                const mDy = (stars[i].y + stars[j].y) / 2 - mouse.y;
                const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
                if (mDist < mouse.radius) {
                  alpha += ((mouse.radius - mDist) / mouse.radius) * 0.09;
                }
              }

              if (alpha > 0) {
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.strokeStyle = `rgba(255, 122, 24, ${alpha})`;
                ctx.lineWidth = 0.4;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-transparent"
    />
  );
};

export default Starfield;
