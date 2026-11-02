'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit3,
  UploadCloud,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUp,
  ArrowDown,
  X,
  AlertCircle,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface GalleryAsset {
  id: string;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string;
  thumbnailUrl: string | null;
  altText: string;
  displayOrder: number;
  published: boolean;
  source: string;
  usagePermissionStatus: string;
  createdAt: string;
}

const CATEGORIES = [
  { value: 'WEDDINGS', label: 'Weddings & Muhurtham' },
  { value: 'OUTDOOR_COOKING', label: 'Firewood & Dum Cooking' },
  { value: 'BUFFETS', label: 'Buffet Setups' },
  { value: 'SIGNATURE_DISHES', label: 'Signature Dishes' },
  { value: 'BEHIND_THE_SCENES', label: 'Behind the Scenes & Cafe' },
];

export default function AdminGalleryPage() {
  const [assets, setAssets] = useState<GalleryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<GalleryAsset | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('WEDDINGS');
  const [formDescription, setFormDescription] = useState('');
  const [formAltText, setFormAltText] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formPublished, setFormPublished] = useState(true);
  const [formDisplayOrder, setFormDisplayOrder] = useState<number>(0);

  // File Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (data.success) {
        setAssets(data.assets || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openAddModal = () => {
    setEditingAsset(null);
    setFormTitle('');
    setFormCategory('WEDDINGS');
    setFormDescription('');
    setFormAltText('');
    setFormImageUrl('');
    setFormPublished(true);
    setFormDisplayOrder(assets.length > 0 ? Math.max(...assets.map((a) => a.displayOrder)) + 1 : 0);
    setUploadError(null);
    setUploadSuccess(null);
    setModalOpen(true);
  };

  const openEditModal = (asset: GalleryAsset) => {
    setEditingAsset(asset);
    setFormTitle(asset.title);
    setFormCategory(asset.category);
    setFormDescription(asset.description || '');
    setFormAltText(asset.altText || asset.title);
    setFormImageUrl(asset.imageUrl);
    setFormPublished(asset.published);
    setFormDisplayOrder(asset.displayOrder || 0);
    setUploadError(null);
    setUploadSuccess(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingAsset(null);
    setUploadError(null);
    setUploadSuccess(null);
  };

  // Handle local device image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'gallery');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Failed to upload photo.');
      } else {
        setFormImageUrl(data.url);
        setUploadSuccess(`Uploaded successfully: ${file.name}`);
        if (!formTitle) {
          // Auto-derive a friendly title from filename if not yet typed
          const derived = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
          setFormTitle(derived);
        }
      }
    } catch (err: any) {
      setUploadError(err.message || 'Network error during upload.');
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formImageUrl) {
      setUploadError('Please select or upload an image first.');
      return;
    }

    try {
      setLoading(true);
      if (editingAsset) {
        // Update
        const res = await fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingAsset.id,
            title: formTitle,
            category: formCategory,
            description: formDescription,
            altText: formAltText || formTitle,
            imageUrl: formImageUrl,
            published: formPublished,
            displayOrder: formDisplayOrder,
          }),
        });
        const data = await res.json();
        if (data.success) {
          closeModal();
          fetchGallery();
        } else {
          setUploadError(data.error || 'Failed to update asset.');
        }
      } else {
        // Create
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formTitle,
            category: formCategory,
            description: formDescription,
            altText: formAltText || formTitle,
            imageUrl: formImageUrl,
            published: formPublished,
            displayOrder: formDisplayOrder,
          }),
        });
        const data = await res.json();
        if (data.success) {
          closeModal();
          fetchGallery();
        } else {
          setUploadError(data.error || 'Failed to create asset.');
        }
      }
    } catch (err: any) {
      setUploadError(err.message || 'Operation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (asset: GalleryAsset) => {
    try {
      const newStatus = !asset.published;
      const res = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: asset.id,
          published: newStatus,
        }),
      });
      if (res.ok) {
        setAssets((prev) =>
          prev.map((a) => (a.id === asset.id ? { ...a, published: newStatus } : a))
        );
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this photograph from the gallery?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete asset:', err);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= assets.length) return;

    const current = assets[index];
    const target = assets[targetIndex];

    const currentOrder = current.displayOrder;
    const targetOrder = target.displayOrder;

    // Swap orders
    try {
      await Promise.all([
        fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: current.id, displayOrder: targetOrder }),
        }),
        fetch('/api/admin/gallery', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: target.id, displayOrder: currentOrder }),
        }),
      ]);
      fetchGallery();
    } catch (err) {
      console.error('Failed to reorder:', err);
    }
  };

  const filteredAssets = assets.filter((asset) => {
    if (statusFilter === 'PUBLISHED') return asset.published;
    if (statusFilter === 'DRAFT') return !asset.published;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Media & Portfolio
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
            Gallery Management ({assets.length})
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Upload authentic photos from your device, edit captions, and control public visibility.
          </p>
        </div>

        {/* Clearly Visible + Add Photo Button */}
        <Button
          type="button"
          onClick={openAddModal}
          variant="gold"
          size="md"
          className="shadow-lg shadow-gold/20"
          icon={<Plus className="w-5 h-5 text-charcoal stroke-[2.5]" />}
        >
          Add Photo
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
        <button
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all border ${
            statusFilter === 'ALL'
              ? 'bg-gold text-charcoal border-gold'
              : 'bg-charcoal-700/60 text-ivory/70 border-white/10 hover:text-ivory'
          }`}
        >
          All Photos ({assets.length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('PUBLISHED')}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all border ${
            statusFilter === 'PUBLISHED'
              ? 'bg-emerald-600 text-ivory border-emerald-500'
              : 'bg-charcoal-700/60 text-ivory/70 border-white/10 hover:text-ivory'
          }`}
        >
          Published Live ({assets.filter((a) => a.published).length})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('DRAFT')}
          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all border ${
            statusFilter === 'DRAFT'
              ? 'bg-amber-600 text-ivory border-amber-500'
              : 'bg-charcoal-700/60 text-ivory/70 border-white/10 hover:text-ivory'
          }`}
        >
          Draft / Archived ({assets.filter((a) => !a.published).length})
        </button>
      </div>

      {/* Gallery Cards Grid */}
      {loading && assets.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-ivory/60">Loading gallery records...</p>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/15 rounded-xl bg-charcoal-800/40 p-8">
          <Camera className="w-12 h-12 text-gold/40 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-ivory">No Photos Found</h3>
          <p className="text-xs text-ivory/60 max-w-md mx-auto mt-1 mb-5">
            {statusFilter === 'ALL'
              ? 'You have not uploaded any photos to the gallery yet. Click the "+ Add Photo" button above to upload from your computer or phone.'
              : `No photos currently in ${statusFilter.toLowerCase()} status.`}
          </p>
          <Button
            type="button"
            onClick={openAddModal}
            variant="gold"
            size="sm"
            icon={<Plus className="w-4 h-4 text-charcoal" />}
          >
            Upload First Photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset, index) => (
            <div
              key={asset.id}
              className="bg-charcoal-800 border border-gold/25 hover:border-gold rounded-lg overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300"
            >
              {/* Photo Thumbnail */}
              <div className="relative h-48 w-full bg-black">
                <Image
                  src={asset.imageUrl}
                  alt={asset.altText || asset.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm border ${
                      asset.published
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                        : 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                    }`}
                  >
                    {asset.published ? 'Live on Site' : 'Draft'}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-charcoal-900/90 text-gold px-2 py-0.5 rounded-sm border border-gold/30">
                    {asset.category.replace('_', ' ')}
                  </span>
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute top-3 right-3 flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(asset)}
                    title={asset.published ? 'Unpublish from public gallery' : 'Publish live'}
                    className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
                      asset.published
                        ? 'bg-emerald-900/80 hover:bg-emerald-700 text-emerald-200'
                        : 'bg-amber-900/80 hover:bg-amber-700 text-amber-200'
                    }`}
                  >
                    {asset.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-ivory line-clamp-1">
                    {asset.title}
                  </h3>
                  {asset.description ? (
                    <p className="text-xs text-ivory/70 line-clamp-2 mt-1">
                      {asset.description}
                    </p>
                  ) : (
                    <p className="text-xs text-ivory/40 italic mt-1">No caption provided.</p>
                  )}
                </div>

                {/* Card Controls */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  {/* Order Reorder */}
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveOrder(index, 'UP')}
                      title="Move Up"
                      className="p-1 rounded bg-charcoal-700 hover:bg-charcoal-600 disabled:opacity-30 text-ivory/80"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === filteredAssets.length - 1}
                      onClick={() => handleMoveOrder(index, 'DOWN')}
                      title="Move Down"
                      className="p-1 rounded bg-charcoal-700 hover:bg-charcoal-600 disabled:opacity-30 text-ivory/80"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-ivory/50 ml-1">#{asset.displayOrder}</span>
                  </div>

                  {/* Edit and Delete */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(asset)}
                      className="inline-flex items-center space-x-1 text-xs text-gold hover:text-gold-light font-medium px-2 py-1 rounded bg-gold/10 hover:bg-gold/20 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(asset.id)}
                      className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                      title="Delete photograph"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-charcoal-800 border-2 border-gold/70 rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-ivory/60 hover:text-gold p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                {editingAsset ? 'Edit Photo Details' : 'Upload & Publish Photo'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-ivory mt-0.5">
                {editingAsset ? `Edit "${editingAsset.title}"` : 'Add New Gallery Photo'}
              </h2>
            </div>

            {uploadError && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-lg text-xs text-red-200 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-200 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Photo Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-2">
                  Select Photo File from Device *
                </label>

                {/* File Drop / Select Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    formImageUrl
                      ? 'border-gold/60 bg-charcoal-900/60'
                      : 'border-white/20 hover:border-gold/50 bg-charcoal-700/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {formImageUrl ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                      <div className="relative w-28 h-24 rounded-lg overflow-hidden border border-gold/50 flex-shrink-0 bg-black">
                        <Image
                          src={formImageUrl}
                          alt="Uploaded Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Image Selected & Ready</span>
                        </span>
                        <p className="text-[11px] text-ivory/70 break-all font-mono">
                          {formImageUrl}
                        </p>
                        <p className="text-[11px] text-gold hover:underline">
                          Click to select a different photo
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
                        {uploading ? (
                          <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <UploadCloud className="w-6 h-6" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-ivory">
                        {uploading ? 'Uploading to server...' : 'Click to choose photo from computer or phone'}
                      </p>
                      <p className="text-[10px] text-ivory/50">
                        Supports JPG, PNG, WebP up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Optional Manual URL Fallback */}
                <div className="mt-2 text-right">
                  <details className="text-[11px] text-ivory/50 inline-block text-left">
                    <summary className="cursor-pointer hover:text-gold">Or enter manual image path</summary>
                    <input
                      type="text"
                      placeholder="/uploads/gallery/... or https://..."
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="mt-1 w-full bg-charcoal-900 border border-white/15 px-3 py-1.5 text-xs text-ivory rounded"
                    />
                  </details>
                </div>
              </div>

              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Wedding Dum Biryani Handi"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Gallery Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Caption / Description */}
              <div>
                <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                  Optional Caption / Story
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the banquet scale, firewood setup, or special celebration details..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2 transition-all resize-none"
                />
              </div>

              {/* Alt Text & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Accessibility Alt Text
                  </label>
                  <input
                    type="text"
                    placeholder="Defaults to photo title"
                    value={formAltText}
                    onChange={(e) => setFormAltText(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2 transition-all"
                  />
                </div>
              </div>

              {/* Publish Live Toggle */}
              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="formPublished"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-gold focus:ring-gold bg-charcoal-900 border-white/20"
                />
                <label htmlFor="formPublished" className="text-xs text-ivory font-medium cursor-pointer">
                  Publish live immediately on the public website gallery
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">
                <Button
                  type="button"
                  onClick={closeModal}
                  variant="outline"
                  size="md"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="md"
                  disabled={uploading || !formImageUrl}
                  icon={<CheckCircle2 className="w-4 h-4 text-charcoal" />}
                >
                  {editingAsset ? 'Save Changes' : 'Publish Photograph'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
