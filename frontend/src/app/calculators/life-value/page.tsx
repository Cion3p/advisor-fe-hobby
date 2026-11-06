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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
          <span>LIFE VALUE CALCULATOR</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          คำนวณทุนประกันชีวิตที่เหมาะสมกับคุณ
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          ประเมินว่าคนที่คุณรักต้องใช้เงินเท่าไหร่เพื่อดำเนินชีวิตต่อได้อย่างมั่นคงและปลอดหนี้สิน หากเกิดเหตุไม่คาดฝัน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-xl border border-zinc-200 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
              <Users className="w-4 h-4 text-zinc-600" />
              <span>1. ภาระค่าใช้จ่ายครอบครัว</span>
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-700">ค่าใช้จ่ายครอบครัวต่อเดือน</span>
                <span className="font-mono font-bold text-zinc-900">฿{monthlyExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-700">จำนวนปีที่ต้องดูแลคนข้างหลัง</span>
                <span className="font-mono font-bold text-zinc-900">{supportYears} ปี</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={supportYears}
                onChange={(e) => setSupportYears(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-100">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
              <BadgeDollarSign className="w-4 h-4 text-zinc-600" />
              <span>2. หนี้สินและเป้าหมายการศึกษา</span>
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-700">หนี้สินคงค้างทั้งหมด (บ้าน, รถ, สินเชื่อ)</span>
                <span className="font-mono font-bold text-zinc-900">฿{debts.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-700">ทุนการศึกษาบุตรในอนาคต</span>
                <span className="font-mono font-bold text-zinc-900">฿{educationFund.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={educationFund}
                onChange={(e) => setEducationFund(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-100">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-zinc-600" />
              <span>3. ทรัพย์สินและประกันเดิม</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1">เงินออม / ทรัพย์สินสภาพคล่อง (บาท)</label>
                <input
                  type="number"
                  value={existingAssets}
                  onChange={(e) => setExistingAssets(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-zinc-200 rounded-lg text-xs font-mono font-bold text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-500 font-medium block mb-1">ทุนประกันชีวิตเดิมที่มีอยู่แล้ว (บาท)</label>
                <input
                  type="number"
                  value={existingCoverage}
                  onChange={(e) => setExistingCoverage(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-zinc-200 rounded-lg text-xs font-mono font-bold text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel (5 cols) - Dark Engineering Aesthetics */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="bg-[#09090b] text-white p-5 sm:p-6 rounded-xl border border-zinc-800 space-y-5">
            <div className="border-b border-zinc-800 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                RECOMMENDED COVERAGE
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-mono font-bold text-emerald-400">
                ฿{result ? result.netRecommendedSumAssured.toLocaleString() : '0'}
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                วงเงินที่เพียงพอให้ครอบครัวดำเนินชีวิตได้ตามปกติและปลอดหนี้
              </p>
            </div>

            {result && (
              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">ภาระค่าใช้จ่าย {supportYears} ปี:</span>
                  <span className="font-bold text-white">฿{result.totalFamilyNeeds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">ภาระหนี้สินรวม:</span>
                  <span className="font-bold text-white">฿{result.totalDebts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">ทุนการศึกษา & ฉุกเฉิน:</span>
                  <span className="font-bold text-white">฿{result.totalEducationAndEmergency.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">หัก ทรัพย์สินและประกันเดิม:</span>
                  <span className="font-bold text-emerald-400">- ฿{result.totalExistingProtection.toLocaleString()}</span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-mono text-zinc-400 block mb-1.5 uppercase">ประมาณการเบี้ยประกันรายปี:</span>
                  <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-sans text-zinc-300">แบบชั่วระยะเวลา:</span>
                      <strong className="text-emerald-400 font-mono">~ ฿{result.estimatedAnnualPremium.termInsurance.toLocaleString()} / ปี</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-sans text-zinc-300">แบบตลอดชีพ:</span>
                      <strong className="text-white font-mono">~ ฿{result.estimatedAnnualPremium.wholeLifeInsurance.toLocaleString()} / ปี</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-1">
              <Link
                href="/consultation"
                className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 font-medium rounded-lg active:scale-[0.98] transition duration-150 text-xs text-center cursor-pointer"
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
