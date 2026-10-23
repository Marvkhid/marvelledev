import type { MetadataRoute } from 'next';
import { nav, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((l) => ({ url: `${site.url}${l.href === '/' ? '' : l.href}`, changeFrequency: 'monthly', priority: l.href === '/' ? 1 : 0.7 }));
}
