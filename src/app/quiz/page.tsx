'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  SunMedium, 
  PiggyBank, 
  Percent, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<'HEALTH' | 'RETIREMENT' | 'SAVINGS' | 'TAX_SAVING' | 'FAMILY_PROTECTION'>('HEALTH');
  const [age, setAge] = useState<number>(30);
  const [budget, setBudget] = useState<number>(2500); // monthly
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleFinish = async () => {
    setLoading(true);
    setStep(5); // results step

    let categorySlug = 'health-insurance';
    if (goal === 'HEALTH') categorySlug = 'health-insurance';
    if (goal === 'RETIREMENT') categorySlug = 'annuity-pension';
    if (goal === 'SAVINGS') categorySlug = 'savings-insurance';
    if (goal === 'TAX_SAVING') categorySlug = 'tax-saving-funds';
    if (goal === 'FAMILY_PROTECTION') categorySlug = 'life-protection';

    try {
      const products = await fetchProducts({
        category: categorySlug,
      });
      setRecommendations(products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>TAILORED NEEDS ASSESSMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
          ค้นหาแผนประกันที่ตอบโจทย์คุณที่สุด
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-xl mx-auto">
          ตอบคำถามสั้นๆ 4 ข้อ เพื่อให้ระบบช่วยคัดกรองแผนที่เหมาะสมกับไลฟ์สไตล์และงบประมาณของคุณอย่างตรงจุด
        </p>
      </div>

      {/* Quiz Container */}
      <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 shadow-xs">
        {step < 5 && (
          <div className="mb-8">
            <div className="flex justify-between text-xs font-mono text-stone-500 mb-2">
              <span className="tracking-widest uppercase text-[#8c6d46]">STEP 0{step} / 04</span>
              <span>{step * 25}%</span>
            </div>
            <div className="w-full bg-stone-100 rounded-none h-1">
              <div
                className="bg-[#0c0b0a] h-1 rounded-none transition-all duration-300"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-8">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 text-center">
              เป้าหมายทางการเงินหลักที่คุณให้ความสำคัญที่สุดในตอนนี้คืออะไร?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'HEALTH', title: 'คุ้มครองค่ารักษาพยาบาล (สุขภาพเหมาจ่าย)', desc: 'กังวลเรื่องค่าห้อง ค่าผ่าตัด และโรคร้ายแรง', icon: HeartPulse },
                { id: 'TAX_SAVING', title: 'วางแผนลดหย่อนภาษีเงินได้', desc: 'ต้องการใช้สิทธิลดหย่อน 100,000 หรือ 200,000 บาท', icon: Percent },
                { id: 'RETIREMENT', title: 'เตรียมเงินก้อนและบำนาญเพื่อเกษียณ', desc: 'มีเงินใช้อย่างสบายใจหลังหยุดทำงาน', icon: SunMedium },
                { id: 'FAMILY_PROTECTION', title: 'สร้างมรดกและคุ้มครองครอบครัว', desc: 'เป็นหลักประกันให้ลูกหรือคนที่เรารักหากเกิดเหตุไม่คาดคิด', icon: Shield },
                { id: 'SAVINGS', title: 'ออมเงินผลตอบแทนแน่นอน มีเงินคืนทุกปี', desc: 'สร้างวินัยการออม พร้อมความคุ้มครองชีวิต', icon: PiggyBank },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = goal === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id as any)}
                    className={`p-5 rounded-none border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? 'border-[#0c0b0a] bg-stone-50/90 shadow-xs'
                        : 'border-stone-200 hover:border-stone-400 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-none flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-[#0c0b0a] text-[#c5a059] border-[#0c0b0a]' : 'bg-stone-100 text-stone-700 border-stone-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-stone-900">{item.title}</h3>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-none bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 text-xs font-mono uppercase tracking-wider transition duration-200 cursor-pointer border border-stone-800"
              >
                <span>ขั้นตอนถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <div className="space-y-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              ปัจจุบันคุณอายุเท่าไหร่?
            </h2>
            <p className="text-xs text-stone-500 font-light">
              อายุมีผลโดยตรงต่อการคำนวณเบี้ยประกันและความคุ้มครองที่เปิดรับ
            </p>

            <div className="py-6 space-y-4">
              <span className="text-5xl font-serif font-bold text-stone-900 block">
                {age} <span className="text-sm font-sans font-light text-stone-500">ปี</span>
              </span>
              <input
                type="range"
                min="1"
                max="70"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-10 px-5 rounded-none text-xs font-mono uppercase tracking-wider text-stone-700 hover:text-stone-950 border border-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 h-10 px-6 rounded-none bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 text-xs font-mono uppercase tracking-wider transition duration-200 cursor-pointer border border-stone-800"
              >
                <span>ขั้นตอนถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              งบประมาณเบี้ยประกันที่คุณตั้งไว้ต่อเดือนโดยประมาณ?
            </h2>

            <div className="py-6 space-y-3">
              <span className="text-4xl font-serif font-bold text-stone-900 block">
                ฿{budget.toLocaleString()} <span className="text-xs font-sans font-light text-stone-500">/ เดือน</span>
              </span>
              <span className="text-xs font-mono text-[#8c6d46] block">
                (เทียบเท่าประมาณ ฿{(budget * 12).toLocaleString()} บาทต่อปี)
              </span>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer mt-4"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-10 px-5 rounded-none text-xs font-mono uppercase tracking-wider text-stone-700 hover:text-stone-950 border border-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 h-10 px-6 rounded-none bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 text-xs font-mono uppercase tracking-wider transition duration-200 cursor-pointer border border-stone-800"
              >
                <span>ขั้นตอนถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Existing Insurance */}
        {step === 4 && (
          <div className="space-y-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              ปัจจุบันคุณมีประกันสุขภาพหรือสวัสดิการอยู่แล้วหรือไม่?
            </h2>

            <div className="grid grid-cols-1 gap-3 py-2">
              <button
                type="button"
                onClick={() => setHasInsurance(true)}
                className={`p-5 rounded-none border text-center transition-all duration-200 cursor-pointer ${
                  hasInsurance
                    ? 'border-[#0c0b0a] bg-stone-50 font-serif font-bold text-stone-900 shadow-xs'
                    : 'border-stone-200 hover:border-stone-400 text-stone-700'
                }`}
              >
                มีอยู่แล้ว (เช่น สิทธิประกันกลุ่มบริษัท หรือประกันสังคม)
              </button>

              <button
                type="button"
                onClick={() => setHasInsurance(false)}
                className={`p-5 rounded-none border text-center transition-all duration-200 cursor-pointer ${
                  !hasInsurance
                    ? 'border-[#0c0b0a] bg-stone-50 font-serif font-bold text-stone-900 shadow-xs'
                    : 'border-stone-200 hover:border-stone-400 text-stone-700'
                }`}
              >
                ยังไม่มีเลย (ต้องการความคุ้มครองตั้งแต่บาทแรก)
              </button>
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-10 px-5 rounded-none text-xs font-mono uppercase tracking-wider text-stone-700 hover:text-stone-950 border border-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-none bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 text-xs font-mono font-semibold uppercase tracking-wider transition duration-200 cursor-pointer"
              >
                <span>วิเคราะห์ผลและดูแผนที่แนะนำ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Recommendations Result */}
        {step === 5 && (
          <div className="space-y-8">
            <div className="text-center space-y-3 border-b border-stone-100 pb-6">
              <div className="w-12 h-12 rounded-none bg-[#0c0b0a] text-[#c5a059] flex items-center justify-center mx-auto border border-stone-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                แผนประกันคัดสรรที่ตรงกับความต้องการของคุณ
              </h2>
              <p className="text-xs font-mono text-[#8c6d46]">
                เป้าหมาย: {goal} | อายุ: {age} ปี | งบประมาณ: ฿{budget.toLocaleString()}/เดือน
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16 text-stone-500 text-xs font-mono uppercase tracking-widest">
                กำลังวิเคราะห์พอร์ตโฟลิโอแผนประกัน...
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendations.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-stone-500 text-xs font-light">
                ไม่พบแผนที่ตรงทุกเงื่อนไข สามารถชมแผนทั้งหมดในระบบได้
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>ทำแบบทดสอบใหม่</span>
              </button>

              <Link
                href="/products"
                className="text-xs font-mono uppercase tracking-wider text-stone-900 hover:text-[#c5a059] font-medium"
              >
                ดูแผนประกันทั้งหมด &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
