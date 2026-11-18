import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileCode,
  Inbox,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  UserPlus,
  Trash2,
  PlusCircle,
  Paperclip,
  ExternalLink,
  Sliders,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Phone,
  ArrowRight,
  Eye,
  RefreshCw,
  Users,
  Rocket,
  Clock,
  Send,
  X,
  Check
} from "lucide-react";
import AdminCMSManager from "./AdminCMSManager";

const AdminWorkspaceContent = ({
  activeMenu,
  setActiveMenu,
  adminStats,
  adminBookings = [],
  adminLeads = [],
  adminStaff = [],
  adminTasks = [],
  adminMarketplaceStats,
  loadingAdminData,
  formatDate,
  handleAssignBooking,
  handleUpdateBookingStatus,
  handleLaunchOrderToMarketplace,
  handleAssignLead,
  handleUpdateLeadStatus,
  handleCreateTask,
  handleUpdateTaskStatus,
  handleAssignTask,
  handleDeleteTask,
  handleRegisterStaff,
  handleDeleteStaff,
  newTask,
  setNewTask,
  selectedTaskFiles,
  setSelectedTaskFiles,
  creatingTask,
  taskError,
  taskSuccess,
  newStaff,
  setNewStaff,
  registeringStaff,
  regError,
  regSuccess
}) => {
  const [launchModalBooking, setLaunchModalBooking] = useState(null);
  const [launchHours, setLaunchHours] = useState(24);
  const [launchNotes, setLaunchNotes] = useState("");
  const [launchingId, setLaunchingId] = useState(null);
  const [bookingsFilter, setBookingsFilter] = useState("all");
  const [actionSuccess, setActionSuccess] = useState("");

  const pendingLaunchBookings = useMemo(() => {
    return adminBookings.filter(b => b.status === "pending" || !b.isLaunched);
  }, [adminBookings]);

  const liveHubBookings = useMemo(() => {
    return adminBookings.filter(b => b.status === "open" && b.isLaunched);
  }, [adminBookings]);

  const filteredAdminBookings = useMemo(() => {
    if (bookingsFilter === "pending_launch") return pendingLaunchBookings;
    if (bookingsFilter === "open") return liveHubBookings;
    if (bookingsFilter === "confirmed") return adminBookings.filter(b => b.status === "confirmed");
    if (bookingsFilter === "completed") return adminBookings.filter(b => b.status === "completed");
    return adminBookings;
  }, [adminBookings, bookingsFilter, pendingLaunchBookings, liveHubBookings]);

  const onConfirmLaunch = async (booking) => {
    if (!booking || !handleLaunchOrderToMarketplace) return;
    setLaunchingId(booking._id);
    try {
      await handleLaunchOrderToMarketplace(booking._id, {
        expiryHours: launchHours,
        notes: launchNotes
      });
      setActionSuccess(`Order "${booking.title || booking.customerName}" successfully launched to Creator Hub!`);
      setTimeout(() => setActionSuccess(""), 4500);
      setLaunchModalBooking(null);
      setLaunchNotes("");
    } catch (err) {
      console.error("Launch error:", err);
    } finally {
      setLaunchingId(null);
    }
  };

  // Dynamic Category Breakdown for Admin
  const { adminCategories, adminTopCategory } = useMemo(() => {
    const counts = {};
    adminBookings.forEach(b => {
      const cat = (b.eventType || b.category || "other").toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    const total = adminBookings.length;
    const config = [
      { key: "pre-wedding", label: "Pre-Wedding", color: "#76B900" },
      { key: "wedding", label: "Wedding", color: "#38bdf8" },
      { key: "commercial", label: "Commercial", color: "#f59e0b" },
      { key: "other", label: "Studio & Other", color: "#94A3B8" }
    ];
    const results = config.map(c => {
      const count = counts[c.key] || 0;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      return { ...c, count, percentage: pct };
    });
    const sorted = [...results].sort((a, b) => b.percentage - a.percentage);
    const top = total > 0 && sorted[0].count > 0 ? sorted[0] : { label: "No Orders Yet", percentage: 0, count: 0 };
    return { adminCategories: results, adminTopCategory: top };
  }, [adminBookings]);

  // Dynamic 12-Month Bar Chart for Admin
  const adminBarChartData = useMemo(() => {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const monthTotals = months.map(m => ({ m, volume: 0, count: 0 }));
    adminBookings.forEach(b => {
      const d = b.eventDate || b.createdAt ? new Date(b.eventDate || b.createdAt) : new Date();
      const mIdx = d.getMonth();
      const val = b.totalPrice || b.budget || 0;
      if (monthTotals[mIdx]) {
        monthTotals[mIdx].volume += val;
        monthTotals[mIdx].count += 1;
      }
    });
    const maxVol = Math.max(...monthTotals.map(m => m.volume), 1);
    const hasAny = adminBookings.length > 0;
    return monthTotals.map(item => {
      const hasReal = item.volume > 0;
      const v1 = hasReal ? Math.max(15, Math.min(95, Math.round((item.volume / maxVol) * 90))) : (hasAny ? 4 : 2);
      const v2 = hasReal ? Math.round(v1 * 0.55) : 0;
      return { m: item.m, v1, v2, volume: item.volume };
    });
  }, [adminBookings]);

  const gmv = adminMarketplaceStats?.financials?.grossMerchandiseValue ||
    adminBookings.reduce((acc, b) => acc + (b.totalPrice || b.budget || 0), 0);
  const platformFee = adminMarketplaceStats?.financials?.totalPlatformCommission || Math.round(gmv * 0.10);
  const creatorPayouts = adminMarketplaceStats?.financials?.totalCreatorPayouts || Math.round(gmv * 0.90);

  return (
    <div className="flex-1 bg-[#F8F9FD] dark:bg-[#0C0A09]">
      {/* ========================================================================= */}
      {/* VIEW 0A: ADMIN DASHBOARD OVERVIEW (activeMenu === "admin-overview") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-overview" && (
        <main className="p-6 md:p-8 space-y-8">
          {/* Heading Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Admin Workspace Overview</h1>
                <span className="px-2 py-0.5 rounded bg-[#76B900]/20 text-[#76B900] text-[10px] font-extrabold uppercase">
                  Admin Master
                </span>
              </div>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Real-time control center for wedding bookings, enquiries, dev tasks, staff, and marketplace volume.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveMenu("admin-tasks")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1A1614] border border-[#E2E8F0] dark:border-[#2D2825] text-xs font-bold text-black dark:text-white hover:border-[#76B900] transition-colors"
              >
                <PlusCircle size={14} className="text-[#76B900]" />
                <span>+ Add Dev Task</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMenu("admin-bookings")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#76B900] text-black font-extrabold text-xs shadow-md shadow-[#76B900]/20 hover:bg-[#86c910] transition-transform active:scale-95"
              >
                <Calendar size={14} />
                <span>Manage Bookings</span>
              </button>
            </div>
          </div>

          {/* Action Success Toast */}
          {actionSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess("")} className="text-emerald-500 hover:text-emerald-400">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Alert Banner: Orders Awaiting Admin Launch to Creator Hub */}
          {pendingLaunchBookings.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#76B900] text-black flex items-center justify-center font-black shrink-0 shadow-sm">
                  <Rocket size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-black dark:text-white">
                      {pendingLaunchBookings.length} Photoshoot Order{pendingLaunchBookings.length > 1 ? "s" : ""} Awaiting Launch to Creator Hub
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold uppercase">
                      Admin Review Required
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                    Clients booked these shoots. They are hidden from creators until you review details and launch them to the marketplace.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setBookingsFilter("pending_launch");
                    setActiveMenu("admin-bookings");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#76B900] hover:bg-[#86c910] text-black text-xs font-black transition-all flex items-center gap-2 shadow-sm active:scale-95"
                >
                  <Rocket size={14} />
                  <span>Review & Launch ({pendingLaunchBookings.length})</span>
                </button>
              </div>
            </div>
          )}

          {/* Top Analytics Cards Grid (Matches Creator Hub exactly) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Revenue & Financials (Dynamic 2-col) */}
            <div className="lg:col-span-2 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Gross Merchandise Value (Dynamic)</span>
                  <button
                    type="button"
                    onClick={() => setActiveMenu("admin-marketplace")}
                    className="text-xs font-bold text-[#76B900] hover:underline"
                  >
                    View Marketplace Ledger
                  </button>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-black dark:text-white tracking-tight">
                    ₹{gmv.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-[#76B900] flex items-center gap-0.5">
                    <TrendingUp size={12} /> +12.4% vs last week
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Platform fee (10%): ₹{platformFee.toLocaleString()} • Creator payouts: ₹{creatorPayouts.toLocaleString()}
                </p>
              </div>

              {/* Dynamic Bar Graph Mock */}
              <div className="mt-8 space-y-2">
                <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2 border-b border-[#F1F5F9] dark:border-[#262626]">
                  {adminBarChartData.map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-28">
                        <div
                          style={{ height: `${bar.v1}%` }}
                          className={`w-full max-w-[8px] sm:max-w-[12px] rounded-t-sm transition-all group-hover:brightness-110 ${
                            bar.volume > 0 ? "bg-[#76B900]" : "bg-[#76B900]/20"
                          }`}
                        />
                        <div
                          style={{ height: `${bar.v2}%` }}
                          className={`w-full max-w-[8px] sm:max-w-[12px] rounded-t-sm transition-all ${
                            bar.volume > 0 ? "bg-[#64748B]/40 dark:bg-[#333]" : "bg-transparent"
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-[#94A3B8] font-bold">{bar.m}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#76B900]" /> Active Orders (Take-Home Pay 90%)
                    </span>
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#64748B]/40 dark:bg-[#333]" /> Platform Commission (10%)
                    </span>
                  </div>
                  <span className="text-[#76B900] font-bold hidden sm:inline">• Live Pipeline Active</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Shoot Categories Donut Breakdown */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">Shoot Categories (Live Breakdown)</span>
                  <button
                    type="button"
                    onClick={() => setActiveMenu("admin-bookings")}
                    className="text-xs font-bold text-[#76B900] hover:underline"
                  >
                    View All Shoots
                  </button>
                </div>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1">
                  Calculated across {adminBookings.length} recorded shoots & enquiries
                </p>
              </div>

              {/* Donut Graphic */}
              <div className="py-6 flex flex-col items-center justify-center relative">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#64748B]/20 dark:text-[#262626]"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {adminCategories.filter(c => c.percentage > 0).map((c, i, arr) => {
                      const prevSum = arr.slice(0, i).reduce((sum, item) => sum + item.percentage, 0);
                      return (
                        <path
                          key={c.key}
                          className="transition-all"
                          stroke={c.color}
                          strokeDasharray={`${c.percentage}, 100`}
                          strokeDashoffset={-prevSum}
                          strokeWidth="4"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-xl font-black text-black dark:text-white">
                      {adminBookings.length}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">Shoots</span>
                  </div>
                </div>

                {/* Floating Category Tag */}
                <div className="mt-3 px-3 py-1.5 rounded-xl bg-black dark:bg-[#1A1614] border border-[#333] text-center shadow-lg">
                  <p className="text-[9px] uppercase tracking-wider text-[#94A3B8] font-bold">Top Category</p>
                  <p className="text-xs font-black text-white">
                    {adminTopCategory.label} &bull; {adminTopCategory.percentage}%
                  </p>
                </div>
              </div>

              {/* Donut Legend */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F1F5F9] dark:border-[#262626] text-center">
                {adminCategories.slice(0, 3).map((c) => (
                  <div key={c.key}>
                    <div className="text-xs font-bold text-black dark:text-white">{c.percentage}%</div>
                    <div className="text-[10px] font-semibold flex items-center justify-center gap-1" style={{ color: c.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} /> {c.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Bookings */}
            <div
              onClick={() => setActiveMenu("admin-bookings")}
              className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[#64748B] dark:text-[#94A3B8]">
                <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
                <Calendar size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-black text-black dark:text-white">{adminStats.bookings.total}</span>
                <span className="text-xs font-bold text-[#76B900] bg-[#76B900]/10 px-2 py-0.5 rounded-full">
                  {adminStats.bookings.confirmed} Confirmed
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                {adminStats.bookings.pending} pending confirmation
              </p>
            </div>

            {/* Card 2: Website Tasks */}
            <div
              onClick={() => setActiveMenu("admin-tasks")}
              className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[#64748B] dark:text-[#94A3B8]">
                <span className="text-xs font-bold uppercase tracking-wider">Website Tasks</span>
                <FileCode size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-black text-black dark:text-white">
                  {adminStats.tasks.in_progress} / {adminStats.tasks.total}
                </span>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  {adminStats.tasks.todo} To Do
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                {adminStats.tasks.completed} completed by team
              </p>
            </div>

            {/* Card 3: Total Enquiries */}
            <div
              onClick={() => setActiveMenu("admin-leads")}
              className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[#64748B] dark:text-[#94A3B8]">
                <span className="text-xs font-bold uppercase tracking-wider">Customer Enquiries</span>
                <Inbox size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-black text-black dark:text-white">{adminStats.leads.total}</span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {adminStats.leads.new} New Unread
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                Website leads awaiting response
              </p>
            </div>

            {/* Card 4: Marketplace Volume */}
            <div
              onClick={() => setActiveMenu("admin-marketplace")}
              className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-5 shadow-sm hover:border-[#76B900] transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[#64748B] dark:text-[#94A3B8]">
                <span className="text-xs font-bold uppercase tracking-wider">Marketplace Gigs</span>
                <ShoppingBag size={18} className="text-[#76B900] group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-black text-black dark:text-white">
                  {adminMarketplaceStats?.totalOrders || adminBookings.length}
                </span>
                <span className="text-xs font-bold text-[#76B900] bg-[#76B900]/10 px-2 py-0.5 rounded-full">
                  10% Escrow
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-1.5">
                ₹{platformFee.toLocaleString()} commission earned
              </p>
            </div>
          </div>

          {/* Lower Section: Recent Bookings & Recent Enquiries Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings Box */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white">Recent Shoots & Bookings</h3>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Latest client bookings awaiting or confirmed</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMenu("admin-bookings")}
                  className="text-xs font-bold text-[#76B900] hover:underline"
                >
                  View All ({adminBookings.length})
                </button>
              </div>

              {adminBookings.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] dark:border-[#333] rounded-xl">
                  No bookings found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[#94A3B8] uppercase text-[10px] border-b border-[#F1F5F9] dark:border-[#262626]">
                      <tr>
                        <th className="py-2.5">Client</th>
                        <th className="py-2.5">Service & Date</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5">Creator Hub</th>
                        <th className="py-2.5 text-right">Staff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#262626]">
                      {adminBookings.slice(0, 5).map((b) => (
                        <tr key={b._id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1A1614]">
                          <td className="py-2.5 pr-2">
                            <p className="font-bold text-black dark:text-white truncate">{b.customerName}</p>
                            <p className="text-[10px] text-[#64748B] dark:text-[#94A3B8]">{b.customerPhone}</p>
                          </td>
                          <td className="py-2.5 pr-2">
                            <p className="font-semibold text-black dark:text-white truncate">{b.service?.name || b.title || "Custom Shoot"}</p>
                            <p className="text-[10px] text-[#76B900]">{formatDate(b.eventDate)}</p>
                          </td>
                          <td className="py-2.5 pr-2">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${b.status === "confirmed"
                              ? "bg-green-500/10 text-green-500 border border-green-500/20"
                              : b.status === "completed"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-2.5 pr-2">
                            {b.status === "pending" || !b.isLaunched ? (
                              <button
                                type="button"
                                onClick={() => setLaunchModalBooking(b)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#76B900] hover:bg-[#86c910] text-black font-extrabold text-[10px] shadow-sm transition-transform active:scale-95"
                              >
                                <Rocket size={11} />
                                <span>🚀 Launch</span>
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live on Hub
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-right font-medium text-black dark:text-white text-[11px]">
                            {b.assignedTo?.name || "Unassigned"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Enquiries Box */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white">Recent Customer Leads</h3>
                  <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">Direct enquiries submitted via contact desk</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveMenu("admin-leads")}
                  className="text-xs font-bold text-[#76B900] hover:underline"
                >
                  View All ({adminLeads.length})
                </button>
              </div>

              {adminLeads.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] dark:border-[#333] rounded-xl">
                  No enquiries received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {adminLeads.slice(0, 4).map((l) => (
                    <div
                      key={l._id}
                      className="p-3 rounded-xl border border-[#E2E8F0] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#1A1614] flex items-center justify-between gap-3"
                    >
                      <div className="truncate flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-black dark:text-white truncate">{l.name}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${l.status === "new" ? "bg-emerald-500/15 text-emerald-500" : "bg-gray-500/15 text-gray-400"
                            }`}>
                            {l.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                          {l.service || "General Inquiry"} &bull; {l.phone}
                        </p>
                        {l.message && (
                          <p className="text-[10px] text-[#94A3B8] italic truncate mt-0.5">&ldquo;{l.message}&rdquo;</p>
                        )}
                      </div>
                      <a
                        href={`tel:${l.phone}`}
                        className="px-2.5 py-1.5 rounded-lg bg-[#76B900] text-black font-bold text-[11px] flex items-center gap-1 shrink-0 hover:bg-[#86c910]"
                      >
                        <Phone size={11} />
                        <span>Call</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW 7: ADMIN BOOKINGS (activeMenu === "admin-bookings") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-bookings" && (
        <main className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Shoot Bookings & Creator Launch</h1>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Review client bookings, launch orders live to creator dashboards, and assign studio team members.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
              <Calendar size={15} />
              <span>{adminBookings.length} Recorded Bookings</span>
            </div>
          </div>

          {/* Action Success Toast */}
          {actionSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess("")} className="text-emerald-500 hover:text-emerald-400">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { key: "all", label: `All Bookings (${adminBookings.length})` },
              { key: "pending_launch", label: `🚀 Pending Launch (${pendingLaunchBookings.length})`, highlight: pendingLaunchBookings.length > 0 },
              { key: "open", label: `● Live on Creator Hub (${liveHubBookings.length})` },
              { key: "confirmed", label: `✓ Confirmed (${adminBookings.filter(b => b.status === 'confirmed').length})` },
              { key: "completed", label: `Completed (${adminBookings.filter(b => b.status === 'completed').length})` }
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setBookingsFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  bookingsFilter === tab.key
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : tab.highlight
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-black"
                    : "bg-white dark:bg-[#12100E] text-[#64748B] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#262626]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm">
            {filteredAdminBookings.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#94A3B8]">No bookings found in this filter tab.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[#94A3B8] uppercase text-[10px] border-b border-[#F1F5F9] dark:border-[#262626]">
                    <tr>
                      <th className="py-3 font-bold">Client / Contact</th>
                      <th className="py-3 font-bold">Service / Date</th>
                      <th className="py-3 font-bold">Budget & Payout</th>
                      <th className="py-3 font-bold">Status</th>
                      <th className="py-3 font-bold">Marketplace Launch</th>
                      <th className="py-3 font-bold">Assigned Staff</th>
                      <th className="py-3 font-bold text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#262626]">
                    {filteredAdminBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1A1614]">
                        <td className="py-3.5 pr-3">
                          <p className="font-bold text-black dark:text-white">{b.customerName}</p>
                          <p className="text-[#64748B] dark:text-[#94A3B8]">{b.customerPhone}</p>
                          <p className="text-[10px] text-[#94A3B8]">{b.customerEmail}</p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <p className="font-bold text-black dark:text-white">{b.service?.name || b.title || "Custom Shoot"}</p>
                          <p className="text-[#76B900] font-semibold">{formatDate(b.eventDate)}</p>
                          <p className="text-[10px] text-[#94A3B8]">{b.eventLocation}</p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <p className="font-black text-black dark:text-white">₹{(b.totalPrice || b.budget || 0).toLocaleString()}</p>
                          <p className="text-[10px] text-[#76B900] font-semibold">
                            Creator: ₹{(b.freelancerPayout || Math.round((b.totalPrice || b.budget || 0) * 0.9)).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-[#94A3B8]">
                            Platform (10%): ₹{(b.platformFee || Math.round((b.totalPrice || b.budget || 0) * 0.1)).toLocaleString()}
                          </p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${b.status === "confirmed"
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : b.status === "completed"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : b.status === "cancelled"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 pr-3">
                          {b.status === "pending" || !b.isLaunched ? (
                            <button
                              type="button"
                              onClick={() => setLaunchModalBooking(b)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#76B900] hover:bg-[#86c910] text-black text-xs font-black shadow-sm transition-all active:scale-95 whitespace-nowrap"
                            >
                              <Rocket size={13} />
                              <span>🚀 Launch to Creators</span>
                            </button>
                          ) : (
                            <div className="flex flex-col">
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live on Hub
                              </span>
                              <span className="text-[10px] text-[#94A3B8]">
                                {b.expiresAt && new Date(b.expiresAt) > new Date()
                                  ? `${Math.max(1, Math.round((new Date(b.expiresAt) - new Date()) / 3600000))}h left`
                                  : 'Circulating'}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <UserCheck size={14} className="text-[#94A3B8]" />
                            <select
                              value={b.assignedTo?._id || b.assignedTo || ""}
                              onChange={(e) => handleAssignBooking(b._id, e.target.value)}
                              className="rounded-lg border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1A1614] px-2 py-1 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                            >
                              <option value="">Unassigned</option>
                              {adminStaff.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="py-3.5 text-right">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                            className="rounded-lg border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1A1614] px-2 py-1 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
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

      {/* ========================================================================= */}
      {/* VIEW 8: ADMIN LEADS & ENQUIRIES (activeMenu === "admin-leads") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-leads" && (
        <main className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Customer Enquiries & Leads</h1>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Incoming inquiries from prospective clients requesting photography, design, or web projects.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
              <Inbox size={15} />
              <span>{adminLeads.length} Total Enquiries</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm">
            {adminLeads.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#94A3B8]">No customer enquiries received yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[#94A3B8] uppercase text-[10px] border-b border-[#F1F5F9] dark:border-[#262626]">
                    <tr>
                      <th className="py-3 font-bold">Client / Sender</th>
                      <th className="py-3 font-bold">Service / Date</th>
                      <th className="py-3 font-bold">Message</th>
                      <th className="py-3 font-bold">Assigned Staff</th>
                      <th className="py-3 font-bold text-right">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#262626]">
                    {adminLeads.map((l) => (
                      <tr key={l._id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1A1614]">
                        <td className="py-3.5 pr-3">
                          <p className="font-bold text-black dark:text-white">{l.name}</p>
                          <a href={`tel:${l.phone}`} className="text-[#76B900] hover:underline block font-semibold">{l.phone}</a>
                          {l.email && <p className="text-[10px] text-[#94A3B8]">{l.email}</p>}
                        </td>
                        <td className="py-3.5 pr-3">
                          <p className="font-bold text-black dark:text-white">{l.service || "General Inquiry"}</p>
                          {l.preferredDate && <p className="text-[#76B900] text-[11px]">{formatDate(l.preferredDate)}</p>}
                        </td>
                        <td className="py-3.5 pr-3 max-w-[220px]">
                          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-2" title={l.message}>
                            {l.message || "No message provided."}
                          </p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <UserCheck size={14} className="text-[#94A3B8]" />
                            <select
                              value={l.assignedTo?._id || l.assignedTo || ""}
                              onChange={(e) => handleAssignLead(l._id, e.target.value)}
                              className="rounded-lg border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1A1614] px-2 py-1 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                            >
                              <option value="">Unassigned</option>
                              {adminStaff.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="py-3.5 text-right">
                          <select
                            value={l.status}
                            onChange={(e) => handleUpdateLeadStatus(l._id, e.target.value)}
                            className="rounded-lg border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#1A1614] px-2 py-1 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="closed">Closed</option>
                          </select>
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

      {/* ========================================================================= */}
      {/* VIEW 9: ADMIN WEBSITE TASKS (activeMenu === "admin-tasks") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-tasks" && (
        <main className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Website Development Tasks</h1>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Assign development tasks, upload design mockups, and track website features through completion.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
              <FileCode size={15} />
              <span>{adminTasks.length} Development Tasks</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Task Form */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#76B900]">
                <PlusCircle size={18} />
                <h3 className="text-sm font-bold text-black dark:text-white">New Task</h3>
              </div>

              {taskError && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-500 font-semibold">
                  {taskError}
                </div>
              )}
              {taskSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-500 font-semibold">
                  {taskSuccess}
                </div>
              )}

              <form onSubmit={handleCreateTask} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g. Build gallery filter"
                    className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Provide details on required work..."
                    className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Assign Staff</label>
                  <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  >
                    <option value="">Unassigned</option>
                    {adminStaff.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1 flex items-center gap-1">
                    <Paperclip size={12} />
                    <span>Attach Mockups / Files</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedTaskFiles(Array.from(e.target.files))}
                    className="w-full text-xs text-[#64748B] dark:text-[#94A3B8] file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-[#76B900] file:text-black file:font-bold cursor-pointer"
                  />
                  {selectedTaskFiles.length > 0 && (
                    <p className="text-[10px] text-[#76B900] mt-1 font-bold">
                      {selectedTaskFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={creatingTask}
                  className="w-full py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs shadow-md shadow-[#76B900]/20 hover:bg-[#86c910] disabled:opacity-50 transition-all"
                >
                  {creatingTask ? "Creating Task..." : "Create & Assign Task"}
                </button>
              </form>
            </div>

            {/* Tasks Board List */}
            <div className="lg:col-span-2 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                <FileCode size={16} className="text-[#76B900]" />
                <span>Development Board ({adminTasks.length})</span>
              </h3>

              {adminTasks.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] dark:border-[#333] rounded-xl">
                  No development tasks created yet.
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {adminTasks.map((t) => (
                    <div
                      key={t._id}
                      className="rounded-xl border border-[#E2E8F0] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#1A1614] p-4 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-black dark:text-white">{t.title}</h4>
                          {t.description && (
                            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">{t.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(t._id)}
                          className="text-red-400 hover:text-red-500 p-1 rounded hover:bg-red-500/10"
                          title="Delete task"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {t.attachments && t.attachments.length > 0 && (
                        <div className="py-1">
                          <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">
                            Attachments ({t.attachments.length})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {t.attachments.map((url, idx) => (
                              <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-lg border border-[#E2E8F0] dark:border-[#333] overflow-hidden flex items-center justify-center group relative"
                              >
                                <img src={url} alt="Attachment" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <ExternalLink size={11} className="text-[#76B900]" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2E8F0] dark:border-[#262626] text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${t.priority === "high"
                            ? "bg-red-500/15 text-red-500"
                            : t.priority === "low"
                              ? "bg-blue-500/15 text-blue-400"
                              : "bg-amber-500/15 text-amber-500"
                            }`}>
                            {t.priority}
                          </span>
                          {t.dueDate && <span className="text-[#94A3B8]">Due: {formatDate(t.dueDate)}</span>}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[#94A3B8]">Assign:</span>
                            <select
                              value={t.assignedTo?._id || t.assignedTo || ""}
                              onChange={(e) => handleAssignTask(t._id, e.target.value)}
                              className="rounded border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#12100E] px-1.5 py-0.5 text-[10px] text-black dark:text-white"
                            >
                              <option value="">Unassigned</option>
                              {adminStaff.map((s) => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-[#94A3B8]">Status:</span>
                            <select
                              value={t.status}
                              onChange={(e) => handleUpdateTaskStatus(t._id, e.target.value)}
                              className="rounded border border-[#E2E8F0] dark:border-[#333] bg-white dark:bg-[#12100E] px-1.5 py-0.5 text-[10px] text-black dark:text-white"
                            >
                              <option value="todo">To Do</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW 10: ADMIN STAFF DIRECTORY (activeMenu === "admin-staff") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-staff" && (
        <main className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Staff & Team Directory</h1>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Register employees and studio associates so they can be assigned to bookings and dev tasks.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
              <Users size={15} />
              <span>{adminStaff.length} Team Members</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Register Staff Form */}
            <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#76B900]">
                <UserPlus size={18} />
                <h3 className="text-sm font-bold text-black dark:text-white">Register New Staff</h3>
              </div>

              {regError && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-500 font-semibold">
                  {regError}
                </div>
              )}
              {regSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-500 font-semibold">
                  {regSuccess}
                </div>
              )}

              <form onSubmit={handleRegisterStaff} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    placeholder="staff@creaonnect.com"
                    className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] block mb-1">Temporary Password</label>
                  <input
                    type="password"
                    required
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#E2E8F0] dark:border-[#2D2825] bg-[#F8FAFC] dark:bg-[#1A1614] px-3 py-2 text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={registeringStaff}
                  className="w-full py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs shadow-md shadow-[#76B900]/20 hover:bg-[#86c910] disabled:opacity-50 transition-all"
                >
                  {registeringStaff ? "Registering..." : "Add Staff Member"}
                </button>
              </form>
            </div>

            {/* Staff List */}
            <div className="lg:col-span-2 bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-black dark:text-white">Active Staff Profiles ({adminStaff.length})</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[#94A3B8] uppercase text-[10px] border-b border-[#F1F5F9] dark:border-[#262626]">
                    <tr>
                      <th className="py-2.5 font-bold">Name & Email</th>
                      <th className="py-2.5 font-bold">Role</th>
                      <th className="py-2.5 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#262626]">
                    {adminStaff.map((s) => (
                      <tr key={s._id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1A1614]">
                        <td className="py-3">
                          <p className="font-bold text-black dark:text-white">{s.name}</p>
                          <p className="text-[#64748B] dark:text-[#94A3B8] text-[11px]">{s.email}</p>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${s.role === "admin"
                            ? "bg-[#76B900]/15 text-[#76B900]"
                            : "bg-blue-500/15 text-blue-400"
                            }`}>
                            {s.role || "staff"}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          {s.role !== "admin" && (
                            <button
                              type="button"
                              onClick={() => handleDeleteStaff(s._id)}
                              className="text-red-400 hover:text-red-500 p-1 rounded hover:bg-red-500/10 text-xs font-semibold"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW 11: ADMIN CMS & MEDIA (activeMenu === "admin-cms") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-cms" && (
        <main className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Website CMS & Media Manager</h1>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Update dynamic hero sliders, portfolio cards, services, and live marketing banners in real time.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12100E] rounded-2xl border border-[#E2E8F0] dark:border-[#262626] p-6 shadow-sm">
            <AdminCMSManager />
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW 12: ADMIN MARKETPLACE MONITOR (activeMenu === "admin-marketplace") */}
      {/* ========================================================================= */}
      {activeMenu === "admin-marketplace" && (
        <main className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">Marketplace & Escrow Engine</h1>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Master financial breakdown: 10% platform facilitation fee vs 90% creator take-home earnings.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#76B900] bg-[#76B900]/15 px-3 py-1.5 rounded-lg border border-[#76B900]/30">
              <TrendingUp size={15} />
              <span>10% Platform Model</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626]">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Gross Merchandise Value (GMV)</span>
              <p className="text-2xl font-black text-black dark:text-white mt-1">₹{gmv.toLocaleString()}</p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Total photoshoot booking volume</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#76B900]/10 border border-[#76B900]/30">
              <span className="text-[10px] font-bold uppercase text-[#76B900]">CREAONNECT Revenue (10%)</span>
              <p className="text-2xl font-black text-[#76B900] mt-1">₹{platformFee.toLocaleString()}</p>
              <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">Platform profit earned</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626]">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Creator Payouts (90%)</span>
              <p className="text-2xl font-black text-black dark:text-white mt-1">₹{creatorPayouts.toLocaleString()}</p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Disbursed to verified creators</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626]">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Total Live Orders</span>
              <p className="text-2xl font-black text-black dark:text-white mt-1">
                {adminMarketplaceStats?.totalOrders || adminBookings.length}
              </p>
              <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">
                {adminMarketplaceStats?.confirmedOrders || adminBookings.filter(b => b.status === "confirmed").length} Active / Closed
              </p>
            </div>
          </div>

          {/* Pending Launch Queue in Marketplace */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-black dark:text-white flex items-center gap-2">
                  <span>Awaiting Admin Launch Queue</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    {pendingLaunchBookings.length}
                  </span>
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Orders submitted by clients awaiting admin review and release to creator feeds.</p>
              </div>
            </div>

            {pendingLaunchBookings.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#262626] text-xs text-[#94A3B8]">
                ✓ All client orders are reviewed and launched! No pending orders.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingLaunchBookings.map((b) => (
                  <div key={b._id} className="p-4 rounded-2xl bg-white dark:bg-[#12100E] border border-amber-500/30 dark:border-amber-500/20 shadow-sm space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-xs font-black text-black dark:text-white">{b.title || b.service?.name || "Photoshoot Order"}</h4>
                        <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{b.customerName} &bull; {b.customerPhone}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        Pending Launch
                      </span>
                    </div>

                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] space-y-1">
                      <p>📍 {b.eventLocation}</p>
                      <p>📅 {formatDate(b.eventDate)} ({b.eventDuration || "Full Day"})</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-[#1A1614] border border-[#E2E8F0] dark:border-[#262626] flex justify-between items-center text-xs">
                      <span className="text-[#64748B] dark:text-[#94A3B8]">Budget / Payout:</span>
                      <span className="font-black text-[#76B900]">₹{(b.totalPrice || b.budget || 0).toLocaleString()}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLaunchModalBooking(b)}
                      className="w-full py-2 rounded-xl bg-[#76B900] hover:bg-[#86c910] text-black text-xs font-black shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                    >
                      <Rocket size={13} />
                      <span>🚀 Launch to Creators</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Circulating Orders in Marketplace */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-black dark:text-white flex items-center gap-2">
                  <span>Live Circulating Shoots on Creator Hub</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#76B900]/15 text-[#76B900]">
                    {liveHubBookings.length}
                  </span>
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Orders actively visible to photographers, videographers, and creators right now.</p>
              </div>
            </div>

            {liveHubBookings.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-[#12100E] rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#262626] text-xs text-[#94A3B8]">
                No active orders currently live on Creator Hub. Launch an order above to start!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveHubBookings.map((b) => (
                  <div key={b._id} className="p-4 rounded-2xl bg-white dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626] shadow-sm space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-xs font-black text-black dark:text-white">{b.title || b.service?.name || "Photoshoot Order"}</h4>
                        <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">{b.customerName}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/15 text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live on Hub
                      </span>
                    </div>

                    <div className="text-[11px] text-[#64748B] dark:text-[#94A3B8] space-y-1">
                      <p>📍 {b.eventLocation}</p>
                      <p>📅 {formatDate(b.eventDate)} ({b.eventDuration || "Full Day"})</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#76B900]/10 border border-[#76B900]/20 flex justify-between items-center text-xs">
                      <span className="text-[#64748B] dark:text-[#94A3B8]">Creator Payout (90%):</span>
                      <span className="font-black text-[#76B900]">₹{(b.freelancerPayout || Math.round((b.totalPrice || b.budget || 0) * 0.9)).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                      <span>Proposals: {b.quotations?.length || 0}</span>
                      <span>
                        {b.expiresAt && new Date(b.expiresAt) > new Date()
                          ? `⏱️ ${Math.max(1, Math.round((new Date(b.expiresAt) - new Date()) / 3600000))}h left`
                          : 'Expired'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* LAUNCH TO CREATORS CONFIRMATION & SETUP MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {launchModalBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white dark:bg-[#171311] rounded-2xl border border-[#E2E8F0] dark:border-[#2D2825] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden"
            >
              {/* Pinned Sticky Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9] dark:border-[#262626] shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#76B900] text-black flex items-center justify-center font-bold">
                    <Rocket size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-black dark:text-white">Launch Shoot to Creator Hub</h3>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Review details before releasing this booking live to verified creators.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLaunchModalBooking(null)}
                  className="h-8 w-8 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#221B17] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1 min-h-0">
                {/* Shoot Summary Box */}
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#12100E] border border-[#E2E8F0] dark:border-[#262626] space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-black text-black dark:text-white">
                        {launchModalBooking.title || launchModalBooking.service?.name || "Photoshoot Order"}
                      </p>
                      <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                        Client: {launchModalBooking.customerName} &bull; {launchModalBooking.customerPhone}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      Awaiting Launch
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E2E8F0] dark:border-[#262626]">
                    <div>
                      <span className="text-[#94A3B8] text-[10px] uppercase font-bold">Location</span>
                      <p className="font-semibold text-black dark:text-white truncate">{launchModalBooking.eventLocation || "On-location"}</p>
                    </div>
                    <div>
                      <span className="text-[#94A3B8] text-[10px] uppercase font-bold">Date & Duration</span>
                      <p className="font-semibold text-black dark:text-white truncate">
                        {formatDate(launchModalBooking.eventDate)} ({launchModalBooking.eventDuration || "Full Day"})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Breakdown (10% vs 90%) */}
                <div className="p-4 rounded-xl bg-[#76B900]/10 border border-[#76B900]/25 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#64748B] dark:text-[#94A3B8]">
                    <span>Total Client Budget:</span>
                    <span className="font-black text-sm text-black dark:text-white">
                      ₹{(launchModalBooking.totalPrice || launchModalBooking.budget || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#64748B] dark:text-[#94A3B8]">
                    <span>CREAONNECT Facilitation (10%):</span>
                    <span className="font-bold text-[#76B900]">
                      ₹{(launchModalBooking.platformFee || Math.round((launchModalBooking.totalPrice || launchModalBooking.budget || 0) * 0.1)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#64748B] dark:text-[#94A3B8] pt-1 border-t border-[#76B900]/20">
                    <span className="font-bold text-black dark:text-white">Creator Guaranteed Payout (90%):</span>
                    <span className="font-black text-base text-[#76B900]">
                      ₹{(launchModalBooking.freelancerPayout || Math.round((launchModalBooking.totalPrice || launchModalBooking.budget || 0) * 0.9)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Countdown Timer Config */}
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                    Marketplace Countdown Expiry
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { h: 12, label: "12 Hours" },
                      { h: 24, label: "24 Hours (Standard)" },
                      { h: 48, label: "48 Hours (2 Days)" }
                    ].map(item => (
                      <button
                        key={item.h}
                        type="button"
                        onClick={() => setLaunchHours(item.h)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                          launchHours === item.h
                            ? "bg-[#76B900] text-black border-[#76B900] shadow-sm"
                            : "bg-white dark:bg-[#1A1614] border-[#CBD5E1] dark:border-[#382C24] text-[#64748B] dark:text-[#94A3B8]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Countdown timer starts immediately when launched. Creators will see this live on their dashboard.
                  </p>
                </div>

                {/* Special Admin Instructions (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1">
                    Admin Instructions / Brief for Creators (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priority client. Drone pilot and 4K camera gear required."
                    value={launchNotes}
                    onChange={(e) => setLaunchNotes(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] bg-white dark:bg-[#1A1614] text-xs text-black dark:text-white outline-none focus:border-[#76B900]"
                  />
                </div>
              </div>

              {/* Always-Visible Pinned Sticky Footer */}
              <div className="px-6 py-3.5 border-t border-[#F1F5F9] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#14100E] shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLaunchModalBooking(null)}
                  className="flex-1 h-11 rounded-xl border border-[#CBD5E1] dark:border-[#382C24] text-xs font-bold text-[#64748B] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-[#221B17] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={launchingId === launchModalBooking._id}
                  onClick={() => onConfirmLaunch(launchModalBooking)}
                  className="flex-1 h-11 rounded-xl bg-[#76B900] hover:bg-[#86c910] text-black text-xs font-black shadow-md shadow-[#76B900]/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95"
                >
                  {launchingId === launchModalBooking._id ? (
                    <span>Launching...</span>
                  ) : (
                    <>
                      <Rocket size={15} />
                      <span>🚀 Launch Live to Creators</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminWorkspaceContent;
