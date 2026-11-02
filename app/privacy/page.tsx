import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';

export const metadata = {
  title: 'Privacy Policy | Venky Yadav Caterings & Cafe',
  description: 'Privacy Policy and data protection policy for Venky Yadav Caterings, Tirupati.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="py-12 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs uppercase tracking-widest text-gold">
            Last Updated: November 2026 • Venky Yadav Caterings
          </p>
          <KolamDivider variant="gold" className="pt-3" />
        </div>
      </section>

      <section className="py-16 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-ivory/80 leading-relaxed">
          {/* Legal Notice Callout */}
          <div className="p-4 bg-maroon/20 border-l-4 border-gold rounded-sm flex items-start space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gold block mb-1">Legal Review Notice:</strong>
              This policy describes our operational data collection practices for event catering enquiries. It is subject to professional review under Indian Information Technology Acts and Digital Personal Data Protection (DPDP) standards.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">1. Information We Collect</h2>
            <p>
              When you submit a catering enquiry on <strong>venkyyadavcaterings.com</strong>, we collect your name, phone number, email address (optional), event date, event type, approximate guest count, and any food preferences or notes you voluntarily share.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">2. How We Use Your Information</h2>
            <p>We use your event information strictly to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Prepare and deliver customized catering quotations and menu proposals.</li>
              <li>Contact you via phone, WhatsApp, or email to discuss logistics and menu tastings.</li>
              <li>Coordinate food preparation and serving captains on your event date.</li>
              <li>Provide customer support regarding your booking reference code.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">3. No Sale of Personal Data</h2>
            <p>
              We never sell, rent, or trade your personal contact details or event information to third-party telemarketers or marketing agencies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">4. Data Retention & Deletion</h2>
            <p>
              Enquiry records are maintained in our secure database for catering logistics and audit history. You may request the deletion of your personal contact records at any time by contacting us at{' '}
              <a href="mailto:bookings@venkyyadavcaterings.com" className="text-gold underline">
                bookings@venkyyadavcaterings.com
              </a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">5. Contact Information</h2>
            <p>
              For any questions regarding this Privacy Policy, please contact:<br />
              <strong>Venky Yadav Caterings</strong><br />
              22-11-46/2, Autonagar, SV Auto Nagar, Tirupati, Andhra Pradesh 517501, India.<br />
              Phone: +91 63040 05185
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
