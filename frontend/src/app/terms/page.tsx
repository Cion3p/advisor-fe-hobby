import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Scale, 
  ArrowLeft, 
  Building2, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ข้อกำหนดและเงื่อนไขการใช้บริการ (Terms of Service) | ModtanoyAdvisor',
  description: 'ข้อกำหนด เงื่อนไข และข้อตกลงในการใช้งานแพลตฟอร์มเปรียบเทียบแผนประกันภัยและบริการที่ปรึกษาการเงิน ModtanoyAdvisor',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-zinc-900 transition-colors duration-150 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> หน้าแรก
        </Link>
        <span>/</span>
        <span className="text-zinc-800 font-medium">ข้อกำหนดและเงื่อนไขการใช้งาน (Terms of Service)</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-mono font-medium">
          <Scale className="w-3.5 h-3.5 text-zinc-600" />
          <span>TERMS & DISCLAIMER</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight leading-snug">
          ข้อกำหนดและเงื่อนไขการใช้บริการ
        </h1>

        <p className="text-xs font-mono text-zinc-400">
          มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2567 • อัปเดตล่าสุดปี 2567
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-600 leading-relaxed">
            <strong>คำชี้แจงสำคัญเกี่ยวกับบริการประกันภัย:</strong> ModtanoyAdvisor เป็นแพลตฟอร์มกลางในการให้ข้อมูลความรู้ เครื่องมือคำนวณเปรียบเทียบเบื้องต้น และประสานงานส่งต่อผู้ขอรับคำปรึกษาไปยังที่ปรึกษาการเงินและตัวแทนประกันชีวิตที่มีใบอนุญาตถูกต้องจากสำนักงาน คปภ. (OIC) การอนุมัติรับประกันภัยและเงื่อนไขความคุ้มครองขั้นสุดท้ายขึ้นอยู่กับดุลยพินิจของบริษัทประกันภัยแต่ละแห่งตามหลักเกณฑ์การรับประกัน
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 space-y-8 text-zinc-700 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-zinc-100 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-zinc-200">1</span>
            <span>การยอมรับข้อกำหนดในการให้บริการ</span>
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            การเข้าถึงและใช้งานเว็บไซต์ <strong>ModtanoyAdvisor</strong> รวมถึงการใช้โปรแกรมคำนวณภาษี โปรแกรมคำนวณทุนประกัน หรือการกรอกแบบฟอร์มขอรับคำปรึกษา ถือว่าท่านได้รับทราบ เข้าใจ และตกลงที่จะผูกพันตนเองตามข้อกำหนดและเงื่อนไขฉบับนี้โดยไม่มีเงื่อนไข หากท่านไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาระงับการใช้งานเว็บไซต์ทันที
          </p>
        </section>

        <hr className="border-zinc-100" />

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-zinc-100 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-zinc-200">2</span>
            <span>ลักษณะการให้บริการและขอบเขตความรับผิดชอบ</span>
          </h2>
          <div className="space-y-2.5 text-zinc-700 text-xs sm:text-sm">
            <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 text-xs">
                <Building2 className="w-3.5 h-3.5 text-zinc-600" /> บทบาทของแพลตฟอร์ม
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                ModtanoyAdvisor ทำหน้าที่เป็นช่องทางอำนวยความสะดวกในการค้นคว้าข้อมูล นำเสนอตารางผลประโยชน์ เปรียบเทียบแผนประกันภัย และส่งต่อความต้องการของท่านไปยังตัวแทนประกันชีวิตหรือที่ปรึกษาการเงินที่มีใบอนุญาตจากสำนักงาน คปภ. (OIC) เท่านั้น
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <h4 className="font-bold text-zinc-900 flex items-center gap-1.5 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-zinc-600" /> ผลการคำนวณเบี้ยและลดหย่อนภาษี
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                ตัวเลขเบี้ยประกันภัย วงเงินความคุ้มครอง และผลการคำนวณภาษีที่ปรากฏบนเว็บไซต์เป็นการ <strong>&quot;ประมาณการเบื้องต้น&quot;</strong> เพื่อประกอบการศึกษาพิจารณา ตัวเลขเบี้ยประกันจริงจะขึ้นอยู่กับอายุ เพศ ขั้นอาชีพ และผลการประเมินความเสี่ยงสุขภาพของบริษัทประกันภัย
              </p>
            </div>
          </div>
        </section>

        <hr className="border-zinc-100" />

        {/* Section 3 */}
        <section className="space-y-2.5">
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-zinc-100 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-zinc-200">3</span>
            <span>หน้าที่และความรับผิดชอบของผู้ขอเอาประกันภัย</span>
          </h2>
          <ul className="space-y-2 pl-2 text-zinc-600 text-xs sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0"></span>
              <span><strong>หลักสุจริตอย่างยิ่ง (Utmost Good Faith):</strong> การแถลงข้อมูลสุขภาพและประวัติการรักษาพยาบาลต่อบริษัทประกันภัยต้องเป็นความจริง การปกปิดข้อเท็จจริงอาจเป็นเหตุให้บริษัทประกันภัยบอกล้างสัญญาได้</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0"></span>
              <span><strong>การตรวจสอบใบอนุญาตตัวแทน:</strong> ท่านมีสิทธิในการขอตรวจสอบบัตรประจำตัวตัวแทนประกันชีวิตที่ออกโดยสำนักงาน คปภ. ก่อนการตกลงทำนิติกรรมใดๆ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0"></span>
              <span><strong>การชำระเบี้ยประกันภัย:</strong> ต้องชำระเข้าบัญชีของบริษัทประกันภัยโดยตรงเท่านั้น ห้ามโอนเงินเข้าบัญชีส่วนตัวของตัวแทนประกันชีวิต</span>
            </li>
          </ul>
        </section>

        <hr className="border-zinc-100" />

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-zinc-100 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-zinc-200">4</span>
            <span>ทรัพย์สินทางปัญญา (Intellectual Property)</span>
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            เนื้อหาทั้งหมดที่แสดงบนเว็บไซต์ ไม่ว่าจะเป็น ข้อความ บทความ โค้ดโปรแกรม เครื่องคำนวณภาษี กราฟิก และการจัดวางโครงสร้าง เป็นทรัพย์สินทางปัญญาของ ModtanoyAdvisor
          </p>
        </section>

        <hr className="border-zinc-100" />

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-zinc-100 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-zinc-200">5</span>
            <span>กฎหมายที่ใช้บังคับและการระงับข้อพิพาท</span>
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            ข้อกำหนดและเงื่อนไขฉบับนี้ให้อยู่ภายใต้การบังคับใช้และตีความตามกฎหมายแห่งราชอาณาจักรไทย ข้อพิพาทใดๆ ให้อยู่ในเขตอำนาจการพิจารณาของศาลยุติธรรมในประเทศไทย
          </p>
        </section>
      </div>

      {/* Back Button */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition-colors duration-150 active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับสู่หน้าแรก</span>
        </Link>
      </div>
    </div>
  );
}
