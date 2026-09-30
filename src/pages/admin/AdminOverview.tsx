import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Subscription } from '../../types/subscription';
import { UserProfile } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/calculations';
import { format, parseISO, subDays } from 'date-fns';
import { 
  Users, 
  UserCheck, 
  CreditCard, 
  TrendingUp, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  AlertTriangle,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  CartesianGrid 
} from 'recharts';
import { CATEGORY_COLORS } from '../../components/dashboard/CategoryChart';
import { cn } from '../../lib/utils';

export default function AdminOverview() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7' | '30'>('30');

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        // Fetch all users
        const usersSnap = await getDocs(collection(db, 'users'));
        const usersData = usersSnap.docs.map(doc => ({ ...doc.data() })) as UserProfile[];
        // Sort newest first
        usersData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setUsers(usersData);

        // Fetch all subscriptions platform-wide
        const subsSnap = await getDocs(collection(db, 'subscriptions'));
        const subsData = subsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Subscription[];
        setSubscriptions(subsData);
      } catch (err) {
        console.error('Error fetching admin overview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  // Compute platform metrics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  
  // New users within selected range
  const daysThreshold = parseInt(timeRange, 10);
  const cutoffDate = subDays(new Date(), daysThreshold);
  const newUsersCount = users.filter(u => {
    try {
      return new Date(u.created_at) >= cutoffDate;
    } catch {
      return false;
    }
  }).length;

  const totalSubscriptions = subscriptions.length;
  const activeSubs = subscriptions.filter(s => s.status === 'active').length;
  const totalMonthlyVolume = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.billing_cycle === 'monthly' ? Number(s.cost) : Number(s.cost) / 12), 0);

  // Category distribution across platform
  const categoryCount = subscriptions.reduce((acc, sub) => {
    const cat = sub.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryCount)
    .map(([name, value]: [string, number]) => ({ name, value }))
    .sort((a, b) => Number(b.value) - Number(a.value))
    .slice(0, 6);

  // Registration timeline (Group by last 6 months or days)
  const registrationTimelineData = users.reduce((acc, u) => {
    try {
      const monthYear = format(parseISO(u.created_at), 'MMM yyyy');
      acc[monthYear] = (acc[monthYear] || 0) + 1;
    } catch {
      // fallback
    }
    return acc;
  }, {} as Record<string, number>);

  const timelineData = Object.entries(registrationTimelineData).map(([period, count]) => ({
    period,
    count
  }));

  // Status breakdown data
  const statusData = [
    { name: 'Active Accounts', value: activeUsers, color: '#00F5A0' },
    { name: 'Suspended', value: suspendedUsers, color: '#EF4444' }
  ].filter(d => d.value > 0);

  return (
    <AdminLayout 
      title="Platform Overview" 
      breadcrumb="Overview"
      action={
        <div className="flex items-center gap-1.5 bg-background-secondary rounded-xl p-1 border border-border-card text-xs">
          <Calendar className="w-3.5 h-3.5 text-text-muted ml-2" />
          <button
            onClick={() => setTimeRange('7')}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer",
              timeRange === '7' ? "bg-accent-secondary/50 text-accent-primary-from" : "text-text-muted hover:text-white"
            )}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30')}
            className={cn(
              "px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer",
              timeRange === '30' ? "bg-accent-secondary/50 text-accent-primary-from" : "text-text-muted hover:text-white"
            )}
          >
            Last 30 Days
          </button>
        </div>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Platform Statistics
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Real-time subscriber metrics, system activity, and platform-wide distribution.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Firestore Sync
              </span>
            </div>
          </div>

          {/* 1. Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Metric 1: Total Users */}
            <div className="bg-background-card border border-border-card p-5 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Total Users</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold text-white tabular-nums tracking-tight">
                  {totalUsers}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Registered accounts in database
                </p>
              </div>
            </div>

            {/* Metric 2: New Users */}
            <div className="bg-background-card border border-border-card p-5 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  New Users ({timeRange}d)
                </span>
                <div className="w-8 h-8 rounded-lg bg-accent-secondary/40 border border-accent-primary-from/30 flex items-center justify-center text-accent-primary-from">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold text-white tabular-nums tracking-tight">
                  +{newUsersCount}
                </p>
                <p className="text-xs text-accent-primary-from mt-1">
                  Joined in last {timeRange} days
                </p>
              </div>
            </div>

            {/* Metric 3: Total Subscriptions */}
            <div className="bg-background-card border border-border-card p-5 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Subscriptions Tracked</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold text-white tabular-nums tracking-tight">
                  {totalSubscriptions}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {activeSubs} currently active ({totalSubscriptions > 0 ? Math.round((activeSubs / totalSubscriptions) * 100) : 0}%)
                </p>
              </div>
            </div>

            {/* Metric 4: Platform Monthly Volume */}
            <div className="bg-background-card border border-border-card p-5 rounded-2xl flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Tracked Monthly Volume</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold text-white tabular-nums tracking-tight">
                  {formatCurrency(totalMonthlyVolume)}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Normalized platform monthly commitments
                </p>
              </div>
            </div>
          </div>

          {/* 2. Visual Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Chart 1: Platform Categories Breakdown */}
            <div className="bg-background-card border border-border-card rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col min-h-[340px]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Subscriptions by Category</h3>
                  <p className="text-xs text-text-muted mt-0.5">Distribution across all tracked services</p>
                </div>
                <span className="text-xs font-semibold text-text-muted bg-background-secondary px-2.5 py-1 rounded-full border border-border-card">
                  {categoryChartData.length} Top Categories
                </span>
              </div>

              {categoryChartData.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <PieChartIcon className="w-8 h-8 text-text-muted mb-2" />
                  <p className="text-xs text-text-secondary">No subscriptions recorded on platform yet.</p>
                </div>
              ) : (
                <div className="flex-1 w-full min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={78}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="#16181D"
                        strokeWidth={2}
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#16181D', 
                          border: '1px solid #2B2E36', 
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#FFFFFF'
                        }} 
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(val) => <span className="text-xs text-text-secondary capitalize">{val}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Chart 2: Registrations Timeline */}
            <div className="bg-background-card border border-border-card rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col min-h-[340px]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">User Growth Timeline</h3>
                  <p className="text-xs text-text-muted mt-0.5">Accounts registered over time</p>
                </div>
                <span className="text-xs font-semibold text-accent-primary-from bg-accent-secondary/30 px-2.5 py-1 rounded-full border border-accent-primary-from/20">
                  {totalUsers} Total
                </span>
              </div>

              {timelineData.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <BarChart3 className="w-8 h-8 text-text-muted mb-2" />
                  <p className="text-xs text-text-secondary">No registration history available.</p>
                </div>
              ) : (
                <div className="flex-1 w-full min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262626" />
                      <XAxis dataKey="period" tick={{ fill: '#8C8C8C', fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                      <YAxis allowDecimals={false} tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#16181D', 
                          border: '1px solid #2B2E36', 
                          borderRadius: '12px',
                          fontSize: '12px' 
                        }} 
                      />
                      <Bar dataKey="count" fill="#00F5A0" radius={[6, 6, 0, 0]} maxBarSize={44} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* 3. Recent Registrations Table */}
          <div className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-border-card flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Recent Account Registrations</h3>
                <p className="text-xs text-text-muted mt-0.5">Latest users registered on SubTrack</p>
              </div>
              <Link 
                to="/admin/users"
                className="text-xs font-semibold text-accent-primary-from hover:underline flex items-center gap-1.5"
              >
                <span>View All Users ({totalUsers})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border-card bg-background-secondary/40 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    <th className="px-4 sm:px-6 py-3">User Email</th>
                    <th className="px-4 sm:px-6 py-3">Registered On</th>
                    <th className="px-4 sm:px-6 py-3">Account Status</th>
                    <th className="px-4 sm:px-6 py-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-card/60">
                  {users.slice(0, 5).map((u) => (
                    <tr key={u.user_id} className="hover:bg-background-secondary/30 transition-colors">
                      <td className="px-4 sm:px-6 py-3.5 font-medium text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-background-secondary border border-border-card flex items-center justify-center text-xs font-bold text-accent-primary-from shrink-0">
                            {u.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <span className="truncate max-w-[200px]" title={u.email}>
                            {u.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 text-text-secondary text-xs">
                        {u.created_at ? format(parseISO(u.created_at), 'MMM d, yyyy') : 'N/A'}
                      </td>
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border",
                          u.status === 'active'
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            u.status === 'active' ? "bg-emerald-400" : "bg-red-400"
                          )} />
                          {u.status === 'active' ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                          u.role === 'admin'
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-background-secondary text-text-muted border border-border-card"
                        )}>
                          {u.role || 'user'}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-text-muted text-xs">
                        No registered users found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </AdminLayout>
  );
}
