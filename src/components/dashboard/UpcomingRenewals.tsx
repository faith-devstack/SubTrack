import React from 'react';
import { Subscription } from '../../types/subscription';
import { differenceInDays, parseISO } from 'date-fns';
import { formatCurrency } from '../../utils/calculations';
import { Clock, CalendarCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface UpcomingRenewalsProps {
  subscriptions: Subscription[];
}

export default function UpcomingRenewals({ subscriptions }: UpcomingRenewalsProps) {
  const upcoming = subscriptions
    .filter(s => s.status === 'active')
    .map(s => {
      const days = differenceInDays(parseISO(s.next_renewal_date), new Date());
      return { ...s, daysRemaining: days };
    })
    .filter(s => s.daysRemaining >= 0 && s.daysRemaining <= 14)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  return (
    <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full min-h-[320px] flex flex-col shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Upcoming Renewals</h3>
          <p className="text-xs text-text-muted mt-0.5">Next 14 days</p>
        </div>
        {upcoming.length > 0 && (
          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            {upcoming.length} due
          </span>
        )}
      </div>

      {upcoming.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <div className="w-11 h-11 bg-background-secondary rounded-xl border border-border-card flex items-center justify-center mb-3 text-accent-primary-from">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-text-primary mb-1">No Upcoming Renewals</h4>
          <p className="text-xs text-text-secondary max-w-[220px] leading-relaxed">
            All your active subscriptions are comfortably beyond the 14-day renewal window.
          </p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {upcoming.map(sub => {
            const isUrgent = sub.daysRemaining <= 3;
            const isSoon = sub.daysRemaining > 3 && sub.daysRemaining <= 7;
            
            return (
              <div 
                key={sub.id} 
                className="flex items-center justify-between p-3 rounded-xl border border-border-card bg-background-secondary/40 hover:bg-background-secondary/70 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-background-primary border border-border-card flex items-center justify-center text-xs font-bold text-accent-primary-from shrink-0">
                    {sub.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-text-primary truncate" title={sub.name}>
                      {sub.name}
                    </span>
                    <span className="text-[11px] text-text-muted capitalize truncate" title={sub.category}>
                      {sub.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end shrink-0 ml-3">
                  <span className="text-xs font-bold text-white tabular-nums">
                    {formatCurrency(sub.cost)}
                  </span>
                  <span className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 border",
                    isUrgent ? "bg-red-500/15 text-red-400 border-red-500/30" :
                    isSoon ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" :
                    "bg-accent-secondary/50 text-accent-primary-from border-accent-primary-from/30"
                  )}>
                    {sub.daysRemaining === 0 ? 'Today' : `In ${sub.daysRemaining}d`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
