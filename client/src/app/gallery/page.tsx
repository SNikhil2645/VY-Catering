import React from 'react';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import KolamDivider from '@/components/layout/KolamDivider';
import { Sparkles, Camera } from 'lucide-react';

export const metadata = {
  title: 'Event & Culinary Gallery | Venky Yadav Caterings Tirupati',
  description:
    'Browse our photography gallery: grand wedding banquets, outdoor woodfire cooking handis, vibrant live counters, and signature Andhra delicacies.',
};

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="py-16 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Chronicle</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-4">
            Event & Culinary Gallery
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Witness the grand scale of our wedding banquets, outdoor firewood cooking setups, and authentic Andhra delicacies. Click any photograph to view in full resolution.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
