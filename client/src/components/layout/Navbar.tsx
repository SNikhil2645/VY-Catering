'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, UtensilsCrossed, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll listener for subtle shadow elevation without layout shifts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Functions', href: '/functions' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Cafe', href: '/cafe', highlight: true },
    { label: 'Contact', href: '/contact' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* 1. ULTRA-TRANSLUCENT FLOATING FROSTED GLASS NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto pointer-events-auto rounded-2xl bg-white/[0.08] backdrop-blur-[20px] backdrop-saturate-[160%] border border-white/[0.15] py-2.5 sm:py-3.5 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            scrolled
              ? 'shadow-[0_16px_45px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.22)] border-white/[0.2]'
              : 'shadow-[0_10px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)]'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-maroon to-maroon-900 border border-gold/50 flex items-center justify-center shadow-lg group-hover:border-gold transition-colors">
                <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-xl font-bold tracking-wider text-ivory group-hover:text-gold transition-colors leading-tight">
                  VENKY YADAV
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
                  CATERINGS <span className="text-ivory/40">|</span> <span className="font-telugu text-[9px] sm:text-[10px] tracking-normal text-ivory/70">వెంకీ యాదవ్</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs xl:text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      link.highlight
                        ? 'text-marigold font-semibold hover:text-marigold-hover'
                        : active
                        ? 'text-gold font-semibold'
                        : 'text-ivory/85 hover:text-ivory'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full shadow-[0_0_8px_rgba(198,161,91,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons & Quick Call */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="tel:+916304005185"
                className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-gold hover:text-gold-light py-2 px-3.5 bg-black/35 border border-gold/40 hover:border-gold rounded-full transition-colors shadow-sm"
                title="Call Catering Services"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>+91 63040 05185</span>
              </a>

              <Button
                href="/booking"
                variant="primary"
                size="sm"
                className="rounded-full shadow-lg shadow-maroon/40"
                icon={<Calendar className="w-3.5 h-3.5 text-gold" />}
              >
                Plan Your Event
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex sm:hidden items-center space-x-2">
              <Button href="/booking" variant="primary" size="sm" className="rounded-full text-xs px-3 py-1.5">
                Enquire
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ivory/80 hover:text-gold focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Frosted Glassmorphic Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-3 sm:inset-x-6 top-16 sm:top-20 z-40 bg-charcoal-900/95 backdrop-blur-[24px] backdrop-saturate-[160%] border border-white/[0.15] rounded-2xl p-5 shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-maroon/40 text-gold border-l-2 border-gold font-semibold'
                      : 'text-ivory/90 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2.5">
            <a
              href="tel:+916304005185"
              className="flex items-center justify-center space-x-2 w-full py-2.5 bg-black/40 border border-gold/40 text-gold rounded-xl text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Catering: +91 63040 05185</span>
            </a>

            <Button href="/booking" variant="primary" size="md" className="w-full rounded-xl">
              Plan Your Event
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
