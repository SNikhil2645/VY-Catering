import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter, Noto_Sans_Telugu } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgressIndicator from '@/components/layout/ScrollProgressIndicator';

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const teluguFont = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#171411',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://venkyyadavcaterings.com'),
  title: {
    default: 'Venky Yadav Caterings | Premium Event & Wedding Catering in Tirupati',
    template: '%s | Venky Yadav Caterings',
  },
  description:
    'Venky Yadav Caterings — founded by Telavani Venkatesh. Signature wood-fire Hyderabadi mutton dum biryani, loose prawns, and traditional Andhra wedding feasts across Tirupati & Rayalaseema.',
  keywords: [
    'Venky Yadav Caterings',
    'Catering in Tirupati',
    'Wedding Catering Tirupati',
    'Venky Yadav Cafe',
    'Rayalaseema catering',
    'Hyderabadi mutton dum biryani Tirupati',
    'Outdoor live cooking',
    'Banana leaf sadhya Tirupati',
  ],
  authors: [{ name: 'Telavani Venkatesh (Venky Yadav)' }],
  openGraph: {
    title: 'Venky Yadav Caterings — Every Celebration Deserves a Feast',
    description:
      'Grand wedding feasts, wood-fire dum biryani, and traditional Andhra hospitality by Venky Yadav in Tirupati.',
    url: 'https://venkyyadavcaterings.com',
    siteName: 'Venky Yadav Caterings',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Venky Yadav Caterings',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    founder: {
      '@type': 'Person',
      name: 'Telavani Venkatesh (Venky Yadav)',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '22-11-46/2, Autonagar, SV Auto Nagar',
      addressLocality: 'Tirupati',
      addressRegion: 'Andhra Pradesh',
      postalCode: '517501',
      addressCountry: 'IN',
    },
    telephone: '+916304005185',
    servesCuisine: ['Andhra', 'Hyderabadi', 'South Indian', 'Rayalaseema'],
    priceRange: '₹₹₹',
    url: 'https://venkyyadavcaterings.com',
  };

  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} ${teluguFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-charcoal text-ivory antialiased">
        <ScrollProgressIndicator />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
