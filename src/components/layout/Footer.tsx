'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Lock, Award, AlertTriangle, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#0c0b0a] text-stone-400 pt-20 pb-14 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-stone-800/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-none border border-stone-700 bg-stone-900 text-[#c5a059] flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-normal text-stone-100 tracking-tight">
                Modtanoy<span className="italic font-serif text-[#c5a059] ml-1">Advisor</span>
              </span>
            </div>
            
            <p className="text-xs text-stone-400 leading-loose pr-6 font-light">
              มดตะนอย แอดไวเซอร์ (ModtanoyAdvisor) สุนทรียศาสตร์แห่งการวางแผนประกันและมรดกครอบครัวชั้นสูง แพลตฟอร์มตัวกลางอิสระในการนำเสนอข้อมูล เปรียบเทียบผลประโยชน์กรมธรรม์ และเชื่อมโยงที่ปรึกษาการเงินที่มีใบอนุญาต คปภ. ถูกต้องตามกฎหมาย
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-stone-800 bg-[#121110] text-[10px] uppercase tracking-[0.25em] font-mono text-stone-300">
                <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>OIC VERIFIED</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-stone-800 bg-[#121110] text-[10px] uppercase tracking-[0.25em] font-mono text-stone-300">
                <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>PDPA COMPLIANT</span>
              </span>
            </div>
          </div>

          {/* Column: แผนประกัน */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              PORTFOLIO
            </h3>
            <ul className="space-y-3 text-xs tracking-wide">
              <li>
                <Link href="/products?category=health-insurance" className="hover:text-stone-100 transition-colors duration-300 flex items-center gap-1 group">
                  <span>ประกันสุขภาพเหมาจ่าย</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#c5a059] transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/products?category=savings-insurance" className="hover:text-stone-100 transition-colors duration-300 flex items-center gap-1 group">
                  <span>ประกันสะสมทรัพย์ผลตอบแทนสูง</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#c5a059] transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/products?category=annuity-pension" className="hover:text-stone-100 transition-colors duration-300 flex items-center gap-1 group">
                  <span>ประกันบำนาญและลดหย่อนภาษี</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#c5a059] transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/products?category=life-protection" className="hover:text-stone-100 transition-colors duration-300 flex items-center gap-1 group">
                  <span>ประกันชีวิตเพื่อการส่งต่อมรดก</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#c5a059] transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: เครื่องคิดเลขการเงิน */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              INSTRUMENTS
            </h3>
            <ul className="space-y-3 text-xs tracking-wide">
              <li>
                <Link href="/calculators/tax" className="hover:text-stone-100 transition-colors duration-300">
                  โปรแกรมคำนวณภาษี 2567
                </Link>
              </li>
              <li>
                <Link href="/calculators/life-value" className="hover:text-stone-100 transition-colors duration-300">
                  ประเมินมูลค่าทุนมรดกครอบครัว
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-stone-100 transition-colors duration-300">
                  แบบประเมินความต้องการส่วนบุคคล
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-stone-100 transition-colors duration-300">
                  บทความวิเคราะห์และบทเรียนชีวิต
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: กฎหมาย & ความโปร่งใส */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              LEGAL & GOVERNANCE
            </h3>
            <ul className="space-y-3 text-xs tracking-wide">
              <li>
                <Link href="/privacy-policy" className="hover:text-stone-100 transition-colors duration-300">
                  นโยบายความเป็นส่วนตัว (PDPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-stone-100 transition-colors duration-300">
                  ข้อกำหนดและเงื่อนไขการใช้งาน
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-stone-100 transition-colors duration-300">
                  รายงานข้อมูลความโปร่งใส
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-stone-100 transition-colors duration-300">
                  ลงทะเบียนติดต่อที่ปรึกษาการเงิน
                </Link>
              </li>
              <li className="pt-2 border-t border-stone-800">
                <Link href="/admin" className="text-[#c5a059] hover:text-[#dfc278] transition-colors duration-300 font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer Warning (OIC / คปภ.) */}
        <div className="pt-10 space-y-4 text-xs text-stone-500 leading-relaxed font-light">
          <div className="bg-[#121110] p-5 rounded-none border border-stone-800/80 text-stone-400">
            <div className="text-stone-300 font-serif text-sm flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>คำเตือนตามข้อกำหนดของสำนักงาน คปภ.:</span>
            </div>
            ผู้ขอเอาประกันภัยควรทำความเข้าใจในรายละเอียดความคุ้มครอง เงื่อนไข ข้อยกเว้น และผลประโยชน์ของแต่ละกรมธรรม์ก่อนตัดสินใจทำประกันภัยทุกครั้ง 
            ข้อมูลที่แสดงบนเว็บไซต์นี้เป็นเพียงข้อมูลสรุปเพื่อการเปรียบเทียบเบื้องต้นเท่านั้น มิใช่เอกสารส่วนหนึ่งของสัญญาประกันภัย 
            การอนุมัติรับประกันภัยขึ้นอยู่กับกฎเกณฑ์การพิจารณาของแต่ละบริษัทประกันชีวิต/วินาศภัย
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-500 pt-2 font-mono text-[11px]">
            <div>
              © {new Date().getFullYear()} ModtanoyAdvisor. All rights reserved.
            </div>
            <div className="uppercase tracking-[0.2em] text-[#c5a059]">
              High-End Editorial Showcase Edition
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
