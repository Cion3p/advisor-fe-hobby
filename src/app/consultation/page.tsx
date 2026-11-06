'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  CheckCircle, 
  Send,
  AlertCircle
} from 'lucide-react';
import { submitLeadAPI } from '@/lib/api';

function ConsultationForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const productTitle = searchParams.get('title');

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    preferredContactTime: 'ช่วงบ่าย (13:00 - 17:00 น.)',
    province: 'กรุงเทพมหานคร',
    budgetRange: '20,000 - 40,000 บาท/ปี',
    userNotes: productTitle ? `สนใจแผนประกัน: ${productTitle}` : '',
    pdpaConsent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName || !formData.customerPhone) {
      setError('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    if (!formData.pdpaConsent) {
      setError('กรุณากดยินยอมข้อตกลง PDPA เพื่อให้เจ้าหน้าที่ติดต่อกลับ');
      return;
    }

    setLoading(true);
    try {
      await submitLeadAPI({
        ...formData,
        interestedProductId: productId ? Number(productId) : undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-none border border-stone-200/80 text-center space-y-6 shadow-xs">
        <div className="w-14 h-14 bg-stone-50 text-[#c5a059] border border-stone-200 rounded-none flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          ส่งคำขอรับคำปรึกษาเรียบร้อยแล้ว
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
          ขอบพระคุณคุณ <strong className="text-stone-900 font-serif font-semibold">{formData.customerName}</strong> ที่มอบความไว้วางใจให้ ModtanoyAdvisor ทางที่ปรึกษาการเงินที่มีใบอนุญาต คปภ. จะติดต่อกลับผ่านเบอร์ <strong className="text-stone-900 font-mono font-semibold">{formData.customerPhone}</strong> ในช่วง {formData.preferredContactTime} เพื่อนำเสนอข้อมูลผลประโยชน์และตารางเบี้ยประกันอย่างละเอียด
        </p>
        <div className="pt-4 border-t border-stone-100 flex justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center h-10 px-6 rounded-none bg-[#0c0b0a] text-stone-100 text-xs font-mono uppercase tracking-wider hover:bg-stone-900 border border-stone-800 transition duration-200"
          >
            กลับสู่หน้าหลัก
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-none border border-stone-200/80 space-y-7 shadow-xs">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>CONFIDENTIAL ADVISORY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 tracking-tight leading-tight">
          ขอรับคำปรึกษาและคำนวณเบี้ยประกัน
        </h1>
        <p className="text-xs text-stone-500 font-light">
          กรอกข้อมูลเพื่อให้ตัวแทนผู้เชี่ยวชาญ คปภ. ติดต่อกลับเพื่ออธิบายตารางผลประโยชน์โดยไม่มีข้อผูกมัด
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-none bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 block">
              ชื่อ - นามสกุล <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น นาย สมชาย ใจดี"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full h-10 px-3.5 rounded-none border border-stone-300 text-xs focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 block">
              เบอร์โทรศัพท์ติดต่อ <span className="text-[#c5a059]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="08X-XXX-XXXX"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="w-full h-10 px-3.5 rounded-none border border-stone-300 text-xs font-mono focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 block">
              อีเมล (ไม่บังคับ)
            </label>
            <input
              type="email"
              placeholder="yourname@example.com"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className="w-full h-10 px-3.5 rounded-none border border-stone-300 text-xs focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 block">
              ช่วงเวลาที่สะดวกให้ติดต่อกลับ
            </label>
            <select
              value={formData.preferredContactTime}
              onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
              className="w-full h-10 px-3 rounded-none border border-stone-300 text-xs bg-white focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
            >
              <option>ช่วงเช้า (09:00 - 12:00 น.)</option>
              <option>ช่วงบ่าย (13:00 - 17:00 น.)</option>
              <option>ช่วงเย็นหลังเลิกงาน (17:00 - 20:00 น.)</option>
              <option>สะดวกทุกเวลา</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 block">
            งบประมาณเบี้ยประกันที่ตั้งไว้ต่อปี
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full h-10 px-3 rounded-none border border-stone-300 text-xs bg-white focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
          >
            <option>ต่ำกว่า 20,000 บาท/ปี</option>
            <option>20,000 - 40,000 บาท/ปี</option>
            <option>40,000 - 70,000 บาท/ปี</option>
            <option>70,000 - 100,000 บาท/ปี</option>
            <option>มากกว่า 100,000 บาท/ปี</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-stone-700 block">
            ข้อมูลหรือข้อสงสัยเพิ่มเติม
          </label>
          <textarea
            rows={3}
            value={formData.userNotes}
            onChange={(e) => setFormData({ ...formData, userNotes: e.target.value })}
            placeholder="เช่น ต้องการเน้นค่าห้องเดี่ยว, สนใจประกันลดหย่อนภาษี, หรือมีโรคประจำตัว"
            className="w-full p-3.5 rounded-none border border-stone-300 text-xs focus-visible:ring-1 focus-visible:ring-[#c5a059] focus-visible:outline-none"
          />
        </div>

        {/* PDPA Consent Checkbox */}
        <div className="bg-stone-50 p-4 rounded-none border border-stone-200 space-y-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.pdpaConsent}
              onChange={(e) => setFormData({ ...formData, pdpaConsent: e.target.checked })}
              className="w-4 h-4 accent-[#c5a059] rounded-none border-stone-300 mt-0.5 cursor-pointer"
            />
            <span className="text-[11px] text-stone-600 leading-relaxed font-light">
              ข้าพเจ้ายินยอมให้ ModtanoyAdvisor และตัวแทนประกันชีวิต/ที่ปรึกษาการเงินที่มีใบอนุญาตติดต่อเพื่อนำเสนอข้อมูล เปรียบเทียบผลประโยชน์ และคำนวณเบี้ยประกันตามเงื่อนไขใน <a href="/privacy-policy" target="_blank" className="text-stone-900 underline font-medium">นโยบายความเป็นส่วนตัว (PDPA)</a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 flex items-center justify-center gap-2 bg-[#0c0b0a] hover:bg-stone-900 text-stone-100 font-mono uppercase tracking-wider rounded-none text-xs active:scale-[0.98] transition duration-200 disabled:opacity-50 cursor-pointer border border-stone-800"
        >
          {loading ? (
            'กำลังส่งข้อมูล...'
          ) : (
            <>
              <Send className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>ส่งข้อมูลขอรับคำปรึกษาฟรี</span>
            </>
          )}
        </button>

        <p className="text-[10px] font-mono text-stone-400 text-center tracking-wider uppercase">
          PDPA COMPLIANT • SECURE ENCRYPTED TRANSMISSION
        </p>
      </form>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-center py-24 text-xs text-stone-500 font-mono uppercase tracking-widest">กำลังจัดเตรียมแบบฟอร์ม...</div>}>
        <ConsultationForm />
      </Suspense>
    </div>
  );
}
