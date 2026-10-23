import Image from 'next/image';
import Link from 'next/link';
import { Gallery } from '@/components/Gallery';
import { Reveal } from '@/components/Reveal';
import { CvButton } from '@/components/CvButton';
import { workSteps, site } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta('About', `The story of ${site.person}: from curiosity about screens to building web solutions for customers.`, '/about');

const chapters = [
  ['01', 'Curiosity about screens', 'I wanted to know what happens behind the interface: how ideas become products people use every day.'],
  ['02', `University: ${site.education}`, `I majored in ${site.education}, learning to break big problems into smaller ones, design a solution and write the code.`],
  ['03', 'Building for customers', 'I began building web solutions for customers: first websites, then full stack applications with APIs and databases.'],
  ['04', 'Today', `${site.yearsExperience} years on, I think about the whole product: the problem, the people using it, the business behind it and the systems that make it work.`],
];

export default function About() {
  return (
    <section className="w">
      <p className="tag">// About</p>
      <h2>An Engineer by Training. A Builder by Instinct.</h2>
      <div className="sp" style={{ marginTop: 20 }}>
        <Reveal className="pf"><Image src="/images/portrait.jpg" alt="Portrait of Marvellous Adeniyi" fill priority sizes="(max-width:900px) 100vw, 480px" /></Reveal>
        <Reveal>
          <p className="lead">It started with screens.</p>
          <p className="mut lead">I’ve always been fascinated by how a tap, a click or a scroll turns into something useful. That curiosity pulled me toward software.</p>
          <div className="row"><CvButton variant="btn" /><Link className="btn2" href="/contact">Work with me</Link></div>
        </Reveal>
      </div>
      {chapters.map(([n, t, d]) => <Reveal as="section" className="ch" key={n}><span className="num">{n}</span><div><h3 style={{ fontSize: 30 }}>{t}</h3><p className="mut lead">{d}</p></div></Reveal>)}
      <div className="sp">
        <Reveal><p className="tag">// Off the keyboard</p><h2>Curious by default.</h2><p className="mut lead">I like understanding how real businesses present themselves, because that’s what I build for.</p></Reveal>
        <Reveal className="pf"><Image src="/images/jersey.jpg" alt="Marvel in a MARVEL 21 jersey, looking at a wall display" fill sizes="(max-width:900px) 100vw, 480px" /></Reveal>
      </div>
      <h2 style={{ margin: '64px 0 18px' }}>In the workspace</h2>
      <Gallery />
      <h2 style={{ margin: '56px 0 18px' }}>How I work</h2>
      <ol className="pr">{workSteps.map((s) => <li key={s}>{s}</li>)}</ol>
    </section>
  );
}
