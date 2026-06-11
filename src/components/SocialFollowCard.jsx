import React from "react";
import { Instagram, Youtube, MessageSquare } from "lucide-react";

const SocialFollowCard = () => {
  return (
    <div className="shutter-card select-none">
      {/* Background soft glow outline */}
      <div className="boxshadow" />

      {/* Main card body with shutter aperture overlays */}
      <div className="main-shutter">
        {/* Shutter parts */}
        <div className="top-shutter" />
        <div className="side-shutter left-shutter" />
        <div className="side-shutter right-shutter" />

        {/* Revealed center title */}
        <div className="shutter-title font-black text-brandAccent text-center">
          CONNECT
        </div>

        {/* Revealed social media links */}
        <div className="shutter-buttons">
          <a
            href="https://instagram.com/shubhampotdar_"
            target="_blank"
            rel="noopener noreferrer"
            className="shutter-btn instagram"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shutter-btn youtube"
            aria-label="Subscribe to our YouTube channel"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://wa.me/919271456749"
            target="_blank"
            rel="noopener noreferrer"
            className="shutter-btn whatsapp"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageSquare size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialFollowCard;
