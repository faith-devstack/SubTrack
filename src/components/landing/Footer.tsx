import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref: footerRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <footer 
      ref={footerRef}
      className={cn(
        "bg-background-primary border-t border-border-card/80 pt-16 pb-12 px-6 relative overflow-hidden transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-sm">
                <Activity className="w-5 h-5 text-background-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-text-primary">
                SubTrack
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              A clearer way to manage your subscriptions and understand your recurring spending.
            </p>
          </div>

          {/* Product Column */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="#features"
                  onClick={(e) => handleScrollTo(e, 'features')}
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, 'how-it-works')}
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#pricing"
                  onClick={(e) => handleScrollTo(e, 'pricing')}
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#faq"
                  onClick={(e) => handleScrollTo(e, 'faq')}
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  to="/dashboard"
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/login"
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup"
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Trust Column */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Trust & Privacy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="#privacy"
                  onClick={(e) => handleScrollTo(e, 'privacy')}
                  className="text-text-secondary hover:text-accent-primary-from transition-colors py-1 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded"
                >
                  Privacy Details
                </a>
              </li>
              <li>
                <span className="text-text-muted text-xs block pt-1">
                  Full data control with instant deletion inside your account settings.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Divider, Copyright & Back to Top */}
        <div className="pt-8 border-t border-border-card/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            &copy; {currentYear} SubTrack. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-text-secondary hover:text-accent-primary-from transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-from rounded px-2 py-1 cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
