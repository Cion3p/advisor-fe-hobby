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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
          <Receipt className="w-3.5 h-3.5 text-zinc-500" />
          <span>TAX CALCULATOR 2567 - 2568</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          คำนวณภาษี & วางแผนลดหย่อนครบวงจร
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          คำนวณสิทธิประโยชน์ทางภาษีได้ทั้งแบบมาตรฐานเฉพาะเบี้ยประกัน หรือเปิดตัวเลือกเสริมเพื่อคำนวณลดหย่อนอื่นๆ ละเอียดตามเกณฑ์กรมสรรพากร
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-xl border border-zinc-200 space-y-6">
          
          {/* Section 1: Income */}
          <div className="space-y-3.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center justify-between border-b border-zinc-100 pb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center text-[11px] font-bold">1</span>
                <span>รายได้พึงประเมิน ม.40(1)</span>
              </span>
            </h2>

            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1">
                <span className="text-zinc-700">รายได้เฉลี่ยต่อเดือน (บาท)</span>
                <span className="font-mono font-bold text-zinc-900 text-base">
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
                className="w-full accent-zinc-900 h-1.5 bg-zinc-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1">
                <span>15,000 บ.</span>
                <span className="text-zinc-600">รวมทั้งปี: ฿{annualIncome.toLocaleString()} บาท</span>
                <span>300,000+ บ.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Proposed Insurance */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center text-[11px] font-bold">2</span>
                <span>เบี้ยประกันที่วางแผนซื้อลดหย่อน</span>
              </h2>
            </div>

            {/* Proposed Health */}
            <div className="space-y-1 bg-zinc-50 p-3.5 rounded-lg border border-zinc-200/80">
              <div className="flex justify-between items-center text-xs font-medium">
                <div>
                  <span className="text-zinc-800 font-bold block">ประกันสุขภาพ</span>
                  <span className="text-[10px] font-mono text-zinc-400">ลดหย่อนได้สูงสุด 25,000 บาท/ปี</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 text-sm">฿{proposedHealth.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="2500"
                value={proposedHealth}
                onChange={(e) => setProposedHealth(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>0</span>
                <span>25,000</span>
              </div>
            </div>

            {/* Proposed Life */}
            <div className="space-y-1 bg-zinc-50 p-3.5 rounded-lg border border-zinc-200/80">
              <div className="flex justify-between items-center text-xs font-medium">
                <div>
                  <span className="text-zinc-800 font-bold block">ประกันชีวิตทั่วไป / สะสมทรัพย์</span>
                  <span className="text-[10px] font-mono text-zinc-400">เพดานสูงสุด 100,000 บาท (รวมสุขภาพ)</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 text-sm">฿{proposedLife.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={proposedLife}
                onChange={(e) => setProposedLife(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>0</span>
                <span>100,000</span>
              </div>
            </div>

            {/* Proposed Pension */}
            <div className="space-y-1 bg-zinc-50 p-3.5 rounded-lg border border-zinc-200/80">
              <div className="flex justify-between items-center text-xs font-medium">
                <div>
                  <span className="text-zinc-800 font-bold block">ประกันบำนาญ (Annuity)</span>
                  <span className="text-[10px] font-mono text-zinc-400">สูงสุด 15% ของเงินได้ แต่ไม่เกิน 200,000 บาท</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 text-sm">฿{proposedPension.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.min(annualIncome * 0.15, 200000)}
                step="5000"
                value={proposedPension}
                onChange={(e) => setProposedPension(Number(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>0</span>
                <span>{Math.min(annualIncome * 0.15, 200000).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Existing Insurance Toggle */}
          <div className="pt-2 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => setShowExistingInsurance(!showExistingInsurance)}
              className="flex items-center justify-between w-full text-xs font-medium text-zinc-600 hover:text-zinc-900 py-2 transition-colors duration-150"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                <span>ฉันมีประกันที่ซื้อไว้แล้วอยู่ก่อนหน้านี้ (ระบุเพิ่มเติม)</span>
              </span>
              {showExistingInsurance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showExistingInsurance && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-500 font-medium">ประกันชีวิตเดิม</label>
                  <input
                    type="number"
                    value={existingLife || ''}
                    onChange={(e) => setExistingLife(Number(e.target.value))}
                    placeholder="0"
                    className="w-full h-9 px-3 rounded-lg border border-zinc-200 text-xs font-mono focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-500 font-medium">ประกันสุขภาพเดิม</label>
                  <input
                    type="number"
                    value={existingHealth || ''}
                    onChange={(e) => setExistingHealth(Number(e.target.value))}
                    placeholder="0"
                    className="w-full h-9 px-3 rounded-lg border border-zinc-200 text-xs font-mono focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-500 font-medium">ประกันบำนาญเดิม</label>
                  <input
                    type="number"
                    value={existingPension || ''}
                    onChange={(e) => setExistingPension(Number(e.target.value))}
                    placeholder="0"
                    className="w-full h-9 px-3 rounded-lg border border-zinc-200 text-xs font-mono focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Detailed Deductions */}
          <div className="pt-2 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => setShowDetailedDeductions(!showDetailedDeductions)}
              className="flex items-center justify-between w-full text-xs font-medium text-zinc-600 hover:text-zinc-900 py-2 transition-colors duration-150"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                <span>คำนวณแบบละเอียด (กองทุน ThaiESG, ดอกเบี้ยบ้าน, ประกันสังคม, ครอบครัว)</span>
              </span>
              {showDetailedDeductions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetailedDeductions && (
              <div className="space-y-4 pt-3">
                {/* Tabs */}
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-zinc-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveDeductionTab('family')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-150 ${
                      activeDeductionTab === 'family'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    ครอบครัว
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeductionTab('investment')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-150 ${
                      activeDeductionTab === 'investment'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    กองทุน
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeductionTab('property')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-150 ${
                      activeDeductionTab === 'property'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    บ้าน & ช้อปปิ้ง
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDeductionTab('donation')}
                    className={`py-1.5 text-xs font-medium rounded-md transition-colors duration-150 ${
                      activeDeductionTab === 'donation'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    บริจาค
                  </button>
                </div>

                {/* Tab 1: Family */}
                {activeDeductionTab === 'family' && (
                  <div className="space-y-3 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">เงินสมทบประกันสังคม (สูงสุด 9,000)</span>
                        <span className="font-mono font-bold text-zinc-900">฿{socialSecurity.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="9000"
                        step="500"
                        value={socialSecurity}
                        onChange={(e) => setSocialSecurity(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                      <span className="text-zinc-700">คู่สมรสไม่มีเงินได้ (ลดหย่อน 60,000)</span>
                      <input
                        type="checkbox"
                        checked={spouseAllowance}
                        onChange={(e) => setSpouseAllowance(e.target.checked)}
                        className="w-4 h-4 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-400 cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                      <span className="text-zinc-700">จำนวนบุตร (คนละ 30,000)</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-6 h-6 rounded border border-zinc-200 bg-white flex items-center justify-center text-zinc-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-mono font-bold">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-6 h-6 rounded border border-zinc-200 bg-white flex items-center justify-center text-zinc-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                      <span className="text-zinc-700">อุปการะบิดา-มารดา (คนละ 30,000)</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setParentsCount(Math.max(0, parentsCount - 1))}
                          className="w-6 h-6 rounded border border-zinc-200 bg-white flex items-center justify-center text-zinc-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-mono font-bold">{parentsCount}</span>
                        <button
                          type="button"
                          onClick={() => setParentsCount(Math.min(4, parentsCount + 1))}
                          className="w-6 h-6 rounded border border-zinc-200 bg-white flex items-center justify-center text-zinc-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Investments */}
                {activeDeductionTab === 'investment' && (
                  <div className="space-y-3 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">กองทุน ThaiESG (สูงสุด 300,000)</span>
                        <span className="font-mono font-bold text-zinc-900">฿{thaiEsg.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxThaiEsg}
                        step="10000"
                        value={thaiEsg}
                        onChange={(e) => setThaiEsg(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t border-zinc-200/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">RMF / PVD / กบข. / SSF</span>
                        <span className="font-mono font-bold text-zinc-900">฿{rmfPvdSsf.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxRmfPvd}
                        step="10000"
                        value={rmfPvdSsf}
                        onChange={(e) => setRmfPvdSsf(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 3: Property */}
                {activeDeductionTab === 'property' && (
                  <div className="space-y-3 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">ดอกเบี้ยเงินกู้ซื้อบ้าน (สูงสุด 100,000)</span>
                        <span className="font-mono font-bold text-zinc-900">฿{mortgageInterest.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="5000"
                        value={mortgageInterest}
                        onChange={(e) => setMortgageInterest(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t border-zinc-200/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">Easy E-Receipt (สูงสุด 50,000)</span>
                        <span className="font-mono font-bold text-zinc-900">฿{easyEReceipt.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="5000"
                        value={easyEReceipt}
                        onChange={(e) => setEasyEReceipt(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Tab 4: Donation */}
                {activeDeductionTab === 'donation' && (
                  <div className="space-y-3 bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">บริจาคการศึกษา / โรงพยาบาล (2 เท่า)</span>
                        <span className="font-mono font-bold text-zinc-900">฿{educationDonation.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="2000"
                        value={educationDonation}
                        onChange={(e) => setEducationDonation(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1 pt-2 border-t border-zinc-200/60">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-800">บริจาคทั่วไป</span>
                        <span className="font-mono font-bold text-zinc-900">฿{generalDonation.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="1000"
                        value={generalDonation}
                        onChange={(e) => setGeneralDonation(Number(e.target.value))}
                        className="w-full accent-zinc-900 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Panel: Results Card (5 cols) - Dark Engineering Aesthetics */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="bg-[#09090b] text-white p-5 sm:p-6 rounded-xl border border-zinc-800 space-y-5">
            <div className="border-b border-zinc-800 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                TAX REDUCTION SUMMARY
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 block">ประหยัดภาษีได้</span>
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-400">
                    ฿{result ? result.taxSaved.toLocaleString() : '0'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-zinc-400 block">ฐานภาษีสูงสุด</span>
                  <span className="text-lg font-mono font-bold text-zinc-200">
                    {result ? result.marginalTaxRate : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown summary */}
            {result && (
              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">รายได้พึงประเมินทั้งปี:</span>
                  <span className="font-bold text-white">฿{result.annualIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">หักค่าใช้จ่าย 50%:</span>
                  <span className="text-zinc-300">- ฿{result.standardExpenseDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">ค่าลดหย่อนส่วนตัว:</span>
                  <span className="text-zinc-300">- ฿{result.personalDeduction.toLocaleString()}</span>
                </div>

                {showDetailedDeductions && (result.totalOtherDeductions || 0) > 0 && (
                  <div className="flex justify-between py-1 border-b border-zinc-800/80 text-zinc-300">
                    <span className="font-sans text-xs">ลดหย่อนอื่นๆ เพิ่มเติม:</span>
                    <span>- ฿{result.totalOtherDeductions?.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">ลดหย่อนประกันที่ใช้:</span>
                  <span className="text-emerald-400 font-bold">- ฿{result.totalInsuranceDeductionsAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">เงินได้สุทธิหลังลดหย่อน:</span>
                  <span className="font-bold text-white">฿{result.netTaxableIncomeAfter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800/80">
                  <span className="text-zinc-400 font-sans text-xs">ภาษีเดิมก่อนซื้อประกัน:</span>
                  <span className="text-zinc-500 line-through">฿{result.totalTaxBefore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 pt-1.5 text-xs font-bold text-white">
                  <span className="font-sans">ภาษีที่ต้องจ่ายจริง:</span>
                  <span className="text-emerald-400 text-sm">฿{result.totalTaxAfter.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="pt-1">
              <Link
                href="/products?tax=true"
                className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 font-medium rounded-lg active:scale-[0.98] transition duration-150 text-xs text-center cursor-pointer"
              >
                <span>ดูแผนประกันลดหย่อนภาษีที่แนะนำ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
            <h3 className="font-bold text-zinc-900 flex items-center gap-1.5 text-xs">
              <Info className="w-3.5 h-3.5 text-zinc-500" />
              <span>หมายเหตุการคำนวณ:</span>
            </h3>
            <ul className="list-disc pl-4 space-y-0.5 text-zinc-500 text-[11px] leading-relaxed">
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
