'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Calculator, 
  HelpCircle, 
  BookOpen, 
  Menu, 
  X, 
  PhoneCall, 
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ModtanoyAdvisor Logo - Clean single-line layout */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-700 transition-colors shrink-0">
              <Shield className="w-5 h-5 fill-white/20" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">
                Modtanoy<span className="text-sky-600">Advisor</span>
              </span>
              <span className="hidden md:inline-flex items-center text-[11px] font-medium text-slate-500 border-l border-slate-300 pl-2.5 whitespace-nowrap">
                ที่ปรึกษาประกันและการเงิน
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            <Link 
              href="/products" 
              className="px-3.5 py-2 rounded-xl hover:text-sky-700 hover:bg-sky-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Layers className="w-4 h-4 text-sky-600 shrink-0" />
              <span>แผนประกันทั้งหมด</span>
            </Link>

            <Link 
              href="/calculators/tax" 
              className="px-3.5 py-2 rounded-xl hover:text-sky-700 hover:bg-sky-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-sky-600 shrink-0" />
              <span>คำนวณภาษี 2567</span>
            </Link>

            <Link 
              href="/calculators/life-value" 
              className="px-3.5 py-2 rounded-xl hover:text-sky-700 hover:bg-sky-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-sky-600 shrink-0" />
              <span>คำนวณทุนประกัน</span>
            </Link>

            <Link 
              href="/quiz" 
              className="px-3.5 py-2 rounded-xl hover:text-sky-700 hover:bg-sky-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
              <span>ค้นหาแผนที่ใช่</span>
            </Link>

            <Link 
              href="/articles" 
              className="px-3.5 py-2 rounded-xl hover:text-sky-700 hover:bg-sky-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
              <span>สาระน่ารู้</span>
            </Link>
          </nav>

          {/* Standout Consultation CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>ปรึกษาตัวแทนฟรี</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-5 pt-3 pb-6 space-y-2">
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Layers className="w-5 h-5 text-sky-600 shrink-0" />
            <span>แผนประกันทั้งหมด</span>
          </Link>
          <Link
            href="/calculators/tax"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Calculator className="w-5 h-5 text-sky-600 shrink-0" />
            <span>เครื่องคำนวณภาษีและลดหย่อน</span>
          </Link>
          <Link
            href="/calculators/life-value"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Calculator className="w-5 h-5 text-sky-600 shrink-0" />
            <span>คำนวณทุนประกันที่เหมาะสม</span>
          </Link>
          <Link
            href="/quiz"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
            <span>แบบทดสอบค้นหาแผนประกัน</span>
          </Link>
          <Link
            href="/articles"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
            <span>สาระน่ารู้การเงินและภาษี</span>
          </Link>
          <div className="pt-3 border-t border-sky-100">
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-xs active:scale-98 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-white shrink-0" />
              <span>ปรึกษาตัวแทนมืออาชีพฟรี</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
