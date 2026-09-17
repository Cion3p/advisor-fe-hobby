import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Database, 
  UserCheck, 
  Bell, 
  PhoneCall, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว (Privacy Policy & PDPA) | FinAdvisor TH',
  description: 'นโยบายการคุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) ของ FinAdvisor TH ข้อมูลของคุณปลอดภัย ไม่มีการนำเบอร์โทรไปขายต่อ',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-sky-700 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> หน้าแรก
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">นโยบายความเป็นส่วนตัว (Privacy Policy)</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>มาตรฐานคุ้มครองข้อมูลตาม พ.ร.บ. PDPA พ.ศ. 2562</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          นโยบายความเป็นส่วนตัว <br className="hidden sm:inline" />
          (Privacy Policy & PDPA Compliance)
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2567 • อัปเดตล่าสุดเมื่อวันที่ 17 กันยายน 2567
        </p>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>คำมั่นสัญญาด้านความปลอดภัย:</strong> FinAdvisor TH ให้ความสำคัญสูงสุดต่อการรักษาความลับและความปลอดภัยของข้อมูลส่วนบุคคลของท่าน เรายึดมั่นในหลักการความโปร่งใส และ<strong>ไม่มีนโยบายจำหน่าย แลกเปลี่ยน หรือเผยแพร่ข้อมูลเบอร์โทรศัพท์และอีเมลของท่านแก่บุคคลภายนอกเพื่อการค้าโดยเด็ดขาด</strong>
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xs space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span>บทนำและขอบเขตของนโยบาย</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            นโยบายความเป็นส่วนตัวฉบับนี้จัดทำขึ้นโดย <strong>FinAdvisor TH</strong> (&quot;เรา&quot; หรือ &quot;แพลตฟอร์ม&quot;) เพื่อชี้แจงให้ท่านทราบถึงแนวทางปฏิบัติในการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งาน (&quot;ท่าน&quot;) ที่เข้ามาใช้บริการบนเว็บไซต์ ไม่ว่าจะเป็นการเปรียบเทียบแผนประกันภัย การใช้โปรแกรมคำนวณภาษี หรือการลงทะเบียนขอรับคำปรึกษาทางการเงิน
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span>ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</span>
          </h2>
          <p className="text-slate-600">
            เราจะเก็บรวบรวมข้อมูลส่วนบุคคลเท่าที่จำเป็นตามวัตถุประสงค์ในการให้บริการ ดังต่อไปนี้:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-sky-600" /> ข้อมูลระบุตัวตนและข้อมูลติดต่อ
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>ชื่อ และ นามสกุล</li>
                <li>หมายเลขโทรศัพท์ติดต่อ</li>
                <li>ที่อยู่อีเมล (Email Address)</li>
                <li>จังหวัดที่พำนัก และช่วงเวลาที่สะดวกให้ติดต่อ</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> ข้อมูลเพื่อการวางแผนประกันและภาษี
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>เพศ และ ช่วงอายุ เพื่อคำนวณเบี้ยประกันตามตารางมรณะ</li>
                <li>งบประมาณเบี้ยประกันภัยที่ต้องการต่อปี</li>
                <li>ฐานเงินได้พึงประเมินและสิทธิลดหย่อนภาษีที่ระบุในโปรแกรมคำนวณ</li>
                <li>ความต้องการด้านความคุ้มครอง (สุขภาพ, มรดก, เกษียณ)</li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-amber-50 border border-amber-200/70 p-3.5 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>หมายเหตุ:</strong> แพลตฟอร์มไม่มีการร้องขอหรือเก็บรวบรวมข้อมูลอ่อนไหว (Sensitive Data) เช่น ประวัติอาชญากรรม หรือข้อมูลพันธุกรรม ข้อมูลสุขภาพเบื้องต้นจะถูกใช้เพื่อการคัดกรองเบื้องต้นก่อนการยื่นคำขอทำประกันภัยเท่านั้น
            </span>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span>วัตถุประสงค์ในการเก็บรวบรวมและประมวลผลข้อมูล</span>
          </h2>
          <p className="text-slate-600">เรานำข้อมูลส่วนบุคคลของท่านไปใช้เพื่อวัตถุประสงค์ต่อไปนี้:</p>
          <ul className="space-y-2 pl-2 text-slate-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>การติดต่อประสานงาน:</strong> เพื่อให้ตัวแทนประกันชีวิตและที่ปรึกษาการเงินที่ได้รับใบอนุญาตถูกต้องจากสำนักงาน คปภ. ติดต่อกลับเพื่อให้ข้อมูล เปรียบเทียบผลประโยชน์ และคำนวณเบี้ยประกันภัยตามที่ท่านร้องขอ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>การปรับแต่งข้อเสนอเฉพาะบุคคล:</strong> เพื่อออกแบบโครงสร้างแผนประกันภัยและแนวทางการวางแผนลดหย่อนภาษีที่ตรงกับความต้องการและงบประมาณของท่าน</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>การปฏิบัติตามกฎหมาย:</strong> เพื่อปฏิบัติตามกฎหมายและประกาศข้อบังคับของสำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)</span>
            </li>
          </ul>
        </section>

        <hr className="border-slate-100" />

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span>การเปิดเผยข้อมูลส่วนบุคคลแก่บุคคลภายนอก</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่บุคคลภายนอก เว้นแต่กรณีที่จำเป็นเพื่อการให้บริการตามที่ท่านได้แสดงเจตนาไว้ ได้แก่:
          </p>
          <ul className="space-y-2 pl-2 text-slate-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>ตัวแทนประกันชีวิตและที่ปรึกษาการเงินพันธมิตร:</strong> เฉพาะบุคคลที่มีใบอนุญาตถูกต้องตามกฎหมาย และได้ลงนามในข้อตกลงรักษาความลับของข้อมูลลูกค้า (Confidentiality Agreement)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>บริษัทประกันชีวิตพันธมิตร:</strong> (เช่น AIA, เมืองไทยประกันชีวิต, อลิอันซ์ อยุธยา, กรุงไทย-แอกซ่า, เอฟดับบลิวดี, กรุงเทพประกันชีวิต) เมื่อท่านตกลงส่งใบคำขอเอาประกันภัย</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>หน่วยงานราชการหรือพนักงานเจ้าหน้าที่:</strong> เมื่อมีคำสั่งศาล หรือเป็นไปตามบทบัญญัติแห่งกฎหมาย</span>
            </li>
          </ul>
        </section>

        <hr className="border-slate-100" />

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">5</span>
            <span>สิทธิของเจ้าของข้อมูลส่วนบุคคล (Data Subject Rights)</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิในการดำเนินการต่อข้อมูลส่วนบุคคลของท่าน ดังนี้:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-slate-900 block mb-1">1. สิทธิในการเพิกถอนความยินยอม</strong>
              <span className="text-slate-600">ท่านสามารถแจ้งยกเลิกความยินยอมในการติดต่อได้ตลอดเวลา</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-slate-900 block mb-1">2. สิทธิในการเข้าถึงและขอรับสำเนา</strong>
              <span className="text-slate-600">ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลที่เกี่ยวกับท่าน</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-slate-900 block mb-1">3. สิทธิในการขอให้แก้ไขข้อมูล</strong>
              <span className="text-slate-600">ขอแก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง เป็นปัจจุบัน และสมบูรณ์</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <strong className="text-slate-900 block mb-1">4. สิทธิในการขอให้ลบหรือทำลาย</strong>
              <span className="text-slate-600">ขอให้ลบ ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวบุคคลได้</span>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">6</span>
            <span>มาตรการรักษาความปลอดภัยของข้อมูล</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            เรากำหนดมาตรการรักษาความปลอดภัยทางเทคนิคและการบริหารจัดการที่เข้มงวด โดยข้อมูลทั้งหมดจะถูกส่งผ่านช่องทางการสื่อสารที่เข้ารหัสตามมาตรฐานความปลอดภัยสูง (SSL/TLS Encryption 256-bit) เซิร์ฟเวอร์จัดเก็บข้อมูลมีระบบ Firewall และการจำกัดสิทธิ์การเข้าถึงข้อมูลเฉพาะบุคลากรที่เกี่ยวข้องเท่านั้น
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">7</span>
            <span>ช่องทางการติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวฉบับนี้ หรือประสงค์จะใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล สามารถติดต่อเจ้าหน้าที่ของเราได้ที่:
          </p>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="font-bold text-sm text-slate-900">เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (Data Protection Officer)</div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-600" />
              <span>อีเมล: privacy@finadvisor.co.th / contact@finadvisor.co.th</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-sky-600" />
              <span>โทรศัพท์: 02-123-4567 (จันทร์ - ศุกร์ 09:00 - 18:00 น.)</span>
            </div>
            <div className="text-slate-500 pt-1">
              ที่อยู่: ศูนย์ประสานงานและบริการข้อมูลที่ปรึกษาการเงิน FinAdvisor TH กรุงเทพมหานคร
            </div>
          </div>
        </section>
      </div>

      {/* Back Button */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแรก
        </Link>
      </div>
    </div>
  );
}
