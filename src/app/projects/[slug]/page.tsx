import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { projects, projectBySlug, site } from '@/lib/site';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  const url = `/projects/${p.slug}`;
  const description = `${p.name}: ${p.summary}`;
  return {
    title: p.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${p.name} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: 'article',
      images: [{ url: p.shot, width: 1440, height: 900, alt: `${p.name} homepage` }],
    },
    twitter: { card: 'summary_large_image', title: `${p.name} · ${site.name}`, description },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="wrap cs-hero">
        <div>
          <p className="eyebrow">{p.kind}</p>
          <h1>{p.name}</h1>
          <p className="lead" style={{ marginTop: 18 }}>{p.tagline}</p>
          <div className="row" style={{ marginTop: 24 }}>
            <a className="btn" href={p.url} target="_blank" rel="noopener noreferrer">Open the live site ↗</a>
            <Link className="btn-ghost" href="/projects">All projects</Link>
          </div>
        </div>
        <div className="cs-meta">
          <div>Role<b>{p.contribution.split(':')[0]}</b></div>
          <div>Type<b>{p.kind}</b></div>
          <div>Stack<b>{p.tech.join(' · ')}</b></div>
          <div>Status<b>{p.kind === 'In progress' ? 'Live, listings pending' : 'Live'}</b></div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 36 }}>
        <Reveal>
          <div className="cs-shot">
            <div className="cs-browser" aria-hidden="true">
              <i /><i /><i />
              <span>{p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
            </div>
            <Image
              src={p.shot}
              alt={`${p.name} homepage screenshot`}
              width={1440}
              height={900}
              priority
              sizes="(max-width: 1200px) 100vw, 1150px"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </Reveal>
        <p className="mono muted" style={{ marginTop: 12 }}>Captured from {p.url.replace(/^https?:\/\//, '')} at 1440 × 900.</p>
      </section>

      <section className="section">
        <div className="wrap cs-body">
          <div>
            <div className="cs-block">
              <p className="eyebrow">The problem</p>
              <h2>What was broken before the build.</h2>
              <p>{p.problem}</p>
            </div>

            <div className="cs-block">
              <p className="eyebrow">What I built</p>
              <h2>My part, in plain terms.</h2>
              <p>{p.contribution}</p>
              <p className="muted">{p.summary}</p>
            </div>

            <div className="cs-block">
              <p className="eyebrow">In the product</p>
              <h2>What it does today.</h2>
              <ul className="cs-list">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>

            {p.note && (
              <div className="cs-block">
                <p className="eyebrow">Status note</p>
                <p>{p.note}</p>
              </div>
            )}
          </div>

          <aside>
            <div className="cs-aside">
              <h3>Stack</h3>
              <div>{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>

              <h3 style={{ marginTop: 22 }}>Links</h3>
              <ul className="cs-list" style={{ marginTop: 4 }}>
                <li><a className="link-arrow" href={p.url} target="_blank" rel="noopener noreferrer">Live site <span>↗</span></a></li>
                <li><Link className="link-arrow" href="/contact">Discuss a similar build <span>→</span></Link></li>
              </ul>

              {p.shotMobile && (
                <>
                  <h3 style={{ marginTop: 24 }}>On a phone</h3>
                  <div className="mobile-shot">
                    <Image src={p.shotMobile} alt={`${p.name} on a mobile screen`} fill sizes="280px" />
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>

      <div className="wrap">
        <div className="next">
          <span className="mono muted">Next project</span>
          <Link className="link-arrow" href={`/projects/${next.slug}`} style={{ fontSize: 20 }}>
            {next.name} <span>→</span>
          </Link>
        </div>
      </div>

      <CtaBand
        title="Want something like this?"
        body="I can walk you through the decisions in this build and what a version for your business would take."
        primary={{ label: 'Start a conversation', href: '/contact' }}
      />
    </>
  );
}
