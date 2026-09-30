import React from 'react';
import { Subscription } from '../../types/subscription';
import { differenceInDays, parseISO } from 'date-fns';
import { formatCurrency } from '../../utils/calculations';
import { Bell, Activity, Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RightSidebarProps {
  subscriptions: Subscription[];
}

export default function RightSidebar({ subscriptions }: RightSidebarProps) {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const sortedByCreated = [...subscriptions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
  // Find nearest upcoming renewal
  const upcomingSubs = activeSubs
    .map(s => ({ ...s, days: differenceInDays(parseISO(s.next_renewal_date), new Date()) }))
    .filter(s => s.days >= 0 && s.days <= 14)
    .sort((a, b) => a.days - b.days);

  return (
    <div className="w-full xl:w-[260px] 2xl:w-[280px] shrink-0 space-y-4">
      
      {/* Notifications Panel */}
      <div className="bg-background-card border border-border-card rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-accent-primary-from" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h3>
          </div>
          <span className="text-[10px] font-semibold text-accent-primary-from bg-accent-secondary/30 px-2 py-0.5 rounded-full border border-accent-primary-from/20">
            Live
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Notification 1: Active Tracking */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-background-secondary/50 border border-border-card/60">
            <div className="p-1 rounded-lg bg-accent-secondary/40 text-accent-primary-from shrink-0 mt-0.5">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white leading-tight">
                {activeSubs.length} Active Tracked
              </p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                All metrics up to date.
              </p>
            </div>
          </div>

          {/* Notification 2: Upcoming Renewal Alert */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-background-secondary/50 border border-border-card/60">
            <div className="p-1 rounded-lg bg-amber-500/15 text-amber-400 shrink-0 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white leading-tight">
                {upcomingSubs.length > 0
                  ? `${upcomingSubs.length} Due Soon`
                  : "No Urgent Renewals"}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-snug truncate">
                {upcomingSubs.length > 0
                  ? `Next: ${upcomingSubs[0].name} (${upcomingSubs[0].days === 0 ? 'today' : `${upcomingSubs[0].days}d`})`
                  : "Within the next 14 days."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Panel */}
      <div className="bg-background-card border border-border-card rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-text-secondary" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Activity</h3>
          </div>
          <span className="text-[10px] text-text-muted">
            {subscriptions.length} logged
          </span>
        </div>

        <div className="space-y-2">
          {sortedByCreated.slice(0, 3).map((sub) => (
            <div key={sub.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-background-secondary/40 border border-border-card/50">
              <div className="w-6 h-6 rounded-lg bg-background-primary border border-border-card flex items-center justify-center text-[11px] font-bold text-accent-primary-from shrink-0">
                {sub.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-medium text-white truncate" title={sub.name}>
                    {sub.name}
                  </span>
                  <span className="text-xs font-bold text-white tabular-nums shrink-0">
                    {formatCurrency(sub.cost)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-1 text-[10px] text-text-muted">
                  <span className="capitalize truncate">{sub.category}</span>
                  <span className="capitalize shrink-0">{sub.billing_cycle}</span>
                </div>
              </div>
            </div>
          ))}

          {sortedByCreated.length === 0 && (
            <div className="py-4 text-center text-xs text-text-muted">
              No recent activity logged.
            </div>
          )}
        </div>
      </div>

      {/* SubTrack Account Plan Info */}
      <div className="bg-background-card border border-border-card rounded-2xl p-4 relative overflow-hidden shadow-xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-accent-primary-from">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SUBTRACK PLAN</span>
          </div>
          <span className="text-[10px] font-semibold text-text-secondary bg-background-secondary px-2 py-0.5 rounded-full border border-border-card">
            Active
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-snug mb-3">
          Standard manual tracking & analytics enabled.
        </p>
        <Link 
          to="/#pricing"
          className="w-full py-1.5 px-2.5 rounded-xl bg-background-secondary hover:bg-border-card border border-border-card text-[11px] font-semibold text-text-primary flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>View All Plans</span>
          <ArrowRight className="w-3 h-3 text-accent-primary-from" />
        </Link>
      </div>

    </div>
  );
}
