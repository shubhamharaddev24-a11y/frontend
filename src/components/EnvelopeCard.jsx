import React from "react";
import Logo from "./Logo";

const EnvelopeCard = ({
  title,
  subtitle,
  body,
  signature = "SHUBHAM MEDIA",
  useLogoSeal = true,
  sealText = "SM"
}) => {
  return (
    <div className="envelope-container select-none">
      {/* Letter inside the envelope */}
      <div className="envelope-letter">
        <p className="text-sm font-black tracking-wide text-zinc-800 font-serif border-b border-zinc-200/60 pb-1.5 w-full text-center">
          {title}
        </p>
        <p className="text-[10px] sm:text-[11px] text-zinc-700 mt-2.5 leading-relaxed text-center px-1 flex-1 font-sans">
          {subtitle}
        </p>
        {body && (
          <p className="text-[10px] text-zinc-500 font-serif text-center mt-1.5 italic">
            {body}
          </p>
        )}
        <p className="text-[9px] text-brandAccent font-extrabold tracking-widest pt-1.5 uppercase mt-auto border-t border-zinc-200/60 w-full text-center">
          {signature}
        </p>
      </div>

      {/* Wax Seal */}
      <div className="envelope-seal">
        {useLogoSeal ? (
          <Logo className="h-7 w-7" />
        ) : (
          <span className="text-black font-black tracking-tighter text-[10px]">{sealText}</span>
        )}
      </div>

      {/* Envelope Flaps */}
      <div className="envelope-flap top" />
      <div className="envelope-flap left" />
      <div className="envelope-flap right" />
      <div className="envelope-flap bottom" />
    </div>
  );
};

export default EnvelopeCard;
