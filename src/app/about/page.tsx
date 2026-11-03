import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';
import { photos, site, workProcess } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta(
  'About Marvel Adeniyi',
  'Full-stack software developer in Lagos. B.Eng. Computer Engineering, Ekiti State University, with software engineering as my specialisation.',
  '/about',
);

export default function About() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
        <div className="split">
          <div>
            <p className="eyebrow">About</p>
            <h1>I build the whole product, not just the screen.</h1>
            <p className="lead" style={{ marginTop: 18 }}>
              I’m Marvel Adeniyi, a full-stack software developer in {site.location}. I take a
              problem from a blank page to something people use: the interface, the API, the database
              and the deployment.
            </p>
            <div className="row" style={{ marginTop: 22 }}>
              <Link className="btn" href="/contact">Work with me</Link>
              <Link className="btn-ghost" href="/projects">See the work</Link>
            </div>
          </div>
          <Reveal className="media tall">
            <Image src="/images/portrait.jpg" alt="Portrait of Marvel Adeniyi" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
          </Reveal>
        </div>

        <div className="fact-row">
          <div className="fact">Degree<b>{site.education}</b></div>
          <div className="fact">Specialisation<b>{site.specialisation}</b></div>
          <div className="fact">Experience<b>{site.yearsExperience} years building</b></div>
          <div className="fact">Focus<b>Full-stack · Web products</b></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split">
            <Reveal>
              <p className="eyebrow">How I got here</p>
              <h2>Engineering first, then the product.</h2>
              <p className="lead" style={{ marginTop: 14 }}>
                Computer Engineering taught me to break a problem down and build the system that
                solves it. Software engineering was the part I chose to specialise in.
              </p>
              <p className="muted">
                The first paid work was websites for small businesses: a photographer, a gym, a phone
                shop. Each one started with the same question — what does this business need to
                happen next? That question is what turned into building applications: accounts,
                records, invoices, dashboards.
              </p>
              <p className="muted">
                Today I work across React and Next.js on the front, NestJS and Node on the back, and
                PostgreSQL underneath. I still test in the browser with real data before I call
                anything finished, and I would rather tell you a feature is not ready than ship
                something that only looks finished.
              </p>
            </Reveal>
            <Reveal className="media" style={{ transitionDelay: '100ms' }}>
              <Image src={photos.planning.src} alt={photos.planning.alt} fill sizes="(max-width: 900px) 100vw, 42vw" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How I work</p>
          <h2>Short projects, visible progress.</h2>
          <div className="steps">
            {workProcess.map((s) => (
              <div className="step" key={s.step}>
                <span>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="split" style={{ marginTop: 48 }}>
            <Reveal className="media">
              <Image src={photos.team.src} alt={photos.team.alt} fill sizes="(max-width: 900px) 100vw, 46vw" />
            </Reveal>
            <Reveal>
              <h2>What you can expect.</h2>
              <ul className="cs-list" style={{ marginTop: 14 }}>
                <li>A scope and a price before work starts, not after.</li>
                <li>The build deployed early so you can click it, not just look at screenshots.</li>
                <li>Honest status: what works, what is pending, what I would change.</li>
                <li>Support after launch for the things real users find.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="If that sounds like the developer you need, say hello."
        body="Recruiters, teams and business owners all get the same answer: what I can do, what it costs and when it can be live."
        primary={{ label: 'Contact me', href: '/contact' }}
        secondary={{ label: 'Read the case studies', href: '/projects' }}
      />
    </>
  );
}
