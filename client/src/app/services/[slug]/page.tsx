import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Utensils, CheckCircle, ArrowLeft, Phone, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import KolamDivider from '@/components/layout/KolamDivider';

interface ServiceDetail {
  slug: string;
  title: string;
  teluguTitle: string;
  tagline: string;
  description: string;
  capacity: string;
  serviceFormat: string;
  imageUrl: string;
  sampleMenu: { course: string; items: string[] }[];
  processNotes: string;
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'wedding-catering': {
    slug: 'wedding-catering',
    title: 'Royal Wedding & Muhurtham Catering',
    teluguTitle: 'పెళ్లి ముహూర్తం విందు',
    tagline: 'An Unforgettable Royal Feast for Your Sacred Union',
    description:
      'In Telugu tradition, a wedding feast is the crowning memory of the muhurtham. We manage full catering logistics for weddings starting from 350 to 1,700+ guests. Whether you desire a traditional Vedic sit-down banana-leaf sadhya or a grand modern multi-cuisine buffet, Venky Yadav Caterings ensures timely, piping-hot serving with authentic Rayalaseema and Hyderabadi flavors.',
    capacity: '350 – 1,700+ Guests',
    serviceFormat: 'Traditional Banana Leaf Sadhya or Grand Buffet',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    sampleMenu: [
      {
        course: 'Traditional Welcome & Tiffins',
        items: ['MLA Pesarattu with Upma', 'Ghee Karam Dosa', 'Filter Coffee & Fresh Coconut Water'],
      },
      {
        course: 'Live Starters & Appetizers',
        items: ['Crispy Andhra Loose Prawns', 'Spicy Chicken Roast Fry', 'Classic Veg Manchurian'],
      },
      {
        course: 'The Grand Main Course',
        items: [
          'Authentic Hyderabadi Mutton Dum Biryani',
          'Mirchi ka Salan & Dahi Raita',
          'Gutti Vankaya Kura (Stuffed Brinjal)',
          'Bendakaya Chepala Pulusu',
          'Tirupati Sambhar Rice & Tomato Pappu with Pure Desi Ghee',
        ],
      },
      {
        course: 'Royal Sweet Conclusion',
        items: ['Double ka Meetha with Dry Fruits', 'Desi Ghee Bellam Payasam', 'Live Hot Jalebi with Rabri'],
      },
    ],
    processNotes:
      'We set up our mobile outdoor firewood cooking cauldrons at least 10 hours prior to the feast. Dedicated serving captains and kitchen staff ensure every guest experiences royal hospitality.',
  },
  'reception-catering': {
    slug: 'reception-catering',
    title: 'Grand Evening Reception Banquets',
    teluguTitle: 'వివాహ రిసెప్షన్ విందు',
    tagline: 'High-Energy Evening Banquets with Live Stalls',
    description:
      'Evening wedding receptions in Tirupati call for glamor, aroma, and vibrant live counters. From sizzling tandoori grills and live street chaat stations to slow-cooked Nizami mutton biryani, we create a lively dining atmosphere that captivates every guest.',
    capacity: '300 – 1,500+ Guests',
    serviceFormat: 'Grand Multi-Cuisine Buffet + Live Stalls',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
    sampleMenu: [
      {
        course: 'Live Street & Chaat Counters',
        items: ['Pani Puri with 3 Flavored Waters', 'Dahi Puri & Sev Puri', 'Pav Bhaji & Chole Bhature'],
      },
      {
        course: 'Live Tandoor & Wok Counters',
        items: ['Paneer Tikka & Chicken Tikka', 'Butter Naan & Rumali Roti', 'Hakka Noodles & Manchuria'],
      },
      {
        course: 'The Main Spread',
        items: ['Hyderabadi Chicken Dum Biryani', 'Paneer Butter Masala', 'Dal Makhani', 'Bagara Rice'],
      },
      {
        course: 'Dessert Extravaganza',
        items: ['Qubani ka Meetha with Ice Cream', 'Gulab Jamun with Malai Rabri', 'Mocktail & Irani Chai Bar'],
      },
    ],
    processNotes:
      'Equipped with illuminated brass chafers, elegant serving stalls, and fast-paced live cooking stations to minimize queuing.',
  },
  'engagement-catering': {
    slug: 'engagement-catering',
    title: 'Engagement & Nischitartham Feasts',
    teluguTitle: 'నిశ్చితార్థం విందు',
    tagline: 'Uniting Families with Warm Andhra Hospitality',
    description:
      'Engagement ceremonies are the first intimate celebration where bride and groom families bond. We provide heartfelt hospitality with traditional Rayalaseema meals and festive sweets.',
    capacity: '150 – 500 Guests',
    serviceFormat: 'Sit-Down Banana Leaf or Buffet',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop',
    sampleMenu: [
      {
        course: 'Starters',
        items: ['Sweet Corn Vada', 'Chicken 65', 'Mirchi Bajji with Stuffed Peanuts'],
      },
      {
        course: 'Traditional Meal',
        items: ['Ragi Sangati with Natu Kodi Pulusu', 'Rayalaseema Mutton Curry', 'Gutti Vankaya', 'Curd Rice'],
      },
      {
        course: 'Sweets',
        items: ['Boondi Ladoo with Pure Ghee', 'Dry Fruit Halwa'],
      },
    ],
    processNotes:
      'Customized menu selection based on ancestral preferences of both families.',
  },
  'corporate-catering': {
    slug: 'corporate-catering',
    title: 'Corporate Galas & Conferences',
    teluguTitle: 'కార్పొరేట్ ఈవెంట్స్',
    tagline: 'Punctual, Hygienic, Executive Hospitality',
    description:
      'From annual general meetings and conferences to high-profile executive dinners, our corporate catering delivers punctual setup, impeccable hygiene, and balanced menus suitable for diverse palates.',
    capacity: '100 – 1,000+ Guests',
    serviceFormat: 'Executive Buffet & High-Tea Stations',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    sampleMenu: [
      {
        course: 'Executive Lunch / Dinner Spread',
        items: ['Aromatic Chicken Dum Biryani', 'Paneer Tikka Masala', 'Jeera Rice & Dal Tadka', 'Assorted Breads'],
      },
      {
        course: 'Salads & Accompaniments',
        items: ['Green Tossed Salad', 'Boondi Raita', 'Pickles & Papads'],
      },
      {
        course: 'High-Tea Counter',
        items: ['Irani Dum Chai & South Indian Filter Coffee', 'Assorted Cookies & Veg Cutlets'],
      },
    ],
    processNotes:
      'Strict adherence to conference agendas. Fast-turnaround setup and professional uniformed attendants.',
  },
  'gruhapravesham-catering': {
    slug: 'gruhapravesham-catering',
    title: 'Housewarming & Family Ceremonies',
    teluguTitle: 'గృహప్రవేశం భోజనం',
    tagline: 'Auspicious Satvik Feasts for Your New Home',
    description:
      'An auspicious housewarming deserves food prepared with pure mind and ingredients. We prepare ceremonial satvik meals without onion or garlic upon request, using pure cow ghee and authentic temple recipes.',
    capacity: '100 – 500 Guests',
    serviceFormat: 'Traditional Sit-Down Banana Leaf',
    imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=1200&auto=format&fit=crop',
    sampleMenu: [
      {
        course: 'Auspicious Sadhya',
        items: ['Chintapandu Pulihora', 'Gutti Vankaya', 'Tomato Pappu with Ghee', 'Dondakaya Fry with Cashews'],
      },
      {
        course: 'Rasam & Sambar',
        items: ['Tirumala Style Sambar', 'Pepper Cumin Rasam', 'Ghee Annam'],
      },
      {
        course: 'Ceremonial Sweets',
        items: ['Bellam Payasam (Jaggery Rice Pudding)', 'Ghee Boondi', 'Pakam Garelu'],
      },
    ],
    processNotes:
      'Cooked in sanitized copper and brass vessels adhering strictly to family religious customs.',
  },
  'outdoor-large-scale-catering': {
    slug: 'outdoor-large-scale-catering',
    title: 'Outdoor & Mega Gathering Catering',
    teluguTitle: 'భారీ బహిరంగ కేటరింగ్',
    tagline: 'Massive Field Kitchen Infrastructure for 1,500+ Guests',
    description:
      'Executing a mega gathering requires seasoned kitchen logistics. We deploy our comprehensive mobile field kitchens, huge cauldrons, water purifiers, and dedicated serving teams for political gatherings, temple brahmotsavams, and large community fests.',
    capacity: '500 – 2,500+ Guests',
    serviceFormat: 'Rapid Multi-Station Buffet or Community Sadhya',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    sampleMenu: [
      {
        course: 'High-Volume Mega Spread',
        items: ['Hyderabadi Dum Biryani cooked in 50kg degs', 'Veg Pulao with Korma', 'Sambhar Rice & Curd Rice'],
      },
      {
        course: 'Accompaniments & Desserts',
        items: ['Mirchi Salan & Raita', 'Sweet Boondi', 'Packaged Mineral Water'],
      },
    ],
    processNotes:
      'Complete field infrastructure including power backup, mobile fire-safety gear, and waste disposal management.',
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICE_DETAILS).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-gold-light"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-charcoal-900 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                Catering Service Offering
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory">
                {service.title}
              </h1>
              <p className="font-telugu text-gold text-sm">{service.teluguTitle}</p>
              <p className="text-ivory/80 text-base leading-relaxed pt-2">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-charcoal-800 border border-gold/30 px-3.5 py-2 rounded-sm text-xs text-gold">
                  <Users className="w-4 h-4" />
                  <span>Capacity: {service.capacity}</span>
                </div>
                <div className="flex items-center space-x-2 bg-charcoal-800 border border-gold/30 px-3.5 py-2 rounded-sm text-xs text-gold">
                  <Utensils className="w-4 h-4" />
                  <span>Format: {service.serviceFormat}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-80 sm:h-96 w-full rounded-sm overflow-hidden border-2 border-gold/40 shadow-2xl">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Menu Matrix */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-1">
              Curated Master Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory">
              Sample Spread for {service.title}
            </h2>
            <p className="text-xs text-ivory/60 mt-1">
              All dishes are fully customizable according to host preferences and regional traditions.
            </p>
            <KolamDivider variant="gold" className="pt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.sampleMenu.map((course, idx) => (
              <div
                key={idx}
                className="bg-charcoal-800 border border-gold/20 p-6 rounded-sm space-y-3"
              >
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-gold">
                    {course.course}
                  </h3>
                  <span className="text-[10px] text-ivory/40 uppercase tracking-widest">
                    Course {idx + 1}
                  </span>
                </div>
                <ul className="space-y-2">
                  {course.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start space-x-2 text-xs text-ivory/80">
                      <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Operational Notes */}
          <div className="p-6 bg-charcoal-800 border-l-4 border-gold rounded-sm space-y-2">
            <h4 className="font-serif font-bold text-gold text-sm">
              Kitchen & Logistics Execution:
            </h4>
            <p className="text-xs text-ivory/80 leading-relaxed">
              {service.processNotes}
            </p>
          </div>

          {/* Booking CTA */}
          <div className="p-8 bg-gradient-to-r from-maroon-900 to-charcoal border border-gold/40 rounded-sm text-center space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
              Ready to Plan This Event with Venky Yadav?
            </h3>
            <p className="text-xs sm:text-sm text-ivory/80 max-w-lg mx-auto">
              Tell us your expected guest count and event date. We will send you custom menu pricing within 24 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={`/booking?eventType=${encodeURIComponent(service.title)}`}
                variant="gold"
                size="md"
                icon={<Calendar className="w-4 h-4 text-charcoal" />}
              >
                Plan This Event Now
              </Button>
              <a
                href="tel:+916304005185"
                className="inline-flex items-center space-x-2 text-sm text-gold hover:text-gold-light border border-gold/30 hover:border-gold px-4 py-2.5 rounded-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Catering: +91 63040 05185</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
