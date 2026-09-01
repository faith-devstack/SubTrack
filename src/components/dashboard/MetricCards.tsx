import React from 'react';
import { Subscription } from '../../types/subscription';
import { calculateMonthlySpend, calculateYearlySpend, formatCurrency } from '../../utils/calculations';
import { differenceInDays, parseISO } from 'date-fns';

interface MetricCardsProps {
  subscriptions: Subscription[];
}

export default function MetricCards({ subscriptions }: MetricCardsProps) {
  const monthlySpend = calculateMonthlySpend(subscriptions);
  const yearlySpend = calculateYearlySpend(subscriptions);
  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  
  const upcomingCount = subscriptions.filter(s => {
    if (s.status !== 'active') return false;
    const days = differenceInDays(parseISO(s.next_renewal_date), new Date());
    return days >= 0 && days <= 14;
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card 
        title="Total Monthly Spend" 
        value={formatCurrency(monthlySpend)} 
        trendUp={false}
        trendValue="2.1% vs last month"
      />
      <Card 
        title="Total Yearly Spend" 
        value={formatCurrency(yearlySpend)} 
        trendUp={true}
        trendValue="4.3% vs last year"
      />
      
      {/* Gauge Card (Matches "Quarterly revenue goal" in image) */}
      <div className="bg-background-card border border-border-card p-5 rounded-2xl flex relative overflow-hidden">
        <div className="flex flex-col z-10 w-full justify-between">
          <h3 className="text-sm font-medium text-text-primary mb-2">Active Ratio</h3>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {subscriptions.length > 0 ? Math.round((activeCount / subscriptions.length) * 100) : 0}%
            </p>
            <p className="text-xs text-text-muted mt-1">Goal: 100%</p>
          </div>
        </div>
        {/* Semi-circle gauge */}
        <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24">
          <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="12" className="text-border-card stroke-current" />
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="12" className="text-accent-primary-from stroke-current" strokeDasharray="125" strokeDashoffset="35" strokeLinecap="round" />
            <circle cx="50" cy="50" r="4" className="fill-text-primary" />
            <path d="M 50 50 L 70 20" stroke="currentColor" strokeWidth="2" className="text-text-primary" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <Card 
        title="Upcoming Renewals" 
        value={upcomingCount.toString()} 
        trendUp={true}
        trendValue="In the next 14 days"
      />
    </div>
  );
}

function Card({ title, value, trendUp, trendValue }: { title: string; value: string; trendUp: boolean; trendValue: string }) {
  return (
    <div className="bg-background-card border border-border-card p-5 rounded-2xl flex flex-col justify-between h-32 min-w-0">
      <h3 className="text-sm font-medium text-text-primary truncate">{title}</h3>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-text-primary mb-2 truncate" title={value}>{value}</p>
        <div className="flex items-center gap-1.5 truncate">
           <svg className={`w-3.5 h-3.5 ${trendUp ? 'text-accent-primary-from' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
             {trendUp ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
             ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
             )}
           </svg>
           <span className={`text-xs ${trendUp ? 'text-accent-primary-from' : 'text-red-500'}`}>{trendValue.split(' ')[0]}</span>
           <span className="text-xs text-text-muted">{trendValue.substring(trendValue.indexOf(' '))}</span>
        </div>
      </div>
    </div>
  );
}
