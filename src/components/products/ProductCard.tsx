'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Star, Receipt, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CompanyBrandBadge } from '@/components/common/CompanyBrandBadge';

interface ProductCardProps {
  product: Product;
  onCompareToggle?: (product: Product) => void;
  isCompared?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const highlights = Array.isArray(product.highlight_points)
    ? product.highlight_points
    : typeof product.highlight_points === 'string'
    ? JSON.parse(product.highlight_points || '[]')
    : [];

  return (
    <div className="bg-white rounded-none border border-stone-200 hover:border-[#c5a059] transition-all duration-400 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header & Badges */}
        <div className="p-6 pb-5 border-b border-stone-100">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono font-medium text-[#c5a059]">
              {product.category_name || 'INSURANCE'}
            </span>
            <div className="flex items-center gap-2">
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 border border-stone-200 text-stone-600">
                  <Receipt className="w-3 h-3 text-[#c5a059]" />
                  TAX DEDUCTIBLE
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-stone-500">
                <Star className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
                {product.rating || '4.8'}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-normal text-stone-900 group-hover:text-[#a88241] transition-colors duration-300 leading-snug line-clamp-2">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Insurer Brand Identity Badge */}
          <div className="mt-3 flex items-center">
            <CompanyBrandBadge
              companyCode={product.company_code}
              companyName={product.company_name}
              variant="pill"
            />
          </div>
        </div>

        {/* Summary & Highlights */}
        <div className="p-6 pt-5 space-y-4">
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-light">
            {product.summary}
          </p>

          <ul className="space-y-2 text-xs text-stone-700">
            {highlights.slice(0, 3).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1 h-1 bg-[#c5a059] shrink-0 mt-1.5" />
                <span className="line-clamp-1 leading-normal font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & Sharp Actions */}
      <div className="p-6 pt-4 bg-[#fcfbf7] border-t border-stone-100">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block">เบี้ยประกันเริ่มต้น</span>
            <span className="font-serif text-2xl font-normal text-stone-950">
              ฿{Number(product.min_premium).toLocaleString()}
            </span>
            <span className="text-xs font-mono text-stone-400"> / ปี</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block">อายุรับประกัน</span>
            <span className="text-xs font-mono text-stone-600">
              {product.min_entry_age} - {product.max_entry_age} ปี
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-1.5 h-10 rounded-none border border-stone-300 hover:border-stone-900 text-[11px] uppercase tracking-[0.18em] font-medium text-stone-800 bg-white transition-all duration-300 cursor-pointer"
          >
            <span>รายละเอียด</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <Link
            href={`/consultation?product=${product.id}`}
            className="flex items-center justify-center gap-1.5 h-10 rounded-none text-[11px] uppercase tracking-[0.18em] font-medium bg-stone-950 hover:bg-[#c5a059] text-white hover:text-stone-950 active:scale-[0.99] transition-all duration-300 cursor-pointer"
          >
            ปรึกษาฟรี
          </Link>
        </div>
      </div>
    </div>
  );
}
