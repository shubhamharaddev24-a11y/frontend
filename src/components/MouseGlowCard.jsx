import React, { useRef } from "react";

const MouseGlowCard = ({ children, className = "", style = {}, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`mouse-glow-card ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default MouseGlowCard;
