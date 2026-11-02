import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Utensils, Award, Phone, CheckCircle, ArrowRight, Coffee, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import BananaLeafHero from '@/components/hero/BananaLeafHero';
import AboutOurQuality from '@/components/sections/AboutOurQuality';
import SignatureMenuTrack from '@/components/sections/SignatureMenuTrack';
import ThaliOrbit from '@/components/motion/ThaliOrbit';
import JourneyOfAFeast from '@/components/motion/JourneyOfAFeast';
import FunctionFinder from '@/components/motion/FunctionFinder';
import KolamDivider from '@/components/layout/KolamDivider';
import Button from '@/components/ui/Button';
import prisma from '@/lib/db/prisma';

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { verified: true },
    orderBy: { displayOrder: 'asc' },
    take: 3,
  });

  const faqs = await prisma.faq.findMany({
    where: { published: true },
    orderBy: { displayOrder: 'asc' },
    take: 4,
  });

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Banana Leaf Hero */}
      <BananaLeafHero />

      {/* 2. Main Featured Section: About Our Quality & Chef Venky Anna Platter Asset */}
      <AboutOurQuality />

      {/* 3. Catering Menu Track Component: "Our Signature Menus" with Tabs & Dynamic Calculator */}
      <SignatureMenuTrack />

      {/* 4. The Royal Thali Orbit (Signature Interaction) */}
      <ThaliOrbit />

      {/* 5. Function Finder (Interactive Menu & Event Builder) */}
      <FunctionFinder />

      {/* 6. Journey of a Feast (Culinary Process) */}
      <JourneyOfAFeast />

      {/* 7. Venky Yadav Cafe Teaser Banner */}
      <section className="py-16 bg-gradient-to-r from-wood-dark via-charcoal to-wood-dark border-y border-gold/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-charcoal-800/90 border border-marigold/40 rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-marigold/20 text-marigold border border-marigold/30 text-xs font-semibold uppercase tracking-wider">
                <Coffee className="w-3.5 h-3.5" />
                <span>Our Food Destination in Tirupati</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
                Craving 4 AM Maska Bun & Irani Chai?
              </h3>
              <p className="text-sm text-ivory/80 leading-relaxed">
                Visit <strong>Venky Yadav Cafe</strong> on Renigunta–Tirupati Road. Renowned for slow-brewed cardamom Irani chai, oven-fresh buttered maska buns, peri peri pizzas, and crispy fried chicken wings.
              </p>
              <p className="text-xs text-marigold/80 font-medium">
                📍 20-7-60/A, Renigunta Road, Subash Nagar, Tirupati • Call: +91 83281 29450
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <Button href="/cafe" variant="cafe" size="lg" className="w-full sm:w-auto">
                Explore Cafe Teaser
              </Button>
              <a
                href="https://maps.google.com/?q=Venky+Yadav+Cafe+Tirupati"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-6 py-3 border border-white/20 hover:border-gold text-ivory text-sm font-semibold rounded-xl transition-colors"
              >
                Get Cafe Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Authentic Customer Testimonials */}
      <section className="py-20 bg-charcoal relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
              Genuine Word of Mouth
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Celebrations We Have Honored
            </h2>
            <KolamDivider variant="gold" className="pt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-charcoal-700/50 border border-gold/30 rounded-2xl p-6 flex flex-col justify-between hover:border-gold transition-colors shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-gold text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs text-ivory/80 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <h4 className="font-serif font-bold text-ivory text-sm">{t.authorName}</h4>
                  <p className="text-[11px] text-gold">{t.eventType}</p>
                  {t.eventDate && (
                    <span className="text-[10px] text-ivory/40 block">{t.eventDate}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="py-20 bg-charcoal-800 border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
              Clear & Transparent
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-charcoal-700/60 border border-white/10 p-5 rounded-xl"
              >
                <h4 className="font-serif font-bold text-base text-ivory mb-2">
                  {faq.question}
                </h4>
                <p className="text-xs leading-relaxed text-ivory/70">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-xs text-ivory/60 mb-3">
              Have specific questions about wedding dates, live stalls, or pricing?
            </p>
            <Button href="/contact" variant="outline" size="sm">
              Contact Operations Team
            </Button>
          </div>
        </div>
      </section>

      {/* 10. Grand Final Booking Call to Action */}
      <section className="py-20 bg-gradient-to-b from-maroon-900 to-charcoal text-center relative border-t border-gold/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 text-gold text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Lock Your Date Early</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory">
            Planning a Wedding or Celebration in Tirupati?
          </h2>

          <p className="text-ivory/80 text-sm sm:text-base leading-relaxed">
            Muhurtham slots in Rayalaseema book fast. Submit your event details through our multi-step enquiry wizard and let Venky Yadav Caterings curate an authentic royal banquet.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/booking" variant="gold" size="lg" className="w-full sm:w-auto shadow-2xl">
              Open 4-Step Booking Wizard
            </Button>
            <a
              href="https://wa.me/916304005185?text=Hello%20Venky%20Yadav%20Caterings,%20I%20would%20like%20to%20check%20catering%20availability%20for%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-charcoal border border-gold/50 hover:border-gold text-gold font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
            >
              <span>Instant WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
