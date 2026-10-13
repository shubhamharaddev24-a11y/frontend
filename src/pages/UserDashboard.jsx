import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  Camera,
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageCircle,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Sparkles,
  Settings,
  CreditCard,
  UserCheck,
  HelpCircle,
  ArrowUpRight,
  Filter,
  Eye,
  X,
  Menu
} from "lucide-react";
import { bookingService, authService } from "../services";
import ThemeToggle from "../components/ThemeToggle";

// Helper component for live real-time countdown timer (Clean Modern Light Theme)
const OrderCountdown = ({ expiresAt, onExpired }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        if (onExpired) onExpired();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (timeLeft.isExpired) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600 border border-rose-200">
        <Clock size={11} />
        <span>Expired</span>
      </span>
    );
  }

  const isUrgent = timeLeft.hours < 6;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold font-mono tracking-tight transition-colors ${
        isUrgent
          ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
      }`}
    >
      <Clock size={11} className={isUrgent ? "text-amber-600" : "text-indigo-600"} />
      <span>
        {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m left
      </span>
    </span>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard"); // dashboard, marketplace, post-order, my-gigs, my-orders, earnings, settings
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Data states
  const [availableOrders, setAvailableOrders] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Claim modal state
  const [selectedOrderToClaim, setSelectedOrderToClaim] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimedOrderDetails, setClaimedOrderDetails] = useState(null);

  // Photographer Claimed Orders
  const [myClaimedOrders, setMyClaimedOrders] = useState([]);
  const [freelancerStats, setFreelancerStats] = useState({ totalClaimed: 0, completedCount: 0, totalEarnings: 0 });

  // Client Posted Orders
  const [myClientOrders, setMyClientOrders] = useState([]);

  // Post Order Form State
  const [postFormData, setPostFormData] = useState({
    title: "",
    eventType: "pre-wedding",
    eventDate: "",
    eventLocation: "",
    eventDuration: "Full Day",
    guestCount: 2,
    budget: 15000,
    expiryHours: 24,
    message: ""
  });
  const [postingOrder, setPostingOrder] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // Load Dashboard Data
  const loadDashboardData = async () => {
    setRefreshing(true);
    setError("");
    try {
      const marketRes = await bookingService.getAvailableOrders({
        eventType: filterCategory !== "all" ? filterCategory : undefined,
        search: searchQuery || undefined
      });
      setAvailableOrders(marketRes?.data || []);

      const claimedRes = await bookingService.getMyFreelancerOrders();
      setMyClaimedOrders(claimedRes?.data?.orders || []);
      if (claimedRes?.data?.stats) {
        setFreelancerStats(claimedRes.data.stats);
      }

      const clientRes = await bookingService.getMyClientOrders();
      setMyClientOrders(clientRes?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load marketplace data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, filterCategory]);

  // Handle Claim
  const handleConfirmClaim = async () => {
    if (!selectedOrderToClaim) return;
    setClaiming(true);
    setError("");

    try {
      const res = await bookingService.claimOrder(selectedOrderToClaim._id);
      setClaimedOrderDetails(res?.data);
      setSuccessMsg(`Congratulations! You claimed "${selectedOrderToClaim.title}". Client details unlocked!`);
      setSelectedOrderToClaim(null);
      loadDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to claim order. It might already be claimed or expired.");
    } finally {
      setClaiming(false);
    }
  };

  // Handle Complete
  const handleCompleteOrder = async (orderId) => {
    try {
      await bookingService.completeOrder(orderId);
      setSuccessMsg("Order marked completed! Payout credited to your earnings.");
      loadDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to complete order.");
    }
  };

  // Handle Post Order
  const handlePostOrderSubmit = async (e) => {
    e.preventDefault();
    setPostingOrder(true);
    setError("");

    if (!postFormData.title || !postFormData.eventDate || !postFormData.eventLocation || !postFormData.budget) {
      setError("Please fill in all required fields.");
      setPostingOrder(false);
      return;
    }

    try {
      await bookingService.postMarketplaceOrder({
        ...postFormData,
        customerName: user?.name,
        customerEmail: user?.email,
        customerPhone: user?.phone || "+91 99999 99999"
      });

      setSuccessMsg("Order published to the marketplace! Verified photographers can now claim it.");
      setPostFormData({
        title: "",
        eventType: "pre-wedding",
        eventDate: "",
        eventLocation: "",
        eventDuration: "Full Day",
        guestCount: 2,
        budget: 15000,
        expiryHours: 24,
        message: ""
      });
      setShowPostModal(false);
      setActiveMenu("my-orders");
      loadDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to publish order.");
    } finally {
      setPostingOrder(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Calculated values
  const totalUserEarnings = (user?.totalEarnings || 0) + (freelancerStats.totalEarnings || 0);
  const budgetNum = Number(postFormData.budget) || 0;
  const platformFeeCalc = Math.round(budgetNum * 0.10);
  const creatorPayoutCalc = budgetNum - platformFeeCalc;

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-[#0C0A09] text-[#1E293B] dark:text-[#E2E8F0] flex font-sans antialiased">

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR (CLEAN WHITE LIKE REFERENCE IMAGE) */}
      {/* ========================================================================= */}
      <aside className={`w-64 bg-white dark:bg-[#12100E] border-r border-[#E2E8F0] dark:border-[#262626] shrink-0 flex flex-col justify-between z-40 transition-transform duration-300 md:translate-x-0 sticky top-0 h-screen ${
        mobileSidebarOpen ? "fixed inset-y-0 left-0 translate-x-0 flex shadow-2xl" : "hidden md:flex"
      }`}>
        <div>
          {/* Brand Logo header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#F1F5F9] dark:border-[#262626]">
            <Link to="/" className="flex items-center gap-3 !no-underline group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#76B900]/20 via-[#76B900]/10 to-transparent border border-[#76B900]/50 shadow-sm text-[#76B900] group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 36 36" className="w-5 h-5 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11.5" cy="12.5" r="4" stroke="#76B900" strokeWidth="2.2" />
                  <circle cx="11.5" cy="12.5" r="1.5" fill="#76B900" stroke="none" />
                  <circle cx="24.5" cy="12.5" r="4" stroke="#76B900" strokeWidth="2.2" />
                  <circle cx="24.5" cy="12.5" r="1.5" fill="#76B900" stroke="none" />
                  <circle cx="18" cy="24.5" r="4" stroke="#76B900" strokeWidth="2.2" />
                  <circle cx="18" cy="24.5" r="1.5" fill="#76B900" stroke="none" />
                  <line x1="15.5" y1="12.5" x2="20.5" y2="12.5" stroke="#76B900" strokeWidth="1.8" strokeDasharray="1.5 1.5" />
                  <line x1="13.5" y1="16" x2="16" y2="21" stroke="#76B900" strokeWidth="1.8" />
                  <line x1="22.5" y1="16" x2="20" y2="21" stroke="#76B900" strokeWidth="1.8" />
                </svg>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-extrabold text-base tracking-tight text-black dark:text-white">CREAONNECT</span>
                <span className="block text-[10px] uppercase tracking-wider text-[#76B900] font-bold">Creator Hub</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-[#94A3B8] hover:text-black dark:hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Section: MENU */}
          <div className="px-4 py-6 space-y-6">
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                MENU
              </p>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveMenu("dashboard")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMenu === "dashboard"
                      ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                      : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                  }`}
                >
                  <LayoutDashboard size={16} className={activeMenu === "dashboard" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("marketplace")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMenu === "marketplace"
                      ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                      : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={16} className={activeMenu === "marketplace" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                    <span>Live Gig Orders</span>
                  </div>
                  {availableOrders.length > 0 && (
                    <span className="h-5 min-w-[20px] px-1 rounded-full bg-[#76B900] text-black text-[10px] font-extrabold flex items-center justify-center">
                      {availableOrders.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("my-gigs")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMenu === "my-gigs"
                      ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                      : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                  }`}
                >
                  <Camera size={16} className={activeMenu === "my-gigs" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                  <span>My Claimed Gigs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveMenu("my-orders")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMenu === "my-orders"
                      ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                      : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                  }`}
                >
                  <Briefcase size={16} className={activeMenu === "my-orders" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                  <span>Client Orders (Posted)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPostModal(true)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-black bg-[#76B900] hover:bg-[#68A500] transition-all shadow-sm"
                >
                  <PlusCircle size={16} className="text-black" />
                  <span>+ Post New Order</span>
                </button>
              </nav>
            </div>

            {/* Nav Section: OTHERS */}
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                OTHERS
              </p>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu("earnings");
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeMenu === "earnings"
                      ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                      : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                  }`}
                >
                  <CreditCard size={16} className={activeMenu === "earnings" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                  <span>Payouts & Commission</span>
                </button>

                <Link
                  to="/"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white !no-underline"
                >
                  <ArrowUpRight size={16} className="text-[#76B900]" />
                  <span>Visit Main Website</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                >
                  <LogOut size={16} className="text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="p-4 border-t border-[#F1F5F9] dark:border-[#262626] m-2 rounded-2xl bg-[#F8FAFC] dark:bg-[#1A1614]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#76B900] text-black flex items-center justify-center font-black text-xs shrink-0">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-bold text-[#1E293B] dark:text-white truncate">{user?.name || "User"}</div>
              <div className="text-[10px] text-[#76B900] font-bold capitalize truncate">{user?.role || "Creator"}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8F9FD] dark:bg-[#0C0A09]">

        {/* Top Header Bar (Exact match with reference image) */}
        <header className="h-20 bg-white dark:bg-[#12100E] border-b border-[#E2E8F0] dark:border-[#262626] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3 w-full max-w-md">
            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl border border-[#E2E8F0] dark:border-[#333] text-[#64748B] hover:text-black dark:hover:text-white bg-white dark:bg-[#1A1614]"
              aria-label="Toggle menu"
            >
              <Menu size={18} />
            </button>

            {/* Search bar */}
            <div className="relative w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search photoshoot, wedding, city, creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadDashboardData()}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#F8F9FD] dark:bg-[#1C1816] border border-[#E2E8F0] dark:border-[#333] text-xs text-[#1E293B] dark:text-white placeholder-[#94A3B8] outline-none focus:border-[#76B900] focus:bg-white dark:focus:bg-[#141210] transition-all"
              />
            </div>
          </div>

          {/* Right cluster: User Profile + Notifications + Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Visit Website */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1C1816] text-xs font-semibold text-[#64748B] hover:text-black dark:hover:text-white hover:border-[#CBD5E1] transition-all !no-underline"
              title="Return to public website"
            >
              <ArrowUpRight size={14} className="text-[#76B900]" />
              <span>Website</span>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Refresh button */}
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={refreshing}
              className="h-10 px-3 sm:px-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1C1816] text-xs font-semibold text-[#64748B] hover:text-[#1E293B] dark:hover:text-white hover:border-[#CBD5E1] transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin text-[#76B900]" : ""} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative h-10 w-10 rounded-xl border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1C1816] flex items-center justify-center text-[#64748B] hover:text-[#1E293B] dark:hover:text-white transition-all"
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
            </button>

            {/* Profile Dropdown Badge */}
            <div className="flex items-center gap-2 sm:gap-2.5 pl-2 border-l border-[#E2E8F0] dark:border-[#333]">
              <div className="h-9 w-9 rounded bg-[#76B900] text-black flex items-center justify-center font-extrabold text-xs">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-black dark:text-white">{user?.name || "Creator"}</div>
                <div className="text-[10px] text-[#76B900] font-bold capitalize">{user?.role || "Photographer"}</div>
              </div>
              <ChevronDown size={14} className="text-[#94A3B8] hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Global Toast Messages */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-600" />
              <span>{successMsg}</span>
            </div>
            <button type="button" onClick={() => setSuccessMsg("")} className="hover:text-emerald-950 font-bold">✕</button>
          </div>
        )}

        {error && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle size={15} className="text-rose-600" />
              <span>{error}</span>
            </div>
            <button type="button" onClick={() => setError("")} className="hover:text-rose-950 font-bold">✕</button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DASHBOARD MAIN BODY */}
        {/* ========================================================================= */}
        <main className="p-6 md:p-8 space-y-8 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">

          {/* Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Dashboard</h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                Marketplace overview, live photoshoot gigs, transparent 10% commission and earnings.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowPostModal(true)}
                className="h-10 px-4 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
                style={{ borderRadius: "2px" }}
              >
                <PlusCircle size={15} />
                <span>Book / Post Shoot Order</span>
              </button>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* ROW 1: REVENUE (BAR CHART) & ORDER TIME (DOUGHNUT CHART) - EXACT REFERENCE UI */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Revenue / Earnings Card (2 Columns) */}
            <div className="lg:col-span-2 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748B]">Revenue & Earnings</span>
                  <button type="button" onClick={() => setActiveMenu("earnings")} className="text-xs font-bold text-[#76B900] hover:underline">
                    View Report
                  </button>
                </div>

                <div className="flex items-baseline gap-3 mb-1">
                  <h2 className="text-2xl font-black text-black dark:text-white">
                    ₹{totalUserEarnings.toLocaleString()}
                  </h2>
                  <span className="inline-flex items-center text-[11px] font-bold text-[#76B900] gap-0.5">
                    <TrendingUp size={12} />
                    <span>+12.4% vs last week</span>
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">Photographer payouts & orders from 1-12 Oct, 2026</p>
              </div>

              {/* Bar Chart Visualization (SVG Pure Light Styling) */}
              <div className="mt-8 space-y-4">
                <div className="h-44 flex items-end justify-between gap-2 px-2 border-b border-[#F1F5F9] pb-2">
                  {[
                    { label: "01", h1: "45%", h2: "25%" },
                    { label: "02", h1: "65%", h2: "40%" },
                    { label: "03", h1: "55%", h2: "30%" },
                    { label: "04", h1: "70%", h2: "50%" },
                    { label: "05", h1: "85%", h2: "60%" },
                    { label: "06", h1: "40%", h2: "20%" },
                    { label: "07", h1: "75%", h2: "55%" },
                    { label: "08", h1: "90%", h2: "65%" },
                    { label: "09", h1: "60%", h2: "35%" },
                    { label: "10", h1: "80%", h2: "50%" },
                    { label: "11", h1: "95%", h2: "70%" },
                    { label: "12", h1: "88%", h2: "60%" }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        {/* Primary bar (NVIDIA Green) */}
                        <div
                          style={{ height: bar.h1 }}
                          className="w-2 sm:w-2.5 bg-[#76B900] rounded-t-sm transition-all group-hover:bg-[#68A500]"
                        />
                        {/* Comparison bar (Soft Slate) */}
                        <div
                          style={{ height: bar.h2 }}
                          className="w-2 sm:w-2.5 bg-[#E2E8F0] dark:bg-[#333] rounded-t-sm transition-all group-hover:bg-[#CBD5E1]"
                        />
                      </div>
                      <span className="text-[10px] text-[#94A3B8] font-medium">{bar.label}</span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 text-xs text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#76B900]" />
                    <span>Active Orders (Take-Home Pay)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0] dark:bg-[#333]" />
                    <span>Platform Commission (10%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shoot Time / Category Doughnut Chart (1 Column) */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748B]">Shoot Categories</span>
                  <button type="button" onClick={() => setActiveMenu("marketplace")} className="text-xs font-bold text-[#76B900] hover:underline">
                    View Report
                  </button>
                </div>
                <p className="text-[11px] text-[#94A3B8]">From 1-12 Oct, 2026</p>
              </div>

              {/* Doughnut SVG with Tooltip badge like reference */}
              <div className="my-6 relative flex items-center justify-center">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="none" />
                  {/* Pre-wedding: 45% (NVIDIA Green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#76B900"
                    strokeWidth="12"
                    strokeDasharray="107 239"
                    strokeDashoffset="0"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Wedding: 35% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#A3E635"
                    strokeWidth="12"
                    strokeDasharray="83 239"
                    strokeDashoffset="-112"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Commercial: 20% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#E2E8F0"
                    strokeWidth="12"
                    strokeDasharray="47 239"
                    strokeDashoffset="-200"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Floating tooltip badge exactly matching image */}
                <div className="absolute -top-1 -right-2 bg-black text-white p-2.5 rounded-xl shadow-lg text-[11px] z-10 border border-[#333]">
                  <div className="text-[#94A3B8] text-[9px] uppercase tracking-wider">Top Category</div>
                  <div className="font-bold">Pre-Wedding</div>
                  <div className="font-extrabold text-[#76B900] text-xs">45% of Shoots</div>
                </div>
              </div>

              {/* Category Breakdown legend */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
                    <span className="h-2 w-2 rounded-full bg-[#76B900]" />
                    <span>Pre-Wedding</span>
                  </div>
                  <div className="font-black text-xs text-black dark:text-white mt-0.5">45%</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
                    <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
                    <span>Wedding</span>
                  </div>
                  <div className="font-black text-xs text-black dark:text-white mt-0.5">35%</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
                    <span className="h-2 w-2 rounded-full bg-[#E2E8F0]" />
                    <span>Fashion</span>
                  </div>
                  <div className="font-black text-xs text-black dark:text-white mt-0.5">20%</div>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* ROW 2: LIVE GIG MARKETPLACE (ACTIVE ORDERS WITH REAL-TIME COUNTDOWN CLOCK) */}
          {/* ======================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-black dark:text-white">Live Photoshoot Orders (Marketplace)</h2>
                <p className="text-xs text-[#64748B]">Orders currently open for photographers to claim before the timer expires.</p>
              </div>

              {/* Category filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {["all", "pre-wedding", "wedding", "commercial"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                      filterCategory === cat
                        ? "bg-[#76B900] text-black shadow-sm"
                        : "bg-white dark:bg-[#12100E] text-[#64748B] border border-[#E2E8F0] dark:border-[#333] hover:border-[#76B900]"
                    }`}
                    style={{ borderRadius: "2px" }}
                  >
                    {cat === "all" ? "All Gigs" : cat.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-12 text-center text-xs text-[#64748B]">
                Loading available marketplace gigs...
              </div>
            ) : availableOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#333] p-10 text-center space-y-3">
                <Camera size={32} className="mx-auto text-[#94A3B8]" />
                <h3 className="text-sm font-bold text-black dark:text-white">No open orders right now</h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                  All gigs may have been claimed or expired. Clients can publish a new order anytime!
                </p>
                <button
                  type="button"
                  onClick={() => setShowPostModal(true)}
                  className="px-4 py-2 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-bold"
                  style={{ borderRadius: "2px" }}
                >
                  Post Shoot Order
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableOrders.map((order) => {
                  const clientBudget = order.totalPrice || order.budget || 0;
                  const commissionFee = order.platformFee || Math.round(clientBudget * 0.10);
                  const creatorPayout = order.freelancerPayout || (clientBudget - commissionFee);

                  return (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900]/60 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Top: Category Tag + Live Countdown Clock */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 bg-[#76B900]/15 text-black dark:text-[#76B900] text-[10px] font-bold uppercase tracking-wider border border-[#76B900]/30" style={{ borderRadius: "2px" }}>
                            {order.eventType ? order.eventType.replace("-", " ") : "Shoot"}
                          </span>
                          <OrderCountdown expiresAt={order.expiresAt} />
                        </div>

                        {/* Title & Requirements */}
                        <div>
                          <h3 className="text-sm font-bold text-black dark:text-white line-clamp-1">{order.title}</h3>
                          {order.message && (
                            <p className="text-xs text-[#64748B] line-clamp-2 mt-1">"{order.message}"</p>
                          )}
                        </div>

                        {/* Location & Date */}
                        <div className="space-y-1.5 text-xs text-[#64748B] pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
                          <div className="flex items-center gap-2">
                            <MapPin size={13} className="text-[#76B900] shrink-0" />
                            <span className="truncate">{order.eventLocation}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={13} className="text-[#76B900] shrink-0" />
                            <span>
                              {order.eventDate ? new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Flexible"}
                              {" • "}
                              {order.eventDuration || "Full Day"}
                            </span>
                          </div>
                        </div>

                        {/* Transparent Split Box */}
                        <div className="p-3 bg-[#F8FAFC] dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] text-xs space-y-1">
                          <div className="flex justify-between text-[#64748B]">
                            <span>Client Budget:</span>
                            <span className="font-semibold text-black dark:text-white">₹{clientBudget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[#94A3B8] text-[11px]">
                            <span>10% Platform Cut:</span>
                            <span>-₹{commissionFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-[#E2E8F0] dark:border-[#2D2825] pt-1 font-bold">
                            <span className="text-[#76B900]">Photographer Payout:</span>
                            <span className="text-sm text-[#76B900] font-black">₹{creatorPayout.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Claim Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrderToClaim(order)}
                        className="mt-4 w-full h-10 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
                        style={{ borderRadius: "2px" }}
                      >
                        <Camera size={14} />
                        <span>Claim Order & Earn ₹{creatorPayout.toLocaleString()}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ======================================================================= */}
          {/* ROW 3: REVIEWS / RATINGS CIRCLES & MOST ORDERED SHOOTS (MATCHING IMAGE BOTTOM ROW) */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Circular Ratings card (matching reference bottom-left) */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1E1B4B] dark:text-white">Creator Quality & Trust</span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">Verified rating metrics across completed shoots</p>
              </div>

              {/* 3 Intersecting/Adjacent Colorful Rings matching screenshot */}
              <div className="my-6 flex items-center justify-center gap-3">
                <div className="h-20 w-20 rounded-full bg-[#818CF8]/15 border-2 border-[#6366F1] flex flex-col items-center justify-center text-center p-1">
                  <span className="font-extrabold text-sm text-[#4F46E5]">98%</span>
                  <span className="text-[9px] font-semibold text-[#64748B]">Delivery</span>
                </div>

                <div className="h-24 w-24 rounded-full bg-[#FB923C]/15 border-2 border-[#F97316] flex flex-col items-center justify-center text-center p-1 shadow-sm">
                  <span className="font-extrabold text-base text-[#EA580C]">95%</span>
                  <span className="text-[10px] font-semibold text-[#64748B]">Client Trust</span>
                </div>

                <div className="h-20 w-20 rounded-full bg-[#2DD4BF]/15 border-2 border-[#0D9488] flex flex-col items-center justify-center text-center p-1">
                  <span className="font-extrabold text-sm text-[#0D9488]">94%</span>
                  <span className="text-[9px] font-semibold text-[#64748B]">Gear Score</span>
                </div>
              </div>

              <div className="text-[11px] text-[#64748B] text-center border-t border-[#F1F5F9] pt-3">
                100% money protection with guaranteed 10% platform commission release.
              </div>
            </div>

            {/* Most Booked Shoots list (matching reference bottom-middle) */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1E1B4B] dark:text-white">Popular Shoot Types</span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">Highest earning gig categories in Maharashtra</p>
              </div>

              <div className="my-4 space-y-3.5">
                {[
                  { title: "Sunset Pre-Wedding", rate: "₹18,000", tag: "Lonavala", icon: "🌅" },
                  { title: "Traditional Wedding 2-Day", rate: "₹45,000", tag: "Thane", icon: "💍" },
                  { title: "Fashion Brand Lookbook", rate: "₹12,000", tag: "Mumbai", icon: "👗" },
                  { title: "Cinematic Drone Teaser", rate: "₹15,000", tag: "Murbad", icon: "🚁" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#F8FAFC] dark:bg-[#1A1614] border border-[#E2E8F0] dark:border-[#333] flex items-center justify-center text-base">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1E1B4B] dark:text-white">{item.title}</div>
                        <div className="text-[10px] text-[#94A3B8]">{item.tag}</div>
                      </div>
                    </div>
                    <div className="text-xs font-extrabold text-[#1E1B4B] dark:text-white">{item.rate}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowPostModal(true)}
                className="w-full text-center text-xs font-semibold text-[#76B900] hover:underline pt-2 border-t border-[#F1F5F9] dark:border-[#262626]"
              >
                + Book Custom Shoot Category
              </button>
            </div>

            {/* Orders Summary & Trendline (matching reference bottom-right) */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#64748B] dark:text-[#A3B3C2]">Platform Orders</span>
                  <button type="button" onClick={() => setActiveMenu("my-gigs")} className="text-xs font-semibold text-[#76B900] hover:underline">
                    View Report
                  </button>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black text-[#1E1B4B] dark:text-white">{availableOrders.length + myClaimedOrders.length}</h3>
                  <span className="text-[11px] font-bold text-[#76B900]">Active Market</span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">Orders in circulation</p>
              </div>

              {/* Mini Trend Line SVG like screenshot */}
              <div className="my-6">
                <svg className="w-full h-20" viewBox="0 0 200 60">
                  <path
                    d="M 0 45 Q 30 50, 60 25 T 120 30 T 160 15 T 200 50"
                    fill="none"
                    stroke="#76B900"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="58" x2="200" y2="58" stroke="#F1F5F9" strokeDasharray="3 3" />
                </svg>
                <div className="flex justify-between text-[10px] text-[#94A3B8] px-1">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                  <span>06</span>
                </div>
              </div>

              <div className="text-xs text-[#64748B] flex items-center justify-between border-t border-[#F1F5F9] dark:border-[#262626] pt-3">
                <span>Commission Cut:</span>
                <span className="font-bold text-[#76B900]">Flat 10% Fee</span>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* SECTION: MY CLAIMED GIGS (UNLOCKED CONTACTS & COMPLETE ACTION) */}
          {/* ======================================================================= */}
          <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#1E1B4B] dark:text-white">My Claimed Photoshoot Gigs ({myClaimedOrders.length})</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Orders you have claimed. Contact the client and mark completed to receive your payout.</p>
              </div>
            </div>

            {myClaimedOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#94A3B8] border border-dashed border-[#E2E8F0] dark:border-[#333] rounded-xl">
                You haven't claimed any orders yet. Browse the Live Gig Orders board above and click "Claim Order"!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myClaimedOrders.map((order) => {
                  const isCompleted = order.status === "completed";

                  return (
                    <div key={order._id} className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#181513] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1E1B4B] dark:text-white">{order.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isCompleted ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300" : "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300"
                        }`}>
                          {isCompleted ? "Completed" : "Claimed / Active"}
                        </span>
                      </div>

                      {/* Unlocked Contact Details */}
                      <div className="p-3 bg-white dark:bg-[#12100E] rounded-lg border border-[#E2E8F0] dark:border-[#262626] text-xs space-y-1.5">
                        <div className="font-bold text-[#1E1B4B] dark:text-white">
                          Client: {order.customerName || order.client?.name || "Client"}
                        </div>
                        <div className="text-[#64748B] dark:text-[#94A3B8]">
                          Phone: {order.customerPhone || order.client?.phone || "N/A"}
                        </div>
                        <div className="flex gap-2 pt-1">
                          {(order.customerPhone || order.client?.phone) && (
                            <>
                              <a
                                href={`tel:${order.customerPhone || order.client?.phone}`}
                                className="px-3 py-1 rounded-lg bg-[#4F46E5] text-white font-bold text-[11px] hover:bg-[#4338CA] !no-underline flex items-center gap-1"
                              >
                                <Phone size={11} />
                                <span>Call Client</span>
                              </a>
                              <a
                                href={`https://wa.me/${(order.customerPhone || order.client?.phone || "").replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(order.customerName || "Client")}%2C%20I%20claimed%20your%20photoshoot%20booking%20on%20CREAONNECT!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] hover:bg-[#1EBE5D] !no-underline flex items-center gap-1"
                              >
                                <MessageCircle size={11} />
                                <span>WhatsApp</span>
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="text-xs">
                          <span className="text-[#64748B] dark:text-[#94A3B8]">Your Payout: </span>
                          <span className="font-bold text-[#76B900]">
                            ₹{(order.freelancerPayout || (order.budget ? Math.round(order.budget * 0.9) : 0)).toLocaleString()}
                          </span>
                        </div>

                        {!isCompleted && (
                          <button
                            type="button"
                            onClick={() => handleCompleteOrder(order._id)}
                            className="px-3 py-1.5 rounded-lg bg-[#76B900] hover:bg-[#68A500] text-black font-extrabold text-xs"
                            style={{ borderRadius: "2px" }}
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* POST NEW ORDER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white dark:bg-[#171311] rounded-2xl border border-[#E2E8F0] dark:border-[#2D2825] p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] dark:border-[#262626]">
                <div>
                  <h3 className="text-lg font-black text-[#1E1B4B] dark:text-white">Book / Post Photoshoot Order</h3>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Order will appear on the live board with a countdown expiry timer.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="h-8 w-8 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#221B17] flex items-center justify-center text-[#64748B] dark:text-neutral-400"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handlePostOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Shoot Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset Pre-Wedding Photoshoot in Lonavala"
                    className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900]"
                    value={postFormData.title}
                    onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Category</label>
                    <select
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900]"
                      value={postFormData.eventType}
                      onChange={(e) => setPostFormData({ ...postFormData, eventType: e.target.value })}
                    >
                      <option value="pre-wedding">Pre-Wedding Shoot</option>
                      <option value="wedding">Full Wedding Ceremony</option>
                      <option value="cinematography">Cinematography</option>
                      <option value="commercial">Commercial / Fashion</option>
                      <option value="portrait">Maternity / Portrait</option>
                      <option value="event">Birthday / Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Duration</label>
                    <select
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900]"
                      value={postFormData.eventDuration}
                      onChange={(e) => setPostFormData({ ...postFormData, eventDuration: e.target.value })}
                    >
                      <option value="Half Day">Half Day (4-5 hrs)</option>
                      <option value="Full Day">Full Day (8-10 hrs)</option>
                      <option value="2 Days">2 Days Coverage</option>
                      <option value="3 Days">3 Days Grand</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Shoot Date</label>
                    <input
                      type="date"
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900]"
                      value={postFormData.eventDate}
                      onChange={(e) => setPostFormData({ ...postFormData, eventDate: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Location / Venue</label>
                    <input
                      type="text"
                      placeholder="e.g. Lonavala or Thane"
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900]"
                      value={postFormData.eventLocation}
                      onChange={(e) => setPostFormData({ ...postFormData, eventLocation: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Expiry Hours Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Order Expiration Window</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { h: 12, label: "12 Hours (Fast)" },
                      { h: 24, label: "24 Hours (Standard)" },
                      { h: 48, label: "48 Hours (2 Days)" }
                    ].map((item) => (
                      <button
                        key={item.h}
                        type="button"
                        onClick={() => setPostFormData({ ...postFormData, expiryHours: item.h })}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                          postFormData.expiryHours === item.h
                            ? "bg-[#76B900]/20 border-[#76B900] text-[#76B900] font-bold"
                            : "bg-white dark:bg-[#1F1A17] border-[#CBD5E1] dark:border-[#382C24] text-[#64748B] dark:text-[#94A3B8]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget & Split preview */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Budget (₹ INR)</label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    placeholder="15000"
                    className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs font-bold text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900]"
                    value={postFormData.budget}
                    onChange={(e) => setPostFormData({ ...postFormData, budget: e.target.value })}
                    required
                  />

                  <div className="mt-2 p-3 bg-[#F8FAFC] dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626] rounded-xl text-xs space-y-1">
                    <div className="flex justify-between text-[#64748B] dark:text-[#94A3B8]">
                      <span>Platform Commission (10%):</span>
                      <span className="font-semibold text-[#1E1B4B] dark:text-white">₹{platformFeeCalc.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#76B900]">
                      <span>Creator Payout (90%):</span>
                      <span>₹{creatorPayoutCalc.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] dark:text-white mb-1">Shoot Requirements</label>
                  <textarea
                    rows={2}
                    placeholder="Specify candid photography style, drone requirements, outfit changes..."
                    className="w-full p-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-[#1E1B4B] dark:text-white outline-none focus:border-[#76B900] resize-none"
                    value={postFormData.message}
                    onChange={(e) => setPostFormData({ ...postFormData, message: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="flex-1 h-11 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#221B17]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={postingOrder}
                    className="flex-1 h-11 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm disabled:opacity-50"
                    style={{ borderRadius: "2px" }}
                  >
                    {postingOrder ? "Publishing..." : "Publish to Board"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CLAIM CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedOrderToClaim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#171311] rounded-2xl border border-[#E2E8F0] dark:border-[#2D2825] p-6 space-y-5 shadow-2xl"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#76B900] px-2 py-0.5 rounded-full">
                  Confirm Gig Claim
                </span>
                <h3 className="text-base font-black text-[#1E1B4B] dark:text-white mt-2">{selectedOrderToClaim.title}</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  {selectedOrderToClaim.eventLocation} • {new Date(selectedOrderToClaim.eventDate).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="p-4 bg-[#F8FAFC] dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626] rounded-xl text-xs space-y-1.5">
                <div className="flex justify-between text-[#64748B] dark:text-[#94A3B8]">
                  <span>Total Order Budget:</span>
                  <span className="font-semibold text-[#1E1B4B] dark:text-white">
                    ₹{(selectedOrderToClaim.totalPrice || selectedOrderToClaim.budget || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Platform Fee (10%):</span>
                  <span>-₹{(selectedOrderToClaim.platformFee || Math.round((selectedOrderToClaim.budget || 0) * 0.10)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-[#E2E8F0] dark:border-[#262626] pt-1.5 font-bold text-sm text-[#76B900]">
                  <span>Your Net Earnings:</span>
                  <span>
                    ₹{(selectedOrderToClaim.freelancerPayout || ((selectedOrderToClaim.budget || 0) - (selectedOrderToClaim.platformFee || 0))).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">Photographer Commitment: </span>
                By claiming, you agree to attend this shoot with professional gear and reach out to the client promptly.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderToClaim(null)}
                  disabled={claiming}
                  className="flex-1 h-11 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#221B17]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClaim}
                  disabled={claiming}
                  className="flex-1 h-11 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm disabled:opacity-50"
                  style={{ borderRadius: "2px" }}
                >
                  {claiming ? "Claiming..." : "Claim & Unlock Client"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* UNLOCKED CLIENT CONTACT SUCCESS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {claimedOrderDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#171311] rounded-2xl border border-[#E2E8F0] dark:border-[#2D2825] p-6 space-y-4 shadow-2xl text-center"
            >
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-[#76B900] flex items-center justify-center mx-auto">
                <CheckCircle size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#1E1B4B] dark:text-white">Order Claimed Successfully!</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  You are now assigned to this shoot. Contact the client right now:
                </p>
              </div>

              <div className="p-4 bg-[#F8FAFC] dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626] rounded-xl text-left text-xs space-y-1">
                <div className="font-bold text-[#1E1B4B] dark:text-white">
                  Client: {claimedOrderDetails.customerName || claimedOrderDetails.client?.name || "Client"}
                </div>
                <div className="text-[#64748B] dark:text-[#94A3B8]">
                  Phone: {claimedOrderDetails.customerPhone || claimedOrderDetails.client?.phone || "N/A"}
                </div>
                <div className="text-[#64748B] dark:text-[#94A3B8]">
                  Email: {claimedOrderDetails.customerEmail || claimedOrderDetails.client?.email || "N/A"}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {(claimedOrderDetails.customerPhone || claimedOrderDetails.client?.phone) && (
                  <>
                    <a
                      href={`tel:${claimedOrderDetails.customerPhone || claimedOrderDetails.client?.phone}`}
                      className="flex-1 h-10 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold flex items-center justify-center gap-1.5 !no-underline"
                    >
                      <Phone size={13} />
                      <span>Call Client</span>
                    </a>
                    <a
                      href={`https://wa.me/${(claimedOrderDetails.customerPhone || claimedOrderDetails.client?.phone || "").replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(claimedOrderDetails.customerName || "there")}%2C%20I%20claimed%20your%20photoshoot%20booking%20on%20CREAONNECT!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-10 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 !no-underline"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => setClaimedOrderDetails(null)}
                className="w-full text-xs text-[#94A3B8] hover:text-[#1E293B] dark:hover:text-white pt-2"
              >
                Close & Return to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UserDashboard;
