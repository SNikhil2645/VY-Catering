'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Sparkles, ChefHat, HeartHandshake } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';

const STEPS = [
  {
    step: '01',
    title: 'Sourcing Pure Heirloom Ingredients',
    teluguTitle: 'మేలైన దినుసుల సేకరణ',
    icon: Sparkles,
    description:
      'We never use commercial flavor packets. Stone-ground Guntur & Warangal chilies, cold-pressed groundnut oil, farm-fresh mutton, and pure coastal tamarind are inspected personally by Venky Yadav.',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
  },
  {
    step: '02',
    title: 'Acacia Firewood Preparation',
    teluguTitle: 'కట్టెల పొయ్యిపై వంటకం',
    icon: Flame,
    description:
      'Large outdoor cauldrons (copper & brass degs) are fired using seasoned natural wood logs. The distinct natural embers impart an unmistakable earthen aroma that modern gas stoves can never replicate.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
  },
  {
    step: '03',
    title: 'Sealed Slow Dum Cooking',
    teluguTitle: 'దమ్ విధానం',
    icon: ChefHat,
    description:
      'The deg is tightly sealed with whole wheat dough (parda) to trap every drop of moisture. Steaming over slow glowing coals allows meat and aged basmati to cook gently in their own rich juices.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
  },
  {
    step: '04',
    title: 'Traditional Banana-Leaf Serving',
    teluguTitle: 'అరిటాకు విందు భోజనం',
    icon: HeartHandshake,
    description:
      'Served warm on pristine, fresh green banana leaves according to ceremonial Vedic order—salt, pickles, chutneys, fries, dal, aromatic biryani, rasam, and concluding with sweet payasam.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
  },
];

export default function JourneyOfAFeast() {
  return (
    <section className="py-24 bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
            The Culinary Ritual
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-4">
            Journey of a Feast
          </h2>
          <p className="text-ivory/70 text-base">
            From sunrise fires in Tirupati to royal celebratory tables. Discover how four generations of culinary discipline translate into each bite.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>

        {/* Step-by-Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="bg-charcoal-700/50 border border-gold/30 rounded-sm overflow-hidden group hover:border-gold hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-3 left-3 bg-maroon/90 text-gold border border-gold/40 px-3 py-1 rounded-sm text-xs font-serif font-bold">
                    STEP {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center space-x-2 text-gold mb-1">
                      <IconComponent className="w-4 h-4" />
                      <span className="font-telugu text-xs text-gold/80">{item.teluguTitle}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-ivory mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-ivory/70">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gold/70">
                    <span>Venky Yadav Standard</span>
                    <span>100% Authentic</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
