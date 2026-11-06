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
  PhoneCall,
  Building2
} from 'lucide-react';
import { fetchProducts, fetchCategories, fetchArticles } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { HeroSlider } from '@/components/home/HeroSlider';
import { AnnouncementModal } from '@/components/home/AnnouncementModal';
import { HomeArticlesSection } from '@/components/home/HomeArticlesSection';
import { COMPANY_BRANDS } from '@/lib/companies';

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

      {/* 1. Hero Banner Slider */}
      <HeroSlider />

      {/* Trust & Performance Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl border border-zinc-200 p-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 text-center">
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 tracking-tight">5+</div>
              <div className="text-xs text-zinc-500 font-medium mt-0.5">พันธมิตรประกันชีวิตชั้นนำ</div>
            </div>
            <div className="pt-2 sm:pt-0 sm:pl-4">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 tracking-tight">12,500+</div>
              <div className="text-xs text-zinc-500 font-medium mt-0.5">ผู้ขอรับคำปรึกษาและคำนวณ</div>
            </div>
            <div className="pt-2 sm:pt-0 sm:pl-4">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 tracking-tight">100%</div>
              <div className="text-xs text-zinc-500 font-medium mt-0.5">ไม่มีค่าธรรมเนียมแอบแฝง</div>
            </div>
            <div className="pt-2 sm:pt-0 sm:pl-4">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 tracking-tight">4.9 / 5.0</div>
              <div className="text-xs text-zinc-500 font-medium mt-0.5">คะแนนความพึงพอใจการบริการ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 font-mono">
            <Shield className="w-3 h-3 text-zinc-600" />
            <span>CATEGORIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            เลือกดูตามหมวดหมู่ความคุ้มครอง
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            ค้นหาแผนประกันที่ตรงกับความต้องการและช่วงวัยของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="bg-white p-5 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center mb-3.5 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-150">
                    {category.slug === 'health-insurance' && <HeartPulse className="w-5 h-5" />}
                    {category.slug === 'life-protection' && <Shield className="w-5 h-5" />}
                    {category.slug === 'savings-insurance' && <PiggyBank className="w-5 h-5" />}
                    {category.slug === 'annuity-pension' && <SunMedium className="w-5 h-5" />}
                    {category.slug === 'tax-saving-funds' && <Percent className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors text-sm mb-1">
                    {category.name_th}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="pt-3.5 flex items-center text-xs font-medium text-zinc-700 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all duration-150">
                  <span>ดูแผนประกัน</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2.1 Insurer Partners Quick Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="bg-white rounded-xl border border-zinc-200 p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-600" />
                <span>พันธมิตรบริษัทประกันภัยชั้นนำ (Partner Insurers)</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                เลือกดูแผนความคุ้มครองเฉพาะของแต่ละบริษัทประกันชีวิตและสุขภาพ
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 inline-flex items-center gap-1 transition-colors duration-150"
            >
              <span>ดูทุกบริษัท</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(COMPANY_BRANDS).map((brand) => (
              <Link
                key={brand.code}
                href={`/products?company=${brand.code}`}
                className="group flex flex-col items-center justify-center p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 text-center bg-white"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-mono font-bold text-[11px] tracking-tight mb-2 group-hover:scale-105 transition-transform duration-150"
                  style={{ backgroundColor: brand.brandColor }}
                >
                  {brand.code}
                </div>
                <span className="text-xs font-bold text-zinc-900 truncate w-full">
                  {brand.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  สายด่วน {brand.phone}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Insurance Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-zinc-600" /> FEATURED PLANS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              แผนประกันยอดนิยมที่คนค้นหามากที่สุด
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white border border-zinc-200 hover:border-zinc-300 px-3.5 py-2 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            <span>ดูทั้งหมด ({products.length} แผน)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Calculators Banner (Taste.md Dark Theme Specification) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#09090b] rounded-xl p-8 sm:p-10 text-white border border-zinc-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-medium font-mono uppercase tracking-wider text-zinc-400">
                FINANCIAL TOOLS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                รู้ทันภาษีและทุนประกัน <br />
                ด้วยโปรแกรมคำนวณอัจฉริยะ
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                ไม่แน่ใจว่าจะซื้อประกันเท่าไหร่ดีถึงจะลดหย่อนภาษีได้เต็มสิทธิ? หรือครอบครัวต้องการความคุ้มครองกี่บาทหากเกิดเหตุไม่คาดฝัน? ลองใช้โปรแกรมคำนวณของเราได้ฟรีทันที
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <Link
                  href="/calculators/tax"
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-xs sm:text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-white active:scale-[0.98] transition duration-150"
                >
                  <Percent className="w-4 h-4 text-zinc-900" />
                  <span>คำนวณภาษี & ค่าลดหย่อน</span>
                </Link>
                <Link
                  href="/calculators/life-value"
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-xs sm:text-sm font-medium bg-transparent text-zinc-200 hover:bg-zinc-800 border border-zinc-700 active:scale-[0.98] transition duration-150"
                >
                  <Calculator className="w-4 h-4 text-zinc-400" />
                  <span>คำนวณทุนประกันที่เหมาะสม</span>
                </Link>
              </div>
            </div>

            {/* Teaser stats box */}
            <div className="bg-[#18181b] rounded-xl p-6 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-zinc-400" />
                สิทธิประโยชน์ภาษีที่คุณอาจยังไม่รู้
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-900/60 p-3.5 rounded-lg border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 block font-mono text-[11px]">ประกันชีวิตทั่วไป</span>
                  <span className="text-lg font-bold font-mono text-zinc-100">100,000 บาท</span>
                  <span className="text-zinc-500 block text-[10px]">รวมสุขภาพสูงสุด 25,000</span>
                </div>
                <div className="bg-zinc-900/60 p-3.5 rounded-lg border border-zinc-800 space-y-1">
                  <span className="text-zinc-400 block font-mono text-[11px]">ประกันบำนาญ</span>
                  <span className="text-lg font-bold font-mono text-zinc-100">200,000 บาท</span>
                  <span className="text-zinc-500 block text-[10px]">สูงสุด 15% ของเงินได้</span>
                </div>
              </div>
              <p className="text-[11px] font-mono text-zinc-500 text-center">
                *ลดหย่อนภาษีได้ตามฐานภาษีเงินได้บุคคลธรรมดา สูงสุด 35%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Articles & Knowledge Hub Section */}
      <HomeArticlesSection initialArticles={articles} />

      {/* 6. Consultation & Advisory Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 font-mono">
            <Sparkles className="w-3 h-3 text-zinc-600" />
            <span>PROCESS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            ขั้นตอนการรับคำปรึกษาที่โปร่งใสใน 4 ขั้นตอน
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            เราไม่ยัดเยียดแผนประกัน เน้นให้คำแนะนำที่สอดคล้องกับงบประมาณและเป้าหมายของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 text-center space-y-2.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center font-mono font-bold text-xs border border-zinc-200">
              1
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">ระบุเป้าหมาย</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              ตอบคำถามสั้นๆ เพื่อประเมินความต้องการ เช่น สุขภาพ เกษียณ หรือลดหย่อนภาษี
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 text-center space-y-2.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center font-mono font-bold text-xs border border-zinc-200">
              2
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">เปรียบเทียบแผน</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              ดูตารางเปรียบเทียบผลประโยชน์ ค่าห้อง และเบี้ยประกันจากหลายบริษัทอย่างเป็นกลาง
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 text-center space-y-2.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center font-mono font-bold text-xs border border-zinc-200">
              3
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">คำนวณเบี้ยที่คุ้มค่า</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              ปรับแต่งช่วงทุนประกันและงบประมาณที่จ่ายไหวโดยไม่กระทบสภาพคล่อง
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 text-center space-y-2.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs">
              4
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">พูดคุยกับผู้เชี่ยวชาญ</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              รับคำแนะนำแบบไม่มีข้อผูกมัดจากที่ปรึกษาที่มีใบอนุญาต คปภ. ถูกต้อง
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 bg-zinc-100 border border-zinc-200 rounded-xl p-8 sm:p-10 text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
            พร้อมเริ่มต้นวางแผนความคุ้มครองที่ตรงใจคุณหรือยัง?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            ปรึกษาตัวแทนมืออาชีพฟรี ไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัดใดๆ ให้เราช่วยเปรียบเทียบข้อเสนอที่ดีที่สุดให้คุณ
          </p>
          <div className="pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-lg text-xs sm:text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] transition duration-150 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>ลงทะเบียนขอรับคำปรึกษาฟรี</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
