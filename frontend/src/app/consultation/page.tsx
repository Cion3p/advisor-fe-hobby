'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  PhoneCall, 
  Lock, 
  CheckCircle, 
  Clock, 
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
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          ส่งคำขอรับคำปรึกษาเรียบร้อยแล้ว
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          ขอบพระคุณคุณ <strong className="text-slate-800">{formData.customerName}</strong> ที่ไว้วางใจ FinAdvisor TH ทางที่ปรึกษาการเงินที่มีใบอนุญาต คปภ. จะติดต่อกลับผ่านเบอร์ <strong className="text-slate-800">{formData.customerPhone}</strong> ในช่วง {formData.preferredContactTime} เพื่อให้ข้อมูลเบี้ยประกันและผลประโยชน์อย่างละเอียด
        </p>
        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <a
            href="/"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            กลับสู่หน้าแรก
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-lg space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> บริการให้คำปรึกษาฟรี ไม่มีข้อผูกมัด
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          ขอรับคำปรึกษาและคำนวณเบี้ยประกัน
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          กรอกข้อมูลเพื่อให้ตัวแทนผู้เชี่ยวชาญ คปภ. ติดต่อกลับเพื่ออธิบายตารางผลประโยชน์
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ชื่อ - นามสกุล <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น สมชาย ใจดี"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              เบอร์โทรศัพท์ติดต่อ <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="08X-XXX-XXXX"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              อีเมล (ไม่บังคับ)
            </label>
            <input
              type="email"
              placeholder="yourname@example.com"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              ช่วงเวลาที่สะดวกให้ติดต่อกลับ
            </label>
            <select
              value={formData.preferredContactTime}
              onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:outline-none bg-white"
            >
              <option>ช่วงเช้า (09:00 - 12:00 น.)</option>
              <option>ช่วงบ่าย (13:00 - 17:00 น.)</option>
              <option>ช่วงเย็นหลังเลิกงาน (17:00 - 20:00 น.)</option>
              <option>สะดวกทุกเวลา</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            งบประมาณเบี้ยประกันที่ตั้งไว้ต่อปี
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:outline-none bg-white"
          >
            <option>ต่ำกว่า 20,000 บาท/ปี</option>
            <option>20,000 - 40,000 บาท/ปี</option>
            <option>40,000 - 70,000 บาท/ปี</option>
            <option>70,000 - 100,000 บาท/ปี</option>
            <option>มากกว่า 100,000 บาท/ปี</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            ข้อมูลหรือข้อสงสัยเพิ่มเติม
          </label>
          <textarea
            rows={3}
            value={formData.userNotes}
            onChange={(e) => setFormData({ ...formData, userNotes: e.target.value })}
            placeholder="เช่น ต้องการเน้นค่าห้องเดี่ยว, สนใจประกันลดหย่อนภาษี 100,000 แรก, หรือมีโรคประจำตัว"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>

        {/* PDPA Consent Checkbox */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.pdpaConsent}
              onChange={(e) => setFormData({ ...formData, pdpaConsent: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 mt-1 cursor-pointer"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              ข้าพเจ้ายินยอมให้ FinAdvisor TH และตัวแทนประกันชีวิต/ที่ปรึกษาการเงินที่มีใบอนุญาตติดต่อเพื่อนำเสนอข้อมูล เปรียบเทียบผลประโยชน์ และคำนวณเบี้ยประกันตามเงื่อนไขใน <a href="/privacy-policy" target="_blank" className="text-brand-600 underline font-semibold">นโยบายความเป็นส่วนตัว (PDPA)</a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md shadow-brand-600/25 transition-all text-sm disabled:opacity-50"
        >
          {loading ? (
            'กำลังส่งข้อมูล...'
          ) : (
            <>
              <Send className="w-4 h-4" />
              ส่งข้อมูลขอรับคำปรึกษาฟรี
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          🔒 ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เฉพาะการติดต่อเพื่อให้ข้อมูลประกันภัยเท่านั้น
        </p>
      </form>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-center py-20">กำลังโหลดแบบฟอร์ม...</div>}>
        <ConsultationForm />
      </Suspense>
    </div>
  );
}
