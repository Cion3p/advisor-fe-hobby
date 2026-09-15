'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  HeartPulse, 
  SunMedium, 
  PiggyBank, 
  Percent, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw 
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
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          <HelpCircle className="w-3.5 h-3.5" /> ระบบวิเคราะห์ความต้องการอัจฉริยะ (Needs Analysis)
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ค้นหาแผนประกันที่ตอบโจทย์คุณที่สุด
        </h1>
        <p className="text-sm text-slate-600">
          ตอบคำถามสั้นๆ 4 ข้อ เพื่อให้ระบบช่วยคัดกรองแผนที่เหมาะสมกับไลฟ์สไตล์และงบประมาณของคุณ
        </p>
      </div>

      {/* Quiz Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10">
        {step < 5 && (
          <div className="mb-8">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>ขั้นตอนที่ {step} จาก 4</span>
              <span>{step * 25}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 text-center">
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
                    className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow transition-all"
              >
                ถัดไป <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Age */}
        {step === 2 && (
          <div className="space-y-6 text-center max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              ปัจจุบันคุณอายุเท่าไหร่?
            </h2>
            <p className="text-xs text-slate-500">
              อายุมีผลโดยตรงต่อเบี้ยประกันและความคุ้มครองที่เปิดรับ
            </p>

            <div className="py-6 space-y-4">
              <span className="text-5xl font-extrabold text-brand-900 block">
                {age} <span className="text-lg font-normal text-slate-500">ปี</span>
              </span>
              <input
                type="range"
                min="1"
                max="70"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow transition-all"
              >
                ถัดไป <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 text-center max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              งบประมาณเบี้ยประกันที่คุณตั้งไว้ต่อเดือนโดยประมาณ?
            </h2>

            <div className="py-6 space-y-4">
              <span className="text-4xl font-extrabold text-brand-900 block">
                ฿{budget.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ เดือน</span>
              </span>
              <span className="text-xs text-slate-500 block">
                (เทียบเท่าประมาณ ฿{(budget * 12).toLocaleString()} บาทต่อปี)
              </span>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow transition-all"
              >
                ถัดไป <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Existing Insurance */}
        {step === 4 && (
          <div className="space-y-6 text-center max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              ปัจจุบันคุณมีประกันสุขภาพหรือสวัสดิการรักษาพยาบาลอยู่แล้วหรือไม่?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              <button
                type="button"
                onClick={() => setHasInsurance(true)}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  hasInsurance
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                มีอยู่แล้ว (เช่น ประกันกลุ่มบริษัท หรือสิทธิประกันสังคม)
              </button>

              <button
                type="button"
                onClick={() => setHasInsurance(false)}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  !hasInsurance
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                ยังไม่มีเลย (ต้องการความคุ้มครองตั้งแต่บาทแรก)
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow transition-all"
              >
                วิเคราะห์ผลและดูแผนที่แนะนำ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Recommendations Result */}
        {step === 5 && (
          <div className="space-y-8">
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                แผนประกันที่ระบบวิเคราะห์ว่าตรงกับคุณที่สุด
              </h2>
              <p className="text-xs text-slate-500">
                ประเมินจากเป้าหมาย: {goal} | อายุ: {age} ปี | งบประมาณ: ฿{budget.toLocaleString()}/เดือน
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-500">กำลังวิเคราะห์แผนที่เหมาะสม...</div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                ไม่พบแผนที่ตรงทุกเงื่อนไข สามารถดูแผนทั้งหมดในระบบได้
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <RefreshCw className="w-3.5 h-3.5" /> ทำแบบทดสอบใหม่
              </button>

              <Link
                href="/products"
                className="text-xs font-semibold text-brand-600 hover:underline"
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
