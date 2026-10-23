import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'MarvelleDev · Full Stack Developer building websites that help brands grow', template: '%s · MarvelleDev' },
  description: 'MarvelleDev builds websites, web applications and digital products that help brands earn trust, attract customers and grow beyond social media.',
  openGraph: { siteName: 'MarvelleDev', type: 'website', images: [{ url: '/images/og.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = { themeColor: [{ color: '#EAF1FC' }], width: 'device-width', initialScale: 1 };

const themeScript = `try{var t=localStorage.getItem('mv-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript></head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
