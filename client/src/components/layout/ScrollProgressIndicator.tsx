'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If native CSS scroll-timeline is supported, CSS handles it directly on compositor thread
    if (typeof window !== 'undefined' && window.CSS && CSS.supports('animation-timeline', 'scroll()')) {
      return;
    }

    // Fallback for browsers without native animation-timeline: scroll()
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollable > 0) {
            const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
            bar.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="gold-scroll-progress-bar"
      aria-hidden="true"
    />
  );
}
