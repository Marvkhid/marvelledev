import Link from 'next/link';
import { site, waLink } from '@/lib/site';

export function CtaBand({
  title = 'Have a project in mind? Let’s build it.',
  body = 'Tell me what you are building and what has to work. I’ll come back with a scope, a timeline and a straight answer on cost.',
  primary = { label: 'Start a conversation', href: '/contact' },
  secondary,
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <div className="row">
              <Link className="btn" href={primary.href}>{primary.label}</Link>
              {secondary
                ? <Link className="btn-ghost" href={secondary.href}>{secondary.label}</Link>
                : <a className="btn-ghost" href={waLink('Hi Marvel, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
            </div>
          </div>
          <div className="cta-mark">
            {site.person}<br />
            {site.role}
          </div>
        </div>
      </div>
    </section>
  );
}
