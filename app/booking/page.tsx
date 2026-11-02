import React, { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';
import KolamDivider from '@/components/layout/KolamDivider';
import { Calendar, Phone, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Plan Your Event | Multi-Step Catering Quotation & Booking',
  description:
    'Book Venky Yadav Caterings for your upcoming wedding, reception, or milestone function. 4-step enquiry wizard with real-time validation and unique reference code.',
};

export default function BookingPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="py-12 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Catering Request</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory mb-3">
            Plan Your Celebration Feast
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto leading-relaxed">
            Complete our 4-step enquiry wizard. We will generate your official reference code and contact you with custom menu options and quotations.
          </p>
          <KolamDivider variant="gold" className="pt-3" />
        </div>
      </section>

      {/* Booking Form Wizard */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="py-20 text-center text-gold">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs">Loading booking engine...</p>
              </div>
            }
          >
            <BookingWizard />
          </Suspense>

          {/* Direct Support Footnote */}
          <div className="max-w-2xl mx-auto mt-12 text-center text-xs text-ivory/60 space-y-2">
            <p className="flex items-center justify-center space-x-1.5 text-gold">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span className="font-semibold">Need urgent date availability for an upcoming muhurtham?</span>
            </p>
            <p>
              Call Venky Yadav Catering Operations directly:{' '}
              <a href="tel:+916304005185" className="text-ivory font-semibold hover:text-gold underline">
                +91 63040 05185
              </a>{' '}
              or WhatsApp us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
