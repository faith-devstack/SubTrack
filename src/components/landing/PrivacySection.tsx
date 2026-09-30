import React from 'react';
import { ShieldCheck, Lock, UserCheck, Trash2, KeyRound, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PrivacySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const trustPoints = [
    {
      icon: <Lock className="w-4 h-4 text-accent-primary-from" />,
      title: "Authenticated Account Access",
      description: "Secure email authentication ensures only you can access your personal dashboard, payment schedules, and expense insights."
    },
    {
      icon: <UserCheck className="w-4 h-4 text-accent-primary-from" />,
      title: "User-Scoped Data Isolation",
      description: "Every subscription record is strictly associated with your account identifier, preventing unauthorized cross-account visibility."
    },
    {
      icon: <Trash2 className="w-4 h-4 text-accent-primary-from" />,
      title: "Complete Data Control & Deletion",
      description: "Manage your own financial log with full autonomy. Modify or permanently remove any subscription record whenever you choose."
    }
  ];

  return (
    <section 
      id="privacy"
      ref={sectionRef}
      className="px-6 py-20 lg:py-28 bg-background-secondary border-t border-border-card/60 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div 
        className={cn(
          "absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent-primary-from/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Verified Trust Points */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div 
              className={cn(
                "inline-flex items-center gap-2 badge mb-4 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-3.5 !py-1 !rounded-full transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>YOUR DATA, YOUR CONTROL</span>
            </div>

            {/* Headline */}
            <h2 
              className={cn(
                "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-5 leading-tight transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '100ms' }}
            >
              Your subscriptions are personal. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary-from to-accent-primary-to">
                Your privacy should be, too.
              </span>
            </h2>

            {/* Supporting Text */}
            <p 
              className={cn(
                "text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-2xl transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '200ms' }}
            >
              SubTrack helps you organise your recurring expenses while keeping your account and subscription information under your control.
            </p>

            {/* Three Verified Trust Points */}
            <div className="space-y-4 max-w-2xl">
              {trustPoints.map((point, index) => (
                <div 
                  key={point.title}
                  className={cn(
                    "p-4 sm:p-5 rounded-2xl bg-[#16181D] border border-border-card/80 hover:border-accent-primary-from/30 flex items-start gap-4 transition-all duration-700 ease-out shadow-xs",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  )}
                  style={{ transitionDelay: `${250 + index * 90}ms` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-accent-secondary/50 border border-accent-primary-from/30 flex items-center justify-center shrink-0 mt-0.5">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Security Architecture Card */}
          <div 
            className={cn(
              "lg:col-span-5 transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#14161B] border border-border-card/90 shadow-2xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-sm">
                <KeyRound className="w-6 h-6 text-background-primary" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Built on Transparent Security
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                We believe in simple, auditable data practices. We track only what you enter into your dashboard.
              </p>

              <div className="space-y-3 pt-4 border-t border-border-card/60">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-primary-from shrink-0" />
                  <span>No bank account syncing or credential scraping</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-primary-from shrink-0" />
                  <span>Zero advertising trackers or data reselling</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-primary-from shrink-0" />
                  <span>Permanent data erasure available anytime</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border-card/60 flex items-center justify-between text-xs text-text-muted">
                <span>Account Protection</span>
                <span className="text-accent-primary-from font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary-from animate-pulse" />
                  Isolated Firestore Rules
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
