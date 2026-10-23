import { projects, site, services, type Link } from './site';

export type KB = { id: string; title: string; keywords: string[]; answer: string; links?: Link[] };
export type Faq = { q: string; a: string };

const contact: Link = { label: 'Contact page', href: '/contact' };
const P = Object.fromEntries(projects.map((p) => [p.slug, p]));
const live = (slug: string): Link => ({ label: `Open ${P[slug].name}`, href: P[slug].url, external: true });

// The authoritative source of facts about Marvellous. Edit here; nothing else hardcodes personal facts.
export const KNOWLEDGE: KB[] = [
  { id: 'about', title: 'Who is Marvellous', keywords: ['who is', 'marvellous', 'marvelous', 'marvel', 'developer', 'about him', 'tell me about'], answer: `${site.person} is a full stack developer behind ${site.name}, with ${site.yearsExperience} years of experience building websites and web applications. He studied ${site.education} at university, and I’m his AI assistant, not Marvellous himself.`, links: [{ label: 'About page', href: '/about' }] },
  { id: 'background', title: 'Background', keywords: ['background', 'university', 'degree', 'studied', 'education', 'engineering', 'story', 'journey', 'started'], answer: `Marvellous became fascinated by screens, studied ${site.education} at university, then started building web solutions for customers. He moved from websites into full stack development: frontend, backend, APIs and databases.`, links: [{ label: 'His story', href: '/about' }] },
  { id: 'skills', title: 'Technologies', keywords: ['technology', 'technologies', 'tech', 'stack', 'skills', 'react', 'next', 'typescript', 'node', 'nest', 'postgres', 'prisma', 'language', 'tools'], answer: 'His stack includes React, Next.js, TypeScript, JavaScript, Node.js, NestJS, PostgreSQL, Prisma and REST APIs, with responsive web development throughout. I can’t rank his depth in each tool, but these are the technologies he works with.' },
  { id: 'projects', title: 'Projects overview', keywords: ['projects', 'portfolio', 'work', 'built', 'examples', 'previous', 'show me'], answer: 'Three projects are featured: NG Law Digest (a legal publishing platform), E&E Studios (a creative business website, UI designed and built in two days) and Kova Shop (a marketplace still in progress).', links: [{ label: 'See projects', href: '/projects' }] },
  { id: 'ng', title: 'NG Law Digest', keywords: ['ng law', 'law digest', 'legal', 'nglawdigest', 'publishing', 'cms'], answer: `NG Law Digest is a legal publishing platform with content management capabilities. Marvellous worked on its development, including content publishing workflows and administrative functionality. I don’t have further implementation details, so ask him directly for specifics.`, links: [live('ng-law-digest')] },
  { id: 'ee', title: 'E&E Studios', keywords: ['e&e', 'ee studios', 'eestudios', 'ebere', 'two days', '2 days', 'photography', 'creative'], answer: 'E&E Studios is a website for a creative business. Marvellous designed the user interface and built the site within two days so customers could easily access pricing and discount information. I don’t have customer numbers or business results for it.', links: [live('ee-studios')] },
  { id: 'kova', title: 'Kova Shop', keywords: ['kova', 'marketplace', 'sellers', 'buyers', 'shop'], answer: 'Kova Shop is an ongoing marketplace project intended to support sellers and buyers through structured product discovery. It’s still in progress, so I can’t confirm which features are complete, and payments shouldn’t be assumed to be live.', links: [live('kova-shop')] },
  { id: 'services', title: 'Services', keywords: ['services', 'offer', 'what kind', 'build', 'landing page', 'web app', 'application', 'redesign', 'api', 'full stack', 'ecommerce', 'e-commerce', 'dashboard'], answer: `He offers: ${services.map((s) => s.title).join('; ')}. Scope and deliverables are agreed per project.`, links: [{ label: 'Services', href: '/services' }] },
  { id: 'pricing', title: 'Pricing', keywords: ['price', 'prices', 'pricing', 'cost', 'how much', 'budget', 'charge', 'rate', 'fee', 'afford', 'cheap'], answer: 'I don’t have confirmed prices to share. Marvellous keeps his charges deliberately accessible, and pricing depends on scope, complexity, integrations, content and timeline. Share your project details and he’ll scope it with you.', links: [contact] },
  { id: 'timeline', title: 'Timelines', keywords: ['how long', 'timeline', 'deadline', 'duration', 'fast', 'quick', 'urgent', 'days', 'weeks', 'turnaround'], answer: 'It depends on scope, content and how quickly feedback arrives. For E&E Studios, the UI design and build were completed within two days to meet an urgent need. A timeline is agreed up front for each project.', links: [contact] },
  { id: 'hire', title: 'Hiring and quotes', keywords: ['hire', 'quote', 'quotation', 'start a project', 'work with', 'build me', 'need a website', 'my business', 'get started', 'enquiry', 'inquiry'], answer: 'Happy to help you get ready. Tell me what your business does, what the website should achieve, whether you already have one, and your timeline. Then send those details through the contact page or WhatsApp. I can’t submit an enquiry for you.', links: [contact] },
  { id: 'business', title: 'Why a website', keywords: ['why website', 'need a website', 'instagram', 'social media', 'benefit', 'construction', 'makeup', 'restaurant', 'church', 'credib', 'customers'], answer: 'Social media is great for discovery, but a website gives customers one place to check credibility, see your offer and take the next step: book, enquire or buy. It’s a possibility, not a guarantee of sales, and results depend on traffic, offer and trust.', links: [{ label: 'Why a website', href: '/why-a-website' }] },
  { id: 'cv', title: 'CV', keywords: ['cv', 'resume', 'résumé', 'download'], answer: 'You can download Marvellous’s CV with the Download My CV button on the home and About pages.', links: [{ label: 'About page', href: '/about' }] },
  { id: 'referral', title: 'Referral programme', keywords: ['referral', 'refer', 'commission', 'bonus', 'introduce', 'reward'], answer: 'The referral programme rewards introductions that become agreed projects. The bonus amount and conditions are published once configured, and I don’t have a figure to quote.', links: [{ label: 'Referral page', href: '/referral' }] },
  { id: 'contact', title: 'Contact', keywords: ['contact', 'email', 'phone', 'call', 'whatsapp', 'reach', 'tiktok', 'instagram', 'linkedin', 'social'], answer: `Email ${site.email}, phone ${site.phoneDisplay}, or find him on TikTok and Instagram at @marvelledev.`, links: [contact] },
  { id: 'maintenance', title: 'Maintenance', keywords: ['maintenance', 'support', 'fix', 'bug', 'update', 'improve'], answer: 'Yes: improvements and maintenance cover bug fixes, UI and responsive corrections, performance review, feature enhancements and technical support.', links: [{ label: 'Services', href: '/services' }] },
  { id: 'payments', title: 'Payments', keywords: ['payment', 'payments', 'paystack', 'flutterwave', 'stripe', 'checkout', 'pay online'], answer: 'Payment integration can be included where a project specifies it. Details such as the provider are scoped per project.', links: [contact] },
  { id: 'process', title: 'Process', keywords: ['process', 'how do you work', 'approach', 'steps'], answer: 'Understand the problem, define the outcome, plan the user experience, choose the architecture, build and test, deploy, then improve from real usage.' },
];

