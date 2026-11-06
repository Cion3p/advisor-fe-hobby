import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieConsentBanner } from '@/components/common/CookieConsentBanner';
import { AnalyticsRouteTracker } from '@/components/common/AnalyticsRouteTracker';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'ModtanoyAdvisor | แพลตฟอร์มเปรียบเทียบประกันและวางแผนภาษีการเงินระดับพรีเมียม',
    template: '%s | ModtanoyAdvisor',
  },
  description: 'ModtanoyAdvisor (มดตะนอย แอดไวเซอร์) สุนทรียศาสตร์แห่งการวางแผนประกันและมรดกครอบครัวชั้นสูง โปร่งใส เป็นกลาง โดยที่ปรึกษาการเงิน คปภ.',
  keywords: [
    'ModtanoyAdvisor',
    'มดตะนอย แอดไวเซอร์',
    'ประกันสุขภาพเหมาจ่าย',
    'ประกันชีวิตมรดก',
    'ประกันบำนาญ',
    'ลดหย่อนภาษี 2567',
    'เปรียบเทียบประกัน',
    'วางแผนการเงิน',
  ],
  authors: [{ name: 'ModtanoyAdvisor Financial Advisory Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ModtanoyAdvisor | Luxury Advisory & Protection Showcase',
    description: 'มดตะนอย แอดไวเซอร์ - สุนทรียศาสตร์แห่งการปกป้องและวางแผนมรดก',
    url: 'https://modtanoyadvisor.com',
    siteName: 'ModtanoyAdvisor',
    locale: 'th_TH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'ModtanoyAdvisor',
    alternateName: 'มดตะนอย แอดไวเซอร์',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`,
    description: 'ศูนย์รวมเปรียบเทียบแผนประกันภัย วางแผนภาษี และผลิตภัณฑ์การเงินอัจฉริยะ',
    areaServed: 'TH',
    priceRange: '฿฿฿',
  };

  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+Thai:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans flex flex-col min-h-screen bg-[#fbfaf6] antialiased text-stone-900 selection:bg-[#c5a059] selection:text-stone-950">
        <Suspense fallback={null}>
          <AnalyticsRouteTracker />
        </Suspense>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
