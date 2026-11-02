'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Utensils, Award, Sparkles, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BananaLeafHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Cinematic Food & Banquet Image with Deep Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1920&auto=format&fit=crop"
          alt="Royal Indian Wedding Banquet Catering"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform animate-pulse duration-1000 opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-maroon/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Telugu Brand Accent Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-maroon/40 border border-gold/40 text-gold text-xs font-semibold tracking-wider mb-6 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
          <span className="font-telugu text-sm">వెంకీ యాదవ్ కేటరింగ్స్</span>
          <span className="text-ivory/50">|</span>
          <span className="uppercase text-[11px] tracking-widest text-ivory/90">Tirupati’s Premier Feast House</span>
        </div>

        {/* Master Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-ivory leading-[1.1] mb-6">
          Every Celebration <br />
          <span className="bg-gradient-to-r from-ivory via-gold to-gold-light bg-clip-text text-transparent italic font-serif">
            Deserves an Unforgettable Feast.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-ivory/80 leading-relaxed mb-10 font-normal">
          From royal wedding sadhyas of 1,700+ guests to intimate family celebrations. Handcrafted with authentic wood-fire dum biryani, fresh coastal prawns, and heirloom Rayalaseema spices.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            href="/booking"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-2xl shadow-maroon/30"
            icon={<Calendar className="w-5 h-5 text-gold" />}
          >
            Plan Your Event
          </Button>

          <Button
            href="/menu"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            icon={<Utensils className="w-5 h-5 text-gold" />}
          >
            Explore Catering Menu
          </Button>
        </div>

        {/* Highlights / Trust Metrics (All realistic & conservative) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 border-t border-white/10">
          <div className="p-3 text-center">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">350 – 1700+</span>
            <span className="text-xs text-ivory/60 uppercase tracking-wider">Guest Capacity</span>
          </div>
          <div className="p-3 text-center">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">Wood-Fire</span>
            <span className="text-xs text-ivory/60 uppercase tracking-wider">Traditional Dum</span>
          </div>
          <div className="p-3 text-center">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">Pure Desi</span>
            <span className="text-xs text-ivory/60 uppercase tracking-wider">Ghee & Spices</span>
          </div>
          <div className="p-3 text-center">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">Tirupati</span>
            <span className="text-xs text-ivory/60 uppercase tracking-wider">& Rayalaseema</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest text-gold mb-1">Discover</span>
        <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
      </div>
    </section>
  );
}
