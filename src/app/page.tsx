import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Marquee } from '@/components/Marquee';
import { ArchDiagram } from '@/components/ArchDiagram';
import { ProjectCard } from '@/components/ProjectCard';
import { CtaBand } from '@/components/CtaBand';
import { WorldCanvas } from '@/components/WorldCanvas';
import { ReelStrip } from '@/components/ReelStrip';
import { ProcessFilm } from '@/components/ProcessFilm';
import { capabilities, featured, highlights, photos, services, site, stack } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta(
  'Marvel Adeniyi — Full-Stack Software Developer',
  'I build digital products that solve real problems: websites, web applications and the systems behind them. React, Next.js, Node, NestJS and PostgreSQL.',
  '/',
);

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.person,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Ekiti State University' },
    knowsAbout: stack.map((s) => s.name),
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero — the world */}
      <section className="world" id="hero" data-chapter="Opening">
        <WorldCanvas />
        <div className="wrap hero">
        <div>
          <span className="hero-status"><i /> Available for work · {site.location}</span>
          <h1>I build digital products that solve real problems.</h1>
          <p className="lead">
            I’m Marvel Adeniyi, a full-stack software developer. I design and build websites, web
            applications and the systems behind them — frontend, API and database.
          </p>
          <div className="row">
            <Link className="btn" href="/projects">View my work</Link>
            <Link className="btn-ghost" href="/contact">Let’s work together</Link>
          </div>
          <div className="fact-row">
            <div className="fact">Experience<b>{site.yearsExperience} years</b></div>
            <div className="fact">Stack<b>React · Node · PostgreSQL</b></div>
            <div className="fact">Based in<b>{site.location}</b></div>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-frame">
            <Image
              src="/images/portrait.jpg"
              alt="Marvel Adeniyi, full-stack software developer"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <div className="hero-chip">
              <span><b>Building now</b><br />SettleNG · money tracking</span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to begin</span>
          <i />
        </div>
      </section>

      <Marquee items={stack.map((s) => s.name)} />

      {/* Selected work */}
      <section className="section" id="work" data-chapter="Selected work">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2>Six products. Every screenshot from the live site.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Client work, product builds and one marketplace still in progress — described honestly,
              with the part I actually built.
            </p>
          </Reveal>

          <div className="p-grid featured-grid" style={{ marginTop: 36 }}>
            {featured.map((p, i) => (
              <Reveal key={p.slug} style={{ transitionDelay: `${i * 70}ms` }}>
                <ProjectCard project={p} priority={i === 0} />
              </Reveal>
            ))}
          </div>

          <div className="row" style={{ marginTop: 30 }}>
            <Link className="btn-ghost" href="/projects">See all six projects</Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section" id="impact" data-chapter="Impact">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Built with purpose. Delivered with impact.</p>
            <h2>What the work actually says.</h2>
          </Reveal>
          <div className="hl-grid" style={{ marginTop: 32 }}>
            {highlights.map((h, i) => (
              <Reveal key={h.title} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="hl">
                  <b>{h.value}<small>{h.unit}</small></b>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                  <Link className="link-arrow" href={h.href}>See it <span>→</span></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" id="craft" data-chapter="What I do">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <p className="eyebrow">What I do</p>
              <h2>Frontend, backend and the database between them.</h2>
              <p className="lead" style={{ marginTop: 14 }}>
                I work across the stack, so a screen, an endpoint and a table are designed together
                instead of handed between three people.
              </p>
              <div className="caps" style={{ marginTop: 26 }}>
                {capabilities.map((c) => (
                  <div className="cap" key={c.title}>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <span className="mono">{c.tech}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="media" style={{ transitionDelay: '120ms' }}>
              <Image src={photos.team.src} alt={photos.team.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
            </Reveal>
          </div>
          <ArchDiagram />
        </div>
      </section>

      {/* Services strip */}
      <section className="section" id="services" data-chapter="Services">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2>What I can build for a business.</h2>
          </Reveal>
          <div className="g-chips">
            {services.map((s) => (
              <Link className="chip chip-lg" key={s.title} href="/services">{s.title} →</Link>
            ))}
          </div>
          <div className="row" style={{ marginTop: 26 }}>
            <Link className="btn-ghost" href="/services">How I work with clients</Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section" id="about-me" data-chapter="About">
        <div className="wrap">
          <div className="split rev">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2>An engineer who ships, not a designer who stops at mockups.</h2>
              <p className="lead" style={{ marginTop: 14 }}>
                I studied Computer Engineering at Ekiti State University and chose software
                engineering as my specialisation. Since then I’ve built for law publishing, retail,
                fitness, photography and small-business finance.
              </p>
              <p className="muted">
                I care about the whole product: the problem, the person using it, the data behind it
                and whether it still works six months after launch.
              </p>
              <div className="row" style={{ marginTop: 22 }}>
                <Link className="btn" href="/about">More about me</Link>
                <Link className="link-arrow" href="/projects">See the work <span>→</span></Link>
              </div>
            </Reveal>
            <Reveal className="media tall" style={{ transitionDelay: '100ms' }}>
              <Image src="/images/jersey.jpg" alt="Marvel Adeniyi at a display in a MARVEL 21 jersey" fill sizes="(max-width: 900px) 100vw, 42vw" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" id="process" data-chapter="Process">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2>Four steps, no surprises.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              The whole process, start to launch — played out scene by scene.
            </p>
          </Reveal>
          <Reveal style={{ marginTop: 34 }}>
            <ProcessFilm />
          </Reveal>
        </div>
      </section>

      <ReelStrip />

      <CtaBand />
    </>
  );
}
