import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://venkyyadavcaterings.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/services/wedding-catering',
    '/services/reception-catering',
    '/services/engagement-catering',
    '/services/corporate-catering',
    '/services/gruhapravesham-catering',
    '/services/outdoor-large-scale-catering',
    '/functions',
    '/menu',
    '/gallery',
    '/cafe',
    '/booking',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/menu' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/booking' || route === '/services' ? 0.9 : 0.7,
  }));
}
