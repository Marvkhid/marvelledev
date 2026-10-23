import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';
import { FAQ } from '@/lib/knowledge';
import { site, waLink } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta('Contact', 'Tell Marvellous what you’re building. Email, call, WhatsApp or use the contact form.', '/contact');

export default function Contact() {
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <section className="w">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <p className="tag">// Contact</p>
      <h2>Tell Me What You’re Building.</h2>
      <p className="mut lead">Whether you need a business website, a custom web application, or a better digital experience for your customers, let’s discuss the problem and work out the right solution.</p>
      <div className="g" style={{ marginTop: 28, alignItems: 'start' }}>
        <div>
          <p><a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent('Project enquiry')}`}>Email {site.email}</a></p>
          <p><a className="btn2" href={`tel:${site.phoneIntl}`}>Call {site.phoneDisplay}</a></p>
          <p><a className="btn2" href={waLink('Hi Marvellous, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></p>
          <p style={{ marginTop: 18 }}>{site.socials.map((s) => <a key={s.label} className="ss" href={s.href} target="_blank" rel="noopener noreferrer">{s.label} · {s.handle} ↗</a>)}</p>
        </div>
        <ContactForm />
      </div>
      <h2 style={{ margin: '64px 0 8px' }}>Frequently asked questions</h2>
      <Faq />
    </section>
  );
}
