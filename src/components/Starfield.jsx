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

    // Generate stars
    const numStars = Math.floor((width * height) / 9000); // Sturdy density, not too cluttered
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.65 + 0.1, // Even smaller, more delicate star points
        alpha: Math.random() * 0.4 + 0.05, // Lower initial opacity for subtler presence
        twinkleSpeed: 0.002 + Math.random() * 0.006,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a very soft, high-end warm radial gradient representing far-away stellar dust/nebula
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 4,
        0,
        width / 2,
        height / 4,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(255, 122, 24, 0.025)'); // Subtle warm orange glow to match brand accents
      grad.addColorStop(0.5, 'rgba(15, 15, 17, 0)');
      grad.addColorStop(1, 'rgba(7, 7, 8, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw all stars with twinkling values
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        // Twinkling logic (capped at 0.4 max opacity for a dim, distant background look)
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
        ctx.fillStyle = `rgba(220, 225, 235, ${star.alpha})`; // Soft grayish-white for lower brightness
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-transparent"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Starfield;
