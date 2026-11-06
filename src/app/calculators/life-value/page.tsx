'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  BadgeDollarSign
} from 'lucide-react';
import { calculateLifeValueAPI } from '@/lib/api';
import { LifeValueResult } from '@/types';

export default function LifeValueCalculatorPage() {
  const [monthlyExpense, setMonthlyExpense] = useState<number>(35000);
  const [supportYears, setSupportYears] = useState<number>(5);
  const [debts, setDebts] = useState<number>(1500000);
  const [educationFund, setEducationFund] = useState<number>(500000);
  const [existingAssets, setExistingAssets] = useState<number>(300000);
  const [existingCoverage, setExistingCoverage] = useState<number>(500000);

  const [result, setResult] = useState<LifeValueResult | null>(null);

  useEffect(() => {
    async function runCalc() {
      try {
        const res = await calculateLifeValueAPI({
          monthlyFamilyExpense: monthlyExpense,
          supportYears,
          outstandingDebts: debts,
          childrenEducationFund: educationFund,
          funeralAndEmergency: 200000,
          existingAssets,
          existingLifeCoverage: existingCoverage,
        });
        setResult(res);
      } catch (e) {
        console.error(e);
      }
    }

    const timer = setTimeout(() => {
      runCalc();
    }, 150);

    return () => clearTimeout(timer);
  }, [monthlyExpense, supportYears, debts, educationFund, existingAssets, existingCoverage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>CAPITAL PROTECTION ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
          คำนวณทุนประกันชีวิตที่เหมาะสมกับคุณ
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
          ประเมินว่าคนที่คุณรักต้องใช้เงินเท่าไหร่เพื่อดำเนินชีวิตต่อได้อย่างมั่นคงและปลอดหนี้สิน หากเกิดเหตุไม่คาดฝัน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-none border border-stone-200/80 space-y-7 shadow-xs">
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center gap-2 border-b border-stone-100 pb-3">
              <Users className="w-4 h-4 text-[#c5a059]" />
              <span>1. ภาระค่าใช้จ่ายครอบครัว</span>
            </h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-stone-700">ค่าใช้จ่ายครอบครัวต่อเดือน</span>
                <span className="font-mono font-bold text-stone-900 text-base">฿{monthlyExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-stone-700">จำนวนปีที่ต้องดูแลคนข้างหลัง</span>
                <span className="font-mono font-bold text-stone-900 text-base">{supportYears} ปี</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={supportYears}
                onChange={(e) => setSupportYears(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center gap-2 border-b border-stone-100 pb-3">
              <BadgeDollarSign className="w-4 h-4 text-[#c5a059]" />
              <span>2. หหนี้สินและเป้าหมายการศึกษา</span>
            </h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-stone-700">หนี้สินคงค้างทั้งหมด (บ้าน, รถ, สินเชื่อ)</span>
                <span className="font-mono font-bold text-stone-900 text-base">฿{debts.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-stone-700">ทุนการศึกษาบุตรในอนาคต</span>
                <span className="font-mono font-bold text-stone-900 text-base">฿{educationFund.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={educationFund}
                onChange={(e) => setEducationFund(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-100">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center gap-2 border-b border-stone-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>3. ทรัพย์สินและประกันเดิม</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-stone-500 font-medium block mb-1">เงินออม / ทรัพย์สินสภาพคล่อง (บาท)</label>
                <input
                  type="number"
                  value={existingAssets}
                  onChange={(e) => setExistingAssets(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-stone-300 rounded-none text-xs font-mono font-bold text-stone-900 focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 font-medium block mb-1">ทุนประกันชีวิตเดิมที่มีอยู่แล้ว (บาท)</label>
                <input
                  type="number"
                  value={existingCoverage}
                  onChange={(e) => setExistingCoverage(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-stone-300 rounded-none text-xs font-mono font-bold text-stone-900 focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel (5 cols) - Obsidian High-End Editorial Style */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="bg-[#0c0b0a] text-stone-100 p-6 sm:p-7 rounded-none border border-stone-800 space-y-6 shadow-xl">
            <div className="border-b border-stone-800 pb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] block">
                RECOMMENDED COVERAGE VALUE
              </span>
              <div className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-[#c5a059]">
                ฿{result ? result.netRecommendedSumAssured.toLocaleString() : '0'}
              </div>
              <p className="text-[11px] text-stone-400 mt-1.5 leading-relaxed font-light">
                วงเงินที่เพียงพอให้ครอบครัวดำเนินชีวิตได้ตามปกติและปลอดหนี้สิ้นเชิง
              </p>
            </div>

            {result && (
              <div className="space-y-2.5 text-xs font-mono text-stone-300">
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">ภาระค่าใช้จ่าย {supportYears} ปี:</span>
                  <span className="font-bold text-stone-100">฿{result.totalFamilyNeeds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">ภาระหนี้สินรวม:</span>
                  <span className="font-bold text-stone-100">฿{result.totalDebts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">ทุนการศึกษา & ฉุกเฉิน:</span>
                  <span className="font-bold text-stone-100">฿{result.totalEducationAndEmergency.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">หัก ทรัพย์สินและประกันเดิม:</span>
                  <span className="font-bold text-[#c5a059]">- ฿{result.totalExistingProtection.toLocaleString()}</span>
                </div>

                <div className="pt-3">
                  <span className="text-[10px] font-mono text-stone-400 block mb-2 uppercase tracking-wider">ประมาณการเบี้ยประกันรายปี:</span>
                  <div className="bg-stone-900/90 border border-stone-800 p-3.5 rounded-none space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-sans text-stone-300">แบบชั่วระยะเวลา:</span>
                      <strong className="text-[#c5a059] font-mono">~ ฿{result.estimatedAnnualPremium.termInsurance.toLocaleString()} / ปี</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-sans text-stone-300">แบบตลอดชีพ:</span>
                      <strong className="text-stone-100 font-mono">~ ฿{result.estimatedAnnualPremium.wholeLifeInsurance.toLocaleString()} / ปี</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/consultation"
                className="w-full h-11 flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-mono font-semibold uppercase tracking-wider rounded-none active:scale-[0.98] transition duration-200 text-xs text-center cursor-pointer"
              >
                <span>ปรึกษาการออกแบบทุนประกันฟรี</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
