import React from 'react';
import { Metadata } from 'next';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { COMPANY_BRANDS } from '@/lib/companies';
import { ShieldCheck, Building2, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'รวมแผนประกันชีวิต สุขภาพ และบำนาญ เปรียบเทียบผลประโยชน์ | ModtanoyAdvisor',
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
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 uppercase tracking-wider">
                CATALOG
              </span>
              {activeCompany && (
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
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
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              {activeCategory
                ? activeCategory.name_th
                : activeCompany
                ? `แผนประกันภัยของ ${activeCompany.name}`
                : 'แผนประกันและผลิตภัณฑ์การเงินทั้งหมด'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
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
              className="h-9 px-3.5 rounded-lg text-xs font-medium border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 flex items-center transition-colors duration-150"
            >
              คำนวณลดหย่อนภาษี
            </Link>
            <Link
              href="/quiz"
              className="h-9 px-3.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-white flex items-center transition-colors duration-150 active:scale-[0.98]"
            >
              แบบทดสอบค้นหาแผน
            </Link>
          </div>
        </div>

        {/* 1. Category Filter Pills */}
        <div className="pt-4 border-t border-zinc-100 space-y-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">หมวดหมู่ความคุ้มครอง:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <Link
              href={buildFilterUrl({ category: null })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-150 border ${
                !categorySlug
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              ทุกหมวดหมู่
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={buildFilterUrl({ category: c.slug })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-150 border ${
                  categorySlug === c.slug
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                {c.name_th}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Insurer Partner Company Brand Filter Pills */}
        <div className="pt-3 border-t border-zinc-100 space-y-2">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">บริษัทผู้รับประกัน:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <Link
              href={buildFilterUrl({ company: null })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-colors duration-150 border ${
                !companyCode
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              ALL
            </Link>
            {Object.values(COMPANY_BRANDS).map((brand) => {
              const isSelected = companyCode?.toUpperCase() === brand.code;
              return (
                <Link
                  key={brand.code}
                  href={buildFilterUrl({ company: brand.code })}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-150 border ${
                    isSelected
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: brand.brandColor }}
                  />
                  <span>{brand.code}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-zinc-200 p-8 space-y-3">
          <ShieldCheck className="w-10 h-10 text-zinc-300 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800">ไม่พบแผนประกันที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-zinc-500">
            ลองปรับเปลี่ยนคำค้นหา หรือคลิกปุ่ม &quot;ล้างตัวกรองทั้งหมด&quot; เพื่อดูผลิตภัณฑ์ทั้งหมด
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 active:scale-[0.98] transition duration-150"
            >
              ล้างตัวกรองทั้งหมด
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
