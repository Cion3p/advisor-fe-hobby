'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Shield,
  HeartPulse,
  PiggyBank,
  Calculator,
  Percent,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Award,
  PhoneCall,
  Play,
  Pause,
  Star
} from 'lucide-react';
import { HeroSlide } from '@/types';
import { getHeroSlides, FALLBACK_HERO_SLIDES } from '@/lib/api';

export function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>(FALLBACK_HERO_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync slides with localStorage & custom update events from Admin Portal
  useEffect(() => {
    const loaded = getHeroSlides().filter((s) => s.is_active);
    if (loaded.length > 0) {
      setSlides(loaded);
    }

    const handleSlidesUpdate = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        const active = (e.detail as HeroSlide[]).filter((s) => s.is_active);
        if (active.length > 0) setSlides(active);
      } else {
        const reloaded = getHeroSlides().filter((s) => s.is_active);
        if (reloaded.length > 0) setSlides(reloaded);
      }
      setCurrentSlide(0);
    };

    window.addEventListener('modtanoy_slides_updated', handleSlidesUpdate);
    window.addEventListener('storage', handleSlidesUpdate);
    return () => {
      window.removeEventListener('modtanoy_slides_updated', handleSlidesUpdate);
      window.removeEventListener('storage', handleSlidesUpdate);
    };
  }, []);

  const AUTO_PLAY_INTERVAL = 6500;

  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    if (!isAutoPlay || slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoPlay, nextSlide, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const slide = slides[currentSlide % slides.length] || FALLBACK_HERO_SLIDES[0];

  // Helper for badge icon
  const renderBadgeIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-3.5 h-3.5 text-sky-600" />;
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-sky-600" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-sky-600" />;
      case 'PiggyBank':
        return <PiggyBank className="w-3.5 h-3.5 text-sky-600" />;
      case 'HeartPulse':
      default:
        return <HeartPulse className="w-3.5 h-3.5 text-sky-600" />;
    }
  };

  return (
    <section 
      className="relative overflow-hidden bg-sky-50/60 pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-sky-100 select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Slide Background Image with Clean Overlay */}
      {slide.background_image && (
        <div 
          key={slide.id + (slide.background_image || '')}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${slide.background_image})` }}
        >
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* Left Column: Text & Standout Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Brand Pill & Dynamic Slide Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-950 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>ModtanoyAdvisor • มดตะนอย แอดไวเซอร์</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-white border border-sky-200 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
                {renderBadgeIcon(slide.badge_icon)}
                <span>{slide.badge_text}</span>
              </div>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight transition-all duration-300">
                {slide.title} <br />
                <span className="text-sky-700">
                  {slide.title_highlight}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-2 line-clamp-3 sm:line-clamp-none max-w-2xl">
                {slide.subtitle}
              </p>
            </div>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {(slide.tags || []).map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span>{tag}</span>
                </div>
              ))}
            </div>

            {/* Standout Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              {/* PRIMARY STANDOUT BUTTON: Solid Warm Orange */}
              <Link
                href={slide.primary_btn_href || '/products'}
                className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{slide.primary_btn_label || 'ดูรายละเอียด'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* SECONDARY BUTTON: Crisp white with border */}
              <Link
                href={slide.secondary_btn_href || '/consultation'}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-900 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-300 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-slate-600" />
                <span>{slide.secondary_btn_label || 'ปรึกษาตัวแทนฟรี'}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Clean White Highlight Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-200/60 border border-slate-200 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
              
              {/* Card top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-600"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white tracking-wider">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {slide.card_badge || 'FEATURED'}
                </span>

                <span className="text-[11px] font-bold text-sky-700">
                  SLIDE {((currentSlide % slides.length) + 1)} / {slides.length}
                </span>
              </div>

              {/* Card Main Metric */}
              <div className="py-5 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {slide.card_main_title || 'ไฮไลต์แผนประกัน'}
                </p>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-orange-600">
                  {slide.card_main_metric || 'ความคุ้มครอง'}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {slide.card_main_metric_sub || ''}
                </p>
              </div>

              {/* Card Stats Grid */}
              <div className="grid grid-cols-2 gap-3 py-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {slide.stat1_label || 'จุดเด่น 1'}
                  </span>
                  <div className="text-base font-black text-slate-900">
                    {slide.stat1_value || '-'}
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {slide.stat1_desc || ''}
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {slide.stat2_label || 'จุดเด่น 2'}
                  </span>
                  <div className="text-base font-black text-slate-900">
                    {slide.stat2_value || '-'}
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {slide.stat2_desc || ''}
                  </span>
                </div>
              </div>

              {/* Card Footer Note */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium text-[11px] text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{(slide.card_footer_note || 'ได้รับความยินยอมและการรับรองจาก คปภ.').replace(/^✓\s*/, '')}</span>
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="mt-8 pt-6 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Slide Indicators / Tabs - Single Consistent Color Scheme */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {slides.map((s, index) => {
              const isActive = index === (currentSlide % slides.length);
              return (
                <button
                  key={s.id || index}
                  onClick={() => goToSlide(index)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300 group-hover:bg-slate-400'}`}></span>
                  <span className="whitespace-nowrap max-w-[120px] truncate">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs cursor-pointer"
              title={isAutoPlay ? 'พักการสไลด์อัตโนมัติ' : 'เล่นการสไลด์อัตโนมัติ'}
              aria-label={isAutoPlay ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={prevSlide}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-slate-700 px-2 select-none">
              <span className="text-orange-600 font-black">0{((currentSlide % slides.length) + 1)}</span> / 0{slides.length}
            </span>

            <button
              onClick={nextSlide}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Trust Badges Footer Strip */}
        <div className="mt-6 pt-5 border-t border-sky-100 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-sky-600" />
            <span>เปรียบเทียบข้อมูลผลประโยชน์โปร่งใส เป็นกลาง</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-600" />
            <span>ที่ปรึกษาการเงินได้รับใบอนุญาต คปภ. ถูกต้อง</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-700" />
            <span>รักษาความปลอดภัยข้อมูลตามมาตรฐาน PDPA 100%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
