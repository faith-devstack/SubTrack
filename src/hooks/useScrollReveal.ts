import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for smooth, subtle scroll reveals using IntersectionObserver.
 * - Respects prefers-reduced-motion: reduce immediately.
 * - Supports re-animating when revisited on scroll (when triggerOnce is false) without flickering.
 * - Prevents elements from remaining invisible if observer is unavailable or delayed.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = false
  } = options;

  const ref = useRef<T>(null);
  // Default to visible if window is undefined (SSR safety)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    // Fallback timer to ensure elements are never permanently hidden if an observer fails
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    if (!('IntersectionObserver' in window)) {
      clearTimeout(safetyTimer);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            // Re-trigger cleanly when scrolled completely out of view
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      clearTimeout(safetyTimer);
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
