'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, Utensils, Check, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FunctionConfig {
  id: string;
  name: string;
  teluguName: string;
  category: string;
  defaultGuests: number;
  serviceStyle: string;
  recommendedMenu: string[];
  signatureHighlight: string;
}

const FUNCTIONS_DATA: FunctionConfig[] = [
  {
    id: 'wedding',
    name: 'Wedding / Muhurtham',
    teluguName: 'పెళ్లి ముహూర్తం విందు',
    category: 'Wedding',
    defaultGuests: 800,
    serviceStyle: 'Banana-leaf Sadhya or Grand Royal Buffet',
    recommendedMenu: [
      'Authentic Hyderabadi Mutton Dum Biryani',
      'Crispy Andhra Loose Prawns',
      'Gutti Vankaya Kura (Stuffed Brinjal)',
      'Bendakaya Chepala Pulusu',
      'Mirchi ka Salan & Raita',
      'Hot Double ka Meetha & Desi Ghee Jalebi',
    ],
    signatureHighlight: 'Live outdoor firewood handi preparation & ceremonial banana leaf service.',
  },
  {
    id: 'reception',
    name: 'Grand Evening Reception',
    teluguName: 'వివాహ రిసెప్షన్',
    category: 'Wedding',
    defaultGuests: 600,
    serviceStyle: 'Grand Multi-Cuisine Buffet + Live Counters',
    recommendedMenu: [
      'Hyderabadi Dum Biryani & Veg Pulao',
      'Spicy Andhra Chicken Roast Fry',
      'Live Tandoori Naan & Paneer Butter Masala',
      'Live Chaat & Pani Puri Counter',
      'Veg Manchuria & Loose Prawns Counter',
      'Qubani ka Meetha with Ice Cream',
    ],
    signatureHighlight: 'High-energy live starter stations and illuminated brass chafers.',
  },
  {
    id: 'gruhapravesham',
    name: 'Housewarming (Gruhapravesham)',
    teluguName: 'గృహప్రవేశం భోజనం',
    category: 'Family',
    defaultGuests: 250,
    serviceStyle: 'Traditional Sit-Down Banana-Leaf Sadhya',
    recommendedMenu: [
      'Chintapandu Pulihora (Tamarind Rice)',
      'Gutti Vankaya Masala Kura',
      'Rayalaseema Tomato Pappu with Ghee',
      'Dondakaya Fry with Roasted Cashews',
      'Tirupati Sambar & Pepper Rasam',
      'Bellam Payasam & Sweet Boondi',
    ],
    signatureHighlight: '100% Satvik cooking options with pure cow ghee and no artificial additives.',
  },
  {
    id: 'birthday',
    name: 'Birthday & Milestone Celebrations',
    teluguName: 'పుట్టినరోజు వేడుకలు',
    category: 'Family',
    defaultGuests: 150,
    serviceStyle: 'Buffet with Interactive Kids & Live Counters',
    recommendedMenu: [
      'Chicken Dum Biryani / Veg Biryani',
      'Crispy Chicken Lollipops',
      'Live Mini Dosa & Noodles Counter',
      'Veg Manchurian & Spring Rolls',
      'Gulab Jamun with Rabri',
      'Cold Beverage & Mocktail Counter',
    ],
    signatureHighlight: 'Engaging live counters suited for both children and elders.',
  },
  {
    id: 'corporate',
    name: 'Corporate Conferences & Dinners',
    teluguName: 'కార్పొరేట్ ఈవెంట్స్',
    category: 'Corporate',
    defaultGuests: 350,
    serviceStyle: 'Executive Buffet & High-Tea Stations',
    recommendedMenu: [
      'Aromatic Chicken Dum Biryani',
      'Paneer Tikka Masala & Jeera Rice',
      'Assorted Tandoori Breads',
      'Fresh Garden Salads & Raita',
      'Moong Dal Halwa',
      'Premium Filter Coffee & Chai Counter',
    ],
    signatureHighlight: 'Strict adherence to timeline, hygienic executive presentation.',
  },
];

