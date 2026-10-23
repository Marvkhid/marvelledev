import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { nav, projects, site } from '@/lib/site';

export function Footer() {
  const heights = [40, 62, 34, 56, 44, 64, 36, 58, 42, 52];
  return (
    <footer className="ft">
      <div className="fx" aria-hidden="true">
        {heights.map((h, i) => <i key={i} className="t" style={{ height: h, animationDelay: `-${(i * 0.37).toFixed(2)}s` }} />)}
        <i className="e" style={{ left: '18%' }} /><i className="e" style={{ left: '50%', animationDelay: '-1.7s' }} /><i className="e" style={{ left: '76%', animationDelay: '-2.9s' }} />
      </div>
      <div className="fl" aria-hidden="true" />
      <div className="fin">
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 440 }}>
            <div className="lg"><Logo />MarvelleDev</div>
            <p style={{ font: "600 26px/1.25 var(--font-head)", margin: '16px 0' }}>Good ideas deserve more than a social media post. Let’s build them into something real.</p>
            <Link className="btn" href="/contact">Start a Project</Link>
          </div>
          <div style={{ lineHeight: 2.1, fontSize: 15 }}>
            <div className="tag" style={{ color: '#8FB0FF', margin: 0 }}>Pages</div>
            {nav.map((l) => <div key={l.href}><Link href={l.href}>{l.label}</Link></div>)}
          </div>
          <div style={{ lineHeight: 2.1, fontSize: 15 }}>
            <div className="tag" style={{ color: '#8FB0FF', margin: 0 }}>Projects</div>
            {projects.map((p) => <div key={p.slug}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name} ↗</a></div>)}
          </div>
          <div style={{ lineHeight: 2.1, fontSize: 15 }}>
            <div className="tag" style={{ color: '#8FB0FF', margin: 0 }}>Connect</div>
            <div><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><a href={`tel:${site.phoneIntl}`}>{site.phoneDisplay}</a></div>
            {site.socials.map((s) => <div key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></div>)}
            <div><a href={site.cvHref}>Download CV</a></div>
          </div>
        </div>
        <div style={{ marginTop: 36, paddingTop: 18, borderTop: '1px solid rgba(238,241,250,.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#A8B0C8' }}>
          <span>© {new Date().getFullYear()} MarvelleDev · {site.person}</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
