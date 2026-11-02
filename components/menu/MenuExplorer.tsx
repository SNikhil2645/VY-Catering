'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Flame, Utensils, Download, Check, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DietaryIndicator from '@/components/ui/DietaryIndicator';
import SpiceIndicator from '@/components/ui/SpiceIndicator';
import { formatINR } from '@/lib/utils/formatters';

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number | null;
  dietaryType: string;
  imageUrl: string | null;
  spiceLevel: number | null;
  featured: boolean;
  businessType: string;
}

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  items: MenuItem[];
}

export default function MenuExplorer() {
  const shouldReduceMotion = useReducedMotion();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDiet, setSelectedDiet] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const res = await fetch('/api/menu?type=ALL');
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error('Failed to load menu:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Filter items
  const allItems: (MenuItem & { categoryName: string })[] = [];
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      allItems.push({ ...item, categoryName: cat.name });
    });
  });

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'ALL' || item.categoryName === selectedCategory;
    const matchesDiet =
      selectedDiet === 'ALL' || item.dietaryType === selectedDiet;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDiet && matchesSearch;
  });

  const handlePrintMenu = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* Search & Filter Toolbar */}
      <div className="bg-white/[0.06] backdrop-blur-[16px] border border-white/[0.14] rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Mutton Biryani, Prawns, Gutti Vankaya)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold focus:ring-1 focus:ring-gold text-ivory placeholder-ivory/40 text-sm rounded-sm pl-10 pr-4 py-2.5 transition-all"
            />
          </div>

          {/* Diet Toggles & Print CTA */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            <div className="inline-flex rounded-sm bg-charcoal-700 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setSelectedDiet('ALL')}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedDiet === 'ALL' ? 'bg-maroon text-gold' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                All Diets
              </button>
              <button
                type="button"
                onClick={() => setSelectedDiet('VEG')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedDiet === 'VEG' ? 'bg-emerald-900 text-emerald-200 border border-emerald-600/50' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Vegetarian</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDiet('NON_VEG')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedDiet === 'NON_VEG' ? 'bg-red-950 text-red-200 border border-red-700/50' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Non-Veg</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrintMenu}
              className="inline-flex items-center space-x-1.5 px-3 py-2 border border-gold/40 text-gold hover:bg-gold/10 rounded-sm text-xs font-medium transition-colors"
              title="Print or Save Menu"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save / Print</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-white/5">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedCategory === 'ALL'
                ? 'bg-gold text-charcoal border-gold font-bold'
                : 'bg-charcoal-700/60 text-ivory/80 border-white/10 hover:border-gold/30'
            }`}
          >
            All Categories ({allItems.length})
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-gold text-charcoal border-gold font-bold'
                    : 'bg-charcoal-700/60 text-ivory/80 border-white/10 hover:border-gold/30'
                }`}
              >
                {cat.name} ({cat.items.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Dishes Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-ivory/60">Loading authentic menu items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-charcoal-800/40 border border-white/10 rounded-sm">
          <Utensils className="w-10 h-10 text-gold/40 mx-auto mb-3" />
          <h4 className="font-serif text-lg font-semibold text-ivory">No matching dishes found</h4>
          <p className="text-xs text-ivory/60 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your dietary filters.
          </p>
          <Button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedDiet('ALL');
              setSearchQuery('');
            }}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <motion.div
          layout
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.07,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              layout
              variants={{
                hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              key={item.id}
              className="bg-white/[0.05] backdrop-blur-[14px] border border-white/[0.12] hover:backdrop-blur-[20px] hover:border-white/[0.28] rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.22)]"
            >
              {/* Dish Image */}
              <div className="relative h-52 w-full overflow-hidden bg-charcoal-900">
                {item.imageUrl && !failedImages[item.id] ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [item.id]: true }));
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gold/30 bg-charcoal-900">
                    <Utensils className="w-10 h-10 mb-2" />
                    <span className="text-[10px] text-ivory/40 uppercase tracking-widest font-serif">
                      Authentic Dish
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Professional Dietary Indicator */}
                <div className="absolute top-3 left-3 z-10">
                  <DietaryIndicator type={item.dietaryType} />
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-charcoal-900/80 backdrop-blur-sm text-gold px-2.5 py-1 rounded-sm border border-gold/30">
                    {item.categoryName}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <SpiceIndicator level={item.spiceLevel} />

                  <div className="text-right">
                    <span className="text-xs font-semibold text-gold block">
                      {formatINR(item.price)}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-ivory/40">
                      {item.price ? 'Per Portion (Cafe)' : 'Event Quotation'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Enquiry Action */}
              <div className="px-5 pb-5">
                <Button
                  href={`/booking?eventType=Wedding&dish=${encodeURIComponent(item.name)}`}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  Enquire Dish for Feast
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
