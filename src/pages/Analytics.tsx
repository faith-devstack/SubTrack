import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Subscription } from '../types/subscription';
import CategoryChart, { CATEGORY_COLORS } from '../components/dashboard/CategoryChart';
import SpendingBarChart from '../components/dashboard/SpendingBarChart';
import MetricCards from '../components/dashboard/MetricCards';
import { formatCurrency } from '../utils/calculations';
import { Loader2, PieChart, TrendingUp, Layers } from 'lucide-react';

export default function Analytics() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const q = query(collection(db, 'subscriptions'), where('user_id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Subscription[];
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  // Compute category table details
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const categoryData: Record<string, number> = activeSubs.reduce((acc, sub) => {
    const monthlyCost = sub.billing_cycle === 'monthly' ? Number(sub.cost) : Number(sub.cost) / 12;
    const cat = sub.category || 'Other';
    acc[cat] = (acc[cat] || 0) + monthlyCost;
    return acc;
  }, {} as Record<string, number>);

  const totalMonthly: number = (Object.values(categoryData) as number[]).reduce((sum: number, val: number) => sum + val, 0);

  const categoryBreakdown = Object.entries(categoryData)
    .map(([name, monthlyCost]: [string, number]) => ({
      name,
      monthlyCost,
      yearlyCost: monthlyCost * 12,
      count: activeSubs.filter(s => (s.category || 'Other').toLowerCase() === name.toLowerCase()).length,
      percentage: totalMonthly > 0 ? Math.round((monthlyCost / totalMonthly) * 100) : 0
    }))
    .sort((a, b) => b.monthlyCost - a.monthlyCost);

  return (
    <DashboardLayout 
      breadcrumb="Analytics"
      title="Analytics & Spending Insights"
      subtitle="Analyze your monthly recurring patterns and category distribution."
    >
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-8 max-w-7xl mx-auto">
          
          {/* Page Sub-header */}
          <div className="hidden sm:block">
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
              Spending Analytics
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Visual breakdowns, category allocations, and annual projected costs for your active subscriptions.
            </p>
          </div>

          {/* 1. Summary Cards (4 Cards with unclipped gauge and readable labels) */}
          <MetricCards subscriptions={subscriptions} />
          
          {/* 2. Visual Charts Row (Doughnut & Bar side-by-side on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div className="min-w-0">
              <CategoryChart subscriptions={subscriptions} />
            </div>
            <div className="min-w-0">
              <SpendingBarChart subscriptions={subscriptions} />
            </div>
          </div>

          {/* 3. Category Breakdown Details Table */}
          {categoryBreakdown.length > 0 && (
            <div className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
              <div className="px-5 sm:px-6 py-4 border-b border-border-card flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-text-primary">
                    Category Breakdown Summary
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Monthly and projected annual totals sorted by highest commitment
                  </p>
                </div>
                <span className="text-xs font-semibold text-text-secondary bg-background-secondary px-3 py-1 rounded-full border border-border-card">
                  {categoryBreakdown.length} {categoryBreakdown.length === 1 ? 'Category' : 'Categories'}
                </span>
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border-card bg-background-secondary/40 text-xs font-semibold uppercase tracking-wider text-text-muted">
                      <th className="px-6 py-3.5">Category</th>
                      <th className="px-6 py-3.5">Subscriptions</th>
                      <th className="px-6 py-3.5">Share of Budget</th>
                      <th className="px-6 py-3.5">Monthly Spend</th>
                      <th className="px-6 py-3.5 text-right">Projected Yearly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-card/60">
                    {categoryBreakdown.map((cat, idx) => (
                      <tr key={cat.name} className="hover:bg-background-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-text-primary capitalize">
                          <div className="flex items-center gap-2.5">
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0" 
                              style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }} 
                            />
                            <span>{cat.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {cat.count} {cat.count === 1 ? 'subscription' : 'subscriptions'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-background-secondary h-1.5 rounded-full overflow-hidden shrink-0 border border-border-card/40">
                              <div 
                                className="h-full rounded-full transition-all duration-500" 
                                style={{ 
                                  width: `${cat.percentage}%`,
                                  backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length]
                                }} 
                              />
                            </div>
                            <span className="text-xs font-medium text-text-secondary tabular-nums">
                              {cat.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-white tabular-nums">
                          {formatCurrency(cat.monthlyCost)}
                        </td>
                        <td className="px-6 py-4 font-medium text-text-secondary text-right tabular-nums">
                          {formatCurrency(cat.yearlyCost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View (< 640px) */}
              <div className="block sm:hidden divide-y divide-border-card/60">
                {categoryBreakdown.map((cat, idx) => (
                  <div key={cat.name} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }} 
                        />
                        <span className="text-sm font-bold text-white capitalize">{cat.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white tabular-nums">
                        {formatCurrency(cat.monthlyCost)}/mo
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-muted pt-1">
                      <span>{cat.count} {cat.count === 1 ? 'service' : 'services'} ({cat.percentage}% of total)</span>
                      <span>{formatCurrency(cat.yearlyCost)}/yr</span>
                    </div>

                    <div className="w-full bg-background-secondary h-1.5 rounded-full overflow-hidden border border-border-card/40 mt-1">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${cat.percentage}%`,
                          backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length]
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </DashboardLayout>
  );
}
