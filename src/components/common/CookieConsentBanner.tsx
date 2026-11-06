'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cookie, 
  ShieldCheck, 
  Settings, 
  X, 
  Check, 
  ExternalLink
} from 'lucide-react';
import { trackAnalyticsEventAPI } from '@/lib/api';
import { 
  setCookieConsent, 
  getCookieConsent, 
  getClientAnalyticsContext, 
  CookieConsentPreferences 
} from '@/lib/cookieManager';

export type { CookieConsentPreferences };

const STATS_KEY = 'modtanoy_cookie_stats';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(true);

  useEffect(() => {
    try {
      const saved = getCookieConsent();
      if (!saved) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const updateConsentStats = (type: 'all' | 'essential_only' | 'custom') => {
    try {
      const statsRaw = localStorage.getItem(STATS_KEY);
      const stats = statsRaw ? JSON.parse(statsRaw) : { totalViews: 0, acceptAll: 0, essentialOnly: 0, custom: 0, lastUpdated: '' };
      stats.totalViews = (stats.totalViews || 0) + 1;
      if (type === 'all') stats.acceptAll = (stats.acceptAll || 0) + 1;
      if (type === 'essential_only') stats.essentialOnly = (stats.essentialOnly || 0) + 1;
      if (type === 'custom') stats.custom = (stats.custom || 0) + 1;
      stats.lastUpdated = new Date().toISOString();
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch {}
  };

  const saveConsent = (prefs: CookieConsentPreferences) => {
    try {
      setCookieConsent(prefs);
      updateConsentStats(prefs.status);

      const context = getClientAnalyticsContext();
      const eventType = prefs.status === 'all' 
        ? 'COOKIE_ACCEPT_ALL' 
        : prefs.status === 'essential_only' 
        ? 'COOKIE_ESSENTIAL_ONLY' 
        : 'COOKIE_CUSTOM';

      trackAnalyticsEventAPI(eventType, {
        visitorId: context.visitorId,
        sessionId: context.sessionId,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
        deviceType: context.deviceType,
        browser: context.browser,
        consentStatus: prefs.status,
        eventData: prefs,
      });
    } catch {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      status: 'all',
    });
  };

  const handleAcceptEssentialOnly = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      status: 'essential_only',
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
      status: 'custom',
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Bottom Cookie Consent Banner - Obsidian High-End Editorial Style */}
      <div 
        role="region" 
        aria-label="การขอความยินยอมใช้งานคุกกี้ (Cookie Consent)"
        className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto pointer-events-auto bg-[#0c0b0a] border border-stone-800 text-stone-300 rounded-none p-5 sm:p-6 shadow-2xl transition-all duration-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Left: Icon & Description */}
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-9 h-9 rounded-none bg-stone-900 text-[#c5a059] border border-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif font-bold text-stone-100 text-sm tracking-tight">
                    การใช้งานคุกกี้บน ModtanoyAdvisor
                  </span>
                  <span className="text-[10px] font-mono tracking-widest bg-stone-900 text-[#c5a059] border border-stone-800 px-2 py-0.5 rounded-none font-medium uppercase">
                    PDPA
                  </span>
                </div>
                <p className="leading-relaxed font-light">
                  เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การค้นหาและเปรียบเทียบแผนประกันที่ดียิ่งขึ้น วิเคราะห์การใช้งาน และนำเสนอข้อมูลสิทธิประโยชน์ทางภาษีที่ตรงกับความต้องการของท่าน
                </p>
                <div className="flex items-center gap-3 pt-0.5 text-[11px] font-mono">
                  <Link 
                    href="/privacy-policy" 
                    className="text-stone-300 hover:text-[#c5a059] underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>นโยบายความเป็นส่วนตัว</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <span className="text-stone-600">•</span>
                  <Link 
                    href="/terms" 
                    className="text-stone-400 hover:text-stone-200 underline underline-offset-2"
                  >
                    ข้อกำหนดการใช้งาน
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Actions Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="h-10 px-3.5 rounded-none border border-stone-800 bg-stone-900/80 hover:bg-stone-800 text-stone-300 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>ตั้งค่า</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="h-10 px-4 rounded-none border border-stone-800 bg-transparent hover:bg-stone-900 text-stone-300 text-xs font-mono uppercase tracking-wider transition-colors duration-150 cursor-pointer"
              >
                เฉพาะจำเป็น
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="h-10 px-5 rounded-none bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <Check className="w-3.5 h-3.5" />
                <span>ยอมรับทั้งหมด</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-none max-w-lg w-full p-6 sm:p-7 border border-stone-200 space-y-5 transition-all duration-200 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-stone-100 text-[#8c6d46] flex items-center justify-center border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">ตั้งค่าความเป็นส่วนตัวของคุกกี้</h3>
                  <p className="text-[11px] text-stone-500 font-light">เลือกประเภทคุกกี้ที่คุณยินยอมให้เว็บไซต์ใช้งาน</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="w-8 h-8 rounded-none hover:bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors duration-150 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Necessary */}
              <div className="p-4 rounded-none bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-stone-900">1. คุกกี้ที่จำเป็นอย่างยิ่ง</span>
                    <span className="text-[10px] font-mono bg-stone-200 text-stone-800 px-2 py-0.2 rounded-none font-medium uppercase">
                      จำเป็น
                    </span>
                  </div>
                  <span className="text-stone-600 font-mono text-[11px]">เปิดใช้งาน</span>
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed font-light">
                  จำเป็นต่อความปลอดภัยและการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้
                </p>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-none bg-white border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-stone-900">2. คุกกี้เพื่อการวิเคราะห์</span>
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 accent-[#c5a059] rounded-none border-stone-300 cursor-pointer"
                  />
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed font-light">
                  ช่วยให้เราเข้าใจว่าผู้ใช้งานค้นหาแผนประกันประเภทใด เพื่อพัฒนาประสิทธิภาพเว็บไซต์
                </p>
              </div>

              {/* Marketing */}
              <div className="p-4 rounded-none bg-white border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-stone-900">3. คุกกี้เพื่อการตลาด</span>
                  <input
                    type="checkbox"
                    checked={marketingAllowed}
                    onChange={(e) => setMarketingAllowed(e.target.checked)}
                    className="w-4 h-4 accent-[#c5a059] rounded-none border-stone-300 cursor-pointer"
                  />
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed font-light">
                  ใช้เพื่อนำเสนอแผนประกันและโปรโมชันที่เหมาะสมกับความสนใจของท่าน
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="h-9 px-4 rounded-none border border-stone-300 text-xs font-mono uppercase tracking-wider text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="h-9 px-5 rounded-none bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 text-xs font-mono uppercase tracking-wider cursor-pointer border border-stone-800"
              >
                บันทึกการตั้งค่า
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
