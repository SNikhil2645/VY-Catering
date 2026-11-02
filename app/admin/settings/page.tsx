'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminSettingsPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingType, setSavingType] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success) {
          setProfiles(data.profiles);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleUpdate = async (type: string, profileData: any) => {
    setSavingType(type);
    setSavedSuccess(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(type);
        setTimeout(() => setSavedSuccess(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingType(null);
    }
  };

  const handleFieldChange = (type: string, field: string, value: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.businessType === type ? { ...p, [field]: value } : p))
    );
  };

  if (loading) {
    return <div className="py-20 text-center text-gold text-xs">Loading business settings...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-widest text-gold font-semibold">
          Configuration
        </span>
        <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
          Business Profiles & Contacts
        </h1>
        <p className="text-xs text-ivory/60 mt-1">
          Update verified contact numbers, addresses, and operating hours across the public website.
        </p>
      </div>

      {profiles.map((profile) => (
        <div
          key={profile.businessType}
          className="bg-charcoal-800 border-2 border-gold/30 rounded-sm p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gold font-bold">
                Profile Target
              </span>
              <h2 className="font-serif text-xl font-bold text-ivory">
                {profile.businessName} ({profile.businessType})
              </h2>
            </div>
            {savedSuccess === profile.businessType && (
              <span className="flex items-center space-x-1.5 text-xs text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved to database!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-ivory/70 font-semibold mb-1">Primary Phone</label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) =>
                  handleFieldChange(profile.businessType, 'phone', e.target.value)
                }
                className="w-full bg-charcoal-700 border border-white/15 px-3.5 py-2 text-ivory rounded-sm focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-ivory/70 font-semibold mb-1">Alternate Phone</label>
              <input
                type="text"
                value={profile.alternatePhone || ''}
                onChange={(e) =>
                  handleFieldChange(profile.businessType, 'alternatePhone', e.target.value)
                }
                className="w-full bg-charcoal-700 border border-white/15 px-3.5 py-2 text-ivory rounded-sm focus:border-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-ivory/70 font-semibold mb-1">Full Business Address</label>
              <input
                type="text"
                value={profile.address || ''}
                onChange={(e) =>
                  handleFieldChange(profile.businessType, 'address', e.target.value)
                }
                className="w-full bg-charcoal-700 border border-white/15 px-3.5 py-2 text-ivory rounded-sm focus:border-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-ivory/70 font-semibold mb-1">Operating Hours</label>
              <input
                type="text"
                value={profile.operatingHours || ''}
                onChange={(e) =>
                  handleFieldChange(profile.businessType, 'operatingHours', e.target.value)
                }
                className="w-full bg-charcoal-700 border border-white/15 px-3.5 py-2 text-ivory rounded-sm focus:border-gold"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-white/10">
            <Button
              type="button"
              onClick={() => handleUpdate(profile.businessType, profile)}
              variant="gold"
              size="sm"
              loading={savingType === profile.businessType}
              icon={<Save className="w-4 h-4 text-charcoal" />}
            >
              Save Profile
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
