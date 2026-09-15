import React from 'react';
import { Metadata } from 'next';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { Search, Filter, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'รวมแผนประกันชีวิต สุขภาพ และบำนาญ เปรียบเทียบผลประโยชน์ | FinAdvisor TH',
  description: 'ค้นหาและเปรียบเทียบแผนประกันสุขภาพเหมาจ่าย ประกันชีวิต ประกันสะสมทรัพย์ และประกันบำนาญจากบริษัทชั้นนำ กรองตามช่วงอายุและงบประมาณที่คุณต้องการ',
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    tax?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const categorySlug = resolvedParams.category;
  const searchTerm = resolvedParams.search;
  const isTaxDeductible = resolvedParams.tax === 'true' ? true : undefined;

  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts({
      category: categorySlug,
      search: searchTerm,
      isTaxDeductible,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activeCategory ? activeCategory.name_th : 'แผนประกันและผลิตภัณฑ์การเงินทั้งหมด'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeCategory
                ? activeCategory.description
                : `พบทั้งหมด ${products.length} แผนประกัน พร้อมตารางผลประโยชน์โปร่งใส`}
            </p>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-slate-100 pb-1">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              !categorySlug
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                categorySlug === c.slug
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.name_th}
            </Link>
          ))}
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
            ลองปรับเปลี่ยนคำค้นหา หรือคลิกปุ่ม &quot;ทั้งหมด&quot; เพื่อดูผลิตภัณฑ์ทั้งหมดในระบบ
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
