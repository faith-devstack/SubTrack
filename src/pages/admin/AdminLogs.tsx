import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { format, parseISO } from 'date-fns';
import { 
  FileText, 
  Search, 
  Loader2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AuditLogItem {
  id: string;
  admin_id: string;
  admin_email: string;
  action: string;
  target_user_id?: string;
  target_email?: string;
  details: string;
  timestamp: string;
  status: 'success' | 'failure';
}

export default function AdminLogs() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failure'>('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const snap = await getDocs(collection(db, 'admin_audit_logs'));
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AuditLogItem[];

        // Sort newest first
        data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setLogs(data);
      } catch (err) {
        console.error('Error fetching admin logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.admin_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (log.target_email && log.target_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Activity Logs" breadcrumb="Activity Logs">
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Administrative Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Immutable log of security modifications, user suspensions, and administrative role updates.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-background-card border border-border-card rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-xs">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-border-card rounded-xl bg-background-secondary text-white placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary-from focus:border-accent-primary-from transition-colors"
              placeholder="Search logs by action, admin, or target email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-background-secondary rounded-xl px-2.5 py-1 border border-border-card">
              <Filter className="w-3.5 h-3.5 text-text-muted" />
              <select
                className="bg-transparent text-xs text-text-secondary hover:text-white focus:outline-none py-1 pr-1 cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all" className="bg-background-card text-white">All Results</option>
                <option value="success" className="bg-background-card text-white">Successes Only</option>
                <option value="failure" className="bg-background-card text-white">Failures Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border-card bg-background-secondary/40 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none">
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Admin</th>
                    <th className="px-4 py-3">Target User</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-card/50">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-background-secondary/30 transition-colors">
                      {/* Timestamp */}
                      <td className="px-4 py-3 text-text-secondary whitespace-nowrap text-xs tabular-nums">
                        {log.timestamp ? format(parseISO(log.timestamp), 'MMM d, yyyy HH:mm:ss') : 'N/A'}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 font-semibold text-white">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-background-secondary border border-border-card">
                          {log.action}
                        </span>
                      </td>

                      {/* Admin */}
                      <td className="px-4 py-3 text-text-secondary text-xs">
                        <span className="truncate max-w-[150px] block" title={log.admin_email}>
                          {log.admin_email}
                        </span>
                      </td>

                      {/* Target */}
                      <td className="px-4 py-3 text-text-secondary text-xs">
                        <span className="truncate max-w-[150px] block" title={log.target_email || log.target_user_id || 'N/A'}>
                          {log.target_email || log.target_user_id || 'System'}
                        </span>
                      </td>

                      {/* Details */}
                      <td className="px-4 py-3 text-text-muted text-xs max-w-xs truncate" title={log.details}>
                        {log.details}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-right">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                          log.status === 'success'
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        )}>
                          {log.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          <span className="capitalize">{log.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-text-muted text-xs">
                        No administrative audit logs recorded yet. Action events like user suspensions or role updates will be immutably recorded here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
