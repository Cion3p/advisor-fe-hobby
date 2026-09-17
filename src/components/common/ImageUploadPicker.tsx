'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Link as LinkIcon, 
  Sparkles, 
  Check, 
  RefreshCw,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

export interface ImagePreset {
  id: string;
  name: string;
  category: 'health' | 'finance' | 'family' | 'abstract' | 'promo';
  url: string;
}

export const CURATED_IMAGE_PRESETS: ImagePreset[] = [
  // Health & Medical
  {
    id: 'health-1',
    name: 'แพทย์และโรงพยาบาลมาตรฐานสากล',
    category: 'health',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'health-2',
    name: 'การดูแลสุขภาพเหมาจ่ายครบวงจร',
    category: 'health',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'health-3',
    name: 'ทีมแพทย์และเทคโนโลยีทางการแพทย์',
    category: 'health',
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop',
  },

  // Finance & Tax Savings
  {
    id: 'finance-1',
    name: 'วางแผนภาษีและคำนวณการเงิน',
    category: 'finance',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'finance-2',
    name: 'กองทุนและการเติบโตอย่างมั่นคง',
    category: 'finance',
    url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'finance-3',
    name: 'การลงทุนเพื่อเกษียณอายุสุขใจ',
    category: 'finance',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  },

  // Family & Protection
  {
    id: 'family-1',
    name: 'ครอบครัวอบอุ่นและสร้างหลักประกัน',
    category: 'family',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'family-2',
    name: 'บ้านและมรดกเพื่อคนที่รัก',
    category: 'family',
    url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1200&auto=format&fit=crop',
  },

  // Promotion & Announcement
  {
    id: 'promo-1',
    name: 'แคมเปญพิเศษและของขวัญโปรโมชั่น',
    category: 'promo',
    url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'promo-2',
    name: 'ประกาศข่าวสารส่งท้ายปี 2567',
    category: 'promo',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
  },

  // Abstract Pastel
  {
    id: 'abstract-1',
    name: 'คลื่นสีฟ้าพาสเทลมินิมอล',
    category: 'abstract',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'abstract-2',
    name: 'ประกายแสงฟ้าขาวโมเดิร์น',
    category: 'abstract',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
];

interface ImageUploadPickerProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helpText?: string;
  aspectRatio?: 'banner' | 'card' | 'square' | 'popup' | 'hero' | 'standard';
  defaultCategory?: 'health' | 'finance' | 'family' | 'abstract' | 'promo';
}

export function ImageUploadPicker({
  value = '',
  onChange,
  label = 'รูปภาพประกอบ',
  helpText = 'รองรับการอัปโหลดไฟล์ (JPG, PNG, WebP) หรือเลือกจากคลังรูปภาพแนะนำ',
  aspectRatio = 'banner',
  defaultCategory = 'health',
}: ImageUploadPickerProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  // Convert file to Data URL
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (เช่น .jpg, .png, .webp)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('ขนาดไฟล์ใหญ่เกิน 8MB กรุณาเลือกไฟล์ที่ขนาดเล็กลง');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Custom URL submit
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
    }
  };

  const previewHeightClass = {
    banner: 'h-40 sm:h-48',
    hero: 'h-40 sm:h-48',
    card: 'h-44 sm:h-52',
    standard: 'h-44 sm:h-52',
    square: 'h-48 w-48 mx-auto',
    popup: 'h-48 sm:h-56',
  }[aspectRatio];

  const filteredPresets = selectedCategory === 'all'
    ? CURATED_IMAGE_PRESETS
    : CURATED_IMAGE_PRESETS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-3 bg-sky-50/50 p-4 rounded-2xl border border-sky-100/90 text-xs">
      
      {/* Label and Current Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div>
          <label className="font-bold text-slate-800 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-orange-500" />
            <span>{label}</span>
          </label>
          {helpText && <p className="text-[11px] text-slate-500 mt-0.5">{helpText}</p>}
        </div>

        {/* Source Tab Toggle Buttons */}
        <div className="inline-flex p-1 rounded-xl bg-slate-200/70 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'upload' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            อัปโหลดไฟล์
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'presets' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            คลังภาพแนะนำ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'url' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ลิงก์ URL
          </button>
        </div>
      </div>

      {/* CURRENT IMAGE PREVIEW (IF SELECTED) */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-sky-200 group bg-slate-900 shadow-sm">
          <div className={`w-full ${previewHeightClass} relative`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="รูปภาพพรีวิว"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none"></div>

            {/* Top Badge: Image Active */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-sky-900 text-[11px] font-bold shadow-xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>กำลังใช้งานรูปนี้</span>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white text-[11px]">
              <span className="truncate max-w-[200px] text-slate-200 font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                {value.startsWith('data:') ? '✓ ไฟล์ส่วนตัว (Data URL)' : value}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-white/90 hover:bg-white text-slate-800 font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-orange-500" />
                  <span>เปลี่ยน</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2.5 py-1 bg-rose-600/90 hover:bg-rose-600 text-white font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>ลบออก</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* TAB 1: FILE UPLOAD ZONE (DRAG & DROP) */}
      {activeTab === 'upload' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-orange-500 bg-orange-50/70 scale-[1.01]'
              : 'border-sky-300 hover:border-orange-400 bg-white hover:bg-sky-50/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-11 h-11 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2.5 shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="font-bold text-slate-800 text-xs">
            คลิกเพื่อเลือกไฟล์รูปภาพ หรือลากไฟล์มาวางที่นี่
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            รองรับไฟล์ JPG, PNG, WebP ขนาดไม่เกิน 8MB (จะถูกแปลงเป็น Data URL แสดงผลได้ทันที)
          </p>
        </div>
      )}

      {/* TAB 2: CURATED PRESETS GALLERY */}
      {activeTab === 'presets' && (
        <div className="space-y-3 bg-white p-3 rounded-2xl border border-sky-100">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'health', label: '🏥 ประกันสุขภาพ' },
              { id: 'finance', label: '📊 ภาษี & การเงิน' },
              { id: 'family', label: '👨‍👩‍👦 ครอบครัว & มรดก' },
              { id: 'promo', label: '📢 แคมเปญ & ประกาศ' },
              { id: 'abstract', label: '🎨 ลายพาสเทล' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
            {filteredPresets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <div
                  key={preset.id}
                  onClick={() => onChange(preset.url)}
                  className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all group ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-400 shadow-md'
                      : 'border-slate-200 hover:border-sky-400 opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="h-20 w-full relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-bold text-white truncate drop-shadow">
                      {preset.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM URL INPUT */}
      {activeTab === 'url' && (
        <form onSubmit={handleApplyUrl} className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              placeholder="วางลิงก์รูปภาพ เช่น https://images.unsplash.com/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={!urlInput.trim()}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl text-xs shadow-xs hover:shadow transition-all disabled:opacity-50 cursor-pointer"
          >
            ใช้งานรูปนี้
          </button>
        </form>
      )}

    </div>
  );
}
