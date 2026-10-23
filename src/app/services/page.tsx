import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { services } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta('Services', 'Business websites, e-commerce, custom web applications, content management systems and ongoing improvements.', '/services');

export default function Services() {
  return (
    <section className="w">
      <p className="tag">// Services</p>
      <h2>Your Business Has Potential. Let’s Build the Digital Infrastructure to Match.</h2>
      <div className="g" style={{ marginTop: 28 }}>
        {services.map((s, i) => (
          <Reveal key={s.title}><div className="card"><span className="tag">0{i + 1}</span><h3>{s.title}</h3><p className="mut">{s.for}</p><ul className="mut" style={{ paddingLeft: 18 }}>{s.items.map((x) => <li key={x}>{x}</li>)}</ul></div></Reveal>
        ))}
      </div>
      <Reveal className="card" ><div style={{ marginTop: 0 }}>
        <h3>Accessible pricing</h3>
        <p className="mut">I’ve made my services more accessible because I want to work with more businesses, solve meaningful problems, and build long-term partnerships. Whether you’re launching your first website or improving an existing digital product, we’ll discuss your objectives, define the scope, and agree on a solution that makes sense for your business and budget.</p>
        <p className="mut">Pricing depends on scope, complexity, integrations, content requirements and delivery timelines.</p>
        <Link className="btn" href="/contact">Let’s Discuss Your Project</Link>
      </div></Reveal>
    </section>
  );
}
