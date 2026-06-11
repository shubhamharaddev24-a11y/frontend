import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Inbox, 
  Clock, 
  AlertCircle,
  LogOut,
  UserCheck,
  UserPlus,
  Trash2,
  ListTodo,
  FileCode,
  PlusCircle,
  Paperclip,
  ExternalLink
} from "lucide-react";
import { 
  bookingService, 
  leadService, 
  authService,
  taskService
} from "../services";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings"); // bookings, leads, staff, or tasks
  const [bookings, setBookings] = useState([]);
  const [leads, setLeads] = useState([]);
  const [staff, setStaff] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    bookings: { total: 0, confirmed: 0, pending: 0 },
    leads: { total: 0, new: 0 },
    tasks: { total: 0, todo: 0, in_progress: 0, completed: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Staff Registration Form State
  const [newStaff, setNewStaff] = useState({ name: "", email: "", password: "" });
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [registering, setRegistering] = useState(false);

  // Custom Task Form State
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignedTo: "",
    dueDate: ""
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [taskError, setTaskError] = useState("");
  const [taskSuccess, setTaskSuccess] = useState("");
  const [creatingTask, setCreatingTask] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    setCurrentUser(JSON.parse(userStr));
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch Bookings
      const bookingsRes = await bookingService.getAllBookings({ limit: 100 });
      const bookingsList = bookingsRes?.data?.bookings || [];
      setBookings(bookingsList);

      // 2. Fetch Leads
      const leadsRes = await leadService.getAllLeads({ limit: 100 });
      const leadsList = leadsRes?.data?.leads || [];
      setLeads(leadsList);

      // 3. Fetch Staff Members (Users)
      const staffRes = await authService.getAllUsers();
      setStaff(staffRes?.data || []);

      // 4. Fetch Development Tasks
      const tasksRes = await taskService.getAllTasks();
      const tasksList = tasksRes?.data || [];
      setTasks(tasksList);

      // Calculate Stats
      const confirmedBookings = bookingsList.filter(b => b.status === "confirmed").length;
      const pendingBookings = bookingsList.filter(b => b.status === "pending").length;
      const newLeads = leadsList.filter(l => l.status === "new").length;

      setStats({
        bookings: {
          total: bookingsList.length,
          confirmed: confirmedBookings,
          pending: pendingBookings
        },
        leads: {
          total: leadsList.length,
          new: newLeads
        },
        tasks: {
          total: tasksList.length,
          todo: tasksList.filter(t => t.status === "todo").length,
          in_progress: tasksList.filter(t => t.status === "in_progress").length,
          completed: tasksList.filter(t => t.status === "completed").length
        }
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setError("Failed to load dashboard data. Please verify your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const isAdmin = currentUser?.role === "admin";

  const handleAssignBooking = async (bookingId, userId) => {
    try {
      await bookingService.updateBooking(bookingId, { assignedTo: userId || null });
      setBookings(prev => prev.map(b => {
        if (b._id === bookingId) {
          const assignedUser = staff.find(s => s._id === userId);
          return { ...b, assignedTo: assignedUser ? { _id: userId, name: assignedUser.name, email: assignedUser.email } : null };
        }
        return b;
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to assign booking.");
    }
  };

  const handleAssignLead = async (leadId, userId) => {
    try {
      await leadService.updateLead(leadId, { assignedTo: userId || null });
      setLeads(prev => prev.map(l => {
        if (l._id === leadId) {
          const assignedUser = staff.find(s => s._id === userId);
          return { ...l, assignedTo: assignedUser ? { _id: userId, name: assignedUser.name, email: assignedUser.email } : null };
        }
        return l;
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to assign lead.");
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await bookingService.updateBookingStatus(bookingId, status);
      setBookings(prev => prev.map(b => (b._id === bookingId ? { ...b, status } : b)));
      setStats(prev => {
        const updated = bookings.map(b => b._id === bookingId ? { ...b, status } : b);
        return {
          ...prev,
          bookings: {
            total: updated.length,
            confirmed: updated.filter(b => b.status === "confirmed").length,
            pending: updated.filter(b => b.status === "pending").length
          }
        };
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const handleUpdateLeadStatus = async (leadId, status) => {
    try {
      await leadService.updateLeadStatus(leadId, status);
      setLeads(prev => prev.map(l => (l._id === leadId ? { ...l, status } : l)));
      setStats(prev => {
        const updated = leads.map(l => l._id === leadId ? { ...l, status } : l);
        return {
          ...prev,
          leads: {
            total: updated.length,
            new: updated.filter(l => l.status === "new").length
          }
        };
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  // Task Actions
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setTaskError("");
    setTaskSuccess("");
    setCreatingTask(true);

    if (!newTask.title.trim()) {
      setTaskError("Task title is required.");
      setCreatingTask(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newTask.title);
      formData.append("description", newTask.description);
      formData.append("priority", newTask.priority);
      if (newTask.assignedTo) formData.append("assignedTo", newTask.assignedTo);
      if (newTask.dueDate) formData.append("dueDate", newTask.dueDate);

      selectedFiles.forEach((file) => {
        formData.append("attachments", file);
      });

      await taskService.createTask(formData);
      setTaskSuccess("New task with attachments created successfully!");
      setNewTask({ title: "", description: "", priority: "medium", assignedTo: "", dueDate: "" });
      setSelectedFiles([]);
      
      const fileInput = document.getElementById("task-files");
      if (fileInput) fileInput.value = "";

      const tasksRes = await taskService.getAllTasks();
      const list = tasksRes?.data || [];
      setTasks(list);
      setStats(prev => ({
        ...prev,
        tasks: {
          total: list.length,
          todo: list.filter(t => t.status === "todo").length,
          in_progress: list.filter(t => t.status === "in_progress").length,
          completed: list.filter(t => t.status === "completed").length
        }
      }));
    } catch (err) {
      console.error(err);
      setTaskError("Failed to create task. Make sure attachment sizes do not exceed 10MB.");
    } finally {
      setCreatingTask(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      await taskService.updateTask(taskId, { status });
      setTasks(prev => prev.map(t => (t._id === taskId ? { ...t, status } : t)));
      setStats(prev => {
        const updated = tasks.map(t => t._id === taskId ? { ...t, status } : t);
        return {
          ...prev,
          tasks: {
            total: updated.length,
            todo: updated.filter(t => t.status === "todo").length,
            in_progress: updated.filter(t => t.status === "in_progress").length,
            completed: updated.filter(t => t.status === "completed").length
          }
        };
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update task status.");
    }
  };

  const handleAssignTask = async (taskId, userId) => {
    try {
      await taskService.updateTask(taskId, { assignedTo: userId || null });
      setTasks(prev => prev.map(t => {
        if (t._id === taskId) {
          const assignedUser = staff.find(s => s._id === userId);
          return { ...t, assignedTo: assignedUser ? { _id: userId, name: assignedUser.name, email: assignedUser.email } : null };
        }
        return t;
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to assign task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    try {
      await taskService.deleteTask(taskId);
      const list = tasks.filter(t => t._id !== taskId);
      setTasks(list);
      setStats(prev => ({
        ...prev,
        tasks: {
          total: list.length,
          todo: list.filter(t => t.status === "todo").length,
          in_progress: list.filter(t => t.status === "in_progress").length,
          completed: list.filter(t => t.status === "completed").length
        }
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  const handleRegisterStaff = async (e) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");
    setRegistering(true);

    try {
      await authService.register(newStaff);
      setRegSuccess("Staff member registered successfully!");
      setNewStaff({ name: "", email: "", password: "" });
      
      const staffRes = await authService.getAllUsers();
      setStaff(staffRes?.data || []);
    } catch (err) {
      console.error(err);
      setRegError(err.response?.data?.message || "Failed to register staff.");
    } finally {
      setRegistering(false);
    }
  };

  const handleDeleteStaff = async (staffId) => {
    if (!window.confirm("Delete this staff member? All their assignments will show as unassigned.")) {
      return;
    }
    try {
      await authService.deleteUser(staffId);
      setStaff(prev => prev.filter(s => s._id !== staffId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete staff.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-brandBg pb-16 pt-24 text-brandTextPrimary sm:pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-brandBorder pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccent">
              Shubham Media & Digital Services
            </p>
            <h1 className="text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
              Admin Workspace
            </h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 self-start rounded-full border border-red-500/40 bg-brandSurface px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-400">
            {error}
          </div>
        )}

        {/* Stats Panel */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brandTextMuted">Total Bookings</span>
              <Calendar className="text-brandAccent" size={20} />
            </div>
            <p className="mt-2 text-2xl font-bold text-brandTextPrimary">{stats.bookings.total}</p>
            <p className="mt-1 text-xs text-brandTextMuted">All recorded wedding & studio works</p>
          </div>

          <div className="rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brandTextMuted">Website Tasks</span>
              <ListTodo className="text-brandAccent" size={20} />
            </div>
            <p className="mt-2 text-2xl font-bold text-brandTextPrimary">
              {stats.tasks.todo + stats.tasks.in_progress} <span className="text-sm font-normal text-brandTextMuted">/ {stats.tasks.total}</span>
            </p>
            <p className="mt-1 text-xs text-brandTextMuted">Active web development tasks</p>
          </div>

          <div className="rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brandTextMuted">Total Enquiries</span>
              <Inbox className="text-brandAccent" size={20} />
            </div>
            <p className="mt-2 text-2xl font-bold text-brandTextPrimary">{stats.leads.total}</p>
            <p className="mt-1 text-xs text-brandTextMuted">Website leads & enquiries</p>
          </div>

          <div className="rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brandTextMuted">New Enquiries</span>
              <AlertCircle className="text-green-400" size={20} />
            </div>
            <p className="mt-2 text-2xl font-bold text-green-400">{stats.leads.new}</p>
            <p className="mt-1 text-xs text-brandTextMuted">Unread or newly received messages</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="mt-8 flex gap-4 border-b border-brandBorder pb-3">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`pb-2 text-sm font-semibold tracking-wider transition-colors ${
              activeTab === "bookings" 
                ? "border-b-2 border-brandAccent text-brandAccent" 
                : "text-brandTextMuted hover:text-brandTextPrimary"
            }`}
          >
            Bookings List ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-2 text-sm font-semibold tracking-wider transition-colors ${
              activeTab === "leads" 
                ? "border-b-2 border-brandAccent text-brandAccent" 
                : "text-brandTextMuted hover:text-brandTextPrimary"
            }`}
          >
            Enquiries ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`pb-2 text-sm font-semibold tracking-wider transition-colors ${
              activeTab === "tasks" 
                ? "border-b-2 border-brandAccent text-brandAccent" 
                : "text-brandTextMuted hover:text-brandTextPrimary"
            }`}
          >
            Website Tasks ({tasks.length})
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab("staff")}
              className={`pb-2 text-sm font-semibold tracking-wider transition-colors ${
                activeTab === "staff" 
                  ? "border-b-2 border-brandAccent text-brandAccent" 
                  : "text-brandTextMuted hover:text-brandTextPrimary"
              }`}
            >
              Staff Directory ({staff.length})
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="mt-6 rounded-2xl border border-brandBorder bg-brandSurface p-4 sm:p-6 shadow-md">
          {loading ? (
            <div className="py-12 text-center text-brandTextMuted">
              Loading dashboard details...
            </div>
          ) : activeTab === "bookings" ? (
            /* Bookings Tab */
            <div className="overflow-x-auto">
              {bookings.length === 0 ? (
                <div className="py-8 text-center text-brandTextMuted">No bookings found.</div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-brandBorder/80 text-brandTextMuted">
                      <th className="pb-3 font-semibold">Client / Contact</th>
                      <th className="pb-3 font-semibold">Service / Date</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Assigned Staff</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brandBorder/50">
                    {bookings.map((b) => (
                      <tr key={b._id} className="hover:bg-brandSurfaceSoft/20">
                        <td className="py-3.5 pr-3">
                          <p className="font-semibold text-brandTextPrimary">{b.customerName}</p>
                          <p className="text-xs text-brandTextMuted">{b.customerPhone}</p>
                          <p className="text-[11px] text-brandTextMuted">{b.customerEmail}</p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <p className="font-medium text-brandTextPrimary">
                            {b.service?.name || "Custom Shoot"}
                          </p>
                          <p className="text-xs text-brandAccent">{formatDate(b.eventDate)}</p>
                          <p className="text-[11px] text-brandTextMuted">{b.eventLocation}</p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            b.status === "confirmed" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                            b.status === "completed" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            b.status === "cancelled" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                            "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <UserCheck size={14} className="text-brandTextMuted" />
                            {isAdmin ? (
                              <select
                                value={b.assignedTo?._id || b.assignedTo || ""}
                                onChange={(e) => handleAssignBooking(b._id, e.target.value)}
                                className="rounded border border-brandBorder bg-brandSurfaceSoft px-1.5 py-1 text-xs text-brandTextPrimary outline-none focus:border-brandAccent"
                              >
                                <option value="">Unassigned</option>
                                {staff.map((s) => (
                                  <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-xs text-brandTextPrimary font-medium">
                                {b.assignedTo?.name || "Unassigned"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                            className="rounded border border-brandBorder bg-brandSurfaceSoft px-1.5 py-1 text-xs text-brandTextPrimary outline-none focus:border-brandAccent"
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
              )}
            </div>
          ) : activeTab === "leads" ? (
            /* Leads / Enquiries Tab */
            <div className="overflow-x-auto">
              {leads.length === 0 ? (
                <div className="py-8 text-center text-brandTextMuted">No enquiries found.</div>
              ) : (
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-brandBorder/80 text-brandTextMuted">
                      <th className="pb-3 font-semibold">Sender / Contact</th>
                      <th className="pb-3 font-semibold">Service / Date</th>
                      <th className="pb-3 font-semibold">Message</th>
                      <th className="pb-3 font-semibold">Assigned Staff</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brandBorder/50">
                    {leads.map((l) => (
                      <tr key={l._id} className="hover:bg-brandSurfaceSoft/20">
                        <td className="py-3.5 pr-3">
                          <p className="font-semibold text-brandTextPrimary">{l.name}</p>
                          <p className="text-xs text-brandTextMuted">{l.phone}</p>
                          {l.email && <p className="text-[11px] text-brandTextMuted">{l.email}</p>}
                        </td>
                        <td className="py-3.5 pr-3">
                          <p className="font-medium text-brandTextPrimary">{l.service || "General Inquiry"}</p>
                          {l.preferredDate && (
                            <p className="text-xs text-brandAccent">{formatDate(l.preferredDate)}</p>
                          )}
                        </td>
                        <td className="py-3.5 pr-3 max-w-[200px] truncate">
                          <p className="text-xs text-brandTextMuted" title={l.message}>
                            {l.message || "No message provided."}
                          </p>
                        </td>
                        <td className="py-3.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <UserCheck size={14} className="text-brandTextMuted" />
                            {isAdmin ? (
                              <select
                                value={l.assignedTo?._id || l.assignedTo || ""}
                                onChange={(e) => handleAssignLead(l._id, e.target.value)}
                                className="rounded border border-brandBorder bg-brandSurfaceSoft px-1.5 py-1 text-xs text-brandTextPrimary outline-none focus:border-brandAccent"
                              >
                                <option value="">Unassigned</option>
                                {staff.map((s) => (
                                  <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-xs text-brandTextPrimary font-medium">
                                {l.assignedTo?.name || "Unassigned"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <select
                            value={l.status}
                            onChange={(e) => handleUpdateLeadStatus(l._id, e.target.value)}
                            className="rounded border border-brandBorder bg-brandSurfaceSoft px-1.5 py-1 text-xs text-brandTextPrimary outline-none focus:border-brandAccent"
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
              )}
            </div>
          ) : activeTab === "tasks" ? (
            /* Tasks Tab (Website Development Tasks) */
            <div className={isAdmin ? "grid gap-6 md:grid-cols-[1.15fr,1.85fr]" : "w-full"}>
              {/* Task Creation Form (Admin Only) */}
              {isAdmin && (
                <div className="space-y-4 rounded-xl border border-brandBorder/80 bg-brandSurfaceSoft/30 p-5">
                  <div className="flex items-center gap-2 text-brandAccent">
                    <PlusCircle size={18} />
                    <h3 className="text-sm font-semibold">New Development Task</h3>
                  </div>
                  <p className="text-xs text-brandTextMuted">
                    Create a specific task related to your website features or functionalities and assign it to a staff member.
                  </p>
                  <form onSubmit={handleCreateTask} className="space-y-3">
                    {taskError && (
                      <div className="rounded border border-red-500/20 bg-red-500/10 p-2.5 text-[11px] text-red-400">
                        {taskError}
                      </div>
                    )}
                    {taskSuccess && (
                      <div className="rounded border border-green-500/20 bg-green-500/10 p-2.5 text-[11px] text-green-400">
                        {taskSuccess}
                      </div>
                    )}

                    <div className="coolinput coolinput-soft-bg w-full">
                      <label className="text">Task Title</label>
                      <input
                        type="text"
                        className="input"
                        value={newTask.title}
                        onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Build Gallery Lightbox"
                        required
                      />
                    </div>

                    <div className="coolinput coolinput-soft-bg w-full">
                      <label className="text">Description</label>
                      <textarea
                        rows={2}
                        className="input"
                        value={newTask.description}
                        onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Explain the work required..."
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="coolinput coolinput-soft-bg w-full">
                        <label className="text">Priority</label>
                        <select
                          className="input"
                          value={newTask.priority}
                          onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      <div className="coolinput coolinput-soft-bg w-full">
                        <label className="text">Due Date</label>
                        <input
                          type="date"
                          className="input"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="coolinput coolinput-soft-bg w-full">
                      <label className="text">Assign To Staff Member</label>
                      <select
                        className="input"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                      >
                        <option value="">Unassigned</option>
                        {staff.map((s) => (
                          <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Attachment input right after Assignment selector */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-brandTextMuted flex items-center gap-1">
                        <Paperclip size={12} />
                        <span>Attach Mockups / Reference Images</span>
                      </label>
                      <input
                        id="task-files"
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full text-xs text-brandTextMuted file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-brandBorder file:text-brandTextPrimary hover:file:bg-brandBorder/80 cursor-pointer"
                        onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                      />
                      {selectedFiles.length > 0 && (
                        <p className="text-[10px] text-brandAccent">
                          {selectedFiles.length} file(s) selected
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={creatingTask}
                      className="w-full rounded bg-brandAccent py-2 text-xs font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                    >
                      {creatingTask ? "Creating..." : "Create & Assign Task"}
                    </button>
                  </form>
                </div>
              )}

              {/* Tasks List */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-brandTextPrimary flex items-center gap-2">
                  <FileCode size={16} className="text-brandAccent" />
                  <span>Development Tasks Board</span>
                </h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {tasks.length === 0 ? (
                    <div className="py-6 text-center text-xs text-brandTextMuted border border-dashed border-brandBorder rounded-lg">
                      No tasks created yet.
                    </div>
                  ) : (
                    tasks.map((t) => (
                      <div key={t._id} className="rounded-xl border border-brandBorder/70 bg-brandSurfaceSoft/20 p-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-bold text-brandTextPrimary">{t.title}</h4>
                            {t.description && <p className="mt-1 text-xs text-brandTextMuted">{t.description}</p>}
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteTask(t._id)}
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10"
                              title="Delete task"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>

                        {/* Attachments rendering inside the task details */}
                        {t.attachments && t.attachments.length > 0 && (
                          <div className="py-1">
                            <p className="text-[10px] font-semibold text-brandTextMuted uppercase tracking-wider mb-1">
                              Attachments ({t.attachments.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {t.attachments.map((url, idx) => (
                                <a
                                  key={idx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group relative w-12 h-12 rounded border border-brandBorder bg-black/40 overflow-hidden flex items-center justify-center"
                                  title="View Full Image"
                                >
                                  <img
                                    src={url}
                                    alt="Task Attachment"
                                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                                    <ExternalLink size={10} className="text-brandAccent" />
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Task Metadata & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brandBorder/30 text-[11px]">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Priority Badge */}
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                              t.priority === "high" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                              t.priority === "low" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                              "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }`}>
                              {t.priority}
                            </span>
                            
                            {/* Due Date */}
                            {t.dueDate && (
                              <span className="text-brandTextMuted">Due: {formatDate(t.dueDate)}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Assignee Selector */}
                            <div className="flex items-center gap-1">
                              <span className="text-brandTextMuted">Assignee:</span>
                              {isAdmin ? (
                                <select
                                  value={t.assignedTo?._id || t.assignedTo || ""}
                                  onChange={(e) => handleAssignTask(t._id, e.target.value)}
                                  className="rounded border border-brandBorder bg-brandSurface px-1.5 py-0.5 text-[10px] text-brandTextPrimary outline-none"
                                >
                                  <option value="">Unassigned</option>
                                  {staff.map((s) => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                  ))}
                                </select>
                              ) : (
                                <span className="font-semibold text-brandTextPrimary">
                                  {t.assignedTo?.name || t.assignedTo || "Unassigned"}
                                </span>
                              )}
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-1">
                              <span className="text-brandTextMuted">Status:</span>
                              <select
                                value={t.status}
                                onChange={(e) => handleUpdateTaskStatus(t._id, e.target.value)}
                                className="rounded border border-brandBorder bg-brandSurface px-1.5 py-0.5 text-[10px] text-brandTextPrimary outline-none"
                              >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Staff Management Tab */
            isAdmin && (
              <div className="grid gap-6 md:grid-cols-[1.2fr,1.8fr]">
                {/* Register Form */}
                <div className="space-y-4 rounded-xl border border-brandBorder/80 bg-brandSurfaceSoft/30 p-5">
                  <div className="flex items-center gap-2 text-brandAccent">
                    <UserPlus size={18} />
                    <h3 className="text-sm font-semibold">Register New Staff</h3>
                  </div>
                  <p className="text-xs text-brandTextMuted">
                    Create a secure staff member profile. They will appear in the "Assigned Staff" selectors and can log in to manage assignments.
                  </p>
                  <form onSubmit={handleRegisterStaff} className="space-y-3">
                    {regError && (
                      <div className="rounded border border-red-500/20 bg-red-500/10 p-2.5 text-[11px] text-red-400">
                        {regError}
                      </div>
                    )}
                    {regSuccess && (
                      <div className="rounded border border-green-500/20 bg-green-500/10 p-2.5 text-[11px] text-green-400">
                        {regSuccess}
                      </div>
                    )}
                    
                    <div className="coolinput coolinput-soft-bg w-full">
                      <label className="text">Name</label>
                      <input
                        type="text"
                        className="input"
                        value={newStaff.name}
                        onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>

                    <div className="coolinput coolinput-soft-bg w-full">
                      <label className="text">Email Address</label>
                      <input
                        type="email"
                        className="input"
                        value={newStaff.email}
                        onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="rahul@shubhambackend.com"
                        required
                      />
                    </div>

                    <div className="coolinput coolinput-soft-bg w-full">
                      <label className="text">Password</label>
                      <input
                        type="password"
                        className="input"
                        value={newStaff.password}
                        onChange={(e) => setNewStaff(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Min 6 chars (Upper, Lower & Num)"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={registering}
                      className="w-full rounded bg-brandAccent py-2 text-xs font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
                    >
                      {registering ? "Registering..." : "Add Staff Member"}
                    </button>
                  </form>
                </div>

                {/* Staff Members List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-brandTextPrimary flex items-center gap-2">
                    <Users size={16} className="text-brandAccent" />
                    <span>Active Staff Directory</span>
                  </h3>
                  <div className="overflow-x-auto">
                    {staff.length === 0 ? (
                      <div className="py-4 text-xs text-brandTextMuted">No staff members registered.</div>
                    ) : (
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-brandBorder/80 text-brandTextMuted pb-2">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Email</th>
                            <th className="pb-2 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brandBorder/40">
                          {staff.map((s) => (
                            <tr key={s._id} className="hover:bg-brandSurfaceSoft/10">
                              <td className="py-3 font-semibold text-brandTextPrimary">{s.name}</td>
                              <td className="py-3 text-brandTextMuted">{s.email}</td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => handleDeleteStaff(s._id)}
                                  className="rounded p-1 text-red-400 hover:bg-red-500/10 inline-flex items-center justify-center"
                                  title="Delete staff"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

      </section>
    </div>
  );
};

export default AdminDashboard;
