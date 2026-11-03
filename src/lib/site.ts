export type Link = { label: string; href: string; external?: boolean };

export const site = {
  name: 'MarvelleDev',
  person: 'Marvel Adeniyi',
  firstName: 'Marvel',
  role: 'Full-Stack Software Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://marvelledev.vercel.app',
  email: 'adeniyimarv@gmail.com',
  phoneDisplay: '0810 738 7326',
  phoneIntl: '+2348107387326',
  location: 'Lagos, Nigeria',
  // One line, used everywhere the qualification appears.
  education: 'B.Eng. Computer Engineering, Ekiti State University',
  specialisation: 'Software Engineering',
  yearsExperience: '3+',
  socials: [
    { label: 'LinkedIn', handle: 'Marvel Adeniyi', href: 'https://www.linkedin.com/in/adeniyi-marvellous', external: true },
    { label: 'Instagram', handle: '@marvelledev', href: 'https://www.instagram.com/marvelledev', external: true },
    { label: 'TikTok', handle: '@marvelledev', href: 'https://www.tiktok.com/@marvelledev', external: true },
  ],
} as const;

export const nav: Link[] = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export type Project = {
  slug: string;
  name: string;
  kind: 'Client work' | 'Product' | 'In progress';
  tagline: string;
  summary: string;
  problem: string;
  contribution: string;
  features: string[];
  tech: string[];
  url: string;
  shot: string;
  shotMobile?: string;
  note?: string;
  featured?: boolean;
};

/**
 * Six live projects. Every screenshot in /public/images/projects was captured
 * from the deployed site. No numbers, clients or results are claimed here that
 * were not visible on the product itself.
 */
