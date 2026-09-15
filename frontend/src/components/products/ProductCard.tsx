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
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header & Badges */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {product.category_name || 'ประกัน'}
            </span>
            <div className="flex items-center gap-1.5">
              {product.is_tax_deductible && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
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
                <CheckCircle2 className="w-4 h-4 text-wealth-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-6 pt-4 bg-slate-50/70 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-xs text-slate-500 block">เบี้ยประกันเริ่มต้น</span>
            <span className="text-2xl font-extrabold text-brand-900">
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

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-1 text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-300 hover:border-brand-600 text-slate-700 hover:text-brand-600 bg-white transition-all shadow-sm"
          >
            ดูรายละเอียด
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={`/consultation?product=${product.id}`}
            className="flex items-center justify-center gap-1 text-xs font-semibold py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-sm shadow-brand-600/20"
          >
            ขอคำปรึกษาฟรี
          </Link>
        </div>
      </div>
    </div>
  );
}
