'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Receipt, 
  ArrowRight, 
  CheckCircle, 
  Info, 
  Users,
  Home,
  PiggyBank,
  Gift,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Plus,
  Minus
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

  const annualIncome = monthlyIncome * 12;
  const maxThaiEsg = Math.min(annualIncome * 0.3, 300000);
  const maxRmfPvd = Math.min(annualIncome * 0.3, 500000);

  useEffect(() => {
    async function runCalculation() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300">
          <Receipt className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>TAX PLANNING ARCHITECTURE 2567 - 2568</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
          คำนวณภาษี & วางแผนลดหย่อนครบวงจร
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
          คำนวณสิทธิประโยชน์ทางภาษีได้ทั้งแบบมาตรฐานเฉพาะเบี้ยประกัน หรือเปิดตัวเลือกเสริมเพื่อคำนวณลดหย่อนอื่นๆ ละเอียดตามเกณฑ์กรมสรรพากร
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-none border border-stone-200/80 space-y-7 shadow-xs">
          
          {/* Section 1: Income */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-none bg-[#0c0b0a] text-stone-100 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>รายได้พึงประเมิน ม.40(1)</span>
              </span>
            </h2>

            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className="text-stone-700">รายได้เฉลี่ยต่อเดือน (บาท)</span>
                <span className="font-mono font-bold text-stone-900 text-lg">
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
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400 mt-1.5">
                <span>15,000 บ.</span>
                <span className="text-[#8c6d46] font-medium">รวมทั้งปี: ฿{annualIncome.toLocaleString()} บาท</span>
                <span>300,000+ บ.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Proposed Insurance */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 flex items-center gap-2">
                <span className="w-5 h-5 rounded-none bg-[#0c0b0a] text-stone-100 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>เบี้ยประกันที่วางแผนซื้อลดหย่อน</span>
              </h2>
            </div>

            {/* Proposed Health */}
            <div className="space-y-1.5 bg-stone-50/70 p-4 rounded-none border border-stone-200">
              <div className="flex justify-between items-center text-xs font-medium">
                <div>
                  <span className="text-stone-900 font-serif font-bold text-sm block">ประกันสุขภาพ</span>
                  <span className="text-[10px] font-mono text-stone-500">ลดหย่อนได้สูงสุด 25,000 บาท/ปี</span>
                </div>
                <span className="font-mono font-bold text-stone-900 text-base">฿{proposedHealth.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="2500"
                value={proposedHealth}
                onChange={(e) => setProposedHealth(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>0</span>
                <span>25,000</span>
              </div>
            </div>

            {/* Proposed Life */}
            <div className="space-y-1.5 bg-stone-50/70 p-4 rounded-none border border-stone-200">
              <div className="flex justify-between items-center text-xs font-medium">
                <div>
                  <span className="text-stone-900 font-serif font-bold text-sm block">ประกันชีวิตทั่วไป / สะสมทรัพย์</span>
                  <span className="text-[10px] font-mono text-stone-500">เพดานสูงสุด 100,000 บาท (รวมสุขภาพ)</span>
                </div>
                <span className="font-mono font-bold text-stone-900 text-base">฿{proposedLife.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={proposedLife}
                onChange={(e) => setProposedLife(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>0</span>
                <span>100,000</span>
              </div>
            </div>

            {/* Proposed Pension */}
            <div className="space-y-1.5 bg-stone-50/70 p-4 rounded-none border border-stone-200">
              <div className="flex justify-between items-center text-xs font-medium">
                <div>
                  <span className="text-stone-900 font-serif font-bold text-sm block">ประกันบำนาญ (Annuity)</span>
                  <span className="text-[10px] font-mono text-stone-500">สูงสุด 15% ของเงินได้ แต่ไม่เกิน 200,000 บาท</span>
                </div>
                <span className="font-mono font-bold text-stone-900 text-base">฿{proposedPension.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="10000"
                value={proposedPension}
                onChange={(e) => setProposedPension(Number(e.target.value))}
                className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>0</span>
                <span>200,000</span>
              </div>
            </div>
          </div>

          {/* Section: Existing Insurance Toggle */}
          <div className="pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowExistingInsurance(!showExistingInsurance)}
              className="flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 py-2 cursor-pointer"
            >
              <span>+ มีประกันที่ทำไว้อยู่แล้ว (คำนวณร่วมกับสิทธิเดิม)</span>
              {showExistingInsurance ? <ChevronUp className="w-4 h-4 text-[#c5a059]" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {showExistingInsurance && (
              <div className="space-y-3 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">ชีวิตเดิม (บาท)</label>
                    <input
                      type="number"
                      value={existingLife}
                      onChange={(e) => setExistingLife(Number(e.target.value))}
                      className="w-full h-9 px-3 border border-stone-300 rounded-none text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">สุขภาพเดิม (บาท)</label>
                    <input
                      type="number"
                      value={existingHealth}
                      onChange={(e) => setExistingHealth(Number(e.target.value))}
                      className="w-full h-9 px-3 border border-stone-300 rounded-none text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">บำนาญเดิม (บาท)</label>
                    <input
                      type="number"
                      value={existingPension}
                      onChange={(e) => setExistingPension(Number(e.target.value))}
                      className="w-full h-9 px-3 border border-stone-300 rounded-none text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Advanced Detailed Deductions Toggle */}
          <div className="pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowDetailedDeductions(!showDetailedDeductions)}
              className="flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-[#8c6d46] hover:text-stone-900 py-2 cursor-pointer font-semibold"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>เปิดตัวเลือกหักลดหย่อนอื่นๆ ละเอียด (ครอบครัว, กองทุน, ดอกเบี้ยบ้าน)</span>
              </span>
              {showDetailedDeductions ? <ChevronUp className="w-4 h-4 text-[#c5a059]" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
            </button>

            {showDetailedDeductions && (
              <div className="space-y-4 pt-3">
                {/* Tabs */}
                <div className="flex border-b border-stone-200 text-xs font-mono">
                  {[
                    { id: 'family', label: 'ครอบครัว & สังคม', icon: Users },
                    { id: 'investment', label: 'ThaiESG & กองทุน', icon: PiggyBank },
                    { id: 'property', label: 'บ้าน & มาตรการรัฐ', icon: Home },
                    { id: 'donation', label: 'บริจาค', icon: Gift },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeDeductionTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveDeductionTab(tab.id as any)}
                        className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 tracking-wider transition-colors duration-150 cursor-pointer ${
                          isActive
                            ? 'border-[#c5a059] text-stone-900 font-bold bg-stone-50/50'
                            : 'border-transparent text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Family */}
                {activeDeductionTab === 'family' && (
                  <div className="space-y-3 bg-stone-50/70 p-4 rounded-none border border-stone-200">
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-medium text-stone-800">ประกันสังคมต่อปี (สูงสุด 9,000)</span>
                        <span className="font-mono font-bold text-stone-900">฿{socialSecurity.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="9000"
                        step="750"
                        value={socialSecurity}
                        onChange={(e) => setSocialSecurity(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                      <span className="text-stone-800">คู่สมรสไม่มีเงินได้ (ลดหย่อน 60,000 บ.)</span>
                      <input
                        type="checkbox"
                        checked={spouseAllowance}
                        onChange={(e) => setSpouseAllowance(e.target.checked)}
                        className="w-4 h-4 accent-[#c5a059] rounded-none cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                      <span className="text-stone-800">จำนวนบุตร (ลดหย่อน 30,000 บ./คน)</span>
                      <div className="flex items-center gap-2 font-mono">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-6 h-6 border border-stone-300 rounded-none flex items-center justify-center hover:bg-stone-100"
                        >-</button>
                        <span className="w-5 text-center font-bold">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-6 h-6 border border-stone-300 rounded-none flex items-center justify-center hover:bg-stone-100"
                        >+</button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                      <span className="text-stone-800">อุปการะบิดามารดา (30,000 บ./คน, อายุ 60+)</span>
                      <div className="flex items-center gap-2 font-mono">
                        <button
                          type="button"
                          onClick={() => setParentsCount(Math.max(0, parentsCount - 1))}
                          className="w-6 h-6 border border-stone-300 rounded-none flex items-center justify-center hover:bg-stone-100"
                        >-</button>
                        <span className="w-5 text-center font-bold">{parentsCount}</span>
                        <button
                          type="button"
                          onClick={() => setParentsCount(Math.min(4, parentsCount + 1))}
                          className="w-6 h-6 border border-stone-300 rounded-none flex items-center justify-center hover:bg-stone-100"
                        >+</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Investment */}
                {activeDeductionTab === 'investment' && (
                  <div className="space-y-3 bg-stone-50/70 p-4 rounded-none border border-stone-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-stone-800">กองทุน ThaiESG (สูงสุด 300,000)</span>
                        <span className="font-mono font-bold text-stone-900">฿{thaiEsg.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxThaiEsg}
                        step="10000"
                        value={thaiEsg}
                        onChange={(e) => setThaiEsg(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t border-stone-200/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-stone-800">RMF / PVD / กบข. / SSF</span>
                        <span className="font-mono font-bold text-stone-900">฿{rmfPvdSsf.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxRmfPvd}
                        step="10000"
                        value={rmfPvdSsf}
                        onChange={(e) => setRmfPvdSsf(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 3: Property */}
                {activeDeductionTab === 'property' && (
                  <div className="space-y-3 bg-stone-50/70 p-4 rounded-none border border-stone-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-stone-800">ดอกเบี้ยเงินกู้ซื้อบ้าน (สูงสุด 100,000)</span>
                        <span className="font-mono font-bold text-stone-900">฿{mortgageInterest.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="5000"
                        value={mortgageInterest}
                        onChange={(e) => setMortgageInterest(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t border-stone-200/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-stone-800">Easy E-Receipt (สูงสุด 50,000)</span>
                        <span className="font-mono font-bold text-stone-900">฿{easyEReceipt.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="5000"
                        value={easyEReceipt}
                        onChange={(e) => setEasyEReceipt(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 4: Donation */}
                {activeDeductionTab === 'donation' && (
                  <div className="space-y-3 bg-stone-50/70 p-4 rounded-none border border-stone-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-stone-800">บริจาคการศึกษา / โรงพยาบาล (2 เท่า)</span>
                        <span className="font-mono font-bold text-stone-900">฿{educationDonation.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="2000"
                        value={educationDonation}
                        onChange={(e) => setEducationDonation(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t border-stone-200/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-stone-800">บริจาคทั่วไป</span>
                        <span className="font-mono font-bold text-stone-900">฿{generalDonation.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="1000"
                        value={generalDonation}
                        onChange={(e) => setGeneralDonation(Number(e.target.value))}
                        className="w-full accent-[#c5a059] h-1.5 bg-stone-200 rounded-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Panel: Results Card (5 cols) - Obsidian High-End Editorial Style */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="bg-[#0c0b0a] text-stone-100 p-6 sm:p-7 rounded-none border border-stone-800 space-y-6 shadow-xl">
            <div className="border-b border-stone-800 pb-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] block">
                TAX REDUCTION SUMMARY
              </span>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono text-stone-400 block uppercase">ประหยัดภาษีได้</span>
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#c5a059]">
                    ฿{result ? result.taxSaved.toLocaleString() : '0'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-stone-400 block uppercase">ฐานภาษีสูงสุด</span>
                  <span className="text-xl font-mono font-bold text-stone-200">
                    {result ? result.marginalTaxRate : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown summary */}
            {result && (
              <div className="space-y-2.5 text-xs font-mono text-stone-300">
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">รายได้พึงประเมินทั้งปี:</span>
                  <span className="font-bold text-stone-100">฿{result.annualIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">หักค่าใช้จ่าย 50%:</span>
                  <span className="text-stone-300">- ฿{result.standardExpenseDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">ค่าลดหย่อนส่วนตัว:</span>
                  <span className="text-stone-300">- ฿{result.personalDeduction.toLocaleString()}</span>
                </div>

                {showDetailedDeductions && (result.totalOtherDeductions || 0) > 0 && (
                  <div className="flex justify-between py-1.5 border-b border-stone-800/80 text-stone-300">
                    <span className="font-sans text-xs">ลดหย่อนอื่นๆ เพิ่มเติม:</span>
                    <span>- ฿{result.totalOtherDeductions?.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">ลดหย่อนประกันที่ใช้:</span>
                  <span className="text-[#c5a059] font-bold">- ฿{result.totalInsuranceDeductionsAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">เงินได้สุทธิหลังลดหย่อน:</span>
                  <span className="font-bold text-stone-100">฿{result.netTaxableIncomeAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800/80">
                  <span className="text-stone-400 font-sans text-xs">ภาษีเดิมก่อนซื้อประกัน:</span>
                  <span className="text-stone-500 line-through">฿{result.totalTaxBefore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 text-xs font-bold text-stone-100">
                  <span className="font-sans">ภาษีที่ต้องจ่ายจริง:</span>
                  <span className="text-[#c5a059] text-base font-serif">฿{result.totalTaxAfter.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/products?tax=true"
                className="w-full h-11 flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-mono font-semibold uppercase tracking-wider rounded-none transition duration-200 text-xs text-center cursor-pointer"
              >
                <span>ดูแผนประกันลดหย่อนภาษีที่แนะนำ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-none border border-stone-200 text-xs text-stone-600 space-y-2">
            <h3 className="font-serif font-bold text-stone-900 flex items-center gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>หมายเหตุการคำนวณตามเกณฑ์สรรพากร:</span>
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-stone-500 text-[11px] leading-relaxed font-light">
              <li>หักค่าใช้จ่าย 50% สูงสุด 100,000 บ. และลดหย่อนส่วนตัว 60,000 บ. (ม.40(1))</li>
              <li>เบี้ยประกันชีวิตทั่วไป/สะสมทรัพย์ สูงสุด 100,000 บ. (รวมสุขภาพไม่เกิน 25,000 บ.)</li>
              <li>เบี้ยประกันบำนาญ สูงสุด 15% ไม่เกิน 200,000 บ. (รวมเกษียณไม่เกิน 500,000 บ.)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
