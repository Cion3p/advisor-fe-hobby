'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ShieldCheck, Star, Receipt, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCompareToggle?: (product: Product) => void;
  isCompared?: boolean;
}

export function ProductCard({ product, onCompareToggle, isCompared = false }: ProductCardProps) {
  const highlights = Array.isArray(product.highlight_points)
    ? product.highlight_points
    : typeof product.highlight_points === 'string'
    ? JSON.parse(product.highlight_points || '[]')
    : [];

  return (
    <div className="bg-white rounded-2xl border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-xl hover:shadow-sky-100/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header & Badges */}
        <div className="p-6 pb-4 border-b border-sky-50">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-100">
              {product.category_name || 'ประกัน'}
            </span>
            <div className="flex items-center gap-1.5">
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Receipt className="w-3 h-3" />
                  ลดหย่อนภาษีได้
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {product.rating || 4.8}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>
          <p className="text-xs text-sky-700/70 mt-1 font-medium">
            โดย {product.company_name}
          </p>
        </div>

        {/* Summary & Highlights */}
        <div className="p-6 pt-4 space-y-4">
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            {highlights.slice(0, 3).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & Standout CTA */}
      <div className="p-6 pt-4 bg-sky-50/40 border-t border-sky-100">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-xs text-slate-500 block">เบี้ยประกันเริ่มต้น</span>
            <span className="text-2xl font-black text-slate-950">
              ฿{Number(product.min_premium).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500"> / ปี</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">อายุรับประกัน</span>
            <span className="text-xs font-semibold text-slate-700">
              {product.min_entry_age} - {product.max_entry_age} ปี
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-xl border-2 border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 bg-white transition-all shadow-2xs cursor-pointer"
          >
            <span>ดูรายละเอียด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Standout CTA Button */}
          <Link
            href={`/consultation?product=${product.id}`}
            className="flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white transition-all shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            ขอคำปรึกษาฟรี
          </Link>
        </div>
      </div>
    </div>
  );
}
