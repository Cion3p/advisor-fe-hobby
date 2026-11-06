'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Menu, 
  X, 
  ArrowRight
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/products', label: 'คอลเลกชันประกัน' },
    { href: '/calculators/tax', label: 'คำนวณภาษี' },
    { href: '/calculators/life-value', label: 'ประเมินทุนมรดก' },
    { href: '/quiz', label: 'ค้นหาแผนเฉพาะคุณ' },
    { href: '/articles', label: 'บทความคัดสรร' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fbfaf6]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Identity - Editorial Serif */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-8 h-8 rounded-none border border-stone-900 bg-stone-900 text-[#c5a059] flex items-center justify-center shrink-0 transition-colors duration-400 group-hover:bg-[#c5a059] group-hover:text-stone-950 group-hover:border-[#c5a059]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl tracking-tight font-medium text-stone-900 whitespace-nowrap">
                Modtanoy<span className="italic font-serif text-[#c5a059] ml-1">Advisor</span>
              </span>
              <span className="hidden md:inline-flex items-center text-[10px] uppercase tracking-[0.25em] font-medium text-stone-400 border-l border-stone-300 pl-3 whitespace-nowrap font-mono">
                Private Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - High-End Editorial Style */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-stone-600">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1 transition-all duration-300 relative ${
                    isActive
                      ? 'text-stone-950 font-semibold'
                      : 'hover:text-stone-950'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a059]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Editorial Sharp CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium border border-stone-900 bg-stone-900 text-[#fcfbf7] hover:bg-[#c5a059] hover:border-[#c5a059] hover:text-stone-950 active:scale-[0.99] transition-all duration-300 cursor-pointer"
            >
              <span>ปรึกษาที่ปรึกษา คปภ.</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-none text-stone-800 hover:bg-stone-100 transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#fbfaf6] border-b border-stone-200 px-6 pt-4 pb-6 space-y-3">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-200 ${
                  isActive
                    ? 'text-stone-950 font-bold border-l-2 border-[#c5a059] pl-3'
                    : 'text-stone-600 hover:text-stone-950 pl-3'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-stone-200">
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-11 bg-stone-900 hover:bg-[#c5a059] text-white hover:text-stone-950 text-xs uppercase tracking-[0.2em] font-medium rounded-none transition-all duration-300"
            >
              <span>นัดหมายที่ปรึกษาการเงิน</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
