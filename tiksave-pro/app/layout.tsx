import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import Script from 'next/script';
import './globals.css';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | Creator backup & TikTok saver`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: SITE_NAME, title: `${SITE_NAME} | Creator backup & TikTok saver`, description: SITE_DESCRIPTION, url: SITE_URL },
  twitter: { card: 'summary_large_image', title: `${SITE_NAME} | Creator backup & TikTok saver`, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  other: { 'google-adsense-account': 'ca-pub-4355330129692598' },
};
export const viewport: Viewport = { themeColor: '#09090B', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${jakarta.variable}`}><body><Script id="google-adsense" async strategy="beforeInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4355330129692598" crossOrigin="anonymous" /><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><Toaster theme="dark" position="top-center" closeButton richColors /></body></html>;
}
