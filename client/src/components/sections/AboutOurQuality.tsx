'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Flame, Award, CheckCircle2, Sparkles, ChefHat, HeartHandshake } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AboutOurQuality() {
  return (
    <section className="py-24 bg-charcoal-800 border-b border-gold/20 relative overflow-hidden">
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-maroon/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 1. High-Impact Side Column: Vertical Floating Cutout Card with Venky Anna holding the platter */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Background Gold Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 via-maroon/20 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* The Image Container: rounded-2xl, subtle gold border accent, smooth lifting hover effect */}
            <div className="relative group rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-charcoal-900 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-gold">
              {/* Image Frame */}
              <div className="relative h-[480px] sm:h-[540px] w-full bg-gradient-to-b from-charcoal-900 to-charcoal-800">
                <Image
                  src="/intro.png"
                  alt="Venky Anna holding the large feast platter - Venky Yadav Caterings Tirupati"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high-res chef holding food if local file is missing
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('unsplash')) {
                      target.src = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop';
                    }
                  }}
                />

                {/* Subtle cinematic gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-900/30 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-charcoal-900/90 backdrop-blur-md border border-gold/50 px-3.5 py-1.5 rounded-full shadow-lg">
                  <ChefHat className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs font-semibold text-gold tracking-wide">
                    Venky Anna <span className="text-ivory/50">•</span> Master Caterer
                  </span>
                </div>

                {/* Floating Platter Banner */}
                <div className="absolute bottom-5 left-5 right-5 z-10 p-4 bg-charcoal-900/95 backdrop-blur-md border border-gold/40 rounded-xl shadow-2xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
                        Signature Feast Craft
                      </span>
                      <h4 className="font-serif text-lg font-bold text-ivory">
                        Grand Platter Service
                      </h4>
                      <p className="font-telugu text-xs text-gold/80 mt-0.5">
                        వెంకీ యాదవ్ చేతి రుచి — తిరుపతి ఘనకీర్తి
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-maroon/40 border border-gold/50 flex items-center justify-center text-gold flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-gold animate-spin" />
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-ivory/70">
                    <span>Capacity: 350 – 1,700+</span>
                    <span className="text-green-400 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span>Live Wood-Fire Dum</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Editorial Content: "About Our Quality" */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon/30 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Uncompromising Standards</span>
              <span className="text-ivory/40">|</span>
              <span className="font-telugu text-[11px] text-ivory/80">నాణ్యత & రుచికి తిరుగులేదు</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory leading-tight">
              About Our Quality & <br />
              <span className="bg-gradient-to-r from-ivory via-gold to-gold-light bg-clip-text text-transparent italic font-serif">
                Culinary Discipline
              </span>
            </h2>

            <p className="text-ivory/80 text-base leading-relaxed">
              At <strong>Venky Yadav Caterings</strong>, we view every wedding and life celebration as our own family gathering. Under the direct kitchen supervision of <strong>Venky Anna</strong>, our culinary brigade follows rigorous time-honored practices that guarantee every bite leaves an indelible memory on your guests.
            </p>

            {/* Quality Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-charcoal-700/60 border border-white/10 rounded-xl space-y-1.5 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-2 text-gold">
                  <Flame className="w-4 h-4" />
                  <h4 className="font-semibold text-sm text-ivory">Pure Acacia Firewood Dum</h4>
                </div>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  We slow-cook our signature mutton dum biryani and bagara rice exclusively over seasoned acacia logs for deep earthen smoke.
                </p>
              </div>

              <div className="p-4 bg-charcoal-700/60 border border-white/10 rounded-xl space-y-1.5 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-2 text-gold">
                  <Award className="w-4 h-4" />
                  <h4 className="font-semibold text-sm text-ivory">5:00 AM Fresh Sourcing</h4>
                </div>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Tender baby mutton, morning coastal prawns, and farm-fresh greens are personally inspected at dawn before entering our kitchens.
                </p>
              </div>

              <div className="p-4 bg-charcoal-700/60 border border-white/10 rounded-xl space-y-1.5 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-2 text-gold">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <h4 className="font-semibold text-sm text-ivory">Cold-Pressed Oils & Ghee</h4>
                </div>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Zero palm oils, zero artificial food coloring, and zero MSG. Every sweet and dal is enriched with pure desi cow ghee.
                </p>
              </div>

              <div className="p-4 bg-charcoal-700/60 border border-white/10 rounded-xl space-y-1.5 hover:border-gold/30 transition-colors">
                <div className="flex items-center space-x-2 text-gold">
                  <HeartHandshake className="w-4 h-4" />
                  <h4 className="font-semibold text-sm text-ivory">1,700+ Guest Capacity</h4>
                </div>
                <p className="text-xs text-ivory/70 leading-relaxed">
                  Trained, uniformed serving captains deliver piping-hot food with synchronized courtesy for the largest wedding muhurthams.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href="/booking" variant="primary" size="md">
                Plan Your Event With Venky Anna
              </Button>
              <Button href="/menu" variant="outline" size="md">
                Browse Master Menus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
