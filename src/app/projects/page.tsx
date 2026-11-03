import Image from 'next/image';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';
import { photos, projects, site } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta(
  'Work',
  'Six live products by Marvel Adeniyi: legal publishing, marketplace, money tracking, retail, fitness and photography.',
  '/projects',
);

export default function Projects() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
        <p className="eyebrow">Work</p>
        <h1 style={{ maxWidth: 900 }}>Products I designed and built, live.</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Every card is a deployed site, and every screenshot was captured from it. Client work is
          labelled; anything unfinished says so.
        </p>
        <p className="mono muted" style={{ marginTop: 14 }}>
          {projects.length} projects · {projects.filter((p) => p.kind === 'Client work').length} client · {projects.filter((p) => p.kind === 'Product').length} product · {projects.filter((p) => p.kind === 'In progress').length} in progress
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 20 }}>
        <div className="p-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <ProjectCard project={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="split" style={{ marginTop: 40 }}>
          <div>
            <p className="eyebrow">How I describe the work</p>
            <h2>No invented numbers.</h2>
            <p className="lead">
              You will not find a claim here about revenue, users or conversion rates that a live
              site cannot support. Where a result is a design decision, I say so.
            </p>
            <p className="muted">
              If you want the detail behind a project — architecture, data model, trade-offs — ask
              me directly, or ask Marvel Assistant, the assistant in the corner of this site.
            </p>
          </div>
          <Reveal className="media" style={{ transitionDelay: '100ms' }}>
            <Image src={photos.office.src} alt={photos.office.alt} fill sizes="(max-width: 900px) 100vw, 42vw" />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Your project could be next."
        body="Tell me what it has to do, who it is for and when it needs to be live. I’ll tell you what is realistic."
        primary={{ label: 'Start a conversation', href: '/contact' }}
        secondary={{ label: `Email ${site.email}`, href: `mailto:${site.email}` }}
      />
    </>
  );
}
