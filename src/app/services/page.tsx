import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';
import { services, site, workProcess } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta(
  'Services',
  'Business websites, e-commerce, full-stack applications, custom software, API development and maintenance — frontend and backend.',
  '/services',
);

export default function Services() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
        <p className="eyebrow">Services</p>
        <h1 style={{ maxWidth: 880 }}>Websites, applications and the systems behind them.</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          I build on both sides of the product — the interface a customer sees and the API, database
          and logic that make it work. Scope and price are agreed before anything is built.
        </p>
      </section>

      <section className="wrap" style={{ paddingTop: 34 }}>
        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
              <article className="svc">
                <div className="svc-img">
                  <Image src={s.image} alt={s.alt} fill sizes="160px" />
                </div>
                <div className="svc-body">
                  <h3>{s.title}</h3>
                  <p>{s.for}</p>
                  <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Process</p>
          <h2>Agreed up front, reviewed as it goes.</h2>
          <div className="steps">
            {workProcess.map((s) => (
              <div className="step" key={s.step}>
                <span>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 22, maxWidth: 680 }}>
            Pricing depends on scope, integrations and how much content exists already. Send the
            details through the contact form and you will get a number, not a range that means
            nothing. Questions about email, hosting or a deadline go to {site.email}.
          </p>
        </div>
      </section>

      <CtaBand
        title="Tell me what the business needs to do."
        body="A short brief is enough to start. I’ll reply with the approach, what it takes and what it costs."
        primary={{ label: 'Start a project', href: '/contact' }}
        secondary={{ label: 'See the work', href: '/projects' }}
      />
    </>
  );
}
