'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Shield,
  HeartPulse,
  PiggyBank,
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
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, slides.length]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
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

  const renderBadgeIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-3.5 h-3.5 text-zinc-700" />;
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-zinc-700" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-zinc-700" />;
      case 'PiggyBank':
        return <PiggyBank className="w-3.5 h-3.5 text-zinc-700" />;
      case 'HeartPulse':
      default:
        return <HeartPulse className="w-3.5 h-3.5 text-zinc-700" />;
    }
  };

  return (
    <section 
      className="relative overflow-hidden bg-white/50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-zinc-200/80 select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Slide Background Image with Restrained Neutral Overlay */}
      {slide.background_image && (
        <div 
          key={slide.id + (slide.background_image || '')}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-10 pointer-events-none"
          style={{ backgroundImage: `url(${slide.background_image})` }}
        >
          <div className="absolute inset-0 bg-[#fafafa]/90 backdrop-blur-xs"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px]">
          
          {/* Left Column: Text & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Brand Pill & Dynamic Slide Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-800 text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-200/80 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
                <span>ModtanoyAdvisor</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-white text-zinc-700 text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-200">
                {renderBadgeIcon(slide.badge_icon)}
                <span>{slide.badge_text}</span>
              </div>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
                {slide.title} <br />
                <span className="text-zinc-600 font-bold">
                  {slide.title_highlight}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal pt-1 line-clamp-3 sm:line-clamp-none max-w-2xl">
                {slide.subtitle}
              </p>
            </div>

            {/* Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {(slide.tags || []).map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-zinc-700">
                  <div className="w-4 h-4 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span>{tag}</span>
                </div>
              ))}
            </div>

            {/* Standout Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* PRIMARY ACTION: High-contrast Dark Engineering Button */}
              <Link
                href={slide.primary_btn_href || '/products'}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-xs sm:text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] transition duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
              >
                <span>{slide.primary_btn_label || 'ดูรายละเอียด'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* SECONDARY ACTION: Subtle Surface */}
              <Link
                href={slide.secondary_btn_href || '/consultation'}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-xs sm:text-sm font-medium bg-white text-zinc-800 hover:bg-zinc-50 border border-zinc-200 active:scale-[0.98] transition duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
              >
                <PhoneCall className="w-4 h-4 text-zinc-500" />
                <span>{slide.secondary_btn_label || 'ปรึกษาตัวแทนฟรี'}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Clean White Highlight Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-xl p-6 sm:p-7 border border-zinc-200 hover:border-zinc-300 transition-colors duration-150">
              
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-100">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                  <Star className="w-3 h-3 text-zinc-600" />
                  {slide.card_badge || 'FEATURED'}
                </span>

                <span className="text-[11px] font-mono text-zinc-500">
                  SLIDE {((currentSlide % slides.length) + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Card Main Metric */}
              <div className="py-5 space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 font-mono">
                  {slide.card_main_title || 'จุดเด่นแผนประกัน'}
                </p>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-mono">
                  {slide.card_main_metric || 'ความคุ้มครอง'}
                </div>
                <p className="text-xs text-zinc-500 font-normal">
                  {slide.card_main_metric_sub || ''}
                </p>
              </div>

              {/* Card Stats Grid */}
              <div className="grid grid-cols-2 gap-3 py-3">
                <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200/80 space-y-1">
                  <span className="text-[11px] text-zinc-500 font-medium block">
                    {slide.stat1_label || 'จุดเด่น 1'}
                  </span>
                  <div className="text-base font-bold text-zinc-900 font-mono">
                    {slide.stat1_value || '-'}
                  </div>
                  <span className="text-[10px] text-zinc-400 block">
                    {slide.stat1_desc || ''}
                  </span>
                </div>

                <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200/80 space-y-1">
                  <span className="text-[11px] text-zinc-500 font-medium block">
                    {slide.stat2_label || 'จุดเด่น 2'}
                  </span>
                  <div className="text-base font-bold text-zinc-900 font-mono">
                    {slide.stat2_value || '-'}
                  </div>
                  <span className="text-[10px] text-zinc-400 block">
                    {slide.stat2_desc || ''}
                  </span>
                </div>
              </div>

              {/* Card Footer Note */}
              <div className="pt-4 mt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
                <span className="font-medium text-[11px] text-zinc-600 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{(slide.card_footer_note || 'ได้รับความยินยอมและการรับรองจาก คปภ.').replace(/^✓\s*/, '')}</span>
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="mt-8 pt-5 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Slide Indicators / Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {slides.map((s, index) => {
              const isActive = index === (currentSlide % slides.length);
              return (
                <button
                  key={s.id || index}
                  onClick={() => goToSlide(index)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-zinc-300 group-hover:bg-zinc-400'}`}></span>
                  <span className="whitespace-nowrap max-w-[130px] truncate font-mono">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400"
              title={isAutoPlay ? 'พักการสไลด์อัตโนมัติ' : 'เล่นการสไลด์อัตโนมัติ'}
              aria-label={isAutoPlay ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 flex items-center justify-center transition-colors duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-zinc-600 px-2 select-none">
              <span className="font-bold text-zinc-900">{((currentSlide % slides.length) + 1).toString().padStart(2, '0')}</span> / {slides.length.toString().padStart(2, '0')}
            </span>

            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 flex items-center justify-center transition-colors duration-150 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-zinc-400"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Trust Badges Footer Strip */}
        <div className="mt-5 pt-4 border-t border-zinc-200/60 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-zinc-600" />
            <span>เปรียบเทียบข้อมูลผลประโยชน์โปร่งใส เป็นกลาง</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-zinc-600" />
            <span>ที่ปรึกษาการเงินได้รับใบอนุญาต คปภ. ถูกต้อง</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span>รักษาความปลอดภัยข้อมูลตามมาตรฐาน PDPA</span>
          </div>
        </div>

      </div>
    </section>
  );
}
