import React from 'react';
import { Subscription } from '../../types/subscription';
import { calculateMonthlySpend, calculateYearlySpend, formatCurrency } from '../../utils/calculations';
import { differenceInDays, parseISO } from 'date-fns';
import { cn } from '../../lib/utils';

interface MetricCardsProps {
  subscriptions: Subscription[];
}

export default function MetricCards({ subscriptions }: MetricCardsProps) {
  const monthlySpend = calculateMonthlySpend(subscriptions);
  const yearlySpend = calculateYearlySpend(subscriptions);
  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const totalCount = subscriptions.length;
  
  const activePercentage = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;
  
  const upcomingCount = subscriptions.filter(s => {
    if (s.status !== 'active') return false;
    const days = differenceInDays(parseISO(s.next_renewal_date), new Date());
    return days >= 0 && days <= 14;
  }).length;

  // Semicircle gauge geometry
  // Arc radius: 38, Center: (50, 50), ViewBox: 0 0 100 58
  // Total arc length: pi * 38 ≈ 119.38
  const ARC_LENGTH = 119.38;
  const ratio = Math.max(0, Math.min(100, activePercentage)) / 100;
  const strokeDashoffset = ARC_LENGTH * (1 - ratio);
  
  // Needle calculation: 0% -> 180deg (left), 100% -> 0deg (right)
  const needleAngleDeg = 180 - ratio * 180;
  const needleRad = (needleAngleDeg * Math.PI) / 180;
  const needleLen = 26;
  const needleX = 50 + needleLen * Math.cos(needleRad);
  const needleY = 50 - needleLen * Math.sin(needleRad);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
      
      {/* 1. Total Monthly Spend */}
      <div className="bg-background-card border border-border-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between min-h-[136px] hover:border-border-card/90 transition-colors shadow-xs">
        <h3 className="text-xs sm:text-sm font-medium text-text-secondary leading-snug">
          Total Monthly Spend
        </h3>
        <div className="mt-2">
          <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
            {formatCurrency(monthlySpend)}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-accent-primary-from">
            <span className="flex items-center gap-0.5 font-medium">
              ↓ 2.1%
            </span>
            <span className="text-text-muted">vs last month</span>
          </div>
        </div>
      </div>

      {/* 2. Total Yearly Spend */}
      <div className="bg-background-card border border-border-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between min-h-[136px] hover:border-border-card/90 transition-colors shadow-xs">
        <h3 className="text-xs sm:text-sm font-medium text-text-secondary leading-snug">
          Total Yearly Spend
        </h3>
        <div className="mt-2">
          <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
            {formatCurrency(yearlySpend)}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-accent-primary-from">
            <span className="flex items-center gap-0.5 font-medium">
              ↑ 4.3%
            </span>
            <span className="text-text-muted">vs last year</span>
          </div>
        </div>
      </div>
      
      {/* 3. Active Ratio (Separated Layout, No Text Overlap, Full Unclipped Arc) */}
      <div className="bg-background-card border border-border-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between min-h-[136px] hover:border-border-card/90 transition-colors shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs sm:text-sm font-medium text-text-secondary leading-snug">
            Active Ratio
          </h3>
          <span className="text-[11px] text-text-muted font-medium shrink-0">
            Goal: 100%
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-3 mt-2">
          <div className="min-w-0">
            <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
              {activePercentage}%
            </p>
            <p className="text-xs text-text-muted mt-1 truncate">
              {activeCount} of {totalCount} active
            </p>
          </div>

          {/* Semicircle Gauge in dedicated unclipped flex container */}
          <div className="w-16 h-11 sm:w-20 sm:h-13 shrink-0 flex items-center justify-end">
            <svg 
              viewBox="0 0 100 58" 
              className="w-full h-full max-h-12 overflow-visible"
              aria-label={`Active ratio gauge showing ${activePercentage}%`}
              role="img"
            >
              {/* Background Arc Track */}
              <path 
                d="M 12 50 A 38 38 0 0 1 88 50" 
                fill="none" 
                stroke="#2A2A2A" 
                strokeWidth="8" 
                strokeLinecap="round" 
              />
              {/* Active Mint Progress Arc */}
              <path 
                d="M 12 50 A 38 38 0 0 1 88 50" 
                fill="none" 
                stroke="#00F5A0" 
                strokeWidth="8" 
                strokeDasharray={ARC_LENGTH} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" 
                className="transition-all duration-700 ease-out"
              />
              {/* Needle Indicator */}
              <line 
                x1="50" 
                y1="50" 
                x2={needleX} 
                y2={needleY} 
                stroke="#FFFFFF" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                className="transition-all duration-700 ease-out"
              />
              {/* Center Pivot Point */}
              <circle cx="50" cy="50" r="4.5" fill="#00F5A0" stroke="#121212" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Renewals */}
      <div className="bg-background-card border border-border-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between min-h-[136px] hover:border-border-card/90 transition-colors shadow-xs">
        <h3 className="text-xs sm:text-sm font-medium text-text-secondary leading-snug">
          Upcoming Renewals
        </h3>
        <div className="mt-2">
          <p className="text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
            {upcomingCount}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <span className={cn(
              "font-medium",
              upcomingCount > 0 ? "text-amber-400" : "text-accent-primary-from"
            )}>
              {upcomingCount > 0 ? "Action needed" : "All clear"}
            </span>
            <span className="text-text-muted">· next 14 days</span>
          </div>
        </div>
      </div>

    </div>
  );
}
