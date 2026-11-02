import React from 'react';
import Link from 'next/link';
import { Calendar, Users, Utensils, CheckCircle, Sparkles, HeartHandshake, Landmark, Briefcase, PartyPopper } from 'lucide-react';
import KolamDivider from '@/components/layout/KolamDivider';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'All Functions We Cater | Weddings, Family, Religious & Corporate Events',
  description:
    'Comprehensive event catering directory by Venky Yadav Caterings in Tirupati. Explore menus, guest guidance, and serving styles for over 25 traditional and modern celebrations.',
};

const FUNCTION_GROUPS = [
  {
    group: 'A. Wedding & Pre-Wedding Celebrations',
    icon: Sparkles,
    badgeColor: 'gold',
    items: [
      {
        name: 'Wedding / Muhurtham (పెళ్లి ముహూర్తం)',
        desc: 'Traditional ceremonial banana-leaf sadhya or grand buffet for 350 to 1,700+ guests with authentic wood-fire mutton dum biryani and pure ghee sweets.',
        style: 'Banana-leaf Sadhya or Grand Buffet',
        guests: '350 – 1,700+',
      },
      {
        name: 'Reception Celebrations (వివాహ రిసెప్షన్)',
        desc: 'Glamorous evening banquet featuring live chaat, pasta, tandoor stations, hot loose prawns, and an elaborate dessert parlor.',
        style: 'Multi-Cuisine Buffet + Live Counters',
        guests: '300 – 1,500+',
      },
      {
        name: 'Engagement / Nischitartham (నిశ్చితార్థం)',
        desc: 'Auspicious gathering welcoming the union with customary Rayalaseema ragi sangati, mutton gravies, or royal tiffins.',
        style: 'Sit-down or Buffet',
        guests: '150 – 500',
      },
      {
        name: 'Haldi & Pellikuthuru (పసుపు వేడుక)',
        desc: 'Vibrant daytime feast with live street chaats, refreshing buttermilk and mocktails, followed by a hearty traditional meal.',
        style: 'Buffet + Live Street Counters',
        guests: '100 – 350',
      },
      {
        name: 'Mehendi & Sangeet Night',
        desc: 'High-energy celebration with bite-sized starters, finger foods, mocktail lounges, and late-night biryani.',
        style: 'Buffet + Live Finger Food',
        guests: '150 – 400',
      },
      {
        name: 'Baraat / Groom’s Procession Welcome',
        desc: 'Instant welcome coolers, hot filter coffee, Irani chai, and savory snack counters to refresh guests upon arrival.',
        style: 'High-Tea & Beverage Counters',
        guests: '100 – 300',
      },
    ],
  },
  {
    group: 'B. Family & Life Milestone Events',
    icon: HeartHandshake,
    badgeColor: 'banana',
    items: [
      {
        name: 'Housewarming / Gruhapravesham (గృహప్రవేశం)',
        desc: 'Auspicious traditional satvik meals prepared with pure cow ghee and pristine temple recipes for house blessings.',
        style: 'Ceremonial Banana-Leaf Sadhya',
        guests: '100 – 400',
      },
      {
        name: 'Milestone & Kids Birthdays (పుట్టినరోజు)',
        desc: 'Customized kid-friendly live stations (noodles, mini dosas, nuggets) alongside rich family biryani spreads.',
        style: 'Buffet with Interactive Live Stalls',
        guests: '80 – 350',
      },
      {
        name: 'Baby Shower / Seemantham (శ్రీమంతం)',
        desc: 'Traditional five-variety rice feast (pulihora, curd rice, coconut rice, sweet pongal, chitrannam) for maternal blessings.',
        style: 'Traditional Sit-Down Sadhya',
        guests: '100 – 300',
      },
      {
        name: 'Naming Ceremony / Namakaranam (నామకరణం)',
        desc: 'Joyful family feast with fresh tiffins, authentic sweets, and wholesome regional vegetarian or non-vegetarian meals.',
        style: 'Sit-down or Buffet',
        guests: '80 – 250',
      },
      {
        name: 'Annaprasana / First Rice (అన్నప్రాశన)',
        desc: 'Sacred first solid food ceremony with pristine satvik payasam and ceremonial family meal.',
        style: 'Traditional Banana Leaf',
        guests: '80 – 200',
      },
      {
        name: 'Thread Ceremony / Upanayanam (ఉపనయనం)',
        desc: 'Strict satvik Vedic sadhya prepared without onion or garlic, honoring solemn family rituals.',
        style: 'Pure Satvik Sadhya',
        guests: '100 – 300',
      },
      {
        name: 'Golden / Silver Anniversaries',
        desc: 'Celebratory family banquet honoring long years of marriage with multi-course dining and custom cakes.',
        style: 'Grand Buffet',
        guests: '100 – 400',
      },
    ],
  },
  {
    group: 'C. Religious, Temple & Festival Feasts',
    icon: Landmark,
    badgeColor: 'maroon',
    items: [
      {
        name: 'Annadanam & Charitable Feasts (అన్నదానం)',
        desc: 'High-volume sacred feeding for devotees and pilgrims in Tirupati with piping hot sambar rice, pulihora, and sweet prasadam.',
        style: 'Rapid Continuous Community Service',
        guests: '500 – 2,500+',
      },
      {
        name: 'Temple Festivals & Brahmotsavam Gatherings',
        desc: 'Authentic satvik temple catering prepared with utmost devotion for festival committees and community gatherings.',
        style: 'Prasadam Bhojanam',
        guests: '300 – 1,500+',
      },
      {
        name: 'Festival Feasts (Sankranti, Ugadi, Dasara, Deepavali)',
        desc: 'Seasonal festival menus featuring festive bobbatlu, bellam payasam, gutti vankaya, and regional specialties.',
        style: 'Festive Sadhya or Buffet',
        guests: '150 – 500',
      },
    ],
  },
  {
    group: 'D. Corporate & Institutional Gatherings',
    icon: Briefcase,
    badgeColor: 'gold',
    items: [
      {
        name: 'Corporate Conferences & Seminars',
        desc: 'Punctual, hygienic executive buffets with balanced north-south menus and continuous high-tea service.',
        style: 'Executive Buffet & Live Tea Bar',
        guests: '100 – 1,000+',
      },
      {
        name: 'Annual Day & Gala Dinners',
        desc: 'Lavish dinners with multi-cuisine counters, sizzling kebabs, and gourmet dessert spreads for company staff.',
        style: 'Grand Corporate Gala Buffet',
        guests: '200 – 1,200+',
      },
      {
        name: 'Product Launches & Office Inaugurations',
        desc: 'Sophisticated finger food counters, welcome mocktails, and polished presentation for business VIPs.',
        style: 'Executive High-Tea & Canape Counter',
        guests: '80 – 400',
      },
      {
        name: 'College Fests & Youth Meets',
        desc: 'High-volume dynamic catering with fast-food stalls, biryani pots, and refreshing drink stations.',
        style: 'High-Speed Multiple Counters',
        guests: '400 – 2,000+',
      },
    ],
  },
  {
    group: 'E. Social, Private & Outdoor Celebrations',
    icon: PartyPopper,
    badgeColor: 'banana',
    items: [
      {
        name: 'Farmhouse & Outdoor Weekend Feasts',
        desc: 'Rustic live wood-fire cooking on farm lawns, featuring slow-cooked biryanis, boti fry, and barbecue skewers.',
        style: 'Live Earthen Fire Pit Counters',
        guests: '50 – 250',
      },
      {
        name: 'Private Intimate Dinners',
        desc: 'Curated home catering for high-profile family dinners with bespoke menu customization.',
        style: 'Plated or Intimate Buffet',
        guests: '50 – 150',
      },
      {
        name: 'Film Crew & Production Catering',
        desc: 'Timely 3-meal hot catering (breakfast, lunch, evening snacks) on outdoor shooting locations in Chittoor region.',
        style: 'Location Field Kitchen',
        guests: '80 – 300',
      },
    ],
  },
];

