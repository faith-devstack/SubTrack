import React from 'react';
import { Subscription } from '../../types/subscription';
import { differenceInDays, parseISO, format } from 'date-fns';
import { formatCurrency } from '../../utils/calculations';
import { Clock } from 'lucide-react';
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

  if (upcoming.length === 0) {
    return (
      <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center mb-4">
          <Clock className="w-6 h-6 text-text-muted" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-1">No Upcoming Renewals</h3>
        <p className="text-sm text-text-secondary">You have no subscriptions renewing in the next 14 days.</p>
      </div>
    );
  }

  return (
    <div className="bg-background-card border border-border-card rounded-2xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-text-primary mb-6">Upcoming Renewals</h3>
      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {upcoming.map(sub => {
          const isUrgent = sub.daysRemaining <= 3;
          const isSoon = sub.daysRemaining > 3 && sub.daysRemaining <= 7;
          
          return (
            <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl border border-border-card bg-background-secondary/50">
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-text-primary truncate" title={sub.name}>{sub.name}</span>
                <span className="text-xs text-text-secondary capitalize truncate" title={sub.category}>{sub.category}</span>
              </div>
              
              <div className="flex flex-col items-end shrink-0 ml-4">
                <span className="font-bold text-text-primary">{formatCurrency(sub.cost)}</span>
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-md mt-1",
                  isUrgent ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                  isSoon ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                  "bg-accent-secondary/50 text-accent-primary-from border border-accent-secondary"
                )}>
                  {sub.daysRemaining === 0 ? 'Today' : `In ${sub.daysRemaining} days`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
