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
  Layers,
  Clock
} from 'lucide-react';
import { fetchProductBySlug, FALLBACK_PRODUCTS } from '@/lib/api';
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
    title: `${product.title} - เบี้ยประกันและตารางผลประโยชน์ | FinAdvisor TH`,
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
      title: `${product.title} | FinAdvisor TH`,
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
      answer: `เหมาะสำหรับบุคคลทั่วไปอายุระหว่าง ${product.min_entry_age} ถึง ${product.max_entry_age} ปี ที่ต้องการความคุ้มครองที่ครอบคลุมและสามารถนำเบี้ยประกันไปลดหย่อนภาษีได้`,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Structured Data for Google SEO */}
      <ProductJsonLd
        name={product.title}
        description={product.summary}
        brand={product.company_name || 'FinAdvisor Partner'}
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
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/products" className="inline-flex items-center gap-1 hover:text-brand-600 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> แผนประกันทั้งหมด
        </Link>
        <span>/</span>
        <span className="text-slate-400">{product.category_name}</span>
        <span>/</span>
        <span className="text-slate-700 font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Grid: Detail + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Product Information (2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                {product.category_name}
              </span>
              <CompanyBrandBadge
                companyCode={product.company_code}
                companyName={product.company_name}
                variant="compact"
              />
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Receipt className="w-3.5 h-3.5" />
                  ลดหย่อนภาษีได้สูงสุด ฿{Number(product.max_tax_deduction).toLocaleString()}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              {product.summary}
            </p>

            {/* E-E-A-T Badges */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-600" />
                ผู้ให้บริการ: {product.company_name}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                อัปเดตข้อมูลเงื่อนไขปี 2567
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-wealth-600" />
                ตรวจสอบโดยที่ปรึกษา คปภ.
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
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-wealth-600" />
              จุดเด่นและความคุ้มครองหลัก
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-wealth-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Table */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-600" />
                  ตารางผลประโยชน์ความคุ้มครอง
                </h2>
                <span className="text-xs text-slate-400">ตามเงื่อนไขกรมธรรม์</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">รายการผลประโยชน์</th>
                      <th className="py-3 px-4 text-right">วงเงินความคุ้มครอง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {product.benefits.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-900">{b.benefit_title}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-brand-900">{b.coverage_amount_desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Plans breakdown if available */}
          {product.plans && product.plans.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                ตัวเลือกแผนความคุ้มครอง
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.plans.map((plan) => (
                  <div key={plan.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <h3 className="font-bold text-base text-slate-900">{plan.plan_name}</h3>
                    <div className="text-xs text-slate-500 space-y-1">
                      <div>ทุนประกัน: <strong className="text-slate-800 font-semibold">฿{Number(plan.base_sum_assured).toLocaleString()}</strong></div>
                      <div>เบี้ยประมาณการ (ชาย): ฿{Number(plan.base_premium_male).toLocaleString()} / ปี</div>
                      <div>เบี้ยประมาณการ (หญิง): ฿{Number(plan.base_premium_female).toLocaleString()} / ปี</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion (For SEO Rich Snippets) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-500" />
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Consultation Box (1 col) */}
        <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-brand-500/30 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs text-slate-500 block">เบี้ยประกันเริ่มต้น</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-brand-900">
                  ฿{Number(product.min_premium).toLocaleString()}
                </span>
                <span className="text-xs text-slate-500"> / ปี</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium mt-1 block">
                *คำนวณตามเพศและอายุผู้ขอเอาประกัน
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100 items-center">
                <span className="text-slate-500">บริษัทผู้รับประกัน:</span>
                <CompanyBrandBadge
                  companyCode={product.company_code}
                  companyName={product.company_name}
                  variant="compact"
                />
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">อายุรับประกัน:</span>
                <span className="font-semibold text-slate-900">{product.min_entry_age} - {product.max_entry_age} ปี</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">ระยะเวลาชำระเบี้ย:</span>
                <span className="font-semibold text-slate-900">{product.premium_payment_term}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">ระยะเวลาคุ้มครอง:</span>
                <span className="font-semibold text-slate-900">{product.coverage_term}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href={`/consultation?product=${product.id}&title=${encodeURIComponent(product.title)}`}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-brand-600/25 transition-all text-sm text-center"
              >
                <PhoneCall className="w-4 h-4" />
                ขอรับคำปรึกษาและคำนวณเบี้ยฟรี
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl transition-all text-xs text-center"
              >
                ทดลองคำนวณลดหย่อนภาษี
              </Link>
            </div>

            <div className="pt-3 text-[11px] text-slate-400 text-center leading-relaxed">
              🔒 ข้อมูลของคุณปลอดภัยตามมาตรฐาน PDPA ไม่มีการนำเบอร์โทรไปขายต่อ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
