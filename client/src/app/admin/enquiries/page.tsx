'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Phone, Mail, CheckCircle2, Clock, Calendar, MessageSquare, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Enquiry {
  id: string;
  referenceCode: string;
  customerName: string;
  phone: string;
  email: string | null;
  preferredContactMethod: string;
  eventType: string;
  eventDate: string;
  eventStartTime: string | null;
  guestCount: number;
  venue: string | null;
  eventFormat: string | null;
  foodPreference: string;
  specialRequests: string | null;
  status: string;
  internalNotes: string | null;
  createdAt: string;
}

const STATUS_OPTIONS = [
  'NEW',
  'CONTACTED',
  'QUOTATION_IN_PROGRESS',
  'QUOTATION_SENT',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (selectedStatus !== 'ALL') query.set('status', selectedStatus);
      if (search) query.set('search', search);

      const res = await fetch(`/api/enquiries?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: noteText }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, internalNotes: noteText } : e))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = [
      'ReferenceCode',
      'CustomerName',
      'Phone',
      'Email',
      'EventType',
      'EventDate',
      'GuestCount',
      'Venue',
      'Format',
      'FoodPreference',
      'Status',
      'Notes',
      'CreatedDate',
    ];

    const rows = enquiries.map((e) => [
      e.referenceCode,
      `"${e.customerName}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.eventType}"`,
      e.eventDate,
      e.guestCount,
      `"${e.venue || ''}"`,
      e.eventFormat,
      e.foodPreference,
      e.status,
      `"${(e.internalNotes || '').replace(/"/g, '""')}"`,
      new Date(e.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vyc-enquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold font-semibold">
            Lead Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory mt-1">
            Catering Enquiries ({enquiries.length})
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center space-x-2 border border-gold/40 hover:border-gold text-gold hover:bg-gold/10 px-4 py-2 rounded-sm text-xs font-semibold transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-charcoal-800 border border-gold/20 p-4 rounded-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone, or reference code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-charcoal-700 border border-white/15 focus:border-gold text-sm text-ivory rounded-sm pl-9 pr-4 py-2"
            />
          </div>
          <Button type="submit" variant="primary" size="sm">
            Search
          </Button>
        </form>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={`px-3 py-1 rounded-sm whitespace-nowrap transition-colors ${
              selectedStatus === 'ALL'
                ? 'bg-gold text-charcoal font-bold'
                : 'bg-charcoal-700 text-ivory/60 hover:text-ivory'
            }`}
          >
            All Statuses
          </button>
          {STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-sm whitespace-nowrap uppercase tracking-wider text-[11px] font-semibold transition-colors ${
                selectedStatus === st
                  ? 'bg-maroon text-gold border border-gold/40'
                  : 'bg-charcoal-700 text-ivory/60 hover:text-ivory'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="py-20 text-center text-gold text-xs">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="py-16 text-center text-ivory/50 bg-charcoal-800/40 rounded-sm">
          No enquiries found matching your filters.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-charcoal-800 border border-white/10 hover:border-gold/40 rounded-sm p-5 space-y-4 transition-colors"
            >
              {/* Row Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-base font-bold text-gold tracking-wider">
                    {enq.referenceCode}
                  </span>
                  <span className="text-xs text-ivory/40">
                    Received: {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase text-ivory/50 font-semibold">Status:</span>
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                    disabled={updatingId === enq.id}
                    className="bg-charcoal-700 border border-white/20 text-gold text-xs rounded-sm px-2.5 py-1 focus:border-gold font-semibold uppercase"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Event & Customer Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">
                    Customer Details
                  </span>
                  <p className="font-semibold text-ivory text-sm mt-0.5">{enq.customerName}</p>
                  <a
                    href={`tel:${enq.phone}`}
                    className="text-gold font-semibold hover:underline block mt-0.5"
                  >
                    {enq.phone}
                  </a>
                  {enq.email && <p className="text-ivory/60 truncate">{enq.email}</p>}
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">
                    Event Details
                  </span>
                  <p className="font-semibold text-ivory text-sm mt-0.5">{enq.eventType}</p>
                  <p className="text-ivory/80 mt-0.5">Date: {enq.eventDate}</p>
                  <p className="text-gold font-bold">Guests: {enq.guestCount}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">
                    Format & Preferences
                  </span>
                  <p className="text-ivory mt-0.5">
                    Diet: <strong className="text-banana-light">{enq.foodPreference}</strong>
                  </p>
                  <p className="text-ivory/70 mt-0.5">Format: {enq.eventFormat}</p>
                  {enq.venue && <p className="text-ivory/60 truncate">Venue: {enq.venue}</p>}
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ivory/50 block">
                    Direct Contact Action
                  </span>
                  <div className="flex flex-col gap-1.5 mt-1.5">
                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center space-x-1.5 text-xs text-gold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Client</span>
                    </a>
                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^\d]/g, '')}?text=Hello%20${encodeURIComponent(enq.customerName)},%20this%20is%20Venky%20Yadav%20Caterings%20regarding%20your%20enquiry%20(${enq.referenceCode}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-green-400 hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {enq.specialRequests && (
                <div className="p-3 bg-charcoal-700/60 border border-white/5 rounded-sm text-xs">
                  <span className="font-semibold text-gold block mb-0.5">Special Requests:</span>
                  <p className="text-ivory/80 italic">{enq.specialRequests}</p>
                </div>
              )}

              {/* Internal Notes Section */}
              <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex-1">
                  {editingNotesId === enq.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add internal notes (e.g. Quoted ₹650/plate, follow-up on Friday)..."
                        className="flex-1 bg-charcoal-700 border border-gold/40 text-ivory px-3 py-1.5 rounded-sm text-xs"
                      />
                      <Button
                        type="button"
                        onClick={() => handleSaveNotes(enq.id)}
                        variant="gold"
                        size="sm"
                      >
                        Save
                      </Button>
                      <button
                        type="button"
                        onClick={() => setEditingNotesId(null)}
                        className="text-ivory/60 hover:text-ivory text-xs px-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-ivory/50">Internal Notes:</span>
                      <span className="text-ivory/80 font-medium">
                        {enq.internalNotes || 'No internal notes added.'}
                      </span>
                      <button
                        onClick={() => {
                          setEditingNotesId(enq.id);
                          setNoteText(enq.internalNotes || '');
                        }}
                        className="text-gold text-[11px] underline hover:text-gold-light ml-2"
                      >
                        {enq.internalNotes ? 'Edit' : 'Add Note'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