export const FAQ: Faq[] = [
  { q: 'Who is Marvellous Emmanuel?', a: `${site.person} is a full stack developer who runs ${site.name}, building websites and web applications for businesses.` },
  { q: 'What does MarvelleDev do?', a: 'MarvelleDev designs and builds business websites, e-commerce and product sites, custom web applications, content management systems and ongoing improvements.' },
  { q: 'What is your background?', a: `I studied ${site.education} at university, then started building web solutions for customers.` },
  { q: 'How long have you been building websites?', a: `Over ${site.yearsExperience} years, from websites to full stack applications.` },
  { q: 'What technologies do you work with?', a: 'React, Next.js, TypeScript, JavaScript, Node.js, NestJS, PostgreSQL, Prisma and REST APIs.' },
  { q: 'Can you build a website for a small business?', a: 'Yes. Business websites include responsive design, enquiry forms, WhatsApp contact and launch support, scoped to your goals.' },
  { q: 'Can you develop a full stack web application?', a: 'Yes: frontend interfaces, backend services, authentication, APIs and database-backed workflows.' },
  { q: 'How much does a website cost?', a: 'My charges are deliberately accessible. Pricing depends on scope, complexity, integrations, content and timeline, so I scope each project with you.' },
  { q: 'How long does it take to build a website?', a: 'It depends on scope and how quickly content and feedback arrive. E&E Studios was designed and built in two days to meet an urgent need.' },
  { q: 'Can you redesign an existing website?', a: 'Yes. Improvements can include UI changes, responsive fixes, performance investigation and new features.' },
  { q: 'Can you integrate payment systems?', a: 'Where a project specifies it, yes. Payment integration is scoped per project.' },
  { q: 'Can you build an administrative dashboard?', a: 'Yes. Dashboards, role-based access and content management interfaces are part of the custom application and CMS services.' },
  { q: 'Do you offer website maintenance?', a: 'Yes: bug fixes, UI and responsive improvements, performance review and technical support.' },
  { q: 'Will my website work on mobile devices?', a: 'Yes. Every site is built to be responsive.' },
  { q: 'Can you help my business attract customers?', a: 'A good website can make your business easier to find, trust and enquire with. I can’t guarantee rankings or sales, which also depend on traffic and your offer.' },
  { q: 'Do you help with hosting and deployment?', a: 'Yes, deployment and launch support are included in the business website service.' },
  { q: 'Can I see your previous projects?', a: 'Yes. NG Law Digest, E&E Studios and Kova Shop are featured on the Projects page.' },
  { q: 'What is Kova Shop?', a: 'An ongoing marketplace project for sellers and buyers. It’s still in progress, and unfinished features aren’t presented as complete.' },
  { q: 'What is NG Law Digest?', a: 'A legal publishing platform with content management capabilities. I worked on its development, including publishing workflows and administrative functionality.' },
  { q: 'How can I refer a client?', a: 'Use the Referral page to submit the business details. Bonus terms are published once configured.' },
  { q: 'How do I contact you?', a: `Email ${site.email}, call ${site.phoneDisplay}, message on WhatsApp, or use the contact form.` },
  { q: 'Can I download your CV?', a: 'Yes, use the Download My CV button on the home or About page.' },
];

export const SUGGESTIONS = ['Who is Marvellous?', 'What technologies does he use?', 'Show me his projects', 'What kind of websites does he build?', 'How can I hire him?', 'What information do I need for a website quote?'];
