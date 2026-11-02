'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit3,
  Utensils,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Search,
  Flame,
  X,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DietaryIndicator from '@/components/ui/DietaryIndicator';
import SpiceIndicator from '@/components/ui/SpiceIndicator';
import { formatINR } from '@/lib/utils/formatters';

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: { id: string; name: string };
  description: string;
  price: number | null;
  dietaryType: string;
  businessType: string;
  imageUrl: string | null;
  availability: boolean;
  featured: boolean;
  spiceLevel: number | null;
  displayOrder: number;
}

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [businessFilter, setBusinessFilter] = useState<'ALL' | 'CATERING' | 'CAFE'>('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formBusinessType, setFormBusinessType] = useState('CATERING');
  const [formDietaryType, setFormDietaryType] = useState('VEG');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formSpiceLevel, setFormSpiceLevel] = useState<number>(3);
  const [formAvailability, setFormAvailability] = useState(true);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formImageUrl, setFormImageUrl] = useState('');

  // File Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/menu');
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load menu data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategoryId(categories[0]?.id || '');
    setFormBusinessType('CATERING');
    setFormDietaryType('VEG');
    setFormDescription('');
    setFormPrice('');
    setFormSpiceLevel(3);
    setFormAvailability(true);
    setFormFeatured(false);
    setFormImageUrl('');
    setUploadError(null);
    setUploadSuccess(null);
    setModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategoryId(item.categoryId);
    setFormBusinessType(item.businessType || 'CATERING');
    setFormDietaryType(item.dietaryType || 'VEG');
    setFormDescription(item.description || '');
    setFormPrice(item.price !== null && item.price !== undefined ? String(item.price) : '');
    setFormSpiceLevel(item.spiceLevel || 2);
    setFormAvailability(item.availability);
    setFormFeatured(item.featured);
    setFormImageUrl(item.imageUrl || '');
    setUploadError(null);
    setUploadSuccess(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setUploadError(null);
    setUploadSuccess(null);
  };

  // Image Upload handler for dish photos
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'menu');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setUploadError(data.error || 'Failed to upload dish photo.');
      } else {
        setFormImageUrl(data.url);
        setUploadSuccess(`Uploaded: ${file.name}`);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Network error during upload.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      setUploadError('Dish name is required.');
      return;
    }
    if (!formCategoryId) {
      setUploadError('Please select a category.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formName.trim(),
        categoryId: formCategoryId,
        businessType: formBusinessType,
        dietaryType: formDietaryType,
        description: formDescription.trim(),
        price: formPrice !== '' ? parseFloat(formPrice) : null,
        spiceLevel: formSpiceLevel,
        availability: formAvailability,
        featured: formFeatured,
        imageUrl: formImageUrl.trim() || null,
      };

      if (editingItem) {
        // Update
        const res = await fetch('/api/admin/menu', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
        const data = await res.json();
        if (data.success) {
          closeModal();
          fetchData();
        } else {
          setUploadError(data.error || 'Failed to update dish.');
        }
      } else {
        // Create
        const res = await fetch('/api/admin/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          closeModal();
          fetchData();
        } else {
          setUploadError(data.error || 'Failed to create dish.');
        }
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to save menu dish.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to permanently remove this dish from the menu?')) return;
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const newAvail = !item.availability;
      await fetch('/api/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, availability: newAvail }),
      });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, availability: newAvail } : i))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Items
  const filteredItems = items.filter((item) => {
    const matchesBusiness =
      businessFilter === 'ALL' || item.businessType === businessFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBusiness && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
            Menu Dishes ({items.length})
          </h1>
          <p className="text-xs text-ivory/60 mt-1">
            Add new catering or cafe dishes with photos from your device, manage pricing, and control availability.
          </p>
        </div>

        {/* Accessibly Labeled Clearly Visible + Add Dish Button */}
        <Button
          type="button"
          onClick={openAddModal}
          variant="gold"
          size="md"
          className="shadow-lg shadow-gold/20"
          aria-label="Add dish or menu item"
          icon={<Plus className="w-5 h-5 text-charcoal stroke-[2.5]" />}
        >
          Add Dish
        </Button>
      </div>

      {/* Toolbar: Search & Business Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-charcoal-800/80 p-4 rounded-xl border border-white/10">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search dishes by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory placeholder-ivory/40 text-xs rounded-lg pl-9 pr-4 py-2 transition-all"
          />
        </div>

        {/* Business Type Filter Tabs */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setBusinessFilter('ALL')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all border ${
              businessFilter === 'ALL'
                ? 'bg-gold text-charcoal border-gold'
                : 'bg-charcoal-700/60 text-ivory/70 border-white/10 hover:text-ivory'
            }`}
          >
            All Dishes ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setBusinessFilter('CATERING')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all border ${
              businessFilter === 'CATERING'
                ? 'bg-maroon text-gold border-gold'
                : 'bg-charcoal-700/60 text-ivory/70 border-white/10 hover:text-ivory'
            }`}
          >
            Catering ({items.filter((i) => i.businessType === 'CATERING').length})
          </button>
          <button
            type="button"
            onClick={() => setBusinessFilter('CAFE')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all border ${
              businessFilter === 'CAFE'
                ? 'bg-wood-dark text-gold border-gold'
                : 'bg-charcoal-700/60 text-ivory/70 border-white/10 hover:text-ivory'
            }`}
          >
            Cafe ({items.filter((i) => i.businessType === 'CAFE').length})
          </button>
        </div>
      </div>

      {/* Menu Table / List */}
      {loading && items.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-ivory/60">Loading menu dishes...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/15 rounded-xl bg-charcoal-800/40 p-8">
          <Utensils className="w-12 h-12 text-gold/40 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-ivory">No Dishes Found</h3>
          <p className="text-xs text-ivory/60 max-w-md mx-auto mt-1 mb-5">
            {searchQuery
              ? `No dishes matched "${searchQuery}".`
              : 'Click the "+ Add Dish" button to add your first menu dish.'}
          </p>
          <Button
            type="button"
            onClick={openAddModal}
            variant="gold"
            size="sm"
            icon={<Plus className="w-4 h-4 text-charcoal" />}
          >
            Add New Dish
          </Button>
        </div>
      ) : (
        <div className="bg-charcoal-800 border border-gold/25 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-900 border-b border-white/10 text-ivory/60 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Dish & Image</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Diet</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-charcoal-700/40 transition-colors">
                    {/* Dish & Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gold/30 bg-charcoal-900 flex-shrink-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gold/30">
                              <Utensils className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-ivory hover:text-gold transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-ivory/50 block font-mono">
                            /{item.slug}
                          </span>
                          {item.spiceLevel ? (
                            <div className="mt-1">
                              <SpiceIndicator level={item.spiceLevel} />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium text-gold/90">
                        {item.category?.name || 'Uncategorized'}
                      </span>
                    </td>

                    {/* Business Type */}
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm border ${
                          item.businessType === 'CAFE'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-600/40'
                            : 'bg-maroon/60 text-gold border-gold/40'
                        }`}
                      >
                        {item.businessType}
                      </span>
                    </td>

                    {/* Dietary Type */}
                    <td className="py-3 px-4">
                      <DietaryIndicator type={item.dietaryType} />
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gold">
                        {item.price ? formatINR(item.price) : 'Enquiry'}
                      </span>
                    </td>

                    {/* Availability */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(item)}
                        className={`inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                          item.availability
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60'
                            : 'bg-red-950/80 text-red-300 border-red-500/50 hover:bg-red-900/60'
                        }`}
                      >
                        {item.availability ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-gold hover:text-gold-light rounded bg-gold/10 hover:bg-gold/20 transition-colors"
                          title="Edit dish"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40 transition-colors"
                          title="Delete dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Dish */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-charcoal-800 border-2 border-gold/70 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
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
                {editingItem ? 'Update Menu Item' : 'Create New Menu Item'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-ivory mt-0.5">
                {editingItem ? `Edit "${editingItem.name}"` : 'Add Dish to Menu'}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dish Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rayalaseema Natu Kodi Pulao"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(e.target.value)}
                    required
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Business Type, Dietary Type & Spice Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Business Sector *
                  </label>
                  <select
                    value={formBusinessType}
                    onChange={(e) => setFormBusinessType(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  >
                    <option value="CATERING">Catering (Feasts & Banquets)</option>
                    <option value="CAFE">Cafe (Quick Service)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Dietary Classification *
                  </label>
                  <select
                    value={formDietaryType}
                    onChange={(e) => setFormDietaryType(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  >
                    <option value="VEG">Vegetarian</option>
                    <option value="NON_VEG">Non-Vegetarian</option>
                    <option value="SATVIK">Satvik (No Onion/Garlic)</option>
                    <option value="JAIN">Jain</option>
                    <option value="HALAL">Halal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Spice Level (1 to 5)
                  </label>
                  <select
                    value={formSpiceLevel}
                    onChange={(e) => setFormSpiceLevel(parseInt(e.target.value, 10))}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  >
                    <option value={1}>1 — Mild</option>
                    <option value={2}>2 — Medium Mild</option>
                    <option value={3}>3 — Traditional Telugu Spice</option>
                    <option value={4}>4 — Fiery Rayalaseema</option>
                    <option value={5}>5 — Extra Hot Guntur</option>
                  </select>
                </div>
              </div>

              {/* Price & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                    Portion Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    step="1"
                    placeholder="Leave empty for catering (custom quotation)"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2.5 transition-all"
                  />
                  <span className="text-[10px] text-ivory/50 mt-1 block">
                    Optional for event catering; required for cafe menu.
                  </span>
                </div>

                <div className="flex flex-col justify-center space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="formAvailability"
                      checked={formAvailability}
                      onChange={(e) => setFormAvailability(e.target.checked)}
                      className="w-4 h-4 rounded text-gold focus:ring-gold bg-charcoal-900 border-white/20"
                    />
                    <label htmlFor="formAvailability" className="text-xs text-ivory cursor-pointer">
                      Dish is Available & Visible on Website
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="formFeatured"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-gold focus:ring-gold bg-charcoal-900 border-white/20"
                    />
                    <label htmlFor="formFeatured" className="text-xs text-ivory cursor-pointer">
                      Highlight as Featured Signature Dish
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-1">
                  Dish Description & Ingredients
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the heritage preparation, spices, cooking techniques, and flavors..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-charcoal-700/80 border border-white/15 focus:border-gold text-ivory text-xs rounded-lg px-3.5 py-2 transition-all resize-none"
                />
              </div>

              {/* Food Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-ivory/80 uppercase tracking-wider mb-2">
                  Dish Food Image (Upload from Device)
                </label>

                {/* Drop/Click area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                    formImageUrl
                      ? 'border-gold/60 bg-charcoal-900/60'
                      : 'border-white/20 hover:border-gold/50 bg-charcoal-700/30'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {formImageUrl ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gold/50 flex-shrink-0 bg-black">
                        <Image
                          src={formImageUrl}
                          alt="Dish Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Image Attached</span>
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
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
                        {uploading ? (
                          <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <UploadCloud className="w-5 h-5" />
                        )}
                      </div>
                      <p className="text-xs font-medium text-ivory">
                        {uploading ? 'Uploading image...' : 'Click to select dish photo from device'}
                      </p>
                      <p className="text-[10px] text-ivory/50">
                        Supports JPG, PNG, WebP up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Manual Path Fallback */}
                <div className="mt-2 text-right">
                  <details className="text-[11px] text-ivory/50 inline-block text-left">
                    <summary className="cursor-pointer hover:text-gold">Or enter image path / URL</summary>
                    <input
                      type="text"
                      placeholder="/uploads/menu/... or /dish.png"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      className="mt-1 w-full bg-charcoal-900 border border-white/15 px-3 py-1.5 text-xs text-ivory rounded"
                    />
                  </details>
                </div>
              </div>

              {/* Form Action Buttons */}
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
                  disabled={uploading || !formName}
                  icon={<CheckCircle2 className="w-4 h-4 text-charcoal" />}
                >
                  {editingItem ? 'Save Dish Changes' : 'Add Dish to Menu'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
