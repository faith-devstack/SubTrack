import React from 'react';
import { Activity, Bell, Sparkles, Music, Film, Layers, Plus, PieChart, Settings, Wifi } from 'lucide-react';

export default function SuspendedPhoneMockup() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 sm:py-8 lg:py-12 select-none overflow-visible">
      {/* Ambient mint glow & abstract geometric decorative halo behind device (inspired by Khaata) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-tr from-accent-primary-from/20 via-accent-primary-to/10 to-transparent blur-[80px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px] rounded-full border border-accent-primary-from/15 pointer-events-none opacity-60 hidden sm:block"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] sm:w-[390px] sm:h-[390px] lg:w-[440px] lg:h-[440px] rounded-full border border-dashed border-accent-primary-from/10 pointer-events-none hidden sm:block"
        aria-hidden="true"
      />

      {/* Floating suspended smartphone wrapper */}
      <div className="relative animate-phone-float z-10 transition-transform duration-300">
        {/* Smartphone Chassis */}
        <div className="relative w-[285px] sm:w-[318px] lg:w-[332px] h-[585px] sm:h-[650px] lg:h-[675px] bg-[#0E1013] rounded-[44px] sm:rounded-[48px] border-[8px] sm:border-[9px] border-[#1C1F24] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_50px_100px_-20px_rgba(0,245,160,0.12),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-white/10 ring-offset-2 ring-offset-[#0A0B0D] overflow-hidden flex flex-col text-left">
          
          {/* Top Dynamic Island / Pill notch */}
          <div className="absolute top-2.5 inset-x-0 mx-auto w-24 sm:w-28 h-5 sm:h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-[#161616] ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-accent-primary-to/40" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#202020]" />
          </div>

          {/* Glass specular sheen reflection across screen */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-white/[0.07] pointer-events-none z-30 rounded-[36px] sm:rounded-[40px]" 
            aria-hidden="true"
          />
          <div 
            className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none z-30" 
            aria-hidden="true"
          />

          {/* Phone Screen Internal UI (SubTrack App miniature) */}
          <div className="relative flex-1 bg-[#121316] flex flex-col pt-9 sm:pt-10 pb-2 px-3.5 sm:px-4 overflow-hidden">
            
            {/* Status bar */}
            <div className="flex items-center justify-between mb-3 text-white/90">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight tabular-nums">9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <div className="w-[2.5px] h-1 bg-white/80 rounded-xs" />
                  <div className="w-[2.5px] h-1.5 bg-white/80 rounded-xs" />
                  <div className="w-[2.5px] h-2 bg-white/80 rounded-xs" />
                  <div className="w-[2.5px] h-2.5 bg-white/80 rounded-xs" />
                </div>
                <Wifi className="w-2.5 h-2.5 text-white/80" />
                <div className="w-4 h-2 rounded-[2.5px] border border-white/70 p-[1px] flex items-center">
                  <div className="bg-accent-primary-from w-2.5 h-full rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* In-app SubTrack Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-gradient-primary flex items-center justify-center shadow-xs">
                  <Activity className="w-3 h-3 text-background-primary" />
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold tracking-tight text-white flex items-center gap-1">
                  SubTrack<span className="w-1.5 h-1.5 rounded-full bg-accent-primary-from inline-block" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Bell className="w-3 h-3 text-text-secondary" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-primary-from ring-1 ring-[#121316]" />
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-secondary to-accent-primary-from/40 border border-accent-primary-from/40 flex items-center justify-center text-[9px] font-bold text-white">
                  JD
                </div>
              </div>
            </div>

            {/* Total Monthly Spending Card */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#181A1F] border border-white/5 shadow-inner relative overflow-hidden mb-3">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary-from/10 rounded-full blur-xl pointer-events-none" />
              <div className="text-[9px] font-medium text-text-muted tracking-wider uppercase mb-1">
                Total Monthly Spend
              </div>
              <div className="flex items-baseline gap-1 text-white mb-2">
                <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight tabular-nums">$148.50</span>
                <span className="text-[11px] font-normal text-text-secondary">/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[9px] text-accent-primary-from bg-accent-primary-from/10 border border-accent-primary-from/20 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary-from" />
                  8 Active
                </div>
                <div className="flex items-center gap-1 text-[9px] text-text-secondary bg-white/5 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  2 Renewing soon
                </div>
              </div>
            </div>

            {/* Analytics mini trend wave chart */}
            <div className="mb-3 px-1">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Spending Trend</span>
                <span className="text-[9px] text-accent-primary-from font-medium">+4.2% vs Apr</span>
              </div>
              <div className="h-11 sm:h-12 w-full relative">
                <svg viewBox="0 0 100 36" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="phoneWaveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#00F5A0" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Filled area below curve */}
                  <path 
                    d="M 0,26 Q 16,30 32,20 T 64,14 T 84,8 T 100,12 L 100,36 L 0,36 Z" 
                    fill="url(#phoneWaveGrad)" 
                  />
                  {/* Glowing line curve */}
                  <path 
                    d="M 0,26 Q 16,30 32,20 T 64,14 T 84,8 T 100,12" 
                    fill="none" 
                    stroke="#00F5A0" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  {/* Active highlight dot on peak */}
                  <circle cx="84" cy="8" r="2.5" fill="#00F5A0" className="animate-pulse" />
                  <circle cx="84" cy="8" r="4.5" fill="none" stroke="#00F5A0" strokeWidth="0.8" opacity="0.6" />
                </svg>
              </div>
              <div className="flex justify-between text-[8px] text-text-muted px-0.5 mt-0.5">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span className="text-accent-primary-from font-semibold">May</span>
                <span>Jun</span>
              </div>
            </div>

            {/* Subscriptions miniature list */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-white tracking-tight">Active Subscriptions</span>
                <span className="text-[9px] text-accent-primary-from font-medium">View all</span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 overflow-hidden flex-1">
                {/* Netflix */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-background-secondary/60 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center shrink-0">
                      <Film className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-white truncate">Netflix 4K UHD</div>
                      <div className="text-[9px] text-text-muted truncate">Renews in 3 days</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-bold text-white tabular-nums">$19.99</div>
                    <div className="text-[8px] text-text-muted">/month</div>
                  </div>
                </div>

                {/* Spotify */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-background-secondary/60 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Music className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-white truncate">Spotify Family</div>
                      <div className="text-[9px] text-text-muted truncate">Renews May 18</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-bold text-white tabular-nums">$16.99</div>
                    <div className="text-[8px] text-text-muted">/month</div>
                  </div>
                </div>

                {/* ChatGPT Plus */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-background-secondary/60 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-accent-primary-from/15 border border-accent-primary-from/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-accent-primary-from" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-white truncate">ChatGPT Plus</div>
                      <div className="text-[9px] text-text-muted truncate">Renews May 22</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-bold text-white tabular-nums">$20.00</div>
                    <div className="text-[8px] text-text-muted">/month</div>
                  </div>
                </div>

                {/* Figma */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-background-secondary/60 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-white truncate">Figma Professional</div>
                      <div className="text-[9px] text-text-muted truncate">Renews Jun 02</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-bold text-white tabular-nums">$15.00</div>
                    <div className="text-[8px] text-text-muted">/month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* In-app Bottom Navigation Dock */}
            <div className="mt-auto pt-2 pb-1 border-t border-white/5 bg-[#121316]/95 backdrop-blur-sm -mx-3.5 sm:-mx-4 px-3.5 sm:px-4">
              <div className="flex items-center justify-around">
                {/* Home (active) */}
                <div className="flex flex-col items-center gap-0.5">
                  <Activity className="w-3.5 h-3.5 text-accent-primary-from" />
                  <span className="w-1 h-1 rounded-full bg-accent-primary-from" />
                </div>
                {/* Subscriptions */}
                <div className="flex flex-col items-center gap-0.5">
                  <Layers className="w-3.5 h-3.5 text-text-muted" />
                  <span className="w-1 h-1 rounded-full bg-transparent" />
                </div>
                {/* Center Quick Add action */}
                <div className="-mt-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-[0_0_12px_rgba(0,245,160,0.5)] cursor-pointer">
                  <Plus className="w-4 h-4 text-background-primary stroke-[3]" />
                </div>
                {/* Analytics */}
                <div className="flex flex-col items-center gap-0.5">
                  <PieChart className="w-3.5 h-3.5 text-text-muted" />
                  <span className="w-1 h-1 rounded-full bg-transparent" />
                </div>
                {/* Settings */}
                <div className="flex flex-col items-center gap-0.5">
                  <Settings className="w-3.5 h-3.5 text-text-muted" />
                  <span className="w-1 h-1 rounded-full bg-transparent" />
                </div>
              </div>

              {/* iPhone Home indicator line */}
              <div className="w-24 sm:w-28 h-1 bg-white/20 rounded-full mx-auto mt-2" />
            </div>

          </div>
        </div>
      </div>

      {/* Realistic suspended soft diffused shadow beneath phone */}
      <div 
        className="w-44 sm:w-56 lg:w-64 h-6 sm:h-7 bg-black/75 blur-xl rounded-[100%] mx-auto mt-3 sm:mt-4 animate-shadow-float pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
}
