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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-xs rounded-none p-6 sm:p-10 border border-stone-200/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/70 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-[0.25em] px-2.5 py-0.5 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300 uppercase">
                CURATED PORTFOLIO
              </span>
              {activeCompany && (
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-none border tracking-wider"
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
              {activeCategory
                ? activeCategory.name_th
                : activeCompany
                ? `แผนประกันภัยของ ${activeCompany.name}`
                : 'แผนประกันและการเงินคัดสรร'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-light leading-relaxed">
              {activeCategory
                ? activeCategory.description
                : activeCompany
                ? `รวมแผนประกันชีวิตและสุขภาพมาตรฐานสากลจาก ${activeCompany.fullName}`
                : `พบทั้งหมด ${products.length} แผนประกัน พร้อมตารางผลประโยชน์โปร่งใสและคำนวณเบี้ยตรงไปตรงมา`}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/calculators/tax"
              className="h-10 px-4 rounded-none text-xs font-mono uppercase tracking-wider border border-stone-300 bg-white hover:bg-stone-50 hover:border-stone-900 text-stone-800 flex items-center transition-colors duration-200"
            >
              คำนวณลดหย่อนภาษี
            </Link>
            <Link
              href="/quiz"
              className="h-10 px-4 rounded-none text-xs font-mono uppercase tracking-wider bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 flex items-center transition-colors duration-200 border border-stone-800"
            >
              ค้นหาแผนที่ใช่
            </Link>
          </div>
        </div>

        {/* 1. Category Filter Tabs */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">หมวดหมู่ความคุ้มครอง:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <Link
              href={buildFilterUrl({ category: null })}
              className={`px-3.5 py-1.5 rounded-none text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                !categorySlug
                  ? 'bg-[#0c0b0a] text-stone-100 border-[#0c0b0a]'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              ALL CATEGORIES
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={buildFilterUrl({ category: c.slug })}
                className={`px-3.5 py-1.5 rounded-none text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                  categorySlug === c.slug
                    ? 'bg-[#0c0b0a] text-stone-100 border-[#0c0b0a]'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                {c.name_th}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Insurer Partner Company Brand Filter */}
        <div className="pt-3 border-t border-stone-200/60 space-y-2.5">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">พันธมิตรผู้รับประกัน:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <Link
              href={buildFilterUrl({ company: null })}
              className={`px-3 py-1.5 rounded-none text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
                !companyCode
                  ? 'bg-[#0c0b0a] text-stone-100 border-[#0c0b0a]'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-mono font-medium tracking-wider whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#0c0b0a] text-stone-100 border-[#0c0b0a]'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-none shrink-0"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-none border border-stone-200 p-8 space-y-4">
          <ShieldCheck className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-stone-800">ไม่พบแผนประกันที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            ลองปรับเปลี่ยนคำค้นหา หรือคลิกปุ่ม &quot;ล้างตัวกรองทั้งหมด&quot; เพื่อชมผลิตภัณฑ์ทั้งหมดในพอร์ตโฟลิโอ
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-10 px-6 rounded-none bg-[#0c0b0a] text-stone-100 text-xs font-mono uppercase tracking-wider hover:bg-stone-900 border border-stone-800 transition duration-200"
            >
              ล้างตัวกรองทั้งหมด
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
