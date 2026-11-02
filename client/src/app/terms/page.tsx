import React from 'react';
import Link from 'next/link';
import { FileText, AlertCircle } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';

export const metadata = {
  title: 'Terms of Service & Enquiry Conditions | Venky Yadav Caterings',
  description: 'Terms of service and event enquiry terms for Venky Yadav Caterings, Tirupati.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="py-12 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory mb-2">
            Terms of Service & Enquiry Terms
          </h1>
          <p className="text-xs uppercase tracking-widest text-gold">
            Effective Date: November 2026 • Venky Yadav Caterings
          </p>
          <KolamDivider variant="gold" className="pt-3" />
        </div>
      </section>

      <section className="py-16 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-ivory/80 leading-relaxed">
          <div className="p-4 bg-maroon/20 border-l-4 border-gold rounded-sm flex items-start space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gold block mb-1">Legal Review Notice:</strong>
              These terms outline the operational rules governing catering enquiries submitted via this website. They do not constitute a confirmed contract until an official booking advance is paid and a written agreement is executed.
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">1. Nature of Website Enquiries</h2>
            <p>
              Submitting an enquiry via our multi-step booking wizard or receiving an automated reference code (e.g. <code>VYC-2026-XXXXX</code>) represents an <strong>expression of interest and quotation request</strong>. It does not constitute a guaranteed date lock or contract until our operations team confirms date availability and the agreed booking advance is received.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">2. Menu Pricing & Customization</h2>
            <p>
              Catering pricing varies according to chosen dishes, live counter additions, seasonal ingredient fluctuations, and total guest count. Indicative figures displayed on the website are provisional. Firm quotations are issued following personal consultation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">3. Venky Yadav Cafe Disclaimer</h2>
            <p>
              Information presented regarding Venky Yadav Cafe (including 24-hour operational claims, indicative pizza/chicken prices, and early-morning schedules) is provided as an informative preview and remains subject to in-store operational confirmation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">4. Governing Law & Jurisdiction</h2>
            <p>
              Any disputes arising from catering contracts executed with Venky Yadav Caterings shall be governed by the laws of India and subject to the jurisdiction of the competent courts in <strong>Tirupati, Andhra Pradesh</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ivory">5. Contact Information</h2>
            <p>
              For commercial contracts or catering questions:<br />
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
