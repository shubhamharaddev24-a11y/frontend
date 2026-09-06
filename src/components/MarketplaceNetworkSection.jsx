import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users2, 
  Camera, 
  Film, 
  Palette, 
  Code2, 
  TrendingUp, 
  ShieldCheck, 
  ArrowDown, 
  ArrowUpRight, 
  Sparkles,
  CheckCircle2,
  Lock,
  Layers
} from "lucide-react";

const talentRoles = [
  {
    id: "photo",
    title: "Photographer & Drone Pilot",
    icon: Camera,
    color: "#D4A373",
    description: "4K Sony Cinema & aerial drone coverage for weddings and events",
    badge: "Cinema Tier"
  },
  {
    id: "edit",
    title: "Video Editor & Colorist",
    icon: Film,
    color: "#A67C6B",
    description: "ProRes 4K trailers, wedding reels & DaVinci Resolve color suites",
    badge: "DaVinci 19"
  },
  {
    id: "design",
    title: "Graphic & Brand Designer",
    icon: Palette,
    color: "#E0A96D",
    description: "Marathi Lagna-Patrika, corporate identities & campaign flex designs",
    badge: "Vector & Print"
  },
  {
    id: "dev",
    title: "Full-Stack Web Developer",
    icon: Code2,
    color: "#60A5FA",
    description: "High-converting MERN websites & digital RSVP portals",
    badge: "React 19"
  },
  {
    id: "market",
    title: "SEO & Digital Marketer",
    icon: TrendingUp,
    color: "#34D399",
    description: "Google Business #1 map ranking & viral social growth",
    badge: "Search Rank"
  }
];

const MarketplaceNetworkSection = () => {
  const reduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState("photo");

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-14 bg-[#0B0A09] text-[#F2EDE4] overflow-hidden border-t border-white/10">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#A67C6B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181412] border border-[#A67C6B]/30 text-xs font-mono text-[#D4A373]">
            <Sparkles size={12} />
            <span>CONNECT — The Creator Marketplace Flow</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
            Autonomous Milestone Escrow <br className="hidden sm:inline" />
            <span className="font-sans font-extrabold bg-gradient-to-r from-white via-[#F2EDE4] to-[#A67C6B] bg-clip-text text-transparent">
              Connecting Clients & Creators
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#B8ABA0] font-light max-w-xl mx-auto leading-relaxed">
            A regional exchange where clients submit custom briefs and verified creators deliver with guaranteed milestone protection.
          </p>
        </div>

        {/* =================================================================== */}
        {/* DYNAMIC CONNECTION ARCHITECTURE: CLIENT → CREAONNECT → TALENT       */}
        {/* =================================================================== */}
        <div className="flex flex-col items-center space-y-4">
          
          {/* NODE 1: THE CLIENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md rounded-2xl bg-[#14110F] border border-white/15 p-4 sm:p-5 shadow-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A67C6B]">
                  Origin
                </span>
                <h4 className="font-sans font-bold text-base text-white">Client / Business</h4>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              ● Submits Brief
            </span>
          </motion.div>

          {/* Animated Connecting Line 1 */}
          <div className="flex flex-col items-center my-1">
            <div className="w-[2px] h-8 bg-gradient-to-b from-amber-400 to-[#A67C6B] animate-pulse" />
            <ArrowDown size={14} className="text-[#A67C6B] -mt-1" />
          </div>

          {/* NODE 2: CREAONNECT CORE HUB */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#1E1815] to-[#120F0D] border border-[#A67C6B]/40 p-5 sm:p-6 shadow-2xl text-center space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A67C6B]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#A67C6B] text-white flex items-center justify-center shadow-md">
                <Layers size={16} />
              </div>
              <h3 className="font-sans font-black text-xl text-white tracking-wide">
                CREAONNECT
              </h3>
            </div>
            <p className="text-xs text-[#B8ABA0]">
              Automated Job Dispatch • Milestone Escrow Vault • Quality Assurance
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12} /> 100% Escrow Protection
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D4A373] bg-[#D4A373]/10 px-3 py-1 rounded-full border border-[#D4A373]/20">
                <CheckCircle2 size={12} /> Vetted Milestone Payouts
              </span>
            </div>
          </motion.div>

          {/* Animated Connecting Line 2 */}
          <div className="flex flex-col items-center my-1">
            <div className="w-[2px] h-8 bg-gradient-to-b from-[#A67C6B] to-blue-400 animate-pulse" />
            <ArrowDown size={14} className="text-blue-400 -mt-1" />
          </div>

          {/* NODE 3: MULTI-TALENT VERIFIED NODES */}
          <div className="w-full pt-2">
            <p className="text-center text-xs font-mono uppercase tracking-wider text-[#8C7A70] mb-4">
              Dispatches directly to verified regional specialists:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {talentRoles.map((role) => {
                const IconComponent = role.icon;
                const isSelected = activeRole === role.id;
                return (
                  <motion.div
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    whileHover={{ y: -4 }}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between border ${
                      isSelected
                        ? "bg-[#181412] border-[#A67C6B] shadow-xl shadow-[#A67C6B]/15"
                        : "bg-[#120F0D]/70 hover:bg-[#151210] border-white/10"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-inner"
                          style={{ backgroundColor: `${role.color}20`, color: role.color }}
                        >
                          <IconComponent size={18} />
                        </div>
                        <span className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                          {role.badge}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-white">
                        {role.title}
                      </h4>
                      <p className="text-[11px] text-[#B8ABA0] font-light leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-400">Verified</span>
                      <span className="text-[#A67C6B] font-semibold">Active Tier</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dual CTA Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="rounded-2xl bg-[#14110F] border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-[#A67C6B] uppercase">For Couples & Businesses</span>
              <h3 className="font-serif text-xl sm:text-2xl text-white">Need Creative or Tech Services?</h3>
              <p className="text-xs sm:text-sm text-[#B8ABA0] font-light">
                Submit your wedding cinematic film brief, web application roadmap, or design request.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#A67C6B] hover:bg-[#926959] text-white font-medium text-xs transition-all shadow-md"
            >
              <span>Submit Project Brief</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="rounded-2xl bg-[#14110F] border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-blue-400 uppercase">For Creators & Freelancers</span>
              <h3 className="font-serif text-xl sm:text-2xl text-white">Join the Regional Creator Network</h3>
              <p className="text-xs sm:text-sm text-[#B8ABA0] font-light">
                Are you a photographer, editor, designer, or developer? Pre-register for early access with 0% platform commission.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-all"
            >
              <span>Pre-Register as Creator (Early Tier)</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MarketplaceNetworkSection;
