import type { Metadata } from 'next';
import { site } from './site';

export function meta(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${site.name}`, description, url: path, siteName: site.name, type: 'website', images: [{ url: '/images/og.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${title} · ${site.name}`, description },
  };
}
