import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import Navbar from '../components/landing/Navbar';
import SuspendedPhoneMockup from '../components/landing/SuspendedPhoneMockup';
import ProductShowcase from '../components/landing/ProductShowcase';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import PrivacySection from '../components/landing/PrivacySection';
import PricingSection from '../components/landing/PricingSection';
import FaqSection from '../components/landing/FaqSection';
import Footer from '../components/landing/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Landing() {
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <div className="min-h-screen bg-background-primary flex flex-col font-sans overflow-x-hidden">
      {/* Glass Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative px-6 py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-8 items-center overflow-x-clip"
        >
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start gap-6 z-10 relative">
            
            {/* Eyebrow */}
            <div 
              className={cn(
                "badge mb-2 flex items-center gap-2 !bg-accent-secondary/30 !text-accent-primary-from !border-accent-secondary/50 !px-4 !py-1.5 !rounded-full transition-all duration-700 ease-out",
                isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              SUBTRACK - YOUR FINANCES, SIMPLIFIED
            </div>

            {/* Headline */}
            <h1 
              className={cn(
                "text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight leading-[1.1] [text-wrap:balance] transition-all duration-700 ease-out",
                isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '100ms' }}
            >
              Smart Subscriptions<br />
              <span className="text-gradient">For a Better You</span>
            </h1>

            {/* Paragraph */}
            <p 
              className={cn(
                "text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed mt-1 transition-all duration-700 ease-out",
                isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '200ms' }}
            >
              Track, manage, and optimize your money with SubTrack. All your recurring expenses in one intelligent app.
            </p>
            
            {/* CTAs */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 transition-all duration-700 ease-out",
                isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '300ms' }}
            >
              <Link 
                to="/signup" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-primary text-background-primary font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-[15px] shadow-sm hover:shadow-[0_0_25px_rgba(0,245,160,0.3)]"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 bg-background-card/50 border border-border-card text-text-primary font-semibold rounded-xl hover:bg-border-card transition-colors flex items-center justify-center gap-2 text-[15px]"
              >
                <PlayCircle className="w-5 h-5" /> Watch Demo
              </Link>
            </div>
            
            {/* Social Proof */}
            <div 
              className={cn(
                "flex items-center gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border-card/50 w-full max-w-md transition-all duration-700 ease-out",
                isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=33" alt="User" referrerPolicy="no-referrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-background-primary object-cover relative z-[4] bg-neutral-800" />
                <img src="https://i.pravatar.cc/100?img=47" alt="User" referrerPolicy="no-referrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-background-primary object-cover relative z-[3] bg-neutral-800" />
                <img src="https://i.pravatar.cc/100?img=12" alt="User" referrerPolicy="no-referrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-background-primary object-cover relative z-[2] bg-neutral-800" />
                <img src="https://i.pravatar.cc/100?img=31" alt="User" referrerPolicy="no-referrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-background-primary object-cover relative z-[1] bg-neutral-800" />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 text-yellow-500 mb-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <div className="text-xs sm:text-sm text-text-secondary leading-tight">
                  Trusted by 25,000+ users<br/>worldwide
                </div>
              </div>
            </div>
          </div>

          <div 
            className={cn(
              "lg:col-span-6 xl:col-span-5 relative flex justify-center lg:justify-end items-center w-full z-10 mt-4 lg:mt-0 transition-all duration-1000 ease-out",
              isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: '250ms' }}
          >
            <SuspendedPhoneMockup />
          </div>
        </section>

        {/* Section 1: Product Showcase */}
        <ProductShowcase />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Privacy & Security Section */}
        <PrivacySection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
}
