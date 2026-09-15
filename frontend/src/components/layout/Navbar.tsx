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
  Layers
} from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-900 to-brand-600 bg-clip-text text-transparent block leading-tight">
                FinAdvisor TH
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                เปรียบเทียบประกันและการเงินมืออาชีพ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            <Link 
              href="/products" 
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-brand-600" />
              แผนประกันทั้งหมด
            </Link>

            <Link 
              href="/calculators/tax" 
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-wealth-600" />
              คำนวณภาษี 2567
            </Link>

            <Link 
              href="/calculators/life-value" 
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-brand-600" />
              คำนวณทุนประกัน
            </Link>

            <Link 
              href="/quiz" 
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              แบบทดสอบหาแผนที่ใช่
            </Link>

            <Link 
              href="/articles" 
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              สาระน่ารู้
            </Link>
          </nav>

          {/* Consultation CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-brand-600/20 hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>ปรึกษาตัวแทนฟรี</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-brand-50 font-medium"
          >
            <Layers className="w-5 h-5 text-brand-600" />
            แผนประกันทั้งหมด
          </Link>
          <Link
            href="/calculators/tax"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-brand-50 font-medium"
          >
            <Calculator className="w-5 h-5 text-wealth-600" />
            เครื่องคำนวณภาษีและลดหย่อน
          </Link>
          <Link
            href="/calculators/life-value"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-brand-50 font-medium"
          >
            <Calculator className="w-5 h-5 text-brand-600" />
            คำนวณทุนประกันที่เหมาะสม
          </Link>
          <Link
            href="/quiz"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-brand-50 font-medium"
          >
            <HelpCircle className="w-5 h-5 text-amber-500" />
            แบบทดสอบค้นหาแผนประกัน
          </Link>
          <Link
            href="/articles"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-brand-50 font-medium"
          >
            <BookOpen className="w-5 h-5 text-slate-500" />
            สาระน่ารู้การเงินและภาษี
          </Link>
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-brand-600 text-white font-semibold py-3 rounded-xl shadow"
            >
              <PhoneCall className="w-4 h-4" />
              ปรึกษาตัวแทนมืออาชีพฟรี
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
