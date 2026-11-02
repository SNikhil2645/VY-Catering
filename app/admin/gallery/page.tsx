'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminGalleryPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAsset, setNewAsset] = useState({
    title: '',
    description: '',
    category: 'WEDDINGS',
    imageUrl: '',
    altText: '',
    usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.success) {
        setAssets(data.assets);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewAsset({
          title: '',
          description: '',
          category: 'WEDDINGS',
          imageUrl: '',
          altText: '',
          usagePermissionStatus: 'VERIFIED_PLACEHOLDER',
        });
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    if (!confirm('Are you sure you want to remove this media asset?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Media Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
            Gallery Assets ({assets.length})
          </h1>
        </div>

        <Button
          type="button"
          onClick={() => setShowAddModal(true)}
          variant="gold"
          size="sm"
          icon={<Plus className="w-4 h-4 text-charcoal" />}
        >
          Add Photo
        </Button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-charcoal-800 border-2 border-gold rounded-sm p-6 max-w-lg w-full space-y-4">
            <h3 className="font-serif text-xl font-bold text-ivory">Add Gallery Photo</h3>
            <form onSubmit={handleAddAsset} className="space-y-3 text-xs">
              <div>
                <label className="block text-ivory/70 font-semibold mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Kalyana Mandapam Sadhya Service"
                  value={newAsset.title}
                  onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                  className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                />
              </div>

              <div>
                <label className="block text-ivory/70 font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newAsset.imageUrl}
                  onChange={(e) => setNewAsset({ ...newAsset, imageUrl: e.target.value })}
                  className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory/70 font-semibold mb-1">Category</label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                  >
                    <option value="WEDDINGS">Weddings</option>
                    <option value="OUTDOOR_COOKING">Firewood Cooking</option>
                    <option value="BUFFETS">Buffets</option>
                    <option value="SIGNATURE_DISHES">Signature Dishes</option>
                    <option value="BEHIND_THE_SCENES">Behind the Scenes & Cafe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/70 font-semibold mb-1">Permission</label>
                  <select
                    value={newAsset.usagePermissionStatus}
                    onChange={(e) => setNewAsset({ ...newAsset, usagePermissionStatus: e.target.value })}
                    className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                  >
                    <option value="VERIFIED_PLACEHOLDER">Verified Placeholder</option>
                    <option value="OWNER_APPROVED">Owner Approved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-ivory/70 font-semibold mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  placeholder="Event description..."
                  value={newAsset.description}
                  onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                  className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-white/20 text-ivory rounded-sm"
                >
                  Cancel
                </button>
                <Button type="submit" variant="gold" size="sm">
                  Save Photo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-gold text-xs">Loading gallery media...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-charcoal-800 border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-charcoal-900">
                <Image
                  src={asset.imageUrl}
                  alt={asset.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="p-3 space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-gold font-bold">
                  {asset.category}
                </span>
                <p className="text-xs font-semibold text-ivory truncate">{asset.title}</p>
                <span className="text-[10px] text-ivory/50 block">
                  {asset.usagePermissionStatus}
                </span>
              </div>
              <div className="p-3 pt-0 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => handleDeleteAsset(asset.id)}
                  className="text-red-400 hover:text-red-300 text-xs flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
