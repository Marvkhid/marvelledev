export type Link = { label: string; href: string; external?: boolean };

export const site = {
  name: 'MarvelleDev',
  person: 'ADENIYI Marvellous Emmanuel',
  firstName: 'Marvellous',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://marvels.studio',
  email: 'adeniyimarv@gmail.com',
  phoneDisplay: '08107387326',
  phoneIntl: '+2348107387326',
  // Edit this one line if the wording of your degree needs to change everywhere.
  education: 'software engineering',
  yearsExperience: '3+',
  socials: [
    { label: 'TikTok', handle: '@marvelledev', href: 'https://www.tiktok.com/@marvelledev', external: true },
    { label: 'Instagram', handle: '@marvelledev', href: 'https://www.instagram.com/marvelledev', external: true },
    // Confirm this exact profile URL before launch.
    { label: 'LinkedIn', handle: 'ADENIYI Marvellous Emmanuel', href: 'https://www.linkedin.com/in/adeniyi-marvellous', external: true },
  ],
  cvHref: '/api/cv',
} as const;

export const nav: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Why a website', href: '/why-a-website' },
  { label: 'Referral', href: '/referral' },
  { label: 'Contact', href: '/contact' },
];

export const stack = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'API Development', 'Full Stack Engineering'];

export type Project = {
  slug: string; name: string; status: 'live' | 'in-progress'; statusLabel: string; positioning: string;
  url: string; summary: string; role: string; tech: string[]; details: string[]; cta: string; shot?: string;
};

// Only list what is verified. Add real screenshots at /public/images/projects/<slug>.jpg and set `shot`.
export const projects: Project[] = [
  {
    slug: 'ng-law-digest', name: 'NG Law Digest', status: 'live', statusLabel: 'Live',
    positioning: 'A Content Management System Built for Legal Publishing.',
    url: 'https://nglawdigestblog.com',
    summary: 'A legal publishing platform with content management capabilities.',
    role: 'Worked on the platform’s development, including content publishing workflows and administrative functionality.',
    tech: ['Next.js', 'TypeScript', 'CMS', 'Backend integration'],
    details: ['Content publishing workflows', 'Administrative functionality', 'Responsive reading experience'],
    cta: 'Explore NG Law Digest',
  },
  {
    slug: 'ee-studios', name: 'E&E Studios', status: 'live', statusLabel: 'Live · UI designed and built in 2 days',
    positioning: 'A Digital Presence Designed to Showcase Creative Work.',
    url: 'https://eestudios.vercel.app/',
    summary: 'A website that helps a creative business present its work and lets customers reach pricing and discount information.',
    role: 'Designed the user interface and built the website, both within two days, to meet an urgent business need.',
    tech: ['UI design', 'Next.js', 'Responsive web'],
    details: ['Clear path to pricing and discount information', 'Visual presentation of the business', 'Delivered in two days'],
    cta: 'Explore E&E Studios',
  },
  {
    slug: 'kova-shop', name: 'Kova Shop', status: 'in-progress', statusLabel: 'In progress',
    positioning: 'A Marketplace Project in Progress.',
    url: 'https://kovashopp.vercel.app/',
    summary: 'A marketplace application intended to support sellers and buyers through structured product discovery.',
    role: 'Building the marketplace application. Still under development, so unfinished features are not presented as complete.',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    details: ['Marketplace architecture and user roles', 'Product records and data integrity', 'Payments are not claimed as operational'],
    cta: 'Explore Kova Shop',
  },
];

