import React from 'react';
import { Subscription } from '../../types/subscription';
import { differenceInDays, parseISO, format } from 'date-fns';
import { formatCurrency } from '../../utils/calculations';

interface RightSidebarProps {
  subscriptions: Subscription[];
}

export default function RightSidebar({ subscriptions }: RightSidebarProps) {
  
  // Activities could be a mock or computed from recent changes (which we don't track right now).
  // We'll create some inferred activities (e.g. recently added subscriptions).
  const sortedByCreated = [...subscriptions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
  return (
    <div className="w-full xl:w-[320px] flex-shrink-0 space-y-8 pb-8">
      
      {/* Notifications */}
      <section>
        <h3 className="text-sm font-medium text-text-primary mb-4">Notifications</h3>
        <div className="space-y-4">
          <NotificationItem 
            icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            title={`${sortedByCreated.length} Active subscriptions.`}
            time="Just now"
            color="text-accent-primary-from"
          />
          <NotificationItem 
            icon="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            title="Subscription limit checked."
            time="59 minutes ago"
            color="text-text-muted"
          />
          <NotificationItem 
            icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            title="Payment reminders set."
            time="12 hours ago"
            color="text-text-muted"
          />
        </div>
      </section>

      <hr className="border-border-card" />

      {/* Activities */}
      <section>
        <h3 className="text-sm font-medium text-text-primary mb-4">Activities</h3>
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-card before:to-transparent">
          {sortedByCreated.slice(0, 3).map((sub, idx) => (
             <div key={sub.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-background-primary bg-background-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow text-accent-primary-from">
                  {idx === 0 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  ) : (
                    <img src={`https://ui-avatars.com/api/?name=${sub.name}&background=1A3C34&color=00F5A0`} alt={sub.name} className="rounded-full w-full h-full object-cover" />
                  )}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded bg-background-card border border-border-card shadow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-text-primary text-xs truncate">{idx === 0 ? "Added new subscription" : "Updated subscription"}</span>
                  </div>
                  <div className="text-text-secondary text-xs truncate" title={`${sub.name} - ${formatCurrency(sub.cost)}`}>
                    {sub.name} - {formatCurrency(sub.cost)}
                  </div>
                </div>
             </div>
          ))}
          {sortedByCreated.length === 0 && (
             <p className="text-sm text-text-secondary pl-12">No recent activity.</p>
          )}
        </div>
      </section>

      <hr className="border-border-card" />

      {/* Contacts / Support */}
      <section>
        <h3 className="text-sm font-medium text-text-primary mb-4">Contacts of your managers</h3>
        <div className="space-y-3">
           <ContactItem name="Daniel Craig" active={false} />
           <ContactItem name="Kate Morrison" active={false} />
           <ContactItem name="Nataniel Donowan" active={true} />
           <ContactItem name="Elisabeth Wayne" active={false} />
           <ContactItem name="Felicia Raspet" active={false} />
        </div>
      </section>
      
    </div>
  );
}

function NotificationItem({ icon, title, time, color }: { icon: string, title: string, time: string, color: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-full bg-background-card border border-border-card ${color}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-sm text-text-primary">{title}</p>
        <p className="text-xs text-text-muted mt-0.5">{time}</p>
      </div>
    </div>
  )
}

function ContactItem({ name, active }: { name: string, active: boolean }) {
  if (active) {
    return (
      <div className="flex items-center justify-between p-2 rounded-xl bg-gradient-primary text-background-primary shadow-lg shadow-accent-primary-from/20">
        <div className="flex items-center gap-3">
          <img src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} className="w-8 h-8 rounded-full border-2 border-background-primary/20" />
          <span className="text-sm font-bold">{name}</span>
        </div>
        <div className="flex items-center gap-2 pr-2">
           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-background-card transition-colors group cursor-pointer">
      <div className="flex items-center gap-3">
        <img src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} className="w-8 h-8 rounded-full" />
        <span className="text-sm text-text-primary group-hover:text-accent-primary-from transition-colors">{name}</span>
      </div>
      <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    </div>
  )
}
