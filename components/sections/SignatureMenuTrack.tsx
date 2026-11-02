'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UtensilsCrossed,
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

// Tab 1: Event Catering Spreads
const EVENT_CATERING_SPREADS = [
  {
    category: 'Rice & Mains',
    icon: '🍚',
    items: [
      { name: 'Chicken Biryani', desc: 'Aged basmati layered with tender spiced chicken over acacia firewood dum' },
      { name: 'Bagara Rice', desc: 'Aromatic seasoned rice tempered with whole spices, mint, and fried onions' },
      { name: 'Kushk Rice', desc: 'Rich, non-spicy flavored wedding biryani rice simmered in bone broth' },
      { name: 'Steamed Rice', desc: 'Pristine Sona Masoori boiled hot for traditional Andhra dal and rasam' },
    ],
  },
  {
    category: 'Gravies & Fries',
    icon: '🍗',
    items: [
      { name: 'Mutton Curry', desc: 'Rayalaseema style tender baby mutton slow-braised with roasted poppy & coconut' },
      { name: 'Chicken Curry', desc: 'Rich country style chicken gravy simmered in fresh coriander and onion paste' },
      { name: 'Chicken Roast', desc: 'Deeply caramelized succulent roast fry tossed in hand-ground black pepper' },
      { name: 'Regional Fish Specials', desc: 'Fresh river catch simmered with tender bendakaya in coastal tamarind reduction' },
    ],
  },
  {
    category: 'Veg & Accompaniments',
    icon: '🥗',
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
    icon: '🍨',
    items: [
      { name: 'Bread Halwa', desc: 'Crisp fried bread simmered in rich saffron milk, khoya, and desi ghee cashews' },
      { name: 'Gulab Jamun', desc: 'Warm melt-in-mouth milk dumplings steeped in fragrant cardamom sugar syrup' },
      { name: 'Kaja Jamun', desc: 'Crispy layered Kakinada style sweet dumpling soaked in rich nectar' },
      { name: 'Vanilla Ice Cream', desc: 'Chilled creamy vanilla scoop paired as the ultimate finale to hot biryani' },
    ],
  },
];

