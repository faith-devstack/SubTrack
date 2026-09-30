import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface FaqData {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqData[] = [
  {
    id: 'faq-1',
    question: 'What is SubTrack?',
    answer: 'SubTrack helps you organise your recurring subscriptions, understand your spending, and keep track of upcoming renewal dates in one clear, consolidated dashboard.'
  },
  {
    id: 'faq-2',
    question: 'Is SubTrack free to use?',
    answer: 'Yes, SubTrack is free to get started. You can create an account and immediately log your subscriptions, view monthly and annual spending totals, and check upcoming renewal dates with no credit card required. While paid tiers are outlined for future premium features, all current dashboard tracking tools are accessible upon registration.'
  },
  {
    id: 'faq-3',
    question: 'How do I add a subscription?',
    answer: 'You add subscriptions manually by clicking the "Add Subscription" button in your dashboard. You simply enter the service name, cost, billing cycle (monthly, yearly, weekly, or quarterly), category, and next renewal date. SubTrack does not automatically connect to your bank accounts or scrape personal statements; you maintain complete manual control over every logged item.'
  },
  {
    id: 'faq-4',
    question: 'Can I track upcoming renewals?',
    answer: 'Yes. Based on the renewal date you provide for each active subscription, SubTrack automatically calculates the days remaining and highlights subscriptions renewing in the next 14 days directly inside your dashboard. Renewals due within 3 days are flagged in red so you can review them before payments occur. Note that automated background email or push notifications are not currently sent; renewals are displayed directly in the dashboard interface.'
  },
  {
    id: 'faq-5',
    question: 'Can I see how much I spend on subscriptions?',
    answer: 'Yes. SubTrack automatically calculates your total monthly expenditure, projected annual costs, active subscription count, and average monthly expense per service. In addition, an interactive category breakdown chart visually displays where your funds are distributed across areas like Entertainment, Utilities, and Productivity.'
  },
  {
    id: 'faq-6',
    question: 'Is my subscription information private?',
    answer: 'Yes. Your account is secured with email authentication, and every subscription entry is scoped strictly to your unique account identifier in Cloud Firestore. SubTrack does not sell personal information or share data with advertising brokers. While data access is authenticated and partitioned, we do not claim end-to-end encryption or external financial compliance certifications.'
  },
  {
    id: 'faq-7',
    question: 'Can I cancel a subscription through SubTrack?',
    answer: 'No. SubTrack is an independent tracking and budgeting companion. Marking a subscription as "canceled" within SubTrack updates your spending calculations and status on your dashboard, but it does not communicate with external service providers. To stop recurring charges, you must cancel directly with the vendor or service provider.'
  },
  {
    id: 'faq-8',
    question: 'How do I manage my account or change my plan?',
    answer: 'You can review your authenticated email and profile preferences directly from the Settings page in your dashboard. Because automated payment processing and subscription billing are not yet integrated into the application, there is currently no self-service plan upgrade or billing portal; all registered accounts enjoy standard dashboard functionality.'
  }
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true // First item open by default for immediate preview
  });
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08 });

  const toggleFaq = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      id="faq"
      ref={sectionRef}
      className="px-6 py-20 lg:py-28 bg-background-secondary border-t border-border-card/60 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div 
            className={cn(
              "badge mb-3 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-3.5 !py-1 !rounded-full transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            GOT QUESTIONS?
          </div>
          <h2 
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 [text-wrap:balance] transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            A little more clarity.
          </h2>
          <p 
            className={cn(
              "text-base sm:text-lg text-text-secondary leading-relaxed transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Everything you need to know about managing your subscriptions with SubTrack.
          </p>
        </div>

        {/* Accordion List with subtle staggered reveal */}
        <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
          {faqs.map((faq, index) => {
            const isOpen = !!openItems[faq.id];

            return (
              <div
                key={faq.id}
                className={cn(
                  "border rounded-2xl transition-all duration-700 ease-out overflow-hidden shadow-xs",
                  isOpen 
                    ? "bg-[#16181D] border-accent-primary-from/40" 
                    : "bg-[#14161A] border-border-card/80 hover:border-border-card hover:bg-[#16181D]",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${250 + index * 50}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from focus-visible:ring-inset"
                >
                  <span className={cn(
                    "text-base sm:text-lg font-semibold tracking-tight transition-colors",
                    isOpen ? "text-accent-primary-from" : "text-white"
                  )}>
                    {faq.question}
                  </span>
                  
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                    isOpen 
                      ? "bg-accent-primary-from/15 text-accent-primary-from rotate-180" 
                      : "bg-[#1E2026] text-text-muted hover:text-white"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <div
                  id={`${faq.id}-answer`}
                  role="region"
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border-card/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
