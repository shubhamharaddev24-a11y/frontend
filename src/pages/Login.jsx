import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Briefcase, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { authService } from "../services";

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeParam = searchParams.get("mode");

  const [isRegister, setIsRegister] = useState(modeParam ? true : false);
  const [role, setRole] = useState(modeParam === "client" ? "client" : "freelancer"); // "freelancer" or "client"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai / Thane");
  const [skills, setSkills] = useState("Pre-Wedding, Cinematography");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (modeParam === "client") {
      setIsRegister(true);
      setRole("client");
    } else if (modeParam === "freelancer" || modeParam === "creator") {
      setIsRegister(true);
      setRole("freelancer");
    }
  }, [modeParam]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let data;
      if (isRegister) {
        if (!name || !email || !password || !phone) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }

        const skillArray = skills
          ? skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [];

        data = await authService.register({
          name,
          email,
          password,
          role,
          phone,
          city,
          skills: skillArray,
        });
      } else {
        if (!email || !password) {
          setError("Please enter your email and password.");
          setLoading(false);
          return;
        }
        data = await authService.login({ email, password });
      }

      if (data?.data?.token && data?.data?.user) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        if (data.data.user.role === "admin") {
          navigate("/dashboard?mode=admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid response received from server.");
      }
    } catch (err) {
      console.error(err);
      const apiErrors = err.response?.data?.errors;
      const apiMsg = err.response?.data?.message;
      const displayMsg = (Array.isArray(apiErrors) && apiErrors.length > 0)
        ? apiErrors.map((e) => e.msg).join(". ")
        : (apiMsg || "Authentication failed. Please check your credentials.");
      setError(displayMsg);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex min-h-screen items-center justify-center bg-brandBg px-4 py-24 text-brandTextPrimary sm:pt-28">
      <motion.div
        className="w-full max-w-lg space-y-6 rounded-3xl border border-brandBorder bg-brandSurface/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Header Title & Switch */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brandAccent/30 bg-brandAccent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brandAccent">
            <Sparkles size={13} />
            <span>Marketplace & Creative Portal</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-brandTextPrimary sm:text-3xl">
            {isRegister ? "Join CREAONNECT" : "Welcome Back"}
          </h1>
          <p className="text-xs text-brandTextMuted sm:text-sm">
            {isRegister
              ? "Start taking photoshoot orders or post gigs for top creators"
              : "Log in to access your gigs board, client orders, and earnings"}
          </p>

          {/* Toggle Tab Button */}
          <div className="mt-4 flex rounded-full bg-brandSurfaceSoft/60 p-1 border border-brandBorder/60">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(""); }}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all ${
                !isRegister
                  ? "bg-brandAccent text-black shadow-md"
                  : "text-brandTextSecondary hover:text-brandTextPrimary"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(""); }}
              className={`flex-1 rounded-full py-2 text-xs font-semibold transition-all ${
                isRegister
                  ? "bg-brandAccent text-black shadow-md"
                  : "text-brandTextSecondary hover:text-brandTextPrimary"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium text-red-400"
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-4" onSubmit={handleAuth}>
          {/* Role selection if Registering */}
          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <label className="block text-xs font-semibold uppercase tracking-wider text-brandTextSecondary">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("freelancer")}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition-all ${
                      role === "freelancer"
                        ? "border-brandAccent bg-brandAccent/10 text-brandAccent shadow-sm"
                        : "border-brandBorder bg-brandSurfaceSoft/40 text-brandTextSecondary hover:border-brandAccent/40"
                    }`}
                  >
                    <Camera size={22} />
                    <div>
                      <div className="text-xs font-bold text-brandTextPrimary">Photographer / Studio</div>
                      <div className="text-[10px] text-brandTextMuted">Manage Shoots & Gigs</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("client")}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition-all ${
                      role === "client"
                        ? "border-brandAccent bg-brandAccent/10 text-brandAccent shadow-sm"
                        : "border-brandBorder bg-brandSurfaceSoft/40 text-brandTextSecondary hover:border-brandAccent/40"
                    }`}
                  >
                    <Briefcase size={22} />
                    <div>
                      <div className="text-xs font-bold text-brandTextPrimary">Book Photoshoot</div>
                      <div className="text-[10px] text-brandTextMuted">Weddings, Pre-Wedding & Events</div>
                    </div>
                  </button>
                </div>

                {/* Name */}
                <div className="coolinput w-full">
                  <label className="text" htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Aakash Verma"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isRegister}
                  />
                </div>

                {/* Phone */}
                <div className="coolinput w-full">
                  <label className="text" htmlFor="phone">Phone / WhatsApp Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={isRegister}
                  />
                </div>

                {role === "freelancer" && (
                  <div className="coolinput w-full">
                    <label className="text" htmlFor="skills">Photography Specialties (comma separated)</label>
                    <input
                      id="skills"
                      type="text"
                      placeholder="Pre-Wedding, Wedding, Drone, Portrait"
                      className="input"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Address */}
          <div className="coolinput w-full">
            <label className="text" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@creaonnect.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="coolinput w-full">
            <label className="text" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegister && (
              <p className="mt-1 text-[11px] text-brandTextMuted">
                Must be at least 6 characters.
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <motion.button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#76B900] py-3 text-sm font-extrabold text-black shadow-lg shadow-[#76B900]/25 hover:bg-[#68A500] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileTap={{ scale: 0.98 }}
          >
            <span>
              {loading
                ? "Processing..."
                : isRegister
                ? `Create ${role === "freelancer" ? "Creator" : "Client"} Account`
                : "Sign In to Dashboard"}
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </form>


      </motion.div>
    </div>
  );
};

export default Login;