export default function FunctionsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Banner */}
      <section className="py-16 bg-charcoal-900 border-b border-gold/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-maroon/30 text-gold border border-gold/40 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Event Directory</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-4">
            All Functions We Cater
          </h1>
          <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            From 25+ auspicious traditional milestones to executive corporate galas. Every function receives customized menu planning, serving format guidance, and seamless booking.
          </p>
          <KolamDivider variant="gold" className="pt-4" />
        </div>
      </section>

      {/* Function Taxonomies */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {FUNCTION_GROUPS.map((group, groupIdx) => {
            const Icon = group.icon;
            return (
              <div key={groupIdx} className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-gold/30 pb-3">
                  <div className="w-8 h-8 rounded-sm bg-maroon/40 border border-gold/40 flex items-center justify-center text-gold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                    {group.group}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-charcoal-800 border border-white/10 hover:border-gold rounded-sm p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="space-y-3">
                        <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-ivory/70 leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-ivory/60">
                            <span>Serving Style:</span>
                            <span className="font-medium text-ivory text-right">{item.style}</span>
                          </div>
                          <div className="flex items-center justify-between text-ivory/60">
                            <span>Recommended Guests:</span>
                            <span className="font-semibold text-gold">{item.guests}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10">
                        <Button
                          href={`/booking?eventType=${encodeURIComponent(item.name.split('(')[0].trim())}`}
                          variant="outline"
                          size="sm"
                          className="w-full text-xs"
                        >
                          Plan This Function
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
