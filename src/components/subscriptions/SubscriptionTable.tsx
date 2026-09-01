import React, { useState } from 'react';
import { Subscription } from '../../types/subscription';
import { formatCurrency } from '../../utils/calculations';
import { format, parseISO } from 'date-fns';
import { Edit2, Trash2, Power, Search, Filter, ArrowUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { db } from '../../lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onRefresh: () => void;
}

export default function SubscriptionTable({ subscriptions, onEdit, onRefresh }: SubscriptionTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'canceled'>('all');
  const [cycleFilter, setCycleFilter] = useState<'all' | 'monthly' | 'yearly'>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Subscription, direction: 'asc' | 'desc' } | null>(null);
  
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleStatus = async (sub: Subscription) => {
    try {
      const newStatus = sub.status === 'active' ? 'canceled' : 'active';
      await updateDoc(doc(db, 'subscriptions', sub.id), {
        status: newStatus
      });
      onRefresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'subscriptions', id));
      setDeletingId(null);
      onRefresh();
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const requestSort = (key: keyof Subscription) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filtered = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sub.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesCycle = cycleFilter === 'all' || sub.billing_cycle === cycleFilter;
    
    return matchesSearch && matchesStatus && matchesCycle;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    let aVal = a[key];
    let bVal = b[key];
    
    if (key === 'cost') {
      aVal = Number(aVal);
      bVal = Number(bVal);
    } else if (key === 'next_renewal_date' || key === 'created_at') {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-background-card border border-border-card rounded-2xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border-card flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border-card rounded-lg bg-background-secondary text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from sm:text-sm"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-background-secondary rounded-lg p-1 border border-border-card">
            <Filter className="w-4 h-4 text-text-muted ml-2" />
            <select 
              className="bg-transparent text-sm text-text-primary focus:outline-none py-1 pr-2 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-background-secondary rounded-lg p-1 border border-border-card">
            <select 
              className="bg-transparent text-sm text-text-primary focus:outline-none py-1 px-2 cursor-pointer"
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value as any)}
            >
              <option value="all">All Cycles</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-card bg-background-secondary/50 text-sm text-text-secondary">
              <th className="px-6 py-4 font-medium cursor-pointer hover:text-text-primary transition-colors" onClick={() => requestSort('name')}>
                <div className="flex items-center gap-2">Subscription <ArrowUpDown className="w-4 h-4" /></div>
              </th>
              <th className="px-6 py-4 font-medium cursor-pointer hover:text-text-primary transition-colors" onClick={() => requestSort('category')}>
                <div className="flex items-center gap-2">Category <ArrowUpDown className="w-4 h-4" /></div>
              </th>
              <th className="px-6 py-4 font-medium cursor-pointer hover:text-text-primary transition-colors" onClick={() => requestSort('cost')}>
                <div className="flex items-center gap-2">Cost <ArrowUpDown className="w-4 h-4" /></div>
              </th>
              <th className="px-6 py-4 font-medium cursor-pointer hover:text-text-primary transition-colors" onClick={() => requestSort('billing_cycle')}>
                <div className="flex items-center gap-2">Billing Cycle <ArrowUpDown className="w-4 h-4" /></div>
              </th>
              <th className="px-6 py-4 font-medium cursor-pointer hover:text-text-primary transition-colors" onClick={() => requestSort('next_renewal_date')}>
                <div className="flex items-center gap-2">Next Renewal <ArrowUpDown className="w-4 h-4" /></div>
              </th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-card">
            {sorted.map((sub) => (
              <tr key={sub.id} className={cn("hover:bg-background-secondary/30 transition-colors", sub.status === 'canceled' && "opacity-60")}>
                <td className="px-6 py-4 font-medium text-text-primary">
                  <div className="truncate max-w-[150px] sm:max-w-[200px]" title={sub.name}>{sub.name}</div>
                </td>
                <td className="px-6 py-4 capitalize text-text-secondary">
                  <div className="truncate max-w-[120px]" title={sub.category}>{sub.category}</div>
                </td>
                <td className="px-6 py-4 font-medium text-text-primary">{formatCurrency(sub.cost)}</td>
                <td className="px-6 py-4 capitalize text-text-secondary">{sub.billing_cycle}</td>
                <td className="px-6 py-4 text-text-secondary">{format(parseISO(sub.next_renewal_date), 'MMM d, yyyy')}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    sub.status === 'active' 
                      ? "bg-accent-secondary/30 text-accent-primary-from border-accent-secondary/50" 
                      : "bg-background-secondary text-text-muted border-border-card"
                  )}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => toggleStatus(sub)}
                      title={sub.status === 'active' ? "Cancel Subscription" : "Activate Subscription"}
                      className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-background-secondary transition-colors"
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(sub)}
                      title="Edit"
                      className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-background-secondary transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setDeletingId(sub.id)}
                      title="Delete"
                      className="p-2 text-text-secondary hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                  No subscriptions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-background-card border border-border-card rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-text-primary mb-2">Delete subscription?</h3>
            <p className="text-text-secondary mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg font-medium bg-background-secondary border border-border-card text-text-primary hover:bg-border-card transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
