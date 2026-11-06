'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Lock, FileText, Award, AlertTriangle } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#09090b] text-zinc-400 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-100 shrink-0">
                <Shield className="w-4 h-4 fill-white/10" />
              </div>
              <span className="text-base font-bold text-zinc-100 tracking-tight">
                Modtanoy<span className="text-zinc-500 font-medium">Advisor</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pr-6">
              มดตะนอย แอดไวเซอร์ (ModtanoyAdvisor) แพลตฟอร์มตัวกลางอิสระในการเปรียบเทียบแผนประกันชีวิต สุขภาพ เกษียณอายุ และวางแผนภาษี &ldquo;ตัวเล็กแต่ปกป้องคุณยิ่งใหญ่&rdquo; พร้อมเชื่อมโยงที่ปรึกษาการเงินที่มีใบอนุญาต คปภ. ถูกต้องตามกฎหมาย
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-[#18181b] px-2.5 py-1 rounded-md border border-zinc-800 text-[11px] font-mono">
                <Award className="w-3.5 h-3.5 text-zinc-300" />
                <span>OIC LICENSED</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#18181b] px-2.5 py-1 rounded-md border border-zinc-800 text-[11px] font-mono">
                <Lock className="w-3.5 h-3.5 text-zinc-300" />
                <span>PDPA COMPLIANT</span>
              </span>
            </div>
          </div>

          {/* Column: แผนประกัน */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-300 mb-4 font-mono">
              แผนประกันยอดนิยม
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products?category=health-insurance" className="hover:text-zinc-100 transition-colors duration-150">
                  ประกันสุขภาพเหมาจ่าย
                </Link>
              </li>
              <li>
                <Link href="/products?category=savings-insurance" className="hover:text-zinc-100 transition-colors duration-150">
                  ประกันสะสมทรัพย์
                </Link>
              </li>
              <li>
                <Link href="/products?category=annuity-pension" className="hover:text-zinc-100 transition-colors duration-150">
                  ประกันบำนาญ ลดหย่อนภาษี
                </Link>
              </li>
              <li>
                <Link href="/products?category=life-protection" className="hover:text-zinc-100 transition-colors duration-150">
                  ประกันชีวิตเพื่อมรดก
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: เครื่องคิดเลขการเงิน */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-300 mb-4 font-mono">
              เครื่องมือคำนวณ
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/calculators/tax" className="hover:text-zinc-100 transition-colors duration-150">
                  โปรแกรมคำนวณภาษี 2567
                </Link>
              </li>
              <li>
                <Link href="/calculators/life-value" className="hover:text-zinc-100 transition-colors duration-150">
                  คำนวณทุนประกันครอบครัว
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-zinc-100 transition-colors duration-150">
                  แบบประเมินค้นหาแผน
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-zinc-100 transition-colors duration-150">
                  คลังบทความและรีวิว
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: กฎหมาย & ความปลอดภัย */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-300 mb-4 font-mono">
              ข้อมูลทางกฎหมาย
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-zinc-100 transition-colors duration-150 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  <span>นโยบายความเป็นส่วนตัว (PDPA)</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-100 transition-colors duration-150">
                  ข้อกำหนดและเงื่อนไข
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-zinc-100 transition-colors duration-150 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-zinc-500" />
                  <span>รายงานข้อมูล (Analytics)</span>
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-zinc-100 transition-colors duration-150">
                  ลงทะเบียนติดต่อตัวแทน
                </Link>
              </li>
              <li className="pt-2 border-t border-zinc-800">
                <Link href="/admin" className="text-zinc-300 hover:text-white transition-colors duration-150 font-medium flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Warning (OIC / คปภ. requirement) */}
        <div className="pt-8 text-xs text-zinc-500 space-y-3 leading-relaxed">
          <p className="bg-[#18181b] p-4 rounded-xl border border-zinc-800 text-zinc-400">
            <strong className="text-zinc-200 font-medium inline-flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              คำเตือนตามข้อกำหนดของสำนักงาน คปภ.:
            </strong>
            <br />
            ผู้ขอเอาประกันภัยควรทำความเข้าใจในรายละเอียดความคุ้มครอง เงื่อนไข ข้อยกเว้น และผลประโยชน์ของแต่ละกรมธรรม์ก่อนตัดสินใจทำประกันภัยทุกครั้ง 
            ข้อมูลที่แสดงบนเว็บไซต์นี้เป็นเพียงข้อมูลสรุปเพื่อการเปรียบเทียบเบื้องต้นเท่านั้น มิใช่เอกสารส่วนหนึ่งของสัญญาประกันภัย 
            การอนุมัติรับประกันภัยขึ้นอยู่กับกฎเกณฑ์การพิจารณาของแต่ละบริษัทประกันชีวิต/วินาศภัย
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-zinc-500 pt-2 font-mono text-[11px]">
            <div>
              © {new Date().getFullYear()} ModtanoyAdvisor. All rights reserved.
            </div>
            <div>
              Licensed Financial Advisory Platform
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
