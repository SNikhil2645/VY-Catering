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

  // Scroll listener for sticky solid background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-charcoal-900/95 backdrop-blur-md border-b border-gold/30 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-charcoal-900/90 via-charcoal-900/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-maroon to-maroon-900 border border-gold/50 flex items-center justify-center shadow-lg group-hover:border-gold transition-colors">
                <UtensilsCrossed className="w-5 h-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-ivory group-hover:text-gold transition-colors">
                  VENKY YADAV
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium">
                  CATERINGS <span className="text-ivory/40">|</span> <span className="font-telugu text-[10px] tracking-normal text-ivory/70">వెంకీ యాదవ్</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      link.highlight
                        ? 'text-marigold font-semibold hover:text-marigold-hover'
                        : active
                        ? 'text-gold font-semibold'
                        : 'text-ivory/80 hover:text-ivory'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons & Quick Call */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="tel:+916304005185"
                className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-gold hover:text-gold-light py-2 px-3 border border-gold/30 hover:border-gold rounded-sm transition-colors"
                title="Call Catering Services"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>+91 63040 05185</span>
              </a>

              <Button
                href="/booking"
                variant="primary"
                size="sm"
                icon={<Calendar className="w-3.5 h-3.5 text-gold" />}
              >
                Plan Your Event
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex sm:hidden items-center space-x-2">
              <Button href="/booking" variant="primary" size="sm">
                Enquire
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ivory/80 hover:text-gold focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden pt-20">
          <div className="bg-charcoal-800 border-b border-gold/30 px-6 py-8 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 px-3 rounded text-base font-medium transition-colors ${
                      active
                        ? 'bg-maroon/30 text-gold border-l-2 border-gold font-semibold'
                        : 'text-ivory/90 hover:text-gold hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href="tel:+916304005185"
                className="flex items-center justify-center space-x-2 w-full py-3 bg-charcoal border border-gold/40 text-gold rounded-sm text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Catering: +91 63040 05185</span>
              </a>

              <Button href="/booking" variant="primary" size="md" className="w-full">
                Plan Your Event (Multi-Step Form)
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
