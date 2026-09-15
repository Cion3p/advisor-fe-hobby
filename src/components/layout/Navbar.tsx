'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ModtanoyAdvisor Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-all duration-300">
              <Shield className="w-6 h-6 fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-tight">
                  Modtanoy<span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Advisor</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide block">
                มดตะนอย แอดไวเซอร์ • ตัวเล็กแต่ปกป้องคุณยิ่งใหญ่
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            <Link 
              href="/products" 
              className="px-3.5 py-2 rounded-xl hover:text-brand-600 hover:bg-slate-100/70 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-brand-600" />
              แผนประกันทั้งหมด
            </Link>

            <Link 
              href="/calculators/tax" 
              className="px-3.5 py-2 rounded-xl hover:text-emerald-700 hover:bg-emerald-50/70 transition-all flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              คำนวณภาษี 2567
            </Link>

            <Link 
              href="/calculators/life-value" 
              className="px-3.5 py-2 rounded-xl hover:text-brand-600 hover:bg-slate-100/70 transition-all flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-brand-600" />
              คำนวณทุนประกัน
            </Link>

            <Link 
              href="/quiz" 
              className="px-3.5 py-2 rounded-xl hover:text-orange-600 hover:bg-orange-50/70 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              ค้นหาแผนที่ใช่ (AI Quiz)
            </Link>

            <Link 
              href="/articles" 
              className="px-3.5 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-100/70 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              สาระน่ารู้
            </Link>
          </nav>

          {/* Consultation CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
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
            <Layers className="w-5 h-5 text-brand-600" />
            แผนประกันทั้งหมด
          </Link>
          <Link
            href="/calculators/tax"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Calculator className="w-5 h-5 text-emerald-600" />
            เครื่องคำนวณภาษีและลดหย่อน
          </Link>
          <Link
            href="/calculators/life-value"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Calculator className="w-5 h-5 text-brand-600" />
            คำนวณทุนประกันที่เหมาะสม
          </Link>
          <Link
            href="/quiz"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <Sparkles className="w-5 h-5 text-orange-500" />
            แบบทดสอบค้นหาแผนประกัน
          </Link>
          <Link
            href="/articles"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 font-medium"
          >
            <BookOpen className="w-5 h-5 text-slate-400" />
            สาระน่ารู้การเงินและภาษี
          </Link>
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold py-3 rounded-xl shadow"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              ปรึกษาตัวแทนมืออาชีพฟรี
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