export const industries = [
  { tag: 'Makeup artists', q: 'Are you a makeup artist?', a: 'Your customers need to see how credible you are, and book you digitally. A website shows your portfolio and packages and gives clients a clear way to reserve you.' },
  { tag: 'Construction', q: 'Do you own a construction company?', a: 'Premium clients check credibility before they call. Put completed projects, credentials and quotation requests where serious buyers can find them.' },
  { tag: 'Photographers', q: 'Do you shoot for a living?', a: 'Curated galleries, package details and a booking path, instead of scattered posts.' },
  { tag: 'Fashion brands', q: 'Selling fashion?', a: 'Collections, product details, delivery information and a clear way to buy or enquire.' },
  { tag: 'Restaurants', q: 'Running a restaurant?', a: 'Menu, hours, location and reservations, ready before they arrive.' },
  { tag: 'Consultants', q: 'Selling expertise?', a: 'Case studies and clear services attract better-qualified enquiries.' },
  { tag: 'Churches and organisations', q: 'Leading a community?', a: 'Events, programmes, resources and contact details in one central place.' },
];

export const benefits = [
  ['Credibility on first look', 'People judge before they call. A clear site answers “can I trust them?” quickly.'],
  ['A storefront that never closes', 'Visitors can browse your offer and reach you at any hour.'],
  ['Enquiries in one place', 'Forms, WhatsApp and booking paths that bring leads together.'],
  ['A home you own', 'Social media is for discovery; your website is the place you control.'],
  ['Less repeating yourself', 'Pricing, services and FAQs answer common questions for you.'],
  ['Room to grow', 'Start simple, then add bookings, payments or dashboards when you need them.'],
] as const;

export const services = [
  { title: 'Business Websites', for: 'For companies and entrepreneurs that need a professional digital presence.', items: ['Responsive design and development', 'Business information architecture', 'Service or product pages', 'Contact and enquiry forms', 'WhatsApp contact integration', 'Basic search engine optimisation', 'Deployment and launch support'] },
  { title: 'E-commerce and Product Websites', for: 'For brands that want to present products and make buying or enquiring easier.', items: ['Product catalogues and detail pages', 'Product filtering where required', 'Cart and checkout integrations where appropriate', 'Payment integration where specified', 'Delivery and contact information'] },
  { title: 'Custom Web Applications', for: 'For businesses that need more than static pages.', items: ['Custom application interfaces', 'User authentication and role-based access', 'Administrative dashboards', 'API development and integration', 'Database-backed workflows', 'Application deployment'] },
  { title: 'Content Management Systems', for: 'For publishers, organisations and businesses that manage content regularly.', items: ['Administrative interfaces', 'Article and media management', 'Content publishing workflows', 'User permissions', 'Structured content storage'] },
  { title: 'Improvements and Maintenance', for: 'For businesses that already have a website but need it improved.', items: ['Performance investigation', 'UI improvements', 'Responsive layout corrections', 'Bug fixes and feature enhancements', 'Maintenance and technical support'] },
];

export const workSteps = ['Understand the problem.', 'Define the intended outcome.', 'Plan the user experience.', 'Choose an appropriate technical architecture.', 'Build and test the solution.', 'Deploy and evaluate the result.', 'Improve based on feedback and real usage.'];

export const workspace = [
  { src: '/images/ws-fitness.jpg', alt: 'Marvellous at his MarvelleDev workstation with a fitness coaching website on the monitor, tablet and phone', caption: 'Fitness coaching site on screen' },
  { src: '/images/ws-makeup.jpg', alt: 'Marvellous at his workstation with a makeup artistry website on the monitor and laptops', caption: 'Makeup artistry site on screen' },
  { src: '/images/ws-barber.jpg', alt: 'Marvellous at his workstation with a barber booking website on the monitor and tablet', caption: 'Barber booking site on screen' },
  { src: '/images/ws-plumbing.jpg', alt: 'Marvellous at his workstation with a plumbing services website on the monitor and laptops', caption: 'Plumbing services site on screen' },
  { src: '/images/ws-streaming.jpg', alt: 'Marvellous at his desk with a streaming website on the monitor, tablet and phone', caption: 'Streaming site on screen' },
] as const;

export function waLink(text: string) {
  return `https://wa.me/${site.phoneIntl.replace('+', '')}?text=${encodeURIComponent(text)}`;
}
