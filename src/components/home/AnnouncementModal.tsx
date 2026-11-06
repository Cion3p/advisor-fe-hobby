'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  ArrowRight, 
  Clock, 
  Megaphone
} from 'lucide-react';
import { AnnouncementPopup } from '@/types';
import { getAnnouncementPopup } from '@/lib/api';

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
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200">
      
      {/* Click outside backdrop to close */}
      <div 
        className="absolute inset-0"
        onClick={handleClose}
      ></div>

      {/* Modal Card Container */}
      <div className="relative z-10 bg-white rounded-none max-w-lg w-full overflow-hidden border border-stone-200 transition-all duration-200 shadow-2xl">
        
        {/* Close Button Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-none bg-[#0c0b0a]/80 hover:bg-[#0c0b0a] text-stone-200 flex items-center justify-center transition-colors duration-150 cursor-pointer border border-stone-800"
          title="ปิดหน้าต่าง"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Banner Cover Image */}
        {popup.image_url ? (
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#0c0b0a] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popup.image_url}
              alt={popup.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

            {/* Badge pill on image */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#0c0b0a]/90 text-[#c5a059] text-[10px] font-mono uppercase tracking-[0.2em] border border-stone-800">
              <Megaphone className="w-3 h-3 text-[#c5a059]" />
              <span>{popup.badge_text || 'SPECIAL ANNOUNCEMENT'}</span>
            </div>

            {/* Countdown or Limited Note */}
            {popup.show_countdown && (
              <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-stone-300 text-xs font-mono bg-black/85 px-3 py-1 rounded-none border border-stone-800">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>สิ้นสุดระยะเวลา: {popup.countdown_end_date || 'สิ้นปี 2567'}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#0c0b0a] p-6 text-stone-100 text-center space-y-1.5 border-b border-stone-800">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
              {popup.badge_text || 'EXCLUSIVE PRIVILEGE'}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug tracking-tight">
              {popup.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              {popup.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <Link
              href={popup.primary_btn_href || '#contact-form'}
              onClick={handleClose}
              className="w-full h-11 rounded-none bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-mono font-semibold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition duration-200 cursor-pointer"
            >
              <span>{popup.primary_btn_label || 'รับสิทธิพิเศษทันที'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {popup.secondary_btn_label && popup.secondary_btn_href && (
              <Link
                href={popup.secondary_btn_href}
                onClick={handleClose}
                className="w-full py-2 text-center text-xs font-mono uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors duration-150 block"
              >
                {popup.secondary_btn_label}
              </Link>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <label className="flex items-center gap-2 cursor-pointer hover:text-stone-800">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-3.5 h-3.5 rounded-none accent-[#c5a059] border-stone-300 cursor-pointer"
              />
              <span className="text-[11px] font-light">ไม่ต้องแสดงข้อความนี้อีกในวันนี้</span>
            </label>

            <button
              onClick={handleClose}
              className="text-[11px] font-mono uppercase tracking-wider text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
