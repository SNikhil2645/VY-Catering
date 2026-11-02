'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UtensilsCrossed,
  Utensils,
  Coffee,
  Sparkles,
  Flame,
  Check,
  Calculator,
  ArrowRight,
  Pizza,
  Drumstick,
  Sandwich,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatINR } from '@/lib/utils/formatters';

// Tab 1: Event Catering Spreads with Featured Circular Dish Images
const EVENT_CATERING_SPREADS = [
  {
    category: 'Rice & Mains',
    icon: UtensilsCrossed,
    featuredDish: 'Hyderabadi Mutton Dum Biryani',
    featuredImage: '/mutton-biryani.png',
    items: [
      { name: 'Chicken Biryani', desc: 'Aged basmati layered with tender spiced chicken over acacia firewood dum' },
      { name: 'Bagara Rice', desc: 'Aromatic seasoned rice tempered with whole spices, mint, and fried onions' },
      { name: 'Kushk Rice', desc: 'Rich, non-spicy flavored wedding biryani rice simmered in bone broth' },
      { name: 'Steamed Rice', desc: 'Pristine Sona Masoori boiled hot for traditional Andhra dal and rasam' },
    ],
  },
  {
    category: 'Gravies & Fries',
    icon: Flame,
    featuredDish: 'Spicy Andhra Chicken Fry',
    featuredImage: '/andhra-style-chicken-fry.png',
    items: [
      { name: 'Mutton Curry', desc: 'Rayalaseema style tender baby mutton slow-braised with roasted poppy & coconut' },
      { name: 'Chicken Curry', desc: 'Rich country style chicken gravy simmered in fresh coriander and onion paste' },
      { name: 'Chicken Roast', desc: 'Deeply caramelized succulent roast fry tossed in hand-ground black pepper' },
      { name: 'Regional Fish Specials', desc: 'Fresh river catch simmered with tender bendakaya in coastal tamarind reduction' },
    ],
  },
  {
    category: 'Veg & Accompaniments',
    icon: Sparkles,
    featuredDish: 'Gutti Vankaya Kura',
    featuredImage: '/Gutti Vankaya Kura.png',
    items: [
      { name: 'Mango Dal (Mamidi Pappu)', desc: 'Tangy raw mango simmered with toor dal, tempered with garlic and ghee' },
      { name: 'Palak Pappu', desc: 'Farm spinach cooked with lentils and traditional Andhra cumin temper' },
      { name: 'Tirupati Sambar', desc: 'Thick heirloom drumstick & shallot sambar made with freshly roasted spices' },
      { name: 'Aloo Tomato Curry', desc: 'Comforting potato and tomato gravy, a staple accompaniment at Telugu feasts' },
      { name: 'Chutney, Curd & Papad', desc: 'Stone-ground spicy gongura or tomato chutney, thick farm curd, and crisp papad' },
    ],
  },
  {
    category: 'Desserts & Sweets',
    icon: Coffee,
    featuredDish: 'Traditional Feast Sweets',
    featuredImage: '/Maska Bun & Irani Chai.png',
    items: [
      { name: 'Bread Halwa', desc: 'Crisp fried bread simmered in rich saffron milk, khoya, and desi ghee cashews' },
      { name: 'Gulab Jamun', desc: 'Warm melt-in-mouth milk dumplings steeped in fragrant cardamom sugar syrup' },
      { name: 'Kaja Jamun', desc: 'Crispy layered Kakinada style sweet dumpling soaked in rich nectar' },
      { name: 'Vanilla Ice Cream', desc: 'Chilled creamy vanilla scoop paired as the ultimate finale to hot biryani' },
    ],
  },
];

