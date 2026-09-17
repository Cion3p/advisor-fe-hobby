'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  PhoneCall, 
  Calculator, 
  ShieldCheck, 
  Cookie, 
  PieChart, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  RefreshCw, 
  FileText, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  MapPin, 
  Sparkles, 
  DollarSign, 
  ArrowRight,
  Filter,
  Eye,
  Shield,
  Clock,
  HeartPulse
} from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days' | 'ytd'>('30days');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cookieStats, setCookieStats] = useState({
    totalViews: 12480,
    acceptAll: 10520,
    essentialOnly: 1680,
    custom: 280,
  });

  // Load real cookie stats if available in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('modtanoy_cookie_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.totalViews) {
          setCookieStats({
            totalViews: 12480 + (parsed.totalViews || 0),
            acceptAll: 10520 + (parsed.acceptAll || 0),
            essentialOnly: 1680 + (parsed.essentialOnly || 0),
            custom: 280 + (parsed.custom || 0),
          });
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleExportReport = () => {
    const reportData = {
      reportTitle: 'ModtanoyAdvisor Analytics & Insights Report 2026',
      generatedAt: new Date().toISOString(),
      timeRange,
      kpis: {
        totalVisitors: '18,450 (+18.4%)',
        totalLeads: '245 (Conversion 1.33%)',
        calculatorRuns: '4,820 ครั้ง',
        pdpaComplianceRate: '92.4%',
      },
      topCategories: [
        { name: 'ประกันสุขภาพเหมาจ่าย', share: '46%' },
        { name: 'วางแผนลดหย่อนภาษี & สะสมทรัพย์', share: '29%' },
        { name: 'ประกันบำนาญเกษียณอายุ', share: '15%' },
        { name: 'ประกันชีวิตและมรดก', share: '10%' },
      ],
      cookieCompliance: cookieStats,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modtanoy_analytics_report_${timeRange}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Derived metrics based on timeRange
  const multiplier = timeRange === 'today' ? 0.05 : timeRange === '7days' ? 0.28 : timeRange === '30days' ? 1.0 : 3.8;
  const visitorsCount = Math.round(18450 * multiplier);
  const leadsCount = Math.round(245 * multiplier);
  const calcCount = Math.round(4820 * multiplier);
  const totalTaxSavedSimulated = Math.round(108500000 * multiplier);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header & Range Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
            <Activity className="w-3.5 h-3.5 text-orange-600" />
            <span>ศูนย์ข้อมูลและการวิเคราะห์พฤติกรรมผู้บริโภค (Market & User Insights)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            รายงานวิเคราะห์ข้อมูลและสถิติภาพรวม
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            วิเคราะห์ความต้องการแผนประกัน พฤติกรรมการคำนวณภาษี อัตราการเปลี่ยนเป็นลูกค้า (Conversion) และการปฏิบัติตาม PDPA
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Filter Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === 'today' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              วันนี้
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '7days' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              7 วัน
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === '30days' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              30 วัน
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1.5 rounded-lg transition-all ${timeRange === 'ytd' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              ปี 2568
            </button>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className={`p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออกรายงาน</span>
          </button>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* KPI 1: Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ผู้เข้าชมเว็บไซต์ (Unique Visitors)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {visitorsCount.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% จากช่วงก่อนหน้า</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[78%]"></div>
          </div>
        </div>

        {/* KPI 2: Lead Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">คำขอคำปรึกษา (Qualified Leads)</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {leadsCount.toLocaleString()} <span className="text-xs text-slate-500 font-normal">ราย</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Conversion Rate 1.33%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full w-[64%]"></div>
          </div>
        </div>

        {/* KPI 3: Calculators Runs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">การจำลองคำนวณภาษี & ทุนชีวิต</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {calcCount.toLocaleString()} <span className="text-xs text-slate-500 font-normal">ครั้ง</span>
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mt-1">
              <span>ภาษี 72% • ทุนชีวิต 28%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[85%]"></div>
          </div>
        </div>

        {/* KPI 4: Cookie Consent PDPA Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">อัตราความยินยอมคุกกี้ (PDPA)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cookie className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              92.4%
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>เป็นไปตามเกณฑ์ สคส. 100%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full w-[92%]"></div>
          </div>
        </div>

      </div>

      {/* Row 2: Insurance Category Demand & Top Viewed Brands */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-orange-600" />
                <span>หมวดหมู่ประกันที่ได้รับความนิยมสูงสุด (Category Demand Share)</span>
              </h3>
              <p className="text-xs text-slate-500">สัดส่วนการเข้าชมรายละเอียดแผนและการส่งคำขอคำปรึกษา</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {/* Health */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  1. แผนประกันสุขภาพเหมาจ่าย (Health Insurance)
                </span>
                <span className="text-orange-600 font-extrabold text-sm">46% (8,487 วิว)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: '46%' }}></div>
              </div>
              <span className="text-[11px] text-slate-400">จุดเด่นที่คนสนใจ: วงเงินเหมาจ่าย 5-100 ล้านบาท, ค่ายามุ่งเป้า Targeted Therapy</span>
            </div>

            {/* Tax Savings */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  2. ผลิตภัณฑ์ลดหย่อนภาษี & สะสมทรัพย์ (Tax Saving)
                </span>
                <span className="text-emerald-600 font-extrabold text-sm">29% (5,350 วิว)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '29%' }}></div>
              </div>
              <span className="text-[11px] text-slate-400">จุดเด่นที่คนสนใจ: ออมสั้น 5-10 ปี คืนเงินทุกปี ใช้สิทธิ์เต็มแสน</span>
            </div>

            {/* Annuity */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  3. ประกันบำนาญเพื่อการเกษียณ (Annuity Pension)
                </span>
                <span className="text-purple-600 font-extrabold text-sm">15% (2,767 วิว)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: '15%' }}></div>
              </div>
              <span className="text-[11px] text-slate-400">จุดเด่นที่คนสนใจ: การันตีเงินบำนาญสม่ำเสมอถึงอายุ 85 ปี</span>
            </div>

            {/* Life Protection */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-bold">
                <span className="text-slate-800 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  4. ประกันชีวิตและสร้างมรดก (Life Protection)
                </span>
                <span className="text-blue-600 font-extrabold text-sm">10% (1,845 วิว)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '10%' }}></div>
              </div>
              <span className="text-[11px] text-slate-400">จุดเด่นที่คนสนใจ: คุ้มครองหนี้สินบ้านและทุนการศึกษาบุตร</span>
            </div>
          </div>
        </div>

        {/* Top Insurers (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>แบรนด์บริษัทประกันยอดนิยม</span>
              </h3>
              <p className="text-xs text-slate-500">จากจำนวนคลิกเปรียบเทียบและขอข้อเสนอ</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-[11px]">1</span>
                <div>
                  <span className="font-bold text-slate-900 block">เมืองไทยประกันชีวิต (MTL)</span>
                  <span className="text-[11px] text-slate-500">โดดเด่น: Elite Health Plus</span>
                </div>
              </div>
              <span className="font-bold text-slate-800 text-sm">28%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[11px]">2</span>
                <div>
                  <span className="font-bold text-slate-900 block">เอไอเอ ประเทศไทย (AIA)</span>
                  <span className="text-[11px] text-slate-500">โดดเด่น: Health Happy, CI SuperCare</span>
                </div>
              </div>
              <span className="font-bold text-slate-800 text-sm">25%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[11px]">3</span>
                <div>
                  <span className="font-bold text-slate-900 block">อลิอันซ์ อยุธยา (AZAY)</span>
                  <span className="text-[11px] text-slate-500">โดดเด่น: My Double Plus 10/5</span>
                </div>
              </div>
              <span className="font-bold text-slate-800 text-sm">20%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[11px]">4</span>
                <div>
                  <span className="font-bold text-slate-900 block">กรุงไทย-แอกซ่า (KTAXA)</span>
                  <span className="text-[11px] text-slate-500">โดดเด่น: iHealthy Ultra, Retire Ready</span>
                </div>
              </div>
              <span className="font-bold text-slate-800 text-sm">15%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-[11px]">5</span>
                <div>
                  <span className="font-bold text-slate-900 block">เอฟดับบลิวดี & กรุงเทพประกันชีวิต</span>
                  <span className="text-[11px] text-slate-500">โดดเด่น: คุ้มครองโรคร้ายแรง & บำนาญ</span>
                </div>
              </div>
              <span className="font-bold text-slate-800 text-sm">12%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Tax Calculator In-depth & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tax Calculator In-depth Analytics (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>พฤติกรรมการคำนวณภาษี (Tax Engine Insights)</span>
              </h3>
              <p className="text-xs text-slate-500">สถิติจากเครื่องมือคำนวณสิทธิลดหย่อนภาษี 2567-2568</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 block mb-0.5">เงินได้เฉลี่ยต่อเดือน</span>
              <span className="text-lg font-bold text-slate-900">฿65,000 / เดือน</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">รวมเงินได้ทั้งปี ฿780,000</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 block mb-0.5">ฐานภาษีสูงสุดที่พบบ่อย</span>
              <span className="text-lg font-bold text-amber-600">15% - 20%</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">กลุ่มที่คุ้มค่าต่อการซื้อประกัน</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-emerald-800 block mb-0.5 font-medium">ภาษีที่ประหยัดได้เฉลี่ย</span>
              <span className="text-lg font-extrabold text-emerald-700">฿22,400</span>
              <span className="text-[11px] text-emerald-600 block mt-0.5">ต่อผู้ใช้งานหนึ่งราย</span>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
              <span className="text-sky-800 block mb-0.5 font-medium">มูลค่าลดหย่อนรวมที่จำลอง</span>
              <span className="text-lg font-extrabold text-sky-700">฿{(totalTaxSavedSimulated / 1000000).toFixed(1)}M</span>
              <span className="text-[11px] text-sky-600 block mt-0.5">คืนภาษีเข้ากระเป๋าคนไทย</span>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <span className="font-bold text-slate-800 block">ออฟชั่นเสริมที่ผู้ใช้กดเลือกคำนวณเพิ่มเติมสูงสุด:</span>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                ประกันสังคม (88%)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                กองทุน ThaiESG (42%)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold border border-blue-200">
                ดอกเบี้ยกู้บ้าน (39%)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold border border-purple-200">
                กองทุน RMF/PVD (34%)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 font-semibold border border-orange-200">
                บุตร & บิดามารดา (29%)
              </span>
            </div>
          </div>
        </div>

        {/* Conversion Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>กรวยขั้นตอนการเปลี่ยนเป็นลูกค้า (Conversion Funnel)</span>
              </h3>
              <p className="text-xs text-slate-500">เส้นทางผู้ใช้งานตั้งแต่เข้าเว็บจนถึงการปิดกรมธรรม์</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Step 1 */}
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-800 flex items-center justify-center font-bold text-[10px]">1</span>
                <span className="font-semibold text-slate-800">เข้าชมหน้าเว็บไซต์ (Total Visitors)</span>
              </div>
              <span className="font-bold text-slate-900">{visitorsCount.toLocaleString()} ราย (100%)</span>
            </div>

            {/* Step 2 */}
            <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-100 flex items-center justify-between ml-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center font-bold text-[10px]">2</span>
                <span className="font-semibold text-slate-800">ใช้โปรแกรมคำนวณ หรือ AI Quiz</span>
              </div>
              <span className="font-bold text-sky-700">{Math.round(visitorsCount * 0.332).toLocaleString()} ราย (33.2%)</span>
            </div>

            {/* Step 3 */}
            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between ml-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-[10px]">3</span>
                <span className="font-semibold text-slate-800">ดูตารางเปรียบเทียบผลประโยชน์แผนประกัน</span>
              </div>
              <span className="font-bold text-blue-700">{Math.round(visitorsCount * 0.157).toLocaleString()} ราย (15.7%)</span>
            </div>

            {/* Step 4 */}
            <div className="p-2.5 bg-orange-50/70 rounded-xl border border-orange-200 flex items-center justify-between ml-6">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center font-bold text-[10px]">4</span>
                <span className="font-semibold text-slate-900">กรอกฟอร์มขอรับคำปรึกษา (Submitted Leads)</span>
              </div>
              <span className="font-extrabold text-orange-700">{leadsCount.toLocaleString()} ราย (1.33%)</span>
            </div>

            {/* Step 5 */}
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 flex items-center justify-between ml-8">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px]">5</span>
                <span className="font-bold text-emerald-950">ปิดการขายทำสัญญากรมธรรม์สำเร็จ (Closed Won)</span>
              </div>
              <span className="font-extrabold text-emerald-700">{Math.round(leadsCount * 0.278)} เล่ม (27.8%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 4: PDPA Cookie Consent & Device/Geography Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PDPA Cookie Consent Compliance (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Cookie className="w-4 h-4 text-orange-600" />
                <span>รายงานความยินยอมคุกกี้ (PDPA Cookie Compliance)</span>
              </h3>
              <p className="text-xs text-slate-500">บันทึกการตัดสินใจของผู้ใช้งานตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-slate-500 block text-[11px] mb-1">ยอมรับทั้งหมด</span>
              <span className="text-xl font-black text-emerald-700">
                {((cookieStats.acceptAll / (cookieStats.totalViews || 1)) * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">{cookieStats.acceptAll.toLocaleString()} ราย</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px] mb-1">เฉพาะที่จำเป็น</span>
              <span className="text-xl font-black text-slate-700">
                {((cookieStats.essentialOnly / (cookieStats.totalViews || 1)) * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{cookieStats.essentialOnly.toLocaleString()} ราย</span>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-slate-500 block text-[11px] mb-1">ปรับแต่งเอง</span>
              <span className="text-xl font-black text-blue-700">
                {((cookieStats.custom / (cookieStats.totalViews || 1)) * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] text-blue-600 block mt-0.5">{cookieStats.custom.toLocaleString()} ราย</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ความปลอดภัยและความโปร่งใสของข้อมูล:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              ระบบไม่จัดเก็บข้อมูลส่วนตัวที่มีความอ่อนไหวในคุกกี้ และเปิดให้ผู้ใช้งานสามารถถอนความยินยอมหรือปรับแต่งการตั้งค่าความเป็นส่วนตัวได้ตลอดเวลาผ่านหน้า นโยบายความเป็นส่วนตัว
            </p>
          </div>
        </div>

        {/* Device & Geography (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>อุปกรณ์และพื้นที่เข้าใช้งาน (Device & Geo Distribution)</span>
              </h3>
              <p className="text-xs text-slate-500">สัดส่วนแพลตฟอร์มและจังหวัดที่มีการส่ง Lead สูงสุด</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Devices */}
            <div className="space-y-2.5">
              <span className="font-bold text-slate-800 block">อุปกรณ์ที่ใช้งาน:</span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-orange-600" /> มือถือ (Mobile)</span>
                    <span className="font-bold text-slate-900">74%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full w-[74%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-blue-600" /> คอมพิวเตอร์ (Desktop)</span>
                    <span className="font-bold text-slate-900">24%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[24%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>แท็บเล็ต (Tablet)</span>
                    <span className="font-bold text-slate-900">2%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[2%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Geography */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block">5 จังหวัดที่มี Lead สูงสุด:</span>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="font-medium text-slate-800">1. กรุงเทพฯ และปริมณฑล</span>
                  <span className="font-bold text-orange-600">58%</span>
                </li>
                <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="font-medium text-slate-800">2. เชียงใหม่ & ภาคเหนือ</span>
                  <span className="font-bold text-slate-700">14%</span>
                </li>
                <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="font-medium text-slate-800">3. ชลบุรี & ภาคตะวันออก</span>
                  <span className="font-bold text-slate-700">12%</span>
                </li>
                <li className="flex justify-between items-center py-0.5 border-b border-slate-100">
                  <span className="font-medium text-slate-800">4. ขอนแก่น & ภาคอีสาน</span>
                  <span className="font-bold text-slate-700">9%</span>
                </li>
                <li className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-800">5. ภูเก็ต & ภาคใต้</span>
                  <span className="font-bold text-slate-700">7%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เชื่อมต่อข้อมูลสู่การวางแผนธุรกิจและการตลาด</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            ต้องการข้อมูลเชิงลึกสำหรับตัวแทน หรือ จัดการแผนประกันภัย?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            เข้าสู่ระบบผู้ดูแลเพื่อจัดการรายการลูกค้า (CRM), อัปเดตแผนประกัน และปรับแต่งเพดานภาษี
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin"
            className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-600/30 transition-all flex items-center gap-1.5"
          >
            <span>ไปที่ระบบแอดมิน (Admin Portal)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
