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
  Building2,
  PhoneCall
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
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* Pop-up Announcement Banner for Visitors */}
      <AnnouncementModal />

      {/* 1. Hero Banner Slider */}
      <HeroSlider />

      {/* Trust & Performance Metrics Strip - Architectural Whitespace & Hairline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-none border border-stone-200/90 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 text-center">
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">5+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-stone-500 mt-1">พันธมิตรประกันชีวิตชั้นนำ</div>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-6">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">12,500+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-stone-500 mt-1">ผู้ขอรับคำปรึกษาและคำนวณ</div>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-6">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">100%</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-stone-500 mt-1">ไม่มีค่าธรรมเนียมแอบแฝง</div>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-6">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#b38f46] tracking-tight">4.9 / 5.0</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-stone-500 mt-1">คะแนนความพึงพอใจการบริการ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Links - Editorial Gallery Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-500 block">
            PORTFOLIO CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">
            หมวดหมู่ความคุ้มครองระดับพรีเมียม
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
            เลือกสรรแผนประกันที่สอดรับกับเป้าหมายชีวิตและมรดกครอบครัวของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="bg-white p-6 rounded-none border border-stone-200 hover:border-[#c5a059] transition-all duration-400 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-none border border-stone-200 bg-[#fcfbf7] text-stone-800 flex items-center justify-center mb-5 group-hover:bg-stone-950 group-hover:text-[#c5a059] group-hover:border-stone-950 transition-all duration-300">
                    {category.slug === 'health-insurance' && <HeartPulse className="w-5 h-5" />}
                    {category.slug === 'life-protection' && <Shield className="w-5 h-5" />}
                    {category.slug === 'savings-insurance' && <PiggyBank className="w-5 h-5" />}
                    {category.slug === 'annuity-pension' && <SunMedium className="w-5 h-5" />}
                    {category.slug === 'tax-saving-funds' && <Percent className="w-5 h-5" />}
                  </div>
                  <h3 className="font-serif text-base font-medium text-stone-950 group-hover:text-[#a88241] transition-colors mb-1.5">
                    {category.name_th}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-light">
                    {category.description}
                  </p>
                </div>
                <div className="pt-5 flex items-center text-xs uppercase tracking-[0.18em] font-medium text-stone-900 group-hover:text-[#a88241] transition-colors">
                  <span>สำรวจแผน</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2.1 Insurer Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-none border border-stone-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-lg font-normal text-stone-950 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#c5a059]" />
                <span>พันธมิตรบริษัทประกันภัยชั้นนำ (Partner Insurers)</span>
              </h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                เลือกดูแผนความคุ้มครองเฉพาะของแต่ละสถาบันประกันชีวิตและสุขภาพ
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs uppercase tracking-[0.18em] font-medium text-stone-800 hover:text-[#a88241] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>ดูทุกสถาบัน</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.values(COMPANY_BRANDS).map((brand) => (
              <Link
                key={brand.code}
                href={`/products?company=${brand.code}`}
                className="group flex flex-col items-center justify-center p-4 rounded-none border border-stone-200 hover:border-stone-900 transition-all duration-300 text-center bg-white"
              >
                <div
                  className="w-8 h-8 rounded-none flex items-center justify-center text-white font-mono font-bold text-[10px] tracking-tight mb-2.5 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: brand.brandColor }}
                >
                  {brand.code}
                </div>
                <span className="text-xs font-medium text-stone-900 truncate w-full">
                  {brand.name}
                </span>
                <span className="text-[10px] font-mono text-stone-400 mt-0.5">
                  สายด่วน {brand.phone}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Insurance Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6 border-b border-stone-200/80 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-500 block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">
              แผนความคุ้มครองยอดนิยมประจำเดือน
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-900 hover:text-[#a88241] transition-colors pb-1"
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

      {/* 4. Interactive Calculators Banner (Obsidian Luxury Dark Tone) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c0b0a] rounded-none p-8 sm:p-14 text-white border border-stone-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059] block">
                FINANCIAL SIMULATION INSTRUMENTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight leading-snug">
                รู้ทันภาษีและประเมินทุนมรดก <br />
                <span className="italic font-serif text-stone-400">ด้วยเครื่องมือคำนวณชั้นสูง</span>
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm leading-loose font-light max-w-lg">
                ไม่แน่ใจว่าจะซื้อประกันเท่าไหร่ดีถึงจะลดหย่อนภาษีได้เต็มสิทธิ? หรือครอบครัวต้องการความคุ้มครองกี่บาทหากเกิดเหตุไม่คาดฝัน? ลองใช้โปรแกรมคำนวณของเราได้ฟรีทันที
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/calculators/tax"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-none text-xs uppercase tracking-[0.2em] font-medium bg-[#c5a059] text-stone-950 hover:bg-[#dfc278] active:scale-[0.99] transition-all duration-300"
                >
                  <Percent className="w-3.5 h-3.5 text-stone-950" />
                  <span>คำนวณภาษี & ลดหย่อน</span>
                </Link>
                <Link
                  href="/calculators/life-value"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-none text-xs uppercase tracking-[0.2em] font-medium bg-transparent text-[#fcfbf7] hover:bg-stone-900 border border-stone-700 active:scale-[0.99] transition-all duration-300"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>ประเมินทุนมรดก</span>
                </Link>
              </div>
            </div>

            {/* Teaser stats box */}
            <div className="bg-[#121110] rounded-none p-7 border border-stone-800 space-y-4">
              <h3 className="font-serif text-base font-normal text-stone-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#c5a059]" />
                สิทธิประโยชน์ภาษีที่คุณอาจยังไม่รู้
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#171615] p-4 rounded-none border border-stone-800 space-y-1">
                  <span className="text-stone-400 block font-mono text-[10px] uppercase tracking-wider">ประกันชีวิตทั่วไป</span>
                  <span className="font-serif text-2xl font-normal text-stone-100">100,000 บ.</span>
                  <span className="text-stone-500 block text-[10px]">รวมสุขภาพสูงสุด 25,000</span>
                </div>
                <div className="bg-[#171615] p-4 rounded-none border border-stone-800 space-y-1">
                  <span className="text-stone-400 block font-mono text-[10px] uppercase tracking-wider">ประกันบำนาญ</span>
                  <span className="font-serif text-2xl font-normal text-[#c5a059]">200,000 บ.</span>
                  <span className="text-stone-500 block text-[10px]">สูงสุด 15% ของเงินได้</span>
                </div>
              </div>
              <p className="text-[10px] font-mono text-stone-500 text-center tracking-wider">
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
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-500 block">
            TRANSPARENT METHODOLOGY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">
            ขั้นตอนการรับคำปรึกษาที่โปร่งใสใน 4 ขั้นตอน
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
            เราไม่ยัดเยียดแผนประกัน เน้นให้คำแนะนำที่สอดคล้องกับงบประมาณและเป้าหมายของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-none border border-stone-200 hover:border-stone-400 transition-all duration-300 space-y-3">
            <div className="text-xs font-mono font-bold text-[#c5a059] tracking-widest">
              STEP 01
            </div>
            <h3 className="font-serif font-medium text-stone-950 text-base">ระบุเป้าหมาย</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              ตอบคำถามสั้นๆ เพื่อประเมินความต้องการ เช่น สุขภาพ เกษียณ หรือลดหย่อนภาษี
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border border-stone-200 hover:border-stone-400 transition-all duration-300 space-y-3">
            <div className="text-xs font-mono font-bold text-[#c5a059] tracking-widest">
              STEP 02
            </div>
            <h3 className="font-serif font-medium text-stone-950 text-base">เปรียบเทียบแผน</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              ดูตารางเปรียบเทียบผลประโยชน์ ค่าห้อง และเบี้ยประกันจากหลายบริษัทอย่างเป็นกลาง
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border border-stone-200 hover:border-stone-400 transition-all duration-300 space-y-3">
            <div className="text-xs font-mono font-bold text-[#c5a059] tracking-widest">
              STEP 03
            </div>
            <h3 className="font-serif font-medium text-stone-950 text-base">คำนวณเบี้ยที่คุ้มค่า</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              ปรับแต่งช่วงทุนประกันและงบประมาณที่จ่ายไหวโดยไม่กระทบสภาพคล่อง
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border border-stone-200 hover:border-stone-400 transition-all duration-300 space-y-3">
            <div className="text-xs font-mono font-bold text-[#c5a059] tracking-widest">
              STEP 04
            </div>
            <h3 className="font-serif font-medium text-stone-950 text-base">พูดคุยกับผู้เชี่ยวชาญ</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              รับคำแนะนำแบบไม่มีข้อผูกมัดจากที่ปรึกษาที่มีใบอนุญาต คปภ. ถูกต้อง
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-white border border-stone-200 p-10 sm:p-14 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059] block">
            PRIVATE CONSULTATION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-950 tracking-tight">
            พร้อมเริ่มต้นวางแผนความคุ้มครองที่ตรงใจคุณหรือยัง?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto leading-loose font-light">
            ปรึกษาตัวแทนมืออาชีพฟรี ไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัดใดๆ ให้เราช่วยเปรียบเทียบข้อเสนอที่ดีที่สุดให้คุณ
          </p>
          <div className="pt-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-none text-xs uppercase tracking-[0.2em] font-medium bg-stone-950 hover:bg-[#c5a059] text-white hover:text-stone-950 active:scale-[0.99] transition-all duration-300 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ลงทะเบียนขอรับคำปรึกษาฟรี</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
