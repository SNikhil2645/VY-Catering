'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Flame, CheckCircle, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ThaliDish {
  id: string;
  name: string;
  teluguName: string;
  category: string;
  description: string;
  tradition: string;
  spiceLevel: number;
  imageUrl: string;
}

const THALI_DISHES: ThaliDish[] = [
  {
    id: 'biryani',
    name: 'Hyderabadi Mutton Dum Biryani',
    teluguName: 'మటన్ దమ్ బిర్యానీ',
    category: 'The Signature Dum Masterpiece',
    description: 'Tender baby mutton marinated in cold-pressed oils, browned onions, green chilies, and whole spices, slow-cooked in sealed copper handis over wood fire.',
    tradition: 'Served with mirchi ka salan and thick onion raita at royal Andhra banquets.',
    spiceLevel: 4,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prawns',
    name: 'Andhra Crispy Loose Prawns',
    teluguName: 'ల్యూస్ రొయ్యల వేపుడు',
    category: 'Coastal Rayalaseema Starter',
    description: 'Fresh coastal prawns marinated in crushed black pepper, Kashmiri chili, and garlic, flash-fried with aromatic curry leaves.',
    tradition: 'The most requested live-counter starter at Venky Yadav receptions.',
    spiceLevel: 5,
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'gutti-vankaya',
    name: 'Gutti Vankaya Kura',
    teluguName: 'గుత్తి వంకాయ కూర',
    category: 'Traditional Andhra Vegetarian',
    description: 'Small tender purple eggplants stuffed with freshly ground sesame seeds, roasted peanuts, dry coconut, and coriander seeds.',
    tradition: 'Essential traditional vegetarian curry for auspicious Telugu weddings.',
    spiceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'chicken-fry',
    name: 'Spicy Rayalaseema Chicken Fry',
    teluguName: 'రాయలసీమ కోడి వేపుడు',
    category: 'Homestyle Spiced Roast',
    description: 'Country chicken pieces slow-roasted in hand-pounded masala until the spices create a deep, fragrant crust around each piece.',
    tradition: 'Prepared over open flame for deep smokiness and intense flavour.',
    spiceLevel: 5,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'fish-pulusu',
    name: 'Bendakaya Chepala Pulusu',
    teluguName: 'బెండకాయ చేపల పులుసు',
    category: 'Heirloom Gravy',
    description: 'Freshwater fish and whole tender okra simmered in a piquant tamarind reduction with garlic, fenugreek, and mustard temper.',
    tradition: 'Tastes even richer as it rests in earthenware pots.',
    spiceLevel: 4,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
  },
];

export default function ThaliOrbit() {
  const [activeDish, setActiveDish] = useState<ThaliDish>(THALI_DISHES[0]);

  return (
    <section className="py-20 bg-charcoal-800 border-y border-gold/20 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Flavours</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-4">
            The Royal Thali Orbit
          </h2>
          <p className="text-ivory/70 text-base">
            Every dish we serve is rooted in deep Andhra heritage and prepared using authentic regional techniques. Click each delicacy to discover its culinary craft.
          </p>
        </div>

        {/* Orbit Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dish Selector Column (Orbit Buttons) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
              Select Signature Dish:
            </p>
            {THALI_DISHES.map((dish) => {
              const isSelected = activeDish.id === dish.id;
              return (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => setActiveDish(dish)}
                  className={`w-full text-left p-4 rounded-sm transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-maroon/40 border-gold shadow-lg shadow-maroon/20 translate-x-2'
                      : 'bg-charcoal-700/60 border-white/10 hover:border-gold/40 hover:bg-charcoal-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isSelected ? 'bg-gold animate-ping' : 'bg-white/20'
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-semibold ${
                          isSelected ? 'text-gold' : 'text-ivory'
                        }`}
                      >
                        {dish.name}
                      </h3>
                      <p className="font-telugu text-xs text-ivory/60">{dish.teluguName}</p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-gold translate-x-1' : 'text-ivory/40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Central Featured Dish Showcase */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900 border-2 border-gold/40 rounded-sm p-6 sm:p-8 shadow-2xl relative">
              {/* Brass Thali Motif Ring */}
              <div className="relative h-64 sm:h-80 w-full rounded-sm overflow-hidden mb-6 border border-gold/30">
                <Image
                  src={activeDish.imageUrl}
                  alt={activeDish.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-charcoal/90 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeDish.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-charcoal/80 px-2.5 py-1 rounded-sm text-xs text-red-400">
                  <Flame className="w-3.5 h-3.5 fill-red-500" />
                  <span>Spice Level: {'🌶️'.repeat(activeDish.spiceLevel)}</span>
                </div>
              </div>

              {/* Dish Story & Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                      {activeDish.name}
                    </h3>
                  </div>
                  <span className="font-telugu text-gold text-sm block">
                    {activeDish.teluguName}
                  </span>
                </div>

                <p className="text-ivory/80 text-sm leading-relaxed">
                  {activeDish.description}
                </p>

                <div className="p-3 bg-white/5 border-l-2 border-gold text-xs text-ivory/70 italic">
                  &ldquo;{activeDish.tradition}&rdquo;
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                  <div className="flex items-center space-x-2 text-xs text-green-400">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Included in Custom Event Tasting</span>
                  </div>

                  <Button href="/booking" variant="primary" size="sm">
                    Book for Your Feast
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
