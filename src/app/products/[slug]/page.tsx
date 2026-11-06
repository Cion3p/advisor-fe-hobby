import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Receipt, 
  Award, 
  Calendar, 
  PhoneCall, 
  ArrowLeft, 
  Info, 
  Layers 
} from 'lucide-react';
import { fetchProductBySlug } from '@/lib/api';
import { ProductJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { CompanyBrandBadge } from '@/components/common/CompanyBrandBadge';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: 'ไม่พบแผนประกัน' };
  }

  return {
    title: `${product.title} - ตารางผลประโยชน์และเบี้ยประกัน | ModtanoyAdvisor`,
    description: product.summary,
    keywords: [
      product.title,
      product.category_name || 'ประกัน',
      'ตารางผลประโยชน์',
      'ลดหย่อนภาษี',
      'ค่าห้อง',
      'เบี้ยประกัน',
    ],
    openGraph: {
      title: `${product.title} | ModtanoyAdvisor`,
      description: product.summary,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await fetchProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const highlights = Array.isArray(product.highlight_points)
    ? product.highlight_points
    : typeof product.highlight_points === 'string'
    ? JSON.parse(product.highlight_points || '[]')
    : [];

  const faqItems = [
    {
      question: `${product.title} เหมาะกับใครบ้าง?`,
      answer: `เหมาะสำหรับบุคคลทั่วไปอายุระหว่าง ${product.min_entry_age} ถึง ${product.max_entry_age} ปี ที่ต้องการความคุ้มครองที่ครอบคลุมและสามารถนำเบี้ยประกันไปลดหย่อนภาษีได้ตามสิทธิทางกฎหมาย`,
    },
    {
      question: `สามารถนำเบี้ยประกันของแผนนี้ไปลดหย่อนภาษีได้เท่าไหร่?`,
      answer: product.is_tax_deductible
        ? `สามารถนำไปลดหย่อนภาษีเงินได้บุคคลธรรมดาได้สูงสุด ${Number(product.max_tax_deduction).toLocaleString()} บาทต่อปี ตามหลักเกณฑ์ที่กรมสรรพากรกำหนด`
        : 'แผนประกันนี้ไม่สามารถใช้สิทธิลดหย่อนภาษีได้',
    },
    {
      question: `มีระยะเวลารอคอย (Waiting Period) หรือไม่?`,
      answer: 'โรคทั่วไปมีระยะเวลารอคอย 30 วัน และกลุ่มโรคร้ายแรง/เนื้องอกมีระยะเวลารอคอย 90-120 วัน ขึ้นอยู่กับเงื่อนไขของแต่ละสัญญาเพิ่มเติม',
    },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* 1. Structured Data for Google SEO */}
      <ProductJsonLd
        name={product.title}
        description={product.summary}
        brand={product.company_name || 'ModtanoyAdvisor Partner'}
        category={product.category_name || 'Insurance'}
        minPrice={Number(product.min_premium)}
        rating={product.rating}
        url={`${siteUrl}/products/${product.slug}`}
      />
      <FAQJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        items={[
          { name: 'หน้าแรก', url: `${siteUrl}` },
          { name: 'แผนประกันทั้งหมด', url: `${siteUrl}/products` },
          { name: product.title, url: `${siteUrl}/products/${product.slug}` },
        ]}
      />

      {/* Back Button & Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-stone-500">
        <Link href="/products" className="inline-flex items-center gap-1.5 hover:text-stone-900 transition-colors duration-150">
          <ArrowLeft className="w-3.5 h-3.5" /> <span>CATALOG</span>
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-500 uppercase">{product.category_name}</span>
        <span className="text-stone-300">/</span>
        <span className="text-stone-900 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Grid: Detail + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Product Information (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-none p-6 sm:p-10 border border-stone-200/80 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300">
                {product.category_name}
              </span>
              <CompanyBrandBadge
                companyCode={product.company_code}
                companyName={product.company_name}
                variant="compact"
              />
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-none bg-amber-50 text-[#8c6d46] border border-[#c5a059]/30">
                  <Receipt className="w-3 h-3 text-[#c5a059]" />
                  <span>ลดหย่อนภาษีได้สูงสุด ฿{Number(product.max_tax_deduction).toLocaleString()}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
              {product.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
              {product.summary}
            </p>

            {/* E-E-A-T Badges */}
            <div className="pt-5 border-t border-stone-100 flex flex-wrap gap-5 text-xs font-mono text-stone-500">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>ผู้รับประกัน: {product.company_name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>อัปเดตเกณฑ์ปี 2567-2568</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8c6d46]" />
                <span>ตรวจสอบโดยที่ปรึกษา คปภ.</span>
              </div>
            </div>
          </div>

          {/* Insurer Company Full Showcase Banner */}
          <CompanyBrandBadge
            companyCode={product.company_code}
            companyName={product.company_name}
            variant="full"
          />

          {/* Highlights */}
          <div className="bg-white rounded-none p-6 sm:p-8 border border-stone-200/80 space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
              <h2 className="text-lg font-serif font-bold text-stone-900">
                จุดเด่นและความคุ้มครองสำคัญ
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {highlights.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 bg-stone-50/80 p-3.5 rounded-none border border-stone-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Table */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="bg-white rounded-none p-6 sm:p-8 border border-stone-200/80 space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#c5a059]" />
                  <span>ตารางผลประโยชน์ความคุ้มครอง</span>
                </h2>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">ตามเงื่อนไขกรมธรรม์</span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-none">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-mono uppercase text-[11px] border-b border-stone-200 tracking-wider">
                    <tr>
                      <th className="py-3 px-4">รายการผลประโยชน์</th>
                      <th className="py-3 px-4 text-right">วงเงินความคุ้มครอง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {product.benefits.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50/60 transition-colors duration-150">
                        <td className="py-3.5 px-4 font-medium text-stone-900">{b.benefit_title}</td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900">{b.coverage_amount_desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Plans breakdown if available */}
          {product.plans && product.plans.length > 0 && (
            <div className="bg-white rounded-none p-6 sm:p-8 border border-stone-200/80 space-y-5">
              <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                ตัวเลือกแผนความคุ้มครอง
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.plans.map((plan) => (
                  <div key={plan.id} className="p-5 rounded-none border border-stone-200 bg-stone-50/60 space-y-3 font-mono">
                    <h3 className="font-bold font-serif text-base text-stone-900">{plan.plan_name}</h3>
                    <div className="text-xs text-stone-600 space-y-1.5 border-t border-stone-200/70 pt-2.5">
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">ทุนประกัน:</span>
                        <strong className="text-stone-900 font-bold">฿{Number(plan.base_sum_assured).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">เบี้ยประมาณการ (ชาย):</span>
                        <span className="text-stone-800">฿{Number(plan.base_premium_male).toLocaleString()} / ปี</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-sans">เบี้ยประมาณการ (หญิง):</span>
                        <span className="text-stone-800">฿{Number(plan.base_premium_female).toLocaleString()} / ปี</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          <div className="bg-white rounded-none p-6 sm:p-8 border border-stone-200/80 space-y-5">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <Info className="w-4 h-4 text-[#c5a059]" />
              <span>คำถามที่พบบ่อย (FAQ)</span>
            </h2>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <div key={i} className="p-4 rounded-none border border-stone-200 bg-stone-50/50 space-y-1.5">
                  <h3 className="text-xs font-serif font-bold text-stone-900">{faq.question}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Consultation Box (1 col) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-5">
          <div className="bg-[#0c0b0a] text-stone-100 rounded-none p-6 sm:p-7 border border-stone-800 space-y-6 shadow-xl">
            <div className="border-b border-stone-800 pb-5">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] block uppercase">
                ESTIMATED ANNUAL INVESTMENT
              </span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#c5a059]">
                  ฿{Number(product.min_premium).toLocaleString()}
                </span>
                <span className="text-xs font-mono text-stone-400"> / ปี</span>
              </div>
              <span className="text-[11px] text-stone-400 font-light mt-1.5 block">
                *เบี้ยประกันคำนวณตามเพศ อายุ และขั้นอาชีพของผู้เอาประกัน
              </span>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex justify-between py-1.5 border-b border-stone-800/80 items-center">
                <span className="text-stone-400 font-sans">ผู้รับประกัน:</span>
                <span className="font-serif font-semibold text-stone-100">{product.company_name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                <span className="text-stone-400 font-sans">อายุรับประกัน:</span>
                <span className="font-mono text-stone-100">{product.min_entry_age} - {product.max_entry_age} ปี</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                <span className="text-stone-400 font-sans">ระยะเวลาชำระเบี้ย:</span>
                <span className="text-stone-100">{product.premium_payment_term}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                <span className="text-stone-400 font-sans">ระยะเวลาคุ้มครอง:</span>
                <span className="text-stone-100">{product.coverage_term}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href={`/consultation?product=${product.id}&title=${encodeURIComponent(product.title)}`}
                className="w-full h-11 flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-mono font-semibold uppercase tracking-wider rounded-none transition-colors duration-200 text-xs text-center"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>ปรึกษาตัวแทน & คำนวณเบี้ยฟรี</span>
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full h-10 flex items-center justify-center gap-2 bg-transparent hover:bg-stone-900 text-stone-300 font-mono uppercase tracking-wider rounded-none border border-stone-700 transition-colors duration-200 text-xs text-center"
              >
                คำนวณลดหย่อนภาษี
              </Link>
            </div>

            <div className="pt-3 border-t border-stone-900 text-[10px] font-mono text-stone-500 text-center tracking-widest uppercase">
              PDPA COMPLIANT • NO OBLIGATION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
