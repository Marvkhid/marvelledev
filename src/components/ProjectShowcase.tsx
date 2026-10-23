import Image from 'next/image';
import { Reveal } from './Reveal';
import type { Project } from '@/lib/site';

export function ProjectShowcase({ p }: { p: Project }) {
  return (
    <Reveal className="pj">
      <div className="lap">
        {p.shot ? <Image src={p.shot} alt={`${p.name} website screenshot`} fill sizes="600px" /> : <span>Screenshot placeholder<br />Add /public/images/projects/{p.slug}.jpg and set <code>shot</code> in site.ts</span>}
      </div>
      <div>
        <p className="st-p">{p.statusLabel}</p>
        <h3 style={{ fontSize: 32 }}>{p.name}</h3>
        <p><b>{p.positioning}</b></p>
        <p className="mut">{p.summary}</p>
        <p className="mut"><b>My role:</b> {p.role}</p>
        <ul className="mut" style={{ paddingLeft: 18 }}>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
        <p>{p.tech.map((t) => <span className="tg" key={t}>{t}</span>)}</p>
        <a className="btn" style={{ marginTop: 14 }} href={p.url} target="_blank" rel="noopener noreferrer">{p.cta} ↗</a>
      </div>
    </Reveal>
  );
}
