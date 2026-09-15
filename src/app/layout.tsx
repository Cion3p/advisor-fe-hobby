import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'FinAdvisor TH | แพลตฟอร์มเปรียบเทียบประกันและวางแผนภาษีการเงิน',
    template: '%s | FinAdvisor TH',
  },
  description: 'เปรียบเทียบประกันสุขภาพเหมาจ่าย ประกันชีวิต ประกันสะสมทรัพย์ และประกันบำนาญ พร้อมโปรแกรมคำนวณภาษี 2567 และคำนวณทุนประกันที่เหมาะสม โดยที่ปรึกษาทางการเงินมืออาชีพ',
  keywords: [
    'ประกันสุขภาพเหมาจ่าย',
    'ประกันชีวิต',
    'ประกันบำนาญ',
    'ลดหย่อนภาษี 2567',
    'เปรียบเทียบประกัน',
    'คำนวณภาษี',
    'วางแผนเกษียณ',
    'ตัวแทนประกัน คปภ',
  ],
  authors: [{ name: 'FinAdvisor Financial Team' }],
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
    title: 'FinAdvisor TH | เปรียบเทียบประกันและวางแผนการเงิน',
    description: 'เลือกแผนประกันที่ตอบโจทย์ชีวิตและภาษี เปรียบเทียบผลประโยชน์ชัดเจน ปรึกษาตัวแทนฟรี',
    url: 'https://finadvisor-th.com',
    siteName: 'FinAdvisor TH',
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
    name: 'FinAdvisor TH',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`,
    description: 'ศูนย์รวมเปรียบเทียบแผนประกันภัย วางแผนภาษี และผลิตภัณฑ์การเงิน',
    areaServed: 'TH',
    priceRange: '฿฿',
  };

  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 antialiased text-slate-800">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