// Tab 2: Venky Yadav Cafe Menu (Korramenugunta Quick Service)
const CAFE_QUICK_SERVICE = [
  {
    category: 'Fried Chicken Specials',
    icon: '🍗',
    badge: 'Quick Service',
    items: [
      { name: 'Fried Chicken Legs', desc: 'Crisp double-crumbed juicy drumsticks dusted with house peri peri seasoning' },
      { name: 'Crispy Wings', desc: 'Golden batter wings tossed in smokey garlic BBQ or fiery Andhra pepper' },
      { name: 'Chicken Lollipops', desc: 'Classic spiced chicken drumettes flash-fried with fresh spring onions' },
    ],
  },
  {
    category: '9-Inch Handcrafted Pizzas',
    icon: '🍕',
    badge: 'Signature Fusion',
    items: [
      { name: 'Unique Gongura Chicken Pizza', desc: 'Tangy Andhra gongura leaf base, spiced chicken, mozzarella, charred crust' },
      { name: 'Chicken Tikka Pizza', desc: 'Clay-oven smoked chicken chunks, bell peppers, melted cheese blend' },
      { name: 'Peri Peri Chicken Pizza', desc: 'Spicy peri peri sauce, shredded chicken, jalapenos, and oregano herbs' },
      { name: 'Gongura Veg Special Pizza', desc: 'Tangy gongura paste, golden corn, capsicum, paneer, and mozzarella' },
    ],
  },
  {
    category: 'Tandoori Burgers & Sandwiches',
    icon: '🍔',
    badge: 'Chef Favorite',
    items: [
      { name: 'Tandoori Chicken Burger', desc: 'Charred tandoori spiced patty, mint mayonnaise, lettuce, toasted brioche' },
      { name: 'Grilled Chicken Club Sandwich', desc: 'Triple-decker butter-toasted sandwich with egg, chicken shreds, and cheese' },
      { name: '4 AM Maska Bun', desc: 'Fresh soft pav generously spread with chilled Amul butter & cardamom chai' },
    ],
  },
  {
    category: 'Momos & Loaded Fries',
    icon: '🍟',
    badge: 'Youth Choice',
    items: [
      { name: 'Steamed & Fried Momos', desc: 'Thin-wrapper chicken and veg dumplings served with spicy Schezwan dip' },
      { name: 'Peri Peri Loaded Fries', desc: 'Crispy potato fries smothered in liquid cheese, peri peri powder, and jalapenos' },
      { name: 'Chicken Keema Loaded Fries', desc: 'Crisp French fries topped with spiced minced chicken and cheddar cheese' },
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

        {/* Tab Switcher Controls */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-charcoal-800 p-1.5 rounded-full border border-gold/40 shadow-2xl flex items-center space-x-2">
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

        {/* Tab 1: Event Catering Spreads with Lateral Slide-and-Fade Transition */}
        {activeTab === 'catering' && (
          <div
            className={`space-y-12 ${
              direction === 'right' ? 'animate-slide-fade-left' : 'animate-slide-fade-right'
            }`}
          >
            {/* Catering Spreads Grid with Staggered Entry Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EVENT_CATERING_SPREADS.map((col, colIdx) => (
                <div
                  key={col.category}
                  style={{ animationDelay: `${colIdx * 100}ms` }}
                  className="bg-charcoal-800/80 border border-gold/30 hover:border-gold rounded-2xl p-6 shadow-xl flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1.5 animate-stagger-in"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{col.icon}</span>
                        <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                          {col.category}
                        </h3>
                      </div>
                      <span className="text-[10px] text-ivory/40 uppercase tracking-widest">
                        0{colIdx + 1}
                      </span>
                    </div>

                    {/* Staggered Item List */}
                    <div className="space-y-3">
                      {col.items.map((item, itemIdx) => (
                        <div
                          key={item.name}
                          style={{ animationDelay: `${colIdx * 100 + itemIdx * 50}ms` }}
                          className="p-3 bg-charcoal-700/50 rounded-xl border border-white/5 hover:border-gold/30 hover:bg-charcoal-700 transition-all animate-stagger-in"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                            <h4 className="text-xs font-semibold text-ivory leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-ivory/60 mt-1 pl-3.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gold/70">
                    <span>100% Authentic Preparation</span>
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                </div>
              ))}
            </div>

            {/* DYNAMIC BUDGET CALCULATOR COMPONENT */}
            <div className="bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-wood-dark border-2 border-gold/40 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-wider">
                    <Calculator className="w-4 h-4 text-gold" />
                    <span>Dynamic Event Budget Calculator</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                    Estimate Your Celebration Feast
                  </h3>
                  <p className="text-xs text-ivory/60">
                    Calculated using our transparent base rate factor of{' '}
                    <strong className="text-gold font-bold">₹{baseRate} / person</strong> including full banquet spread & service.
                  </p>
                </div>

                <div className="flex items-center space-x-2 bg-charcoal-700/80 border border-gold/30 px-4 py-2 rounded-xl text-xs text-gold font-semibold">
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
                      <label className="text-xs uppercase tracking-wider text-ivory/80 font-semibold">
                        Expected Guests
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-2xl font-bold text-gold">
                          {guestCount}
                        </span>
                        <span className="text-xs text-ivory/60">Guests</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="25"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-gold h-2 bg-charcoal-700 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-ivory/40">
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
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                            guestCount === preset
                              ? 'bg-gold text-charcoal font-bold'
                              : 'bg-charcoal-700 text-ivory/70 hover:bg-charcoal-600'
                          }`}
                        >
                          {preset} Pax
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Addon Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs uppercase tracking-wider text-ivory/80 font-semibold">
                      Add-on Enhancements & Live Stalls
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <label
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                          addonBiryaniUpgrade
                            ? 'bg-maroon/30 border-gold shadow-md'
                            : 'bg-charcoal-700/50 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addonBiryaniUpgrade}
                          onChange={(e) => setAddonBiryaniUpgrade(e.target.checked)}
                          className="mt-0.5 rounded text-gold focus:ring-gold border-white/20"
                        />
                        <div>
                          <span className="font-semibold text-ivory block leading-snug">
                            Mutton Dum Biryani Upgrade
                          </span>
                          <span className="text-gold text-[10px] font-bold">+₹90 / person</span>
                        </div>
                      </label>

                      <label
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                          addonLiveStarters
                            ? 'bg-maroon/30 border-gold shadow-md'
                            : 'bg-charcoal-700/50 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addonLiveStarters}
                          onChange={(e) => setAddonLiveStarters(e.target.checked)}
                          className="mt-0.5 rounded text-gold focus:ring-gold border-white/20"
                        />
                        <div>
                          <span className="font-semibold text-ivory block leading-snug">
                            Live Loose Prawns Counter
                          </span>
                          <span className="text-gold text-[10px] font-bold">+₹60 / person</span>
                        </div>
                      </label>

                      <label
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                          addonLiveDessert
                            ? 'bg-maroon/30 border-gold shadow-md'
                            : 'bg-charcoal-700/50 border-white/10 hover:border-gold/30'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addonLiveDessert}
                          onChange={(e) => setAddonLiveDessert(e.target.checked)}
                          className="mt-0.5 rounded text-gold focus:ring-gold border-white/20"
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
                <div className="lg:col-span-5 bg-charcoal-900 border border-gold/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold block">
                    Estimated Celebration Total
                  </span>

                  {/* Elastic Pulse Output Number */}
                  <div className="py-2 flex items-center justify-center">
                    <div
                      className={`inline-block transition-transform duration-300 ${
                        isPulsing ? 'animate-elastic-pulse scale-110 text-gold-light' : 'scale-100 text-gold'
                      }`}
                    >
                      <span className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {formatINR(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-charcoal-800 rounded-xl border border-white/5 text-xs text-ivory/70 space-y-1">
                    <div className="flex justify-between">
                      <span>Rate per Plate:</span>
                      <strong className="text-ivory font-semibold">₹{perPersonTotal} / pax</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Catering Guests:</span>
                      <strong className="text-ivory font-semibold">{guestCount} Guests</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-ivory/50 italic">
                    * Final quote subject to venue setup requirements & menu customization.
                  </p>

                  <div className="pt-2">
                    <Button
                      href={`/booking?eventType=Wedding&guests=${guestCount}&budget=${grandTotal}`}
                      variant="primary"
                      size="lg"
                      className="w-full shadow-xl shadow-maroon/30"
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
            <div className="p-4 bg-marigold/10 border border-marigold/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3 text-ivory">
                <Coffee className="w-5 h-5 text-marigold flex-shrink-0" />
                <span>
                  <strong>Korramenugunta Quick-Service Counter:</strong> Dine-in, takeaway, and late-night food culture on Renigunta Road.
                </span>
              </div>
              <a
                href="tel:+918328129450"
                className="text-marigold hover:text-marigold-hover font-bold inline-flex items-center space-x-1 whitespace-nowrap"
              >
                <span>Call Cafe: +91 83281 29450</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Cafe Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAFE_QUICK_SERVICE.map((col, colIdx) => (
                <div
                  key={col.category}
                  style={{ animationDelay: `${colIdx * 100}ms` }}
                  className="bg-charcoal-800/80 border border-marigold/30 hover:border-marigold rounded-2xl p-6 shadow-xl flex flex-col justify-between group transition-all duration-500 hover:-translate-y-1.5 animate-stagger-in"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{col.icon}</span>
                        <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-marigold transition-colors">
                          {col.category}
                        </h3>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-marigold bg-marigold/10 px-2 py-0.5 rounded-full border border-marigold/30">
                        {col.badge}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {col.items.map((item, itemIdx) => (
                        <div
                          key={item.name}
                          style={{ animationDelay: `${colIdx * 100 + itemIdx * 50}ms` }}
                          className="p-3 bg-charcoal-700/50 rounded-xl border border-white/5 hover:border-marigold/30 hover:bg-charcoal-700 transition-all animate-stagger-in"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-marigold flex-shrink-0" />
                            <h4 className="text-xs font-semibold text-ivory leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-ivory/60 mt-1 pl-3.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-marigold font-semibold">
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
