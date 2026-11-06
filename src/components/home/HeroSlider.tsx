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
  PhoneCall,
  Play,
  Pause,
  Award
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

  const AUTO_PLAY_INTERVAL = 7000;

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

  const renderBadgeIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-3.5 h-3.5 text-[#c5a059]" />;
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-[#c5a059]" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />;
      case 'PiggyBank':
        return <PiggyBank className="w-3.5 h-3.5 text-[#c5a059]" />;
      case 'HeartPulse':
      default:
        return <HeartPulse className="w-3.5 h-3.5 text-[#c5a059]" />;
    }
  };

  return (
    <section 
      className="relative overflow-hidden bg-[#fbfaf6] pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-stone-200/80 select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Slide Background with Atmospheric Depth */}
      {slide.background_image && (
        <div 
          key={slide.id + (slide.background_image || '')}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-15 pointer-events-none"
          style={{ backgroundImage: `url(${slide.background_image})` }}
        >
          <div className="absolute inset-0 bg-[#fbfaf6]/85 backdrop-blur-xs"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slide Content Grid - Deliberate Editorial Asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[460px]">
          
          {/* Left Column: Text & Editorial CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Eyebrow Header */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-stone-500 font-mono">
                SERIES {(currentSlide + 1).toString().padStart(2, '0')} • ARCHITECTURAL PROTECTION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-stone-600 font-mono flex items-center gap-1.5">
                {renderBadgeIcon(slide.badge_icon)}
                <span>{slide.badge_text}</span>
              </span>
            </div>

            {/* Display Typography */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-950 tracking-tight leading-[1.12]">
                {slide.title} <br />
                <span className="italic font-serif text-[#b38f46] font-normal">
                  {slide.title_highlight}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-stone-600 leading-loose max-w-xl font-light pt-2">
                {slide.subtitle}
              </p>
            </div>

            {/* Benefit Points with Hairline Lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(slide.tags || []).map((tag, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-700 tracking-wide">
                  <span className="w-1 h-1 rounded-none bg-[#c5a059] shrink-0" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>

            {/* Editorial Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              {/* PRIMARY ACTION: High-End Sharp Button */}
              <Link
                href={slide.primary_btn_href || '/products'}
                className="inline-flex items-center justify-center gap-3 h-12 px-7 rounded-none text-xs uppercase tracking-[0.2em] font-medium bg-stone-950 text-[#fcfbf7] hover:bg-[#c5a059] hover:text-stone-950 active:scale-[0.99] transition-all duration-400 cursor-pointer"
              >
                <span>{slide.primary_btn_label || 'สำรวจแผนความคุ้มครอง'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* GHOST ACTION: Hairline Border */}
              <Link
                href={slide.secondary_btn_href || '/consultation'}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-none text-xs uppercase tracking-[0.2em] font-medium bg-transparent text-stone-900 border border-stone-300 hover:border-stone-950 hover:bg-white active:scale-[0.99] transition-all duration-400 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-stone-500" />
                <span>{slide.secondary_btn_label || 'นัดหมายที่ปรึกษา'}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Sharp Framing Showcase Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-none p-7 sm:p-8 border border-stone-200 shadow-none hover:border-[#c5a059] transition-all duration-500 relative">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c5a059]" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059] font-semibold">
                  {slide.card_badge || 'CURATED PORTFOLIO'}
                </span>

                <span className="text-[10px] font-mono tracking-widest text-stone-400">
                  {((currentSlide % slides.length) + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Main Metric - Serif Headline */}
              <div className="py-6 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.25em] font-mono text-stone-400">
                  {slide.card_main_title || 'จุดเด่นแผนความคุ้มครอง'}
                </p>
                <div className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-stone-950">
                  {slide.card_main_metric || 'ความคุ้มครอง'}
                </div>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {slide.card_main_metric_sub || ''}
                </p>
              </div>

              {/* Card Stats Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-stone-100">
                <div className="space-y-1 pr-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                    {slide.stat1_label || 'จุดเด่น 1'}
                  </span>
                  <div className="font-serif text-lg font-medium text-stone-950">
                    {slide.stat1_value || '-'}
                  </div>
                  <span className="text-[10px] text-stone-400 block font-light">
                    {slide.stat1_desc || ''}
                  </span>
                </div>

                <div className="space-y-1 pl-2 border-l border-stone-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                    {slide.stat2_label || 'จุดเด่น 2'}
                  </span>
                  <div className="font-serif text-lg font-medium text-stone-950">
                    {slide.stat2_value || '-'}
                  </div>
                  <span className="text-[10px] text-stone-400 block font-light">
                    {slide.stat2_desc || ''}
                  </span>
                </div>
              </div>

              {/* Card Footer Note */}
              <div className="pt-4 flex items-center justify-between text-[11px] text-stone-500 font-light">
                <span className="flex items-center gap-1.5 text-stone-600">
                  <CheckCircle className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{(slide.card_footer_note || 'ได้รับความยินยอมและการรับรองจาก คปภ.').replace(/^✓\s*/, '')}</span>
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Bottom Control Bar - Hairline Framing */}
        <div className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
          
          {/* Slide Indicators / Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {slides.map((s, index) => {
              const isActive = index === (currentSlide % slides.length);
              return (
                <button
                  key={s.id || index}
                  onClick={() => goToSlide(index)}
                  className={`group flex items-center gap-2 px-3.5 py-2 rounded-none text-[11px] uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'border-stone-900 bg-stone-900 text-[#fcfbf7]'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`w-1 h-1 ${isActive ? 'bg-[#c5a059]' : 'bg-stone-300'}`}></span>
                  <span className="whitespace-nowrap max-w-[140px] truncate font-serif">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="w-9 h-9 rounded-none border border-stone-200 bg-white hover:border-stone-400 text-stone-700 flex items-center justify-center transition-colors duration-300 cursor-pointer"
              title={isAutoPlay ? 'พักการแสดง' : 'เล่นอัตโนมัติ'}
              aria-label={isAutoPlay ? 'Pause' : 'Resume'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-none border border-stone-200 bg-white hover:border-stone-400 text-stone-700 flex items-center justify-center transition-colors duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-stone-500 px-3 tracking-widest select-none">
              <span className="text-stone-900 font-bold">{((currentSlide % slides.length) + 1).toString().padStart(2, '0')}</span> / {slides.length.toString().padStart(2, '0')}
            </span>

            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-none border border-stone-200 bg-white hover:border-stone-400 text-stone-700 flex items-center justify-center transition-colors duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Trust Badges Footer Strip */}
        <div className="mt-6 pt-5 border-t border-stone-200/50 flex flex-wrap items-center justify-center sm:justify-between gap-6 text-[11px] uppercase tracking-[0.18em] font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#c5a059]"></span>
            <span>TRANSPARENT ADVISORY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#c5a059]"></span>
            <span>OIC LICENSED PARTNERS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#c5a059]"></span>
            <span>PDPA 100% COMPLIANT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
