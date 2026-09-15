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
  PhoneCall
} from 'lucide-react';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts({}),
  ]);

  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-50 pt-16 pb-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              แพลตฟอร์มเปรียบเทียบประกันและวางแผนการเงินอันดับ 1
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              เลือกแผนประกันที่ใช่ <br />
              <span className="bg-gradient-to-r from-brand-600 to-wealth-600 bg-clip-text text-transparent">
                คุ้มครองครบ วางแผนภาษีคุ้มค่า
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              เปรียบเทียบตารางผลประโยชน์ประกันสุขภาพเหมาจ่าย ประกันชีวิต และบำนาญจากทุกบริษัทชั้นนำ พร้อมเครื่องคำนวณภาษี 2567 และปรึกษาผู้เชี่ยวชาญ คปภ. ฟรี
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-brand-600/25 hover:shadow-xl transition-all"
              >
                ดูแผนประกันทั้งหมด
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-8 py-3.5 rounded-xl border border-slate-300 shadow-sm hover:border-brand-500 transition-all"
              >
                <Calculator className="w-4 h-4 text-wealth-600" />
                คำนวณลดหย่อนภาษี 2567
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-wealth-600" />
                ข้อมูลผลประโยชน์โปร่งใส
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-600" />
                ตัวแทนได้รับใบอนุญาต คปภ.
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-slate-700" />
                ปลอดภัยตามมาตรฐาน PDPA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
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
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                    {category.slug === 'health-insurance' && <HeartPulse className="w-6 h-6" />}
                    {category.slug === 'life-protection' && <Shield className="w-6 h-6" />}
                    {category.slug === 'savings-insurance' && <PiggyBank className="w-6 h-6" />}
                    {category.slug === 'annuity-pension' && <SunMedium className="w-6 h-6" />}
                    {category.slug === 'tax-saving-funds' && <Percent className="w-6 h-6" />}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors text-base mb-1">
                    {category.name_th}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> แผนแนะนำประจำเดือน
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              แผนประกันยอดนิยมที่คนค้นหามากที่สุด
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1"
          >
            ดูทั้งหมด ({products.length} แผน) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Calculators Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-300 uppercase">
                เครื่องมือวางแผนการเงินฟรี
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                รู้ทันภาษีและทุนประกัน <br />
                ด้วยโปรแกรมคำนวณอัจฉริยะ
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                ไม่แน่ใจว่าจะซื้อประกันเท่าไหร่ดีถึงจะลดหย่อนภาษีได้เต็มสิทธิ? หรือครอบครัวต้องการความคุ้มครองกี่บาทหากเกิดเหตุไม่คาดฝัน? ลองใช้โปรแกรมคำนวณของเราได้ฟรีทันที
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/calculators/tax"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-500/20"
                >
                  <Percent className="w-4 h-4" />
                  คำนวณภาษี & ค่าลดหย่อน
                </Link>
                <Link
                  href="/calculators/life-value"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-xl backdrop-blur transition-all border border-white/20"
                >
                  <Calculator className="w-4 h-4" />
                  คำนวณทุนประกันที่เหมาะสม
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
                  <span className="text-slate-300 block mb-1">ประกันชีวิตทั่วไป</span>
                  <span className="text-xl font-bold text-white">100,000 บาท</span>
                  <span className="text-slate-400 block mt-1">รวมสุขภาพสูงสุด 25,000</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-slate-300 block mb-1">ประกันบำนาญ</span>
                  <span className="text-xl font-bold text-emerald-400">200,000 บาท</span>
                  <span className="text-slate-400 block mt-1">สูงสุด 15% ของเงินได้</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 text-center">
                *ลดหย่อนภาษีได้ตามฐานภาษีเงินได้บุคคลธรรมดา สูงสุด 35%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Consultation & Advisory Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            ขั้นตอนการรับคำปรึกษาที่โปร่งใสใน 4 ขั้นตอน
          </h2>
          <p className="text-sm text-slate-500">
            เราไม่ยัดเยียดแผนประกัน เน้นให้คำแนะนำที่สอดคล้องกับงบประมาณและเป้าหมายของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">ระบุเป้าหมาย</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ตอบคำถามสั้นๆ เพื่อประเมินความต้องการ เช่น สุขภาพ เกษียณ หรือลดหย่อนภาษี
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">เปรียบเทียบแผน</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ดูตารางเปรียบเทียบผลประโยชน์ ค่าห้อง และเบี้ยประกันจากหลายบริษัทอย่างเป็นกลาง
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">คำนวณเบี้ยที่คุ้มค่า</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ปรับแต่งช่วงทุนประกันและงบประมาณที่จ่ายไหวโดยไม่กระทบสภาพคล่อง
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-wealth-50 text-wealth-600 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h3 className="font-bold text-slate-900 text-base">พูดคุยกับผู้เชี่ยวชาญ</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              รับคำแนะนำแบบไม่มีข้อผูกมัดจากที่ปรึกษาที่มีใบอนุญาต คปภ. ถูกต้อง
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
