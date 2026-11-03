'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { nav, site } from '@/lib/site';

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const isCurrent = (href: string) => (href === '/' ? path === '/' : path.startsWith(href)) ? 'page' : undefined;

  // Route changes always close the menu.
  useEffect(() => { setOpen(false); }, [path]);

  // Outside click, Escape and desktop resize all close the menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const header = headerRef.current;
      if (header && e.target instanceof Node && !header.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onResize = () => { if (window.innerWidth > 820) setOpen(false); };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="hd" ref={headerRef}>
      <div className="nb">
        <Link href="/" className="brand" aria-label="MarvelleDev, home">
          <Logo size={30} />
          <span>MarvelleDev<small>Marvel Adeniyi</small></span>
        </Link>

        <nav className="nav" aria-label="Main">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isCurrent(l.href)}>{l.label}</Link>
          ))}
        </nav>

        <ThemeToggle />
        <Link className="btn btn-sm" href="/contact">Let&apos;s talk</Link>

        <button
          type="button"
          ref={btnRef}
          className="icon-btn menu-btn"
          aria-expanded={open}
          aria-controls="mm"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      <div id="mm" className="mm" hidden={!open}>
        {nav.map((l) => (
          <Link key={l.href} href={l.href} aria-current={isCurrent(l.href)} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}>Start a project</Link>
        <div className="mm-foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
          ))}
        </div>
      </div>
    </header>
  );
}