export const projects: Project[] = [
  {
    slug: 'ng-law-digest',
    name: 'NG Law Digest',
    kind: 'Client work',
    tagline: 'Legal publishing at magazine scale.',
    summary:
      'A Nigerian legal publication with cover stories, long-form interviews, an issues archive and a weekly newsletter.',
    problem:
      'The publication carries long interviews, past issues and practice-area coverage. A blog feed would bury all three, so the platform had to be built around editions.',
    contribution:
      'Built the publishing platform: article and interview templates, the issues archive, practice-area navigation and newsletter capture, with an editorial flow the team can run without a developer.',
    features: [
      'Cover-story and long-form interview layouts',
      'Issues archive with print covers',
      'Practice-area taxonomy',
      'Newsletter signup',
    ],
    tech: ['Next.js', 'TypeScript', 'Content platform', 'REST APIs'],
    url: 'https://nglawdigestblog.com',
    shot: '/images/projects/ng-law-digest-desktop.png',
    shotMobile: '/images/projects/ng-law-digest-mobile.png',
    featured: true,
  },
  {
    slug: 'settleng',
    name: 'SettleNG',
    kind: 'Product',
    tagline: 'Money tracking for people who run shops, not spreadsheets.',
    summary:
      'A free record-keeping app for Nigerian traders: sales, expenses, customer debts, invoices, bank-statement imports and a dashboard that adds up.',
    problem:
      'A busy day is dozens of small sales, a restock and credit given to a regular. By evening the notebook is under the counter and the numbers blur.',
    contribution:
      'Designed and built the product end to end: the data model for sales, expenses and debts, the dashboard, statement import with duplicate blocking, and Supabase authentication.',
    features: [
      'Sales and expense records in a few taps',
      'Customer debts, invoices and part payments',
      'CSV, Excel and PDF statement import',
      'Profit, cash flow and debt-ageing views',
    ],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    url: 'https://settleng.vercel.app/',
    shot: '/images/projects/settleng-desktop.png',
    shotMobile: '/images/projects/settleng-mobile.png',
    featured: true,
  },
  {
    slug: 'max-gadgets',
    name: 'Max Gadgets',
    kind: 'Client work',
    tagline: 'A phone shop that answers before you call.',
    summary:
      'A storefront for an iPhone retailer and repair bench in Ado-Ekiti: the model range, eleven repair services, bulk quotes and WhatsApp enquiries.',
    problem:
      'Naira prices move weekly, so a printed price list is wrong by the next morning. The shop needed to show its range and take enquiries, not quote stale numbers.',
    contribution:
      'Built the storefront and the enquiry flow: every model and repair opens a pre-filled WhatsApp message, and bulk requests get their own path.',
    features: [
      'iPhone range with per-model WhatsApp enquiry',
      'Eleven repair services with detail',
      'Before-and-after repair gallery',
      'Bulk quote requests and shop details',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WhatsApp integration'],
    url: 'https://maxgadgets.vercel.app/',
    shot: '/images/projects/max-gadgets-desktop.png',
    shotMobile: '/images/projects/max-gadgets-mobile.png',
    featured: true,
  },
  {
    slug: 'kova-shop',
    name: 'Kova Shop',
    kind: 'In progress',
    tagline: 'A marketplace where a product is one shareable link.',
    summary:
      'A two-sided marketplace: buyers browse physical and digital products, sellers open a store and every listing gets a permanent link and QR code.',
    problem:
      'Small sellers work from WhatsApp and flyers. They need one link that never changes, and buyers need to see what they are getting without installing an app.',
    contribution:
      'Designed and building the storefront, seller onboarding, listings and cart, with a relational model for stores, products, orders and seller payouts.',
    features: [
      'Buyer and seller accounts',
      'Listings with permanent links and QR codes',
      'Physical and digital product types',
      'Cart and checkout flow',
    ],
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma'],
    url: 'https://kova-shopp.vercel.app/',
    shot: '/images/projects/kova-shop-desktop.png',
    shotMobile: '/images/projects/kova-shop-mobile.png',
    note: 'The marketplace is deployed; listings are still being seeded, so the browse pages are empty by design.',
  },
  {
    slug: 'ee-studios',
    name: 'E&E Studios',
    kind: 'Client work',
    tagline: 'A photography brand, designed and shipped in two days.',
    summary:
      'A photography site for portraits, weddings and birthdays: gallery, services, process and a booking enquiry, now trading as E&E Photography.',
    problem:
      'The studio needed to look credible next to photographers with years of web presence, and it needed to happen that week.',
    contribution:
      'Designed the interface and built the site end to end in two days: gallery, service pages, the booking flow and the motion that carries them.',
    features: [
      'Interactive photography gallery',
      'Services, process and about pages',
      'Booking enquiries',
      'Delivered in two days',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    url: 'https://eestudios.vercel.app/',
    shot: '/images/projects/ee-studios-desktop.png',
    shotMobile: '/images/projects/ee-studios-mobile.png',
  },
  {
    slug: 'gees-fitness',
    name: "Gee's Fitness",
    kind: 'Client work',
    tagline: 'One gym brand, three businesses in it.',
    summary:
      'A site for a coach in Sagamu selling training, gym equipment and gym setup, with a consultation form and a gallery of the facility.',
    problem:
      'Three different offers were sharing one Instagram page, so every enquiry started with the same explanation of what the business actually does.',
    contribution:
      'Built the brand site: a service architecture that separates training, equipment and setup, the gallery, location details and the consultation form.',
    features: [
      'Six services with detail pages',
      'Consultation booking form',
      'Gym and equipment gallery',
      'Location, hours and contact',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Forms'],
    url: 'https://gees-fitness.vercel.app/',
    shot: '/images/projects/gees-fitness-desktop.png',
    shotMobile: '/images/projects/gees-fitness-mobile.png',
  },
];

export const featured = projects.filter((p) => p.featured);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const stack = [
  { name: 'TypeScript', group: 'Frontend' },
  { name: 'React', group: 'Frontend' },
  { name: 'Next.js', group: 'Frontend' },
  { name: 'JavaScript', group: 'Frontend' },
  { name: 'Tailwind CSS', group: 'Frontend' },
  { name: 'Node.js', group: 'Backend' },
  { name: 'NestJS', group: 'Backend' },
  { name: 'REST APIs', group: 'Backend' },
  { name: 'PostgreSQL', group: 'Data' },
  { name: 'Prisma', group: 'Data' },
  { name: 'Supabase', group: 'Data' },
];

export const capabilities = [
  {
    title: 'Frontend engineering',
    body: 'Interfaces in React and Next.js: component architecture, responsive layouts and the small details that make a product feel finished.',
    tech: 'React · Next.js · TypeScript · Tailwind CSS',
  },
  {
    title: 'Backend and APIs',
    body: 'Node and NestJS services, REST endpoints, authentication and the business logic behind the screens.',
    tech: 'Node.js · NestJS · REST APIs',
  },
  {
    title: 'Data and persistence',
    body: 'Relational models in PostgreSQL with Prisma, migrations, and the queries that keep records correct as a product grows.',
    tech: 'PostgreSQL · Prisma · Supabase',
  },
];

/**
 * Verified highlights only: each one is visible on a live project.
 * No invented client names or performance numbers.
 */
export const highlights = [
  {
    value: '2',
    unit: 'days',
    title: 'Design to launch on a deadline',
    body: 'E&E Studios was designed and built in two days for a studio that needed to be live that week.',
    href: '/projects/ee-studios',
  },
  {
    value: '6',
    unit: 'live products',
    title: 'Shipped, not mocked up',
    body: 'Legal publishing, a marketplace, a money tracker, retail, fitness and photography. Every screenshot is from the deployed site.',
    href: '/projects',
  },
  {
    value: '3',
    unit: 'layers',
    title: 'Frontend, API and database',
    body: 'SettleNG runs on a PostgreSQL schema with authentication, statement import and reporting — not just a storefront.',
    href: '/projects/settleng',
  },
] as const;

export const services = [
  {
    title: 'Business websites',
    for: 'A credible home for a business that currently lives on social media.',
    items: ['Responsive design and build', 'Service and product pages', 'Enquiry and WhatsApp flows', 'Basic SEO and analytics'],
    image: '/images/scenes/retail-checkout.jpg',
    alt: 'A shop owner taking a card payment from a customer at a counter',
  },
  {
    title: 'E-commerce development',
    for: 'Catalogues, carts and checkout paths for brands selling online.',
    items: ['Product catalogue and detail pages', 'Cart and checkout', 'Payment integration where specified', 'Order and delivery information'],
    image: '/images/projects/max-gadgets-desktop.png',
    alt: 'Max Gadgets storefront homepage',
  },
  {
    title: 'Full-stack web applications',
    for: 'Products with accounts, roles, records and real business logic.',
    items: ['Application interfaces', 'Authentication and permissions', 'Dashboards and admin tools', 'Database-backed workflows'],
    image: '/images/projects/settleng-desktop.png',
    alt: 'SettleNG dashboard and landing page',
  },
  {
    title: 'Custom software',
    for: 'Internal tools that replace spreadsheets, notebooks and WhatsApp threads.',
    items: ['Inventory and record keeping', 'Reporting and exports', 'Approval and workflow tools', 'Integrations with existing systems'],
    image: '/images/scenes/team-planning.jpg',
    alt: 'A team planning a project with sticky notes and laptops',
  },
  {
    title: 'API and backend development',
    for: 'The services other applications depend on.',
    items: ['REST API design and build', 'Database design and migrations', 'Third-party integrations', 'Background jobs and notifications'],
    image: '/images/scenes/team-at-work.jpg',
    alt: 'Developers working together on laptops',
  },
  {
    title: 'Improvements and maintenance',
    for: 'A site or app that already exists and needs to work better.',
    items: ['Performance investigation', 'Responsive and UI fixes', 'Bug fixes and new features', 'Ongoing support'],
    image: '/images/scenes/office.jpg',
    alt: 'A modern office interior',
  },
];

export const workProcess = [
  { step: '01', title: 'Understand', body: 'What the product must do, who uses it and what is already there.' },
  { step: '02', title: 'Design', body: 'Structure, screens and the data model, decided together.' },
  { step: '03', title: 'Build', body: 'Frontend, API and database in one codebase, reviewed as it goes.' },
  { step: '04', title: 'Ship', body: 'Deployed, measured, then improved with the people using it.' },
];

export const photos = {
  team: {
    src: '/images/scenes/team-at-work.jpg',
    alt: 'Four developers working together on laptops around a wooden table',
  },
  planning: {
    src: '/images/scenes/team-planning.jpg',
    alt: 'A product team running a planning session with sticky notes',
  },
  retail: {
    src: '/images/scenes/retail-checkout.jpg',
    alt: 'A shop owner taking a card payment from a customer',
  },
  office: {
    src: '/images/scenes/office.jpg',
    alt: 'The interior of a modern software studio',
  },
} as const;

export function waLink(text: string) {
  return `https://wa.me/${site.phoneIntl.replace('+', '')}?text=${encodeURIComponent(text)}`;
}
