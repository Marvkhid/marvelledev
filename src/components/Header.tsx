'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { nav, site } from '@/lib/site';

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const cur = (href: string) => (href === '/' ? path === '/' : path.startsWith(href)) ? 'page' : undefined;
  return (
    <header className="hd">
      <div className="nb">
        <Link href="/" className="lg" aria-label="MarvelleDev home"><Logo />MarvelleDev</Link>
        <nav className="nav" aria-label="Main">
          {nav.map((l) => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
        </nav>
        <ThemeToggle />
        <Link className="btn dk" href="/contact">Start a Project</Link>
        <button type="button" className="ib mb" aria-expanded={open} aria-controls="mm" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
      <div id="mm" className="mm" hidden={!open}>
        {nav.map((l) => <Link key={l.href} href={l.href} aria-current={cur(l.href)}>{l.label}</Link>)}
        <div style={{ paddingTop: 14, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ border: 0, padding: 0 }}>{s.label} ↗</a>)}
        </div>
      </div>
    </header>
  );
}
