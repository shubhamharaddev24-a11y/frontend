import React, { useMemo } from "react";

const FireworkSparks = ({ color }) => {
  const sparks = useMemo(() => {
    // Vibrant firework colors
    const fireworkColors = [
      "#ff7a18", // Brand orange accent
      "#3b82f6", // SEO blue
      "#10b981", // Media green
      "#a855f7", // Design purple
      "#ec4899", // Cyber pink
      "#f59e0b", // Amber
      "#ef4444", // Red
      "#06b6d4", // Cyan
      "#ffffff"  // White flash
    ];
    
    return Array.from({ length: 16 }).map((_, i) => {
      // Distribute sparks in a circle with a small random deviation
      const angle = (i / 16) * 2 * Math.PI + (Math.random() * 0.15 - 0.075);
      const distance = 80 + Math.random() * 90;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const sparkColor = color || fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
      const delay = Math.random() * 0.12;
      const size = 3 + Math.random() * 5;
      return { id: i, tx, ty, color: sparkColor, delay, size };
    });
  }, [color]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-30">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full spark-particle"
          style={{
            backgroundColor: s.color,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--tx": `${s.tx}px`,
            "--ty": `${s.ty}px`,
            "--delay": `${s.delay}s`,
            "--spark-color": s.color,
          }}
        />
      ))}
    </div>
  );
};

export default FireworkSparks;
