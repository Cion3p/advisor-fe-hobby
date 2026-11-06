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
        className={`w-7 h-7 rounded-none flex items-center justify-center text-white font-mono font-bold text-[10px] tracking-tight shrink-0 ${className}`}
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
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none border text-[11px] font-medium font-mono ${className}`}
        style={{ 
          backgroundColor: brand.lightBg, 
          borderColor: brand.borderColor, 
          color: brand.textColor 
        }}
      >
        <span 
          className="w-1.5 h-1.5 rounded-none shrink-0" 
          style={{ backgroundColor: brand.brandColor }}
        ></span>
        <span className="font-bold tracking-widest text-[10px] uppercase">{brand.code}</span>
        <span className="text-stone-600 font-sans font-normal truncate">{brand.name}</span>
      </div>
    );
  }

  // 3. Variant: Full Banner (Used in Product Details / [slug])
  if (variant === 'full') {
    return (
      <div 
        className={`p-5 sm:p-6 rounded-none border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
        style={{ 
          backgroundColor: brand.lightBg, 
          borderColor: brand.borderColor 
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-none flex items-center justify-center text-white font-mono font-bold text-xs tracking-tight shrink-0 shadow-xs"
            style={{ backgroundColor: brand.brandColor }}
          >
            {brand.code}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8c6d46]">
                พันธมิตรผู้รับประกันภัย
              </span>
              <span 
                className="w-1.5 h-1.5 rounded-none" 
                style={{ backgroundColor: brand.brandColor }}
              ></span>
            </div>
            <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 leading-snug">
              {brand.fullName}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-200/60">
          <a
            href={`tel:${brand.phone}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-none bg-white border border-stone-300 hover:border-stone-900 text-stone-800 transition-colors duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>สายด่วน {brand.phone}</span>
          </a>
          <span className="text-[10px] font-mono tracking-wider uppercase text-stone-600 bg-white border border-stone-200 px-2 py-1 rounded-none">
            คปภ. รับรอง
          </span>
        </div>
      </div>
    );
  }

  // 4. Default Variant: Pill Tag
  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none border text-[11px] font-mono font-semibold transition-all duration-200 ${className}`}
      style={{ 
        backgroundColor: brand.lightBg, 
        borderColor: brand.borderColor, 
        color: brand.textColor 
      }}
    >
      <span 
        className="w-1.5 h-1.5 rounded-none shrink-0" 
        style={{ backgroundColor: brand.brandColor }}
      ></span>
      <span className="tracking-widest uppercase text-[10px] font-bold">{brand.code}</span>
      <span className="font-normal font-sans text-stone-600">{brand.name}</span>
    </div>
  );
}
