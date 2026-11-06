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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
          <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
          <span>NEEDS ANALYSIS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          ค้นหาแผนประกันที่ตอบโจทย์คุณที่สุด
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          ตอบคำถามสั้นๆ 4 ข้อ เพื่อให้ระบบช่วยคัดกรองแผนที่เหมาะสมกับไลฟ์สไตล์และงบประมาณของคุณ
        </p>
      </div>

      {/* Quiz Container */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8">
        {step < 5 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs font-mono text-zinc-500 mb-1.5">
              <span>STEP {step} / 4</span>
              <span>{step * 25}%</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-1.5">
              <div
                className="bg-zinc-900 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 text-center">
              เป้าหมายทางการเงินหลักที่คุณให้ความสำคัญที่สุดในตอนนี้คืออะไร?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className={`p-4 rounded-xl border text-left transition-colors duration-150 flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-50'
                        : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">{item.title}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium active:scale-[0.98] transition duration-150 cursor-pointer"
              >
                <span>ถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              ปัจจุบันคุณอายุเท่าไหร่?
            </h2>
            <p className="text-xs text-zinc-500">
              อายุมีผลโดยตรงต่อเบี้ยประกันและความคุ้มครองที่เปิดรับ
            </p>

            <div className="py-4 space-y-3">
              <span className="text-4xl font-bold font-mono text-zinc-900 block">
                {age} <span className="text-sm font-normal text-zinc-500">ปี</span>
              </span>
              <input
                type="range"
                min="1"
                max="70"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-10 px-4 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium active:scale-[0.98] transition duration-150 cursor-pointer"
              >
                <span>ถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              งบประมาณเบี้ยประกันที่คุณตั้งไว้ต่อเดือนโดยประมาณ?
            </h2>

            <div className="py-4 space-y-2">
              <span className="text-3xl font-bold font-mono text-zinc-900 block">
                ฿{budget.toLocaleString()} <span className="text-xs font-normal text-zinc-500">/ เดือน</span>
              </span>
              <span className="text-xs font-mono text-zinc-400 block">
                (เทียบเท่าประมาณ ฿{(budget * 12).toLocaleString()} บาทต่อปี)
              </span>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer mt-3"
              />
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-10 px-4 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium active:scale-[0.98] transition duration-150 cursor-pointer"
              >
                <span>ถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Existing Insurance */}
        {step === 4 && (
          <div className="space-y-6 text-center max-w-md mx-auto">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              ปัจจุบันคุณมีประกันสุขภาพหรือสวัสดิการอยู่แล้วหรือไม่?
            </h2>

            <div className="grid grid-cols-1 gap-2.5 py-2">
              <button
                type="button"
                onClick={() => setHasInsurance(true)}
                className={`p-4 rounded-xl border text-center transition-colors duration-150 cursor-pointer ${
                  hasInsurance
                    ? 'border-zinc-900 bg-zinc-50 font-bold text-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                }`}
              >
                มีอยู่แล้ว (เช่น สิทธิประกันกลุ่มบริษัท หรือประกันสังคม)
              </button>

              <button
                type="button"
                onClick={() => setHasInsurance(false)}
                className={`p-4 rounded-xl border text-center transition-colors duration-150 cursor-pointer ${
                  !hasInsurance
                    ? 'border-zinc-900 bg-zinc-50 font-bold text-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                }`}
              >
                ยังไม่มีเลย (ต้องการความคุ้มครองตั้งแต่บาทแรก)
              </button>
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-10 px-4 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium active:scale-[0.98] transition duration-150 cursor-pointer"
              >
                <span>วิเคราะห์ผลและดูแผนที่แนะนำ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Recommendations Result */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-2 border-b border-zinc-100 pb-5">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto border border-zinc-200">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900">
                แผนประกันที่ระบบวิเคราะห์ว่าตรงกับคุณที่สุด
              </h2>
              <p className="text-xs font-mono text-zinc-500">
                เป้าหมาย: {goal} | อายุ: {age} ปี | งบ: ฿{budget.toLocaleString()}/เดือน
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-zinc-500 text-xs font-mono">กำลังวิเคราะห์แผนที่เหมาะสม...</div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-500 text-xs">
                ไม่พบแผนที่ตรงทุกเงื่อนไข สามารถดูแผนทั้งหมดในระบบได้
              </div>
            )}

            <div className="flex justify-between items-center pt-5 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ทำแบบทดสอบใหม่</span>
              </button>

              <Link
                href="/products"
                className="text-xs font-medium text-zinc-900 hover:underline"
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
