import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Utensils, Award, Phone, CheckCircle, ArrowRight, Coffee, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import BananaLeafHero from '@/components/hero/BananaLeafHero';
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

      {/* 2. Brand & Founder Introduction Section */}
      <section className="py-20 bg-charcoal-800 border-b border-gold/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 sm:h-[480px] w-full rounded-sm overflow-hidden border-2 border-gold/40 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                  alt="Venky Yadav Catering Grand Feast Banquet Setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                
                {/* Brass Seal Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-charcoal-900/90 backdrop-blur-md border border-gold/50 rounded-sm">
                  <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-0.5">
                    Culinary Leadership
                  </span>
                  <p className="font-serif text-lg font-bold text-ivory">
                    Telavani Venkatesh (Venky Yadav)
                  </p>
                  <p className="font-telugu text-xs text-gold/80">వెంకీ యాదవ్ — తిరుపతి</p>
                </div>
              </div>
            </div>

            {/* Editorial Story Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 border border-maroon/50 text-gold text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-tight">
                Authentic Rayalaseema Hospitality, <br />
                <span className="text-gold italic font-serif">Honoring Tirupati Traditions.</span>
              </h2>

              <p className="text-ivory/80 text-base leading-relaxed">
                Hospitality in Andhra Pradesh is not merely about feeding guests—it is an auspicious celebration of kinship. At <strong>Venky Yadav Caterings</strong>, we honor this ancestral ethos with every firewood-simmered handi of Hyderabadi mutton dum biryani, every crisp loose prawn starter, and every pure ghee sweet prepared for your sacred celebrations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-charcoal-700/60 border border-white/10 rounded-sm">
                  <h4 className="font-semibold text-gold text-sm mb-1">
                    Authentic Acacia Firewood
                  </h4>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    Slow outdoor coal dum imparting unmistakable earthen warmth and fragrance.
                  </p>
                </div>

                <div className="p-4 bg-charcoal-700/60 border border-white/10 rounded-sm">
                  <h4 className="font-semibold text-gold text-sm mb-1">
                    Ceremonial Sadhya & Buffets
                  </h4>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    Traditional banana-leaf service for wedding muhurthams & executive corporate buffets.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button href="/about" variant="primary" size="md">
                  Read Founder Story
                </Button>
                <a
                  href="tel:+916304005185"
                  className="inline-flex items-center space-x-2 text-sm text-gold hover:text-gold-light font-semibold px-4 py-2.5 border border-gold/30 hover:border-gold rounded-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <span>Call Catering Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Royal Thali Orbit (Signature Interaction) */}
      <ThaliOrbit />

      {/* 4. Function Finder (Interactive Menu & Event Builder) */}
      <FunctionFinder />

      {/* 5. Journey of a Feast (Culinary Process) */}
      <JourneyOfAFeast />

      {/* 6. Venky Yadav Cafe Teaser Banner */}
      <section className="py-16 bg-gradient-to-r from-wood-dark via-charcoal to-wood-dark border-y border-gold/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-charcoal-800/90 border border-marigold/40 rounded-sm p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
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
                className="w-full sm:w-auto text-center px-6 py-3 border border-white/20 hover:border-gold text-ivory text-sm font-semibold rounded-sm transition-colors"
              >
                Get Cafe Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Authentic Customer Testimonials */}
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
                className="bg-charcoal-700/50 border border-gold/30 rounded-sm p-6 flex flex-col justify-between hover:border-gold transition-colors"
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

      {/* 8. Frequently Asked Questions */}
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
                className="bg-charcoal-700/60 border border-white/10 p-5 rounded-sm"
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

      {/* 9. Grand Final Booking Call to Action */}
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
            <Button href="/booking" variant="gold" size="lg" className="w-full sm:w-auto">
              Open 4-Step Booking Wizard
            </Button>
            <a
              href="https://wa.me/916304005185?text=Hello%20Venky%20Yadav%20Caterings,%20I%20would%20like%20to%20check%20catering%20availability%20for%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-charcoal border border-gold/50 hover:border-gold text-gold font-semibold px-6 py-3.5 rounded-sm text-sm transition-colors"
            >
              <span>Instant WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
