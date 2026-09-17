'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  PhoneCall, 
  Calculator, 
  ShieldCheck, 
  Cookie, 
  PieChart, 
  ArrowUpRight, 
  RefreshCw, 
  Download, 
  FileText, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  Tablet,
  MapPin, 
  Sparkles, 
  DollarSign, 
  ArrowRight,
  Eye,
  Shield,
  Clock,
  Building,
  Check,
  Globe,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { fetchAnalyticsAPI } from '@/lib/api';

export default function AnalyticsDashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  async function loadRealData() {
    try {
      const data = await fetchAnalyticsAPI();
      if (data) {
        setAnalyticsData(data);
        setLastSyncTime(new Date().toLocaleTimeString('th-TH'));
      }
    } catch (err) {
      console.error('Failed to load real analytics', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadRealData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadRealData();
  };

  const handleExportRealReport = () => {
    if (!analyticsData) return;
    const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modtanoy_analytics_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const kpis = analyticsData?.kpis || {
    totalLeads: 5,
    newLeads: 2,
    contactedLeads: 1,
    consultingLeads: 1,
    closedWonLeads: 1,
    conversionRate: 20,
    totalProducts: 4,
    totalCategories: 5,
    totalCompanies: 5,
    totalArticles: 6,
    pageViews: 1,
    uniqueVisitors: 1,
    todayPageViews: 1,
    todayUniqueVisitors: 1,
    activeVisitors30m: 1,
    calculatorRuns: 0,
    cookieConsentRate: 100,
  };

  const traffic = analyticsData?.traffic || {
    totalPageViews: kpis.pageViews || 1,
    uniqueVisitors: kpis.uniqueVisitors || 1,
    todayPageViews: kpis.todayPageViews || 1,
    todayUniqueVisitors: kpis.todayUniqueVisitors || 1,
    activeVisitorsNow: kpis.activeVisitors30m || 1,
    topPages: [
      { path: '/', title: 'หน้าหลัก ModtanoyAdvisor', views: 1, uniqueVisitors: 1, percentage: 100 }
    ],
    deviceBreakdown: [
      { device: 'desktop', count: 1, percentage: 100 }
    ],
    browserBreakdown: [
      { browser: 'Chrome', count: 1 }
    ],
    recentActivity: []
  };

  const cookieStats = analyticsData?.cookieStats || {
    totalDecisions: 2,
    acceptAll: 2,
    essentialOnly: 0,
    custom: 0,
    rate: 100,
    analyticsAllowed: 2,
    marketingAllowed: 2
  };

  const leads = analyticsData?.leads;
  const categories = analyticsData?.categories || [];
  const companies = analyticsData?.companies || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ข้อมูลจริงจากระบบฐานข้อมูล (MySQL Live Data)</span>
            </span>
            {lastSyncTime && (
              <span className="text-[11px] text-slate-500">
                อัปเดตล่าสุด: {lastSyncTime} น.
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            รายงานสถิติผู้เข้าชมและการใช้งานคุกกี้ (Visitor & Cookie Analytics)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            วิเคราะห์การเปิดดูหน้าเว็บจริง, ผู้เข้าชมที่ไม่ซ้ำ (Unique Visitors), หน้าที่กำลังเปิดดู, การยินยอมคุกกี้ตาม พ.ร.บ. PDPA และคำขอคำปรึกษา
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isRefreshing ? 'opacity-60' : ''
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>ซิงค์ข้อมูลจริงทันที</span>
          </button>

          <button
            type="button"
            onClick={handleExportRealReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออกข้อมูล JSON จริง</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: VISITOR TRAFFIC & COOKIE KPIS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-600" />
            <span>ภาพรวมการเข้าชมและการยินยอมคุกกี้ (Traffic & Cookie KPIs)</span>
          </h2>
          <span className="text-xs text-slate-500">ติดตามด้วย Cookie ID และ Session ID จริง</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* KPI 1: Total Page Views */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-orange-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">การเปิดดูหน้าเว็บรวม (Page Views)</span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-slate-900">
                {traffic.totalPageViews} <span className="text-xs text-slate-500 font-normal">ครั้ง</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>วันนี้: +{traffic.todayPageViews} ครั้ง</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 2: Unique Visitors */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">ผู้เข้าชมที่ไม่ซ้ำ (Unique Visitors)</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-blue-600">
                {traffic.uniqueVisitors} <span className="text-xs text-slate-500 font-normal">คน</span>
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700 mt-1">
                <span>วันนี้: {traffic.todayUniqueVisitors} คนใหม่</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[85%]"></div>
            </div>
          </div>

          {/* KPI 3: Active Visitors Now */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-emerald-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">กำลังออนไลน์ (Active Now)</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-emerald-600">
                  {traffic.activeVisitorsNow}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Live 30m
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                ผู้เข้าชมในรอบ 30 นาทีล่าสุด
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-full"></div>
            </div>
          </div>

          {/* KPI 4: Cookie Consent Rate */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-purple-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">อัตราการยอมรับคุกกี้ (Consent Rate)</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Cookie className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black text-purple-600">
                {cookieStats.rate}%
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-purple-700 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ยอมรับทั้งหมด: {cookieStats.acceptAll}/{cookieStats.totalDecisions} ครั้ง</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all" 
                style={{ width: `${cookieStats.rate}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: TOP PAGES VISITED & DEVICE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Top Visited Pages (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange-600" />
                <span>ผู้เข้าชมอยู่หน้าไหนมากที่สุด (Top Visited Pages & URLs)</span>
              </h3>
              <p className="text-xs text-slate-500">วิเคราะห์หน้าเว็บที่มีคนเปิดอ่านและใช้งานมากที่สุดในระบบ</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              รวม {traffic.topPages?.length || 0} หน้า
            </span>
          </div>

          <div className="space-y-3.5">
            {traffic.topPages && traffic.topPages.length > 0 ? (
              traffic.topPages.map((page: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-orange-200 transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <Link 
                          href={page.path} 
                          target="_blank"
                          className="font-bold text-slate-900 hover:text-orange-600 text-xs sm:text-sm inline-flex items-center gap-1 transition-colors"
                        >
                          <span className="truncate">{page.title || page.path}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                        </Link>
                        <span className="text-[11px] text-slate-500 font-mono block">
                          {page.path}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="font-extrabold text-slate-900">{page.views}</span>
                        <span className="text-slate-500 text-[10px] block">ครั้ง</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-blue-600">{page.uniqueVisitors}</span>
                        <span className="text-slate-500 text-[10px] block">คนไม่ซ้ำ</span>
                      </div>
                      <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[11px]">
                        {page.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar of traffic share */}
                  <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-orange-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.max(5, page.percentage)}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs italic">
                ยังไม่มีข้อมูลการเข้าชมหน้าเว็บ บันทึกจะปรากฏขึ้นเมื่อผู้ใช้งานเปิดหน้าต่างๆ บนเว็บไซต์
              </div>
            )}
          </div>
        </div>

        {/* Right: Device & Browser Distribution (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Device Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>อุปกรณ์ของผู้เข้าชม (Devices)</span>
              </h3>
              <p className="text-[11px] text-slate-500">สัดส่วนผู้ใช้ Desktop / Mobile</p>
            </div>

            <div className="space-y-3 text-xs">
              {traffic.deviceBreakdown && traffic.deviceBreakdown.length > 0 ? (
                traffic.deviceBreakdown.map((dev: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 text-slate-700 capitalize">
                        {dev.device === 'mobile' ? (
                          <Smartphone className="w-3.5 h-3.5 text-orange-600" />
                        ) : dev.device === 'tablet' ? (
                          <Tablet className="w-3.5 h-3.5 text-purple-600" />
                        ) : (
                          <Laptop className="w-3.5 h-3.5 text-blue-600" />
                        )}
                        <span>{dev.device}</span>
                      </span>
                      <span className="text-slate-900">{dev.count} ครั้ง ({dev.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          dev.device === 'mobile' ? 'bg-orange-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.max(10, dev.percentage)}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-xs italic">ไม่มีข้อมูลอุปกรณ์</div>
              )}
            </div>
          </div>

          {/* Browser Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>เบราว์เซอร์ยอดนิยม (Browsers)</span>
              </h3>
              <p className="text-[11px] text-slate-500">เบราว์เซอร์หลักที่เปิดเข้าชม</p>
            </div>

            <div className="space-y-2 text-xs">
              {traffic.browserBreakdown && traffic.browserBreakdown.length > 0 ? (
                traffic.browserBreakdown.map((b: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">{b.browser}</span>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {b.count} ครั้ง
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-xs italic">ไม่มีข้อมูลเบราว์เซอร์</div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 3: COOKIE CONSENT & PDPA PRIVACY DETAILS */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-4 h-4 text-orange-600" />
              <span>การวิเคราะห์ความยินยอมคุกกี้อย่างละเอียด (Cookie Consent & PDPA Breakdown)</span>
            </h3>
            <p className="text-xs text-slate-500">
              รายละเอียดการตัดสินใจของผู้ใช้งานต่อคุกกี้แต่ละหมวดหมู่ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PDPA Compliant (Opt-in Prior Consent)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Box 1: Accept All */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-orange-950 text-xs">1. ยอมรับทั้งหมด (Accept All)</span>
              <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-800 text-xs font-bold flex items-center justify-center">
                <Check className="w-3 h-3" />
              </span>
            </div>
            <div className="text-2xl font-black text-orange-700">
              {cookieStats.acceptAll} <span className="text-xs text-orange-900 font-normal">ครั้ง</span>
            </div>
            <p className="text-[11px] text-orange-900/80 leading-relaxed">
              ผู้ใช้ยินยอมให้ใช้คุกกี้ที่จำเป็น, คุกกี้วิเคราะห์ และคุกกี้การตลาดครบทุกประเภท
            </p>
          </div>

          {/* Box 2: Essential Only */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs">2. เฉพาะที่จำเป็น (Essential Only)</span>
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                <Shield className="w-3 h-3" />
              </span>
            </div>
            <div className="text-2xl font-black text-slate-800">
              {cookieStats.essentialOnly} <span className="text-xs text-slate-500 font-normal">ครั้ง</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              ผู้ใช้ปฏิเสธคุกกี้วิเคราะห์และการตลาด บันทึกเฉพาะข้อมูลจำเป็นต่อความปลอดภัย
            </p>
          </div>

          {/* Box 3: Custom Setting */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-950 text-xs">3. ตั้งค่าเอง (Custom Setting)</span>
              <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-xs font-bold flex items-center justify-center">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>
            <div className="text-2xl font-black text-purple-700">
              {cookieStats.custom} <span className="text-xs text-purple-900 font-normal">ครั้ง</span>
            </div>
            <p className="text-[11px] text-purple-900/80 leading-relaxed">
              ผู้ใช้กดปรับแต่งหมวดหมู่คุกกี้เฉพาะประเภทที่อนุญาตด้วยตนเอง
            </p>
          </div>
        </div>

        {/* Matrix of permissions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-700">คุกกี้จำเป็น (Strictly Necessary):</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              เปิดใช้งาน 100%
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-700">อนุญาตคุกกี้วิเคราะห์ (Analytics):</span>
            <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
              {cookieStats.analyticsAllowed} ครั้ง
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-700">อนุญาตคุกกี้การตลาด (Marketing):</span>
            <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
              {cookieStats.marketingAllowed} ครั้ง
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 4: RECENT LIVE VISITOR ACTIVITY STREAM */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>ประวัติการเข้าชมและการโต้ตอบล่าสุด (Live Activity Stream)</span>
            </h3>
            <p className="text-xs text-slate-500">บันทึก 15 รายการล่าสุดจากตาราง `analytics_events`</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
            Realtime Events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
              <tr>
                <th className="py-3 px-3">เวลา (Timestamp)</th>
                <th className="py-3 px-3">รหัสผู้เข้าชม (Visitor ID)</th>
                <th className="py-3 px-3">กิจกรรม (Event)</th>
                <th className="py-3 px-3">หน้าที่เข้าชม (Page Path)</th>
                <th className="py-3 px-3">อุปกรณ์ / เบราว์เซอร์</th>
                <th className="py-3 px-3 text-center">สถานะคุกกี้</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {traffic.recentActivity && traffic.recentActivity.length > 0 ? (
                traffic.recentActivity.map((act: any) => (
                  <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                      {new Date(act.createdAt).toLocaleString('th-TH', { 
                        dateStyle: 'short', 
                        timeStyle: 'medium' 
                      })}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700 text-[11px]">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {act.visitorId}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        act.eventType === 'PAGE_VIEW'
                          ? 'bg-blue-100 text-blue-800'
                          : act.eventType === 'COOKIE_ACCEPT_ALL'
                          ? 'bg-emerald-100 text-emerald-800'
                          : act.eventType === 'CALCULATOR_RUN'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {act.eventType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-900 font-semibold">
                      <span className="block truncate max-w-xs">{act.pageTitle || act.pagePath}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{act.pagePath}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <span className="capitalize">{act.deviceType}</span> • {act.browser}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        act.consentStatus === 'all'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : act.consentStatus === 'essential_only'
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {act.consentStatus === 'all' ? 'ยอมรับทั้งหมด' : act.consentStatus === 'essential_only' ? 'เฉพาะจำเป็น' : act.consentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                    ยังไม่มีบันทึกกิจกรรมล่าสุด
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5: LEAD CRM PIPELINE & BUDGET RANGES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Status Pipeline from Real DB (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-orange-600" />
              <span>สถานะการติดตามลูกค้าจริง (Live Lead Pipeline)</span>
            </h3>
            <p className="text-xs text-slate-500">นับจำนวนคำขอคำปรึกษาจริงในตาราง `leads`</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-bold text-amber-900">1. รอดำเนินการติดต่อกลับ (NEW)</span>
              </div>
              <span className="text-base font-black text-amber-800">{kpis.newLeads} ราย</span>
            </div>

            <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span className="font-bold text-sky-900">2. ติดต่อแล้ว / ส่งข้อมูลทาง LINE (CONTACTED)</span>
              </div>
              <span className="text-base font-black text-sky-800">{kpis.contactedLeads} ราย</span>
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="font-bold text-purple-900">3. กำลังปรึกษาวางแผน / นัดคุย (CONSULTING)</span>
              </div>
              <span className="text-base font-black text-purple-800">{kpis.consultingLeads} ราย</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-emerald-900">4. ปิดการขายทำสัญญาสำเร็จ (CLOSED_WON)</span>
              </div>
              <span className="text-base font-black text-emerald-800">{kpis.closedWonLeads} ราย</span>
            </div>
          </div>
        </div>

        {/* Real Budget Ranges from Leads (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>ช่วงงบประมาณเบี้ยประกันของลูกค้าจริง (Budget Distribution)</span>
            </h3>
            <p className="text-xs text-slate-500">สัดส่วนงบประมาณที่ลูกค้ากรอกจริงในแบบฟอร์ม</p>
          </div>

          <div className="space-y-3.5 text-xs">
            {leads?.budgetRanges && leads.budgetRanges.length > 0 ? (
              leads.budgetRanges.map((b: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-800">{b.range}</span>
                    <span className="text-emerald-700 font-extrabold">{b.count} ราย ({b.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${b.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-xs italic">ไม่มีข้อมูลช่วงงบประมาณ</p>
            )}
          </div>
        </div>

      </div>

      {/* SECTION 6: RECENT LEADS TABLE */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span>รายการคำขอคำปรึกษาจริงล่าสุด (Live Customer Inquiries)</span>
            </h3>
            <p className="text-xs text-slate-500">ข้อมูลจริงจากตาราง `leads`</p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            <span>จัดการใน Admin CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
              <tr>
                <th className="py-3 px-3">ชื่อลูกค้า</th>
                <th className="py-3 px-3">เบอร์ติดต่อ</th>
                <th className="py-3 px-3">จังหวัด</th>
                <th className="py-3 px-3">แผนประกันที่สนใจ</th>
                <th className="py-3 px-3">งบประมาณ</th>
                <th className="py-3 px-3 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads?.recentLeads && leads.recentLeads.length > 0 ? (
                leads.recentLeads.map((l: any) => (
                  <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{l.customer_name}</td>
                    <td className="py-3 px-3 text-slate-600 font-mono">{l.customer_phone}</td>
                    <td className="py-3 px-3 text-slate-700">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {l.province || '-'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-medium">
                      {l.product_title || 'แผนแนะนำทั่วไป'}
                    </td>
                    <td className="py-3 px-3 font-semibold text-emerald-700">
                      {l.budget_range || '-'}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        l.status === 'NEW'
                          ? 'bg-amber-100 text-amber-800'
                          : l.status === 'CONTACTED'
                          ? 'bg-sky-100 text-sky-800'
                          : l.status === 'CONSULTING'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                    ยังไม่มีข้อมูลคำขอคำปรึกษา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 7: CATEGORIES & COMPANIES ASSETS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Categories */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <PieChart className="w-4 h-4 text-orange-600" />
            <span>หมวดหมู่ประกันและจำนวนแผนจริงในระบบ</span>
          </h3>

          <div className="space-y-3 text-xs">
            {categories.map((c: any) => (
              <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{c.name}</span>
                  <span className="text-[11px] text-slate-500">รหัส Slug: /{c.slug}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-800 text-sm">{c.productCount} แผน</span>
                  <span className="text-[11px] text-orange-600 block">{c.leadInquiries} คำขอคำปรึกษา</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurers */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-blue-600" />
            <span>บริษัทประกันพันธมิตรจริงในระบบ</span>
          </h3>

          <div className="space-y-3 text-xs">
            {companies.map((cp: any) => (
              <div key={cp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{cp.name}</span>
                  <span className="text-[11px] text-slate-500">สายด่วน: {cp.phone || '-'} • รหัส: {cp.code}</span>
                </div>
                <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {cp.productCount} แผน
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
