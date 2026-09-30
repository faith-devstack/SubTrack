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
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const toggleStatus = async (sub: Subscription) => {
    try {
      setIsUpdating(sub.id);
      const newStatus = sub.status === 'active' ? 'canceled' : 'active';
      await updateDoc(doc(db, 'subscriptions', sub.id), {
        status: newStatus
      });
      onRefresh();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(null);
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
    <div className="w-full flex flex-col">
      {/* Top Controls Bar: Search & Filters */}
      <div className="p-3 sm:p-4 border-b border-border-card/80 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between bg-background-card">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-1.5 sm:py-2 border border-border-card rounded-xl bg-background-secondary/80 text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-accent-primary-from focus:border-accent-primary-from text-xs sm:text-sm transition-colors"
            placeholder="Search subscriptions or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-background-secondary/80 rounded-xl px-2.5 py-1 border border-border-card">
            <Filter className="w-3.5 h-3.5 text-text-muted" />
            <select 
              className="bg-transparent text-xs text-text-secondary hover:text-text-primary focus:outline-none py-0.5 pr-1 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              aria-label="Filter by subscription status"
            >
              <option value="all" className="bg-background-card text-text-primary">All Status</option>
              <option value="active" className="bg-background-card text-text-primary">Active</option>
              <option value="canceled" className="bg-background-card text-text-primary">Canceled</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-background-secondary/80 rounded-xl px-2.5 py-1 border border-border-card">
            <select 
              className="bg-transparent text-xs text-text-secondary hover:text-text-primary focus:outline-none py-0.5 pr-1 cursor-pointer"
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value as any)}
              aria-label="Filter by billing cycle"
            >
              <option value="all" className="bg-background-card text-text-primary">All Cycles</option>
              <option value="monthly" className="bg-background-card text-text-primary">Monthly</option>
              <option value="yearly" className="bg-background-card text-text-primary">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP TABLE VIEW (Screens >= 768px): Proportional widths, no overflow */}
      {/* ========================================================================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-card/80 bg-background-secondary/40 text-[11px] font-semibold uppercase tracking-wider text-text-muted select-none">
              <th 
                className="px-3 py-2.5 cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Subscription</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-3 py-2.5 cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => requestSort('category')}
              >
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-3 py-2.5 cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => requestSort('cost')}
              >
                <div className="flex items-center gap-1">
                  <span>Cost</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-3 py-2.5 cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => requestSort('billing_cycle')}
              >
                <div className="flex items-center gap-1">
                  <span>Cycle</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-3 py-2.5 cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => requestSort('next_renewal_date')}
              >
                <div className="flex items-center gap-1">
                  <span>Renewal</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-card/50 text-xs sm:text-sm">
            {sorted.map((sub) => {
              const isCanceled = sub.status === 'canceled';

              return (
                <tr 
                  key={sub.id} 
                  className={cn(
                    "hover:bg-background-secondary/40 transition-colors group",
                    isCanceled && "opacity-60"
                  )}
                >
                  {/* Name */}
                  <td className="px-3 py-3 font-medium text-text-primary">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-background-secondary border border-border-card flex items-center justify-center text-[11px] font-bold text-accent-primary-from shrink-0">
                        {sub.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[150px] lg:max-w-[200px]" title={sub.name}>
                        {sub.name}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-3 text-text-secondary capitalize text-xs">
                    <span className="truncate max-w-[110px] block" title={sub.category}>
                      {sub.category}
                    </span>
                  </td>

                  {/* Cost */}
                  <td className="px-3 py-3 font-bold text-white tabular-nums">
                    {formatCurrency(sub.cost)}
                  </td>

                  {/* Billing Cycle */}
                  <td className="px-3 py-3 text-text-secondary capitalize text-xs">
                    {sub.billing_cycle}
                  </td>

                  {/* Next Renewal */}
                  <td className="px-3 py-3 text-text-secondary text-xs tabular-nums">
                    {format(parseISO(sub.next_renewal_date), 'MMM d, yyyy')}
                  </td>

                  {/* Status Badge */}
                  <td className="px-3 py-3">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border",
                      sub.status === 'active' 
                        ? "bg-accent-secondary/40 text-accent-primary-from border-accent-primary-from/30" 
                        : "bg-background-secondary text-text-muted border-border-card"
                    )}>
                      <span className={cn(
                        "w-1 h-1 rounded-full",
                        sub.status === 'active' ? "bg-accent-primary-from" : "bg-text-muted"
                      )} />
                      {sub.status === 'active' ? 'Active' : 'Canceled'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <button 
                        onClick={() => toggleStatus(sub)}
                        disabled={isUpdating === sub.id}
                        title={sub.status === 'active' ? "Mark as Canceled" : "Mark as Active"}
                        className={cn(
                          "p-1.5 rounded-lg hover:bg-background-secondary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary-from cursor-pointer",
                          sub.status === 'active' ? "text-text-muted hover:text-amber-400" : "text-text-muted hover:text-accent-primary-from"
                        )}
                        aria-label={sub.status === 'active' ? "Mark as canceled" : "Mark as active"}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onEdit(sub)}
                        title="Edit Subscription"
                        className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background-secondary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary-from cursor-pointer"
                        aria-label="Edit subscription"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setDeletingId(sub.id)}
                        title="Delete Subscription"
                        className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary-from cursor-pointer"
                        aria-label="Delete subscription"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-10 text-center text-text-secondary text-xs sm:text-sm">
                  No subscriptions found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE CARD VIEW (Screens < 768px): Zero horizontal overflow */}
      {/* ========================================================================= */}
      <div className="block md:hidden divide-y divide-border-card/60">
        {sorted.map((sub) => {
          const isCanceled = sub.status === 'canceled';

          return (
            <div 
              key={sub.id}
              className={cn(
                "p-3.5 transition-colors",
                isCanceled && "opacity-60 bg-background-secondary/20"
              )}
            >
              {/* Card Header: Service, Category, and Cost */}
              <div className="flex items-start justify-between gap-2.5 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-background-secondary border border-border-card flex items-center justify-center text-xs font-bold text-accent-primary-from shrink-0">
                    {sub.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate" title={sub.name}>
                      {sub.name}
                    </h4>
                    <span className="text-[11px] text-text-muted capitalize">
                      {sub.category}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                    {formatCurrency(sub.cost)}
                  </div>
                  <div className="text-[10px] text-text-muted capitalize">
                    {sub.billing_cycle}
                  </div>
                </div>
              </div>

              {/* Card Meta: Renewal Date & Status & Action Buttons */}
              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-border-card/40">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border",
                    sub.status === 'active' 
                      ? "bg-accent-secondary/40 text-accent-primary-from border-accent-primary-from/30" 
                      : "bg-background-secondary text-text-muted border-border-card"
                  )}>
                    <span className={cn(
                      "w-1 h-1 rounded-full",
                      sub.status === 'active' ? "bg-accent-primary-from" : "bg-text-muted"
                    )} />
                    {sub.status === 'active' ? 'Active' : 'Canceled'}
                  </span>
                  <span className="text-xs text-text-secondary">
                    Renews {format(parseISO(sub.next_renewal_date), 'MMM d')}
                  </span>
                </div>

                {/* Mobile Touch Actions */}
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => toggleStatus(sub)}
                    disabled={isUpdating === sub.id}
                    title={sub.status === 'active' ? "Mark as Canceled" : "Mark as Active"}
                    className={cn(
                      "p-1.5 rounded-lg hover:bg-background-secondary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary-from",
                      sub.status === 'active' ? "text-text-muted hover:text-amber-400" : "text-text-muted hover:text-accent-primary-from"
                    )}
                    aria-label={sub.status === 'active' ? "Mark as canceled" : "Mark as active"}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onEdit(sub)}
                    title="Edit Subscription"
                    className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background-secondary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary-from"
                    aria-label="Edit subscription"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setDeletingId(sub.id)}
                    title="Delete Subscription"
                    className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary-from"
                    aria-label="Delete subscription"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {sorted.length === 0 && (
          <div className="p-6 text-center text-text-secondary text-xs sm:text-sm">
            No subscriptions found matching your filters.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-background-card border border-border-card rounded-2xl p-5 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-bold text-text-primary mb-1.5">Delete subscription?</h3>
            <p className="text-xs text-text-secondary mb-5 leading-relaxed">
              This subscription record will be permanently removed from your dashboard.
            </p>
            <div className="flex justify-end gap-2.5">
              <button 
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-background-secondary border border-border-card text-text-primary hover:bg-border-card transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer shadow-sm"
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
