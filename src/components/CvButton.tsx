import { site } from '@/lib/site';

export function CvButton({ variant = 'lnk' }: { variant?: 'lnk' | 'btn' }) {
  return <a className={variant} href={site.cvHref} download>Download My CV ↓</a>;
}
