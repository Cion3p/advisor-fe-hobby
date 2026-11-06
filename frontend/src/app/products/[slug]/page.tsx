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
    title: `${product.title} - เบี้ยประกันและตารางผลประโยชน์ | ModtanoyAdvisor`,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
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
      <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <Link href="/products" className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors duration-150">
          <ArrowLeft className="w-3.5 h-3.5" /> แผนประกันทั้งหมด
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{product.category_name}</span>
        <span>/</span>
        <span className="text-zinc-800 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Grid: Detail + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Product Information (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-zinc-200 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {product.category_name}
              </span>
              <CompanyBrandBadge
                companyCode={product.company_code}
                companyName={product.company_name}
                variant="compact"
              />
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                  <Receipt className="w-3.5 h-3.5 text-zinc-500" />
                  ลดหย่อนภาษีได้สูงสุด ฿{Number(product.max_tax_deduction).toLocaleString()}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              {product.title}
            </h1>

            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              {product.summary}
            </p>

            {/* E-E-A-T Badges */}
            <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-zinc-600" />
                <span>ผู้ให้บริการ: {product.company_name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>อัปเดตปี 2567</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
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
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-zinc-200 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-700" />
              จุดเด่นและความคุ้มครองหลัก
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {highlights.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700 bg-zinc-50 p-3 rounded-lg border border-zinc-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Table */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-zinc-200 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-700" />
                  ตารางผลประโยชน์ความคุ้มครอง
                </h2>
                <span className="text-[11px] font-mono text-zinc-400">ตามเงื่อนไขกรมธรรม์</span>
              </div>

              <div className="overflow-x-auto border border-zinc-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 text-zinc-600 font-mono uppercase text-[11px] border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-4">รายการผลประโยชน์</th>
                      <th className="py-2.5 px-4 text-right">วงเงินความคุ้มครอง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-700">
                    {product.benefits.map((b) => (
                      <tr key={b.id} className="hover:bg-zinc-50/60 transition-colors duration-150">
                        <td className="py-3 px-4 font-medium text-zinc-900">{b.benefit_title}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-zinc-900">{b.coverage_amount_desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Plans breakdown if available */}
          {product.plans && product.plans.length > 0 && (
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-zinc-200 space-y-4">
              <h2 className="text-base font-bold text-zinc-900">
                ตัวเลือกแผนความคุ้มครอง
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.plans.map((plan) => (
                  <div key={plan.id} className="p-4 rounded-lg border border-zinc-200 bg-zinc-50/60 space-y-2 font-mono">
                    <h3 className="font-bold text-sm text-zinc-900">{plan.plan_name}</h3>
                    <div className="text-xs text-zinc-600 space-y-1">
                      <div>ทุนประกัน: <strong className="text-zinc-900 font-bold">฿{Number(plan.base_sum_assured).toLocaleString()}</strong></div>
                      <div>เบี้ยประมาณการ (ชาย): ฿{Number(plan.base_premium_male).toLocaleString()} / ปี</div>
                      <div>เบี้ยประมาณการ (หญิง): ฿{Number(plan.base_premium_female).toLocaleString()} / ปี</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-zinc-200 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-zinc-600" />
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <div key={i} className="p-4 rounded-lg border border-zinc-200 bg-zinc-50/50 space-y-1">
                  <h3 className="text-xs font-bold text-zinc-900">{faq.question}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Consultation Box (1 col) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 space-y-5">
            <div className="border-b border-zinc-100 pb-4">
              <span className="text-[11px] font-mono text-zinc-400 block uppercase tracking-wider">เบี้ยประกันเริ่มต้น</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900">
                  ฿{Number(product.min_premium).toLocaleString()}
                </span>
                <span className="text-xs font-mono text-zinc-500"> / ปี</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-normal mt-1 block">
                *คำนวณตามเพศและอายุผู้ขอเอาประกัน
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-600">
              <div className="flex justify-between py-1 border-b border-zinc-100 items-center">
                <span className="text-zinc-500">ผู้รับประกัน:</span>
                <CompanyBrandBadge
                  companyCode={product.company_code}
                  companyName={product.company_name}
                  variant="compact"
                />
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">อายุรับประกัน:</span>
                <span className="font-mono font-medium text-zinc-900">{product.min_entry_age} - {product.max_entry_age} ปี</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">ระยะเวลาชำระเบี้ย:</span>
                <span className="font-medium text-zinc-900">{product.premium_payment_term}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100">
                <span className="text-zinc-500">ระยะเวลาคุ้มครอง:</span>
                <span className="font-medium text-zinc-900">{product.coverage_term}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                href={`/consultation?product=${product.id}&title=${encodeURIComponent(product.title)}`}
                className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-lg transition-all duration-150 active:scale-[0.98] text-xs text-center"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>ขอรับคำปรึกษาและคำนวณเบี้ยฟรี</span>
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full h-9 flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 font-medium rounded-lg border border-zinc-200 transition-colors duration-150 text-xs text-center"
              >
                ทดลองคำนวณลดหย่อนภาษี
              </Link>
            </div>

            <div className="pt-2 text-[10px] font-mono text-zinc-400 text-center leading-relaxed">
              🔒 PDPA Verified • ไม่มีข้อผูกมัดใดๆ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
