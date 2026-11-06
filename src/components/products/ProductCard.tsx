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
    <div className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header & Badges */}
        <div className="p-5 pb-4 border-b border-zinc-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono">
              {product.category_name || 'ประกัน'}
            </span>
            <div className="flex items-center gap-1.5">
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono">
                  <Receipt className="w-3 h-3 text-zinc-500" />
                  ลดหย่อนภาษีได้
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-zinc-50 text-zinc-700 border border-zinc-200/80">
                <Star className="w-3 h-3 text-zinc-700 fill-zinc-700" />
                {product.rating || '4.8'}
              </span>
            </div>
          </div>

          <h3 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors duration-150 leading-snug line-clamp-2">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>

          {/* Insurer Brand Identity Badge */}
          <div className="mt-2.5 flex items-center">
            <CompanyBrandBadge
              companyCode={product.company_code}
              companyName={product.company_name}
              variant="pill"
            />
          </div>
        </div>

        {/* Summary & Highlights */}
        <div className="p-5 pt-4 space-y-3.5">
          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>

          <ul className="space-y-1.5 text-xs text-zinc-600">
            {highlights.slice(0, 3).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                </div>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-3.5 bg-zinc-50/70 border-t border-zinc-100">
        <div className="flex items-baseline justify-between mb-3.5">
          <div>
            <span className="text-[11px] text-zinc-400 font-mono block">เบี้ยประกันเริ่มต้น</span>
            <span className="text-xl font-bold font-mono text-zinc-900">
              ฿{Number(product.min_premium).toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono"> / ปี</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-zinc-400 font-mono block">อายุรับประกัน</span>
            <span className="text-xs font-mono font-medium text-zinc-700">
              {product.min_entry_age} - {product.max_entry_age} ปี
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-1 h-9 px-3 rounded-lg border border-zinc-200 hover:border-zinc-300 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <span>ดูรายละเอียด</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <Link
            href={`/consultation?product=${product.id}`}
            className="flex items-center justify-center gap-1 h-9 px-3 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-white active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            ขอคำปรึกษาฟรี
          </Link>
        </div>
      </div>
    </div>
  );
}
