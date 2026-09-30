import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or ESC key
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        isScrolled
          ? "bg-[#0E1013]/85 backdrop-blur-xl border-b border-border-card/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-[#121212]/60 backdrop-blur-md border-b border-border-card/40 py-4 sm:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={scrollToTop}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded-lg"
          aria-label="SubTrack home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-background-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            SubTrack
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav 
          className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary"
          aria-label="Main Navigation"
        >
          <a 
            href="#features" 
            onClick={(e) => handleNavClick(e, 'features')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
          >
            How It Works
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => handleNavClick(e, 'pricing')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            onClick={(e) => handleNavClick(e, 'faq')}
            className="hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
          >
            FAQ
          </a>
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-medium text-text-secondary hover:text-white transition-colors px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from"
          >
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="text-sm font-semibold bg-gradient-primary text-background-primary px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm hover:shadow-[0_0_20px_rgba(0,245,160,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link 
            to="/signup" 
            className="text-xs font-semibold bg-gradient-primary text-background-primary px-3.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Glass Dropdown Menu */}
      <div 
        className={cn(
          "sm:hidden transition-all duration-300 ease-in-out overflow-hidden border-b border-border-card/60 bg-[#101216]/95 backdrop-blur-2xl",
          isMobileMenuOpen ? "max-h-[380px] opacity-100 py-5 px-6 shadow-2xl" : "max-h-0 opacity-0 py-0 px-6 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-3">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            <a 
              href="#features" 
              onClick={(e) => handleNavClick(e, 'features')}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleNavClick(e, 'how-it-works')}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavClick(e, 'faq')}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-3 border-t border-border-card/50 flex flex-col gap-2.5">
            <Link 
              to="/login"
              className="w-full py-2.5 text-center text-sm font-medium text-text-secondary hover:text-white bg-white/5 rounded-xl border border-border-card/60 transition-colors"
            >
              Log in
            </Link>
            <Link 
              to="/signup"
              className="w-full py-2.5 text-center text-sm font-semibold bg-gradient-primary text-background-primary rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
