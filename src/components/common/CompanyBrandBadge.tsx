import React from 'react';
import { PhoneCall } from 'lucide-react';
import { COMPANY_BRANDS, resolveCompanyBrand, type CompanyBrandInfo } from '@/lib/companies';

export { COMPANY_BRANDS, resolveCompanyBrand, type CompanyBrandInfo };

export interface CompanyBrandBadgeProps {
  companyCode?: string;
  companyName?: string;
  variant?: 'pill' | 'compact' | 'full' | 'avatar';
  className?: string;
}

export function CompanyBrandBadge({
  companyCode,
  companyName,
  variant = 'pill',
  className = '',
}: CompanyBrandBadgeProps) {
  const brand = resolveCompanyBrand(companyCode || companyName);

  // 1. Variant: Avatar Icon Only
  if (variant === 'avatar') {
    return (
      <div 
        className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-[10px] tracking-tight shrink-0 shadow-2xs ${className}`}
        style={{ backgroundColor: brand.brandColor }}
        title={brand.fullName}
      >
        {brand.code}
      </div>
    );
  }

  // 2. Variant: Compact (Icon + Short Code)
  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-bold ${className}`}
        style={{ 
          backgroundColor: brand.lightBg, 
          borderColor: brand.borderColor, 
          color: brand.textColor 
        }}
      >
        <span 
          className="w-1.5 h-1.5 rounded-full shrink-0" 
          style={{ backgroundColor: brand.brandColor }}
        ></span>
        <span className="font-black tracking-wider text-[10px] uppercase">{brand.code}</span>
        <span className="text-slate-600 font-medium truncate">{brand.name}</span>
      </div>
    );
  }

  // 3. Variant: Full Banner (Used in Product Details / [slug])
  if (variant === 'full') {
    return (
      <div 
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
        style={{ 
          backgroundColor: brand.lightBg, 
          borderColor: brand.borderColor 
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm tracking-tight shadow-sm shrink-0"
            style={{ backgroundColor: brand.brandColor }}
          >
            {brand.code}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                พันธมิตรผู้รับประกันภัย
              </span>
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: brand.brandColor }}
              ></span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
              {brand.fullName}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
          <a
            href={`tel:${brand.phone}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
            <span>สายด่วน {brand.phone}</span>
          </a>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            คปภ. รับรอง
          </span>
        </div>
      </div>
    );
  }

  // 4. Variant: Pill (Default, used in ProductCard)
  return (
    <div 
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs transition-colors ${className}`}
      style={{ 
        backgroundColor: brand.lightBg, 
        borderColor: brand.borderColor 
      }}
    >
      <div 
        className="w-5 h-5 rounded flex items-center justify-center text-white font-black text-[9px] tracking-tight shrink-0 shadow-2xs"
        style={{ backgroundColor: brand.brandColor }}
      >
        {brand.code}
      </div>
      <span 
        className="font-bold text-[11px] truncate max-w-[180px]"
        style={{ color: brand.textColor }}
      >
        {brand.name}
      </span>
      <span 
        className="w-1.5 h-1.5 rounded-full shrink-0" 
        style={{ backgroundColor: brand.brandColor }}
      ></span>
    </div>
  );
}
