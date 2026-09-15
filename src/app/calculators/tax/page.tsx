'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Receipt, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Info,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';
import { calculateTaxAPI } from '@/lib/api';
import { TaxCalculationResult } from '@/types';

export default function TaxCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(60000);
  const [existingLife, setExistingLife] = useState<number>(0);
  const [existingHealth, setExistingHealth] = useState<number>(0);
  const [existingPension, setExistingPension] = useState<number>(0);

  const [proposedLife, setProposedLife] = useState<number>(50000);
  const [proposedHealth, setProposedHealth] = useState<number>(25000);
  const [proposedPension, setProposedPension] = useState<number>(0);

  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const annualIncome = monthlyIncome * 12;

  useEffect(() => {
    async function runCalculation() {
      setLoading(true);
      try {
        const res = await calculateTaxAPI({
          annualIncome,
          existingLifeInsurance: existingLife,
          existingHealthInsurance: existingHealth,
          existingPension: existingPension,
          proposedLifeInsurance: proposedLife,
          proposedHealthInsurance: proposedHealth,
          proposedPension: proposedPension,
        });
        setResult(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      runCalculation();
    }, 200);

    return () => clearTimeout(timer);
  }, [annualIncome, existingLife, existingHealth, existingPension, proposedLife, proposedHealth, proposedPension]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Receipt className="w-3.5 h-3.5" /> โปรแกรมคำนวณภาษีเงินได้บุคคลธรรมดา 2567
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          คำนวณภาษี & สิทธิลดหย่อนด้วยประกัน
        </h1>
        <p className="text-sm text-slate-600">
          ปรับตัวเลขรายได้และเบี้ยประกันเพื่อดูจำนวนภาษีที่คุณประหยัดได้จริง พร้อมตรวจเช็กโควตาลดหย่อนสูงสุดตามเกณฑ์กรมสรรพากร
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          {/* Section 1: Income */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs">1</span>
              รายได้ของคุณ
            </h2>

            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-slate-700">รายได้ต่อเดือน (บาท)</span>
                <span className="font-bold text-brand-700 text-base">
                  ฿{monthlyIncome.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="300000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>15,000</span>
                <span>รายได้รวมทั้งปี: ฿{annualIncome.toLocaleString()} บาท</span>
                <span>300,000+</span>
              </div>
            </div>
          </div>

          {/* Section 2: Proposed Insurance */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">2</span>
              เบี้ยประกันที่คุณวางแผนจะซื้อเพื่อลดหย่อนภาษี
            </h2>

            {/* Proposed Health */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">ประกันสุขภาพ (ลดหย่อนได้สูงสุด 25,000 บาท)</span>
                <span className="font-bold text-emerald-700">฿{proposedHealth.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="2500"
                value={proposedHealth}
                onChange={(e) => setProposedHealth(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Proposed Life */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">ประกันชีวิตทั่วไป / สะสมทรัพย์ (เพดาน 100,000 บาท รวมสุขภาพ)</span>
                <span className="font-bold text-brand-700">฿{proposedLife.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={proposedLife}
                onChange={(e) => setProposedLife(Number(e.target.value))}
                className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Proposed Pension */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">ประกันบำนาญ (สูงสุด 15% ของเงินได้ ไม่เกิน 200,000 บาท)</span>
                <span className="font-bold text-purple-700">฿{proposedPension.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={proposedPension}
                onChange={(e) => setProposedPension(Number(e.target.value))}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="bg-gradient-to-br from-slate-900 to-brand-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-brand-300 font-semibold uppercase tracking-wider block">
                ผลการคำนวณสิทธิประโยชน์ทางภาษี
              </span>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">คุณจะประหยัดภาษีได้</span>
                  <span className="text-4xl font-extrabold text-emerald-400">
                    ฿{result ? result.taxSaved.toLocaleString() : '0'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">ฐานภาษีสูงสุด</span>
                  <span className="text-xl font-bold text-amber-400">
                    {result ? result.marginalTaxRate : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown summary */}
            {result && (
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">เงินได้สุทธิก่อนหักลดหย่อนประกัน:</span>
                  <span className="font-semibold text-white">฿{result.netTaxableIncomeBefore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">สิทธิลดหย่อนประกันที่ใช้:</span>
                  <span className="font-semibold text-emerald-400">- ฿{result.totalInsuranceDeductionsAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">เงินได้สุทธิหลังหักลดหย่อน:</span>
                  <span className="font-semibold text-white">฿{result.netTaxableIncomeAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">ภาษีที่ต้องจ่ายเดิม:</span>
                  <span className="font-semibold text-rose-300 line-through">฿{result.totalTaxBefore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 pt-2 text-sm font-bold text-white">
                  <span>ภาษีที่ต้องจ่ายจริงหลังซื้อประกัน:</span>
                  <span className="text-emerald-400">฿{result.totalTaxAfter.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/products?tax=true"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm text-center"
              >
                ดูแผนประกันลดหย่อนภาษีที่แนะนำ
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-600" /> หมายเหตุการคำนวณ:
            </h3>
            <p className="leading-relaxed">
              สูตรการคำนวณหักค่าใช้จ่าย 50% ของเงินได้ (สูงสุดไม่เกิน 100,000 บาท) และค่าลดหย่อนส่วนตัว 60,000 บาท ตามประมวลรัษฎากรสำหรับเงินได้ประเภท 40(1)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
