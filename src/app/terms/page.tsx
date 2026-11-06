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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors duration-150 flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5 text-[#c5a059]" /> หน้าแรก
        </Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-900 font-bold uppercase tracking-wider">TERMS OF SERVICE</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 space-y-5 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300 text-[10px] font-mono uppercase tracking-[0.25em]">
          <Scale className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>TERMS & REGULATORY FRAMEWORK</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight leading-tight">
          ข้อกำหนดและเงื่อนไขการใช้บริการ
        </h1>

        <p className="text-xs font-mono text-stone-400">
          มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2567 • อัปเดตล่าสุดปี 2567-2568
        </p>

        <div className="p-5 rounded-none bg-stone-50 border border-stone-200 flex items-start gap-3.5">
          <AlertTriangle className="w-4 h-4 text-[#8c6d46] shrink-0 mt-0.5" />
          <p className="text-xs text-stone-700 leading-relaxed font-light">
            <strong className="font-serif font-bold text-stone-900">คำชี้แจงสำคัญเกี่ยวกับบริการประกันภัย:</strong> ModtanoyAdvisor เป็นแพลตฟอร์มกลางในการให้ข้อมูลความรู้ เครื่องมือคำนวณเปรียบเทียบเบื้องต้น และประสานงานส่งต่อผู้ขอรับคำปรึกษาไปยังที่ปรึกษาการเงินและตัวแทนประกันชีวิตที่มีใบอนุญาตถูกต้องจากสำนักงาน คปภ. (OIC) การอนุมัติรับประกันภัยและเงื่อนไขความคุ้มครองขั้นสุดท้ายขึ้นอยู่กับดุลยพินิจของบริษัทประกันภัยแต่ละแห่งตามหลักเกณฑ์การรับประกัน
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 space-y-8 text-stone-700 text-xs sm:text-sm leading-relaxed font-light shadow-xs">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">1</span>
            <span>การยอมรับข้อกำหนดในการให้บริการ</span>
          </h2>
          <p className="text-stone-600 leading-relaxed">
            การเข้าถึงและใช้งานเว็บไซต์ <strong>ModtanoyAdvisor</strong> รวมถึงการใช้โปรแกรมคำนวณภาษี โปรแกรมคำนวณทุนประกัน หรือการกรอกแบบฟอร์มขอรับคำปรึกษา ถือว่าท่านได้รับทราบ เข้าใจ และตกลงที่จะผูกพันตนเองตามข้อกำหนดและเงื่อนไขฉบับนี้โดยไม่มีเงื่อนไข หากท่านไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาระงับการใช้งานเว็บไซต์ทันที
          </p>
        </section>

        <hr className="border-stone-100" />

        {/* Section 2 */}
        <section className="space-y-3.5">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">2</span>
            <span>ลักษณะการให้บริการและขอบเขตความรับผิดชอบ</span>
          </h2>
          <div className="space-y-3 text-stone-700 text-xs sm:text-sm">
            <div className="p-4 rounded-none bg-stone-50 border border-stone-200 space-y-1.5">
              <h4 className="font-serif font-bold text-stone-900 flex items-center gap-2 text-xs">
                <Building2 className="w-3.5 h-3.5 text-[#c5a059]" /> บทบาทของแพลตฟอร์ม
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                ModtanoyAdvisor ทำหน้าที่เป็นช่องทางอำนวยความสะดวกในการค้นคว้าข้อมูล นำเสนอตารางผลประโยชน์ เปรียบเทียบแผนประกันภัย และส่งต่อความต้องการของท่านไปยังตัวแทนประกันชีวิตหรือที่ปรึกษาการเงินที่มีใบอนุญาตจากสำนักงาน คปภ. (OIC) เท่านั้น
              </p>
            </div>

            <div className="p-4 rounded-none bg-stone-50 border border-stone-200 space-y-1.5">
              <h4 className="font-serif font-bold text-stone-900 flex items-center gap-2 text-xs">
                <HelpCircle className="w-3.5 h-3.5 text-[#c5a059]" /> ผลการคำนวณเบี้ยและลดหย่อนภาษี
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                ตัวเลขเบี้ยประกันภัย วงเงินความคุ้มครอง และผลการคำนวณภาษีที่ปรากฏบนเว็บไซต์เป็นการ <strong>&quot;ประมาณการเบื้องต้น&quot;</strong> เพื่อประกอบการศึกษาพิจารณา ตัวเลขเบี้ยประกันจริงจะขึ้นอยู่กับอายุ เพศ ขั้นอาชีพ และผลการประเมินความเสี่ยงสุขภาพของบริษัทประกันภัย
              </p>
            </div>
          </div>
        </section>

        <hr className="border-stone-100" />

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">3</span>
            <span>หน้าที่และความรับผิดชอบของผู้ขอเอาประกันภัย</span>
          </h2>
          <ul className="space-y-2 pl-2 text-stone-600 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
              <span><strong>หลักสุจริตอย่างยิ่ง (Utmost Good Faith):</strong> การแถลงข้อมูลสุขภาพและประวัติการรักษาพยาบาลต่อบริษัทประกันภัยต้องเป็นความจริง การปกปิดข้อเท็จจริงอาจเป็นเหตุให้บริษัทประกันภัยบอกล้างสัญญาได้</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
              <span><strong>การตรวจสอบใบอนุญาตตัวแทน:</strong> ท่านมีสิทธิในการขอตรวจสอบบัตรประจำตัวตัวแทนประกันชีวิตที่ออกโดยสำนักงาน คปภ. ก่อนการตกลงทำนิติกรรมใดๆ</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
              <span><strong>การชำระเบี้ยประกันภัย:</strong> ต้องชำระเข้าบัญชีของบริษัทประกันภัยโดยตรงเท่านั้น ห้ามโอนเงินเข้าบัญชีส่วนตัวของตัวแทนประกันชีวิต</span>
            </li>
          </ul>
        </section>

        <hr className="border-stone-100" />

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">4</span>
            <span>ทรัพย์สินทางปัญญา (Intellectual Property)</span>
          </h2>
          <p className="text-stone-600 leading-relaxed font-light">
            เนื้อหาทั้งหมดที่แสดงบนเว็บไซต์ ไม่ว่าจะเป็น ข้อความ บทความ โค้ดโปรแกรม เครื่องคำนวณภาษี กราฟิก และการจัดวางโครงสร้าง เป็นทรัพย์สินทางปัญญาของ ModtanoyAdvisor ห้ามมิให้ทำซ้ำ ดัดแปลง หรือเผยแพร่เพื่อการค้าโดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
          </p>
        </section>

        <hr className="border-stone-100" />

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-none bg-[#0c0b0a] text-stone-100 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">5</span>
            <span>กฎหมายที่ใช้บังคับและการระงับข้อพิพาท</span>
          </h2>
          <p className="text-stone-600 leading-relaxed font-light">
            ข้อกำหนดและเงื่อนไขฉบับนี้ให้อยู่ภายใต้การบังคับใช้และตีความตามกฎหมายแห่งราชอาณาจักรไทย ข้อพิพาทใดๆ ให้อยู่ในเขตอำนาจการพิจารณาของศาลยุติธรรมในประเทศไทย
          </p>
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
