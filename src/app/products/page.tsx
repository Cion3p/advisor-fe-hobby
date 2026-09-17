import React from 'react';
import { Metadata } from 'next';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { COMPANY_BRANDS } from '@/lib/companies';
import { ShieldCheck, Building2, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'รวมแผนประกันชีวิต สุขภาพ และบำนาญ เปรียบเทียบผลประโยชน์ | FinAdvisor TH',
  description: 'ค้นหาและเปรียบเทียบแผนประกันสุขภาพเหมาจ่าย ประกันชีวิต ประกันสะสมทรัพย์ และประกันบำนาญจากบริษัทชั้นนำ กรองตามช่วงอายุและงบประมาณที่คุณต้องการ',
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    company?: string;
    search?: string;
    tax?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams.category;
  const companyCode = resolvedParams.company;
  const searchTerm = resolvedParams.search;
  const isTaxDeductible = resolvedParams.tax === 'true' ? true : undefined;

  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts({
      category: categorySlug,
      company: companyCode,
      search: searchTerm,
      isTaxDeductible,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const activeCompany = companyCode ? COMPANY_BRANDS[companyCode.toUpperCase()] : undefined;

  // Helper to build URL with query params
  const buildFilterUrl = (opts: { category?: string | null; company?: string | null }) => {
    const params = new URLSearchParams();

    const cat = opts.category !== undefined ? opts.category : categorySlug;
    const comp = opts.company !== undefined ? opts.company : companyCode;

    if (cat) params.set('category', cat);
    if (comp) params.set('company', comp);
    if (searchTerm) params.set('search', searchTerm);
    if (isTaxDeductible) params.set('tax', 'true');

    const qs = params.toString();
    return qs ? `/products?${qs}` : '/products';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                แคตตาล็อกแผนประกัน
              </span>
              {activeCompany && (
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: activeCompany.lightBg,
                    borderColor: activeCompany.borderColor,
                    color: activeCompany.textColor,
                  }}
                >
                  {activeCompany.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activeCategory
                ? activeCategory.name_th
                : activeCompany
                ? `แผนประกันภัยของ ${activeCompany.name}`
                : 'แผนประกันและผลิตภัณฑ์การเงินทั้งหมด'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeCategory
                ? activeCategory.description
                : activeCompany
                ? `รวมแผนประกันชีวิตและสุขภาพจาก ${activeCompany.fullName}`
                : `พบทั้งหมด ${products.length} แผนประกัน พร้อมตารางผลประโยชน์โปร่งใส`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/calculators/tax"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              คำนวณลดหย่อนภาษี
            </Link>
            <Link
              href="/quiz"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-colors"
            >
              แบบทดสอบค้นหาแผน
            </Link>
          </div>
        </div>

        {/* 1. Category Filter Pills */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-600">หมวดหมู่ความคุ้มครอง:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              href={buildFilterUrl({ category: null })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                !categorySlug
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              ทุกหมวดหมู่
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={buildFilterUrl({ category: c.slug })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  categorySlug === c.slug
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {c.name_th}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Insurer Partner Company Brand Filter Pills */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-600">บริษัทผู้รับประกัน (Partner Insurers):</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              href={buildFilterUrl({ company: null })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                !companyCode
                  ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              ทุกบริษัท
            </Link>
            {Object.values(COMPANY_BRANDS).map((brand) => {
              const isSelected = companyCode?.toUpperCase() === brand.code;
              return (
                <Link
                  key={brand.code}
                  href={buildFilterUrl({ company: brand.code })}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'shadow-xs ring-1 ring-offset-1'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: brand.lightBg,
                          borderColor: brand.borderColor,
                          color: brand.textColor,
                          // @ts-ignore
                          '--tw-ring-color': brand.brandColor,
                        }
                      : {}
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: brand.brandColor }}
                  />
                  <span>{brand.code}</span>
                  <span className="text-slate-500 font-normal hidden sm:inline">
                    {brand.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">ไม่พบแผนประกันที่ตรงกับเงื่อนไข</h3>
          <p className="text-sm text-slate-500">
            ลองปรับเปลี่ยนคำค้นหา หรือคลิกปุ่ม &quot;ล้างตัวกรองทั้งหมด&quot; เพื่อดูผลิตภัณฑ์ทั้งหมดในระบบ
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
          >
            ล้างตัวกรองทั้งหมด
          </Link>
        </div>
      )}
    </div>
  );
}
