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
      {/* Floating Bottom Cookie Consent Banner */}
      <div 
        role="region" 
        aria-label="การขอความยินยอมใช้งานคุกกี้ (Cookie Consent)"
        className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 pointer-events-none"
      >
        <div className="max-w-4xl mx-auto pointer-events-auto bg-[#09090b] border border-zinc-800 text-zinc-300 rounded-xl p-4 sm:p-5 transition-all duration-150">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Left: Icon & Description */}
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/80 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-100 text-xs tracking-tight">
                    การใช้งานคุกกี้บน ModtanoyAdvisor
                  </span>
                  <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700 px-1.5 py-0.2 rounded font-medium">
                    PDPA
                  </span>
                </div>
                <p className="leading-relaxed">
                  เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การค้นหาและเปรียบเทียบแผนประกันที่ดียิ่งขึ้น วิเคราะห์การใช้งาน และนำเสนอข้อมูลสิทธิประโยชน์ทางภาษีที่ตรงกับความต้องการของท่าน
                </p>
                <div className="flex items-center gap-3 pt-0.5 text-[11px]">
                  <Link 
                    href="/privacy-policy" 
                    className="text-zinc-300 hover:text-white underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>นโยบายความเป็นส่วนตัว</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <span className="text-zinc-600">•</span>
                  <Link 
                    href="/terms" 
                    className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2"
                  >
                    ข้อกำหนดการใช้งาน
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Actions Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="h-9 px-3 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-zinc-400" />
                <span>ตั้งค่า</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="h-9 px-3 rounded-lg border border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors duration-150 cursor-pointer"
              >
                เฉพาะที่จำเป็น
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="h-9 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-medium transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 border border-zinc-200 space-y-4 transition-all duration-150">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center border border-zinc-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">ตั้งค่าความเป็นส่วนตัวของคุกกี้</h3>
                  <p className="text-[11px] text-zinc-500">เลือกประเภทคุกกี้ที่คุณอนุญาตให้เว็บไซต์ใช้งาน</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="w-7 h-7 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 flex items-center justify-center transition-colors duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Necessary */}
              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-900">1. คุกกี้ที่จำเป็นอย่างยิ่ง</span>
                    <span className="text-[10px] font-mono bg-zinc-200 text-zinc-700 px-1.5 py-0.2 rounded font-medium">
                      จำเป็น
                    </span>
                  </div>
                  <span className="text-zinc-600 font-mono text-[11px]">เปิดใช้งาน</span>
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  จำเป็นต่อความปลอดภัยและการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้
                </p>
              </div>

              {/* Analytics */}
              <div className="p-3 rounded-lg bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">2. คุกกี้เพื่อการวิเคราะห์</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsAllowed}
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-900"></div>
                  </label>
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  ช่วยให้เราเข้าใจว่าผู้ใช้งานค้นหาแผนประกันประเภทใด เพื่อพัฒนาประสิทธิภาพเว็บไซต์
                </p>
              </div>

              {/* Marketing */}
              <div className="p-3 rounded-lg bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">3. คุกกี้เพื่อการตลาด</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingAllowed}
                      onChange={(e) => setMarketingAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-zinc-900"></div>
                  </label>
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  ใช้เพื่อนำเสนอสิทธิประโยชน์และข่าวสารแผนประกันที่ตรงกับความสนใจของท่าน
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="h-9 px-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-colors duration-150 cursor-pointer"
              >
                ปฏิเสธทั้งหมด
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="h-9 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.98]"
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
