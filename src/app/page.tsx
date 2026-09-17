import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  HeartPulse, 
  PiggyBank, 
  SunMedium, 
  Percent, 
  Calculator, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Award, 
  PhoneCall,
  BookOpen,
  Clock,
  User,
  Calendar
} from 'lucide-react';
import { fetchProducts, fetchCategories, fetchArticles } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { HeroSlider } from '@/components/home/HeroSlider';
import { AnnouncementModal } from '@/components/home/AnnouncementModal';
import { HomeArticlesSection } from '@/components/home/HomeArticlesSection';

export default async function HomePage() {
  const [categories, products, articles] = await Promise.all([
    fetchCategories(),
    fetchProducts({}),
    fetchArticles(),
  ]);

  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Pop-up Announcement Banner for Visitors */}
      <AnnouncementModal />

      {/* 1. Hero Banner Slider (Pastel Blue & White with Standout Buttons) */}
      <HeroSlider />

      {/* Trust & Performance Metrics Strip (Pure White with Pastel Sky Borders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm shadow-sky-100/60 p-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-sky-50 text-center">
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">5+ บริษัท</div>
              <div className="text-xs text-sky-700/80 font-medium mt-0.5">พันธมิตรประกันชีวิตชั้นนำ</div>
            </div>
            <div className="pt-2 sm:pt-0 sm:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-orange-600 tracking-tight">12,500+</div>
              <div className="text-xs text-sky-700/80 font-medium mt-0.5">ผู้ขอรับคำปรึกษาและคำนวณ</div>
            </div>
            <div className="pt-2 sm:pt-0 sm:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">100% ฟรี</div>
              <div className="text-xs text-sky-700/80 font-medium mt-0.5">ไม่มีค่าธรรมเนียมแอบแฝง</div>
            </div>
            <div className="pt-2 sm:pt-0 sm:pl-4">
              <div className="text-2xl sm:text-3xl font-black text-sky-700 tracking-tight">4.9 / 5.0</div>
              <div className="text-xs text-sky-700/80 font-medium mt-0.5">คะแนนความพึงพอใจการบริการ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800">
            <span>🛡️ แผนความคุ้มครองครบวงจร</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            เลือกดูตามหมวดหมู่ความคุ้มครอง
          </h2>
          <p className="text-sm text-slate-500">
            ค้นหาแผนประกันที่ตรงกับความต้องการและช่วงวัยของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="bg-white p-6 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/70 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition-all shadow-2xs">
                    {category.slug === 'health-insurance' && <HeartPulse className="w-6 h-6" />}
                    {category.slug === 'life-protection' && <Shield className="w-6 h-6" />}
                    {category.slug === 'savings-insurance' && <PiggyBank className="w-6 h-6" />}
                    {category.slug === 'annuity-pension' && <SunMedium className="w-6 h-6" />}
                    {category.slug === 'tax-saving-funds' && <Percent className="w-6 h-6" />}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-base mb-1">
                    {category.name_th}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-sky-700 group-hover:text-orange-600 group-hover:translate-x-1 transition-all">
                  ดูแผนประกัน <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Insurance Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" /> แผนแนะนำประจำเดือน
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              แผนประกันยอดนิยมที่คนค้นหามากที่สุด
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 bg-white border border-sky-200 hover:border-orange-400 px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <span>ดูทั้งหมด ({products.length} แผน)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Calculators Banner (Deep Sky to Slate with Standout Orange CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-sky-950/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-sky-300 uppercase">
                เครื่องมือวางแผนการเงินฟรี
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-snug">
                รู้ทันภาษีและทุนประกัน <br />
                ด้วยโปรแกรมคำนวณอัจฉริยะ
              </h2>
              <p className="text-sky-100 text-sm leading-relaxed">
                ไม่แน่ใจว่าจะซื้อประกันเท่าไหร่ดีถึงจะลดหย่อนภาษีได้เต็มสิทธิ? หรือครอบครัวต้องการความคุ้มครองกี่บาทหากเกิดเหตุไม่คาดฝัน? ลองใช้โปรแกรมคำนวณของเราได้ฟรีทันที
              </p>
              
              {/* Standout Buttons in Banner */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <Link
                  href="/calculators/tax"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  <Percent className="w-4 h-4 text-white" />
                  <span>คำนวณภาษี & ค่าลดหย่อน</span>
                </Link>
                <Link
                  href="/calculators/life-value"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-xl backdrop-blur transition-all border border-white/20"
                >
                  <Calculator className="w-4 h-4 text-sky-300" />
                  <span>คำนวณทุนประกันที่เหมาะสม</span>
                </Link>
              </div>
            </div>

            {/* Teaser stats box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                สิทธิประโยชน์ภาษีที่คุณอาจยังไม่รู้
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-sky-200 block mb-1">ประกันชีวิตทั่วไป</span>
                  <span className="text-xl font-black text-white">100,000 บาท</span>
                  <span className="text-sky-300 block mt-1">รวมสุขภาพสูงสุด 25,000</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-sky-200 block mb-1">ประกันบำนาญ</span>
                  <span className="text-xl font-black text-amber-300">200,000 บาท</span>
                  <span className="text-sky-300 block mt-1">สูงสุด 15% ของเงินได้</span>
                </div>
              </div>
              <p className="text-xs text-sky-200 text-center">
                *ลดหย่อนภาษีได้ตามฐานภาษีเงินได้บุคคลธรรมดา สูงสุด 35%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Articles & Knowledge Hub Section (Dynamic with cover images & Admin sync) */}
      <HomeArticlesSection initialArticles={articles} />

      {/* 6. Consultation & Advisory Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800">
            <span>✨ ขั้นตอนการทำงานที่โปร่งใส</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ขั้นตอนการรับคำปรึกษาที่โปร่งใสใน 4 ขั้นตอน
          </h2>
          <p className="text-sm text-slate-500">
            เราไม่ยัดเยียดแผนประกัน เน้นให้คำแนะนำที่สอดคล้องกับงบประมาณและเป้าหมายของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg border border-sky-200">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">ระบุเป้าหมาย</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ตอบคำถามสั้นๆ เพื่อประเมินความต้องการ เช่น สุขภาพ เกษียณ หรือลดหย่อนภาษี
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg border border-sky-200">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">เปรียบเทียบแผน</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ดูตารางเปรียบเทียบผลประโยชน์ ค่าห้อง และเบี้ยประกันจากหลายบริษัทอย่างเป็นกลาง
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs hover:border-sky-300 transition-all text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg border border-sky-200">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">คำนวณเบี้ยที่คุ้มค่า</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ปรับแต่งช่วงทุนประกันและงบประมาณที่จ่ายไหวโดยไม่กระทบสภาพคล่อง
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-sky-200 shadow-xs hover:border-sky-400 bg-gradient-to-br from-white to-sky-50/50 transition-all text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">พูดคุยกับผู้เชี่ยวชาญ</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              รับคำแนะนำแบบไม่มีข้อผูกมัดจากที่ปรึกษาที่มีใบอนุญาต คปภ. ถูกต้อง
            </p>
          </div>
        </div>

        {/* Bottom Big Standout CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-sky-50 via-sky-100/60 to-blue-50 border border-sky-200/80 rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            พร้อมเริ่มต้นวางแผนความคุ้มครองที่ตรงใจคุณหรือยัง?
          </h3>
          <p className="text-xs sm:text-sm text-sky-900/70 max-w-xl mx-auto">
            ปรึกษาตัวแทนมืออาชีพฟรี ไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัดใดๆ ให้เราช่วยเปรียบเทียบข้อเสนอที่ดีที่สุดให้คุณ
          </p>
          <div className="pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-orange-500/35 hover:scale-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white animate-bounce" />
              <span>ลงทะเบียนขอรับคำปรึกษาฟรีทันที</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
