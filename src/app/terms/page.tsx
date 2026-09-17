import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  FileText, 
  Scale, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  BookOpen, 
  Building2, 
  HelpCircle,
  Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ข้อกำหนดและเงื่อนไขการใช้บริการ (Terms of Service) | FinAdvisor TH',
  description: 'ข้อกำหนด เงื่อนไข และข้อตกลงในการใช้งานแพลตฟอร์มเปรียบเทียบแผนประกันภัยและบริการที่ปรึกษาการเงิน FinAdvisor TH',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-sky-700 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> หน้าแรก
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">ข้อกำหนดและเงื่อนไขการใช้งาน (Terms of Service)</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold">
          <Scale className="w-4 h-4 text-sky-600" />
          <span>ข้อตกลงและเงื่อนไขการใช้บริการ</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          ข้อกำหนดและเงื่อนไขการใช้บริการ <br className="hidden sm:inline" />
          (Terms of Service & Advisory Disclaimer)
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2567 • อัปเดตล่าสุดเมื่อวันที่ 17 กันยายน 2567
        </p>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>คำชี้แจงสำคัญเกี่ยวกับบริการประกันภัย:</strong> FinAdvisor TH เป็นแพลตฟอร์มกลางในการให้ข้อมูลความรู้ เครื่องมือคำนวณเปรียบเทียบเบื้องต้น และประสานงานส่งต่อผู้ขอรับคำปรึกษาไปยังที่ปรึกษาการเงินและตัวแทนประกันชีวิตที่มีใบอนุญาตถูกต้องจากสำนักงาน คปภ. การอนุมัติรับประกันภัยและเงื่อนไขความคุ้มครองขั้นสุดท้ายขึ้นอยู่กับดุลยพินิจของบริษัทประกันภัยแต่ละแห่งตามหลักเกณฑ์การรับประกัน
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xs space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span>การยอมรับข้อกำหนดในการให้บริการ</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            การเข้าถึงและใช้งานเว็บไซต์ <strong>FinAdvisor TH</strong> รวมถึงการใช้โปรแกรมคำนวณภาษี โปรแกรมคำนวณทุนประกัน หรือการกรอกแบบฟอร์มขอรับคำปรึกษา ถือว่าท่านได้รับทราบ เข้าใจ และตกลงที่จะผูกพันตนเองตามข้อกำหนดและเงื่อนไขฉบับนี้โดยไม่มีเงื่อนไข หากท่านไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาระงับการใช้งานเว็บไซต์ทันที
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span>ลักษณะการให้บริการและขอบเขตความรับผิดชอบ</span>
          </h2>
          <div className="space-y-3 text-slate-700 text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-600" /> บทบาทของแพลตฟอร์ม
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                FinAdvisor TH ทำหน้าที่เป็นช่องทางอำนวยความสะดวกในการค้นคว้าข้อมูล นำเสนอตารางผลประโยชน์ เปรียบเทียบแผนประกันภัย และส่งต่อความต้องการของท่านไปยังตัวแทนประกันชีวิตหรือที่ปรึกษาการเงินที่มีใบอนุญาตจากสำนักงาน คปภ. (OIC) เท่านั้น
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" /> ผลการคำนวณเบี้ยและลดหย่อนภาษี
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ตัวเลขเบี้ยประกันภัย วงเงินความคุ้มครอง และผลการคำนวณภาษีที่ปรากฏบนเว็บไซต์เป็นการ <strong>&quot;ประมาณการเบื้องต้น&quot;</strong> เพื่อประกอบการศึกษาพิจารณา ตัวเลขเบี้ยประกันจริงจะขึ้นอยู่กับอายุ เพศ ขั้นอาชีพ และผลการประเมินความเสี่ยงสุขภาพของบริษัทประกันภัย
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span>หน้าที่และความรับผิดชอบของผู้ขอเอาประกันภัย</span>
          </h2>
          <p className="text-slate-600">ในการขอรับคำปรึกษาและการยื่นขอทำประกันภัย ท่านมีหน้าที่และข้อปฏิบัติดังนี้:</p>
          <ul className="space-y-2 pl-2 text-slate-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>หลักสุจริตอย่างยิ่ง (Utmost Good Faith):</strong> การแถลงข้อมูลสุขภาพและประวัติการรักษาพยาบาลต่อบริษัทประกันภัยต้องเป็นความจริง การปกปิดข้อเท็จจริงอาจเป็นเหตุให้บริษัทประกันภัยบอกล้างสัญญาและปฏิเสธการจ่ายสินไหมทดแทนได้ตามประมวลกฎหมายแพ่งและพาณิชย์</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>การตรวจสอบใบอนุญาตตัวแทน:</strong> ท่านมีสิทธิในการขอตรวจสอบบัตรประจำตัวตัวแทนประกันชีวิตหรือใบอนุญาตที่ปรึกษาการเงินที่ออกโดยสำนักงาน คปภ. ก่อนการตกลงทำนิติกรรมใดๆ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
              <span><strong>การชำระเบี้ยประกันภัย:</strong> การชำระเบี้ยประกันภัยต้องชำระเข้าบัญชีของบริษัทประกันภัยโดยตรง หรือผ่านช่องทางชำระเงินทางการเท่านั้น ห้ามโอนเงินเข้าบัญชีส่วนตัวของตัวแทนประกันชีวิตโดยเด็ดขาด</span>
            </li>
          </ul>
        </section>

        <hr className="border-slate-100" />

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span>ทรัพย์สินทางปัญญา (Intellectual Property)</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            เนื้อหาทั้งหมดที่แสดงบนเว็บไซต์ ไม่ว่าจะเป็น ข้อความ บทความ โค้ดโปรแกรม เครื่องคำนวณภาษี กราฟิก รูปภาพ และการจัดวางโครงสร้าง เป็นทรัพย์สินทางปัญญาของ FinAdvisor TH ห้ามมิให้ผู้ใดคัดลอก ดัดแปลง ทำซ้ำ หรือเผยแพร่เพื่อประโยชน์ในเชิงพาณิชย์โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากเราล่วงหน้า
          </p>
          <p className="text-xs text-slate-500">
            *เครื่องหมายการค้า โลโก้ และชื่อของบริษัทประกันภัยพันธมิตร (เช่น MTL, AIA, AZAY, KTAXA, FWD, BLA) เป็นกรรมสิทธิ์ของบริษัทประกันภัยนั้นๆ ถูกนำมาแสดงเพื่อวัตถุประสงค์ในการให้ข้อมูลและระบุตัวตนผลิตภัณฑ์เท่านั้น
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">5</span>
            <span>การจำกัดความรับผิด (Limitation of Liability)</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            FinAdvisor TH จะไม่รับผิดชอบต่อความเสียหายใดๆ ทั้งทางตรงหรือทางอ้อม ที่เกิดจากการใช้งานเว็บไซต์ การตัดสินใจทางการเงิน หรือข้อพิพาทเกี่ยวกับเงื่อนไขกรมธรรม์และการจ่ายสินไหมทดแทนระหว่างผู้เอาประกันภัยกับบริษัทประกันภัย ข้อโต้แย้งเกี่ยวกับสิทธิประโยชน์ตามกรมธรรม์ให้อยู่ภายใต้การกำกับดูแลของสำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 text-xs font-black flex items-center justify-center shrink-0">6</span>
            <span>กฎหมายที่ใช้บังคับและการระงับข้อพิพาท</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            ข้อกำหนดและเงื่อนไขฉบับนี้ให้อยู่ภายใต้การบังคับใช้และตีความตามกฎหมายแห่งราชอาณาจักรไทย ข้อพิพาทใดๆ ที่เกิดขึ้นจากหรือเกี่ยวข้องกับการใช้งานเว็บไซต์นี้ ให้อยู่ในเขตอำนาจการพิจารณาของศาลยุติธรรมในประเทศไทย
          </p>
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
