import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  PhoneCall, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว (Privacy Policy & PDPA) | ModtanoyAdvisor',
  description: 'นโยบายการคุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) ของ ModtanoyAdvisor ข้อมูลของคุณปลอดภัย ไม่มีการนำเบอร์โทรไปขายต่อ',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors duration-150 flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5 text-[#c5a059]" /> หน้าแรก
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-900 font-bold uppercase tracking-wider">PRIVACY POLICY & PDPA</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 space-y-5 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300 text-[10px] font-mono uppercase tracking-[0.25em]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>PDPA COMPLIANCE 2562</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight leading-tight">
          นโยบายความเป็นส่วนตัว (Privacy Policy & PDPA)
        </h1>

        <p className="text-xs font-mono text-stone-400">
          มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2567 • อัปเดตตามประกาศเกณฑ์ล่าสุดปี 2567-2568
        </p>

        <div className="p-5 rounded-none bg-stone-50 border border-stone-200 flex items-start gap-3.5">
          <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
          <p className="text-xs text-stone-700 leading-relaxed font-light">
            <strong className="font-serif font-bold text-stone-900">คำมั่นสัญญาด้านความปลอดภัย:</strong> ModtanoyAdvisor ให้ความสำคัญสูงสุดต่อการรักษาความลับและความปลอดภัยของข้อมูลส่วนบุคคลของท่าน เรายึดมั่นในหลักการความโปร่งใส และ<strong className="text-stone-900 font-medium">ไม่มีนโยบายจำหน่าย แลกเปลี่ยน หรือเผยแพร่ข้อมูลเบอร์โทรศัพท์และอีเมลของท่านแก่บุคคลภายนอกเพื่อการค้าโดยเด็ดขาด</strong>
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 space-y-8 text-stone-700 text-xs sm:text-sm leading-relaxed font-light shadow-xs">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">1</span>
            <span>บทนำและขอบเขตของนโยบาย</span>
          </h2>
          <p className="text-stone-600 leading-relaxed">
            นโยบายความเป็นส่วนตัวฉบับนี้จัดทำขึ้นโดย <strong>ModtanoyAdvisor</strong> (&quot;เรา&quot; หรือ &quot;แพลตฟอร์ม&quot;) เพื่อชี้แจงให้ท่านทราบถึงแนวทางปฏิบัติในการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้งาน (&quot;ท่าน&quot;) ที่เข้ามาใช้บริการบนเว็บไซต์ ไม่ว่าจะเป็นการเปรียบเทียบแผนประกันภัย การใช้โปรแกรมคำนวณภาษี หรือการลงทะเบียนขอรับคำปรึกษาทางการเงิน
          </p>
        </section>

        <hr className="border-stone-100" />

        {/* Section 2 */}
        <section className="space-y-3.5">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">2</span>
            <span>ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</span>
          </h2>
          <p className="text-stone-600">
            เราจะเก็บรวบรวมข้อมูลส่วนบุคคลเท่าที่จำเป็นตามวัตถุประสงค์ในการให้บริการ ดังต่อไปนี้:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-none border border-stone-200 bg-stone-50/60 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-xs flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-[#c5a059]" /> ข้อมูลระบุตัวตนและข้อมูลติดต่อ
              </h4>
              <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                <li>ชื่อ และ นามสกุล</li>
                <li>หมายเลขโทรศัพท์ติดต่อ</li>
                <li>ที่อยู่อีเมล (Email Address)</li>
                <li>จังหวัดที่พำนัก และช่วงเวลาที่สะดวกให้ติดต่อ</li>
              </ul>
            </div>

            <div className="p-4 rounded-none border border-stone-200 bg-stone-50/60 space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-xs flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#c5a059]" /> ข้อมูลเพื่อการวางแผนประกันและภาษี
              </h4>
              <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                <li>เพศ และ ช่วงอายุ เพื่อคำนวณเบี้ยประกัน</li>
                <li>งบประมาณเบี้ยประกันภัยที่ต้องการต่อปี</li>
                <li>ฐานเงินได้พึงประเมินและสิทธิลดหย่อนภาษี</li>
                <li>ความต้องการด้านความคุ้มครอง</li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-stone-600 bg-stone-50 border border-stone-200 p-4 rounded-none flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#8c6d46] shrink-0 mt-0.5" />
            <span>
              <strong>หมายเหตุ:</strong> แพลตฟอร์มไม่มีการร้องขอหรือเก็บรวบรวมข้อมูลอ่อนไหว (Sensitive Data) เช่น ประวัติอาชญากรรม หรือข้อมูลพันธุกรรม ข้อมูลสุขภาพเบื้องต้นจะถูกใช้เพื่อการคัดกรองเบื้องต้นเท่านั้น
            </span>
          </div>
        </section>

        <hr className="border-stone-100" />

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">3</span>
            <span>วัตถุประสงค์ในการเก็บรวบรวมและประมวลผลข้อมูล</span>
          </h2>
          <ul className="space-y-2 pl-2 text-stone-600 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
              <span><strong>การติดต่อประสานงาน:</strong> เพื่อให้ตัวแทนประกันชีวิตและที่ปรึกษาการเงินที่ได้รับใบอนุญาตถูกต้องจากสำนักงาน คปภ. ติดต่อกลับเพื่อให้ข้อมูล เปรียบเทียบผลประโยชน์ และคำนวณเบี้ยประกันภัยตามที่ท่านร้องขอ</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
              <span><strong>การปรับแต่งข้อเสนอเฉพาะบุคคล:</strong> เพื่อออกแบบโครงสร้างแผนประกันภัยและแนวทางการวางแผนลดหย่อนภาษีที่ตรงกับความต้องการและงบประมาณของท่าน</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
              <span><strong>การปฏิบัติตามกฎหมาย:</strong> เพื่อปฏิบัติตามกฎหมายและประกาศข้อบังคับของสำนักงาน คปภ.</span>
            </li>
          </ul>
        </section>

        <hr className="border-stone-100" />

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">4</span>
            <span>สิทธิของเจ้าของข้อมูลส่วนบุคคล (Data Subject Rights)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-none border border-stone-200 bg-stone-50">
              <strong className="text-stone-900 font-serif block mb-1">1. สิทธิในการเพิกถอนความยินยอม</strong>
              <span className="text-stone-600">ท่านสามารถแจ้งยกเลิกความยินยอมในการติดต่อได้ตลอดเวลา</span>
            </div>
            <div className="p-3.5 rounded-none border border-stone-200 bg-stone-50">
              <strong className="text-stone-900 font-serif block mb-1">2. สิทธิในการเข้าถึงและขอรับสำเนา</strong>
              <span className="text-stone-600">ขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลที่เกี่ยวกับท่าน</span>
            </div>
            <div className="p-3.5 rounded-none border border-stone-200 bg-stone-50">
              <strong className="text-stone-900 font-serif block mb-1">3. สิทธิในการขอให้แก้ไขข้อมูล</strong>
              <span className="text-stone-600">ขอแก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง เป็นปัจจุบัน และสมบูรณ์</span>
            </div>
            <div className="p-3.5 rounded-none border border-stone-200 bg-stone-50">
              <strong className="text-stone-900 font-serif block mb-1">4. สิทธิในการขอให้ลบหรือทำลาย</strong>
              <span className="text-stone-600">ขอให้ลบ ทำลาย หรือทำให้ข้อมูลไม่สามารถระบุตัวบุคคลได้</span>
            </div>
          </div>
        </section>

        <hr className="border-stone-100" />

        {/* Section 5: Contact */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">5</span>
            <span>ช่องทางการติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</span>
          </h2>
          <div className="p-5 rounded-none bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
            <div className="font-serif font-bold text-stone-900">เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (Data Protection Officer)</div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-mono">อีเมล: privacy@modtanoyadvisor.com</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="font-mono">โทรศัพท์: 02-123-4567 (จันทร์ - ศุกร์ 09:00 - 18:00 น.)</span>
            </div>
          </div>
        </section>
      </div>

      {/* Back Button */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-10 px-6 rounded-none bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 font-mono uppercase tracking-wider text-xs transition-colors duration-150 border border-stone-800"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>กลับสู่หน้าแรก</span>
        </Link>
      </div>
    </div>
  );
}
