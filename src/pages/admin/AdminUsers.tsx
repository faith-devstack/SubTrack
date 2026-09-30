import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { db } from '../../lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  setDoc,
  deleteDoc,
  query, 
  where 
} from 'firebase/firestore';
import { UserProfile, useAuth } from '../../contexts/AuthContext';
import { format, parseISO } from 'date-fns';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  ShieldCheck, 
  UserX, 
  UserCheck, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Activity,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminUsers() {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [subscriptionsCountMap, setSubscriptionsCountMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Action Confirmation Modal
  const [actionTarget, setActionTarget] = useState<{
    user: UserProfile;
    actionType: 'suspend' | 'reactivate' | 'promote' | 'demote';
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersData = usersSnap.docs.map(d => ({ ...d.data() })) as UserProfile[];
      setUsers(usersData);

      // Fetch subscriptions to count per user
      const subsSnap = await getDocs(collection(db, 'subscriptions'));
      const counts: Record<string, number> = {};
      subsSnap.docs.forEach(doc => {
        const data = doc.data();
        if (data.user_id) {
          counts[data.user_id] = (counts[data.user_id] || 0) + 1;
        }
      });
      setSubscriptionsCountMap(counts);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setFeedback({ type: 'error', message: 'Failed to load user directory from Firestore.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and sort
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (u.display_name && u.display_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  }).sort((a, b) => {
    const timeA = new Date(a.created_at).getTime() || 0;
    const timeB = new Date(b.created_at).getTime() || 0;
    return sortDirection === 'desc' ? timeB - timeA : timeA - timeB;
  });

  // Paginated slice
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Execute privileged administrative action
  const handleExecuteAction = async () => {
    if (!actionTarget || !currentAdmin) return;

    const { user, actionType } = actionTarget;

    // Guard: Prevent modifying own account status
    if (user.user_id === currentAdmin.uid && (actionType === 'suspend' || actionType === 'demote')) {
      setFeedback({ type: 'error', message: 'Security restriction: You cannot suspend or demote your own administrator account.' });
      setActionTarget(null);
      return;
    }

    try {
      setActionLoading(true);
      const userRef = doc(db, 'users', user.user_id);

      let newStatus = user.status;
      let newRole = user.role;
      let logActionName = '';

      if (actionType === 'suspend') {
        newStatus = 'suspended';
        logActionName = 'SUSPEND_USER_ACCOUNT';
      } else if (actionType === 'reactivate') {
        newStatus = 'active';
        logActionName = 'REACTIVATE_USER_ACCOUNT';
      } else if (actionType === 'promote') {
        newRole = 'admin';
        logActionName = 'PROMOTE_TO_ADMIN';
      } else if (actionType === 'demote') {
        newRole = 'user';
        logActionName = 'DEMOTE_FROM_ADMIN';
      }

      // Update Firestore user document
      await updateDoc(userRef, {
        status: newStatus,
        role: newRole
      });

      // Maintain /admins/{userId} document if role changed
      const adminDocRef = doc(db, 'admins', user.user_id);
      if (newRole === 'admin') {
        await updateDoc(adminDocRef, {
          user_id: user.user_id,
          email: user.email,
          role: 'admin',
          granted_at: new Date().toISOString(),
          granted_by: currentAdmin.email
        }).catch(async () => {
          // If update fails because doc doesn't exist, create it
          await setDoc(adminDocRef, {
            user_id: user.user_id,
            email: user.email,
            role: 'admin',
            granted_at: new Date().toISOString(),
            granted_by: currentAdmin.email
          });
        });
      } else if (actionType === 'demote') {
        await deleteDoc(adminDocRef).catch(() => {});
      }

      // Record immutable audit log
      await addDoc(collection(db, 'admin_audit_logs'), {
        admin_id: currentAdmin.uid,
        admin_email: currentAdmin.email || 'admin',
        action: logActionName,
        target_user_id: user.user_id,
        target_email: user.email,
        details: `Administrator ${currentAdmin.email} executed ${logActionName} on user ${user.email}`,
        timestamp: new Date().toISOString(),
        status: 'success'
      }).catch(logErr => console.warn('Could not write audit log:', logErr));

      setFeedback({ 
        type: 'success', 
        message: `Successfully executed ${actionType} on account ${user.email}.` 
      });

      await fetchUsers();
    } catch (err: any) {
      console.error('Error executing admin action:', err);
      setFeedback({ type: 'error', message: err?.message || 'Operation failed. Check security permissions.' });
    } finally {
      setActionLoading(false);
      setActionTarget(null);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  return (
    <AdminLayout title="User Management" breadcrumb="Users">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            User Directory & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Search registered accounts, inspect subscription volume, and manage platform permissions.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={cn(
            "p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm",
            feedback.type === 'success' 
              ? "bg-accent-secondary/30 border-accent-primary-from/30 text-accent-primary-from" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          )}>
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-xs font-semibold hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-background-card border border-border-card rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-border-card rounded-xl bg-background-secondary text-white placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary-from focus:border-accent-primary-from transition-colors"
              placeholder="Search user by email or name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-background-secondary rounded-xl px-2.5 py-1 border border-border-card">
              <Filter className="w-3.5 h-3.5 text-text-muted" />
              <select
                className="bg-transparent text-xs text-text-secondary hover:text-white focus:outline-none py-1 pr-1 cursor-pointer"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
              >
                <option value="all" className="bg-background-card text-white">All Statuses</option>
                <option value="active" className="bg-background-card text-white">Active Only</option>
                <option value="suspended" className="bg-background-card text-white">Suspended Only</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-1.5 bg-background-secondary rounded-xl px-2.5 py-1 border border-border-card">
              <select
                className="bg-transparent text-xs text-text-secondary hover:text-white focus:outline-none py-1 px-1 cursor-pointer"
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
              >
                <option value="all" className="bg-background-card text-white">All Roles</option>
                <option value="user" className="bg-background-card text-white">Standard Users</option>
                <option value="admin" className="bg-background-card text-white">Admins</option>
              </select>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-1.5 bg-background-secondary hover:bg-border-card text-text-secondary hover:text-white rounded-xl px-3 py-1.5 border border-border-card text-xs font-medium transition-colors cursor-pointer"
              title="Toggle sort direction by registration date"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-accent-primary-from" />
              <span>{sortDirection === 'desc' ? 'Newest' : 'Oldest'}</span>
            </button>
          </div>
        </div>

        {/* User Table (Desktop >= 768px) */}
        <div className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border-card bg-background-secondary/40 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none">
                      <th className="px-4 py-3">Account / Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Subscriptions</th>
                      <th className="px-4 py-3">Joined Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-card/50">
                    {paginatedUsers.map((u) => {
                      const isCurrentAdmin = u.user_id === currentAdmin?.uid;
                      const subCount = subscriptionsCountMap[u.user_id] || 0;

                      return (
                        <tr key={u.user_id} className="hover:bg-background-secondary/30 transition-colors">
                          {/* Email & Name */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-background-secondary border border-border-card flex items-center justify-center text-xs font-bold text-accent-primary-from shrink-0">
                                {u.email?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-white truncate max-w-[200px]" title={u.email}>
                                  {u.email}
                                  {isCurrentAdmin && (
                                    <span className="ml-2 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                      You
                                    </span>
                                  )}
                                </p>
                                <p className="text-[11px] text-text-muted truncate">
                                  ID: {u.user_id.slice(0, 10)}...
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="px-4 py-3.5">
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                              u.role === 'admin'
                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                : "bg-background-secondary text-text-muted border border-border-card"
                            )}>
                              {u.role || 'user'}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5">
                            <span className={cn(
                              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border",
                              u.status === 'active'
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            )}>
                              <span className={cn(
                                "w-1 h-1 rounded-full",
                                u.status === 'active' ? "bg-emerald-400" : "bg-red-400"
                              )} />
                              {u.status === 'active' ? 'Active' : 'Suspended'}
                            </span>
                          </td>

                          {/* Subscriptions Count */}
                          <td className="px-4 py-3.5 font-semibold text-text-secondary tabular-nums">
                            {subCount} tracked
                          </td>

                          {/* Joined */}
                          <td className="px-4 py-3.5 text-text-secondary text-xs tabular-nums">
                            {u.created_at ? format(parseISO(u.created_at), 'MMM d, yyyy') : 'N/A'}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Suspend / Reactivate */}
                              {u.status === 'active' ? (
                                <button
                                  disabled={isCurrentAdmin}
                                  onClick={() => setActionTarget({ user: u, actionType: 'suspend' })}
                                  className={cn(
                                    "px-2.5 py-1 rounded-lg text-xs font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 transition-colors cursor-pointer",
                                    isCurrentAdmin && "opacity-40 cursor-not-allowed"
                                  )}
                                  title={isCurrentAdmin ? "Cannot suspend own admin account" : "Suspend user"}
                                >
                                  Suspend
                                </button>
                              ) : (
                                <button
                                  onClick={() => setActionTarget({ user: u, actionType: 'reactivate' })}
                                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 transition-colors cursor-pointer"
                                >
                                  Reactivate
                                </button>
                              )}

                              {/* Role Toggle (Promote/Demote) */}
                              {u.role === 'user' ? (
                                <button
                                  onClick={() => setActionTarget({ user: u, actionType: 'promote' })}
                                  className="px-2 py-1 rounded-lg text-xs font-semibold text-amber-400 hover:text-white bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 transition-colors cursor-pointer"
                                  title="Promote to Administrator"
                                >
                                  Make Admin
                                </button>
                              ) : (
                                <button
                                  disabled={isCurrentAdmin}
                                  onClick={() => setActionTarget({ user: u, actionType: 'demote' })}
                                  className={cn(
                                    "px-2 py-1 rounded-lg text-xs font-semibold text-text-muted hover:text-white bg-background-secondary hover:bg-border-card border border-border-card transition-colors cursor-pointer",
                                    isCurrentAdmin && "opacity-40 cursor-not-allowed"
                                  )}
                                  title={isCurrentAdmin ? "Cannot demote own admin account" : "Demote to user"}
                                >
                                  Demote
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {paginatedUsers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-text-muted text-xs">
                          No users match the search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List (< 768px) */}
              <div className="block md:hidden divide-y divide-border-card/60">
                {paginatedUsers.map((u) => {
                  const isCurrentAdmin = u.user_id === currentAdmin?.uid;
                  const subCount = subscriptionsCountMap[u.user_id] || 0;

                  return (
                    <div key={u.user_id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate" title={u.email}>
                            {u.email}
                          </p>
                          <p className="text-[11px] text-text-muted">
                            Joined {u.created_at ? format(parseISO(u.created_at), 'MMM d, yyyy') : 'N/A'}
                          </p>
                        </div>
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border",
                          u.status === 'active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          {u.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-text-secondary pt-1 border-t border-border-card/40">
                        <span>Role: <strong className="text-white uppercase">{u.role}</strong></span>
                        <span>{subCount} Subscriptions</span>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex items-center gap-2 pt-1">
                        {u.status === 'active' ? (
                          <button
                            disabled={isCurrentAdmin}
                            onClick={() => setActionTarget({ user: u, actionType: 'suspend' })}
                            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 disabled:opacity-40"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => setActionTarget({ user: u, actionType: 'reactivate' })}
                            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                          >
                            Reactivate
                          </button>
                        )}

                        {u.role === 'user' ? (
                          <button
                            onClick={() => setActionTarget({ user: u, actionType: 'promote' })}
                            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20"
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            disabled={isCurrentAdmin}
                            onClick={() => setActionTarget({ user: u, actionType: 'demote' })}
                            className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-text-muted bg-background-secondary border border-border-card disabled:opacity-40"
                          >
                            Demote
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="p-4 border-t border-border-card flex items-center justify-between text-xs text-text-muted">
                <span>
                  Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg bg-background-secondary border border-border-card hover:bg-border-card text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-white px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-1.5 rounded-lg bg-background-secondary border border-border-card hover:bg-border-card text-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Confirmation Modal */}
      {actionTarget && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-background-card border border-border-card rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white capitalize">
                  Confirm {actionTarget.actionType} Action
                </h3>
                <p className="text-xs text-text-muted">Target: {actionTarget.user.email}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {actionTarget.actionType === 'suspend' && (
                <>Are you sure you want to suspend <strong>{actionTarget.user.email}</strong>? Suspended accounts will be flagged in Firestore and their access will be restricted.</>
              )}
              {actionTarget.actionType === 'reactivate' && (
                <>Are you sure you want to reactivate <strong>{actionTarget.user.email}</strong>? The user will immediately regain active account standing.</>
              )}
              {actionTarget.actionType === 'promote' && (
                <>Promoting <strong>{actionTarget.user.email}</strong> to Administrator will grant this account complete administrative access to view platform metrics and manage user statuses.</>
              )}
              {actionTarget.actionType === 'demote' && (
                <>Demoting <strong>{actionTarget.user.email}</strong> will revoke all administrator permissions and return the account to standard subscriber status.</>
              )}
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => setActionTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-background-secondary border border-border-card text-text-primary hover:bg-border-card transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleExecuteAction}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm",
                  actionTarget.actionType === 'suspend' ? "bg-red-500 hover:bg-red-600" :
                  actionTarget.actionType === 'promote' ? "bg-amber-500 hover:bg-amber-600 text-black font-bold" :
                  "bg-gradient-primary text-background-primary font-bold"
                )}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm {actionTarget.actionType}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