// Tab 2: Venky Yadav Cafe Menu (Korramenugunta Quick Service) with Featured Circular Dish Images
const CAFE_QUICK_SERVICE = [
  {
    category: 'Fried Chicken Specials',
    icon: Drumstick,
    badge: 'Quick Service',
    featuredDish: 'Crispy Peri Peri Wings',
    featuredImage: '/Crispy Peri Peri Fried Chicken Wings.png',
    items: [
      { name: 'Fried Chicken Legs', desc: 'Crisp double-crumbed juicy drumsticks dusted with house peri peri seasoning' },
      { name: 'Crispy Wings', desc: 'Golden batter wings tossed in smokey garlic BBQ or fiery Andhra pepper' },
      { name: 'Chicken Lollipops', desc: 'Classic spiced chicken drumettes flash-fried with fresh spring onions' },
    ],
  },
  {
    category: '9-Inch Handcrafted Pizzas',
    icon: Pizza,
    badge: 'Signature Fusion',
    featuredDish: 'Gongura Chicken Pizza',
    featuredImage: '/Gongura Chicken 9-inch Pizza.png',
    items: [
      { name: 'Unique Gongura Chicken Pizza', desc: 'Tangy Andhra gongura leaf base, spiced chicken, mozzarella, charred crust' },
      { name: 'Chicken Tikka Pizza', desc: 'Clay-oven smoked chicken chunks, bell peppers, melted cheese blend' },
      { name: 'Peri Peri Chicken Pizza', desc: 'Spicy peri peri sauce, shredded chicken, jalapenos, and oregano herbs' },
      { name: 'Gongura Veg Special Pizza', desc: 'Tangy gongura paste, golden corn, capsicum, paneer, and mozzarella' },
    ],
  },
  {
    category: 'Tandoori Burgers & Sandwiches',
    icon: Sandwich,
    badge: 'Chef Favorite',
    featuredDish: '4 AM Maska Bun & Irani Chai',
    featuredImage: '/Maska Bun & Irani Chai.png',
    items: [
      { name: 'Tandoori Chicken Burger', desc: 'Charred tandoori spiced patty, mint mayonnaise, lettuce, toasted brioche' },
      { name: 'Grilled Chicken Club Sandwich', desc: 'Triple-decker butter-toasted sandwich with egg, chicken shreds, and cheese' },
      { name: '4 AM Maska Bun', desc: 'Fresh soft pav generously spread with chilled Amul butter & cardamom chai' },
    ],
  },
  {
    category: 'Starters & Quick Bites',
    icon: Utensils,
    badge: 'Popular',
    featuredDish: 'Crispy Andhra Loose Prawns',
    featuredImage: '/Crispy Andhra Loose Prawns.png',
    items: [
      { name: 'Crispy Loose Prawns', desc: 'Coastal prawns flash-fried with crushed pepper, Kashmiri chili, and curry leaves' },
      { name: 'Peri Peri Loaded Fries', desc: 'Crispy potato fries smothered in liquid cheese, peri peri powder, and jalapenos' },
      { name: 'Classic Veg Manchuria', desc: 'Golden vegetable dumplings tossed in spicy garlic soy reduction' },
    ],
  },
];

