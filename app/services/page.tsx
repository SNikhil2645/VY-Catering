import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, ArrowRight, Users, Check } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Catering Services | Wedding, Reception & Corporate Feasts in Tirupati',
  description:
    'Explore catering services by Venky Yadav Caterings. From royal Telugu wedding sadhyas of 1,700+ guests to corporate galas and family housewarmings.',
};

const SERVICES = [
  {
    slug: 'wedding-catering',
    title: 'Royal Wedding & Muhurtham Catering',
    teluguTitle: 'పెళ్లి ముహూర్తం కేటరింగ్',
    description: 'Grand ceremonial banana-leaf sadhya or luxury buffet spreads. Featuring live wood-fire mutton dum biryani, crispy loose prawns, and authentic pure ghee sweets for 350 to 1,700+ guests.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    capacity: '350 – 1,700+ Guests',
    highlights: ['Ceremonial Banana-Leaf Sadhya', 'Wood-Fire Dum Handi', 'Dedicated Serving Captains'],
  },
  {
    slug: 'reception-catering',
    title: 'Grand Evening Reception Banquets',
    teluguTitle: 'రిసెప్షన్ వేడుకల విందు',
    description: 'Sophisticated multi-cuisine evening celebrations. High-energy live chaat, pasta, and tandoori counters paired with royal Nizami biryanis and lavish dessert parlors.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    capacity: '300 – 1,500+ Guests',
    highlights: ['Live Grill & Chaat Counters', 'Illuminated Brass Chafing Stations', 'Custom Mocktail Lounge'],
  },
  {
    slug: 'engagement-catering',
    title: 'Engagement & Nischitartham Feasts',
    teluguTitle: 'నిశ్చితార్థం విందు',
    description: 'Warm, memorable gatherings bringing two families together. Curated traditional tiffins, authentic Rayalaseema ragi sangati & natu kodi pulusu, or refined sit-down meals.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    capacity: '150 – 500 Guests',
    highlights: ['Traditional Family Tiffins', 'Authentic Non-Veg Specialties', 'Pure Ghee Sweets'],
  },
  {
    slug: 'corporate-catering',
    title: 'Corporate Galas & Conferences',
    teluguTitle: 'కార్పొరేట్ మీటింగ్స్ & డిన్నర్స్',
    description: 'Punctual, hygienic, executive culinary arrangements for annual dinners, seminars, product launches, and institutional fests across Tirupati and Sri City.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
    capacity: '100 – 1,000+ Guests',
    highlights: ['Strict Time Discipline', 'Executive Buffet Setup', 'High-Tea & Artisan Coffee'],
  },
  {
    slug: 'gruhapravesham-catering',
    title: 'Housewarming & Family Ceremonies',
    teluguTitle: 'గృహప్రవేశం & శుభకార్యాలు',
    description: 'Auspicious home inaugurations, Annaprasana, Seemantham, and Upanayanam feasts prepared with strict adherence to pristine traditional satvik recipes.',
    imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=800&auto=format&fit=crop',
    capacity: '100 – 500 Guests',
    highlights: ['100% Satvik Options', 'Gutti Vankaya & Pulihora Special', 'Ceremonial Serving'],
  },
  {
    slug: 'outdoor-large-scale-catering',
    title: 'Outdoor & Mega Gathering Catering',
    teluguTitle: 'భారీ బహిరంగ వేడుకల కేటరింగ్',
    description: 'Full-service field kitchen setups for farmhouses, temple festivals, Annadanam, college fests, and community gatherings exceeding 1,500+ attendees.',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    capacity: '500 – 2,500+ Guests',
    highlights: ['Complete Mobile Field Kitchen', 'Rapid High-Volume Serving', 'Uncompromising Quality'],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Banner */}
      <section className="py-16 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feast Solutions</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-4">
            Catering Services We Provide
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Tailored culinary experiences designed for every auspicious milestone, wedding muhurtham, and corporate event across Tirupati.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="bg-charcoal-800 border border-gold/20 hover:border-gold rounded-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-charcoal-900">
                    <Image
                      src={s.imageUrl}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-charcoal-900/90 border border-gold/30 px-2.5 py-1 rounded-sm text-xs text-gold">
                      <Users className="w-3.5 h-3.5" />
                      <span>{s.capacity}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="font-telugu text-xs text-gold mt-0.5">{s.teluguTitle}</p>
                    </div>

                    <p className="text-xs text-ivory/70 leading-relaxed line-clamp-3">
                      {s.description}
                    </p>

                    <ul className="space-y-1.5 pt-2">
                      {s.highlights.map((h, i) => (
                        <li key={i} className="flex items-center space-x-2 text-xs text-ivory/80">
                          <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light inline-flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button
                    href={`/booking?eventType=${encodeURIComponent(s.title)}`}
                    variant="primary"
                    size="sm"
                    className="text-xs"
                  >
                    Plan Event
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
