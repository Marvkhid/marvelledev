import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hud } from '@/components/Hud';
import { CinemaIntro } from '@/components/CinemaIntro';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Marvel Adeniyi — Full-Stack Software Developer',
    template: '%s · MarvelleDev',
  },
  description:
    'Marvel Adeniyi is a full-stack software developer building websites, web applications and business systems with React, Next.js, Node, NestJS and PostgreSQL.',
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Marvel Adeniyi — Full-Stack Software Developer',
    description:
      'I build digital products that solve real problems: websites, web applications and the systems behind them.',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Marvel Adeniyi, full-stack software developer' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F5F9' },
    { media: '(prefers-color-scheme: dark)', color: '#07090F' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const themeScript = `try{var t=localStorage.getItem('mv-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`;

// Marvel Assistant: the existing Dify agent, loaded through Dify's official
// embed. Rendered once in the document head so the widget initialises exactly
// as Dify documents it, and survives client-side navigation.
const assistantConfig = `window.difyChatbotConfig={token:'X1atAuomTQvJOyJt',baseUrl:'https://udify.app'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: assistantConfig }} />
        <script src="https://udify.app/embed.min.js" id="X1atAuomTQvJOyJt" defer />
        <noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript>
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <CinemaIntro />
        <Header />
        <Hud />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
