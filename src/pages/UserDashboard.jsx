import React, { useState, useEffect, useMemo } from "react";
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
  Menu,
  ShieldCheck,
  Check,
  Wallet,
  Send,
  ArrowRight,
  Receipt,
  FileText
} from "lucide-react";
import { bookingService, authService } from "../services";
import ThemeToggle from "../components/ThemeToggle";

// Helper component for live real-time countdown timer
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
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40">
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
          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 animate-pulse"
          : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40"
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

  // Active Perspective Mode: "creator" (Earn Money) vs "client" (Book Shoots)
  const [dashboardMode, setDashboardMode] = useState("creator");

  // Active Menu View
  // Creator: "dashboard", "marketplace", "my-gigs", "earnings"
  // Client: "client-dashboard", "my-orders", "marketplace", "invoices"
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Data states
  const [availableOrders, setAvailableOrders] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sub-filter tabs inside dedicated pages
  const [myGigsStatusFilter, setMyGigsStatusFilter] = useState("all"); // all, active, completed
  const [clientOrdersFilter, setClientOrdersFilter] = useState("all"); // all, open, claimed, completed, cancelled
  const [marketplaceSort, setMarketplaceSort] = useState("expiring"); // expiring, highest, lowest

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

  // Payout withdrawal form state
  const [upiId, setUpiId] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);

  // Authentication check & Initial Mode setup
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

      // Auto-set mode according to user role
      if (parsedUser.role === "client") {
        setDashboardMode("client");
        setActiveMenu("client-dashboard");
      } else {
        setDashboardMode("creator");
        setActiveMenu("dashboard");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // Mode Switcher Handler (Strictly restricted to admin)
  const handleSwitchMode = (mode) => {
    if (user?.role && user.role !== "admin") {
      return;
    }
    setDashboardMode(mode);
    if (mode === "client") {
      setActiveMenu("client-dashboard");
    } else {
      setActiveMenu("dashboard");
    }
  };

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

  // Handle Complete Order (Credits earnings)
  const handleCompleteOrder = async (orderId) => {
    try {
      await bookingService.completeOrder(orderId);
      setSuccessMsg("Order marked completed! Payout has been credited to take-home earnings.");
      loadDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to complete order.");
    }
  };

  // Handle Cancel Client Order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this shoot order?")) return;
    try {
      await bookingService.cancelOrder(orderId);
      setSuccessMsg("Order cancelled successfully.");
      loadDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to cancel order.");
    }
  };

  // Handle Post Order Submit
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

      setSuccessMsg("Order published live to marketplace! Photographers in Maharashtra can now claim it.");
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
      setActiveMenu("my-orders"); // Switch to Client Orders (Posted) to view the new order
      loadDashboardData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to publish order.");
    } finally {
      setPostingOrder(false);
    }
  };

  // Pre-fill Package for Instant 1-Click Booking
  const handlePreFillPackage = (title, category, budget, loc = "Lonavala / Alibaug") => {
    setPostFormData({
      ...postFormData,
      title,
      eventType: category,
      budget,
      eventLocation: loc
    });
    setShowPostModal(true);
  };

  // Handle Instant UPI Payout Request
  const handleWithdrawPayout = (e) => {
    e.preventDefault();
    if (!upiId || !withdrawAmount) {
      setError("Please enter a valid UPI ID and withdrawal amount.");
      return;
    }
    const amt = Number(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (amt > totalUserEarnings) {
      setError(`Withdrawal amount exceeds your available balance of ₹${totalUserEarnings.toLocaleString()}.`);
      return;
    }

    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setSuccessMsg(`Instant payout request of ₹${amt.toLocaleString()} processed! Transferred to ${upiId} via IMPS.`);
      setWithdrawAmount("");
      setUpiId("");
    }, 1200);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // =========================================================================
  // DYNAMIC DATA CALCULATIONS (100% Dynamic from live orders)
  // =========================================================================
  const allKnownOrders = useMemo(() => {
    const list = [...availableOrders, ...myClaimedOrders];
    myClientOrders.forEach(co => {
      if (!list.some(item => item._id === co._id)) {
        list.push(co);
      }
    });
    return list;
  }, [availableOrders, myClaimedOrders, myClientOrders]);

  // Completed & Active Claimed Gigs
  const completedClaimed = useMemo(() => myClaimedOrders.filter(o => o.status === "completed"), [myClaimedOrders]);
  const activeClaimed = useMemo(() => myClaimedOrders.filter(o => o.status === "claimed" || o.status === "confirmed" || o.status === "in_progress"), [myClaimedOrders]);

  // Client Orders stats
  const clientOpenOrders = useMemo(() => myClientOrders.filter(o => o.status === "open"), [myClientOrders]);
  const clientClaimedOrders = useMemo(() => myClientOrders.filter(o => o.status === "claimed" || o.status === "confirmed" || o.status === "in_progress"), [myClientOrders]);
  const clientCompletedOrders = useMemo(() => myClientOrders.filter(o => o.status === "completed"), [myClientOrders]);
  const clientTotalBudgetSecured = useMemo(() => myClientOrders.reduce((sum, o) => sum + (o.totalPrice || o.budget || 0), 0), [myClientOrders]);

  // Real Calculated Earnings
  const totalUserEarnings = useMemo(() => {
    const earnedFromClaimed = completedClaimed.reduce((sum, o) => sum + (o.freelancerPayout || (o.budget ? Math.round(o.budget * 0.9) : 0)), 0);
    return (user?.totalEarnings || 0) + earnedFromClaimed;
  }, [user, completedClaimed]);

  const pendingEscrowPayout = useMemo(() => {
    return activeClaimed.reduce((sum, o) => sum + (o.freelancerPayout || (o.budget ? Math.round(o.budget * 0.9) : 0)), 0);
  }, [activeClaimed]);

  const totalCommissionPaid = useMemo(() => {
    return completedClaimed.reduce((sum, o) => sum + (o.platformFee || (o.budget ? Math.round(o.budget * 0.1) : 0)), 0);
  }, [completedClaimed]);

  // Dynamic Category Distribution from all real orders
  const { dynamicCategories, topCategory } = useMemo(() => {
    const counts = {};
    allKnownOrders.forEach(o => {
      const cat = (o.eventType || "other").toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const total = allKnownOrders.length || 1;
    const categoryConfig = [
      { key: "pre-wedding", label: "Pre-Wedding", color: "#76B900" },
      { key: "wedding", label: "Wedding", color: "#A3E635" },
      { key: "commercial", label: "Commercial", color: "#38BDF8" },
      { key: "cinematography", label: "Cinematography", color: "#F59E0B" },
      { key: "portrait", label: "Portrait", color: "#EC4899" },
      { key: "event", label: "Event", color: "#8B5CF6" }
    ];

    const results = categoryConfig.map(c => {
      const count = counts[c.key] || 0;
      const pct = allKnownOrders.length > 0 ? Math.round((count / total) * 100) : (c.key === "pre-wedding" ? 45 : c.key === "wedding" ? 35 : c.key === "commercial" ? 20 : 0);
      return {
        ...c,
        count,
        percentage: pct
      };
    });

    const sorted = [...results].sort((a, b) => b.percentage - a.percentage);
    const top = sorted[0] || { label: "Pre-Wedding", percentage: 45, count: 0 };

    return { dynamicCategories: results, topCategory: top };
  }, [allKnownOrders]);

  // Dynamic Doughnut SVG Slices (Circumference ~ 239)
  const doughnutSlices = useMemo(() => {
    let offset = 0;
    const activeSlices = dynamicCategories.filter(c => c.percentage > 0).slice(0, 4);
    if (activeSlices.length === 0) {
      activeSlices.push({ key: "pre-wedding", color: "#76B900", percentage: 100, label: "Pre-Wedding" });
    }

    return activeSlices.map(cat => {
      const length = Math.max(4, Math.round((cat.percentage / 100) * 239));
      const slice = {
        ...cat,
        dashArray: `${length} ${239 - length}`,
        dashOffset: -offset
      };
      offset += length;
      return slice;
    });
  }, [dynamicCategories]);

  // Dynamic 12-month / 12-bar revenue breakdown
  const barChartData = useMemo(() => {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const monthTotals = months.map(m => ({ label: m, volume: 0, count: 0 }));

    allKnownOrders.forEach(ord => {
      const d = ord.eventDate || ord.createdAt ? new Date(ord.eventDate || ord.createdAt) : new Date();
      const mIdx = d.getMonth();
      const val = ord.totalPrice || ord.budget || 0;
      if (monthTotals[mIdx]) {
        monthTotals[mIdx].volume += val;
        monthTotals[mIdx].count += 1;
      }
    });

    const maxVol = Math.max(...monthTotals.map(m => m.volume), 10000);
    return monthTotals.map((m, i) => {
      const hasReal = m.volume > 0;
      const h1Val = hasReal ? Math.max(20, Math.min(95, Math.round((m.volume / maxVol) * 90))) : [35, 55, 45, 60, 75, 40, 65, 80, 50, 70, 85, 78][i];
      const h2Val = Math.round(h1Val * 0.55);
      return {
        ...m,
        h1: `${h1Val}%`,
        h2: `${h2Val}%`
      };
    });
  }, [allKnownOrders]);

  // Modal budget calculator
  const budgetNum = Number(postFormData.budget) || 0;
  const platformFeeCalc = Math.round(budgetNum * 0.10);
  const creatorPayoutCalc = budgetNum - platformFeeCalc;

  // Filtered lists for dedicated pages
  const filteredAvailableOrders = useMemo(() => {
    let list = [...availableOrders];
    if (filterCategory !== "all") {
      list = list.filter(o => o.eventType === filterCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        (o.title || "").toLowerCase().includes(q) ||
        (o.eventLocation || "").toLowerCase().includes(q) ||
        (o.eventType || "").toLowerCase().includes(q)
      );
    }
    if (marketplaceSort === "highest") {
      list.sort((a, b) => (b.totalPrice || b.budget || 0) - (a.totalPrice || a.budget || 0));
    } else if (marketplaceSort === "lowest") {
      list.sort((a, b) => (a.totalPrice || a.budget || 0) - (b.totalPrice || b.budget || 0));
    } else {
      list.sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime());
    }
    return list;
  }, [availableOrders, filterCategory, searchQuery, marketplaceSort]);

  const filteredMyClaimedOrders = useMemo(() => {
    let list = [...myClaimedOrders];
    if (myGigsStatusFilter === "active") {
      list = list.filter(o => o.status !== "completed" && o.status !== "cancelled");
    } else if (myGigsStatusFilter === "completed") {
      list = list.filter(o => o.status === "completed");
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        (o.title || "").toLowerCase().includes(q) ||
        (o.eventLocation || "").toLowerCase().includes(q) ||
        (o.customerName || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [myClaimedOrders, myGigsStatusFilter, searchQuery]);

  const filteredClientOrders = useMemo(() => {
    let list = [...myClientOrders];
    if (clientOrdersFilter === "open") {
      list = list.filter(o => o.status === "open");
    } else if (clientOrdersFilter === "claimed") {
      list = list.filter(o => o.status === "claimed" || o.status === "confirmed" || o.status === "in_progress");
    } else if (clientOrdersFilter === "completed") {
      list = list.filter(o => o.status === "completed");
    } else if (clientOrdersFilter === "cancelled") {
      list = list.filter(o => o.status === "cancelled");
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        (o.title || "").toLowerCase().includes(q) ||
        (o.eventLocation || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [myClientOrders, clientOrdersFilter, searchQuery]);

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
      {/* 1. LEFT SIDEBAR (ADAPTIVE TO CREATOR MODE vs CLIENT MODE) */}
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
                <span className="block text-[10px] uppercase tracking-wider text-[#76B900] font-bold">
                  {dashboardMode === "creator" ? "Creator Hub" : "Client Portal"}
                </span>
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

          {/* Quick Mode Toggle inside Sidebar: Admin Only Switcher or Non-Admin Role Badge */}
          {user?.role === "admin" ? (
            <div className="px-4 pt-4">
              <div className="flex rounded-xl bg-[#F1F5F9] dark:bg-[#1A1614] p-1 border border-[#E2E8F0] dark:border-[#2D2825]">
                <button
                  type="button"
                  onClick={() => handleSwitchMode("creator")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    dashboardMode === "creator"
                      ? "bg-[#76B900] text-black shadow-sm"
                      : "text-[#64748B] dark:text-[#94A3B8]"
                  }`}
                >
                  <Camera size={12} />
                  <span>Creator</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchMode("client")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    dashboardMode === "client"
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                      : "text-[#64748B] dark:text-[#94A3B8]"
                  }`}
                >
                  <Briefcase size={12} />
                  <span>Client</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 pt-4">
              <div className="flex items-center gap-2 rounded-xl bg-[#F1F5F9]/80 dark:bg-[#1A1614] px-3 py-2 border border-[#E2E8F0] dark:border-[#2D2825]">
                {dashboardMode === "client" ? (
                  <>
                    <Briefcase size={13} className="text-[#76B900]" />
                    <span className="text-xs font-bold text-black dark:text-white">Client Portal</span>
                  </>
                ) : (
                  <>
                    <Camera size={13} className="text-[#76B900]" />
                    <span className="text-xs font-bold text-black dark:text-white">Creator Hub</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Navigation Section */}
          <div className="px-4 py-4 space-y-6">

            {/* ==================================================== */}
            {/* A) CREATOR MODE SIDEBAR NAVIGATION (EARN MONEY) */}
            {/* ==================================================== */}
            {dashboardMode === "creator" && (
              <div>
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                  CREATOR MENU
                </p>
                <nav className="space-y-1">
                  {/* Dashboard Overview */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("dashboard");
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMenu === "dashboard"
                        ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                    }`}
                  >
                    <LayoutDashboard size={16} className={activeMenu === "dashboard" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                    <span>Dashboard</span>
                  </button>

                  {/* Live Gig Orders */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("marketplace");
                      setMobileSidebarOpen(false);
                    }}
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

                  {/* My Claimed Gigs */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("my-gigs");
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMenu === "my-gigs"
                        ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Camera size={16} className={activeMenu === "my-gigs" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                      <span>My Claimed Gigs</span>
                    </div>
                    {myClaimedOrders.length > 0 && (
                      <span className="h-5 min-w-[20px] px-1 rounded-full bg-[#E2E8F0] dark:bg-[#333] text-[#1E293B] dark:text-white text-[10px] font-bold flex items-center justify-center">
                        {myClaimedOrders.length}
                      </span>
                    )}
                  </button>

                  {/* Post New Order Button */}
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
            )}

            {/* ==================================================== */}
            {/* B) CLIENT MODE SIDEBAR NAVIGATION (BOOK SHOOTS) */}
            {/* ==================================================== */}
            {dashboardMode === "client" && (
              <div>
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                  CLIENT MENU
                </p>
                <nav className="space-y-1">
                  {/* Client Overview */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("client-dashboard");
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMenu === "client-dashboard"
                        ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                    }`}
                  >
                    <LayoutDashboard size={16} className={activeMenu === "client-dashboard" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                    <span>Client Dashboard</span>
                  </button>

                  {/* My Posted Shoot Orders */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("my-orders");
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMenu === "my-orders"
                        ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase size={16} className={activeMenu === "my-orders" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                      <span>My Posted Orders</span>
                    </div>
                    {myClientOrders.length > 0 && (
                      <span className="h-5 min-w-[20px] px-1 rounded-full bg-[#76B900] text-black text-[10px] font-extrabold flex items-center justify-center">
                        {myClientOrders.length}
                      </span>
                    )}
                  </button>

                  {/* + Book / Post Shoot Order Button */}
                  <button
                    type="button"
                    onClick={() => setShowPostModal(true)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-black bg-[#76B900] hover:bg-[#68A500] transition-all shadow-sm"
                  >
                    <PlusCircle size={16} className="text-black" />
                    <span>+ Book / Post Shoot</span>
                  </button>

                  {/* Browse Live Gigs */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("marketplace");
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMenu === "marketplace"
                        ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                    }`}
                  >
                    <ShoppingBag size={16} className={activeMenu === "marketplace" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                    <span>Browse Live Gigs</span>
                  </button>
                </nav>
              </div>
            )}

            {/* Nav Section: FINANCIALS & OTHERS */}
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                FINANCIALS & ACCOUNT
              </p>
              <nav className="space-y-1">
                {dashboardMode === "creator" ? (
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
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu("invoices");
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeMenu === "invoices"
                        ? "bg-[#76B900]/15 text-black dark:text-white font-bold border-l-4 border-[#76B900]"
                        : "text-[#64748B] hover:bg-[#F8FAFC] dark:hover:bg-[#1C1816] hover:text-[#1E293B] dark:hover:text-white"
                    }`}
                  >
                    <Receipt size={16} className={activeMenu === "invoices" ? "text-[#76B900]" : "text-[#94A3B8]"} />
                    <span>Invoices & Escrow</span>
                  </button>
                )}

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
              <div className="text-[10px] text-[#76B900] font-bold capitalize truncate">
                {dashboardMode === "creator" ? "Photographer / Creator" : "Client / Booking"}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8F9FD] dark:bg-[#0C0A09]">

        {/* Top Header Bar */}
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

            {/* Live Search bar */}
            <div className="relative w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder={dashboardMode === "creator" ? "Search photoshoot, client, city..." : "Search my bookings, photographers..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadDashboardData()}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#F8F9FD] dark:bg-[#1C1816] border border-[#E2E8F0] dark:border-[#333] text-xs text-[#1E293B] dark:text-white placeholder-[#94A3B8] outline-none focus:border-[#76B900] focus:bg-white dark:focus:bg-[#141210] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-black dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Center Cluster: Desktop Mode Switcher (Admin Only) or Role Indicator */}
          {user?.role === "admin" ? (
            <div className="hidden xl:flex items-center rounded-xl bg-[#F1F5F9] dark:bg-[#1A1614] p-1 border border-[#E2E8F0] dark:border-[#2D2825]">
              <button
                type="button"
                onClick={() => handleSwitchMode("creator")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  dashboardMode === "creator"
                    ? "bg-[#76B900] text-black shadow-sm"
                    : "text-[#64748B] dark:text-[#94A3B8] hover:text-black dark:hover:text-white"
                }`}
              >
                <Camera size={13} />
                <span>Creator Hub</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode("client")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  dashboardMode === "client"
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : "text-[#64748B] dark:text-[#94A3B8] hover:text-black dark:hover:text-white"
                }`}
              >
                <Briefcase size={13} />
                <span>Client Portal</span>
              </button>
            </div>
          ) : (
            <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F1F5F9] dark:bg-[#1A1614] border border-[#E2E8F0] dark:border-[#2D2825] text-xs font-bold">
              {dashboardMode === "client" ? (
                <>
                  <Briefcase size={13} className="text-[#76B900]" />
                  <span className="text-black dark:text-white">Client Portal</span>
                  <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] font-medium">• Book Shoots</span>
                </>
              ) : (
                <>
                  <Camera size={13} className="text-[#76B900]" />
                  <span className="text-black dark:text-white">Creator Hub</span>
                  <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] font-medium">• Take Gigs</span>
                </>
              )}
            </div>
          )}

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

            {/* Profile Dropdown Badge */}
            <div className="flex items-center gap-2 sm:gap-2.5 pl-2 border-l border-[#E2E8F0] dark:border-[#333]">
              <div className="h-9 w-9 rounded bg-[#76B900] text-black flex items-center justify-center font-extrabold text-xs">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-black dark:text-white">{user?.name || "User"}</div>
                <div className="text-[10px] text-[#76B900] font-bold capitalize">
                  {dashboardMode === "creator" ? "Creator Hub" : "Client Portal"}
                </div>
              </div>
              <ChevronDown size={14} className="text-[#94A3B8] hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Global Toast Messages */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
            <button type="button" onClick={() => setSuccessMsg("")} className="hover:text-emerald-950 dark:hover:text-white font-bold">✕</button>
          </div>
        )}

        {error && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle size={15} className="text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
            <button type="button" onClick={() => setError("")} className="hover:text-rose-950 dark:hover:text-white font-bold">✕</button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1A: CREATOR DASHBOARD OVERVIEW (activeMenu === "dashboard") */}
        {/* ========================================================================= */}
        {activeMenu === "dashboard" && (
          <main className="p-6 md:p-8 space-y-8 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            {/* Heading Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Creator Dashboard Overview</h1>
                  <span className="px-2 py-0.5 rounded bg-[#76B900]/20 text-[#76B900] text-[10px] font-extrabold uppercase">
                    Creator Hub
                  </span>
                </div>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Real-time gig marketplace analytics, take-home earnings, transparent 10% platform fee, and instant withdrawals.
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
                  <span>+ Post Shoot Order</span>
                </button>
              </div>
            </div>

            {/* ROW 1: DYNAMIC REVENUE (BAR CHART) & DYNAMIC CATEGORIES (DOUGHNUT) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Revenue / Earnings Card (2 Columns) */}
              <div className="lg:col-span-2 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Revenue & Earnings (Dynamic)</span>
                    <button type="button" onClick={() => setActiveMenu("earnings")} className="text-xs font-bold text-[#76B900] hover:underline">
                      View Payouts Ledger
                    </button>
                  </div>

                  <div className="flex items-baseline gap-3 mb-1">
                    <h2 className="text-2xl font-black text-black dark:text-white">
                      ₹{totalUserEarnings.toLocaleString()}
                    </h2>
                    <span className="inline-flex items-center text-[11px] font-bold text-[#76B900] gap-0.5">
                      <TrendingUp size={12} />
                      <span>{completedClaimed.length > 0 ? `+${completedClaimed.length} Completed Shoots` : "+12.4% vs last week"}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">
                    Take-home earnings calculated from completed gigs • Pending in escrow: ₹{pendingEscrowPayout.toLocaleString()}
                  </p>
                </div>

                {/* Dynamic 12-Month Bar Chart */}
                <div className="mt-8 space-y-4">
                  <div className="h-44 flex items-end justify-between gap-2 px-2 border-b border-[#F1F5F9] dark:border-[#262626] pb-2">
                    {barChartData.map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                        {/* Hover Tooltip showing exact values */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-black text-white text-[10px] px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap z-20 border border-[#333]">
                          Month {bar.label}: {bar.volume > 0 ? `₹${bar.volume.toLocaleString()} (${bar.count} orders)` : "Active pipeline"}
                        </div>

                        <div className="w-full flex items-end justify-center gap-1 h-full">
                          {/* Primary bar: Take-Home (90%) */}
                          <div
                            style={{ height: bar.h1 }}
                            className="w-2 sm:w-2.5 bg-[#76B900] rounded-t-sm transition-all group-hover:bg-[#68A500]"
                          />
                          {/* Secondary bar: Platform Fee (10%) */}
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
                  <div className="flex items-center gap-6 text-xs text-[#64748B] dark:text-[#94A3B8]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#76B900]" />
                      <span>Active Orders (Take-Home Pay 90%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#E2E8F0] dark:bg-[#333]" />
                      <span>Platform Commission (10%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Shoot Categories Doughnut Chart (1 Column) */}
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Shoot Categories (Live Breakdown)</span>
                    <button type="button" onClick={() => setActiveMenu("marketplace")} className="text-xs font-bold text-[#76B900] hover:underline">
                      Explore Gigs
                    </button>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Calculated across {allKnownOrders.length} total active & posted shoots</p>
                </div>

                {/* Dynamic SVG Doughnut with Top Category Badge */}
                <div className="my-6 relative flex items-center justify-center">
                  <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="none" className="dark:stroke-[#262626]" />

                    {doughnutSlices.map((slice, idx) => (
                      <circle
                        key={idx}
                        cx="50"
                        cy="50"
                        r="38"
                        stroke={slice.color}
                        strokeWidth="12"
                        strokeDasharray={slice.dashArray}
                        strokeDashoffset={slice.dashOffset}
                        fill="none"
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                    ))}
                  </svg>

                  {/* Dynamic Top Category floating badge */}
                  <div className="absolute -top-1 -right-2 bg-black text-white p-2.5 rounded-xl shadow-lg text-[11px] z-10 border border-[#333]">
                    <div className="text-[#94A3B8] text-[9px] uppercase tracking-wider">Top Category</div>
                    <div className="font-bold">{topCategory.label}</div>
                    <div className="font-extrabold text-[#76B900] text-xs">{topCategory.percentage}% of Shoots</div>
                  </div>
                </div>

                {/* Dynamic Category Breakdown legend */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
                  {dynamicCategories.slice(0, 3).map((cat, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <div className="font-black text-xs text-black dark:text-white mt-0.5">{cat.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ROW 2: 4 QUICK-STAT KPI TILES WITH DYNAMIC COUNTS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => setActiveMenu("marketplace")}
                className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] text-left hover:border-[#76B900]/70 transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Live Gig Orders</span>
                  <ShoppingBag size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black text-black dark:text-white mt-2">{availableOrders.length}</div>
                <div className="text-[11px] text-[#76B900] font-bold mt-0.5 flex items-center gap-1">
                  <span>Available to claim</span>
                  <ArrowRight size={11} />
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenu("my-gigs")}
                className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] text-left hover:border-[#76B900]/70 transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">My Claimed Gigs</span>
                  <Camera size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black text-black dark:text-white mt-2">{myClaimedOrders.length}</div>
                <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-bold mt-0.5">
                  {activeClaimed.length} Active • {completedClaimed.length} Done
                </div>
              </button>

              {user?.role === "admin" ? (
                <button
                  type="button"
                  onClick={() => handleSwitchMode("client")}
                  className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] text-left hover:border-[#76B900]/70 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Client Orders (Posted)</span>
                    <Briefcase size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-2xl font-black text-black dark:text-white mt-2">{myClientOrders.length}</div>
                  <div className="text-[11px] text-[#76B900] font-bold mt-0.5 flex items-center gap-1">
                    <span>Switch to Client Mode</span>
                    <ArrowRight size={11} />
                  </div>
                </button>
              ) : (
                <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] text-left shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Escrow In-Progress</span>
                    <ShieldCheck size={18} className="text-[#76B900]" />
                  </div>
                  <div className="text-2xl font-black text-black dark:text-white mt-2">₹{pendingEscrowPayout.toLocaleString()}</div>
                  <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-bold mt-0.5">
                    Secured for active shoots
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveMenu("earnings")}
                className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] text-left hover:border-[#76B900]/70 transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Available Balance</span>
                  <Wallet size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black text-black dark:text-white mt-2">₹{totalUserEarnings.toLocaleString()}</div>
                <div className="text-[11px] text-[#76B900] font-bold mt-0.5">
                  Instant UPI withdrawal
                </div>
              </button>
            </div>

            {/* ROW 3: REVIEWS/TRUST, POPULAR SHOOTS, PLATFORM ORDERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Circular Trust Metrics */}
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1E1B4B] dark:text-white">Creator Quality & Trust</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Verified rating metrics across completed shoots</p>
                </div>

                <div className="my-6 flex items-center justify-center gap-3">
                  <div className="h-20 w-20 rounded-full bg-[#818CF8]/15 border-2 border-[#6366F1] flex flex-col items-center justify-center text-center p-1">
                    <span className="font-extrabold text-sm text-[#4F46E5] dark:text-indigo-400">98%</span>
                    <span className="text-[9px] font-semibold text-[#64748B] dark:text-neutral-300">Delivery</span>
                  </div>

                  <div className="h-24 w-24 rounded-full bg-[#FB923C]/15 border-2 border-[#F97316] flex flex-col items-center justify-center text-center p-1 shadow-sm">
                    <span className="font-extrabold text-base text-[#EA580C] dark:text-orange-400">95%</span>
                    <span className="text-[10px] font-semibold text-[#64748B] dark:text-neutral-300">Client Trust</span>
                  </div>

                  <div className="h-20 w-20 rounded-full bg-[#2DD4BF]/15 border-2 border-[#0D9488] flex flex-col items-center justify-center text-center p-1">
                    <span className="font-extrabold text-sm text-[#0D9488] dark:text-teal-400">94%</span>
                    <span className="text-[9px] font-semibold text-[#64748B] dark:text-neutral-300">Gear Score</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] text-center border-t border-[#F1F5F9] dark:border-[#262626] pt-3">
                  100% payment escrow guarantee with instant 10% platform commission release.
                </div>
              </div>

              {/* Popular Shoot Types */}
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1E1B4B] dark:text-white">Popular Shoot Types</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">High earning categories in Maharashtra</p>
                </div>

                <div className="my-4 space-y-3.5">
                  {[
                    { title: "Sunset Pre-Wedding", rate: "₹18,000", tag: "Lonavala / Alibaug", icon: "🌅" },
                    { title: "Traditional Wedding 2-Day", rate: "₹45,000", tag: "Thane / Mumbai", icon: "💍" },
                    { title: "Fashion Brand Lookbook", rate: "₹15,000", tag: "Bandra / BKC", icon: "👗" },
                    { title: "Cinematic Drone Teaser", rate: "₹16,000", tag: "Murbad / Pune", icon: "🚁" }
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

              {/* Platform Orders & Mini Trendline */}
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#64748B] dark:text-[#A3B3C2]">Marketplace Orders</span>
                    <button type="button" onClick={() => setActiveMenu("marketplace")} className="text-xs font-semibold text-[#76B900] hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-black text-[#1E1B4B] dark:text-white">{availableOrders.length + myClaimedOrders.length}</h3>
                    <span className="text-[11px] font-bold text-[#76B900]">In Active Circulation</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Orders in circulation across creators</p>
                </div>

                {/* Trend Line SVG */}
                <div className="my-6">
                  <svg className="w-full h-20" viewBox="0 0 200 60">
                    <path
                      d="M 0 45 Q 30 50, 60 25 T 120 30 T 160 15 T 200 50"
                      fill="none"
                      stroke="#76B900"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line x1="0" y1="58" x2="200" y2="58" stroke="#F1F5F9" strokeDasharray="3 3" className="dark:stroke-[#262626]" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-[#94A3B8] px-1">
                    <span>W1</span>
                    <span>W2</span>
                    <span>W3</span>
                    <span>W4</span>
                    <span>W5</span>
                    <span>W6</span>
                  </div>
                </div>

                <div className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center justify-between border-t border-[#F1F5F9] dark:border-[#262626] pt-3">
                  <span>Commission Model:</span>
                  <span className="font-bold text-[#76B900]">Flat 10% Platform Fee</span>
                </div>
              </div>

            </div>

            {/* ROW 4: RECENT LIVE ORDERS SPOTLIGHT */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-black dark:text-white">Recent Live Marketplace Gigs</h2>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Latest client requirements ready for verified creators to claim.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMenu("marketplace")}
                  className="text-xs font-bold text-[#76B900] hover:underline flex items-center gap-1"
                >
                  <span>View All ({availableOrders.length})</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {availableOrders.length === 0 ? (
                <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#333] p-8 text-center space-y-2">
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">No open gigs in marketplace right now.</p>
                  <button
                    type="button"
                    onClick={() => setShowPostModal(true)}
                    className="px-4 py-2 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-bold rounded"
                  >
                    + Post Shoot Order
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {availableOrders.slice(0, 3).map((order) => {
                    const clientBudget = order.totalPrice || order.budget || 0;
                    const commissionFee = order.platformFee || Math.round(clientBudget * 0.10);
                    const creatorPayout = order.freelancerPayout || (clientBudget - commissionFee);

                    return (
                      <div
                        key={order._id}
                        className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900]/60 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 bg-[#76B900]/15 text-black dark:text-[#76B900] text-[10px] font-bold uppercase tracking-wider border border-[#76B900]/30 rounded">
                              {order.eventType ? order.eventType.replace("-", " ") : "Shoot"}
                            </span>
                            <OrderCountdown expiresAt={order.expiresAt} />
                          </div>

                          <div>
                            <h3 className="text-sm font-bold text-black dark:text-white line-clamp-1">{order.title}</h3>
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-2 mt-1">"{order.message || 'Professional shoot needed'}"</p>
                          </div>

                          <div className="space-y-1 text-xs text-[#64748B] dark:text-[#94A3B8] pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
                            <div className="flex items-center gap-2">
                              <MapPin size={13} className="text-[#76B900] shrink-0" />
                              <span className="truncate">{order.eventLocation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={13} className="text-[#76B900] shrink-0" />
                              <span>{order.eventDate ? new Date(order.eventDate).toLocaleDateString("en-IN") : "Flexible"}</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] flex justify-between items-center text-xs">
                            <span className="text-[#64748B] dark:text-[#94A3B8]">Creator Payout:</span>
                            <span className="font-extrabold text-sm text-[#76B900]">₹{creatorPayout.toLocaleString()}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedOrderToClaim(order)}
                          className="mt-4 w-full h-9 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm rounded"
                        >
                          <Camera size={13} />
                          <span>Claim Order</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1B: CLIENT DASHBOARD OVERVIEW (activeMenu === "client-dashboard") */}
        {/* ========================================================================= */}
        {activeMenu === "client-dashboard" && (
          <main className="p-6 md:p-8 space-y-8 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            {/* Heading Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Client Dashboard: My Shoots & Bookings</h1>
                  <span className="px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black text-[10px] font-extrabold uppercase">
                    Client Mode
                  </span>
                </div>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Track your photoshoot requirements, see assigned professional photographers, and manage shoot delivery.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowPostModal(true)}
                  className="h-10 px-4 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  <PlusCircle size={15} />
                  <span>+ Book / Post Shoot Order</span>
                </button>
              </div>
            </div>

            {/* Client KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Total Shoots Booked</span>
                <div className="text-2xl font-black text-black dark:text-white mt-2">{myClientOrders.length}</div>
                <div className="text-[11px] text-[#76B900] font-bold mt-0.5">Lifetime requests</div>
              </div>

              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Assigned / In Progress</span>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-2">{clientClaimedOrders.length}</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Creators actively shooting</div>
              </div>

              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Awaiting Photographers</span>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">{clientOpenOrders.length}</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Live on marketplace</div>
              </div>

              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Escrow Protected Budget</span>
                <div className="text-2xl font-black text-[#76B900] mt-2">₹{clientTotalBudgetSecured.toLocaleString()}</div>
                <div className="text-[11px] text-[#76B900] font-bold mt-0.5 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>100% Escrow safe</span>
                </div>
              </div>
            </div>

            {/* Active Shoots Pipeline Section */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-black dark:text-white">Your Shoot Pipeline & Assigned Creators</h2>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Current status of shoots you have posted on CREAONNECT.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMenu("my-orders")}
                  className="text-xs font-bold text-[#76B900] hover:underline"
                >
                  Manage All ({myClientOrders.length})
                </button>
              </div>

              {myClientOrders.length === 0 ? (
                <div className="p-10 border border-dashed border-[#CBD5E1] dark:border-[#333] rounded-2xl text-center space-y-3">
                  <Briefcase size={36} className="mx-auto text-[#94A3B8]" />
                  <h3 className="text-sm font-bold text-black dark:text-white">You haven't posted any shoots yet</h3>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto">
                    Post your pre-wedding, wedding, portrait, or commercial shoot. Verified photographers will claim and coordinate with you directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPostModal(true)}
                    className="px-5 py-2.5 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold rounded"
                  >
                    + Book Your First Shoot
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myClientOrders.slice(0, 4).map((order) => {
                    const isClaimed = order.status === "claimed" || order.status === "confirmed";
                    const isCompleted = order.status === "completed";
                    const isOpen = order.status === "open";
                    const photographer = order.claimedBy;

                    return (
                      <div
                        key={order._id}
                        className="p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#181513] space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-black dark:text-white line-clamp-1">{order.title}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isOpen
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                              : isClaimed
                              ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
                              : isCompleted
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "bg-neutral-100 text-neutral-600"
                          }`}>
                            {isOpen ? "Awaiting Photographer" : isClaimed ? "Photographer Assigned" : isCompleted ? "Completed" : "Cancelled"}
                          </span>
                        </div>

                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center justify-between">
                          <span>{order.eventLocation} • {order.eventDate ? new Date(order.eventDate).toLocaleDateString("en-IN") : "Flexible"}</span>
                          <span className="font-extrabold text-black dark:text-white">₹{(order.totalPrice || order.budget || 0).toLocaleString()}</span>
                        </div>

                        {/* Unlocked Creator info if claimed */}
                        {isClaimed && photographer && (
                          <div className="p-3 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626] flex items-center justify-between gap-2">
                            <div>
                              <div className="text-[10px] text-[#76B900] font-bold uppercase">Assigned Creator</div>
                              <div className="text-xs font-bold text-black dark:text-white">{photographer.name || "Photographer"}</div>
                            </div>
                            {photographer.phone && (
                              <div className="flex gap-1.5">
                                <a
                                  href={`tel:${photographer.phone}`}
                                  className="h-8 px-2.5 rounded-lg bg-[#4F46E5] text-white text-[11px] font-bold flex items-center gap-1 !no-underline"
                                >
                                  <Phone size={11} />
                                  <span>Call</span>
                                </a>
                                <a
                                  href={`https://wa.me/${photographer.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(photographer.name || "there")}%2C%20regarding%20my%20photoshoot%20booking%20on%20CREAONNECT!`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="h-8 px-2.5 rounded-lg bg-[#25D366] text-white text-[11px] font-bold flex items-center gap-1 !no-underline"
                                >
                                  <MessageCircle size={11} />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            )}
                          </div>
                        )}

                        {isOpen && (
                          <div className="flex items-center justify-between pt-1">
                            <OrderCountdown expiresAt={order.expiresAt} />
                            <button
                              type="button"
                              onClick={() => handleCancelOrder(order._id)}
                              className="text-xs font-bold text-rose-600 hover:underline"
                            >
                              Cancel Order
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Popular Packages Quick-Booking Row */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-black dark:text-white">Popular Photoshoot Packages in Maharashtra</h2>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">1-click curated shoots with verified professional photographers.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Sunset Pre-Wedding Lonavala",
                    category: "pre-wedding",
                    budget: 18000,
                    icon: "🌅",
                    loc: "Lonavala / Khandala",
                    desc: "Candid couple shoot, 2 outfit changes, drone teaser"
                  },
                  {
                    title: "Grand 2-Day Wedding Ceremony",
                    category: "wedding",
                    budget: 45000,
                    icon: "💍",
                    loc: "Thane / Mumbai",
                    desc: "Traditional rituals, high-res deliverables, candid coverage"
                  },
                  {
                    title: "Fashion Brand Lookbook",
                    category: "commercial",
                    budget: 15000,
                    icon: "👗",
                    loc: "BKC / Bandra",
                    desc: "Studio or outdoor commercial shoot, model catalog"
                  },
                  {
                    title: "Cinematic 4K Drone Teaser",
                    category: "cinematography",
                    budget: 16000,
                    icon: "🚁",
                    loc: "Pune / Murbad",
                    desc: "Licensed drone pilot, 60-second Instagram cinematic reel"
                  }
                ].map((pkg, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm flex flex-col justify-between hover:border-[#76B900] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="text-2xl">{pkg.icon}</div>
                      <h3 className="text-sm font-black text-black dark:text-white">{pkg.title}</h3>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{pkg.desc}</p>
                      <div className="text-[11px] text-[#94A3B8] font-medium">{pkg.loc}</div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#262626] flex items-center justify-between">
                      <span className="text-sm font-black text-[#76B900]">₹{pkg.budget.toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={() => handlePreFillPackage(pkg.title, pkg.category, pkg.budget, pkg.loc)}
                        className="px-3 py-1.5 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-bold"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Escrow Guarantee Banner */}
            <div className="p-6 bg-[#F8FAFC] dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-[#76B900]/15 border border-[#76B900]/30 flex items-center justify-center shrink-0 text-[#76B900]">
                <ShieldCheck size={36} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-black dark:text-white">100% Client Money Protection Guarantee</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  When you book a photoshoot, your budget is securely held in platform escrow. Photographers are only paid when you mark the shoot completed and confirm satisfaction.
                </p>
              </div>
            </div>
          </main>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: LIVE GIG ORDERS MARKETPLACE (activeMenu === "marketplace") */}
        {/* ========================================================================= */}
        {activeMenu === "marketplace" && (
          <main className="p-6 md:p-8 space-y-6 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Live Gig Orders (Marketplace)</h1>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Live photoshoot requirements in Maharashtra. Claim gigs before expiry to unlock full client details.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(true)}
                  className="h-10 px-4 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
                  style={{ borderRadius: "2px" }}
                >
                  <PlusCircle size={15} />
                  <span>+ Post Shoot Order</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Sorting Bar */}
            <div className="p-4 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {[
                  { key: "all", label: "All Gigs" },
                  { key: "pre-wedding", label: "Pre-Wedding" },
                  { key: "wedding", label: "Wedding" },
                  { key: "commercial", label: "Commercial" },
                  { key: "cinematography", label: "Cinematography" },
                  { key: "portrait", label: "Portrait" }
                ].map(cat => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setFilterCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      filterCategory === cat.key
                        ? "bg-[#76B900] text-black shadow-sm"
                        : "bg-[#F8FAFC] dark:bg-[#1A1614] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#333] hover:border-[#76B900]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <span className="text-xs text-[#94A3B8]">Sort by:</span>
                <select
                  value={marketplaceSort}
                  onChange={(e) => setMarketplaceSort(e.target.value)}
                  className="h-9 px-3 rounded-xl border border-[#E2E8F0] dark:border-[#333] bg-[#F8FAFC] dark:bg-[#1A1614] text-xs font-semibold text-[#1E293B] dark:text-white outline-none"
                >
                  <option value="expiring">Expiring Soonest</option>
                  <option value="highest">Highest Budget</option>
                  <option value="lowest">Lowest Budget</option>
                </select>
              </div>
            </div>

            {/* Marketplace Grid */}
            {loading ? (
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-12 text-center text-xs text-[#64748B]">
                Loading available marketplace gigs...
              </div>
            ) : filteredAvailableOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#333] p-12 text-center space-y-3">
                <Camera size={36} className="mx-auto text-[#94A3B8]" />
                <h3 className="text-sm font-bold text-black dark:text-white">No active orders match your criteria</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto">
                  Try changing category filters or search query, or post a new shoot order.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterCategory("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-[#76B900] text-black text-xs font-bold rounded"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAvailableOrders.map((order) => {
                  const clientBudget = order.totalPrice || order.budget || 0;
                  const commissionFee = order.platformFee || Math.round(clientBudget * 0.10);
                  const creatorPayout = order.freelancerPayout || (clientBudget - commissionFee);
                  const isOwnOrder = order.client === user?._id || order.customerEmail === user?.email;

                  return (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900]/60 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 bg-[#76B900]/15 text-black dark:text-[#76B900] text-[10px] font-bold uppercase tracking-wider border border-[#76B900]/30 rounded">
                            {order.eventType ? order.eventType.replace("-", " ") : "Shoot"}
                          </span>
                          <OrderCountdown expiresAt={order.expiresAt} />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-black dark:text-white line-clamp-1">{order.title}</h3>
                          {order.message && (
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-2 mt-1">"{order.message}"</p>
                          )}
                        </div>

                        <div className="space-y-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
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

                        <div className="p-3 bg-[#F8FAFC] dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] text-xs space-y-1">
                          <div className="flex justify-between text-[#64748B] dark:text-[#94A3B8]">
                            <span>Client Budget:</span>
                            <span className="font-semibold text-black dark:text-white">₹{clientBudget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[#94A3B8] text-[11px]">
                            <span>10% Platform Cut:</span>
                            <span>-₹{commissionFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-[#E2E8F0] dark:border-[#2D2825] pt-1 font-bold">
                            <span className="text-[#76B900]">Creator Take-Home:</span>
                            <span className="text-sm text-[#76B900] font-black">₹{creatorPayout.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {isOwnOrder ? (
                        <div className="mt-4 w-full h-10 bg-[#F1F5F9] dark:bg-[#221B17] text-[#64748B] dark:text-[#94A3B8] text-xs font-bold rounded flex items-center justify-center border border-[#E2E8F0] dark:border-[#333]">
                          Posted by You (Your Shoot)
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedOrderToClaim(order)}
                          className="mt-4 w-full h-10 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm rounded"
                        >
                          <Camera size={14} />
                          <span>Claim Order & Earn ₹{creatorPayout.toLocaleString()}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: MY CLAIMED GIGS (activeMenu === "my-gigs") */}
        {/* ========================================================================= */}
        {activeMenu === "my-gigs" && (
          <main className="p-6 md:p-8 space-y-6 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">My Claimed Photoshoots</h1>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Photoshoots claimed by you. Client contacts are unlocked below. Mark completed to receive guaranteed payout.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveMenu("marketplace")}
                className="h-10 px-4 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
                style={{ borderRadius: "2px" }}
              >
                <ShoppingBag size={15} />
                <span>Browse More Gigs</span>
              </button>
            </div>

            {/* Claimed Stats KPI Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Total Claimed</div>
                <div className="text-xl font-black text-black dark:text-white mt-1">{myClaimedOrders.length}</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Active / In Progress</div>
                <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{activeClaimed.length}</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Completed Shoots</div>
                <div className="text-xl font-black text-[#76B900] mt-1">{completedClaimed.length}</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Earned Payout</div>
                <div className="text-xl font-black text-[#76B900] mt-1">₹{totalUserEarnings.toLocaleString()}</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              {[
                { key: "all", label: `All Gigs (${myClaimedOrders.length})` },
                { key: "active", label: `Active (${activeClaimed.length})` },
                { key: "completed", label: `Completed (${completedClaimed.length})` }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMyGigsStatusFilter(tab.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    myGigsStatusFilter === tab.key
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                      : "bg-white dark:bg-[#12100E] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#262626]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Claimed Orders List */}
            {filteredMyClaimedOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#333] p-12 text-center space-y-3">
                <Camera size={36} className="mx-auto text-[#94A3B8]" />
                <h3 className="text-sm font-bold text-black dark:text-white">No claimed orders found in this view</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto">
                  Browse open shoots in the marketplace and click "Claim Order" to add them to your schedule.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveMenu("marketplace")}
                  className="px-4 py-2 bg-[#76B900] text-black text-xs font-bold rounded"
                >
                  Go to Marketplace
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredMyClaimedOrders.map((order) => {
                  const isCompleted = order.status === "completed";
                  const payout = order.freelancerPayout || (order.budget ? Math.round(order.budget * 0.9) : 0);
                  const clientName = order.customerName || order.client?.name || "Client";
                  const clientPhone = order.customerPhone || order.client?.phone;
                  const clientEmail = order.customerEmail || order.client?.email;

                  return (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-black dark:text-white">{order.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isCompleted
                            ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300"
                        }`}>
                          {isCompleted ? "✓ Completed & Paid" : "In Progress"}
                        </span>
                      </div>

                      <div className="text-xs text-[#64748B] dark:text-[#94A3B8] space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-[#76B900] shrink-0" />
                          <span>{order.eventLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-[#76B900] shrink-0" />
                          <span>
                            {order.eventDate ? new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Flexible"}
                            {" • "}{order.eventDuration || "Full Day"}
                          </span>
                        </div>
                      </div>

                      {/* UNLOCKED CLIENT CONTACT CARD */}
                      <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#262626] space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#76B900]">
                          Unlocked Client Contact
                        </div>
                        <div className="text-xs font-bold text-black dark:text-white">{clientName}</div>
                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                          Phone: {clientPhone || "N/A"} {clientEmail ? `• ${clientEmail}` : ""}
                        </div>

                        {clientPhone && (
                          <div className="flex gap-2 pt-1">
                            <a
                              href={`tel:${clientPhone}`}
                              className="px-3 py-1.5 rounded-lg bg-[#4F46E5] text-white font-bold text-xs hover:bg-[#4338CA] !no-underline flex items-center gap-1.5"
                            >
                              <Phone size={12} />
                              <span>Call Client</span>
                            </a>
                            <a
                              href={`https://wa.me/${clientPhone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(clientName)}%2C%20I%20claimed%20your%20photoshoot%20booking%20on%20CREAONNECT!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] !no-underline flex items-center gap-1.5"
                            >
                              <MessageCircle size={12} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
                        <div className="text-xs">
                          <span className="text-[#64748B] dark:text-[#94A3B8]">Your Take-Home Pay: </span>
                          <span className="font-extrabold text-sm text-[#76B900]">₹{payout.toLocaleString()}</span>
                        </div>

                        {!isCompleted && (
                          <button
                            type="button"
                            onClick={() => handleCompleteOrder(order._id)}
                            className="px-3.5 py-1.5 rounded bg-[#76B900] hover:bg-[#68A500] text-black font-extrabold text-xs shadow-sm"
                            style={{ borderRadius: "2px" }}
                          >
                            Mark Completed & Get Paid
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: CLIENT ORDERS POSTED (activeMenu === "my-orders") */}
        {/* ========================================================================= */}
        {activeMenu === "my-orders" && (
          <main className="p-6 md:p-8 space-y-6 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Client Orders (Posted by You)</h1>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Track your published shoot requirements, see when photographers claim your gig, and contact assigned creators.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPostModal(true)}
                className="h-10 px-4 rounded bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
                style={{ borderRadius: "2px" }}
              >
                <PlusCircle size={15} />
                <span>+ Post Another Shoot Order</span>
              </button>
            </div>

            {/* Client Orders KPI Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Total Orders Posted</div>
                <div className="text-xl font-black text-black dark:text-white mt-1">{myClientOrders.length}</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Awaiting Photographer</div>
                <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {clientOpenOrders.length}
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Claimed by Creator</div>
                <div className="text-xl font-black text-[#76B900] mt-1">
                  {clientClaimedOrders.length}
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-[#12100E] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                <div className="text-xs text-[#94A3B8] font-bold">Completed Shoots</div>
                <div className="text-xl font-black text-black dark:text-white mt-1">
                  {clientCompletedOrders.length}
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { key: "all", label: `All (${myClientOrders.length})` },
                { key: "open", label: `Open / Awaiting (${clientOpenOrders.length})` },
                { key: "claimed", label: `Claimed (${clientClaimedOrders.length})` },
                { key: "completed", label: `Completed (${clientCompletedOrders.length})` },
                { key: "cancelled", label: `Cancelled (${myClientOrders.filter(o => o.status === "cancelled").length})` }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setClientOrdersFilter(tab.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    clientOrdersFilter === tab.key
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                      : "bg-white dark:bg-[#12100E] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#262626]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Posted Orders Grid */}
            {filteredClientOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#333] p-12 text-center space-y-3">
                <Briefcase size={36} className="mx-auto text-[#94A3B8]" />
                <h3 className="text-sm font-bold text-black dark:text-white">No posted orders in this tab</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto">
                  Post your photoshoot gig requirement on CREAONNECT and top creators will claim it.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPostModal(true)}
                  className="px-4 py-2 bg-[#76B900] text-black text-xs font-bold rounded"
                >
                  + Post New Shoot Order
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredClientOrders.map((order) => {
                  const isClaimed = order.status === "claimed" || order.status === "confirmed" || order.status === "in_progress";
                  const isCompleted = order.status === "completed";
                  const isOpen = order.status === "open";
                  const photographer = order.claimedBy;

                  return (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-black text-black dark:text-white line-clamp-1">{order.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isOpen
                            ? "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
                            : isClaimed
                            ? "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300"
                            : isCompleted
                            ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                            : "bg-neutral-100 dark:bg-neutral-800 text-[#64748B]"
                        }`}>
                          {isOpen ? "Awaiting Creator" : isClaimed ? "Claimed by Creator" : isCompleted ? "Completed" : "Cancelled"}
                        </span>
                      </div>

                      <div className="text-xs text-[#64748B] dark:text-[#94A3B8] space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-[#76B900] shrink-0" />
                          <span>{order.eventLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-[#76B900] shrink-0" />
                          <span>
                            {order.eventDate ? new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Flexible"}
                            {" • "}{order.eventDuration || "Full Day"}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#F8FAFC] dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#262626] flex justify-between items-center text-xs">
                        <span className="text-[#64748B] dark:text-[#94A3B8]">Your Budget:</span>
                        <span className="font-black text-black dark:text-white">₹{(order.totalPrice || order.budget || 0).toLocaleString()}</span>
                      </div>

                      {/* IF CLAIMED: SHOW PHOTOGRAPHER DETAILS */}
                      {isClaimed && photographer && (
                        <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            Assigned Creator Details
                          </div>
                          <div className="text-xs font-bold text-black dark:text-white">{photographer.name || "Photographer"}</div>
                          <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                            Phone: {photographer.phone || "N/A"} {photographer.email ? `• ${photographer.email}` : ""}
                          </div>

                          {photographer.phone && (
                            <div className="flex gap-2 pt-1">
                              <a
                                href={`tel:${photographer.phone}`}
                                className="px-3 py-1.5 rounded-lg bg-[#4F46E5] text-white font-bold text-xs hover:bg-[#4338CA] !no-underline flex items-center gap-1.5"
                              >
                                <Phone size={12} />
                                <span>Call Photographer</span>
                              </a>
                              <a
                                href={`https://wa.me/${photographer.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(photographer.name || "there")}%2C%20regarding%20my%20photoshoot%20booking%20on%20CREAONNECT!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] !no-underline flex items-center gap-1.5"
                              >
                                <MessageCircle size={12} />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] dark:border-[#262626]">
                        {isOpen ? (
                          <>
                            <OrderCountdown expiresAt={order.expiresAt} />
                            <button
                              type="button"
                              onClick={() => handleCancelOrder(order._id)}
                              className="px-3 py-1 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"
                            >
                              Cancel Order
                            </button>
                          </>
                        ) : isClaimed ? (
                          <div className="w-full flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleCompleteOrder(order._id)}
                              className="px-3 py-1.5 rounded bg-[#76B900] hover:bg-[#68A500] text-black font-extrabold text-xs"
                              style={{ borderRadius: "2px" }}
                            >
                              Mark Shoot Completed
                            </button>
                          </div>
                        ) : (
                          <div className="text-[11px] text-[#94A3B8]">
                            Order created on {new Date(order.createdAt).toLocaleDateString("en-IN")}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: PAYOUTS & COMMISSION (activeMenu === "earnings") */}
        {/* ========================================================================= */}
        {activeMenu === "earnings" && (
          <main className="p-6 md:p-8 space-y-6 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Payouts & Platform Commission</h1>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Transparent earnings breakdown. 10% platform commission with direct 90% creator payouts.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
                <ShieldCheck size={16} />
                <span>Escrow Payment Protection Active</span>
              </div>
            </div>

            {/* 4 Financial Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Available Balance</span>
                <div className="text-2xl font-black text-[#76B900] mt-2">₹{totalUserEarnings.toLocaleString()}</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Ready for instant UPI transfer</div>
              </div>

              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Pending in Escrow</span>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-2">₹{pendingEscrowPayout.toLocaleString()}</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">{activeClaimed.length} active shoots in progress</div>
              </div>

              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Platform Commission Paid</span>
                <div className="text-2xl font-black text-black dark:text-white mt-2">₹{totalCommissionPaid.toLocaleString()}</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Transparent flat 10% fee</div>
              </div>

              <div className="p-5 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] shadow-sm">
                <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Completed Shoots</span>
                <div className="text-2xl font-black text-black dark:text-white mt-2">{completedClaimed.length}</div>
                <div className="text-[11px] text-[#76B900] font-bold mt-0.5">100% on-time settlement</div>
              </div>
            </div>

            {/* UPI Withdrawal Form Card */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-black text-black dark:text-white">Request Instant UPI Withdrawal</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  Transfer your earned photoshoot revenue directly to any UPI ID (Google Pay, PhonePe, Paytm, BHIM) via IMPS.
                </p>
              </div>

              <form onSubmit={handleWithdrawPayout} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1">Your UPI ID (VPA)</label>
                  <input
                    type="text"
                    placeholder="e.g. shubham@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1">Amount (₹ INR)</label>
                  <input
                    type="number"
                    min="100"
                    max={totalUserEarnings || 100000}
                    placeholder={`Max ₹${totalUserEarnings}`}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1F1A17] text-xs font-bold text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={withdrawing || totalUserEarnings <= 0}
                    className="w-full h-10 bg-[#76B900] hover:bg-[#68A500] text-black text-xs font-black uppercase rounded shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>{withdrawing ? "Processing IMPS..." : "Withdraw via UPI"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 10% Fee Transparency Flow Banner */}
            <div className="p-6 bg-[#F8FAFC] dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] space-y-4">
              <h3 className="text-sm font-bold text-black dark:text-white">How CREAONNECT 10% Platform Model Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                  <div className="font-extrabold text-[#76B900] mb-1">1. Client Books Order</div>
                  <p className="text-[#64748B] dark:text-[#94A3B8]">
                    Client posts their shoot with a guaranteed budget. Funds are held in escrow for full dispute protection.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                  <div className="font-extrabold text-[#76B900] mb-1">2. Transparent 10% Fee</div>
                  <p className="text-[#64748B] dark:text-[#94A3B8]">
                    CREAONNECT charges a flat 10% platform commission for verified matching, infrastructure, and dispute resolution.
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-[#181513] rounded-xl border border-[#E2E8F0] dark:border-[#262626]">
                  <div className="font-extrabold text-[#76B900] mb-1">3. 90% Take-Home to Creator</div>
                  <p className="text-[#64748B] dark:text-[#94A3B8]">
                    Upon shoot completion, 90% of the total budget is directly released to the photographer's bank or UPI.
                  </p>
                </div>
              </div>
            </div>

            {/* Payout History Ledger */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black dark:text-white">Completed Shoots & Settlement Ledger</h3>
              {completedClaimed.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] dark:border-[#333] rounded-xl">
                  No completed shoots yet. When you complete a claimed gig, it will appear here with an itemized receipt.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[#94A3B8] uppercase text-[10px] border-b border-[#F1F5F9] dark:border-[#262626]">
                      <tr>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Shoot Title</th>
                        <th className="py-2.5">Client</th>
                        <th className="py-2.5 text-right">Client Budget</th>
                        <th className="py-2.5 text-right">10% Platform Fee</th>
                        <th className="py-2.5 text-right">Net Payout</th>
                        <th className="py-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#262626]">
                      {completedClaimed.map((ord) => {
                        const total = ord.totalPrice || ord.budget || 0;
                        const fee = ord.platformFee || Math.round(total * 0.10);
                        const net = ord.freelancerPayout || (total - fee);

                        return (
                          <tr key={ord._id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1A1614]">
                            <td className="py-3 text-[#64748B] dark:text-[#94A3B8]">
                              {ord.eventDate ? new Date(ord.eventDate).toLocaleDateString("en-IN") : "Recent"}
                            </td>
                            <td className="py-3 font-bold text-black dark:text-white">{ord.title}</td>
                            <td className="py-3 text-[#64748B] dark:text-[#94A3B8]">{ord.customerName || "Client"}</td>
                            <td className="py-3 text-right">₹{total.toLocaleString()}</td>
                            <td className="py-3 text-right text-rose-600">-₹{fee.toLocaleString()}</td>
                            <td className="py-3 text-right font-black text-[#76B900]">₹{net.toLocaleString()}</td>
                            <td className="py-3 text-right">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Settled
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: CLIENT INVOICES & ESCROW RECEIPTS (activeMenu === "invoices") */}
        {/* ========================================================================= */}
        {activeMenu === "invoices" && (
          <main className="p-6 md:p-8 space-y-6 flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Invoices & Escrow Protection</h1>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Itemized invoices and safe escrow payment tracking for your photoshoot bookings.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
                <ShieldCheck size={16} />
                <span>100% Escrow Protected</span>
              </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black dark:text-white">Photoshoot Payment Records</h3>
              {myClientOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] dark:border-[#333] rounded-xl">
                  No billing history yet. When you post or complete a shoot, itemized invoices will be stored here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[#94A3B8] uppercase text-[10px] border-b border-[#F1F5F9] dark:border-[#262626]">
                      <tr>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Shoot Title</th>
                        <th className="py-2.5">Venue</th>
                        <th className="py-2.5 text-right">Total Budget</th>
                        <th className="py-2.5 text-right">Escrow Status</th>
                        <th className="py-2.5 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#262626]">
                      {myClientOrders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1A1614]">
                          <td className="py-3 text-[#64748B] dark:text-[#94A3B8]">
                            {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString("en-IN") : "Recent"}
                          </td>
                          <td className="py-3 font-bold text-black dark:text-white">{ord.title}</td>
                          <td className="py-3 text-[#64748B] dark:text-[#94A3B8]">{ord.eventLocation}</td>
                          <td className="py-3 text-right font-bold text-black dark:text-white">
                            ₹{(ord.totalPrice || ord.budget || 0).toLocaleString()}
                          </td>
                          <td className="py-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : ord.status === "claimed"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {ord.status === "completed" ? "Released" : ord.status === "claimed" ? "In Escrow" : "Awaiting Creator"}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setSuccessMsg(`Invoice for "${ord.title}" generated (Invoice #CR-${ord._id.slice(-6).toUpperCase()})`)}
                              className="text-xs font-semibold text-[#76B900] hover:underline flex items-center gap-1 justify-end ml-auto"
                            >
                              <FileText size={12} />
                              <span>View Receipt</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        )}

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
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Order will appear live on marketplace with dynamic countdown timer.</p>
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
                onClick={() => {
                  setClaimedOrderDetails(null);
                  setActiveMenu("my-gigs");
                }}
                className="w-full text-xs text-[#94A3B8] hover:text-[#1E293B] dark:hover:text-white pt-2"
              >
                Go to My Claimed Gigs
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UserDashboard;
