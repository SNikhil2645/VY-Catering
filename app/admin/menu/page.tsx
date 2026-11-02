'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Utensils, Check, Sparkles, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils/formatters';

export default function AdminMenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Item Form state
  const [newItem, setNewItem] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    dietaryType: 'VEG',
    businessType: 'CATERING',
    imageUrl: '',
    availability: true,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/menu');
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
        setCategories(data.categories);
        if (data.categories.length > 0 && !newItem.categoryId) {
          setNewItem((prev) => ({ ...prev, categoryId: data.categories[0].id }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewItem({
          name: '',
          categoryId: categories[0]?.id || '',
          description: '',
          price: '',
          dietaryType: 'VEG',
          businessType: 'CATERING',
          imageUrl: '',
          availability: true,
        });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to remove this dish?')) return;
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAvailability = async (item: any) => {
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
            Menu Items ({items.length})
          </h1>
        </div>

        <Button
          type="button"
          onClick={() => setShowAddModal(true)}
          variant="gold"
          size="sm"
          icon={<Plus className="w-4 h-4 text-charcoal" />}
        >
          Add New Dish
        </Button>
      </div>

      {/* Modal for adding dish */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-charcoal-800 border-2 border-gold rounded-sm p-6 max-w-lg w-full space-y-4">
            <h3 className="font-serif text-xl font-bold text-ivory">Add New Menu Dish</h3>
            <form onSubmit={handleCreateItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-ivory/70 font-semibold mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gongura Mutton Roast"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory/70 font-semibold mb-1">Category *</label>
                  <select
                    value={newItem.categoryId}
                    onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                    className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/70 font-semibold mb-1">Dietary Type</label>
                  <select
                    value={newItem.dietaryType}
                    onChange={(e) => setNewItem({ ...newItem, dietaryType: e.target.value })}
                    className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                  >
                    <option value="VEG">🌱 Vegetarian</option>
                    <option value="NON_VEG">🍗 Non-Vegetarian</option>
                    <option value="SATVIK">Satvik</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory/70 font-semibold mb-1">
                    Price (INR) <span className="text-ivory/40">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Leave empty for Catering"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 font-semibold mb-1">Business</label>
                  <select
                    value={newItem.businessType}
                    onChange={(e) => setNewItem({ ...newItem, businessType: e.target.value })}
                    className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                  >
                    <option value="CATERING">Catering Service</option>
                    <option value="CAFE">Venky Yadav Cafe</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-ivory/70 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                  className="w-full bg-charcoal-700 border border-white/15 px-3 py-2 text-ivory rounded-sm"
                />
              </div>

              <div>
                <label className="block text-ivory/70 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Ingredients and culinary tradition..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
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
                  Save Item
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Items Table */}
      {loading ? (
        <div className="py-20 text-center text-gold text-xs">Loading menu items...</div>
      ) : (
        <div className="bg-charcoal-800 border border-gold/20 rounded-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal-900 text-ivory/60 uppercase tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4">Dish</th>
                <th className="p-4">Category</th>
                <th className="p-4">Diet</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Available</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-charcoal-700/50 transition-colors">
                  <td className="p-4 font-semibold text-ivory">
                    <span>{item.name}</span>
                    {item.featured && (
                      <span className="ml-2 px-1.5 py-0.5 bg-gold/20 text-gold text-[9px] rounded font-bold uppercase">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-ivory/70">{item.category?.name || 'Unassigned'}</td>
                  <td className="p-4">
                    <Badge variant={item.dietaryType === 'VEG' ? 'veg' : 'non-veg'}>
                      {item.dietaryType}
                    </Badge>
                  </td>
                  <td className="p-4 text-ivory/60 text-[11px]">{item.businessType}</td>
                  <td className="p-4 font-semibold text-gold">{formatINR(item.price)}</td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(item)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.availability
                          ? 'bg-green-600/30 text-green-400 border border-green-500/40'
                          : 'bg-red-800/30 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {item.availability ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete dish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
