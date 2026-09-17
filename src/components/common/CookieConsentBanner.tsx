'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cookie, 
  ShieldCheck, 
  Settings, 
  X, 
  Check, 
  ExternalLink,
  ChevronRight,
  Info
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
    // Check if user has already given consent via cookie or localStorage
    try {
      const saved = getCookieConsent();
      if (!saved) {
        // Small delay for smooth entry after initial page paint
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case storage is blocked
    }
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
    } catch {
      // ignore
    }
  };

  const saveConsent = (prefs: CookieConsentPreferences) => {
    try {
      setCookieConsent(prefs);
      updateConsentStats(prefs.status);

      const context = getClientAnalyticsContext();
      // Track real event into MySQL backend with visitor & session info
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
    } catch {
      // ignore
    }
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
        className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white rounded-2xl shadow-2xl p-4 sm:p-6 transition-all animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            
            {/* Left: Icon & Description */}
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                    การใช้งานคุกกี้บน ModtanoyAdvisor
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    PDPA Compliant
                  </span>
                </div>
                <p className="leading-relaxed">
                  เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การค้นหาและเปรียบเทียบแผนประกันที่ดียิ่งขึ้น วิเคราะห์การใช้งาน และนำเสนอข้อมูลสิทธิประโยชน์ทางภาษีที่ตรงกับความต้องการของท่าน ท่านสามารถเลือกตั้งค่าความเป็นส่วนตัวได้ตามต้องการ
                </p>
                <div className="flex items-center gap-3 pt-0.5 text-[11px]">
                  <Link 
                    href="/privacy-policy" 
                    className="text-orange-400 hover:text-orange-300 underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>นโยบายความเป็นส่วนตัว</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <span className="text-slate-600">•</span>
                  <Link 
                    href="/terms" 
                    className="text-slate-400 hover:text-slate-300 underline underline-offset-2"
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
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>ตั้งค่าคุกกี้</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                เฉพาะที่จำเป็น
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-lg shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">ตั้งค่าความเป็นส่วนตัวของคุกกี้</h3>
                  <p className="text-[11px] text-slate-500">เลือกประเภทคุกกี้ที่คุณอนุญาตให้เว็บไซต์ใช้งาน</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Necessary Cookies (Locked ON) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">1. คุกกี้ที่จำเป็นอย่างยิ่ง (Strictly Necessary)</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                      จำเป็นเสมอ
                    </span>
                  </div>
                  <span className="text-emerald-600 font-bold text-[11px]">เปิดใช้งาน</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  จำเป็นต่อความปลอดภัยและการทำงานพื้นฐานของเว็บไซต์ เช่น การใช้งานระบบคำนวณภาษี และระบบรักษาความปลอดภัย ไม่สามารถปิดการใช้งานได้
                </p>
              </div>

              {/* Analytics Cookies (Toggleable) */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">2. คุกกี้เพื่อการวิเคราะห์ (Analytics Cookies)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsAllowed}
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  ช่วยให้เราเข้าใจว่าผู้ใช้งานค้นหาแผนประกันประเภทใด เพื่อพัฒนาประสิทธิภาพเว็บไซต์และเครื่องคำนวณให้แม่นยำยิ่งขึ้น
                </p>
              </div>

              {/* Marketing Cookies (Toggleable) */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">3. คุกกี้เพื่อการตลาด (Marketing & Pixel)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingAllowed}
                      onChange={(e) => setMarketingAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  ใช้เพื่อนำเสนอโปรโมชัน ข่าวสารแผนประกันสุขภาพ และมาตรการลดหย่อนภาษีที่ตรงกับความสนใจของท่านผ่านช่องทางออนไลน์
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                ปฏิเสธทั้งหมดที่ไม่จำเป็น
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all cursor-pointer"
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
