import React from 'react';
import { CreditCard, Clock, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface StepItem {
  number: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
  detail: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    icon: <CreditCard className="w-5 h-5 text-accent-primary-from" />,
    heading: "Add your subscriptions",
    description: "Bring your recurring payments together in one organised place.",
    detail: "Quickly enter service name, renewal date, and billing cycle."
  },
  {
    number: "02",
    icon: <Clock className="w-5 h-5 text-accent-primary-from" />,
    heading: "Keep track of renewals",
    description: "See when payments are coming up so you can plan ahead.",
    detail: "View upcoming renewals at a glance to prevent unexpected charges."
  },
  {
    number: "03",
    icon: <BarChart3 className="w-5 h-5 text-accent-primary-from" />,
    heading: "Understand your spending",
    description: "Review your monthly costs and category breakdowns to see where your money goes.",
    detail: "Gain complete visibility over total monthly and annual commitments."
  }
];

export default function HowItWorksSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="how-it-works"
      ref={sectionRef}
      className="px-6 py-20 lg:py-28 bg-background-primary border-t border-border-card/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <div 
            className={cn(
              "badge mb-3 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-3.5 !py-1 !rounded-full transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            A SIMPLER WAY TO STAY ON TRACK
          </div>
          <h2 
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 [text-wrap:balance] transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            From scattered subscriptions to total clarity.
          </h2>
          <p 
            className={cn(
              "text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Three simple steps to understand your recurring expenses and stay in control.
          </p>
        </div>

        {/* Connected Steps Layout */}
        <div className="relative">
          
          {/* Connecting Line on Desktop (hidden on mobile) */}
          <div 
            className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-border-card z-0 pointer-events-none"
            aria-hidden="true"
          >
            <div 
              className={cn(
                "h-full bg-gradient-to-r from-accent-primary-from/60 via-accent-primary-to to-accent-primary-from/60 transition-all duration-1000 ease-out origin-left",
                isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              )}
              style={{ transitionDelay: '300ms' }}
            />
          </div>

          {/* Sequential 3 Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={cn(
                  "group bg-[#16181D] border border-border-card/80 hover:border-accent-primary-from/40 rounded-2xl sm:rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-700 ease-out shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] md:hover:-translate-y-1.5",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${250 + index * 120}ms` }}
              >
                <div>
                  {/* Top Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent-secondary/50 border border-accent-primary-from/30 flex items-center justify-center font-bold text-accent-primary-from group-hover:scale-105 group-hover:border-accent-primary-from/60 transition-all shadow-sm">
                      <span className="font-mono text-sm tracking-wider">{step.number}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-background-secondary border border-border-card/60 flex items-center justify-center text-text-muted group-hover:text-accent-primary-from transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  {/* Heading & Description */}
                  <h3 className="text-xl font-bold mb-3 text-text-primary tracking-tight group-hover:text-white transition-colors">
                    {step.heading}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Practical Detail Pill */}
                <div className="pt-4 border-t border-border-card/40 flex items-center gap-2 text-xs text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary-from/70 shrink-0" />
                  <span className="leading-snug">{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
