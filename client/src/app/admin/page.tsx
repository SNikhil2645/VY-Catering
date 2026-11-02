'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Users, Utensils, CheckCircle, Clock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { formatINR } from '@/lib/utils/formatters';

interface AdminStats {
  totalEnquiries: number;
  newEnquiries: number;
  confirmedEnquiries: number;
  totalMenuItems: number;
  totalGalleryAssets: number;
  recentEnquiries: any[];
  statusBreakdown: { status: string; _count: { status: number } }[];
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gold">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs">Computing live database metrics...</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-red-400">Failed to load statistics.</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Live Business Dashboard
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
            Overview & Operations
          </h1>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex items-center space-x-2 bg-maroon hover:bg-maroon-600 border border-gold/40 text-ivory text-xs font-semibold px-4 py-2.5 rounded-sm transition-colors shadow-md"
        >
          <Calendar className="w-4 h-4 text-gold" />
          <span>Manage All Enquiries</span>
        </Link>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-charcoal-800 border border-gold/30 rounded-sm p-5 space-y-1 shadow-lg">
          <span className="text-[11px] uppercase tracking-wider text-ivory/50 block">
            New Enquiries
          </span>
          <p className="font-serif text-3xl font-bold text-gold">
            {stats.newEnquiries}
          </p>
          <span className="text-[10px] text-marigold font-medium">Action Required</span>
        </div>

        <div className="bg-charcoal-800 border border-white/10 rounded-sm p-5 space-y-1 shadow-lg">
          <span className="text-[11px] uppercase tracking-wider text-ivory/50 block">
            Total Enquiries
          </span>
          <p className="font-serif text-3xl font-bold text-ivory">
            {stats.totalEnquiries}
          </p>
          <span className="text-[10px] text-ivory/40">Registered Requests</span>
        </div>

        <div className="bg-charcoal-800 border border-white/10 rounded-sm p-5 space-y-1 shadow-lg">
          <span className="text-[11px] uppercase tracking-wider text-ivory/50 block">
            Confirmed Events
          </span>
          <p className="font-serif text-3xl font-bold text-green-400">
            {stats.confirmedEnquiries}
          </p>
          <span className="text-[10px] text-green-500/70">Locked Bookings</span>
        </div>

        <div className="bg-charcoal-800 border border-white/10 rounded-sm p-5 space-y-1 shadow-lg">
          <span className="text-[11px] uppercase tracking-wider text-ivory/50 block">
            Catalog Items
          </span>
          <p className="font-serif text-3xl font-bold text-ivory">
            {stats.totalMenuItems}
          </p>
          <span className="text-[10px] text-ivory/40">Active Menu Items</span>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-charcoal-800 border border-gold/20 rounded-sm overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ivory">
            Recent Catering Enquiries
          </h2>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-gold hover:underline inline-flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-ivory/60">
            No enquiries registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-900 text-ivory/60 uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-4">Ref Code</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Event & Date</th>
                  <th className="p-4">Guests</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-charcoal-700/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-gold">
                      {enq.referenceCode}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-ivory block">{enq.customerName}</span>
                      <span className="text-ivory/50 text-[11px]">{enq.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-ivory font-medium block">{enq.eventType}</span>
                      <span className="text-ivory/50 text-[11px]">{enq.eventDate}</span>
                    </td>
                    <td className="p-4 font-semibold text-ivory">
                      {enq.guestCount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === 'NEW'
                            ? 'bg-marigold/20 text-marigold border border-marigold/30'
                            : enq.status === 'CONFIRMED'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/10 text-ivory/70'
                        }`}
                      >
                        {enq.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/enquiries?search=${enq.referenceCode}`}
                        className="text-gold font-semibold hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
