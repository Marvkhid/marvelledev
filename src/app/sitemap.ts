import type { MetadataRoute } from 'next';
import { nav, projects, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', ...nav.map((l) => l.href), ...projects.map((p) => `/projects/${p.slug}`)];
  const now = new Date();
  return pages.map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : path.startsWith('/projects/') ? 0.7 : 0.8,
  }));
}
