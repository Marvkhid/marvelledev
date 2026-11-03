export type Faq = { q: string; a: string };

/**
 * Answers used on the contact page and its FAQ structured data.
 * Keep this to what is verifiably true about the work.
 */
export const FAQ: Faq[] = [
  {
    q: 'What kind of projects do you take on?',
    a: 'Business websites, e-commerce builds, full-stack web applications, internal tools and improvements to something that already exists. Most of my work is Next.js on the frontend with Node or NestJS and PostgreSQL behind it.',
  },
  {
    q: 'Can you work on the backend as well as the interface?',
    a: 'Yes. I build the API, the database schema and the authentication as part of the same project — SettleNG, for example, runs on PostgreSQL with Supabase auth and statement import.',
  },
  {
    q: 'How long does a project take?',
    a: 'A focused business site can be live in days; a full application with accounts and reporting takes longer. I agree a timeline up front and tell you what would move it.',
  },
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope, integrations and how much content already exists. Send the details and I will scope it with a clear price rather than an hourly guess.',
  },
  {
    q: 'Do you maintain sites after launch?',
    a: 'Yes — bug fixes, responsive corrections, performance work and new features. Several of the projects on this site are maintained that way.',
  },
  {
    q: 'Can I see the code or talk to a past client?',
    a: 'Ask. I can walk you through architecture and decisions on any project here, and put you in touch with a client where they are happy to be contacted.',
  },
];
