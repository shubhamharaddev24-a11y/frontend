import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const data = await authService.login({ email, password });
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/admin");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Failed to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brandBg px-4 py-24 text-brandTextPrimary sm:pt-28">
      <motion.div
        className="w-full max-w-md space-y-6 rounded-2xl border border-brandBorder bg-brandSurface/80 p-6 shadow-xl sm:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccent">
            Admin Area
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-brandTextPrimary sm:text-3xl">
            Welcome Back
          </h1>
          <p className="text-sm text-brandTextMuted">
            Log in to manage bookings, enquiries, and assign work.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-brandTextMuted" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@shubhambackend.com"
              className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-brandTextMuted" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brandAccent py-2.5 text-sm font-semibold text-black shadow-md shadow-brandAccent/30 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
