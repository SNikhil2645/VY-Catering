import React from 'react';
import { Phone, MapPin, Mail, Clock, MessageCircle, Navigation, Sparkles, Send } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Contact Venky Yadav Caterings & Cafe | Tirupati Addresses & Phone Numbers',
  description:
    'Get in touch with Venky Yadav Caterings and Venky Yadav Cafe. Addresses in Autonagar and Renigunta Road, Tirupati. Call +91 63040 05185 or +91 83281 29450.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="py-16 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-4">
            Contact Venky Yadav
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Whether booking a wedding feast or visiting our cafe on Renigunta Road, our team is always ready to welcome you.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>
      </section>

      {/* Dual Locations Grid */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* 1. Catering Headquarters */}
            <div className="bg-charcoal-800 border-2 border-gold/40 rounded-sm p-8 shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-1">
                  Primary Feasts & Weddings Hub
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                  Venky Yadav Caterings
                </h2>
                <p className="font-telugu text-gold text-xs mt-0.5">వెంకీ యాదవ్ కేటరింగ్స్ — తిరుపతి</p>
              </div>

              <div className="space-y-4 text-sm text-ivory/80">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-ivory block mb-0.5">Address:</strong>
                    <span>22-11-46/2, Autonagar, SV Auto Nagar, Tirupati, Andhra Pradesh 517501, India.</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <strong className="text-ivory mr-2">Catering Bookings:</strong>
                    <a href="tel:+916304005185" className="text-gold font-bold hover:underline">
                      +91 63040 05185
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <strong className="text-ivory mr-2">Email:</strong>
                    <a href="mailto:bookings@venkyyadavcaterings.com" className="text-ivory/70 hover:text-gold">
                      bookings@venkyyadavcaterings.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-ivory block">Enquiry Hours:</strong>
                    <span className="text-xs text-ivory/60">Monday – Sunday: 8:00 AM – 10:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3 border-t border-white/10">
                <a
                  href="https://maps.google.com/?q=Venky+Yadav+Caterings+Autonagar+Tirupati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-maroon hover:bg-maroon-600 text-ivory border border-gold/40 px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold" />
                  <span>Get Directions</span>
                </a>

                <a
                  href="https://wa.me/916304005185?text=Hello%20Venky%20Yadav%20Caterings,%20I%20would%20like%20to%20enquire%20about%20catering%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-700 hover:bg-green-600 text-ivory px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Catering</span>
                </a>
              </div>
            </div>

            {/* 2. Venky Yadav Cafe */}
            <div className="bg-charcoal-800 border-2 border-marigold/40 rounded-sm p-8 shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-marigold font-semibold block mb-1">
                  Food Destination & Casual Cafe
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                  Venky Yadav Cafe
                </h2>
                <p className="font-telugu text-marigold text-xs mt-0.5">వెంకీ యాదవ్ కేఫ్ — రేణిగుంట రోడ్</p>
              </div>

              <div className="space-y-4 text-sm text-ivory/80">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-marigold mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-ivory block mb-0.5">Address:</strong>
                    <span>20-7-60/A, Renigunta–Tirupati Road, Subash Nagar, Sujatha Nagar, Kothapalli, Tirupati, AP 517501.</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-marigold flex-shrink-0" />
                  <div>
                    <strong className="text-ivory mr-2">Cafe Line & Promotions:</strong>
                    <a href="tel:+918328129450" className="text-marigold font-bold hover:underline">
                      +91 83281 29450
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-marigold mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-ivory block">Operating Hours:</strong>
                    <span className="text-xs text-ivory/60">Open 24 Hours (Claimed by owner, subject to confirmation)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3 border-t border-white/10">
                <a
                  href="https://maps.google.com/?q=Venky+Yadav+Cafe+Tirupati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-marigold hover:bg-marigold-hover text-charcoal px-5 py-2.5 rounded-sm text-xs font-bold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Cafe Directions</span>
                </a>

                <a
                  href="tel:+918328129450"
                  className="inline-flex items-center space-x-2 border border-marigold/40 text-marigold hover:bg-marigold/10 px-5 py-2.5 rounded-sm text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Cafe</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="max-w-2xl mx-auto bg-charcoal-800 border border-gold/30 rounded-sm p-8 shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-ivory text-center mb-2">
              Send a General Message
            </h3>
            <p className="text-xs text-ivory/60 text-center mb-6">
              For event quotations with guest counts, please use our{' '}
              <a href="/booking" className="text-gold underline font-semibold">
                Multi-Step Booking Form
              </a>{' '}
              for instant reference code generation.
            </p>

            <form
              action="https://wa.me/916304005185"
              method="get"
              target="_blank"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory/70 font-semibold mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramanjaneyulu"
                  className="w-full bg-charcoal-700 border border-white/15 focus:border-gold px-3.5 py-2.5 text-sm text-ivory rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory/70 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  className="w-full bg-charcoal-700 border border-white/15 focus:border-gold px-3.5 py-2.5 text-sm text-ivory rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory/70 font-semibold mb-1">
                  Message / General Query
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How can we assist you?"
                  className="w-full bg-charcoal-700 border border-white/15 focus:border-gold px-3.5 py-2.5 text-sm text-ivory rounded-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-charcoal font-bold py-3 rounded-sm text-sm transition-colors shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
