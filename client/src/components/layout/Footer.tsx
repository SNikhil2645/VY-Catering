import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Instagram, Clock, Utensils, MessageCircle, ShieldCheck } from 'lucide-react';
import KolamDivider from './KolamDivider';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 border-t border-gold/30 text-ivory/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kolam Divider */}
        <KolamDivider variant="gold" className="pb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Story Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-maroon to-maroon-900 border border-gold/50 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-ivory tracking-wide">
                  VENKY YADAV CATERINGS
                </h3>
                <p className="font-telugu text-xs text-gold">వెంకీ యాదవ్ కేటరింగ్స్</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ivory/70">
              Founded by Telavani Venkatesh (Venky Yadav). Crafting authentic Rayalaseema, Andhra, and Hyderabadi culinary feasts for weddings, receptions, and mega celebrations across Tirupati.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/venkyyadavforu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-colors"
                title="Follow Venky Yadav on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/916304005185?text=Hello%20Venky%20Yadav%20Caterings,%20I%20would%20like%20to%20enquire%20about%20catering%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-500 hover:text-charcoal transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catering Address & Operations */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gold">
              Catering Headquarters
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-ivory/80">
                  22-11-46/2, Autonagar, SV Auto Nagar, Tirupati, Andhra Pradesh 517501, India.
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+916304005185" className="hover:text-gold transition-colors font-semibold">
                  +91 63040 05185
                </a>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-xs text-ivory/60">
                  Enquiries: Mon–Sun, 8:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Venky Yadav Cafe Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-marigold">
              Venky Yadav Cafe
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-marigold mt-1 flex-shrink-0" />
                <span className="text-ivory/80">
                  20-7-60/A, Renigunta–Tirupati Road, Subash Nagar, Sujatha Nagar, Kothapalli, Tirupati, AP 517501.
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-marigold flex-shrink-0" />
                <a href="tel:+918328129450" className="hover:text-marigold transition-colors font-semibold">
                  +91 83281 29450
                </a>
              </div>
              <p className="text-xs text-marigold/90 bg-marigold/10 border border-marigold/30 px-3 py-2 rounded-sm">
                Famous for 4 AM Maska Bun & Irani Dum Chai, Pizzas & Fried Chicken.
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-gold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">
                  Wedding & Grand Banquets
                </Link>
              </li>
              <li>
                <Link href="/functions" className="hover:text-gold transition-colors">
                  All Functions We Cater
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-gold transition-colors">
                  Catering Menu Explorer
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors">
                  Event & Feast Gallery
                </Link>
              </li>
              <li>
                <Link href="/cafe" className="hover:text-marigold transition-colors">
                  Venky Yadav Cafe Teaser
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gold font-semibold hover:underline">
                  Multi-Step Enquiry Booking
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 space-y-4 sm:space-y-0">
          <p>
            © {currentYear} Venky Yadav Caterings & Cafe. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ivory transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center space-x-1 text-gold/60 hover:text-gold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
