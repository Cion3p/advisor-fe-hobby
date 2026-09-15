'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Calculator, 
  HeartHandshake, 
  Users, 
  ArrowRight, 
  Info,
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
    }, 200);

    return () => clearTimeout(timer);
  }, [monthlyExpense, supportYears, debts, educationFund, existingAssets, existingCoverage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
          <ShieldCheck className="w-3.5 h-3.5" /> เครื่องมือประเมินความคุ้มครองครอบครัว
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          คำนวณทุนประกันชีวิตที่เหมาะสมกับคุณ
        </h1>
        <p className="text-sm text-slate-600">
          ประเมินว่าคนที่คุณรักต้องใช้เงินเท่าไหร่เพื่อดำเนินชีวิตต่อได้อย่างมั่นคงและปลอดหนี้สิน หากเกิดเหตุไม่คาดฝัน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Users className="w-5 h-5 text-brand-600" />
              1. ภาระค่าใช้จ่ายครอบครัว
            </h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">ค่าใช้จ่ายครอบครัวต่อเดือน</span>
                <span className="font-bold text-brand-700">฿{monthlyExpense.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">จำนวนปีที่ต้องดูแลคนข้างหลัง</span>
                <span className="font-bold text-brand-700">{supportYears} ปี</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={supportYears}
                onChange={(e) => setSupportYears(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <BadgeDollarSign className="w-5 h-5 text-rose-600" />
              2. หนี้สินและเป้าหมายการศึกษา
            </h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">หนี้สินคงค้างทั้งหมด (บ้าน, รถ, สินเชื่อ)</span>
                <span className="font-bold text-rose-700">฿{debts.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">ทุนการศึกษาบุตรในอนาคต</span>
                <span className="font-bold text-slate-800">฿{educationFund.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={educationFund}
                onChange={(e) => setEducationFund(Number(e.target.value))}
                className="w-full accent-slate-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              3. ทรัพย์สินและประกันเดิมที่มีอยู่แล้ว
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">เงินออม / ทรัพย์สินสภาพคล่อง (บาท)</label>
                <input
                  type="number"
                  value={existingAssets}
                  onChange={(e) => setExistingAssets(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">ทุนประกันชีวิตเดิมที่มีอยู่แล้ว (บาท)</label>
                <input
                  type="number"
                  value={existingCoverage}
                  onChange={(e) => setExistingCoverage(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="bg-gradient-to-br from-brand-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs text-brand-300 font-semibold uppercase tracking-wider block">
                ทุนประกันชีวิตที่แนะนำให้ทำเพิ่ม
              </span>
              <div className="mt-2 text-4xl font-extrabold text-emerald-400">
                ฿{result ? result.netRecommendedSumAssured.toLocaleString() : '0'}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                วงเงินที่เพียงพอให้ครอบครัวดำเนินชีวิตได้ตามปกติและปลอดหนี้
              </p>
            </div>

            {result && (
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">ภาระค่าใช้จ่ายครอบครัว {supportYears} ปี:</span>
                  <span className="font-semibold text-white">฿{result.totalFamilyNeeds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">ภาระหนี้สินรวม:</span>
                  <span className="font-semibold text-white">฿{result.totalDebts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">ทุนการศึกษาและเงินฉุกเฉิน:</span>
                  <span className="font-semibold text-white">฿{result.totalEducationAndEmergency.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">หัก ทรัพย์สินและประกันเดิม:</span>
                  <span className="font-semibold text-emerald-400">- ฿{result.totalExistingProtection.toLocaleString()}</span>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-brand-200 block mb-1">ประมาณการเบี้ยประกันรายปี:</span>
                  <div className="bg-white/10 p-3 rounded-xl space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>แบบชั่วระยะเวลา (เน้นคุ้มครองสูง):</span>
                      <strong className="text-emerald-400">~ ฿{result.estimatedAnnualPremium.termInsurance.toLocaleString()} / ปี</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>แบบตลอดชีพ (คุ้มครองถึงอายุ 99):</span>
                      <strong className="text-white">~ ฿{result.estimatedAnnualPremium.wholeLifeInsurance.toLocaleString()} / ปี</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/consultation"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm text-center"
              >
                ปรึกษาการออกแบบทุนประกันฟรี
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
