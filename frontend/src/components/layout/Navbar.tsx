'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  Calculator, 
  BookOpen, 
  Menu, 
  X, 
  PhoneCall, 
  Layers,
  Sparkles
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/products', label: 'แผนประกันทั้งหมด', icon: Layers },
    { href: '/calculators/tax', label: 'คำนวณภาษี', icon: Calculator },
    { href: '/calculators/life-value', label: 'คำนวณทุนประกัน', icon: Calculator },
    { href: '/quiz', label: 'ค้นหาแผนที่ใช่', icon: Sparkles },
    { href: '/articles', label: 'สาระน่ารู้', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ModtanoyAdvisor Logo - Minimal & Clean */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105">
              <Shield className="w-4 h-4 fill-white/20" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-zinc-900 whitespace-nowrap">
                Modtanoy<span className="text-zinc-500 font-medium">Advisor</span>
              </span>
              <span className="hidden md:inline-flex items-center text-[11px] font-mono text-zinc-400 border-l border-zinc-200 pl-2.5 whitespace-nowrap uppercase tracking-wider">
                Financial & Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-zinc-600">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'hover:text-zinc-900 hover:bg-zinc-100/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Consultation CTA Button */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] transition duration-150 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>ปรึกษาตัวแทนฟรี</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#fafafa]/95 backdrop-blur-md border-b border-zinc-200 px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : 'text-zinc-700 hover:bg-zinc-100/70 hover:text-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-zinc-200">
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-lg active:scale-[0.98] transition duration-150"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ปรึกษาตัวแทนมืออาชีพฟรี</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
