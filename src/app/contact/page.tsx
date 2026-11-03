import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';
import { FAQ } from '@/lib/knowledge';
import { projects, site, waLink } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta(
  'Contact',
  'Tell Marvel Adeniyi what you are building. Email, call or send an enquiry for a website, application or backend project.',
  '/contact',
);

export default function Contact() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="wrap" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
        <p className="eyebrow">Contact</p>
        <h1 style={{ maxWidth: 820 }}>Tell me what you’re building.</h1>
        <p className="lead" style={{ marginTop: 16 }}>
          Every enquiry on this site comes to one inbox: {site.email}. Include the goal, the
          deadline if you have one, and anything already in place.
        </p>
      </section>

      <section className="wrap" style={{ paddingTop: 30 }}>
        <div className="contact-grid">
          <div>
            <h2 style={{ fontSize: 26 }}>Direct lines</h2>
            <ul className="contact-list">
              <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><span>Phone</span><a href={`tel:${site.phoneIntl}`}>{site.phoneDisplay}</a></li>
              <li><span>WhatsApp</span><a href={waLink('Hi Marvel, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer">Message me ↗</a></li>
              <li><span>Location</span><b>{site.location}</b></li>
            </ul>

            <h2 style={{ fontSize: 26, marginTop: 34 }}>Elsewhere</h2>
            <div className="p-tags" style={{ marginTop: 10 }}>
              {site.socials.map((s) => (
                <a className="chip" key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} · {s.handle} ↗
                </a>
              ))}
            </div>

            <p className="muted" style={{ marginTop: 28, fontSize: 14.5 }}>
              Working on something already? The {projects.length} projects on this site show how I
              scope, build and hand over. <Link className="link-arrow" href="/projects">See the work →</Link>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <p className="eyebrow">Before you ask</p>
          <h2 style={{ marginBottom: 10 }}>The questions that come up most.</h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
