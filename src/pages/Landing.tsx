import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, PieChart, Bell, Settings, CreditCard, ChevronRight, ArrowRight, PlayCircle, Star, Check, Plus, Minus, Twitter, Github, Linkedin } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background-primary/80 backdrop-blur-md border-b border-border-card px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-background-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">SubTrack</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="text-sm btn-primary py-2 px-6">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-12 sm:py-20 lg:py-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col items-start gap-6 z-10 relative">
            <div className="badge mb-2 flex items-center gap-2 !bg-accent-secondary/20 !text-accent-primary-from !border-accent-secondary/30 !px-4 !py-1.5 !rounded-full">
              SUBTRACK - YOUR FINANCES, SIMPLIFIED
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.1]">
              Smart Subscriptions<br />
              <span className="text-gradient">For a Better You</span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed mt-2">
              Track, manage, and optimize your money with SubTrack. All your recurring expenses in one intelligent app.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-gradient-primary text-background-primary font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-[15px]">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-background-card/50 border border-border-card text-text-primary font-semibold rounded-xl hover:bg-border-card transition-colors flex items-center justify-center gap-2 text-[15px]">
                <PlayCircle className="w-5 h-5" /> Watch Demo
              </Link>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-border-card/50 w-full max-w-md">
              <div className="flex -space-x-4">
                <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background-primary object-cover relative z-[4]" />
                <img src="https://i.pravatar.cc/100?img=47" alt="User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background-primary object-cover relative z-[3]" />
                <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background-primary object-cover relative z-[2]" />
                <img src="https://i.pravatar.cc/100?img=31" alt="User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background-primary object-cover relative z-[1]" />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 text-yellow-500 mb-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                </div>
                <div className="text-xs sm:text-sm text-text-secondary leading-tight">
                  Trusted by 25,000+ users<br/>worldwide
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end items-center h-[500px] lg:h-[600px] w-full z-10 mt-8 lg:mt-0">
            <div className="phone-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent-primary-from/15 blur-[100px] rounded-full mix-blend-screen"></div>
            
            {/* Phone Mockup using CSS */}
            <div className="w-[260px] h-[520px] sm:w-[280px] sm:h-[580px] bg-background-primary rounded-[2.5rem] border-[6px] border-[#222] shadow-[20px_30px_60px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col z-10 rotate-[-4deg] transition-transform duration-700 ease-in-out hover:rotate-[-2deg]">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#222] rounded-b-3xl w-32 mx-auto z-20 flex justify-center items-end pb-1.5">
                 <div className="w-10 h-1.5 bg-black/50 rounded-full"></div>
              </div>
              
              <div className="flex-1 bg-[#121212] flex flex-col pt-8 px-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 mt-2">
                  <ChevronRight className="w-4 h-4 text-text-secondary rotate-180" />
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full border border-border-card"></div>
                    <div className="w-4 h-4 rounded-full border border-border-card"></div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-xs text-text-secondary mb-1">Total Balance</div>
                  <div className="text-3xl font-bold text-text-primary mb-1">$12,750.00</div>
                  <div className="inline-flex text-[9px] text-accent-primary-from bg-accent-secondary/30 px-2 py-0.5 rounded-full items-center gap-1 font-medium">
                    ↑ 12.5% from last month
                  </div>
                </div>
                
                {/* Chart Area */}
                <div className="mb-6 relative h-24 w-full">
                   <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                     <path d="M0,35 Q10,25 20,30 T40,15 T60,20 T80,5 T100,10 L100,40 L0,40 Z" fill="url(#grad)" opacity="0.3"/>
                     <path d="M0,35 Q10,25 20,30 T40,15 T60,20 T80,5 T100,10" fill="none" stroke="#00F5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     <defs>
                       <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#00F5A0" />
                         <stop offset="100%" stopColor="transparent" />
                       </linearGradient>
                     </defs>
                   </svg>
                </div>
                
                {/* Categories */}
                <div className="flex justify-between items-center mb-3">
                  <div className="text-xs font-semibold text-text-primary">Categories</div>
                  <div className="text-[9px] text-text-secondary">See All</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-[#1A1A1A] p-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-accent-primary-from/20 flex items-center justify-center">
                         <div className="w-4 h-4 bg-accent-primary-from rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-text-primary">Shopping</div>
                        <div className="text-[9px] text-text-secondary mt-0.5">25%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-text-primary">$1,250.00</div>
                      <div className="text-[9px] text-accent-primary-from mt-0.5">↑ 20%</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-[#1A1A1A] p-3 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
                         <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-text-primary">Travel</div>
                        <div className="text-[9px] text-text-secondary mt-0.5">17%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-text-primary">$850.00</div>
                      <div className="text-[9px] text-orange-400 mt-0.5">↓ 12%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Monthly Budget */}
            <div className="absolute right-[-20px] top-32 z-20 glass p-4 rounded-xl border border-white/10 bg-[#151515]/80 backdrop-blur-xl w-[220px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] translate-x-4 translate-y-[-20px] rotate-[2deg] hidden md:block">
               <div className="flex justify-between items-start mb-3">
                 <div className="text-[10px] text-text-secondary font-medium">Budget Goal</div>
                 <div className="w-5 h-5 rounded-md bg-[#222] flex items-center justify-center">
                   <ChevronRight className="w-3 h-3 text-text-secondary" />
                 </div>
               </div>
               <div className="text-lg font-bold text-white mb-2">$2,500 <span className="text-sm text-text-secondary font-medium">/ $5,000</span></div>
               <div className="flex items-center gap-3">
                 <div className="flex-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-primary w-1/2 rounded-full"></div>
                 </div>
                 <div className="text-right text-[10px] text-text-secondary font-medium">50%</div>
               </div>
            </div>

            {/* Floating Card 2: Savings Goal */}
            <div className="absolute right-[-20px] bottom-48 z-20 glass p-4 rounded-xl border border-white/10 bg-[#151515]/80 backdrop-blur-xl w-[200px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] translate-x-0 translate-y-[20px] rotate-[-2deg] hidden md:block">
               <div className="flex justify-between items-start mb-3">
                 <div className="text-[10px] text-text-secondary font-medium">Savings Goal</div>
                 <div className="w-5 h-5 rounded-md bg-[#222] flex items-center justify-center">
                   <ChevronRight className="w-3 h-3 text-text-secondary" />
                 </div>
               </div>
               <div className="text-lg font-bold text-white mb-2">$3,200 <span className="text-sm text-text-secondary font-medium">/ $5,000</span></div>
               <div className="flex items-center gap-3">
                 <div className="flex-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
                   <div className="h-full bg-accent-primary-from w-[64%] rounded-full"></div>
                 </div>
                 <div className="text-right text-[10px] text-text-secondary font-medium">64%</div>
               </div>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-16 lg:py-24 bg-background-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to manage your money.</h2>
              <p className="text-text-secondary text-base lg:text-lg">Stop paying for things you don't use and take back control of your finances.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<CreditCard className="w-6 h-6 text-accent-primary-from" />}
                title="Track Every Subscription"
                description="Keep all recurring expenses organized in one place."
              />
              <FeatureCard 
                icon={<PieChart className="w-6 h-6 text-accent-primary-from" />}
                title="Know Your Real Spending"
                description="Automatically calculate estimated monthly and yearly spending."
              />
              <FeatureCard 
                icon={<Bell className="w-6 h-6 text-accent-primary-from" />}
                title="Never Miss a Renewal"
                description="See subscriptions that are renewing soon."
              />
              <FeatureCard 
                icon={<Activity className="w-6 h-6 text-accent-primary-from" />}
                title="Understand Your Spending"
                description="Visualize where your money goes with category analytics."
              />
              <FeatureCard 
                icon={<Settings className="w-6 h-6 text-accent-primary-from" />}
                title="Manage Everything Easily"
                description="Add, edit, cancel, or delete subscriptions."
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-accent-primary-from" />}
                title="Your Data Stays Private"
                description="Use secure authentication and Row Level Security."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 py-16 lg:py-24 bg-background-primary relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, transparent pricing.</h2>
              <p className="text-text-secondary text-base lg:text-lg">Choose the perfect plan to take control of your financial future.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Tier */}
              <div className="bg-background-card border border-border-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,245,160,0.15)] hover:border-accent-primary-from/50 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Basic</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-primary">$0</span>
                    <span className="text-text-secondary">/month</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-2">Perfect for getting started</p>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Up to 5 subscriptions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Basic spending analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Email reminders</span>
                  </div>
                </div>
                <Link to="/signup" className="w-full btn-secondary py-3 text-center justify-center font-bold">
                  Get Started Free
                </Link>
              </div>

              {/* Pro Tier (Highlighted) */}
              <div className="bg-background-card border border-accent-primary-from/50 shadow-[0_0_15px_rgba(0,245,160,0.05)] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,245,160,0.3)] hover:border-accent-primary-from relative flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 badge !m-0 !bg-accent-primary-from !text-background-primary !border-none shadow-lg">Most Popular</div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-primary">$4.99</span>
                    <span className="text-text-secondary">/month</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-2">Everything you need</p>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-primary font-medium">Unlimited subscriptions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Advanced category analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Custom renewal alerts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Priority support</span>
                  </div>
                </div>
                <Link to="/signup" className="w-full btn-primary py-3 text-center justify-center">
                  Start Pro Trial
                </Link>
              </div>

              {/* Lifetime Tier */}
              <div className="bg-background-card border border-border-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,245,160,0.15)] hover:border-accent-primary-from/50 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Lifetime</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-primary">$49.99</span>
                    <span className="text-text-secondary">/once</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-2">Pay once, use forever</p>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-primary font-medium">All Pro features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Early access to features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">Multiple workspaces</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-primary-from shrink-0" />
                    <span className="text-text-secondary">API Access (Coming soon)</span>
                  </div>
                </div>
                <Link to="/signup" className="w-full btn-secondary py-3 text-center justify-center font-bold">
                  Get Lifetime
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="px-6 py-16 lg:py-24 bg-background-secondary border-t border-border-card">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-text-secondary text-base lg:text-lg">Everything you need to know about SubTrack and how it works.</p>
            </div>
            
            <div className="space-y-4">
              <FaqItem 
                question="Is SubTrack really free?" 
                answer="Yes! Our Basic plan is completely free and allows you to track up to 5 subscriptions, which is perfect for getting started. You only pay if you decide to upgrade to Pro for unlimited tracking and advanced analytics."
              />
              <FaqItem 
                question="How does SubTrack know when my subscriptions renew?" 
                answer="When you add a subscription, you enter the billing cycle (monthly, yearly, weekly) and the next billing date. SubTrack uses this to automatically calculate and notify you before all future renewals."
              />
              <FaqItem 
                question="Is my financial data secure?" 
                answer="Absolutely. We use bank-level encryption for all data. Furthermore, SubTrack is a tracking tool—we do not connect directly to your bank accounts to pull funds, so your money is always safe."
              />
              <FaqItem 
                question="Can I cancel my SubTrack Pro subscription anytime?" 
                answer="Yes, you can easily cancel your Pro subscription at any time from your account settings. You will retain access to Pro features until the end of your current billing period."
              />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-background-primary border-t border-border-card pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-background-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-text-primary">SubTrack</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Take control of every subscription. Track spending, avoid unexpected renewals, and optimize your recurring expenses.
            </p>
            <div className="flex items-center gap-4 mt-2">
               <a href="#" className="text-text-muted hover:text-accent-primary-from transition-colors"><Twitter className="w-5 h-5" /></a>
               <a href="#" className="text-text-muted hover:text-accent-primary-from transition-colors"><Github className="w-5 h-5" /></a>
               <a href="#" className="text-text-muted hover:text-accent-primary-from transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><a href="#features" className="hover:text-accent-primary-from transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-accent-primary-from transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-accent-primary-from transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-accent-primary-from transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-accent-primary-from transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent-primary-from transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-primary-from transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent-primary-from transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Stay Updated</h4>
            <p className="text-sm text-text-secondary mb-4">Subscribe to our newsletter for the latest updates and financial tips.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="bg-background-secondary border border-border-card rounded-lg px-3 py-2 text-sm text-text-primary w-full focus:outline-none focus:border-accent-primary-from focus:ring-1 focus:ring-accent-primary-from outline-none transition-all" />
              <button className="bg-gradient-primary text-background-primary px-3 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-border-card text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} SubTrack. All rights reserved.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
             <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
             <a href="#" className="hover:text-text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cn(
      "border bg-background-card rounded-2xl overflow-hidden transition-all duration-300",
      isOpen ? "border-accent-primary-from/50 shadow-[0_0_15px_rgba(0,245,160,0.05)]" : "border-border-card hover:border-accent-primary-from/30"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-text-primary text-lg">{question}</span>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
          isOpen ? "bg-accent-primary-from/10 text-accent-primary-from" : "bg-background-secondary text-text-muted"
        )}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <div 
        className={cn(
          "px-6 overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-text-secondary leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background-card border border-border-card p-6 rounded-2xl hover:border-accent-primary-from/50 transition-colors">
      <div className="w-12 h-12 bg-accent-secondary/30 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}
