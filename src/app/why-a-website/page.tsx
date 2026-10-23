import Link from 'next/link';
import { Calculator } from '@/components/Calculator';
import { Reveal } from '@/components/Reveal';
import { industries } from '@/lib/site';
import { meta } from '@/lib/seo';

export const metadata = meta('Why Your Business Needs a Website', 'Social media is rented attention. A website is your digital home: credibility, clarity and a clear next step for every customer.', '/why-a-website');

function Chapter({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return <Reveal as="section" className="ch"><span className="num">{n}</span><div><h2>{title}</h2>{children}</div></Reveal>;
}

export default function Why() {
  return (
    <section className="w">
      <p className="tag">// A story for every entrepreneur</p>
      <h1>Your Social Media Is Rented Attention. Your Website Is Your Digital Home.</h1>
      <p className="mut lead" style={{ marginTop: 20 }}>Whatever you sell, here is the story of what happens when a customer goes looking for you, and why a website changes how it ends.</p>

      <Chapter n="01" title="You’re open for business. Online, can anyone tell?"><p className="mut lead">Someone hears about you from a friend. Before they call, they search your name. In that moment, your business exists only as far as they can find it.</p></Chapter>
      <Chapter n="02" title="The 30-second test"><p className="mut lead">Visitors quickly ask: who are you, can I trust you, what do you offer, and how do I reach or book you? If the answers are scattered across captions and chats, many will simply move on.</p></Chapter>
      <Chapter n="03" title="Rented attention"><p className="mut lead">Social media is wonderful for discovery and community. But posts get buried, formats change and you don’t control the platform. A website is the home you own: your message, your structure, your next step. This isn’t about abandoning social media. It’s about giving that attention somewhere to land.</p></Chapter>
      <Chapter n="04" title="The ApexBuild story">
        <div className="card">
          <p className="tag">Illustrative scenario</p>
          <p>Imagine losing a ₦25 million construction opportunity, not because your company lacks the skill to deliver the project, but because the person looking for a contractor could not quickly establish your credibility.</p>
          <p className="mut">ApexBuild has an Instagram full of finished buildings, a Facebook page and a WhatsApp number. But a property developer comparing contractors wants completed projects, services, locations, credentials, a clear process and a way to request a quote, in one place. Instead they scroll captions, or call a competitor whose online presence made the decision easier.</p>
          <p className="mut">That is not a claim that a website guarantees a contract. It’s a reminder that how your business presents itself can influence whether a potential customer takes the next step. Will they find a professional digital home for your business, or have to piece your credibility together from scattered posts?</p>
        </div>
      </Chapter>
      <Chapter n="05" title="A storefront that works while you sleep"><p className="mut lead">A makeup artist’s clients can view the portfolio, compare packages and book at midnight. A restaurant can show its menu and hours. A fashion brand can organise collections. The website answers, so you don’t have to repeat yourself.</p></Chapter>
      <Chapter n="06" title="Your brand, your rules"><p className="mut lead">Your own look, your own words, your own domain and email. That consistency signals care, and care builds trust.</p></Chapter>
      <Chapter n="07" title="It grows with you"><p className="mut lead">Start simple. Later add booking, payments, a dashboard or a content system. Good foundations mean you add features instead of starting over.</p></Chapter>
      <Chapter n="08" title="Let’s talk about the numbers.">
        <p className="mut">A website’s commercial performance depends on traffic quality, offer relevance, pricing, user experience, trust and the clarity of the next step. Here is a clearly hypothetical scenario: 1,000 relevant visitors a month, 3% enquire (30 enquiries), 20% of those become customers (6), at an average sale of ₦150,000 is ₦900,000 in gross sales. These figures are not a guarantee or a claim about any client’s results, and gross sales are not profit. Try your own numbers:</p>
        <Calculator />
      </Chapter>
      <Chapter n="09" title="Is there a version of this for you?">
        <div className="g">{industries.map((i) => <div className="card" key={i.tag}><span className="tag">{i.tag}</span><p className="mut">{i.a}</p></div>)}</div>
      </Chapter>
      <Chapter n="10" title="“But I already have Instagram.”">
        <details><summary>Do I still need a website?</summary><p className="mut">Keep Instagram for discovery. Add a website for credibility, clarity and conversion.</p></details>
        <details><summary>I’m too small for a website.</summary><p className="mut">Small businesses benefit from being easy to trust and easy to book.</p></details>
        <details><summary>Is it expensive?</summary><p className="mut">My charges are deliberately accessible. Pricing depends on scope, complexity, integrations and timeline, and a site can be live in as little as two days if you need it quickly.</p></details>
      </Chapter>
      <Reveal className="card"><div style={{ textAlign: 'center', padding: 16 }}>
        <h2>Your turn.</h2>
        <p className="mut lead" style={{ margin: '0 auto' }}>Will your next customer find a professional digital home, or piece your credibility together from scattered posts?</p>
        <div className="row" style={{ justifyContent: 'center' }}><Link className="btn" href="/contact">Let’s Discuss Your Project</Link><Link className="btn2" href="/projects">See my work</Link></div>
      </div></Reveal>
    </section>
  );
}
