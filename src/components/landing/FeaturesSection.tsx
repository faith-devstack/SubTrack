import React from 'react';
import { CreditCard, PieChart, Bell, Activity, Settings, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

const features: FeatureItem[] = [
  {
    icon: <CreditCard className="w-5 h-5 text-accent-primary-from" />,
    title: "Track Every Subscription",
    description: "Keep all your recurring bills, digital subscriptions, and memberships organized in one central place.",
    category: "Organization"
  },
  {
    icon: <PieChart className="w-5 h-5 text-accent-primary-from" />,
    title: "Know Your Real Spending",
    description: "Automatically calculate your true monthly and annual commitments with instant cost normalization.",
    category: "Financial Insights"
  },
  {
    icon: <Bell className="w-5 h-5 text-accent-primary-from" />,
    title: "Never Miss a Renewal",
    description: "Stay ahead of upcoming billing dates and unexpected auto-charges with advance renewal alerts.",
    category: "Alerts"
  },
  {
    icon: <Activity className="w-5 h-5 text-accent-primary-from" />,
    title: "Understand Your Spending",
    description: "Visualize your budget distribution across categories like entertainment, productivity, and cloud tools.",
    category: "Analytics"
  },
  {
    icon: <Settings className="w-5 h-5 text-accent-primary-from" />,
    title: "Manage Everything Easily",
    description: "Add new subscriptions, update billing cycles, edit prices, or mark items as canceled in seconds.",
    category: "Control"
  },
  {
    icon: <Shield className="w-5 h-5 text-accent-primary-from" />,
    title: "Your Data Stays Private",
    description: "Protected with individual user accounts and secure cloud database rules ensuring only you access your data.",
    category: "Security"
  }
];

export default function FeaturesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="px-6 py-20 lg:py-28 bg-background-secondary border-t border-border-card/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          <div 
            className={cn(
              "badge mb-3 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-3.5 !py-1 !rounded-full transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            BUILT FOR CLARITY
          </div>
          <h2 
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 [text-wrap:balance] transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Everything you need. Nothing you don't.
          </h2>
          <p 
            className={cn(
              "text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Take control of recurring expenses with a clearer way to track, manage, and understand your subscriptions.
          </p>
        </div>
        
        {/* 6-Card Responsive Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={cn(
                "group bg-[#16181D] border border-border-card/80 hover:border-accent-primary-from/40 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-700 ease-out shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] md:hover:-translate-y-1.5",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: `${250 + index * 80}ms` }}
            >
              <div>
                {/* Header row inside card: Icon and Category kicker */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent-secondary/40 border border-accent-primary-from/20 flex items-center justify-center text-accent-primary-from group-hover:border-accent-primary-from/40 group-hover:bg-accent-secondary/60 transition-colors shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-medium text-text-muted tracking-wide uppercase">
                    {feature.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold mb-2.5 text-text-primary tracking-tight group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom subtle accent line on card hover */}
              <div className="pt-6 mt-2 border-t border-border-card/40 flex items-center justify-between text-xs text-text-muted">
                <span className="group-hover:text-accent-primary-from transition-colors font-medium">Included in SubTrack</span>
                <span className="w-1.5 h-1.5 rounded-full bg-border-card group-hover:bg-accent-primary-from transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
