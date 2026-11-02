import React from 'react';
import Image from 'next/image';
import { Coffee, Pizza, Flame, MapPin, Phone, Clock, ArrowRight, Sparkles, Navigation, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import KolamDivider from '@/components/layout/KolamDivider';

export const metadata = {
  title: 'Venky Yadav Cafe | 4 AM Maska Bun & Irani Chai Destination in Tirupati',
  description:
    'Discover Venky Yadav Cafe on Renigunta Road, Tirupati. Famous for 4 AM Maska Bun, slow-brewed Irani chai, 9-inch fusion pizzas, and crispy peri peri fried chicken.',
};

const CAFE_HIGHLIGHTS = [
  {
    title: '4 AM Maska Bun & Irani Dum Chai',
    desc: 'Soft, oven-fresh pav warmed and sliced with a generous dollop of chilled creamy butter, paired with slow-simmered, rich cardamom-infused Irani chai.',
    tag: 'Signature Morning Ritual',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
    price: '₹60 onwards',
  },
  {
    title: 'Gongura & Peri Peri 9-inch Pizzas',
    desc: 'Crispy stone-baked crust layered with tangy Andhra gongura masala, mozzarella blend, smoked chicken or roasted paneer.',
    tag: 'Desi Fusion Specialty',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    price: '₹240 – ₹369 (Provisional)',
  },
  {
    title: 'Crispy Peri Peri Fried Chicken',
    desc: 'Golden battered juicy chicken wings, lollipops, and leg pieces dusted in house peri peri spice mix, served with garlic dip.',
    tag: 'Late Night Favorite',
    imageUrl: 'https://images.unsplash.com/photo-1527477378377-6a161b9e1151?q=80&w=800&auto=format&fit=crop',
    price: '₹130 – ₹250 (Provisional)',
  },
];

export default function CafePage() {
  return (
    <div className="pt-24 pb-20">
      {/* Cinematic Cafe Hero with Warm Marigold & Wood Palette */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-20 bg-wood-dark border-b border-marigold/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1920&auto=format&fit=crop"
            alt="Steaming Irani Chai and Fresh Maska Bun at Venky Yadav Cafe"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105 transform animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-wood-dark/80 to-charcoal/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-marigold/20 border border-marigold/40 text-marigold text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Coffee className="w-4 h-4" />
            <span>Tirupati’s Early Morning Food Destination</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-ivory leading-tight">
            Venky Yadav Cafe <br />
            <span className="text-marigold italic font-serif">4 AM Maska Bun & Irani Chai.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-ivory/80 leading-relaxed font-normal">
            Whether you are catching the early morning pilgrim breeze or meeting friends late into the night, experience Tirupati’s warmest casual hangout on Renigunta Road.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://maps.google.com/?q=Venky+Yadav+Cafe+Tirupati"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-marigold hover:bg-marigold-hover text-charcoal font-bold px-7 py-3.5 rounded-sm text-sm shadow-xl transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>

            <a
              href="tel:+918328129450"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-charcoal/80 border border-marigold/40 hover:border-marigold text-marigold font-semibold px-6 py-3.5 rounded-sm text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Cafe: +91 83281 29450</span>
            </a>
          </div>
        </div>
      </section>

      {/* Signature Specialties */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-marigold font-semibold block mb-2">
              Cafe Teaser Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Crowd Favorites on Renigunta Road
            </h2>
            <p className="text-xs text-ivory/60 mt-1">
              * Displayed prices are provisional and subject to in-store confirmation. Full live ordering platform launching in v2.
            </p>
            <KolamDivider variant="gold" className="pt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAFE_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-charcoal-800 border border-marigold/20 hover:border-marigold rounded-sm overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-charcoal-900">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-charcoal-900/90 border border-marigold/40 text-marigold text-[10px] font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xl font-bold text-ivory group-hover:text-marigold transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-ivory/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs">
                  <span className="text-marigold font-bold">{item.price}</span>
                  <span className="text-[10px] text-ivory/40 uppercase tracking-wider">Available Daily</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Visiting Info */}
      <section className="py-16 bg-charcoal-800 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal-900 border-2 border-marigold/40 rounded-sm p-8 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-marigold font-semibold">
                Visit Us Today
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                Venky Yadav Cafe Location
              </h3>
              
              <div className="space-y-3 text-sm text-ivory/80 pt-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-marigold mt-1 flex-shrink-0" />
                  <span>
                    20-7-60/A, Renigunta–Tirupati Road, Subash Nagar, Sujatha Nagar, Kothapalli, Tirupati, Andhra Pradesh 517501, India.
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-marigold flex-shrink-0" />
                  <a href="tel:+918328129450" className="hover:text-marigold font-semibold">
                    +91 83281 29450
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-marigold mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-ivory/70">
                    <p className="font-semibold text-ivory">Operating Hours:</p>
                    <p>Open 24 Hours (Claimed by owner, subject to in-store confirmation)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Venky+Yadav+Cafe+Tirupati"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-marigold hover:bg-marigold-hover text-charcoal font-semibold px-5 py-2.5 rounded-sm text-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href="tel:+918328129450"
                  className="inline-flex items-center space-x-2 border border-marigold/40 text-marigold hover:bg-marigold/10 px-4 py-2.5 rounded-sm text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Ahead</span>
                </a>
              </div>
            </div>

            <div className="bg-charcoal-800 border border-marigold/30 p-6 rounded-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-marigold/20 text-marigold mx-auto flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-ivory">
                Looking to Order Catering Instead?
              </h4>
              <p className="text-xs text-ivory/70 leading-relaxed">
                If you are planning a wedding, reception, or corporate feast, switch over to our full catering service for 350 to 1,700+ guests.
              </p>
              <Button href="/booking" variant="primary" size="sm" className="w-full">
                Go to Catering Booking
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
