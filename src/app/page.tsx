import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Marquee } from '@/components/Marquee';
import { ArchDiagram } from '@/components/ArchDiagram';
import { Gallery } from '@/components/Gallery';
import { CvButton } from '@/components/CvButton';
import { benefits, industries, projects, site } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta('Full Stack Developer building websites that grow brands', 'MarvelleDev builds websites, web applications and digital products that help brands earn trust, attract customers and grow beyond social media.', '/');

const systems = [
  ['Booking and enquiry flows', 'Give customers a clear next step: book, request a quote or message you.'],
  ['Dashboards and CMS', 'Admin tools so you can manage content and operations without touching code.'],
  ['Database-backed workflows', 'Users, roles and records that keep your data organised.'],
  ['Integrations', 'APIs, WhatsApp contact and payments where specified.'],
];

export default function Home() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: site.person, alternateName: site.name, url: site.url, email: site.email, jobTitle: 'Full Stack Software Developer', sameAs: site.socials.map((s) => s.href) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="w hero">
        <div>
          <p className="tag">// Full Stack Developer · Digital Solutions</p>
          <h1>Your Next Competitive Advantage Starts With <em>Code.</em></h1>
          <p className="lead" style={{ margin: '20px 0 10px' }}>I build digital experiences that help brands earn trust, attract customers, and grow beyond social media.</p>
          <p className="mut" style={{ maxWidth: 560 }}>I’m Marvellous, a Full Stack Developer with {site.yearsExperience} years of experience turning ideas into websites, web applications, and digital products built around real problems.</p>
          <div className="row">
            <Link className="btn" href="/contact">Build Something With Me</Link>
            <Link className="btn2" href="/projects">Explore My Work</Link>
            <CvButton />
          </div>
          <div className="scroll" aria-hidden="true"><i />SCROLL</div>
        </div>
        <div className="stage">
          <Image src="/images/portrait.jpg" alt="Portrait of Marvellous Adeniyi" fill priority sizes="(max-width:900px) 100vw, 520px" />
          <div className="chip c1">$ ship --idea<br /><b>→ working product ✓</b></div>
          <div className="chip c2">Next.js · NestJS · PostgreSQL</div>
          <div className="chip c3">{site.yearsExperience} years building for the web</div>
        </div>
      </section>
      <Marquee />

      <section className="w">
        <p className="tag">// Who are you building for?</p>
        <h2>Whatever you sell, your customers are already checking you online.</h2>
        <div className="g" style={{ marginTop: 26 }}>
          {industries.map((i) => (
            <Reveal key={i.tag}><Link href="/why-a-website" className="card"><span className="tag">{i.tag}</span><h3>{i.q}</h3><p className="mut">{i.a}</p><span className="st-l">See why →</span></Link></Reveal>
          ))}
        </div>
      </section>

      <section className="w">
        <p className="tag">// What you stand to get</p>
        <h2>What a website can do for your business.</h2>
        <p className="mut lead">Results depend on traffic, offer and trust, but this is what a well-built site puts in your hands.</p>
        <div className="g" style={{ marginTop: 26 }}>
          {benefits.map(([t, d], i) => <Reveal key={t}><div className="card"><span className="tag">0{i + 1}</span><h3>{t}</h3><p className="mut">{d}</p></div></Reveal>)}
        </div>
      </section>

      <section className="w">
        <Reveal className="card sp"><div style={{ padding: 16 }}>
          <div><div className="big">2</div><p className="tag">days</p></div></div>
          <div><p className="tag">// Fast timelines</p><h2>A website can be live in two days, depending on how fast you need it.</h2>
            <p className="mut">For E&amp;E Studios, I designed the interface and built the site within two days to meet an urgent business need. Timelines depend on scope, content and how quickly feedback arrives, and we agree one up front.</p>
            <Link className="btn" href="/contact">Tell me your deadline</Link></div>
        </Reveal>
      </section>

      <section className="w">
        <p className="tag">// Systems, not just websites</p>
        <h2>I build systems that help businesses grow.</h2>
        <p className="mut lead">A pretty page isn’t the goal. A working system around your business is.</p>
        <div className="g" style={{ marginTop: 26 }}>{systems.map(([t, d]) => <Reveal key={t}><div className="card"><h3>{t}</h3><p className="mut">{d}</p></div></Reveal>)}</div>
      </section>

      <section className="w">
        <Reveal className="card" ><div style={{ padding: 16 }}>
          <p className="tag">// Maintenance</p><h2>Launch is day one, not the finish line.</h2>
          <p className="mut lead">Websites need care. I offer maintenance and technical support: bug fixes, UI and responsive improvements, performance checks and feature enhancements as your business grows.</p>
          <Link className="btn2" href="/services">See services</Link></div>
        </Reveal>
      </section>

      <section className="w">
        <p className="tag">// Engineering</p>
        <h2>Built on Engineering. Driven by Possibility.</h2>
        <p className="mut lead">I understand systems, not just screens, so interfaces, APIs and databases work as one product.</p>
        <div className="g" style={{ marginTop: 28 }}>
          <Reveal><div className="card"><h3>Frontend</h3><p className="mut">React.js, Next.js, TypeScript, responsive interfaces, component architecture, UI performance.</p></div></Reveal>
          <Reveal><div className="card"><h3>Backend</h3><p className="mut">Node.js, NestJS, REST APIs, authentication and authorisation, server-side application logic.</p></div></Reveal>
          <Reveal><div className="card"><h3>Data &amp; Infrastructure</h3><p className="mut">PostgreSQL, Prisma, database design and integration, API integration, application deployment.</p></div></Reveal>
        </div>
        <ArchDiagram />
      </section>

      <section className="w">
        <p className="tag">// Featured work</p><h2>Products, not just pages.</h2>
        {projects.map((p) => <Reveal key={p.slug}><Link href="/projects" className="card" style={{ marginBottom: 16 }}><span className="st-p">{p.statusLabel}</span><h3>{p.name}</h3><span className="mut">{p.positioning}</span></Link></Reveal>)}
      </section>

      <section className="w">
        <div className="sp">
          <Reveal className="pf"><Image src="/images/jersey.jpg" alt="Marvel in a MARVEL 21 jersey, looking at a wall display" fill sizes="(max-width:900px) 100vw, 480px" /></Reveal>
          <Reveal><p className="tag">// My story</p><h2>It started with screens.</h2><p className="mut lead">I fell for screens, studied {site.education} at university, then started building web solutions for real customers.</p><Link className="btn" href="/about">Read my story</Link></Reveal>
        </div>
      </section>

      <section className="w">
        <p className="tag">// Inside the workspace</p><h2>Where the work happens.</h2>
        <Gallery />
      </section>

      <section className="w">
        <Reveal className="card" ><div style={{ padding: 16, textAlign: 'center' }}>
          <h2>Good ideas deserve more than a social media post.</h2>
          <p className="mut lead" style={{ margin: '0 auto' }}>Rented attention comes and goes. A website is your digital home.</p>
          <div className="row" style={{ justifyContent: 'center' }}><Link className="btn" href="/why-a-website">Why every brand needs one</Link><Link className="btn2" href="/contact">Start a project</Link></div></div>
        </Reveal>
      </section>
    </>
  );
}
