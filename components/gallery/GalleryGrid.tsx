'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Eye, ShieldCheck, Sparkles, Camera, ArrowRight, Utensils } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface GalleryAsset {
  id: string;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string;
  altText: string;
  usagePermissionStatus: string;
}

export default function GalleryGrid() {
  const shouldReduceMotion = useReducedMotion();
  const [assets, setAssets] = useState<GalleryAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success) {
          setAssets(data.assets || []);
        }
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = [
    { label: 'All Photos', value: 'ALL' },
    { label: 'Weddings & Muhurtham', value: 'WEDDINGS' },
    { label: 'Firewood & Dum Cooking', value: 'OUTDOOR_COOKING' },
    { label: 'Buffet Setups', value: 'BUFFETS' },
    { label: 'Signature Dishes', value: 'SIGNATURE_DISHES' },
    { label: 'Behind the Scenes & Cafe', value: 'BEHIND_THE_SCENES' },
  ];

  const filteredAssets =
    selectedCategory === 'ALL'
      ? assets
      : assets.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && filteredAssets.length > 0) {
      setLightboxIndex((prev) => ((prev as number) + 1) % filteredAssets.length);
    }
  }, [lightboxIndex, filteredAssets.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && filteredAssets.length > 0) {
      setLightboxIndex((prev) =>
        (prev as number) - 1 < 0 ? filteredAssets.length - 1 : (prev as number) - 1
      );
    }
  }, [lightboxIndex, filteredAssets.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <div className="space-y-8">
      {/* Category Filter Buttons (Only shown if gallery has assets) */}
      {assets.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-maroon text-gold border-gold shadow-md'
                    : 'bg-charcoal-800 text-ivory/70 border-white/10 hover:border-gold/30 hover:text-ivory'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid or Empty State */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-9 h-9 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-ivory/70 font-medium">Curating event photography...</p>
        </div>
      ) : assets.length === 0 ? (
        /* Polished Empty State for Visitors when no photos are published */
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto py-16 px-6 sm:px-12 rounded-2xl bg-gradient-to-b from-charcoal-800/90 via-charcoal-800/60 to-charcoal-900 border border-gold/40 shadow-2xl text-center overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-40 bg-maroon/25 blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-charcoal-900 border border-gold/60 text-gold shadow-xl mb-6">
            <Camera className="w-8 h-8 text-gold" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gold" />
            </span>
          </div>

          <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
            Visual Chronicle in Curation
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-2">
            Archiving Our Celebrations
          </h3>

          <p className="font-telugu text-sm text-gold/80 mb-4 font-medium">
            త్వరలో మా తాజా రాయలసీమ విందుల ఫోటోలు
          </p>

          <p className="text-sm text-ivory/75 max-w-lg mx-auto leading-relaxed mb-8">
            We are curating high-resolution photography from our recent grand wedding banquets, wood-fire dum biryani handis, and traditional sadhyas across Tirupati. Check back shortly to explore our newly published event chronicles.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href="/booking"
              variant="primary"
              size="md"
              className="w-full sm:w-auto shadow-lg shadow-maroon/40"
              icon={<ArrowRight className="w-4 h-4 text-gold" />}
            >
              Plan Your Event Feast
            </Button>
            <Button
              href="/menu"
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
              icon={<Utensils className="w-4 h-4 text-gold" />}
            >
              Explore Our Menu
            </Button>
          </div>
        </motion.div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-16 text-center text-ivory/60 bg-charcoal-800/40 border border-white/10 rounded-sm">
          <Camera className="w-8 h-8 text-gold/40 mx-auto mb-2" />
          <p className="text-sm">No photos in this category yet.</p>
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className="mt-3 text-xs text-gold underline underline-offset-4 hover:text-gold-light"
          >
            View all photographs
          </button>
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
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAssets.map((asset, index) => (
            <motion.div
              layout
              variants={{
                hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              key={asset.id}
              onClick={() => openLightbox(index)}
              className="group relative h-72 sm:h-80 rounded-sm overflow-hidden border border-gold/20 hover:border-gold cursor-pointer transition-all duration-300 hover:shadow-2xl bg-charcoal-900"
            >
              <Image
                src={asset.imageUrl}
                alt={asset.altText || asset.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay with Caption */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-charcoal-900/80 backdrop-blur-sm text-gold px-2.5 py-1 rounded-sm border border-gold/30">
                    {asset.category.replace('_', ' ')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-ivory leading-snug mb-1">
                    {asset.title}
                  </h3>
                  {asset.description && (
                    <p className="text-xs text-ivory/70 line-clamp-2">
                      {asset.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Lightbox Modal with Brass Frame */}
      {lightboxIndex !== null && filteredAssets[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-ivory/80 hover:text-gold p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-gold p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-ivory/80 hover:text-gold p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-4xl w-full bg-charcoal-800 border-2 border-gold rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-black">
              <Image
                src={filteredAssets[lightboxIndex].imageUrl}
                alt={filteredAssets[lightboxIndex].altText || filteredAssets[lightboxIndex].title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-charcoal-900 border-t border-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                  Photo {lightboxIndex + 1} of {filteredAssets.length} •{' '}
                  {filteredAssets[lightboxIndex].category.replace('_', ' ')}
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory mt-0.5">
                  {filteredAssets[lightboxIndex].title}
                </h3>
                {filteredAssets[lightboxIndex].description && (
                  <p className="text-xs text-ivory/70 mt-1">
                    {filteredAssets[lightboxIndex].description}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-ivory/50">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Verified Authentic Photography</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
