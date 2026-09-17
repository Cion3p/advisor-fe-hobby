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
  ShieldCheck,
  Users,
  Baby,
  HeartHandshake,
  Home,
  PiggyBank,
  Gift,
  Building,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Plus,
  Minus,
  Check,
  RotateCcw
} from 'lucide-react';
import { calculateTaxAPI } from '@/lib/api';
import { TaxCalculationResult } from '@/types';

export default function TaxCalculatorPage() {
  // Section 1: Income
  const [monthlyIncome, setMonthlyIncome] = useState<number>(60000);

  // Section 2: Proposed Insurance
  const [proposedLife, setProposedLife] = useState<number>(50000);
  const [proposedHealth, setProposedHealth] = useState<number>(25000);
  const [proposedPension, setProposedPension] = useState<number>(0);

  // Existing Insurance (Optional)
  const [showExistingInsurance, setShowExistingInsurance] = useState<boolean>(false);
  const [existingLife, setExistingLife] = useState<number>(0);
  const [existingHealth, setExistingHealth] = useState<number>(0);
  const [existingPension, setExistingPension] = useState<number>(0);

  // Section 3: Advanced Detailed Deductions (Optional Add-on)
  const [showDetailedDeductions, setShowDetailedDeductions] = useState<boolean>(false);
  const [activeDeductionTab, setActiveDeductionTab] = useState<'family' | 'investment' | 'property' | 'donation'>('family');

  // Detailed Deductions inputs
  const [socialSecurity, setSocialSecurity] = useState<number>(9000);
  const [spouseAllowance, setSpouseAllowance] = useState<boolean>(false);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [parentsCount, setParentsCount] = useState<number>(0);
  const [disabledCareCount, setDisabledCareCount] = useState<number>(0);
  const [mortgageInterest, setMortgageInterest] = useState<number>(0);
  const [thaiEsg, setThaiEsg] = useState<number>(0);
  const [rmfPvdSsf, setRmfPvdSsf] = useState<number>(0);
  const [easyEReceipt, setEasyEReceipt] = useState<number>(0);
  const [educationDonation, setEducationDonation] = useState<number>(0);
  const [generalDonation, setGeneralDonation] = useState<number>(0);

  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const annualIncome = monthlyIncome * 12;
  const maxThaiEsg = Math.min(annualIncome * 0.3, 300000);
  const maxRmfPvd = Math.min(annualIncome * 0.3, 500000);

  useEffect(() => {
    async function runCalculation() {
      setLoading(true);
      try {
        const payload: any = {
          annualIncome,
          existingLifeInsurance: existingLife,
          existingHealthInsurance: existingHealth,
          existingPension: existingPension,
          proposedLifeInsurance: proposedLife,
          proposedHealthInsurance: proposedHealth,
          proposedPension: proposedPension,
        };

        // ส่งข้อมูลลดหย่อนอื่นๆ เฉพาะเมื่อผู้ใช้เปิดสวิตช์คำนวณแบบละเอียด
        if (showDetailedDeductions) {
          payload.otherDeductions = {
            socialSecurity,
            spouseAllowance,
            childrenCount,
            parentsCount,
            disabledCareCount,
            mortgageInterest,
            thaiEsg,
            rmfPvdSsf,
            easyEReceipt,
            educationDonation,
            generalDonation,
          };
        }

        const res = await calculateTaxAPI(payload);
        setResult(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      runCalculation();
    }, 150);

    return () => clearTimeout(timer);
  }, [
    annualIncome,
    existingLife,
    existingHealth,
    existingPension,
    proposedLife,
    proposedHealth,
    proposedPension,
    showDetailedDeductions,
    socialSecurity,
    spouseAllowance,
    childrenCount,
    parentsCount,
    disabledCareCount,
    mortgageInterest,
    thaiEsg,
    rmfPvdSsf,
    easyEReceipt,
    educationDonation,
    generalDonation,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Receipt className="w-3.5 h-3.5" /> โปรแกรมคำนวณภาษีเงินได้บุคคลธรรมดา 2567 - 2568
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          คำนวณภาษี & วางแผนลดหย่อนครบวงจร
        </h1>
        <p className="text-sm text-slate-600">
          คำนวณสิทธิประโยชน์ทางภาษีได้ทั้งแบบมาตรฐานเฉพาะเบี้ยประกัน หรือกดเปิดตัวเลือกเสริมเพื่อคำนวณลดหย่อนอื่นๆ เพิ่มเติมแบบละเอียด แม่นยำตามเกณฑ์กรมสรรพากร
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          
          {/* Section 1: Income */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold">1</span>
                รายได้ของคุณ
              </span>
              <span className="text-xs font-normal text-slate-500">เงินได้พึงประเมิน ม.40(1)</span>
            </h2>

            <div>
              <div className="flex justify-between items-center text-sm font-medium mb-1.5">
                <span className="text-slate-700">รายได้เฉลี่ยต่อเดือน (บาท)</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-700 text-lg">
                    ฿{monthlyIncome.toLocaleString()}
                  </span>
                </div>
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
                <span>15,000 บ.</span>
                <span className="font-medium text-slate-600">รายได้รวมทั้งปี: ฿{annualIncome.toLocaleString()} บาท</span>
                <span>300,000+ บ.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Proposed Insurance */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">2</span>
                เบี้ยประกันที่คุณวางแผนจะซื้อเพื่อลดหย่อนภาษี
              </h2>
            </div>

            {/* Proposed Health */}
            <div className="space-y-1.5 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center text-sm font-medium">
                <div>
                  <span className="text-slate-800 font-semibold block">ประกันสุขภาพ</span>
                  <span className="text-[11px] text-slate-500">ลดหย่อนได้สูงสุด 25,000 บาท/ปี</span>
                </div>
                <span className="font-bold text-emerald-700 text-base">฿{proposedHealth.toLocaleString()}</span>
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
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0</span>
                <span>25,000</span>
              </div>
            </div>

            {/* Proposed Life */}
            <div className="space-y-1.5 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center text-sm font-medium">
                <div>
                  <span className="text-slate-800 font-semibold block">ประกันชีวิตทั่วไป / ประกันสะสมทรัพย์</span>
                  <span className="text-[11px] text-slate-500">เพดานสูงสุด 100,000 บาท (นับรวมประกันสุขภาพ)</span>
                </div>
                <span className="font-bold text-brand-700 text-base">฿{proposedLife.toLocaleString()}</span>
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
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0</span>
                <span>100,000</span>
              </div>
            </div>

            {/* Proposed Pension */}
            <div className="space-y-1.5 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center text-sm font-medium">
                <div>
                  <span className="text-slate-800 font-semibold block">ประกันบำนาญ (Annuity Insurance)</span>
                  <span className="text-[11px] text-slate-500">สูงสุด 15% ของเงินได้ แต่ไม่เกิน 200,000 บาท</span>
                </div>
                <span className="font-bold text-purple-700 text-base">฿{proposedPension.toLocaleString()}</span>
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
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0</span>
                <span>200,000</span>
              </div>
            </div>

            {/* Optional Existing Insurance Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowExistingInsurance(!showExistingInsurance)}
                className="text-xs font-semibold text-slate-600 hover:text-brand-600 flex items-center gap-1.5 py-1 transition-colors"
              >
                {showExistingInsurance ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showExistingInsurance ? 'ซ่อนข้อมูลประกันเดิมที่มีอยู่แล้ว' : '+ มีประกันชีวิต/สุขภาพเดิมอยู่แล้วหรือไม่? (คลิกเพื่อระบุ)'}
              </button>

              {showExistingInsurance && (
                <div className="mt-3 p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3.5 text-xs">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    ประกันเดิมที่มีอยู่แล้ว (เพื่อคำนวณโควตาสิทธิคงเหลืออย่างแม่นยำ)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-slate-700 font-medium block mb-1">ชีวิตเดิม (บ.)</label>
                      <input
                        type="number"
                        min="0"
                        max="100000"
                        step="5000"
                        value={existingLife || ''}
                        placeholder="0"
                        onChange={(e) => setExistingLife(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium block mb-1">สุขภาพเดิม (บ.)</label>
                      <input
                        type="number"
                        min="0"
                        max="25000"
                        step="2500"
                        value={existingHealth || ''}
                        placeholder="0"
                        onChange={(e) => setExistingHealth(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-medium block mb-1">บำนาญเดิม (บ.)</label>
                      <input
                        type="number"
                        min="0"
                        max="200000"
                        step="10000"
                        value={existingPension || ''}
                        placeholder="0"
                        onChange={(e) => setExistingPension(Number(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: THE OPTIONAL DETAILED DEDUCTION SWITCH */}
          <div className="pt-2 border-t border-slate-100">
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              showDetailedDeductions 
                ? 'bg-sky-50/60 border-sky-300 shadow-sm ring-1 ring-sky-200' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                      <Sparkles className="w-3 h-3" /> ออฟชั่นเสริม
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      คำนวณสิทธิลดหย่อนอื่นๆ เพิ่มเติมแบบละเอียด
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เพิ่มประกันสังคม, คู่สมรส, บุตร, บิดามารดา, กองทุน ThaiESG, RMF/PVD, ดอกเบี้ยบ้าน และเงินบริจาค เพื่อผลลัพธ์ภาษีที่ตรงกับชีวิตจริงของคุณมากที่สุด
                  </p>
                  {!showDetailedDeductions && (
                    <p className="text-[11px] text-slate-400 italic">
                      * หากไม่ติ๊ก ระบบจะคำนวณตามสูตรเดิม (หักค่าใช้จ่าย 50% สูงสุด 100,000 บ. + ลดหย่อนส่วนตัว 60,000 บ. + ประกัน)
                    </p>
                  )}
                </div>

                {/* Switch Toggle */}
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={showDetailedDeductions}
                    onChange={(e) => setShowDetailedDeductions(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* DETAILED DEDUCTIONS EXPANDED CONTAINER */}
              {showDetailedDeductions && (
                <div className="mt-6 pt-5 border-t border-sky-200/70 space-y-6">
                  
                  {/* Category Nav Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveDeductionTab('family')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        activeDeductionTab === 'family'
                          ? 'bg-white text-brand-700 shadow-sm border border-brand-200 ring-1 ring-brand-100'
                          : 'bg-white/60 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5 text-brand-600" />
                      ครอบครัว & สังคม
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDeductionTab('investment')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        activeDeductionTab === 'investment'
                          ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200 ring-1 ring-emerald-100'
                          : 'bg-white/60 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                      ThaiESG & กองทุน
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDeductionTab('property')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        activeDeductionTab === 'property'
                          ? 'bg-white text-blue-700 shadow-sm border border-blue-200 ring-1 ring-blue-100'
                          : 'bg-white/60 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5 text-blue-600" />
                      บ้าน & ช้อปปิ้ง
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDeductionTab('donation')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        activeDeductionTab === 'donation'
                          ? 'bg-white text-amber-700 shadow-sm border border-amber-200 ring-1 ring-amber-100'
                          : 'bg-white/60 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5 text-amber-600" />
                      เงินบริจาค
                    </button>
                  </div>

                  {/* Tab 1: Family & Social Security */}
                  {activeDeductionTab === 'family' && (
                    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
                      {/* Social Security */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">เงินสมทบประกันสังคม</span>
                            <span className="text-slate-500 block text-[11px]">หักตามที่จ่ายจริง สูงสุด 9,000 บาท/ปี</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-brand-700 text-sm">฿{socialSecurity.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => setSocialSecurity(9000)}
                              className="text-[10px] px-2 py-0.5 bg-brand-50 text-brand-700 rounded border border-brand-200 font-semibold hover:bg-brand-100"
                            >
                              เต็มสิทธิ์
                            </button>
                            <button
                              type="button"
                              onClick={() => setSocialSecurity(0)}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 font-semibold hover:bg-slate-200"
                            >
                              0
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="9000"
                          step="500"
                          value={socialSecurity}
                          onChange={(e) => setSocialSecurity(Number(e.target.value))}
                          className="w-full accent-brand-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Spouse Allowance */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-slate-800 block">คู่สมรส (จดทะเบียนสมรสและไม่มีเงินได้)</span>
                          <span className="text-[11px] text-slate-500">ลดหย่อนได้ 60,000 บาท</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={spouseAllowance}
                            onChange={(e) => setSpouseAllowance(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
                        </label>
                      </div>

                      {/* Children Count */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-slate-800 block">จำนวนบุตรชอบด้วยกฎหมาย</span>
                          <span className="text-[11px] text-slate-500">คนละ 30,000 บาท (ลดหย่อนรวม: ฿{(childrenCount * 30000).toLocaleString()} บ.)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold text-sm text-slate-800">{childrenCount}</span>
                          <button
                            type="button"
                            onClick={() => setChildrenCount(childrenCount + 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Parents Count */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-slate-800 block">อุปการะบิดา-มารดา (อายุ 60 ปีขึ้นไป)</span>
                          <span className="text-[11px] text-slate-500">คนละ 30,000 บาท สูงสุด 4 ท่าน (ลดหย่อนรวม: ฿{(parentsCount * 30000).toLocaleString()} บ.)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setParentsCount(Math.max(0, parentsCount - 1))}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold text-sm text-slate-800">{parentsCount}</span>
                          <button
                            type="button"
                            onClick={() => setParentsCount(Math.min(4, parentsCount + 1))}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Disabled Care */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-slate-800 block">อุปการะผู้พิการ / ทุพพลภาพ</span>
                          <span className="text-[11px] text-slate-500">คนละ 60,000 บาท (ลดหย่อนรวม: ฿{(disabledCareCount * 60000).toLocaleString()} บ.)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setDisabledCareCount(Math.max(0, disabledCareCount - 1))}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold text-sm text-slate-800">{disabledCareCount}</span>
                          <button
                            type="button"
                            onClick={() => setDisabledCareCount(disabledCareCount + 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Investments & Retirement */}
                  {activeDeductionTab === 'investment' && (
                    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
                      {/* ThaiESG */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">กองทุนรวมไทยเพื่อความยั่งยืน (ThaiESG)</span>
                            <span className="text-slate-500 block text-[11px]">เกณฑ์ใหม่ 2567-2569: สูงสุด 30% ไม่เกิน 300,000 บ. (ไม่รวมเพดานเกษียณ 5 แสน)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-emerald-700 text-sm">฿{thaiEsg.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => setThaiEsg(maxThaiEsg)}
                              className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-semibold hover:bg-emerald-100"
                            >
                              เต็มสิทธิ์ ฿{Math.round(maxThaiEsg).toLocaleString()}
                            </button>
                            <button
                              type="button"
                              onClick={() => setThaiEsg(0)}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 font-semibold hover:bg-slate-200"
                            >
                              0
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={maxThaiEsg}
                          step="10000"
                          value={thaiEsg}
                          onChange={(e) => setThaiEsg(Number(e.target.value))}
                          className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* RMF / PVD / SSF */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">กองทุน RMF / สำรองเลี้ยงชีพ (PVD) / กบข. / SSF</span>
                            <span className="text-slate-500 block text-[11px]">ไม่เกิน 30% ของเงินได้ และเมื่อรวมกับประกันบำนาญต้องไม่เกิน 500,000 บาท</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-brand-700 text-sm">฿{rmfPvdSsf.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => setRmfPvdSsf(maxRmfPvd)}
                              className="text-[10px] px-2 py-0.5 bg-brand-50 text-brand-700 rounded border border-brand-200 font-semibold hover:bg-brand-100"
                            >
                              เต็มสิทธิ์
                            </button>
                            <button
                              type="button"
                              onClick={() => setRmfPvdSsf(0)}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 font-semibold hover:bg-slate-200"
                            >
                              0
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={maxRmfPvd}
                          step="10000"
                          value={rmfPvdSsf}
                          onChange={(e) => setRmfPvdSsf(Number(e.target.value))}
                          className="w-full accent-brand-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Property & Economy */}
                  {activeDeductionTab === 'property' && (
                    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
                      {/* Mortgage Interest */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">ดอกเบี้ยเงินกู้ยืมเพื่อซื้อที่อยู่อาศัย (สินเชื่อบ้าน)</span>
                            <span className="text-slate-500 block text-[11px]">ตามที่จ่ายจริง สูงสุดไม่เกิน 100,000 บาท/ปี</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-700 text-sm">฿{mortgageInterest.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => setMortgageInterest(100000)}
                              className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 font-semibold hover:bg-blue-100"
                            >
                              เต็มสิทธิ์ 100,000
                            </button>
                            <button
                              type="button"
                              onClick={() => setMortgageInterest(0)}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 font-semibold hover:bg-slate-200"
                            >
                              0
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="5000"
                          value={mortgageInterest}
                          onChange={(e) => setMortgageInterest(Number(e.target.value))}
                          className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Easy E-Receipt */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">โครงการ Easy E-Receipt (ใบกำกับภาษีอิเล็กทรอนิกส์)</span>
                            <span className="text-slate-500 block text-[11px]">ตามที่จ่ายจริง สูงสุดไม่เกิน 50,000 บาท</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm">฿{easyEReceipt.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => setEasyEReceipt(50000)}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 font-semibold hover:bg-slate-200"
                            >
                              เต็มสิทธิ์ 50,000
                            </button>
                            <button
                              type="button"
                              onClick={() => setEasyEReceipt(0)}
                              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 font-semibold hover:bg-slate-200"
                            >
                              0
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50000"
                          step="5000"
                          value={easyEReceipt}
                          onChange={(e) => setEasyEReceipt(Number(e.target.value))}
                          className="w-full accent-slate-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Donations */}
                  {activeDeductionTab === 'donation' && (
                    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
                      {/* Education / Hospital */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">บริจาคเพื่อการศึกษา กีฬา สถานพยาบาล (ได้สิทธิ 2 เท่า)</span>
                            <span className="text-slate-500 block text-[11px]">ลดหย่อนได้ 2 เท่าของที่จ่ายจริง (รวมไม่เกิน 10% ของเงินได้สุทธิ)</span>
                          </div>
                          <span className="font-bold text-amber-700 text-sm">฿{educationDonation.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="2000"
                          value={educationDonation}
                          onChange={(e) => setEducationDonation(Number(e.target.value))}
                          className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                        <div className="text-[11px] text-amber-800 font-semibold">
                          * จะได้รับสิทธิหักลดหย่อนจริง ฿{(educationDonation * 2).toLocaleString()} บาท
                        </div>
                      </div>

                      {/* General Donations */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <div>
                            <span className="font-bold text-slate-800">เงินบริจาคทั่วไป / องค์กรการกุศล</span>
                            <span className="text-slate-500 block text-[11px]">หักตามจ่ายจริง (รวมไม่เกิน 10% ของเงินได้สุทธิ)</span>
                          </div>
                          <span className="font-bold text-slate-800 text-sm">฿{generalDonation.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50000"
                          step="1000"
                          value={generalDonation}
                          onChange={(e) => setGeneralDonation(Number(e.target.value))}
                          className="w-full accent-slate-700 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Summary of other deductions */}
                  {result?.totalOtherDeductions ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ยอดรวมสิทธิลดหย่อนอื่นๆ เพิ่มเติมที่นำมาหักภาษี:
                      </span>
                      <span className="font-extrabold text-emerald-700 text-sm">
                        ฿{result.totalOtherDeductions.toLocaleString()} บาท
                      </span>
                    </div>
                  ) : null}

                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Panel: Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-brand-300 font-semibold uppercase tracking-wider block">
                  ผลการคำนวณสิทธิประโยชน์ทางภาษี
                </span>
                {showDetailedDeductions && (
                  <span className="text-[10px] bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded-full font-bold">
                    คำนวณแบบละเอียด
                  </span>
                )}
              </div>
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
                  <span className="text-slate-400">รายได้พึงประเมินทั้งปี:</span>
                  <span className="font-semibold text-white">฿{result.annualIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">หักค่าใช้จ่าย 50% (สูงสุด 100,000):</span>
                  <span className="font-semibold text-white">- ฿{result.standardExpenseDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">ค่าลดหย่อนส่วนตัว:</span>
                  <span className="font-semibold text-white">- ฿{result.personalDeduction.toLocaleString()}</span>
                </div>

                {/* Show Other Deductions if active */}
                {showDetailedDeductions && (result.totalOtherDeductions || 0) > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-800 text-sky-300 font-medium">
                    <span>ลดหย่อนอื่นๆ เพิ่มเติม:</span>
                    <span className="font-bold">- ฿{result.totalOtherDeductions?.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">สิทธิลดหย่อนประกันที่ใช้:</span>
                  <span className="font-semibold text-emerald-400">- ฿{result.totalInsuranceDeductionsAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">เงินได้สุทธิหลังหักลดหย่อน:</span>
                  <span className="font-semibold text-white">฿{result.netTaxableIncomeAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">ภาษีเดิมที่ต้องจ่าย (ก่อนซื้อประกันเพิ่ม):</span>
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
              <Info className="w-4 h-4 text-brand-600" /> หมายเหตุการคำนวณภาษี:
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 leading-relaxed">
              <li>หักค่าใช้จ่าย 50% ของเงินได้ แต่ไม่เกิน 100,000 บาท และค่าลดหย่อนส่วนตัว 60,000 บาท ตามประมวลรัษฎากร ม.40(1)</li>
              <li>เบี้ยประกันชีวิตทั่วไป/สะสมทรัพย์ ลดหย่อนได้สูงสุด 100,000 บาท (นับรวมประกันสุขภาพสูงสุดไม่เกิน 25,000 บาท)</li>
              <li>เบี้ยประกันบำนาญ ลดหย่อนได้สูงสุด 15% ของเงินได้ แต่ไม่เกิน 200,000 บาท (และเมื่อรวมกับ RMF, PVD, กบข., SSF ต้องไม่เกิน 500,000 บาท)</li>
              <li>กองทุน ThaiESG มีเพดานแยกต่างหาก 30% ของเงินได้ แต่ไม่เกิน 300,000 บาท ไม่ถูกนับรวมในเพดานเกษียณ 500,000 บาท</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
