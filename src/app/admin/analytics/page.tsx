"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Lock,
  RefreshCw,
  Globe,
  LogOut,
  Eye,
  Users,
  Clock,
  ArrowUpRight,
  Mail,
  FileText,
  Laptop,
  Smartphone,
  Tablet,
  Compass,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface AnalyticsData {
  stats: {
    totalViews: number;
    uniqueVisitors: number;
    activeVisitors: number;
    avgSessionDuration: number;
    contactSubmissions: number;
    bounceRate: number;
  };
  timeline: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  sections: Array<{
    name: string;
    visitors: number;
  }>;
  breakdowns: {
    browsers: Array<{ name: string; value: number }>;
    os: Array<{ name: string; value: number }>;
    devices: Array<{ name: string; value: number }>;
    countries: Array<{ name: string; value: number }>;
    referrers: Array<{ name: string; value: number }>;
  };
  contactMessages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
    replied: boolean;
    replyText?: string;
    repliedAt?: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "inbox">("overview");

  // Reply Compose States
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingMsgId, setReplyingMsgId] = useState<string | null>(null);
  const [replyStatus, setReplyStatus] = useState<{
    [id: string]: { success: boolean; text: string; mailtoUrl?: string };
  }>({});

  const submitReply = async (messageId: string) => {
    if (!replyText.trim()) return;
    setReplyingMsgId(messageId);
    
    try {
      const res = await fetch("/api/analytics/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, replyText }),
      });
      const json = await res.json();
      
      if (res.ok && json.success) {
        setReplyStatus((prev) => ({
          ...prev,
          [messageId]: {
            success: true,
            text: json.method === "resend" ? "Reply sent via Resend API!" : "Redirecting to your mail client...",
            mailtoUrl: json.mailtoUrl,
          },
        }));

        if (json.method === "mailto" && json.mailtoUrl) {
          window.location.href = json.mailtoUrl;
        }

        // Update local dataset immediately to show inline replied status
        if (data) {
          setData({
            ...data,
            contactMessages: data.contactMessages.map((m) =>
              m.id === messageId
                ? { ...m, replied: true, replyText, repliedAt: new Date().toISOString() }
                : m
            ),
          });
        }
        setReplyText("");
      } else {
        setReplyStatus((prev) => ({
          ...prev,
          [messageId]: { success: false, text: json.error || "Failed to submit reply" },
        }));
      }
    } catch {
      setReplyStatus((prev) => ({
        ...prev,
        [messageId]: { success: false, text: "Connection error" },
      }));
    } finally {
      setReplyingMsgId(null);
    }
  };

  // Format session duration from seconds into MM:SS or HH:MM:SS
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/analytics/auth");
      const json = await res.json();
      setAuthenticated(json.authenticated);
      if (!json.authenticated) {
        setIsLoading(false);
      }
    } catch {
      setAuthenticated(false);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/analytics/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setAuthenticated(true);
      } else {
        setLoginError(json.error || "Incorrect password");
      }
    } catch {
      setLoginError("Connection failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    // Clear cookies client-side
    document.cookie = "analytics_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setAuthenticated(false);
    setData(null);
    setPassword("");
  };

  const fetchAnalyticsData = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/analytics/data");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        // Auth might have expired
        await checkAuth();
      }
    } catch (err) {
      console.error("Failed to fetch analytics data", err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Check auth on mount
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    checkAuth();
  }, []);

  // Fetch data if authenticated
  useEffect(() => {
    if (authenticated) {
      fetchAnalyticsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  if (!mounted) return null;

  // 1. Loading State
  if (authenticated === null || (authenticated && isLoading)) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-slate-400 text-xs tracking-wider uppercase">Loading analytics portal...</p>
        </div>
      </div>
    );
  }

  // 2. Auth Wall (Login Screen)
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4 relative overflow-hidden font-mono">
        {/* Futuristic glowing backdrop */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-xl shadow-2xl relative"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider">AARYA.DEV</h1>
            <p className="text-xs text-slate-500 mt-1.5 uppercase tracking-widest">Private Analytics Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Access Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all text-center tracking-widest"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs text-center font-semibold bg-red-950/25 border border-red-900/40 p-2.5 rounded-lg">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer flex justify-center items-center gap-2"
            >
              {isLoggingIn ? "Authorizing..." : "Access Dashboard"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 3. Authenticated Dashboard Content
  const stats = data?.stats;
  const activeVisitors = stats?.activeVisitors || 0;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans relative pb-20">
      {/* Mesh glow accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-white/5 bg-[#070707]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-white font-mono font-semibold tracking-wider text-sm">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>AARYA.DEV</span>
            </span>
            <div className="h-4 w-[1px] bg-slate-800" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">ANALYTICS</span>
            {/* Realtime Active Visitor Pill */}
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium ml-2 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{activeVisitors} ACTIVE</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAnalyticsData}
              disabled={refreshing}
              className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-cyan-400" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold font-mono tracking-wider border border-red-900/40 rounded-lg text-red-400 hover:text-white hover:bg-red-500/10 hover:border-red-500 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main dashboard space */}
      <main className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
        {/* Mode Selector Tabs */}
        <div className="flex border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-2 text-sm font-mono tracking-wider transition-all border-b-2 font-semibold cursor-pointer ${
              activeTab === "overview"
                ? "border-cyan-400 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`pb-4 px-2 text-sm font-mono tracking-wider transition-all border-b-2 font-semibold ml-6 cursor-pointer ${
              activeTab === "inbox"
                ? "border-cyan-400 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            INBOX ({data?.contactMessages.length || 0})
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Page views */}
                <div className="p-5 rounded-xl border border-white/5 bg-slate-950/30 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/20 transition-all">
                  <div className="text-slate-500 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">Page Views</span>
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{stats?.totalViews || 0}</h3>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">Total path hits</p>
                </div>

                {/* 2. Unique visitors */}
                <div className="p-5 rounded-xl border border-white/5 bg-slate-950/30 backdrop-blur-md relative overflow-hidden group hover:border-violet-500/20 transition-all">
                  <div className="text-slate-500 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">Unique Visitors</span>
                    <Users className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{stats?.uniqueVisitors || 0}</h3>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">Distinct user sessions</p>
                </div>

                {/* 3. Avg session time */}
                <div className="p-5 rounded-xl border border-white/5 bg-slate-950/30 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/20 transition-all">
                  <div className="text-slate-500 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">Avg. Duration</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {formatDuration(stats?.avgSessionDuration || 0)}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">Average time on site</p>
                </div>

                {/* 4. Form submissions */}
                <div className="p-5 rounded-xl border border-white/5 bg-slate-950/30 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/20 transition-all">
                  <div className="text-slate-500 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">Inquiries</span>
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{stats?.contactSubmissions || 0}</h3>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">Contact forms sent</p>
                </div>

                {/* 5. Bounce rate */}
                <div className="p-5 rounded-xl border border-white/5 bg-slate-950/30 backdrop-blur-md relative overflow-hidden group hover:border-red-500/20 transition-all col-span-2 lg:col-span-1">
                  <div className="text-slate-500 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold">Bounce Rate</span>
                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{stats?.bounceRate || 0}%</h3>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">Single page exits</p>
                </div>
              </div>

              {/* Core Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Traffic line chart (Span 7) */}
                <div className="lg:col-span-7 p-6 rounded-xl border border-white/5 bg-slate-950/20">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-6">
                    Traffic History (Daily)
                  </h3>
                  <div className="h-[300px] w-full font-mono text-[10px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data?.timeline} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid stroke="#111" strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#555" />
                        <YAxis stroke="#555" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#070707", border: "1px solid rgba(255,255,255,0.05)" }}
                          labelStyle={{ color: "#888" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="views"
                          name="Page Views"
                          stroke="#22d3ee"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          name="Visitors"
                          stroke="#a78bfa"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Section reach bar chart (Span 5) */}
                <div className="lg:col-span-5 p-6 rounded-xl border border-white/5 bg-slate-950/20">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-6">
                    Section Views (Scroll Depth)
                  </h3>
                  <div className="h-[300px] w-full font-mono text-[10px]">
                    {data && data.sections.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.sections} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                          <CartesianGrid stroke="#111" strokeDasharray="3 3" />
                          <XAxis dataKey="name" stroke="#555" />
                          <YAxis stroke="#555" />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#070707", border: "1px solid rgba(255,255,255,0.05)" }}
                            labelStyle={{ color: "#888" }}
                          />
                          <Bar dataKey="visitors" name="Unique Visitors" fill="#818cf8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-600 text-xs">
                        No scroll data recorded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Breakdowns & Lists */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Referrers & Countries */}
                <div className="p-6 rounded-xl border border-white/5 bg-slate-950/20 flex flex-col h-full">
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold mb-4 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Top Referrers</span>
                  </h3>
                  <div className="space-y-3 flex-1">
                    {data?.breakdowns.referrers.slice(0, 5).map((ref, idx) => (
                      <div key={idx} className="flex flex-col gap-1 text-xs">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="truncate max-w-[200px] font-mono">{ref.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">{ref.value} visits</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-cyan-500/70 h-full rounded-full"
                            style={{
                              width: `${(ref.value / (stats?.totalViews || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {(!data || data.breakdowns.referrers.length === 0) && (
                      <p className="text-xs text-slate-600 text-center mt-8">No referrer logs.</p>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-white/5 bg-slate-950/20 flex flex-col h-full">
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold mb-4 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-violet-400" />
                    <span>Locations (Countries)</span>
                  </h3>
                  <div className="space-y-3 flex-1">
                    {data?.breakdowns.countries.slice(0, 5).map((c, idx) => (
                      <div key={idx} className="flex flex-col gap-1 text-xs">
                        <div className="flex justify-between items-center text-slate-300">
                          <span className="font-mono">{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">{c.value} sessions</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-violet-500/70 h-full rounded-full"
                            style={{
                              width: `${(c.value / (data.stats.uniqueVisitors || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {(!data || data.breakdowns.countries.length === 0) && (
                      <p className="text-xs text-slate-600 text-center mt-8">No country logs.</p>
                    )}
                  </div>
                </div>

                {/* Tech breakdown */}
                <div className="p-6 rounded-xl border border-white/5 bg-slate-950/20 flex flex-col h-full">
                  <h3 className="text-xs font-mono tracking-wider text-slate-400 uppercase font-semibold mb-4 flex items-center gap-1.5">
                    <Laptop className="w-4 h-4 text-amber-400" />
                    <span>Devices & Browsers</span>
                  </h3>
                  <div className="space-y-4 flex-1">
                    {/* Device segment */}
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Devices</span>
                      <div className="flex gap-2">
                        {data?.breakdowns.devices.map((dev, idx) => {
                          const Icon =
                            dev.name === "Mobile"
                              ? Smartphone
                              : dev.name === "Tablet"
                              ? Tablet
                              : Laptop;
                          const total = data.stats.uniqueVisitors || 1;
                          const pct = Math.round((dev.value / total) * 100);
                          return (
                            <div
                              key={idx}
                              className="flex-1 p-2 rounded-lg bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center gap-1"
                            >
                              <Icon className="w-4 h-4 text-slate-400" />
                              <span className="text-[10px] font-semibold text-slate-200">{pct}%</span>
                              <span className="text-[8px] font-mono text-slate-500 uppercase">{dev.name}</span>
                            </div>
                          );
                        })}
                        {(!data || data.breakdowns.devices.length === 0) && (
                          <p className="text-[10px] text-slate-600 text-center w-full">No device stats.</p>
                        )}
                      </div>
                    </div>

                    {/* Browser List */}
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Browsers</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {data?.breakdowns.browsers.slice(0, 4).map((br, idx) => (
                          <div key={idx} className="p-2 rounded bg-black/25 border border-white/5 flex justify-between items-center">
                            <span className="font-mono text-slate-300 truncate max-w-[80px]">{br.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{br.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-5xl mx-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold">
                  Visitor Inbox
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  Showing all messages received via contact form
                </span>
              </div>

              <div className="space-y-4">
                {data?.contactMessages.map((msg) => {
                  const date = new Date(msg.timestamp);
                  const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  const dateStr = date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
                  const isComposing = activeReplyId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className="p-5 rounded-xl border border-white/5 bg-slate-950/20 backdrop-blur-md hover:border-slate-800 transition-all space-y-4 shadow-lg"
                    >
                      {/* Message Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {msg.id}
                          </span>
                          <div>
                            <span className="text-sm font-bold text-white block">{msg.name}</span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-[11px] text-cyan-400 hover:underline font-mono"
                            >
                              {msg.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          {/* Replied / Pending Status Tags */}
                          {msg.replied ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium">
                              Replied
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-medium">
                              Pending
                            </span>
                          )}
                          <div className="text-right text-[10px] font-mono text-slate-500">
                            <span>{dateStr}</span> <span className="text-slate-600">at</span> <span>{timeStr}</span>
                          </div>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                          Subject: {msg.subject}
                        </h4>
                        <p className="text-sm text-slate-400 bg-black/40 border border-white/5 p-4 rounded-lg whitespace-pre-wrap leading-relaxed font-sans">
                          {msg.message}
                        </p>
                      </div>

                      {/* Previous Reply Display */}
                      {msg.replied && msg.replyText && (
                        <div className="mt-2 p-4 rounded-lg bg-emerald-950/10 border border-emerald-900/20 space-y-1">
                          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold block">
                            Your Reply ({msg.repliedAt ? new Date(msg.repliedAt).toLocaleDateString() : ""}):
                          </span>
                          <p className="text-xs text-slate-300 italic whitespace-pre-wrap font-sans">
                            {msg.replyText}
                          </p>
                        </div>
                      )}

                      {/* Action buttons / Reply interface */}
                      <div className="pt-2 flex flex-col gap-3">
                        {!isComposing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setActiveReplyId(msg.id);
                                setReplyText("");
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 hover:bg-cyan-500/10 hover:border-cyan-400 text-cyan-400 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{msg.replied ? "Reply Again" : "Compose Reply"}</span>
                            </button>
                            <a
                              href={`mailto:${msg.email}?subject=Re:${encodeURIComponent(msg.subject)}`}
                              className="px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 font-sans"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                              <span>Open Mail client</span>
                            </a>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-3 pt-2 border-t border-white/5"
                          >
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                Compose Reply Email
                              </label>
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your email response here..."
                                rows={4}
                                className="w-full px-4.5 py-3 rounded-lg bg-black/40 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                              />
                            </div>

                            {replyStatus[msg.id] && (
                              <p
                                className={`text-xs p-2.5 rounded-lg border ${
                                  replyStatus[msg.id].success
                                    ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-400"
                                    : "bg-red-950/20 border-red-900/40 text-red-400"
                                }`}
                              >
                                {replyStatus[msg.id].text}
                              </p>
                            )}

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => submitReply(msg.id)}
                                disabled={replyingMsgId === msg.id || !replyText.trim()}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shadow-lg shadow-cyan-500/10"
                              >
                                {replyingMsgId === msg.id ? "Sending..." : "Send Reply"}
                              </button>

                              <button
                                onClick={() => {
                                  setActiveReplyId(null);
                                  setReplyText("");
                                }}
                                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 text-xs font-bold transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>

                              {/* Manual Link generated indicator */}
                              {replyStatus[msg.id]?.success && replyStatus[msg.id]?.mailtoUrl && (
                                <a
                                  href={replyStatus[msg.id].mailtoUrl}
                                  className="ml-auto px-4 py-2 rounded-lg border border-cyan-800 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 text-xs font-bold transition-all flex items-center gap-1.5"
                                >
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                  <span>Open Mail Client</span>
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {(!data || data.contactMessages.length === 0) && (
                  <div className="py-20 text-center text-slate-600 text-xs font-mono">
                    No contact submissions have been received on your website yet.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
