import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";

const SPARK_COLORS = [
  "#FFD700", // Gold
  "#FFA500", // Orange fire
  "#FF4500", // Red fire
  "#FF3366", // Rose petal pink
  "#FFFFFF", // Pure white glint
  "#FFB6C1", // Soft rose petal
  "#D4AF37", // Metallic gold
  "#FFE4B5", // Champagne glow
];

const WeddingCrackerSparks = ({ triggerOnHover = true }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const animateRef = useRef(null);
  const hasTriggeredInitialRef = useRef(false);

  // Spawns a cracker burst at (x, y)
  const spawnBurst = useCallback((x, y, count = 45, isRosePetals = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isRosePetals ? 1.5 + Math.random() * 3.5 : 2.5 + Math.random() * 6.5;
      const size = isRosePetals ? 3 + Math.random() * 4 : 1.5 + Math.random() * 3;
      const color = isRosePetals 
        ? (Math.random() > 0.4 ? "#E11D48" : "#FB7185") // Rose petals
        : SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isRosePetals ? 0.5 : 1.5), // slight upward bias
        color,
        size,
        alpha: 1,
        decay: isRosePetals ? 0.008 + Math.random() * 0.01 : 0.015 + Math.random() * 0.02,
        gravity: isRosePetals ? 0.04 : 0.08,
        friction: 0.97,
        sparkle: Math.random() > 0.3,
        isPetal: isRosePetals,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      });
    }

    // Wake up animation frame if sleeping
    if (!animationFrameRef.current && animateRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateRef.current);
    }
  }, []);

  // Main animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const particles = particlesRef.current;

      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameRef.current = null;
        return; // Sleep loop when no particles are active
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.alpha -= p.decay;

        if (p.isPetal) {
          p.rotation += p.rotationSpeed;
        }

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.sparkle && Math.random() > 0.4 ? p.alpha * 0.6 : p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.isPetal ? 0 : 8;
        ctx.shadowColor = p.color;

        if (p.isPetal) {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Store animate function in ref so spawnBurst can wake it up
    animateRef.current = animate;

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Trigger grand cracker bursts on scroll into view
  useEffect(() => {
    if (!isInView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width || 1000;
    const height = canvas.height || 600;

    // Burst sequence: Left card (flower shower), Center, Right card
    const timeouts = [];

    // Burst 1: Over left card (rose petals + golden crackers)
    timeouts.push(setTimeout(() => {
      spawnBurst(width * 0.2, height * 0.35, 55, true); // Rose petals
      spawnBurst(width * 0.2, height * 0.35, 45, false); // Golden cracker sparks
    }, 150));

    // Burst 2: Over middle card
    timeouts.push(setTimeout(() => {
      spawnBurst(width * 0.5, height * 0.28, 50, false);
      spawnBurst(width * 0.5, height * 0.28, 30, true);
    }, 450));

    // Burst 3: Over right card
    timeouts.push(setTimeout(() => {
      spawnBurst(width * 0.8, height * 0.35, 45, false);
      spawnBurst(width * 0.8, height * 0.35, 35, true);
    }, 800));

    // Subsequent ambient celebratory sparkles every 3 seconds while in view
    const interval = setInterval(() => {
      const rx = width * (0.15 + Math.random() * 0.7);
      const ry = height * (0.2 + Math.random() * 0.5);
      const isPetals = Math.random() > 0.5;
      spawnBurst(rx, ry, 25, isPetals);
    }, 3200);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView, spawnBurst]);

  // Interactive mouse click or hover creates sparkler burst at cursor
  const handleMouseMove = (e) => {
    if (!triggerOnHover || Math.random() > 0.25) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnBurst(x, y, 6, Math.random() > 0.5);
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnBurst(x, y, 40, false);
    spawnBurst(x, y, 30, true);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
};

export default WeddingCrackerSparks;
