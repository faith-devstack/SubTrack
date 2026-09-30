import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$0',
    interval: '/month',
    description: 'Essential recurring expense tracking for individuals getting started.',
    features: [
      'Track up to 5 subscriptions',
      'Monthly & annual spending totals',
      'Upcoming renewal timeline',
      'Secure email authentication',
      'Full data management & deletion'
    ],
    ctaLabel: 'Get Started Free',
    ctaHref: '/signup'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$4.99',
    interval: '/month',
    description: 'Complete visibility with unlimited tracking and detailed spending insights.',
    badge: 'Most Popular',
    isPopular: true,
    features: [
      'Unlimited subscriptions',
      'Advanced category analytics',
      'Custom renewal date tracking',
      'Real-time Firestore cloud sync',
      'Multi-device account access'
    ],
    ctaLabel: 'Get Started with Pro',
    ctaHref: '/signup'
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$49.99',
    interval: 'one-time',
    description: 'One single payment for ongoing access to all current Pro features.',
    features: [
      'All Pro features included',
      'Single one-time payment',
      'Continuous app updates',
      'Account data isolation',
      'No recurring monthly fees'
    ],
    ctaLabel: 'Get Lifetime Access',
    ctaHref: '/signup'
  }
];

export default function PricingSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="px-6 py-20 lg:py-32 bg-background-primary border-t border-border-card/60 relative overflow-hidden"
    >
      {/* Background glow behind recommended card */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent-primary-from/5 rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <div 
            className={cn(
              "badge mb-3 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-3.5 !py-1 !rounded-full transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            SIMPLE, TRANSPARENT PRICING
          </div>
          <h2 
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 [text-wrap:balance] transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            The right plan for your subscriptions.
          </h2>
          <p 
            className={cn(
              "text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Choose the plan that fits your needs. Start with what works for you and upgrade only when you need more.
          </p>
        </div>

        {/* 3 Pricing Cards Grid with gentle staggered fade-and-rise */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const isPro = plan.isPopular;

            return (
              <div 
                key={plan.id}
                className={cn(
                  "relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-700 ease-out",
                  isPro 
                    ? "bg-[#181B22] border-2 border-accent-primary-from/50 shadow-[0_20px_50px_-15px_rgba(0,245,160,0.15)] lg:-translate-y-2"
                    : "bg-[#14161B] border border-border-card/80 hover:border-border-card shadow-lg",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${250 + index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent-primary-from text-background-primary shadow-md">
                      <Sparkles className="w-3 h-3 fill-current" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1.5 min-h-[40px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 pb-6 border-b border-border-card/60 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-text-muted">
                      {plan.interval}
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3.5 mb-8">
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Included with {plan.name}:
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                          <div className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            isPro ? "bg-accent-primary-from/20 text-accent-primary-from" : "bg-white/10 text-white/80"
                          )}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="leading-tight text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-2">
                  <Link 
                    to={plan.ctaHref}
                    className={cn(
                      "w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center text-center",
                      isPro 
                        ? "bg-gradient-primary text-background-primary hover:opacity-95 shadow-md hover:shadow-[0_0_25px_rgba(0,245,160,0.3)]"
                        : "bg-[#1E2128] hover:bg-[#252932] text-white border border-border-card/80"
                    )}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee / Clarification Note */}
        <div 
          className={cn(
            "mt-14 text-center text-xs text-text-muted transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: '550ms' }}
        >
          <p>
            No automated credit card billing required to get started. All registered accounts currently gain full dashboard access.
          </p>
        </div>

      </div>
    </section>
  );
}