export default function FunctionFinder() {
  const [selectedFunction, setSelectedFunction] = useState<FunctionConfig>(FUNCTIONS_DATA[0]);
  const [guestCount, setGuestCount] = useState<number>(FUNCTIONS_DATA[0].defaultGuests);

  const handleSelectFunction = (fn: FunctionConfig) => {
    setSelectedFunction(fn);
    setGuestCount(fn.defaultGuests);
  };

  return (
    <section className="py-20 bg-charcoal-900 border-t border-gold/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Menu Builder</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-4">
            Function Finder
          </h2>
          <p className="text-ivory/70 text-base">
            Select your celebration to instantly view our master-recommended menu, suggested service format, and tailored guest arrangements.
          </p>
        </div>

        {/* Interactive Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {FUNCTIONS_DATA.map((fn) => {
            const isSelected = selectedFunction.id === fn.id;
            return (
              <button
                key={fn.id}
                type="button"
                onClick={() => handleSelectFunction(fn)}
                className={`px-4 py-2.5 rounded-sm text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-maroon text-ivory border border-gold shadow-lg shadow-maroon/30 scale-105'
                    : 'bg-charcoal-700/60 text-ivory/80 border border-white/10 hover:border-gold/40'
                }`}
              >
                <span>{fn.name}</span>
                <span className="block text-[10px] font-telugu text-gold/80">{fn.teluguName}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommended Menu Layout */}
        <div className="bg-charcoal-800 border-2 border-gold/30 rounded-sm p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Event Overview & Guest Slider */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                Event Selection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mt-1">
                {selectedFunction.name}
              </h3>
              <p className="font-telugu text-gold text-sm mt-0.5">{selectedFunction.teluguName}</p>
            </div>

            {/* Service Format */}
            <div className="p-4 bg-charcoal-700/70 border border-white/10 rounded-sm">
              <span className="text-xs uppercase tracking-wider text-ivory/60 block mb-1">
                Recommended Service Format
              </span>
              <p className="font-semibold text-ivory text-sm">
                {selectedFunction.serviceStyle}
              </p>
            </div>

            {/* Guest Count Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-ivory/80">Estimated Guests:</span>
                <span className="text-gold font-bold font-serif text-lg">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-ivory/40">
                <span>100 (Intimate)</span>
                <span>1,000 (Grand)</span>
                <span>2,500+ (Mega)</span>
              </div>
            </div>

            <div className="p-4 bg-maroon/20 border-l-2 border-gold text-xs text-ivory/80 leading-relaxed">
              <span className="font-semibold text-gold block mb-1">Culinary Note:</span>
              {selectedFunction.signatureHighlight}
            </div>

            {/* Prefilled CTA */}
            <div className="pt-2">
              <Button
                href={`/booking?eventType=${encodeURIComponent(selectedFunction.name)}&guests=${guestCount}`}
                variant="primary"
                size="lg"
                className="w-full"
                icon={<Calendar className="w-4 h-4 text-gold" />}
              >
                Plan This Event with This Menu
              </Button>
            </div>
          </div>

          {/* Right Column: Assembled Menu Items */}
          <div className="lg:col-span-7 bg-charcoal-700/50 border border-gold/20 p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h4 className="font-serif text-xl font-bold text-ivory">
                    Curated Feast Spread
                  </h4>
                  <p className="text-xs text-ivory/60">
                    Hand-picked authentic dishes balanced for {guestCount} guests
                  </p>
                </div>
                <span className="px-3 py-1 bg-banana/20 text-banana-light border border-banana/40 rounded-full text-xs font-semibold">
                  Chef Approved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedFunction.recommendedMenu.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3 bg-charcoal-800/80 border border-white/5 rounded-sm hover:border-gold/30 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory leading-snug">{item}</p>
                      <span className="text-[10px] text-ivory/50 uppercase tracking-wider">
                        Course {idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
              <span>* Custom tasting sessions available upon advance wedding enquiry.</span>
              <Link
                href="/menu"
                className="text-gold font-semibold hover:underline inline-flex items-center space-x-1"
              >
                <span>View Full 40+ Dish Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
