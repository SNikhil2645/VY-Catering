import React from 'react';
import MenuExplorer from '@/components/menu/MenuExplorer';
import KolamDivider from '@/components/layout/KolamDivider';
import { Sparkles, Utensils } from 'lucide-react';

export const metadata = {
  title: 'Catering Menu Explorer | Authentic Andhra & Hyderabadi Feasts',
  description:
    'Explore our catering menu. Authentic Hyderabadi mutton dum biryani, crispy loose prawns, gutti vankaya, and pure ghee sweets for wedding and event celebrations in Tirupati.',
};

export default function MenuPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="py-16 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Culinary Collection</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-4">
            Catering Menu Explorer
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Search and filter our traditional Andhra, Hyderabadi dum, coastal seafood, and festive vegetarian specialties. Select any dish to include in your celebration proposal.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>
      </section>

      {/* Interactive Menu Explorer */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuExplorer />
        </div>
      </section>
    </div>
  );
}