export default function SignatureMenuTrack() {
  const [activeTab, setActiveTab] = useState<'catering' | 'cafe'>('catering');
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Dynamic Budget Calculator State (Base factor: ₹280/person)
  const [guestCount, setGuestCount] = useState<number>(350);
  const [addonBiryaniUpgrade, setAddonBiryaniUpgrade] = useState<boolean>(true); // +₹90/p
  const [addonLiveStarters, setAddonLiveStarters] = useState<boolean>(true); // +₹60/p
  const [addonLiveDessert, setAddonLiveDessert] = useState<boolean>(false); // +₹40/p
  const [isPulsing, setIsPulsing] = useState<boolean>(false);

  // Trigger elastic pulse whenever calculator values update
  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 450);
    return () => clearTimeout(timer);
  }, [guestCount, addonBiryaniUpgrade, addonLiveStarters, addonLiveDessert]);

  const handleTabSwitch = (tab: 'catering' | 'cafe') => {
    if (tab === activeTab) return;
    setDirection(tab === 'cafe' ? 'right' : 'left');
    setActiveTab(tab);
  };

  // Base rate calculation
  const baseRate = 280; // ₹280/person base
  const biryaniCost = addonBiryaniUpgrade ? 90 : 0;
  const startersCost = addonLiveStarters ? 60 : 0;
  const dessertCost = addonLiveDessert ? 40 : 0;
  const perPersonTotal = baseRate + biryaniCost + startersCost + dessertCost;
  const grandTotal = guestCount * perPersonTotal;

  return (
    <section className="py-24 bg-charcoal border-b border-gold/20 relative overflow-hidden" id="signature-menus">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
            <span>Curated Culinary Matrix</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-3">
            Our Signature Menus
          </h2>
          <p className="text-ivory/70 text-sm sm:text-base max-w-xl mx-auto">
            Explore authentic Rayalaseema event feasts prepared for grand celebrations, or discover quick-service crowd favorites at our Korramenugunta cafe.
          </p>
        </div>

        {/* Tab Switcher Controls with Frosted Glassmorphism */}
        <div className="flex items-center justify-center mb-14">
          <div className="bg-white/[0.06] backdrop-blur-[16px] p-1.5 rounded-full border border-white/[0.15] shadow-2xl flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleTabSwitch('catering')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'catering'
                  ? 'bg-maroon text-gold border border-gold shadow-lg shadow-maroon/40 scale-105'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-gold" />
              <span>Event Catering Spreads</span>
              <span className="hidden sm:inline-block text-[11px] font-telugu text-gold/80">(వేడుకల విందు)</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('cafe')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'cafe'
                  ? 'bg-marigold text-charcoal font-bold border border-marigold shadow-lg shadow-marigold/30 scale-105'
                  : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Venky Yadav Cafe Menu</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-charcoal/80 font-bold bg-charcoal/10 px-2 py-0.5 rounded-full">
                Korramenugunta
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Event Catering Spreads with Frosted Glass Sheet Cards */}
        {activeTab === 'catering' && (
          <div
            className={`space-y-14 ${
              direction === 'right' ? 'animate-slide-fade-left' : 'animate-slide-fade-right'
            }`}
          >
            {/* 2. FROSTED GLASS SHEET MENU CARDS (bg-white/[0.05], backdrop-blur-[14px], circular dishes standout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EVENT_CATERING_SPREADS.map((col, colIdx) => (
                <div
                  key={col.category}
                  style={{ animationDelay: `${colIdx * 100}ms` }}
                  className="bg-white/[0.05] backdrop-blur-[14px] border border-white/[0.12] hover:backdrop-blur-[20px] hover:border-white/[0.28] rounded-2xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.14)] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] animate-stagger-in"
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-sm">
                          <col.icon className="w-4 h-4 text-gold" />
                        </span>
                        <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                          {col.category}
                        </h3>
                      </div>
                      <span className="text-[10px] text-ivory/50 uppercase tracking-widest font-mono">
                        0{colIdx + 1}
                      </span>
                    </div>

                    {/* PROMINENT CIRCULAR DISH PLATE: Crisp, sharp, 0 blur, appetizing */}
                    <div className="py-2 flex flex-col items-center justify-center">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-br from-gold/60 via-wood-dark to-charcoal-900 border-2 border-gold/70 shadow-[0_12px_28px_rgba(0,0,0,0.85)] group-hover:border-gold group-hover:scale-105 transition-all duration-500">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-charcoal-900">
                          <Image
                            src={col.featuredImage}
                            alt={col.featuredDish}
                            fill
                            sizes="128px"
                            className="object-cover object-center filter-none group-hover:scale-110 transition-transform duration-700 ease-out"
                            style={{ opacity: 1, filter: 'none' }}
                          />
                          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none shadow-inner" />
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gold font-semibold mt-2.5 text-center line-clamp-1">
                        {col.featuredDish}
                      </span>
                    </div>

                    {/* Sharp Dish Item List */}
                    <div className="space-y-2.5">
                      {col.items.map((item) => (
                        <div
                          key={item.name}
                          className="p-3 bg-black/35 backdrop-blur-sm rounded-xl border border-white/[0.08] group-hover:border-white/[0.16] hover:border-gold/40 hover:bg-black/50 transition-all"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            <h4 className="text-xs font-semibold text-ivory leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-ivory/70 mt-1 pl-3.5 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gold/80 font-semibold">
                    <span>100% Authentic Preparation</span>
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                </div>
              ))}
            </div>

            {/* 3. DYNAMIC BUDGET CALCULATOR COMPONENT: FROSTED GLASS CANVAS */}
            <div className="bg-white/[0.06] backdrop-blur-[24px] backdrop-saturate-[160%] border border-white/[0.12] rounded-3xl p-6 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)] space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                    <Calculator className="w-4 h-4 text-gold" />
                    <span>Dynamic Event Budget Calculator</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                    Estimate Your Celebration Feast
                  </h3>
                  <p className="text-xs text-ivory/80">
                    Calculated using our transparent base rate factor of{' '}
                    <strong className="text-gold font-bold">₹{baseRate} / person</strong> including full banquet spread & service.
                  </p>
                </div>

                <div className="flex items-center space-x-2 bg-black/40 border border-gold/40 px-4 py-2 rounded-xl text-xs text-gold font-semibold shadow-inner">
                  <Sparkles className="w-4 h-4 text-gold animate-spin" />
                  <span>Real-Time Estimation Engine</span>
                </div>
              </div>

              {/* Calculator Inputs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Controls: Guest slider & Add-ons */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Guest Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-wider text-ivory font-bold">
                        Expected Guests
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-3xl font-extrabold text-gold drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                          {guestCount}
                        </span>
                        <span className="text-xs text-ivory/70 font-semibold">Guests</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="25"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-gold h-2.5 bg-black/45 border border-white/10 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-ivory/60 font-medium">
                      <span>100 (Intimate)</span>
                      <span>350 (Standard Muhurtham)</span>
                      <span>1,000 (Grand)</span>
                      <span>2,000+ (Mega)</span>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {[150, 350, 600, 1000, 1500].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setGuestCount(preset)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            guestCount === preset
                              ? 'bg-gold text-charcoal font-bold shadow-md'
                              : 'bg-black/35 hover:bg-black/55 text-ivory/80 border border-white/10'
                          }`}
                        >
                          {preset} Pax
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Addon Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs uppercase tracking-wider text-ivory font-bold">
                      Add-on Enhancements & Live Stalls
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                          addonBiryaniUpgrade
                            ? 'bg-maroon/60 border-gold shadow-lg'
                            : 'bg-black/35 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addonBiryaniUpgrade}
                          onChange={(e) => setAddonBiryaniUpgrade(e.target.checked)}
                          className="mt-0.5 rounded text-gold focus:ring-gold border-white/30"
                        />
                        <div>
                          <span className="font-semibold text-ivory block leading-snug">
                            Mutton Dum Biryani Upgrade
                          </span>
                          <span className="text-gold text-[10px] font-bold">+₹90 / person</span>
                        </div>
                      </label>

                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                          addonLiveStarters
                            ? 'bg-maroon/60 border-gold shadow-lg'
                            : 'bg-black/35 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addonLiveStarters}
                          onChange={(e) => setAddonLiveStarters(e.target.checked)}
                          className="mt-0.5 rounded text-gold focus:ring-gold border-white/30"
                        />
                        <div>
                          <span className="font-semibold text-ivory block leading-snug">
                            Live Loose Prawns Counter
                          </span>
                          <span className="text-gold text-[10px] font-bold">+₹60 / person</span>
                        </div>
                      </label>

                      <label
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                          addonLiveDessert
                            ? 'bg-maroon/60 border-gold shadow-lg'
                            : 'bg-black/35 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addonLiveDessert}
                          onChange={(e) => setAddonLiveDessert(e.target.checked)}
                          className="mt-0.5 rounded text-gold focus:ring-gold border-white/30"
                        />
                        <div>
                          <span className="font-semibold text-ivory block leading-snug">
                            Live Jalebi & Rabri Stalls
                          </span>
                          <span className="text-gold text-[10px] font-bold">+₹40 / person</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Result Card: Dynamic Output Number with Elastic Pulse */}
                <div className="lg:col-span-5 bg-black/55 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative">
                  <span className="text-[11px] uppercase tracking-widest text-gold font-bold block">
                    Estimated Celebration Total
                  </span>

                  {/* Elastic Pulse Output Number */}
                  <div className="py-2 flex items-center justify-center">
                    <div
                      className={`inline-block transition-transform duration-300 ${
                        isPulsing ? 'animate-elastic-pulse scale-110 text-gold-light' : 'scale-100 text-gold'
                      }`}
                    >
                      <span className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_14px_rgba(212,175,55,0.4)]">
                        {formatINR(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-black/45 rounded-xl border border-white/10 text-xs text-ivory/90 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-ivory/70">Rate per Plate:</span>
                      <strong className="text-ivory font-bold">₹{perPersonTotal} / pax</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory/70">Total Catering Guests:</span>
                      <strong className="text-ivory font-bold">{guestCount} Guests</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-ivory/60 italic">
                    * Final quote subject to venue setup requirements & menu customization.
                  </p>

                  <div className="pt-2">
                    <Button
                      href={`/booking?eventType=Wedding&guests=${guestCount}&budget=${grandTotal}`}
                      variant="primary"
                      size="lg"
                      className="w-full shadow-xl shadow-maroon/40 rounded-xl"
                      icon={<ArrowRight className="w-4 h-4 text-gold" />}
                    >
                      Lock This Quotation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Venky Yadav Cafe Menu (Korramenugunta Quick Service) */}
        {activeTab === 'cafe' && (
          <div
            className={`space-y-10 ${
              direction === 'right' ? 'animate-slide-fade-left' : 'animate-slide-fade-right'
            }`}
          >
            <div className="p-4 bg-white/[0.05] backdrop-blur-[14px] border border-marigold/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-lg">
              <div className="flex items-center space-x-3 text-ivory">
                <Coffee className="w-5 h-5 text-marigold flex-shrink-0" />
                <span>
                  <strong>Korramenugunta Quick-Service Counter:</strong> Dine-in, takeaway, and late-night food culture on Renigunta Road.
                </span>
              </div>
              <a
                href="tel:+918328129450"
                className="text-marigold hover:text-marigold-hover font-bold inline-flex items-center space-x-1 whitespace-nowrap bg-marigold/10 px-3.5 py-1.5 rounded-full border border-marigold/30"
              >
                <span>Call Cafe: +91 83281 29450</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Cafe Categories Grid with Frosted Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAFE_QUICK_SERVICE.map((col, colIdx) => (
                <div
                  key={col.category}
                  style={{ animationDelay: `${colIdx * 100}ms` }}
                  className="bg-white/[0.05] backdrop-blur-[14px] border border-white/[0.12] hover:backdrop-blur-[20px] hover:border-marigold/50 rounded-2xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.14)] flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] animate-stagger-in"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2.5">
                        <span className="w-8 h-8 rounded-lg bg-marigold/15 border border-marigold/40 flex items-center justify-center text-marigold shadow-sm">
                          <col.icon className="w-4 h-4 text-marigold" />
                        </span>
                        <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-marigold transition-colors">
                          {col.category}
                        </h3>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-marigold bg-marigold/15 px-2 py-0.5 rounded-full border border-marigold/30">
                        {col.badge}
                      </span>
                    </div>

                    {/* PROMINENT CIRCULAR DISH PLATE */}
                    <div className="py-2 flex flex-col items-center justify-center">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-br from-marigold/60 via-wood-dark to-charcoal-900 border-2 border-marigold/70 shadow-[0_12px_28px_rgba(0,0,0,0.85)] group-hover:border-marigold group-hover:scale-105 transition-all duration-500">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-charcoal-900">
                          <Image
                            src={col.featuredImage}
                            alt={col.featuredDish}
                            fill
                            sizes="128px"
                            className="object-cover object-center filter-none group-hover:scale-110 transition-transform duration-700 ease-out"
                            style={{ opacity: 1, filter: 'none' }}
                          />
                          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none shadow-inner" />
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-marigold font-semibold mt-2.5 text-center line-clamp-1">
                        {col.featuredDish}
                      </span>
                    </div>

                    {/* Dish Items */}
                    <div className="space-y-2.5">
                      {col.items.map((item) => (
                        <div
                          key={item.name}
                          className="p-3 bg-black/35 backdrop-blur-sm rounded-xl border border-white/[0.08] group-hover:border-white/[0.16] hover:border-marigold/40 hover:bg-black/50 transition-all"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-marigold flex-shrink-0" />
                            <h4 className="text-xs font-semibold text-ivory leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-ivory/70 mt-1 pl-3.5 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-marigold font-semibold">
                    <span>Available Daily at Korramenugunta</span>
                    <Sparkles className="w-3.5 h-3.5 text-marigold" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button href="/cafe" variant="cafe" size="md">
                View Full Cafe Teaser & Directions
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
