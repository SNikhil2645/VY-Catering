import React from 'react';
import Image from 'next/image';
import Link from 'next/image';
import { Award, Flame, Heart, MapPin, Users, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About Venky Yadav & Our Culinary Story',
  description:
    'Learn about Telavani Venkatesh (Venky Yadav), founder of Venky Yadav Caterings in Tirupati. Dedicated to authentic wood-fire cooking, traditional Andhra flavours, and royal hospitality.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Banner */}
      <section className="py-16 bg-charcoal-900 border-b border-gold/30 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Founder & Heritage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-4">
            The Story Behind the Feast
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Founded by <strong>Telavani Venkatesh (Venky Yadav)</strong> in Tirupati, driven by an uncompromising obsession with authentic taste, traditional wood-fire handis, and generous Andhra hospitality.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>
      </section>

      {/* Founder Profile & Philosophy */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Founder Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative h-96 sm:h-[500px] w-full rounded-sm overflow-hidden border-2 border-gold/40 shadow-2xl bg-charcoal-800">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
                  alt="Founder Telavani Venkatesh - Venky Yadav Catering Leadership"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-charcoal-900/90 border border-gold/40 rounded-sm">
                  <h3 className="font-serif text-xl font-bold text-ivory">Telavani Venkatesh</h3>
                  <p className="text-gold text-xs font-medium">Founder & Master Caterer • Venky Yadav</p>
                  <p className="font-telugu text-xs text-ivory/60 mt-0.5">వెంకీ యాదవ్ — తిరుపతి</p>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                Roots in Rayalaseema
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
                &ldquo;A Wedding Feast Must Be Talked About for Generations.&rdquo;
              </h2>

              <p className="text-sm leading-relaxed text-ivory/80">
                In Andhra Pradesh, especially in Tirupati and the broader Rayalaseema belt, an event’s success is judged above all by the food. Guests travel hundreds of miles to bless brides and grooms, and the host family’s honor rests on the fragrance of the dum biryani and the warmth of the hospitality.
              </p>

              <p className="text-sm leading-relaxed text-ivory/80">
                Telavani Venkatesh, affectionately called <strong>Venky Yadav</strong> by thousands across Tirupati, founded the catering house with a simple principle: <em>no compromises on oil, no shortcuts on firewood, and zero artificial coloring or flavor packets</em>.
              </p>

              <div className="p-4 bg-charcoal-800 border-l-2 border-gold rounded-sm space-y-2">
                <h4 className="font-serif font-bold text-gold text-sm">
                  Our Unbending Culinary Commandments:
                </h4>
                <ul className="text-xs text-ivory/80 space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>Always aged long-grain basmati for authentic dum kacchi biryanis.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>Hand-inspected cuts of baby mutton and morning coastal seafood catches.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>Pure desi ghee in every traditional sweet and tiffin course.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <Button href="/booking" variant="primary" size="md">
                  Plan Your Event with Us
                </Button>
                <Button href="/gallery" variant="outline" size="md">
                  Explore Past Banquets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Excellence */}
      <section className="py-20 bg-charcoal-800 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-2">
              Why Families Trust Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              The Four Pillars of Venky Yadav Caterings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-700/60 border border-white/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-maroon/30 text-gold flex items-center justify-center mb-4">
                <Flame className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ivory mb-2">
                Wood-Fire Dum Prowess
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">
                Large copper and brass handis sealed with dough and fired using dried acacia logs on-site for deep earthen aroma.
              </p>
            </div>

            <div className="bg-charcoal-700/60 border border-white/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-maroon/30 text-gold flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ivory mb-2">
                Capacity 350 to 1,700+
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">
                Seasoned serving captains and kitchen logistics capable of hot, synchronized serving for mega celebrations.
              </p>
            </div>

            <div className="bg-charcoal-700/60 border border-white/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-maroon/30 text-gold flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ivory mb-2">
                Pristine Hygiene
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">
                RO purified cooking water, food-grade brass and steel vessels, uniformed kitchen crew, and clean serving stalls.
              </p>
            </div>

            <div className="bg-charcoal-700/60 border border-white/10 p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-maroon/30 text-gold flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ivory mb-2">
                Warm Family Care
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">
                Venky Yadav personally coordinates major weddings, ensuring the host family can enjoy the rituals stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
