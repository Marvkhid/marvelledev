import Link from 'next/link';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { Reveal } from '@/components/Reveal';
import { projects } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta('Projects', 'NG Law Digest, E&E Studios and Kova Shop: curated projects built around real business needs.', '/projects');

const story = [
  ['The need', 'Ebere needed a better way to present his business and make pricing or discount information easy for prospective customers to reach.'],
  ['The challenge', 'Move fast without losing sight of the business goal, and design and build the interface within the same two days.'],
  ['The solution', 'I designed and built the E&E Studios website as a digital presentation and customer-engagement tool.'],
  ['The lesson', 'The best websites are not built to impress other developers. They are built to solve problems for the people who use them.'],
];

export default function Projects() {
  return (
    <section className="w">
      <p className="tag">// Projects</p>
      <h2>Curated launches, each built around a real need.</h2>
      <p className="mut lead">A selection of products I’ve built or am building. Status is shown honestly on each.</p>
      {projects.map((p) => <ProjectShowcase key={p.slug} p={p} />)}
      <Reveal className="card" ><div>
        <p className="tag">// The Ebere story</p>
        <h2 style={{ fontSize: 'clamp(26px,4vw,38px)' }}>Two Days. One Urgent Business Need. A Digital Solution.</h2>
        <div className="tl" style={{ marginTop: 18 }}>{story.map(([t, d], i) => <div className="card" key={t}><b>0{i + 1} · {t}</b><p className="mut" style={{ margin: '8px 0 0' }}>{d}</p></div>)}</div>
        <p className="mut" style={{ marginTop: 16 }}>No customer numbers or revenue claims are made for this project.</p>
      </div></Reveal>
      <div className="row" style={{ justifyContent: 'center' }}><Link className="btn" href="/contact">Let’s Discuss Your Project</Link></div>
    </section>
  );
}
