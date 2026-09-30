import React, { useState } from 'react';
import { CreditCard, Clock, PieChart, Shield, Calendar, Layers, ChevronRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ProductShowcase() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const [mobileTab, setMobileTab] = useState<'renewals' | 'categories' | 'subscriptions'>('renewals');

  return (
    <section 
      ref={sectionRef}
      className="relative px-6 py-16 sm:py-24 lg:py-32 bg-background-primary border-t border-border-card/60 overflow-hidden"
    >
      {/* Subtle restrained ambient glow behind preview */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] lg:w-[900px] lg:h-[500px] bg-accent-primary-from/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with smooth fade and upward rise */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div 
            className={cn(
              "badge mb-3 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-3.5 !py-1 !rounded-full transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            YOUR FINANCIAL OVERVIEW
          </div>
          <h2 
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 [text-wrap:balance] transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Your subscriptions. One clear picture.
          </h2>
          <p 
            className={cn(
              "text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            See your recurring expenses, upcoming renewals, and spending patterns in one clear, organised dashboard.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET VIEWPORT (Preserved large rich desktop preview) */}
        {/* ========================================================================= */}
        <div className="hidden sm:block relative max-w-5xl mx-auto">
          
          {/* Floating Card 1: Monthly Spending (Top-Left on sm+) */}
          <div 
            className={cn(
              "flex items-center gap-3.5 absolute -top-6 -left-4 lg:-left-8 z-30 bg-[#16181C] border border-border-card/80 p-3.5 rounded-2xl shadow-xl transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent-secondary/40 border border-accent-primary-from/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-accent-primary-from" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-text-muted">Monthly Spending</div>
              <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                $248.50
                <span className="text-[10px] text-accent-primary-from bg-accent-primary-from/10 px-1.5 py-0.5 rounded font-medium flex items-center">
                  ↓ 12% opt.
                </span>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Next Renewal (Top-Right on sm+) */}
          <div 
            className={cn(
              "flex items-center gap-3.5 absolute -top-6 -right-4 lg:-right-8 z-30 bg-[#16181C] border border-border-card/80 p-3.5 rounded-2xl shadow-xl transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-text-muted">Next Renewal</div>
              <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Netflix 4K
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-medium">
                  In 3 days
                </span>
              </div>
            </div>
          </div>

          {/* Floating Card 3: Top Category (Bottom-Right on md+) */}
          <div 
            className={cn(
              "hidden md:flex items-center gap-3.5 absolute -bottom-6 right-6 lg:right-10 z-30 bg-[#16181C] border border-border-card/80 p-3.5 rounded-2xl shadow-xl transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="w-10 h-10 rounded-xl bg-accent-secondary/40 border border-accent-primary-from/20 flex items-center justify-center shrink-0">
              <PieChart className="w-5 h-5 text-accent-primary-from" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-text-muted">Top Category</div>
              <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Entertainment
                <span className="text-[10px] text-text-secondary bg-white/5 px-1.5 py-0.5 rounded font-medium">
                  34% of spend
                </span>
              </div>
            </div>
          </div>

          {/* Main Desktop Dashboard Preview */}
          <div 
            className={cn(
              "bg-background-card border border-border-card rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-700 ease-out select-none",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: '250ms' }}
          >
            
            {/* Window Top Chrome */}
            <div className="px-4 sm:px-6 py-3 border-b border-border-card bg-[#16171A] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]/50" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]/50" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]/50" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-background-primary/80 border border-border-card/60 rounded-md text-xs text-text-secondary font-mono">
                <Shield className="w-3 h-3 text-accent-primary-from" />
                <span>subtrack.app/dashboard</span>
              </div>
              <div className="text-[11px] font-medium text-accent-primary-from bg-accent-secondary/30 border border-accent-primary-from/30 px-2 py-0.5 rounded">
                Live Overview Demo
              </div>
            </div>

            {/* Dashboard Inner Canvas */}
            <div className="p-4 sm:p-6 lg:p-8 bg-[#131417] space-y-6">
              
              {/* Metric Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Metric 1: Monthly Spend */}
                <div className="bg-[#181A1F] border border-border-card p-3.5 sm:p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs font-medium text-text-secondary truncate">Total Monthly Spend</span>
                  <div className="mt-2">
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">$248.50</div>
                    <div className="text-[11px] text-accent-primary-from flex items-center gap-1 mt-0.5">
                      <span>↓ 2.1%</span>
                      <span className="text-text-muted">vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Metric 2: Yearly Spend */}
                <div className="bg-[#181A1F] border border-border-card p-3.5 sm:p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs font-medium text-text-secondary truncate">Total Yearly Spend</span>
                  <div className="mt-2">
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">$2,982.00</div>
                    <div className="text-[11px] text-accent-primary-from flex items-center gap-1 mt-0.5">
                      <span>↑ 4.3%</span>
                      <span className="text-text-muted">vs last year</span>
                    </div>
                  </div>
                </div>

                {/* Metric 3: Active Ratio */}
                <div className="bg-[#181A1F] border border-border-card p-3.5 sm:p-4 rounded-xl flex justify-between relative overflow-hidden">
                  <div className="flex flex-col justify-between z-10">
                    <span className="text-xs font-medium text-text-secondary">Active Ratio</span>
                    <div className="mt-2">
                      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">88%</div>
                      <div className="text-[11px] text-text-muted mt-0.5">7 of 8 active</div>
                    </div>
                  </div>
                  <div className="w-12 h-12 my-auto">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#2A2A2A" strokeWidth="4" />
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="14" 
                        fill="none" 
                        stroke="#00F5A0" 
                        strokeWidth="4" 
                        strokeDasharray="88 100" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </div>
                </div>

                {/* Metric 4: Upcoming Renewals */}
                <div className="bg-[#181A1F] border border-border-card p-3.5 sm:p-4 rounded-xl flex flex-col justify-between">
                  <span className="text-xs font-medium text-text-secondary truncate">Upcoming Renewals</span>
                  <div className="mt-2">
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">3</div>
                    <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-0.5">
                      <span>Next 14 days</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Middle Section: Spending Breakdown & Upcoming Renewals */}
              <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
                
                {/* Category Analytics Mini View */}
                <div className="lg:col-span-5 bg-[#181A1F] border border-border-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">Spending by Category</h3>
                    <span className="text-[11px] text-text-muted">4 Categories</span>
                  </div>

                  <div className="flex items-center gap-4 my-2">
                    <div className="w-24 h-24 relative shrink-0">
                      <svg viewBox="0 0 42 42" className="w-full h-full transform -rotate-90">
                        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#00F5A0" strokeWidth="6" strokeDasharray="34 66" strokeDashoffset="0" />
                        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#00D9CC" strokeWidth="6" strokeDasharray="28 72" strokeDashoffset="-34" />
                        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#3B82F6" strokeWidth="6" strokeDasharray="26 74" strokeDashoffset="-62" />
                        <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#8B5CF6" strokeWidth="6" strokeDasharray="12 88" strokeDashoffset="-88" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-text-muted">Total</span>
                        <span className="text-xs font-bold text-white tabular-nums">$248</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-text-secondary">
                          <span className="w-2 h-2 rounded-full bg-[#00F5A0]" />
                          Entertainment
                        </span>
                        <span className="font-semibold text-white tabular-nums">$84.90 (34%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-text-secondary">
                          <span className="w-2 h-2 rounded-full bg-[#00D9CC]" />
                          Design & Creative
                        </span>
                        <span className="font-semibold text-white tabular-nums">$69.99 (28%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-text-secondary">
                          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                          Productivity
                        </span>
                        <span className="font-semibold text-white tabular-nums">$64.61 (26%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-text-secondary">
                          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                          Utilities & Cloud
                        </span>
                        <span className="font-semibold text-white tabular-nums">$29.00 (12%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-card/60 flex justify-between items-center text-xs text-text-muted">
                    <span>Monthly budget limit</span>
                    <span className="text-text-primary font-medium">$248.50 / $300.00 (82%)</span>
                  </div>
                </div>

                {/* Upcoming Renewals Panel */}
                <div className="lg:col-span-7 bg-[#181A1F] border border-border-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">Upcoming Renewals</h3>
                    <span className="text-[11px] text-accent-primary-from font-medium">Automatic alerts active</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-background-secondary/70 border border-border-card/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-xs text-red-400">
                          N
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Netflix 4K UHD</div>
                          <div className="text-[11px] text-text-muted">Entertainment · Monthly</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-white tabular-nums">$19.99</div>
                        <span className="text-[10px] font-medium text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                          In 3 days
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-background-secondary/70 border border-border-card/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center font-bold text-xs text-emerald-400">
                          S
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Spotify Family</div>
                          <div className="text-[11px] text-text-muted">Streaming · Monthly</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-white tabular-nums">$16.99</div>
                        <span className="text-[10px] font-medium text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          In 7 days
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-background-secondary/70 border border-border-card/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center font-bold text-xs text-purple-400">
                          F
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Figma Professional</div>
                          <div className="text-[11px] text-text-muted">Design Tools · Monthly</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-white tabular-nums">$15.00</div>
                        <span className="text-[10px] font-medium text-accent-primary-from bg-accent-secondary/50 px-1.5 py-0.5 rounded">
                          In 12 days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Subscriptions Table */}
              <div className="bg-[#181A1F] border border-border-card rounded-2xl overflow-hidden">
                <div className="p-3 sm:p-4 border-b border-border-card flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="font-bold text-white">Active Subscriptions</span>
                    <span>(8 total)</span>
                  </div>
                  <div className="text-xs text-text-muted">
                    Auto-sorted by renewal date
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border-card/80 text-text-muted font-medium bg-[#14161A]/60">
                        <th className="px-4 py-2.5">Subscription</th>
                        <th className="px-4 py-2.5">Category</th>
                        <th className="px-4 py-2.5">Cost</th>
                        <th className="px-4 py-2.5">Cycle</th>
                        <th className="px-4 py-2.5">Next Renewal</th>
                        <th className="px-4 py-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-card/40">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-white">Netflix 4K UHD</td>
                        <td className="px-4 py-3 text-text-secondary">Entertainment</td>
                        <td className="px-4 py-3 font-bold text-white tabular-nums">$19.99</td>
                        <td className="px-4 py-3 text-text-muted">Monthly</td>
                        <td className="px-4 py-3 text-text-secondary">May 24, 2026</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-secondary/40 text-accent-primary-from border border-accent-primary-from/30">
                            <span className="w-1 h-1 rounded-full bg-accent-primary-from" /> Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-white">Spotify Family</td>
                        <td className="px-4 py-3 text-text-secondary">Streaming</td>
                        <td className="px-4 py-3 font-bold text-white tabular-nums">$16.99</td>
                        <td className="px-4 py-3 text-text-muted">Monthly</td>
                        <td className="px-4 py-3 text-text-secondary">May 28, 2026</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-secondary/40 text-accent-primary-from border border-accent-primary-from/30">
                            <span className="w-1 h-1 rounded-full bg-accent-primary-from" /> Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-white">Figma Professional</td>
                        <td className="px-4 py-3 text-text-secondary">Design Tools</td>
                        <td className="px-4 py-3 font-bold text-white tabular-nums">$15.00</td>
                        <td className="px-4 py-3 text-text-muted">Monthly</td>
                        <td className="px-4 py-3 text-text-secondary">Jun 02, 2026</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-secondary/40 text-accent-primary-from border border-accent-primary-from/30">
                            <span className="w-1 h-1 rounded-full bg-accent-primary-from" /> Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-white">ChatGPT Plus</td>
                        <td className="px-4 py-3 text-text-secondary">Productivity</td>
                        <td className="px-4 py-3 font-bold text-white tabular-nums">$20.00</td>
                        <td className="px-4 py-3 text-text-muted">Monthly</td>
                        <td className="px-4 py-3 text-text-secondary">Jun 10, 2026</td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent-secondary/40 text-accent-primary-from border border-accent-primary-from/30">
                            <span className="w-1 h-1 rounded-full bg-accent-primary-from" /> Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE SHOWCASE VIEWPORT (Customized, Zero Horizontal Overflow, High Touch) */}
        {/* ========================================================================= */}
        <div 
          className={cn(
            "block sm:hidden w-full max-w-sm mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: '250ms' }}
        >
          {/* Mobile Phone Mock Frame Container */}
          <div className="bg-[#14161A] border border-border-card/90 rounded-3xl p-4 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-border-card/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center shadow-sm">
                  <CreditCard className="w-4 h-4 text-background-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">SubTrack Mobile</div>
                  <div className="text-[10px] text-text-muted mt-0.5">May 2026 Overview</div>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-accent-primary-from bg-accent-secondary/40 border border-accent-primary-from/30 px-2 py-0.5 rounded-full">
                Active Sync
              </span>
            </div>

            {/* Mobile Hero Spending Card */}
            <div className="mt-3.5 bg-[#1B1D23] border border-border-card/80 p-4 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Monthly Recurring Spend</span>
                <span className="text-[10px] text-accent-primary-from bg-accent-primary-from/10 px-2 py-0.5 rounded-full font-medium">
                  ↓ 12% optimized
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <div className="text-2xl font-black text-white tabular-nums tracking-tight">
                  $248.50
                  <span className="text-xs font-normal text-text-muted ml-1">/mo</span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-text-muted">Annual projection</div>
                  <div className="text-xs font-bold text-white tabular-nums">$2,982.00</div>
                </div>
              </div>

              {/* Quick Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border-card/50 text-[11px]">
                <div className="bg-background-secondary/80 rounded-lg p-2 flex items-center justify-between">
                  <span className="text-text-muted">Active</span>
                  <span className="font-bold text-white">7 of 8</span>
                </div>
                <div className="bg-background-secondary/80 rounded-lg p-2 flex items-center justify-between">
                  <span className="text-text-muted">Due Soon</span>
                  <span className="font-bold text-amber-400">3 in 14d</span>
                </div>
              </div>
            </div>

            {/* Mobile View Switcher Tabs (Zero horizontal scrolling, clear touch toggling) */}
            <div className="grid grid-cols-3 gap-1 bg-[#101216] p-1 rounded-xl mt-3.5 border border-border-card/60">
              <button
                type="button"
                onClick={() => setMobileTab('renewals')}
                className={cn(
                  "py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center",
                  mobileTab === 'renewals' 
                    ? "bg-accent-secondary/50 text-accent-primary-from border border-accent-primary-from/30 shadow-xs" 
                    : "text-text-muted hover:text-white"
                )}
              >
                Renewals
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('categories')}
                className={cn(
                  "py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center",
                  mobileTab === 'categories' 
                    ? "bg-accent-secondary/50 text-accent-primary-from border border-accent-primary-from/30 shadow-xs" 
                    : "text-text-muted hover:text-white"
                )}
              >
                Categories
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('subscriptions')}
                className={cn(
                  "py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center",
                  mobileTab === 'subscriptions' 
                    ? "bg-accent-secondary/50 text-accent-primary-from border border-accent-primary-from/30 shadow-xs" 
                    : "text-text-muted hover:text-white"
                )}
              >
                All (8)
              </button>
            </div>

            {/* Mobile Tab Content: Upcoming Renewals */}
            {mobileTab === 'renewals' && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-300">
                <div className="text-[11px] font-medium text-text-muted px-1 flex items-center justify-between">
                  <span>Upcoming Renewal Timeline</span>
                  <span className="text-accent-primary-from">Next 14 Days</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-xs text-red-400">
                      N
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Netflix 4K UHD</div>
                      <div className="text-[10px] text-text-muted">Entertainment</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$19.99</div>
                    <span className="text-[9px] font-semibold text-red-400 bg-red-500/15 px-1.5 py-0.5 rounded">
                      In 3 days
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center font-bold text-xs text-emerald-400">
                      S
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Spotify Family</div>
                      <div className="text-[10px] text-text-muted">Streaming</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$16.99</div>
                    <span className="text-[9px] font-semibold text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded">
                      In 7 days
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center font-bold text-xs text-purple-400">
                      F
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Figma Pro</div>
                      <div className="text-[10px] text-text-muted">Design Tools</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$15.00</div>
                    <span className="text-[9px] font-semibold text-accent-primary-from bg-accent-secondary/50 px-1.5 py-0.5 rounded">
                      In 12 days
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Tab Content: Categories */}
            {mobileTab === 'categories' && (
              <div className="mt-3 space-y-2.5 bg-[#1B1D23] p-3 rounded-2xl border border-border-card/70 animate-in fade-in duration-300">
                <div className="text-[11px] font-bold text-white mb-2 flex justify-between items-center">
                  <span>Monthly Spend by Category</span>
                  <span className="text-[10px] text-text-muted">$248.50 total</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00F5A0]" /> Entertainment
                    </span>
                    <span className="font-semibold text-white tabular-nums">$84.90 (34%)</span>
                  </div>
                  <div className="w-full bg-[#121418] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00F5A0] h-full rounded-full" style={{ width: '34%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00D9CC]" /> Design & Tools
                    </span>
                    <span className="font-semibold text-white tabular-nums">$69.99 (28%)</span>
                  </div>
                  <div className="w-full bg-[#121418] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00D9CC] h-full rounded-full" style={{ width: '28%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> Productivity
                    </span>
                    <span className="font-semibold text-white tabular-nums">$64.61 (26%)</span>
                  </div>
                  <div className="w-full bg-[#121418] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: '26%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" /> Utilities
                    </span>
                    <span className="font-semibold text-white tabular-nums">$29.00 (12%)</span>
                  </div>
                  <div className="w-full bg-[#121418] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#8B5CF6] h-full rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Tab Content: Subscriptions List (Touch-friendly vertical cards) */}
            {mobileTab === 'subscriptions' && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-300">
                <div className="text-[11px] font-medium text-text-muted px-1 flex items-center justify-between">
                  <span>Logged Subscriptions</span>
                  <span className="text-accent-primary-from">All Active</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div>
                    <div className="text-xs font-bold text-white">Netflix 4K UHD</div>
                    <div className="text-[10px] text-text-muted">Renews May 24 · Monthly</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$19.99</div>
                    <span className="text-[9px] font-medium text-accent-primary-from">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div>
                    <div className="text-xs font-bold text-white">Spotify Family</div>
                    <div className="text-[10px] text-text-muted">Renews May 28 · Monthly</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$16.99</div>
                    <span className="text-[9px] font-medium text-accent-primary-from">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div>
                    <div className="text-xs font-bold text-white">Figma Professional</div>
                    <div className="text-[10px] text-text-muted">Renews Jun 02 · Monthly</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$15.00</div>
                    <span className="text-[9px] font-medium text-accent-primary-from">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1D23] border border-border-card/70">
                  <div>
                    <div className="text-xs font-bold text-white">ChatGPT Plus</div>
                    <div className="text-[10px] text-text-muted">Renews Jun 10 · Monthly</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white tabular-nums">$20.00</div>
                    <span className="text-[9px] font-medium text-accent-primary-from">Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Footer Kicker */}
            <div className="mt-3.5 pt-2.5 border-t border-border-card/50 flex items-center justify-between text-[10px] text-text-muted">
              <span>Full control from any smartphone</span>
              <span className="text-accent-primary-from font-medium">Responsive View</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
