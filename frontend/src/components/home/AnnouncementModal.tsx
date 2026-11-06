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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs transition-opacity duration-150">
      
      {/* Click outside backdrop to close */}
      <div 
        className="absolute inset-0"
        onClick={handleClose}
      ></div>

      {/* Modal Card Container */}
      <div className="relative z-10 bg-white rounded-xl max-w-lg w-full overflow-hidden border border-zinc-200 transition-all duration-150">
        
        {/* Close Button Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-20 w-7 h-7 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
          title="ปิดหน้าต่าง"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Top Banner Cover Image */}
        {popup.image_url ? (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-900 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={popup.image_url}
              alt={popup.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>

            {/* Badge pill on image */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-zinc-900 text-xs font-mono font-medium border border-zinc-200">
              <Megaphone className="w-3 h-3 text-zinc-700" />
              <span>{popup.badge_text || 'สิทธิประโยชน์'}</span>
            </div>

            {/* Countdown or Limited Note */}
            {popup.show_countdown && (
              <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-zinc-200 text-xs font-mono bg-zinc-950/80 px-2.5 py-1 rounded-md border border-zinc-800">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>สิทธิพิเศษถึง: {popup.countdown_end_date || 'สิ้นปี 2567'}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-zinc-900 p-5 text-white text-center space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              {popup.badge_text || 'ข่าวสารและสิทธิประโยชน์'}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug tracking-tight">
              {popup.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
              {popup.subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <Link
              href={popup.primary_btn_href || '#contact-form'}
              onClick={handleClose}
              className="w-full h-10 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition duration-150 cursor-pointer"
            >
              <span>{popup.primary_btn_label || 'รับสิทธิพิเศษทันที'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {popup.secondary_btn_label && popup.secondary_btn_href && (
              <Link
                href={popup.secondary_btn_href}
                onClick={handleClose}
                className="w-full py-2 text-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-150 block"
              >
                {popup.secondary_btn_label}
              </Link>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
            <label className="flex items-center gap-2 cursor-pointer hover:text-zinc-800">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-zinc-900 border-zinc-300 focus:ring-zinc-400 cursor-pointer"
              />
              <span className="text-[11px]">ไม่ต้องแสดงข้อความนี้อีกในวันนี้</span>
            </label>

            <button
              onClick={handleClose}
              className="text-[11px] font-medium text-zinc-400 hover:text-zinc-700 cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
