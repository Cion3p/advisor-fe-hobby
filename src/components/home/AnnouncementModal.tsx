'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Megaphone,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { AnnouncementPopup } from '@/types';
import { getAnnouncementPopup, DEFAULT_ANNOUNCEMENT_POPUP } from '@/lib/api';

export function AnnouncementModal() {
  const [popup, setPopup] = useState<AnnouncementPopup | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    // Check if dismissed for today
    const checkDismissal = () => {
      try {
        const dismissedDate = localStorage.getItem('modtanoy_hide_announcement_until');
        if (dismissedDate) {
          const today = new Date().toISOString().slice(0, 10);
          if (dismissedDate === today) {
            return true; // Still hidden today
          }
        }
      } catch {}
      return false;
    };

    const currentConfig = getAnnouncementPopup();
    setPopup(currentConfig);

    if (currentConfig.is_active && !checkDismissal()) {
      // Delay entrance slightly for natural user experience
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Listen to real-time updates from Admin
    const handleUpdate = (e: any) => {
      const updated = e?.detail || getAnnouncementPopup();
      setPopup(updated);
      if (updated.is_active) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('modtanoy_announcement_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('modtanoy_announcement_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleClose = () => {
    if (dontShowToday) {
      try {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem('modtanoy_hide_announcement_until', today);
      } catch {}
    }
    setIsOpen(false);
  };

  if (!isOpen || !popup || !popup.is_active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      {/* Click outside backdrop to close */}
      <div 
        className="absolute inset-0"
        onClick={handleClose}
      ></div>

      {/* Modal Card Container */}
      <div className="relative z-10 bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-sky-200/80 transform transition-all animate-scale-up">
        
        {/* Close Button Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md"
          title="ปิดหน้าต่าง"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Banner Cover Image */}
        {popup.image_url ? (
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popup.image_url}
              alt={popup.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

            {/* Badge pill on image */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-sky-950 text-xs font-bold shadow-md border border-sky-100">
              <Megaphone className="w-3.5 h-3.5 text-orange-500" />
              <span>{popup.badge_text || 'ข่าวสารและสิทธิประโยชน์'}</span>
            </div>

            {/* Countdown or Limited Note */}
            {popup.show_countdown && (
              <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-amber-300 text-xs font-bold bg-slate-900/80 px-2.5 py-1 rounded-xl border border-amber-400/30 backdrop-blur-xs">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>สิทธิพิเศษถึง: {popup.countdown_end_date || 'สิ้นปี 2567'}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-sky-700 p-6 text-white text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-100">
              {popup.badge_text || 'ข่าวสารและสิทธิประโยชน์'}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-4">
          
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
              {popup.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {popup.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {/* Primary CTA Standout Button */}
            <Link
              href={popup.primary_btn_href || '#contact-form'}
              onClick={handleClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{popup.primary_btn_label || 'รับสิทธิพิเศษทันที'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Link if present */}
            {popup.secondary_btn_label && popup.secondary_btn_href && (
              <Link
                href={popup.secondary_btn_href}
                onClick={handleClose}
                className="w-full py-2.5 px-4 text-center text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors block"
              >
                {popup.secondary_btn_label}
              </Link>
            )}
          </div>

          {/* Footer: Don't show again today checkbox */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer"
              />
              <span className="text-[11px] font-medium">ไม่ต้องแสดงข้อความนี้อีกในวันนี้</span>
            </label>

            <button
              onClick={handleClose}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
