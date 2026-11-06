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
    default: 'ModtanoyAdvisor | แพลตฟอร์มเปรียบเทียบประกันและวางแผนภาษีการเงินอัจฉริยะ',
    template: '%s | ModtanoyAdvisor',
  },
  description: 'ModtanoyAdvisor (มดตะนอย แอดไวเซอร์) แพลตฟอร์มตัวกลางที่ช่วยคุณเปรียบเทียบประกันสุขภาพเหมาจ่าย ประกันชีวิต และวางแผนภาษี 2567 โปร่งใส เข้าใจง่าย โดยผู้เชี่ยวชาญ คปภ.',
  keywords: [
    'ModtanoyAdvisor',
    'มดตะนอย แอดไวเซอร์',
    'ประกันสุขภาพเหมาจ่าย',
    'ประกันชีวิต',
    'ประกันบำนาญ',
    'ลดหย่อนภาษี 2567',
    'เปรียบเทียบประกัน',
    'คำนวณภาษี',
  ],
  authors: [{ name: 'ModtanoyAdvisor Financial Advisory Team' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'ModtanoyAdvisor | เปรียบเทียบประกันและวางแผนการเงิน',
    description: 'มดตะนอย แอดไวเซอร์ - ตัวเล็กแต่ปกป้องคุณยิ่งใหญ่ เปรียบเทียบผลประโยชน์ชัดเจน ปรึกษาตัวแทนฟรี',
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
    priceRange: '฿฿',
  };

  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans flex flex-col min-h-screen bg-[#fafafa] antialiased text-zinc-900 selection:bg-zinc-900 selection:text-white">
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
