'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Sparkles, ChefHat, HeartHandshake } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
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
    imageUrl: '/Acacia Firewood Preparation 2.png',
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
    imageUrl: '/Journey of a Feast 4.png',
  },
];

export default function JourneyOfAFeast() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden" id="journey-of-feast">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-maroon/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title with subtle viewport entrance */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
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
        </motion.div>

        {/* Step-by-Step Storytelling Container */}
        <div className="relative">
          {/* Subtle Golden Connector Line linking steps on desktop */}
          <div
            className="hidden lg:block absolute top-[96px] left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 35 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.65,
                    delay: shouldReduceMotion ? 0 : index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-charcoal-700/60 border border-gold/30 rounded-sm overflow-hidden group hover:border-gold hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-maroon/20"
                >
                  {/* Progressive Image Container with Refined Reveal */}
                  <div className="relative h-52 w-full overflow-hidden bg-charcoal-900">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                    {/* Step Number Badge with Golden Trim */}
                    <div className="absolute top-3 left-3 bg-maroon/95 text-gold border border-gold/50 px-3 py-1 rounded-sm text-xs font-serif font-bold shadow-md tracking-wider">
                      STEP {item.step}
                    </div>

                    {/* Step Indicator Dot (Connector Anchor) */}
                    <div
                      className="hidden lg:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center space-x-2 text-gold mb-1.5">
                        <IconComponent className="w-4 h-4 text-gold" />
                        <span className="font-telugu text-xs text-gold/90 font-medium">
                          {item.teluguTitle}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-ivory mb-2 group-hover:text-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-ivory/70">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gold/70 font-medium">
                      <span>Venky Yadav Standard</span>
                      <span>100% Authentic</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
