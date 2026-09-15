import React from 'react';
import Link from 'next/link';
import { Shield, Lock, FileText, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-brand-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Shield className="w-5 h-5 fill-white/20" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Modtanoy<span className="text-amber-400">Advisor</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              มดตะนอย แอดไวเซอร์ (ModtanoyAdvisor) แพลตฟอร์มตัวกลางอิสระในการให้ความรู้ เปรียบเทียบแผนประกันชีวิต สุขภาพ เกษียณอายุ และวางแผนภาษี &ldquo;ตัวเล็กแต่ปกป้องคุณยิ่งใหญ่&rdquo; พร้อมเชื่อมโยงที่ปรึกษาการเงินที่มีใบอนุญาต คปภ. ถูกต้องตามกฎหมาย
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <Award className="w-4 h-4 text-amber-400" />
                ใบอนุญาตตัวแทน คปภ.
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                <Lock className="w-4 h-4 text-wealth-500" />
                คุ้มครองข้อมูลตาม PDPA
              </span>
            </div>
          </div>

          {/* Column: แผนประกัน */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              แผนประกันยอดนิยม
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products?category=health-insurance" className="hover:text-white transition-colors">
                  ประกันสุขภาพเหมาจ่าย
                </Link>
              </li>
              <li>
                <Link href="/products?category=savings-insurance" className="hover:text-white transition-colors">
                  ประกันสะสมทรัพย์ ผลตอบแทนสูง
                </Link>
              </li>
              <li>
                <Link href="/products?category=annuity-pension" className="hover:text-white transition-colors">
                  ประกันบำนาญ ลดหย่อนภาษี
                </Link>
              </li>
              <li>
                <Link href="/products?category=life-protection" className="hover:text-white transition-colors">
                  ประกันชีวิตเพื่อมรดก
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: เครื่องคิดเลขการเงิน */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              เครื่องคิดเลขการเงิน
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/calculators/tax" className="hover:text-white transition-colors">
                  โปรแกรมคำนวณภาษี 2567
                </Link>
              </li>
              <li>
                <Link href="/calculators/life-value" className="hover:text-white transition-colors">
                  คำนวณทุนประกันคุ้มครองครอบครัว
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  แบบประเมินค้นหาประกันที่ใช่
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  คลังบทความและรีวิวประกัน
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: กฎหมาย & ความปลอดภัย */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              ความโปร่งใสและกฎหมาย
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  นโยบายความเป็นส่วนตัว (PDPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  ข้อกำหนดและเงื่อนไขการใช้บริการ
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-white transition-colors">
                  ลงทะเบียนติดต่อตัวแทน
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link href="/admin" className="text-brand-400 hover:text-brand-300 transition-colors font-semibold flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  ระบบตัวแทน / Admin หลังบ้าน
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Warning (OIC / คปภ. requirement) */}
        <div className="pt-8 text-xs text-slate-500 space-y-3 leading-relaxed">
          <p className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-slate-400">
            <strong className="text-slate-300 font-semibold">⚠️ คำเตือนสำคัญตามข้อกำหนดของสำนักงาน คปภ.:</strong><br />
            ผู้ขอเอาประกันภัยควรทำความเข้าใจในรายละเอียดความคุ้มครอง เงื่อนไข ข้อยกเว้น และผลประโยชน์ของแต่ละกรมธรรม์ก่อนตัดสินใจทำประกันภัยทุกครั้ง 
            ข้อมูลที่แสดงบนเว็บไซต์นี้เป็นเพียงข้อมูลสรุปเพื่อการเปรียบเทียบเบื้องต้นเท่านั้น มิใช่เอกสารส่วนหนึ่งของสัญญาประกันภัย 
            การอนุมัติรับประกันภัยขึ้นอยู่กับกฎเกณฑ์การพิจารณาของแต่ละบริษัทประกันชีวิต/วินาศภัย
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 pt-2">
            <div>
              © {new Date().getFullYear()} ModtanoyAdvisor. สงวนลิขสิทธิ์ทุกประการ.
            </div>
            <div className="text-xs text-slate-500">
              Verified Partner with Licensed Financial Consultants
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
