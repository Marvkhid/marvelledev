import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { nav, projects, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div>
            <Link href="/" className="brand" aria-label="MarvelleDev, home"><Logo size={28} /><span>MarvelleDev</span></Link>
            <p className="muted" style={{ marginTop: 14, maxWidth: 280, fontSize: 14.5 }}>
              Full-stack software development for businesses that need working products, not brochures.
            </p>
            <a className="btn btn-sm" href={`mailto:${site.email}?subject=${encodeURIComponent('Project enquiry')}`} style={{ marginTop: 8 }}>Email me</a>
          </div>

          <div>
            <h4>Pages</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              {nav.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h4>Projects</h4>
            <ul>
              {projects.map((p) => (
                <li key={p.slug}><Link href={`/projects/${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phoneIntl}`}>{site.phoneDisplay}</a></li>
              {site.socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft-bot">
          <span>© {new Date().getFullYear()} {site.person} · {site.location}</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
